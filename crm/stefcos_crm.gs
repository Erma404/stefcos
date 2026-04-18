// ============================================================
// STEFCOS CRM — Script d'initialisation Google Sheets
// Coller dans : Extensions > Apps Script > Nouveau script
// Puis cliquer sur "Exécuter" la fonction setupCRM()
// ============================================================

function setupCRM() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  setupSheetCommandes(ss);
  setupSheetCoursiers(ss);
  setupSheetRelances(ss);
  setupSheetScripts(ss);
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
    'ID Commande', 'Date', 'Nom Client', 'Téléphone WhatsApp',
    'Quartier / Zone', 'Produits', 'Montant (FCFA)',
    'Paiement', 'Mode Paiement', 'Statut Commande', 'Coursier Assigné',
    'Mode Commande', 'Priorité', 'Preuve Paiement', 'Commentaire',
    'Date Livraison', 'Relance J+2', 'Relance J+7', 'Relance J+21', 'Appel Rapide'
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
  const colWidths = [110, 100, 160, 150, 150, 200, 130, 120, 160, 150, 150, 130, 100, 130, 200, 120, 110, 110, 110, 130];
  colWidths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // Validation : Paiement statut (col 8)
  const paiementRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Non payé', 'Payé', 'Partiel'], true)
    .setAllowInvalid(false).build();
  sheet.getRange(2, 8, 500).setDataValidation(paiementRule);

  // Validation : Mode Paiement (col 9)
  const modePaiementRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Avant livraison (TMoney)', 'Avant livraison (Flooz)', 'À la livraison'], true)
    .setAllowInvalid(false).build();
  sheet.getRange(2, 9, 500).setDataValidation(modePaiementRule);

  // Validation : Statut (col 10)
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
  sheet.getRange(2, 10, 500).setDataValidation(statutRule);

  // Validation : Coursier (col 11)
  const coursierRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(ss.getSheetByName('COURSIERS') ?
      ss.getSheetByName('COURSIERS').getRange('A2:A20') :
      sheet.getRange('K2:K2'), true)
    .setAllowInvalid(true).build();
  sheet.getRange(2, 11, 500).setDataValidation(coursierRule);

  // Validation : Mode commande (col 12)
  const modeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['WhatsApp', 'Appel', 'Instagram', 'Sur place'], true)
    .setAllowInvalid(false).build();
  sheet.getRange(2, 12, 500).setDataValidation(modeRule);

  // Validation : Priorité (col 13)
  const prioriteRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Normale', 'Urgente', 'VIP'], true)
    .setAllowInvalid(false).build();
  sheet.getRange(2, 13, 500).setDataValidation(prioriteRule);

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
    'À la livraison',
    '🟡 Nouvelle commande',
    '',
    'WhatsApp',
    'Normale',
    '',
    'Commande test'
  ];
  sheet.getRange(2, 1, 1, exemple.length).setValues([exemple]);
  sheet.getRange(2, 1, 1, exemple.length).setBackground('#fff3cd');

  // Validation : Relances (col 17, 18, 19)
  const relanceRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['✅ Envoyée', '❌ À envoyer', '⏭️ Ignorée'], true)
    .setAllowInvalid(false).build();
  sheet.getRange(2, 17, 500).setDataValidation(relanceRule);
  sheet.getRange(2, 18, 500).setDataValidation(relanceRule);
  sheet.getRange(2, 19, 500).setDataValidation(relanceRule);

  // Formatage colonne Date Livraison (col 16)
  sheet.getRange(2, 16, 500).setNumberFormat('dd/mm/yyyy');

  // Formule automatique J+2, J+7, J+21 (affichage date cible)
  // Ces colonnes montrent la DATE à laquelle envoyer la relance
  sheet.getRange(1, 17).setValue('Relance J+2').setBackground('#1a1a2e').setFontColor('#ffffff').setFontWeight('bold').setFontSize(11).setHorizontalAlignment('center');
  sheet.getRange(1, 18).setValue('Relance J+7').setBackground('#1a1a2e').setFontColor('#ffffff').setFontWeight('bold').setFontSize(11).setHorizontalAlignment('center');
  sheet.getRange(1, 19).setValue('Relance J+21').setBackground('#1a1a2e').setFontColor('#ffffff').setFontWeight('bold').setFontSize(11).setHorizontalAlignment('center');
  sheet.getRange(1, 20).setValue('Appel Rapide').setBackground('#1a1a2e').setFontColor('#ffffff').setFontWeight('bold').setFontSize(11).setHorizontalAlignment('center');

  // Filtre actif
  sheet.getRange(1, 1, 1, headers.length).createFilter();

  // Mise en forme conditionnelle : relances en retard (date livraison passée + pas envoyée)
  const rangeJ2 = sheet.getRange(2, 17, 500);
  const ruleRetard = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('❌ À envoyer')
    .setBackground('#fde8e8')
    .setFontColor('#c0392b')
    .setRanges([rangeJ2, sheet.getRange(2, 18, 500), sheet.getRange(2, 19, 500)])
    .build();
  const ruleOk = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('✅ Envoyée')
    .setBackground('#e8f5e9')
    .setFontColor('#27ae60')
    .setRanges([rangeJ2, sheet.getRange(2, 18, 500), sheet.getRange(2, 19, 500)])
    .build();
  sheet.setConditionalFormatRules([ruleRetard, ruleOk]);

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

