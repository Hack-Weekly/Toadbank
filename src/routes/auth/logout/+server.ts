import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

// trying to follow REST standards this time, since we are DELETIN user state it should be a delete endpoint

export const DELETE: RequestHandler = async ({ locals: { supabase } }) => {

  await supabase.auth.signOut()
  return json({ status: 302, url: "/card/add-new" })  
}
