import Link from 'next/link'
import { PageBackdrop } from '@/components/PageBackdrop'

export default function NotFound() {
  return (
    <div className="page">
      <PageBackdrop />
      <div className="wrap">
        <div className="notfound sheet" style={{ margin: '0 auto' }}>
          <h1>Cette page n&apos;existe pas.</h1>
          <p className="lead">Le lien est peut-être ancien. Reviens à l&apos;accueil, tout y est.</p>
          <Link className="btn btn-primary" href="/">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
