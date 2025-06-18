import Button from "../../../components/buttons/Button";


export function FilmeTable({
    listaFilmes,
    botaoExcluir,
    botaoEditar
}) {
    return (
        <>
            <table className="table table-striped " id="tabela-filmes">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Gênero</th>
                        <th>Classificação</th>
                        <th>Duração</th>
                        <th>Data Estreia</th>
                        <th>Editar/Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {listaFilmes.map((filme, i) => {
                        const { id ,titulo, descricao, genero, classificacao, duracao, dataEstreia } = filme
                        return (
                            <tr key={i} >
                                <td> {id} </td>
                                <td> {titulo} </td>
                                <td> {genero} </td>
                                <td> {classificacao} </td>
                                <td> {duracao} </td>
                                <td> {dataEstreia} </td>
                                <td> <Button variant={"rounded bg-secondary text-white"}  texto={"Editar"} onClick={() => botaoEditar(id)}/>
                                     <Button variant={"rounded bg-danger text-white"} texto={"Excluir"} onClick={()=> botaoExcluir(id)}/> </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </>
    );
}