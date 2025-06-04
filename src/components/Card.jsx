import React from "react";
import styled from "styled-components";

export function Card({ imgsrc, descripcion_breve, leyenda, fecha, onVerDetalle }) {
    return (
        <Section>
            <CardContainer>
                <ImageWrapper>
                    <CardImage src={imgsrc} alt="Imagen" />
                </ImageWrapper>
                <CardBody>
                    <CardTitle>{descripcion_breve}</CardTitle>
                    <CardSubtitle>{leyenda}{fecha}</CardSubtitle>
                    <CardButton href="#" onClick={(e) => { e.preventDefault(); onVerDetalle(); }}>
                        Ver Detalles
                    </CardButton>
                </CardBody>
            </CardContainer>
        </Section>
    );
}

// Styled Components
const Section = styled.section`
    position: relative;
    border-radius: 0.5rem;
    height: 100vh; 
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 0 auto;
    background-color: #0a0f2c;

    @media (max-width: 480px) {
        width: 73vw;
        height: 80vh;
        margin-bottom: 1rem;
    }
`;

const CardContainer = styled.div`
    width: 14.4vw; 
    height: 82vh; 
    max-width: 270px;
    min-width: 225px;
    background: #1e2a56;
    color: #fff;
    text-align: center;
    border-radius: 0.5rem;
    overflow: hidden;
    margin: 1rem;
    transition: box-shadow 0.3s ease, width 0.3s ease;
    position: relative;
    top: 5%;

    &:hover {
        box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253);
    }

    &:hover img {
        transform: scale(1.2); /* Agrandado del 20% */
    }

    @media (max-width: 1024px) {
        width: 30vw;
        height: auto;
    }

    @media (max-width: 768px) {
        width: 80vw;
        height: auto;
    }

    @media (max-width: 480px) {
        width: 6vw;
    }
`;

const ImageWrapper = styled.div`
    overflow: hidden;
`;

const CardImage = styled.img`
    width: 100%;
    height: 52vh;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;

    @media (max-width: 480px) {
        width: 60vw;
        height: auto;
    }
`;

const CardBody = styled.div`
    padding: 1rem;
`;

const CardTitle = styled.h4`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #ffd700;
`;

const CardSubtitle = styled.h4`
    font-size: 1rem;
    font-weight: normal;
    color: #dcdcdc;
`;

const CardButton = styled.a`
    position: relative;
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    color: #ffd700;
    border: 1px solid #ffd700;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    overflow: hidden;
    z-index: 1;
    transition: color 0.3s ease;

    &:hover {
        color: #0a0f2c;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background: #ffd700;
        z-index: -1;
        transition: width 0.4s ease;
    }

    &:hover::before {
        width: 100%;
    }
`;
