import React from "react";
import styled from "styled-components";

export const CerrarDetalle = ({ onClick }) => {
    return <StyledButton onClick={onClick}>Cerrar</StyledButton>;
};

const StyledButton = styled.button`
    margin-top: 1.5rem;
    padding: 0.55rem 1.32rem; /* 10% más grande */
    font-size: 1.1rem;
    background-color: #082568; /* Azul más oscuro */
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: transform 0.3s ease;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 100%;
        background-color: #1565c0; /* Azul de relleno */
        transition: left 0.4s ease;
        z-index: -1;
    }

    &:hover::before {
        left: 0; /* Rellena de derecha a izquierda */
    }

    &:hover {
        transform: scale(1.05);
    }
`;
