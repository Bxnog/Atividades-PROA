import { hotel_sistem } from './db.js';
export function agendarEvento() {
    let nConvidados = parseInt(prompt("Quantos Convidados"));
    while (isNaN(nConvidados) || nConvidados < 0) {
        if (isNaN(nConvidados)) {
            alert("Digite um numero")
        }
        if ((!isNaN(nConvidados)) && nConvidados < 0) {
            alert("Digite um nunmero maior que zero")
        }
        nConvidados = parseInt(prompt("Quantos Convidados"));
    }
    if (nConvidados > 350) {
        alert("Limite excedido :( Procure outro service ou Exclua alguem")
        return false
    }
    const [salao, cadeirasSobra] = hotel_sistem.escolherSalao(nConvidados)
    function normalizar(texto) {
        return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    const dias = {
        segunda: "segunda-feira",
        terca: "terça-feira",
        quarta: "quarta-feira",
        quinta: "quinta-feira",
        sexta: "sexta-feira",
        sabado: "sábado",
        domingo: "domingo"
    };
}