import type { LayoutServerLoad } from "./$types"
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
    const session = await getSession()
    if (session) throw redirect(307, '/'); 
    return { session }
}
