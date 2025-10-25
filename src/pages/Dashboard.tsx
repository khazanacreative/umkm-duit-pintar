import { useState, useEffect } from "react";
import { Wallet, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [saldo] = useState(15750000);
  const [pemasukan] = useState(25000000);
  const [pengeluaran] = useState(9250000);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && userRole) {
      if (userRole.role === "admin_pusat") {
        supabase
          .from("branches")
          .select("*")
          .then(({ data }) => {
            if (data) {
              setBranches(data);
              if (data.length > 0) setSelectedBranch(data[0].id);
            }
          });
      } else if (userRole.branch_id) {
        setSelectedBranch(userRole.branch_id);
        supabase
          .from("branches")
          .select("*")
          .eq("id", userRole.branch_id)
          .single()
          .then(({ data }) => {
            if (data) setBranches([data]);
          });
      }
    }
  }, [user, userRole]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const recentTransactions = [
    { id: 1, keterangan: "Penjualan Produk A", kategori: "Penjualan", jenis: "Debet", nominal: 500000, tanggal: "2025-01-20" },
    { id: 2, keterangan: "Bayar Listrik", kategori: "Operasional", jenis: "Kredit", nominal: 250000, tanggal: "2025-01-19" },
    { id: 3, keterangan: "Penjualan Produk B", kategori: "Penjualan", jenis: "Debet", nominal: 750000, tanggal: "2025-01-18" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 relative z-0">
      <Header 
        title="KasKu" 
        subtitle="Kelola keuangan usaha dengan mudah"
        showBranchSelector={userRole?.role === "admin_pusat"}
        selectedBranch={selectedBranch}
        branches={branches}
        onBranchChange={setSelectedBranch}
      />

      <main className="max-w-screen-xl mx-auto px-4 -mt-16 relative z-10">
        <Card className="p-6 shadow-lg mb-6 gradient-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saldo Kas</p>
                <h2 className="text-3xl font-bold text-foreground">{formatCurrency(saldo)}</h2>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <div>
                <p className="text-xs text-muted-foreground">Pemasukan</p>
                <p className="text-sm font-semibold text-success">{formatCurrency(pemasukan)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-xs text-muted-foreground">Pengeluaran</p>
                <p className="text-sm font-semibold text-destructive">{formatCurrency(pengeluaran)}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mb-6">
          <Button 
            onClick={() => navigate("/transactions")}
            className="w-full py-6 text-lg font-semibold gradient-primary border-0 shadow-md hover:shadow-lg transition-all"
            size="lg"
          >
            <Plus className="h-6 w-6 mr-2" />
            Tambah Transaksi
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard
            title="Total Saldo"
            value={formatCurrency(saldo)}
            icon={Wallet}
            variant="default"
          />
          <StatCard
            title="Pemasukan"
            value={formatCurrency(pemasukan)}
            icon={TrendingUp}
            variant="success"
          />
          <StatCard
            title="Pengeluaran"
            value={formatCurrency(pengeluaran)}
            icon={TrendingDown}
            variant="warning"
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Transaksi Terbaru</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/transactions")}
            >
              Lihat Semua
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <Card key={transaction.id} className="p-4 shadow-card hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{transaction.keterangan}</p>
                    <p className="text-sm text-muted-foreground">{transaction.kategori} • {transaction.tanggal}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${transaction.jenis === "Debet" ? "text-success" : "text-destructive"}`}>
                      {transaction.jenis === "Debet" ? "+" : "-"} {formatCurrency(transaction.nominal)}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.jenis === "Debet" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                    }`}>
                      {transaction.jenis}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
