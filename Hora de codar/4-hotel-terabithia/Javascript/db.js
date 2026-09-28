export const hotel_sistem = {
    senha: "2678",
    usuarios: [],
    usuario_atual: { nome: "Breno" },
    nomeHotel: "Aura + Quarto",

    // ==============================================================================================
    // Quartos
    // ==============================================================================================
    quartos: Array.from({ length: 20 }, (_, index) => ({ numero: index + 1, livre: true, hospede: null })),

    gerarMapaQuartos() {
        let mapa = `======================================\n`;
        mapa += `   MAPA DE QUARTOS - ${this.nomeHotel.toUpperCase()}\n`;
        mapa += `======================================\n\n`;

        this.quartos.forEach((quarto, index) => {
            const numFormatado = String(quarto.numero).padStart(2, '0');
            mapa += `[ ${numFormatado} : ${quarto.livre ? "L" : "O"} ]  `;
            if ((index + 1) % 5 === 0) {
                mapa += "\n\n";
            }
        });

        mapa += `--------------------------------------\n`;
        mapa += `Legenda: [ L ] Livre  |  [ O ] Ocupado`;
        alert(mapa);
    },

    // ==============================================================================================
    // Hospedes
    // ==============================================================================================
    hospedes: [],

    cadastrarHospede(hospede) {
        hospede = hospede.trim();
        if (!this.valor_valido(hospede, "string", 0, 0)) {
            alert("⚠️ Não é possível cadastrar o hóspede. Nome inválido.");
            return false;
        }

        if (this.hospedes.length >= 15) {
            alert("⚠️ Máximo de cadastros atingido (Limite: 15 hóspedes).");
            return false;
        }

        const jaExiste = this.hospedes.some(h => h.nome.toLowerCase() === hospede.toLowerCase());
        if (jaExiste) {
            alert("⚠️ Hóspede já cadastrado!");
            return false;
        }

        const dataCadastro = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
        this.hospedes.push({ nome: hospede, dataCadastro: dataCadastro });
        alert(`✅ Hóspede "${hospede}" cadastrado com sucesso!`);
        return true;
    },

    // ==============================================================================================
    // Buscas
    // ==============================================================================================
    buscarNomeExato(nome) {
        if (!nome) return false;
        nome = nome.trim();
        if (!this.valor_valido(nome, "string", 0, 0)) {
            alert("⚠️ Nome inválido para pesquisa.");
            return false;
        }

        const indexHEncontrado = this.hospedes.findIndex(h => h?.nome?.toLowerCase() === nome.toLowerCase());

        if (indexHEncontrado !== -1) {
            const h = this.hospedes[indexHEncontrado];
            alert(`🔍 HÓSPEDE ENCONTRADO\n\n` +
                `📌 Índice: [${indexHEncontrado + 1}]\n` +
                `👤 Nome: ${h.nome}\n` +
                `📅 Data de Cadastro: ${h.dataCadastro}`);
        } else {
            alert("❌ Hóspede não encontrado.");
        }
    },

    buscarPrefixo(prefixo) {
        if (!prefixo) return false;
        prefixo = prefixo.trim().toLowerCase();
        if (!this.valor_valido(prefixo, "string", 0, 0)) {
            alert("⚠️ Nome inválido para pesquisa.");
            return false;
        }

        // Busca o elemento e seu índice real na lista original
        const resultados = this.hospedes
            .map((h, i) => ({ ...h, realIndex: i + 1 }))
            .filter(h => h.nome.toLowerCase().startsWith(prefixo));

        if (resultados.length === 0) {
            return alert("❌ Nenhum hóspede encontrado com esse prefixo.");
        }

        let mensagem = `🔍 RESULTADOS ENCONTRADOS (${resultados.length})\n`;
        mensagem += `--------------------------------------\n`;
        resultados.forEach(h => {
            mensagem += `[${h.realIndex}] ${h.nome} (Cadastrado em: ${h.dataCadastro})\n`;
        });

        alert(mensagem);
    },

    // ==============================================================================================
    // Listagem e Edição
    // ==============================================================================================
    listarOrdenado() {
        if (this.hospedes.length === 0) {
            alert("ℹ️ Nenhum hóspede cadastrado até o momento.");
            return;
        }

        // Mapeia o índice original antes de ordenar alfabeticamente
        let hospedes_ordenados = this.hospedes
            .map((h, i) => ({ ...h, realIndex: i + 1 }))
            .sort((a, b) => a.nome.localeCompare(b.nome));

        let lista = `📋 LISTA DE HÓSPEDES - ${this.nomeHotel.toUpperCase()}\n`;
        lista += `--------------------------------------\n`;
        lista += `Índice  |  Nome  |  Data de Cadastro\n`;
        lista += `--------------------------------------\n`;

        hospedes_ordenados.forEach(h => {
            lista += `[${h.realIndex}] ${h.nome} - (${h.dataCadastro})\n`;
        });

        alert(lista);
    },

    atualizarCadastro(resposta) {
        const index = parseInt(resposta) - 1;
        if (isNaN(index) || index < 0 || index >= this.hospedes.length) {
            alert("❌ Hóspede não encontrado.");
            return false;
        }

        let novoNome = prompt(`Editar hóspede [${index + 1}]: ${this.hospedes[index].nome}\nDigite o novo nome:`);
        while (novoNome !== null) {
            novoNome = novoNome.trim();
            if (novoNome === "") {
                alert("⚠️ Nome inválido.");
            } else {
                const jaExiste = this.hospedes.some((h, i) => i !== index && h.nome.toLowerCase() === novoNome.toLowerCase());
                if (jaExiste) {
                    alert("⚠️ Hóspede já cadastrado com esse nome!");
                } else {
                    this.hospedes[index].nome = novoNome;
                    alert("✅ Operação realizada com sucesso!");
                    return true;
                }
            }
            novoNome = prompt("Digite o novo nome:");
        }
        return false;
    },

    removerCadastro(resposta) {
        const index = parseInt(resposta) - 1;
        if (isNaN(index) || index < 0 || index >= this.hospedes.length) {
            alert("❌ Hóspede não encontrado.");
            return false;
        }

        const nomeRemovido = this.hospedes[index].nome;
        this.hospedes.splice(index, 1);
        alert(`✅ Operação realizada com sucesso!\nHóspede "${nomeRemovido}" removido.`);
        return true;
    },

    valor_valido(valor, tipo, limite_i, limite_s) {
        if (tipo === "string") {
            if (!valor || valor.length === 0) {
                return false;
            }
        } else if (tipo === "int") {
            valor = parseInt(valor);
            if (isNaN(valor)) {
                return false;
            }
            if (valor < limite_i || valor > limite_s) {
                alert(`⚠️ Valor inválido! Digite um valor entre ${limite_i} e ${limite_s}.`);
                return false;
            }
        }
        return true;
    },
    calcularMelhorOpcao(postos) {
        let melhorOpcao = null;
        let melhorPosto = null;
        let menorPreco = Infinity;
        let tanque = 42;
        for (let posto of postos) {
            let custoGasolina = posto.precoGasolina * tanque;
            let custoAlcool = posto.precoAlcool * tanque;
            let combustivelIdeal = posto.precoAlcool <= posto.precoGasolina * 0.70 ? "Álcool" : "Gasolina";
            let custoFinal = combustivelIdeal === "Álcool" ? custoAlcool : custoGasolina;
            if (custoFinal < menorPreco) {
                menorPreco = custoFinal;
                melhorPosto = posto.Nome;
                melhorOpcao = combustivelIdeal;
            }
            
        }
        alert(`Melhor opção: ${melhorOpcao} no posto ${melhorPosto} com custo de R$ ${menorPreco.toFixed(2)}`);
    }
};