import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { LandingScript } from '@/components/LandingScript'

export default function HomePage() {
  const engineCode = readFileSync(join(process.cwd(), 'src/landing-engine.js'), 'utf-8')

  return (
    <>
<a className="skip" href="#contenu">Aller au contenu</a>

<header className="site-header" id="header">
  <div className="wrap">
    <a className="brand" href="#top" aria-label="Murabbi — accueil">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="11.25" stroke="currentColor" strokeWidth="1.2" opacity=".28"/>
        <path d="M13 1.75v22.5" stroke="currentColor" strokeWidth="1.2" opacity=".18"/>
        <path d="M2.6 18.2A11.25 11.25 0 0 1 23.4 18.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="13" cy="8.4" r="2.6" fill="currentColor"/>
      </svg>
      Murabbi
    </a>
    <div className="header-actions">
      <button className="icon-btn" id="theme-toggle" type="button" aria-label="Basculer le thème clair ou sombre">
        <svg className="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2"/><path d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M5.6 5.6 7.2 7.2M16.8 16.8l1.6 1.6M18.4 5.6 16.8 7.2M7.2 16.8l-1.6 1.6"/>
        </svg>
        <svg className="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z"/>
        </svg>
      </button>
      <a className="btn btn-primary btn-sm" href="#liste-attente">Liste d'attente</a>
    </div>
  </div>
</header>

<main id="contenu">

{/* ====================== HÉROS ====================== */}
<section className="hero" id="top">
  <div className="wrap">
    <div className="hero-grid">
      <div>
        <p className="eyebrow">Application mobile · bêta à venir</p>
        <h1>Ta journée a déjà un rythme.<br />Ton agenda <em>l'ignore.</em></h1>
        <p className="hero-sub">
          Cinq repères découpent ta journée, et ils bougent chaque jour avec le soleil.
          Murabbi accroche tes habitudes à ces repères plutôt qu'à des heures fixes —
          puis recalcule tout, tous les matins, à ta place.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#liste-attente">Rejoindre la liste d'attente</a>
          <a className="btn btn-ghost" href="#mecanisme">Voir le mécanisme</a>
        </div>
        <p className="hero-note">
          <span className="dot" aria-hidden="true"></span>
          Les horaires ci-contre sont calculés en direct, dans ton navigateur.
        </p>
      </div>

      <div className="card today" id="today-card">
        <div className="today-top">
          <div>
            <span className="today-label">Aujourd'hui</span>
            <p className="today-date" id="today-date">—</p>
          </div>
          <label className="visually-hidden" htmlFor="city" style={{position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap'}}>Ville de référence</label>
          <select className="city-select" id="city" defaultValue="dakar">
            <option value="dakar">Dakar</option>
            <option value="abidjan">Abidjan</option>
            <option value="paris">Paris</option>
            <option value="bruxelles">Bruxelles</option>
            <option value="tunis">Tunis</option>
            <option value="istanbul">Istanbul</option>
            <option value="riyad">Riyad</option>
          </select>
        </div>

        <div className="arc" id="arc" aria-hidden="true"></div>

        <div className="anchors" id="anchors" role="list" aria-label="Repères de la journée"></div>

        <p className="today-foot" id="today-foot">—</p>
      </div>
    </div>
  </div>
</section>

<hr className="rule" />

{/* ====================== LE DÉCALAGE ====================== */}
<section id="decalage">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">Le problème</p>
      <h2>Une alarme à 19 h 30 a tort la moitié de l'année.</h2>
      <p>
        Un rappel fixe suppose que ta journée est fixe. Elle ne l'est pas : le coucher du
        soleil se déplace de dizaines de minutes entre décembre et juin, et tous tes
        repères avec lui. Voilà le décalage, tracé sur douze mois pour la ville que tu as
        choisie.
      </p>
    </div>

    <div className="drift reveal">
      <div className="card drift-card">
        <div className="drift-legend">
          <span className="legend-key"><span className="legend-swatch" style={{background: 'var(--cat-sante)'}}></span> Sobh (Fajr)</span>
          <span className="legend-key"><span className="legend-swatch" style={{background: 'var(--accent)'}}></span> Maghrib</span>
          <span className="legend-key"><span className="legend-swatch" style={{background: 'var(--text-3)', opacity: '.6'}}></span> Une alarme fixe</span>
        </div>
        <div className="chart-scroll">
          <svg id="drift-chart" viewBox="0 0 720 300" role="img" aria-labelledby="drift-title drift-desc">
            <title id="drift-title">Déplacement des horaires sur douze mois</title>
            <desc id="drift-desc">Deux courbes montrent l'heure du Sobh et du Maghrib jour après jour sur une année, comparées à deux horaires fixes qui restent plats.</desc>
          </svg>
        </div>
        <div className="drift-readout">
          <div>
            <p className="readout-k">Amplitude du Maghrib</p>
            <p className="readout-v mono" id="amp-maghrib">—</p>
            <p className="readout-d" id="amp-maghrib-d">—</p>
          </div>
          <div>
            <p className="readout-k">Amplitude du Sobh</p>
            <p className="readout-v mono" id="amp-fajr">—</p>
            <p className="readout-d" id="amp-fajr-d">—</p>
          </div>
          <div>
            <p className="readout-k">Jours où l'alarme se trompe</p>
            <p className="readout-v mono" id="amp-wrong">—</p>
            <p className="readout-d">de plus d'un quart d'heure, sur 365.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<hr className="rule" />

{/* ====================== LE DÉCLENCHEUR ANCRÉ ====================== */}
<section id="mecanisme">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">Le mécanisme</p>
      <h2>Tu ne choisis pas une heure. Tu choisis un repère.</h2>
      <p>
        Dans Murabbi, une habitude s'ancre : <em>après le Sobh</em>, <em>avant le
        Maghrib</em>, <em>vingt minutes après l'Asr</em>. L'heure exacte, elle, se
        recalcule chaque jour pour l'endroit où tu es. Compose un déclencheur ci-dessous
        et regarde l'heure bouger toute seule.
      </p>
    </div>

    <div className="trigger-grid">
      <div className="card builder reveal">
        <div className="builder-row">
          <span className="builder-k" id="k-sens">Sens</span>
          <div className="chips" role="group" aria-labelledby="k-sens" id="dir-chips">
            <button className="chip" type="button" data-dir="before" aria-pressed="false">Avant</button>
            <button className="chip" type="button" data-dir="after" aria-pressed="true">Après</button>
          </div>
        </div>

        <div className="builder-row">
          <span className="builder-k" id="k-ancre">Repère</span>
          <div className="chips" role="group" aria-labelledby="k-ancre" id="anchor-chips">
            <button className="chip" type="button" data-anchor="fajr" aria-pressed="true">Sobh</button>
            <button className="chip" type="button" data-anchor="sunrise" aria-pressed="false">Lever du soleil</button>
            <button className="chip" type="button" data-anchor="dhuhr" aria-pressed="false">Dhuhr</button>
            <button className="chip" type="button" data-anchor="asr" aria-pressed="false">Asr</button>
            <button className="chip" type="button" data-anchor="maghrib" aria-pressed="false">Maghrib</button>
            <button className="chip" type="button" data-anchor="isha" aria-pressed="false">Isha</button>
          </div>
        </div>

        <div className="builder-row">
          <label className="builder-k" htmlFor="offset">Décalage</label>
          <div className="offset-row">
            <input type="range" id="offset" min="0" max="90" step="5" defaultValue="15"
                   aria-describedby="offset-val" />
            <span className="offset-val mono" id="offset-val">15 min</span>
          </div>
        </div>

        <div className="builder-out" aria-live="polite">
          <p className="sentence" id="trigger-sentence">—</p>
          <div className="resolved">
            <div className="resolved-cell">
              <p className="resolved-k">Aujourd'hui</p>
              <p className="resolved-v mono" id="r-today">—</p>
            </div>
            <div className="resolved-cell">
              <p className="resolved-k">Dans 3 mois</p>
              <p className="resolved-v mono" id="r-3m">—</p>
            </div>
            <div className="resolved-cell">
              <p className="resolved-k">Dans 6 mois</p>
              <p className="resolved-v mono" id="r-6m">—</p>
            </div>
          </div>
        </div>
      </div>

      <div className="trigger-points reveal">
        <div className="point">
          <span className="point-num">1</span>
          <div>
            <h3>L'heure te suit, tu ne la suis pas</h3>
            <p>
              Tu déménages, tu voyages, la saison tourne : l'ancre ne change pas, l'heure
              s'adapte. Tu n'auras jamais à rouvrir tes rappels pour les décaler de dix
              minutes.
            </p>
          </div>
        </div>
        <div className="point">
          <span className="point-num">2</span>
          <div>
            <h3>Un déclencheur, pas une sonnerie de plus</h3>
            <p>
              Une habitude peut se déclencher sur un instant précis, ou sur une fenêtre —
              entre le Sobh et le lever du soleil, par exemple. Dans une fenêtre, tu as le
              temps de faire, pas seulement d'être interrompu.
            </p>
          </div>
        </div>
        <div className="point">
          <span className="point-num">3</span>
          <div>
            <h3>Le calcul se fait sur ton téléphone</h3>
            <p>
              Les horaires sont calculés localement à partir de ta position, pas
              téléchargés. L'application reste utile sans réseau — et n'a pas besoin
              d'envoyer où tu te trouves pour savoir quand te rappeler quelque chose.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<hr className="rule" />

{/* ====================== CAPACITÉS ====================== */}
<section id="habitudes">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">L'habitude</p>
      <h2>Aussi simple qu'une case à cocher. Aussi précise que nécessaire.</h2>
      <p>
        La plupart des habitudes n'ont besoin que d'un nom et d'un rythme. Certaines
        méritent plus. Plutôt que d'imposer un formulaire de dix champs à tout le monde,
        Murabbi te demande d'abord de quoi <em>cette</em> habitude a besoin — et ne
        t'affiche que ça.
      </p>
    </div>

    <div className="caps">
      <div className="card cap reveal">
        <span className="cap-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6.5 4.8 8.3 8 5.1M3 17.5l1.8 1.8L8 16.1M11.5 7h9.5M11.5 12h9.5M11.5 17h9.5"/>
          </svg>
        </span>
        <div>
          <h3>Sous-tâches</h3>
          <p>Découper l'habitude en étapes à cocher, quand « fait » n'est pas un seul geste.</p>
        </div>
      </div>

      <div className="card cap reveal">
        <span className="cap-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 1.8M9.5 2.5h5"/>
          </svg>
        </span>
        <div>
          <h3>Durée d'exécution</h3>
          <p>Le temps que ça prend réellement — pour que ton agenda cesse de mentir sur ta journée.</p>
        </div>
      </div>

      <div className="card cap reveal">
        <span className="cap-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 10a6 6 0 1 1 12 0c0 4 1.6 5.6 1.6 5.6H4.4S6 14 6 10ZM10 19a2 2 0 0 0 4 0"/>
          </svg>
        </span>
        <div>
          <h3>Déclencheur</h3>
          <p>Le repère de la journée qui la lance, plutôt qu'une heure décidée une fois pour toutes.</p>
        </div>
      </div>

      <div className="card cap reveal">
        <span className="cap-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8h13l-3-3M20 16H7l3 3"/>
          </svg>
        </span>
        <div>
          <h3>Répétitions</h3>
          <p>Combien de fois la répéter à chaque occurrence, quand une seule ne suffit pas.</p>
        </div>
      </div>

      <div className="card cap reveal">
        <span className="cap-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 6.5S10 4.5 4.5 4.5v13C10 17.5 12 19.5 12 19.5s2-2 7.5-2v-13C14 4.5 12 6.5 12 6.5ZM12 6.5v13"/>
          </svg>
        </span>
        <div>
          <h3>Contenu pédagogique</h3>
          <p>Un texte, des images ou une vidéo attachés à l'habitude — ce que tu y mets, toi.</p>
        </div>
      </div>

      <div className="card cap reveal">
        <span className="cap-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 8.5h3l1.6-2.4h7.8l1.6 2.4h3v10h-17v-10Z"/><circle cx="12" cy="13.2" r="3.2"/>
          </svg>
        </span>
        <div>
          <h3>Preuve de réalisation</h3>
          <p>Ce qu'il faut fournir pour valider : une photo, un chiffre, une note. Tu fixes la barre.</p>
        </div>
      </div>
    </div>

    <p className="caps-foot reveal">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"/><path d="M12 16v-4.5M12 8.2h.01"/>
      </svg>
      <span>
        Six capacités, cochées une par une. Une habitude « simple » n'en active aucune et
        se crée en deux gestes ; une habitude exigeante peut les activer toutes. C'est la
        même liste, jamais un mode payant séparé.
      </span>
    </p>
  </div>
</section>

<hr className="rule" />

{/* ====================== CERCLE ====================== */}
<section id="cercle">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">Le cercle</p>
      <h2>Des proches qui te relèvent — uniquement là où tu leur as ouvert la porte.</h2>
      <p>
        Se faire rappeler par quelqu'un fonctionne mieux qu'une notification. Mais on ne
        donne pas à ses amis un droit de regard sur tout. Dans Murabbi, tu ouvres chaque
        type de rappel séparément, et tu peux le refermer à tout moment. Essaie sur la
        carte de droite.
      </p>
    </div>

    <div className="circle-grid">
      <div className="trigger-points reveal">
        <div className="point">
          <span className="point-num">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/>
            </svg>
          </span>
          <div>
            <h3>Le refus est dans le code, pas dans un réglage</h3>
            <p>
              Un rappel ne peut pas être fabriqué par l'application tant que la personne
              concernée n'a pas ouvert ce type d'événement précis. Ce n'est pas une case
              qu'un écran pourrait oublier de vérifier : rien d'autre, dans le programme,
              n'a le droit d'en créer un.
            </p>
          </div>
        </div>
        <div className="point">
          <span className="point-num">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h6M14 12h6M12 4v6M12 14v6"/>
            </svg>
          </span>
          <div>
            <h3>Le motif ne dit jamais ce que tu as manqué</h3>
            <p>
              Ton cercle voit qu'une main est tendue, pas le détail de ta journée. Un
              rappel reste une main tendue — pas un rapport d'inspection.
            </p>
          </div>
        </div>
        <div className="point">
          <span className="point-num">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 13.5 9.5 18 19 6.5"/>
            </svg>
          </span>
          <div>
            <h3>Un classement entre gens qui se connaissent</h3>
            <p>
              Le cercle a son classement et ses paliers, mais il se joue entre personnes
              qui se sont invitées. Pas un tableau mondial d'inconnus.
            </p>
          </div>
        </div>
      </div>

      <div className="card consent-card reveal" id="consent">
        <div className="consent-head">
          <span className="today-label">Ce que j'autorise</span>
          <p>Chaque ligne est une permission que tu donnes sur toi, et que tu reprends quand tu veux.</p>
        </div>

        <div className="consent-row">
          <div className="consent-txt">
            <p className="consent-title">Rappel de prière</p>
            <p className="consent-q">« J'autorise mon cercle à me rappeler une prière quand son heure est passée. »</p>
          </div>
          <button className="switch" type="button" role="switch" aria-checked="true" aria-label="Autoriser les rappels de prière" data-consent="prayer"></button>
        </div>

        <div className="consent-row">
          <div className="consent-txt">
            <p className="consent-title">Rappel d'habitude</p>
            <p className="consent-q">« J'autorise mon cercle à me rappeler une habitude que j'avais prévue aujourd'hui. »</p>
          </div>
          <button className="switch" type="button" role="switch" aria-checked="false" aria-label="Autoriser les rappels d'habitude" data-consent="habit"></button>
        </div>

        <div className="consent-row">
          <div className="consent-txt">
            <p className="consent-title">Récapitulatif du vendredi</p>
            <p className="consent-q">« J'autorise mon cercle à m'envoyer le récapitulatif de ma semaine. »</p>
          </div>
          <button className="switch" type="button" role="switch" aria-checked="true" aria-label="Autoriser le récapitulatif du vendredi" data-consent="weekly"></button>
        </div>

        <div className="consent-row">
          <div className="consent-txt">
            <p className="consent-title">Mot d'encouragement</p>
            <p className="consent-q">Un message libre, sans motif particulier.</p>
          </div>
          <button className="switch" type="button" role="switch" aria-checked="true" aria-label="Autoriser les mots d'encouragement" data-consent="encouragement"></button>
        </div>

        <div className="nudge-demo" id="nudge-demo" data-state="blocked" aria-live="polite">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/>
          </svg>
          <span id="nudge-text">—</span>
        </div>
      </div>
    </div>
  </div>
</section>

<hr className="rule" />

{/* ====================== CALENDRIER ====================== */}
<section id="calendrier">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">Le calendrier</p>
      <h2>Un calendrier qui connaît déjà tes jours.</h2>
      <p>
        Ton agenda habituel voit un mardi 14. Murabbi voit aussi le quatorzième jour du
        mois hégirien — et sait donc, sans que tu aies rien à noter, quels jours de ce
        mois-ci comptent pour toi.
      </p>
    </div>

    <div className="cal-grid">
      <div className="card month reveal" aria-hidden="true">
        <div className="month-head">
          <h3>Un mois hégirien</h3>
          <span>29 ou 30 jours</span>
        </div>
        <div className="dow">
          <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
        </div>
        <div className="days" id="month-days"></div>
        <div className="month-key">
          <span className="key-item"><span className="key-swatch" style={{background: 'color-mix(in srgb, var(--accent) 20%, transparent)'}}></span> Jours blancs — 13, 14, 15</span>
          <span className="key-item"><span className="key-swatch" style={{background: 'color-mix(in srgb, var(--accent) 7%, transparent)'}}></span> Vendredi</span>
        </div>
      </div>

      <div className="cal-list reveal">
        <div className="cal-item">
          <h3>Les jours blancs, repérés d'office</h3>
          <p>
            Les treizième, quatorzième et quinzième jours de chaque mois hégirien
            apparaissent seuls sur ton calendrier. Tu n'as pas à les calculer, ni à te
            souvenir de les inscrire chaque mois.
          </p>
        </div>
        <div className="cal-item">
          <h3>Le vendredi tient sa place</h3>
          <p>
            La colonne du vendredi est marquée dans la grille, et le récapitulatif de
            semaine s'y aligne — parce que ta semaine ne finit pas le dimanche soir.
          </p>
        </div>
        <div className="cal-item">
          <h3>Les deux dates, côte à côte</h3>
          <p>
            Grégorienne et hégirienne s'affichent ensemble, en haut de l'écran d'accueil.
            Deux calendriers, une seule journée : la tienne.
          </p>
        </div>
        <div className="cal-item">
          <h3>Les fêtes arrivent sans surprise</h3>
          <p>
            Les Eid sont posés sur le calendrier à l'avance. Tu les vois venir de loin,
            au lieu de les découvrir la veille.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<hr className="rule" />

{/* ====================== PALIERS ====================== */}
<section id="paliers">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">La progression</p>
      <h2>Six paliers. Le dernier donne son nom à l'application.</h2>
      <p>
        Chaque acte tenu vaut des points, chaque palier relève l'objectif quotidien : plus
        tu avances, plus on attend de toi. Le calibrage est volontairement lent — le
        dernier palier se mérite en années, pas en semaines.
      </p>
    </div>

    <div className="levels reveal">
      <div className="level-track">
        <div className="level" style={{ '--i': '0' } as React.CSSProperties}>
          <p className="level-name">Aspirant</p>
          <p className="level-th mono">0 pt</p>
          <p className="level-goal">Objectif 30 pts / jour</p>
        </div>
        <div className="level" style={{ '--i': '1' } as React.CSSProperties}>
          <p className="level-name">Murīd</p>
          <p className="level-th mono">10 000 pts</p>
          <p className="level-goal">Objectif 45 pts / jour</p>
        </div>
        <div className="level" style={{ '--i': '2' } as React.CSSProperties}>
          <p className="level-name">Sālik</p>
          <p className="level-th mono">30 000 pts</p>
          <p className="level-goal">Objectif 60 pts / jour</p>
        </div>
        <div className="level" style={{ '--i': '3' } as React.CSSProperties}>
          <p className="level-name">Mujāhid</p>
          <p className="level-th mono">70 000 pts</p>
          <p className="level-goal">Objectif 75 pts / jour</p>
        </div>
        <div className="level" style={{ '--i': '4' } as React.CSSProperties}>
          <p className="level-name">Walī</p>
          <p className="level-th mono">150 000 pts</p>
          <p className="level-goal">Objectif 90 pts / jour</p>
        </div>
        <div className="level" style={{ '--i': '5' } as React.CSSProperties} data-last="true">
          <p className="level-name">Murabbī</p>
          <p className="level-th mono">300 000 pts</p>
          <p className="level-goal">Objectif 105 pts / jour</p>
        </div>
      </div>
      <p className="levels-foot">
        Au dernier palier, la formule change : tu guides désormais autant que tu
        progresses. C'est de là que vient le nom de l'application — et c'est la seule
        promesse qu'elle te fait sur la durée.
      </p>
    </div>
  </div>
</section>

{/* ====================== RESPIRATION ======================
  Unique photographie de la page. Crédit et licence : img/CREDITS.md.
  Aucun visage identifiable — choix documenté (licence Unsplash = droit du
  photographe, pas autorisation de diffusion des personnes).
  ========================================================== */}
<figure className="breath">
  <img src="/img/silhouette-desert.webp"
       width="1600" height="2400"
       loading="lazy" decoding="async"
       alt="Au lever du jour, une personne seule se tient debout sur la crête d'une dune, minuscule dans un désert immense." />
  <figcaption>
    <div className="wrap reveal">
      <p className="breath-k">Le rythme</p>
      <p className="breath-line">
        <span>Le soleil se déplace chaque jour. Tes repères suivent.</span>
        <span>Toi, tu n'as rien à recalculer.</span>
      </p>
    </div>
  </figcaption>
</figure>

{/* ====================== PROMESSE ====================== */}
<section className="promise" id="promesse">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">Ce que ça veut dire</p>
      <h2>« Gérer ta vie » est une grande phrase. Voilà ce qu'elle recouvre ici.</h2>
    </div>
    <div className="promise-lines reveal">
      <div className="promise-line"><span>01</span><span>Tes rappels s'accrochent au rythme réel de ta journée, et se recalculent sans toi.</span></div>
      <div className="promise-line"><span>02</span><span>Une habitude porte exactement ce qu'elle demande : des étapes, une durée, une preuve — ou rien de tout ça.</span></div>
      <div className="promise-line"><span>03</span><span>Des proches peuvent te relever, dans les limites précises que tu as ouvertes toi-même.</span></div>
      <div className="promise-line"><span>04</span><span>Ton calendrier connaît tes jours sans que tu aies à les y inscrire.</span></div>
      <div className="promise-line"><span>05</span><span>Ta progression se mesure sur des années, pas sur une série de sept jours à ne pas casser.</span></div>
    </div>
  </div>
</section>

{/*
  EMPLACEMENT RÉSERVÉ — preuve sociale.
  Volontairement vide : aucun chiffre d'usage, aucun témoignage et aucun logo de presse
  ne sont disponibles à ce jour. À remplir uniquement avec du réel, après la bêta.
*/}

{/* ====================== LISTE D'ATTENTE ====================== */}
<section className="waitlist" id="liste-attente">
  <div className="wrap">
    <div className="waitlist-inner reveal">
      <p className="eyebrow">La suite</p>
      <h2 style={{fontSize: 'clamp(28px,4.4vw,40px)'}}>L'application n'est pas encore publiée.</h2>
      <p style={{marginTop: '18px', fontSize: '17px', color: 'var(--text-2)'}}>
        Murabbi est en construction. Laisse ton adresse : tu seras prévenu à l'ouverture
        de la bêta, et tu recevras l'accès avant la mise en ligne publique. Rien d'autre.
      </p>

      {/*
        FORMULAIRE NON RELIÉ — action à brancher côté PO.
        Aucun backend n'est câblé : le champ `data-endpoint` de <form> est vide, et le
        script affiche un message honnête plutôt qu'une fausse confirmation.
        Pour l'activer : renseigner data-endpoint avec une URL qui accepte un POST
        JSON {email}, et vérifier CORS + double opt-in + mention RGPD.
      */}
      <form className="wl-form" id="wl-form" data-endpoint="" noValidate>
        <div className="wl-field">
          <label htmlFor="wl-email">Adresse e-mail</label>
          <input type="email" id="wl-email" name="email" inputMode="email"
                 autoComplete="email" placeholder="toi@exemple.com" required
                 aria-describedby="wl-msg" />
        </div>
        <button className="btn btn-primary" type="submit">Me prévenir</button>
      </form>

      <p className="wl-msg" id="wl-msg" hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9"/><path d="M12 16v-4.5M12 8.2h.01"/>
        </svg>
        <span id="wl-msg-text"></span>
      </p>

      <p className="wl-legal">
        Une seule adresse, aucun partage à un tiers, désinscription en un clic dans
        chaque message.
      </p>
    </div>
  </div>
</section>

</main>

<footer className="site-footer">
  <div className="wrap footer-inner">
    <a className="brand" href="#top">
      <svg width="22" height="22" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="11.25" stroke="currentColor" strokeWidth="1.2" opacity=".28"/>
        <path d="M2.6 18.2A11.25 11.25 0 0 1 23.4 18.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="13" cy="8.4" r="2.6" fill="currentColor"/>
      </svg>
      Murabbi
    </a>
    <nav className="footer-legal" aria-label="Pages légales">
      <a href="/confidentialite.html">Confidentialité</a>
      <a href="/cgu.html">Conditions d'utilisation</a>
      <a href="/suppression-compte.html">Supprimer mon compte</a>
    </nav>
    <p className="footer-meta">
      Horaires calculés dans le navigateur (méthode Ligue Islamique Mondiale · Sobh −18°, Isha −17°).
    </p>
  </div>
</footer>

      <LandingScript code={engineCode} />
    </>
  )
}
