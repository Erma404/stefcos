// ============================================================
// STEFCOS CRM — Script d'initialisation Google Sheets
// Coller dans : Extensions > Apps Script > Nouveau script
// Puis cliquer sur "Exécuter" la fonction setupCRM()
// ============================================================

function setupCRM() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  setupSheetCommandes(ss);
  setupSheetCoursiers(ss);
  setupSheetDashboard(ss);
  createMenuCRM(ss);

  SpreadsheetApp.getUi().alert('✅ CRM STEFCOS initialisé avec succès !');
}

// ============================================================
// SHEET 1 : COMMANDES
// ============================================================

function setupSheetCommandes(ss) {
  let sheet = ss.getSheetByName('COMMANDES');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('COMMANDES', 0);

  // En-têtes
  const headers = [
    'ID Commande', 'Date', 'Nom Client', 'Téléphone',
    'Quartier / Zone', 'Produits', 'Montant (FCFA)',
    'Paiement', 'Statut Commande', 'Coursier Assigné',
    'Mode Commande', 'Priorité', 'Preuve Paiement', 'Commentaire'
  ];

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground('#1a1a2e');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment('center');

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 40);

  // Largeurs colonnes
  const colWidths = [110, 100, 160, 130, 150, 200, 130, 120, 150, 150, 130, 100, 130, 200];
  colWidths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // Validation : Paiement (col 8)
  const paiementRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Non payé', 'Payé', 'Partiel'], true)
    .setAllowInvalid(false).build();
  sheet.getRange(2, 8, 500).setDataValidation(paiementRule);

  // Validation : Statut (col 9)
  const statutRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      '🟡 Nouvelle commande',
      '🟠 En attente paiement',
      '🔵 Payé',
      '🟣 En livraison',
      '🟢 Livré',
      '🔴 Problème'
    ], true)
    .setAllowInvalid(false).build();
  sheet.getRange(2, 9, 500).setDataValidation(statutRule);

  // Validation : Coursier (col 10)
  const coursierRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(ss.getSheetByName('COURSIERS') ?
      ss.getSheetByName('COURSIERS').getRange('A2:A20') :
      sheet.getRange('J2:J2'), true)
    .setAllowInvalid(true).build();
  sheet.getRange(2, 10, 500).setDataValidation(coursierRule);

  // Validation : Mode commande (col 11)
  const modeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['WhatsApp', 'Appel', 'Instagram', 'Sur place'], true)
    .setAllowInvalid(false).build();
  sheet.getRange(2, 11, 500).setDataValidation(modeRule);

  // Validation : Priorité (col 12)
  const prioriteRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Normale', 'Urgente', 'VIP'], true)
    .setAllowInvalid(false).build();
  sheet.getRange(2, 12, 500).setDataValidation(prioriteRule);

  // Mise en forme alternée
  sheet.getRange(2, 1, 500, headers.length).setBackground('#f8f9fa');

  // Formatage colonne Date
  sheet.getRange(2, 2, 500).setNumberFormat('dd/mm/yyyy');

  // Formatage colonne Montant
  sheet.getRange(2, 7, 500).setNumberFormat('#,##0 "FCFA"');

  // Ligne exemple
  const exemple = [
    'STF-001',
    new Date(),
    'Exemple Client',
    '+228 90 00 00 00',
    'Lomé Centre',
    'Glycéderm 500ml x2',
    12000,
    'Non payé',
    '🟡 Nouvelle commande',
    '',
    'WhatsApp',
    'Normale',
    '',
    'Commande test'
  ];
  sheet.getRange(2, 1, 1, exemple.length).setValues([exemple]);
  sheet.getRange(2, 1, 1, exemple.length).setBackground('#fff3cd');

  // Filtre actif
  sheet.getRange(1, 1, 1, headers.length).createFilter();

  Logger.log('✅ Sheet COMMANDES créée');
}

// ============================================================
// SHEET 2 : COURSIERS
// ============================================================

