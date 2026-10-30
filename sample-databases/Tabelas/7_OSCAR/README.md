# Oscar — Exercícios SQL

```sql
use oscar_database;
```

Bem-vindo à base de dados do **Oscar**!

O Oscar é a premiação mais prestigiada do cinema mundial, realizada anualmente desde 1929 pela Academia de Artes e Ciências Cinematográficas. Nesta base de dados, você encontrará registros históricos de indicados e vencedores de diversas categorias ao longo de quase 100 anos de história do cinema.

Nestes exercícios, você vai explorar o banco de dados SQL do Oscar e responder perguntas que revelam insights fascinantes sobre a história do cinema, tendências de premiação e momentos marcantes da indústria cinematográfica.

## Avaliação

- **Nível 1–4:** Operações básicas e queries simples.
- **Nível 5–8:** Agregações e análise de dados.
- **Nível 9–11:** Queries complexas e pensamento analítico.
- **Nível 12–14:** Expertise avançada e pensamento estratégico.

**Objetivo de aprendizado:** Ao completar todos os níveis, você será capaz de trabalhar com bases de dados históricas complexas, realizar análises estatísticas sofisticadas e extrair insights valiosos de grandes volumes de dados.

---

## Nível 1: Primeiros Passos

### Conhecendo a Base de Dados

**1.1 — Quantos registros existem na tabela de indicados ao Oscar?**

**Resposta:** 1430 registros.

```sql
SELECT COUNT(*) FROM oscar_indicados;
```

**1.2.1 — Quais são as diferentes categorias de premiação que existem no banco de dados? Liste todas as categorias únicas.**

**Resposta:**

```text
ACTOR
ACTOR IN A LEADING ROLE
ACTOR IN A SUPPORTING ROLE
...
```

```sql
SELECT DISTINCT categoria FROM oscar_indicados;
```

**1.2.2 — Quantas categorias únicas existem?**

**Resposta:** 92 registros.

```sql
SELECT COUNT(DISTINCT categoria) FROM oscar_indicados;
```

**1.3 — Qual foi o primeiro ano de cerimônia do Oscar registrado na base?**

```sql
select min(ano_cerimonia) as primeira_cerimonia from indicados_ao_oscar;
```

**Resposta:** 1928.

**1.4 — Qual foi o último ano de cerimônia registrado na base?**

```sql
select max(ano_cerimonia) as ultima_cerimonia from indicados_ao_oscar;
```

**Resposta:** 2024.

**1.5 — Quantas cerimônias do Oscar estão registradas no total?**

```sql
select max(edicao_cerimonia) as total_de_cerimonias from indicados_ao_oscar;
```

**Resposta:** 96.

**1.6 — Atualize os registros da tabela com os dados do Oscar 2025 e 2026 (pesquise os vencedores e adicione-os).**

---

## Nível 2: Explorando Categorias

**2.1 — Quantas indicações existem para cada categoria? Agrupe por categoria e ordene da mais frequente para a menos frequente.**

```sql
select categoria, count(*) as indicacoes from indicados_ao_oscar group by categoria order by count(*) desc;
```

**Resultado:**

