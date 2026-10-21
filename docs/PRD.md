# STEFCOS — Product Requirements Document

Statut : site en ligne sur `stefcos.com`, utilisé pour vendre via WhatsApp. Version : 2026-10-21.

## 1. Problème

STEFCOS vend des cosmétiques pensés pour les peaux noires et mixtes à Lomé. Les clientes
achètent par WhatsApp ; sans site, la marque manque de crédibilité, de visibilité (SEO) et
d'organisation des commandes (suivi, livraison, relances).

## 2. Utilisateurs

| Persona | Besoin |
| --- | --- |
| Cliente à Lomé | Découvrir les produits, comprendre leurs bénéfices, commander simplement, payer à la livraison ou par TMoney / Flooz |
| Cliente en recherche d'information | Conseils fiables (hyperpigmentation, grossesse, peau grasse), authenticité des produits |
| Équipe STEFCOS (secrétaire, gérant) | Recevoir les commandes sur WhatsApp, les suivre, assigner un coursier, relancer |
| Coursier | Savoir quoi livrer et où (via l'admin et le CRM) |

## 3. Objectifs

1. Convertir les visites en conversations WhatsApp qualifiées (prénom, zone, paiement, téléphone).
2. Être trouvé sur Google et par les moteurs génératifs (SEO local Lomé, GEO).
3. Centraliser les commandes et la logistique de livraison.
4. Fidéliser : liste VIP, parrainage, relances automatiques au CRM.

Hors objectifs : paiement en ligne par carte, comptes clients, stock en temps réel.

## 4. Fonctionnalités

Statut : Livré / Désactivé / Partiel.

### 4.1 Site vitrine (Livré)
Accueil (hero, bestsellers, témoignages, catégories, « Comment commander ? », journal, VIP),
Boutique avec filtre de catégorie, fiche produit (galerie, tailles, description, cross-sell),
Philosophie, Journal, Contact.

### 4.2 Catalogue (Livré)
10 produits répartis en 5 catégories : Soins Corps, Traitements, Savons, Enfants, Soins Cheveux. Variantes de taille et de prix. Badges (Bestseller, Nouveau, Nouveauté).

### 4.3 Panier et commande WhatsApp (Livré)
Panier multi-tailles, remises par quantité (-5 % dès 2, -10 % dès 3 par ligne), modale qui
collecte prénom, téléphone, quartier (liste de zones de Lomé) et mode de paiement
(à la livraison, ou avant livraison par TMoney / Flooz). Génère un message WhatsApp avec un
numéro de commande `STC-AAAA-NNNN`.

### 4.4 Enregistrement des commandes (Livré)
À l'envoi, la commande est écrite dans Google Sheets (CRM) et dans Supabase (admin).

### 4.5 Administration (Livré)
Connexion e-mail / mot de passe (Supabase Auth). Tableau de bord (statistiques), onglet
Commandes (filtres statut, paiement, période ; création, modification, suppression),
onglet Coursiers (nom, téléphone, zone, disponibilité).

### 4.6 CRM Google Sheets (Livré)
Feuilles COMMANDES, COURSIERS, RELANCES DU JOUR, SCRIPTS WHATSAPP, DASHBOARD ; relances
J+2 / J+7 / J+21 ; menu personnalisé ; 10 scripts de vente.

### 4.7 Journal et SEO (Livré)
20 articles, JSON-LD `BlogPosting` et `FAQPage` sur les 6 derniers, sitemap, meta dynamiques,
canonical `www.stefcos.com`, vérification Search Console.

### 4.8 Fidélisation (Partiel)
Liste VIP et parrainage (messages WhatsApp prêts). **Popup VIP désactivé** depuis le 24/04.
Barre latérale d'intention de sortie et bannière de rebond après 3 minutes.

### 4.9 Contact (Livré)
Formulaire Formspree avec copie à une adresse interne, bouton WhatsApp flottant.

## 5. Critères de succès

| Critère | Cible |
| --- | --- |
| Conversion | Part de visiteurs ouvrant WhatsApp avec une commande complète |
| Qualité des données | Chaque commande contient prénom, téléphone, zone, paiement |
| Visibilité | Pages et articles indexés, positions sur « cosmétiques Lomé » |
| Opérations | Toute commande suivie jusqu'à « Livrée » dans l'admin |
| Vitesse | Site statique, chargement rapide sur mobile 4G |

## 6. Contraintes

- Contenu en français, prix en FCFA, livraison à Lomé.
- Hébergement statique (GitHub Pages) : pas de serveur applicatif propre.
- Les secrets Supabase (URL, clé anon) sont injectés au build par GitHub Actions.
- Allégations cosmétiques à manier avec prudence (éclaircissement, grossesse).

## 7. Risques

| Risque | Mitigation |
| --- | --- |
| Sécurité de l'admin (RLS non versionnée) | Vérifier les politiques dans Supabase (voir BACKEND_SCHEMA) |
| URL du script Google Sheets exposée côté client | Accepté pour un script public ; limiter les champs et valider côté script |
| Deux sources de vérité (Sheets et Supabase) | Choisir une source principale (voir plan) |
| Numéro WhatsApp codé en dur | Centraliser dans une constante de configuration |
| Dépendance à Lovable et GitHub Pages | Build reproductible, déploiement par Actions |
