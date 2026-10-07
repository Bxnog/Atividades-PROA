

const form = document.querySelector("#checkoutForm");
//const form = document.getElementById("checkoutForm");
const cepInput = document.querySelector("#cep");
const buscarCepButton = document.querySelector("#buscarCep");
const cepFeedback = document.querySelector("#cepFeedback");

function somenteNumeros(valor) {
  return valor.replace(/\D/g, "");
}

function formatarCep(valor) {
  const numeros = somenteNumeros(valor).slice(0, 8);
  if (numeros.length <= 5) return numeros;
  return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
}

function cepValido(cep) {
  return somenteNumeros(cep).length === 8;
}


form?.addEventListener("submit", (event) => {
  event.preventDefault();

  cepInput.setCustomValidity(cepValido(cepInput.value) ? "" : "CEP inválido");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    form.querySelector(":invalid")?.focus();
    return;
  }

  const nome = document.querySelector("#nome").value.trim();
  sessionStorage.setItem("clienteNome", nome);
  sessionStorage.setItem("pedidoNumero", `PED-${Math.floor(100000 + Math.random() * 900000)}`);
  window.location.href = "sucesso.html";
});


// Resumo================================================================================
// ================================================================================================================
const totalResumo = document.querySelector("#totalResumo");
const comprasResumo = document.querySelector("#comprasResumo");
const compras = JSON.parse(sessionStorage.getItem("compras")) || [];
// soma o total com reduce zero é o valor inicial
let total = compras.reduce((acumulador, atual) => acumulador + atual.preco * atual.quantidade, 0,);
// cria o resumo de todos os produtos comprados
comprasResumo.innerHTML = comprasResumo.innerHTML = compras.map(compra => `
  <div class="w-100">
    <div class="d-flex justify-content-between">
      <span>${compra.nomeProduto}</span>
      <span>R$ ${Number(compra.preco).toFixed(2)}</span>
    </div>

    <div class="d-flex justify-content-between text-secondary">
      <span>Quantidade</span>
      <span>${compra.quantidade}</span>
    </div>
  </div>
`).join("");;
// compras.forEach(compra => total += Number(compra.preco) * Number(compra.quantidade));
totalResumo.innerHTML = `<span>Total</span><span>R$ ${total.toFixed(2)}</span>`;
// { id: id, nomeProduto: produtos[id - 1].nome ,quantidade: quantidadeEscolhida, preco: produtos[id - 1].preco }
/* <div class="d-flex justify-content-between">
            <span id="nomeProdutoResumo"></span><span id="precoProdutoResumo"></span>
          </div>
          <div class="d-flex justify-content-between mt-2"><span>Frete</span><span>Grátis</span></div>
          <hr>
          <div class="d-flex justify-content-between fw-bold"><span>Total</span><span>R$ 189,90</span></div>
        </div> */



// let quantidade = sessionStorage.getItem('quantidade')
// let preco = produtos[sessionStorage.getItem('id') - 1].preco
// let subtotal = (quantidade * preco).toFixed(2)
// document.querySelector('#resumo-quantidade').textContent = quantidade
// document.querySelector('#resumo-subtotal').textContent = `R$ ${subtotal}`