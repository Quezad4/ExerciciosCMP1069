import Button from "../../components/buttons/Button";
import { Modal } from "../../components/modal/Modal";
import { useState, useEffect } from "react";
import { SessaoForm } from "./components/SessaoForm";
import { SessaoTable } from "./components/SessaoTable";
import { adicionarSessao, excluirSessoesServices, getSessaoEditar, alterarSessaoEditado, getSessoes } from "./services/storage";



export function CadastarSessao({

}) {

    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [sessoesTabela, setSessoesTabela] = useState([])

    const [sessaoEditando, setSessaoEditando] = useState(null)
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


    async function handleSubmit(sessao) {
        await adicionarSessao(sessao);
        await carregarSessoes();
        fecharModal();
    }

    async function handleEditSubmit(sessao) {
        await alterarSessaoEditado(sessao, indexEditado);
        await carregarSessoes();
        fecharEditModal();
    }


    async function excluirSessao(index) {
        await excluirSessoesServices(index);
        await carregarSessoes();
    }

    function editarSessao(index) {
        setSessaoEditando(getSessaoEditar(index));
        setIndexEditado(index);
        abrirEditModal();
    }


    const carregarSessoes = async () => {
        const lista = await getSessoes();
        setSessoesTabela(lista);
    }

    useEffect(() => {
        carregarSessoes();
    }, []);

    return (
        <>
            <div className="container d-flex flex-column">
                <h2 className="text-white mb-3 fonte-principal">Cadastrar Sessão</h2>

                <Button
                    variant={"mb-5 rounded"}
                    texto={"Cadastar Sessões"}
                    onClick={abrirModal} />

                {isOpen && <Modal
                    titulo={"Cadastrar Nova Sessão"}
                    body={<SessaoForm onSubmit={handleSubmit} />}
                    fecharModal={fecharModal}
                    form={"sessao-form"} />}

                {isEditOpen && <Modal
                    titulo={"Editar Sessão"}
                    body={<SessaoForm onSubmit={handleEditSubmit} onEditar={sessaoEditando} />}
                    fecharModal={fecharEditModal}
                    form={"sessao-form"} />}
        
                <SessaoTable listaSessoes={sessoesTabela}
                    botaoExcluir={excluirSessao}
                    botaoEditar={editarSessao} />
            </div>
        </>
    )
}

