import { useEffect, useState } from "react"
import Input from "../../../components/input/Input"
import { Select } from "../../../components/select/Select";
import { getNomeFilmes } from "../../filme/services/storage";
import { getNomeSalas, getTipoSalaServices } from "../../sala/services/storage";

export function SessaoForm({
    onSubmit,
    onEditar

}) {


    const idiomas = [
        "Legendado",
        "Dublado"
    ];

    const [listaFilmes, setListaFilmes] = useState([])
    const [listaSalas, setListaSalas] = useState([])

    const [filme, setFilme] = useState(listaFilmes[0] || "")
    const [sala, setSala] = useState(listaSalas[0] || "")
    const [tipoSala, setTipoSala] = useState("")

    const [dataHora, setDataHoraSessao] = useState("");
    const [preco, setPrecoSessao] = useState("");
    const [idioma, setIdioma] = useState("Legendado")




    async function carregarFilmes() {
        const filmes = await getNomeFilmes();
        setListaFilmes(filmes);
    }

    async function carregarSalas() {
        const salas = await getNomeSalas();
        setListaSalas(salas);
    }

    async function getTipoSala(nomeSala) {
        const tipo = await getTipoSalaServices(nomeSala);
        setTipoSala(tipo);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const dados = {
            filme,
            sala,
            tipoSala,
            dataHora,
            preco,
            idioma
        }
        await onSubmit(dados)
    }

    async function carregarDadosEditar(sessao) {

        const {
            filme,
            sala,
            tipoSala,
            dataHora,
            preco,
            idioma
        } = sessao;

        setFilme(filme);
        setSala(sala);
        setTipoSala(tipoSala);

        // Formatar a data para o formato necessário para datetime-local
        const dataFormatada = new Date(dataHora)
            .toISOString()           // Converte para string ISO
            .slice(0, 16);           // Pega apenas a parte YYYY-MM-DDTHH:mm
        setDataHoraSessao(dataFormatada)
        setPrecoSessao(preco)
        setIdioma(idioma)

    }

    useEffect(() => {
        carregarFilmes();
    }, [])

    useEffect(() => {
        carregarSalas();
    }, [])

    useEffect(() => {
        if (listaFilmes.length > 0) {
            setFilme(listaFilmes[0]);
        }
    }, [listaFilmes]);

    useEffect(() => {
        if (listaSalas.length > 0) {
            setSala(listaSalas[0]);
        }
    }, [listaSalas]);

    useEffect(() => {
        if (sala) {
            getTipoSala(sala);
        }
    }, [sala]);

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
            <form className="d-flex flex-column mb-5 " id="sessao-form" onSubmit={handleSubmit}>

                <Select
                    id={"filme-sessao"}
                    variant={"form-control"}
                    label={"Filme"}
                    options={listaFilmes}
                    valor={filme}
                    onChange={(e) => setFilme(e.target.value)} />
                <Select
                    id={"sala-sessao"}
                    variant={"form-control"}
                    label={"Sala"}
                    options={listaSalas}
                    valor={sala}
                    onChange={(e) => setSala(e.target.value)} />
                <Input
                    type={"datetime-local"}
                    variant={"form-control"}
                    id={"dataHora-sessao"}
                    placeholder={"Digite a data e a Hora"}
                    label={"Data e Hora"}
                    valor={dataHora}
                    onChange={e => setDataHoraSessao(e.target.value)} />
                <Input
                    type={"number"}
                    variant={"form-control"}
                    id={"preco-sessao"}
                    placeholder={"Digite o preço da sessão"}
                    label={"Preço"}
                    valor={preco}
                    step={"0.01"}
                    min={"0"}
                    onChange={e => setPrecoSessao(e.target.value)} />

                <Select
                    id={"idioma-sessao"}
                    variant={"form-control"}
                    label={"Idioma"}
                    options={idiomas}
                    valor={idioma}
                    onChange={(e) => setIdioma(e.target.value)} />

            </form>
        </>
    )
}