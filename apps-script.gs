/**
 * I Love Meat — Prenotazioni → Google Sheet
 * Incolla questo codice in Extensions → Apps Script del tuo foglio Google,
 * poi pubblicalo come Web App (vedi google-sheet-setup.md).
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // evita scritture sovrapposte
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Prenotazioni') || ss.insertSheet('Prenotazioni');

    // Intestazioni alla prima riga (solo se il foglio è vuoto)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Ricevuta il', 'Data', 'Persone', 'Orario', 'Nome', 'Telefono', 'Offerta']);
      sheet.setFrozenRows(1);
    }

    var p = e.parameter || {};
    sheet.appendRow([
      new Date(),
      p.data || '',
      p.persone || '',
      p.orario || '',
      p.nome || '',
      p.telefono || '',
      p.offerta || ''
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
  return ContentService.createTextOutput('I Love Meat — endpoint prenotazioni attivo');
}
