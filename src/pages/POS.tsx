import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const POS = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const addToCart = () => {
    if (!productName || !productPrice) {
      toast({
        title: "Error",
        description: "Mohon isi nama dan harga produk",
        variant: "destructive",
      });
      return;
    }

    const newItem: CartItem = {
      id: Date.now().toString(),
      name: productName,
      price: parseFloat(productPrice),
      quantity: 1,
    };

    setCart([...cart, newItem]);
    setProductName("");
    setProductPrice("");
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast({
        title: "Keranjang Kosong",
        description: "Tambahkan produk terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    try {
      const totalAmount = getTotalAmount();
      
      // Simpan transaksi POS ke database
      const { error } = await supabase.from("pos_transaksi").insert({
        branch_id: userRole?.branch_id || "",
        kode_pos: `POS-${Date.now()}`,
        tanggal: new Date().toISOString().split('T')[0],
        total: totalAmount,
        sumber: JSON.stringify(cart),
      });

      if (error) throw error;

      toast({
        title: "Transaksi Berhasil",
        description: `Total: Rp ${totalAmount.toLocaleString("id-ID")}`,
      });

      setCart([]);
    } catch (error) {
      console.error("Error saving transaction:", error);
      toast({
        title: "Error",
        description: "Gagal menyimpan transaksi",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 shadow-lg">
        <div className="container mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/home")}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">POS System</h1>
            <p className="text-sm opacity-90">Point of Sale</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Produk */}
          <Card>
            <CardHeader>
              <CardTitle>Tambah Produk</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nama Produk</label>
                <Input
                  placeholder="Contoh: Kopi Susu"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Harga</label>
                <Input
                  type="number"
                  placeholder="15000"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <Button onClick={addToCart} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Tambah ke Keranjang
              </Button>
            </CardContent>
          </Card>

          {/* Keranjang */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Keranjang Belanja
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Keranjang masih kosong</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Total & Checkout */}
        {cart.length > 0 && (
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold">Total</span>
                <span className="text-3xl font-bold text-primary">
                  Rp {getTotalAmount().toLocaleString("id-ID")}
                </span>
              </div>
              <Button onClick={handleCheckout} size="lg" className="w-full">
                Proses Pembayaran
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default POS;
