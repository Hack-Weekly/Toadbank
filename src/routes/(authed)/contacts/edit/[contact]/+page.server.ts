import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

//@ts-ignore
export const load: PageServerLoad = async ({ params, locals: {supabase, getSession} }) => {

    const { session } = await getSession();
    if(!session) throw redirect(307, "/");

    const { data: user} = session.user;
    const {data: account_id} = await supabase.from("account").select("id").eq("user_id", user.id); //retrieve the current user account_id
    if(!account_id) return fail(400, {message: "Failed retrieving account data"});
    const { data: contact } = await supabase.from("contacts").select("*").eq("original_account_id", account_id[0].id).eq("name", params.contact); //filter out the contact name
    if(!contact) return fail(400, {message: "Failed retrieving contact information"});
    
    return { contact }
}