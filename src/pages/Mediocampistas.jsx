import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos";              // Importar AOS
import "aos/dist/aos.css";          // Importar estilos AOS
import { Card } from "../components/Card";
import { FichaDetalle } from "../components/FichaDetalle";
import datosJSON from "../assets/data/jugadores.json";

export function Mediocampistas() {
    const [datos, setDatos] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });  // Inicializar AOS

        const mediocampistas = datosJSON.filter((jugador) => jugador.posicion === "Mediocampista");
        setDatos(mediocampistas);
    }, []);

    const toggleDetalle = (id) => {
        setDetalleAbierto(id);
    };

    const cerrarDetalle = () => {
        setDetalleAbierto(null);
    };

    const mediocampistaSeleccionado = datos.find((j) => j.id === detalleAbierto);

    return (
        <Container>
            <Title>Mediocampistas</Title>

            {!detalleAbierto && (
                <CardsWrapper data-aos="zoom-in"> {/* Animación zoom-in */}
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

            {mediocampistaSeleccionado && (
                <DetalleWrapper>
                    <FichaDetalle
                        imgsrc={getImageUrl(mediocampistaSeleccionado.imagenSrc)}
                        leyenda={"Jugó en: "}
                        fecha={mediocampistaSeleccionado.jugo}
                        nombre={`${mediocampistaSeleccionado.nombre} ${mediocampistaSeleccionado.apellido}`}
                        detalle={mediocampistaSeleccionado.descripcion}
                    />
                    <CerrarButton onClick={cerrarDetalle}>Cerrar</CerrarButton>
                </DetalleWrapper>
            )}
        </Container>
    );
}

// Utilidad para cargar imágenes
const getImageUrl = (imgName) => {
    return new URL(`../assets/Jugadores/Mediocampistas/${imgName}`, import.meta.url).href;
};

// Estilos
const Container = styled.div`
    text-align: center;
    padding: 2rem;

    @media (max-width: 480px) {
        margin-left: 20%;
        padding-bottom: 2%;
    }
`;

const Title = styled.h1`
    font-size: 4rem;
    margin-bottom: 2rem;
    font-family: "Arial", sans-serif;
    color: white;

    
    @media (min-width: 700px) and (max-width: 800px) {
        font-size: 3rem;
    }

    @media (min-width: 480px) and (max-width: 700px) {
        font-size: 3rem;
    }

    @media (max-width: 480px) {
        font-size: 2rem;
        font-size: 2.5rem;
        margin: 0;
        margin-bottom: 2rem;
    }
`;

const CardsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
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
