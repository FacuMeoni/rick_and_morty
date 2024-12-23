import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_PASS = process.env.DB_PASS;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS || {};
export const PORT = process.env.PORT || 3000;