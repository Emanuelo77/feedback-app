import pkg from 'pg';
import dotenv from 'dotenv'; // Importiere dotenv

// Lade die Umgebungsvariablen
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const createTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS feedback (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                text TEXT NOT NULL
            );
        `);
        console.log('Tabelle erfolgreich erstellt oder existiert bereits.'); // Bestätigung
    } catch (error) {
        console.error('Fehler beim Erstellen der Tabelle: ', error);
    }
};

// Exportiere den Pool und die createTable-Funktion
export { pool, createTable };
