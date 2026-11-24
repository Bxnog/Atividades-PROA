import tipo.BichoVirtual;
import tipo.Cachorro;
import tipo.Gato;
import tipo.Therian;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("Olá! Que tipo de pet você gostaria de adotar?");
        System.out.println("1) Cachorro");
        System.out.println("2) Gato");
        System.out.println("3) Therian");

        int opcao = scanner.nextInt();

        System.out.print("Digite o nome do seu pet: ");
        String nome = scanner.next();

        BichoVirtual pet;

        switch (opcao) {
            case 1:
                pet = new Cachorro(nome);
                break;

            case 2:
                pet = new Gato(nome);
                break;

            case 3:
                pet = new Therian(nome);
                break;

            default:
                System.out.println("Opção inválida!");
                scanner.close();
                return;
        }

        // Descobre os métodos exclusivos do animal
        List<Method> acoes = new ArrayList<>();

        for (Method metodo : pet.getClass().getDeclaredMethods()) {

            if (Modifier.isPublic(metodo.getModifiers())
                    && metodo.getParameterCount() == 0
                    && metodo.getReturnType() == void.class) {

                acoes.add(metodo);
            }
        }

        boolean continuar = true;

        while (continuar) {

            System.out.println("\n===== MENU DE " + pet.getNome().toUpperCase() + " =====");

            System.out.println("1. Alimentar");
            System.out.println("2. Brincar");
            System.out.println("3. Verificar status");

            int opcaoBase = 4;

            // Exibe automaticamente as ações exclusivas
            for (int i = 0; i < acoes.size(); i++) {
                System.out.println((opcaoBase + i) + ". " + acoes.get(i).getName());
            }

            int opcaoSair = opcaoBase + acoes.size();

            System.out.println(opcaoSair + ". Sair");

            System.out.print("Escolha uma ação: ");
            int escolha = scanner.nextInt();

            switch (escolha) {

                case 1:
                    pet.alimentar();
                    break;

                case 2:
                    pet.brincar();
                    break;

                case 3:
                    pet.verificarStatus();
                    break;

                default:

                    if (escolha >= opcaoBase && escolha < opcaoSair) {

                        Method metodo = acoes.get(escolha - opcaoBase);

                        try {
                            metodo.invoke(pet);
                        } catch (Exception e) {
                            System.out.println("Erro ao executar ação: " + e.getMessage());
                        }

                    } else if (escolha == opcaoSair) {

                        continuar = false;
                        System.out.println("Até logo!");

                    } else {
                        System.out.println("Opção inválida!");
                    }
            }

            if (continuar) {
                pet.passarTempo();
            }
        }

        scanner.close();
    }
}
