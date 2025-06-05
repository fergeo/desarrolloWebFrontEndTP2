import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Card } from "../components/Card";
import { FichaDetalle } from "../components/FichaDetalle";
import { CerrarDetalle } from "../components/CerrarDetalle";
import datosJSON from "../assets/data/laBombonera.json";

export function LaBombonera() {
    const [datos, setDatos] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        setDatos(datosJSON);
    }, []);

    const toggleDetalle = (id) => {
        setDetalleAbierto(detalleAbierto === id ? null : id);
    };

    const abrirLightbox = (index) => {
        setLightboxIndex(index);
    };

    const siguienteImagen = () => {
        setLightboxIndex((prev) => (prev + 1) % datos.length);
    };

    const anteriorImagen = () => {
        setLightboxIndex((prev) => (prev - 1 + datos.length) % datos.length);
    };

    const cerrarLightbox = () => setLightboxIndex(null);

    const itemSeleccionado = datos.find((item) => item.id === detalleAbierto);

    return (
        <Container>
            <Title>La Bombonera</Title>

            {!detalleAbierto && (
                <CardsWrapper>
                    {datos.map((item, index) => (
                        <Card
                            key={item.id}
                            imgsrc={getImageUrl(item.imgsrc)}
                            leyenda={"Fecha: "}
                            descripcion_breve={item.descripcion_breve}
                            fecha={item.fecha}
                            onVerDetalle={() => toggleDetalle(item.id)}
                            onImageClick={() => abrirLightbox(index)}
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
                        copasGanadas={itemSeleccionado.copasGanadas}
                        habilidades={itemSeleccionado.habilidades}
                    />
                    <CerrarDetalle onClick={() => setDetalleAbierto(null)} />
                </DetalleWrapper>
            )}

            {lightboxIndex !== null && (
                <LightboxOverlay onClick={cerrarLightbox}>
                    <LightboxContent onClick={e => e.stopPropagation()}>
                        <CloseButton onClick={cerrarLightbox}>&times;</CloseButton>
                        <NavButton left onClick={anteriorImagen}>&lsaquo;</NavButton>
                        <FichaDetalle
                            imgsrc={getImageUrl(datos[lightboxIndex].imgsrc)}
                            leyenda={"Fecha: "}
                            fecha={datos[lightboxIndex].fecha}
                            nombre={datos[lightboxIndex].descripcion_breve}
                            detalle={datos[lightboxIndex].descripcion_larga}
                            copasGanadas={datos[lightboxIndex].copasGanadas}
                            habilidades={datos[lightboxIndex].habilidades}
                        />
                        <NavButton right onClick={siguienteImagen}>&rsaquo;</NavButton>
                    </LightboxContent>
                </LightboxOverlay>
            )}
        </Container>
    );
}

const getImageUrl = (imgName) => {
    return new URL(`../assets/LaBombonera/${imgName}`, import.meta.url).href;
};

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

const LightboxOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const LightboxContent = styled.div`
    position: relative;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 3rem;
    color: white;
    background: transparent;
    border: none;
    cursor: pointer;
    user-select: none;
`;

const NavButton = styled.button`
    position: absolute;
    top: 50%;
    ${({ left }) => left ? 'left: 15px;' : 'right: 15px;'}
    transform: translateY(-50%);
    font-size: 3rem;
    color: white;
    background: transparent;
    border: none;
    cursor: pointer;
    user-select: none;
    padding: 0 10px;
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }
`;
