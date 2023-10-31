import { error } from "@sveltejs/kit"
import { PRIVATE_KEY } from "$env/static/private"
import ServerCrypto from "./crypto"

export async function prepareDerived ({ getSession, supabase }: App.Locals): Promise<{ crypt: ServerCrypto, derived: string, userId: string }> {
  const session = await getSession()
  const userId = session!.user.id
  const hash = ServerCrypto.hash(userId)
  if (!hash) throw error(500, "Something went wrong when attempting to load cards!")
  const derived = ServerCrypto.deriveKey(PRIVATE_KEY, hash) 
  if (!derived) throw error(500, "Something went wrong during a critical process of the card retrieval operation!")

  return { crypt: ServerCrypto, derived, userId }
}
