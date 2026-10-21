# STEFCOS — Historique du projet

Source : `git log` (91 commits). Amorce du modèle Lovable (`vite_react_shadcn_ts`), puis
activité du 13 au 27 avril 2026, et un dernier commit le 28 juillet 2026.

| Date | Commits | Thème |
| --- | --- | --- |
| 13/04 | 25 | Construction du site, produits, panier, paiement WhatsApp |
| 14/04 | 12 | Journal, barre latérale d'intention de sortie |
| 15/04 | 5 | Itérations et conversion WhatsApp |
| 16/04 | 3 | Vraies photos produits, SEO, remises, cross-sell |
| 17/04 | 18 | Déploiement, SEO technique, modale de commande, CRM |
| 18/04 | 10 | Tunnel WhatsApp, relances, scripts, nouveaux produits |
| 20/04 | 4 | Variantes de taille, contact Formspree |
| 22 et 23/04 | 8 | Bannière de rebond, liaison commande vers CRM Sheets, routage SPA |
| 24/04 | 3 | Panneau d'administration Supabase |
| 27/04 | 1 | Favicon SVG |
| 28/07 | 1 | 6 articles SEO / GEO avec FAQ |

## Phase 1 — Construction du site (13/04)

Gabarit Lovable, puis « site premium » : hero, galerie, fiches produit, panier. Le même jour
arrive le **paiement par WhatsApp** : le panier génère un message prérempli (numéro de
commande `STC-AAAA-NNNN`, lignes, total) envoyé au numéro de la marque. Bouton WhatsApp
flottant, animations au scroll, remplacement du numéro.

## Phase 2 — Contenu et conversion (14/04 au 16/04)

- Journal (blog) et barre latérale « exit-intent » qui propose des produits.
- Défilement en haut à chaque navigation, suppression du lien Accueil superflu.
- `84f5547` Vraies photos produits et galeries ; `37d8359` expérience d'achat : remises
  progressives (-5 % dès 2 articles, -10 % dès 3), cross-sell, commandes WhatsApp.
- Correction de l'alignement des cartes en responsive.

## Phase 3 — Mise en ligne et SEO (17/04)

- `da7d871` `netlify.toml` pour `stefcos.com` ; `c81c49d` bascule sur **GitHub Pages**
  (retrait du badge Lovable) ; `0d1fae3` correction des 404 sur routes React Router (page 404
  de redirection SPA, puis `scripts/copy-routes.js`).
- SEO : titres et descriptions par page, favicon SVG, vérification Google Search Console,
  sitemap avec 15 articles, meta tags dynamiques (`usePageSeo`).
- **CRM Google Sheets** : colonnes mode de paiement, corrections du tableau de bord.
- `964872f` Modale de commande qui collecte prénom, zone et mode de paiement avant WhatsApp.

## Phase 4 — Tunnel de vente WhatsApp (18/04)

- `2018875` Collecte du téléphone, popup VIP (-10 %), parrainage, section VIP sur l'accueil.
- `72277e4`, `12e7d8f` CRM : relances J+2 / J+7 / J+21, feuille « Relances du jour »,
  10 scripts WhatsApp du tunnel de vente.
- Nouveaux produits : Dovena (soins cheveux), gamme enfants (savon et lait Glycederm).
- Filtre boutique par URL (`?category=`), fiches produits enrichies.

## Phase 5 — Consolidation commerciale (20/04 au 23/04)

- `19e0573` Variantes de taille et de prix, cross-sell, panier multi-tailles.
- Numéro WhatsApp mis à jour (secrétaire STEFCOS) puis de nouveau le 23/04.
- Contact via **Formspree** (copie vers une adresse interne).
- `eeb0861` à `51994d9` : le formulaire de commande alimente le **CRM Google Sheets**
  (envoi `text/plain` en `no-cors`).
- Bannière de rebond repoussée à 3 minutes minimum.

## Phase 6 — Administration (24/04)

- `949bdff` Panneau admin avec **Supabase** : connexion, tableau de bord, commandes,
  coursiers. Les commandes du site se synchronisent automatiquement à l'envoi.
- Bascule du panneau en thème clair. `e9187d5` **Popup VIP WhatsApp désactivé temporairement.**

## Phase 7 — SEO / GEO (28/07)

`6de8aaa` Six articles longs avec sections structurées et FAQ, JSON-LD `BlogPosting` et
`FAQPage` pour les moteurs génératifs ; six routes ajoutées au sitemap et à `copy-routes.js`.

## Décisions structurantes

1. **WhatsApp comme canal de conversion** plutôt qu'un paiement en ligne : adapté au marché
   togolais (TMoney, Flooz, paiement à la livraison).
2. **Double enregistrement des commandes** : Google Sheets (CRM historique) et Supabase (admin).
3. **GitHub Pages** (statique) : routes pré-générées par copie de `index.html`.
4. **SEO local et GEO** : contenu éditorial à fort volume (journal) pour Lomé.
5. **Pas de panier côté serveur** : tout passe par le message WhatsApp.

## État au 2026-10-21

Dernier commit le 28/07/2026. Le dépôt est propre, à jour avec `origin`. Le `README.md`
n'est pas documenté (« TODO »). Voir [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md).
