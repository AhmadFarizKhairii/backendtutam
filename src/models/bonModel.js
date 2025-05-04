const pool = require('../config/db');

class BonModel {
    // Create Bon
    async createBon({ name, storeName, itemName, itemPrice, date, ownerName }) {
        try {
            const result = await pool.query(
                'INSERT INTO bons (name, store_name, item_name, item_price, date, owner_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [name, storeName, itemName, itemPrice, date, ownerName]
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error creating bon:', err.message);
            throw err;
        }
    }

    // Get All Bons
    async getBons() {
        try {
            const result = await pool.query('SELECT * FROM bons ORDER BY created_at DESC');
            return result.rows;
        } catch (err) {
            console.error('Error fetching bons:', err.message);
            throw err;
        }
    }

    // Get Total Bon per Person
    async getTotalBon() {
        try {
            const result = await pool.query(
                'SELECT name, SUM(item_price) AS total_amount FROM bons GROUP BY name ORDER BY total_amount DESC'
            );
            return result.rows;
        } catch (err) {
            console.error('Error fetching total bon:', err.message);
            throw err;
        }
    }

    // Delete Bon
    async deleteBon(id) {
        try {
            const result = await pool.query('DELETE FROM bons WHERE id = $1 RETURNING *', [id]);
            return result.rowCount > 0 ? result.rows[0] : null;
        } catch (err) {
            console.error('Error deleting bon:', err.message);
            throw err;
        }
    }
}

module.exports = new BonModel();