import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card } from "../components/Card";
import { FichaDetalle } from "../components/FichaDetalle";
import { FiltroJugadores } from "../components/Filtros/FiltroJugadores";
import datosJSON from "../assets/data/jugadores.json";

export function Arqueros() {
    const [datos, setDatos] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(null);
    const [filtro, setFiltro] = useState("");
    const [criterio, setCriterio] = useState("nombre");

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        const arqueros = datosJSON.filter((jugador) => jugador.posicion === "Arquero");
        setDatos(arqueros);
    }, []);

    const toggleDetalle = (id) => setDetalleAbierto(id);
    const cerrarDetalle = () => setDetalleAbierto(null);

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

    const arqueroSeleccionado = datos.find((j) => j.id === detalleAbierto);

    return (
        <Container>
            <Title>Arqueros</Title>

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
                            datosFiltrados.map((item) => (
                                <Card
                                    key={item.id}
                                    imgsrc={getImageUrl(item.imagenSrc)}
                                    leyenda={"Jugó en: "}
                                    fecha={item.jugo}
                                    descripcion_breve={`${item.nombre} ${item.apellido}`}
                                    onVerDetalle={() => toggleDetalle(item.id)}
                                />
                            ))
                        ) : (
                            <NoResults>No se encontraron jugadores con esos filtros.</NoResults>
                        )}
                    </CardsWrapper>
                </div>
            )}

            {arqueroSeleccionado && (
                <DetalleWrapper>
                    <FichaDetalle
                        imgsrc={getImageUrl(arqueroSeleccionado.imagenSrc)}
                        leyenda={"Jugó en: "}
                        fecha={arqueroSeleccionado.jugo}
                        nombre={`${arqueroSeleccionado.nombre} ${arqueroSeleccionado.apellido}`}
                        detalle={arqueroSeleccionado.descripcion}
                        copasGanadas={arqueroSeleccionado.copasGanadas}
                        habilidades={arqueroSeleccionado.habilidades}
                        getCopaUrl={getCopaUrl}
                    />
                    <CerrarButton onClick={cerrarDetalle}>Cerrar</CerrarButton>
                </DetalleWrapper>
            )}
        </Container>
    );
}

// Utils
const getImageUrl = (imgName) => {
    return new URL(`../assets/Jugadores/Arqueros/${imgName}`, import.meta.url).href;
};

const getCopaUrl = (copa) => {
    return new URL(`../assets/copas/${copa}`, import.meta.url).href;
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
    padding: 0 2%;
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

const CerrarButton = styled.button`
    margin-top: 1.5rem;
    padding: 0.5rem 1.2rem;
    font-size: 1rem;
    color: white;
    background-color: #082568;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    z-index: 1;
    transition: color 0.4s ease, transform 0.4s ease;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 100%;
        background: #1565c0;
        z-index: -1;
        transition: width 0.4s ease;
    }

    &:hover {
        color: #0a0f2c;
        transform: scale(1.1);
    }

    &:hover::before {
        width: 100%;
        left: 0;
        right: auto;
    }
`;
