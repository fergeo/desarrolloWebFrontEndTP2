import styled, { keyframes } from "styled-components";

export function EscudoCamista({ leftSrc, rightSrc }) {
    return (
        <ImageContainer>
            <StyledImage src={leftSrc} alt="Izquierda" className="left-image" />
            <StyledImage src={rightSrc} alt="Derecha" className="right-image" />
        </ImageContainer>
    );
}

// 🔁 Animación estilo encendido de tubo (CRT)
const crtStartup = keyframes`
    0% {
        transform: scaleY(0.05) scaleX(1);
        filter: brightness(5) blur(2px);
        opacity: 0.7;
    }
    30% {
        transform: scaleY(1) scaleX(0.05);
        filter: brightness(3) blur(1px);
    }
    60% {
        transform: scale(1.05);
        filter: brightness(2);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        filter: brightness(1);
        opacity: 1;
    }
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;

    @media (max-width: 480px) {
        justify-content: center;
    }
`;

const StyledImage = styled.img`
    width: 150px;
    height: auto;
    border-radius: 100%;
    animation: ${crtStartup} 1.2s ease-out;

    &.right-image {
        @media (max-width: 480px) {
            display: none;
        }
    }
`;
