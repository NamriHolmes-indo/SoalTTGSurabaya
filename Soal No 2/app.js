const express = require ('express');
const mysql = require ('mysql2');
const bodyParser = require ('body-parser');

const app = express ();
const port = 3000;

app.use (bodyParser.json ());

const db = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ttgsurabaya',
});

db.connect (err => {
  if (err) {
    console.error ('Koneksi ke database gagal:', err);
    return;
  }
  console.log ('Terhubung ke database MySQL');
});

app.use ((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.is ('application/json')) {
      return res.status (400).json ({error: 'Format data harus JSON'});
    }
  }
  next ();
});

app.post ('/pengguna', (req, res) => {
  const {id_pengguna, nama_lengkap, password} = req.body;

  db.query (
    'SELECT * FROM pengguna WHERE id_pengguna = ?',
    [id_pengguna],
    (err, results) => {
      if (err) {
        return res.status (500).json ({error: 'Terjadi kesalahan'});
      }

      if (results.length > 0) {
        return res.status (400).json ({error: 'Email sudah ada'});
      }

      db.query (
        'INSERT INTO pengguna (id_pengguna, nama_lengkap, password) VALUES (?, ?, ?)',
        [id_pengguna, nama_lengkap, password],
        (err, results) => {
          if (err) {
            return res
              .status (500)
              .json ({error: 'Terjadi kesalahan saat menambahkan data'});
          }
          res.status (201).json ({message: 'Data berhasil ditambahkan'});
        }
      );
    }
  );
});

app.get ('/pengguna', (req, res) => {
  db.query ('SELECT * FROM pengguna', (err, results) => {
    if (err) {
      return res.status (500).json ({error: 'Terjadi kesalahan'});
    }
    res.json (results);
  });
});

app.get ('/pengguna/:email', (req, res) => {
  const email = req.params.email;
  db.query (
    'SELECT * FROM pengguna WHERE id_pengguna = ?',
    [email],
    (err, results) => {
      if (err) {
        return res.status (500).json ({error: 'Terjadi kesalahan'});
      }
      if (results.length === 0) {
        return res.status (404).json ({error: 'Data tidak ditemukan'});
      }
      res.json (results[0]);
    }
  );
});

app.delete ('/pengguna/:email', (req, res) => {
  const email = req.params.email;
  db.query (
    'DELETE FROM pengguna WHERE id_pengguna = ?',
    [email],
    (err, results) => {
      if (err) {
        return res.status (500).json ({error: 'Terjadi kesalahan'});
      }
      if (results.affectedRows === 0) {
        return res.status (404).json ({error: 'Data tidak ditemukan'});
      }
      res.json ({message: 'Data berhasil dihapus'});
    }
  );
});

app.listen (port, () => {});
