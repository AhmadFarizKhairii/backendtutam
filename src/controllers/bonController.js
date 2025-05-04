const pool = require('../config/db');

class BonController {
    // Create Bon
    async createBon(req, res) {
        try {
            const { name, storeName, itemName, itemPrice, date, ownerName } = req.body; // Tambahkan itemName
            const result = await pool.query(
                'INSERT INTO bons (name, store_name, item_name, item_price, date, owner_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [name, storeName, itemName, itemPrice, date, ownerName] // Tambahkan itemName ke query
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Error creating bon:', err.message);
            res.status(500).json({ error: err.message });
        }
    }

    // Get All Bons
    async getBons(req, res) {
        try {
            const result = await pool.query('SELECT * FROM bons ORDER BY created_at DESC');
            res.status(200).json(result.rows);
        } catch (err) {
            console.error('Error fetching bons:', err.message);
            res.status(500).json({ error: err.message });
        }
    }

    // Get Total Bon per Person
    async getTotalBon(req, res) {
        try {
            const result = await pool.query(
                'SELECT name, SUM(item_price) AS total_amount FROM bons GROUP BY name ORDER BY total_amount DESC'
            );

            // Tambahkan logika warna berdasarkan total_amount
            const totalsWithColor = result.rows.map((total) => ({
                ...total,
                statusColor:
                    total.total_amount < 1000000
                        ? 'green' // Total kurang dari 1.000.000
                        : total.total_amount <= 5000000
                        ? 'yellow' // Total antara 1.000.000 dan 5.000.000
                        : 'red', // Total lebih dari 5.000.000
            }));

            res.status(200).json(totalsWithColor);
        } catch (err) {
            console.error('Error fetching total bon:', err.message);
            res.status(500).json({ error: err.message });
        }
    }

    // Delete Bon
    async deleteBon(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query('DELETE FROM bons WHERE id = $1 RETURNING *', [id]);
            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'Bon not found' });
            }
            res.status(200).json({ message: 'Bon deleted successfully' });
        } catch (err) {
            console.error('Error deleting bon:', err.message);
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = BonController;