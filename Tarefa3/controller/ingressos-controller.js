import { Ingresso } from "../model/ingresso.js";
import { Sessao } from "../model/sessao.js";
import { Sala } from "../model/sala.js";
import { Filme } from "../model/filme.js";

class IngressoController {
    constructor() {
        this.listaIngressos = []
        this.init()
    }
    init() {
        let botaoSalvar = document.getElementById("btnSalvarIngresso")
        let selectFilme = document.getElementById("filme-ingresso")
        this.carregarIngressosDoLocalStorage()
        this.carregarSelectFilme()

        //ESCUTADORES DE EVENTO
        selectFilme.addEventListener("change", () => {
            this.carregarSelectHorario()
        })
        botaoSalvar.addEventListener("click", () => {
            this.criarIngresso()
            this.setarIngressosLocalStorage()
            this.fecharModal('modalIngressos')
        })

    }
    criarIngresso() {
        let filme = document.getElementById("filme-ingresso").value
        let horario = document.getElementById("hora-ingresso").value
        let tipo = document.getElementById("tipo-sessao-ingresso").value
        let idioma = document.getElementById("idioma-sessao-ingresso").value
        let nomecompleto = document.getElementById("nomecompleto-ingresso").value
        let cpf = document.getElementById("cpf-ingresso").value
        let assento = document.getElementById("assento-ingresso").value
        let pagamento = document.getElementById("pagamento-ingresso").value
        let newIngresso = new Ingresso(this.getProximoId(), filme, horario, tipo, idioma, this.findIDSessao(), nomecompleto, cpf, assento, pagamento)
        this.listaIngressos.push(newIngresso)
        console.log(newIngresso)
    }
    setarIngressosLocalStorage() {
        localStorage.setItem("ingressos", JSON.stringify(this.listaIngressos))
        this.atualizarTabela()
    }
    atualizarTabela() {
        let tabela = document.getElementById("tabela-ingressos");
        tabela.innerHTML = `<tr>
            <th>ID</th>
            <th>Filme</th>
            <th>Horário</th>
            <th>Tipo</th>
            <th>Idioma</th>
            <th>ID da Sessão</th>
            <th>Nome do Cliente</th>
            <th>CPF</th>
            <th>Assento</th>
            <th>Pagamento</th>
        </tr>`;
    
        this.listaIngressos.forEach(ingresso => {
            let linha = tabela.insertRow();
            linha.insertCell(0).textContent = ingresso.getId();                 // ID do ingresso
            linha.insertCell(1).textContent = ingresso.getFilme();             // Título do filme
            linha.insertCell(2).textContent = ingresso.getHorario();           // Horário
            linha.insertCell(3).textContent = ingresso.getTipo();              // Tipo da sala
            linha.insertCell(4).textContent = ingresso.getIdioma();            // Idioma da sessão
            linha.insertCell(5).textContent = ingresso.getSessao();          // ID da sessão
            linha.insertCell(6).textContent = ingresso.getNomeCliente();       // Nome do cliente
            linha.insertCell(7).textContent = ingresso.getCPF();               // CPF
            linha.insertCell(8).textContent = ingresso.getAssento();           // Assento
            linha.insertCell(9).textContent = ingresso.getTipoPagamento();    // Forma de pagamento
        });
    }
    
    findIDSessao() {
        let filmeSelecionado = document.getElementById("filme-ingresso").value;
        let horaSelecionada = document.getElementById("hora-ingresso").value;
        let tipoSelecionado = document.getElementById("tipo-sessao-ingresso").value;
        let idiomaSelecionado = document.getElementById("idioma-sessao-ingresso").value;
    
        let todasSessoes = this.transformarEmObjetoClasseSessao(JSON.parse(localStorage.getItem("sessoes")));
        let todasSalas = this.transformarEmObjetoClasseSala(JSON.parse(localStorage.getItem("salas")));
    
        for (let sessao of todasSessoes) {
            if (
                sessao.getFilme() === filmeSelecionado &&
                sessao.getDataHora() === horaSelecionada &&
                sessao.getIdioma() === idiomaSelecionado
            ) {
                // Encontra a sala associada à sessão
                let sala = todasSalas.find(s => s.getNome() === sessao.getSala());
                if (sala && sala.getTipo() === tipoSelecionado) {
                    return sessao.getId(); // Supondo que o ID da sessão seja acessado por getId()
                }
            }
        }
    
        return null; // Se não encontrar nada
    }
    fecharModal(modal) {
        const modalFechar = bootstrap.Modal.getInstance(document.getElementById(modal));
        modalFechar.hide()
    }
    carregarSelectFilme() {
        const filmesSalvos = this.transformarEmObjetoClasseFilme(JSON.parse(localStorage.getItem("filmes")));
        let selectFilme = document.getElementById("filme-ingresso")
        filmesSalvos.forEach(filme => {
            let option = document.createElement("option")
            option.textContent = filme.getTitulo()
            selectFilme.appendChild(option)
        })

    }
    carregarSelectHorario() {
        let filmeSelecionado = document.getElementById("filme-ingresso").value
        let selectHorario = document.getElementById("hora-ingresso");
        let selectTipo = document.getElementById("tipo-sessao-ingresso");
        let selectIdioma = document.getElementById("idioma-sessao-ingresso");

        this.limparSelect(selectHorario);
        this.limparSelect(selectTipo);
        this.limparSelect(selectIdioma);

        let todasSessoes = this.transformarEmObjetoClasseSessao(JSON.parse(localStorage.getItem("sessoes")));
        let sessoesDiponiveis = todasSessoes.filter(sessao => sessao.getFilme() == filmeSelecionado)
        let horarioDisponiveis = new Set()

        sessoesDiponiveis.map(sessao => horarioDisponiveis.add(sessao.getDataHora()))

        let horarioDisponiveisVetor = [...horarioDisponiveis]
        horarioDisponiveisVetor.forEach(horario => {
            let option = document.createElement("option")
            option.textContent = horario
            selectHorario.appendChild(option)
        })

        selectHorario.addEventListener("change", () => {
            this.carregarSelectTipo()
        })
    }

