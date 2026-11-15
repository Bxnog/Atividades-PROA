# Momento

Bem-vindo à base de dados da empresa **Momento**!

A Momento é uma empresa inovadora do setor de tecnologia e vendas de produtos temáticos de super-heróis e cultura pop. Fundada em 1980, a empresa começou como uma pequena loja em Gotham City e hoje possui escritórios em diversos países, com departamentos especializados em Vendas, Tecnologia, Recursos Humanos, Marketing, Financeiro e Dados.

Nestes exercícios, você vai explorar o banco de dados da empresa e responder perguntas que revelam insights importantes sobre o negócio. Prepare-se para usar queries básicas, agregações complexas e operações avançadas!

---

## Nível 1: Conhecendo a Empresa

### Seu Primeiro Dia na Momento

**1.1** Você acabou de ser contratado pela Momento! Vamos começar incluindo você no sistema.

```sql
INSERT INTO funcionarios(primeiro_nome,sobrenome,email,senha,telefone,data_contratacao,cargo_id,salario,gerente_id,departamento_id) 
VALUES ('Brenoeu','Estevo','breno@momento.org','b6r7e6n7n6o7','123.3643.4569','2026-10-28',20,8000.01,101,10);
```

**1.2** Agora que você faz parte da equipe, quantos funcionários temos ao total na empresa?

```sql
select count(funcionario_id) as funcionarios from funcionarios;
```

**Resultado:** 43

**1.3** Quantos funcionários trabalham especificamente no Departamento de Tecnologia?

```sql
select count(funcionarios.funcionario_id) as funcionarios from funcionarios 
join departamentos on funcionarios.departamento_id=departamentos.departamento_id where departamentos.departamento_nome = 'Tecnologia';
```

**1.4** Liste todos os departamentos que existem na empresa. Quantos são?

```sql
select departamento_nome, (select count(*) from departamentos ) as total_departamentos from departamentos;
```

**1.5** Quantos escritórios a Momento possui? Em quais países?

```sql
select escritorios.escritorio_id, paises.pais_nome, count(*) over() as total_escritorios from escritorios join paises on escritorios.pais_id=paises.pais_id;
```

---

## Nível 2: Análise Financeira Básica

O CFO precisa de relatórios urgentes sobre os custos da empresa.

**2.1** Quantos funcionários trabalham no Departamento de Vendas?

```sql
select count(*) from funcionarios 
join departamentos on funcionarios.departamento_id=departamentos.departamento_id where departamentos.departamento_nome = 'Vendas';
```

**Resultado:** 5

**2.2** Qual é o custo total com salários do Departamento de Vendas?

```sql
select sum(salario) as salario_vendas from funcionarios 
join departamentos on funcionarios.departamento_id=departamentos.departamento_id where departamentos.departamento_nome = 'Vendas';
```

**2.3** Qual é a média salarial da empresa, excluindo os cargos de CEO, CMO e CFO?

```sql
select avg(funcionarios.salario) as media_salario from funcionarios 
join cargos on funcionarios.cargo_id=cargos.cargo_id where cargo_nome not in ('CEO', 'CMO', 'CFO');
```

**2.4** Qual é a média salarial do Departamento de Tecnologia?

```sql
select avg(funcionarios.salario) as media_salario from funcionarios 
join departamentos on funcionarios.departamento_id=departamentos.departamento_id where departamento_nome = 'Tecnologia';
```

**2.5** Qual departamento possui a maior média salarial?

```sql
select departamentos.departamento_nome, avg(funcionarios.salario) as media_salario from funcionarios 
join departamentos on funcionarios.departamento_id=departamentos.departamento_id group by departamentos.departamento_nome order by media_salario desc limit 1;
```

**2.6** Qual departamento possui o menor número de funcionários?

```sql
select d.departamento_nome, count(f.funcionario_id) as funcionarios from funcionarios f 
join departamentos d on f.departamento_id=d.departamento_id 
group by departamento_nome having count(f.funcionario_id) = 
(select min(cabecac) from (
select count(f2.funcionario_id) as cabecac from funcionarios f2 group by f2.departamento_id) as cabecas);
```

---

## Nível 3: Recursos Humanos

O RH está fazendo uma análise demográfica da empresa.

**3.1** Quantos funcionários da empresa Momento possuem cônjuges?

```sql
select count(distinct funcionario_id) from dependentes where relacionamento = 'Cônjuge';
```

