import RenovacionSecciones from "@/components/client/matricula/renovacion/RenovacionSecciones";
import ProtectedRoute from "@/components/provider/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <RenovacionSecciones />
    </ProtectedRoute>
  );
}
