import Banner from "@/components/index/homeIndex/Banner";

import Ofrecemos from "@/components/index/homeIndex/Ofrecemos";
import Actividades from "@/components/index/homeIndex/Actividades";
import Inscripcion from "@/components/index/homeIndex/Inscripcion";

export default function Home() {
  return (
    <main>
      <Banner />
      <Ofrecemos />
      <Actividades />
      <Inscripcion />
    </main>
  );
}
