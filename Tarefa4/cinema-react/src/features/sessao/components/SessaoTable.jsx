import Button from "../../../components/buttons/Button";

export function SessaoTable({
    listaSessoes,
    botaoExcluir,
    botaoEditar
}) {



    return (
        <>
            <table className="table table-striped" id="tabela-sessoes">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Filme</th>
                        <th>Sala</th>
                        <th>Tipo Sala</th>
                        <th>Date e Hora</th>
                        <th>Preço</th>
                        <th>Idioma</th>
                        <th>Editar/Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {listaSessoes.map((sessao, i) => {
                        const {id, filme, sala, tipoSala, dataHora, preco, idioma} = sessao
                        return (
                            <tr key={i} >
                                <td> {id} </td>
                                <td> {filme} </td>
                                <td> {sala} </td>
                                <td> {tipoSala} </td>
                                <td> {dataHora} </td>
                                <td> {preco} </td>
                                <td> {idioma} </td>
                                <td> <Button variant={"rounded bg-secondary text-white"} texto={"Editar"} onClick={() => botaoEditar(id)} />
                                    <Button variant={"rounded bg-danger text-white"} texto={"Excluir"} onClick={() => botaoExcluir(id)} /> </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}