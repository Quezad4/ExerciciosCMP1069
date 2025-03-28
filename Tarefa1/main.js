let arrayAlunos = []


class Aluno{
    constructor(nome, idade, curso, nota){
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.nota = nota;
    }

    isAprovado(nota){
        if(nota>= 7)
            return true
        return false
    }
    toString(nome, idade, curso, nota){
        return "Aluno{" +
        "nome='" + nome + '\'' +
        ", idade=" + idade +
        ", curso='" + curso + '\'' +
        ", nota=" + nota +
        '}';
    }
};


let botaoCadastrar = document.getElementById("cadastrar")

botaoCadastrar.addEventListener("click", () => {

    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let curso  = document.getElementById("curso").value;
    let nota = document.getElementById("nota").value;

    newAluno = new Aluno(nome, idade, curso, nota)

    arrayAlunos.push(newAluno)
    atualizarTabela()
    limparInputs()
})


function atualizarTabela(){
    let tabela = document.getElementById("tabela")
    tabela.innerHTML = `<tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Curso</th>
                            <th>Nota Final</th>
                        </tr>`
    indice = 0
    arrayAlunos.forEach(aluno => {
        let linha = tabela.insertRow()
        linha.insertCell(0).textContent = aluno.nome;
        linha.insertCell(1).textContent = aluno.idade;
        linha.insertCell(2).textContent = aluno.curso;
        linha.insertCell(3).textContent = aluno.nota;
        linha.insertCell(4).innerHTML = `<button onclick = "botaoEditar(${indice})">Editar</button>`
        linha.insertCell(5).innerHTML = `<button onclick = "botaoExcluir(${indice})">Excluir</button>`
        indice++;
    });

}

function botaoEditar(indice){
    console.log("AQUI", indice)
    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let curso  = document.getElementById("curso").value;
    let nota = document.getElementById("nota").value;

    arrayAlunos[indice].nome = nome
    arrayAlunos[indice].idade = idade
    arrayAlunos[indice].curso = curso
    arrayAlunos[indice].nota = nota
    atualizarTabela()
    limparInputs()


}

function botaoExcluir(indice){
    arrayAlunos.splice(indice,1)
    atualizarTabela()
    limparInputs()
}


function limparInputs(){
    let nome = document.getElementById("nome");
    let idade = document.getElementById("idade");
    let curso  = document.getElementById("curso");
    let nota  = document.getElementById("nota");

    nome.value = "";
    idade.value = "";
    curso.value = "";
    nota.value = ""; 
}








