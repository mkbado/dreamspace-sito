import type { Lang } from '../i18n/ui';

type L<T> = Record<Lang, T>;

export interface Character {
  name: string;
  home?: string;
  ability?: L<string>;
  image: string;
  color: string;
  ink: string;
  alt: L<string>;
  bio: L<string>; // stringa vuota = da scrivere
}

export interface Game {
  kind: 'game';
  slug: string;
  title: string;
  image?: string;
  imageAlt?: L<string>;
  /** immagine della scheda: sostituisce image nella pagina del gioco */
  heroImage?: string;
  heroAlt?: L<string>;
  heroPortrait?: boolean;
  banner?: string;
  bannerAlt?: L<string>;
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
  characters?: { title: L<string>; note: L<string>; list: Character[] };
  gallery?: { title: L<string>; note: L<string>; items: { name: L<string>; image: string; alt: L<string>; quote: L<string> }[] };
  roster?: { title: L<string>; note: L<string>; items: { name: L<string>; role: L<string> }[] };
  howToPlay?: { title: L<string>; steps: L<string[]>; note: L<string>; image?: string; imageAlt?: L<string>; imageBare?: boolean };
  components?: { n: string; label: L<string> }[];
  componentsExtra?: L<string>;
  team?: { title: L<string>; text: L<string> };
  fileName?: string;
  cta?: L<string>;
}

export interface Rpg {
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
  investigators: { name: string; role: L<string>; image: string }[];
  novelText: L<string>;
  chapters: { title: string; file: string }[];
  zip: string;
  cardMeta: L<string>;
  chapterTitle: string;
  chapterSeries: L<string>;
  cover: string;
  coverAlt: L<string>;
  cardImage: string;
  cardAlt: L<string>;
  campaignIntro: L<string[]>;
  campaignChapters: { n: string; title: string; place: string; status: L<string>; live?: boolean }[];
  locations: { image: string; title: string; caption: L<string> }[];
  kofi: L<{ title: string; text: string }>;
  licence: L<string>;
}

export interface Setting {
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
  books: { n: string; title: L<string>; text: L<string>; action: L<string>; file: L<string> }[];
  cardMeta: L<string>;
  novelTitle: string;
  heroes: { title: L<string>; note: L<string>; list: { name: string; role: L<string>; image: string; alt: L<string>; bio: L<string> }[] };
  peoples: { title: L<string>; list: { name: L<string>; text: L<string>; where: L<string> }[]; more: L<string> };
  atlas: { title: L<string>; list: { name: string; dir: L<string>; text: L<string> }[] };
  quote: { text: L<string>; who: L<string> };
  bestiary: { title: L<string>; text: L<string>; names: string[] };
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

export interface News { date: string; title: L<string>; text: L<string>; image?: string; link?: L<string> }
export const site = siteData as {
  kofi: string; owner: string; email: string;
  home: { kicker: L<string>; title: L<string>; bubble: L<string>; signature: L<string>; image: string };
  boardgames: { intro: L<string> };
  rpg: { intro: L<string> };
};
export const news: News[] = (newsData as News[]).slice().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
