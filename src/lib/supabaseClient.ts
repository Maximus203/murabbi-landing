import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

/**
 * Client Supabase côté navigateur, clé anon uniquement. Les écritures
 * autorisées par la clé anon sont bornées par RLS (table landing_suggestions,
 * insertion seule pour `anon`). Créé à la demande : sans variables publiques,
 * le site se construit quand même et le formulaire annonce qu'il n'est pas
 * encore ouvert.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  client ??= createClient(url, key)
  return client
}
