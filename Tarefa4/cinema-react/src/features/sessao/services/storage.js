const API_URL = "http://localhost:3000/sessoes";

export async function getSessoes() {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
        throw new Error("Erro ao carregar sessões.");
    }
    const data = await response.json();
    return data;
}

export async function adicionarSessao(sessao) {
    console.log(sessao)
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sessao)
    });

    if (!response.ok) {
        throw new Error("Erro ao adicionar sessão.");
    }

    const data = await response.json();
    return data;  
}


export async function excluirSessoesServices(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error(`Erro ao excluir a sessão: ${response.statusText}`);
    }

    return true;  
}

export async function getSessaoEditar(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Erro ao buscar sessão para edição: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data)
    return data;
}

export async function alterarSessaoEditado(sessao, id) {
    console.log(JSON.stringify(sessao))
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sessao)
    });

    if (!response.ok) {
        throw new Error(`Erro ao atualizar a sessão: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

export async function getHorariosSessao(nomeFilme) {
    console.log(nomeFilme)
    let listaSessoes = await getSessoes();
    console.log(listaSessoes)
    const horarios = listaSessoes
        .filter(sessao => sessao.filme === nomeFilme)
        .map(sessao => sessao.dataHora);
    console.log(horarios)
    return horarios;
}

export async function getTiposSessao(nomeFilme, horario) {
    const listaSessoes = await getSessoes();

    const tipos = listaSessoes
        .filter(sessao =>
            sessao.filme === nomeFilme &&
            sessao.dataHora === horario
        )
        .map(sessao => sessao.tipoSala);

    const tiposUnicos = [...new Set(tipos)];
    return tiposUnicos;
}


export async function getIdiomasSessao(nomeFilme, horario, tipo) {
    const listaSessoes = await getSessoes();

    const idiomas = listaSessoes
        .filter(sessao =>
            sessao.filme === nomeFilme &&
            sessao.dataHora === horario &&
            sessao.tipoSala === tipo
        )
        .map(sessao => sessao.idioma);

    return [...new Set(idiomas)];
}
