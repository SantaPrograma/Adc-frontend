import { HomeClient } from "@/components/client/homeClient/homeClient";
import ProtectedRoute from "@/components/provider/ProtectedRoute";

export default function Page() {
  return (
    <main>
      <ProtectedRoute>
        <HomeClient />
      </ProtectedRoute>
    </main>
  );
}
