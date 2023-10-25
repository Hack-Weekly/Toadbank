import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

// NOTE I HAVE NOT TESTED THIS YET BECAUSE I IMPLEMENTED IT BEFORE DECRYPTION AND LOADING OF CARDS
// WILL AFTERWARDS


export const DELETE: RequestHandler = async ({ url, locals: { supabase, getSession } }) => {
  try {
    const cardId = url.searchParams.get("cid") // card id
    if (!cardId) throw new Error("Missing resource to delete!")
        
    const { data } = await supabase.from("card")
      .delete()
      .eq("id", cardId)
      .select()
    if (!data || !data[0] || !data[0].card_type) throw new Error("Could not aquire card type!")
    const cardType = data[0].card_type 
    async function deleteCardFromAccount (v: object) {
      const session = await getSession()
      const userId = session!.user.id
      const { error } = await supabase.from("account").update(v).eq("user_id", userId)
      throw error
    }


    switch (cardType) {
      case "debit":
        await deleteCardFromAccount({ debit_card_id: null })
        break
      case "credit":
        await deleteCardFromAccount({ credit_card_id: null })
        break
    }

    throw redirect(302, "/card/add-new")
  } catch (e) {
      return new Response(`${e}`)
  }
}
