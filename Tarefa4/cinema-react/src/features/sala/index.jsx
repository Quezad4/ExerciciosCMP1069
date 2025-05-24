import { useState } from "react";
import { SalaForm } from "./components/SalaForm";
import { SalaTable } from "./components/SalaTable";
import Button from "../../components/buttons/Button";
import { Modal } from "../../components/modal/Modal";


export function CadastrarSala() {

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
                <h2 className="text-white mb-3 fonte-principal">Cadastro de Salas</h2>

                <Button
                    variant={"mb-5 rounded"}
                    texto={"Cadastar Salas"}
                    onClick={abrirModal} />

                {isOpen && <Modal
                    titulo={"Cadastrar Nova Sala"}
                    body={<SalaForm/>}
                    fecharModal={fecharModal} 
                    form={"sala-form"}/>}
                <SalaTable/>
            </div>
        </>
    );
}