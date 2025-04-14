import { Sessao } from "../model/sessao.js";
import { Filme } from "../model/filme.js";
import { Sala } from "../model/sala.js";

function transformarEmClasse(arr, Classe) {
  return arr.map(obj => Object.assign(new Classe(), obj));
}

const sessoes = transformarEmClasse(JSON.parse(localStorage.getItem("sessoes") || "[]"), Sessao);
const filmes = transformarEmClasse(JSON.parse(localStorage.getItem("filmes") || "[]"), Filme);
const salas = transformarEmClasse(JSON.parse(localStorage.getItem("salas") || "[]"), Sala);

const container = document.getElementById("cards-container");

sessoes.forEach(sessao => {
  const filme = filmes.find(f => f.getTitulo() === sessao.getFilme());
  const sala = salas.find(s => s.getNome() === sessao.getSala());

  const tituloFilme = filme?.getTitulo() || "Desconhecido";
  const nomeSala = sala?.getNome() || "Desconhecida";
  const dataHora = sessao.getDataHora();
  const preco = sessao.getPreco() ? sessao.getPreco() : "0.00";

  const col = document.createElement("div");
  col.className = "col-md-6 col-lg-4 mb-4";

  col.innerHTML = `
    <div class="card bg-secondary text-white h-100 shadow-lg">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${tituloFilme}</h5>
        <p class="card-text"><strong>Sala:</strong> ${nomeSala}</p>
        <p class="card-text"><strong>Data/Hora:</strong> ${dataHora}</p>
        <p class="card-text"><strong>Preço:</strong> R$ ${preco}</p>
        <a href="venda-ingressos.html?filme=${encodeURIComponent(tituloFilme)}" class="btn btn-light mt-auto">Comprar Ingresso</a>
      </div>
    </div>
  `;

  container.appendChild(col);
});