**3.2** Quantos funcionários possuem filhos registrados?

```sql
select count(distinct funcionario_id) from dependentes where relacionamento like 'Filh%';
```

**3.3** Qual funcionário foi contratado há mais tempo na empresa?

```sql
select funcionario_id, concat(primeiro_nome, ' ', sobrenome) as nome, data_contratacao from funcionarios having data_contratacao = (
select min(data_c) from (
select data_contratacao as data_c from funcionarios) as datas);
```

**3.4** Qual funcionário foi contratado há menos tempo na empresa?

```sql
select funcionario_id, concat(primeiro_nome, ' ', sobrenome) as nome, data_contratacao from funcionarios having data_contratacao = (
select max(data_c) from (
select data_contratacao as data_c from funcionarios) as datas);
```

**3.5** Liste os 5 funcionários com mais tempo de casa, ordenados pela data de contratação.

```sql
select funcionario_id, concat(primeiro_nome, ' ', sobrenome) as nome, data_contratacao from funcionarios order by data_contratacao limit 5;
```

**3.6** Quantos funcionários foram contratados na década de 1990 (entre 1990-1999)?

Minha lógica inicial, com pesquisa de sintaxe:

```sql
select count(funcionario_id) from funcionarios where cast(SUBSTRING(data_contratacao, 1, 4) as signed) between 1990 and 1999;
```

Outra solução:

```sql
select count(funcionario_id) from funcionarios where extract(year from data_contratacao) between 1990 and 1999;
```

**3.7** Como a média salarial da Momento evoluiu ao longo dos anos? Agrupe por ano de contratação e calcule a média salarial.

```sql
select distinct data_contratacao, avg(salario) from funcionarios group by data_contratacao order by data_contratacao asc;
```

---

## Nível 4: Operações e Escritórios

**4.1** Qual é o custo total de suprimentos em cada escritório? Ordene do mais caro ao mais barato.

```sql
select e.escritorio_nome, sum(s.custo) as custo_total
from escritorios e join suprimentos s on e.escritorio_id=s.escritorio_id 
group by e.escritorio_nome order by custo_total desc;
```

**4.2** Qual escritório possui a maior quantidade de diferentes tipos de suprimentos?

```sql
select e.escritorio_nome, count(distinct s.suprimento_nome) as suprimentos
from escritorios e join suprimentos s on e.escritorio_id=s.escritorio_id
group by e.escritorio_nome
having count(distinct s.suprimento_nome) = (
select max(mentos) from
(
select count(distinct s2.suprimento_nome) as mentos
from suprimentos s2
group by s2.escritorio_id) as m);
```

**4.3** Qual é o suprimento mais caro (considerando preço unitário) em toda a empresa?

```sql
select distinct suprimento_nome, custo / quantidade_comprada as preco_unitario from suprimentos order by preco_unitario desc limit 1;
```

**4.4** Calcule o valor total do inventário de suprimentos da empresa (quantidade × preço unitário de todos os itens em todos os escritórios).

```sql
select sum(s.custo) as custo_total from suprimentos s;
```

---

## Nível 5: Produtos e Vendas

**5.1** Quais produtos foram vendidos pela Momento? Liste todos os produtos únicos.

```sql
select distinct p.produto_nome from produtos p join vendas v on p.produto_id=v.produto_id;
```

**5.2** Qual é o produto mais vendido (maior quantidade total)?

```sql
select p.produto_nome, sum(v.quantidade_vendida) quantidade_vendida
from produtos p join vendas v on p.produto_id=v.produto_id
group by v.produto_id order by quantidade_vendida desc;
```

**5.3** Qual é o produto menos vendido?

```sql
select p.produto_nome, sum(v.quantidade_vendida) quantidade_vendida
from produtos p join vendas v on p.produto_id=v.produto_id
group by v.produto_id order by quantidade_vendida asc limit 1;
```

**5.4** Pensando na relação quantidade × valor unitário, qual produto gerou mais receita para a empresa?

```sql
select p.produto_nome, sum(p.produto_price * v.quantidade_vendida) as receita_produto
from produtos p join vendas v on p.produto_id=v.produto_id
group by p.produto_nome
order by receita_produto desc;
```

**5.5** Qual é o produto mais caro (maior preço unitário) no catálogo?

```sql
select produto_nome, produto_price from produtos
 where produto_price = (
 select max(produto_price) from produtos);  
```

