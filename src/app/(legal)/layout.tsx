import Link from 'next/link'
import styles from './legal.module.css'

/**
 * Habillage commun aux pages légales (confidentialité, CGU, suppression de
 * compte) — en-tête + pied de page identiques sur les trois, repris tels
 * quels de l'ancien code. `.legalRoot` porte le scope des sélecteurs
 * d'élément bruts définis dans legal.module.css (cf. commentaire dans ce
 * fichier) — il doit envelopper aussi bien ce chrome que le contenu
 * `{children}` de chaque page, qui utilise les mêmes éléments (liens,
 * titres, listes).
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.legalRoot}>
      <header className={styles.siteHeader}>
        <div className={styles.wrap}>
          <Link className={styles.brand} href="/" aria-label="Murabbi — accueil">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <circle cx="13" cy="13" r="11.25" stroke="currentColor" strokeWidth="1.2" opacity=".28" />
              <path d="M13 1.75v22.5" stroke="currentColor" strokeWidth="1.2" opacity=".18" />
              <path
                d="M2.6 18.2A11.25 11.25 0 0 1 23.4 18.2"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="13" cy="8.4" r="2.6" fill="currentColor" />
            </svg>
            Murabbi
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.wrap}>{children}</div>
      </main>

      <footer className={styles.siteFooter}>
        <div className={styles.wrap}>
          <a href="mailto:el.hadji.ahmadou.cherif.diouf@gmail.com">el.hadji.ahmadou.cherif.diouf@gmail.com</a>
          <Link href="/">← Retour à l&apos;accueil</Link>
        </div>
      </footer>
    </div>
  )
}
