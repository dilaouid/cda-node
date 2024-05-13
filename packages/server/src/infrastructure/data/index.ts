import { Pool } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import env from "../../config/env";
const { DATABASE_URL } = env;

import * as schema from "./schema";

export const pool = new Pool({
    connectionString: DATABASE_URL
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema: schema });