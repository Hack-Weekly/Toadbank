import { error, fail } from "@sveltejs/kit";
import { PRIVATE_KEY_IV } from "$env/static/private";
import { prepareDerived } from "$lib/server/util";
import type { PageServerLoad } from "../../$types";
import type { Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url, locals: { getSession, supabase } }) => {
  const cid = url.searchParams.get("cid") || null
  const { error: err, data } = await supabase.from("card").select().eq("id", cid)
  
  if (err) console.error(err)

  if (!data || !data![0]) throw error(404, { message: "Card Not Found!" })
  const card = data[0] as Resources.ICard
  const { crypt, derived } = await prepareDerived({ getSession, supabase })
  // I hate ts ignoring more than anyone on this planet trust me bro. But there comes some times
  // when you simply say, fuck the compiler
  function decryptField (field: keyof Resources.ICard) {
    // @ts-ignore
    const decrypted = crypt.decrypt(derived, PRIVATE_KEY_IV, card[field])
    if (decrypted && typeof decrypted === "string") {
      // @ts-ignore
      card[field] = decrypted
    }
  }
   
  for (const field of ["digits", "company", "cardholder"] as (keyof Resources.ICard)[]) {
    decryptField(field);
  }

  return { card }
}

export const actions: Actions = {
  default: async ({ url, request, locals: { getSession, supabase } }) => {
    const { cardholder, company, digits } = Object.fromEntries(await request.formData()) as Record<string, string>

    const { crypt, derived } = await prepareDerived({ getSession, supabase })
        
    const cid = url.searchParams.get("cid") || null

    if (!cid) throw error(404, { message: "No given card id!" })

    async function encryptField (field: string, data: string) {
      if (data) {
        const encrypted = crypt.encrypt(derived, PRIVATE_KEY_IV, data)
        const { error, data: c } = await supabase.from("card").update({ [field]: encrypted }).eq("id", cid)
        console.log(c)
        if (error) return fail(500, { message: error.message, success: false })
        console.log(`Updated field ${field} for card ${cid}`)
      }
    }

    
    const fields =  [{f: "cardholder", v: cardholder}, {f:"company", v: company }, { f: "digits", v: digits }] 

    for (const field of fields) {
      encryptField(field.f, field.v)
    }

    return `Successfully updated card ${cid}`

  }
}
