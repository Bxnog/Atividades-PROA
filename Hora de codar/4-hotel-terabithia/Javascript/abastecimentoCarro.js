import { hotel_sistem } from './db.js';
export function abastecerCarro() {
    let postos = [{ Nome: "Wayne Oil", precoGasolina: 0.0, precoAlcool: 0.0 }, { Nome: "Stark Petrol", precoGasolina: 0.0, precoAlcool: 0.0 }];
    for (let i = 0; i < postos.length; i++) {
        postos[i].precoGasolina = validarPrompt(`Digite o preço da gasolina no posto ${postos[i].Nome}:`);
        postos[i].precoAlcool = validarPrompt(`Digite o preço do Alcool no posto ${postos[i].Nome}:`);
    }
    hotel_sistem.calcularMelhorOpcao(postos);
}

function validarPrompt(mensagem) {
    let input = prompt(mensagem);
    let valor = parseFloat(input);

    while (input === null || input.trim() === '' || isNaN(valor) || valor <= 0) {
        alert("Entrada inválida. Por favor, insira um número válido maior que zero.");
        input = prompt(mensagem);
        valor = parseFloat(input);
    }

    return valor;
}