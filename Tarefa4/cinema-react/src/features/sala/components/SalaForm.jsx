import { use, useEffect, useState } from "react";
import Input from "../../../components/input/Input"
import { Select } from "../../../components/select/Select"

export function SalaForm({
    variant,
    onSubmit,
    onEditar
}) {


    const [nome, setNomeSala] = useState("")
    const [capacidade, setCapacidadeSala] = useState("")
    const [tipo, setTipoSala] = useState("2D")

    const formatos = [
        "2D",
        "3D",
        "IMAX"
    ];

    function handleSubmit(e) {
        e.preventDefault();
        const dados = {
            nome,
            capacidade,
            tipo
        };

        onSubmit(dados);
    }

    function carregarDadosEditar(sala) {

        const {
            nome,
            capacidade,
            tipo,
        } = sala;

        setNomeSala(nome);
        setCapacidadeSala(capacidade);
        setTipoSala(tipo);

    }


    useEffect(() => {
        async function fetchEditar() {
            if (onEditar) {
                const dados = await onEditar;
                carregarDadosEditar(dados);
            }
        }

        fetchEditar();
    }, [onEditar]);


    return (
        <>
            <form className={variant} id="sala-form" onSubmit={handleSubmit}>
                <Input
                    type={"text"}
                    variant={"form-control"}
                    id={"nome-sala"}
                    placeholder={"Digite o nome da sala"}
                    label={"Nome"}
                    valor={nome}
                    onChange={e => setNomeSala(e.target.value)} />

                <Input
                    type={"number"}
                    variant={"form-control"}
                    id={"capacidade-sala"}
                    placeholder={"Digite a capacidade da sala"}
                    label={"Capacidade"}
                    valor={capacidade}
                    onChange={e => setCapacidadeSala(e.target.value)} />

                <Select
                    id={"tipo-sala"}
                    variant={"form-control"}
                    options={formatos}
                    label={"Tipo"}
                    valor={tipo}
                    onChange={e => setTipoSala(e.target.value)} />
            </form>
        </>
    )
}