export class Ingresso {
    constructor(id, filme, horario, tipo, idioma, sessao, nomeCliente, cpf, assento, tipoPagamento,) {
        this.id = id;
        this.sessao = sessao;
        this.nomeCliente = nomeCliente;
        this.cpf = cpf;
        this.assento = assento;
        this.tipoPagamento = tipoPagamento;
        this.filme = filme;
        this.horario = horario;
        this.tipo = tipo;
        this.idioma = idioma;
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // GET E SET

    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }

    getSessao() {
        return this.sessao;
    }
    setSessao(sessao) {
        this.sessao = sessao;
    }

    getNomeCliente() {
        return this.nomeCliente;
    }
    setNomeCliente(nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    getCPF() {
        return this.cpf;
    }
    setCPF(cpf) {
        this.cpf = cpf;
    }

    getAssento() {
        return this.assento;
    }
    setAssento(assento) {
        this.assento = assento;
    }

    getTipoPagamento() {
        return this.tipoPagamento;
    }
    setTipoPagamento(tipoPagamento) {
        this.tipoPagamento = tipoPagamento;
    }

    getFilme() {
        return this.filme;
    }
    setFilme(filme) {
        this.filme = filme;
    }

    getHorario() {
        return this.horario;
    }
    setHorario(horario) {
        this.horario = horario;
    }

    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }

    getIdioma() {
        return this.idioma;
    }
    setIdioma(idioma) {
        this.idioma = idioma;
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // toString
    toString() {
        return console.log(`{
  Ingresso ID: ${this.id},
  Cliente: ${this.nomeCliente},
  CPF: ${this.cpf},
  Assento: ${this.assento},
  Pagamento: ${this.tipoPagamento},
  Filme: ${this.filme},
  Horário: ${this.horario},
  Tipo: ${this.tipo},
  Idioma: ${this.idioma},
  Sessão: Filme - ${this.sessao.filme.titulo}, Sala - ${this.sessao.sala.nome}, Data - ${this.sessao.data}, Hora - ${this.sessao.hora}
}`);
    }
}
