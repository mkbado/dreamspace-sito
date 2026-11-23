import json, sys, yaml, os
os.chdir(os.path.join(os.path.dirname(__file__), '..'))

def S(name, label, **kw):  return {'name': name, 'label': label, 'type': 'string', **kw}
def T(name, label, **kw):  return {'name': name, 'label': label, 'type': 'text', **kw}
def N(name, label, **kw):  return {'name': name, 'label': label, 'type': 'number', **kw}
def B(name, label, **kw):  return {'name': name, 'label': label, 'type': 'boolean', **kw}
def IMG(name, label, **kw): return {'name': name, 'label': label, 'type': 'image', 'options': {'media': 'images'}, **kw}
def FILE(name, label, **kw): return {'name': name, 'label': label, 'type': 'file', 'options': {'media': 'files'}, **kw}
def O(name, label, fields, lst=False, summary=None, **kw):
    f = {'name': name, 'label': label, 'type': 'object', 'fields': fields, **kw}
    if lst:
        flat = summary and '.' not in summary.replace('fields.', '')
        f['list'] = {'collapsible': {'collapsed': True, 'summary': summary.replace('fields.', '')}} if flat else True
    return f
def L(name, label, kind='string', lst=False):
    mk = {'string': S, 'text': T, 'file': FILE}[kind]
    a = mk('it', 'Italiano'); b = mk('en', 'English')
    if lst: a['list'] = True; b['list'] = True
    return O(name, label, [a, b])

common_top = [
    N('order', 'Ordine (1 = primo)'),
    B('draft', 'Nascosto (bozza)'),
    S('slug', "Indirizzo (slug) — non cambiarlo dopo la pubblicazione", required=True),
    S('title', 'Titolo', required=True),
    O('playtest', 'Dream-tester: com’è andata al tavolo di prova', [{'name': 'testers', 'label': 'Nomi dei Dream-tester', 'type': 'string', 'list': True}, L('more', 'Dopo i nomi (es. «e molti altri»)'), L('text', 'Racconto breve', 'text'), O('moments', 'Momenti memorabili', [{'name': 'it', 'label': 'Italiano', 'type': 'text'}, {'name': 'en', 'label': 'English', 'type': 'text'}], lst=True, summary='{fields.it}')]),
    O('quotes', 'Citazioni di giocatori e playtester', [L('text', 'Citazione', 'text'), S('who', 'Chi l’ha detta (nome o personaggio)'), L('role', 'Ruolo (es. playtester, giocatrice al tavolo)')], lst=True, summary='{fields.who}'),
]

