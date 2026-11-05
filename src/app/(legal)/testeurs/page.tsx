import type { Metadata } from 'next'
import { PhoneFrame } from '@/components/PhoneFrame'

export const metadata: Metadata = {
  title: 'Devenir testeur — Murabbi',
  description: "Comment devenir testeur de Murabbi sur Android et iPhone, et comment installer l'application.",
}

const MAIL = 'mailto:el.hadji.ahmadou.cherif.diouf@gmail.com?subject=Devenir%20testeur%20Murabbi'

export default function TesteursPage() {
  return (
    <div className="tester-grid">
      <div>
        <div className="page-head">
          <p className="eyebrow">Test fermé</p>
          <h1>Deviens testeur</h1>
          <p className="lead">
            Murabbi est en test fermé. Les testeurs l&apos;installent en avant-première et nous disent ce qui marche, ou pas, via la page{' '}
            <a href="/suggestions">suggestions</a>.
          </p>
        </div>

        <div className="stores">
          <div className="card">
            <h2 style={{ fontSize: 22 }}>Android</h2>
            <p className="small" style={{ margin: '8px 0 16px' }}>
              Le programme de test interne du Play Store s&apos;ouvre bientôt. Le lien d&apos;inscription arrive ici.
            </p>
            <span className="btn btn-disabled btn-sm" aria-disabled="true">
              Bientôt disponible
            </span>
          </div>
          <div className="card">
            <h2 style={{ fontSize: 22 }}>iPhone</h2>
            <p className="small" style={{ margin: '8px 0 16px' }}>
              Le programme TestFlight s&apos;ouvre bientôt. Le lien d&apos;invitation arrive ici.
            </p>
            <span className="btn btn-disabled btn-sm" aria-disabled="true">
              Bientôt disponible
            </span>
          </div>
        </div>

        <div className="sheet">
          <h2>En attendant l&apos;ouverture</h2>
          <p>Écris-nous pour être prévenu dès que les liens Android et iPhone sont actifs : on te répond directement par email dès qu&apos;une place s&apos;ouvre.</p>
          <p style={{ marginTop: 16 }}>
            <a className="btn btn-primary" href={MAIL}>
              Demander à devenir testeur
            </a>
          </p>
          <h2>Une fois testeur</h2>
          <div className="steps" style={{ marginTop: 16 }}>
            {[
              ['1', 'Installe', "Installe l'application depuis le lien reçu (Play Store ou TestFlight)."],
              ['2', 'Utilise', 'Utilise Murabbi normalement, pendant au moins une semaine si possible.'],
              ['3', 'Raconte', 'Envoie tes remarques (bug, friction, idée d’habitude) via la page suggestions.'],
            ].map(([n, t, d]) => (
              <div className="step" key={n}>
                <span className="n" aria-hidden="true">
                  {n}
                </span>
                <div>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="tester-visual">
        <PhoneFrame shot="accueil" size="xs" alt="Écran d'accueil de Murabbi : prochaine prière et horaires du jour." />
      </div>
    </div>
  )
}
