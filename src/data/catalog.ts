import type { Lang } from '../i18n/ui';

type L<T> = Record<Lang, T>;

export interface Character {
  name: string;
  /** nome tradotto, se diverso nelle due lingue */
  title?: L<string>;
  /** ruolo o statistiche, mostrati accanto al nome */
  role?: L<string>;
  home?: string;
  ability?: L<string>;
  image: string;
  color: string;
  ink: string;
  alt: L<string>;
  bio: L<string>; // stringa vuota = da scrivere
  /** scheda tecnica (Marsylvania) */
  planet?: L<string>;
  focus?: L<string>;
  scene?: string;
  spot?: { x: number; y: number; w: number; h: number };
  equip?: { name: L<string>; type?: string; icon?: string; cost?: string; text: L<string> };
  /** slot della Briefcase; il primo dello stesso tipo dell’equip iniziale è bloccato */
  briefcase?: string[];
  levels?: { stats: { life: number; attack: number; defense: number; mana: number; speed: number }; abilities: { name: string | L<string>; cost?: string; passive?: boolean; text: L<string> }[] }[];
}

export interface Game {
  skin?: 'abissi' | 'tavola';
  /** citazioni di giocatori e playtester (vere, con il loro permesso) */
  quotes?: Quote[];
  playtest?: Playtest;
  kind: 'game';
  slug: string;
  title: string;
  titleEn?: string;
  image?: string;
  imageAlt?: L<string>;
  /** immagine della scheda: sostituisce image nella pagina del gioco */
  heroImage?: string;
  heroAlt?: L<string>;
  heroPortrait?: boolean;
  heroSquare?: boolean;
  banner?: string;
  bannerAlt?: L<string>;
  bannerHint?: L<string>;
  tag: L<string>;
  status: L<string>;
  players: string;
  minutes: string;
  age: string; // vuoto = non mostrato
  short: L<string>;
  pitch: L<string>;
  waiting: string; // numero iscritti, segnaposto finché non c'è il contatore vero
  waitingWho: L<string>;
  briefing?: {
    kicker: L<string>;
    title: L<string>;
    paragraphs: L<string[]>;
    areas: { label: L<string>; title: L<string>; text: L<string>; dark: boolean }[];
  };
  features?: { title: L<string>; list: { title: L<string>; text: L<string> }[] };
  characters?: { title: L<string>; note: L<string>; abilityLabel?: L<string>; list: Character[] };
  gallery?: { title: L<string>; note: L<string>; ratio?: string; items: { name: L<string>; image: string; alt: L<string>; quote: L<string> }[] };
  roster?: { title: L<string>; note: L<string>; items: { name: L<string>; role: L<string> }[] };
  tableSections?: {
    dark?: boolean; kicker: L<string>; title: L<string>; intro: L<string>;
    blocks: { kicker: L<string>; title: L<string>; text: L<string>; images: { image: string; kind: string; alt: L<string>; caption?: L<string> }[] }[];
  }[];
  howToPlay?: { title: L<string>; steps: L<string[]>; note: L<string>; image?: string; imageAlt?: L<string>; imageBare?: boolean };
  components?: { n: string; label: L<string> }[];
  componentsExtra?: L<string>;
  team?: { title: L<string>; text: L<string> };
  fileName?: string;
  cta?: L<string>;
}

export interface Rpg {
  /** citazioni di giocatori e playtester (vere, con il loro permesso) */
  quotes?: Quote[];
  playtest?: Playtest;
  kind: 'rpg';
  slug: string;
  title: string;
  series: L<string>;
  tag: L<string>;
  players: L<string>;
  length: L<string>;
  genre: L<string>;
  rules: string;
  languages: L<string>;
  short: L<string>;
  pitch: L<string[]>;
  warning: L<string>;
  files: { title: L<string>; desc: L<string>; it: string; en: string }[];
  investigatorsIntro: L<string>;
  investigators: { name: string; role: L<string>; image: string; sheet?: L<string> }[];
  novelText: L<string>;
  zip: string;
  cardMeta: L<string>;
  cardButton?: L<string>;
  chapterTitle: string;
  /** titoli in inglese (le avventure si traducono, i nomi propri no) */
  titleEn?: string;
  chapterTitleEn?: string;
  chapterSeries: L<string>;
  cover: string;
  coverAlt: L<string>;
  campaignCover?: string;
  campaignCoverAlt?: L<string>;
  campaignRules?: L<string>;
  cardImage: string;
  cardAlt: L<string>;
  campaignIntro: L<string[]>;
  campaignChapters: { n: string; title?: string; titleEn?: string; place: string; status: L<string>; live?: boolean }[];
  locations: { image: string; title: string; caption: L<string> }[];
  kofi: L<{ title: string; text: string }>;
  licence: L<string>;
}

