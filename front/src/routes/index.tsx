import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import { Home } from "../pages/home";
import { Pessoas } from "../pages/pessoas";
import { useDrawerContext } from "../shared/contexts/DrawerContext";
import { useEffect } from "react";
import { ListagemDePessoas } from "../pages/pessoas/ListagemDePessoas";
import { DetalheDePessoas } from "../pages/pessoas/DetalheDePessoas";
import { MenuPrincipal } from "../shared/components/menu";

function AppRoutes() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/pessoas" element={<ListagemDePessoas />} />
        <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />
        <Route path="/" element={<Login/>} />
        <Route path="*" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
