let puntiVip = 0;
let puntiBot = 0;
let puntiRitardati = 0;

// Indice per sapere a quale domanda si trova l'utente (0 significa la prima)
let indiceDomandaCorrente = 0;
let punteggioTotale = { vip: 0, bot: 0, ritardati: 0 };
let cronologiaScelte = [];// per tornare indiatro

let listaDomande;
const listaDomandeM = [
    {
        domanda: "1. Preferisci il potere o la libertà?",
        risposte: [
            { testo: "A) Da grandi poteri derivano grandi responsabilità.", punti: { vip: 3, bot: 7, ritardati: 0 } },
            { testo: "B) La libertà, non mi interessa il potere se mi lega in qualsiasi modo, preferisco rimanere nell'ombra e operare per il bene in silenzio.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) Una vodka liscia.", punti: { vip: 0, bot: 0, ritardati: 10 } },
            { testo: "D) Il potere, anche se ciò significa impegnarmi e sacrificarmi per gli altri.", punti: { vip: 10, bot: 0, ritardati: 0 } }
        ]
    },
    {
        domanda: "2. C'è una predica di Gubitosi sulla gnosi spuria, tu cosa fai?",
        risposte: [
            { testo: "A) Sono interessato e ascolto.", punti: { vip: 3, bot: 7, ritardati: 0 } },
            { testo: "B) Sono interessato, ascolto e prendo appunti.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) Non lo so, non lo sto ascoltando troppo.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "D) Impossibile, io non vado alle conferenze.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "3. Al canto finale in chiesa una ragazza carina si avvicina a te e chiede se potete condividere il libretto dei canti, cosa fai?",
        risposte: [
            { testo: "A) Le dico di sì, cantiamo insieme, e magari dopo ci faccio due chiacchiere.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "B) Cantiamo insieme ma finisce lì.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "C) La zittisco perché non si può parlare in chiesa.", punti: { vip: 4, bot: 5, ritardati: 1 } },
            { testo: "D) Impossibile, io non parlo con le donne.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "4. Perché vai al pellegrinaggio?",
        risposte: [
            { testo: "A) Vado per santificarmi e per pregare.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "B) Vado per santificarmi, pregare e stare insieme ai miei amici.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "C) Vado per urlare \"sinistra\" dando fastidio al servizio d'ordine.", punti: { vip: 0, bot: 5, ritardati: 5 } },
            { testo: "D) Vado per farmi richiamare dal proprietario dell'ostello alle due di notte.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "5. È l'anniversario con la tua ragazza, e lei ti chiede cosa hai intenzione di fare la sera.",
        risposte: [
            { testo: "A) La porti in un ristorante carino e le compri dei fiori.", punti: { vip: 5, bot: 5, ritardati: 0 } },
            { testo: "B) Le dici che sei alla benedizione eucaristica.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) Purtroppo sei costretto a rimandare per un contrattempo a lavoro.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "D) Vai in palestra a fare petto e richiamo di femorali.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "6. Sei per strada e vedi due ragazze sensuali, vestite in maniera succinta.",
        risposte: [
            { testo: "A) Alzi la manica della maglietta e stringi il bicipite possente.", punti: { vip: 0, bot: 0, ritardati: 10 } },
            { testo: "B) Abbassi lo sguardo per non cadere nella tentazione carnale.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "C) Cammini normalmente e sorridi loro.", punti: { vip: 6, bot: 4, ritardati: 0 } },
            { testo: "D) Ti avvicini e dici loro: \"Ogni centimetro di pelle scoperta in questa vita, brucerà per sempre nell'altra\"", punti: { vip: 0, bot: 10, ritardati: 0 } }
        ]
    },
    {
        domanda: "7. Sei ad un incontro giovani e ti chiedono di intavolare un discorso.",
        risposte: [
            { testo: "A) Se Tolkien pensava agli angeli quando ha creato gli elfi.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) La scomunica della fraternità.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) Non hai un discorso preferito, dipende dalle circostanze.", punti: { vip: 4, bot: 3, ritardati: 3 } },
            { testo: "D) È meglio fare richiamo di dorso piuttosto che fare gambe.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "8. Sei appena tornato a casa dopo 10 ore di lavoro in cantiere e ti arriva la notifica dal gruppo giovani. Una ragazza ha inviato la predica domenicale di don Marco, con tanto di faccina: 🤗💐. Come rispondi?",
        risposte: [
            { testo: "A) \"Grazie carissima🙏\".", punti: { vip: 3, bot: 7, ritardati: 0 } },
            { testo: "B) Non rispondi.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "C) \"Bellissima❤️. Ascoltate invece questa di padre Daniele a Budrio\" (alleghi la predica).", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "D) Reagisci con una emoji di un polipo.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "9. Sei in una forte situazione di stress psicofisico: quale credi sia la tua reazione tendenzialmente?",
        risposte: [
            { testo: "A) Sopporto con calma, mi inginocchio e chiedo la grazia della calma nel Rosario, ricordandomi che anch'io sono pieno di difetti e peccatore.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "B) Sopporto per questa volta e cerco di evitare che la questione si ripresenti, anche se dovesse significare non presentarmi io stesso.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "C) Racchiudo tutte le energie che mi sono state concesse in questa vita nelle nocche della mia mano, e indirizzo un pugno verso il muro che, all'impatto, non può fare a meno di danneggiare me stesso e il muro.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "10. Se tu fossi un marinaio, cosa preferiresti fare?",
        risposte: [
            { testo: "A) Attraccare al primo porto sicuro, cercare il mio equilibrio e costruire qualcosa.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "B) Vagare alla ricerca del porto migliore che mi dia una maggiore soddisfazione, anche se questo significa ritardare alcune tappe della vita.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "C) Getta l'ancora solo temporaneamente per ripartire verso nuove mete.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "11. Quale dei seguenti generi musicali senti più affine a te?",
        risposte: [
            { testo: "A) Musica classica.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) Musica rap.", punti: { vip: 0, bot: 0, ritardati: 10 } },
            { testo: "C) Musica gregoriana.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "D) Altri generi.", punti: { vip: 3 , bot: 4, ritardati: 3 } }

        ]
    },
    {
        domanda: "12. Stai prendendo un cocktail da un famoso bartender: che genere di cocktail desideri?",
        risposte: [
            { testo: "A) Qualcosa di fresco e fruttato, non troppo forte.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "B) Un cocktail che mi faccia sentire effettivamente l'effetto dell'alcol.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "C) Qualcosa che mi faccia dire: «Wow».", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "13. Hai solo poche ore di vita: decidi quale film vedere prima di morire.",
        risposte: [
            { testo: "A) Il Signore degli Anelli, edizione estesa.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) Un film sui santi.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) La Casa di Topolino.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "14. Vai a Fatima e tua madre ti chiede di portarle un ricordo sacro, tu cosa le porti?",
        risposte: [
            { testo: "A) Un rosario profumato e l'acqua santa.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "B) Un'immaginetta della madonna.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "C) Una madonna di 50 cm fosforescente.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "15. Hai appena vinto una borsa di studio, come impiegheresti i tuoi soldi?",
        risposte: [
            { testo: "A) Fai dire delle messe requiem per i tuoi cari defunti.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "B) Li usi per le spese universitarie.", punti: { vip: 5, bot: 5, ritardati: 0 } },
            { testo: "C) Ti compri un iPhone o qualcosa di utile ma costoso.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "D) Fai un viaggio in America senza sapere l'inglese.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "16. Vai in un altro paese e i tuoi compagni vogliono visitare una torre",
        risposte: [
            { testo: "A) Sei interessato e consigli di prendere una guida.", punti: { vip: 5, bot: 5, ritardati: 0 } },
            { testo: "B) Sei interessato ma preferisci spendere quei soldi per vedere la cattedrale.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) La visiti indifferente soltanto per poter dire di averla visitata.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "D) Compri il biglietto solo per testare i bagni medioevali e fare una trazione a 72m di altezza.", punti: { vip: 0, bot: 0, ritardati: 10 } },
        ]
    },
    {
        domanda: "17. Come reagiscono le persone quando sanno che i loro cari escono con te?",
        risposte: [
            { testo: "A) 'Sono contento che esci con lui, potreste anche fare più cose insieme è così un bravo ragazzo.'", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) 'Ah, esce con te, non l'avevo notato.'", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) 'Hai una sedia, ho bisogno di sedermi un attimo.'", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]

    },
    {
        domanda: "18. Il pellegrinaggio delle sette chiese, tu cosa fai?",
        risposte: [
            { testo: "A) Ci vai di buon zelo.", punti: { vip: 2, bot: 7, ritardati: 1 } },
            { testo: "B) Non ci vai perché cade proprio durante gli esercizi spirituali di Sant'ignazio.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) Ci andresti ma devi studiare.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "D) Non ci vai perché in quella settimana c'è il Mister Olimpia.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "19. È post cena dell'incontro giovani, cosa fai?",
        risposte: [
            { testo: "A) Ti riunisci con il tuo piccolo gruppetto di amici.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) Vai a dormire.", punti: { vip: 3, bot: 7, ritardati: 0 } },
            { testo: "C) Vai a finire le tue orazioni.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "D) Ti butti in una fontana alle 3 di notte.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "20. Sei all'incontro giovani e lo staff si allontana dai fusti di birra quasi intonsi, cosa fai?",
        risposte: [
            { testo: "A) Ne rubi uno e vai a berlo con i tuoi amici nel campo da basket.", punti: { vip: 0, bot: 0, ritardati: 10 } },
            { testo: "B) Sei astemio.", punti: { vip: 3, bot: 7, ritardati: 0 } },
            { testo: "C) Sei temperante e ti riempi solo un bicchiere.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "D) Devi guidare e quindi decidi che è più saggio non bere troppo.", punti: { vip: 10, bot: 0, ritardati: 0 } }
        ]
    },
    {
        domanda: "21. Sei al pellegrinaggio Bevagna-Assisi, è sera, cosa fai?",
        risposte: [
            { testo: "A) Ceni con i tuoi amici storici e vai a dormire per essere in forma per la camminata del giorno dopo.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) Ceni con i preti in ostello e dopo ti fumi un sigaro con loro.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) Dopo cena cerchi di incontrare il gruppo di ragazzi che si è organizzato per andare a prendere un gelato.", punti: { vip: 5, bot: 5, ritardati: 0 } },
            { testo: "D) Ceni in un bar vedendo la partita e giri per Foligno incontrando ragazzi strani.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "22. Hai la patente da qualche mese, quale credi che sia lo scenario più plausibile?",
        risposte: [
            { testo: "A) 'Tieni figlio mio, guida pure la mia auto, mi fido ciecamente'.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) 'Ok guida ma fai molta attenzione la strada non è facile'.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) 'Emmm Papà... C'è la macchina a terra sdraiata con i vetri rotti'.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    }
];
const listaDomandeF = [
    {
        domanda: "1. Preferisci il potere o la libertà?",
        risposte: [
            { testo: "A) Da grandi poteri derivano grandi responsabilità.", punti: { vip: 3, bot: 7, ritardati: 0 } },
            { testo: "B) La libertà, non mi interessa il potere se mi lega in qualsiasi modo, preferisco rimanere nell'ombra e operare per il bene in silenzio.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) Una vodka liscia.", punti: { vip: 0, bot: 0, ritardati: 10 } },
            { testo: "D) Il potere, anche se ciò significa impegnarmi e sacrificarmi per gli altri.", punti: { vip: 10, bot: 0, ritardati: 0 } }
        ]
    },
    {
        domanda: "2. C'è una predica di Gubitosi sulla gnosi spuria, tu cosa fai?",
        risposte: [
            { testo: "A) Sono interessata e ascolto.", punti: { vip: 3, bot: 7, ritardati: 0 } },
            { testo: "B) Sono interessata, ascolto e prendo appunti.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) Non lo so, non lo sto ascoltando troppo.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "D) Impossibile, io non vado alle conferenze.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "3. Sei ad un incontro giovani e ti chiedono di intavolare un discorso.",
        risposte: [
            { testo: "A) Se Tolkien pensava agli angeli quando ha creato gli elfi.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) La scomunica della fraternità.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) Non hai un discorso preferito, dipende dalle circostanze.", punti: { vip: 4, bot: 3, ritardati: 3 } },
            { testo: "D) Parli di gossip (Maria ha lasciato Sigismondo).", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "4. Sei appena tornata a casa dopo una lunga giornata di di lavoro, e ti arriva una notifica dal gruppo giovani. Una ragazzo ha inviato la predica domenicale di don Marco, con tanto di faccina: 🤗💐. Come rispondi?",
        risposte: [
            { testo: "A) \"Grazie🙏\".", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) Non rispondi.", punti: { vip: 0, bot: 0, ritardati: 10 } },
            { testo: "C) \"Bellissima❤️. Ascoltate invece questa di padre Daniele a Budrio\" (alleghi la predica).", punti: { vip: 0, bot: 10, ritardati: 0 } }
        ]
    },
    {
        domanda: "5. Se tu fossi un marinaio, cosa preferiresti fare?",
        risposte: [
            { testo: "A) Attraccare al primo porto sicuro, cercare il mio equilibrio e costruire qualcosa.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "B) Vagare alla ricerca del porto migliore che mi dia una maggiore soddisfazione, anche se questo significa ritardare alcune tappe della vita.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "C) Getta l'ancora solo temporaneamente per ripartire verso nuove mete.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "6. Quale dei seguenti generi musicali senti più affine a te?",
        risposte: [
            { testo: "A) Musica classica.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) Musica rap.", punti: { vip: 0, bot: 0, ritardati: 10 } },
            { testo: "C) Musica gregoriana.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "D) Altri generi.", punti: { vip: 3 , bot: 4, ritardati: 3 } }

        ]
    },
    {
        domanda: "7. Stai prendendo un cocktail da un famoso bartender: che genere di cocktail desideri?",
        risposte: [
            { testo: "A) Qualcosa di fresco e fruttato, non troppo forte.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "B) Un cocktail che mi faccia sentire effettivamente l'effetto dell'alcol.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "C) Qualcosa che mi faccia dire: «Wow».", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "8. Hai solo poche ore di vita: decidi quale film vedere prima di morire.",
        risposte: [
            { testo: "A) Il Signore degli Anelli, edizione estesa.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) Un film sui santi.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) La Casa di Topolino.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "9. Vai a Fatima e tua madre ti chiede di portarle un ricordo sacro, tu cosa le porti?",
        risposte: [
            { testo: "A) Un rosario profumato e l'acqua santa.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "B) Un'immaginetta della madonna.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "C) Una madonna di 50 cm fosforescente.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "10. Hai appena vinto una borsa di studio, come impiegheresti i tuoi soldi?",
        risposte: [
            { testo: "A) Fai dire delle messe requiem per i tuoi cari defunti.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "B) Li usi per le spese universitarie.", punti: { vip: 5, bot: 5, ritardati: 0 } },
            { testo: "C) Ti compri un iPhone o qualcosa di utile ma costoso.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "D) Fai un viaggio in America senza sapere l'inglese.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]
    },
    {
        domanda: "11. Vai in un altro paese e le tue compagne vogliono visitare una torre",
        risposte: [
            { testo: "A) Sei interessata e consigli di prendere una guida.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) Sei interessata ma preferisci spendere quei soldi per vedere la cattedrale.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) La visiti indifferente soltanto per poter dire di averla visitata.", punti: { vip: 0, bot: 0, ritardati: 10 } } 
        ]
    },
    {
        domanda: "12. Come reagiscono le persone quando sanno che i loro cari escono con te?",
        risposte: [
            { testo: "A) 'Sono contento che esci con lei, potreste anche fare più cose insieme è così un brava ragazza.'", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) 'Ah, esce con te, non l'avevo notato.'", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) 'Stai attento a lei frequenta strani ragazzi.'", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]

    },
    {
        domanda: "13. Quale delle seguenti attività gradiresti fare in gruppo?",
        risposte: [
            { testo: "A) Parlare di un'altra ragazza. ", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) Andare in giro a vedere Chiese.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "C) Fare una top dei ragazzi più belli della fraternità.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]

    },
    {
        domanda: "14. Un ragazzo ci prova con te: ",
        risposte: [
            { testo: "A) Gli dico di no, non usa il messalino. ", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "B) Gli dico di no, non è abbastanza.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "C) Gli dico di no, non è fissato con la palestra.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]

    },
    {
        domanda: "15. Sei nell'ostello di Bevagna-Assisi cosa fai?",
        risposte: [
            { testo: "A) Vado nel chioschetto e leggo un bel libro, nella speranza che i ritardati non vengano a disturbami con la loro stupidità.  ", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "B) Dopo aver fatto il pellegrinaggio esco di sera a prendere un gelato, ma rientro presto.", punti: { vip: 4, bot: 5, ritardati: 1 } },
            { testo: "C) Dopo il pellegrinaggio vado subito a pregare, cenare e poi a letto. ", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "D) Esco e fino a tardi bevendo e gossippando.", punti: { vip: 0, bot: 0, ritardati: 10 } }
        ]

    },
    {
        domanda: "16. Dove ti vedi 4 anni dopo la fine delle superiori?",
        risposte: [
            { testo: "A) A perseguire la mia vocazione, in convento o all'altare.", punti: { vip: 0, bot: 10, ritardati: 0 } },
            { testo: "B) A festeggiare la mia laurea.", punti: { vip: 10, bot: 0, ritardati: 0 } },
            { testo: "C) A lavorare al posto del mio uomo.", punti: { vip: 0, bot: 0 , ritardati: 10 } }
        ]
    }
    
];
let sessoScelto = "";


const contenitoreDomanda = document.getElementById("question-box");
const contenitoreBottoni = document.getElementById("answer-buttons");
const tastoIndietro = document.getElementById("back-btn");
const tastoInvio = document.getElementById("btn-invio");


function aggiungiPunti(rispostaScelta) {
    
    punteggioTotale.vip += rispostaScelta.punti.vip;
    punteggioTotale.bot += rispostaScelta.punti.bot;
    punteggioTotale.ritardati += rispostaScelta.punti.ritardati;
    
    console.log("Nuovo punteggio totale:", punteggioTotale);//per noi
}

function sottraiPunti(rispostaPrecedente) {
    punteggioTotale.vip -= rispostaPrecedente.punti.vip;
    punteggioTotale.bot -= rispostaPrecedente.punti.bot;
    punteggioTotale.ritardati -= rispostaPrecedente.punti.ritardati;

    console.log("Nuovo punteggio totale:", punteggioTotale);

}

function mostraDomandaSulloSchermo() {
    if (indiceDomandaCorrente >= listaDomande.length) {//solo alla fine
        contenitoreDomanda.innerText = "Hai completato tutte le domande!";
        contenitoreBottoni.innerHTML = "<p>Clicca sul tasto 'Invio' qui sotto per scoprire il tuo verdetto finale.</p>";
        tastoInvio.classList.remove("btn-nascondi"); 
        tastoIndietro.classList.remove("btn-nascondi");

        return;


    }
    const domandaAttuale = listaDomande[indiceDomandaCorrente];
    // Usiamo .innerText per cambiare il testo della scatola HTML
    contenitoreDomanda.innerText = domandaAttuale.domanda;
    // Svuotiamo la scatola dai bottoni della domanda precedente con lo stesso metodo
    contenitoreBottoni.innerHTML = "";

    // Cicliamo dentro le risposte della domanda attuale per creare i bottoni
    domandaAttuale.risposte.forEach(risposta => {
        const nuovoBottone = document.createElement("button");
        nuovoBottone.innerText = risposta.testo;
        nuovoBottone.classList.add("btn-risposta"); //crea semplicemente una classe per il bottone (per css)

        // Diciamo al bottone cosa fare quando viene CLICCATO:
        nuovoBottone.addEventListener("click", () => {

            cronologiaScelte.push(risposta);//per ricordarmi nel caso andasse indietro
            
            // Chiamiamo la tua funzione per aggiungere i punti al dizionario
            aggiungiPunti(risposta); 
            
            // AGGIORNIAMO L'INDICE (Passiamo alla domanda successiva!)
            indiceDomandaCorrente++; 
            
            // Ricarichiamo la funzione per aggiornare lo schermo con la nuova domanda
            mostraDomandaSulloSchermo();
        });

        // Infiliamo il bottone nell'HTML
        contenitoreBottoni.appendChild(nuovoBottone);

    });

    if (indiceDomandaCorrente > 0) {
        tastoIndietro.classList.remove("btn-nascondi")//levo il comando css quindi levo diplay: none;
    }else{
        tastoIndietro.classList.add("btn-nascondi")
    }
    
    tastoInvio.classList.add("btn-nascondi")

}

function calcolaRisultato(){
    let vip = punteggioTotale.vip;
    let bot = punteggioTotale.bot;
    let ritardati = punteggioTotale.ritardati;
    
    if (sessoScelto === "M"){
        vip= Math.round((vip*100)/220);
        bot= Math.round((bot*100)/220);
        ritardati= Math.round((ritardati*100)/220);
    }else{
        vip= Math.round((vip*100)/160);
        bot= Math.round((bot*100)/160);
        ritardati= Math.round((ritardati*100)/160);
    }
        
    const vincitore = Math.max(vip, bot, ritardati)
    

    let nomeImmagine = "";
    let testoProfilo = "";

    if (vincitore === vip) {
        nomeImmagine = (sessoScelto === "M") ? "vip.jpg" : "vip_f.jpg";  // Cambia in .png se l'immagine è un PNG
        testoProfilo = `👑 PROFILO VIP:<br><br>
        Leggere un buon libro nella calma di un chioschetto di un albergo, ascoltare un po' di sana musica classica, vivere nella pace ricordando di avere degli impegni che devono essere compiuti!<br>
        Gradisci questa prospettiva? Bene! Allora sicuramente fai parte del Gruppo Vip FSSPX Italia.<br><br>
        Le parole d'ordine del gruppo sono: <b>disciplina, impegno, doveri</b>. I VIP sanno che ci sono degli eventi da organizzare, delle scadenze da rispettare e, anche se non ne hanno voglia, si impegnano per far sì che tutto si realizzi. Si fanno carico loro di tutto (ovviamente alcune volte necessitano di aiuto da parte di altri gruppi, più che altro bot).<br><br>
        Spesso non amano la confusione e quindi non stanno nei grandi gruppi con gli altri, preferiscono riunirsi in contesti più piccoli dove la pace regna sovrana.<br><br>
        <b>Tendenzialmente attratti da:</b><br>
        📖 TOLKIEN<br>
        🎼 Musica classica<br>
        🎨 Arte<br><br>
        <b>Tendenzialmente ripugnano:</b><br>
        🔊 Chiasso<br>
        🌀 Disorganizzazione<br>
        🤪 Gruppo ritardati<br><br>
        <b>Animale simbolo:</b><br>
        🦌 Il Cervo (Animale simbolo di Regalità che ama stare nella foresta senza essere disturbato)..<br><br>
        <i>Nota bene: La vita del nobile è piena di onori ma anche di oneri.
        Hai le porte aperte in mille cose. Il gruppo vip è un gruppo elitario si, ma sinonimo di responsabilità, loro organizzano i raduni, i pellegrinaggi, non accettano che la pigrizia o i loro sentimenti li sovrastino. Fare sempre il proprio dovere anche quando non vorresti, sei ${sessoScelto === "M" ? "pronto" : "pronta"} per questa sfida ?</i>`;
    } else if (vincitore === bot) {
        nomeImmagine = (sessoScelto === "M") ? "bot.jpg" : "bot_f.jpg";
        testoProfilo = `👼 PROFILO BOT:<br><br>
        Visibilità? Chiasso? Potere? Irresponsabilità? Cosa costruisce chi cerca o possiede queste cose? Nulla.<br>
        Non è il potere che mi darà il cielo, o il chiasso che mi darà la felicità.<br><br>
        Queste cose i bot le sanno bene. Se ti rivedi in questo modo di pensare, allora complimenti, sei parte di questo glorioso gruppo.<br><br>
        Laddove gli altri cercano la luce dei riflettori, i bot lavorano nel silenzio; quando gli altri passano il loro tempo nei tumulti del mondo, i bot esercitano la virtù della <b>pazienza nella preghiera</b>.<br><br>
        <b>Tendenzialmente attratti da:</b><br>
        🎤 Conferenze<br>
        🙏 Prediche<br>
        ⛪ Priorati della fraternità<br><br>
        <b>Tendenzialmente ripugnano:</b><br>
        🛑 Immobilismo<br>
        🍎 Peccato<br>
        🐺 Falsi pastori<br><br>
        <b>Animale simbolo:</b><br>
        🐦 L'Uccello Tessitore (Animale che passa la vita a costruire il nido per la sua famiglia e che si impegna nel silenzio per l'ecosistema. Senza di lui l'equilibrio che regge la natura soffrirebbe).<br><br>
        <i>Tu, creatura che stai leggendo, apprendi bene, la vera differenza tra i bot e gli altri non è nella personalità o nel pensiero, è nei risultati, i bot sono gli alberi da frutto, costoro sono il tronco della fraternità la sua grande parte, sono coloro che si sposano, danno vocazioni e aiutano la fraternità non solo a sopravvivere ma ad andare avanti. Sono coloro che lontano dalla luce dell'uomo ma vicina a quella spirituale costruiscono il futuro, gli eroi che il mondo non celebra ma di cui necessita per diventare un posto migliore. 
        Puoi pensare che i bot siano anonimi, che non si distinguano nel bene o nel male, ma in realtà si distinguono nel fare. 
        A te che fai parte di questo gruppo va il nostro grazie.</i>`;
    } else {
        nomeImmagine = (sessoScelto === "M") ? "ritardati.jpg" : "ritardati_f.jpg";
        testoProfilo = `🤪 PROFILO ${sessoScelto === "M" ? "RITARDATO" : "RITARDATA"}:<br><br>
        ${sessoScelto === "M" 
        ? "Ti sei fatto richiamare dal preside quando eri a scuola? Hai mai distrutto una macchina? Tua madre ti ha mai detto: 'non chiamarmi mamma quando siamo fuori!'?<br>" 
        : "Sei andata via da una scuola della fraternità? Dopo aver portato a casa un fidanzato tua madre si è messa a urlare: perché proprio a me un malessere? I tuoi genitori ti dicono di ascoltare Paganini ma tu preferisci Tony Pitony?<br>"
        }
        Come dici? Sì? Bene, allora sei nel posto giusto, il gruppo ritardati FSSPX Italia ti apre le porte.<br><br>
        Qui troverai amici, risate e tanto tanto vino. Non illuderti, i ritardati non sono quel gruppo inutile che sul finire della storia fanno qualcosa di grande, loro sono il gruppo che fa danni dall'inizio alla fine. La loro utilità? Nessuna.<br><br>
        <b>Tendenzialmente attratti da:</b><br>
        🏃‍♂️ Sport<br>
        🤝 Amicizia<br>
        🍷 Alcool<br><br>
        <b>Tendenzialmente ripugnano:</b><br>
        📚 Libri<br>
        🎻 Musica classica<br>
        🎤 Conferenze<br><br>
        <b>Animale simbolo:</b><br>
        ${sessoScelto === "M" 
        ? "🐔 Il Pollo (quello che mangiano tutti i giorni tranne il venerdì dove invece mangiano tonno)<br><br><i>Ricorda: In questo gruppo sono presenti elementi che hanno dato pugni nei muri, gente che ha distrutto macchine e altri che si sono buttati nelle fontane di Rimini alle 3 di notte. Appartenere a questo gruppo non è per tutti, solo i peggiori possono farlo.</i>" 
        : "🦦 Faina (può sembrare dolce e gentile fuori, ma dentro nasconde un'energia illimitata ed è estremamente difficile da disciplinare)<br><br><i>Chi ha detto che la bellezza si trova solo nelle principesse? Una ballerina indomabile e forse meno bella di una principessa chiusa nella sua torre?</i>"
        }`;
    }
    tastoIndietro.classList.add("btn-nascondi");
    tastoInvio.classList.add("btn-nascondi");

    contenitoreDomanda.innerText= "Risultato quiz"
    contenitoreBottoni.innerHTML=`
        <div class="risultato-box">
            <p class="disclaimer-finale">
                DISCLAIMER: La natura umana è troppo complessa per essere racchiusa in un gruppo, è impensabile classificare decine, centinaia di persone in una sola descrizione. Per tanto è chiaro che alla fine del test potresti provare una situazione di smarrimento, in quanto riconosci che hai delle cose in comune con il gruppo di appartenenza ma non ti ci rivedi appieno. 
                Non allarmarti non hai sbagliato tu e nemmeno il test, semplicemente il test indica con quale gruppo hai una maggiore affinità, non quello che sei realmente, anche gli esponenti più illustri dei vari gruppi hanno elementi di gruppi diversi. Non temere il test non mente e come ultimo consiglio accetta il risultato con pace, non mentire a te stesso..
            </p>

            <img src="${nomeImmagine}" alt="Immagine Profilo" class="img-risultato">
            
            <p>Appartieni al gruppo Vip al ${vip}%, al Bot al ${bot}%, ai Ritardati al: ${ritardati}%</p>

            <h2>${testoProfilo}</h2>


        </div>
    `;

}
tastoIndietro.addEventListener("click", () => {
    // Controlliamo che non siamo alla prima domanda, altrimenti andremmo sotto lo zero!
    if (indiceDomandaCorrente > 0) {
        
        indiceDomandaCorrente--;
        const ultimaRispostaScelta = cronologiaScelte.pop(); //toglie ultimo elemento dalla lista ricordi

        sottraiPunti(ultimaRispostaScelta)

        // Chiamiamo la funzione principale! 
        // Penserà lei a svuotare lo schermo e a stampare la domanda precedente con i suoi bottoni!
        mostraDomandaSulloSchermo();
    }
});
tastoInvio.addEventListener("click", ()=> {
    if (confirm("Vuoi procedere?")) { //funzione nativa del browser (ok annulla)
        calcolaRisultato();
    }

});
contenitoreDomanda.innerText = "Sei un maschio o una femmina?"; 

contenitoreBottoni.style.flexDirection = "row"; 
contenitoreBottoni.style.justifyContent = "center"; 

const mBottone = document.createElement("button");
mBottone.innerText = "MASCHIO";

// 🔵 STILE FORZATO IN JAVASCRIPT PER IL MASCHIO
mBottone.style.backgroundColor = "#3182ce";
mBottone.style.color = "#ffffff";
mBottone.style.border = "2px solid #2b6cb0";
mBottone.style.borderRadius = "16px";
mBottone.style.padding = "1.2rem 1.5rem";
mBottone.style.fontSize = "1.05rem";
mBottone.style.fontWeight = "bold";
mBottone.style.cursor = "pointer";
mBottone.style.width = "45%";
mBottone.style.textAlign = "center";
mBottone.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";

// Effetto movimento quando ci passi sopra col mouse (Hover)
mBottone.addEventListener("mouseenter", () => {
    mBottone.style.transform = "translateY(-4px) scale(1.03)";
    mBottone.style.backgroundColor = "#2b6cb0";
    mBottone.style.boxShadow = "0 6px 15px rgba(49, 130, 206, 0.4)";
});
mBottone.addEventListener("mouseleave", () => {
    mBottone.style.transform = "translateY(0) scale(1)";
    mBottone.style.backgroundColor = "#3182ce";
    mBottone.style.boxShadow = "none";
});

mBottone.addEventListener("click", () => {
    sessoScelto = "M";
    listaDomande = listaDomandeM;
    indiceDomandaCorrente = 0; 
    contenitoreBottoni.style.flexDirection = "column"; 
    mostraDomandaSulloSchermo();  
});


const fBottone = document.createElement("button");
fBottone.innerText = "FEMMINA";

// 🔴 STILE FORZATO IN JAVASCRIPT PER LA FEMMINA
fBottone.style.backgroundColor = "#e91e63";
fBottone.style.color = "#ffffff";
fBottone.style.border = "2px solid #c2185b";
fBottone.style.borderRadius = "16px";
fBottone.style.padding = "1.2rem 1.5rem";
fBottone.style.fontSize = "1.05rem";
fBottone.style.fontWeight = "bold";
fBottone.style.cursor = "pointer";
fBottone.style.width = "45%";
fBottone.style.textAlign = "center";
fBottone.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";

// Effetto movimento quando ci passi sopra col mouse (Hover)
fBottone.addEventListener("mouseenter", () => {
    fBottone.style.transform = "translateY(-4px) scale(1.03)";
    fBottone.style.backgroundColor = "#c2185b";
    fBottone.style.boxShadow = "0 6px 15px rgba(233, 30, 99, 0.4)";
});
fBottone.addEventListener("mouseleave", () => {
    fBottone.style.transform = "translateY(0) scale(1)";
    fBottone.style.backgroundColor = "#e91e63";
    fBottone.style.boxShadow = "none";
});

fBottone.addEventListener("click", () => {
    sessoScelto = "F";
    listaDomande = listaDomandeF; 
    indiceDomandaCorrente = 0; 
    contenitoreBottoni.style.flexDirection = "column"; 
    mostraDomandaSulloSchermo();  
});


// Configurazione del contenitore per tenerli agganciati e affiancati
contenitoreBottoni.style.display = "flex";
contenitoreBottoni.style.flexDirection = "row"; 
contenitoreBottoni.style.justifyContent = "center"; 
contenitoreBottoni.style.gap = "1.5rem";
contenitoreBottoni.style.width = "100%";

contenitoreBottoni.appendChild(mBottone);
contenitoreBottoni.appendChild(fBottone);