function setupSheetCoursiers(ss) {
  let sheet = ss.getSheetByName('COURSIERS');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('COURSIERS', 1);

  const headers = ['Nom', 'Téléphone', 'Zone', 'Disponibilité', 'Nb livraisons'];
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground('#1a1a2e');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment('center');
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 40);

  const colWidths = [160, 150, 180, 140, 130];
  colWidths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // Validation : Disponibilité
  const dispoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Disponible', 'En livraison', 'Indisponible'], true)
    .setAllowInvalid(false).build();
  sheet.getRange(2, 4, 20).setDataValidation(dispoRule);

  // Exemples coursiers
  const coursiers = [
    ['Koffi', '+228 91 00 00 01', 'Lomé Centre', 'Disponible', 0],
    ['Aziz', '+228 91 00 00 02', 'Agoè', 'Disponible', 0],
    ['Mensah', '+228 91 00 00 03', 'Bè', 'Disponible', 0],
    ['Kodjo', '+228 91 00 00 04', 'Adidogomé', 'Disponible', 0],
    ['Afi', '+228 91 00 00 05', 'Tokoin', 'Disponible', 0],
    ['Sénam', '+228 91 00 00 06', 'Baguida', 'Disponible', 0],
    ['Edem', '+228 91 00 00 07', 'Légos Beach', 'Disponible', 0],
  ];
  sheet.getRange(2, 1, coursiers.length, 5).setValues(coursiers);
  sheet.getRange(2, 1, coursiers.length, 5).setBackground('#f8f9fa');

  Logger.log('✅ Sheet COURSIERS créée');
}

// ============================================================
// SHEET 3 : DASHBOARD KPI
// ============================================================

function setupSheetDashboard(ss) {
  let sheet = ss.getSheetByName('DASHBOARD');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('DASHBOARD', 2);

  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidth(3, 180);

  // Titre
  sheet.getRange('A1:C1').merge()
    .setValue('📊 DASHBOARD STEFCOS CRM')
    .setBackground('#1a1a2e')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(16)
    .setHorizontalAlignment('center');
  sheet.setRowHeight(1, 50);

  // Section KPI du jour
  sheet.getRange('A3').setValue('📅 AUJOURD\'HUI').setFontWeight('bold').setFontSize(12).setBackground('#e8f4fd');
  sheet.getRange('A3:C3').merge().setBackground('#e8f4fd');

  const kpiLabels = [
    'Nouvelles commandes', 'En attente paiement', 'Payées aujourd\'hui',
    'En livraison', 'Livrées aujourd\'hui', 'Problèmes'
  ];
  const kpiFormulas = [
    '=COUNTIFS(COMMANDES!B:B,TODAY(),COMMANDES!I:I,"*Nouvelle commande*")',
    '=COUNTIFS(COMMANDES!B:B,TODAY(),COMMANDES!I:I,"*attente paiement*")',
    '=COUNTIFS(COMMANDES!B:B,TODAY(),COMMANDES!I:I,"*Payé*")',
    '=COUNTIF(COMMANDES!I:I,"*En livraison*")',
    '=COUNTIFS(COMMANDES!B:B,TODAY(),COMMANDES!I:I,"*Livré*")',
    '=COUNTIF(COMMANDES!I:I,"*Problème*")',
  ];
  kpiLabels.forEach((label, i) => {
    sheet.getRange(4 + i, 1).setValue(label).setBackground('#f8f9fa');
    sheet.getRange(4 + i, 2).setFormula(kpiFormulas[i])
      .setBackground('#ffffff').setFontWeight('bold').setFontSize(14).setHorizontalAlignment('center');
    sheet.getRange(4 + i, 3).setValue(i === 5 ? '⚠️' : '');
  });

  // Section chiffre d'affaires
  sheet.getRange('A11').setValue('💰 CHIFFRE D\'AFFAIRES').setFontWeight('bold').setFontSize(12).setBackground('#e8f5e9');
  sheet.getRange('A11:C11').merge().setBackground('#e8f5e9');

  const caLabels = ['CA Aujourd\'hui (Payé)', 'CA Ce mois', 'CA Total', 'Panier moyen'];
  const caFormulas = [
    '=SUMPRODUCT((COMMANDES!B2:B1000=TODAY())*(COMMANDES!H2:H1000="Payé")*ISNUMBER(COMMANDES!G2:G1000)*COMMANDES!G2:G1000)',
    '=SUMPRODUCT((MONTH(COMMANDES!B2:B1000)=MONTH(TODAY()))*(YEAR(COMMANDES!B2:B1000)=YEAR(TODAY()))*(COMMANDES!H2:H1000="Payé")*ISNUMBER(COMMANDES!G2:G1000)*COMMANDES!G2:G1000)',
    '=SUMIF(COMMANDES!H2:H1000,"Payé",COMMANDES!G2:G1000)',
    '=IFERROR(SUMIF(COMMANDES!H2:H1000,"Payé",COMMANDES!G2:G1000)/COUNTIF(COMMANDES!H2:H1000,"Payé"),0)',
  ];
  caLabels.forEach((label, i) => {
    sheet.getRange(12 + i, 1).setValue(label).setBackground('#f8f9fa');
    sheet.getRange(12 + i, 2).setFormula(caFormulas[i])
      .setBackground('#ffffff').setFontWeight('bold').setFontSize(13)
      .setHorizontalAlignment('center').setNumberFormat('#,##0');
    sheet.getRange(12 + i, 3).setValue('FCFA').setHorizontalAlignment('left');
  });

  // Section coursiers
  sheet.getRange('A17').setValue('🚴 COURSIERS — Livraisons du jour').setFontWeight('bold').setFontSize(12).setBackground('#fff3e0');
  sheet.getRange('A17:C17').merge().setBackground('#fff3e0');

  const coursierNames = ['Koffi', 'Aziz', 'Mensah', 'Kodjo', 'Afi', 'Sénam', 'Edem'];
  coursierNames.forEach((nom, i) => {
    sheet.getRange(18 + i, 1).setValue(nom);
    sheet.getRange(18 + i, 2).setFormula(
      `=COUNTIFS(COMMANDES!J:J,"${nom}",COMMANDES!B:B,TODAY(),COMMANDES!I:I,"*Livré*")`
    ).setHorizontalAlignment('center').setFontWeight('bold');
    sheet.getRange(18 + i, 3).setValue('livraisons');
  });
  sheet.getRange(18, 1, coursierNames.length, 1).setBackground('#f8f9fa');
  sheet.getRange(18, 2, coursierNames.length, 1).setBackground('#ffffff').setFontSize(13);

  Logger.log('✅ Sheet DASHBOARD créée');
}

