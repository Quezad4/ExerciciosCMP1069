const API_URL = "http://localhost:3000/salas";


export async function getSalas() {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data;
}

export async function getNomeSalas() {
    const listaSalas = await getSalas();
    return listaSalas.map(sala => sala.nome);
}

export async function getTipoSalaServices(nomeSala) {
    const listaSalas = await getSalas();
    const salaEncontrada = listaSalas.find(sala => sala.nome === nomeSala);
    return salaEncontrada ? salaEncontrada.tipo : null;
}


export async function adicionarSala(sala) {
    console.log("post", sala)
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sala)
    });

    if (!response.ok) {
        throw new Error("Erro ao adicionar a sala");
    }

    const data = await response.json();


    return data;
}

export async function excluirSalaServices(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error(`Erro ao excluir a sala: ${response.statusText}`);
    }

    return true;
}

export async function getSalaEditar(id) {

    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    console.log(data)
    return data;
}

export async function alterarSalaEditado(sala, id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sala)
    });

    if (!response.ok) {
        throw new Error(`Erro ao atualizar a sala: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}





