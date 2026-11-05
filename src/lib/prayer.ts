/**
 * Calcul solaire (NOAA) → repères de la journée, porté du moteur historique
 * de la landing. Convention : Ligue islamique mondiale (Fajr −18°, Isha −17°),
 * Asr standard (ombre = 1× la hauteur). Vérifié contre le moteur de
 * l'application sur Dakar : Fajr, Dhuhr et Asr identiques à la minute,
 * Maghrib et Isha à une minute près. Illustratif : ne remplace pas
 * la configuration de l'application.
 */
const RAD = Math.PI / 180

export type CityKey = 'dakar' | 'abidjan' | 'paris' | 'bruxelles' | 'tunis' | 'istanbul' | 'riyad'
export type City = { label: string; lat: number; lon: number; tz: number; dst: 'eu' | null }

export const CITIES: Record<CityKey, City> = {
  dakar: { label: 'Dakar', lat: 14.7167, lon: -17.4677, tz: 0, dst: null },
  abidjan: { label: 'Abidjan', lat: 5.36, lon: -4.0083, tz: 0, dst: null },
  paris: { label: 'Paris', lat: 48.8566, lon: 2.3522, tz: 1, dst: 'eu' },
  bruxelles: { label: 'Bruxelles', lat: 50.8503, lon: 4.3517, tz: 1, dst: 'eu' },
  tunis: { label: 'Tunis', lat: 36.8065, lon: 10.1815, tz: 1, dst: null },
  istanbul: { label: 'Istanbul', lat: 41.0082, lon: 28.9784, tz: 3, dst: null },
  riyad: { label: 'Riyad', lat: 24.7136, lon: 46.6753, tz: 3, dst: null },
}

export type AnchorKey = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'

export const ANCHORS: { key: AnchorKey; label: string }[] = [
  { key: 'fajr', label: 'Fajr' },
  { key: 'sunrise', label: 'Lever du soleil' },
  { key: 'dhuhr', label: 'Dhuhr' },
  { key: 'asr', label: 'Asr' },
  { key: 'maghrib', label: 'Maghrib' },
  { key: 'isha', label: 'Isha' },
]

/** Les cinq prières (le lever du soleil borne une fenêtre sans être une prière). */
export const PRAYERS = ANCHORS.filter((a) => a.key !== 'sunrise')

export type DayTimes = Record<AnchorKey, number | null>

function julianDay(y: number, m: number, d: number) {
  if (m <= 2) {
    y -= 1
    m += 12
  }
  const A = Math.floor(y / 100)
  const B = 2 - A + Math.floor(A / 4)
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5
}

function sunPosition(jd: number) {
  const T = (jd - 2451545) / 36525
  const L0 = (280.46646 + T * (36000.76983 + T * 0.0003032)) % 360
  const M = 357.52911 + T * (35999.05029 - 0.0001537 * T)
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T)
  const C =
    Math.sin(M * RAD) * (1.914602 - T * (0.004817 + 0.000014 * T)) +
    Math.sin(2 * M * RAD) * (0.019993 - 0.000101 * T) +
    Math.sin(3 * M * RAD) * 0.000289
  const trueLong = L0 + C
  const omega = 125.04 - 1934.136 * T
  const lambda = trueLong - 0.00569 - 0.00478 * Math.sin(omega * RAD)
  const eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60
  const eps = eps0 + 0.00256 * Math.cos(omega * RAD)
  const decl = Math.asin(Math.sin(eps * RAD) * Math.sin(lambda * RAD)) / RAD
  const y = Math.pow(Math.tan((eps / 2) * RAD), 2)
  const eqTime =
    (4 *
      (y * Math.sin(2 * L0 * RAD) -
        2 * e * Math.sin(M * RAD) +
        4 * e * y * Math.sin(M * RAD) * Math.cos(2 * L0 * RAD) -
        0.5 * y * y * Math.sin(4 * L0 * RAD) -
        1.25 * e * e * Math.sin(2 * M * RAD))) /
    RAD
  return { decl, eqTime }
}

/** zen : distance zénithale en degrés (90,833 = horizon avec réfraction). */
function hourAngle(lat: number, decl: number, zen: number) {
  const c =
    (Math.cos(zen * RAD) - Math.sin(lat * RAD) * Math.sin(decl * RAD)) /
    (Math.cos(lat * RAD) * Math.cos(decl * RAD))
  if (c > 1 || c < -1) return null // le phénomène n'a pas lieu ce jour-là
  return Math.acos(c) / RAD
}

function lastSunday(y: number, m: number) {
  const d = new Date(Date.UTC(y, m + 1, 0))
  return d.getUTCDate() - d.getUTCDay()
}

function euDst(date: Date) {
  const y = date.getUTCFullYear()
  const start = Date.UTC(y, 2, lastSunday(y, 2), 1)
  const end = Date.UTC(y, 9, lastSunday(y, 9), 1)
  const t = date.getTime()
  return t >= start && t < end ? 1 : 0
}

export function utcOffset(city: City, date: Date) {
  return city.tz + (city.dst === 'eu' ? euDst(date) : 0)
}

/** Horaires en heures décimales locales, pour le jour `date` (minuit UTC). */
export function prayerTimes(city: City, date: Date): DayTimes {
  const y = date.getUTCFullYear()
  const m = date.getUTCMonth() + 1
  const d = date.getUTCDate()
  const tz = utcOffset(city, date)
  const jd = julianDay(y, m, d) + (12 - city.lon / 15 - tz) / 24
  const { decl, eqTime } = sunPosition(jd)
  const noon = 12 - city.lon / 15 - eqTime / 60 + tz
  const ha = (zen: number) => hourAngle(city.lat, decl, zen)

  const shadowAngle = Math.atan(1 / (1 + Math.tan(Math.abs(city.lat - decl) * RAD))) / RAD
  const asrHA = hourAngle(city.lat, decl, 90 - shadowAngle)

  const sub = (h: number | null) => (h === null ? null : noon - h / 15)
  const add = (h: number | null) => (h === null ? null : noon + h / 15)

  return {
    fajr: sub(ha(108)),
    sunrise: sub(ha(90.833)),
    dhuhr: noon + 1 / 60,
    asr: add(asrHA),
    maghrib: add(ha(90.833)),
    isha: add(ha(107)),
  }
}

/** « 05:41 » ; « — » si le phénomène n'a pas lieu ce jour-là. */
export function fmt(h: number | null) {
  if (h === null || Number.isNaN(h)) return '—'
  const t = ((h % 24) + 24) % 24
  const total = Math.floor(t * 60 + 1e-6)
  return String(Math.floor(total / 60)).padStart(2, '0') + ':' + String(total % 60).padStart(2, '0')
}

export const midnightUTC = (d: Date) =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))

export function addMonths(d: Date, n: number) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, d.getUTCDate()))
}

/** Heure locale décimale de la ville à l'instant `now`. */
export function nowLocal(city: City, now: Date) {
  return (now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600 + utcOffset(city, now) + 24) % 24
}
