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
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Selamat Datang di AplikasiKu</h1>
            <p className="text-sm md:text-base text-muted-foreground hidden md:block">Pilih aplikasi yang ingin Anda gunakan</p>
          </div>
          <Button variant="outline" onClick={signOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Keluar</span>
          </Button>
        </div>

        {/* App Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8 max-w-4xl mx-auto">
          {/* KasKu App */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary"
            onClick={() => navigate("/dashboard")}
          >
            <CardHeader className="text-center pb-2 md:pb-4 p-3 md:p-6">
              <div className="mx-auto w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-2 md:mb-4 shadow-lg">
                <Wallet className="h-8 w-8 md:h-12 md:w-12 text-primary-foreground" />
              </div>
              <CardTitle className="text-base md:text-2xl">KasKu</CardTitle>
              <CardDescription className="text-xs md:text-base hidden md:block">
                Aplikasi Pencatatan Keuangan
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center p-3 md:p-6 pt-0">
              <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4 hidden md:block">
                Kelola transaksi debet kredit, invoice, dan laporan keuangan UMKM Anda
              </p>
              <Button className="w-full text-xs md:text-sm" size="sm">
                Buka
              </Button>
            </CardContent>
          </Card>

          {/* KasirKu App */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary"
            onClick={() => navigate("/pos")}
          >
            <CardHeader className="text-center pb-2 md:pb-4 p-3 md:p-6">
              <div className="mx-auto w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-2 md:mb-4 shadow-lg">
                <ShoppingCart className="h-8 w-8 md:h-12 md:w-12 text-accent-foreground" />
              </div>
              <CardTitle className="text-base md:text-2xl">KasirKu</CardTitle>
              <CardDescription className="text-xs md:text-base hidden md:block">
                Point of Sale System
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center p-3 md:p-6 pt-0">
              <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4 hidden md:block">
                Sistem kasir untuk penjualan, katalog produk, dan invoice
              </p>
              <Button className="w-full text-xs md:text-sm" size="sm" variant="secondary">
                Buka
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppLauncher;
