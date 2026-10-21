# STEFCOS — Plan d'implémentation

## 1. Jalons livrés

| Jalon | Contenu | Statut |
| --- | --- | --- |
| J1 Site et panier | Pages, catalogue, panier, paiement WhatsApp | Livré 13/04 |
| J2 Contenu et conversion | Journal, exit-intent, remises, cross-sell, vraies photos | Livré 14 au 16/04 |
| J3 Mise en ligne et SEO | GitHub Pages, domaine, sitemap, Search Console, routes SPA | Livré 17/04 |
| J4 Tunnel WhatsApp et CRM | Modale de commande, VIP, parrainage, relances, scripts | Livré 17 au 18/04 |
| J5 Catalogue et commandes | Variantes de taille, Dovena, gamme enfants, liaison Sheets | Livré 18 au 23/04 |
| J6 Administration | Admin Supabase : commandes, coursiers, tableau de bord | Livré 24/04 |
| J7 SEO / GEO | 6 articles longs avec FAQ et JSON-LD | Livré 28/07 |

## 2. Reste à faire (proposition, à valider)

### Étape A — Documentation et configuration (court, faible risque)
1. Remplacer le `README.md` vide par un résumé (stack, commandes, déploiement, contacts).
2. Centraliser les constantes (numéro WhatsApp, URL Apps Script, Formspree, URL de base)
   dans `src/lib/config.ts`.
3. Versionner le schéma Supabase et ses politiques RLS (`supabase/01-structure.sql`).
4. Retirer ce qui est hérité (`netlify.toml` si inutile, `App.css`, `bun.lockb` si npm seul).

### Étape B — Sécurité (prioritaire)
1. Vérifier les politiques RLS réelles de `commandes` et `coursiers` (l'insertion publique ne
   doit pas permettre la lecture).
2. Fermer l'inscription Supabase, limiter l'admin à des comptes connus.
3. Valider côté Apps Script les champs reçus (longueur, format du téléphone).

### Étape C — Opérations
1. Choisir la source de vérité des commandes : Supabase (recommandé) ou Sheets.
2. Aligner les statuts entre Sheets et admin (par exemple ajouter « En attente paiement »).
3. Restaurer des relances J+2 / J+7 / J+21 dans l'admin (aujourd'hui seulement dans Sheets).
4. Décider du sort du popup VIP (désactivé depuis le 24/04) : le réactiver avec un déclencheur moins intrusif ou le retirer.

### Étape D — SEO et performance
1. Automatiser `copy-routes.js` et `sitemap.xml` depuis `products.ts` et `articles.ts`.
2. Pré-rendre les meta par page (SSG) pour les robots sans JavaScript.
3. Optimiser les images (WebP, tailles responsives) et les polices.
4. Ajouter des données structurées `Product` et `Organization` / `LocalBusiness`.
5. Suivre l'indexation dans Search Console et publier de nouveaux articles à rythme régulier.

### Étape E — Produit
| Idée | Valeur | Effort |
| --- | --- | --- |
| Suivi de commande pour la cliente | Rassurer, réduire les messages | Moyen |
| Gestion du catalogue depuis l'admin | Fin des commits pour changer un prix | Moyen (table `produits`) |
| Stock et rupture | Éviter les ventes impossibles | Moyen |
| Avis clientes réels | Preuve sociale | Faible |
| Paiement mobile intégré (TMoney / Flooz) | Moins de friction | Élevé, dépend d'un agrégateur |
| Version anglaise | Diaspora | Moyen |

## 3. Ordre recommandé

B (sécurité) puis A, puis C.1 et C.2, puis D.1 et D.3, enfin choisir dans E selon les ventes.

## 4. Définition de terminé

- Lint et build passent en CI avant déploiement.
- Toute nouvelle fiche ou article apparaît dans le sitemap et les routes générées.
- `docs/` reflète le code.
- Accord d'Ernestine avant de pousser une nouveauté visible en production.

## 5. Dépendances et risques

| Dépendance | Impact si indisponible |
| --- | --- |
| GitHub Pages / Actions | Plus de déploiement |
| Supabase | Admin inutilisable, commandes toujours envoyées par WhatsApp et Sheets |
| Apps Script | CRM Sheets non alimenté |
| WhatsApp | Canal de commande unique, risque majeur |
| Formspree | Contact par e-mail indisponible |
