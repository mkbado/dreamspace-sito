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
  banner?: string;
  bannerAlt?: L<string>;
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
  componentsExtra?: L<string>;
  features?: { title: L<string>; list: { title: L<string>; text: L<string> }[] };
  team?: { title: L<string>; text: L<string>; people: { name: string; role: L<string> }[] };
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
    image: '/img/card-marsylvania.webp',
    imageAlt: {
      it: 'Prof Giraf e Queen Illuminati affrontano vampiri e un drago tra le rovine rosse di Marsylvania, in pixel art',
      en: 'Prof Giraf and Queen Illuminati face vampires and a dragon among the red ruins of Marsylvania, in pixel art',
    },
    banner: '/img/marsylvania-banner.webp',
    bannerAlt: {
      it: 'I sei Dreamspacer a caccia di taglie su Marsylvania: vampiri, un verme gigante, draghi e soldati dell’Alleanza tra canyon rossi e castelli gotici, in pixel art',
      en: 'The six Dreamspacers bounty hunting on Marsylvania: vampires, a giant worm, dragons and Alliance soldiers among red canyons and gothic castles, in pixel art',
    },
    tag: { it: 'Gioco da tavolo · dungeon crawler', en: 'Board game · dungeon crawler' },
    status: { it: 'In sviluppo · Kickstarter in arrivo', en: 'In development · Kickstarter coming' },
    players: '2–5',
    minutes: '45–90',
    age: '14+',
    short: {
      it: 'Entra nella compagnia di cacciatori di taglie, esplora Marsylvania e batti il Lord Vampiro prima dei tuoi colleghi. In palio: il titolo di Impiegato del Mese.',
      en: 'Join the bounty hunters’ company, explore Marsylvania and beat the Vampire Lord before your colleagues do. The prize: Employee of the Month.',
    },
    pitch: {
      it: 'Un dungeon crawler all’americana in cui fantascienza e gotico hanno avuto un figlio inaspettato. Siete cacciatori di taglie della Dreamspace Ltd: esplorate Marsylvania, potenziatevi e battete il Lord Vampiro prima dei colleghi.',
      en: 'An American-style dungeon crawler where sci-fi and gothic had an unexpected baby. You are Dreamspace Ltd bounty hunters: explore Marsylvania, power up and beat the Vampire Lord before your colleagues do.',
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
          'Il pianeta ruota in sincrono con la sua orbita: una parte è sempre al sole, una sempre al crepuscolo, la terza sempre di notte. Ogni zona ha più di 20 caselle diverse, dai covi dei cultisti alle botteghe degli alchimisti.',
          'Il vostro compito: trovare la fortezza dei vampiri e tagliare la testa al Lord Vampiro. La taglia è di 13 milioni di Kron. Non andrà a voi, naturalmente: la società vi nominerà Impiegato del Mese. Che emozione!',
        ],
        en: [
          'Welcome, interns. Marsylvania is just like the Milky Way’s Mars, except an ancient human civilisation, the Nuwa, settled it, and a curse has turned some of its people into werewolves and vampires.',
          'The planet is tidally locked: one side is always sunny, one always at dusk, the third always at night. Each area has over 20 unique squares, from cultist lairs to alchemist shops.',
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
          label: { it: 'Area 2 · sempre crepuscolo', en: 'Area 2 · always dusk' },
          title: { it: 'La Giungla', en: 'The Jungle' },
          text: {
            it: 'Una fascia di eterno tramonto, tra tribù selvagge e il Boss della Giungla.',
            en: 'A belt of endless sunset, with savage tribes and the Jungle Boss.',
          },
          dark: false,
        },
        {
          label: { it: 'Area 3 · sempre notte', en: 'Area 3 · always night' },
          title: { it: 'La Terra Oscura', en: 'The Dark Land' },
          text: {
            it: "Il sole non sorge mai. Da qualche parte c'è il rifugio del Lord Vampiro: se ve la prendete comoda, sarà lui a trovare voi.",
            en: 'The sun never rises. Somewhere out there is the Vampire Lord’s lair: take your time, and he’ll find you first.',
          },
          dark: true,
        },
      ],
    },
    features: {
      title: { it: 'Perché giocarci', en: 'Why play it' },
      list: [
        { title: { it: 'Un tema mai visto', en: 'A theme like no other' }, text: { it: 'Vampiri contro pistole laser e armature medievali. E tutto in 8 bit, perché carte e tabellone sono l’archivio del computer aziendale: la Dreamspace non ha investito molto in innovazione.', en: 'Vampires versus laser guns and medieval armour. All in 8-bit, because the cards and board are the company’s computer database: Dreamspace Ltd didn’t invest much in innovation.' } },
        { title: { it: 'Mondo aperto', en: 'Open world' }, text: { it: 'Esplorate tutto il pianeta prima dello scontro finale: tre aree e oltre 20 caselle uniche per area.', en: 'Explore the whole planet before the final fight: three areas, over 20 unique squares each.' } },
        { title: { it: 'Ogni partita è diversa', en: 'Every game is different' }, text: { it: 'Sei Dreamspacer e oltre 160 carte: non saprete mai cosa vi aspetta dietro la prossima duna.', en: 'Six Dreamspacers and over 160 cards: you never know what waits behind the next dune.' } },
        { title: { it: 'Fortuna e strategia', en: 'Luck and strategy' }, text: { it: 'Regole semplici per tutti, ma tante strade per battere il Boss. I dadi contano, abilità, incantesimi ed equipaggiamento anche.', en: 'Simple rules for everyone, many paths to the Boss. Dice matter, and so do skills, spells and gear.' } },
        { title: { it: 'Il nemico è il tuo vicino', en: 'Your neighbour is the enemy' }, text: { it: 'I nemici li interpreta il giocatore alla tua sinistra. Prova a immaginarlo trasformato in un Wormalien affamato.', en: 'Enemies are played by the player on your left. Picture them as a hungry Wormalien.' } },
        { title: { it: 'Da stagista a capo', en: 'From intern to boss' }, text: { it: 'Tre livelli di crescita del personaggio, con abilità e potenziamenti sempre più forti.', en: 'Three levels of character growth, with ever stronger skills and boosts.' } },
      ],
    },
    characters: {
      title: { it: 'I sei Dreamspacer', en: 'The six Dreamspacers' },
      note: { it: 'La squadra di partenza della Dreamspace Ltd.', en: 'Dreamspace Ltd’s starting team.' },
      list: [
        { name: 'Prof Giraf', home: 'Savanya City', image: '/img/chars/prof-giraf.webp', color: '#F28C28', ink: '#0A0D24',
          alt: { it: 'Prof Giraf, una giraffa con gli occhialoni che tiene il fuoco nel palmo della mano', en: 'Prof Giraf, a goggled giraffe holding fire in his palm' },
          bio: { it: 'Amatissimo professore di arti arcane all’Università di Savanya City. L’NHR lo ha contattato dopo che aveva salvato il suo pianeta dai mostri: è in azienda da 12 anni.', en: 'A beloved professor of arcane arts at the University of Savanya City. NHR contacted him after he saved his planet from monstrosities: 12 years with the company.' },
          ability: { it: 'Maestro degli incantesimi', en: 'Spell master' } },
        { name: 'Lord Caramel', home: 'Candyloon', image: '/img/chars/lord-caramel.webp', color: '#EE7FB0', ink: '#0A0D24',
          alt: { it: 'Lord Caramel, cavaliere con l’armatura di biscotto decorata di confettini e una spada di zucchero rosa', en: 'Lord Caramel, a knight in sprinkle-studded cookie armour with a pink sugar sword' },
          bio: { it: 'Guerriero d’élite della tribù delle caramelle selvagge di Candyloon. Salvato da una Dream-ship quando un impero di robot ha conquistato il suo pianeta, da stagista è diventato Dreamspacer a tempo pieno in un anno.', en: 'An elite warrior of the wild candy tribe of Candyloon. Rescued by a Dream-ship when an evil robot empire conquered his planet, he went from intern to full-time Dreamspacer in a year.' },
          ability: { it: 'Attacco altissimo', en: 'High attack' } },
        { name: 'Chat Blob', home: 'Oozonia', image: '/img/chars/chatblob.webp', color: '#9BE15D', ink: '#0A0D24',
          alt: { it: 'Chat Blob, una massa di gelatina verde piena di circuiti, cavi e schermi olografici', en: 'Chat Blob, a green ooze full of circuits, wires and holographic screens' },
          bio: { it: 'Una melma di Oozonia che ha assorbito un portatile con dentro una misteriosa IA, diventando intelligente e curiosa. Fa il cacciatore di taglie perché adora mangiare cose. E creature.', en: 'An ooze from Oozonia that absorbed a laptop with a mysterious AI inside, gaining intelligence and curiosity. It hunts bounties because it loves eating things. And creatures.' },
          ability: { it: 'Assorbimento cibernetico', en: 'Cyber absorption' } },
        { name: 'Queen Illuminati', home: 'Terra D-34', image: '/img/chars/queen-illuminati.webp', color: '#8A5CD8', ink: '#FFF4DC',
          alt: { it: 'Queen Illuminati, regina con il diadema e un triangolo con l’occhio sospeso sulla mano', en: 'Queen Illuminati, a crowned queen with an all-seeing-eye triangle above her hand' },
          bio: { it: 'Esiliata dalla Terra D-34 perché minaccia per la democrazia, ha sedotto un ricco imprenditore per farsi portare alla Dreamspace. Poi ha controllato i pensieri dell’NHR ed è diventata subito Dreamspacer a tempo pieno.', en: 'Exiled from Earth D-34 as a threat to democracy, she charmed a rich entrepreneur into a trip to Dreamspace. Then she controlled NHR’s thoughts and became a full-time Dreamspacer on the spot.' },
          ability: { it: 'Fascino e persuasione', en: 'Charm and persuasion' } },
        { name: 'Venusian Ronin', home: 'Venere', image: '/img/chars/venusian-ronin.webp', color: '#3FA34D', ink: '#0A0D24',
          alt: { it: 'Venusian Ronin, guerriero verde con ali di foglia e cappello di paglia, in posa di combattimento', en: 'Venusian Ronin, a green warrior with leaf wings and a straw hat in a fighting stance' },
          bio: { it: 'Su una Venere diversa, un ronin lucertoloide in guerra contro i non morti per il dominio del pianeta. Dopo aver perso l’amata moglie è diventato uno dei cacciatori di taglie più temuti del suo universo.', en: 'On a different Venus, a lizardfolk ronin fighting the undead for the planet. After losing his beloved wife he became one of the most feared bounty hunters in his universe.' },
          ability: { it: 'Difesa altissima', en: 'High defence' } },
        { name: 'Alligactor', home: 'Lizaurus', image: '/img/chars/alligactor.webp', color: '#D9442B', ink: '#FFF4DC',
          alt: { it: 'Alligactor, alligatore elegante con cappello piumato che lancia carte da gioco', en: 'Alligactor, a dapper alligator in a plumed hat throwing playing cards' },
          bio: { it: 'Bandito da ogni bar di Lizaurus per aver barato a qualsiasi gioco, è diventato un viandante del multiverso. Si è fatto reclutare imbrogliando, e in qualche modo ne esce sempre vivo.', en: 'Banned from every bar and pub on Lizaurus for cheating, he became a wanderer of the multiverse. He cheated his way into the job, and somehow always comes out alive.' },
          ability: { it: 'Barare e sperare nella fortuna', en: 'Cheating and luck' } },
      ],
    },
    howToPlay: {
      title: { it: 'Come si gioca', en: 'How to play' },
      steps: {
        it: ['Esplora le zone misteriose di Marsylvania', 'Combatti i nemici sul tuo cammino', 'Potenziati con equipaggiamenti, incantesimi e alleati', 'Vinci sconfiggendo il Boss finale e il suo Scagnozzo'],
        en: ['Explore the mysterious areas of Marsylvania', 'Fight the enemies in your path', 'Power up with equips, spells and allies', 'Win by defeating the Final Boss and its Henchman'],
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
      { n: '6', label: { it: 'Dreamspacer con miniatura', en: 'Dreamspacers with minis' } },
      { n: '62', label: { it: 'carte Incontro', en: 'Encounter cards' } },
      { n: '20', label: { it: 'Equipaggiamenti', en: 'Equips' } },
      { n: '20', label: { it: 'Incantesimi', en: 'Spells' } },
      { n: '12', label: { it: 'Alleati', en: 'Allies' } },
      { n: '128', label: { it: 'token statistiche', en: 'stat tokens' } },
    ],
    componentsExtra: {
      it: 'Più tabellone, Boss finale con Scagnozzo, 10 Ostilità Planetarie, Boss di Nuwa e della Giungla con le loro Reliquie, maledizioni da licantropo e manuale introduttivo.',
      en: 'Plus game board, Final Boss with Henchman, 10 Planetary Hostilities, Nuwa and Jungle Bosses with their Relics, lycanthropy curses and the introductory manual.',
    },
    team: {
      title: { it: 'Chi c’è dietro', en: 'Who’s behind it' },
      text: {
        it: 'Tre amici, da sempre appassionati di giochi da tavolo, GDR e videogiochi. L’idea è nata dopo una partita a Talisman: renderlo più veloce e dare al fantasy classico una svolta tutta nuova. Marsylvania è solo il primo pianeta: il gioco è pensato per le espansioni.',
        en: 'Three friends and long-time lovers of board games, RPGs and video games. The idea came after a game of Talisman: make it faster and give classic fantasy a fresh twist. Marsylvania is only the first planet: the game is built for expansions.',
      },
      people: [
        { name: 'Michele Badolato', role: { it: 'Game designer', en: 'Game designer' } },
        { name: 'Raffaele Guandalini', role: { it: 'Game designer', en: 'Game designer' } },
        { name: 'Francesco Moretti', role: { it: 'Graphic designer', en: 'Graphic designer' } },
      ],
    },
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
