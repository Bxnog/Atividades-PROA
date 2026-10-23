import { hotel_sistem } from './db.js';

function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function dinheiro(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function agendarEvento() {
    let entrada = prompt("Quantos convidados?");
    if (entrada === null) return;
    let nConvidados = Number(entrada);
    while (!Number.isInteger(nConvidados) || nConvidados < 0 || nConvidados > 350) {
        alert("Número de convidados inválido. Digite um inteiro entre 0 e 350.");
        entrada = prompt("Quantos convidados?");
        if (entrada === null) return;
        nConvidados = Number(entrada);
    }

    const [salao, cadeirasExtras] = hotel_sistem.escolherSalao(nConvidados);
    let dia;
    while (!dia) {
        const diaDigitado = prompt("Dia da semana:");
        if (diaDigitado === null) return;
        dia = hotel_sistem.agendarDia(normalizar(diaDigitado));
        if (!dia) alert("Dia inválido. Digite, por exemplo, terça ou terca.");
    }

    const maximoDia = dia === "sábado" || dia === "domingo" ? 15 : 23;
    let inicio;
    let duracao;
    while (true) {
        const entradaInicio = prompt(`Hora inicial (7 a ${maximoDia}):`);
        const entradaDuracao = prompt("Duração em horas (1 a 12):");
        if (entradaInicio === null || entradaDuracao === null) return;
        inicio = Number(entradaInicio);
        duracao = Number(entradaDuracao);
        if (!Number.isInteger(inicio) || !Number.isInteger(duracao) || duracao < 1 || duracao > 12 ||
            !hotel_sistem.agendarHora(dia, inicio, inicio + duracao)) {
            alert(`Horário inválido. O evento deve durar de 1 a 12 horas e terminar até ${maximoDia}h.`);
            continue;
        }
        break;
    }

    const empresa = prompt("Nome da empresa:");
    if (empresa === null || !empresa.trim()) {
        alert("Nome da empresa inválido. Agendamento cancelado.");
        return;
    }
    const data = prompt("Data do evento (ex.: 25/12/2026):");
    if (data === null || !data.trim()) {
        alert("Data inválida. Agendamento cancelado.");
        return;
    }

    const fim = inicio + duracao;
    const garcons = hotel_sistem.calcularGarcons(nConvidados, duracao);
    const custoGarcons = garcons * duracao * 10.5;
    const buffet = hotel_sistem.calcularBuffet(nConvidados);
    const total = custoGarcons + buffet.custo;
    const resumo = `[Eventos]\nEmpresa: ${empresa.trim()}\nData: ${data.trim()}\n` +
        `Auditório: ${salao} (${cadeirasExtras} cadeiras adicionais)\n` +
        `Convidados: ${nConvidados}\nHorário: ${dia}, ${inicio}h às ${fim}h (${duracao} horas)\n` +
        `Garçons: ${garcons} - ${dinheiro(custoGarcons)}\n\n` +
        `Buffet: café ${buffet.cafe.toFixed(1)} L, água ${buffet.agua.toFixed(1)} L, ` +
        `${buffet.salgados} salgados\nCusto buffet: ${dinheiro(buffet.custo)}\n` +
        `Total do evento: ${dinheiro(total)}`;
    alert(resumo);

    let confirmacao = (prompt("Confirmar reserva? (S/N)") || "N").trim().toUpperCase();
    while (confirmacao !== "S" && confirmacao !== "N") {
        confirmacao = (prompt("Digite S para confirmar ou N para cancelar:") || "N").trim().toUpperCase();
    }
    if (confirmacao === "N") {
        alert("Reserva não efetuada.");
        return false;
    }

    hotel_sistem.eventos.push({ empresa: empresa.trim(), data: data.trim(), salao, nConvidados,
        dia, inicio, fim, duracao, garcons, custoGarcons, custoBuffet: buffet.custo, total });
    alert(`Auditório reservado para ${empresa.trim()}: ${dia} às ${inicio}hs.\nReserva efetuada com sucesso.`);
    return true;
}
