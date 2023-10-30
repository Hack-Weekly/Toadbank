import fastIBAN from "fast-iban"
import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions } from "./$types";
import currency_list from "$lib/currency_list.json";

export const actions: Actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {

        const session = await getSession();
        
        const { currency } = Object.fromEntries(await request.formData()) as Record<string, string>
        if (!currency_list.some(c => c.code === currency)) return fail(400, {message: "Invalid currency", success: false, error: "currency"})
        
        if(session !== null){
            const ibanCountryCode = currency.split("").slice(0, 2).join("")
            const { data, error } = await supabase
            .from('account')
            // note that the sketch iban lib asks for 2 values, bionic doesnt have a bank account so he does not know how this
            // works (yes this is my excuse)
            // so im just gonna add a uuid for the first param and the first 2 initials for country code ig?
            .update({ currency, iban: fastIBAN.generateIBAN(crypto.randomUUID(), ibanCountryCode) })
            .eq("user_id", session.user.id)
            
            if(error) return fail(400, {message: "Unable to input currency, please try again", success: false})
            else {
                await supabase
                .from('account')
                .update({"first_time": false})
                .eq("user_id", session.user.id)
            }
            throw redirect(307, '/')
            
        }
  }
}