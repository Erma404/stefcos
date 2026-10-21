# STEFCOS — Backend Schema

STEFCOS n'a pas de serveur propre. Le « backend » se compose de trois services :
Supabase (admin), Google Sheets via Apps Script (CRM), Formspree (contact).

**Attention : aucun script SQL ni export de schéma n'existe dans le dépôt.** Le schéma
Supabase ci-dessous est **déduit du code** (`useCommandes.ts`, `useCoursiers.ts`). Il faut
le confirmer dans le tableau de bord Supabase (Table Editor et Authentication > Policies).

## 1. Supabase

### 1.1 Table `commandes` (déduite)
| Colonne | Type | Valeurs ou remarque |
| --- | --- | --- |
| `id` | texte / uuid | fourni à l'insertion (`Omit<Commande, 'created_at'>`) |
| `nom_client` | texte | non nul |
| `telephone` | texte | nullable |
| `quartier_zone` | texte | nullable |
| `produits` | texte | résumé libre des lignes |
| `montant_fcfa` | nombre | nullable |
| `paiement` | texte | `Payé`, `Non payé`, `Partiel` |
| `statut` | texte | `Nouvelle commande`, `En préparation`, `En livraison`, `Livrée`, `Annulée`, `Problème` |
| `coursier_assigne` | texte | nullable (nom du coursier, pas de clé étrangère visible) |
| `mode_commande` | texte | `WhatsApp`, `Appel`, `Instagram`, `Sur place` ; nullable |
| `priorite` | texte | `Normale`, `Urgente` |
| `created_at` | timestamptz | défaut `now()` |

Requêtes : liste triée par `created_at` décroissant ; filtres `statut`, `paiement`, période
(`gte` sur `created_at`) ; insert, update par `id`, delete par `id`.

### 1.2 Table `coursiers` (déduite)
| Colonne | Type | Valeurs |
| --- | --- | --- |
| `id` | uuid | généré |
| `nom` | texte | tri alphabétique |
| `telephone` | texte | nullable |
| `zone` | texte | nullable |
| `disponibilite` | texte | `Disponible`, `En livraison`, `Hors service` |
| `created_at` | timestamptz | défaut `now()` |

### 1.3 Authentification
Supabase Auth, e-mail et mot de passe (`useAdminAuth` : `signIn`, `signOut`, session).
Aucun rôle applicatif visible : tout utilisateur authentifié accède à l'admin.

### 1.4 Sécurité (à vérifier)
1. RLS activée sur `commandes` et `coursiers`.
2. Insertion de `commandes` autorisée pour le public (la modale du site insère sans session) :
   politique `insert` limitée, sans `select` ni `update` ni `delete` pour `anon`.
3. Lecture, modification, suppression réservées aux utilisateurs authentifiés.
4. Création de comptes admin désactivée (inscription fermée).
5. Pas de donnée sensible exposée par la clé anon.

## 2. Google Sheets (CRM)

Initialisation par `setupCRM()` dans `crm/stefcos_crm.gs`, menu « CRM » ajouté à l'ouverture.

### COMMANDES (20 colonnes)
ID Commande, Date, Nom Client, Téléphone WhatsApp, Quartier / Zone, Produits, Montant (FCFA),
Paiement, Mode Paiement, Statut Commande, Coursier Assigné, Mode Commande, Priorité,
Preuve Paiement, Commentaire, Date Livraison, Relance J+2, Relance J+7, Relance J+21, Appel Rapide.

Listes déroulantes : Paiement (Non payé, Payé, Partiel) ; Mode Paiement (Avant livraison
TMoney, Avant livraison Flooz, À la livraison) ; Statut (Nouvelle commande, En attente
paiement, Payé, En livraison, Livré, Problème) ; Mode commande ; Priorité (Normale, Urgente, VIP).

### Autres feuilles
COURSIERS (liste de référence pour la colonne coursier), RELANCES DU JOUR (calcul des relances
à faire), SCRIPTS WHATSAPP (10 scripts), DASHBOARD (KPI, `fixDashboard` corrige les critères
à base d'emoji par des jokers).

### Réception depuis le site
Une Web App Apps Script reçoit un POST `text/plain` (JSON) avec prénom, téléphone, quartier,
produits, montant, mode de paiement. Le code du récepteur `doPost` n'est pas dans `stefcos_crm.gs` ;
il se trouve dans `~/stefcos-website/google-apps-script.js` ou dans le projet Apps Script
(à confirmer).

## 3. Formspree

Formulaire de contact : un identifiant de formulaire, e-mail à la marque avec copie interne.
Pas de stockage côté STEFCOS.

## 4. Catalogue (données versionnées dans le code)

`src/data/products.ts`, 10 produits :

| Id | Nom | Catégorie | Tailles et prix (FCFA) | Badge |
| --- | --- | --- | --- | --- |
| 72heures | 72 Heures, lait éclaircissant | Soins Corps | 300 ml 1 500 ; 500 ml 2 500 | Bestseller |
| sublim-eclat | Sublim Éclat, lotion huile de carotte | Soins Corps | 300 ml 1 500 ; 500 ml 2 500 | |
| bio-activ | Bio Activ, traitement anti-taches | Traitements | 300 ml 1 500 ; 500 ml 2 500 | Nouveau |
| sido-clair | Sido Clair, lait à l'avocat | Soins Corps | 1 500 | |
| savon-gommant | Savon Gommant | Savons | 125 g 1 000 | |
| savon-eclaircissant-72h | Savon Éclaircissant 72H | Savons | 125 g 1 000 | Bestseller |
| glycederm | Glycederm, savon de Marseille | Savons | 175 g 700 | |
| savon-glycederm-enfant | Savon Glycederm Enfant | Enfants | 175 g 1 000 | Nouveauté |
| lait-glycederm-enfant | Lait Glycederm Enfant | Enfants | 250 ml 1 000 ; 750 ml 2 000 | |
| dovena | Dovena, shampooing nutritif mangue | Soins Cheveux | 500 ml 1 500 ; 1 L 2 500 | Nouveau |

Modèle `Product` : `id`, `name`, `subtitle`, `price` (départ), `variants[]`, `crossSell[]`,
`image`, `cardImage`, `gallery[]`, `category`, `badge?`, `description`.
Panier : `CartItem { product, quantity, selectedVariant?, cartKey }`.

`src/data/articles.ts` : 20 articles (`slug`, `title`, contenu, sections et FAQ pour les plus
récents). `src/data/testimonials.ts` : témoignages de l'accueil.

## 5. Recommandation

Versionner le schéma dans `supabase/01-structure.sql` (tables, contraintes, politiques RLS),
sur le modèle d'autres projets de la famille, pour rendre l'admin reproductible.
