// On importe notrer configuration des var environnements
// permets de lire les variables d'environnement dans le fichier .env
import 'dotenv/config';

// fonction (paramètres: option) pour definir la structure de notre configuration drizzle
import { defineConfig } from 'drizzle-kit';

import env from './env';
const { DATABASE_URL } = env;

export default defineConfig({
    /* la propriété schema indique à drizzle où se trouve le fichier où sont exportés tout nos schémas de
    table */
    schema: 'src/infrastructure/data/schema/index.ts',

    // la propriété out indique où Drizzle va générer les fichiers de migrations, métadonnées, etc...
    out: 'src/infrastructure/data/drizzle',

    // on indique à drizzle quel dialect utiliser pour se connecter à la db, à savoir ici postgresql
    dialect: "postgresql",

    dbCredentials: {
        url: DATABASE_URL
    },

    // avoir + de logs dans la console (idéal pour debug)
    verbose: true,

    // protection typesafety
    // strict: true
})