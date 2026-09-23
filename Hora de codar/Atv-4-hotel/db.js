export const hotel_sistem = {
    senha: "2678",
    nomeHotel: "Terabithia",
    usuario_atual: { nome: "Breno" },

    // ==============================================================================================
    // Quartos
    // ==============================================================================================
    quartos: Array.from({ length: 20 }, (_, index) => ({ 
        numero: index + 1, 
        livre: true, 
        hospede: null 
    })),

    gerarMapaQuartos() {
        let mapa = `=== MAPA DE QUARTOS - HOTEL ${this.nomeHotel.toUpperCase()} ===\n\n`;
        this.quartos.forEach((quarto, index) => {
            const status = quarto.livre ? "L" : "O";
            const numFormatado = String(quarto.numero).padStart(2, '0');
            mapa += `Q${numFormatado}: [${status}]    `;

            // Quebra de linha a cada 5 quartos (Grade 4x5)
            if ((index + 1) % 5 === 0) {
                mapa += "\n";
            }
        });
        alert(mapa);
    },

    // ==============================================================================================
    // Hóspedes
    // ==============================================================================================
    hospedes: [],

    cadastrarHospede(hospede) {
        if (!hospede || typeof hospede !== 'string') {
            alert("Não é possível cadastrar o hóspede. Nome inválido.");
            return false;
        }

        const nomeFormatado = hospede.trim();
        if (!this.valor_valido(nomeFormatado, "string", 0, 0)) {
            alert("Não é possível cadastrar o hóspede. Nome inválido.");
            return false;
        }

        // Requisito 5.2: Limite de 15 hóspedes
        if (this.hospedes.length >= 15) {
            alert("Máximo de cadastros atingido");
            return false;
        }

        // Verifica duplicidade por nome exato
        const jaExiste = this.hospedes.some(
            h => h?.nome?.toLowerCase() === nomeFormatado.toLowerCase()
        );

        if (jaExiste) {
            alert("Hóspede já cadastrado");
            return false;
        }

        const dataCadastro = new Date().toLocaleString('pt-BR', { 
            dateStyle: 'short', 
            timeStyle: 'short' 
        });

        this.hospedes.push({ nome: nomeFormatado, dataCadastro });
        alert("Operação realizada com sucesso");
        return true;
    },

    buscarNomeExato(nome) {
        if (!nome || typeof nome !== 'string') {
            alert("Nome inválido para pesquisa.");
            return -1;
        }

        const termo = nome.trim().toLowerCase();
        const indexEncontrado = this.hospedes.findIndex(
            h => h?.nome?.toLowerCase() === termo
        );

        if (indexEncontrado !== -1) {
            const h = this.hospedes[indexEncontrado];
            alert(`Hóspede [${indexEncontrado + 1}] foi encontrado.\nNome: ${h.nome}\nData de Cadastro: ${h.dataCadastro}`);
        } else {
            alert("Hóspede não encontrado");
        }

        return indexEncontrado;
    },

    buscarPrefixo(prefixo) {
        if (!prefixo || typeof prefixo !== 'string') {
            alert("Prefixo inválido.");
            return;
        }

        const termo = prefixo.trim().toLowerCase();
        const encontrados = this.hospedes
            .map((hospede, index) => ({ ...hospede, indexOriginal: index }))
            .filter(h => h?.nome?.toLowerCase().startsWith(termo));

        if (encontrados.length === 0) {
            alert("Hóspede não encontrado");
            return;
        }

        let mensagem = "Resultados:\n";
        encontrados.forEach(h => {
            mensagem += `[${h.indexOriginal + 1}] ${h.nome}\n`;
        });
        alert(mensagem);
    },

    listarOrdenado() {
        if (this.hospedes.length === 0) {
            alert("Nenhum hóspede cadastrado.");
            return;
        }

        // Cópia para ordenar sem alterar os índices originais da lista base
        const ordenados = this.hospedes
            .map((h, index) => ({ ...h, indexOriginal: index }))
            .sort((a, b) => a.nome.localeCompare(b.nome));

        let mensagem = "=== Lista de Hóspedes (A-Z) ===\n";
        ordenados.forEach(h => {
            mensagem += `[${h.indexOriginal + 1}] ${h.nome} - Cadastro: ${h.dataCadastro}\n`;
        });
        alert(mensagem);
    },

    atualizarHospede(indexFormatado, novoNome) {
        const index = indexFormatado - 1;
        if (index < 0 || index >= this.hospedes.length || isNaN(index)) {
            alert("Índice inválido.");
            return false;
        }

        if (!novoNome || typeof novoNome !== 'string' || novoNome.trim().length === 0) {
            alert("Nome inválido.");
            return false;
        }

        const nomeFormatado = novoNome.trim();
        const jaExiste = this.hospedes.some(
            (h, idx) => idx !== index && h.nome.toLowerCase() === nomeFormatado.toLowerCase()
        );

        if (jaExiste) {
            alert("Hóspede já cadastrado");
            return false;
        }

        this.hospedes[index].nome = nomeFormatado;
        alert("Operação realizada com sucesso");
        return true;
    },

    removerHospede(indexFormatado) {
        const index = indexFormatado - 1;
        if (index < 0 || index >= this.hospedes.length || isNaN(index)) {
            alert("Índice inválido.");
            return false;
        }

        this.hospedes.splice(index, 1);
        alert("Operação realizada com sucesso");
        return true;
    },

    // ==============================================================================================
    // Validação
    // ==============================================================================================
    valor_valido(valor, tipo, limite_i, limite_s) {
        if (tipo === "string") {
            if (!valor || valor.trim().length === 0) {
                return false;
            }
        } else if (tipo === "int") {
            const num = parseInt(valor);
            if (isNaN(num) || num < limite_i || num > limite_s) {
                return false;
            }
        }
        return true;
    }
};