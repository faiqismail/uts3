const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
const penulisRoutes = require('./routes/penulis');
const penerbitRoutes = require('./routes/penerbit');
const bukuRoutes = require('./routes/buku');
const kategoriBukuRoutes = require('./routes/kategori_buku');
const bukuKategoriRoutes = require('./routes/buku_kategori');
const ulasanBukuRoutes = require('./routes/ulasan_buku');
const pemesananBukuRoutes = require('./routes/pemesanan_buku');

// Use routes
app.use('/penulis', penulisRoutes);
app.use('/penerbit', penerbitRoutes);
app.use('/buku', bukuRoutes);
app.use('/kategori_buku', kategoriBukuRoutes);
app.use('/buku_kategori', bukuKategoriRoutes);
app.use('/ulasan_buku', ulasanBukuRoutes);
app.use('/pemesanan_buku', pemesananBukuRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
