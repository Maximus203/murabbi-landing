import type { Metadata } from 'next'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Supprimer ton compte Murabbi — Murabbi',
  description:
    "Comment demander la suppression de ton compte Murabbi et de tes données, depuis l'app ou par email.",
  robots: { index: false, follow: true },
}

export default function SuppressionComptePage() {
  return (
    <>
      <p className={styles.eyebrow}>Compte</p>
      <h1 className={styles.h1}>Supprimer ton compte Murabbi</h1>
      <p className={styles.meta}>Dernière mise à jour : 26 août 2026</p>

      <p className={styles.lead}>
        Tu peux supprimer ton compte Murabbi et les données qui y sont rattachées à tout moment.
        Voici les deux façons de le faire, et ce qui se passe exactement ensuite.
      </p>

      <h2 className={styles.h2}>1. Depuis l&apos;application (le plus rapide)</h2>
      <p>
        Ouvre Murabbi, puis&nbsp;: <strong>Réglages</strong> → <strong>Compte</strong> →{' '}
        <strong>Supprimer mon compte</strong>. Confirme, et la demande est enregistrée
        immédiatement.
      </p>

      <h2 className={styles.h2}>2. Par email (si tu n&apos;as plus accès à l&apos;app)</h2>
      <p>
        Écris à{' '}
        <a href="mailto:el.hadji.ahmadou.cherif.diouf@gmail.com?subject=Suppression%20de%20mon%20compte%20Murabbi">
          el.hadji.ahmadou.cherif.diouf@gmail.com
        </a>{' '}
        depuis l&apos;adresse email de ton compte, avec « Suppression de mon compte Murabbi » en
        objet. La demande est traitée sous 7 jours ouvrés.
      </p>

      <h2 className={styles.h2}>Ce qui est supprimé</h2>
      <ul>
        <li>
          Ton compte et tes informations personnelles (email, prénom, nom, genre, date de
          naissance).
        </li>
        <li>Ton journal d&apos;habitudes, tes validations de prière et ta progression.</li>
        <li>
          Ton appartenance à un cercle, ainsi que ton pseudo et ton niveau qui y étaient
          visibles.
        </li>
        <li>Le jeton de notification lié à tes appareils.</li>
      </ul>
      <p>
        Ta donnée de pause menstruelle et tes coordonnées de localisation n&apos;ont jamais
        quitté ton téléphone&nbsp;: il n&apos;y a rien à supprimer côté serveur. Elles
        disparaissent quand tu désinstalles l&apos;application. Voir la{' '}
        <a href="/confidentialite.html">politique de confidentialité</a>.
      </p>

      <h2 className={styles.h2}>Délai</h2>
      <p>
        Ton compte est <strong>désactivé immédiatement</strong> — tu ne peux plus t&apos;y
        connecter et tu disparais de ton cercle. Les données sont ensuite{' '}
        <strong>définitivement effacées après 30 jours</strong>. Ce délai existe pour te
        permettre d&apos;annuler une suppression accidentelle&nbsp;: il te suffit de te
        reconnecter avant son expiration. Passé ce délai, l&apos;effacement est réel et
        irréversible.
      </p>
      <p>
        Aucune donnée n&apos;est conservée au-delà, sauf obligation légale de conservation qui
        s&apos;imposerait à nous.
      </p>

      <hr className={styles.rule} />
      <p>
        <a href="/confidentialite.html">← Voir la politique de confidentialité</a>
      </p>
    </>
  )
}
