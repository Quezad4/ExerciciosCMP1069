import { useState } from "react";
import Input from "../../../components/input/Input"
import { Select } from "../../../components/select/Select"

export function SalaForm(
    variant
) {


    const [nomeSala, setNomeSala] = useState("")
    const [capacidadeSala, setCapacidadeSala] = useState("")
    const [tipoSala, setTipoSala] = useState("")


    function handleSubmit(e) {
        e.preventDefault();
        console.log("asdasdas")
        const dados = {
            nomeSala,
            capacidadeSala,
            tipoSala
        };

        console.log("Dados da sala:", dados);
    }


    const formatos = [
        "2D",
        "3D",
        "IMAX"
    ];


    return (
        <>
            <form className={variant} id="sala-form" onSubmit={handleSubmit}>
                <Input
                    type={"text"}
                    variant={"form-control"}
                    id={"nome-sala"}
                    placeholder={"Digite o nome da sala"}
                    label={"Nome"}
                    valor={nomeSala}
                    onChange={e => setNomeSala(e.target.value)} />

                <Input
                    type={"number"}
                    variant={"form-control"}
                    id={"capacidade-sala"}
                    placeholder={"Digite a capacidade da sala"}
                    label={"Capacidade"}
                    valor={capacidadeSala}
                    onChange={e => setCapacidadeSala(e.target.value)} />

                <Select
                    id={"tipo-sala"}
                    variant={"form-control"}
                    options={formatos}
                    label={"Tipo"}
                    onChange={e => setTipoSala(e.target.value)} />
            </form>
        </>
    )
}