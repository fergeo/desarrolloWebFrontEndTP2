import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { DiaDetalle } from "../components/Bitacora/DiaDetalle";
import { FiltrarBitacora } from "../components/Filtros/FiltrarBitacora"; // ✅ importar componente desde carpeta Filtros
import bitacora from "../assets/data/bitacora.json";

export function Bitacora() {
	const [filtro, setFiltro] = useState("");
	const [campo, setCampo] = useState("dia");

	// Filtrado de datos con soporte para array en detalle
	const bitacoraFiltrada = bitacora.filter((item) => {
		const valor = item[campo];

		if (Array.isArray(valor)) {
			// Si es array (ej. detalle), unimos y convertimos a string para filtrar
			const textoUnido = valor.join(" ").toLowerCase();
			return textoUnido.includes(filtro.toLowerCase());
		} else if (typeof valor === "string") {
			// Si es string (ej. dia), filtrado normal
			return valor.toLowerCase().includes(filtro.toLowerCase());
		} else {
			// Si no es ni string ni array, no mostrar
			return false;
		}
	});

	return (
		<PageContainer>
			<Titulo>Bitácora de Desarrollo</Titulo>

			{/* ✅ Filtro agregado */}
			<FiltrarBitacora
				filtro={filtro}
				setFiltro={setFiltro}
				campo={campo}
				setCampo={setCampo}
			/>

			{bitacoraFiltrada.map((dia, index) => (
				<MotionDiaWrapper
					key={dia.id}
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.6,
						ease: "easeOut",
						delay: index * 0.2,
					}}
				>
					<DiaDetalle titulo={dia.dia} detalle={dia.detalle} />
				</MotionDiaWrapper>
			))}
		</PageContainer>
	);
}

// Estilos
const PageContainer = styled.div`
	min-height: 100vh;
	margin-right: 1rem;
	margin-left: 6rem;

	@media (max-width: 480px) {
		margin-left: 4.2rem;
	}
`;

const Titulo = styled.h1`
	text-align: center;
	font-size: 4rem;
	font-weight: bold;
	padding-bottom: 3rem;

	@media (max-width: 480px) {
		margin-top: 1rem;
		font-size: 2.5rem;
	}
`;

const MotionDiaWrapper = styled(motion.div)`
	margin-bottom: 2rem;

	@media (max-width: 480px) {
		padding: 0 1rem;
	}
`;
