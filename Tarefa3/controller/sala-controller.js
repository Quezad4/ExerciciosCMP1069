import { Sala } from "../model/sala.js";

class SalaController {
    constructor() {
        this.listaSalas = []
        this.init()
    }
    init() {
        let botaoSalvar = document.getElementById("btnSalvarSala")
        this.carregarSalasDoLocalStorage()
        botaoSalvar.addEventListener("click", () => {
            this.criarSala()
            this.setarFilmesLocalStorage()
            this.fecharModal('modalSalas')

        })
    }
    criarSala() {
        let nome = document.getElementById("nome-sala").value
        let capacidade = document.getElementById("capacidade-sala").value
        let tipo = document.getElementById("tipo-sala").value
        let newSala = new Sala(this.getProximoId(), nome, capacidade, tipo)
        this.listaSalas.push(newSala)
    }
    setarFilmesLocalStorage() {
        localStorage.setItem("salas", JSON.stringify(this.listaSalas))
        this.atualizarTabela()
    }
    atualizarTabela() {
        let tabela = document.getElementById("tabela-salas")
        tabela.innerHTML = `<tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Capacidade</th>
                                <th>Tipo</th>
                                <th>Editar/Excluir</th>
                            </tr>`
        this.listaSalas.forEach(sala => {
            let linha = tabela.insertRow()
            linha.insertCell(0).textContent = sala.getId()
            linha.insertCell(1).textContent = sala.getNome()
            linha.insertCell(2).textContent = sala.getCapacidade()
            linha.insertCell(3).textContent = sala.getTipo()
            linha.insertCell(4).innerHTML = `<button class = "botaoEditarController rounded bg-secondary text-white" data-index = "${sala.getId()}" data-bs-toggle="modal" data-bs-target="#modalEditarSalas">Editar</button>
                                            <button class = "botaoExcluirController rounded bg-danger text-white" data-index = "${sala.getId()}">Excluir</button>`
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
    botaoExcluirController(idSala) {
        this.listaSalas = this.listaSalas.filter(sala => { return sala.getId() != idSala })
        this.setarFilmesLocalStorage()

    }
    botaoEditarController(idSala) {
        let index = this.listaSalas.findIndex(sala => { return sala.getId() == idSala })
        console.log(index)
        document.getElementById("nome-sala-editar").value = this.listaSalas[index].getNome()
        document.getElementById("capacidade-sala-editar").value = this.listaSalas[index].getCapacidade()
        document.getElementById("tipo-sala-editar").value = this.listaSalas[index].getTipo()
        document.getElementById("btnSalvarSalaEditado").addEventListener("click", () => {

            this.listaSalas[index].setNome(document.getElementById("nome-sala-editar").value)
            this.listaSalas[index].setCapacidade(document.getElementById("capacidade-sala-editar").value)
            this.listaSalas[index].setTipo(document.getElementById("tipo-sala-editar").value)
            this.setarFilmesLocalStorage()
            this.fecharModal("modalEditarSalas")

        })

    }
    carregarSalasDoLocalStorage() {
        const salasSalvos = JSON.parse(localStorage.getItem("salas"));
        if (salasSalvos) {
            this.listaSalas = this.transformarEmObjetoClasseSala(salasSalvos)
            this.atualizarTabela();
        }
    }

    transformarEmObjetoClasseSala(salasSalvos) {
        let filmesSalvosClasseSala = []
        salasSalvos.forEach(sala => {
            filmesSalvosClasseSala.push(Object.assign(new Sala(), sala))
        })
        return filmesSalvosClasseSala;
    }
    fecharModal(modal) {
        const modalFechar = bootstrap.Modal.getInstance(document.getElementById(modal));
        modalFechar.hide()
    }
    getProximoId() {
        if (this.listaSalas.length === 0) return 1;
        return Math.max(...this.listaSalas.map(f => f.getId())) + 1;
    }


}
let controle = new SalaController()