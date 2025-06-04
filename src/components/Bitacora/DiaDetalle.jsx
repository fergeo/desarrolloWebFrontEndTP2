import React from "react";
import styled from "styled-components";

export function DiaDetalle({ titulo, detalle }) {
	return (
		<Container>
			<TituloDia>{titulo}</TituloDia>
			<ListaDetalle>
				{detalle.map((linea, index) => (
					<li key={index}>
						{linea.split("\n").map((str, i) => (
							<React.Fragment key={i}>
								{str}
								<br />
							</React.Fragment>
						))}
					</li>
				))}
			</ListaDetalle>
		</Container>
	);
}

const Container = styled.div`
	padding: 1rem 2rem;
	background-color: #000022; /* Azul bien oscuro */
	border-radius: 1rem;
`;

const TituloDia = styled.h2`
	font-size: 2rem;
	margin-bottom: 1rem;
	color: white; /* Blanco para el título */
`;

const ListaDetalle = styled.ul`
	padding-left: 1.5rem;
	color: #FFD700; /* Amarillo para los ítems */
	font-size: 1.2rem;

	li {
		margin-bottom: 0.8rem;
	}
`;
