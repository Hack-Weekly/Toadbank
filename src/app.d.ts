// src/app.d.ts

import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from './DatabaseDefinitions'

declare global {

  interface IServerCrypto {
    encrypt(key: string, iv: string, data: string): string | null
    decrypt(key: string, iv: string, cipher: string): string | null
    deriveKey(key: string, iv: string, salt: string): string | null
    hash(data: string): string | null
  }

  interface ISupabaseCryptoOpeartions {
    supabase: SupabaseClient<Database>
  }

  namespace Resources {
    interface ICard {
      id: string
      cardholder: string
      company: string
      digits: string
      last_digits: number
      card_type: "debit" | "credit"
      created_at: string
    }
  }

  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>
      getSession(): Promise<Session | null>
    }
    interface PageData {
      session: Session | null
    }
    // interface Error {}
    // interface Platform {}
  }
}

export {}
