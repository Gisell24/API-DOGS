import React from "react";

const Paginado = ({ dogsPerPage, dogs, paginado }) => {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(dogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number, i) => (
            <button
              className="pagination"
              key={i}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          ))}
      </ul>
    </nav>
  );
};

export default Paginado;

//.ceil me resondea los dogs para arriba buscar