game = common_top + [
    S('titleEn', 'Titolo in inglese (se diverso)'),
    IMG('image', 'Immagine della scheda (960×600)'), L('imageAlt', 'Descrizione immagine scheda'),
    IMG('heroImage', 'Immagine grande nella pagina'), L('heroAlt', 'Descrizione immagine grande'), B('heroPortrait', 'Immagine grande verticale'), B('heroSquare', 'Immagine grande quadrata'),
    IMG('banner', 'Banner'), L('bannerAlt', 'Descrizione banner'), L('bannerHint', 'Suggerimento sotto il banner (personaggi cliccabili)'),
    L('tag', 'Etichetta (es. Gioco da tavolo · competitivo)'), L('status', 'Stato'),
    S('players', 'Giocatori (es. 1–4)'), S('minutes', 'Durata in minuti (es. 60)'), S('age', 'Età (es. 14+, vuoto = nascosta)'),
    L('short', 'Descrizione breve (scheda)', 'text'), L('pitch', 'Presentazione', 'text'),
    S('waiting', 'Numero in lista d’attesa'), L('waitingWho', 'Chi aspetta (es. Dreamspacer)'), L('cta', 'Testo del pulsante finale'),
    S('fileName', 'Nome file (finestra pixel)'),
    O('briefing', 'Briefing', [L('kicker', 'Occhiello'), L('title', 'Titolo'), L('paragraphs', 'Paragrafi', 'text', lst=True),
        O('areas', 'Aree', [L('label', 'Etichetta'), L('title', 'Titolo'), L('text', 'Testo', 'text'), B('dark', 'Scura')], lst=True, summary='{fields.title.it}')]),
    O('features', 'Caratteristiche', [L('title', 'Titolo'), O('list', 'Elenco', [L('title', 'Titolo'), L('text', 'Testo', 'text')], lst=True, summary='{fields.title.it}')]),
    O('characters', 'Personaggi', [L('title', 'Titolo'), L('note', 'Nota', 'text'), L('abilityLabel', 'Etichetta abilità (es. Oggetto iniziale)'),
        O('list', 'Personaggi', [S('name', 'Nome'), L('title', 'Nome tradotto (facoltativo)'), L('role', 'Ruolo (facoltativo)'), S('home', 'Provenienza'), L('ability', 'Abilità'), IMG('image', 'Ritratto'),
            S('color', 'Colore sfondo (#hex)'), S('ink', 'Colore testo (#hex)'), L('alt', 'Descrizione immagine'), L('bio', 'Biografia', 'text'),
            L('planet', 'Pianeta (scheda tecnica)'), L('focus', 'Stile di gioco (scheda tecnica)'), IMG('scene', 'Sfondo della scheda'), {'name': 'briefcase', 'label': 'Briefcase: slot oggetti (weapon, armor, spell, ally, other)', 'type': 'select', 'list': True, 'options': {'values': ['weapon', 'armor', 'spell', 'ally', 'other']}},
            O('spot', 'Posizione nel banner (in % : x, y, larghezza, altezza)', [N('x', 'x %'), N('y', 'y %'), N('w', 'Larghezza %'), N('h', 'Altezza %')]),
            O('equip', 'Equipaggiamento iniziale', [L('name', 'Nome'), {'name': 'type', 'label': 'Tipo', 'type': 'select', 'options': {'values': ['weapon', 'armor', 'spell', 'ally', 'other']}},
                IMG('icon', 'Icona'), S('cost', 'Costo (es. 1 {mana})'), L('text', 'Effetto ({life} {atk} {def} {mana} {speed} diventano icone)', 'text')]),
            O('levels', 'Livelli (1 e 2)', [O('stats', 'Statistiche', [N('life', 'Vita'), N('attack', 'Attacco'), N('defense', 'Difesa'), N('mana', 'Mana'), N('speed', 'Velocità')]),
                O('abilities', 'Abilità', [L('name', 'Nome'), S('cost', 'Costo (es. 1 {mana})'), B('passive', 'Passiva'), L('text', 'Effetto', 'text')], lst=True, summary='{fields.name.it}')], lst=True)], lst=True, summary='{fields.name}')]),
    O('gallery', 'Galleria', [L('title', 'Titolo'), L('note', 'Nota', 'text'), S('ratio', 'Proporzioni immagini (es. 3 / 2)'),
        O('items', 'Elementi', [L('name', 'Nome'), IMG('image', 'Immagine'), L('alt', 'Descrizione immagine'), L('quote', 'Citazione', 'text')], lst=True, summary='{fields.name.it}')]),
    O('roster', 'Elenco personaggi (senza immagini)', [L('title', 'Titolo'), L('note', 'Nota', 'text'),
        O('items', 'Voci', [L('name', 'Nome'), L('role', 'Ruolo')], lst=True, summary='{fields.name.it}')]),
    O('tableSections', 'Sezioni con carte (Al tavolo, Cibi e Bevande…)', [B('dark', 'Sfondo scuro'), L('kicker', 'Occhiello'), L('title', 'Titolo'), L('intro', 'Introduzione', 'text'),
        O('blocks', 'Blocchi', [L('kicker', 'Occhiello'), L('title', 'Titolo'), L('text', 'Testo', 'text'),
            O('images', 'Immagini', [IMG('image', 'Immagine'), {'name': 'kind', 'label': 'Tipo', 'type': 'select', 'options': {'values': ['card', 'token', 'board']}},
                L('alt', 'Descrizione immagine'), L('caption', 'Didascalia (solo token)')], lst=True)], lst=True)], lst=True),
    O('howToPlay', 'Come si gioca', [L('title', 'Titolo'), L('steps', 'Passi', 'text', lst=True), L('note', 'Nota', 'text'),
        IMG('image', 'Immagine'), L('imageAlt', 'Descrizione immagine'), B('imageBare', 'Immagine senza cornice')]),
    O('components', 'Componenti', [S('n', 'Quantità'), L('label', 'Componente')], lst=True, summary='{fields.n} {fields.label.it}'),
    L('componentsExtra', 'Nota sui componenti', 'text'),
    O('team', 'Chi lo fa', [L('title', 'Titolo'), L('text', 'Testo', 'text')]),
]

