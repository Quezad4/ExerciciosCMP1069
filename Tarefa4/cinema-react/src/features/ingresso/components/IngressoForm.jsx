import Input from "../../../components/input/Input";
import { useState, useEffect } from "react";
import { Select } from "../../../components/select/Select";
import { getNomeFilmes } from "../../filme/services/storage";
import { getHorariosSessao, getTiposSessao, getIdiomasSessao } from "../../sessao/services/storage";

export function IngressoForm({
    onSubmit,
}) {


    const [listaFilmes, setListaFilmes] = useState([])
    const [filme, setFilme] = useState(listaFilmes[0] || "")

    const [listaHorarios, setListaHorarios] = useState([])
    const [horario, setHorario] = useState(listaHorarios[0] || "")

    const [listaTipos, setListaTipos] = useState([])
    const [tipo, setTipo] = useState(listaTipos[0] || "")

    const [listaIdiomas, setListaIdiomas] = useState([])
    const [idioma, setIdioma] = useState(listaIdiomas[0] || "")

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [assento, setAssento] = useState("");
    const [pagamento, setPagamento] = useState("PIX");



    function carregarFilmes() {
        setListaFilmes(getNomeFilmes())
    }

    function carregarHorarios(nomeFilme) {
        const horarios = getHorariosSessao(nomeFilme);
        setListaHorarios(horarios);
        setHorario(horarios[0] || "");
    }

    function carregarTipos(nomeFilme, horario) {
        const tipos = getTiposSessao(nomeFilme, horario);
        setListaTipos(tipos);
        setTipo(tipos[0] || "");
    }

    function carregarIdiomas(nomeFilme, horario, tipo) {
        const idiomas = getIdiomasSessao(nomeFilme, horario, tipo);
        setListaIdiomas(idiomas);
        setIdioma(idiomas[0] || "");
    }

    function handleSubmit(e) {
        e.preventDefault(); // evita o reload da página, caso o form tenha type="submit"

        const dadosIngresso = {
            nome,
            cpf,
            assento,
            pagamento,
            filme,
            horario,
            tipo,
            idioma
        };
        console.log(dadosIngresso);
        onSubmit(dadosIngresso);
    }

    const pagamentos = [
        "PIX",
        "Cartão",
        "Dinheiro"
    ]

    useEffect(() => {
        carregarFilmes();
    }, [])


    useEffect(() => {
        if (listaFilmes.length > 0) {
            setFilme(listaFilmes[0]);
        }

    }, [listaFilmes]);


    useEffect(() => {
        if (filme) {
            carregarHorarios(filme);
            setListaTipos([]);
            setTipo(""); // resetar tipo ao mudar de filme
        }
    }, [filme]);

    useEffect(() => {
        if (filme && horario) {
            carregarTipos(filme, horario);
        }
    }, [filme, horario]);

    useEffect(() => {
        if (filme && horario && tipo) {
            carregarIdiomas(filme, horario, tipo);
        }
    }, [filme, horario, tipo]);






    return (
        <>
            <form className="d-flex flex-column mb-5" id={"ingresso-form"} onSubmit={handleSubmit}>


                <Select
                    id={"filme-ingresso"}
                    variant={"form-control"}
                    label={"Filme"}
                    options={listaFilmes}
                    valor={filme}
                    onChange={(e) => setFilme(e.target.value)} />
                <Select
                    id={"hora-ingresso"}
                    variant={"form-control"}
                    label={"Horário"}
                    options={listaHorarios}
                    valor={horario}
                    onChange={(e) => setHorario(e.target.value)} />
                <Select
                    id={"tipo-sessao-ingresso"}
                    variant={"form-control"}
                    label={"Tipo da Sessão"}
                    options={listaTipos}
                    valor={tipo}
                    onChange={(e) => setTipo(e.target.value)} />
                <Select
                    id={"idioma-sessao-ingresso"}
                    variant={"form-control"}
                    label={"Idioma da Sessão"}
                    options={listaIdiomas}
                    valor={idioma}
                    onChange={(e) => setIdioma(e.target.value)} />

                <Input
                    id="nomecompleto-ingresso"
                    type="text"
                    valor={nome}
                    placeholder="Digite o seu Nome"
                    onChange={(e) => setNome(e.target.value)}
                    label="Nome Completo" />
                <Input
                    id="cpf-ingresso"
                    type="text"
                    valor={cpf}
                    placeholder="Digite o seu CPF"
                    onChange={(e) => setCpf(e.target.value)}
                    label="CPF" />
                <Input
                    id="assento-ingresso"
                    type="text"
                    valor={assento}
                    placeholder="Ex: A10"
                    onChange={(e) => setAssento(e.target.value)}
                    label="Assento" />

                <Select variant={"form-control"}
                    id={"pagamento-ingresso"}
                    label={"Pagamentos"}
                    options={pagamentos}
                    valor={pagamento}
                    onChange={(e) => setPagamento(e.target.value)} />
            </form>
        </>
    )
}