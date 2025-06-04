import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export function Wheater() {
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <>
            <Title>Clima Diario en Buenos Aires</Title>
            <Container>
                <StyledList>
                    {forecast.time.map((date, index) => (
                        <StyledListItem key={date}>
                            <strong>{date}</strong>: 🌡️ {forecast.temperature_2m_min[index]}°C - {forecast.temperature_2m_max[index]}°C, ☔ {forecast.precipitation_sum[index]} mm
                        </StyledListItem>
                    ))}
                </StyledList>
            </Container>
        </>
    );
}

// Estilos

const Container = styled.div`
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
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    font-size: 1.2rem;

    @media (max-width: 480px) {
        font-size: 1rem;
    }
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
