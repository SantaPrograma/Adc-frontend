export default function Resumen() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow text-center border border-green-200">
          <h3 className="text-xl font-semibold text-green-800">Colaboradores</h3>
          <p className="text-4xl mt-2 font-bold">24</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center border border-green-200">
          <h3 className="text-xl font-semibold text-green-800">Productos</h3>
          <p className="text-4xl mt-2 font-bold">132</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center border border-green-200">
          <h3 className="text-xl font-semibold text-green-800">Alumnos</h3>
          <p className="text-4xl mt-2 font-bold">312</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center border border-green-200">
          <h3 className="text-xl font-semibold text-green-800">Pendientes</h3>
          <p className="text-4xl mt-2 font-bold">7</p>
        </div>
      </div>
    );
  }
  