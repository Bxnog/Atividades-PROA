import { hotel_sistem } from './db.js';
export function reservarQuarto() {

    let diaria = parseFloat(prompt("Digite o valor da diaria:"))
    if (isNaN(diaria) || diaria < 0) {
        alert("Valor invalido " + hotel_sistem.usuario_atual.nome)
        return false
    }
    let dias = parseInt(prompt("Digite a quantidade de dias:"))
    if (!hotel_sistem.valor_valido(dias, "int", 1, 30)) {
        return alert("A quantidade de dias deve estar entre 1 e 30")
    }

    let nome_hospede = prompt("Digite o nome do hospede:")
    if (!hotel_sistem.valor_valido(nome_hospede, "string", 0, 0)) { return false }


    let opcao_quarto = prompt("Digite o tipo de quarto: 'S' standard, 'E' executivo, 'L' luxo").trim().toUpperCase()
    while (opcao_quarto != "S" && opcao_quarto != "E" && opcao_quarto != "L") {
        alert("Opção inválida. Digite 'S' para standard, 'E' para executivo ou 'L' para luxo.")
        opcao_quarto = prompt("Digite o tipo de quarto: 'S' standard, 'E' executivo, 'L' luxo").trim().toUpperCase()
    }
    let fator_tipo_quarto = 1;
    switch (opcao_quarto) {
        case "S":
            fator_tipo_quarto = 1;
            break;
        case "E":
            fator_tipo_quarto = 1.35;
            break;
        case "L":
            fator_tipo_quarto = 1.65;
            break;
    }
    hotel_sistem.gerarMapaQuartos()
    let numero_quarto = 0
    let quarto_escolhido = hotel_sistem.quartos.find(quarto => quarto.numero === numero_quarto)
    while (!quarto_escolhido?.livre) {
        numero_quarto = parseInt(prompt(`Escolha o quarto de 1 a 20:`));
        while (isNaN(numero_quarto) || numero_quarto < 1 || numero_quarto > 20) {
            numero_quarto = parseInt(prompt(`Escolha o quarto de 1 a 20:`));
        }
        quarto_escolhido = hotel_sistem.quartos.find(quarto => quarto.numero === numero_quarto)

    }
    let subtotal = diaria * dias * fator_tipo_quarto
    let taxa_servico = subtotal * 0.1
    let total = (subtotal + taxa_servico)
    alert(`A reserva pode ser realizada!\nNome do hóspede: ${nome_hospede}\nTipo de quarto: ${opcao_quarto}\nNúmero do quarto: ${numero_quarto}\nDiária: R$${diaria.toFixed(2)}\nQuantidade de dias: ${dias}\nSubtotal: R$${subtotal.toFixed(2)}\nTaxa de serviço (10%): R$${taxa_servico.toFixed(2)}\nTotal a pagar: R$${total.toFixed(2)}`)
    let confirmacao = prompt("Deseja confirmar a reserva? (S/N)").trim().toUpperCase()
    while (confirmacao != "S" && confirmacao != "N") {
        alert("Opção inválida. Digite 'S' para sim ou 'N' para não.");
        confirmacao = prompt("Deseja confirmar a reserva? (S/N)").trim().toUpperCase()
    }
    if (confirmacao === "N") {
        alert("Reserva cancelada.");
        return false
    }
    else {
        alert("Reserva concluida")
    }
    quarto_escolhido.livre = false
    hotel_sistem.gerarMapaQuartos()
}