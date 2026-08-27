import { createClient } from '@supabase/supabase-js'

/**
 * Client Supabase cote navigateur, cle anon uniquement. Le site reste un
 * export statique sans backend (cf. next.config.ts) : les ecritures
 * autorisees par la cle anon sont bornees par RLS (voir la table
 * landing_suggestions, insertion seule pour `anon`).
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