function setupSheetRelances(ss) {
  let sheet = ss.getSheetByName('RELANCES DU JOUR');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('RELANCES DU JOUR', 2);

  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 200);
  sheet.setColumnWidth(5, 200);

  // Titre
  sheet.getRange('A1:E1').merge()
    .setValue('📱 RELANCES WHATSAPP DU JOUR')
    .setBackground('#25D366')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(14)
    .setHorizontalAlignment('center');
  sheet.setRowHeight(1, 45);

  // Sous-titre date
  sheet.getRange('A2:E2').merge()
    .setFormula('="Aujourd\'hui : "&TEXT(TODAY(),"dd/mm/yyyy")')
    .setBackground('#e8f5e9')
    .setFontSize(11)
    .setHorizontalAlignment('center');

  // Section J+2
  sheet.getRange('A4:E4').merge().setValue('⏰ J+2 — Suivi post-achat (à envoyer aujourd\'hui)')
    .setBackground('#fff3e0').setFontWeight('bold').setFontSize(11);

  const headersRelance = ['Client', 'Téléphone', 'Produits', 'Message à envoyer', 'Statut'];
  sheet.getRange(5, 1, 1, 5).setValues([headersRelance])
    .setBackground('#1a1a2e').setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center');

  sheet.getRange('A6').setFormula(
    '=IFERROR(FILTER(COMMANDES!C2:C1000, COMMANDES!P2:P1000=TODAY()-2, COMMANDES!Q2:Q1000="❌ À envoyer"), "Aucune relance J+2 aujourd\'hui")'
  );
  sheet.getRange('B6').setFormula(
    '=IFERROR(FILTER(COMMANDES!D2:D1000, COMMANDES!P2:P1000=TODAY()-2, COMMANDES!Q2:Q1000="❌ À envoyer"), "")'
  );
  sheet.getRange('C6').setFormula(
    '=IFERROR(FILTER(COMMANDES!F2:F1000, COMMANDES!P2:P1000=TODAY()-2, COMMANDES!Q2:Q1000="❌ À envoyer"), "")'
  );
  sheet.getRange('D6').setValue(
    'Bonjour [Prénom] 😊\n\nAvez-vous bien commencé votre routine STEFCOS ?\n\nN\'hésitez pas si vous avez des questions — je suis là pour vous accompagner vers les résultats 👌'
  ).setBackground('#fffde7').setFontSize(9).setWrap(true);
  sheet.setRowHeight(6, 60);

  // Section J+7
  sheet.getRange('A10:E10').merge().setValue('✨ J+7 — Relance résultats')
    .setBackground('#e8f4fd').setFontWeight('bold').setFontSize(11);

  sheet.getRange(11, 1, 1, 5).setValues([headersRelance])
    .setBackground('#1a1a2e').setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center');

  sheet.getRange('A12').setFormula(
    '=IFERROR(FILTER(COMMANDES!C2:C1000, COMMANDES!P2:P1000=TODAY()-7, COMMANDES!R2:R1000="❌ À envoyer"), "Aucune relance J+7 aujourd\'hui")'
  );
  sheet.getRange('B12').setFormula(
    '=IFERROR(FILTER(COMMANDES!D2:D1000, COMMANDES!P2:P1000=TODAY()-7, COMMANDES!R2:R1000="❌ À envoyer"), "")'
  );
  sheet.getRange('C12').setFormula(
    '=IFERROR(FILTER(COMMANDES!F2:F1000, COMMANDES!P2:P1000=TODAY()-7, COMMANDES!R2:R1000="❌ À envoyer"), "")'
  );
  sheet.getRange('D12').setValue(
    'Bonjour [Prénom] 😊\n\nVous devriez commencer à voir les premiers résultats de votre soin STEFCOS ✨\n\nSi vous souhaitez aller plus loin — une routine complète (savon + lait + sérum) accélère vraiment les résultats.\n\nSouhaitez-vous que je vous conseille ? 👌'
  ).setBackground('#fffde7').setFontSize(9).setWrap(true);
  sheet.setRowHeight(12, 60);

  // Section J+21
  sheet.getRange('A16:E16').merge().setValue('🔁 J+21 — Relance réachat')
    .setBackground('#fce4ec').setFontWeight('bold').setFontSize(11);

  sheet.getRange(17, 1, 1, 5).setValues([headersRelance])
    .setBackground('#1a1a2e').setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center');

  sheet.getRange('A18').setFormula(
    '=IFERROR(FILTER(COMMANDES!C2:C1000, COMMANDES!P2:P1000=TODAY()-21, COMMANDES!S2:S1000="❌ À envoyer"), "Aucune relance J+21 aujourd\'hui")'
  );
  sheet.getRange('B18').setFormula(
    '=IFERROR(FILTER(COMMANDES!D2:D1000, COMMANDES!P2:P1000=TODAY()-21, COMMANDES!S2:S1000="❌ À envoyer"), "")'
  );
  sheet.getRange('C18').setFormula(
    '=IFERROR(FILTER(COMMANDES!F2:F1000, COMMANDES!P2:P1000=TODAY()-21, COMMANDES!S2:S1000="❌ À envoyer"), "")'
  );
  sheet.getRange('D18').setValue(
    'Bonjour [Prénom] 😊\n\nPour maintenir les résultats obtenus avec vos soins STEFCOS, il est important de ne pas interrompre la routine.\n\nSouhaitez-vous que je prépare votre prochaine commande ? Je peux vous proposer un pack adapté à votre peau 👌'
  ).setBackground('#fffde7').setFontSize(9).setWrap(true);
  sheet.setRowHeight(18, 60);

  Logger.log('✅ Sheet RELANCES DU JOUR créée');
}