**5.6** Qual foi o faturamento total da empresa em vendas?

```sql
select sum(p.produto_price * v.quantidade_vendida) as receita_de_vendas
from produtos p join vendas v on p.produto_id=v.produto_id;
```

**5.7** Quantas vendas foram realizadas no mês de junho de 2023?

```sql
select count(venda_id) as quantidade_vendas from vendas
where year(venda_data) = 2023 and month(venda_data) = 6;
```

**5.8** Qual vendedor realizou mais vendas (em quantidade de transações)?

```sql
select concat(f.primeiro_nome, ' ', f.sobrenome) as nome_funcionario, count(*) as quantidade_transacao
from vendas v join funcionarios f
on v.funcionario_id=f.funcionario_id
group by v.funcionario_id
having quantidade_transacao = (
select max(vendas) from 
(select count(*) as vendas from vendas group by funcionario_id) as vv);
```

**5.9** Qual vendedor gerou mais receita para a empresa?

```sql
select concat(f.primeiro_nome, ' ', f.sobrenome) as funcionario_nome, sum(p.produto_price * v.quantidade_vendida) as r_vendas_funcionario
from vendas v join produtos p
on v.produto_id=p.produto_id
join funcionarios f
on v.funcionario_id=f.funcionario_id
group by v.funcionario_id
order by r_vendas_funcionario desc limit 1; 
```

---

## Nível 6: Operações de Atualização

A empresa está crescendo e mudanças precisam acontecer!

**6.1** Um novo departamento foi criado: **Inovações**. Ele será alocado no escritório "Wayne Offices". Adicione-o ao banco de dados.

```sql
insert into departamentos(departamento_nome, escritorio_id)
values('Inovações', (select escritorio_id from escritorios where escritorio_nome = 'Wayne Offices'));
delete from departamentos where departamento_id = 1401;
```

**6.2** O departamento de Inovações está sem funcionários. Transfira 2 funcionários do departamento de Tecnologia para Inovações.

```sql
select f.funcionario_id, concat(f.primeiro_nome, ' ', f.sobrenome) as nome, c.cargo_nome 
from funcionarios f join departamentos d 
on f.departamento_id=d.departamento_id 
join cargos c
on f.cargo_id=c.cargo_id
where departamento_nome = 'Tecnologia';
update funcionarios set departamento_id = 14 where funcionario_id in (104, 107);
```

**6.3** A empresa decidiu dar um aumento de 10% para todos os funcionários do departamento de Tecnologia. Atualize os salários.

```sql
update funcionarios set salario = salario * 1.10 where departamento_id = (select departamento_id from departamentos where departamento_nome = 'Tecnologia');
```

**6.4** O funcionário "Bruce Ernst" foi promovido a "Senior Web Developer" e recebeu um aumento para $5.000. Atualize suas informações.

```sql
insert into cargos(cargo_id, cargo_nome, min_salario, max_salario)
values(22, 'Senior Web Developer', 5000.00, 10000.00);
update funcionarios
set cargo_id = (
select cargo_id from cargos where cargo_nome = 'Senior Web Developer'),
salario = 5000
where funcionario_id = 104;
```

**6.5** Adicione um novo suprimento ao escritório "Wayne Offices": 15 unidades de "Headsets" com preço unitário de $150 cada.

```sql
insert into suprimentos(suprimento_id, suprimento_nome, quantidade_comprada, custo, escritorio_id)
values(49, 'Headsets', 15, 15 * 150.00, (select escritorio_id from escritorios where escritorio_nome = 'Wayne Offices'));
```

**6.6** Todos os funcionários contratados antes de 1990 estão aposentando. Remova-os do banco de dados (CUIDADO: execute um **SELECT** antes para ver quantos serão afetados!).

```sql
select funcionario_id, primeiro_nome, data_contratacao from funcionarios where year(data_contratacao) < 1990;
delete from funcionarios where year(data_contratacao) < 1990;
```

---

## Nível 7: Análise Avançada com Agregações

**7.1** Crie um relatório mostrando cada departamento com: nome do departamento, número de funcionários, salário total e média salarial.

```sql
select d.departamento_nome, count(f.funcionario_id) as funcionarios, sum(f.salario) as salario_total, avg(f.salario) as media_salarial
from departamentos d join funcionarios f
on f.departamento_id=d.departamento_id
group by f.departamento_id; 
```

