import React from "react";
import styled from "styled-components";

export const FiltroJugadores = ({ filtro, setFiltro, criterio, setCriterio }) => {
  return (
    <FiltroContainer>
      <Select value={criterio} onChange={(e) => setCriterio(e.target.value)}>
        <option value="nombre">Nombre o Apellido</option>
        <option value="fecha">Fecha en que jugó</option>
      </Select>

      <Input
        type="text"
        placeholder={`Buscar por ${criterio === "nombre" ? "nombre o apellido" : "fecha"}`}
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        aria-label={`Filtro por ${criterio}`}
      />
    </FiltroContainer>
  );
};

const FiltroContainer = styled.div`
  margin: 1.5rem 0;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: none;
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:focus {
    outline: 2px solid #1565c0;
  }
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: none;
  min-width: 200px;
  max-width: 300px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);

  &:focus {
    outline: 2px solid #1565c0;
  }
`;
