const express = require('express');
const router = express.Router();
const db = require('../config/db');

// CREATE (POST) Ulasan_Buku
router.post('/', (req, res) => {
  const { ID_Buku, Nama_Pengulas, Ulasan_Teks, Skor_Ulasan } = req.body;
  const sql = 'INSERT INTO Ulasan_Buku (ID_Buku, Nama_Pengulas, Ulasan_Teks, Skor_Ulasan) VALUES (?, ?, ?, ?)';
  db.query(sql, [ID_Buku, Nama_Pengulas, Ulasan_Teks, Skor_Ulasan], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menambahkan ulasan buku.');
    } else {
      res.status(201).json({ message: 'Ulasan buku telah ditambahkan.' });
    }
  });
});

// READ (GET) All Ulasan_Buku
router.get('/', (req, res) => {
    const sql = 'SELECT Ulasan_Buku.ID_Ulasan, Buku.Judul_Buku, Ulasan_Buku.Nama_Pengulas, Ulasan_Buku.Ulasan_Teks, Ulasan_Buku.Skor_Ulasan FROM Ulasan_Buku JOIN Buku ON Ulasan_Buku.ID_Buku = Buku.ID_Buku';
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan saat mengambil data ulasan buku.');
      } else {
        const formattedResults = results.map((result) => ({
          "ID_Ulasan": result.ID_Ulasan,
          "Judul_Buku": result.Judul_Buku,
          "Nama_Pengulas": result.Nama_Pengulas,
          "Ulasan_Teks": result.Ulasan_Teks,
          "Skor_Ulasan": result.Skor_Ulasan
        }));
        res.status(200).json(formattedResults);
      }
    });
  });
  // Mengganti endpoint GET / menjadi GET /:id
router.get('/:id', (req, res) => {
    const { id } = req.params; // Mendapatkan ID dari parameter URL
    const sql = 'SELECT Ulasan_Buku.ID_Ulasan, Buku.Judul_Buku, Ulasan_Buku.Nama_Pengulas, Ulasan_Buku.Ulasan_Teks, Ulasan_Buku.Skor_Ulasan FROM Ulasan_Buku JOIN Buku ON Ulasan_Buku.ID_Buku = Buku.ID_Buku WHERE Ulasan_Buku.ID_Ulasan = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan saat mengambil data ulasan buku.');
      } else {
        if (result.length === 0) {
          // Jika tidak ada hasil dengan ID yang diberikan
          res.status(404).send('Ulasan buku dengan ID tersebut tidak ditemukan.');
        } else {
          const formattedResult = {
            "ID_Ulasan": result[0].ID_Ulasan,
            "Judul_Buku": result[0].Judul_Buku,
            "Nama_Pengulas": result[0].Nama_Pengulas,
            "Ulasan_Teks": result[0].Ulasan_Teks,
            "Skor_Ulasan": result[0].Skor_Ulasan
          };
          res.status(200).json(formattedResult);
        }
      }
    });
  });
  

// UPDATE (PUT) Ulasan_Buku by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { ID_Buku, Nama_Pengulas, Ulasan_Teks, Skor_Ulasan } = req.body;
  const sql = 'UPDATE Ulasan_Buku SET ID_Buku=?, Nama_Pengulas=?, Ulasan_Teks=?, Skor_Ulasan=? WHERE ID_Ulasan=?';
  db.query(sql, [ID_Buku, Nama_Pengulas, Ulasan_Teks, Skor_Ulasan, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat memperbarui ulasan buku.');
    } else {
      res.status(200).json({ message: 'Ulasan buku telah diperbarui.' });
    }
  });
});

// DELETE Ulasan_Buku by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Ulasan_Buku WHERE ID_Ulasan=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menghapus ulasan buku.');
    } else {
      res.status(200).json({ message: 'Ulasan buku telah dihapus.' });
    }
  });
});

module.exports = router;