**7.2** Liste os 3 cargos mais comuns na empresa e quantos funcionários ocupam cada cargo.

```sql
select c.cargo_nome, count(f.funcionario_id) as funcionarios_cargos
from funcionarios f join cargos c
on f.cargo_id=c.cargo_id
group by f.cargo_id
order by funcionarios_cargos desc limit 3;
```

**7.3** Encontre todos os funcionários que ganham acima da média salarial de seus respectivos departamentos.

```sql
select concat(f.primeiro_nome, ' ', f.sobrenome) as nome, d.departamento_nome, f.salario
from funcionarios f join departamentos d
on f.departamento_id=d.departamento_id
where f.salario > (
select avg(salario) from funcionarios where departamento_id = f.departamento_id);  
```

**7.4** Calcule a taxa de crescimento da empresa por ano (quantos funcionários foram contratados a cada ano).

```sql
select distinct year(data_contratacao) as ano, count(funcionario_id) from funcionarios
group by ano order by ano asc;
```

**7.5** Crie um ranking dos vendedores, mostrando: nome do vendedor, número de vendas realizadas e receita total gerada.

```sql
select concat(f.primeiro_nome, ' ', f.sobrenome) as nome, count(v.venda_id) as vendas_realizadas,
sum(v.quantidade_vendida * p.produto_price) as receita_total
from funcionarios f join vendas v
on f.funcionario_id=v.funcionario_id
join produtos p
on v.produto_id=p.produto_id
group by v.funcionario_id
order by receita_total desc;
```

**7.6** Encontre os produtos que foram vendidos por apenas um vendedor.

```sql
select p.produto_nome 
from vendas v join produtos p
on p.produto_id=v.produto_id
group by v.produto_id
having count(distinct funcionario_id) = 1;
```

---

## Nível 8: Desafios e Otimização

**8.1** **Desafio de Performance:** Encontre todos os funcionários do departamento de Vendas que possuem dependentes (cônjuge OU filhos). Quantas formas diferentes você consegue resolver isso?

Primeira solução:

```sql
select concat(f.primeiro_nome, ' ', f.sobrenome) as nome
from funcionarios f
where f.funcionario_id in (select funcionario_id from dependentes)
and f.departamento_id = (select departamento_id from departamentos where departamento_nome = 'Vendas');
```

Segunda solução:

```sql
select concat(f.primeiro_nome, ' ', f.sobrenome) as nome
from funcionarios f join dependentes d
on f.funcionario_id=d.funcionario_id
where relacionamento in (select distinct relacionamento from dependentes)
and f.departamento_id = (select departamento_id from departamentos where departamento_nome = 'Vendas');
```

**8.2** **Desafio de Lógica:** Encontre funcionários que trabalham em escritórios diferentes do escritório associado ao seu departamento (se houver alguma inconsistência).

Não tem como descobrir o escritório dos funcionários, somente dos departamentos.

**8.3** **Consulta Complexa:** Crie um relatório completo de um escritório mostrando:

- Nome do escritório
- País
- Número de departamentos naquele escritório
- Número total de funcionários
- Custo total com salários
- Custo total com suprimentos

```sql
Select e.escritorio_nome,
p.pais_nome,
count(d.departamento_id) departamentos, (Select count(funcionario_id) from funcionarios where departamento_id in (Select departamento_id from departamentos Where escritorio_id = e.escritorio_id )) as funcionarios,
(Select sum(salario) from funcionarios where departamento_id in (Select departamento_id from departamentos Where escritorio_id = e.escritorio_id )) as custo_salario, 
(Select sum(custo) from suprimentos where escritorio_id = e.escritorio_id) as custo_suprimentos From escritorios e join departamentos d On e.escritorio_id=d.escritorio_id
Join paises p on
p.pais_id=e.pais_id
Group by e.escritorio_id;
```

**8.4** **Desafio de Agregação:** Encontre o "departamento mais equilibrado" - aquele com a menor diferença entre o maior e menor salário.

```sql
With dep_salario as ( Select d.departamento_nome,
max(salario) as maior_salario, Min(salario) as menor_salario, max(salario) - min(salario) as diferenca_salario From funcionarios f join departamentos d On f.departamento_id=d.departamento_id Group by f.departamento_id)
Select ds.departamento_nome
from dep_salario ds
Order by ds.diferenca_salario asc limit 1;
```

