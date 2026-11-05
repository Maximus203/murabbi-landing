import Link from 'next/link'
import { Symbol } from './Icons'

const APP = [
  ['/#haut', "À l'heure"],
  ['/#repere', 'Le repère'],
  ['/#voix', 'Une voix'],
  ['/#constance', 'Constance'],
  ['/#lire', 'Lire et rattraper'],
  ['/#respect', 'Respect'],
  ['/#cercle', 'Le cercle'],
  ['/#paliers', 'Paliers'],
  ['/#ambiances', 'Ambiances'],
] as const

/** Pied de page unique : les mêmes liens sur toutes les pages. */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link className="brand" href="/" aria-label="Murabbi — accueil">
              <Symbol />
              Murabbi
            </Link>
            <p>En test fermé. Pour Android et iPhone.</p>
            <Link className="btn btn-primary btn-sm" href="/testeurs">
              Devenir testeur
            </Link>
          </div>
          <nav aria-label="L'application">
            <h2>L&apos;application</h2>
            <ul>
              {APP.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Participer">
            <h2>Participer</h2>
            <ul>
              <li>
                <Link href="/testeurs">Devenir testeur</Link>
              </li>
              <li>
                <Link href="/suggestions">Suggestions</Link>
              </li>
              <li>
                <a href="mailto:el.hadji.ahmadou.cherif.diouf@gmail.com">Nous écrire</a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Pages légales">
            <h2>Légal</h2>
            <ul>
              <li>
                <Link href="/confidentialite.html">Politique de confidentialité</Link>
              </li>
              <li>
                <Link href="/cgu.html">Conditions d&apos;utilisation</Link>
              </li>
              <li>
                <Link href="/suppression-compte.html">Supprimer mon compte</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-bottom small">
          <p>© 2026 Murabbi</p>
          <p>
            Horaires de la page calculés dans le navigateur (méthode Ligue islamique mondiale, Fajr −18°, Isha −17°).
            Illustratifs : ils ne remplacent pas ceux de l&apos;application.
          </p>
        </div>
      </div>
    </footer>
  )
}
