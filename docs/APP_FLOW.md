# STEFCOS — App Flow

## 1. Plan du site

```
/                     Accueil
/boutique             Boutique (filtre ?category=Soins Corps | Traitements | Savons | Enfants | Soins Cheveux)
/boutique/:id         Fiche produit (10 produits)
/philosophie          Histoire et valeurs de la marque
/journal              Liste des articles (20)
/journal/:slug        Article
/contact              Formulaire de contact
/admin                Connexion équipe
/admin/dashboard      Tableau de bord (protégé)
*                     404
```

Éléments transverses : en-tête et pied de page (`Layout`), panier en tiroir (`CartDrawer`),
bouton WhatsApp flottant, barre d'intention de sortie, bannière de rebond.

## 2. Parcours client

### 2.1 Découverte et achat
1. Arrivée par Google, WhatsApp ou réseau social sur l'accueil, la boutique ou un article.
2. Accueil : hero (Découvrir mène à Philosophie, Commander mène à Boutique), bestsellers,
   témoignages, catégories, « Comment commander ? », conseils, section VIP.
3. Boutique : filtrage par catégorie, cartes produit avec badge et prix de départ.
4. Fiche produit : galerie, choix de taille, description (actifs, bénéfices, conseils, résultats),
   produits complémentaires (cross-sell), bouton Ajouter.
5. Panier (tiroir) : quantités, remises automatiques, total, bouton Commander.
6. Modale de commande :
   - prénom, téléphone / WhatsApp, quartier (liste de zones de Lomé ou « Autre zone »)
   - mode de paiement : à la livraison (espèces ou TMoney) ou avant livraison (TMoney / Flooz)
   - erreurs claires si un champ obligatoire manque
7. Validation : la commande est enregistrée (Sheets et Supabase) puis WhatsApp s'ouvre avec
   le message prérempli.
8. La cliente envoie le message, l'équipe confirme, la livraison est organisée.

Variante achat direct : sur la fiche produit, commande d'un seul produit via la même modale.

### 2.2 Conseil personnalisé
Boutons « conseils » : ouvrent WhatsApp avec un message de demande de conseil.

### 2.3 Liste VIP et parrainage
Bouton d'adhésion : message WhatsApp pour rejoindre la liste VIP (-10 % sur la prochaine
commande) ou parrainer une amie (-10 % chacune). Le popup VIP automatique (8 s) est
**désactivé** depuis le 24/04 ; la section VIP de l'accueil reste.

### 2.4 Lecture du journal
Liste, article avec sections et FAQ, articles liés (illustrations de remplacement), appel à
l'achat en fin d'article.

### 2.5 Contact
Formulaire Formspree (e-mail à la marque avec copie interne), ou WhatsApp.

### 2.6 Intention de sortie
Après 3 minutes sur la page, souris quittant le haut de la fenêtre ou inactivité : barre
latérale proposant des produits à ajouter au panier. Fermable, non répétée.

## 3. Parcours équipe (admin)

1. `/admin` : saisie e-mail et mot de passe (Supabase Auth). Échec : message d'erreur.
2. `/admin/dashboard` : trois onglets.
   - **Tableau de bord** : statistiques sur les commandes et coursiers.
   - **Commandes** : liste triée par date, filtres statut / paiement / période, création,
     modification (statut, paiement, coursier, priorité, mode), suppression.
   - **Coursiers** : liste, création, modification (zone, disponibilité), suppression.
3. Déconnexion : retour à `/admin`.

Statuts de commande (admin) : Nouvelle commande, En préparation, En livraison, Livrée,
Annulée, Problème. Paiement : Payé, Non payé, Partiel. Priorité : Normale, Urgente.
Mode : WhatsApp, Appel, Instagram, Sur place.

## 4. Parcours CRM Google Sheets

1. Menu CRM : nouvelle commande, vues « À traiter », « En livraison », « Problèmes ».
2. Feuille COMMANDES : validations de liste (paiement, mode, statut, coursier, priorité).
3. « Relances du jour » : liste générée par les colonnes J+2 / J+7 / J+21.
4. « Scripts WhatsApp » : 10 scripts du tunnel de vente à copier.
5. DASHBOARD : indicateurs (actualisation par menu).

Statuts du CRM : Nouvelle commande, En attente paiement, Payé, En livraison, Livré, Problème
(vocabulaire légèrement différent de l'admin Supabase).

## 5. États particuliers

| Situation | Comportement |
| --- | --- |
| Route inconnue | Page 404 |
| Accès direct à une route profonde | Page 404.html redirige vers la SPA, `index.html` pré-copié |
| Supabase indisponible (admin) | Listes vides, pas de plantage |
| Panier vide | Message dans le tiroir, bouton Commander absent |
