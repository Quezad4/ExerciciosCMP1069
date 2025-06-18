//CRUD
// BUSCA
// DELETE
// ATUALIZAR

const API_URL = "http://localhost:3000/filme";

export async function getFilmes() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
}

export function getNomeFilmes() {
    const listaFilmes = getFilmes();
    return listaFilmes.map(filme => filme.titulo);
}


export async function adicionarFilme(filme) {
    console.log(filme)
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filme),
    });
    const data = await response.json();
    console.log(data)
    return data;
}

export async function excluirFilmeServices(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    return response.ok;
}

export async function getFilmeEditar(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
}

export async function alterarFilmeEditado(filme, id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(filme)
    });
  
    if (!response.ok) {
      throw new Error(`Erro ao atualizar o filme: ${response.statusText}`);
    }
  
    const data = await response.json();
    console.log(data)
    return data;
  }
  



