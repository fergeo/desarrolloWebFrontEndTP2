import React, { useState } from "react";
import { MyRoutes } from "./routers/routes";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Light, Dark } from "./styles/Themes";

export const ThemeContext = React.createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Estado para controlar la visibilidad de los botones del sidebar
  const [visibleLinks, setVisibleLinks] = useState({
    Home: true,
    LaBombonera: true,
    Arqueros: true,
    Defensores: true,
    Mediocampistas: true,
    Delanteros: true,
    Clima: true,
    Bitacora: true,
  });

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <BrowserRouter>
          <Container>
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              visibleLinks={visibleLinks}
            />
            <Content $sidebarOpen={sidebarOpen}>
              <MyRoutes
                visibleLinks={visibleLinks}
                setVisibleLinks={setVisibleLinks}
              />
            </Content>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  position: relative;
`;

const Content = styled.div`
  flex: 1;
  height: 100%;
  transition: all 0.3s ease;
  box-sizing: border-box;
  overflow-y: auto;

  /* Escritorio */
  @media (min-width: 781px) {
    margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? "10px" : "30px")};
    padding: 5px 20px 5px 0; /* quitar padding izquierdo */
  }

  /* Móvil */
  @media (max-width: 780px) {
    margin-left: 0;
    padding: 5px 20px; /* padding estándar solo horizontal */
  }
`;

export default App;
