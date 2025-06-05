import React from "react";
import styled from "styled-components";
import { EscudoCamista } from "../components/Home/EscudoCamiseta";
import { ImageCarousel } from "../components/ImageCarousel";
import leftImage1 from "../assets/Home/left1.png";
import rightImage1 from "../assets/Home/right1.jpg";
import leftImage2 from "../assets/Home/left2.jpg";
import rightImage2 from "../assets/Home/right2.jpg";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export function Home({ sidebarOpen, visibleLinks, setVisibleLinks }) {
  const allSidebarKeys = [
    "LaBombonera", "Arqueros", "Defensores",
    "Mediocampistas", "Delanteros", "Clima en Bs. As.", "Bitacora"
  ];

  const normalizedLinks = allSidebarKeys.reduce((acc, key) => {
    acc[key] = visibleLinks[key] ?? true;
    return acc;
  }, {});

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setVisibleLinks((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <Wrapper>
      <Container $sidebarOpen={sidebarOpen}>
        <EscudoCamista leftSrc={leftImage1} rightSrc={rightImage1} />
        <Title>Historia de Boca Juniors</Title>
        <EscudoCamista leftSrc={leftImage2} rightSrc={rightImage2} />

        <ControlPanel>
          <h2>Mostrar / Ocultar botones del Sidebar</h2>
          <CheckboxesContainer>
            <label><input type="checkbox" checked disabled />Home</label>
            {allSidebarKeys.map((key) => (
              <label key={key}>
                <input
                  type="checkbox"
                  name={key}
                  checked={normalizedLinks[key]}
                  onChange={handleCheckboxChange}
                />
                {key}
              </label>
            ))}
          </CheckboxesContainer>
        </ControlPanel>

        <CarouselWrapper>
          <ImageCarousel />
        </CarouselWrapper>

        <RedesSociales>
          <IconLink
            href="https://github.com/fergeo"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <FaGithub />
          </IconLink>
          <IconLink
            href="https://www.linkedin.com/in/fernandoespindolaomastott/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <FaLinkedin />
          </IconLink>
          <IconLink
            href="https://www.instagram.com/fernando_espindola_o/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <FaInstagram />
          </IconLink>
        </RedesSociales>
      </Container>
    </Wrapper>
  );
}

// ESTILOS
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;

  @media (max-width: 480px) {
    margin-left: 10%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  padding: ${(props) => (props.$sidebarOpen ? "3rem 1rem" : "2rem 1rem")};
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin: 2rem 0;

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const ControlPanel = styled.div`
  background-color: #0b2545;
  color: white;
  padding: 1.5rem 2rem;
  margin-top: 3rem;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
`;

const CheckboxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  label {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    cursor: pointer;

    input {
      margin-right: 0.5rem;
      cursor: pointer;
    }

    input:disabled {
      cursor: not-allowed;
    }
  }
`;

const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 4rem;
  padding: 2rem;
  background-color: #000c2d;
  border-radius: 12px;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RedesSociales = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 2rem;
`;

const IconLink = styled.a`
  color: white;
  font-size: 2.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.3);
  }
`;
