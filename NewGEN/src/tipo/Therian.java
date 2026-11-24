package tipo;

public class Therian extends BichoVirtual {

    public Therian(String nome) {
        super(nome);
    }

    public void transformar() {
        System.out.println(getNome() + " está se transformando!");
    }

    public void vocalizar() {
        System.out.println(getNome() + " está vocalizando!");
    }
}
