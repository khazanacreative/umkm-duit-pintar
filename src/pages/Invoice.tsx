import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Invoice = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="gradient-primary text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Invoice</h1>
          <p className="text-sm opacity-90">Kelola invoice pelanggan</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 -mt-8">
        <Card className="p-8 shadow-lg text-center">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Fitur Invoice</h3>
          <p className="text-muted-foreground">
            Fitur ini sedang dalam pengembangan. Segera hadir untuk membantu Anda mengelola invoice!
          </p>
        </Card>
      </main>
    </div>
  );
};

export default Invoice;
