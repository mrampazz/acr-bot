const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const selections = {};
const progress = {};

const options = [
  [
    { text: "Sogno" },
    { text: "Coraggio" },
    { text: "Incontro" },
    { text: "Speranza" },
  ],
];

const s0 = `Davanti a te troverai un “muro dei sogni”. Prenditi un momento per pensare a qual è un tuo sogno, un obiettivo o un desiderio per il futuro che vorresti realizzare. Quando l’hai trovato, disegnalo sul muro dei sogni.`;
const s1 = `Trova un compagno a cui spiegare il tuo sogno e ascolta la sua condivisione. Dopo, arricchisci il disegno dell’altro disegnando accanto al suo sogno degli elementi o delle persone che possano aiutarlo a realizzarlo. Se non riesci a disegnare, scrivigli un consiglio o un incoraggiamento. Ricordati che i sogni diventano realtà anche con l’aiuto e il supporto degli altri.`;
const s2 = `ora che avete finito di disegnare, fate assieme le riflessioni proposte:
Il Giubilino ci chiama a fare un pellegrinaggio metaforico. Un pellegrinaggio è un viaggio lungo, spesso faticoso, con ostacoli da affrontare durante il cammino. Per sostenerci durante il cammino è importante avere un proprio sogno, un obiettivo o un’aspettativa per il futuro.
Come giovani adulti, sognare può non essere semplice: il desiderio di cambiare le cose per sé stessi e per la società può collidere con la fattibilità concreta del nostro progetto e con la pressione sociale, che può farci sentire condizionati nelle nostre scelte; ma anche se non tutti i sogni si realizzano, avere dei sogni è fondamentale per dare una direzione e un senso alla propria vita.
Pensare al tuo sogno è stato facile? Quali sono gli ostacoli che ti impediscono di sognare liberamente oggi? E cosa, invece, ti aiuta a non perdere di vista ciò che desideri davvero?`;
const s3 = `La capacità di sognare nasce dall’immaginazione (solo con la fantasia si può vedere un’alternativa al già noto) e si alimenta con la speranza (contro la rassegnazione, il cinismo e il vuoto). Chi sogna non si concentra su ciò che manca, ma su ciò che può nascere; cerca il bello nelle piccole cose, nei gesti quotidiani; la sua attenzione si allena a trovare spazi di possibilità anche dove gli altri vedono limiti. Quando siamo sorretti da un sogno, ci troviamo a fare tutto con più intenzione: un ostacolo può diventare una parte del percorso, mentre un incontro casuale può diventare un’occasione. Anche quando non si realizzano, i nostri sogni ci aiutano a ricordare chi siamo e ci spingono a vivere con speranza e luce negli occhi.
Ti senti capace di vedere la bellezza in ciò che ti circonda, cose o persone, o ti viene difficile? Riesci a ricordare un momento in cui hai visto bellezza dove non te l’aspettavi?`;
const s4 = `I sogni cambiano nel corso della vita, ma sono fondamentali perché danno una direzione al nostro cammino. I sogni ci spingono a fare delle scelte per trasformarli in realtà, sono una chiamata all’azione. Per poter essere realizzati richiedono un impegno, anche quotidiano: così come una casa non si costruisce in un giorno, anche i sogni vanno costruiti con costanza, mattone dopo mattone. Quando li condividiamo con gli altri, ne possiamo ricavare supporto e aiuto, mentre un sogno comune ha la forza della collaborazione di molte mani.
Riesci a inseguire i tuoi sogni giorno per giorno? Come reagisci quando incontri ostacoli o momenti di scoraggiamento? Ci sono persone intorno a te che ti aiutano a non mollare?`;
const s5 = `hai terminato l'attività! se hai ancora tempo a disposizione, recati in un'altra stanza ✨`;

