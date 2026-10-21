# STEFCOS — Architecture

## 1. Vue d'ensemble

```
Visiteuse (mobile)
   |  HTTPS stefcos.com
   v
GitHub Pages : SPA React (Vite) pré-routée  <-- GitHub Actions (build + déploiement)
   |
   |-- Panier (CartContext, mémoire du navigateur)
   |-- Modale de commande
   |      |-- fetch no-cors ------> Google Apps Script --> Google Sheets (CRM)
   |      |-- insert -------------> Supabase (table commandes)
   |      |-- ouvre ---------------> WhatsApp (wa.me, message prérempli)
   |-- Contact ------------------> Formspree (e-mail)

Admin (/admin) --> Supabase Auth (e-mail + mot de passe) --> tables commandes, coursiers
```

## 2. Principes

1. **Statique d'abord** : aucun serveur à maintenir, toute la logique est dans le navigateur.
2. **WhatsApp comme caisse** : la commande n'est confirmée que par échange humain.
3. **Données saisies une fois, enregistrées deux fois** : Sheets (opérations) et Supabase (admin).
4. **SEO par le contenu** : routes pré-générées, meta dynamiques, JSON-LD.

## 3. Structure du code

| Dossier | Rôle |
| --- | --- |
| `src/pages` | Index, Boutique, ProductDetail, Philosophie, Journal, ArticleDetail, Contact, NotFound |
| `src/pages/admin` | AdminLoginPage, AdminDashboardPage |
| `src/components` | Header, Footer, Layout, ProductCard, CartDrawer, OrderModal, WhatsAppButton, WhatsAppVipPopup, ExitIntentSidebar, ArticleIllustration |
| `src/components/admin` | AdminProtectedRoute, onglets (Dashboard, Commandes, Coursiers), modales |
| `src/components/ui` | Composants shadcn/ui (Radix + Tailwind) |
| `src/contexts` | `CartContext` : panier, remises, totaux |
| `src/data` | `products.ts`, `articles.ts`, `testimonials.ts` : contenu versionné dans le code |
| `src/hooks` | `useCommandes`, `useCoursiers`, `useAdminAuth`, `usePageSeo`, `useScrollReveal` |
| `src/lib` | `whatsapp.ts` (messages), `supabase.ts` (client), `utils.ts` |
| `crm/stefcos_crm.gs` | Script d'initialisation du classeur Google Sheets |
| `scripts/copy-routes.js` | Pré-génération des routes pour GitHub Pages |

## 4. Routage

React Router (BrowserRouter) : `/`, `/boutique`, `/boutique/:id`, `/philosophie`, `/journal`,
`/journal/:slug`, `/contact`, `/admin`, `/admin/dashboard` (protégée), `*` en 404.
Sur GitHub Pages, deux mécanismes évitent les 404 : `public/404.html` (redirection SPA) et
`scripts/copy-routes.js` (copie de `index.html` dans chaque route connue). **Toute nouvelle
page, fiche produit ou article doit être ajouté à ce script et à `sitemap.xml`.**

## 5. Flux de commande

1. La cliente ajoute des produits (variantes de taille), remises appliquées par ligne.
2. Elle ouvre la modale : prénom, téléphone, quartier, mode de paiement.
3. À la validation : envoi au script Sheets (`text/plain`, `no-cors`), insertion Supabase
   (`paiement = Non payé`, statut initial), puis ouverture de `wa.me` avec le message.
4. L'équipe confirme sur WhatsApp, met à jour le statut et assigne un coursier (admin ou Sheets).
5. Les relances J+2 / J+7 / J+21 sont suivies dans « Relances du jour ».

## 6. Déploiement

- `main` déclenche `.github/workflows/deploy.yml` : `npm ci`, `npm run build`
  (`vite build` puis `copy-routes`), publication de `dist` sur GitHub Pages.
- Secrets GitHub : `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- Domaine : `public/CNAME`. `netlify.toml` reste présent (redirection SPA) mais Netlify n'est plus la cible.
- `.env` local ignoré par git.

## 7. Sécurité

- Seule la clé anon Supabase est dans le navigateur ; l'accès aux données dépend entièrement
  des politiques RLS, **non versionnées dans ce dépôt**.
- L'admin est protégée côté client par `AdminProtectedRoute` ; la vraie protection est la RLS.
- Le point d'entrée Apps Script est public par nature.

## 8. Points d'attention

- Contenu produit et articles dans le code : toute modification passe par un commit.
- Un seul numéro WhatsApp, codé dans `lib/whatsapp.ts`.
- Deux dossiers de sites en parallèle : `stefcos-website` (statique) n'est plus la source.
