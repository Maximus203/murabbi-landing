# Crédits des images — landing Murabbi

Toutes les images proviennent d'**Unsplash**, sous [licence Unsplash](https://unsplash.com/license) :
usage commercial autorisé, sans demande d'autorisation et **sans attribution obligatoire**.
Les crédits ci-dessous sont volontaires — c'est un usage correct envers les photographes,
et ça permet de retrouver la source en cas de question.

| Fichier | Source | Photographe | Sujet réel | Utilisé ? |
|---|---|---|---|---|
| `RECALE-parlement-budapest.webp` | https://unsplash.com/photos/Jsf6TznkFNc | à compléter | **Parlement de Budapest** vu du Danube au coucher du soleil — pas une mosquée | ❌ écarté |
| `RECALE-eglise-coupole-croix.webp` | https://unsplash.com/photos/UeJMhd3fMWs | à compléter | **Coupole surmontée d'une croix chrétienne** (église, cyprès méditerranéens) — pas une mosquée | ❌ écarté |
| `silhouette-desert.webp` | https://unsplash.com/photos/p8BM14LpLF0 | David Billings | Silhouette humaine seule sur une crête de dune, à l'aube | ✅ `index.html`, bandeau « Le rythme » |

## ⚠️ Deux fichiers ont été écartés — et renommés pour qu'on ne puisse plus s'y tromper

Vérification visuelle du 23/08/2026 : **aucun des deux n'est une mosquée.**

- `RECALE-parlement-budapest.webp` est le **Parlement hongrois de Budapest** (néo-gothique,
  reconnaissable), photographié depuis un ponton du Danube. Publier un monument
  parlementaire européen identifiable comme illustration d'ambiance sur Murabbi est au
  mieux un contresens culturel, au pire une erreur repérée par le premier visiteur qui
  connaît la ville.
- `RECALE-eglise-coupole-croix.webp` porte une **croix chrétienne** nettement visible au sommet de la
  coupole. C'est une église. La poser sur la landing d'une application de pratique
  musulmane serait une faute grave.

Les deux étaient nommés `mosquee-silhouette.*` et `mosquee-coucher.*`. Un nom pareil finit
toujours par être référencé de bonne foi par quelqu'un qui n'ouvre pas le fichier — et poser
une croix chrétienne sur la landing d'une application de pratique musulmane n'est pas une
coquille rattrapable. Ils portent donc désormais le nom de ce qu'ils montrent vraiment, avec
le préfixe `RECALE-` :

| Ancien nom (trompeur) | Nouveau nom |
|---|---|
| `mosquee-silhouette.jpg/.webp` | `RECALE-parlement-budapest.jpg/.webp` |
| `mosquee-coucher.jpg/.webp` | `RECALE-eglise-coupole-croix.jpg/.webp` |

Ils sont conservés comme sources mais **ne doivent pas être publiés**. Si un second visuel est
souhaité, repartir d'une recherche Unsplash ciblée (`mosque`, `minaret`, `masjid`) et
**regarder la photo** avant de la nommer.

## Pourquoi aucun visage identifiable

Choix délibéré. La licence Unsplash couvre le droit d'auteur du **photographe**, mais
elle ne garantit **pas** l'autorisation de diffusion des **personnes** photographiées
(pas de model release). Sur une page qui présente une pratique religieuse, afficher le
visage identifiable d'un inconnu poserait un problème juridique et humain réel.

L'image retenue porte donc une présence humaine forte — une silhouette seule dans la
lumière d'aube — sans visage reconnaissable. Elle est la seule des trois à porter une
présence humaine, et c'était la demande centrale.

Si une photo de personne identifiable devait être ajoutée un jour, il faudrait une
banque fournissant un **model release** explicite (Getty, Adobe Stock avec licence
étendue) ou une photo réalisée pour Murabbi avec autorisation écrite.

## Format

`silhouette-desert.webp` est encodé à la **résolution pleine de l'original (1600 × 2400)**,
qualité 72 → 44,2 Ko.

Une première version avait été réduite à 1200 × 1800 (34,0 Ko). C'était une fausse économie :
le bandeau est en pleine largeur, donc sur un écran 2× à 1440 px il faut 2880 px de large et
la source n'en fournissait que 1200 — un agrandissement ×2,4, silhouette visiblement molle.
En 1600 px l'agrandissement tombe à ×1,8, pour +11 Ko. C'est le maximum exploitable :
l'original Unsplash local fait 1600 px de large.

Les JPEG d'origine sont conservés dans ce dossier comme sources de retravail.
