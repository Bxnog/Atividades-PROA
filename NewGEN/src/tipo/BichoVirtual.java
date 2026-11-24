package tipo;

public abstract class BichoVirtual {

    private String nome;
    private int nivelDeFome = 50;
    private int nivelFelicidade = 50;

    public BichoVirtual(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }

    public void alimentar() {
        nivelDeFome -= 10;

        if (nivelDeFome < 0) {
            nivelDeFome = 0;
        }

        System.out.println(nome + " foi alimentado!");
    }

    public void brincar() {
        nivelFelicidade += 10;

        if (nivelFelicidade > 100) {
            nivelFelicidade = 100;
        }

        System.out.println(nome + " está brincando!");
    }

    public void verificarStatus() {
        System.out.println("\nStatus de " + nome);
        System.out.println("Fome: " + nivelDeFome);
        System.out.println("Felicidade: " + nivelFelicidade);
    }

    public void passarTempo() {
        nivelDeFome += 5;

        if (nivelDeFome > 100) {
            nivelDeFome = 100;
        }

        System.out.println(nome + " está ficando com fome.");
    }
}
