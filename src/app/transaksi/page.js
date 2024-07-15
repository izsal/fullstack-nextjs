"use client";
import { useEffect, useState } from "react";

function Transaksi() {
  const [transaksis, setTransaksis] = useState([]);
  const [barang_id, setBarangId] = useState("");
  const [barangs, setBarangs] = useState([]);
  const [jumlah_terjual, setJumlahTerjual] = useState("");
  const [tanggal_transaksi, setTanggalTransaksi] = useState("");
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTransaksi, setEditingTransaksi] = useState(null);

  useEffect(() => {
    // ambil data transaksi
    fetch("/api/transaksi")
      .then((res) => res.json())
      .then((data) => setTransaksis(data));

    // Ambil data barang
    fetch("/api/barang")
      .then((res) => res.json())
      .then((data) => setBarangs(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/transaksi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barang_id, jumlah_terjual, tanggal_transaksi }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      fetch("/api/transaksi")
        .then((res) => res.json())
        .then((data) => setTransaksis(data));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateTransaksi = async (id, updatedTransaksi) => {
    await fetch("/api/transaksi", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...updatedTransaksi, id }),
    });
    fetch("/api/transaksi")
      .then((res) => res.json())
      .then((data) => setTransaksis(data));
    setIsEditing(false);
  };

  const deleteTransaksi = async (id) => {
    await fetch("/api/transaksi", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetch("/api/transaksi")
      .then((res) => res.json())
      .then((data) => setTransaksis(data));
  };

  const openEditModal = (transaksi) => {
    setEditingTransaksi(transaksi);
    setIsEditing(true);
  };

  const filteredTransaksis = transaksis.filter((transaksi) =>
    transaksi.barang_id.toString().includes(search)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Transaksi</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <select
          value={barang_id}
          onChange={(e) => setBarangId(e.target.value)}
          className="border p-2 rounded mr-2"
        >
          <option value="">Pilih Barang</option>
          {barangs.map((barang) => (
            <option key={barang.id} value={barang.id}>
              {barang.nama_barang}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={jumlah_terjual}
          onChange={(e) => setJumlahTerjual(e.target.value)}
          placeholder="Jumlah Terjual"
          className="border p-2 rounded mr-2"
        />
        <input
          type="date"
          value={tanggal_transaksi}
          onChange={(e) => setTanggalTransaksi(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Tambah Transaksi
        </button>
      </form>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari ID Barang"
        className="border p-2 rounded mb-4"
      />
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID Barang</th>
            <th className="py-2 px-4 border">Jumlah Terjual</th>
            <th className="py-2 px-4 border">Tanggal Transaksi</th>
            <th className="py-2 px-4 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransaksis.map((transaksi) => (
            <tr key={transaksi.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{transaksi.barang_id}</td>
              <td className="py-2 px-4 border">{transaksi.jumlah_terjual}</td>
              <td className="py-2 px-4 border">
                {transaksi.tanggal_transaksi}
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => openEditModal(transaksi)}
                  className="bg-yellow-500 text-white p-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTransaksi(transaksi.id)}
                  className="bg-red-500 text-white p-1 rounded ml-2"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal untuk Edit Transaksi */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Edit Transaksi</h2>
            <select
              value={editingTransaksi.barang_id}
              onChange={(e) =>
                setEditingTransaksi({
                  ...editingTransaksi,
                  barang_id: e.target.value,
                })
              }
              className="border p-2 rounded mb-2 w-full"
            >
              <option value="">Pilih Barang</option>
              {barangs.map((barang) => (
                <option key={barang.id} value={barang.id}>
                  {barang.nama_barang}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={editingTransaksi.jumlah_terjual}
              onChange={(e) =>
                setEditingTransaksi({
                  ...editingTransaksi,
                  jumlah_terjual: e.target.value,
                })
              }
              placeholder="Jumlah Terjual"
              className="border p-2 rounded mb-2 w-full"
            />
            <input
              type="date"
              value={editingTransaksi.tanggal_transaksi}
              onChange={(e) =>
                setEditingTransaksi({
                  ...editingTransaksi,
                  tanggal_transaksi: e.target.value,
                })
              }
              className="border p-2 rounded mb-2 w-full"
            />
            <button
              onClick={() =>
                updateTransaksi(editingTransaksi.id, editingTransaksi)
              }
              className="bg-blue-500 text-white p-2 rounded"
            >
              Simpan
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-red-500 text-white p-2 rounded ml-2"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transaksi;
