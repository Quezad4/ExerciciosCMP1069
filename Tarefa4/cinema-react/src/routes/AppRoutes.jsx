import { Route, Routes } from "react-router";
import { CadastrarFilme } from "../features/filme";
import { CadastrarSala } from "../features/sala";
import { Home } from "../features/home";
import { CadastarSessao } from "../features/sessao";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/cadastrarFilme" element={<CadastrarFilme />}> </Route>
            <Route path="/cadastrarSala" element={<CadastrarSala />}> </Route>
            <Route path="/cadastrarSessao" element={<CadastarSessao/>}> </Route>
        </Routes>
    );
}

