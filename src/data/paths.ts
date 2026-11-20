import { sections, type Lang } from '../i18n/ui';
import type { Game, Rpg, Setting, OneShot } from './catalog';

export function itemPath(lang: Lang, item: Game | Rpg | Setting | OneShot): string {
  const sec = item.kind === 'game' ? sections[lang].games : sections[lang].rpg;
  return `/${lang}/${sec}/${item.slug}/`;
}
