import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Store, MapPin, Phone } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="gradient-primary text-white p-6 pb-24 shadow-lg">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Profil</h1>
          <p className="text-sm opacity-90">Kelola informasi usaha Anda</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 -mt-16">
        <Card className="p-6 shadow-lg animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="gradient-primary p-3 rounded-xl">
              <User className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-bold">Informasi Usaha</h2>
          </div>

          <form className="space-y-5">
            {/* Nama Usaha */}
            <div className="space-y-2">
              <Label htmlFor="namaUsaha" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                Nama Usaha
              </Label>
              <Input
                id="namaUsaha"
                type="text"
                placeholder="Masukkan nama usaha"
                defaultValue="Toko Sumber Rejeki"
              />
            </div>

            {/* Alamat */}
            <div className="space-y-2">
              <Label htmlFor="alamat" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Alamat
              </Label>
              <Input
                id="alamat"
                type="text"
                placeholder="Masukkan alamat usaha"
                defaultValue="Jl. Merdeka No. 123, Jakarta"
              />
            </div>

            {/* Nomor WhatsApp */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Nomor WhatsApp
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="08123456789"
                defaultValue="08123456789"
              />
            </div>

            {/* Save Button */}
            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold gradient-primary border-0"
              size="lg"
            >
              Simpan Perubahan
            </Button>
          </form>
        </Card>

        {/* Additional Settings */}
        <Card className="p-6 shadow-lg mt-6">
          <h3 className="text-lg font-semibold mb-4">Pengaturan Lainnya</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="lg">
              Sinkronisasi Data
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              API Integration
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" size="lg">
              Logout
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