rpg = common_top + [
    S('titleEn', 'Titolo in inglese'), S('chapterTitleEn', 'Titolo del capitolo in evidenza, in inglese'),
    S('chapterTitle', 'Titolo del capitolo in evidenza'), L('chapterSeries', 'Occhiello capitolo (es. Capitolo 0 · Valtorva, ottobre 1914)'),
    L('series', 'Sottotitolo campagna'),
    IMG('campaignCover', 'Copertina della campagna (in alto)'), L('campaignCoverAlt', 'Descrizione copertina della campagna'),
    L('campaignRules', 'Cosa serve per giocare', 'text'),
    IMG('cover', 'Copertina del capitolo in evidenza'), L('coverAlt', 'Descrizione copertina del capitolo'),
    IMG('cardImage', 'Immagine della scheda (960×600)'), L('cardAlt', 'Descrizione immagine scheda'), L('cardMeta', 'Riga info nella scheda'), L('cardButton', 'Testo del pulsante nella scheda'),
    L('tag', 'Etichetta'), L('players', 'Giocatori'), L('length', 'Durata'), L('genre', 'Genere'), S('rules', 'Regolamento'), L('languages', 'Lingue'),
    L('short', 'Descrizione breve (scheda)', 'text'),
    L('campaignIntro', 'Presentazione della campagna (paragrafi)', 'text', lst=True),
    O('campaignChapters', 'Capitoli della campagna', [S('n', 'Numero'), S('title', 'Titolo'), S('titleEn', 'Titolo in inglese'), S('place', 'Luogo'), L('status', 'Stato'), B('live', 'Disponibile (evidenziato)')], lst=True, summary='{fields.n} {fields.title}'),
    L('pitch', 'Presentazione del capitolo (paragrafi)', 'text', lst=True),
    L('warning', 'Avviso prima di giocare', 'text'),
    O('files', 'File da scaricare', [L('title', 'Titolo'), L('desc', 'Descrizione'), FILE('it', 'PDF italiano'), FILE('en', 'PDF inglese')], lst=True, summary='{fields.title.it}'),
    FILE('zip', 'Pacchetto completo (ZIP)'),
    O('locations', 'Luoghi (galleria)', [IMG('image', 'Immagine'), S('title', 'Titolo'), L('caption', 'Didascalia')], lst=True, summary='{fields.title}'),
    L('investigatorsIntro', 'Introduzione investigatori', 'text'),
    O('investigators', 'Investigatori', [S('name', 'Nome'), IMG('image', 'Ritratto'), L('role', 'Mestiere'), L('sheet', 'Scheda (PDF)', 'file')], lst=True, summary='{fields.name}'),
    L('novelText', 'Romanzo: presentazione (i capitoli si gestiscono in «Romanzi»)', 'text'),
    O('kofi', 'Fascia donazioni', [O('it', 'Italiano', [S('title', 'Titolo'), T('text', 'Testo')]), O('en', 'English', [S('title', 'Titolo'), T('text', 'Testo')])]),
    L('licence', 'Nota di licenza', 'text'),
]

