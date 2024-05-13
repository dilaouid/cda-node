import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

import env from "../../config/env";
const { DATABASE_URL } = env;

// C'est dans cette fonction qu'on va appliquer la migration vers notre db
async function main() {
    const pool = new Pool({
        connectionString: DATABASE_URL
    });

    // On va initialiser la connexion à la db avec drizzle pour avoir une instance de NodePgDatabase
    const db: NodePgDatabase = drizzle(pool);

    console.info("Migrating database...");

    // On appelle la fonction mgirate de Drizzle, qui va migrer la db et enregistrer les métadonnées de la migration
    // dans le dossier spécifié dans la propriété migrationsFolder
    await migrate(db, {
        migrationsFolder: 'src/infrastructure/data/drizzle'
    })

    console.info("Database migrated successfully!")
    
    // On ferme la pool de connexion, on n'en a plus besoin (on se déconnecte de la db)
    await pool.end();
}

main();