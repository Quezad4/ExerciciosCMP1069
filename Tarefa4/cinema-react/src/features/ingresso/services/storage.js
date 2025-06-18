const API_URL = "http://localhost:3000/ingresso";



export async function getIngressos() {
    try {
        const response = await fetch(`${API_URL}`);  // Substitua API_URL com o endpoint correto
        if (!response.ok) {
            throw new Error('Erro ao buscar ingressos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
export async function adicionarIngresso(ingresso) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingresso),
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar ingresso');
        }

        const novoIngresso = await response.json();  // Resposta da API com o ingresso adicionado
        return novoIngresso;
    } catch (error) {
        console.error(error);
    }
}