novel = [
    N('order', 'Ordine (1 = primo)'), B('draft', 'Nascosto (bozza)'),
    S('slug', "Indirizzo (slug) — non cambiarlo dopo la pubblicazione", required=True),
    L('title', 'Titolo del romanzo'), L('series', 'Occhiello (gioco e capitolo)'),
    S('game', 'Gioco collegato (slug, es. il-circolo-del-venerdi)'),
    {'name': 'skin', 'label': 'Stile grafico', 'type': 'select', 'options': {'values': ['noir', 'fiaba', 'stars']}},
    IMG('cover', 'Copertina'), IMG('image', 'Immagine grande'), L('text', 'Presentazione', 'text'),
    O('chapters', 'Capitoli', [
        S('slug', 'Indirizzo del capitolo (slug)'), L('label', 'Etichetta (es. Capitolo 1)'), L('title', 'Titolo'),
        L('narrator', 'Protagonista (es. Ruggero Alberti, capitano di fanteria)'), IMG('portrait', 'Ritratto del protagonista (facoltativo)'),
        IMG('image', 'Illustrazione d’apertura (facoltativa)'), L('intro', 'Presentazione breve', 'text'), L('pdf', 'PDF da scaricare', 'file'),
        O('text', 'Testo del capitolo (vuoto = in arrivo)', [{'name': 'it', 'label': 'Italiano (Markdown: * * * = cambio scena; ![didascalia](immagine "largo|destra|sinistra"))', 'type': 'text'}, {'name': 'en', 'label': 'English (Markdown)', 'type': 'text'}]),
    ], lst=True, summary='{fields.label.it} · {fields.title.it}'),
]

world = common_top + [
    IMG('image', 'Immagine della scheda (960×600)'), L('imageAlt', 'Descrizione immagine scheda'),
    IMG('banner', 'Banner'), L('bannerAlt', 'Descrizione banner'),
    L('tag', 'Etichetta'), L('tagline', 'Sottotitolo'), L('short', 'Descrizione breve (scheda)', 'text'), L('cardMeta', 'Riga info nella scheda'), L('cardButton', 'Testo del pulsante nella scheda'),
    S('novelTitle', 'Titolo del romanzo'), S('novelTitleEn', 'Titolo del romanzo in inglese'),
    L('intro', 'Introduzione (paragrafi)', 'text', lst=True), L('motto', 'Motto'),
    O('sheet', 'Scheda tecnica', [L('label', 'Voce'), L('value', 'Valore')], lst=True, summary='{fields.label.it}'),
    O('books', 'Libri', [S('n', 'Numero'), L('title', 'Titolo'), L('text', 'Descrizione', 'text'), L('action', 'Testo del pulsante'), L('file', 'File (PDF o link)', 'file'), IMG('cover', 'Copertina del libro')], lst=True, summary='{fields.title.it}'),
    O('heroes', 'Eroi', [L('title', 'Titolo'), L('note', 'Nota', 'text'),
        O('list', 'Eroi', [S('name', 'Nome'), L('role', 'Ruolo'), IMG('image', 'Ritratto'), L('alt', 'Descrizione immagine'), L('bio', 'Biografia', 'text')], lst=True, summary='{fields.name}')]),
    O('novel', 'Romanzo a puntate (i capitoli si gestiscono in «Romanzi»)', [L('kicker', 'Occhiello'), L('text', 'Presentazione', 'text')]),
    O('landscapes', 'Paesaggi (galleria)', [L('title', 'Titolo'), O('list', 'Immagini', [IMG('image', 'Immagine'), L('caption', 'Didascalia')], lst=True)]),
    O('peoples', 'Popoli', [L('title', 'Titolo'), O('list', 'Popoli', [L('name', 'Nome'), L('text', 'Testo', 'text'), L('where', 'Dove vivono')], lst=True, summary='{fields.name.it}'), L('more', 'Nota finale', 'text')]),
    O('atlas', 'Atlante', [L('title', 'Titolo'), O('list', 'Luoghi', [S('name', 'Nome'), L('dir', 'Direzione'), L('text', 'Testo', 'text')], lst=True, summary='{fields.name}')]),
    O('quote', 'Citazione', [L('text', 'Testo', 'text'), L('who', 'Autore')]),
    O('bestiary', 'Bestiario', [L('title', 'Titolo'), L('text', 'Testo', 'text'), S('names', 'Creature', list=True)]),
    L('licence', 'Nota di licenza', 'text'),
]

