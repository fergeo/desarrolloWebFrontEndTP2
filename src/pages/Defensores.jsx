import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos"; // ✅ Importar AOS
import "aos/dist/aos.css"; // ✅ Estilos AOS
import { Card } from "../components/Card";
import { FichaDetalle } from "../components/FichaDetalle";
import datosJSON from "../assets/data/jugadores.json";

export function Defensores() {
    const [datos, setDatos] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // ✅ Inicializar AOS

        const defensores = datosJSON.filter((jugador) => jugador.posicion === "Defensor");
        setDatos(defensores);
    }, []);

    const toggleDetalle = (id) => {
        setDetalleAbierto(id);
    };

    const cerrarDetalle = () => {
        setDetalleAbierto(null);
    };

    const defensorSeleccionado = datos.find((j) => j.id === detalleAbierto);

    return (
        <Container>
            <Title>Defensores</Title>

            {!detalleAbierto && (
                <div data-aos="zoom-in"> {/* ✅ Animación aquí */}
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
                </div>
            )}

            {defensorSeleccionado && (
                <DetalleWrapper>
                    <FichaDetalle
                        imgsrc={getImageUrl(defensorSeleccionado.imagenSrc)}
                        leyenda={"Jugó en: "}
                        fecha={defensorSeleccionado.jugo}
                        nombre={`${defensorSeleccionado.nombre} ${defensorSeleccionado.apellido}`}
                        detalle={defensorSeleccionado.descripcion}
                    />
                    <CerrarButton onClick={cerrarDetalle}>Cerrar</CerrarButton>
                </DetalleWrapper>
            )}
        </Container>
    );
}

// Utilidad para cargar imágenes
const getImageUrl = (imgName) => {
    return new URL(`../assets/Jugadores/Defensores/${imgName}`, import.meta.url).href;
};

// Styled Components
const Container = styled.div`
    text-align: center;
    padding: 2rem;

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

    @media (max-width: 480px) {
        font-size: 2.5rem;
        margin-top: 1rem;
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
