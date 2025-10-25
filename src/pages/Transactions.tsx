import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Transactions = () => {
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    keterangan: "",
    kategori: "",
    jenis: "",
    nominal: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.tanggal || !formData.keterangan || !formData.kategori || !formData.jenis || !formData.nominal) {
      toast({
        title: "Error",
        description: "Semua field harus diisi!",
        variant: "destructive",
      });
      return;
    }

    // Here would be the database insertion
    toast({
      title: "Berhasil",
      description: "Transaksi berhasil ditambahkan!",
    });

    // Reset form
    setFormData({
      tanggal: new Date().toISOString().split('T')[0],
      keterangan: "",
      kategori: "",
      jenis: "",
      nominal: "",
    });
  };

  const kategoris = ["Penjualan", "Pembelian", "Gaji", "Operasional", "Lainnya"];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="gradient-primary text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Transaksi</h1>
          <p className="text-sm opacity-90">Tambah dan kelola transaksi</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 -mt-8">
        <Card className="p-6 shadow-lg animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <Plus className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Tambah Transaksi Baru</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Tanggal */}
            <div className="space-y-2">
              <Label htmlFor="tanggal" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Tanggal
              </Label>
              <Input
                id="tanggal"
                type="date"
                value={formData.tanggal}
                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Keterangan */}
            <div className="space-y-2">
              <Label htmlFor="keterangan">Keterangan</Label>
              <Input
                id="keterangan"
                type="text"
                placeholder="Contoh: Penjualan Produk A"
                value={formData.keterangan}
                onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Kategori */}
            <div className="space-y-2">
              <Label htmlFor="kategori">Kategori</Label>
              <Select
                value={formData.kategori}
                onValueChange={(value) => setFormData({ ...formData, kategori: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {kategoris.map((kategori) => (
                    <SelectItem key={kategori} value={kategori}>
                      {kategori}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Jenis */}
            <div className="space-y-2">
              <Label htmlFor="jenis">Jenis Transaksi</Label>
              <Select
                value={formData.jenis}
                onValueChange={(value) => setFormData({ ...formData, jenis: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Debet">
                    <span className="text-success font-medium">Debet (Pemasukan)</span>
                  </SelectItem>
                  <SelectItem value="Kredit">
                    <span className="text-destructive font-medium">Kredit (Pengeluaran)</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nominal */}
            <div className="space-y-2">
              <Label htmlFor="nominal">Nominal (Rp)</Label>
              <Input
                id="nominal"
                type="number"
                placeholder="0"
                value={formData.nominal}
                onChange={(e) => setFormData({ ...formData, nominal: e.target.value })}
                className="w-full"
                min="0"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold gradient-primary border-0"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Simpan Transaksi
            </Button>
          </form>
        </Card>

        {/* Transaction History Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Riwayat Transaksi</h3>
          <Card className="p-4 text-center text-muted-foreground">
            <p>Belum ada transaksi. Mulai tambahkan transaksi pertama Anda!</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
