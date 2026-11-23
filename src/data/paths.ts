import { sections, type Lang } from '../i18n/ui';
import type { Game, Rpg, Setting, OneShot, Novel, NovelChapter } from './catalog';

export function itemPath(lang: Lang, item: Game | Rpg | Setting | OneShot): string {
  const sec = item.kind === 'game' ? sections[lang].games : sections[lang].rpg;
  return `/${lang}/${sec}/${item.slug}/`;
}

export const novelsPath = (lang: Lang) => `/${lang}/${sections[lang].novels}/`;
export const novelPath = (lang: Lang, n: Novel) => `${novelsPath(lang)}${n.slug}/`;
export const chapterPath = (lang: Lang, n: Novel, c: NovelChapter) => `${novelPath(lang, n)}${c.slug}/`;