```text
DIRECTING	469
FILM EDITING	450
ACTOR IN A SUPPORTING ROLE	450
ACTRESS IN A SUPPORTING ROLE	450
BEST PICTURE	391
DOCUMENTARY (Short Subject)	378
DOCUMENTARY (Feature)	345
CINEMATOGRAPHY	338
FOREIGN LANGUAGE FILM	315
ART DIRECTION	307
COSTUME DESIGN	295
MUSIC (Original Score)	270
ACTOR IN A LEADING ROLE	250
ACTRESS IN A LEADING ROLE	250
SOUND	245
ACTRESS	236
MUSIC (Original Song)	235
ACTOR	232
SHORT FILM (Live Action)	226
MUSIC (Song)	215
SHORT FILM (Animated)	215
SOUND RECORDING	195
SHORT SUBJECT (Cartoon)	169
CINEMATOGRAPHY (Black-and-White)	161
WRITING (Original Screenplay)	160
VISUAL EFFECTS	155
MUSIC (Music Score of a Dramatic or Comedy Picture)	148
ART DIRECTION (Black-and-White)	138
CINEMATOGRAPHY (Color)	135
HONORARY AWARD	133
MUSIC (Scoring of a Musical Picture)	127
WRITING (Screenplay Written Directly for the Screen)	120
ART DIRECTION (Color)	112
WRITING (Adapted Screenplay)	110
WRITING (Screenplay)	104
OUTSTANDING PRODUCTION	102
ANIMATED FEATURE FILM	99
WRITING (Screenplay--based on material from another medium)	95
SPECIAL EFFECTS	93
SHORT SUBJECT (One-reel)	90
BEST MOTION PICTURE	90
MAKEUP	87
SOUND EDITING	86
SOUND MIXING	85
SHORT SUBJECT (Two-reel)	81
COSTUME DESIGN (Black-and-White)	77
COSTUME DESIGN (Color)	77
SHORT SUBJECT (Live Action)	68
WRITING (Screenplay Based on Material from Another Medium)	65
MUSIC (Scoring)	64
WRITING (Story and Screenplay--written directly for the screen)	60
PRODUCTION DESIGN	60
SPECIAL AWARD	56
WRITING (Screenplay Based on Material Previously Produced or Published)	55
WRITING (Original Story)	52
WRITING (Motion Picture Story)	50
SOUND EFFECTS EDITING	47
MAKEUP AND HAIRSTYLING	46
IRVING G. THALBERG MEMORIAL AWARD	45
JEAN HERSHOLT HUMANITARIAN AWARD	44
MUSIC (Original Dramatic Score)	41
ASSISTANT DIRECTOR	35
WRITING (Story and Screenplay)	35
OUTSTANDING MOTION PICTURE	30
MUSIC (Scoring of Music--adaptation or treatment)	30
DOCUMENTARY	25
WRITING (Original Motion Picture Story)	25
MUSIC (Song--Original for the Picture)	25
INTERNATIONAL FEATURE FILM	25
DANCE DIRECTION	21
MUSIC (Music Score of a Dramatic Picture)	20
MUSIC (Music Score--substantially original)	20
WRITING (Story and Screenplay--based on factual material or material not previously published or produced)	20
MUSIC (Original Musical or Comedy Score)	20
WRITING (Adaptation)	17
SPECIAL VISUAL EFFECTS	16
SHORT SUBJECT (Comedy)	13
SHORT SUBJECT (Novelty)	12
WRITING	11
SOUND EFFECTS	10
MUSIC (Original Music Score)	10
MUSIC (Original Score--for a motion picture [not a musical])	10
MUSIC (Score of a Musical Picture--original or adaptation)	10
WRITING (Screenplay Adapted from Other Material)	10
WRITING (Screenplay Written Directly for the Screen--based on factual material or on story material not previously published or produced)	10
DOCUMENTARY FEATURE FILM	10
DOCUMENTARY SHORT FILM	10
SHORT SUBJECT (Animated)	9
SPECIAL ACHIEVEMENT AWARD (Visual Effects)	9
MUSIC (Scoring: Original Song Score and Adaptation -or- Scoring: Adaptation)	9
OUTSTANDING PICTURE	8
MUSIC (Original Song Score)	8
MUSIC (Scoring: Adaptation and Original Song Score)	8
SHORT SUBJECT (Color)	6
MUSIC (Original Song Score and Its Adaptation or Adaptation Score)	6
MUSIC (Original Song Score and Its Adaptation -or- Adaptation Score)	6
HONORARY FOREIGN LANGUAGE FILM AWARD	5
WRITING (Screenplay--Adapted)	5
WRITING (Screenplay--Original)	5
WRITING (Story and Screenplay--based on material not previously published or produced)	5
SPECIAL ACHIEVEMENT AWARD (Sound Effects Editing)	4
DIRECTING (Dramatic Picture)	3
ENGINEERING EFFECTS	3
UNIQUE AND ARTISTIC PICTURE	3
WRITING (Title Writing)	3
SPECIAL ACHIEVEMENT AWARD	3
MUSIC (Adaptation Score)	3
SHORT FILM (Dramatic Live Action)	3
MUSIC (Original Song Score or Adaptation Score)	3
DIRECTING (Comedy Picture)	2
SPECIAL FOREIGN LANGUAGE FILM AWARD	2
SPECIAL ACHIEVEMENT AWARD (Sound Effects)	1
SPECIAL ACHIEVEMENT AWARD (Sound Editing)	1
GORDON E. SAWYER AWARD	1
AWARD OF COMMENDATION	1
```

**2.2 — Qual categoria teve mais indicações ao longo da história do Oscar?**

```sql
select categoria, count(*) as indicacoes from indicados_ao_oscar group by categoria order by indicacoes desc limit 1;
```

**Resultado:** DIRECTING — 469.

**2.3 — Qual categoria teve menos indicações ao longo da história?**

