# Collegare il form al Google Sheet (5 minuti)

Le prenotazioni del sito finiranno automaticamente in un tuo foglio Google.

## 1. Crea il foglio
1. Vai su [sheets.new](https://sheets.new) (crea un nuovo Google Sheet).
2. Dagli un nome, es. **Prenotazioni I Love Meat**.

## 2. Incolla lo script
1. Nel foglio, menu **Estensioni → Apps Script**.
2. Cancella il codice di esempio che trovi.
3. Copia tutto il contenuto del file [`apps-script.gs`](./apps-script.gs) e incollalo.
4. Clicca l'icona **salva** (💾).

## 3. Pubblica come Web App
1. In alto a destra clicca **Distribuisci → Nuova distribuzione**.
2. Icona ingranaggio ⚙️ → scegli **App web**.
3. Imposta:
   - **Esegui come:** Me stesso (il tuo account)
   - **Chi ha accesso:** **Chiunque** *(importante: senza questo il sito non può scrivere)*
4. Clicca **Distribuisci** e autorizza l'accesso quando richiesto
   (se compare "App non verificata": Avanzate → Vai al progetto → Consenti).
5. Copia l'**URL dell'app web** — finisce con `/exec`.

## 4. Incolla l'URL nel sito
Mandami quell'URL `/exec`: lo inserisco io nel file `index.html` al posto di
`INCOLLA_QUI_URL_APPS_SCRIPT`, faccio il commit e da quel momento ogni
prenotazione compare nel foglio, nel tab **Prenotazioni**.

## Come si comporta il form
- Alla conferma, il sito invia: data, persone, orario, nome, telefono, offerta.
- Se la connessione manca, invita il cliente a chiamare (nessun dato perso).
- Finché l'URL non è inserito, il form mostra comunque la conferma a schermo.
