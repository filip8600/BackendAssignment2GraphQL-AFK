import dotenv from 'dotenv';

dotenv.config();

export const isDev = process.env.NODE_ENV !== 'production';

//export const port = process.env.PORT;
export const port = 3001;

export const pgConnectionString = process.env.PG_CONNECTION_STRING;
