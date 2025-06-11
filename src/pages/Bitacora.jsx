import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { DiaDetalle } from "../components/Bitacora/DiaDetalle";
import { FiltrarBitacora } from "../components/Filtros/FiltrarBitacora";
import bitacora from "../assets/data/bitacora.json";

export function Bitacora() {
	const [filtro, setFiltro] = useState("");
	const [campo, setCampo] = useState("dia");

	const bitacoraFiltrada = bitacora.filter((item) => {
		const valor = item[campo];

		if (Array.isArray(valor)) {
			const textoUnido = valor.join(" ").toLowerCase();
			return textoUnido.includes(filtro.toLowerCase());
		} else if (typeof valor === "string") {
			return valor.toLowerCase().includes(filtro.toLowerCase());
		} else {
			return false;
		}
	});

	return (
		<PageContainer>
			<Titulo>Bitácora de Desarrollo</Titulo>

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
					<DiaDetalleWrapper>
						<DiaDetalle titulo={dia.dia} detalle={dia.detalle} />
					</DiaDetalleWrapper>
				</MotionDiaWrapper>
			))}
		</PageContainer>
	);
}

// Estilos
const PageContainer = styled.div`
	min-height: 100vh;
	margin-left: 20%;
	margin-right: 1rem;
	padding-right: 1rem;
	padding-left: 1rem;

	@media (max-width: 768px) {
		margin-left: 4rem;
		margin-right: 1rem;
	}

	@media (max-width: 480px) {
		margin-left: 3rem;
		padding-left: 0.5rem;
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
		word-wrap: break-word;
	}
`;

const MotionDiaWrapper = styled(motion.div)`
	margin-bottom: 2rem;
	width: 100%;
`;

const DiaDetalleWrapper = styled.div`
	width: 100%;
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;

	@media (max-width: 480px) {
		padding: 0 1rem;
	}
`;