**8.5** **Text Search:** Encontre todos os produtos que contêm a palavra "Uniforme" no nome.

```sql
Select produto_id, produto_nome from produtos where produto_nome like '%Uniforme%';
```

**8.6** **Date Range:** Encontre todas as vendas que ocorreram no segundo trimestre de 2023 (abril-junho).

```sql
Select venda_id, venda_data, funcionario_id from vendas where venda_data >= '2023-04-01'
AND venda_data < '2023-07-01';
```

---

## Nível 9: Desafios Ninja

**9.1** **Múltiplas Soluções:** Encontre todos os funcionários cujo salário está entre $6.000 e $10.000. Resolva de 3 formas diferentes.

Primeira solução:

```sql
select primeiro_nome, funcionario_id from funcionarios where salario between 6000 and 10000;
```

Segunda solução:

```sql
select primeiro_nome, funcionario_id from funcionarios where salario >= 6000 and salario <= 10000;
```

Terceira solução:

```sql
select primeiro_nome, salario from funcionarios where funcionario_id in(select
case
when salario >=6000 and salario <=10000 then funcionario_id
end as funcionarios610
from funcionarios);
```

**9.2** **Data Quality:** Encontre todos os funcionários que NÃO possuem email ou telefone cadastrado.

```sql
select funcionario_id from funcionarios where email is null;
```

**9.2** **Desafio de Lógica Avançada:** Crie uma query que encontre "funcionários solitários" - aqueles que são os únicos em seu cargo dentro de seu departamento.

```sql
select funcionario_id from funcionarios where funcionario_id in (
select max(funcionario_id) from funcionarios group by departamento_id, cargo_id having count(*) = 1);
```

**9.2** **Pipeline Complexo:** Crie um relatório que mostre, para cada país:

- Nome do país
- Número de escritórios
- Número de departamentos
- Número de funcionários
- Receita total (soma dos salários + custo de suprimentos)

```sql
select p.pais_nome, 
(select count(*) from escritorios where pais_id = p.pais_id) as escritorios,
(select count(distinct departamento_id) from departamentos where escritorio_id in (
select escritorio_id from escritorios where pais_id = p.pais_id)) as departamentos,
(select count(*) from funcionarios where departamento_id in (
select departamento_id from departamentos where escritorio_id in(
select escritorio_id from escritorios where pais_id = p.pais_id))) as funcionarios,
(COALESCE((select sum(salario) from funcionarios where departamento_id in (
select departamento_id from departamentos where escritorio_id in(
select escritorio_id from escritorios where pais_id = p.pais_id))), 0)) +
COALESCE((select sum(custo) from suprimentos where escritorio_id in (select escritorio_id from escritorios where pais_id = p.pais_id)), 0) as receita
from paises p;
```

Melhoria futura com CTE:

| CTE | O que calcula |
|---|---|
| escritorios_pais | Quantidade de escritórios por país |
| departamentos_pais | Quantidade de departamentos por país |
| funcionarios_pais | Quantidade de funcionários e soma dos salários |
| suprimentos_pais | Soma dos custos de suprimentos por país |

---

## Nível 10: Casos Práticos e Simulações

### Cenário 1: Expansão Internacional

A Momento quer abrir um novo escritório no Brasil.

**10.1** Crie o novo escritório "Momento Brasil" em São Paulo com suprimentos iniciais de sua escolha.

```sql
INSERT INTO escritorios(escritorio_id,escritorio_nome,endereco,cep,cidade,estado_provincia,pais_id)
VALUES (4000,'Momento Brasil', '54 R. Tito - Vila Romana','05051-000','São Paulo','São Paulo','BR');
```

**10.2** Crie um novo departamento "Operações LATAM" vinculado a este escritório.

```sql
INSERT INTO departamentos(departamento_id,departamento_nome,escritorio_id) 
VALUES (15,'Operações LATAM',4000);
```

**10.3** Contrate 5 novos funcionários para este departamento (você e 4 colegas de turma).

