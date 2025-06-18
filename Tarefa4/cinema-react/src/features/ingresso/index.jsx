import Button from "../../components/buttons/Button";
import { IngressoTable } from "./components/IngressoTable";
import { IngressoForm } from "./components/IngressoForm";
import { Modal } from "../../components/modal/Modal";
import { useState, useEffect } from "react";
import { adicionarIngresso, getIngressos } from "./services/storage";



export function Ingressos({

}) {

    const [isOpen, setIsOpen] = useState(false);

    const [ingressoTabela, setIngressosTabela] = useState([])

    function abrirModal() {
        setIsOpen(true);
    }

    function fecharModal() {
        setIsOpen(false);
    }

    async function handleSubmit(ingresso) {
        await adicionarIngresso(ingresso);
        await carregarIngressos();
        fecharModal();
    }

    async function carregarIngressos() {
        const lista = await getIngressos();
        setIngressosTabela(lista);
    }

    useEffect(() => {
        carregarIngressos();
    }, []);


    return (
        <>
            <div className="container d-flex flex-column">
                <h2 className="text-white mb-3 text-minhafonte">Seus Ingressos</h2>
                <IngressoTable listaIngressos={ingressoTabela}/>
                <Button
                    texto={"Comprar Ingressos"}
                    variant={"mb-5 rounded bg-success"}
                    onClick={abrirModal} />

                {isOpen && <Modal
                    titulo={"Comprar Ingresso"}
                    body={<IngressoForm onSubmit={handleSubmit} />}
                    fecharModal={fecharModal}
                    form={"ingresso-form"} />}
            </div>
        </>
    )
}