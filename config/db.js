import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT, // Puerto opcional
    ssl: {
        rejectUnauthorized: false, // Necesario si Clever Cloud usa SSL
    },
});

// Conectar a la base de datos
db.connect()
    .then(() => {
        console.log('Conectado a la base de datos.');
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err.message);
    });

// Exporta la conexión de base de datos
export default db;
