import Button from "../../../components/buttons/Button";




export function SalaTable({
    listaSalas,
    botaoExcluir,
    botaoEditar
}) {
    return (
        <>
            <table className="table table-striped" id="tabela-salas">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Capacidade</th>
                        <th>Tipo</th>
                        <th>Editar/Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {listaSalas.map((sala, i) => {
                        
                        const { id, nome, capacidade, tipo } = sala
                        return (
                            <tr key={i} >
                                <td> {id} </td>
                                <td> {nome} </td>
                                <td> {capacidade} </td>
                                <td> {tipo} </td>
                                <td> <Button variant={"rounded bg-secondary text-white"} texto={"Editar"} onClick={() => botaoEditar(id)}/>
                                    <Button variant={"rounded bg-danger text-white"} texto={"Excluir"}  onClick={() => botaoExcluir(id)}/> </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}