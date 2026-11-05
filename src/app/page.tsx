import Link from 'next/link'
import { Consent } from '@/components/Consent'
import { Families } from '@/components/Families'
import { IconPause, IconWaves } from '@/components/Icons'
import { Repere } from '@/components/Repere'
import { PhoneFrame } from '@/components/PhoneFrame'
import { Rosace } from '@/components/motifs/Rosace'

const LEVELS = [
  ['Aspirant', '0 pt', '30 pts / jour'],
  ['Murīd', '10 000 pts', '45 pts / jour'],
  ['Sālik', '30 000 pts', '60 pts / jour'],
  ['Mujāhid', '70 000 pts', '75 pts / jour'],
  ['Walī', '150 000 pts', '90 pts / jour'],
  ['Murabbī', '300 000 pts', '105 pts / jour'],
] as const

export default function HomePage() {
  return (
    <>
      {/* 1 · À l'heure */}
      <section className="section hero" id="haut">
        <Rosace at={{ rk: 0.95, cx: 0.5, cy: 0.9 }} atDesktop={{ rk: 0.42, cx: 0.76, cy: 0.5 }} turn={240} />
        <div className="veil" />
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="bismillah" lang="ar" dir="rtl" translate="no">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p>
                <span className="pill">Test fermé · Android et iPhone</span>
              </p>
              <h1>
                À l&apos;heure, <em>là où tu es.</em>
              </h1>
              <p className="lead">
                Murabbi connaît la plage de chaque prière, là où tu es. Pas encore priée ? Il te relance avant qu&apos;elle ne passe.
              </p>
              <div className="hero-cta">
                <Link className="btn btn-primary btn-block" href="/testeurs">
                  Devenir testeur
                </Link>
                <Link className="btn btn-secondary btn-block" href="#repere">
                  Voir comment ça marche
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <PhoneFrame shot="accueil" alt="Écran d'accueil de Murabbi : la prochaine prière, son heure et les cinq horaires du jour." priority />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Le repère */}
      <section className="section" id="repere" style={{ ['--veil-dir' as string]: 'to bottom', ['--veil-1' as string]: '0%', ['--veil-2' as string]: '24%' }}>
        <Rosace role="secondary" at={{ rk: 0.62, cx: 1.05, cy: 0.55 }} atDesktop={{ rk: 0.34, cx: 0.08, cy: 0.5 }} />
        <div className="veil" />
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Le repère</p>
            <h2>Un repère, pas une heure.</h2>
            <p className="lead">Après le Fajr, avant le Maghrib : tu règles une fois, l&apos;heure se recalcule chaque jour, là où tu es.</p>
          </div>
          <Repere />
        </div>
      </section>

      {/* 3 · Une voix */}
      <section className="section" id="voix" style={{ ['--veil-dir' as string]: 'to bottom', ['--veil-1' as string]: '0%', ['--veil-2' as string]: '38%' }}>
        <Rosace at={{ rk: 0.9, cx: 0.5, cy: 1.0 }} atDesktop={{ rk: 0.55, cx: 0.5, cy: 1.12 }} turn={360} />
        <div className="veil" />
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Une voix</p>
            <h2>Une voix.</h2>
            <p className="lead">Au rappel, ton téléphone te récite istighfar, tasbih, salawat. Tu écoutes, tu n&apos;ouvres rien.</p>
            <ul className="chips-info" aria-label="Récitées au rappel">
              {['Istighfar', 'Tasbih', 'Salawat'].map((n) => (
                <li className="chip chip-info" key={n}>
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div className="voice-grid">
            <div className="card invoc reveal">
              <p className="eyebrow">Lecture d&apos;invocation</p>
              <p className="ar" lang="ar" dir="rtl" translate="no">
                اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ
              </p>
              <p className="tr">
                Ô Allah, c&apos;est par Toi que nous entrons au matin, par Toi que nous entrons au soir, par Toi que nous vivons et par Toi que nous mourons ; et c&apos;est vers Toi qu&apos;est la résurrection.
              </p>
              <p className="src">Abu Dawud, n° 5068 ; At-Tirmidhi, n° 3391 · Sahih · Abu Hurayra</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 · Constance */}
      <section className="section" id="constance" style={{ ['--veil-dir' as string]: 'to bottom', ['--veil-1' as string]: '0%', ['--veil-2' as string]: '20%' }}>
        <Rosace at={{ rk: 0.5, cx: -0.05, cy: 0.04 }} atDesktop={{ rk: 0.26, cx: -0.05, cy: 0.04 }} k={0.7} />
        <Rosace at={{ rk: 0.5, cx: 1.05, cy: 0.96 }} atDesktop={{ rk: 0.26, cx: 1.05, cy: 0.96 }} k={0.7} />
        <Rosace role="secondary" at={{ rk: 0.09, cx: 0.9, cy: 0.12 }} k={0.5} />
        <div className="veil" />
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Constance</p>
            <h2>Un trait par jour.</h2>
            <p className="lead">Adhkar, Coran, habitudes : un trait par jour. Murabbi tient le compte pour toi, tu coches.</p>
          </div>
          <div className="gallery">
            <figure className="reveal">
              <PhoneFrame shot="habitudes" size="sm" alt="Habitudes du jour : les rappels à venir et ceux déjà faits." />
              <figcaption className="shot-caption">Tes habitudes du jour</figcaption>
            </figure>
            <figure className="reveal">
              <PhoneFrame shot="catalogue" size="sm" alt="Catalogue d'habitudes à ajouter en un geste." />
              <figcaption className="shot-caption">Un catalogue à ajouter en un geste</figcaption>
            </figure>
            <figure className="reveal">
              <PhoneFrame shot="calendrier" size="sm" alt="Calendrier hégirien du mois." />
              <figcaption className="shot-caption">Un calendrier qui connaît tes jours</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 5 · Lire, rattraper */}
      <section className="section" id="lire" style={{ ['--veil-dir' as string]: 'to bottom', ['--veil-1' as string]: '0%', ['--veil-2' as string]: '30%' }}>
        <Rosace role="secondary" at={{ rk: 0.6, cx: -0.1, cy: 0.9 }} atDesktop={{ rk: 0.3, cx: 0.08, cy: 0.85 }} k={0.7} />
        <div className="veil" />
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Lire, rattraper</p>
            <h2>Lire, puis rattraper.</h2>
            <p className="lead">Le Coran en écriture uthmanienne, page par page. Les prières à rattraper se comptent selon ton école.</p>
          </div>
          <div className="dual">
            <div className="card cap-card reveal">
              <h3>Le lecteur du Coran</h3>
              <p>Une page de mushaf nue, sans décor derrière le texte, pour lire sans rien qui distrait.</p>
            </div>
            <div className="card cap-card reveal">
              <h3>Les prières à rattraper</h3>
              <p>Murabbi calcule ce qu&apos;il te reste selon ton école et te laisse avancer à ton rythme.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 · Respect */}
      <section className="section" id="respect" style={{ ['--veil-dir' as string]: 'to bottom', ['--veil-1' as string]: '0%', ['--veil-2' as string]: '30%' }}>
        <Rosace role="secondary" at={{ rk: 0.5, cx: 1.1, cy: 0.3 }} atDesktop={{ rk: 0.28, cx: 0.95, cy: 0.4 }} k={0.5} />
        <div className="veil" />
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Respect</p>
            <h2>Rien ne compte contre toi.</h2>
            <p className="lead">Pendant tes règles, les prières se mettent en pause. Pas de réseau ? Murabbi continue.</p>
          </div>
          <div className="dual">
            <div className="card reveal">
              <div className="respect-row">
                <IconPause />
                <div>
                  <h3>Pause des prières</h3>
                  <p>Pendant tes règles, les prières se mettent en pause : rien ne compte contre toi.</p>
                </div>
              </div>
            </div>
            <div className="card reveal">
              <div className="respect-row">
                <IconWaves />
                <div>
                  <h3>Sans réseau, sans attente</h3>
                  <p>Les horaires se calculent sur ton téléphone. Tu coches, Murabbi enregistre, la synchronisation suit quand le réseau revient.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · Cercle */}
      <section className="section" id="cercle" style={{ ['--veil-dir' as string]: 'to bottom', ['--veil-1' as string]: '0%', ['--veil-2' as string]: '22%' }}>
        <Rosace at={{ rk: 0.62, cx: -0.1, cy: 0.6 }} atDesktop={{ rk: 0.32, cx: 0.06, cy: 0.5 }} k={0.7} />
        <div className="veil" />
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Le cercle</p>
            <h2>Un cercle qui te relève, si tu le veux.</h2>
            <p className="lead">Des proches peuvent te rappeler une prière, uniquement là où tu leur as ouvert la porte. Essaie.</p>
          </div>
          <Consent />
        </div>
      </section>

      {/* 8 · Paliers */}
      <section className="section" id="paliers" style={{ ['--veil-dir' as string]: 'to bottom', ['--veil-1' as string]: '0%', ['--veil-2' as string]: '24%' }}>
        <Rosace role="secondary" at={{ rk: 0.75, cx: 0.5, cy: 1.05 }} atDesktop={{ rk: 0.4, cx: 0.5, cy: 1.1 }} k={0.5} />
        <div className="veil" />
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Paliers</p>
            <h2>Six paliers, au rythme des années.</h2>
            <p className="lead">Le dernier se mérite en années, pas en semaines. Il donne son nom à l&apos;application.</p>
          </div>
          <ol className="levels">
            {LEVELS.map(([name, th, goal], i) => (
              <li className="card level reveal" key={name} data-last={i === 5}>
                <p className="level-name">{name}</p>
                <p className="level-th">{th}</p>
                <p className="level-goal">Objectif {goal}</p>
              </li>
            ))}
          </ol>
          <p className="levels-foot">Au dernier palier, tu guides autant que tu progresses : d&apos;où le nom de l&apos;application.</p>
        </div>
      </section>

      {/* 9 · Ambiances */}
      <section className="section" id="ambiances">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Ambiances</p>
            <h2>Cinq ambiances, trois intensités.</h2>
            <p className="lead">Classique, Vert, Bleu, Rose, Mono. Clair, sombre, nuit. Essaie : cette page change avec toi.</p>
          </div>
          <Families />
        </div>
      </section>

      {/* 10 · Test fermé */}
      <section className="section" id="testeur" style={{ ['--veil-dir' as string]: 'to bottom', ['--veil-1' as string]: '0%', ['--veil-2' as string]: '0%' }}>
        <Rosace at={{ rk: 0.9, cx: 0.5, cy: 1.08 }} atDesktop={{ rk: 0.45, cx: 0.5, cy: 1.08 }} />
        <div className="wrap">
          <div className="card cta-card reveal">
            <p className="eyebrow">La suite</p>
            <h2>L&apos;application n&apos;est pas encore publiée.</h2>
            <p>Murabbi est en test fermé. Deviens testeur pour l&apos;installer en avant-première sur Android ou iPhone, et peser sur ce qu&apos;elle devient.</p>
            <Link className="btn btn-primary" href="/testeurs">
              Devenir testeur
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
