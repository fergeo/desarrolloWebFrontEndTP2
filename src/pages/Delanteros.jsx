import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card } from "../components/Card";
import { FichaDetalle } from "../components/FichaDetalle";
import { CerrarDetalle } from "../components/CerrarDetalle";
import { FiltroJugadores } from "../components/Filtros/FiltroJugadores";
import datosJSON from "../assets/data/jugadores.json";

export function Delanteros() {
    const [datos, setDatos] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(null);
    const [filtro, setFiltro] = useState("");
    const [criterio, setCriterio] = useState("nombre"); // nombre o fecha

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

        const delanteros = datosJSON.filter((jugador) => jugador.posicion === "Delantero");
        setDatos(delanteros);
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

    const delanteroSeleccionado = datos.find((j) => j.id === detalleAbierto);

    // Función para cargar imágenes de copas (usar en FichaDetalle)
    const getCopaUrl = (copa) => {
        return new URL(`../assets/copas/${copa}`, import.meta.url).href;
    };

    // Función para cargar imágenes de jugadores
    const getImageUrl = (imgName) => {
        return new URL(`../assets/Jugadores/Delanteros/${imgName}`, import.meta.url).href;
    };

    return (
        <Container>
            <Title>Delanteros</Title>

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
                            <NoResults>No se encontraron delanteros con esos filtros.</NoResults>
                        )}
                    </CardsWrapper>
                </div>
            )}

            {delanteroSeleccionado && (
                <DetalleWrapper>
                    <FichaDetalle
                        imgsrc={getImageUrl(delanteroSeleccionado.imagenSrc)}
                        leyenda={"Jugó en: "}
                        fecha={delanteroSeleccionado.jugo}
                        nombre={`${delanteroSeleccionado.nombre} ${delanteroSeleccionado.apellido}`}
                        detalle={delanteroSeleccionado.descripcion}
                        habilidades={delanteroSeleccionado.habilidades}
                        copasGanadas={delanteroSeleccionado.copasGanadas}
                        getCopaUrl={getCopaUrl}
                    />
                    <CerrarDetalle onClick={cerrarDetalle} />
                </DetalleWrapper>
            )}
        </Container>
    );
}

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
