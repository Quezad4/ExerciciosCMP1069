//CRUD
// BUSCA
// DELETE
// ATUALIZAR


export function getFilmes() {
    return JSON.parse(localStorage.getItem("filmes")) || [];
}

export function getNomeFilmes() {
  const listaFilmes = getFilmes();
  return listaFilmes.map(filme => filme.titulo);
}


export function adicionarFilme(filme) {
    const filmesSalvos = [...getFilmes(), filme];
    atualizarFilmes(filmesSalvos)
    return filmesSalvos;
}

export function excluirFilmeServices(index) {
    let listaFilmes = getFilmes();
    listaFilmes.splice(index, 1);
    atualizarFilmes(listaFilmes)
    return (listaFilmes);
}

export function atualizarFilmes(listaFilmes) {
    localStorage.setItem("filmes", JSON.stringify(listaFilmes));
}

export function getFilmeEditar(index) {
    let listaFilmes = getFilmes();
    return (listaFilmes[index]);
}

export function alterarFilmeEditado(filme, index){
    let listaFilmes = getFilmes();
    listaFilmes[index] = filme
    console.log(listaFilmes)
    atualizarFilmes(listaFilmes);
    return(listaFilmes)
    
}





