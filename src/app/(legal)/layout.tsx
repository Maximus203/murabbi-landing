import { PageBackdrop } from '@/components/PageBackdrop'

/** Habillage des pages internes : rosaces en murmure, contenu centré. L'en-tête et le pied de page viennent de la racine. */
export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <PageBackdrop />
      <div className="wrap">{children}</div>
    </div>
  )
}
