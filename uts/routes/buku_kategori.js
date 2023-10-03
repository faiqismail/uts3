const express = require('express');
const router = express.Router();
const db = require('../config/db');

// CREATE (POST) Buku_Kategori
router.post('/', (req, res) => {
  const { ID_Buku, ID_Kategori } = req.body;
  const sql = 'INSERT INTO Buku_Kategori (ID_Buku, ID_Kategori) VALUES (?, ?)';
  db.query(sql, [ID_Buku, ID_Kategori], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menambahkan relasi buku kategori.');
    } else {
      res.status(201).json({ message: 'Relasi buku kategori telah ditambahkan.' });
    }
  });
});

// READ (GET) All Buku_Kategori with Nama_Buku and Nama_Kategori
router.get('/', (req, res) => {
    const sql = 'SELECT Buku_Kategori.ID_Buku_Kategori, Buku.Judul_Buku AS Nama_Buku, Kategori_Buku.Nama_Kategori AS Nama_Kategori FROM Buku_Kategori JOIN Buku ON Buku_Kategori.ID_Buku = Buku.ID_Buku JOIN Kategori_Buku ON Buku_Kategori.ID_Kategori = Kategori_Buku.ID_Kategori';
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan saat mengambil data relasi buku kategori.');
      } else {
        res.status(200).json(results);
      }
    });
  });
// READ (GET) Buku_Kategori by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT Buku_Kategori.ID_Buku_Kategori, Buku.Judul_Buku AS Nama_Buku, Kategori_Buku.Nama_Kategori AS Nama_Kategori FROM Buku_Kategori JOIN Buku ON Buku_Kategori.ID_Buku = Buku.ID_Buku JOIN Kategori_Buku ON Buku_Kategori.ID_Kategori = Kategori_Buku.ID_Kategori WHERE Buku_Kategori.ID_Buku_Kategori = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan saat mencari relasi buku kategori.');
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).send('Relasi buku kategori tidak ditemukan.');
        }
      }
    });
  });
    
// UPDATE (PUT) Buku_Kategori by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { ID_Buku, ID_Kategori } = req.body;
  const sql = 'UPDATE Buku_Kategori SET ID_Buku=?, ID_Kategori=? WHERE ID_Buku_Kategori=?';
  db.query(sql, [ID_Buku, ID_Kategori, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat memperbarui relasi buku kategori.');
    } else {
      res.status(200).json({ message: 'Relasi buku kategori telah diperbarui.' });
    }
  });
});

// DELETE Buku_Kategori by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Buku_Kategori WHERE ID_Buku_Kategori=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menghapus relasi buku kategori.');
    } else {
      res.status(200).json({ message: 'Relasi buku kategori telah dihapus.' });
    }
  });
});

module.exports = router;
