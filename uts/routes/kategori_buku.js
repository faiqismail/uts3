const express = require('express');
const router = express.Router();
const db = require('../config/db');

// CREATE (POST) Kategori_Buku
router.post('/', (req, res) => {
  const { Nama_Kategori } = req.body;
  const sql = 'INSERT INTO Kategori_Buku (Nama_Kategori) VALUES (?)';
  db.query(sql, [Nama_Kategori], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menambahkan kategori buku.');
    } else {
      res.status(201).json({ message: 'Kategori buku telah ditambahkan.' });
    }
  });
});

// READ (GET) All Kategori_Buku
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM Kategori_Buku';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat mengambil data kategori buku.');
    } else {
      res.status(200).json(results);
    }
  });
});

// READ (GET) Kategori_Buku by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Kategori_Buku WHERE ID_Kategori = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan saat mencari kategori buku.');
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).send('Kategori buku tidak ditemukan.');
        }
      }
    });
  });
  

// UPDATE (PUT) Kategori_Buku by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Nama_Kategori } = req.body;
  const sql = 'UPDATE Kategori_Buku SET Nama_Kategori=? WHERE ID_Kategori=?';
  db.query(sql, [Nama_Kategori, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat memperbarui kategori buku.');
    } else {
      res.status(200).json({ message: 'Kategori buku telah diperbarui.' });
    }
  });
});

// DELETE Kategori_Buku by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Kategori_Buku WHERE ID_Kategori=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menghapus kategori buku.');
    } else {
      res.status(200).json({ message: 'Kategori buku telah dihapus.' });
    }
  });
});

module.exports = router;