    carregarSelectTipo() {
        let selectTipo = document.getElementById("tipo-sessao-ingresso");
        let selectIdioma = document.getElementById("idioma-sessao-ingresso");

        this.limparSelect(selectTipo);
        this.limparSelect(selectIdioma);

        let filmeSelecionado = document.getElementById("filme-ingresso").value
        let horaSelecionada = document.getElementById("hora-ingresso").value
        let todasSessoes = this.transformarEmObjetoClasseSessao(JSON.parse(localStorage.getItem("sessoes")));
        let todasSalas = this.transformarEmObjetoClasseSala(JSON.parse(localStorage.getItem("salas")));

        let sessoesDiponiveis = todasSessoes.filter(sessao => sessao.getFilme() == filmeSelecionado)
        let salasDisponiveis = new Set();

        sessoesDiponiveis.forEach(sessao => {
            if (sessao.getDataHora() == horaSelecionada) {
                salasDisponiveis.add(sessao.getSala())
            }
        })

        let salasDisponiveisVetor = [...salasDisponiveis]
        let tiposDisponiveis = new Set();

        salasDisponiveisVetor.forEach(nomeSala => {
            todasSalas.forEach(sala => {
                if (nomeSala == sala.getNome()) {
                    tiposDisponiveis.add(sala.getTipo())
                }
            })
        })

        let tiposDisponiveisVetor = [...tiposDisponiveis]
        tiposDisponiveisVetor.forEach(tipo => {
            let option = document.createElement("option")
            option.textContent = tipo
            selectTipo.appendChild(option)
        })

        selectTipo.addEventListener("change", () => {
            this.carregarSelectIdioma()
        })
    }

    carregarSelectIdioma() {
        let selectIdioma = document.getElementById("idioma-sessao-ingresso");
        this.limparSelect(selectIdioma);

        let filmeSelecionado = document.getElementById("filme-ingresso").value;
        let horaSelecionada = document.getElementById("hora-ingresso").value;
        let tipoSelecionado = document.getElementById("tipo-sessao-ingresso").value;

        let todasSessoes = this.transformarEmObjetoClasseSessao(JSON.parse(localStorage.getItem("sessoes")));
        let todasSalas = this.transformarEmObjetoClasseSala(JSON.parse(localStorage.getItem("salas")));

        let idiomasDisponiveis = new Set();
        let salasDisponiveis = new Set();

        todasSessoes.forEach(sessao => {
            if (sessao.getFilme() == filmeSelecionado && sessao.getDataHora() == horaSelecionada) {
                let salaSessao = todasSalas.filter(sala => sala.getNome() == sessao.getSala());
                salaSessao.forEach(sala => {
                    if (sala && sala.getTipo() == tipoSelecionado) {
                        salasDisponiveis.add(sala.getNome());
                    }
                });
            }
        });

        let salasDisponiveisVetor = [...salasDisponiveis];

        salasDisponiveisVetor.forEach(nomeSala => {
            todasSessoes.forEach(sessao => {
                if (
                    sessao.getFilme() == filmeSelecionado &&
                    sessao.getDataHora() == horaSelecionada &&
                    sessao.getSala() == nomeSala
                ) {
                    idiomasDisponiveis.add(sessao.getIdioma());
                }
            });
        });

        let idiomasArray = [...idiomasDisponiveis];
        idiomasArray.forEach(idioma => {
            let option = document.createElement("option");
            option.textContent = idioma;
            selectIdioma.appendChild(option);
        });
    }



    carregarIngressosDoLocalStorage() {
        const ingressosSalvos = JSON.parse(localStorage.getItem("ingressos"));
        if (ingressosSalvos) {
            this.listaIngressos = this.transformarEmObjetoClasseIngresso(ingressosSalvos)
            this.atualizarTabela();
        }
    }
    transformarEmObjetoClasseIngresso(ingressosSalvos) {
        let ingressosClasseIngresso = []
        ingressosSalvos.forEach(ingresso => {
            ingressosClasseIngresso.push(Object.assign(new Ingresso(), ingresso))
        })
        return ingressosClasseIngresso;
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

    limparSelect(selectElement) {
        const placeholder = selectElement.options[0];
        const placeholderClone = placeholder.cloneNode(true);
        selectElement.innerHTML = "";
        selectElement.appendChild(placeholderClone);
        selectElement.selectedIndex = 0;
    }
    getProximoId() {
        if (this.listaIngressos.length === 0) return 1;
        return Math.max(...this.listaIngressos.map(f => f.getId())) + 1;
    }

}



let controle = new IngressoController();