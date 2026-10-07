import { compras } from './compra.js';


const formProduto = document.querySelector("#formProduto");
const quantidade = document.querySelector("#quantidade");
const feedback = document.querySelector("#produtoFeedback");

// Campos do produto
const eyebrow = document.querySelector(".eyebrow");
const nomeProduto = document.querySelector(".nomeProduto");
const lead = document.querySelector(".lead");
const price = document.querySelector(".price");
const detalheProduto = document.querySelector(".detalheProduto");
const id = Number(new URLSearchParams(window.location.search).get("id")) || 1;
// =====================================================================

export const produtos = [
  {
    id: 1, nome: "Zulaine Guindaste",
    categoria: "Ferramentas",
    preco: 899.9,
    descricao: "Guindaste portátil Zulaine para levantamento e movimentação de cargas leves, ideal para oficinas e construção.",
    detalhes: ["Capacidade de carga: até 250 kg;", "Altura de elevação: 1,2 m;", "Peso leve e dobrável;", "Cabos de aço revestidos."],
    imagem: "../images/produtos/zulaine_guindaste.jpeg"
  },
  {
    id: 2, nome: "Uno Filhote",
    categoria: "Automotivo",
    preco: 129.9,
    descricao: "Modelo de brinquedo em escala do clássico Uno, perfeito para colecionadores e decoração temática.",
    detalhes: ["Escala 1:18;", "Detalhes em plástico resistente;", "Direção articulada;", "Pintura oficial da marca."],
    imagem: "../images/produtos/uno_filhote.jpeg"
  },
  {
    id: 3, nome: "Notebook",
    categoria: "Tecnologia",
    preco: 3299.0,
    descricao: "Notebook leve com processador eficiente, ideal para estudo e produtividade no dia a dia.",
    detalhes: ["Processador Intel Core i5;", "8 GB de memória RAM;", "SSD de 512 GB;", "Tela de 14 polegadas."],
    imagem: "../images/produtos/notebook.jpeg"
  },
  {
    id: 4, nome: "Nave",
    categoria: "Eletrônicos",
    preco: 749.5,
    descricao: "GPS portátil com tela sensível ao toque e atualização de rotas em tempo real.",
    detalhes: ["Tela de 7 polegadas;", "Atualização de mapas via Bluetooth;", "Bateria recarregável;", "Suporte de fixação para carro."],
    imagem: "../images/produtos/nave.png"
  },
  {
    id: 5, nome: "Colchão Pouco Usado",
    categoria: "Casa",
    preco: 649.0,
    descricao: "Colchão de espuma viscoelástica em excelente estado, quase novo, com garantia de 10 anos.",
    detalhes: ["Espessura de 20 cm;", "Material hipoalergênico;", "Revestimento removível e lavável;", "Estado: pouco usado."],
    imagem: "../images/produtos/colchao_pouco_usado.jpeg"
  },
  {
    id: 6, nome: "Casa",
    categoria: "Imóveis",
    preco: 485000.0,
    descricao: "Imóvel residencial com 3 quartos, 2 vagas e jardim, pronto para morar.",
    detalhes: ["3 quartos e 2 salas;", "2 vagas de garagem cobertas;", "Jardim com área de lazer;", "Cozinha planejada."],
    imagem: "../images/produtos/casa.jpeg"
  },
]
if (id < 1 || id > produtos.length) {
  alert("Produto não encontrado. Você será redirecionado para a página inicial.");
  window.location.href = "index.html";
}
eyebrow.textContent = produtos[id - 1].categoria;
nomeProduto.textContent = produtos[id - 1].nome;
lead.textContent = produtos[id - 1].descricao;
price.textContent = `R$ ${produtos[id - 1].preco.toFixed(2)}`;
detalheProduto.innerHTML = produtos[id - 1].detalhes.map(detalhe => `<li>${detalhe}</li>`).join("");
document.querySelector(".product-detail-illustration").style.backgroundImage = `url('${produtos[id - 1].imagem}')`;











formProduto?.addEventListener("submit", (event) => {
  event.preventDefault();
  const quantidadeEscolhida = Number(quantidade.value);

  if (quantidadeEscolhida < 1 || quantidadeEscolhida > 10) {
    feedback.textContent = "Escolha uma quantidade entre 1 e 10.";
    quantidade.focus();
    return;
  }
  compras.push({ id: id, nomeProduto: produtos[id - 1].nome ,quantidade: quantidadeEscolhida, preco: produtos[id - 1].preco });
  // PARA LISTA PERSISTENTE, USAR O SESSIONSTORAGE (IMPORTANTE)
  sessionStorage.setItem("compras", JSON.stringify(compras));
  // sessionStorage.setItem("quantidade", String(quantidadeEscolhida));
  // sessionStorage.setItem("id", Number(id));
  window.location.href = "checkout.html";
});



// <div class="col-lg-6">
//     <div class="product-detail-illustration" role="img" aria-label="Ilustração de uma mochila"></div>
//   </div>
//   <div class="col-lg-6">
//     <p class="eyebrow">Acessórios</p>
//     <h1>Mochila Horizonte</h1>
//     <p class="lead">Uma mochila compacta para quem carrega notebook, caderno, carregador e mais algumas pequenas histórias.</p>
//     <p class="price price-large">R$ 189,90</p>

//     <section aria-labelledby="titulo-detalhes" class="mb-4">
//       <h2 id="titulo-detalhes" class="h4">Detalhes</h2>
//       <ul>
//         <li>Compartimento para notebook de até 15 polegadas;</li>
//         <li>Dois bolsos externos;</li>
//         <li>Alças ajustáveis;</li>
//         <li>Material resistente à água.</li>
//       </ul>
//     </section>
/* TODO: usar URLSearchParams para carregar o produto conforme o id da URL. */