```sql
select categoria, count(*) as indicacoes from indicados_ao_oscar group by categoria having indicacoes = 1;
```

**Resultado:**

```text
SPECIAL ACHIEVEMENT AWARD (Sound Effects)	1
SPECIAL ACHIEVEMENT AWARD (Sound Editing)	1
GORDON E. SAWYER AWARD	1
AWARD OF COMMENDATION	1
```

**2.4 — A partir de que ano a categoria "ACTRESS" deixou de existir? (Dica: procure a última cerimônia com essa categoria)**

```sql
select categoria, ano_cerimonia from indicados_ao_oscar where categoria = 'ACTRESS' order by ano_cerimonia desc limit 1;
```

**Resposta:** ACTRESS — 1976.

**2.5 — Quais categorias existiam na primeira cerimônia (1928) e não existem mais hoje?**

```sql
select distinct categoria from indicados_ao_oscar where ano_cerimonia = 1928 AND categoria not in( select categoria from indicados_ao_oscar where ano_cerimonia = 2026);
```

**Resultado:**

```text
ACTOR
ACTRESS
ART DIRECTION
CINEMATOGRAPHY
DIRECTING (Comedy Picture)
DIRECTING (Dramatic Picture)
ENGINEERING EFFECTS
OUTSTANDING PICTURE
UNIQUE AND ARTISTIC PICTURE
WRITING (Adaptation)
WRITING (Original Story)
WRITING (Title Writing)
SPECIAL AWARD
```

**2.6 — Liste todas as categorias que contêm a palavra "DIRECTING" no nome.**

```sql
select distinct categoria from indicados_ao_oscar where categoria like '%DIRECTING%';
```

**Resultado:**

```text
DIRECTING (Comedy Picture)
DIRECTING (Dramatic Picture)
DIRECTING
```

---

## Nível 3: Atores e Atrizes Famosos

### Natalie Portman

**3.1 — Quantas vezes Natalie Portman foi indicada ao Oscar?**

```sql
select count(*) as indicacoes_natalie_portman from indicados_ao_oscar where nome_indicado = 'Natalie Portman';
```

**Resposta:** 3.

**3.2 — Quantos Oscars Natalie Portman ganhou?**

```sql
select count(*) as indicacoes_natalie_portman from indicados_ao_oscar where nome_indicado = 'Natalie Portman' and vencedor = 1;
```

**Resposta:** 1.

**3.3 — Em quais anos e por quais filmes Natalie Portman foi indicada?**

```sql
select ano_cerimonia, nome_filme from indicados_ao_oscar where nome_indicado = 'Natalie Portman';
```

**Resultado:**

```text
2005	Closer
2011	Black Swan
2017	Jackie
```

**3.4 — Liste todas as indicações de Natalie Portman mostrando: ano, categoria, filme e se venceu.**

```sql
select ano_cerimonia, nome_filme, CASE vencedor WHEN 0 THEN 'Não' WHEN 1 THEN 'Sim'
end as venceu from indicados_ao_oscar where nome_indicado = 'Natalie Portman';
```

**Resultado:**

```text
2005	Closer	Não
2011	Black Swan	Sim
2017	Jackie	Não
```

### Viola Davis

**3.5 — Quantas vezes Viola Davis foi indicada ao Oscar?**

**Resposta:** 4.

```sql
SELECT COUNT(*) FROM indicados_ao_oscar
WHERE nome_indicado LIKE "%Viola Davis%"
```

**3.6 — Quantos Oscars Viola Davis ganhou?**

**Resposta:** 1.

```sql
SELECT COUNT(*) FROM indicados_ao_oscar
WHERE nome_indicado LIKE "%Viola Davis%"
AND 
vencedor = true;
```

**3.7 — Por quais filmes Viola Davis foi indicada?**

```sql
select nome_filme from indicados_ao_oscar where nome_indicado = 'Viola Davis';
```

**Resultado:**

```text
Doubt
The Help
Fences
Ma Rainey's Black Bottom
```

### Amy Adams

**3.8 — Amy Adams já ganhou algum Oscar?**

```sql
select nome_filme, ano_cerimonia, vencedor from indicados_ao_oscar where nome_indicado = 'Amy Adams' and vencedor = 1;
```

**Resposta:** não.

**3.9 — Quantas vezes Amy Adams foi indicada sem ganhar?**

```sql
select count(*) from indicados_ao_oscar where nome_indicado = 'Amy Adams' and vencedor = 0;
```

**Resposta:** 6.

### Denzel Washington

**3.10 — Denzel Washington já ganhou algum Oscar?**

