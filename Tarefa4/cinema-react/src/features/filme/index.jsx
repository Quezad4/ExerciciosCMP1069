import FilmeForm from "./components/FilmeForm";
import Button from "../../components/buttons/Button";
import { Modal } from "../../components/modal/Modal";
import { FilmeTable } from "./components/FilmeTable";
import { useState } from "react";






export function CadastrarFilme() {



    const [isOpen, setIsOpen] = useState(false);
    function abrirModal() {
        setIsOpen(true);
    }

    function fecharModal() {
        setIsOpen(false);
    }



    return (
        <>

            <div className="container d-flex flex-column">
                <h2 className="text-white mb-3 fonte-principal">Cadastro de Filmes</h2>

                <Button
                    variant={"mb-5 rounded"}
                    texto={"Cadastar Filmes"} 
                    onClick={abrirModal}/>

                {isOpen && <Modal
                    titulo={"Cadastrar Novo Filme"}
                    body={<FilmeForm/>} 
                    fecharModal={fecharModal}/>}
                <FilmeTable />

            </div>
        </>
    );
}

