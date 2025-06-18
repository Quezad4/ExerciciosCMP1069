import { useEffect, useState } from "react"
import { getSessoes } from "../sessao/services/storage"
import { CardSessao } from "./components/CardSessao"
import { useNavigate } from "react-router-dom";


export function ListaSessoes({

}) {




    const [listaSessoes, setListaSessoes] = useState([])
    const navigate = useNavigate();


    async function carregarSessoes() {
        const lista = await getSessoes();
        console.log(lista)
        setListaSessoes(lista);
    }

    useEffect(() => {
        carregarSessoes();
    }, []);

    function handleComprar(){
        navigate(`/ingressos`)
    }


    return (
        <>
            <div className="container py-5">
                <h1 className="text-white fonte-principal text-center mb-5">Sessões Disponíveis</h1>
                <div className="row" id="cards-container">
                    {listaSessoes.map(sessao => (
                    <div className="col-md-4 mb-4" key={sessao.id}>
                        <CardSessao
                            tituloFilme={sessao.filme}
                            nomeSala={sessao.sala}
                            dataHora={new Date(sessao.dataHora).toISOString().slice(0, 16)}
                            preco={sessao.preco}
                            onComprar={handleComprar}/>
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}