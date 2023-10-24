import type { LayoutServerLoad } from "./$types"
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (session === null) {
        throw redirect(307, '/auth/login'); 
    }
    const {data, error} = await supabase
    .from("account")
    .select("first_time")
    .eq("user_id", session.user.id)
    if(data![0].first_time) {
        throw redirect(307, '/set-currency');
    }
    
    return { session: session }
}
