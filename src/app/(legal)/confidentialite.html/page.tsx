import type { Metadata } from 'next'
import { LegalDoc } from '@/components/LegalDoc'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Murabbi',
  description: 'Quelles données Murabbi collecte, pourquoi, et comment les supprimer.',
  robots: { index: false, follow: true },
}

export default function ConfidentialitePage() {
  return (
    <LegalDoc>
      <p className={styles.eyebrow}>Confidentialité</p>
      <h1 className={styles.h1}>Politique de confidentialité</h1>
      <p className={styles.meta}>Dernière mise à jour : 16 novembre 2026</p>

      <p className={styles.lead}>
        Cette page explique quelles données Murabbi enregistre, pourquoi, combien de temps elles
        sont gardées, qui peut les voir et comment les supprimer. Elle décrit l&apos;application
        à la date ci-dessus.
      </p>

      <h2 id="en-resume" className={styles.h2}>En résumé</h2>
      <p>
        Voici, en une liste, tout ce que Murabbi peut enregistrer sur ton compte. Le détail de
        chaque point est dans les sections suivantes.
      </p>
      <ul>
        <li><strong>Nom et prénom</strong>, <strong>adresse e-mail</strong>, <strong>pseudo</strong> et identifiant de ton compte.</li>
        <li><strong>Genre</strong> et <strong>date de naissance</strong> (facultative).</li>
        <li><strong>Position approximative</strong> (le lieu de calcul de tes prières, à environ 1&nbsp;km) et <strong>position précise</strong> (ton domicile, à environ 100&nbsp;m, si tu le renseignes).</li>
        <li><strong>Pratique religieuse</strong> : tes prières, tes habitudes, tes lectures du Coran. Ce sont des croyances religieuses au sens de la loi : elles servent uniquement à faire marcher l&apos;application.</li>
        <li><strong>Santé</strong> : deux nombres entre 0 et 21, dérivés de ta pause des règles si tu en déclares une. Rien d&apos;autre sur ta santé ne quitte ton téléphone.</li>
        <li><strong>Contenu que tu écris</strong> : les titres et sous-tâches de tes habitudes, tes favoris et leurs étiquettes, les mots que tu envoies à ton cercle.</li>
        <li><strong>Usage de l&apos;application</strong> : tes validations, tes points, ton niveau, ta série, ton rang au classement.</li>
        <li><strong>Identifiants techniques</strong> : un identifiant propre à l&apos;installation de l&apos;application sur ton téléphone et le jeton de notification.</li>
        <li><strong>Rapports d&apos;erreurs</strong> : type d&apos;erreur, version de l&apos;application, modèle et système du téléphone, sans ton compte.</li>
      </ul>
      <p>
        Tout est transmis par une connexion chiffrée. Rien n&apos;est vendu, rien n&apos;est partagé
        à des fins de publicité, aucune donnée n&apos;est utilisée pour te suivre d&apos;une
        application à l&apos;autre. Tu peux demander la suppression de tout ou partie de ces
        données à tout moment (voir «&nbsp;Combien de temps tes données sont gardées&nbsp;»).
      </p>

      <h2 id="qui-est-responsable-de-ces-donnees" className={styles.h2}>Qui est responsable de ces données</h2>
      <p>
        Murabbi est développée par El Hadji Ahmadou Cherif Diouf (Artist Digital), basé à Dakar,
        Sénégal. Pour toute question sur tes données ou pour exercer tes droits, écris à{' '}
        <a href="mailto:el.hadji.ahmadou.cherif.diouf@gmail.com">
          el.hadji.ahmadou.cherif.diouf@gmail.com
        </a>
        .
      </p>

      <h2 id="les-donnees-que-murabbi-enregistre" className={styles.h2}>Les données que Murabbi enregistre</h2>

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
          <strong>Mise à jour automatique (application ouverte).</strong> Si tu as autorisé la
          localisation, Murabbi relit la position de ton téléphone quand tu ouvres
          l&apos;application ou que tu y reviens, en général au plus une fois toutes les 10
          minutes. Si ton téléphone s&apos;est déplacé d&apos;au moins 20&nbsp;km depuis la lecture
          précédente, ou s&apos;il n&apos;y en a pas encore eu, Murabbi compare sa position à celle
          de ton compte. Si elles sont à 20&nbsp;km ou plus l&apos;une de l&apos;autre, ou dans
          deux fuseaux horaires différents, la position de calcul de tes prières est remplacée par
          celle de ton téléphone, arrondie à environ 1&nbsp;km, et enregistrée sur ton compte sans
          que tu aies à confirmer. Si tu as choisi toi-même un autre lieu et que ton téléphone ne
          bouge pas de 20&nbsp;km, ton choix reste. Pour arrêter cette lecture, retire l&apos;accès
          à la localisation de Murabbi dans les réglages de ton téléphone.
        </p>
        <p>
          <strong>Rappels liés au domicile ou au voyage (en arrière-plan, uniquement si tu les
          actives).</strong> Murabbi ne lit pas ta position en continu. Si tu actives, dans les
          réglages, un rappel qui dépend de ton domicile ou d&apos;un voyage, l&apos;application
          t&apos;explique pourquoi, puis te demande l&apos;autorisation de localisation
          «&nbsp;Toujours&nbsp;». Une fois accordée, c&apos;est le système de ton téléphone
          (Android ou iOS) qui surveille la zone autour de ton domicile, et une zone plus large
          autour de lui pour le voyage, et qui signale à Murabbi quand tu y entres ou en sors, même
          si l&apos;application est fermée. Le signal indique seulement «&nbsp;entré&nbsp;» ou
          «&nbsp;sorti&nbsp;», avec l&apos;heure : il ne contient aucune coordonnée et n&apos;est
          pas envoyé à nos serveurs. La zone surveillée est enregistrée sur ton téléphone et
          n&apos;est pas incluse dans la sauvegarde Android. L&apos;alerte peut arriver avec du
          retard. Pour arrêter : désactive le rappel dans les réglages ou retire l&apos;autorisation
          «&nbsp;Toujours&nbsp;» dans les réglages de ton téléphone ; tout le reste de
          l&apos;application continue de fonctionner.
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
          <strong>Services de cartes.</strong> Pour chercher un lieu, le texte que tu tapes est
          envoyé à <strong>Nominatim (OpenStreetMap)</strong>. Pour afficher le nom d&apos;une
          ville, la position de ton téléphone lui est envoyée telle qu&apos;elle est, sans arrondi,
          quand tu touches «&nbsp;Me localiser&nbsp;» et à chaque mise à jour automatique. Le
          libellé de ton domicile lui est demandé avec une position arrondie à environ
          100&nbsp;m. Les cartes viennent aussi d&apos;OpenStreetMap : ses serveurs voient la zone
          que tu regardes et l&apos;adresse IP de ton téléphone. Ces échanges se font directement
          entre ton téléphone et OpenStreetMap, sans passer par Murabbi.
        </p>
        <p>
          La direction de la qibla est calculée sur ton téléphone avec sa boussole : rien n&apos;en
          part.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Pause des règles, période et prières à rattraper</strong>
        <p>
          Si tu déclares une pause ou une période dans les réglages, les dates, le motif,
          l&apos;historique de tes périodes passées et la liste «&nbsp;À rattraper&nbsp;» qui en
          découle sont chiffrés et stockés <strong>uniquement sur ton appareil</strong> (Keystore
          Android, Keychain iOS). Ils ne sont <strong>pas envoyés à nos serveurs</strong>, ne
          suivent pas ton compte sur un nouveau téléphone, ne sont pas copiés par la sauvegarde
          automatique d&apos;Android, et personne d&apos;autre que toi ne peut les voir.
        </p>
        <p>
          <strong>Une seule information en est dérivée et part au serveur : deux nombres entre 0
          et 21</strong>, le nombre de jours dispensés dans les 21 derniers jours et le nombre de
          Fajr réalisés les jours non dispensés. Ils servent uniquement à calculer ton palier
          d&apos;habitudes. Aucune date, aucun motif ni aucun intervalle n&apos;est transmis. Ces
          deux nombres touchent à ta santé : nous les traitons comme telles et ils sont rattachés
          à ton compte. Tu peux effacer les données de ton appareil avec «&nbsp;oublier&nbsp;» dans
          les réglages ; l&apos;effacement de ces deux nombres sur le serveur est alors demandé et
          repris dès que tu es en ligne.
        </p>
        <p>
          Il en va de même pour ce que tu confies sur ton état d&apos;esprit pendant la
          configuration (profil privé) : il reste sur ton appareil.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Habitudes, prières et progression</strong>
        <p>
          Ton journal d&apos;habitudes (avec les titres et les sous-tâches que tu écris toi-même),
          tes validations de prière et de prières surérogatoires, tes points, ton niveau, et
          quelques réglages (thème, lecture de l&apos;arabe) sont stockés sur nos serveurs
          (Supabase) pour fonctionner d&apos;un appareil à l&apos;autre. Ces données révèlent ta
          pratique religieuse : elles ne sont jamais utilisées à d&apos;autres fins que le
          fonctionnement de l&apos;application. La section «&nbsp;Qui peut voir tes données&nbsp;»
          dit qui y a accès.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Lecteur du Coran</strong>
        <p>
          Pour afficher les pages du Coran, l&apos;application télécharge des polices et des pages
          depuis les serveurs de la <strong>Quran Foundation</strong> (verses.quran.foundation),
          qui voient alors l&apos;adresse IP de ton téléphone. Tes favoris, leurs étiquettes et ta
          progression de lecture sont enregistrés d&apos;abord sur ton téléphone, puis envoyés à
          ton compte (Supabase) pour que tu les retrouves ailleurs.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Ton téléphone et ton compte</strong>
        <p>
          Chaque installation de Murabbi crée un identifiant aléatoire, sans lien avec ton
          téléphone ni avec ton identité publicitaire. Il est enregistré sur ton compte pour que
          Murabbi sache sur quel appareil tes données sont à jour : un seul appareil est actif à la
          fois, et en te connectant sur un autre, tu déconnectes le précédent. Cet identifiant n&apos;est
          utilisé à aucune autre fin.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Notifications</strong>
        <p>
          Un identifiant technique (jeton Firebase Cloud Messaging) est enregistré sur ton compte,
          avec le système de ton téléphone (Android ou iOS) et la version de l&apos;application. Il
          permet d&apos;envoyer des notifications depuis nos serveurs, par exemple un mot de ton
          cercle. Tes rappels d&apos;habitudes et de prières sont programmés sur ton téléphone :
          ils ne passent ni par ce jeton ni par nos serveurs. Le jeton est retiré quand tu te
          déconnectes et n&apos;est utilisé à aucune fin publicitaire.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Voix des rappels</strong>
        <p>
          Pour varier les voix de tes rappels, l&apos;application télécharge de petits fichiers
          audio depuis le stockage de Supabase. Ces fichiers sont les mêmes pour tout le monde :
          aucune donnée de ton compte n&apos;est envoyée pour les obtenir, hormis l&apos;adresse IP
          de ton téléphone.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Signalements et blocages</strong>
        <p>
          Si tu signales un pseudo (dans un cercle ou dans le classement), ton signalement, le
          pseudo signalé, le motif et la précision que tu ajoutes sont enregistrés chez Supabase et
          lus par l&apos;équipe de Murabbi pour traiter la situation. Les membres que tu bloques
          sont gardés sur ton compte pour que le blocage tienne d&apos;un appareil à l&apos;autre.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Rapports d&apos;erreurs</strong>
        <p>
          Quand l&apos;application plante ou rencontre une erreur, un rapport technique est envoyé
          à <strong>Sentry</strong>, un service indépendant. Il contient le type d&apos;erreur, la
          trace technique, la version de l&apos;application, le modèle de ton téléphone, la version
          de son système et quelques traces des actions qui ont précédé l&apos;erreur. L&apos;application
          n&apos;y ajoute pas ton compte. Les erreurs qui touchent à la période ou aux prières à
          rattraper ne sont jamais envoyées. En revanche, le message d&apos;erreur d&apos;autres
          écrans peut, dans certains cas, contenir des morceaux des données que l&apos;application
          manipulait au moment de l&apos;échec, comme une position, un e-mail ou un identifiant.
          Rien ne garantit que ce soit toujours exclu. Ces rapports servent uniquement à corriger
          les erreurs.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Correctifs de l&apos;application</strong>
        <p>
          Les versions de Murabbi distribuées avec <strong>Shorebird</strong> demandent à son
          serveur, quand tu ouvres l&apos;application, s&apos;il existe un correctif à installer
          sans repasser par le magasin. Shorebird reçoit l&apos;identifiant de l&apos;application,
          son numéro de version, ta plateforme (Android ou iOS), le type de processeur et
          l&apos;adresse IP de ton téléphone. Aucun compte ni aucune donnée personnelle n&apos;est
          envoyé.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Sauvegarde de ton téléphone</strong>
        <p>
          La sauvegarde automatique d&apos;Android ou d&apos;iCloud peut copier une partie des
          données de l&apos;application (réglages, historique gardé sur le téléphone) dans ton
          compte Google ou Apple. Sur Android, les données chiffrées de la période, la liste
          «&nbsp;À rattraper&nbsp;» et la zone du domicile en sont exclues. Tu peux désactiver la
          sauvegarde dans les réglages de ton téléphone.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Contribuer au développement</strong>
        <p>
          Murabbi est gratuite. Si tu choisis de contribuer, le paiement se fait hors de
          l&apos;application, chez Wave ou Orange Money, qui traitent ton paiement selon leurs
          propres règles. Murabbi n&apos;en reçoit aucune donnée bancaire.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Site web</strong>
        <p>
          Si tu envoies une suggestion depuis le site, ton message, sa catégorie et ton e-mail
          (facultatif, pour te répondre) sont enregistrés chez Supabase. Ces suggestions ne sont
          pas reliées à ton compte : pour en faire supprimer une, écris à l&apos;adresse ci-dessus.
          Les polices du site sont servies par le site lui-même. Vercel, qui héberge le site, voit
          l&apos;adresse IP des visiteurs. Le site ne contient aucun outil de mesure d&apos;audience.
        </p>
      </div>

      <h2 id="qui-peut-voir-tes-donnees" className={styles.h2}>Qui peut voir tes données</h2>
      <ul>
        <li>
          <strong>Tous les utilisateurs connectés de Murabbi</strong> voient ton pseudo, tes
          points de la semaine, ton rang et ton total de points dans le classement, dès que tu as
          marqué des points dans la semaine. Le réglage «&nbsp;Masquer mon pseudo&nbsp;» du
          classement leur fait voir «&nbsp;Anonyme&nbsp;» à la place de ton pseudo ; ta place et
          tes points y restent.
        </li>
        <li>
          <strong>Les membres de ton cercle</strong>, si tu en rejoins un, voient ton pseudo, ton
          niveau, ta date d&apos;arrivée et ton rôle dans le cercle. Chaque autorisation se donne
          et se retire séparément :
          <ul>
            <li>
              si tu as ouvert le <strong>récapitulatif du vendredi</strong>, ils voient aussi tes
              prières à l&apos;heure, tes habitudes faites, tes points et ta série de la semaine ;
            </li>
            <li>
              si tu as ouvert le <strong>rappel d&apos;habitude</strong>, un membre peut voir le nom
              d&apos;une habitude prévue aujourd&apos;hui et pas encore faite, ou laissée de côté
              depuis plusieurs jours, pour t&apos;envoyer un mot ;
            </li>
            <li>
              si tu as ouvert le <strong>rappel de prière</strong> ou le{' '}
              <strong>mot d&apos;encouragement</strong>, ils peuvent t&apos;envoyer un message
              court : un mot proposé par l&apos;application, ou un mot écrit par le membre
              (120&nbsp;caractères au plus). Le message transite par Supabase.
            </li>
          </ul>
        </li>
        <li>
          <strong>L&apos;équipe qui administre Murabbi</strong> voit dans le back-office, et peut
          exporter, les informations de ton compte (e-mail, prénom, nom, pseudo, genre, date de
          naissance) et ta progression (niveau, série, points). Elle s&apos;en sert pour
          t&apos;aider et pour traiter les signalements.
        </li>
        <li>
          <strong>Les personnes qui administrent la base de données</strong> ont accès, de fait, à
          tout ce qui y est stocké, y compris les données de la section «&nbsp;Localisation&nbsp;».
        </li>
      </ul>

      <h2 id="les-services-qui-interviennent" className={styles.h2}>Les services qui interviennent</h2>
      <ul>
        <li>Supabase : comptes, réglages, progression, favoris du Coran, signalements, voix des rappels.</li>
        <li>Firebase Cloud Messaging (Google) : notifications.</li>
        <li>Sentry : rapports d&apos;erreurs.</li>
        <li>Shorebird : correctifs de l&apos;application.</li>
        <li>OpenStreetMap (Nominatim et cartes) : noms de lieux et cartes.</li>
        <li>Quran Foundation : polices et pages du lecteur du Coran.</li>
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

      <h2 id="ce-que-nous-ne-faisons-jamais" className={styles.h2}>Ce que nous ne faisons jamais</h2>
      <ul>
        <li>Nous ne vendons aucune donnée à des tiers.</li>
        <li>Nous n&apos;utilisons pas tes données à des fins publicitaires, et l&apos;application ne contient aucun outil de publicité ni de suivi entre applications.</li>
        <li>
          Nous n&apos;envoyons ni dates, ni motif, ni intervalles de ta période à nos serveurs, et
          nous ne les partageons avec personne.
        </li>
      </ul>

      <h2 id="combien-de-temps-tes-donnees-sont-gardees" className={styles.h2}>Combien de temps tes données sont gardées</h2>
      <p>
        Tant que ton compte existe. Si tu supprimes ton compte depuis les réglages de
        l&apos;app (Réglages, Compte, Supprimer le compte), il est désactivé tout de suite : tu
        ne peux plus t&apos;y connecter. Ses données sont <strong>effacées après 30 jours</strong>.
        Pendant ces 30 jours, ton pseudo et ton niveau peuvent encore apparaître dans le
        classement et dans ton cercle.
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
        Les sauvegardes chiffrées de la base de données, faites chaque jour et copiées sur un
        second serveur, ne sont pas purgées aujourd&apos;hui : elles peuvent garder une copie de
        tes données après l&apos;effacement. Elles ne servent qu&apos;à restaurer la base après un
        incident.
      </p>
      <p>
        Tu peux aussi demander la suppression de ton compte sans l&apos;application, depuis la page{' '}
        <a href="/suppression-compte.html">Supprimer ton compte Murabbi</a> ou par e-mail à la
        même adresse.
      </p>

      <h2 id="tes-droits" className={styles.h2}>Tes droits</h2>
      <p>
        Tu peux à tout moment demander l&apos;accès, la rectification ou la suppression de tes
        données, en écrivant à{' '}
        <a href="mailto:el.hadji.ahmadou.cherif.diouf@gmail.com">
          el.hadji.ahmadou.cherif.diouf@gmail.com
        </a>
        .
      </p>

      <h2 id="age-minimum" className={styles.h2}>Âge minimum</h2>
      <p>
        Murabbi n&apos;est pas destinée aux personnes de moins de 13 ans. L&apos;application ne
        contrôle pas l&apos;âge à l&apos;inscription : la date de naissance est facultative. Si tu
        apprends qu&apos;un enfant de moins de 13 ans a créé un compte, écris-nous à l&apos;adresse
        ci-dessus : nous le supprimons.
      </p>

      <h2 id="modifications-de-cette-politique" className={styles.h2}>Modifications de cette politique</h2>
      <p>
        Si cette politique change, la date de mise à jour en haut de cette page sera actualisée.
        En cas de changement important, tu seras informé·e dans l&apos;app.
      </p>

      <hr className={styles.rule} />
      <p>
        <a href="/cgu.html">Voir aussi les conditions d&apos;utilisation →</a>
      </p>
    </LegalDoc>
  )
}
