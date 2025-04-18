// Überprüfe, ob der Browser Service Worker unterstützt
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registriert:', registration);
      })
      .catch((error) => {
        console.log('Fehler bei der Registrierung des Service Workers:', error);
      });
  });
}

// Array für die Historie der Seiten
let pageHistory = [];

// Seiten wechseln
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
      page.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';

  // Die Seite zur Historie hinzufügen
  if (pageHistory.length === 0 || pageHistory[pageHistory.length - 1] !== pageId) {
      pageHistory.push(pageId);
  }
}

// Zurück zur vorherigen Seite
function goBack() {
  if (pageHistory.length > 1) {
      // Entferne die aktuelle Seite von der Historie
      pageHistory.pop();
      // Zeige die vorherige Seite an
      showPage(pageHistory[pageHistory.length - 1]);
  }
}

// PDF generieren mit jsPDF
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Seite 1: 
  // Einsatzsituation
  doc.setFontSize(18);
  doc.text("EINSATZSITUATION", 10, 10);
  doc.setFontSize(12);
  doc.text("Einsatzort: " + document.getElementById("einsatzort").value, 10, 30);
  doc.text("Einsatzzeit: " + document.getElementById("einsatzzeit").value, 10, 40);
  doc.text("Wetter: " + document.getElementById("wetter").value, 10, 50);
  // Team
  doc.setFontSize(18);
  doc.text("TEAM", 10, 70);
  doc.setFontSize(12);
  doc.text("MVE: " + document.getElementById("mve").value, 10, 90);
  doc.text("MA: " + document.getElementById("ma").value, 10, 100);
  doc.text("NA: " + document.getElementById("na_team").value, 10, 110);
  doc.text("NA-MA: " + document.getElementById("na_ma_team").value, 10, 120);

  // Patient
  doc.setFontSize(18);
  doc.text("PATIENT", 10, 140);
  doc.setFontSize(12);
  doc.text("Geschlecht: " + document.getElementById("geschlecht").value, 10, 160);
  doc.text("Alter: " + document.getElementById("alter").value, 10, 170);
  doc.text("Gewicht: " + document.getElementById("gewicht").value + " kg", 10, 180);
  doc.text("Größe: " + document.getElementById("groesse").value + " cm", 10, 190);

  // Scene
  doc.setFontSize(18);
  doc.text("SCENE", 10, 210);
  doc.setFontSize(12);
  doc.text("Szene: " + (document.getElementById("scene-checkbox").checked ? "Ja" : "Nein") + " - " + document.getElementById("scene-comment").value, 10, 230);
  doc.text("Sicherheit: " + (document.getElementById("security-checkbox").checked ? "Ja" : "Nein") + " - " + document.getElementById("security-comment").value, 10, 240);
  doc.text("Situation: " + (document.getElementById("situation-checkbox").checked ? "Ja" : "Nein") + " - " + document.getElementById("situation-comment").value, 10, 250);

  // Impression
  doc.setFontSize(18);
  doc.text("IMPRESSIONS", 10, 270);
  doc.setFontSize(12);
  doc.text("Ersteindruck: " + (document.getElementById("ersteindruck-checkbox").checked ? "Ja" : "Nein") + " - " + document.getElementById("ersteindruck-comment").value, 10, 290);
  doc.text("WASB: " + (document.getElementById("wasb-checkbox").checked ? "Ja" : "Nein") + " - " + document.getElementById("wasb-comment").value, 10, 300);
  doc.text("Trauma: " + (document.getElementById("trauma-checkbox").checked ? "Ja" : "Nein") + " - " + document.getElementById("trauma-comment").value, 10, 310);
  doc.text("AVPU: " + document.getElementById("avpu-select").value, 10, 320);

  // Seite 2:
  doc.addPage();
  doc.text("X Ciritical Bleeding", 10, 10);
  doc.text("Blutung gestillt: " + (document.getElementById("x1-checkbox").checked ? "Ja" : "Nein") + " - " + document.getElementById("x1-comment").value, 10, 20);
  
  doc.text("A - Airway", 10, 40);
  doc.text("Offen und sicher: " + (document.getElementById("a1-checkbox").checked ? "Ja" : "Nein") + " - " + document.getElementById("a1-comment").value, 10, 50);
  doc.text("Gefährdet: " + (document.getElementById("a2-checkbox").checked ? "Ja" : "Nein") + " - " + document.getElementById("a2-comment").value, 10, 60);
  doc.text("Verlegt: " + (document.getElementById("a3-checkbox").checked ? "Ja" : "Nein") + " - " + document.getElementById("a3-comment").value, 10, 70);

  doc.text("B - Breathing", 10, 80);
  doc.text("Atemfrequenz: " + (document.getElementById("b1-checkbox").checked ? "Ja" : "Nein") + " - " + document.getElementById("b1-comment").value, 10, 90);
  doc.text("Tidalvolumen: " + (document.getElementById("a2-checkbox").checked ? "Ja" : "Nein") + " - " + document.getElementById("b2-comment").value, 10, 100);
  doc.text("Atemarbeit: " + (document.getElementById("b3-checkbox").checked ? "Ja" : "Nein") + " - " + document.getElementById("b3-comment").value, 10, 110);
  
  // Speichern der PDF
  doc.save('einsatzbericht.pdf');
}