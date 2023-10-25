// import ServerCrypto from '$lib/server/crypto';
// import { PRIVATE_KEY, PRIVATE_KEY_IV } from '$env/static/private';
// import { error, redirect } from '@sveltejs/kit';
// import type { LayoutServerLoad } from "./$types"

// export const load: LayoutServerLoad = async ({ locals: { supabase, getSession } }) => {
//     const session = await getSession()
//     if (!session) throw redirect(307, '/auth/login')
//     // we will load card data here since we know that the user is legit and his session is a valid one
//     const userId = session!.user.id
    
//     const accountDetails = await supabase.from("account").select().eq("user_id", userId)
    
    
//     const creditCardId = accountDetails!.data![0].credit_card_id || null
//     const debitCardId = accountDetails!.data![0].debit_card_id || null
    
//     const protectedCards: Resources.ICard[] = []

//     // these 2 conditionals need better handling in the sense that we should check wether a data obj is empty and what not
//     // but im just trynna implement something basic for the time being.
//     // NOTE that we could also reuse some logic here.
//     if (creditCardId) {
//       const { error, data } = await supabase.from("card").select().eq("id", creditCardId).eq("card_type", "credit")
//       console.error(error)
//       protectedCards.push(data![0])
//     }

//     if (debitCardId) {
//       const { error, data } = await supabase.from("card").select().eq("id", debitCardId).eq("card_type", "debit")
//       console.error(error)
//       protectedCards.push(data![0])
//     }
  
//     const {data, error} = await supabase
//     .from("account")
//     .select("first_time")
//     .eq("user_id", session.user.id)
//     // checks boolean from table
//     if (data![0].first_time) throw redirect(307, '/set-currency');

//     // pretty sure i use the same logic in another module, prob gonna make a small function block for this
//     const crypt = new ServerCrypto()
//     const hash = crypt.hash(userId)
//     if (!hash) throw error(500, "Something went wrong when attempting to load cards!")


//     const derived = crypt.deriveKey(PRIVATE_KEY, hash)
    
//     if (!derived) throw error(500, "Something went wrong during a critical process of the card retrieval operation!")


//     const cards: Resources.ICard[] = [] 

//     for (const { id, card_type, digits, last_digits, cardholder, company, created_at } of protectedCards) {
//       const decryptedCardholder = crypt.decrypt(derived, PRIVATE_KEY_IV, cardholder) as string
//       const decryptedCompany = crypt.decrypt(derived, PRIVATE_KEY_IV, company) as string
//       // note that the card digits should only be retrieved when we actively need them, for example when we need to verify
//       // wether a card is legit or not or something like that.
//       cards.push({ id, cardholder: decryptedCardholder, company: decryptedCompany, digits, last_digits, card_type, created_at })
//     }

//     return { session, cards }
// }
