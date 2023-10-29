import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

//@ts-ignore
export const load: PageServerLoad = async ({ params, locals: {supabase, getSession} }) => {

    const session = await getSession();
    if(!session) throw redirect(307, '/auth/login');
    const user = session.user;
    const { data: account_id, error: account_e} = await supabase.from("account").select("id").eq("user_id", user.id);
    if(account_id) console.log(account_id![0].id)
    const {data: contacts, error: contact_e} = await supabase.from("contact").select("*").eq("original_account_id", account_id![0].id);
    if(!contacts) return fail(400, {message: "Fail to retrieve contacts"})
    return { contacts }
}