export interface Setting {
  /** citazioni di giocatori e playtester (vere, con il loro permesso) */
  quotes?: Quote[];
  playtest?: Playtest;
  kind: 'setting';
  slug: string;
  title: string;
  image: string;
  imageAlt: L<string>;
  banner: string;
  bannerAlt: L<string>;
  tag: L<string>;
  tagline: L<string>;
  short: L<string>;
  intro: L<string[]>;
  motto: L<string>;
  sheet: { label: L<string>; value: L<string> }[];
  books: { n: string; title: L<string>; text: L<string>; action: L<string>; file: L<string>; cover?: string }[];
  cardMeta: L<string>;
  cardButton?: L<string>;
  novelTitle: string;
  novelTitleEn?: string;
  novel?: { kicker: L<string>; text: L<string> };
  landscapes?: { title: L<string>; list: { image: string; caption: L<string> }[] };
  heroes: { title: L<string>; note: L<string>; list: { name: string; role: L<string>; image: string; alt: L<string>; bio: L<string> }[] };
  peoples: { title: L<string>; list: { name: L<string>; text: L<string>; where: L<string>; image?: string; rare?: boolean }[]; more: L<string> };
  atlas: { title: L<string>; map?: string; mapAlt?: L<string>; list: { name: string; dir: L<string>; text: L<string>; image?: string }[] };
  quote: { text: L<string>; who: L<string> };
  bestiary: { title: L<string>; text: L<string>; names: string[]; image?: string; imageAlt?: L<string> };
  licence: L<string>;
}

// I contenuti stanno in src/content/*: file JSON modificabili anche dal pannello (Pages CMS).
type Raw = { order?: number; draft?: boolean } & Record<string, unknown>;
const isEmpty = (v: unknown): boolean =>
  v == null || v === '' || v === false ||
  (Array.isArray(v) ? v.every(isEmpty) : typeof v === 'object' ? Object.values(v as object).every(isEmpty) : false);
const isL = (v: unknown) => !!v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v as object).sort().join() === 'en,it';
// Il pannello salva le sezioni non usate come oggetti vuoti: qui le togliamo, così la pagina non mostra blocchi vuoti.
const prune = (x: Raw): Raw =>
  Object.fromEntries(Object.entries(x).filter(([, v]) => !(v && typeof v === 'object' && !isL(v) && isEmpty(v)))) as Raw;
function load<T>(mods: Record<string, unknown>, kind: string): T[] {
  return Object.values(mods)
    .map((m) => (m as { default: Raw }).default)
    .map((x) => (kind === 'game' ? prune(x) : x))
    .filter((x) => !x.draft)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .map((x) => ({ ...x, kind }) as T);
}

export const games: Game[] = load<Game>(import.meta.glob('../content/games/*.json', { eager: true }), 'game');
export const rpgs: Rpg[] = load<Rpg>(import.meta.glob('../content/rpgs/*.json', { eager: true }), 'rpg');
export const settings: Setting[] = load<Setting>(import.meta.glob('../content/worlds/*.json', { eager: true }), 'setting');

import siteData from '../content/site.json';
import newsData from '../content/news.json';

export interface Slide { file: string; color: string; image: string; title: string; titleEn?: string; text: L<string>; alt: L<string>; link: L<string> }
export interface Quote { text: L<string>; who: string; role?: L<string> }
export interface Playtest { testers: string[]; more?: L<string>; text: L<string>; moments?: L<string>[] }
export interface News { date: string; title: L<string>; text: L<string>; image?: string; link?: L<string> }
export const site = siteData as {
  kofi?: string; owner?: string; email?: string; analyticsToken?: string;
  home: { kicker: L<string>; title: L<string>; bubble: L<string>; signature: L<string>; slides: Slide[] };
  crew?: { kicker: L<string>; title: L<string>; items: { badge: string; unit: L<string>; title: L<string>; text: L<string> }[] };
  boardgames: { intro: L<string> };
  rpg: { intro: L<string> };
};
export const news: News[] = (newsData as News[]).slice().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export interface TeamMember { name: string; nick?: string; role: L<string>; icon?: string; color?: string }
export interface InfoPage { order?: number; slug: string; path: L<string>; title: L<string>; kicker: L<string>; body: L<string>; team?: TeamMember[] }
export const pages: InfoPage[] = Object.values(import.meta.glob('../content/pages/*.json', { eager: true }))
  .map((m) => (m as { default: InfoPage }).default)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
