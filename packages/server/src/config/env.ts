import { EnvConfig } from "../types/env";

const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "3000"),
    JWT_SECRET: process.env.JWT_SECRET || "MonS3cr3tTropBienGardé123:!",
    REFRESH_SECRET: process.env.REFRESH_SECRET || "MonS3cr3tTropBienGardé123IlEstR3fr3sh§:!",
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test' || 'development',
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    DATABASE_URL: process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/blog",
};

export default env;