let arrayFuncionarios = []



botaoCadastrar = document.getElementById("botaoCadastrar")

botaoCadastrar.addEventListener("click", () => {
    let nome = document.getElementById("nome").value
    let idade = document.getElementById("idade").value
    let cargo = document.getElementById("cargo").value
    let salario = document.getElementById("salario").value

    func = new Funcionario(nome, idade, cargo, salario)

    arrayFuncionarios.push(func)
    atualizarTabela()
})


let atualizarTabela = function(){
    let tabela = document.getElementById("tabela")
    tabela.innerHTML = `<tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Curso</th>
                            <th>Nota Final</th>
                        </tr>`
    indice = 0
    arrayFuncionarios.forEach(funcionario => {
        let linha = tabela.insertRow()
        linha.insertCell(0).textContent = funcionario.getNome();
        linha.insertCell(1).textContent = funcionario.getIdade();
        linha.insertCell(2).textContent = funcionario.getCargo();
        linha.insertCell(3).textContent = funcionario.getSalario();
        linha.insertCell(4).innerHTML = `<button class = "botaoEditar" data-index = "${indice}">Editar</button>`
        linha.insertCell(5).innerHTML = `<button class = "botaoExcluir" data-index = "${indice}">Excluir</button>`
        indice++;
    })

    document.querySelectorAll(".botaoEditar").forEach(button => {
        button.addEventListener("click", () => {
            botaoEditar(button.getAttribute("data-index"))
        })
    })
    document.querySelectorAll(".botaoExcluir").forEach(button => {
        button.addEventListener("click", () => {
            botaoExcluir(button.getAttribute("data-index"))
        })
    })
    limparInputs()
}

let botaoEditar = (indice) => {
    let nome = document.getElementById("nome").value
    let idade = document.getElementById("idade").value
    let cargo = document.getElementById("cargo").value
    let salario = document.getElementById("salario").value
    let nomeAntigo = arrayFuncionarios[indice].getNome()   
    arrayFuncionarios[indice].setNome(nome)
    arrayFuncionarios[indice].setIdade(idade)
    arrayFuncionarios[indice].setCargo(cargo)
    arrayFuncionarios[indice].setSalario(salario)
    atualizarTabela()
    limparInputs() 
    alert(`O aluno ${nomeAntigo} foi alterado!` )
}

let botaoExcluir = (indice) => {
    let nomeExcluido = arrayFuncionarios[indice].getNome()

    arrayFuncionarios.splice(indice,1)
    atualizarTabela()
    limparInputs()
    alert(`O aluno ${nomeExcluido} foi excluído!` )
}

let limparInputs = () => {
    let nome = document.getElementById("nome")
    let idade = document.getElementById("idade")
    let cargo = document.getElementById("cargo")
    let salario = document.getElementById("salario")

    nome.value = "";
    idade.value = "";
    cargo.value = "";
    salario.value = ""; 
}

let botaoGerarRelatorio = document.getElementById("relatorio")

botaoGerarRelatorio.addEventListener("click", () => {
    //SALARIO MAIOR QUE 400   
    resultadoSalario5000 = arrayFuncionarios.filter(funcionario => funcionario.getSalario() > 5000).map(funcionario => funcionario.getNome()).join(", ")
    document.getElementById("salario5000").textContent = resultadoSalario5000

    //MEDIA SALARIO
    resultadoMediaSalario = arrayFuncionarios.reduce((mediaSalario, funcionario) => {
        return mediaSalario += funcionario.getSalario()
    },0)/ arrayFuncionarios.length
    document.getElementById("mediaSalario").textContent = resultadoMediaSalario

    // CARGOS UNICOS
    let resultadoCargoUnico = [...new Set (arrayFuncionarios.map(funcionario => funcionario.getCargo()))].join(", ")
    document.getElementById("cargoUnico").textContent = resultadoCargoUnico
    


    //NOME MAISCULO
    resultadoNomeMaisculo = arrayFuncionarios.map(funcionario => funcionario.getNome().toUpperCase()).join(", ")
    document.getElementById("maisculo").textContent = resultadoNomeMaisculo
})

class Funcionario{
    constructor(nome, idade, cargo, salario){
        this.nome = nome
        this.idade = idade
        this.cargo = cargo
        this.salario = parseFloat(salario)
    }
    getNome(){
        return this.nome
    }
    getIdade(){
        return this.idade
    }
    getCargo(){
        return this.cargo
    }
    getSalario(){
        return this.salario
    }
    setNome(newNome){
        this.nome = newNome
    }
    setIdade(newIdade){
        this.idade = newIdade
    }
    setCargo(newCargo){
        this.cargo = newCargo
    }
    setSalario(newSalario){
        this.salario = newSalario
    }
}