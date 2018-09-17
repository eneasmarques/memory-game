# Jogo da Memória

## Índice
* [Instalar](#instalar)
* [Instruções](#instruções)
* [Regras](#regras)
* [Contribuindo](#contribuindo)

## Instalar

[GitHub.com](https://github.com/kubr2017/memory-game) - (branch master)
[GitHub.io](https://eneasmarques.github.io/memorygame/)

## Instruções

### Arquivos e pastas

O código consiste em 2 pastas:
* **css** - para o arquivo `app.css`.
* **js** - para o arquivo `app.js`.

### Código de trabalho

Ao carregar o html a função `shuffle()` (embaralhar as cartas) é inicada. Quando o jogador clica sobre alguma carta utiliza uma tecla válida (ASDF - 1234) o jogo é iniciado.

A função`shuffle(array)` recebe um array com as cartas e os dispõe em um nova ordem.

Ao clicar em uma carta ou ao teclar A, S, D, F, 1, 2 ou 3 é chamada a função `main()` que inicia chama a função `startTime()` e faz a verificação das cartas por meio da função `compare()`;

Para virar as cartas selecionadas são utilizadas as classes **css** `"show"` e `"open"`.

Quando utilizado o teclado a **linha** ou **coluna** selecionada ficará em destaque devido a classe `"select"`.

Selecionando uma **coluna** e uma **linha** a carta será virada.

Quando duas cartas são selecionadas é chamado a função `compare()` que verificará se as cartas são iguais;

Cartas iguais recebem a classe **css** `"match"`.

Cartas diferentes recebem a classe **css** `"close"`.

Ao clicar em reset será chamada a função `resetGame()` que irá redefinir o status do jogo.

## Regras

  Apenas duas cartas podem ser viradas por vez.

  A quantidade de movimentos definirá o seu desempenho.

- :star: :star: :star: - até 20 Movimentos
- :star: :star: - até 30 Movimentos
- :star: - Até de 35 movimentos
- Sem estrelas - Acima de 35 movimentos

Para reiniciar o jogo, clique no botão reiniciar :repeat:.

## Contribuindo

Depois de aprovado pela **Udacity** qualquer contribuiçaõ será bem vinda.