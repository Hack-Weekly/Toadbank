import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

// trying to follow REST standards this time, since we are DELETIN user state it should be a delete endpoint

export const DELETE: RequestHandler = async ({ locals: { supabase } }) => {

  await supabase.auth.signOut()
  
  throw redirect(302, "/auth/login")
}
