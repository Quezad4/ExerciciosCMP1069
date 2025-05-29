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
                        
                        const { nomeSala, capacidadeSala, tipoSala } = sala
                        return (
                            <tr key={i} >
                                <td> {i + 1} </td>
                                <td> {nomeSala} </td>
                                <td> {capacidadeSala} </td>
                                <td> {tipoSala} </td>
                                <td> <Button variant={"rounded bg-secondary text-white"} texto={"Editar"} onClick={() => botaoEditar(i)}/>
                                    <Button variant={"rounded bg-danger text-white"} texto={"Excluir"}  onClick={() => botaoExcluir(i)}/> </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}