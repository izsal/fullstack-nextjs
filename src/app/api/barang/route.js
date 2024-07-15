import { db } from "@/lib/db";

export async function GET() {
  const result = await db.query("SELECT * FROM Barang");
  return new Response(JSON.stringify(result.rows), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const { nama_barang, stok, jenis_barang } = await request.json();
  const result = await db.query(
    "INSERT INTO Barang (nama_barang, stok, jenis_barang) VALUES ($1, $2, $3) RETURNING *",
    [nama_barang, stok, jenis_barang]
  );
  return new Response(JSON.stringify(result.rows[0]), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request) {
  const { id, nama_barang, stok, jenis_barang } = await request.json();
  const result = await db.query(
    "UPDATE Barang SET nama_barang = $1, stok = $2, jenis_barang = $3 WHERE id = $4 RETURNING *",
    [nama_barang, stok, jenis_barang, id]
  );
  return new Response(JSON.stringify(result.rows[0]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request) {
  const { id } = await request.json();
  await db.query("DELETE FROM Barang WHERE id = $1", [id]);
  return new Response(null, {
    status: 204,
  });
}
