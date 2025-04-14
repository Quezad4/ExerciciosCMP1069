export class Sessao {
    constructor(id, filme, sala, dataHora, preco, idioma) {
        this.id = id;
        this.filme = filme;
        this.sala = sala;
        this.dataHora = dataHora;
        this.preco = preco;
        this.idioma = idioma;

    }
    getId(){
        return this.id;
    }
    setId(id){
        this.id = id;
    }
    getFilme() {
        return this.filme;
    }
    setFilme(filme) {
        this.filme = filme;
    }

    getSala() {
        return this.sala;
    }
    setSala(sala) {
        this.sala = sala;
    }

    getDataHora() {
        return this.dataHora;
    }
    setDataHora(dataHora) {
        this.dataHora = dataHora;
    }

    getIdioma() {
        return this.idioma;
    }
    setIdioma(idioma) {
        this.idioma = idioma;
    }

    getPreco() {
        return this.preco;
    }
    setPreco(preco) {
        this.preco = preco;
    }

    toString() {
        return console.log(`{ Filme: ${this.filme.titulo}, Sala: ${this.sala.nome}, Data: ${this.data}, Hora: ${this.hora}, Idioma: ${this.idioma}, Preço: R$${this.preco} }`);
    }
}
