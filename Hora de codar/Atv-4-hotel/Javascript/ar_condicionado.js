import { hotel_sistem } from './db.js';

function pedirNumero(mensagem, minimo, maximo = Infinity) {
    while (true) {
        const entrada = prompt(mensagem);
        if (entrada === null) return null;
        const numero = Number(entrada.replace(",", "."));
        if (Number.isFinite(numero) && numero >= minimo && numero <= maximo) return numero;
        alert(`Digite um valor entre ${minimo} e ${maximo === Infinity ? "sem limite" : maximo}.`);
    }
}

export function compararArCondicionado() {
    const orcamentos = [];
    let continuar = "S";

    while (continuar === "S") {
        const empresa = prompt("Nome da empresa:");
        if (empresa === null) return;
        if (!empresa.trim()) {
            alert("O nome da empresa não pode ficar vazio.");
            continue;
        }

        const valor = pedirNumero("Valor por aparelho:", 0.01);
        if (valor === null) return;
        const quantidade = pedirNumero("Quantidade de aparelhos:", 1);
        if (quantidade === null) return;
        const desconto = pedirNumero("Desconto (0 a 100%):", 0, 100);
        if (desconto === null) return;
        const minimo = pedirNumero("Quantidade mínima para aplicar desconto:", 1);
        if (minimo === null) return;
        const deslocamento = pedirNumero("Valor do deslocamento:", 0);
        if (deslocamento === null) return;

        const resultado = hotel_sistem.calcularOrcamentoAr({
            empresa: empresa.trim(), valor, quantidade, desconto, minimo, deslocamento
        });
        orcamentos.push(resultado);
        alert(`O serviço de ${resultado.empresa} custará R$ ${resultado.total.toFixed(2)}.`);

        continuar = (prompt("Deseja informar novos dados? (S/N)") || "N").trim().toUpperCase();
        while (continuar !== "S" && continuar !== "N") {
            continuar = (prompt("Digite S para continuar ou N para encerrar:") || "N").trim().toUpperCase();
        }
    }

    if (orcamentos.length === 0) {
        alert("Nenhum orçamento informado.");
        return;
    }

    const menor = orcamentos.reduce((a, b) => a.total < b.total ? a : b);
    const maior = orcamentos.reduce((a, b) => a.total > b.total ? a : b);
    const diferenca = menor.total === 0 ? 0 : ((maior.total - menor.total) / menor.total) * 100;
    alert(`Menor orçamento: ${menor.empresa} - R$ ${menor.total.toFixed(2)}\n` +
        `Maior orçamento: ${maior.empresa} - R$ ${maior.total.toFixed(2)}\n` +
        `Diferença: ${diferenca.toFixed(2)}%`);
}
