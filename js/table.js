//File written by Chris

var tableData = [];

function createPremadeTable(lang){
  let table = document.getElementById("myTable");
  if(lang=="de"){
    var leitfragen = ["Was sollen die Schüler*innen wissen/können?", 
    "Was gibt es darüber hinaus inhaltlich noch zu wissen? (Inhalte, die S*S jetzt (noch) nicht brauchen)", 
    "Warum ist es wichtig, dass Schüler*innen genau das lernen?", 
    "Welche Vorgaben werden im Rahmenlehrplan/ Schulinternen Curriculum gemacht?", 
    "Welches Vorwissen besitzen die Schüler*innen zu diesem Thema?", 
    "Welche (Fehl-) Vorstellungen gibt es zu dieser Idee?", 
    "Welche Schwierigkeiten oder Einschränkungen im Zusammenhang mit der Vermittlung der Idee können auftreten?", 
    "Durch welche Faktoren (z.B. Klassenklima, Lernumgebung, etc.) kann die Vermittlung des Inhalts noch beeinflusst werden? (positiv und negativ)", 
    "Wie soll der Inhalt vermittelt werden? (z.B. Methoden, Vorgehen, Sozialformen, Experimente, Lernumgebung, etc.)", 
    "Warum soll der Inhalt auf diese Weise vermittelt werden?", 
    "Wie kann überprüft werden, was die Schüler*innen verstanden haben und wo es noch Verständnisschwierigkeiten gibt? (inkl. Bandbreite an möglichen Antworten)"];
  }
  if(lang=="eng"){
  var leitfragen = ["What should the students know/be able to do?", 
  "What else is there to know about the content? (Content that S*S doesn't need (yet))", 
  "Why is it important that students learn exactly this?", 
  "What requirements are set in the framework curriculum/internal school curriculum?", 
  "What prior knowledge do the students have on this topic?", 
  "What (mis)conceptions are there about this idea?", 
  "What difficulties or limitations may arise in connection with communicating the idea?", 
  "What factors (e.g. class climate, learning environment, etc.) can influence the conveyance of the content? (positive and negative)", 
  "How should the content be conveyed? (e.g. methods, procedures, social forms, experiments, learning environment, etc.)", 
  "Why should the content be conveyed this way?", 
  "How can we check what the students have understood and where there are still difficulties in understanding? (including range of possible answers)"];
  } 
  let columns = 3;

  // Clear existing table
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  // Create table header
  let rowData = [];
  let headerRow = document.createElement("tr");
  let th = document.createElement("th");
  th.textContent = "Leitfragen ↴ | Big Ideas → ";
  rowData.push(th.textContent);
  headerRow.appendChild(th);
  for (let i = 1; i < columns; i++) {
    let th = document.createElement("th");
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "header-input");
    input.setAttribute("placeholder", "Big Idea " + i);
    //two lines added by Linus
    input.setAttribute("id", i);
    input.addEventListener("change", updateValue);

    th.appendChild(input);
    headerRow.appendChild(th);
    rowData.push("");
  }
  table.appendChild(headerRow);
  tableData.push(rowData)

  // Create table rows
  for (let i = 0; i < leitfragen.length; i++) {
    let rowData = [];
    let row = document.createElement("tr");
    let cell = document.createElement("td");
      cell.textContent = leitfragen[i];
      rowData.push(cell.textContent);
      row.appendChild(cell);
    for (let j = 1; j < columns; j++) {
      let cell = document.createElement("td");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("class", "editable-cell");
        cell.addEventListener("input", updateCell);
      rowData.push("");
      row.appendChild(cell);
    }
    table.appendChild(row);
    tableData.push(rowData);
  }

}



function updateValue(e){
  console.log(e.target.id)
  console.log(e.target.value)

  tableData[0][e.target.id] = e.target.value
}


function updateCell(event) {
  let rowIndex = event.target.parentNode.rowIndex;
  let columnIndex = event.target.cellIndex;
  let value = event.target.textContent.trim();
  updateData(rowIndex, columnIndex, value);
}

