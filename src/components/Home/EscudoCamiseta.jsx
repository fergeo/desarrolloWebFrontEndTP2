import styled from "styled-components";

export function EscudoCamista({ leftSrc, rightSrc }) {
    return (
        <ImageContainer>
            <StyledImage src={leftSrc} alt="Izquierda" className="left-image" />
            <StyledImage src={rightSrc} alt="Derecha" className="right-image" />
        </ImageContainer>
    );
}

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

    /* Ocultar la imagen derecha en móvil */
    &.right-image {
        @media (max-width: 480px) {
            display: none;
        }
    }
`;
