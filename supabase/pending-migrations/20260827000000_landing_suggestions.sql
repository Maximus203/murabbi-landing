-- Table de suggestions de la landing page publique (murabbi.artist-dev.com/suggestions).
-- Ecriture anonyme directe depuis le site statique (cle anon), sans passe par un backend :
-- coherent avec l'architecture zero-backend de la landing (cf. next.config.ts).
--
-- Pas encore formalisee comme migration numerotee dans murabbi-admin-repo/supabase/migrations
-- (ce depot est en cours d'usage actif par d'autres sessions au moment ou ce DDL est applique
-- le 2026-08-27 -- cf. les migrations datees jusqu'au 30 aout deja presentes). A integrer
-- dans une migration en bonne et due forme des que ce depot est disponible.
--
-- Minimalisme volontaire des colonnes : la page de confidentialite publiee ne declare
-- collecter, pour ce formulaire, que le message et un email optionnel -- aucune IP, aucun
-- user-agent, aucun fingerprint.

create table if not exists public.landing_suggestions (
  id          uuid primary key default gen_random_uuid(),

  -- 'habit'       : suggestion d'une nouvelle habitude a ajouter au catalogue.
  -- 'improvement' : suggestion d'amelioration de l'application.
  kind        text not null
                check (kind in ('habit', 'improvement')),

  message     text not null
                check (length(btrim(message)) between 10 and 2000),

  -- Facultatif : ne sert qu'a recontacter la personne si elle le souhaite.
  email       text
                check (email is null or email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),

  status      text not null default 'new'
                check (status in ('new', 'reviewed', 'archived')),

  created_at  timestamptz not null default now()
);

comment on table public.landing_suggestions is
  'Suggestions d''habitudes ou d''ameliorations envoyees depuis le formulaire public de la '
  'landing page (/suggestions). Ecriture anonyme (cle anon), aucune lecture publique.';
comment on column public.landing_suggestions.kind is
  'habit (nouvelle habitude suggeree) | improvement (amelioration de l''application).';
comment on column public.landing_suggestions.status is
  'new (par defaut) | reviewed | archived -- triage manuel, pas d''interface admin dediee '
  'pour l''instant.';

alter table public.landing_suggestions enable row level security;

-- Ecriture anonyme uniquement : aucune policy SELECT/UPDATE/DELETE pour `anon` --
-- l'absence de policy est le refus (meme doctrine que home_cards, cf. migration
-- 20260830000000_home_cards.sql).
drop policy if exists "landing_suggestions_anon_insert" on public.landing_suggestions;
create policy "landing_suggestions_anon_insert"
  on public.landing_suggestions
  for insert
  to anon
  with check (true);

grant insert on public.landing_suggestions to anon;
