const express = require('express');
const router = express.Router();
const db = require('../config/db');

// CREATE (POST) Penulis
router.post('/', (req, res) => {
  const { Nama_Penulis, Negara_Asal } = req.body;
  const sql = 'INSERT INTO Penulis (Nama_Penulis, Negara_Asal) VALUES (?, ?)';
  db.query(sql, [Nama_Penulis, Negara_Asal], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menambahkan penulis.');
    } else {
      res.status(201).json({ message: 'Penulis telah ditambahkan.' });
    }
  });
});

// READ (GET) All Penulis
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM Penulis';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat mengambil data penulis.');
    } else {
      res.status(200).json(results);
    }
  });
});


// READ (GET) Penulis by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Penulis WHERE ID_Penulis = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan saat mencari penulis.');
      } else if (result.length === 0) {
        res.status(404).send('Penulis tidak ditemukan.');
      } else {
        res.status(200).json(result[0]);
      }
    });
  });
  

// UPDATE (PUT) Penulis by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Nama_Penulis, Negara_Asal } = req.body;
  const sql = 'UPDATE Penulis SET Nama_Penulis=?, Negara_Asal=? WHERE ID_Penulis=?';
  db.query(sql, [Nama_Penulis, Negara_Asal, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat memperbarui penulis.');
    } else {
      res.status(200).json({ message: 'Penulis telah diperbarui.' });
    }
  });
});

// DELETE Penulis by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Penulis WHERE ID_Penulis=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menghapus penulis.');
    } else {
      res.status(200).json({ message: 'Penulis telah dihapus.' });
    }
  });
});

module.exports = router;