export const pagePath = (lang: Lang, slug: string) => {
  const p = pages.find((x) => x.slug === slug);
  return p ? `/${lang}/${p.path[lang]}/` : `/${lang}/`;
};

/** Titolo nella lingua della pagina: in inglese usa la traduzione, se c'è. */
import { existsSync } from 'node:fs';
/** Su /en/ usa la variante «-en» dell’immagine, se esiste (es. card-en.webp) */
export const localImg = (src: string | undefined, lang: Lang) => {
  if (!src || lang !== 'en') return src;
  const en = src.replace(/(\.\w+)$/, '-en$1');
  return existsSync(`public${en}`) ? en : src;
};
export const tl = (lang: Lang, it?: string, en?: string) => (lang === 'en' && en ? en : it ?? '');
export const itemTitle = (lang: Lang, x: { title: string; titleEn?: string }) => tl(lang, x.title, x.titleEn);

export interface OneShot {
  kind: 'oneshot'; order?: number; slug: string; title: string; titleEn?: string;
  quotes?: Quote[];
  playtest?: Playtest;
  tag: L<string>; short: L<string>; cardMeta: L<string>; cardButton?: L<string>;
  image: string; imageAlt: L<string>; cover: string; coverAlt: L<string>;
  kicker: L<string>; pitch: L<string[]>; intro: L<string>;
  sheet: { label: L<string>; value: L<string> }[];
  files: { title: L<string>; desc: L<string>; it: string; en: string }[];
  heroesTitle: L<string>; heroes: { name: string; nameEn?: string; image: string; role: L<string>; quote: L<string>; bio: L<string> }[];
  placesTitle: L<string>; places: { image: string; title: L<string>; caption: L<string> }[];
  licence: L<string>;
}
export const oneshots: OneShot[] = load<OneShot>(import.meta.glob('../content/oneshots/*.json', { eager: true }), 'oneshot');

/* ---------- Romanzi a puntate: un file per romanzo, capitoli leggibili online ---------- */
export interface NovelChapter { slug: string; label: L<string>; title: L<string>; narrator: L<string>; portrait?: string; image?: string; intro: L<string>; pdf: L<string>; text: L<string> }
export interface Novel { kind: 'novel'; order?: number; slug: string; title: L<string>; series: L<string>; game: string; skin: 'noir' | 'fiaba' | 'stars'; cover: string; image?: string; text: L<string>; chapters: NovelChapter[] }
export const novels: Novel[] = load<Novel>(import.meta.glob('../content/novels/*.json', { eager: true }), 'novel');
export const novelFor = (game: string) => novels.find((n) => n.game === game);
/** un capitolo è uscito in quella lingua se ha il testo (si legge online) o almeno il PDF */
export const chapterOut = (c: NovelChapter, lang: Lang) => !!(c.text?.[lang]?.trim() || c.pdf?.[lang]);
export const chapterOnline = (c: NovelChapter, lang: Lang) => !!c.text?.[lang]?.trim();
export const readingMinutes = (s: string) => Math.max(1, Math.round((s || '').split(/\s+/).length / 220));
/** capitoli da mostrare: quelli usciti più la prossima puntata; gli altri si riassumono in una riga */
export const chapterWindow = (chs: NovelChapter[], lang: Lang) => {
  const next = chs.findIndex((c) => !chapterOut(c, lang));
  const cut = next < 0 ? chs.length : next + 1;
  const num = (c?: NovelChapter) => (c?.label.it.match(/\d+/) || [''])[0];
  return { shown: chs.slice(0, cut), next, rest: chs.length - cut, from: num(chs[cut]), to: num(chs[chs.length - 1]) };
};
