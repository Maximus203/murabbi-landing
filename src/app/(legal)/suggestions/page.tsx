import type { Metadata } from 'next'
import { SuggestionForm } from '@/components/SuggestionForm'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Suggestions — Murabbi',
  description: "Propose une habitude ou une amelioration pour l'application Murabbi.",
}

export default function SuggestionsPage() {
  return (
    <>
      <p className={styles.eyebrow}>Ton avis compte</p>
      <h1 className={styles.h1}>Suggère une habitude ou une amélioration</h1>
      <p className={styles.lead}>
        Murabbi grandit avec ses testeurs. Une habitude qui manque au catalogue, un
        réglage qui te frustre, une idée qui simplifierait ta pratique — dis-le ici.
      </p>

      <SuggestionForm />

      <hr className={styles.rule} />

      <p className={styles.meta}>
        Tu préfères écrire directement ? <a href="mailto:el.hadji.ahmadou.cherif.diouf@gmail.com">el.hadji.ahmadou.cherif.diouf@gmail.com</a>
      </p>
    </>
  )
}
