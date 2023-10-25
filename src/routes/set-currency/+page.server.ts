import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {

        const session = await getSession();
        console.log(session);
        const { currency } = Object.fromEntries(await request.formData()) as Record<string, string>
        console.log(currency);
        if(session !== null){
            const { data, error } = await supabase
            .from('account')
            .update({ currency: currency })
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