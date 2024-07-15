import { db } from "@/lib/db";

export async function GET() {
  const result = await db.query("SELECT * FROM Transaksi");
  return new Response(JSON.stringify(result.rows), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const { barang_id, jumlah_terjual, tanggal_transaksi } = await request.json();
  const result = await db.query(
    "INSERT INTO Transaksi (barang_id, jumlah_terjual, tanggal_transaksi) VALUES ($1, $2, $3) RETURNING *",
    [barang_id, jumlah_terjual, tanggal_transaksi]
  );
  return new Response(JSON.stringify(result.rows[0]), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request) {
  const { id, barang_id, jumlah_terjual, tanggal_transaksi } =
    await request.json();
  const result = await db.query(
    "UPDATE Transaksi SET barang_id = $1, jumlah_terjual = $2, tanggal_transaksi = $3 WHERE id = $4 RETURNING *",
    [barang_id, jumlah_terjual, tanggal_transaksi, id]
  );
  return new Response(JSON.stringify(result.rows[0]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request) {
  const { id } = await request.json();
  await db.query("DELETE FROM Transaksi WHERE id = $1", [id]);
  return new Response(null, {
    status: 204,
  });
}
