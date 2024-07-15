import Barang from "./barang/page";
import Transaksi from "./transaksi/page";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Barang />
      <Transaksi />
    </div>
  );
}
