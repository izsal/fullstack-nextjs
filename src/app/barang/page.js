"use client";
import { useEffect, useState } from "react";

function Barang() {
  const [barangs, setBarangs] = useState([]);
  const [nama_barang, setNamaBarang] = useState("");
  const [stok, setStok] = useState("");
  const [jenis_barang, setJenisBarang] = useState("");
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingBarang, setEditingBarang] = useState(null);

  useEffect(() => {
    fetch("/api/barang")
      .then((res) => res.json())
      .then((data) => setBarangs(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/barang", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_barang, stok, jenis_barang }),
    });
    // Refresh data
    fetch("/api/barang")
      .then((res) => res.json())
      .then((data) => setBarangs(data));
  };

  const updateBarang = async (id, updatedBarang) => {
    await fetch("/api/barang", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...updatedBarang, id }),
    });
    fetch("/api/barang")
      .then((res) => res.json())
      .then((data) => setBarangs(data));
    setIsEditing(false);
  };

  const deleteBarang = async (id) => {
    await fetch("/api/barang", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetch("/api/barang")
      .then((res) => res.json())
      .then((data) => setBarangs(data));
  };

  const openEditModal = (barang) => {
    setEditingBarang(barang);
    setIsEditing(true);
  };

  const filteredBarangs = barangs.filter((barang) =>
    barang.nama_barang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mb-8">
      <div className="shadow-sm border p-4 rounded">
        <h1 className="text-2xl font-bold mb-4">Data Barang</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            value={nama_barang}
            onChange={(e) => setNamaBarang(e.target.value)}
            placeholder="Nama Barang"
            className="border p-2 rounded mr-2"
          />
          <input
            type="number"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
            placeholder="Stok"
            className="border p-2 rounded mr-2"
          />
          <input
            value={jenis_barang}
            onChange={(e) => setJenisBarang(e.target.value)}
            placeholder="Jenis Barang"
            className="border p-2 rounded mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Tambah Barang
          </button>
        </form>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari Barang"
          className="border p-2 rounded mb-4"
        />
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Nama Barang</th>
              <th className="py-2 px-4 border">Stok</th>
              <th className="py-2 px-4 border">Jenis Barang</th>
            </tr>
          </thead>
          <tbody>
            {filteredBarangs.map((barang) => (
              <tr key={barang.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{barang.nama_barang}</td>
                <td className="py-2 px-4 border">{barang.stok}</td>
                <td className="py-2 px-4 border">{barang.jenis_barang}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => openEditModal(barang)}
                    className="bg-yellow-500 text-white p-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBarang(barang.id)}
                    className="bg-red-500 text-white p-1 rounded ml-2"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal untuk Edit Barang */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-bold">Edit Barang</h2>
              <input
                value={editingBarang.nama_barang}
                onChange={(e) =>
                  setEditingBarang({
                    ...editingBarang,
                    nama_barang: e.target.value,
                  })
                }
                placeholder="Nama Barang"
                className="border p-2 rounded mb-2 w-full"
              />
              <input
                type="number"
                value={editingBarang.stok}
                onChange={(e) =>
                  setEditingBarang({ ...editingBarang, stok: e.target.value })
                }
                placeholder="Stok"
                className="border p-2 rounded mb-2 w-full"
              />
              <input
                value={editingBarang.jenis_barang}
                onChange={(e) =>
                  setEditingBarang({
                    ...editingBarang,
                    jenis_barang: e.target.value,
                  })
                }
                placeholder="Jenis Barang"
                className="border p-2 rounded mb-2 w-full"
              />
              <button
                onClick={() => updateBarang(editingBarang.id, editingBarang)}
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
    </div>
  );
}

export default Barang;
