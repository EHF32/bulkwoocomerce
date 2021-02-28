import React, { useEffect } from "react";
import ProductsForms, { HeadersTitles } from "../components/ProductsForms";
import styles from "../styles/Home.module.css";
import { CSVLink } from "react-csv";
import { prodjson } from "../constants";
import { useState } from "react";

export default function Home() {
  let csvRef = React.createRef();
  const [headers, setHeaders] = useState([{ label: "a", key: "a" }]);
  const [data, setData] = useState([{ a: "" }]);
  const [datosRecogidos, setDatosRecogidos] = useState([{}]);
  const [tickDownload, setTickdownload] = useState(0);

  useEffect(() => {
    if (tickDownload == 1) {
      setTickdownload(2);
    }
    if (tickDownload == 2) {
      csvRef.current.link.click(); //Wait for component to update
      setTickdownload(0);
    }
  }, [tickDownload]);

  return (
    <>
      <h1 className="text-center mt-2">WareWeb BulkWooComerce</h1>
      <h6 className="text-center mt-2">
        <a href="https://github.com/ehf32/bulkwoocomerce">
          https://github.com/ehf32/bulkwoocomerce
        </a>
      </h6>
      <div className={styles.container}>
        <HeadersTitles />
        <form>
          {datosRecogidos.map((element, index) => {
            return (
              <ProductsForms
                key={index}
                handleInput={handleInput}
                index={index}
              ></ProductsForms>
            );
          })}
        </form>
        <a className="btn btn-block btn-primary" onClick={handleAddFila}>
          Añadir fila
        </a>
        <br />

        <a onClick={handleCSVData} className="btn btn-primary">
          Descargar CSV
        </a>
        <CSVLink
          filename="wareweb.csv"
          asyncOnClick={true}
          ref={csvRef}
          style={{ display: "none" }}
          data={data}
          headers={headers}
          onClick={handleCSVData}
        >
          Descargar CSV
        </CSVLink>
      </div>
    </>
  );

  function handleInput(form, index, name) {
    let datos = datosRecogidos;
    datos[index][name] = form.target.value;
  }

  function handleAddFila() {
    setDatosRecogidos([...datosRecogidos, {}]);
  }

  function handleCSVData() {
    var dataToSend = [];
    datosRecogidos.forEach((element, index) => {
      var idParent = (index + 1) * 2 - 1;

      //Padre
      var parent = { ...prodjson.dataTemplate };
      parent.nombre = element.Nombre;
      parent.id = idParent;
      parent.tipo = "variable";
      parent.descripcion = element.Descripcion.replaceAll(
        ",",
        "&#44;"
      ).replaceAll('"', "'");
      parent.categorias = element.Categorias;
      parent.imagenes = element.Imagenes;
      parent.valoraciones = 1;
      parent.nombreattr1 = element.Variacion;
      parent.attrdefecto1 = element.Variacion;
      parent.valorattr1 = element.Variacion;
      parent.attrvisible1 = 1;

      //Variacion
      var variation = { ...prodjson.dataTemplate };
      variation.nombre = element.Nombre;
      variation.id = idParent + 1;
      variation.tipo = "variation";
      variation.superior = `id:${idParent}`;
      variation.claseimpuesto = "parent";
      variation.precio = element.Precio;
      variation.valoraciones = 0;
      variation.nombreattr1 = element.Variacion;

      dataToSend.push(parent, variation);
    });

    setHeaders(prodjson.headers);
    setData(dataToSend);

    setTickdownload(1);
  }
}
