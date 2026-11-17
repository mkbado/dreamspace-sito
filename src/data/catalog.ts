import type { Lang } from '../i18n/ui';

type L<T> = Record<Lang, T>;

export interface Character {
  name: string;
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
  pixelArt?: 'table';
  tag: L<string>;
  status: L<string>;
  players: string;
  minutes: string;
  age: string;
  short: L<string>;
  pitch: L<string>;
  waiting: string; // numero iscritti, segnaposto finché non c'è il contatore vero
  briefing?: {
    kicker: L<string>;
    title: L<string>;
    paragraphs: L<string[]>;
    areas: { label: L<string>; title: L<string>; text: L<string>; dark: boolean }[];
  };
  characters?: { title: L<string>; note: L<string>; list: Character[] };
  howToPlay?: { title: L<string>; steps: L<string[]>; note: L<string>; image?: string; imageAlt?: L<string> };
  components?: { n: string; label: L<string> }[];
  guests?: { name: L<string>; color: string }[];
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
  investigators: { name: string; role: L<string> }[];
  novelText: L<string>;
  chapters: string[];
  kofi: L<{ title: string; text: string }>;
  licence: L<string>;
}

export const games: Game[] = [
  {
    kind: 'game',
    slug: 'marsylvania',
    title: 'Dreamspace: Mission to Marsylvania',
    image: '/img/crew.webp',
    imageAlt: {
      it: 'Quattro Dreamspacer animali armati di blaster attraversano il deserto di Marte, in pixel art',
      en: 'Four animal Dreamspacers with blasters crossing the Martian desert, in pixel art',
    },
    tag: { it: 'Gioco da tavolo · cooperativo', en: 'Board game · co-op' },
    status: { it: 'In sviluppo · Kickstarter in arrivo', en: 'In development · Kickstarter coming' },
    players: '1–4',
    minutes: '45–90',
    age: '14+',
    short: {
      it: 'Stagisti cacciatori di taglie, un pianeta maledetto e un Lord Vampiro con una taglia da 13 milioni di Kron. In palio: il titolo di Impiegato del Mese.',
      en: 'Bounty-hunting interns, a cursed planet and a Vampire Lord worth 13 million Kron. The prize: Employee of the Month.',
    },
    pitch: {
      it: "Una squadra di stagisti cacciatori di taglie atterra su Marsylvania, un Marte maledetto pieno di lupi mannari e vampiri. L'obiettivo: la testa del Lord Vampiro e il titolo di Impiegato del Mese.",
      en: 'A team of bounty-hunting interns lands on Marsylvania, a cursed Mars full of werewolves and vampires. The goal: the Vampire Lord’s head and the title of Employee of the Month.',
    },
    waiting: '[N]',
    briefing: {
      kicker: {
        it: 'Briefing di missione · da ELIT-043, Divisione Risorse Non Umane',
        en: 'Mission briefing · from ELIT-043, Non-Human Resources Division',
      },
      title: { it: 'Pianeta 197, Universo G', en: 'Planet 197, Universe G' },
      paragraphs: {
        it: [
          "Benvenuti, stagisti. Marsylvania è come il Marte della Via Lattea, ma qui l'ha colonizzato un'antica civiltà umana, i Nuwa, e una maledizione ha trasformato parte degli abitanti in lupi mannari e vampiri.",
          'Il vostro compito: trovare la fortezza dei vampiri e tagliare la testa al Lord Vampiro. La taglia è di 13 milioni di Kron. Non andrà a voi, naturalmente: la società vi nominerà Impiegato del Mese. Che emozione!',
        ],
        en: [
          'Welcome, interns. Marsylvania is just like the Milky Way’s Mars, except an ancient human civilisation, the Nuwa, settled it, and a curse has turned some of its people into werewolves and vampires.',
          'Your task: find the vampires’ fortress and cut off the Vampire Lord’s head. The bounty is 13 million Kron. It won’t go to you, of course: the company will name you Employee of the Month. How exciting!',
        ],
      },
      areas: [
        {
          label: { it: 'Area 1 · sempre giorno', en: 'Area 1 · always day' },
          title: { it: 'Il Deserto di Nuwa', en: 'The Nuwa Desert' },
          text: {
            it: 'Qui arrivate con il Dream-Portal. Caldo allucinante, ma il posto giusto per trovare oggetti e potenziamenti.',
            en: 'You arrive here through the Dream-Portal. Blistering heat, but the right place to find items and upgrades.',
          },
          dark: false,
        },
        {
          label: { it: 'Area 2 · sempre notte', en: 'Area 2 · always night' },
          title: { it: 'La Terra Oscura', en: 'The Dark Land' },
          text: {
            it: "Il sole non sorge mai. Da qualche parte c'è il rifugio del Lord Vampiro: se ve la prendete comoda, sarà lui a trovare voi.",
            en: 'The sun never rises. Somewhere out there is the Vampire Lord’s lair: take your time, and he’ll find you first.',
          },
          dark: true,
        },
      ],
    },
    characters: {
      title: { it: 'I sei Dreamspacer', en: 'The six Dreamspacers' },
      note: { it: 'Scegli il tuo stagista. Illustrazioni in lavorazione.', en: 'Pick your intern. Artwork in progress.' },
      list: [
        { name: 'Prof Giraf', image: '/img/chars/prof-giraf.webp', color: '#F28C28', ink: '#0A0D24', alt: { it: 'Una giraffa con gli occhialoni che tiene il fuoco nel palmo della mano', en: 'A goggled giraffe holding fire in its palm' }, bio: { it: '', en: '' } },
        { name: 'Queen Illuminati', image: '/img/chars/queen-illuminati.webp', color: '#8A5CD8', ink: '#FFF4DC', alt: { it: 'Una regina con il diadema e un triangolo con l’occhio sospeso sulla mano', en: 'A crowned queen with an all-seeing-eye triangle floating over her hand' }, bio: { it: '', en: '' } },
        { name: 'Venusian Ronin', image: '/img/chars/venusian-ronin.webp', color: '#3FA34D', ink: '#0A0D24', alt: { it: 'Un guerriero insetto con ali di foglia e cappello di paglia, in posa di combattimento', en: 'An insect warrior with leaf wings and a straw hat in a fighting stance' }, bio: { it: '', en: '' } },
        { name: 'Alligactor', image: '/img/chars/alligactor.webp', color: '#D9442B', ink: '#FFF4DC', alt: { it: 'Un alligatore elegante con cappello piumato che lancia carte da gioco', en: 'A dapper alligator in a plumed hat throwing playing cards' }, bio: { it: 'Bandito da ogni bar di Lizaurus per aver barato a qualsiasi gioco. Si è fatto reclutare imbrogliando, e in qualche modo ne esce sempre vivo.', en: 'Banned from every bar on Lizaurus for cheating at every game imaginable. He cheated his way into the job, and somehow he always comes out alive.' } },
        { name: 'Chatblob', image: '/img/chars/chatblob.webp', color: '#9BE15D', ink: '#0A0D24', alt: { it: 'Una massa di gelatina verde piena di circuiti, cavi e schermi olografici', en: 'A green jelly blob full of circuits, wires and holographic screens' }, bio: { it: '', en: '' } },
        { name: 'Lord Caramel', image: '/img/chars/lord-caramel.webp', color: '#EE7FB0', ink: '#0A0D24', alt: { it: 'Un cavaliere con l’armatura di biscotto decorata di confettini e una spada di cristallo rosa', en: 'A knight in sprinkle-studded cookie armour with a pink crystal sword' }, bio: { it: '', en: '' } },
      ],
    },
    howToPlay: {
      title: { it: 'Un turno, cinque fasi', en: 'One turn, five phases' },
      steps: {
        it: ['Movimento sulle zone del pianeta', 'Esplorazione della zona dove ti fermi', 'Combattimento con i dadi spada, scudo e pozione', 'Fase del Mascalzone', 'Recupero di salute e mana'],
        en: ['Move across the planet’s zones', 'Explore the zone where you stop', 'Fight with sword, shield and potion dice', 'The Rascal phase', 'Recover health and mana'],
      },
      note: {
        it: 'Nemici di cinque tipi: umani, animali, androidi, lupi mannari e vampiri. Più vi avvicinate al Boss finale, più si fanno duri.',
        en: 'Five kinds of enemies: humans, animals, androids, werewolves and vampires. The closer you get to the final Boss, the tougher they get.',
      },
      image: '/img/carte-nemici.webp',
      imageAlt: {
        it: 'Tre carte Nemico del prototipo: il Wormalien, con 2 vita, 2 attacco, 1 difesa ed effetto veleno',
        en: 'Three prototype Enemy cards: the Wormalien, with 2 health, 2 attack, 1 defence and a poison effect',
      },
    },
    components: [
      { n: '108', label: { it: 'carte', en: 'cards' } },
      { n: '105', label: { it: 'token', en: 'tokens' } },
      { n: '30', label: { it: 'zone del pianeta', en: 'planet zones' } },
      { n: '8', label: { it: 'miniature', en: 'miniatures' } },
      { n: '8', label: { it: 'dadi', en: 'dice' } },
      { n: '6+2', label: { it: 'schede eroi e boss', en: 'hero and boss boards' } },
    ],
  },
  {
    kind: 'game',
    slug: 'intolleranti',
    title: 'Intolleranti!',
    pixelArt: 'table',
    tag: { it: 'Gioco di carte · in sviluppo', en: 'Card game · in development' },
    status: { it: 'In sviluppo', en: 'In development' },
    players: '[N–N]',
    minutes: '[DURATA]',
    age: '[ETÀ]+',
    short: {
      it: 'Otto ospiti, otto intolleranze, una vita sociale da salvare. Accetta inviti, sopravvivi a sushi e degustazioni di vini, e torna a casa intero.',
      en: 'Eight guests, eight food intolerances, one social life to save. Accept invitations, survive sushi and wine tastings, and make it home in one piece.',
    },
    pitch: {
      it: "Ogni giocatore è un ospite con la sua intolleranza e il suo colore. Le serate valgono punti, ma bisogna mangiare e bere quello che arriva in tavola: se un piatto porta il tuo colore, sono guai.",
      en: 'Each player is a guest with their own intolerance and colour. Nights out score points, but you have to eat and drink whatever lands on the table: if a dish carries your colour, you’re in trouble.',
    },
    waiting: '[N]',
    guests: [
      { name: { it: 'Il Vegetariano', en: 'The Vegetarian' }, color: '#3FA34D' },
      { name: { it: 'La Celiaca', en: 'The Coeliac' }, color: '#F2C230' },
      { name: { it: 'Il No al Lattosio', en: 'The Lactose-Free' }, color: '#5BB8F0' },
      { name: { it: "L'Astemio", en: 'The Teetotaller' }, color: '#D9442B' },
      { name: { it: "L'Anti-Uova", en: 'The Egg-Hater' }, color: '#F28C28' },
      { name: { it: 'La Diabetica', en: 'The Diabetic' }, color: '#EE7FB0' },
      { name: { it: "L'Amico dei Pesci", en: 'The Fish Friend' }, color: '#8A5CD8' },
      { name: { it: 'La Palestrata', en: 'The Gym Buff' }, color: '#FFFFFF' },
    ],
  },
];