```sql
update funcionarios set departamento_id = 15 where funcionario_id = 209;
INSERT INTO funcionarios(funcionario_id,primeiro_nome,sobrenome,email,senha,telefone,data_contratacao,cargo_id,salario,gerente_id,departamento_id) 
VALUES (6951,'Doug','Farol','doug.farol@farol.org','farol1234#','523.133.5568','2004-09-21',5,17000.00,209,15);
INSERT INTO funcionarios(funcionario_id,primeiro_nome,sobrenome,email,senha,telefone,data_contratacao,cargo_id,salario,gerente_id,departamento_id) 
VALUES (6952,'Ruan','Farol','ruan.farol@farol.org','farol1234#','524.133.5569','2004-09-20',9,15000.00,209,15);
INSERT INTO funcionarios(funcionario_id,primeiro_nome,sobrenome,email,senha,telefone,data_contratacao,cargo_id,salario,gerente_id,departamento_id) 
VALUES (6953,'Luiz','Farol','luiz.farol@farol.org','farol1234#','525.133.5569','2007-09-20',9,14000.00,209,15);
INSERT INTO funcionarios(funcionario_id,primeiro_nome,sobrenome,email,senha,telefone,data_contratacao,cargo_id,salario,gerente_id,departamento_id) 
VALUES (6954,'Alejandro','Farol','ale.farol@farol.org','farol1234#','526.133.5570','2007-09-20',9,14100.00,209,15);
```

### Cenário 2: Crise Financeira

A empresa precisa reduzir custos!

**10.4** Identifique os 3 escritórios com maiores custos de suprimentos.

```sql
select e.escritorio_nome, sum(s.custo) as custo_total
from escritorios e join suprimentos s
on e.escritorio_id=s.escritorio_id
group by e.escritorio_id, e.escritorio_nome
order by custo_total desc
limit 3;
```

**10.5** Sugira onde cortar custos: liste suprimentos com quantidade acima de 50 unidades.

```sql
select *
from suprimentos
where quantidade_comprada > 50;
```

**10.6** Calcule quanto a empresa economizaria se reduzisse 20% dos salários acima de $15.000 (apenas calcule, não execute).

```sql
with reducao as (
select sum(salario * 0.20) as total_r from funcionarios where salario > 15000)
select sum(salario)as atualmente, max(r.total_r) as economia, sum(salario) - max(r.total_r) as diferenca
from funcionarios cross join reducao r;
```

### Cenário 3: Auditoria de Vendas

O departamento financeiro suspeita de irregularidades.

**10.7** Encontre vendas que não possuem vendedor associado.

```sql
select * from vendas where funcionario_id is null;
```

**10.8** Verifique se há vendedores registrados nas vendas que não existem na coleção de funcionários.

```sql
select v.*
from vendas v
left join funcionarios f on v.funcionario_id = f.funcionario_id
where v.funcionario_id is not null
and f.funcionario_id is null;
```

**10.9** Identifique produtos que aparecem nas vendas mas com preços unitários muito diferentes entre transações (variação > 10%).

Não é possível realizar essa consulta com o esquema atual, pois a tabela `vendas` não possui o preço unitário das transações.

### Cenário 4: Relatório Executivo

O CEO pediu um dashboard completo.

**10.10** Crie UMA ÚNICA query de agregação que retorne:

- Total de funcionários
- Custo total com salários
- Número de departamentos
- Número de escritórios
- Receita total de vendas
- Produto mais vendido

```sql
with t_funcionarios as(
select count(*) as funcionarios 
from funcionarios),
custo_salario as(
select sum(salario) as c_salario from funcionarios),
total_escritorio as (
select count(escritorio_id) as t_escritorio from escritorios),
receita_vendas as (
select sum(p.produto_price * v.quantidade_vendida) as receita
from produtos p join vendas v
on p.produto_id=v.produto_id),
produto_mais as (
select produto_id, sum(quantidade_vendida)
as quantidade_p from vendas 
group by produto_id order by quantidade_p desc limit 1
)
select tf.funcionarios, cs.c_salario, te.t_escritorio, rv.receita, (select produto_nome from produtos where produto_id = pm.produto_id) as produto
from t_funcionarios tf cross join custo_salario cs cross join total_escritorio te cross join receita_vendas rv cross join produto_mais pm;
```

---

## Dicas Gerais

- Sempre verifique os dados antes de executar operações de atualização ou remoção.
- Utilize índices para otimizar consultas frequentes.
- Documente suas queries para facilitar a revisão futura.
- Divida consultas complexas em etapas menores para facilitar o entendimento.
- Pratique a criação de backups antes de fazer alterações significativas no banco de dados.
- Explore a documentação oficial do MongoDB para aprofundar seu conhecimento sobre operadores e agregações.

---