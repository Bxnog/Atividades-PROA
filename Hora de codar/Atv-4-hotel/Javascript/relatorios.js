import { hotel_sistem } from './db.js';

export function exibirRelatorios() {
    const ocupados = hotel_sistem.quartos.filter(quarto => !quarto.livre).length;
    const receitaHospedagem = hotel_sistem.reservas.reduce((total, reserva) => total + reserva.total, 0);
    const receitaEventos = hotel_sistem.eventos.reduce((total, evento) => total + evento.total, 0);
    const linhas = [
        `Reservas de quartos: ${hotel_sistem.reservas.length}`,
        `Ocupação: ${ocupados}/20 (${(ocupados / 20 * 100).toFixed(0)}%)`,
        `Hóspedes cadastrados: ${hotel_sistem.hospedes.length}`,
        `Eventos confirmados: ${hotel_sistem.eventos.length}`,
        `Receita de hospedagem: R$ ${receitaHospedagem.toFixed(2)}`,
        `Receita de eventos: R$ ${receitaEventos.toFixed(2)}`,
        `Receita total: R$ ${(receitaHospedagem + receitaEventos).toFixed(2)}`
    ];
    alert(`RELATÓRIO OPERACIONAL - ${hotel_sistem.nomeHotel}\n\n${linhas.join("\n")}`);
}
