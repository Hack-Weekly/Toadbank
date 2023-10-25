import { PRIVATE_KEY, PRIVATE_KEY_IV } from "$env/static/private";
import ServerCrypto from "$lib/server/crypto";
import { fail } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, locals: { getSession, supabase } }) => {
    const { cardholder, company, digits, type } = Object.fromEntries(await request.formData()) as Record<string, string> 
    // NOTE for card type, make sure a enum was created within the database to select strictly between credit or debit 
    const crypto = new ServerCrypto()
    const session = await getSession()
    // session is supposed to be checked in the layout on load, and the session needs to have basic user data
    // tied to it
    const userId = session!.user.id
    const hash = crypto.hash(userId)
    // change the error message later if you need
    if (!hash) return fail(500, { message: "Something went wrong when attempting to create a hash!", success: false })
    const derived = crypto.deriveKey(PRIVATE_KEY, hash)
    if (!derived) return fail(500, { message: "Internal server error, something went wrong when attempting to add card!", success: false }) 
    
    const lastDigits = digits.slice(digits.length - 4, digits.length)
    const encrypted = []

    for (const x of [cardholder, company, digits]) {
      const cipher = crypto.encrypt(derived, PRIVATE_KEY_IV, x)
      if (cipher) encrypted.push(cipher)
    }

    if (type.toLowerCase() !== "credit" && type.toLowerCase() !== "debit") return fail(400, { message: "Invalid card type values!", success: false })
    
    const card = await supabase
      .from("card")
      .insert({ cardholder: encrypted[0], company: encrypted[1], digits: encrypted[2], last_digits: lastDigits, card_type: type.toLowerCase() })
      .select("id")

    if (card.data && card.data[0] && card.data[0].id) {
      const cardId = card.data[0].id
      
      async function insertCardId (v: object) {
        const { error, data } = await supabase.from("account").update(v).eq("user_id", userId)
        if (error) return fail(500, { message: "Internal server error, something occurred while linking card to account!", success: false })
        console.log("Successfully linked card to account!")
      }

      switch (type.toLowerCase()) {
        case "debit":
          return await insertCardId({ debit_card_id: cardId })
        case "credit":
          return await insertCardId({ credit_card_id: cardId }) 
      }
    }
  }
}
