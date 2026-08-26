import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Moteur de la page repris verbatim de l'ancien index.html (cf. commit
    // de migration) — pas du code de projet, pas de lint dessus.
    "src/landing-engine.js",
  ]),
]);

export default eslintConfig;
