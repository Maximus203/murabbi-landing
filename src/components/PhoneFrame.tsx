type Shot = 'accueil' | 'habitudes' | 'catalogue' | 'calendrier'

/**
 * Cadre téléphone en CSS pur : un boîtier, un écran. Les captures sont celles
 * de l'application ; seules les familles dont on possède la capture changent
 * avec l'ambiance (Classique, Vert, Rose), les autres gardent Classique.
 */
export function PhoneFrame({ shot, alt, size = 'md', priority = false }: { shot: Shot; alt: string; size?: 'md' | 'sm' | 'xs'; priority?: boolean }) {
  return (
    <div className={`phone${size === 'sm' ? ' phone-sm' : size === 'xs' ? ' phone-xs' : ''}`}>
      <div className="shots">
        {(['classic', 'green', 'rose'] as const).map((fam) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={fam}
            src={`/img/screens/${fam}-${shot}.webp`}
            data-fam={fam === 'classic' ? 'classique' : fam === 'green' ? 'vert' : 'rose'}
            alt={alt}
            width={900}
            height={1819}
            decoding="async"
            loading={priority && fam === 'classic' ? 'eager' : 'lazy'}
            {...(priority && fam === 'classic' ? { fetchPriority: 'high' as const } : {})}
          />
        ))}
      </div>
    </div>
  )
}
