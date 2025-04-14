import { Sessao } from "../model/sessao.js";
import { Sala } from "../model/sala.js";
import { Filme } from "../model/filme.js";

class SessaoController {
    constructor() {
        this.listaSessoes = []
        this.init()
    }
    init() {
        let botaoSalvar = document.getElementById("btnSalvarSessao")
        this.carregarSessoesDoLocalStorage()
        this.carregarSelects()
        botaoSalvar.addEventListener("click", () => {
            this.criarSessao()
            this.setarFilmesLocalStorage()
            this.fecharModal('modalSessoes')

        })
    }
    criarSessao() {
        let filme = document.getElementById("filme-sessao").value
        let sala = document.getElementById("sala-sessao").value
        let dataHora = document.getElementById("dataHora-sessao").value
        let preco = document.getElementById("preco-sessao").value
        let idioma = document.getElementById("idioma-sessao").value
        let newSessao = new Sessao(this.getProximoId(), filme, sala, dataHora, preco, idioma)
        this.listaSessoes.push(newSessao)
    }
    setarFilmesLocalStorage() {
        localStorage.setItem("sessoes", JSON.stringify(this.listaSessoes))
        this.atualizarTabela()
    }
    atualizarTabela() {
        let tabela = document.getElementById("tabela-sessoes")
        tabela.innerHTML = ` <tr>
                                <th>ID</th>
                                <th>Fime</th>
                                <th>Sala</th>
                                <th>Date e Hora</th>
                                <th>Preço</th>
                                <th>Idioma</th>
                                <th>Editar/Exlcuir</th>
                            </tr>`
        this.listaSessoes.forEach(sessao => {
            let linha = tabela.insertRow()
            linha.insertCell(0).textContent = sessao.getId()
            linha.insertCell(1).textContent = sessao.getFilme()
            linha.insertCell(2).textContent = sessao.getSala()
            linha.insertCell(3).textContent = sessao.getDataHora()
            linha.insertCell(4).textContent = sessao.getPreco()
            linha.insertCell(5).textContent = sessao.getIdioma()
            linha.insertCell(6).innerHTML = `<button class = "botaoEditarController rounded bg-secondary text-white" data-index = "${sessao.getId()}" data-bs-toggle="modal" data-bs-target="#modalEditarSessoes">Editar</button>
                                                <button class = "botaoExcluirController rounded bg-danger text-white" data-index = "${sessao.getId()}">Excluir</button>`
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
    botaoExcluirController(idSessao) {
        this.listaSessoes = this.listaSessoes.filter(sessao => { return sessao.getId() != idSessao })
        this.setarFilmesLocalStorage()
    }
    botaoEditarController(idSessao) {
        let index = this.listaSessoes.findIndex(sessao => { return sessao.getId() == idSessao })
        document.getElementById("filme-sessao-editar").value = this.listaSessoes[index].getFilme()
        document.getElementById("sala-sessao-editar").value = this.listaSessoes[index].getSala()
        document.getElementById("dataHora-sessao-editar").value = this.listaSessoes[index].getDataHora()
        document.getElementById("preco-sessao-editar").value = this.listaSessoes[index].getPreco()
        document.getElementById("idioma-sessao-editar").value = this.listaSessoes[index].getIdioma()
        document.getElementById("btnSalvarSessaoEditado").addEventListener("click", () => {

            this.listaSessoes[index].setFilme(document.getElementById("filme-sessao-editar").value)
            this.listaSessoes[index].setSala(document.getElementById("sala-sessao-editar").value)
            console.log(document.getElementById("dataHora-sessao-editar").value)
            this.listaSessoes[index].setDataHora(document.getElementById("dataHora-sessao-editar").value)
            this.listaSessoes[index].setPreco(document.getElementById("preco-sessao-editar").value)
            this.listaSessoes[index].setIdioma(document.getElementById("idioma-sessao-editar").value)
            this.setarFilmesLocalStorage()
            this.fecharModal("modalEditarSessoes")

        })

    }
    carregarSessoesDoLocalStorage() {
        const sessoesSalvas = JSON.parse(localStorage.getItem("sessoes"));
        if (sessoesSalvas) {
            this.listaSessoes = this.transformarEmObjetoClasseSessao(sessoesSalvas)
            this.atualizarTabela();
        }
        
    }
    carregarSelects(){
        const filmesSalvos = this.transformarEmObjetoClasseFilme(JSON.parse(localStorage.getItem("filmes")));
        const salasSalvas = this.transformarEmObjetoClasseSala(JSON.parse(localStorage.getItem("salas")));
        let selectFilme = document.getElementById("filme-sessao")
        let selectFilmeEditar = document.getElementById("filme-sessao-editar")
        filmesSalvos.forEach(filme => {
            let option = document.createElement("option")
            let option2 = document.createElement("option")
            option.textContent = filme.getTitulo()
            option2.textContent = filme.getTitulo()
            selectFilme.appendChild(option)
            selectFilmeEditar.appendChild(option2)
        })
        let selectSala = document.getElementById("sala-sessao")
        let selectSalaEditar = document.getElementById("sala-sessao-editar")
        salasSalvas.forEach(sala => {
            let option = document.createElement("option")
            let option2 = document.createElement("option")
            option.textContent = sala.getNome()
            option2.textContent = sala.getNome()
            selectSala.appendChild(option)
            selectSalaEditar.appendChild(option2)
        })
    }
    transformarEmObjetoClasseSessao(sessoesSalvas) {
        let filmesSalvosClasseSessao = []
        sessoesSalvas.forEach(sessao => {
            filmesSalvosClasseSessao.push(Object.assign(new Sessao(), sessao))
        })
        return filmesSalvosClasseSessao;
    }
    transformarEmObjetoClasseSala(salasSalvos) {
        let filmesSalvosClasseSala = []
        salasSalvos.forEach(sala => {
            filmesSalvosClasseSala.push(Object.assign(new Sala(), sala))
        })
        return filmesSalvosClasseSala;
    }
    transformarEmObjetoClasseFilme(filmesSalvos) {
        let filmesSalvosClasseFilme = []
        filmesSalvos.forEach(filme => {
            filmesSalvosClasseFilme.push(Object.assign(new Filme(), filme))
        })
        return filmesSalvosClasseFilme;
    }

    fecharModal(modal) {
        const modalFechar = bootstrap.Modal.getInstance(document.getElementById(modal));
        modalFechar.hide()
    }
    getProximoId() {
        if (this.listaSessoes.length === 0) return 1;
        return Math.max(...this.listaSessoes.map(f => f.getId())) + 1;
    }

}



let controle = new SessaoController();