import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { LaBombonera } from "../pages/LaBombonera";
import { Arqueros } from "../pages/Arqueros";
import { Defensores } from "../pages/Defensores";
import { Mediocampistas } from "../pages/Mediocampistas";
import { Delanteros } from "../pages/Delanteros";
import { Wheater } from "../pages/Wheater";
import { Bitacora } from "../pages/Bitacora";
export function MyRoutes() {
    return (
        <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/laBombonera" element={<LaBombonera />} />
                <Route path="/arqueros" element={<Arqueros />} />
                <Route path="/defensores" element={<Defensores />} />
                <Route path="/mediocampistas" element={<Mediocampistas />} />
                <Route path="/delanteros" element={<Delanteros />} />
                <Route path="/wheater" element={<Wheater />} />
                <Route path="/bitacora" element={<Bitacora />} />
        </Routes>
    );
}