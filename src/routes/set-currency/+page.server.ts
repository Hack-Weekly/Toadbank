import fastIBAN from "fast-iban"
import Currencies from "$lib/server/currencies";
import { fail, redirect, error } from '@sveltejs/kit';
import currency_list from "$lib/currency_list.json";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {

        const session = await getSession();
        
        const { currency } = Object.fromEntries(await request.formData()) as Record<string, string>
        if (!currency_list.some(c => c.code === currency)) return fail(400, {message: "Invalid currency", success: false, error: "currency"})
        
        if(session !== null) {
            const { data: accountData } = await supabase.from("account").select("balance, currency").eq("user_id", session.user.id)
            let converted: number = 0
            if (accountData && accountData[0]) {
              // get default currency which is set 
              console.log(accountData[0].balance)
              const from = Currencies.setDineroObject(accountData[0].balance as number, accountData[0].currency as AvailableCurrencies)
              console.log(from)
                if (from) {
                   converted = Currencies.conversion(from, currency as AvailableCurrencies)
                   console.log(converted)
                }
            }
            const ibanCountryCode = currency.split("").slice(0, 2).join("")
            const { data, error } = await supabase
            .from('account')
            .update({ currency, balance: converted, iban: fastIBAN.generateIBAN(crypto.randomUUID(), ibanCountryCode) })
            .eq("user_id", session.user.id)
            
            if(error) return fail(400, {message: "Unable to input currency, please try again", success: false})
            // 1. Loop over the currencies and see which compares with the one the user has, then using the Currencies class
            // I built, update the default amount to the converted amount 
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
