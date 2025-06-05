import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

import { Card } from "../components/Card";
import { FichaDetalle } from "../components/FichaDetalle";
import { CerrarDetalle } from "../components/CerrarDetalle";
import { FiltroJugadores } from "../components/Filtros/FiltroJugadores";

import datosJSON from "../assets/data/jugadores.json";

export function Mediocampistas() {
    const [datos, setDatos] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(null);
    const [filtro, setFiltro] = useState("");
    const [criterio, setCriterio] = useState("nombre");
    const [lightboxIndex, setLightboxIndex] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

        const mediocampistas = datosJSON.filter(
            (jugador) => jugador.posicion === "Mediocampista"
        );
        setDatos(mediocampistas);
    }, []);

    useEffect(() => {
        if (lightboxIndex !== null) {
            const handleKeyDown = (e) => {
                if (e.key === "Escape") cerrarLightbox();
            };
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [lightboxIndex]);

    const toggleDetalle = (id) => setDetalleAbierto(id);
    const cerrarDetalle = () => setDetalleAbierto(null);

    const abrirLightbox = (index) => setLightboxIndex(index);
    const cerrarLightbox = () => setLightboxIndex(null);

    const siguienteImagen = () => {
        setLightboxIndex((prev) => (prev + 1) % datosFiltrados.length);
    };

    const anteriorImagen = () => {
        setLightboxIndex((prev) => (prev - 1 + datosFiltrados.length) % datosFiltrados.length);
    };

    const datosFiltrados = datos.filter((jugador) => {
        const filtroLower = filtro.toLowerCase();

        if (criterio === "nombre") {
            const nombreCompleto = `${jugador.nombre} ${jugador.apellido}`.toLowerCase();
            return nombreCompleto.includes(filtroLower);
        }

        if (criterio === "fecha") {
            return jugador.jugo.toLowerCase().includes(filtroLower);
        }

        return true;
    });

    const mediocampistaSeleccionado = datos.find(j => j.id === detalleAbierto);

    const getCopaUrl = (copa) => {
        return new URL(`../assets/copas/${copa}`, import.meta.url).href;
    };

    const getImageUrl = (imgName) => {
        return new URL(`../assets/Jugadores/Mediocampistas/${imgName}`, import.meta.url).href;
    };

    return (
        <Container>
            <Title>Mediocampistas</Title>

            <FiltroJugadores
                filtro={filtro}
                setFiltro={setFiltro}
                criterio={criterio}
                setCriterio={setCriterio}
            />

            {!detalleAbierto && (
                <CardsWrapper data-aos="zoom-in">
                    {datosFiltrados.length > 0 ? (
                        datosFiltrados.map((item, index) => (
                            <Card
                                key={item.id}
                                imgsrc={getImageUrl(item.imagenSrc)}
                                leyenda={"Jugó en: "}
                                fecha={item.jugo}
                                descripcion_breve={`${item.nombre} ${item.apellido}`}
                                onVerDetalle={() => toggleDetalle(item.id)}
                                onImageClick={() => abrirLightbox(index)}
                            />
                        ))
                    ) : (
                        <NoResults>No se encontraron mediocampistas con esos filtros.</NoResults>
                    )}
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
                        habilidades={mediocampistaSeleccionado.habilidades}
                        copasGanadas={mediocampistaSeleccionado.copasGanadas}
                        getCopaUrl={getCopaUrl}
                        onClickImagen={() =>
                            abrirLightbox(
                                datosFiltrados.findIndex(j => j.id === detalleAbierto)
                            )
                        }
                    />
                    <CerrarDetalle onClick={cerrarDetalle} />
                </DetalleWrapper>
            )}

            {lightboxIndex !== null && (
                <LightboxOverlay onClick={cerrarLightbox}>
                    <LightboxContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={cerrarLightbox}>&times;</CloseButton>
                        <NavButton left onClick={anteriorImagen}>&lsaquo;</NavButton>
                        <FichaDetalle
                            imgsrc={getImageUrl(datosFiltrados[lightboxIndex].imagenSrc)}
                            leyenda={"Jugó en: "}
                            fecha={datosFiltrados[lightboxIndex].jugo}
                            nombre={`${datosFiltrados[lightboxIndex].nombre} ${datosFiltrados[lightboxIndex].apellido}`}
                            detalle={datosFiltrados[lightboxIndex].descripcion}
                            habilidades={datosFiltrados[lightboxIndex].habilidades}
                            copasGanadas={datosFiltrados[lightboxIndex].copasGanadas}
                            getCopaUrl={getCopaUrl}
                        />
                        <NavButton right onClick={siguienteImagen}>&rsaquo;</NavButton>
                    </LightboxContent>
                </LightboxOverlay>
            )}
        </Container>
    );
}

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

const NoResults = styled.p`
    color: white;
    font-size: 1.2rem;
    margin-top: 2rem;
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
