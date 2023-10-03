const express = require('express');
const router = express.Router();
const db = require('../config/db');

// CREATE (POST) Penerbit
router.post('/', (req, res) => {
  const { Nama_Penerbit, Alamat_Penerbit } = req.body;
  const sql = 'INSERT INTO Penerbit (Nama_Penerbit, Alamat_Penerbit) VALUES (?, ?)';
  db.query(sql, [Nama_Penerbit, Alamat_Penerbit], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menambahkan penerbit.');
    } else {
      res.status(201).json({ message: 'Penerbit telah ditambahkan.' });
    }
  });
});

// READ (GET) All Penerbit
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM Penerbit';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat mengambil data penerbit.');
    } else {
      res.status(200).json(results);
    }
  });
});

// READ (GET) Penerbit by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Penerbit WHERE ID_Penerbit = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan saat mencari penerbit.');
      } else if (result.length === 0) {
        res.status(404).send('Penerbit tidak ditemukan.');
      } else {
        res.status(200).json(result[0]);
      }
    });
  });
  

// UPDATE (PUT) Penerbit by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Nama_Penerbit, Alamat_Penerbit } = req.body;
  const sql = 'UPDATE Penerbit SET Nama_Penerbit=?, Alamat_Penerbit=? WHERE ID_Penerbit=?';
  db.query(sql, [Nama_Penerbit, Alamat_Penerbit, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat memperbarui penerbit.');
    } else {
      res.status(200).json({ message: 'Penerbit telah diperbarui.' });
    }
  });
});

// DELETE Penerbit by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Penerbit WHERE ID_Penerbit=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menghapus penerbit.');
    } else {
      res.status(200).json({ message: 'Penerbit telah dihapus.' });
    }
  });
});

module.exports = router;
