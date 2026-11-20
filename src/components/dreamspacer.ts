// Piccoli aiuti per le schede tecniche dei Dreamspacer (Marsylvania)
export const statKeys = ['life', 'attack', 'defense', 'mana', 'speed'] as const;
export type StatKey = (typeof statKeys)[number];

export const statLabel: Record<StatKey, { it: string; en: string }> = {
  life: { it: 'Vita', en: 'Life' },
  attack: { it: 'Attacco', en: 'Attack' },
  defense: { it: 'Difesa', en: 'Defense' },
  mana: { it: 'Mana', en: 'Mana' },
  speed: { it: 'Velocità', en: 'Speed' },
};

export const typeLabel: Record<string, { it: string; en: string }> = {
  weapon: { it: 'Arma', en: 'Weapon' },
  armor: { it: 'Armatura', en: 'Armor' },
  spell: { it: 'Incantesimo', en: 'Spell' },
  equip: { it: 'Equipaggiamento', en: 'Equip' },
};

const ICON = '/img/marsylvania/icons/';
const tokens: Record<string, StatKey> = { life: 'life', atk: 'attack', attack: 'attack', def: 'defense', defense: 'defense', mana: 'mana', speed: 'speed' };

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Testo con {life} {atk} {def} {mana} {speed} trasformati in icone pixel */
export function withIcons(text: string, lang: 'it' | 'en'): string {
  return esc(text || '').replace(/\{(\w+)\}/g, (m, k) => {
    const key = tokens[k.toLowerCase()];
    if (!key) return m;
    const label = statLabel[key][lang];
    return `<img class="ds-ico" src="${ICON}${key}.png" alt="${label}" title="${label}" width="20" height="20">`;
  });
}

export const statIcon = (k: StatKey) => `${ICON}${k}.png`;
export const typeIcon = (t?: string) => `${ICON}${t && typeLabel[t] ? t : 'equip'}.png`;
export const slugOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
