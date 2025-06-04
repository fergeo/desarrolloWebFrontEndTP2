import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos"; // Importar AOS
import "aos/dist/aos.css"; // Estilos AOS
import { Card } from "../components/Card";
import { FichaDetalle } from "../components/FichaDetalle";
import { CerrarDetalle } from "../components/CerrarDetalle"; // ✅ Importar componente reutilizable
import datosJSON from "../assets/data/jugadores.json";

export function Delanteros() {
    const [datos, setDatos] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // Inicializar AOS

        const delanteros = datosJSON.filter((jugador) => jugador.posicion === "Delantero");
        setDatos(delanteros);
    }, []);

    const toggleDetalle = (id) => {
        setDetalleAbierto(id);
    };

    const cerrarDetalle = () => {
        setDetalleAbierto(null);
    };

    const delanteroSeleccionado = datos.find((j) => j.id === detalleAbierto);

    return (
        <Container>
            <Title>Delanteros</Title>

            {!detalleAbierto && (
                <CardsWrapper data-aos="zoom-in">
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

            {delanteroSeleccionado && (
                <DetalleWrapper>
                    <FichaDetalle
                        imgsrc={getImageUrl(delanteroSeleccionado.imagenSrc)}
                        leyenda={"Jugó en: "}
                        fecha={delanteroSeleccionado.jugo}
                        nombre={`${delanteroSeleccionado.nombre} ${delanteroSeleccionado.apellido}`}
                        detalle={delanteroSeleccionado.descripcion}
                    />
                    <CerrarDetalle onClick={cerrarDetalle} /> {/* ✅ Usar componente */}
                </DetalleWrapper>
            )}
        </Container>
    );
}

// Utilidad para cargar imágenes
const getImageUrl = (imgName) => {
    return new URL(`../assets/Jugadores/Delanteros/${imgName}`, import.meta.url).href;
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
        margin-top: 1rem;
        font-size: 2.5rem;
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