```sql
select nome_filme, ano_cerimonia from indicados_ao_oscar where nome_indicado = 'Denzel Washington' and vencedor = 1;
```

**Resultado:**

```text
Glory	1990
Training Day	2002
```

**3.11 — Quantas vezes Denzel Washington foi indicado ao Oscar?**

```sql
select count(*) as indicacoes_denzel_w from indicados_ao_oscar where nome_indicado = 'Denzel Washington';
```

**Resposta:** 9.

**3.12 — Liste todos os Oscars que Denzel Washington ganhou (ano, categoria, filme).**

```sql
select ano_cerimonia, categoria, nome_filme from indicados_ao_oscar where nome_indicado = 'Denzel Washington' and vencedor = 1;
```

**Resultado:**

```text
1990	ACTOR IN A SUPPORTING ROLE	Glory
2002	ACTOR IN A LEADING ROLE	Training Day
```

---

## Nível 4: Vencedores Históricos

**4.1 — Quem ganhou o primeiro Oscar para Melhor Atriz (ACTRESS)? Em que ano e por qual filme?**

```sql
select nome_indicado ,ano_cerimonia, nome_filme from indicados_ao_oscar where categoria = 'ACTRESS' and vencedor = 1 order by ano_cerimonia limit 1;
```

**Resultado:** Janet Gaynor — 1928 — 7th Heaven.

**4.2 — Quem ganhou o primeiro Oscar para Melhor Ator (ACTOR)? Em que ano e por qual filme?**

```sql
select nome_indicado ,ano_cerimonia, nome_filme from indicados_ao_oscar where categoria = 'ACTOR' and vencedor = 1 order by ano_cerimonia limit 1;
```

**Resultado:** Emil Jannings — 1928 — The Last Command.

**4.3 — Quantos vencedores existem ao todo na base de dados?**

```sql
select count(*) from indicados_ao_oscar where vencedor = 1;
```

**Resultado:** 2475.

**4.4 — Liste todos os filmes que ganharam o Oscar de Melhor Filme (categoria "OUTSTANDING PICTURE" ou "BEST PICTURE").**

```sql
select nome_filme from indicados_ao_oscar WHERE categoria IN ('OUTSTANDING PICTURE', 'BEST PICTURE') and vencedor = 1;
```

**Resultado:**

```text
Wings
The Broadway Melody
Lawrence of Arabia
Tom Jones
My Fair Lady
The Sound of Music
A Man for All Seasons
In the Heat of the Night
Oliver!
Midnight Cowboy
Patton
The French Connection
The Godfather
The Sting
The Godfather Part II
One Flew over the Cuckoo's Nest
Rocky
Annie Hall
The Deer Hunter
Kramer vs. Kramer
Ordinary People
Chariots of Fire
Gandhi
Terms of Endearment
Amadeus
Out of Africa
Platoon
The Last Emperor
Rain Man
Driving Miss Daisy
Dances With Wolves
The Silence of the Lambs
Unforgiven
Schindler's List
Forrest Gump
Braveheart
The English Patient
Titanic
Shakespeare in Love
American Beauty
Gladiator
A Beautiful Mind
Chicago
The Lord of the Rings: The Return of the King
Million Dollar Baby
Crash
The Departed
No Country for Old Men
Slumdog Millionaire
The Hurt Locker
The King's Speech
The Artist
Argo
12 Years a Slave
Birdman or (The Unexpected Virtue of Ignorance)
Spotlight
Moonlight
The Shape of Water
Green Book
Parasite
Nomadland
CODA
Everything Everywhere All at Once
Oppenheimer
Anora
One Battle after Another
```

**4.5 — Quantos filmes diferentes já ganharam o Oscar?**

```sql
select count(distinct nome_filme) as filmes_vencedores
from indicados_ao_oscar
where vencedor = 1;
```

**Resultado:** 1336.

---

## Nível 5: Análise de Indicações

**5.1 — Quais atores/atrizes foram indicados mais de uma vez? Liste o nome e o número de indicações.**

```sql
select nome_indicado, count(*) as indicacoes
from indicados_ao_oscar
WHERE categoria IN (
    'ACTOR',
    'ACTRESS',
    'ACTOR IN A LEADING ROLE',
    'ACTRESS IN A LEADING ROLE',
    'ACTOR IN A SUPPORTING ROLE',
    'ACTRESS IN A SUPPORTING ROLE'
)
group by nome_indicado
having indicacoes > 1;
```

**5.2 — Qual ator ou atriz tem o maior número de indicações na história do Oscar?**

