import { useEffect, useState } from "react";
import { SalaForm } from "./components/SalaForm";
import { SalaTable } from "./components/SalaTable";
import Button from "../../components/buttons/Button";
import { Modal } from "../../components/modal/Modal";
import { adicionarSala, alterarSalaEditado, excluirSalaServices, getSalaEditar, getSalas } from "./services/storage";

export function CadastrarSala() {



    const [salasTabela, setSalasTabela] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [salaEditando, setSalaEditando] = useState(null)
    const [indexEditado, setIndexEditado] = useState(null)


    function abrirModal() {
        setIsOpen(true);
    }

    function fecharModal() {
        setIsOpen(false);
    }

    function abrirEditModal() {
        setIsEditOpen(true);
    }

    function fecharEditModal() {
        setIsEditOpen(false);
    }


    async function handleSubmit(sala) {
        await adicionarSala(sala);
        await carregarSalas();
        fecharModal();
    }
    async function handleSubmitEditar(sala) {
        await alterarSalaEditado(sala, indexEditado);
        await carregarSalas();
        fecharEditModal();
    }

    async function excluirSala(id) {
        await excluirSalaServices(id);
        await carregarSalas();
    }

    function editarSala(id) {
        setSalaEditando(getSalaEditar(id));
        setIndexEditado(id);
        abrirEditModal();
    }

    const carregarSalas = async () => {
        const lista = await getSalas();
        setSalasTabela(lista);
    }

    useEffect(() => {
        carregarSalas();
    }, []);


    return (
        <>
            <div className="container d-flex flex-column">
                <h2 className="text-white mb-3 fonte-principal">Cadastrar Sala</h2>

                <Button
                    variant={"mb-5 rounded"}
                    texto={"Cadastar Salas"}
                    onClick={abrirModal} />

                {isOpen && <Modal
                    titulo={"Cadastrar Nova Sala"}
                    body={<SalaForm onSubmit={handleSubmit} />}
                    fecharModal={fecharModal}
                    form={"sala-form"} />}

                {isEditOpen && <Modal
                    titulo={"Editar Sala"}
                    body={<SalaForm onSubmit={handleSubmitEditar} onEditar={salaEditando} />}
                    fecharModal={fecharEditModal}
                    form={"sala-form"} />}

                <SalaTable listaSalas={salasTabela}
                    botaoExcluir={excluirSala}
                    botaoEditar={editarSala} />
            </div>
        </>
    );
}