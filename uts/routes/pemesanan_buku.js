const express = require('express');
const router = express.Router();
const db = require('../config/db');

// CREATE (POST) Pemesanan_Buku
router.post('/', (req, res) => {
  const { ID_Buku, Jumlah_Pesan, Tanggal_Pesan } = req.body;
  const sql = 'INSERT INTO Pemesanan_Buku (ID_Buku, Jumlah_Pesan, Tanggal_Pesan) VALUES (?, ?, ?)';
  db.query(sql, [ID_Buku, Jumlah_Pesan, Tanggal_Pesan], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menambahkan pemesanan buku.');
    } else {
      res.status(201).json({ message: 'Pemesanan buku telah ditambahkan.' });
    }
  });
});

// READ (GET) All Pemesanan_Buku



router.get('/', (req, res) => {
    const sql = 'SELECT Pemesanan_Buku.ID_Pemesanan, Buku.Judul_Buku AS Nama_Buku, Pemesanan_Buku.Jumlah_Pesan, DATE_FORMAT(Pemesanan_Buku.Tanggal_Pesan, "%Y-%m-%d") AS Tanggal_Pesan FROM Pemesanan_Buku JOIN Buku ON Pemesanan_Buku.ID_Buku = Buku.ID_Buku';
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan saat mengambil data pemesanan buku.');
      } else {
        const formattedResults = results.map((result) => ({
          "ID_Pemesanan": result.ID_Pemesanan,
          "Nama_Buku": result.Nama_Buku,
          "Jumlah_Pesan": result.Jumlah_Pesan,
          "Tanggal_Pesan": result.Tanggal_Pesan
        }));
        res.status(200).json(formattedResults);
      }
    });
  });
  
  
  // GET Pemesanan_Buku by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT Pemesanan_Buku.ID_Pemesanan, Buku.Judul_Buku AS Nama_Buku, Pemesanan_Buku.Jumlah_Pesan, DATE_FORMAT(Pemesanan_Buku.Tanggal_Pesan, "%Y-%m-%d") AS Tanggal_Pesan FROM Pemesanan_Buku JOIN Buku ON Pemesanan_Buku.ID_Buku = Buku.ID_Buku WHERE Pemesanan_Buku.ID_Pemesanan = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan saat mengambil data pemesanan buku.');
      } else {
        if (result.length > 0) {
          const formattedResult = {
            "ID_Pemesanan": result[0].ID_Pemesanan,
            "Nama_Buku": result[0].Nama_Buku,
            "Jumlah_Pesan": result[0].Jumlah_Pesan,
            "Tanggal_Pesan": result[0].Tanggal_Pesan
          };
          res.status(200).json(formattedResult);
        } else {
          res.status(404).send('Pemesanan buku tidak ditemukan.');
        }
      }
    });
  });
  

// UPDATE (PUT) Pemesanan_Buku by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { ID_Buku, Jumlah_Pesan, Tanggal_Pesan } = req.body;
  const sql = 'UPDATE Pemesanan_Buku SET ID_Buku=?, Jumlah_Pesan=?, Tanggal_Pesan=? WHERE ID_Pemesanan=?';
  db.query(sql, [ID_Buku, Jumlah_Pesan, Tanggal_Pesan, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat memperbarui pemesanan buku.');
    } else {
      res.status(200).json({ message: 'Pemesanan buku telah diperbarui.' });
    }
  });
});

// DELETE Pemesanan_Buku by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Pemesanan_Buku WHERE ID_Pemesanan=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menghapus pemesanan buku.');
    } else {
      res.status(200).json({ message: 'Pemesanan buku telah dihapus.' });
    }
  });
});

module.exports = router;
