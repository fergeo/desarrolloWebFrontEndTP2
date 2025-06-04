import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

import { Card } from "../components/Card";
import { FichaDetalle } from "../components/FichaDetalle";
import { CerrarDetalle } from "../components/CerrarDetalle"; // ✅ Componente reutilizable
import datosJSON from "../assets/data/laBombonera.json";

export function LaBombonera() {
    const [datos, setDatos] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        setDatos(datosJSON);
    }, []);

    const toggleDetalle = (id) => {
        setDetalleAbierto(detalleAbierto === id ? null : id);
    };

    const itemSeleccionado = datos.find((item) => item.id === detalleAbierto);

    return (
        <Container>
            <Title>La Bombonera</Title>

            {!detalleAbierto && (
                <CardsWrapper data-aos="zoom-in">
                    {datos.map((item) => (
                        <Card
                            key={item.id}
                            imgsrc={getImageUrl(item.imgsrc)}
                            leyenda={"Fecha: "}
                            descripcion_breve={item.descripcion_breve}
                            fecha={item.fecha}
                            onVerDetalle={() => toggleDetalle(item.id)}
                        />
                    ))}
                </CardsWrapper>
            )}

            {itemSeleccionado && (
                <DetalleWrapper>
                    <FichaDetalle
                        imgsrc={getImageUrl(itemSeleccionado.imgsrc)}
                        leyenda={"Fecha: "}
                        fecha={itemSeleccionado.fecha}
                        nombre={itemSeleccionado.descripcion_breve || "Detalle"}
                        detalle={itemSeleccionado.descripcion_larga}
                    />
                    <CerrarDetalle onClick={() => setDetalleAbierto(null)} /> {/* ✅ Usar componente */}
                </DetalleWrapper>
            )}
        </Container>
    );
}

const getImageUrl = (imgName) => {
    return new URL(`../assets/LaBombonera/${imgName}`, import.meta.url).href;
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

    @media (min-width: 700px) and (max-width: 800px) {
        font-size: 2.5rem;
    }

    @media (min-width: 480px) and (max-width: 700px) {
        font-size: 3rem;
    }

    @media (max-width: 480px) {
        font-size: 2rem;
        margin: 0;
        margin-bottom: 2rem;
        margin-top: 1rem;
    }
`;

const CardsWrapper = styled.div.attrs(() => ({
    'data-aos': 'zoom-in'
}))`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
    padding-bottom: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const DetalleWrapper = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (max-width: 768px) {
        margin-top: 1rem;
    }
`;