```sql
select nome_indicado, count(*) as indicacoes
from indicados_ao_oscar
WHERE categoria IN (
    'ACTOR',
    'ACTRESS',
    'ACTOR IN A LEADING ROLE',
    'ACTRESS IN A LEADING ROLE',
    'ACTOR IN A SUPPORTING ROLE',
    'ACTRESS IN A SUPPORTING ROLE'
)
group by nome_indicado
order by indicacoes desc
limit 1;
```

**Resultado:** Meryl Streep — 21.

**5.3 — Quais atores foram indicados mais de 3 vezes, mas nunca ganharam?**

```sql
select
    nome_indicado,
    COUNT(*) as indicacoes
from indicados_ao_oscar
where categoria in (
    'ACTOR',
    'ACTRESS',
    'ACTOR IN A LEADING ROLE',
    'ACTRESS IN A LEADING ROLE',
    'ACTOR IN A SUPPORTING ROLE',
    'ACTRESS IN A SUPPORTING ROLE'
)
GROUP BY nome_indicado
HAVING COUNT(*) > 3
   AND SUM(vencedor) = 0;
```

**Resultado:**

```text
Irene Dunne	5
Charles Boyer	4
Barbara Stanwyck	4
Mickey Rooney	4
Claude Rains	4
Rosalind Russell	4
Agnes Moorehead	4
Montgomery Clift	4
Arthur Kennedy	5
Deborah Kerr	6
Thelma Ritter	6
Richard Burton	7
Peter O'Toole	8
Albert Finney	5
Warren Beatty	4
Jane Alexander	4
Marsha Mason	4
Glenn Close	8
Willem Dafoe	4
Annette Bening	5
Ed Harris	4
Edward Norton	4
Amy Adams	6
Michelle Williams	5
Saoirse Ronan	4
Mark Ruffalo	4
Bradley Cooper	5
```

**5.4 — Encontre todos os artistas que foram indicados em categorias diferentes (ex: ator e diretor).**

```sql
select nome_indicado, count(distinct categoria) as categorias from indicados_ao_oscar group by nome_indicado having categorias > 1 order by categorias desc;
```

**5.5 — Quantos indicados têm exatamente 1 indicação na história?**

```sql
select count(*) from (select nome_indicado from indicados_ao_oscar group by nome_indicado having count(*) = 1) as t;
```

**Resultado:** 5620.

**5.6 — Qual o maior números de indicados em um único ano? Essa é uma pergunta franca.**

```sql
select ano_cerimonia, count(*) as indicacoes from indicados_ao_oscar group by ano_cerimonia order by indicacoes desc limit 1;
```

**Resultado:** 1943 — 186.

---

## Nível 6: Análise de Filmes

### Toy Story

**6.1 — A série de filmes Toy Story ganhou Oscars em quais anos?**

```sql
use oscar_database;
select ano_cerimonia from indicados_ao_oscar where nome_filme like 'Toy Story%' and vencedor = 1 group by ano_cerimonia order by ano_cerimonia;
```

**6.2 — Quantas indicações a franquia Toy Story recebeu no total?**

```sql
select count(*) from indicados_ao_oscar where nome_filme like 'Toy Story%';
```

**Resposta:** 11.

**6.3 — Em quais categorias os filmes Toy Story foram indicados?**

```sql
select distinct categoria from indicados_ao_oscar where nome_filme like 'Toy Story%';
```

### Crash

**6.4 — Em qual edição do Oscar o filme "Crash" concorreu?**

```sql
select distinct edicao_cerimonia from indicados_ao_oscar where nome_filme = 'Crash';
```

**Resultado:** 78.

**6.5 — Quantas indicações o filme "Crash" recebeu?**

```sql
select count(*) from indicados_ao_oscar where nome_filme = 'Crash';
```

**Resposta:** 6.

**6.6 — "Crash" ganhou o Oscar de Melhor Filme?**

```sql
select nome_filme, ano_cerimonia, categoria from indicados_ao_oscar where nome_filme = 'Crash' and vencedor = 1;
```

**Resultado:**

```text
Crash	2006	FILM EDITING
Crash	2006	BEST PICTURE
Crash	2006	WRITING (Original Screenplay)
```

### Central do Brasil

**6.7 — O filme "Central do Brasil" aparece no banco de dados?**

```sql
select nome_filme, ano_cerimonia from indicados_ao_oscar where nome_filme like '%Central do Brasil%';
```

**Resposta:** não.

**6.8 — Se sim, quantas indicações "Central do Brasil" recebeu?**

---