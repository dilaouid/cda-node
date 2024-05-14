import { beforeAll, afterAll } from '@jest/globals';
import { sql } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

import { db, pool } from '../infrastructure/data';

import { users } from '../infrastructure/data/schema';

// On exporte un utilisateur que l'on va créer pour nos tests et qui sera utilisé dans ces derniers
// (il sera supprimé à la fin de tout nos tests)
export let createdUser: { id: string, username: string, password: string } = { id: '', username: '', password: '' };

beforeAll(async () => {
    try {
        console.log('Setup test environment...');

        // On crée notre schéma de test dans noter DB (imaginez un schéma pgsql comme une db dans une db, c'est un espace de nommage)
        // pour éviter de devoir créer une db annexe juste pour nos tests
        await db.execute(sql`CREATE SCHEMA IF NOT EXISTS test`)

        // On dit à notre db de travaillaer dans le schéma test qui vient d'être crée au dessus
        await db.execute(sql`SET search_path TO test`);

        await migrate(db, { migrationsFolder: 'src/infrastructure/data/drizzle', migrationsSchema: 'test' });
        console.log('Migration done! GG');

        // On va créer notre utilisateur de test qui écrira articles, commentaires, etc etc
        const hashedPassword = await bcrypt.hash('password123', 10);
        const result = await db.insert(users)
                            .values({username: 'Conan', password: hashedPassword})
                            .returning()
                            .execute();
        
        createdUser = { id: result[0].id, username: 'Conan', password: hashedPassword };
        console.log('Test user created successfully');
        console.table(createdUser);
    } catch (error) {
        console.error('Error during beforeAll in setup:');
        console.error(error);
    }
})

// Une fonction qui sera executée après tout les tests réalisées, et on va en profiter pour nettoyer notre environnement: à savoir notre schéma
// test de notre db
afterAll(async () => {
    try {
        //await db.execute(sql`DROP SCHEMA IF EXISTS test CASCADE`);
        await pool.end();
    } catch (error) {
        console.error('Error during afterAll:', error);
    }
});