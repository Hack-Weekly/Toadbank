// src/hooks.server.ts
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public"
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit"
import { redirect, type Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  })

  const getSessionHelper = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  event.locals.getSession = async () => await getSessionHelper()

  const path = event.url.pathname

  if (path.startsWith("/auth/register") || path.startsWith("/auth/login")) {
    const session = await getSessionHelper()
    if (session !== null) throw redirect(302, "/dashboard")
  }

  if (path.startsWith("/auth/logout") || path.startsWith("/dashboard")) {
    const session = await getSessionHelper()
    if (session === null) throw redirect(301, "/auth/register")
  }



  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}
