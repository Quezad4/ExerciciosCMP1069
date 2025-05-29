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

    const [dataHoraSessao, setDataHoraSessao] = useState("");
    const [precoSessao, setPrecoSessao] = useState("");
    const [idioma, setIdioma] = useState("Legendado")

    



    function carregarFilmes() {
        setListaFilmes(getNomeFilmes())
    }
    function carregarSalas() {
        setListaSalas(getNomeSalas);
    }

    function getTipoSala(nomeSala) {
        setTipoSala(getTipoSalaServices(nomeSala))
    }

    function handleSubmit(e) {
        e.preventDefault();
        const dados = {
            filme,
            sala,
            tipoSala,
            dataHoraSessao,
            precoSessao,
            idioma
        }
        onSubmit(dados)
    }

    function carregarDadosEditar(sessao) {
        
        const {
            filme,
            sala,
            tipoSala,
            dataHoraSessao,
            precoSessao,
            idioma
        } = sessao;

        setFilme(filme);
        setSala(sala);
        setTipoSala(tipoSala);
        setDataHoraSessao(dataHoraSessao)
        setPrecoSessao(precoSessao)
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
        if (onEditar)
            carregarDadosEditar(onEditar)
    }, [onEditar])


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
                    valor={dataHoraSessao}
                    onChange={e => setDataHoraSessao(e.target.value)} />
                <Input
                    type={"number"}
                    variant={"form-control"}
                    id={"preco-sessao"}
                    placeholder={"Digite o preço da sessão"}
                    label={"Preço"}
                    valor={precoSessao}
                    step={"0.01"}
                    min={"0"}
                    onChange={e => setPrecoSessao(e.target.value)} />

                <Select
                    id={"idioma-sessao"}
                    variant={"form-control"}
                    label={"Idioma"}
                    options={idiomas}
                    onChange={(e) => setIdioma(e.target.value)} />

            </form>
        </>
    )
}