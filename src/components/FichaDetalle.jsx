import React from "react";
import styled from "styled-components";

export function FichaDetalle({ imgsrc, fecha, nombre, detalle, leyenda }) {
    return (
        <Card>
            <Image src={imgsrc} alt={nombre} />
            <Content>
                <Fecha>{leyenda}{fecha}</Fecha>
                <Nombre>{nombre}</Nombre>
                <Detalle>{detalle}</Detalle>
            </Content>
        </Card>
    );
}

// Styled Components
const Card = styled.div`
    border-radius: 8px;
    padding: 22px; /* 16px + 40% */
    max-width: 560px; /* 400px + 40% */
    display: flex;
    flex-direction: row;
    gap: 22px; /* 16px + 40% */
    align-items: flex-start;
    background-color: #0a0f2c;
    font-size: 1.4rem; /* Aumentado globalmente */
    margin: 0 auto;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-left: 5%;
        margin-right: 5%;
    }
`;

const Image = styled.img`
    width: 168px; /* 120px + 40% */
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
    font-size: 1.26rem; /* 0.9rem + 40% */
    color: #aaa;
    margin: 0 0 12px 0;
`;

const Nombre = styled.h2`
    font-size: 1.96rem; /* 1.4rem + 40% */
    color: yellow;
    margin: 0 0 16px 0;
`;

const Detalle = styled.p`
    font-size: 1.4rem; /* 1rem + 40% */
    color: #ccc;
    margin: 0;
`;
