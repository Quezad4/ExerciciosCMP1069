import FilmeForm from "./components/FilmeForm";
import Button from "../../components/buttons/Button";
import { Modal } from "../../components/modal/Modal";
import { FilmeTable } from "./components/FilmeTable";
import { useEffect, useState } from "react";
import { adicionarFilme } from "./services/storage";
import { excluirFilmeServices } from "./services/storage";
import { getFilmeEditar } from "./services/storage";


export function CadastrarFilme() {
    
    

    const [filmesTabela, setFilmesTabela] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [filmeEditando, setFilmeEditando] = useState(null)

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

    function handleSubmit(filme) {
        setFilmesTabela(adicionarFilme(filme));
        fecharModal();
    }

    function excluirFilme(index){
        setFilmesTabela(excluirFilmeServices(index));
    }

    function editarFilme(index){
        setFilmeEditando(getFilmeEditar(index));
        abrirEditModal();
    }

    useEffect(() =>{
        setFilmesTabela(JSON.parse(localStorage.getItem("filmes")) || [])
    }, [])

    return (
        <>
            <div className="container d-flex flex-column">
                <h2 className="text-white mb-3 fonte-principal">Cadastro de Filmes</h2>
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
                    titulo={"Editar"}
                    body={<FilmeForm onSubmit={handleSubmit}  onEditar={filmeEditando}/>}
                    fecharModal={fecharEditModal}
                    form={"filme-form"} />}

                <FilmeTable
                    listaFilmes={filmesTabela} 
                    botaoExcluir={excluirFilme}
                    botaoEditar={editarFilme}/>
            </div>
        </>
    );
}

