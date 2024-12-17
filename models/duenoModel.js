import db from '../config/db.js';

class Dueno {
    static getAll() {
        return db.promise().query('SELECT * FROM dueno');
    }

    static getById(id) {
        return db.promise().query('SELECT * FROM dueno WHERE idCliente = ?', [id]);
    }

    static create({ NombreCliente, ComidaFavorita, DescuentoNavideno }) {
        return db.promise().query(
            'INSERT INTO dueno (NombreCliente, ComidaFavorita, DescuentoNavideno) VALUES (?, ?, ?)',
            [NombreCliente, ComidaFavorita, DescuentoNavideno]
        );
    }

    static update(id, { NombreCliente, ComidaFavorita, DescuentoNavideno }) {
        return db.promise().query(
            'UPDATE dueno SET NombreCliente = ?, ComidaFavorita = ?, DescuentoNavideno = ? WHERE idCliente = ?',
            [NombreCliente, ComidaFavorita, DescuentoNavideno, id]
        );
    }

    static delete(id) {
        return db.promise().query('DELETE FROM dueno WHERE idCliente = ?', [id]);
    }
}


// PAGINACION
// Método para obtener los registros con un límite fijo y desplazamiento

export const getAllPaginated = async (limit, offset) => {
    const query = `
        SELECT * FROM duenos
        LIMIT ? OFFSET ?;
    `;
    const [results] = await db.execute(query, [limit, offset]);
    return results;
};




export default Dueno;
