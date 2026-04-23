import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir   = join(__dirname, "../dist");
const html      = readFileSync(join(distDir, "index.html"), "utf-8");

const routes = [
  "boutique",
  "philosophie",
  "journal",
  "contact",
  // Produits
  "boutique/72heures",
  "boutique/sublim-eclat",
  "boutique/bio-activ",
  "boutique/sido-clair",
  "boutique/savon-gommant",
  "boutique/savon-eclaircissant-72h",
  "boutique/glycederm",
  "boutique/savon-glycederm-enfant",
  "boutique/lait-glycederm-enfant",
  "boutique/dovena",
  // Articles
  "journal/routine-peau-eclatante",
  "journal/soins-peaux-noires",
  "journal/gamme-bio-activ",
  "journal/hyperpigmentation-solutions",
  "journal/ingredients-naturels-africains",
  "journal/protection-solaire-peaux-foncees",
  "journal/routine-soir-reparatrice",
  "journal/savons-naturels-bienfaits",
  "journal/hydratation-peaux-seches",
  "journal/cosmetique-togolaise-monde",
  "journal/acne-peaux-noires",
  "journal/tendances-beaute-2026",
  "journal/beurre-karite-bienfaits",
  "journal/routine-homme-peau-noire",
  "journal/choisir-lait-corporel",
];

for (const route of routes) {
  const dir = join(distDir, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  console.log(`✅ dist/${route}/index.html`);
}

console.log(`\n🚀 ${routes.length} routes générées pour GitHub Pages`);
