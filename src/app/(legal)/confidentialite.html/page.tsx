import type { Metadata } from 'next'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Murabbi',
  description: 'Quelles données Murabbi collecte, pourquoi, et comment les supprimer.',
  robots: { index: false, follow: true },
}

export default function ConfidentialitePage() {
  return (
    <>
      <p className={styles.eyebrow}>Confidentialité</p>
      <h1 className={styles.h1}>Politique de confidentialité</h1>
      <p className={styles.meta}>Dernière mise à jour : 30 septembre 2026</p>

      <p className={styles.lead}>
        Cette page explique quelles données Murabbi enregistre, pourquoi, combien de temps elles
        sont gardées, qui peut les voir et comment les supprimer. Elle décrit l&apos;application
        à la date ci-dessus.
      </p>

      <h2 className={styles.h2}>Qui est responsable de ces données</h2>
      <p>
        Murabbi est développée par El Hadji Ahmadou Cherif Diouf (Artist Digital), basé à Dakar,
        Sénégal. Pour toute question sur tes données ou pour exercer tes droits, écris à{' '}
        <a href="mailto:el.hadji.ahmadou.cherif.diouf@gmail.com">
          el.hadji.ahmadou.cherif.diouf@gmail.com
        </a>
        .
      </p>

      <h2 className={styles.h2}>Les données que Murabbi enregistre</h2>

      <div className={styles.card}>
        <strong>Compte</strong>
        <p>
          Ton e-mail, ton mot de passe, ton prénom, ton nom si tu le donnes, ton genre, ta date de
          naissance si tu la donnes, et ton pseudo. Tu te connectes avec ton e-mail et ton mot de
          passe. Ces informations servent à créer ton compte, à te connecter et à personnaliser
          l&apos;app. Elles sont stockées chez Supabase, notre hébergeur de base de données. Ton
          mot de passe y est gardé sous une forme que personne ne peut relire.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Localisation</strong>
        <p>
          Ta position sert à calculer les horaires de prière de ton lieu. Pour que tu retrouves
          tes réglages après une réinstallation ou sur un nouveau téléphone, deux informations
          sont enregistrées sur ton compte (Supabase), sans que tu aies un geste à faire :
        </p>
        <ul>
          <li>
            <strong>la position de calcul de tes prières</strong>,{' '}
            <strong>arrondie à environ 1&nbsp;km</strong>, avec ta méthode de calcul, ton école et
            ta règle de haute latitude. Chaque prière ou habitude que tu enregistres garde la
            position de calcul et le fuseau horaire utilisés ce jour-là ;
          </li>
          <li>
            <strong>ton domicile</strong>, si tu le renseignes dans les réglages : ses coordonnées
            à environ 100&nbsp;m près et un libellé du type « quartier, ville ». C&apos;est
            presque ton adresse. Il sert à savoir si tu es chez toi, pour les habitudes qui se
            déclenchent quand tu es hors de chez toi.
          </li>
        </ul>
        <p>
          <strong>Mise à jour automatique.</strong> Dans les versions de l&apos;application où
          cette fonction est active, et si tu as autorisé la localisation, Murabbi relit la
          position de ton téléphone quand tu ouvres l&apos;application ou que tu y reviens, en
          général au plus une fois toutes les 10 minutes. Si ton téléphone s&apos;est déplacé
          d&apos;au moins 20&nbsp;km depuis la lecture précédente, ou s&apos;il n&apos;y en a pas
          encore eu, Murabbi compare sa position à celle de ton compte. Si elles sont à 20&nbsp;km
          ou plus l&apos;une de l&apos;autre, ou dans deux fuseaux horaires différents, la
          position de calcul de tes prières est remplacée par celle de ton téléphone, arrondie à
          environ 1&nbsp;km, et enregistrée sur ton compte sans que tu aies à confirmer. Si tu as
          choisi toi-même un autre lieu et que ton téléphone ne bouge pas de 20&nbsp;km, ton choix
          reste. Murabbi ne lit jamais ta position en arrière-plan et ne te demande aucune
          autorisation de plus pour cela. Pour l&apos;arrêter, retire l&apos;accès à la
          localisation de Murabbi dans les réglages de ton téléphone.
        </p>
        <p>
          <strong>Historique.</strong> Chaque changement de position de calcul ou de domicile est
          aussi conservé, avec sa date, dans l&apos;historique de ton compte. Modifier ou retirer
          ton domicile dans l&apos;application ne l&apos;efface donc pas de cet historique. Il
          disparaît avec la suppression de ton compte.
        </p>
        <p>
          Ces informations sont dans un espace de la base de données réservé à ton compte. En
          dehors de toi, seules les personnes qui administrent la base de données peuvent les
          lire. Le back-office de Murabbi n&apos;a aucun écran qui les affiche.
        </p>
        <p>
          Pour chercher un lieu, le texte que tu tapes est envoyé à{' '}
          <strong>Nominatim (OpenStreetMap)</strong>. Pour afficher le nom d&apos;une ville, la
          position de ton téléphone lui est envoyée telle qu&apos;elle est, sans arrondi, quand tu
          touches « Me localiser » et à chaque mise à jour automatique. Le libellé de ton domicile
          lui est demandé avec une position arrondie à environ 100&nbsp;m. Les cartes viennent
          aussi d&apos;OpenStreetMap : ses serveurs voient la zone que tu regardes et
          l&apos;adresse IP de ton téléphone. Ces échanges se font directement entre ton téléphone
          et OpenStreetMap, sans passer par Murabbi.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Pause menstruelle et profil privé</strong>
        <p>
          Si tu déclares une pause menstruelle dans les réglages, cette information est chiffrée
          et stockée <strong>uniquement sur ton appareil</strong> (Keystore Android, Keychain
          iOS). Elle n&apos;est <strong>jamais envoyée à nos serveurs</strong>, elle ne suit pas
          ton compte sur un nouveau téléphone, et personne d&apos;autre que toi ne peut la voir.
        </p>
        <p>
          Il en va de même pour ce que tu confies sur ton état d&apos;esprit pendant la
          configuration (profil privé).
        </p>
      </div>

      <div className={styles.card}>
        <strong>Habitudes, prières et progression</strong>
        <p>
          Ton journal d&apos;habitudes (avec les titres et les sous-tâches que tu écris toi-même),
          tes validations de prière et de prières surérogatoires, tes points, ton niveau, et
          quelques réglages (thème, lecture de l&apos;arabe) sont stockés sur nos serveurs
          (Supabase) pour fonctionner d&apos;un appareil à l&apos;autre. La section « Qui peut
          voir tes données » dit qui y a accès.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Notifications</strong>
        <p>
          Un identifiant technique (jeton Firebase Cloud Messaging) est enregistré sur ton compte,
          avec le système de ton téléphone (Android ou iOS) et la version de l&apos;application. Il
          permet d&apos;envoyer des notifications depuis nos serveurs. Tes rappels d&apos;habitudes
          et de prières sont programmés sur ton téléphone : ils ne passent ni par ce jeton ni par
          nos serveurs. Le jeton est retiré quand tu te déconnectes et n&apos;est utilisé à aucune
          fin publicitaire.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Rapports d&apos;erreurs</strong>
        <p>
          Quand l&apos;application plante ou rencontre une erreur, un rapport technique est envoyé
          à <strong>Sentry</strong>, un service indépendant. Il contient le type d&apos;erreur, la
          trace technique, la version de l&apos;application, le modèle de ton téléphone et la
          version de son système. L&apos;application n&apos;y ajoute pas ton compte. En revanche, le
          message d&apos;erreur peut, dans certains cas, contenir des morceaux des données que
          l&apos;application manipulait au moment de l&apos;échec, comme une position, un e-mail ou
          un identifiant. Rien ne garantit que ce soit toujours exclu. Ces rapports servent
          uniquement à corriger les erreurs.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Sauvegarde de ton téléphone</strong>
        <p>
          La sauvegarde automatique d&apos;Android ou d&apos;iCloud peut copier une partie des
          données de l&apos;application (réglages, historique gardé sur le téléphone) dans ton
          compte Google ou Apple. Tu peux la désactiver dans les réglages de ton téléphone.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Site web</strong>
        <p>
          Si tu envoies une suggestion depuis le site, ton message, sa catégorie et ton e-mail
          (facultatif, pour te répondre) sont enregistrés chez Supabase. Ces suggestions ne sont
          pas reliées à ton compte : pour en faire supprimer une, écris à l&apos;adresse ci-dessus.
          Le site charge ses polices depuis Google Fonts : Google voit alors l&apos;adresse IP de
          ton appareil. Vercel, qui héberge le site, voit aussi l&apos;adresse IP des visiteurs.
          Le site ne contient aucun outil de mesure d&apos;audience.
        </p>
      </div>

      <h2 className={styles.h2}>Qui peut voir tes données</h2>
      <ul>
        <li>
          <strong>Tous les utilisateurs connectés de Murabbi</strong> voient ton pseudo, tes
          points de la semaine, ton rang et ton total de points dans le classement, dès que tu as
          marqué des points dans la semaine. Aujourd&apos;hui, tu ne peux pas choisir de ne pas y
          figurer.
        </li>
        <li>
          <strong>Les membres de ton cercle</strong>, si tu en rejoins un, voient ton pseudo, ton
          niveau, ta date d&apos;arrivée et ton rôle dans le cercle. Si tu as accepté le
          récapitulatif de la semaine, ils voient aussi tes prières à l&apos;heure, tes habitudes
          faites, tes points et ta série de la semaine. Chaque autorisation se donne et se retire
          séparément.
        </li>
        <li>
          <strong>L&apos;équipe qui administre Murabbi</strong> voit dans le back-office, et peut
          exporter, les informations de ton compte (e-mail, prénom, nom, pseudo, genre, date de
          naissance) et ta progression (niveau, série, points). Elle s&apos;en sert pour
          t&apos;aider et pour traiter les signalements.
        </li>
        <li>
          <strong>Les personnes qui administrent la base de données</strong> ont accès, de fait, à
          tout ce qui y est stocké, y compris les données de la section « Localisation ».
        </li>
      </ul>

      <h2 className={styles.h2}>Les services qui interviennent</h2>
      <ul>
        <li>Supabase : comptes, réglages et progression.</li>
        <li>Firebase Cloud Messaging (Google) : notifications.</li>
        <li>Sentry : rapports d&apos;erreurs.</li>
        <li>OpenStreetMap (Nominatim et cartes) : noms de lieux et cartes.</li>
        <li>Google Fonts : la police des titres, téléchargée au premier lancement.</li>
        <li>Vercel : hébergement du site.</li>
        <li>
          Resend : envoi des e-mails de service. Il reçoit ton adresse e-mail et ton pseudo.
        </li>
        <li>
          Wave et Orange Money : si tu choisis de contribuer, le paiement se fait chez eux.
        </li>
      </ul>
      <p>
        Comme pour tout service en ligne, chacun de ces services voit l&apos;adresse IP de la
        connexion qui le contacte.
      </p>

      <h2 className={styles.h2}>Ce que nous ne faisons jamais</h2>
      <ul>
        <li>Nous ne vendons aucune donnée à des tiers.</li>
        <li>Nous n&apos;utilisons pas tes données à des fins publicitaires.</li>
        <li>Nous ne partageons jamais ta donnée de pause menstruelle, avec personne.</li>
      </ul>

      <h2 className={styles.h2}>Combien de temps tes données sont gardées</h2>
      <p>
        Tant que ton compte existe. Si tu supprimes ton compte depuis les réglages de
        l&apos;app, il est désactivé tout de suite : tu ne peux plus t&apos;y connecter. Ses
        données sont <strong>effacées après 30 jours</strong>. Pendant ces 30 jours, ton pseudo
        et ton niveau peuvent encore apparaître dans le classement et dans ton cercle.
      </p>
      <p>
        Si tu changes d&apos;avis pendant ces 30 jours, écris à{' '}
        <a href="mailto:el.hadji.ahmadou.cherif.diouf@gmail.com">
          el.hadji.ahmadou.cherif.diouf@gmail.com
        </a>{' '}
        depuis l&apos;adresse de ton compte : la suppression peut être annulée. Passé le délai,
        ton compte ne peut plus être restauré.
      </p>
      <p>
        Les sauvegardes chiffrées de la base de données, faites chaque jour, ne sont pas purgées
        aujourd&apos;hui : elles peuvent garder une copie de tes données après l&apos;effacement.
        Elles ne servent qu&apos;à restaurer la base après un incident.
      </p>
      <p>
        Tu peux aussi demander la suppression de ton compte par e-mail à la même adresse si tu
        n&apos;as pas accès à l&apos;app.
      </p>

      <h2 className={styles.h2}>Tes droits</h2>
      <p>
        Tu peux à tout moment demander l&apos;accès, la rectification ou la suppression de tes
        données, en écrivant à{' '}
        <a href="mailto:el.hadji.ahmadou.cherif.diouf@gmail.com">
          el.hadji.ahmadou.cherif.diouf@gmail.com
        </a>
        .
      </p>

      <h2 className={styles.h2}>Âge minimum</h2>
      <p>Murabbi n&apos;est pas destinée aux personnes de moins de 13 ans.</p>

      <h2 className={styles.h2}>Modifications de cette politique</h2>
      <p>
        Si cette politique change, la date de mise à jour en haut de cette page sera actualisée.
        En cas de changement important, tu seras informé·e dans l&apos;app.
      </p>

      <hr className={styles.rule} />
      <p>
        <a href="/cgu.html">Voir aussi les conditions d&apos;utilisation →</a>
      </p>
    </>
  )
}
