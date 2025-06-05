import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import jugadoresData from "../assets/data/jugadores.json";
import bomboneraData from "../assets/data/laBombonera.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function ImageCarousel() {
  const navigate = useNavigate();

  // Mapeo de posiciones para pluralizar correctamente y para formar rutas + paths
  const posicionMap = {
    arquero: "arqueros",
    defensor: "defensores",
    delantero: "delanteros",
    mediocampista: "mediocampistas",
  };

  const getImageUrl = (imgName, posicion) => {
    const carpeta = posicionMap[posicion.toLowerCase()];
    if (!carpeta) {
      console.warn(`Posición desconocida: ${posicion}`);
      return "";
    }
    return new URL(`../assets/Jugadores/${carpeta.charAt(0).toUpperCase() + carpeta.slice(1)}/${imgName}`, import.meta.url).href;
  };

  const combinedImages = [
    ...bomboneraData.map((item) => ({
      type: "bombonera",
      img: new URL(`../assets/LaBombonera/${item.imgsrc}`, import.meta.url).href,
    })),
    ...jugadoresData.map((jugador) => {
      const posicionSingular = jugador.posicion.toLowerCase(); // Ej: 'defensor'
      const posicionRuta = posicionMap[posicionSingular]; // Ej: 'defensores'
      return {
        type: "jugador",
        img: getImageUrl(jugador.imagenSrc, posicionSingular),
        posicion: posicionRuta,
      };
    }),
  ];

  const handleImageClick = (item) => {
    if (item.type === "bombonera") {
      navigate("/laBombonera");
    } else if (item.type === "jugador") {
      navigate(`/${item.posicion}`);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <CarouselWrapper>
      <Slider {...settings}>
        {combinedImages.map((item, index) => (
          <div key={index}>
            <Image
              src={item.img}
              alt={`Slide ${index}`}
              onClick={() => handleImageClick(item)}
            />
          </div>
        ))}
      </Slider>
    </CarouselWrapper>
  );
}

// ESTILOS
const CarouselWrapper = styled.div`
  width: 90%;
  margin: 2rem auto;

  .slick-prev,
  .slick-next {
    z-index: 2;
  }

  .slick-slide {
    padding: 0 10px;
  }
`;

const Image = styled.img`
  width: 60%;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
