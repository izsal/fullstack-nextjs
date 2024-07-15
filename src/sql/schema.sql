CREATE TABLE Barang (
    id SERIAL PRIMARY KEY,
    nama_barang VARCHAR(50) NOT NULL,
    stok INT NOT NULL,
    jenis_barang VARCHAR(50) NOT NULL
);

CREATE TABLE Transaksi (
    id SERIAL PRIMARY KEY,
    barang_id INT NOT NULL,
    jumlah_terjual INT NOT NULL,
    tanggal_transaksi DATE NOT NULL,
    FOREIGN KEY (barang_id) REFERENCES Barang(id)
);