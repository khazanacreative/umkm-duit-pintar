import { Card } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const Reports = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="gradient-primary text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Laporan</h1>
          <p className="text-sm opacity-90">Analisis keuangan usaha</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 -mt-8">
        <Card className="p-8 shadow-lg text-center">
          <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Laporan Keuangan</h3>
          <p className="text-muted-foreground">
            Fitur ini sedang dalam pengembangan. Segera hadir dengan grafik dan analisis lengkap!
          </p>
        </Card>
      </main>
    </div>
  );
};

export default Reports;
