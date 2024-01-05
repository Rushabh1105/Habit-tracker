// Import Dotenv module
import dotenv from 'dotenv';
// Configure environment variables
dotenv.config();
// Export Default variables
export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;