const c0 = `cerca un angolo tranquillo nella stanza e mettiti comodo, indossa le cuffie, ed ascolta questa canzone facendo attenzione al testo`;
const c1 = `prenditi qualche momento per capire cosa significa per te questa canzone: https://www.youtube.com/watch?v=1_BtlAw4trg`;
const c2 = `Non esiste coraggio senza la paura, eppure uno degli atti che richiedono più coraggio è proprio guardare dentro di sé, ascoltare le proprie paure e condividerle con gli altri.
Tutti abbiamo delle paure: a volte cerchiamo di zittirle, facciamo finta che non ci siano, eppure ci sono e sono parte di noi. Non sempre sono razionali, ma sono vere per noi. Alcune paure ci proteggono, altre ci bloccano. Ci sono paure che nascono da ferite, da parole sentite troppo spesso, da silenzi troppo lunghi; altre volte, la paura nasce quando qualcosa ci importa davvero: l’amore, l’amicizia, il futuro, noi stessi.`;
const c3 = `Ora avvicinati al centro della stanza e prendi uno specchio e un indelebile, poi torna pure al tuo posto`;
const c4 = `Guarda il tuo riflesso nello specchio. Cerca di andare oltre l’immagine che ti restituisce per vedere cosa c’è nel tuo cuore. Prova a farti queste domande:
Che cosa mi spaventa davvero in questo periodo della mia vita?
C’è qualcosa che cerco di evitare, a cui non voglio pensare? Una parte di me che nascondo per paura di essere giudicato o rifiutato? Qualcosa che, se dicessi ad alta voce, mi farebbe sentire “nudo” davanti agli altri?`;
const c5 = `Adesso scrivi sullo specchio una paura. Può essere qualcosa che hai già detto a qualcuno, oppure qualcosa che non hai mai avuto il coraggio di dire a voce alta. Non serve firmarla, nessuno deve sapere che è tua; ma quel gesto (scriverla per farla uscire da te) sarà già un atto di coraggio. Anche se non lo vediamo subito, parlare delle nostre paure, anche in questo modo silenzioso e anonimo, cambia qualcosa: non siamo più soli.`;
const c6 = `Lascia lo specchio in uno spazio dove gli altri possano vederlo. Se vuoi, prenditi del tempo per leggere gli specchi degli altri: a volte, vedere che non siamo gli unici a portare un peso ci alleggerisce un po’.
Se ne hai voglia, puoi scrivere su un post-it un messaggio di empatia in risposta a qualche paura in particolare. Puoi lasciare una frase, una parola, un simbolo, un piccolo disegno, quello che ti senti di condividere per trasmettere comprensione e incoraggiamento. Non cercare di risolvere la paura, non dire cosa dovrebbe fare chi l’ha scritta. In questo spazio non ci sono giudizi, solo il coraggio di chi si mostra e il rispetto di chi guarda con occhi gentili.`;
const c7 = `hai terminato l'attività! se hai ancora tempo a disposizione, recati in un'altra stanza ✨`;

const i0 = `In questo laboratorio, sperimenteremo con il corpo.
Infatti, ti verranno proposte mano a mano delle figure da replicare: alcune da solo, altre invece con altre persone.
Sentiti libero di esprimerti al massimo, e se possibile cerca di cambiare compagni tra una figura e l'altra.
Togli le scarpe, e vai con la prima figura!`;
const i1 = `Ogni viaggio prevede degli incontri: può essere qualcuno che ci accompagna dalla partenza o qualcuno che incontreremo nel corso del cammino.
L’incontro con l’altro è un tema speciale, perché è il luogo in cui un “io” e un “tu” possono diventare un “noi” se ci si pone con apertura, fiducia e disponibilità all’ascolto. 
Esporsi è sempre una scelta: possiamo restare chiusi nelle nostre individualità, incapaci di correre il rischio di abbandonarci, oppure possiamo aprirci all’altro, accettando la vulnerabilità che ne deriva in nome dell’arricchimento che ne possiamo ricavare (e che possiamo donare all’altro).
Come ti poni quando incontri qualcuno? Sei disposto ad aprirti, a comunicare e ascoltare davvero l’altro, oppure ti capita di proteggerti, restando sulle tue? Cosa ti porta a fidarti e ad accogliere l’altro?
prova a parlarne con i tuoi compagni di “ginnastica AC”`;
const i2 = `Il “tu” che incontriamo è anche lo specchio nel quale possiamo vedere noi stessi e metterci in discussione. Nel confronto (a volte anche nello scontro) con l’altro emergono alcuni nostri lati nascosti: fragilità, paure, ma anche risorse e qualità che non sapevamo di avere; le emozioni che proviamo grazie agli altri (o a causa loro) sono reazioni che parlano molto più di noi che di chi ci sta di fronte; attraverso somiglianze e differenze rafforziamo la nostra personalità e la consapevolezza di chi siamo, ricordando che una piena conoscenza (dell’altro così come di noi stessi) è un processo che non potrà mai dirsi concluso.
Quale incontro è stato significativo per te? Ti è capitato che una persona ti mostrasse un lato di te che non vedevi o non volevi vedere? Hai mai sentito di aver “perso” qualcosa in un incontro (una maschera, una sicurezza apparente, una convinzione che avevi su di te o sul mondo), o di aver guadagnato qualcosa che non cercavi?`;
const i3 = `hai terminato l'attività! se hai ancora tempo a disposizione, recati in un'altra stanza ✨`;

