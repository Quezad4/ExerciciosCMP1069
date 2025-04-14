export class Sala {
    constructor(id, nome, capacidade, tipo) {
        this.id = id;
        this.nome = nome;
        this.capacidade = capacidade;
        this.tipo = tipo;
    }
    setId(id) {
        this.id = id
    }
    getId() {
        return this.id
    }
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }

    getCapacidade() {
        return this.capacidade;
    }
    setCapacidade(capacidade) {
        this.capacidade = capacidade;
    }

    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }

    toString() {
        return console.log(`{ ${this.nome}, ${this.capacidade}, ${this.tipo} }`);
    }
}
