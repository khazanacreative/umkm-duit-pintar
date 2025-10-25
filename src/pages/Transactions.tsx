import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Transactions = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    keterangan: "",
    kategori: "",
    jenis: "",
    nominal: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tanggal || !formData.keterangan || !formData.kategori || !formData.jenis || !formData.nominal) {
      toast({
        title: "Error",
        description: "Semua field harus diisi!",
        variant: "destructive",
      });
      return;
    }

    if (!userRole?.branch_id) {
      toast({
        title: "Error",
        description: "Anda belum terdaftar di cabang manapun!",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("transaksi").insert({
      branch_id: userRole.branch_id,
      user_id: user?.id,
      tanggal: formData.tanggal,
      keterangan: formData.keterangan,
      kategori: formData.kategori,
      jenis: formData.jenis,
      nominal: parseFloat(formData.nominal),
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Berhasil",
      description: "Transaksi berhasil ditambahkan!",
    });

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
    <div className="min-h-screen bg-background pb-20 z-0">
      <Header 
        title="Transaksi" 
        subtitle="Tambah dan kelola transaksi"
      />

      <main className="max-w-screen-xl mx-auto px-4 -mt-16">
        <Card className="p-6 shadow-lg animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <Plus className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Tambah Transaksi Baru</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
