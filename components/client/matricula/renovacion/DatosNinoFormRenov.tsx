"use client";

interface Props {
  datos: any;
  onChange: (data: any) => void;
  onNext: () => void;
  mensajeBusqueda?: string;
  esErrorBusqueda?: boolean;
}

export default function DatosNinoFormRenov({ datos, onChange, onNext, mensajeBusqueda, esErrorBusqueda }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del niño:", datos);
    onNext();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700">Datos del Niño</h2>

      <div className="md:col-span-2">
        <label className="block font-medium mb-1">Buscar por número de documento</label>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
          <input
            type="text"
            value={datos.numeroDocumento || ""}
            name="numeroDocumento"
            onChange={handleChange}
            placeholder="Ingrese número de documento"
            className="md:col-span-3 border p-2 rounded w-full"
          />

          <button
            type="button"
            onClick={() => {
              const numeroDoc = datos.numeroDocumento;
              if (numeroDoc && numeroDoc.length >= 6) {
                const event = new CustomEvent("buscarNino", { detail: numeroDoc });
                window.dispatchEvent(event);
              } else {
                alert("Ingrese un número de documento válido");
              }
            }}
            className="md:col-span-1 bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition"
          >
            Buscar
          </button>

          <span className={`md:col-span-2 text-sm ${esErrorBusqueda ? "text-red-600" : "text-green-600"}`}>
            {mensajeBusqueda}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Nombres</label>
          <input type="text" name="nombres" value={datos.nombres} onChange={handleChange} required className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Apellidos</label>
          <input type="text" name="apellidos" value={datos.apellidos} onChange={handleChange} required className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Fecha de Nacimiento</label>
          <input type="date" name="fechaNacimiento" value={datos.fechaNacimiento} onChange={handleChange} required className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Edad</label>
          <input type="number" name="edad" value={datos.edad} onChange={handleChange} required min={3} max={6} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Tipo de Documento</label>
          <select
            name="tipoDocumento"
            value={datos.tipoDocumento}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="DNI">DNI</option>
            <option value="CE">Carnet de Extranjería</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Número de Documento</label>
          <input
            type="text"
            name="numeroDocumento"
            value={datos.numeroDocumento}
            onChange={(e) => {
              const regex = /^[0-9]*$/;
              if (regex.test(e.target.value)) {
                handleChange(e);
              }
            }}
            required
            maxLength={datos.tipoDocumento === "DNI" ? 8 : 15}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Dirección</label>
          <input type="text" name="direccion" value={datos.direccion} onChange={handleChange} required className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Sexo</label>
          <select name="sexo" value={datos.sexo} onChange={handleChange} required className="w-full border rounded p-2">
            <option value="" disabled hidden>Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Tipo de Sangre</label>
          <select name="tipoSangre" value={datos.tipoSangre} onChange={handleChange} required className="w-full border rounded p-2">
            <option value="" disabled hidden>Seleccione</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">¿Toma biberón?</label>
          <select name="tomaBiberon" value={datos.tomaBiberon} onChange={handleChange} required className="w-full border rounded p-2">
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">¿Usa Pañal?</label>
          <select name="usaPanal" value={datos.usaPanal} onChange={handleChange} required className="w-full border rounded p-2">
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">¿Tiene alergias?</label>
          <textarea name="alergias" value={datos.alergias} onChange={handleChange} className="w-full border rounded p-2" placeholder="Especifique si tiene, de no ser el caso, dejar en blanco." />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">¿Tiene alguna discapacidad?</label>
          <textarea name="discapacidad" value={datos.discapacidad} onChange={handleChange} className="w-full border rounded p-2" placeholder="Especifique si tiene, de no ser el caso, dejar en blanco." />
        </div>

        <div>
          <label className="block font-medium mb-1">Seguro de salud</label>
          <select
            name="seguroSalud"
            value={datos.seguroSalud}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-2"
            required
          >
            <option value="EsSalud">EsSalud</option>
            <option value="Rímac">Rímac</option>
            <option value="Pacífico">Pacífico</option>
            <option value="Mapfre">Mapfre</option>
            <option value="La Positiva">La Positiva</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Especificar Otro</label>
          <input
            type="text"
            name="detalleSeguro"
            value={datos.detalleSeguro || ""}
            onChange={handleChange}
            className={`w-full border rounded p-2 transition ${datos.seguroSalud !== "Otro" ? "bg-gray-100 cursor-not-allowed" : "bg-white"
              }`}
            disabled={datos.seguroSalud !== "Otro"}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Copia del DNI (PDF)</label>

          {/* Mostrar enlace si ya hay uno desde el backend */}
          {datos.copiaDniUrl && (
            <a
              href={datos.copiaDniUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mb-2 block"
            >
              Ver copia del DNI actual
            </a>
          )}

          <input
            type="file"
            accept=".pdf"
            name="copiaDni"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.type === "application/pdf") {
                onChange({ copiaDni: file });
              } else {
                alert("Solo se permiten archivos PDF.");
                e.target.value = "";
              }
            }}
            className="w-full border rounded p-2 bg-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Partida de Nacimiento (PDF)</label>

          {/* Mostrar enlace si ya hay uno desde el backend */}
          {datos.partidaNacimientoUrl && (
            <a
              href={datos.partidaNacimientoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mb-2 block"
            >
              Ver partida de nacimiento actual
            </a>
          )}

          <input
            type="file"
            accept=".pdf"
            name="partidaNacimiento"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.type === "application/pdf") {
                onChange({ partidaNacimiento: file });
              } else {
                alert("Solo se permiten archivos PDF.");
                e.target.value = "";
              }
            }}
            className="w-full border rounded p-2 bg-white"
          />
        </div>

      </div>

      <div className="text-right">
        <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition">
          Siguiente
        </button>
      </div>
    </form>
  );
}
