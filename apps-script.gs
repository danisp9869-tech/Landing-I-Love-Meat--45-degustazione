/**
 * I Love Meat — Prenotazioni CENA → Google Sheet
 * Incolla questo codice in Extensions → Apps Script, salva,
 * poi pubblicalo come Web App (vedi google-sheet-setup.md).
 */

// ID del foglio della CENA (scrive sempre qui, senza ambiguità)
var SHEET_ID = '1HzGRC4Jp5lSoJVxDIMrL-msBMYKkljgjkw9CsjdDg8w';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // evita scritture sovrapposte
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var p = e.parameter || {};

    // Tutte le prenotazioni di questa landing in un'unica lista
    var sheet = ss.getSheetByName('Prenotazioni') || ss.insertSheet('Prenotazioni');

    // Intestazioni alla prima riga (solo se la scheda è vuota)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Data', 'Ora', 'Persone', 'Nome', 'Telefono', 'Email', 'Richieste', 'Privacy', 'Creata']);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      p.data || '',
      p.ora || '',
      p.persone || '',
      p.nome || '',
      p.telefono || '',
      p.email || '',
      p.richieste || '',
      p.privacy || '',
      new Date()
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Utile per verificare che l'app sia pubblicata: apri l'URL nel browser.
function doGet() {
  return ContentService.createTextOutput('I Love Meat — endpoint prenotazioni CENA attivo');
}
