# `.well-known/` — emplacement réservé

Ce dossier est l'emplacement servi à la racine du domaine pour les fichiers de
vérification. Il est volontairement **vide de tout fichier de production**.

## `assetlinks.json` — à écrire plus tard, pas maintenant

Les liens profonds Android (Digital Asset Links) exigent que le domaine serve
`https://<domaine>/.well-known/assetlinks.json` contenant l'empreinte **SHA-256
de la clé de signature de production** de l'application.

**Ce fichier n'est pas écrit ici parce que cette empreinte n'existe pas encore** :
aucune clé de signature de release n'a été générée pour Murabbi. Écrire le
fichier avec une empreinte inventée ou celle de la clé de debug casserait la
vérification côté Google et donnerait des liens profonds silencieusement
inopérants.

### Ce qu'il faudra faire, le jour venu

1. Générer (ou récupérer depuis Play App Signing) la clé de signature de release.
2. Relever son empreinte :
   `keytool -list -v -keystore <release.keystore> -alias <alias>`
   → ligne `SHA256:`
   Si Play App Signing est activé, prendre l'empreinte affichée dans
   *Play Console → Configuration → Intégrité de l'application*, qui est celle de
   la clé réellement utilisée pour signer les binaires distribués.
3. Créer `assetlinks.json` dans ce dossier, avec le `package_name` réel de
   l'application Flutter (cf. `murabbi-mobile/android/app/build.gradle`) et
   l'empreinte relevée.
4. Servir le fichier en `Content-Type: application/json`, en **HTTPS**, sans
   redirection, et vérifier avec l'API officielle de test des Digital Asset
   Links avant d'annoncer les liens profonds.

### Contraintes d'hébergement à ne pas oublier

- Le dossier commence par un point : certains hébergeurs statiques l'ignorent ou
  le traitent comme caché. Vérifier que le fichier est bien servi en production.
- Aucune redirection (301/302) sur ce chemin : la vérification échoue.
