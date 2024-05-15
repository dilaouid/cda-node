import { beforeAll, afterAll } from '@jest/globals';
import { db, pool } from '../infrastructure/data';
import bcrypt from 'bcrypt';

import { sql } from 'drizzle-orm';

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { users } from '../infrastructure/data/schema';

export let createdUser: {id: string, username: string, password: string} = { id: '', username: '', password: '' }

beforeAll(async () => {
    try {
        console.log('Setting up test environment...');
        await db.execute(sql`CREATE SCHEMA IF NOT EXISTS test`);
        await db.execute(sql`SET search_path TO test`);
    
        await migrate(db, { migrationsFolder: 'src/infrastructure/data/drizzle', migrationsSchema: 'test' });
        console.log('Migrations applied.');
    
        const hashedPassword = await bcrypt.hash('password123', 10);
        const result = await db.insert(users)
          .values({ username: 'testuser', password: hashedPassword })
          .returning()
          .execute();
    
        createdUser = { id: result[0].id, username: 'testuser', password: hashedPassword };
        console.log('Test user created:', createdUser);
    } catch (error) {
        console.error('Error during beforeAll:', error);
    }
});

afterAll(async () => {
    try {
        // await db.execute(sql`DROP SCHEMA IF EXISTS test CASCADE`);
        await pool.end();
    } catch (error) {
        console.error('Error during afterAll:', error);
    }
});
  
