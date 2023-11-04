import { prepareDerived } from "$lib/server/util";
import { PRIVATE_KEY_IV } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, locals: { getSession, supabase } }) => {
    const { cardholder, company, digits, type } = Object.fromEntries(await request.formData()) as Record<string, string> 
    // NOTE for card type, make sure a enum was created within the database to select strictly between credit or debit 
    const { crypt, derived, userId } = await prepareDerived({ getSession, supabase }) 
    const lastDigits = digits.slice(digits.length - 4, digits.length)
    const encrypted = []

    for (const x of [cardholder, company, digits]) {
      const cipher = crypt.encrypt(derived, PRIVATE_KEY_IV, x)
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
