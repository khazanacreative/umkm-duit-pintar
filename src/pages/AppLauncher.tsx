import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ShoppingCart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const AppLauncher = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Selamat Datang di Sistem UMKM</h1>
            <p className="text-muted-foreground">Pilih aplikasi yang ingin Anda gunakan</p>
          </div>
          <Button variant="outline" onClick={signOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Keluar
          </Button>
        </div>

        {/* App Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* KasKu App */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary"
            onClick={() => navigate("/dashboard")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 shadow-lg">
                <Wallet className="h-12 w-12 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">KasKu</CardTitle>
              <CardDescription className="text-base">
                Aplikasi Pencatatan Keuangan
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Kelola transaksi debet kredit, invoice, dan laporan keuangan UMKM Anda
              </p>
              <Button className="w-full" size="lg">
                Buka KasKu
              </Button>
            </CardContent>
          </Card>

          {/* POS App */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary"
            onClick={() => navigate("/pos")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-4 shadow-lg">
                <ShoppingCart className="h-12 w-12 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl">POS</CardTitle>
              <CardDescription className="text-base">
                Point of Sale System
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Sistem kasir untuk penjualan, stok barang, dan laporan penjualan
              </p>
              <Button className="w-full" size="lg" variant="secondary">
                Buka POS
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppLauncher;
