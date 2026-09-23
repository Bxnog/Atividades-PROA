import { hotel_sistem } from './db.js';

export function reservarQuarto() {
    const nomeUsuario = hotel_sistem.usuario_atual.nome;

    // 1. Valor da Diária
    let diaria = parseFloat(prompt("Informe o valor da diária:"));
    if (isNaN(diaria) || diaria <= 0) {
        alert(`Valor inválido, ${nomeUsuario}`);
        return false;
    }

    // 2. Quantidade de Diárias
    let dias = parseInt(prompt("Informe a quantidade de diárias (1-30):"));
    if (isNaN(dias) || dias < 1 || dias > 30) {
        alert(`Valor inválido, ${nomeUsuario}`);
        return false;
    }

    // 3. Nome do Hóspede
    let nome_hospede = prompt("Informe o nome do hóspede:");
    if (!nome_hospede || !hotel_sistem.valor_valido(nome_hospede, "string", 0, 0)) {
        alert(`Valor inválido, ${nomeUsuario}`);
        return false;
    }

    // 4. Tipo de Quarto
    let opcao_quarto = prompt("Tipo de quarto (S/E/L):");
    if (!opcao_quarto) return false;
    
    opcao_quarto = opcao_quarto.trim().toUpperCase();
    while (!["S", "E", "L"].includes(opcao_quarto)) {
        alert("Opção inválida. Digite 'S' para Standard, 'E' para Executivo ou 'L' para Luxo.");
        opcao_quarto = prompt("Tipo de quarto (S/E/L):").trim().toUpperCase();
    }

    let fator_tipo_quarto = 1.0;
    let nomeTipo = "Standard";

    if (opcao_quarto === "E") {
        fator_tipo_quarto = 1.35;
        nomeTipo = "Executivo";
    } else if (opcao_quarto === "L") {
        fator_tipo_quarto = 1.65;
        nomeTipo = "Luxo";
    }

    // Exibe o mapa de quartos antes da escolha
    hotel_sistem.gerarMapaQuartos();

    // 5. Escolha do Quarto e Tratamento de Ocupados
    let numero_quarto;
    let quarto_escolhido = null;

    while (true) {
        numero_quarto = parseInt(prompt("Escolha um quarto (1-20):"));

        if (isNaN(numero_quarto) || numero_quarto < 1 || numero_quarto > 20) {
            alert("Número de quarto inválido. Escolha um número entre 1 e 20.");
            continue;
        }

        quarto_escolhido = hotel_sistem.quartos.find(q => q.numero === numero_quarto);

        if (!quarto_escolhido.livre) {
            alert("Quarto já está ocupado");
            hotel_sistem.gerarMapaQuartos();
        } else {
            break; // Quarto livre selecionado com sucesso
        }
    }

    // 6. Cálculos
    let subtotal = diaria * dias * fator_tipo_quarto;
    let taxa_servico = subtotal * 0.10;
    let total = subtotal + taxa_servico;

    // 7. Confirmação
    const resumo = `Resumo:
Hóspede: ${nome_hospede}
Quarto: ${numero_quarto} (${nomeTipo})
Subtotal: R$ ${subtotal.toFixed(2)}
Taxa de serviço (10%): R$ ${taxa_servico.toFixed(2)}
Total: R$ ${total.toFixed(2)}

${nomeUsuario}, confirma a reserva? (S/N)`;

    let confirmacao = prompt(resumo);
    if (!confirmacao) {
        alert("Reserva não efetuada.");
        return false;
    }

    confirmacao = confirmacao.trim().toUpperCase();
    while (confirmacao !== "S" && confirmacao !== "N") {
        alert("Opção inválida. Digite 'S' para Sim ou 'N' para Não.");
        confirmacao = prompt(`${nomeUsuario}, confirma a reserva? (S/N)`).trim().toUpperCase();
    }

    if (confirmacao === "N") {
        alert("Reserva não efetuada.");
        return false;
    }

    // 8. Ocupar quarto e salvar
    quarto_escolhido.livre = false;
    quarto_escolhido.hospede = nome_hospede;

    alert("Reserva efetuada com sucesso.");
    hotel_sistem.gerarMapaQuartos();
    return true;
}