site = [
    S('kofi', 'Link per le donazioni (es. https://ko-fi.com/…)'),
    S('owner', 'Nome di chi gestisce il sito (footer)'),
    S('email', 'Email di contatto (footer)'),
    S('analyticsToken', 'Token di Cloudflare Web Analytics (statistiche visite)'),
    O('home', 'Home', [L('kicker', 'Occhiello'), L('title', 'Titolo'), L('bubble', 'Messaggio di benvenuto', 'text'), L('signature', 'Firma'),
        O('slides', 'Carosello (finestre che scorrono)', [S('file', 'Nome finestra (es. INTOLLERANTI.PNG)'), S('color', 'Colore barra (#hex)'), IMG('image', 'Immagine quadrata (740×740)'),
            S('title', 'Titolo'), S('titleEn', 'Titolo in inglese (facoltativo)'), L('text', 'Riga di info'), L('alt', 'Descrizione immagine'), L('link', 'Link')], lst=True, summary='{fields.file}')]),
    O('crew', 'Home: chi c’è dietro', [L('kicker', 'Occhiello'), L('title', 'Titolo'),
        O('items', 'Riquadri', [S('badge', 'Numero o simbolo grande'), L('unit', 'Sotto il numero'), L('title', 'Titolo'), L('text', 'Testo', 'text')], lst=True)]),
    O('boardgames', 'Pagina Giochi da tavolo', [L('intro', 'Introduzione', 'text')]),
    O('rpg', 'Pagina Giochi di ruolo', [L('intro', 'Introduzione', 'text')]),
]
news = [
    {'name': 'date', 'label': 'Data', 'type': 'date'},
    L('title', 'Titolo'), L('text', 'Testo', 'text'), IMG('image', 'Immagine'),
    L('link', 'Link (es. /it/giochi-da-tavolo/marsylvania/)'),
]

coll = lambda name, label, path, fields: {
    'name': name, 'label': label, 'type': 'collection', 'path': path, 'format': 'json',
    'filename': '{primary}.json', 'view': {'primary': 'title'},
    'fields': fields}
