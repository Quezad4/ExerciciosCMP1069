import { Filme } from "../model/filme.js";


class FilmeController {
    constructor() {
        this.listaFilmes = []
        this.init()
    }

    init() {
        let botaoSalvar = document.getElementById("btnSalvarFilme")
        this.carregarFilmesDoLocalStorage()
        botaoSalvar.addEventListener("click", () => {
            this.criarFilme()
            this.setarFilmesLocalStorage()
            this.fecharModal('modalFilmes')

        })
    }
    criarFilme() {
        let titulo = document.getElementById("titulo-filme").value
        let genero = document.getElementById("genero-filme").value
        let classificacao = document.getElementById("classificacao-filme").value
        let duracao = document.getElementById("duracao-filme").value
        let data = document.getElementById("data-filme").value
        let novoFilme = new Filme(this.getProximoId(), titulo, genero, classificacao, duracao, data)
        this.listaFilmes.push(novoFilme)
    }

    atualizarTabela() {
        let tabela = document.getElementById("tabela-filmes")
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
            linha.insertCell(6).innerHTML = `<button class = "botaoEditarController rounded bg-secondary text-white" data-index = "${filme.getId()}" data-bs-toggle="modal" data-bs-target="#modalEditarFilmes">Editar</button>
                                            <button class = "botaoExcluirController rounded bg-danger text-white" data-index = "${filme.getId()}">Excluir</button>`
        })

        document.querySelectorAll(".botaoEditarController").forEach(button => {
            button.addEventListener("click", () => {
                this.botaoEditarController(button.getAttribute("data-index"))
            })
        })
        document.querySelectorAll(".botaoExcluirController").forEach(button => {
            button.addEventListener("click", () => {
                this.botaoExcluirController(button.getAttribute("data-index"))
            })
        })

    }
    botaoExcluirController(idFilme) {
        this.listaFilmes = this.listaFilmes.filter(filme => { return filme.getId() != idFilme })
        this.setarFilmesLocalStorage()

    }
    botaoEditarController(idFilme) {
        let index = this.listaFilmes.findIndex(filme => {return filme.getId() == idFilme})
        
        document.getElementById("titulo-filme-editar").value = this.listaFilmes[index].getTitulo()
        document.getElementById("genero-filme-editar").value = this.listaFilmes[index].getGenero()
        document.getElementById("classificacao-filme-editar").value = this.listaFilmes[index].getClassificacao()
        document.getElementById("duracao-filme-editar").value = this.listaFilmes[index].getDuracao()
        document.getElementById("data-filme-editar").value = this.listaFilmes[index].getDataEstreia()      
        document.getElementById("btnSalvarFilmeEditado").addEventListener("click", () => {
            
            this.listaFilmes[index].setTitulo(document.getElementById("titulo-filme-editar").value) 
            this.listaFilmes[index].setGenero(document.getElementById("genero-filme-editar").value)
            this.listaFilmes[index].setClassificacao(document.getElementById("classificacao-filme-editar").value)
            this.listaFilmes[index].setDuracao(document.getElementById("duracao-filme-editar").value)
            this.listaFilmes[index].setDataEstreia(document.getElementById("data-filme-editar").value)
            this.setarFilmesLocalStorage()
            this.fecharModal("modalEditarFilmes")
            
        })
        
    }
    carregarFilmesDoLocalStorage() {
        const filmesSalvos = JSON.parse(localStorage.getItem("filmes"));
        if (filmesSalvos) {
            this.listaFilmes = this.transformarEmObjetoClasseFilme(filmesSalvos)
            this.atualizarTabela();
        }
    }
    transformarEmObjetoClasseFilme(filmesSalvos) {
        let filmesSalvosClasseFilme = []
        filmesSalvos.forEach(filme => {
            filmesSalvosClasseFilme.push(Object.assign(new Filme(), filme))
        })
        return filmesSalvosClasseFilme;
    }

    setarFilmesLocalStorage() {
        localStorage.setItem("filmes", JSON.stringify(this.listaFilmes))
        this.atualizarTabela()
    }
    fecharModal(modal) {
        const modalFechar= bootstrap.Modal.getInstance(document.getElementById(modal));
        modalFechar.hide()
    }

    getProximoId() {
        if (this.listaFilmes.length === 0) return 1;
        return Math.max(...this.listaFilmes.map(f => f.getId())) + 1;
    }


}

let teste = new FilmeController()





