import { ConsultaMatricula } from "@/components/client/matricula/consulta/ConsultarMatricula";
import ProtectedRoute from "@/components/provider/ProtectedRoute";

export default function Page() {
  return (
    <main>
      <ProtectedRoute>
        <ConsultaMatricula />
      </ProtectedRoute>
    </main>
  );
}