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

export function getHorariosSessao(nomeFilme) {
    let listaSessoes = getSessoes();
    const horarios = listaSessoes
        .filter(sessao => sessao.filme === nomeFilme)
        .map(sessao => sessao.dataHoraSessao);
    return horarios;
}

export function getTiposSessao(nomeFilme, horario) {
    const listaSessoes = getSessoes();

    const tipos = listaSessoes
        .filter(sessao => 
            sessao.filme === nomeFilme && 
            sessao.dataHoraSessao === horario
        )
        .map(sessao => sessao.tipoSala);

    const tiposUnicos = [...new Set(tipos)];
    return tiposUnicos;
}


export function getIdiomasSessao(nomeFilme, horario, tipo) {
    const listaSessoes = getSessoes();

    const idiomas = listaSessoes
        .filter(sessao =>
            sessao.filme === nomeFilme &&
            sessao.dataHoraSessao === horario &&
            sessao.tipoSala === tipo
        )
        .map(sessao => sessao.idioma);

    return [...new Set(idiomas)];
}
