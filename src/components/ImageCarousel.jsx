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

  // Función para obtener imagen según tipo
  const getImageUrl = (imgName, type) => {
    switch (type.toLowerCase()) {
      case "bombonera":
        return new URL(`../assets/LaBombonera/${imgName}`, import.meta.url).href;
      case "arquero":
        return new URL(`../assets/Jugadores/Arqueros/${imgName}`, import.meta.url).href;
      case "defensor":
        return new URL(`../assets/Jugadores/Defensores/${imgName}`, import.meta.url).href;
      case "delantero":
        return new URL(`../assets/Jugadores/Delanteros/${imgName}`, import.meta.url).href;
      case "mediocampista":
        return new URL(`../assets/Jugadores/Mediocampistas/${imgName}`, import.meta.url).href;
      default:
        console.warn(`Posición desconocida: ${type}`);
        return ""; // o una imagen por defecto
    }
  };

  const combinedImages = [
    ...bomboneraData.map((item) => ({
      type: "bombonera",
      img: getImageUrl(item.imgsrc, "bombonera"),
    })),
    ...jugadoresData.map((jugador) => {
      const posicion = jugador.posicion.toLowerCase(); // Ej: "defensores"
      return {
        type: "jugador",
        img: getImageUrl(jugador.imagenSrc, posicion),
        posicion,
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
  width: 100%;
  height: auto;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
