/**
 * Utility functions for uploading google sheets data to firebase.
 *
 * @author Noah Iniguez
 * @todo Fix for if empty sheet and if empty spreadsheet.
 */

var secret = 'xQYU0abpTPFWM4It0nZK5lTmHP9tw2xVBBHiEwh0' // no longer active

/**
 * Create firebase URL for passed path.
 * @param {string} jsonPath - Path extension for gear-catalogue database.
 */
function getPathUrl(jsonPath) { 
  return 'https://gear-catalogue.firebaseio.com/' + jsonPath + '.json?auth=' + secret 
}

/**
 * Sync passed sheet to firebase.
 * @param {Sheet} sheet - Sheet to be uploaded.
 */
function syncSheet(sheet) {
  var [rows, columns] = [sheet.getLastRow(), sheet.getLastColumn()]
  var path = sheet.getSheetName()
  var data = sheet.getRange(1,1,rows,columns).getValues()
  var options = {
    method: 'put',
    contentType: 'application/json',
    payload: JSON.stringify(data)
  }
  var fireBaseUrl = getPathUrl(path)
  UrlFetchApp.fetch(fireBaseUrl, options)
} 

/**
 * Loops through all sheets within active spreadsheet and syncs each to firebase.
 */
function startSync() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets()
  for(var i = 0; i < sheets.length; i++) {
    var currentSheet = sheets[i];
    syncSheet(currentSheet);
  }
}