const sp0 = `prendi posto nella stanza e mettiti a tuo agio: in questa attività abbiamo voluto prendere spunto dalla bibbia per semplificare al meglio i concetti chiave`;
const sp1 = `Dopo questi fatti il Signore parlò in visione ad Abramo:
- Non temere, - gli disse, - io ti proteggo come uno scudo. La tua ricompensa sarà grandissima.
 Ma Abramo rispose:
- Signore, mio Dio, cosa mai potrai darmi, dal momento che non ho figli? Ormai sto per andarmene e l'erede in casa mia sarà Eliezer di Damasco. Ecco, tu non mi hai dato nemmeno un figlio, - continuò a dire Abramo, - e così un servo della mia famiglia sarà mio erede!
Il Signore rispose:
- No! Non il tuo servo, ma uno che nascerà da te sarà il tuo erede.
Poi lo condusse all'aperto e gli disse: 'Contempla il cielo e conta le stelle, se le puoi contare!'. E aggiunse: 'I tuoi discendenti saranno altrettanto numerosi'.
Abramo ebbe fiducia nel Signore e per questo il Signore lo considerò giusto.`;
const sp2 = `in questo testo possiamo analizzare tre aspetti: 
un credente la cui fede viene messa alla prova (Abramo sarà destinato a morire senza lasciare discendenza?) e l'intervento di Dio, che sembra quasi si aspetti le difficoltà di Abramo; lo incoraggia (non temere); lo invita a guardare più in là di quelle che sono le aspettative umane (non costui…) e a credere in ciò che umanamente non sembra possibile.
Ti è mai capitato di sentire Dio distante da te? 
Sei poi riuscito a riavvicinarti o continua ad essere un rapporto a tappe?`;
const sp3 = `Abramo poi "ritorna in sé" e "crede" che ciò che non è possibile umanamente (o ciò che umanamente non osiamo sperare) si possa compiere; crede che a Dio sia possibile l'impossibile, ha quindi fede in lui, e nutre speranza nel futuro grazie all'amore che Dio gli dimostra. In fin dei conti, lui ha un piano per tutti noi… giusto?
Senti di avere fede in Dio? 
Prova a pensare in che modi Dio esprime il suo amore per noi abitanti della terra… prenditi un momento di riflessione`;
const sp4 = `ora ascolta questa canzone e leggi con attenzione il testo, immagina che sia Dio stesso a cantare questo brano, te lo farà percepire in un'ottica diversa
https://youtu.be/fK8LrzzC4-8?si=QbOYN8fSacpjWfU6`;
const sp5 = `come ti fa sentire questo brano? secondo te c'è qualche rimando ai temi della speranza e dell'amore?`;
const sp6 = `Dopo aver riflettuto, prendi un foglio e qualche colore, poi torna alla tua postazione`;
const sp7 = `cosa pensi del tuo percorso di fede? prova a rappresentarlo con disegni, scritte, annotazioni… insomma, crea la tua mappa del tesoro, dove dio è la grande X rossa! mi raccomando però, lascia dello spazio verso la fine della tua personalissima “linea del tempo” e dedicati un pensiero di speranza per il futuro🌈`;
const sp8 = `ora che hai terminato, arrotolalo ed appendilo ai nastri che pendono dai palloncini nella stanza`;
const sp9 = `Papa Francesco considerava la speranza una virtù fondamentale per la vita umana, un faro che illumina il cammino anche in tempi bui. La speranza non è un semplice desiderio, ma una certezza che Dio è sempre presente, che la vita è fatta per la vita e che la morte non avrà l'ultima parola. La speranza è un'attitudine che ci permette di guardare avanti con ottimismo, di affrontare le difficoltà con coraggio e di rimanere sempre in cammino verso un futuro migliore; mentre l'amore è la forza che ci spinge ad amare il prossimo come Dio lo ama, e crede che esso possa trasformare il mondo, portando pace, giustizia e felicità.`;
const sp10 = `hai terminato l'attività! se hai ancora tempo a disposizione, recati in un'altra stanza ✨`;

