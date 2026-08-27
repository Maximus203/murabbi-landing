-- Ajout de la colonne category a landing_suggestions.
-- Pertinente uniquement pour kind='habit' (a quelle categorie du catalogue
-- rattacher l'habitude suggeree) -- vide pour kind='improvement'. Choisie
-- parmi les 9 categories systeme existantes (public.categories where
-- is_system = true : Mental, Nutrition, Religion, Sante, Social, Sommeil,
-- Spiritualite, Sport, Suivi) ou saisie librement si aucune ne correspond --
-- pas de contrainte de liste fermee en base, la liste "connue" n'est que
-- l'UI du formulaire (statique, coherente avec l'archi zero-backend du site).

alter table public.landing_suggestions
  add column if not exists category text;

alter table public.landing_suggestions
  drop constraint if exists landing_suggestions_category_length_check;
alter table public.landing_suggestions
  add constraint landing_suggestions_category_length_check
  check (category is null or length(btrim(category)) between 1 and 60);

comment on column public.landing_suggestions.category is
  'Categorie du catalogue pour une suggestion d''habitude (kind=''habit'') -- '
  'nom d''une categorie systeme existante, ou une nouvelle proposee en texte '
  'libre. NULL pour kind=''improvement''.';
