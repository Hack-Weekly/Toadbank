import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {

        const session = await getSession();
        console.log(session);
        const { currency, password } = Object.fromEntries(await request.formData()) as Record<string, string>
        console.log(currency);
        if(session !== null){
            const { data, error } = await supabase
            .from('account')
            .insert({ user_id: session.user.id, currency: currency })
            console.log(data);
            console.log(error);
            const { data: data1, error: e } = await supabase
            .from('account')
            .select()
            console.log(data1);
            console.log(e);
        }
  }
}