export function CardSessao({
    tituloFilme,
    nomeSala,
    dataHora,
    preco,
    onComprar // função a ser executada ao clicar no botão
}) {
    return (
        <div className="card bg-secondary text-white h-100 shadow-lg">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{tituloFilme}</h5>
                <p className="card-text"><strong>Sala:</strong> {nomeSala}</p>
                <p className="card-text"><strong>Data/Hora:</strong> {dataHora}</p>
                <p className="card-text"><strong>Preço:</strong> R$ {preco}</p>
                <button className="btn btn-light mt-auto" onClick={onComprar}>
                    Comprar Ingresso
                </button>
            </div>
        </div>
    );
}