cfg = {
    'media': [
        {'name': 'images', 'label': 'Immagini', 'input': 'public/img', 'output': '/img', 'rename': 'safe', 'extensions': ['webp', 'jpg', 'jpeg', 'png', 'gif', 'svg']},
        {'name': 'files', 'label': 'File da scaricare', 'input': 'public/files', 'output': '/files', 'rename': 'safe', 'extensions': ['pdf', 'zip', 'epub']},
    ],
    'content': [
        {'name': 'site', 'label': 'Impostazioni del sito', 'type': 'file', 'path': 'src/content/site.json', 'format': 'json', 'fields': site},
        {'name': 'news', 'label': 'Novità', 'type': 'file', 'path': 'src/content/news.json', 'format': 'json', 'list': True, 'fields': news},
        coll('games', 'Giochi da tavolo', 'src/content/games', game),
        coll('rpgs', 'Giochi di ruolo: campagne', 'src/content/rpgs', rpg),
        coll('worlds', 'Giochi di ruolo: ambientazioni', 'src/content/worlds', world),
        coll('novels', 'Romanzi', 'src/content/novels', novel),
        coll('oneshots', 'Giochi di ruolo: one-shot', 'src/content/oneshots', common_top + [
            S('titleEn', 'Titolo in inglese'), L('tag', 'Etichetta'), L('short', 'Descrizione breve (scheda)', 'text'), L('cardMeta', 'Riga info nella scheda'), L('cardButton', 'Testo del pulsante nella scheda'),
            IMG('image', 'Immagine della scheda (960×600)'), L('imageAlt', 'Descrizione immagine scheda'), IMG('cover', 'Copertina'), L('coverAlt', 'Descrizione copertina'),
            L('kicker', 'Occhiello'), L('pitch', 'Presentazione (paragrafi)', 'text', lst=True), L('intro', 'Riquadro introduttivo', 'text'),
            O('sheet', 'Scheda tecnica', [L('label', 'Voce'), L('value', 'Valore')], lst=True, summary='{fields.label.it}'),
            O('files', 'File da scaricare', [L('title', 'Titolo'), L('desc', 'Descrizione'), FILE('it', 'PDF italiano'), FILE('en', 'PDF inglese')], lst=True, summary='{fields.title.it}'),
            L('heroesTitle', 'Titolo personaggi'), O('heroes', 'Personaggi', [S('name', 'Nome'), S('nameEn', 'Nome in inglese (se diverso)'), IMG('image', 'Immagine'), L('role', 'Classe'), L('quote', 'Motto'), L('bio', 'Descrizione', 'text')], lst=True, summary='{fields.name}'),
            L('placesTitle', 'Titolo luoghi'), O('places', 'Luoghi', [IMG('image', 'Immagine'), L('title', 'Titolo'), L('caption', 'Didascalia')], lst=True, summary='{fields.title.it}'),
            L('licence', 'Nota di licenza', 'text')]),
        {'name': 'pages', 'label': 'Pagine (Chi siamo, Privacy, Note legali)', 'type': 'collection', 'path': 'src/content/pages', 'format': 'json',
         'filename': '{primary}.json', 'view': {'primary': 'title'}, 'fields': [
            N('order', 'Ordine'), S('slug', 'Codice interno — non cambiarlo', required=True),
            L('path', 'Indirizzo della pagina (es. chi-siamo / about)'), L('title', 'Titolo'), L('kicker', 'Occhiello'),
            O('body', 'Testo', [{'name': 'it', 'label': 'Italiano (Markdown)', 'type': 'text'}, {'name': 'en', 'label': 'English (Markdown)', 'type': 'text'}]),
            O('team', 'Equipaggio (compare dove nel testo c’è {{team}})', [S('name', 'Nome'), S('nick', 'Soprannome (aka…)'), L('role', 'Ruolo'),
                {'name': 'icon', 'label': 'Icona', 'type': 'select', 'options': {'values': ['master', 'idee', 'mago', 'strega', 'tester']}}, S('color', 'Colore (#hex)')], lst=True, summary='{fields.name}'),
        ]},
    ],
}

# --- verify every key in the JSON is covered by the schema
def check(data, fields, where):
    names = {f['name']: f for f in fields}
    bad = []
    if isinstance(data, list):
        for i, d in enumerate(data): bad += check(d, fields, f'{where}[{i}]')
        return bad
    for k, v in data.items():
        if k not in names: bad.append(f'{where}.{k}'); continue
        f = names[k]
        if f['type'] == 'object' and v is not None: bad += check(v, f['fields'], f'{where}.{k}')
    return bad
problems = []
import glob
for p in glob.glob('src/content/games/*.json'): problems += check(json.load(open(p)), game, p)
for p in glob.glob('src/content/rpgs/*.json'): problems += check(json.load(open(p)), rpg, p)
for p in glob.glob('src/content/worlds/*.json'): problems += check(json.load(open(p)), world, p)
for p in glob.glob('src/content/novels/*.json'): problems += check(json.load(open(p)), novel, p)
for p in glob.glob('src/content/oneshots/*.json'): problems += check(json.load(open(p)), [c for c in cfg['content'] if c['name']=='oneshots'][0]['fields'], p)
problems += check(json.load(open('src/content/site.json')), site, 'site')
for p in glob.glob('src/content/pages/*.json'): problems += check(json.load(open(p)), [{'name':k,'type':'string'} for k in ('order','slug','path','title','kicker','body','team')], p)
problems += check(json.load(open('src/content/news.json')), news, 'news')
print('uncovered:', problems or 'none')

class D(yaml.SafeDumper): pass
D.add_representer(str, lambda d, s: d.represent_scalar('tag:yaml.org,2002:str', s, style='"' if any(c in s for c in '{}:#') else None))
open('.pages.yml', 'w').write('# Configurazione del pannello Pages CMS (app.pagescms.org). Generata da tools/gen_pages.py.\n' + yaml.dump(cfg, Dumper=D, allow_unicode=True, sort_keys=False, width=200))