// ============================================================
// MENU PERSONNALISÉ
// ============================================================

function fixDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  setupSheetDashboard(ss);
  SpreadsheetApp.getUi().alert('✅ Dashboard corrigé !');
}

function onOpen() {
  createMenuCRM(SpreadsheetApp.getActiveSpreadsheet());
}

function createMenuCRM(ss) {
  SpreadsheetApp.getUi()
    .createMenu('🚀 STEFCOS CRM')
    .addItem('➕ Nouvelle commande', 'nouvelleCommande')
    .addSeparator()
    .addItem('📋 Voir — À traiter', 'vueATraiter')
    .addItem('🚴 Voir — En livraison', 'vueEnLivraison')
    .addItem('🔴 Voir — Problèmes', 'vueProblemes')
    .addSeparator()
    .addItem('🔄 Actualiser Dashboard', 'actualiserDashboard')
    .addItem('📊 Aller au Dashboard', 'allerDashboard')
    .addToUi();
}

function nouvelleCommande() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('COMMANDES');
  ss.setActiveSheet(sheet);

  const lastRow = sheet.getLastRow() + 1;
  const num = lastRow - 1;
  const id = 'STF-' + String(num).padStart(3, '0');

  sheet.getRange(lastRow, 1).setValue(id);
  sheet.getRange(lastRow, 2).setValue(new Date()).setNumberFormat('dd/mm/yyyy');
  sheet.getRange(lastRow, 9).setValue('🟡 Nouvelle commande');
  sheet.getRange(lastRow, 11).setValue('WhatsApp');
  sheet.getRange(lastRow, 12).setValue('Normale');
  sheet.getRange(lastRow, 1, 1, 14).setBackground('#fff3cd');

  sheet.setActiveRange(sheet.getRange(lastRow, 3));
  SpreadsheetApp.getUi().alert(`✅ Ligne ${id} créée — Complétez le nom du client.`);
}

function vueATraiter() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('COMMANDES');
  ss.setActiveSheet(sheet);
  SpreadsheetApp.getUi().alert('💡 Filtrez la colonne "Statut Commande" sur :\n• 🟡 Nouvelle commande\n• 🟠 En attente paiement');
}

function vueEnLivraison() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('COMMANDES');
  ss.setActiveSheet(sheet);
  SpreadsheetApp.getUi().alert('💡 Filtrez la colonne "Statut Commande" sur :\n• 🟣 En livraison');
}

function vueProblemes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('COMMANDES');
  ss.setActiveSheet(sheet);
  SpreadsheetApp.getUi().alert('💡 Filtrez la colonne "Statut Commande" sur :\n• 🔴 Problème');
}

function allerDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setActiveSheet(ss.getSheetByName('DASHBOARD'));
}

function actualiserDashboard() {
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert('✅ Dashboard actualisé !');
}
