import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

//@ts-ignore
export const load: PageServerLoad = async ({ params, locals: {supabase, getSession} }) => {

    const session = await getSession();
    if(!session) throw redirect(307, '/auth/login');
    const user = session.user;
    const {data: account_id} = await supabase.from("account").select("account_id").eq("user_id", user.id); //current user account_id
    const {data, error} = await supabase.from("contact").select("*").eq("original_account_id", account_id![0].account_id); //all contacts that the user added

    if(error) return fail(400, {message: "Failed to load contacts"});

    return { data };
}