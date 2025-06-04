import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

import { Card } from "../components/Card";
import { FichaDetalle } from "../components/FichaDetalle";
import { CerrarDetalle } from "../components/CerrarDetalle";
import { FiltroJugadores } from "../components/Filtros/FiltroJugadores"; // ✅ Importado

import datosJSON from "../assets/data/jugadores.json";

export function Mediocampistas() {
    const [datos, setDatos] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(null);
    const [filtro, setFiltro] = useState("");
    const [criterio, setCriterio] = useState("nombre");

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

        const mediocampistas = datosJSON.filter(
            (jugador) => jugador.posicion === "Mediocampista"
        );
        setDatos(mediocampistas);
    }, []);

    const toggleDetalle = (id) => {
        setDetalleAbierto(id);
    };

    const cerrarDetalle = () => {
        setDetalleAbierto(null);
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

    const mediocampistaSeleccionado = datos.find(
        (j) => j.id === detalleAbierto
    );

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
                    />
                    <CerrarDetalle onClick={cerrarDetalle} />
                </DetalleWrapper>
            )}
        </Container>
    );
}

const getImageUrl = (imgName) => {
    return new URL(
        `../assets/Jugadores/Mediocampistas/${imgName}`,
        import.meta.url
    ).href;
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
