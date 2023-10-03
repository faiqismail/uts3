const express = require('express');
const router = express.Router();
const db = require('../config/db');

// CREATE (POST) Buku
router.post('/', (req, res) => {
  const { Judul_Buku, Tahun_Terbit, ID_Penulis, ID_Penerbit } = req.body;
  const sql = 'INSERT INTO Buku (Judul_Buku, Tahun_Terbit, ID_Penulis, ID_Penerbit) VALUES (?, ?, ?, ?)';
  db.query(sql, [Judul_Buku, Tahun_Terbit, ID_Penulis, ID_Penerbit], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menambahkan buku.');
    } else {
      res.status(201).json({ message: 'Buku telah ditambahkan.' });
    }
  });
});


// READ (GET) All Buku with Nama Penulis dan Nama Penerbit
router.get('/', (req, res) => {
    const sql = 'SELECT Buku.ID_Buku, Buku.Judul_Buku, Buku.Tahun_Terbit, Penulis.Nama_Penulis, Penerbit.Nama_Penerbit FROM Buku JOIN Penulis ON Buku.ID_Penulis = Penulis.ID_Penulis JOIN Penerbit ON Buku.ID_Penerbit = Penerbit.ID_Penerbit';
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan saat mengambil data buku.');
      } else {
        const formattedResults = results.map((result) => ({
          "ID_Buku": result.ID_Buku,
          "Judul_Buku": result.Judul_Buku,
          "Tahun_Terbit": result.Tahun_Terbit,
          "Nama_Penulis": result.Nama_Penulis,
          "Nama_Penerbit": result.Nama_Penerbit
        }));
        res.status(200).json(formattedResults);
      }
    });
  });
  
  

// READ (GET) Buku by ID_Buku
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT Buku.*, Penulis.Nama_Penulis, Penerbit.Nama_Penerbit FROM Buku JOIN Penulis ON Buku.ID_Penulis = Penulis.ID_Penulis JOIN Penerbit ON Buku.ID_Penerbit = Penerbit.ID_Penerbit WHERE Buku.ID_Buku = ?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan saat mencari buku.');
      } else if (results.length === 0) {
        res.status(404).send('Buku tidak ditemukan.');
      } else {
        const bukuData = results[0];
        const bukuJSON = {
          "ID_Buku": bukuData.ID_Buku,
          "Judul_Buku": bukuData.Judul_Buku,
          "Tahun_Terbit": bukuData.Tahun_Terbit,
          "Nama_Penulis": bukuData.Nama_Penulis,
          "Nama_Penerbit": bukuData.Nama_Penerbit
        };
        res.status(200).json(bukuJSON);
      }
    });
  });
  
// UPDATE (PUT) Buku by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Judul_Buku, Tahun_Terbit, ID_Penulis, ID_Penerbit } = req.body;
  const sql = 'UPDATE Buku SET Judul_Buku=?, Tahun_Terbit=?, ID_Penulis=?, ID_Penerbit=? WHERE ID_Buku=?';
  db.query(sql, [Judul_Buku, Tahun_Terbit, ID_Penulis, ID_Penerbit, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat memperbarui buku.');
    } else {
      res.status(200).json({ message: 'Buku telah diperbarui.' });
    }
  });
});

// DELETE Buku by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Buku WHERE ID_Buku=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menghapus buku.');
    } else {
      res.status(200).json({ message: 'Buku telah dihapus.' });
    }
  });
});

module.exports = router;
