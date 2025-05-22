import { Route, Routes } from "react-router";
import { CadastrarFilme } from "../features/filme";
import { Home } from "../features/home";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/cadastrarFilme" element={<CadastrarFilme />}> </Route>
        </Routes>
    );
}

