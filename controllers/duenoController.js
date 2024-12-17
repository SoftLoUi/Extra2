import Dueno from '../models/duenoModel.js';

/**
 * @swagger
 * /duenos:
 *   get:
 *     summary: Obtener todos los dueños
 *     description: Retorna una lista completa de todos los dueños sin paginación.
 *     tags:
 *       - Dueños
 *     responses:
 *       200:
 *         description: Lista de dueños obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idCliente:
 *                     type: integer
 *                     description: ID del cliente
 *                   NombreCliente:
 *                     type: string
 *                     description: Nombre del cliente
 *                   ComidaFavorita:
 *                     type: string
 *                     description: Comida favorita del dueño
 *                   DescuentoNavideno:
 *                     type: number
 *                     format: decimal
 *                     description: Descuento navideño
 *                   FechaCreacion:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación
 *       500:
 *         description: Error al obtener los dueños.
 */


export const getAllDuenos = async (req, res) => {
    try {
        // Realizamos la consulta para obtener todos los dueños sin paginación
        const results = await Dueno.getAll(); // Asumiendo que tienes un método `getAll` que obtiene todos los registros

        // Enviar la respuesta con todos los resultados
        res.json(results);
    } catch (err) {
        // Si ocurre un error, devolver una respuesta 500 con el mensaje de error
        res.status(500).json({ error: 'Error al obtener los dueños', details: err.message });
    }
};


/**
 * @swagger
 * /duenos/{id}:
 *   get:
 *     summary: Obtener un dueño por ID
 *     description: Retorna un único dueño basado en su ID.
 *     tags:
 *       - Dueños
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del dueño a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información del dueño obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idCliente:
 *                   type: integer
 *                   description: ID del cliente
 *                 NombreCliente:
 *                   type: string
 *                   description: Nombre del cliente
 *                 ComidaFavorita:
 *                   type: string
 *                   description: Comida favorita del dueño
 *                 DescuentoNavideno:
 *                   type: number
 *                   format: decimal
 *                   description: Descuento navideño
 *                 FechaCreacion:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación
 *       404:
 *         description: Dueño no encontrado.
 *       500:
 *         description: Error al obtener el dueño.
 */

export const getDuenoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await Dueno.getById(id);
        if (results.length === 0) return res.status(404).json({ error: 'Dueño no encontrado' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el dueño', details: err.message });
    }
};

/**
 * @swagger
 * /duenos:
 *   post:
 *     summary: Crear un nuevo dueño
 *     description: Crea un registro de dueño con los datos proporcionados.
 *     tags:
 *       - Dueños
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NombreCliente:
 *                 type: string
 *                 description: Nombre del cliente
 *               ComidaFavorita:
 *                 type: string
 *                 description: Comida favorita del dueño
 *               DescuentoNavideno:
 *                 type: number
 *                 format: decimal
 *                 description: Descuento navideño
 *             required:
 *               - NombreCliente
 *               - ComidaFavorita
 *               - DescuentoNavideno
 *     responses:
 *       201:
 *         description: Dueño creado exitosamente.
 *       500:
 *         description: Error al crear el dueño.
 */

export const createDueno = async (req, res) => {
    try {
        const result = await Dueno.create(req.body);
        res.status(201).json({ message: 'Dueño creado', idCliente: result[0].insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el dueño', details: err.message });
    }
};

/**
 * @swagger
 * /duenos/{id}:
 *   put:
 *     summary: Actualizar un dueño existente
 *     description: Actualiza la información de un dueño específico basado en su ID.
 *     tags:
 *       - Dueños
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del dueño a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NombreCliente:
 *                 type: string
 *                 description: Nombre del cliente
 *               ComidaFavorita:
 *                 type: string
 *                 description: Comida favorita del dueño
 *               DescuentoNavideno:
 *                 type: number
 *                 format: decimal
 *                 description: Descuento navideño
 *     responses:
 *       200:
 *         description: Dueño actualizado exitosamente.
 *       404:
 *         description: Dueño no encontrado.
 *       500:
 *         description: Error al actualizar el dueño.
 */

export const updateDueno = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Dueno.update(id, req.body);
        if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Dueño no encontrado' });
        res.json({ message: 'Dueño actualizado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el dueño', details: err.message });
    }
};

/**
 * @swagger
 * /duenos/{id}:
 *   delete:
 *     summary: Eliminar un dueño
 *     description: Elimina un registro de dueño basado en su ID.
 *     tags:
 *       - Dueños
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del dueño a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dueño eliminado exitosamente.
 *       404:
 *         description: Dueño no encontrado.
 *       500:
 *         description: Error al eliminar el dueño.
 */

export const deleteDueno = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Dueno.delete(id);
        if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Dueño no encontrado' });
        res.json({ message: 'Dueño eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el dueño', details: err.message });
    }
};

