import { hotel_sistem } from './db.js';
export function cadastrarHospede() {
    function opcaoMenu() {
        return prompt('1. Cadastrar \n2. Pesquisar por nome exato \n3. Pesquisar por prefixo \n4. Listar ordenado (A-Z) \n5. Atualizar cadastro \n6. Remover cadastro \n7. Voltar');
    }
    let opcao = opcaoMenu();
    while (opcao != '7') {
        switch (opcao) {
            case '1':
                !hotel_sistem.cadastrarHospede(prompt("Digite o nome do hóspede:"))
                break;
            case '2':
                hotel_sistem.buscarNomeExato(prompt("Digite o nome do hóspede para pesquisa:"));
                break;
            case '3':
                hotel_sistem.buscarPrefixo(prompt("Digite o prefixo do nome do hóspede para pesquisa:"));
                break;
            case '4':
                hotel_sistem.listarOrdenado();
                break;
            case '5':
                hotel_sistem.atualizarCadastro(prompt("Digite o indice o hospede a ser atualizado"));
                break;
            case '6':
                hotel_sistem.removerCadastro(prompt("Digite o indice o hospede a ser removido"));
                break;
        }
        opcao = opcaoMenu();
    }
}