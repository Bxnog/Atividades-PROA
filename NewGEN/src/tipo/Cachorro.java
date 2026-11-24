package tipo;

public class Cachorro extends BichoVirtual {

    public Cachorro(String nome) {
        super(nome);
    }

    public void latir() {
        System.out.println(getNome() + ": Auau!");
    }

    public void rolar() {
        System.out.println(getNome() + " está rolando no chão!");
    }
}