function updateData(row, col, value) {
  tableData[row][col] = value;
}

function updateRow(row) {
  let table = document.getElementById("myTable");
  let rowData = tableData[row];
  let cells = table.rows[row + 1].cells;
  for (let i = 0; i < rowData.length; i++) {
    let value = cells[i].textContent.trim();
    rowData[i] = value;
  }
}

function deleteRow() {
  let deletionInput = document.getElementById("deletionInput");
  let row = parseInt(deletionInput.value);
  let table = document.getElementById("myTable");

  if (isNaN(row)){
    window.alert("Bitte gib eine Nummer größer als 0 und kleiner gleich " + (tableData.length-1) );
    return;
  } else if (!tableData[0]){
    window.alert("Die komplette Tabelle wurde gelöscht. Bitte laden Sie die Seite neu.");
    return;
  } else if (row < 0 || row > tableData.length-1){
    window.alert("Bitte gib eine Nummer größer als 0 und kleiner gleich " + (tableData.length-1) );
    return;
  }

  table.deleteRow(row);
  tableData.splice(row, 1);
}

function deleteColumn() {
  let table = document.getElementById("myTable");
  let rowCount = table.rows.length;
  let deletionInput = document.getElementById("column-number");
  let col = parseInt(deletionInput.value);
  console.log(col);
  if (isNaN(col)){
    window.alert("Bitte gib eine Nummer größer als 0 und kleiner gleich " + (tableData[0].length-1) );
    return;
  } else if (!tableData[0]){
    window.alert("Die komplette Tabelle wurde gelöscht. Bitte laden Sie die Seite neu.");
    return;
  } else if (col < 0 || col > tableData[0].length-1){
    window.alert("Bitte gib eine Nummer größer als 0 und kleiner gleich " + (tableData[0].length-1) );
    return;
  }
  
  for (let i = 0; i < rowCount; i++) {
    tableData[i].splice(col, 1);
    table.rows[i].deleteCell(col);
  }
  if (tableData[0].length == 0){
    tableData.splice(0, tableData.length);
  }
}

function addRow() {
  let table = document.getElementById("myTable");
  let columns = tableData[0].length;
  let rowData = [];
  let row = document.createElement("tr");
  for (let j = 0; j < columns; j++) {
    let cell = document.createElement("td");
    cell.setAttribute("contenteditable", "true");
    cell.setAttribute("class", "editable-cell");
    cell.addEventListener("input", updateCell);
    rowData.push("");
    row.appendChild(cell);
  }
  table.appendChild(row);
  tableData.push(rowData);
}

function addColumn() {
  let table = document.getElementById("myTable");
  let rows = table.rows.length;
  let columns = tableData[0].length;
  rowData = [];

  // Create table header
  let th = document.createElement("th");
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "header-input");
  input.setAttribute("placeholder", "New Column");
  //two lines added by Linus
  input.setAttribute("id", columns);
  input.addEventListener("change", updateValue);

  th.appendChild(input);

  tableData[0].push("");
  table.rows[0].appendChild(th);
  
  // Create Editable cells in columns
  for (let i = 1; i < rows; i++) {
    let row = table.rows[i];

    let cell = document.createElement("td");
    cell.setAttribute("contenteditable", "true");
    cell.setAttribute("class", "editable-cell");
    cell.addEventListener("input", updateCell);

    tableData[i].push("");
    row.appendChild(cell);
  }

}

function displayData() {
  console.log("Tabellen Daten: ------------------------------------------------------------");
  for (let i = 0; i < tableData.length; i++){
    for (let j = 0; j < tableData[i].length; j++){
      console.log(tableData[i][j]);
    }
  }
  console.log(tableData);
  
}


function workInProgress() {
  const popup = document.getElementById("popupWorkInProgress");
  popup.style.visibility = 'visible';
  setTimeout(hide, 2000, popup);
}

function hide(popup){
  popup.style.visibility = 'hidden';
}
    