import styled from "styled-components";
import { EscudoCamista } from "../components/Home/EscudoCamiseta";
import leftImage1 from "../assets/Home/left1.png";
import rightImage1 from "../assets/Home/right1.jpg";
import leftImage2 from "../assets/Home/left2.jpg";
import rightImage2 from "../assets/Home/right2.jpg";

export function Home({ sidebarOpen }) {
  return (
    <Wrapper>
      <Container $sidebarOpen={sidebarOpen}>
        <EscudoCamista leftSrc={leftImage1} rightSrc={rightImage1} />
        <Title>Historia de Boca Juniors</Title>
        <EscudoCamista leftSrc={leftImage2} rightSrc={rightImage2} />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  
  @media (max-width: 480px) {
      margin-left: 10%;
  }
`;

// Container se ajusta según si el sidebar está abierto
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  min-height: 100vh;

  padding: ${(props) => (props.$sidebarOpen ? "3rem 1rem" : "2rem 1rem")};
  transition: padding 0.3s ease;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin: 2rem 0;

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }

  @media (min-width: 1025px) {
    font-size: 3rem;
  }
`;
