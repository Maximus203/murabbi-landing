import type { Metadata } from 'next'
import { SuggestionForm } from '@/components/SuggestionForm'

export const metadata: Metadata = {
  title: 'Suggestions — Murabbi',
  description: "Propose une habitude ou une amélioration pour l'application Murabbi.",
}

export default function SuggestionsPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Ton avis compte</p>
        <h1>Suggère une habitude ou une amélioration</h1>
        <p className="lead">
          Murabbi grandit avec ses testeurs. Une habitude qui manque au catalogue, un réglage qui te frustre, une idée qui simplifierait ta pratique : dis-le ici.
        </p>
      </div>
      <div className="sheet">
        <SuggestionForm />
        <p className="small" style={{ marginTop: 24 }}>
          Tu préfères écrire directement ? <a href="mailto:el.hadji.ahmadou.cherif.diouf@gmail.com">el.hadji.ahmadou.cherif.diouf@gmail.com</a>
        </p>
      </div>
    </>
  )
}
