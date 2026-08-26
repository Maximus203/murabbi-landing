import type { Metadata } from 'next'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: "Conditions d'utilisation — Murabbi",
  description: "Les règles d'usage de l'application Murabbi.",
  robots: { index: false, follow: true },
}

export default function CguPage() {
  return (
    <>
      <p className={styles.eyebrow}>Conditions d&apos;utilisation</p>
      <h1 className={styles.h1}>Conditions générales d&apos;utilisation</h1>
      <p className={styles.meta}>Dernière mise à jour : 26 août 2026</p>

      <p className={styles.lead}>
        En créant un compte Murabbi ou en utilisant l&apos;application, tu acceptes les règles
        ci-dessous.
      </p>

      <h2 className={styles.h2}>1. L&apos;application</h2>
      <p>
        Murabbi est une application mobile qui t&apos;aide à organiser ta pratique quotidienne —
        horaires de prière, habitudes personnelles, suivi de progression — développée par El Hadji
        Ahmadou Cherif Diouf (Artist Digital), basé à Dakar, Sénégal.
      </p>
      <p>
        Les horaires de prière affichés sont calculés à partir de méthodes de calcul astronomique
        reconnues (Ligue Islamique Mondiale par défaut, réglable dans l&apos;app). Ce sont des{' '}
        <strong>estimations à titre indicatif</strong> : en cas de doute, réfère-toi à
        l&apos;autorité religieuse ou à la mosquée de ta localité. Murabbi n&apos;est pas une
        autorité religieuse et ne délivre pas d&apos;avis religieux (fatwa).
      </p>

      <h2 className={styles.h2}>2. Ton compte</h2>
      <ul>
        <li>
          Tu dois avoir <strong>13 ans ou plus</strong> pour créer un compte Murabbi.
        </li>
        <li>
          Les informations que tu fournis (email, prénom, nom, date de naissance) doivent être
          exactes.
        </li>
        <li>Tu es responsable de la confidentialité de ton mot de passe.</li>
        <li>
          Tu peux supprimer ton compte à tout moment depuis les réglages de l&apos;app — voir la{' '}
          <a href="/confidentialite.html">politique de confidentialité</a> pour le détail du
          délai de suppression.
        </li>
      </ul>

      <h2 className={styles.h2}>3. Contenu que tu partages</h2>
      <p>
        Si tu rejoins un &quot;cercle&quot;, ton pseudo et ton niveau sont visibles par les
        autres membres de ce cercle. Tu restes seul responsable du contenu que tu choisis d&apos;y
        partager. Les propos injurieux, harcelants ou illégaux ne sont pas tolérés et peuvent
        entraîner la suspension de ton compte.
      </p>

      <h2 className={styles.h2}>4. Propriété intellectuelle</h2>
      <p>
        L&apos;application, son design, sa marque et son contenu éditorial appartiennent à leur
        auteur. Tu ne peux pas les reproduire ou les redistribuer sans autorisation écrite.
      </p>

      <h2 className={styles.h2}>5. Limitation de responsabilité</h2>
      <p>
        Murabbi est fournie &quot;en l&apos;état&quot;. Nous mettons tout en œuvre pour que les
        horaires de prière et les rappels soient fiables, mais nous ne pouvons garantir une
        exactitude absolue (dépendante de ta position, de ta connexion, et des réglages de ton
        téléphone). Murabbi ne remplace pas un avis médical, religieux ou professionnel.
      </p>

      <h2 className={styles.h2}>6. Suspension et résiliation</h2>
      <p>
        Nous pouvons suspendre ou supprimer un compte en cas de non-respect de ces conditions, de
        fraude ou d&apos;usage abusif. Tu peux à tout moment cesser d&apos;utiliser Murabbi et
        supprimer ton compte.
      </p>

      <h2 className={styles.h2}>7. Droit applicable</h2>
      <p>
        Ces conditions sont régies par le droit sénégalais. Tout litige sera soumis aux
        juridictions compétentes de Dakar, sauf disposition impérative contraire applicable dans
        ton pays de résidence.
      </p>

      <h2 className={styles.h2}>8. Modifications</h2>
      <p>
        Ces conditions peuvent évoluer. En cas de changement important, tu seras informé·e dans
        l&apos;app. La poursuite de l&apos;utilisation de Murabbi après une modification vaut
        acceptation des nouvelles conditions.
      </p>

      <h2 className={styles.h2}>Contact</h2>
      <p>
        Pour toute question :{' '}
        <a href="mailto:el.hadji.ahmadou.cherif.diouf@gmail.com">
          el.hadji.ahmadou.cherif.diouf@gmail.com
        </a>
      </p>

      <hr className={styles.rule} />
      <p>
        <a href="/confidentialite.html">← Voir la politique de confidentialité</a>
      </p>
    </>
  )
}
