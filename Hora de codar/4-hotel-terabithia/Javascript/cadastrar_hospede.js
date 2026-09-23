import { hotel_sistem } from './db.js';

export function cadastrarHospede() {
    function opcaoMenu() {
        return prompt(
            "[Cadastro de Hóspedes]\n" +
            "1. Cadastrar\n" +
            "2. Pesquisar por nome exato\n" +
            "3. Pesquisar por prefixo\n" +
            "4. Listar ordenado (A-Z)\n" +
            "5. Atualizar cadastro\n" +
            "6. Remover cadastro\n" +
            "7. Voltar"
        );
    }

    let opcao = opcaoMenu();
    while (opcao !== '7' && opcao !== null) {
        switch (opcao) {
            case '1': {
                const nome = prompt("Digite o nome do hóspede:");
                if (nome) {
                    hotel_sistem.cadastrarHospede(nome);
                }
                break;
            }
            case '2': {
                const nome = prompt("Digite o nome do hóspede para pesquisa exata:");
                if (nome) {
                    hotel_sistem.buscarNomeExato(nome);
                }
                break;
            }
            case '3': {
                const prefixo = prompt("Digite o prefixo do nome para pesquisa:");
                if (prefixo) {
                    hotel_sistem.buscarPrefixo(prefixo);
                }
                break;
            }
            case '4':
                hotel_sistem.listarOrdenado();
                break;
            case '5': {
                hotel_sistem.listarOrdenado();
                const idx = parseInt(prompt("Digite o número [índice] do hóspede que deseja atualizar:"));
                if (!isNaN(idx)) {
                    const novoNome = prompt("Digite o novo nome do hóspede:");
                    hotel_sistem.atualizarHospede(idx, novoNome);
                } else {
                    alert("Índice inválido.");
                }
                break;
            }
            case '6': {
                hotel_sistem.listarOrdenado();
                const idx = parseInt(prompt("Digite o número [índice] do hóspede que deseja remover:"));
                if (!isNaN(idx)) {
                    hotel_sistem.removerHospede(idx);
                } else {
                    alert("Índice inválido.");
                }
                break;
            }
            default:
                alert("Opção inválida. Tente novamente.");
                break;
        }
        opcao = opcaoMenu();
    }
}