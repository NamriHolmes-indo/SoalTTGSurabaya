"# SoalTTGSurabaya" 

Keterangan endpoint:

untuk GET semua data, bisa menggunakan endpoint /pengguna

untuk GET berdasarkan ID, disini ID nya menggunakan email, endpoint nya adalah /pengguna/{email yang ingin dicari}

untuk menambahkan data sendiri, harus format json, dengan endpoint /pengguna di metode POST dengan format adalah:

{
  "id_pengguna": "emailcontoh@example.com",
  "nama_lengkap": "Nama Contoh",
  "password": "passContoh#456"
}


dan untuk menghapus, dengan endpoint nya adalah /pengguna/{email yang ingin dihapus} dengan method DELETE
