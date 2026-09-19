import type { Metadata } from 'next'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Murabbi',
  description: 'Quelles données Murabbi collecte, pourquoi, et comment les supprimer.',
  robots: { index: false, follow: true },
}

export default function ConfidentialitePage() {
  return (
    <>
      <p className={styles.eyebrow}>Confidentialité</p>
      <h1 className={styles.h1}>Politique de confidentialité</h1>
      <p className={styles.meta}>Dernière mise à jour : 19 septembre 2026</p>

      <p className={styles.lead}>
        Cette page explique, sans jargon, quelles données Murabbi collecte, pourquoi, combien de
        temps elles sont gardées, et comment les supprimer. Elle correspond exactement à ce que
        fait le code de l&apos;application — pas à un modèle générique.
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

      <h2 className={styles.h2}>Les données que Murabbi collecte</h2>

      <div className={styles.card}>
        <strong>Compte</strong>
        <p>
          Email, prénom, nom, genre, date de naissance (facultative) — pour créer ton compte, te
          connecter (email et mot de passe) et personnaliser l&apos;app.
          Stockées sur nos serveurs (Supabase).
        </p>
      </div>

      <div className={styles.card}>
        <strong>Localisation</strong>
        <p>
          Ta position sert à calculer les horaires de prière de ton lieu. Pour que tu retrouves
          tes réglages après une réinstallation ou sur un nouveau téléphone, deux informations
          sont enregistrées sur ton compte (Supabase) :
        </p>
        <ul>
          <li>
            <strong>la position de calcul de tes prières</strong>,{' '}
            <strong>arrondie à environ 1&nbsp;km</strong>, avec ta méthode de calcul, ton école et
            ta règle de haute latitude ;
          </li>
          <li>
            <strong>ton domicile</strong>, si tu le renseignes dans les réglages (coordonnées et
            libellé, sans arrondi), pour savoir si tu es chez toi.
          </li>
        </ul>
        <p>
          Elles ne servent à rien d&apos;autre. Comme toute donnée de ton compte, elles ne sont
          accessibles qu&apos;à toi et à l&apos;équipe qui administre la base de données ; le
          back-office de Murabbi n&apos;affiche pas ton domicile. Pour afficher le nom de ta
          ville, tes coordonnées sont transmises à <strong>Nominatim (OpenStreetMap)</strong>, un
          service indépendant de géocodage, sans passer par nous.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Pause menstruelle</strong>
        <p>
          Si tu déclares une pause menstruelle dans les réglages, cette information est chiffrée
          et stockée <strong>uniquement sur ton appareil</strong> (Keystore Android / Keychain
          iOS) — elle n&apos;est <strong>jamais envoyée à nos serveurs</strong>, jamais incluse
          dans une sauvegarde cloud, et jamais visible par qui que ce soit d&apos;autre que toi.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Habitudes, prières et progression</strong>
        <p>
          Ton journal d&apos;habitudes, tes validations de prière et ton niveau sont stockés sur
          nos serveurs (Supabase) pour fonctionner d&apos;un appareil à l&apos;autre. Ton pseudo
          et ton niveau sont visibles par les membres de ton &quot;cercle&quot; si tu en rejoins
          un — rien d&apos;autre.
        </p>
      </div>

      <div className={styles.card}>
        <strong>Notifications</strong>
        <p>
          Un identifiant technique (jeton Firebase Cloud Messaging) est utilisé uniquement pour
          t&apos;envoyer les rappels que tu as configurés (habitudes, prières). Il n&apos;est
          utilisé à aucune autre fin, notamment pas publicitaire.
        </p>
      </div>

      <h2 className={styles.h2}>Ce que nous ne faisons jamais</h2>
      <ul>
        <li>Nous ne vendons aucune donnée à des tiers.</li>
        <li>Nous n&apos;utilisons pas tes données à des fins publicitaires.</li>
        <li>Nous ne partageons jamais ta donnée de pause menstruelle, avec personne.</li>
      </ul>

      <h2 className={styles.h2}>Combien de temps tes données sont gardées</h2>
      <p>
        Tant que ton compte existe. Si tu supprimes ton compte depuis les réglages de
        l&apos;app, il est désactivé immédiatement puis{' '}
        <strong>définitivement effacé après 30 jours</strong> — ce délai te permet d&apos;annuler
        la suppression en te reconnectant avant son expiration. Passé ce délai, l&apos;effacement
        est réel et irréversible.
      </p>
      <p>
        Tu peux aussi demander la suppression de ton compte par email à{' '}
        <a href="mailto:el.hadji.ahmadou.cherif.diouf@gmail.com">
          el.hadji.ahmadou.cherif.diouf@gmail.com
        </a>{' '}
        si tu n&apos;as pas accès à l&apos;app.
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
