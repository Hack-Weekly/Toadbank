import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

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
      if (error) throw error 
    }


    switch (cardType) {
      case "debit":
        await deleteCardFromAccount({ debit_card_id: null })
        break
      case "credit":
        await deleteCardFromAccount({ credit_card_id: null })
        break
    }

    console.log("redirecting")

    return json({ status: 302, url: "/card/add-new" })
  } catch (e) {
      console.log("error", e)
      return new Response(`${e}`)
  }
}
