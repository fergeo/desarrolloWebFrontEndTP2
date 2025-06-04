import styled from "styled-components";
import { v } from "../styles/Variables";
import logo from "../assets/fenix.jpeg";
import { AiOutlineHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../App";

// Íconos personalizados
import laBombonera from "../assets/iconos/laBombonera.jpg";
import arquero from "../assets/iconos/arquero.jpg";
import defensor from "../assets/iconos/defensor.png";
import mediocampista from "../assets/iconos/nediocampista.png";
import delantero from "../assets/iconos/delantero.jpg";
import clima from "../assets/iconos/clima.jpg";
import bitacora from "../assets/iconos/bitacora.png";

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { setTheme, theme } = useContext(ThemeContext);

  const CambiarTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  const abrirSidebar = () => {
    if (!sidebarOpen && window.innerWidth > 780) {
      setSidebarOpen(true);
    }
  };

  const cerrarSidebar = () => {
    if (sidebarOpen) setSidebarOpen(false);
  };

  useEffect(() => {
    const body = document.body;
    if (!sidebarOpen) {
      body.style.marginTop = "0";
      body.style.marginBottom = "0";
      body.style.paddingTop = "0";
      body.style.paddingBottom = "0";
    } else {
      body.style.marginTop = "";
      body.style.marginBottom = "";
      body.style.paddingTop = "";
      body.style.paddingBottom = "";
    }
  }, [sidebarOpen]);

  return (
    <Container
      $isOpen={sidebarOpen}
      themeUse={theme}
      onMouseEnter={abrirSidebar}
      onMouseLeave={cerrarSidebar}
    >
      <div className="Logocontent">
        <div className="imgcontent">
          <img src={logo} alt="Logo" />
        </div>
      </div>

      {linksArray.map(({ icon, label, to }) => (
        <div className="LinkContainer" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `Links${isActive ? " active" : ""}`}
          >
            <div className="Linkicon">{icon}</div>
            <span className="link-label">{label}</span>
          </NavLink>
        </div>
      ))}

      <Divider />

      <div className="Themecontent" $isOpen={sidebarOpen}>
        <span className="titletheme">Dark mode</span>
        <div className="Togglecontent" $isOpen={sidebarOpen}>
          <label className="switch">
            <input
              type="checkbox"
              onClick={CambiarTheme}
              checked={theme === "dark"}
              readOnly
            />
            <span className="slider round" />
          </label>
        </div>
      </div>
    </Container>
  );
}

const linksArray = [
  { label: "Home", icon: <AiOutlineHome />, to: "/" },
  { label: "La Bombonera", icon: <img src={laBombonera} alt="Ir a La Bombonera" />, to: "/laBombonera" },
  { label: "Arqueros", icon: <img src={arquero} alt="Ir a Arqueros" />, to: "/arqueros" },
  { label: "Defensores", icon: <img src={defensor} alt="Ir a Defensores" />, to: "/defensores" },
  { label: "Mediocampistas", icon: <img src={mediocampista} alt="Ir a Mediocampistas" />, to: "/mediocampistas" },
  { label: "Delanteros", icon: <img src={delantero} alt="Ir a Delanteros" />, to: "/delanteros" },
  { label: "Clima en Bs. As.", icon: <img src={clima} alt="Ver clima en Buenos Aires" />, to: "/wheater" },
  { label: "Bitacora", icon: <img src={bitacora} alt="Ver Bitácora" />, to: "/bitacora" },
];

const Container = styled.div`
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
  position: sticky;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$isOpen ? "280px" : "70px")};
  transition: width 0.3s ease;

  .Logocontent {
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => (props.$isOpen ? "220px" : "80px")};
    transition: height 0.3s ease;

    .imgcontent {
      width: ${(props) => (props.$isOpen ? "200px" : "60px")};
      height: ${(props) => (props.$isOpen ? "200px" : "60px")};
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        transition: all 0.3s ease;
      }
    }
  }

  .LinkContainer {
    padding: 0 15%;

    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${v.smSpacing} - 2px) 0;
      color: ${(props) => props.theme.text};

      .Linkicon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;
        align-items: center;

        img,
        svg {
          width: 25px;
          height: 25px;
          object-fit: cover;
        }
      }

      .link-label {
        transition: opacity 0.3s ease;
        opacity: ${(props) => (props.$isOpen ? 1 : 0)};
        white-space: nowrap;
        font-size: 1vw;
        max-font-size: 20px;
      }

      &.active .Linkicon svg {
        color: ${(props) => props.theme.bg4};
      }
    }
  }

  .Themecontent {
    margin-top: auto;
    height: 40%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.$isOpen ? "space-between" : "center")};
    padding: ${(props) => (props.$isOpen ? v.mdSpacing : "0")};

    .titletheme {
      color: white;
      font-weight: bold;
      opacity: ${(props) => (props.$isOpen ? 1 : 0)};
      transition: opacity 0.3s ease;
      user-select: none;
      display: ${(props) => (props.$isOpen ? "block" : "none")};
    }

    .Togglecontent {
      margin: 0;
      padding: 0;
      padding-bottom: 2rem;

      .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;

        input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${(props) =>
            props.themeUse === "light" ? v.lightcheckbox : v.checkbox};
          transition: 0.4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    width: 60px !important;

    .link-label,
    .titletheme {
      display: none !important;
    }

    .Themecontent {
      justify-content: center !important;
      width: auto !important;
      margin: 0 !important;
      height: auto;

      .Togglecontent {
        margin: 0 !important;
        padding: 0 !important;
      }
    }

    .Logocontent {
      height: 80px !important;

      .imgcontent {
        width: 60px !important;
        height: 60px !important;
      }
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg3};
  margin: ${v.lgSpacing} 0;
`;
