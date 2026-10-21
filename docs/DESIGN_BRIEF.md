# STEFCOS — Design Brief

## 1. Positionnement

Marque de cosmétiques **premium** pour peaux noires et mixtes, ancrée à Lomé. Ton : élégant,
chaleureux, rassurant, expert. Le site doit inspirer la confiance (produit authentique) tout
en restant simple pour commander depuis un téléphone.

## 2. Public

Femmes (et familles, hommes dans une moindre mesure) de Lomé et de la diaspora, qui
achètent surtout par mobile et sont à l'aise avec WhatsApp. Réseaux faibles possibles.

## 3. Direction artistique

Ambiance éditoriale « beauté de luxe » : beaucoup d'air, grandes photographies, typographie
à empattements fine, palette terre et or.

### Typographie
| Usage | Police |
| --- | --- |
| Titres | Cormorant Garamond (300 à 700, italique 300 et 400), fine et grande |
| Texte, interface | Inter (300 à 600) |

### Palette (variables HSL de `src/index.css`)
| Rôle | Valeur | Aperçu |
| --- | --- | --- |
| Fond | `40 33% 98%` | crème très clair |
| Texte | `20 10% 12%` | brun presque noir |
| Primaire | `30 45% 28%` | brun profond |
| Secondaire | `32 30% 92%` | sable |
| Accent | `28 60% 45%` | cuivre |
| Or | `38 70% 55%` (clair `40 60% 90%`) | détails, badges |
| Crème | `40 33% 96%` | sections douces |
| Terracotta | `16 55% 50%` | ponctuation chaude |
| Olive | `80 15% 40%` | contrepoint naturel |
| Bordures | `35 20% 88%` | séparateurs fins |
| Vert WhatsApp | `#25D366` | boutons et bandeaux de conversion |

Rayon d'angle : `0.25rem` (formes quasi carrées, sobres). Thème clair par défaut (le mode
sombre n'est pas exploité sur le site).

## 4. Principes

1. **Photo d'abord** : visuels produits sur piédestal, galeries à 4 vues, visages de
   femmes à la peau noire valorisés (Philosophie, hero).
2. **Respiration** : sections à grand padding vertical, texte court, titres légers.
3. **Une action claire** : Commander (boutique) ou Discuter sur WhatsApp ; vert WhatsApp réservé à la conversion.
4. **Confiance** : badges (Bestseller, Nouveau), témoignages, section authenticité dans le journal.
5. **Mobile d'abord** : cartes alignées en responsive, tiroir de panier plein écran, boutons larges.
6. **Animations discrètes** : apparition au scroll, survol doux, transitions fines.
7. **Pas d'emoji dans les messages WhatsApp** : gras natif pour la compatibilité universelle.

## 5. Composants clés

| Composant | Rôle |
| --- | --- |
| `Header` / `Footer` | Logo en Cormorant, navigation, panier |
| `ProductCard` | Image carte (`cardImage`), badge, nom, sous-titre, prix « à partir de » |
| Fiche produit | Galerie, sélecteur de tailles, description, cross-sell |
| `CartDrawer` | Lignes, quantités, remises, total, bouton Commander |
| `OrderModal` | Formulaire court avec icônes (zone, paiement) |
| `WhatsAppButton` | Bouton flottant permanent |
| `ExitIntentSidebar` | Suggestions produit, déclenchement différé |
| `WhatsAppVipPopup` | Offre -10 % (désactivé) |
| `ArticleIllustration` | Illustrations de remplacement des articles |
| Admin (shadcn) | Tableaux, onglets, modales, thème clair |

## 6. Photographie

Dossiers `public/products/<produit>/1..4` : packshots sur fond neutre, mise en scène
(piédestal pour Dovena), visuels corps et lifestyle. Hero de la Philosophie : trois femmes
avec le lait 72 Heures. À maintenir : cohérence de lumière, formats, poids des fichiers.

## 7. Contenu et ton

Français. Vouvoiement, phrases courtes, vocabulaire sensoriel et scientifique mesuré
(AHA, bêta-carotène, karité). Éviter toute promesse médicale ; préciser les délais de
résultat comme indicatifs. Prix en FCFA avec séparateur d'espace.

## 8. Accessibilité

Contraste brun sur crème élevé ; texte alternatif des images à systématiser ; cibles tactiles
larges ; formulaires avec libellés et messages d'erreur ; ne pas compter sur la couleur seule.
