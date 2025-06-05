import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card } from "../components/Card";
import { FichaDetalle } from "../components/FichaDetalle";
import { CerrarDetalle } from "../components/CerrarDetalle";
import { FiltroJugadores } from "../components/Filtros/FiltroJugadores";
import datosJSON from "../assets/data/jugadores.json";

export function Defensores() {
    const [datos, setDatos] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(null);
    const [filtro, setFiltro] = useState("");
    const [criterio, setCriterio] = useState("nombre");
    const [lightboxIndex, setLightboxIndex] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        const defensores = datosJSON.filter((jugador) => jugador.posicion === "Defensor");
        setDatos(defensores);
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
        setLightboxIndex((prev) => (prev + 1) % datos.length);
    };

    const anteriorImagen = () => {
        setLightboxIndex((prev) => (prev - 1 + datos.length) % datos.length);
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

    const defensorSeleccionado = datos.find((j) => j.id === detalleAbierto);

    return (
        <Container>
            <Title>Defensores</Title>

            <FiltroJugadores
                filtro={filtro}
                setFiltro={setFiltro}
                criterio={criterio}
                setCriterio={setCriterio}
            />

            {!detalleAbierto && (
                <div data-aos="zoom-in">
                    <CardsWrapper>
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
                            <NoResults>No se encontraron defensores con esos filtros.</NoResults>
                        )}
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
                        copasGanadas={defensorSeleccionado.copasGanadas || []}
                        habilidades={defensorSeleccionado.habilidades || {}}
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
                            imgsrc={getImageUrl(datos[lightboxIndex].imagenSrc)}
                            leyenda={"Jugó en: "}
                            fecha={datos[lightboxIndex].jugo}
                            nombre={`${datos[lightboxIndex].nombre} ${datos[lightboxIndex].apellido}`}
                            detalle={datos[lightboxIndex].descripcion}
                            copasGanadas={datos[lightboxIndex].copasGanadas || []}
                            habilidades={datos[lightboxIndex].habilidades || {}}
                        />
                        <NavButton right onClick={siguienteImagen}>&rsaquo;</NavButton>
                    </LightboxContent>
                </LightboxOverlay>
            )}
        </Container>
    );
}

const getImageUrl = (imgName) =>
    new URL(`../assets/Jugadores/Defensores/${imgName}`, import.meta.url).href;

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

const NoResults = styled.p`
    color: white;
    font-size: 1.2rem;
    margin-top: 2rem;
`;

const LightboxOverlay = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
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
    ${({ left }) => (left ? "left: 15px;" : "right: 15px;")}
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
