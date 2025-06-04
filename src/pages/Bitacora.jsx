import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion"; // ✅ Importar Framer Motion
import { DiaDetalle } from "../components/Bitacora/DiaDetalle";
import bitacora from "../assets/data/bitacora.json";

export function Bitacora() {
	return (
		<PageContainer>
			<Titulo>Bitácora de Desarrollo</Titulo>
			{bitacora.map((dia, index) => (
				<MotionDiaWrapper
					key={dia.id}
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.6,
						ease: "easeOut",
						delay: index * 0.2, // ✅ animación en cascada
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

// ✅ Motion DiaWrapper con animación diferente
const MotionDiaWrapper = styled(motion.div)`
	margin-bottom: 2rem;

	@media (max-width: 480px) {
		padding: 0 1rem;
	}
`;
