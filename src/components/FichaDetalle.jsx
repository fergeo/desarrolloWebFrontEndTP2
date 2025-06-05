import React from "react";
import styled, { keyframes } from "styled-components";

const MAPA_ICONOS_COPAS = {
    "Copa Intercontinental": "https://cdn-icons-png.flaticon.com/512/2583/2583279.png",
    "Copa Argentina": "https://cdn-icons-png.flaticon.com/512/1822/1822921.png",
    "Copa Libertadores": "https://cdn-icons-png.flaticon.com/512/2583/2583281.png",
    "Supercopa Sudamericana": "https://cdn-icons-png.flaticon.com/512/2583/2583283.png",
    "Torneo Apertura": "https://cdn-icons-png.flaticon.com/512/2583/2583285.png",
    "Recopa Sudamericana": "https://cdn-icons-png.flaticon.com/512/2583/2583287.png",
    "Torneo Clausura": "https://cdn-icons-png.flaticon.com/512/2583/2583289.png",
};

export function FichaDetalle({
    imgsrc,
    fecha,
    nombre,
    detalle,
    leyenda,
    copasGanadas = [],
    habilidades = {},
    mostrarExtras = true,
    onImageClick = null
}) {
    return (
        <Card>
            <ImageWrapper>
                <Image
                    src={imgsrc}
                    alt={nombre}
                    onClick={onImageClick}
                    style={{ cursor: onImageClick ? 'pointer' : 'default' }}
                />
            </ImageWrapper>
            <Content>
                <Fecha>{leyenda}{fecha}</Fecha>
                <Nombre>{nombre}</Nombre>
                <Detalle>{detalle}</Detalle>

                {mostrarExtras && (
                    <>
                        <Subtitulo>Copas ganadas:</Subtitulo>
                        {copasGanadas.length > 0 ? (
                            <IconRow>
                                {copasGanadas.map((copaNombre, index) => {
                                    const urlIcono = MAPA_ICONOS_COPAS[copaNombre];
                                    return urlIcono ? (
                                        <CopaIcon
                                            key={index}
                                            src={urlIcono}
                                            alt={`Copa ${copaNombre}`}
                                            title={copaNombre}
                                        />
                                    ) : null;
                                })}
                            </IconRow>
                        ) : (
                            <TextoSecundario>No ganó copas</TextoSecundario>
                        )}

                        <Subtitulo>Habilidades:</Subtitulo>
                        <Lista>
                            <li>
                                Stamina
                                <BarContainer>
                                    <AnimatedBar percent={habilidades.stamina ?? 0} />
                                </BarContainer>
                            </li>
                            <li>
                                Velocidad
                                <BarContainer>
                                    <AnimatedBar percent={habilidades.velocidad ?? 0} />
                                </BarContainer>
                            </li>
                            <li>
                                Precisión
                                <BarContainer>
                                    <AnimatedBar percent={habilidades.precision ?? 0} />
                                </BarContainer>
                            </li>
                        </Lista>
                    </>
                )}
            </Content>
        </Card>
    );
}

// Animaciones y estilos

const pulse = (percent) => keyframes`
    0% { width: 0%; }
    50% { width: ${percent}%; }
    100% { width: 0%; }
`;

const Card = styled.div`
    border-radius: 8px;
    padding: 22px;
    max-width: 560px;
    display: flex;
    flex-direction: row;
    gap: 22px;
    align-items: flex-start;
    background-color: #0a0f2c;
    font-size: 1.4rem;
    margin: 0 auto;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-left: 5%;
        margin-right: 5%;
    }
`;

const ImageWrapper = styled.div``;

const Image = styled.img`
    width: 168px;
    height: auto;
    border-radius: 6px;
    object-fit: cover;

    @media (max-width: 768px) {
        width: 100%;
        max-width: 250px;
    }
`;

const Content = styled.div`
    text-align: left;
    flex: 1;

    @media (max-width: 768px) {
        text-align: center;
    }
`;

const Fecha = styled.p`
    font-size: 1.26rem;
    color: #aaa;
    margin: 0 0 12px 0;
`;

const Nombre = styled.h2`
    font-size: 1.96rem;
    color: yellow;
    margin: 0 0 16px 0;
`;

const Detalle = styled.p`
    font-size: 1.4rem;
    color: #ccc;
    margin: 0;
`;

const Subtitulo = styled.h3`
    color: #fff;
    margin-top: 20px;
    font-size: 1.4rem;
`;

const Lista = styled.ul`
    padding-left: 20px;
    color: #ccc;

    li {
        margin-bottom: 12px;
    }
`;

const TextoSecundario = styled.p`
    color: #aaa;
    font-style: italic;
`;

const BarContainer = styled.div`
    width: 100%;
    height: 12px;
    background-color: #1c1c1c;
    border-radius: 6px;
    overflow: hidden;
    margin-top: 4px;
    margin-bottom: 10px;
`;

const AnimatedBar = styled.div`
    height: 100%;
    background: linear-gradient(90deg, #00bcd4, #0088cc);
    border-radius: 6px;
    animation: ${({ percent }) => pulse(percent)} 3s ease-in-out infinite;
`;

const IconRow = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 8px;
    margin-bottom: 12px;
`;

const CopaIcon = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #ccc;
`;
