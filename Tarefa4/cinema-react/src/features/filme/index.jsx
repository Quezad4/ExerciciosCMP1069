import FilmeForm from "./components/FilmeForm";
import Button from "../../components/buttons/Button";
import { Modal } from "../../components/modal/Modal";
import { FilmeTable } from "./components/FilmeTable";
import { useEffect, useState } from "react";
import { adicionarFilme, alterarFilmeEditado } from "./services/storage";
import { excluirFilmeServices } from "./services/storage";
import { getFilmeEditar } from "./services/storage";
import { getFilmes } from "./services/storage";


export function CadastrarFilme() {



    const [filmesTabela, setFilmesTabela] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [filmeEditando, setFilmeEditando] = useState(null)
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

    async function handleSubmit(filme) {
        await adicionarFilme(filme)
        await carregarFilmes();
        fecharModal();
    }

    function handleSubmitEditar(filme) {
        alterarFilmeEditado(filme, indexEditado);
        carregarFilmes();
        fecharEditModal();
    }

    async function excluirFilme(id) {
        await excluirFilmeServices(id);
        await carregarFilmes();
    }

    function editarFilme(id) {
        setFilmeEditando(getFilmeEditar(id));
        setIndexEditado(id)
        abrirEditModal();
    }

    async function carregarFilmes() {
        const lista = await getFilmes();
        setFilmesTabela(lista);
    }

    useEffect(() => {
        carregarFilmes();
    }, []);


    return (
        <>
            <div className="container d-flex flex-column">
                <h2 className="text-white mb-3 fonte-principal">Cadastrar Filme</h2>
                <Button
                    variant={"mb-5 rounded"}
                    texto={"Cadastar Filmes"}
                    onClick={abrirModal} />

                {isOpen && <Modal
                    titulo={"Cadastrar Novo Filme"}
                    body={<FilmeForm onSubmit={handleSubmit} />}
                    fecharModal={fecharModal}
                    form={"filme-form"} />}

                {isEditOpen && <Modal
                    titulo={"Editar Filme"}
                    body={<FilmeForm onSubmit={handleSubmitEditar} onEditar={filmeEditando} />}
                    fecharModal={fecharEditModal}
                    form={"filme-form"} />}

                <FilmeTable
                    listaFilmes={filmesTabela}
                    botaoExcluir={excluirFilme}
                    botaoEditar={editarFilme} />
            </div>
        </>
    );
}

