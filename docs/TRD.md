# STEFCOS — Technical Requirements Document

## 1. Stack

| Domaine | Choix |
| --- | --- |
| Framework | React 18.3, TypeScript, Vite (plugin React SWC) |
| UI | Tailwind CSS 3, shadcn/ui (Radix UI), lucide-react, tailwindcss-animate |
| Routage | react-router-dom 6.30 |
| Données serveur | @tanstack/react-query 5, @supabase/supabase-js 2 |
| Formulaires | react-hook-form, zod |
| Graphiques | recharts (tableau de bord) |
| Tests | Vitest, Testing Library (un seul test d'exemple) |
| Lint | ESLint 9 |
| Gestionnaires | npm (CI), bun.lock présent |
| Hébergement | GitHub Pages (domaine `stefcos.com`) |
| Services tiers | Supabase, Google Apps Script / Sheets, Formspree, WhatsApp (wa.me) |

Scripts : `dev` (port 8080), `build` (`vite build && node scripts/copy-routes.js`), `lint`, `test`.

## 2. Variables d'environnement

| Variable | Où | Rôle |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | `.env`, secret GitHub | URL du projet Supabase |
| `VITE_SUPABASE_ANON_KEY` | `.env`, secret GitHub | Clé publique, protégée par RLS |

Constantes dans le code : numéro WhatsApp (`lib/whatsapp.ts`), URL Apps Script
(`OrderModal.tsx`), identifiant Formspree (`Contact.tsx`), `BASE_URL` SEO (`usePageSeo.ts`).

## 3. Exigences fonctionnelles techniques

| Réf. | Exigence |
| --- | --- |
| TR-01 | Chaque route publique est servie sans 404 sur GitHub Pages (`404.html` et `copy-routes.js`) |
| TR-02 | Le panier gère plusieurs tailles d'un même produit via `cartKey = id-size` |
| TR-03 | Remise par ligne : 0 % (1), 5 % (2), 10 % (3 et plus) ; prix initial et remise affichés |
| TR-04 | Le message WhatsApp contient numéro `STC-AAAA-NNNN`, lignes, total, prénom, téléphone, zone, paiement ; mise en gras native (pas d'emoji) |
| TR-05 | L'envoi vers Sheets utilise `Content-Type: text/plain` et `mode: no-cors` |
| TR-06 | La commande est aussi insérée dans Supabase (`commandes`) ; l'échec d'un canal ne doit pas bloquer l'ouverture de WhatsApp |
| TR-07 | `usePageSeo` met à jour title, description, Open Graph, Twitter et `canonical` à chaque page |
| TR-08 | Les articles injectent du JSON-LD `BlogPosting` et `FAQPage` quand des FAQ existent |
| TR-09 | Les sections de page se révèlent au scroll (`useScrollReveal`), relancé au changement de catégorie |
| TR-10 | L'admin exige une session Supabase (`AdminProtectedRoute`) |
| TR-11 | Les listes admin se filtrent par statut, paiement et période (jour, 7 jours, mois) |
| TR-12 | La barre d'intention de sortie et la bannière n'apparaissent qu'après 3 minutes sur la page |

## 4. SEO

- Titres et descriptions optimisés pour chaque page, canonical en `https://www.stefcos.com`.
- `sitemap.xml`, `robots.txt`, balise de vérification Google Search Console.
- Favicon SVG.
- Contenu GEO : articles longs, sections, FAQ, JSON-LD.
- Limite : site SPA, le HTML pré-généré est le même `index.html` pour toutes les routes ;
  les meta par page sont posées côté client (les robots qui n'exécutent pas JS ne les voient pas).

## 5. Sécurité

- Clé anon uniquement dans le navigateur ; `.env` ignoré par git.
- RLS Supabase : non versionnée, à vérifier (cf. BACKEND_SCHEMA).
- Admin : e-mail / mot de passe Supabase, route protégée côté client.
- Validation des champs de commande côté client (prénom, zone, téléphone).

## 6. Performance

- Site statique, polices Google (Cormorant Garamond, Inter) chargées par `@import` CSS.
- Images produits PNG / JPEG dans `public/products` (poids non optimisé, à contrôler).
- Aucune requête serveur côté vitrine.

## 7. Tests

Un seul fichier (`src/test/example.test.ts`). Aucun test du panier, des remises, de la
génération du message WhatsApp ni de l'admin.

## 8. Dette technique connue

1. `README.md` vide (« TODO: Document your project here »).
2. Aucun schéma Supabase ni script SQL dans le dépôt.
3. Deux gestionnaires de paquets (`bun.lock`, `bun.lockb`, `package-lock.json`).
4. Constantes de configuration (téléphone, Formspree, Apps Script) dispersées dans le code.
5. `copy-routes.js` à maintenir à la main à chaque produit ou article.
6. `netlify.toml` et `src/App.css` hérités du gabarit.
7. Route `*` déclarée avant les routes admin (l'ordre est sans effet avec React Router 6, mais prête à confusion).
8. Pas d'intégration continue de lint ou de tests avant déploiement.
9. Deux sources de commandes (Sheets et Supabase) sans réconciliation.
