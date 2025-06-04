import React from "react";
import styled from "styled-components";

export function FiltrarBitacora({ filtro, setFiltro, campo, setCampo }) {
	return (
		<FiltroWrapper>
			<Select value={campo} onChange={(e) => setCampo(e.target.value)}>
				<option value="dia">Día</option>
				<option value="detalle">Detalle</option>
			</Select>
			<Input
				type="text"
				placeholder={`Filtrar por ${campo}`}
				value={filtro}
				onChange={(e) => setFiltro(e.target.value)}
			/>
		</FiltroWrapper>
	);
}

// Estilos
const FiltroWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 2rem;
	gap: 1rem;

	@media (max-width: 480px) {
		flex-direction: column;
		align-items: center;
	}
`;

const Select = styled.select`
	padding: 0.5rem;
	font-size: 1rem;
`;

const Input = styled.input`
	padding: 0.5rem;
	font-size: 1rem;
	width: 250px;
	max-width: 90%;
`;
