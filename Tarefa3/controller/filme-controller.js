import { Filme } from "../model/filme.js";




class FilmeController {
    constructor() {
        this.listaFilmes = []
        this.init()
    }

    init() {
        let botaoSalvar = document.getElementById("btnSalvarFilme")
        botaoSalvar.addEventListener("click", () => {
            let titulo = document.getElementById("titulo-filme").value
            let genero = document.getElementById("genero-filme").value
            let classificacao = document.getElementById("classificacao-filme").value
            let duracao = document.getElementById("duracao-filme").value
            let data = document.getElementById("data-filme").value

            let novoFilme = new Filme(this.listaFilmes.length + 1, titulo, genero, classificacao, duracao, data)
            this.listaFilmes.push(novoFilme)
            this.atualizarTabela()
            const modalFilmes = bootstrap.Modal.getInstance(document.getElementById('modalFilmes'));
            modalFilmes.hide()
        })
    }

    atualizarTabela() {
        let tabela = document.getElementById("tabela-filmes")
        console.log(tabela)
        tabela.innerHTML = `<tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Gênero</th>
                                <th>Classificação</th>
                                <th>Duração</th>
                                <th>Data Estreia</th>
                                <th>Editar/Excluir</th>
                            </tr>`
        this.listaFilmes.forEach(filme => {
            let linha = tabela.insertRow()
            linha.insertCell(0).textContent = filme.getId()
            linha.insertCell(1).textContent = filme.getTitulo()
            linha.insertCell(2).textContent = filme.getGenero()
            linha.insertCell(3).textContent = filme.getClassificacao()
            linha.insertCell(4).textContent = filme.getDuracao()
            linha.insertCell(5).textContent = filme.getDataEstreia()
            linha.insertCell(6).innerHTML = `<button class = "botaoEditarController rounded bg-secondary text-white" data-index = "${filme.getId()}">Editar</button>
                                            <button class = "botaoExcluirController rounded bg-danger text-white" data-index = "${filme.getId()}">Excluir</button>`
        })
        /* BOTAO EDITAR
        document.querySelectorAll(".botaoEditarController").forEach(button => {
            button.addEventListener("click", () => {
                this.botaoEditarController(button.getAttribute("data-index"))
            })
        })
        */
        document.querySelectorAll(".botaoExcluirController").forEach(button => {
            button.addEventListener("click", () => {
                this.botaoExcluirController(button.getAttribute("data-index"))
            })
        })

    }
    botaoExcluirController(idFilme) {
        this.listaFilmes.splice(idFilme - 1, 1)
        this.atualizarTabela()
    }


}


let teste = new FilmeController()





