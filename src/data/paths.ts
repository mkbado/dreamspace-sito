import { sections, type Lang } from '../i18n/ui';
import type { Game, Rpg, Setting } from './catalog';

export function itemPath(lang: Lang, item: Game | Rpg | Setting): string {
  const sec = item.kind === 'game' ? sections[lang].games : sections[lang].rpg;
  return `/${lang}/${sec}/${item.slug}/`;
}
