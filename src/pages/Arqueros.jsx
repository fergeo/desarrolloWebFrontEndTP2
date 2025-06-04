import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "../components/Card";
import { FichaDetalle } from "../components/FichaDetalle";
import datosJSON from "../assets/data/jugadores.json";

export function Arqueros() {
    const [datos, setDatos] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(null);

    useEffect(() => {
        const arqueros = datosJSON.filter((jugador) => jugador.posicion === "Arquero");
        setDatos(arqueros);
    }, []);

    const toggleDetalle = (id) => {
        setDetalleAbierto(id);
    };

    const cerrarDetalle = () => {
        setDetalleAbierto(null);
    };

    const arqueroSeleccionado = datos.find((j) => j.id === detalleAbierto);

    return (
        <Container>
            <Title>Arqueros</Title>

            {!detalleAbierto && (
                <CardsWrapper>
                    {datos.map((item) => (
                        <Card
                            key={item.id}
                            imgsrc={getImageUrl(item.imagenSrc)}
                            leyenda={"Jugó en: "}
                            fecha={item.jugo}
                            descripcion_breve={`${item.nombre} ${item.apellido}`}
                            onVerDetalle={() => toggleDetalle(item.id)}
                        />
                    ))}
                </CardsWrapper>
            )}

            {arqueroSeleccionado && (
                <DetalleWrapper>
                    <FichaDetalle
                        imgsrc={getImageUrl(arqueroSeleccionado.imagenSrc)}
                        leyenda={"Jugó en: "}
                        fecha={arqueroSeleccionado.jugo}
                        nombre={`${arqueroSeleccionado.nombre} ${arqueroSeleccionado.apellido}`}
                        detalle={arqueroSeleccionado.descripcion}
                    />
                    <CerrarButton onClick={cerrarDetalle}>Cerrar</CerrarButton>
                </DetalleWrapper>
            )}
        </Container>
    );
}

// Función para obtener la URL real de la imagen
const getImageUrl = (imgName) => {
    return new URL(`../assets/Jugadores/Arqueros/${imgName}`, import.meta.url).href;
};

// Styled Components
const Container = styled.div`
    text-align: center;
    margin-top: 2rem;

    @media (max-width: 480px) {
        margin-left: 20%;
        padding: 0;
    }
`;

const Title = styled.h1`
    font-size: 4rem;
    margin-bottom: 2rem;
    font-family: "Arial", sans-serif;
    color: white;

    @media (max-width: 768px) {
        font-size: 3rem;
    }

    @media (max-width: 480px) {
        margin-top: 1rem;
        font-size: 2.5rem;
    }
`;

const CardsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
    padding: 0 2%; /* 2% de padding lateral */
    padding-bottom: 1rem;
`;

const DetalleWrapper = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CerrarButton = styled.button`
    margin-top: 1.5rem;
    padding: 0.5rem 1.2rem;
    font-size: 1rem;
    background-color: #0d47a1;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #1565c0;
    }
`;
