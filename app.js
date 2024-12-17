import express from 'express';
import bodyParser from 'body-parser';
import pool from './config/db.js';
import dotenv from 'dotenv';
import swaggerConfig from './config/swagger.js';
import duenoRoutes from './routes/duenoRoutes.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware


// Configuración de CORS (deberías especificar la URL de tu frontend en lugar de '*')
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Deberías definir tu frontend URL aquí
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Permite enviar cookies o credenciales
}));


app.use(bodyParser.json());


// Ruta para obtener todos los dueños
app.get('/duenos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM dueno');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los dueños', details: err.message });
    }
});

// Ruta para obtener un dueño por ID
app.get('/duenos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM dueno WHERE idCliente = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Dueño no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el dueño', details: err.message });
    }
});

// Ruta para crear un nuevo dueño
app.post('/duenos', async (req, res) => {
    const { NombreCliente, ComidaFavorita, DescuentoNavideno } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO dueno (NombreCliente, ComidaFavorita, DescuentoNavideno) VALUES (?, ?, ?)',
            [NombreCliente, ComidaFavorita, DescuentoNavideno]
        );
        res.status(201).json({ message: 'Dueño creado', idCliente: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el dueño', details: err.message });
    }
});

// Ruta para actualizar un dueño
app.put('/duenos/:id', async (req, res) => {
    const { id } = req.params;
    const { NombreCliente, ComidaFavorita, DescuentoNavideno } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE dueno SET NombreCliente = ?, ComidaFavorita = ?, DescuentoNavideno = ? WHERE idCliente = ?',
            [NombreCliente, ComidaFavorita, DescuentoNavideno, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Dueño no encontrado' });
        res.json({ message: 'Dueño actualizado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el dueño', details: err.message });
    }
});

// Ruta para eliminar un dueño
app.delete('/duenos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM dueno WHERE idCliente = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Dueño no encontrado' });
        res.json({ message: 'Dueño eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el dueño', details: err.message });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Swagger
swaggerConfig(app);

// Middleware y rutas
app.use('/api/duenos', duenoRoutes);

// Login con JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '1234') {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(400).json({ error: 'Credenciales incorrectas' });
});
