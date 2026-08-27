import type { Metadata } from 'next'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Devenir testeur — Murabbi',
  description: "Comment devenir testeur de Murabbi sur Android et iPhone, et comment installer l'application.",
}

export default function TesteursPage() {
  return (
    <>
      <p className={styles.eyebrow}>Programme testeurs</p>
      <h1 className={styles.h1}>Deviens testeur Murabbi</h1>
      <p className={styles.lead}>
        Murabbi est en test fermé avant sa sortie publique. Les testeurs installent
        l&apos;application en avant-première, l&apos;utilisent au quotidien, et nous
        remontent ce qui fonctionne — ou pas — via la page{' '}
        <a href="/suggestions">suggestions</a>.
      </p>

      <div className={styles.card}>
        <h2 className={styles.h2} style={{ marginTop: 0 }}>Android</h2>
        <p>
          Rejoins le programme de test interne sur le Play Store. Le lien
          d&apos;inscription est en cours d&apos;ouverture.
        </p>
        <span
          className="btn btn-ghost btn-sm"
          aria-disabled="true"
          style={{ opacity: 0.55, cursor: 'not-allowed', pointerEvents: 'none' }}
        >
          Rejoindre sur Play Store — bientôt disponible
        </span>
      </div>

      <div className={styles.card}>
        <h2 className={styles.h2} style={{ marginTop: 0 }}>iPhone</h2>
        <p>
          Rejoins le programme via TestFlight. Le lien d&apos;invitation est en
          cours d&apos;ouverture.
        </p>
        <span
          className="btn btn-ghost btn-sm"
          aria-disabled="true"
          style={{ opacity: 0.55, cursor: 'not-allowed', pointerEvents: 'none' }}
        >
          Rejoindre sur TestFlight — bientôt disponible
        </span>
      </div>

      <hr className={styles.rule} />

      <h2 className={styles.h2}>En attendant l&apos;ouverture</h2>
      <p>
        Écris-nous pour être prévenu dès que les liens Android et iPhone sont actifs —
        on te répond directement par email dès qu&apos;une place s&apos;ouvre.
      </p>
      <a
        className="btn btn-primary"
        href="mailto:el.hadji.ahmadou.cherif.diouf@gmail.com?subject=Devenir%20testeur%20Murabbi"
      >
        Demander à devenir testeur
      </a>

      <hr className={styles.rule} />

      <h2 className={styles.h2}>Une fois testeur</h2>
      <ol>
        <li>Installe l&apos;application depuis le lien reçu (Play Store ou TestFlight).</li>
        <li>Utilise Murabbi normalement, pendant au moins une semaine si possible.</li>
        <li>
          Envoie tes remarques — bug, friction, idée d&apos;habitude — via la page{' '}
          <a href="/suggestions">suggestions</a>.
        </li>
      </ol>
    </>
  )
}
