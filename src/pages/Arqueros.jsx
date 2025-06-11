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
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const arqueros = datosJSON.filter((jugador) => jugador.posicion === "Arquero");
    setDatos(arqueros);
  }, []);

  // Manejo tecla Escape para cerrar lightbox
  useEffect(() => {
    if (lightboxIndex !== null) {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          cerrarLightbox();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [lightboxIndex]);

  const toggleDetalle = (id) => setDetalleAbierto(detalleAbierto === id ? null : id);
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

  // Si lightboxIndex es inválido, cerramos el lightbox para evitar error
  useEffect(() => {
    if (lightboxIndex !== null && (lightboxIndex < 0 || lightboxIndex >= datosFiltrados.length)) {
      cerrarLightbox();
    }
  }, [lightboxIndex, datosFiltrados.length]);

  // Obtener arquero seleccionado para detalle normal
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
              datosFiltrados.map((item, index) => (
                <Card
                  key={item.id}
                  imgsrc={getImageUrl(item.imagenSrc)}
                  leyenda={"Jugó en: "}
                  fecha={item.jugo}
                  descripcion_breve={`${item.nombre} ${item.apellido}`}
                  onVerDetalle={() => toggleDetalle(item.id)}
                  onImageClick={() => abrirLightbox(index)} // debe coincidir con prop que espera Card
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

      {lightboxIndex !== null && datosFiltrados[lightboxIndex] && (
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
              copasGanadas={datosFiltrados[lightboxIndex].copasGanadas}
              habilidades={datosFiltrados[lightboxIndex].habilidades}
              getCopaUrl={getCopaUrl}
            />
            <NavButton right onClick={siguienteImagen}>&rsaquo;</NavButton>
          </LightboxContent>
        </LightboxOverlay>
      )}
    </Container>
  );
}

const getImageUrl = (imgName) =>
  imgName
    ? new URL(`../assets/Jugadores/Arqueros/${imgName}`, import.meta.url).href
    : "";

const getCopaUrl = (copa) =>
  copa ? new URL(`../assets/copas/${copa}`, import.meta.url).href : "";

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
  color: white;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 0 2%;
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
  position: relative;
  z-index: 1;

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
  }

  &:hover::before {
    width: 100%;
    left: 0;
    right: auto;
  }
`;

const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
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
