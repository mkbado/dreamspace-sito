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
    tag: { it: 'Gioco da tavolo · competitivo', en: 'Board game · competitive' },
    status: { it: 'In sviluppo · Kickstarter in arrivo', en: 'In development · Kickstarter coming' },
    players: '1–4',
    minutes: '60',
    age: '14+',
    short: {
      it: 'Entra nella compagnia di cacciatori di taglie, esplora Marsylvania e batti il Lord Vampiro prima dei tuoi colleghi. In palio: il titolo di Impiegato del Mese.',
      en: 'Join the bounty hunters’ company, explore Marsylvania and beat the Vampire Lord before your colleagues do. The prize: Employee of the Month.',
    },
    pitch: {
      it: 'Un gioco da tavolo competitivo in cui fantascienza e gotico hanno avuto un figlio inaspettato. Siete cacciatori di taglie della Dreamspace Ltd: esplorate Marsylvania, potenziatevi e battete il Lord Vampiro prima dei colleghi.',
      en: 'A competitive board game where sci-fi and gothic had an unexpected baby. You are Dreamspace Ltd bounty hunters: explore Marsylvania, power up and beat the Vampire Lord before your colleagues do.',
    },
    waiting: '[N]',
    waitingWho: { it: 'Dreamspacer', en: 'Dreamspacers' },
    cta: { it: 'Vuoi sapere quando parte la missione?', en: 'Want to know when the mission starts?' },
    briefing: {
      kicker: {
        it: 'Briefing di missione · da ELIT-043, Divisione Risorse Non Umane',
        en: 'Mission briefing · from ELIT-043, Non-Human Resources Division',
      },
      title: { it: 'Pianeta 197, Universo G', en: 'Planet 197, Universe G' },
      paragraphs: {
        it: [
          "Benvenuti, stagisti. Marsylvania è come il Marte della Via Lattea, ma qui l'ha colonizzato un'antica civiltà umana, i Nuwa, e una maledizione ha trasformato parte degli abitanti in lupi mannari e vampiri.",
          'Il pianeta non ruota: una metà è sempre giorno, l’altra sempre notte. Le attraverserete in quest’ordine, una griglia di caselle alla volta, e per passare dalla prima alla seconda dovrete battere il Boss di Nuwa.',
          'Il vostro compito: trovare la fortezza dei vampiri e tagliare la testa al Lord Vampiro. La taglia è di 13 milioni di Kron. Non andrà a voi, naturalmente: la società vi nominerà Impiegato del Mese. Che emozione!',
        ],
        en: [
          'Welcome, interns. Marsylvania is just like the Milky Way’s Mars, except an ancient human civilisation, the Nuwa, settled it, and a curse has turned some of its people into werewolves and vampires.',
          'The planet does not rotate: one half is always day, the other always night. You cross them in that order, one grid of squares at a time, and to move from the first to the second you must beat the Nuwa Boss.',
          'Your task: find the vampires’ fortress and cut off the Vampire Lord’s head. The bounty is 13 million Kron. It won’t go to you, of course: the company will name you Employee of the Month. How exciting!',
        ],
      },
      areas: [
        {
          label: { it: 'Area 1 · sempre giorno', en: 'Area 1 · always day' },
          title: { it: 'Il Deserto di Nuwa', en: 'The Nuwa Desert' },
          text: {
            it: 'Qui arrivate con il Dream-Portal. Caldo allucinante, ma il posto giusto per trovare oggetti e potenziamenti. Se cadete qui, i droni vi riportano alla partenza.',
            en: 'You arrive here through the Dream-Portal. Blistering heat, but the right place to find items and upgrades. Fall here and the drones bring you back to the start.',
          },
          dark: false,
        },
        {
          label: { it: 'Area 2 · sempre notte', en: 'Area 2 · always night' },
          title: { it: 'La Terra Oscura', en: 'The Dark Land' },
          text: {
            it: "Il sole non sorge mai e da qui non si torna indietro. Appena qualcuno entra parte il conto alla rovescia: se ve la prendete comoda, sarà il Lord Vampiro a trovare voi.",
            en: 'The sun never rises and there is no way back. As soon as someone enters, the countdown starts: take your time, and the Vampire Lord will find you first.',
          },
          dark: true,
        },
      ],
    },
    features: {
      title: { it: 'Perché giocarci', en: 'Why play it' },
      list: [
        { title: { it: 'Un tema mai visto', en: 'A theme like no other' }, text: { it: 'Vampiri contro pistole laser e armature medievali. E tutto in 8 bit, perché carte e caselle sono l’archivio del computer aziendale: la Dreamspace non ha investito molto in innovazione.', en: 'Vampires versus laser guns and medieval armour. All in 8-bit, because the cards and tiles are the company’s computer database: Dreamspace Ltd didn’t invest much in innovation.' } },
        { title: { it: 'Un pianeta da esplorare', en: 'A planet to explore' }, text: { it: 'Due aree da 15 caselle, coperte finché non ci mettete piede: ricompense, trappole e nemici.', en: 'Two areas of 15 face-down tiles each: rewards, traps and enemies, revealed as you step on them.' } },
        { title: { it: 'Il nemico è il tuo vicino', en: 'Your neighbour is the enemy' }, text: { it: 'I nemici li interpreta il giocatore alla tua sinistra, e tira i dadi per loro. Prova a immaginarlo trasformato in un Wormalien affamato.', en: 'Enemies are played by the player on your left, who rolls their dice. Picture them as a hungry Wormalien.' } },
        { title: { it: 'La Fase del Mascalzone', en: 'The Rascal phase' }, text: { it: 'Finisci sulla casella di un collega? Puoi scambiare, rubare, distrarlo o sfidarlo a duello.', en: 'Land on a colleague’s tile? Trade, steal, distract them or challenge them to a duel.' } },
        { title: { it: 'Da stagista a capo', en: 'From intern to boss' }, text: { it: 'Ogni area conquistata fa salire di livello il tuo Dreamspacer, con nuove abilità e statistiche migliori.', en: 'Each area you conquer levels up your Dreamspacer, with new skills and better stats.' } },
        { title: { it: 'Corsa contro il Lord', en: 'A race against the Lord' }, text: { it: 'Nella Terra Oscura ogni turno avvicina il Lord Vampiro. Chi arriva preparato vince, chi tentenna viene trovato.', en: 'In the Dark Land every turn brings the Vampire Lord closer. The prepared win, the hesitant get found.' } },
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
      title: { it: 'Un turno, cinque fasi', en: 'One turn, five phases' },
      steps: {
        it: ['Movimento: tira un dado e aggiungi la tua velocità', 'Esplorazione: gira la casella, ricompensa o pericolo', 'Combattimento: dadi spada, scudo e pozione contro il nemico', 'Fase del Mascalzone: affari (e furti) tra colleghi', 'Recupero: incassa la taglia e curati'],
        en: ['Move: roll a die and add your speed', 'Explore: flip the tile, reward or danger', 'Fight: sword, shield and potion dice against the enemy', 'Rascal phase: deals (and thefts) between colleagues', 'Recover: collect the bounty and heal'],
      },
      note: {
        it: 'Sul pianeta vi aspettano l’Alleanza, la polizia del multiverso; il popolo di Nuwa; il culto dei Blood Seek; i Werewolves of the Dusk e i vampiri della Terra Oscura.',
        en: 'On the planet await the Alliance, the multiverse police; the people of Nuwa; the Blood Seek cult; the Werewolves of the Dusk and the vampires of the Dark Land.',
      },
      image: '/img/carte-nemici.webp',
      imageAlt: {
        it: 'Tre carte Nemico del prototipo: il Wormalien, con 2 vita, 2 attacco, 1 difesa ed effetto veleno',
        en: 'Three prototype Enemy cards: the Wormalien, with 2 health, 2 attack, 1 defence and a poison effect',
      },
    },
    components: [
      { n: '24', label: { it: 'zone del pianeta', en: 'planet tiles' } },
      { n: '108', label: { it: 'carte', en: 'cards' } },
      { n: '105', label: { it: 'token', en: 'tokens' } },
      { n: '8', label: { it: 'miniature', en: 'miniatures' } },
      { n: '8', label: { it: 'dadi', en: 'dice' } },
      { n: '6+2', label: { it: 'schede eroi e boss', en: 'hero and boss boards' } },
    ],
    componentsExtra: {
      it: 'Le carte: 32 Nemici, 61 oggetti tra equipaggiamenti, incantesimi e alleati, 3 Reliquie dei Boss, 6 Ostilità planetarie, 4 Licantropia e 4 riepiloghi del turno.',
      en: 'The cards: 32 Enemies, 61 items among equips, spells and allies, 3 Boss Relics, 6 Planetary Hostilities, 4 Lycanthropy and 4 turn summaries.',
    },
    team: {
      title: { it: 'Chi c’è dietro', en: 'Who’s behind it' },
      text: {
        it: 'Tre amici, da sempre appassionati di giochi da tavolo, GDR e videogiochi. L’idea è nata dopo una partita a Talisman: renderlo più veloce e dare al fantasy classico una svolta tutta nuova. Marsylvania è solo il primo pianeta: il gioco è pensato per le espansioni.',
        en: 'Three friends and long-time lovers of board games, RPGs and video games. The idea came after a game of Talisman: make it faster and give classic fantasy a fresh twist. Marsylvania is only the first planet: the game is built for expansions.',
      },
    },
  },
  {
    kind: 'game',
    slug: 'intolleranti',
    title: 'Intolleranti!',
    image: '/img/intolleranti/card.webp',
    imageAlt: {
      it: 'Il Vampiro Astemio, con mantello rosso, guarda sconsolato un bicchiere d’acqua in una taverna, illustrazione in stile incisione',
      en: 'The Teetotal Vampire, in a red cloak, stares glumly at a glass of water in a tavern, engraving-style illustration',
    },
    heroImage: '/img/intolleranti/taverna.webp',
    heroAlt: {
      it: 'Una taverna con il tetto a graticcio in fondo a una strada di campagna, illustrazione in stile incisione',
      en: 'A half-timbered tavern at the end of a country road, engraving-style illustration',
    },
    tag: { it: 'Gioco di carte · push your luck', en: 'Card game · push your luck' },
    status: { it: 'In sviluppo', en: 'In development' },
    players: '2–8',
    minutes: '20–40',
    age: '10+',
    short: {
      it: 'Il gioco delle serate impossibili. Otto ospiti, otto intolleranze: un’altra uscita per fare punti, o una sera sul divano per metterli al sicuro?',
      en: 'The game of impossible nights out. Eight guests, eight intolerances: one more night out to score, or a night on the sofa to bank your points?',
    },
    pitch: {
      it: 'Ogni giocatore è un ospite con un’intolleranza tutta sua. Esci a cena, sopravvivi alle Portate e accumula Uscite. Ma finché non torni a casa a incassarle, basta un fritto misto di troppo per perdere tutto.',
      en: 'Each player is a guest with an intolerance all of their own. Go out to dinner, survive the courses and collect nights out. But until you go home to bank them, one fried platter too many and you lose everything.',
    },
    waiting: '[N]',
    waitingWho: { it: 'commensali', en: 'diners' },
    fileName: 'TAVERNA.PNG',
    cta: { it: 'Vuoi sapere quando si va a cena?', en: 'Want to know when dinner is served?' },
    features: {
      title: { it: 'Perché giocarci', en: 'Why play it' },
      list: [
        { title: { it: 'Sapere quando fermarsi', en: 'Knowing when to stop' }, text: { it: 'Ogni Uscita in più vale punti, ma mette a rischio tutte quelle che non hai ancora incassato.', en: 'Every extra night out scores, but puts every unbanked one at risk.' } },
        { title: { it: 'Inviti avvelenati', en: 'Poisoned invitations' }, text: { it: 'Invita un rivale alla tua cena: se accetta si carica di Malessere, se rifiuta si becca il Pacco.', en: 'Invite a rival to your dinner: accept and they pile up Queasiness, refuse and they get stood-up points.' } },
        { title: { it: 'Otto ospiti, otto stili', en: 'Eight guests, eight styles' }, text: { it: 'Dai fragilissimi ai corazzati: ognuno ha un colore, un limite di Malessere e due abilità.', en: 'From the most fragile to the armour-plated: each has a colour, a Queasiness limit and two abilities.' } },
        { title: { it: 'Da 2 a 8 a tavola', en: 'From 2 to 8 at the table' }, text: { it: 'Venti minuti in due, quaranta in otto. Perfetto per la fine di una cena vera.', en: 'Twenty minutes for two, forty for eight. Perfect for the end of a real dinner.' } },
      ],
    },
    gallery: {
      title: { it: 'Gli ospiti della taverna', en: 'The tavern guests' },
      note: { it: 'Le plance dei personaggi, in versione da stampa.', en: 'The character boards, print version.' },
      items: [
        { name: { it: 'L’Orco Vegetariano', en: 'The Vegetarian Orc' }, image: '/img/intolleranti/orco-vegetariano.webp', alt: { it: 'Un orco anziano con una carota in mano che legge un libro', en: 'An old orc holding a carrot while reading a book' }, quote: { it: '«Io prendo un contorno. Anzi due.»', en: '“I’ll have a side. Make that two.”' } },
        { name: { it: 'L’Elfa Celiaca', en: 'The Coeliac Elf' }, image: '/img/intolleranti/elfa-celiaca.webp', alt: { it: 'Un’elfa che esamina una briciola con la lente d’ingrandimento', en: 'An elf inspecting a crumb with a magnifying glass' }, quote: { it: '«Pizza senza glutine: 14 euro, 40 minuti di attesa.»', en: '“Gluten-free pizza: 14 euros, 40-minute wait.”' } },
        { name: { it: 'Il Nano No al Lattosio', en: 'The Lactose-Free Dwarf' }, image: '/img/intolleranti/nano-no-al-lattosio.webp', alt: { it: 'Un nano dalla barba rossa che guarda preoccupato un cappuccino', en: 'A red-bearded dwarf eyeing a cappuccino with worry' }, quote: { it: '«Ho la pastiglia e ho il piano di fuga.»', en: '“I’ve got the pill and the escape plan.”' } },
        { name: { it: 'Il Vampiro Astemio', en: 'The Teetotal Vampire' }, image: '/img/intolleranti/vampiro-astemio.webp', alt: { it: 'Un vampiro annoiato con un bicchiere d’acqua', en: 'A bored vampire holding a glass of water' }, quote: { it: '«Guido io. Guido sempre io.»', en: '“I’m driving. I’m always driving.”' } },
        { name: { it: 'La Goblin Anti-Uova', en: 'The Egg-Hating Goblin' }, image: '/img/intolleranti/goblin-anti-uova.webp', alt: { it: 'Una goblin che prende a calci un uovo', en: 'A goblin kicking an egg away' }, quote: { it: '«Carbonara? Maionese? Zabaione?»', en: '“Carbonara? Mayo? Zabaglione?”' } },
        { name: { it: 'La Fatina Diabetica', en: 'The Diabetic Fairy' }, image: '/img/intolleranti/fatina-diabetica.webp', alt: { it: 'Una fatina con un cupcake in una mano e il misuratore di glicemia nell’altra', en: 'A fairy with a cupcake in one hand and a glucose meter in the other' }, quote: { it: '«La frutta è sana, dicevano.»', en: '“Fruit is healthy, they said.”' } },
        { name: { it: 'La Sirena Amica dei Pesci', en: 'The Fish-Friendly Mermaid' }, image: '/img/intolleranti/sirena-amica-dei-pesci.webp', alt: { it: 'Una sirena abbracciata a una boccia con un pesce rosso', en: 'A mermaid hugging a goldfish bowl' }, quote: { it: '«Sushi party? Io porto i cartelli di protesta.»', en: '“Sushi party? I’ll bring the protest signs.”' } },
        { name: { it: 'Il Golem Palestrato', en: 'The Gym Golem' }, image: '/img/intolleranti/golem-palestrato.webp', alt: { it: 'Un golem di pietra muscoloso che pesa le porzioni con una bilancia', en: 'A muscular stone golem weighing portions on a scale' }, quote: { it: '«Due porzioni: per me e per i miei bicipiti.»', en: '“Two portions: one for me, one for my biceps.”' } },
      ],
    },
    howToPlay: {
      title: { it: 'Come si gioca', en: 'How to play' },
      steps: {
        it: ['Pesca una carta Risposta', 'Esci o stai a casa? A casa incassi le Uscite e ti riprendi', 'Rivela l’Uscita: quanti punti vale, quanto si mangia e si beve', 'Invita un compagno, se vuoi metterlo nei guai', 'Pesca le Portate una alla volta: se hanno il tuo colore, Malessere', 'Sopravvissuto? L’Uscita è tua, ma non ancora al sicuro'],
        en: ['Draw a Response card', 'Go out or stay home? At home you bank your nights out and recover', 'Reveal the night out: its points, how much you eat and drink', 'Invite a friend, if you want to get them in trouble', 'Draw the courses one by one: if they carry your colour, Queasiness', 'Survived? The night out is yours, but not safe yet'],
      },
      note: {
        it: 'Raggiungi il tuo limite di Malessere e vai in Nausea: perdi le Uscite non incassate e prendi 3 punti di penalità. Alla fine vince chi ha più punti.',
        en: 'Hit your Queasiness limit and you’re Nauseous: you lose every unbanked night out and take a 3-point penalty. Most points wins.',
      },
      image: '/img/intolleranti/portate.webp',
      imageAlt: {
        it: 'Quattro carte Portata: Frittata di Verdure, Patatine Fritte, Gelato Artigianale e Pizza Margherita, con in fondo gli ospiti che le temono',
        en: 'Four Course cards: Vegetable Frittata, Chips, Artisan Gelato and Pizza Margherita, each listing the guests who fear it',
      },
      imageBare: true,
    },
    components: [
      { n: '8', label: { it: 'Personaggi', en: 'Characters' } },
      { n: '28', label: { it: 'Uscite', en: 'Nights out' } },
      { n: '72', label: { it: 'Portate', en: 'Courses' } },
      { n: '52', label: { it: 'Risposte', en: 'Responses' } },
      { n: '102', label: { it: 'token', en: 'tokens' } },
    ],
    componentsExtra: {
      it: 'Le Portate sono 36 di Cibo e 36 di Bevande.',
      en: 'Courses are 36 Food and 36 Drinks.',
    },
  },
  {
    kind: 'game',
    slug: 'dungeons-and-dugongs',
    title: 'Dungeons & Dugongs',
    image: '/img/dugongs/card.webp',
    imageAlt: {
      it: 'Quattro dugonghi avventurieri, un cavaliere, un arciere, un mago e un ladro, nuotano in una grotta piena di tesori',
      en: 'Four adventuring dugongs, a knight, an archer, a wizard and a rogue, swimming through a cave full of treasure',
    },
    heroImage: '/img/dugongs/copertina.webp',
    heroAlt: {
      it: 'Copertina di Dungeons & Dugongs: quattro dugonghi in armatura e mantello scendono in una grotta sottomarina, inseguiti da un mostro',
      en: 'Dungeons & Dugongs cover: four dugongs in armour and cloaks dive into an underwater cave, chased by a monster',
    },
    heroPortrait: true,
    tag: { it: 'Gioco da tavolo · cooperativo', en: 'Board game · co-op' },
    status: { it: 'In sviluppo', en: 'In development' },
    players: '1–4',
    minutes: '40–60',
    age: '8+',
    short: {
      it: 'Quattro dugonghi scendono nell’Abisso per 13 Leghe con una sola riserva di ossigeno. Battete il Boss finale prima che l’aria finisca.',
      en: 'Four dugongs dive 13 Leagues into the Abyss with a single shared oxygen supply. Beat the final Boss before the air runs out.',
    },
    pitch: {
      it: 'Un gioco cooperativo di dadi e avventura. Ogni round tirate tutti insieme: le icone colpiscono il nemico, mentre lui morde l’ossigeno del gruppo. Ci si salva insieme, o si resta in fondo al mare insieme.',
      en: 'A co-operative dice adventure. Every round you all roll together: the icons hit the enemy, while it bites into the group’s oxygen. You get out together, or stay at the bottom of the sea together.',
    },
    waiting: '[N]',
    waitingWho: { it: 'dugonghi', en: 'dugongs' },
    fileName: 'COPERTINA.PNG',
    cta: { it: 'Vuoi sapere quando si scende nell\u2019Abisso?', en: 'Want to know when the dive begins?' },
    features: {
      title: { it: 'Perché giocarci', en: 'Why play it' },
      list: [
        { title: { it: 'Il tiro di gruppo', en: 'The group roll' }, text: { it: 'Si tira tutti insieme e si decide insieme cosa ritirare. «Ci manca un Arco! Nuoti a perdifiato?»', en: 'Everyone rolls together and decides together what to reroll. “We need a Bow! Swim for it?”' } },
        { title: { it: 'Il rischio scelto', en: 'Chosen risk' }, text: { it: 'Ritirare costa Carisma o Ossigeno: ogni rilancio è una scommessa per tutta la squadra.', en: 'Rerolling costs Charisma or Oxygen: every reroll is a bet for the whole team.' } },
        { title: { it: 'Momenti da raccontare', en: 'Moments to tell' }, text: { it: 'La faccia Dugongo vale qualsiasi icona, due Dugonghi insieme fanno Branco e ogni nemico ha un colpo speciale da schivare.', en: 'The Dugong face counts as any icon, two Dugongs make a Pod, and every enemy has a special attack to dodge.' } },
      ],
    },
    roster: {
      title: { it: 'Nove dugonghi, quattro in squadra', en: 'Nine dugongs, four on the team' },
      note: { it: 'Ognuno ha il suo dado, la sua scheda e un oggetto iniziale.', en: 'Each has its own die, sheet and starting item.' },
      items: [
        { name: { it: 'Guardiano', en: 'Guardian' }, role: { it: 'Difensore', en: 'Defender' } },
        { name: { it: 'Barbaro', en: 'Barbarian' }, role: { it: 'Forza', en: 'Strength' } },
        { name: { it: 'Arciere', en: 'Archer' }, role: { it: 'Mira', en: 'Aim' } },
        { name: { it: 'Stregone', en: 'Sorcerer' }, role: { it: 'Magia', en: 'Magic' } },
        { name: { it: 'Saggio', en: 'Sage' }, role: { it: 'Magia e difesa', en: 'Magic and defence' } },
        { name: { it: 'Scout', en: 'Scout' }, role: { it: 'Esploratore', en: 'Explorer' } },
        { name: { it: 'Furfante', en: 'Rogue' }, role: { it: 'Agilità', en: 'Agility' } },
        { name: { it: 'Guaritore', en: 'Healer' }, role: { it: 'Cura', en: 'Healing' } },
        { name: { it: 'Mangione', en: 'Glutton' }, role: { it: 'Cibo e difesa', en: 'Food and defence' } },
      ],
    },
    components: [
      { n: '1', label: { it: 'tabellone', en: 'board' } },
      { n: '9', label: { it: 'dadi Dugongo', en: 'Dugong dice' } },
      { n: '9', label: { it: 'schede Dugongo', en: 'Dugong sheets' } },
      { n: '54', label: { it: 'carte', en: 'cards' } },
    ],
    componentsExtra: {
      it: 'Le carte: 24 Leghe tra nemici, trappole ed eventi, 3 Semi-Boss, 3 Boss e 24 oggetti.',
      en: 'The cards: 24 Leagues of enemies, traps and events, 3 Semi-Bosses, 3 Bosses and 24 items.',
    },
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
