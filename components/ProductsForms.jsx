const campos = [
  "Nombre",
  "Descripcion",
  "Precio",
  "Categorias",
  "Imagenes",
  "Variacion",
];

export default function ProductsForms({ index, handleInput }) {
  return (
    <div className="form-row">
      {campos.map((el, i) => {
        return (
          <div key={i} className="form-group col-md-2">
            <input
              onChange={(form) => handleInput(form, index, el)}
              className="form-control"
              name={el}
            />
          </div>
        );
      })}
    </div>
  );
}

export function HeadersTitles() {
  return (
    <div className="form-row">
      {campos.map((el) => {
        return (
          <div key={el} className="col-md-2">
            <b>{el}</b>
          </div>
        );
      })}
    </div>
  );
}
