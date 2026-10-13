import { hotel_sistem } from './db.js';
export function agendarEvento(){
    let nConvidados = parseInt(prompt("Quantos Convidados"));
    while(isNaN(nConvidados) || nConvidados < 0){
        if(isNaN(nConvidados)){
            alert("Digite um numero")
        }
        if((!isNaN(nConvidados)) && nConvidados < 0){
            alert("Digite um nunmero maior que zero")
        }
        nConvidados = parseInt(prompt("Quantos Convidados"));
    }
    if(nConvidados > 350){
        alert("Limite excedido :( Procure outro service ou Exclua alguem")
        return false
    }
    const [salao, cadeirasSobra] = hotel_sistem.escolherSalao(nConvidados)

}