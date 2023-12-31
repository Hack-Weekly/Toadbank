import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ locals: { supabase }, request }) => {
    const { email, password } = Object.fromEntries(await request.formData()) as Record<string, string>
    if (!email) return fail(400, { message: 'Email is required', error: 'email' });
    if (!password) return fail(400, { message: "Password is required", error: "password" })

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) return fail(error.status as number, { message: error.message, success: false, email, error: "supabase" })

    throw redirect(303, "/")
  }
}
