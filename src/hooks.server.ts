// src/hooks.server.ts
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public"
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit"
// @ts-ignore
import { redirect, type Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event,
    })

    const getSessionHelper = async () => {
        const { data: { session }} = await event.locals.supabase.auth.getSession()
        return session
    }

    event.locals.getSession = async () => await getSessionHelper()


    return resolve(event, {
        filterSerializedResponseHeaders(name) {
        return name === 'content-range'
        },
    })
}
