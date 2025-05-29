export function getSessoes() {
    return JSON.parse(localStorage.getItem("sessoes")) || [];
}


export function adicionarSessao(sessao) {
    const sessoesSalvas = [...getSessoes(), sessao];
    atualizarSessoes(sessoesSalvas)
    return sessoesSalvas;
}

export function atualizarSessoes(listaSessoes) {
    localStorage.setItem("sessoes", JSON.stringify(listaSessoes));
}

export function excluirSessoesServices(index) {
    let listaSessoes = getSessoes();
    listaSessoes.splice(index, 1);
    atualizarSessoes(listaSessoes)
    return (listaSessoes);
}

export function getSessaoEditar(index) {
    let listaSessoes = getSessoes();
    return (listaSessoes[index]);
}

export function alterarSessaoEditado(sessao, index) {
    let listaSessoes = getSessoes();
    listaSessoes[index] = sessao
    atualizarSessoes(listaSessoes);
    return (listaSessoes)

}