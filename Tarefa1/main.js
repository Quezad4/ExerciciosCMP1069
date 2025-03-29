let arrayAlunos = []


class Aluno{
    constructor(nome, idade, curso, nota){
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.nota = parseFloat(nota);
    }

    isAprovado(){
        if(this.nota >= 7)
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
    alert(`O aluno ${nome} foi criado!`)
})


let botaoGerarRelatorio = document.getElementById("relatorio")

botaoGerarRelatorio.addEventListener("click", () =>{
    //APROVADOS
    stringAprovados = arrayAlunos.filter((aluno) => aluno.isAprovado()).map(aluno => aluno.nome).join(", ")
    alunosAprovados = document.getElementById("aprovados")
    alunosAprovados.textContent = stringAprovados

    //MEDIA ALUNO
    let resultadoMediaNotas = arrayAlunos.reduce((somaNotas, aluno) => {
        return somaNotas += aluno.nota
    },0) / arrayAlunos.length

    document.getElementById("mediaNotas").textContent = resultadoMediaNotas

    //MEDIA IDADE
    let resultadoMediaIdades = arrayAlunos.reduce((mediaIdades, aluno) => {
        return mediaIdades += aluno.idade
    },0) / arrayAlunos.length
    document.getElementById("mediaIdades").textContent = resultadoMediaIdades

    //ALFABETICA
    let resultadoAlfabetico = arrayAlunos.map(aluno => aluno.nome).sort().join(", ")
    document.getElementById("alfabetica").textContent = resultadoAlfabetico

    //CURSOS POR ALUNO
    let cursos = arrayAlunos.reduce((curso,aluno) => {
        curso[aluno.curso] = (curso[aluno.curso] || 0) + 1 
        return curso
    }, {})

    resultadoPorCurso = Object.entries(cursos).map(([curso,quantidade]) => `${curso} : ${quantidade} alunos`).join(" | ")
    document.getElementById("porCurso").textContent = resultadoPorCurso





    
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
    arrayAlunos.forEach(aluno => {
        let linha = tabela.insertRow()
        linha.insertCell(0).textContent = aluno.nome;
        linha.insertCell(1).textContent = aluno.idade;
        linha.insertCell(2).textContent = aluno.curso;
        linha.insertCell(3).textContent = aluno.nota;
        linha.insertCell(4).innerHTML = `<button class = "botaoEditar" data-index = "${indice}">Editar</button>`
        linha.insertCell(5).innerHTML = `<button class = "botaoExcluir" data-index = "${indice}">Excluir</button>`
        indice++;
    });

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

    

}

let botaoEditar = (indice) => {
    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let curso  = document.getElementById("curso").value;
    let nota = document.getElementById("nota").value;
    let nomeAntigo = arrayAlunos[indice].nome   
    arrayAlunos[indice].nome = nome
    arrayAlunos[indice].idade = idade
    arrayAlunos[indice].curso = curso
    arrayAlunos[indice].nota = nota
    atualizarTabela()
    limparInputs() 
    alert(`O aluno ${nomeAntigo} foi alterado!` )
}

let botaoExcluir = (indice) => {
    let nomeExcluido = arrayAlunos[indice].nome
    arrayAlunos.splice(indice,1)
    atualizarTabela()
    limparInputs()
    alert(`O aluno ${nomeExcluido} foi excluído!` )
}


let limparInputs = () => {
    let nome = document.getElementById("nome");
    let idade = document.getElementById("idade");
    let curso  = document.getElementById("curso");
    let nota  = document.getElementById("nota");

    nome.value = "";
    idade.value = "";
    curso.value = "JavaScript";
    nota.value = ""; 
}








