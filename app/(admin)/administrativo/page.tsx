import Resumen from "@/components/admin/homeAdministrativo/Resumen";
import Welcome from "@/components/admin/homeAdministrativo/Welcome";

export default function Home() {
  return (
    <main>
      <div className="p-6 space-y-6">
        <Welcome />
        <Resumen />
      </div>
    </main>
  );
}
