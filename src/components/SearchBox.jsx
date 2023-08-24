import React, { useState } from "react";
import assets from "../assets/assets";

function SearchBox(props) {
  const { SetPosicion } = props;
  const [buscadorTexto, setbuscadorTexto] = useState("");
  const [listaLugar, setListaLugar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores de la API

  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

  const handleSearch = () => {
    if (buscadorTexto.trim() === "") {
      return;
    }

    setIsLoading(true);
    setError(null); // Restablecer el estado de error

    const params = {
      q: buscadorTexto,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const querryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${NOMINATIM_BASE_URL}${querryString}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud al servidor");
        }
        return response.json();
      })
      .then((result) => {
        setListaLugar(result);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message); // Capturar y guardar el mensaje de error
        console.log("error: ", err);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className="
        text-2xl font-extralight w-full sm:w-128 flex items-center justify-center p-2"
        >
          <input
            type="text"
            className="bg-white rounded-xl w-full h-fit px-2 py-1 mx-2"
            value={buscadorTexto}
            placeholder="Ingrese lo que desea buscar..."
            onChange={(event) => {
              setbuscadorTexto(event.target.value);
            }}
          />
          <button
            className="w-fit h-fit px-2 py-1.5 bg-sky-300 rounded-xl text-white"
            onClick={handleSearch}
          >
            {isLoading ? (
              <img src={assets.cargando} alt="loading" className="w-8 animate-spin" /> // Cambia 'assets.loading' con la ruta correcta a tu imagen de loading
            ) : (
              <img src={assets.buscar} alt="buscar" className="w-8" />
            )}
          </button>
        </div>
        <ul className="sm:w-128 flex flex-col justify-start">
          {listaLugar.length === 0 ? ( // Verificar si la lista está vacía
            <p className="text-red-500 font-semibold text-center">Lugar no encontrado</p>
          ) : (
            listaLugar.map((item) => {
              return (
                <div key={item?.place_id}>
                  <li className="p-2">
                    <button
                      className="text-white flex items-center w-full"
                      onClick={() => {
                        SetPosicion(item);
                      }}
                    >
                      <img
                        src={assets.ubicacion}
                        alt="ubicacion"
                        style={{ width: "38px", height: "38px" }}
                      />
                      <p>{item?.display_name}</p>
                    </button>
                  </li>
                </div>
              );
            })
          )}
        </ul>
        {error && <p className="text-red-500 font-semibold text-center">{error}</p>}
      </div>
    </>
  );
}

export default SearchBox;
