import MatriculaSecciones from "@/components/client/matricula/nuevo/MatriculaSecciones";
import ProtectedRoute from "@/components/provider/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <MatriculaSecciones/>
    </ProtectedRoute>
  );
}
