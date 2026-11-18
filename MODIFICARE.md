# Come modificare il sito

Testi, immagini e file da scaricare stanno in `src/content/`, in file JSON. Si modificano dal pannello **Pages CMS**, senza toccare il codice.

## Primo accesso (una volta sola)

1. Apri https://app.pagescms.org e fai **Sign in with GitHub** con l'account `mkbado`.
2. Autorizza l'app Pages CMS sul repository `mkbado/dreamspace-sito` (solo quello).
3. Apri il progetto `dreamspace-sito`, ramo `main`.

## Cosa trovi nel pannello

- **Impostazioni del sito**: link per le donazioni (Ko-fi), nome ed email del footer, testi della home, introduzioni delle pagine Giochi da tavolo e Giochi di ruolo.
- **Novità**: le notizie in home (data, titolo, testo, immagine, link).
- **Giochi da tavolo**, **Giochi di ruolo: campagne**, **Giochi di ruolo: ambientazioni**: una scheda per titolo, con tutti i testi in italiano e in inglese.
- **Media**: *Immagini* (`public/img`) e *File da scaricare* (`public/files`: PDF, ZIP, EPUB).

Ogni **Salva** crea un commit su GitHub. Cloudflare ricostruisce il sito da solo: la modifica è online in un paio di minuti.

## Regole pratiche

- I file da scaricare devono pesare **meno di 25 MB** ciascuno (limite di Cloudflare).
- Le immagini: meglio WebP o JPG, larghe al massimo 1600 px. Scheda: 960×600.
- Non cambiare lo **slug** di un titolo già pubblicato: è il suo indirizzo.
- **Nascosto (bozza)** toglie un titolo dal sito senza cancellarlo. **Ordine** decide la posizione (1 = primo).
- Un file PDF lasciato vuoto appare come «presto» sul sito.

## Se aggiungi campi nuovi al codice

La configurazione del pannello (`.pages.yml`) si rigenera con `python3 tools/gen_pages.py`. Lo script controlla anche che ogni dato nei JSON sia coperto da un campo, perché il pannello, salvando, cancella i dati che non conosce.