export const rpgs: Rpg[] = [
  {
    kind: 'rpg',
    slug: 'la-notte-del-coro',
    title: 'La Notte del Coro',
    series: { it: 'Il Circolo del Venerdì · Capitolo 0', en: 'The Friday Circle · Chapter 0' },
    tag: { it: 'GDR · avventura e romanzo · gratis', en: 'RPG · adventure and novel · free' },
    players: { it: '3–6, personaggi pregenerati', en: '3–6, pregenerated characters' },
    length: { it: 'una sessione di 5–6 ore', en: 'one 5–6 hour session' },
    genre: { it: "horror investigativo, anni '10", en: 'investigative horror, 1910s' },
    rules: 'Call of Cthulhu',
    languages: { it: 'italiano · inglese [IN ARRIVO]', en: 'Italian · English [COMING]' },
    short: {
      it: "Ottobre 1914. Sei studiosi dell'occulto salgono a Valtorva, sotto l'abbazia di Santa Maria del Silenzio. La prima neve sta per chiudere il passo.",
      en: 'October 1914. Six scholars of the occult climb to Valtorva, below the abbey of Santa Maria del Silenzio. The first snow is about to close the pass.',
    },
    pitch: {
      it: [
        "Ottobre 1914. L'abate di Santa Maria del Silenzio scrive a sei studiosi dell'occulto: a Valtorva, duecento anime a 1.400 metri nelle Alpi piemontesi, un frate è stato ucciso in una cappella sbarrata da fuori.",
        'La corriera si ferma a fondovalle; da lì sono due ore di mulattiera. La prima neve sta per chiudere il passo: per tre giorni nessuno salirà e nessuno scenderà.',
      ],
      en: [
        'October 1914. The abbot of Santa Maria del Silenzio writes to six scholars of the occult: in Valtorva, two hundred souls at 1,400 metres in the Piedmontese Alps, a friar has been killed in a chapel barred from the outside.',
        'The coach stops at the bottom of the valley; from there it is two hours on a mule track. The first snow is about to close the pass: for three days, nobody will go up and nobody will come down.',
      ],
    },
    warning: {
      it: 'Orrore psicologico e temi pesanti che coinvolgono bambini. Tutto resta fuori scena. Tieni pronta una carta X e lascia qualche minuto per parlarne alla fine.',
      en: 'Psychological horror and heavy themes involving children. Everything stays off-screen. Keep an X-card ready and leave a few minutes to talk at the end.',
    },
    files: [
      { title: { it: 'Guida del Custode', en: 'Keeper’s Guide' }, desc: { it: 'La verità, la struttura della sessione, le piste, le regole speciali · 53 pagine', en: 'The truth, session structure, leads and special rules · 53 pages' }, it: '#', en: '' },
      { title: { it: 'Libro delle scene', en: 'Book of Scenes' }, desc: { it: 'Le scene da leggere al tavolo', en: 'The scenes to read aloud at the table' }, it: '#', en: '' },
      { title: { it: 'I PNG', en: 'The NPCs' }, desc: { it: 'Monaci e abitanti di Valtorva: dove stanno, cosa dicono, cosa nascondono', en: 'Monks and villagers of Valtorva: where they are, what they say, what they hide' }, it: '#', en: '' },
      { title: { it: 'I Luoghi', en: 'The Locations' }, desc: { it: "Il borgo, l'abbazia e i dintorni", en: 'The village, the abbey and the surroundings' }, it: '#', en: '' },
      { title: { it: 'Schede degli investigatori', en: 'Investigator sheets' }, desc: { it: 'Sei personaggi pronti, più le anteprime da dare ai giocatori', en: 'Six ready-made characters, plus previews to hand to players' }, it: '#', en: '' },
    ],
    investigatorsIntro: {
      it: "Sei investigatori, chiamati dall'abate. Ognuno sa chi è. Almeno, così crede.",
      en: 'Six investigators, summoned by the abbot. Each knows who they are. Or so they believe.',
    },
    investigators: [
      { name: 'Prof. Edoardo Valmarana', role: { it: 'Lo Studioso · filologo torinese', en: 'The Scholar · philologist from Turin' } },
      { name: 'Teresa Morandi', role: { it: 'La Garante · maestra e folklorista', en: 'The Guarantor · teacher and folklorist' } },
      { name: 'Cap. Ruggero Alberti', role: { it: 'La Mano · ex ufficiale degli Alpini', en: 'The Hand · former Alpini officer' } },
      { name: 'Ida Cantoni', role: { it: 'La Sentinella · fotografa e giornalista', en: 'The Sentinel · photographer and journalist' } },
      { name: 'Conte Aurelio Sanvitale', role: { it: 'Il Firmatario · spiritista', en: 'The Signatory · spiritualist' } },
      { name: 'Dott. Guido Ferrero', role: { it: 'Il Medico · chirurgo torinese', en: 'The Doctor · surgeon from Turin' } },
    ],
    novelText: {
      it: 'Un frate ucciso, un borgo che non vuole forestieri, sei investigatori competenti. Ogni capitolo è raccontato da uno di loro. Un nuovo capitolo ogni [N] settimane.',
      en: 'A murdered friar, a village that does not want strangers, six capable investigators. Each chapter is told by one of them. A new chapter every [N] weeks.',
    },
    chapters: ['La porta sbarrata', "L'ossario", "L'abate", 'Il sagrestano', 'Le donne del lavatoio', 'La galleria'],
    kofi: {
      it: { title: 'Vi ha tenuti svegli fino a tardi?', text: 'Offri un caffè agli autori: aiuta a finire il Capitolo 1, «Quello che resta del Venerdì».' },
      en: { title: 'Did it keep you up late?', text: 'Buy the authors a coffee: it helps finish Chapter 1, “What Remains of Friday”.' },
    },
    licence: {
      it: "Questa avventura usa marchi e/o copyright di Chaosium Inc./Moon Design Publications LLC, con il permesso della Fan Material Policy di Chaosium. Non è approvata da Chaosium. È gratuita e non può essere venduta. [TESTO DA ALLINEARE A QUELLO UFFICIALE]",
      en: 'This adventure uses trademarks and/or copyrights owned by Chaosium Inc./Moon Design Publications LLC, under Chaosium’s Fan Material Policy. It is not endorsed by Chaosium. It is free and may not be sold. [ALIGN WITH THE OFFICIAL WORDING]',
    },
  },
];
