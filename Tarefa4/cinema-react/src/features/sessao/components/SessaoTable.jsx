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
                        const { filme, sala, tipoSala, dataHoraSessao, precoSessao, idioma} = sessao
                        return (
                            <tr key={i} >
                                <td> {i + 1} </td>
                                <td> {filme} </td>
                                <td> {sala} </td>
                                <td> {tipoSala} </td>
                                <td> {dataHoraSessao} </td>
                                <td> {precoSessao} </td>
                                <td> {idioma} </td>
                                <td> <Button variant={"rounded bg-secondary text-white"} texto={"Editar"} onClick={() => botaoEditar(i)} />
                                    <Button variant={"rounded bg-danger text-white"} texto={"Excluir"} onClick={() => botaoExcluir(i)} /> </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}