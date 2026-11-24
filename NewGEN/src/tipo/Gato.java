package tipo;

public class Gato extends BichoVirtual {

    public Gato(String nome) {
        super(nome);
    }

    public void miar() {
        System.out.println(getNome() + " está miando!");
    }

    public void ronronar() {
        System.out.println(getNome() + " está ronronando!");
    }
}