const instructions = {
  Sogno: [
    { msg: s0 },
    { msg: s1 },
    { msg: s2 },
    { msg: s3 },
    { msg: s4 },
    { msg: s5 },
  ],
  Coraggio: [
    { msg: c0 },
    { msg: c1, img: "https://i.imgur.com/wGXVb6Y.png" },
    { msg: c2 },
    { msg: c3 },
    { msg: c4 },
    { msg: c5 },
    { msg: c6 },
    { msg: c7 },
  ],
  Incontro: [
    { msg: i0 },
    { msg: "", img: "https://i.imgur.com/L4I0IeX.jpeg" },
    { msg: "", img: "https://i.imgur.com/pyxPrM0.jpeg" },
    { msg: "", img: "https://i.imgur.com/s65XBbP.jpeg" },
    { msg: "", img: "https://i.imgur.com/ncCO2qH.jpeg" },
    { msg: i1 },
    { msg: i2 },
    { msg: i3 },
  ],
  Speranza: [
    { msg: sp0 },
    { msg: sp1 },
    { msg: sp2 },
    { msg: sp3 },
    { msg: sp4 },
    {
      msg: "",
      img: [
        "https://i.imgur.com/ShXGONZ.jpeg",
        "https://i.imgur.com/IG63KR9.jpeg",
      ],
    },
    { msg: sp5 },
    { msg: sp6 },
    { msg: sp7 },
    { msg: sp8 },
    { msg: sp9 },
    { msg: sp10 },
  ],
};

// Generate inline keyboard
function getInlineKeyboard(userId) {
  return {
    inline_keyboard: options.map((row) =>
      row.map((option) => ({
        text: option.text,
        callback_data: option.text,
      }))
    ),
  };
}

// Handle /start
bot.onText(/\/start/, (msg) => {
  const userId = msg.chat.id;
  if (!selections[userId]) selections[userId] = {};

  bot.sendMessage(userId, "In che stanza ti stai dirigendo?", {
    reply_markup: getInlineKeyboard(userId),
  });
});

bot.on("callback_query", (query) => {
  const userId = query.message.chat.id;
  const data = query.data;

  // Handle "next" button
  if (data === "next") {
    const userProgress = progress[userId];
    if (!userProgress) {
      return bot.answerCallbackQuery(query.id, {
        text: "Errore: Nessun progresso!",
      });
    }

    const { option, step } = userProgress;
    const nextStep = step + 1;
    const messages = instructions[option];

    if (nextStep < messages.length) {
      progress[userId].step = nextStep;

      const nextMessage = messages[nextStep].msg;
      const hasMore = nextStep < messages.length - 1;

      if (messages[nextStep].img) {
        if (Array.isArray(messages[nextStep].img)) {
          bot
            .sendMediaGroup(
              userId,
              messages[nextStep].img.map((it) => ({ type: "photo", media: it }))
            )
            .then(() => {
              // After sending media group, send a message with a reply_markup (keyboard)
              const replyMarkup = {
                inline_keyboard: [[{ text: "Avanti", callback_data: "next" }]],
              };

              bot.sendMessage(userId, "Marco Mengoni - Guerriero", {
                reply_markup: replyMarkup,
              });

              bot.answerCallbackQuery(query.id);
            });
        } else {
          bot.sendPhoto(userId, messages[nextStep].img, {
            caption: nextMessage,
            reply_markup: hasMore
              ? {
                  inline_keyboard: [
                    [{ text: "Avanti", callback_data: "next" }],
                  ],
                }
              : getInlineKeyboard(userId),
          });
        }
      } else {
        bot.sendMessage(userId, nextMessage, {
          reply_markup: hasMore
            ? {
                inline_keyboard: [[{ text: "Avanti", callback_data: "next" }]],
              }
            : getInlineKeyboard(userId),
        });
      }
    }
    return bot.answerCallbackQuery(query.id);
  }

  // Handle regular option selection
  const selectedOption = data;
  selections[userId][selectedOption] = !selections[userId][selectedOption];

  // Start instruction flow for selected option
  progress[userId] = {
    option: selectedOption,
    step: 0,
  };

  const firstMessage = instructions[selectedOption][0].msg;
  const hasMore = instructions[selectedOption].length > 1;

  bot.sendMessage(userId, firstMessage, {
    reply_markup: hasMore
      ? {
          inline_keyboard: [[{ text: "Avanti", callback_data: "next" }]],
        }
      : undefined,
  });

  bot.answerCallbackQuery(query.id);
});
