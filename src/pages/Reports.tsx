import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3, TrendingUp, TrendingDown, Calendar, Download } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

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
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  // Sample data
  const totalPemasukan = 25000000;
  const totalPengeluaran = 9250000;
  const selisih = totalPemasukan - totalPengeluaran;

  const monthlyData = [
    { bulan: "Jan", pemasukan: 25000000, pengeluaran: 9250000 },
    { bulan: "Des", pemasukan: 22000000, pengeluaran: 8500000 },
    { bulan: "Nov", pemasukan: 20000000, pengeluaran: 7800000 },
  ];

  const kategoriBelanja = [
    { kategori: "Penjualan", jumlah: 25000000, persentase: 100 },
    { kategori: "Pembelian", jumlah: 5000000, persentase: 54 },
    { kategori: "Operasional", jumlah: 2500000, persentase: 27 },
    { kategori: "Gaji", jumlah: 1750000, persentase: 19 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleExport = () => {
    // Placeholder for export functionality
    alert("Fitur export akan segera tersedia!");
  };

  return (
    <div className="min-h-screen bg-background pb-20 z-0">
      <Header 
        title="Laporan" 
        subtitle="Analisis keuangan usaha"
      />

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 -mt-16 z-10">
        {/* Filter Date Range */}
        <Card className="p-5 shadow-lg mb-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Pilih Periode</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-xs">Dari Tanggal</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-xs">Sampai Tanggal</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <Button className="w-full gradient-primary border-0" size="sm">
            Tampilkan Laporan
          </Button>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <p className="text-sm text-muted-foreground">Total Pemasukan</p>
            </div>
            <h3 className="text-xl font-bold text-success">{formatCurrency(totalPemasukan)}</h3>
          </Card>

          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-5 w-5 text-destructive" />
              <p className="text-sm text-muted-foreground">Total Pengeluaran</p>
            </div>
            <h3 className="text-xl font-bold text-destructive">{formatCurrency(totalPengeluaran)}</h3>
          </Card>

          <Card className="p-4 shadow-card gradient-card">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">Selisih</p>
            </div>
            <h3 className={`text-xl font-bold ${selisih >= 0 ? 'text-success' : 'text-destructive'}`}>
              {formatCurrency(selisih)}
            </h3>
          </Card>
        </div>

        {/* Monthly Chart */}
        <Card className="p-5 shadow-lg mb-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Grafik Bulanan
          </h3>
          
          <div className="space-y-4">
            {monthlyData.map((data, index) => {
              const maxValue = Math.max(...monthlyData.map(d => Math.max(d.pemasukan, d.pengeluaran)));
              const pemasukanWidth = (data.pemasukan / maxValue) * 100;
              const pengeluaranWidth = (data.pengeluaran / maxValue) * 100;

              return (
                <div key={index} className="space-y-2">
                  <p className="text-sm font-medium">{data.bulan}</p>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-xs text-muted-foreground">Masuk</div>
                      <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                        <div 
                          className="bg-success h-full flex items-center justify-end pr-2 transition-all"
                          style={{ width: `${pemasukanWidth}%` }}
                        >
                          <span className="text-xs text-white font-medium">
                            {formatCurrency(data.pemasukan)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-20 text-xs text-muted-foreground">Keluar</div>
                      <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                        <div 
                          className="bg-destructive h-full flex items-center justify-end pr-2 transition-all"
                          style={{ width: `${pengeluaranWidth}%` }}
                        >
                          <span className="text-xs text-white font-medium">
                            {formatCurrency(data.pengeluaran)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-5 shadow-lg mb-6">
          <h3 className="font-semibold mb-4">Breakdown per Kategori</h3>
          
          <div className="space-y-4">
            {kategoriBelanja.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.kategori}</span>
                  <span className="text-sm font-bold">{formatCurrency(item.jumlah)}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="gradient-primary h-full transition-all"
                    style={{ width: `${item.persentase}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Export Button */}
        <Button
          onClick={handleExport}
          className="w-full py-6 text-lg font-semibold gradient-secondary border-0 shadow-md"
          size="lg"
        >
          <Download className="h-5 w-5 mr-2" />
          Export ke Excel
        </Button>
      </main>
    </div>
  );
};

export default Reports;
