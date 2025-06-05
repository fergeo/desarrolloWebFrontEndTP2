import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card } from "../components/Card";
import { FichaDetalle } from "../components/FichaDetalle";
import { CerrarDetalle } from "../components/CerrarDetalle";
import { FiltroJugadores } from "../components/Filtros/FiltroJugadores"; // ✅ Importar filtro
import datosJSON from "../assets/data/jugadores.json";

export function Defensores() {
    const [datos, setDatos] = useState([]);
    const [detalleAbierto, setDetalleAbierto] = useState(null);
    const [filtro, setFiltro] = useState("");
    const [criterio, setCriterio] = useState("nombre"); // "nombre" o "fecha"

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        const defensores = datosJSON.filter((jugador) => jugador.posicion === "Defensor");
        setDatos(defensores);
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

const NoResults = styled.p`
    color: white;
    font-size: 1.2rem;
    margin-top: 2rem;
`;
