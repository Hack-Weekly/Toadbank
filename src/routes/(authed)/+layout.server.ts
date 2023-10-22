import type { LayoutServerLoad } from "./$types"
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
    const session = await getSession()
    if (session === null) {
        throw redirect(307, '/auth/login'); 
    }
    return { session: session }
}