function setupSheetScripts(ss) {
  let sheet = ss.getSheetByName('SCRIPTS WHATSAPP');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('SCRIPTS WHATSAPP', 3);

  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 500);
  sheet.setColumnWidth(3, 200);

  // Titre
  sheet.getRange('A1:C1').merge()
    .setValue('💬 SCRIPTS WHATSAPP — STEFCOS')
    .setBackground('#1a1a2e').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(14).setHorizontalAlignment('center');
  sheet.setRowHeight(1, 45);

  sheet.getRange('A2:C2').merge()
    .setValue('Copiez le message, remplacez [Prénom] et le nom du produit, envoyez.')
    .setBackground('#f8f9fa').setFontSize(10).setHorizontalAlignment('center').setFontStyle('italic');

  const scripts = [
    // [Catégorie, Message, Quand l'utiliser]
    [
      '🟢 BIENVENUE\n(après opt-in VIP)',
      'Bonjour [Prénom] 😊\n\nMerci de rejoindre la famille STEFCOS 🙏\n\nJe suis là pour vous accompagner vers une peau éclatante, unifiée et bien hydratée.\n\nDites-moi, quel est votre besoin principal ?\n(taches, teint terne, peau sèche, éclaircissement, boutons...)\n\nJe vous prépare une routine sur-mesure 👌',
      'Dès qu\'un client rejoint la liste VIP WhatsApp'
    ],
    [
      '🟡 CONSEIL\n(valeur → conversion)',
      'Bonjour [Prénom] 😊\n\nPetite astuce du jour 👇\n\nPour traiter efficacement les taches et unifier le teint, une routine complète est essentielle :\n✔ Savon Gommant 72H (nettoie en profondeur)\n✔ Lait Éclaircissant 72H (traite les taches)\n✔ Glycéderm (hydrate et fixe les résultats)\n\nAppliquée matin et soir, cette routine donne des résultats visibles en 2 à 3 semaines 💯\n\nSouhaitez-vous que je vous prépare ce pack ? 👌',
      'Liste de diffusion 1-2x/semaine'
    ],
    [
      '🔵 PROMOTION\n(offre limitée)',
      'Bonjour [Prénom] 😊\n\nOffre spéciale cette semaine ✨\n\nNotre pack Teint Uniforme (Savon + Lait 72H + Glycéderm) est disponible avec une remise exclusive pour nos clientes WhatsApp.\n\nRésultats visibles en 2 semaines si la routine est bien suivie 💯\n\nQuantités limitées — souhaitez-vous en profiter ? 👌',
      'Lors d\'une promo ou nouveauté'
    ],
    [
      '🔴 RELANCE PANIER\n(intention d\'achat)',
      'Bonjour [Prénom] 😊\n\nJe reviens vers vous concernant [nom du produit].\n\nIl est toujours disponible et très demandé en ce moment.\n\nSouhaitez-vous que je vous le réserve ? La livraison est rapide partout à Lomé 🚴',
      'Client qui a posé une question sans commander'
    ],
    [
      '🟣 SUIVI J+2\n(post-achat)',
      'Bonjour [Prénom] 😊\n\nAvez-vous bien commencé votre routine STEFCOS ?\n\nN\'hésitez pas si vous avez des questions — je suis là pour vous accompagner vers les résultats 👌',
      'J+2 après livraison'
    ],
    [
      '🟣 RÉSULTATS J+7\n(fidélisation)',
      'Bonjour [Prénom] 😊\n\nVous devriez commencer à voir les premiers effets de votre soin STEFCOS ✨\n\nSi vous souhaitez aller plus loin — associer [produit utilisé] à notre Glycéderm accélère vraiment les résultats.\n\nSouhaitez-vous que je vous conseille ? 👌',
      'J+7 après livraison'
    ],
    [
      '🔁 RÉACHAT J+21\n(rétention)',
      'Bonjour [Prénom] 😊\n\nPour maintenir les beaux résultats obtenus avec vos soins STEFCOS, il est important de ne pas interrompre la routine.\n\nSouhaitez-vous que je prépare votre prochaine commande ? Je peux vous proposer un pack adapté à votre évolution 👌',
      'J+21 après livraison'
    ],
    [
      '🟠 RÉACTIVATION\n(client inactif)',
      'Bonjour [Prénom] 😊\n\nCela fait un moment que nous n\'avons pas eu de vos nouvelles.\n\nNous avons de nouvelles formules et des routines améliorées depuis votre dernière commande ✨\n\nSouhaitez-vous que je vous fasse une recommandation personnalisée selon l\'évolution de votre peau ? 👌',
      'Client sans commande depuis 45+ jours'
    ],
    [
      '⭐ DEMANDE AVIS\n(preuve sociale)',
      'Bonjour [Prénom] 😊\n\nNous espérons que vos soins STEFCOS vous donnent entière satisfaction ✨\n\nSi vous êtes satisfaite des résultats, un petit témoignage (photo avant/après ou message) nous aiderait énormément à faire connaître STEFCOS autour de vous 🙏\n\nEn remerciement, nous vous offrons -10% sur votre prochaine commande 💝',
      'J+14 ou J+30 pour clients satisfaits'
    ],
    [
      '👥 PARRAINAGE\n(bouche-à-oreille)',
      'Bonjour [Prénom] 😊\n\nSaviez-vous que vous pouvez bénéficier de -10% en parrainant une amie ? 💝\n\nEnvoyez-lui simplement notre contact WhatsApp.\nDès sa première commande, vous recevez toutes les deux votre remise automatiquement.\n\nSans limite — chaque parrainage compte 🙏',
      'Après J+7, pour clientes satisfaites'
    ],
  ];

  const headerRow = ['Type de message', 'Message (copier-coller)', 'Quand l\'utiliser'];
  sheet.getRange(3, 1, 1, 3).setValues([headerRow])
    .setBackground('#1a1a2e').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(11).setHorizontalAlignment('center');
  sheet.setRowHeight(3, 35);

  scripts.forEach(([type, message, quand], i) => {
    const row = 4 + i;
    sheet.getRange(row, 1).setValue(type).setBackground(i % 2 === 0 ? '#f8f9fa' : '#ffffff')
      .setFontWeight('bold').setFontSize(10).setWrap(true).setVerticalAlignment('top');
    sheet.getRange(row, 2).setValue(message).setBackground(i % 2 === 0 ? '#fffde7' : '#fff9e6')
      .setFontSize(10).setWrap(true).setVerticalAlignment('top');
    sheet.getRange(row, 3).setValue(quand).setBackground(i % 2 === 0 ? '#f8f9fa' : '#ffffff')
      .setFontSize(9).setFontStyle('italic').setWrap(true).setVerticalAlignment('top');
    sheet.setRowHeight(row, 120);
  });

  Logger.log('✅ Sheet SCRIPTS WHATSAPP créée');
}

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
  setupSheetRelances(ss);
  setupSheetDashboard(ss);
  SpreadsheetApp.getUi().alert('✅ Dashboard et Relances mis à jour !');
}

function onOpen() {
  createMenuCRM(SpreadsheetApp.getActiveSpreadsheet());
}

function createMenuCRM(ss) {
  SpreadsheetApp.getUi()
    .createMenu('🚀 STEFCOS CRM')
    .addItem('➕ Nouvelle commande', 'nouvelleCommande')
    .addSeparator()
    .addItem('📱 Relances du jour', 'allerRelances')
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
  sheet.getRange(lastRow, 10).setValue('🟡 Nouvelle commande');
  sheet.getRange(lastRow, 12).setValue('WhatsApp');
  sheet.getRange(lastRow, 13).setValue('Normale');
  sheet.getRange(lastRow, 1, 1, 15).setBackground('#fff3cd');

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

function allerRelances() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setActiveSheet(ss.getSheetByName('RELANCES DU JOUR'));
}

function actualiserDashboard() {
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert('✅ Dashboard actualisé !');
}
