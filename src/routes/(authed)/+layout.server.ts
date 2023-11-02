import { prepareDerived } from '$lib/server/util';
import { PRIVATE_KEY_IV } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (!session) throw redirect(307, '/auth/login')
    const { derived, crypt, userId } = await prepareDerived({ getSession, supabase })
    // we will load card data here since we know that the user is legit and his session is a valid one
    const accountDetails = await supabase.from("account").select().eq("user_id", userId)
    const protectedCards: Resources.ICard[] = []
    // these 2 conditionals need better handling in the sense that we should check wether a data obj is empty and what not
    // but im just trynna implement something basic for the time being.
    // NOTE that we could also reuse some logic here.

    const { data , error } = await supabase
     .from("account")
     .select("first_time")
     .eq("user_id", userId)
     // checks boolean from table
    if (data![0].first_time) throw redirect(307, '/set-currency');
    
    async function checkForCard (field: "credit_card_id" | "debit_card_id") {
      if (accountDetails.data && accountDetails.data[0] && accountDetails.data[0][field]) {
        const cardId = accountDetails.data[0][field]
        const { error: err, data } = field === "credit_card_id" ? await supabase.from("card").select().eq("id", cardId).eq("card_type", "credit") : await supabase.from("card").select().eq("id", cardId).eq("card_type", "debit")

        if (err) throw error(500, { message: err.message })
        protectedCards.push(data![0])
      } 
    }

   await checkForCard("credit_card_id")
   await checkForCard("debit_card_id")
 
   const cards: Resources.ICard[] = [] 

   for (const { id, card_type, digits, last_digits, cardholder, company, created_at } of protectedCards) {
        const decryptedCardholder = crypt.decrypt(derived, PRIVATE_KEY_IV, cardholder) as string
        const decryptedCompany = crypt.decrypt(derived, PRIVATE_KEY_IV, company) as string
        // note that the card digits should only be retrieved when we actively need them, for example when we need to verify
        // wether a card is legit or not or something like that.
         cards.push({ id, cardholder: decryptedCardholder, company: decryptedCompany, digits, last_digits, card_type, created_at })
    }

    const {data: contacts} = await supabase.from("contact").select().eq("original_account_id", accountDetails.data![0].id);

    return { session, cards, account: accountDetails.data![0], contacts: contacts }
}
