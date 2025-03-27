let arrayAlunos = []


class Aluno{
    constructor(nome, idade, curso){
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
    }
};


let botaoCadastrar = document.getElementById("cadastrar")

botaoCadastrar.addEventListener("click", () => {

    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let curso  = document.getElementById("curso").value;

    newAluno = new Aluno(nome, idade, curso)

    arrayAlunos.push(newAluno)
    atualizarTabela()
    limparInputs()
})


function atualizarTabela(){
    let tabela = document.getElementById("tabela")
    console.log(tabela)
    arrayAlunos.forEach(aluno => {
        let linha = tabela.insertRow()
        linha.insertCell(0).textContent = aluno.nome;
        linha.insertCell(1).textContent = aluno.idade;
        linha.insertCell(2).textContent = aluno.curso;
    });
}


function limparInputs(){
    let nome = document.getElementById("nome");
    let idade = document.getElementById("idade");
    let curso  = document.getElementById("curso");

    nome.value = "";
    idade.value = "";
    curso.value = "";
}








