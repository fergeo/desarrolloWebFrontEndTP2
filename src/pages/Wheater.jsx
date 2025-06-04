import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export function Wheater() {
	const [forecast, setForecast] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 3;

	useEffect(() => {
		const getWeather = async () => {
			try {
				const response = await fetch(
					'https://api.open-meteo.com/v1/forecast?latitude=-34.61&longitude=-58.38&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=America%2FArgentina%2FBuenos_Aires'
				);
				const data = await response.json();
				setForecast(data.daily);
				setLoading(false);
			} catch (error) {
				console.error('Error al obtener el clima:', error);
				setLoading(false);
			}
		};

		getWeather();
	}, []);

	if (loading) return <Loading>⏳ Cargando clima...</Loading>;
	if (!forecast) return <ErrorMsg>❌ No hay datos disponibles</ErrorMsg>;

	// Calcular paginación
	const totalItems = forecast.time.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const slicedTime = forecast.time.slice(startIndex, endIndex);
	const slicedMinTemp = forecast.temperature_2m_min.slice(startIndex, endIndex);
	const slicedMaxTemp = forecast.temperature_2m_max.slice(startIndex, endIndex);
	const slicedPrecip = forecast.precipitation_sum.slice(startIndex, endIndex);

	const handleAnterior = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const handleSiguiente = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	return (
		<>
			<Title>Clima Diario en Buenos Aires</Title>
			<MotionContainer
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.8, ease: 'easeOut' }}
			>
				<StyledList>
					{slicedTime.map((date, index) => (
						<StyledListItem key={date}>
							<strong>{date}</strong>: 🌡️ {slicedMinTemp[index]}°C - {slicedMaxTemp[index]}°C, ☔ {slicedPrecip[index]} mm
						</StyledListItem>
					))}
				</StyledList>

				<PaginationWrapper>
					<Button onClick={handleAnterior} disabled={currentPage === 1}>
						← Anterior
					</Button>
					<PageInfo>
						{currentPage} de {totalPages}
					</PageInfo>
					<Button onClick={handleSiguiente} disabled={currentPage === totalPages}>
						Siguiente →
					</Button>
				</PaginationWrapper>
			</MotionContainer>
		</>
	);
}

// Estilos
const MotionContainer = styled(motion.div)`
	width: 100%;
	max-width: 800px;
	min-height: 100vh;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #000b3d;
	color: white;
	border-radius: 1rem;
	padding: 2rem;
	margin: 3rem auto 4rem auto;

	@media (max-width: 480px) {
		text-align: center;
		margin-left: 4rem;
	}
`;

const Title = styled.h2`
	text-align: center;
	font-size: 4rem;
	margin-top: 2rem;
	margin-bottom: 1rem;
	color: white;

	@media (max-width: 480px) {
		font-size: 2rem;
		margin-left: 4rem;
	}
`;

const StyledList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	width: 100%;
`;

const StyledListItem = styled.li`
	padding: 1rem;
	margin-bottom: 1rem;
	border-radius: 0.75rem;
	background-color: rgba(255, 255, 255, 0.1);
	color: white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	font-size: 1.2rem;

	@media (max-width: 480px) {
		font-size: 1rem;
	}
`;

const PaginationWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	margin-top: 2rem;
`;

const Button = styled.button`
	padding: 0.6rem 1.2rem;
	font-size: 1rem;
	border: none;
	border-radius: 0.5rem;
	background-color: #ffffff33;
	color: white;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover:not(:disabled) {
		background-color: #ffffff55;
	}

	&:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
`;

const PageInfo = styled.span`
	font-size: 1.1rem;
`;

const Loading = styled.p`
	text-align: center;
	font-size: 1.5rem;
	color: white;
`;

const ErrorMsg = styled.p`
	text-align: center;
	color: red;
	font-size: 1.2rem;
`;
