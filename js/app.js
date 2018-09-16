const deck = document.querySelector('.deck');
let cards = document.querySelectorAll('.card');
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
const stars = document.querySelectorAll('.stars > li');
const timer = document.querySelector('.timer');
let countStar = 3;

var modal = document.querySelector('#modal');
var modalContent = document.querySelector('.modal-content');
var closeButton = document.querySelector('#close-button');
var textCongratulation = document.querySelector('#text-congratulation');

let firstCard, secondCard;
let openedCard = false;
let blockedClick = false;
let countMoves = 0;
let time;
let start = false;

//variáveis para uso do teclado
let numKey, alphaKey, alphanumKey;
let arrayAlpha = [];
let arrayNum = [];

// Inicia a contagem do tempo
function startTime() {
    let minutes = 0;
    let seconds = 0;
    time = setInterval(function () {
        seconds = parseInt(seconds, 10) + 1;
        minutes = parseInt(minutes, 10);

        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        timer.textContent = minutes + ':' + seconds;
    }, 1000);
}

//Para a contagem de tempo
function stopTime() {
    clearInterval(time);
}

/*
*Zera o tempo e altera o valor de start
*para que possa ser iniciada uma nova contagem
*/
function resetTime() {
	seconds = '00';
    minutes = '00';

	timer.textContent = minutes + ':' + seconds;

	start = false;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
        deck.appendChild(cards[randomIndex]);
    }

    //atualiza cards
    cards = document.querySelectorAll('.card');
}

//embaralha cartas e atriui novo valor a variável
shuffle(cards);

function main(card) {
	//inicia contador caso não esteja em funcionamento
	if (!start) {
		startTime();
		start = true;
	};

	//evita que a primeira carta seja selecionada duas vezes
	if (firstCard === card) return;
	console.log(`aqui ${firstCard} ${card}` );

	//bloquear caso duas cartas viradas;
	if (blockedClick) return;

	//verifica se está clicando em uma carta
	if (card.classList[0] !== 'card') return;

	//caso carta já virada não irá verificar novamente
	if (card.classList.contains('match','open')) return;

	show(card);

	//verifica se existe uma carta já virada
	if (!openedCard) {
		openedCard = true;
		firstCard = card;

		return;
	}

	blockedClick = true;
	secondCard = card;
	openedCard = false;

	compare();
}

deck.addEventListener('click', function (event) {
	main(event.target);
});

//verifica se é uma tecla válida
document.addEventListener('keyup', function (event) {

	numKey = '';
	alphaKey = '';

	switch (event.key.toUpperCase()) {
		case 'A':
			alphaKey = parseInt(1, 10);
			break;
		case 'S':
			alphaKey = parseInt(2, 10);
			break;
		case 'D':
			alphaKey = parseInt(3, 10);
			break;
		case 'F':
			alphaKey = parseInt(4, 10);
			break;
		case 'R':
			restartGame();
	}

	if (parseInt(event.key, 10) >= 0 && parseInt(event.key, 10) <=4) {
		numKey = parseInt(event.key, 10);
	}

	if (alphaKey !== '' || numKey !== '') selectCard();

});

/*
*analisa se uma carta foi selecionada
*envia a carta para main()
*/
function selectCard () {
	let index;

	if (alphaKey !== '') {
		highLighCards(arrayAlpha);
		arrayAlpha = [];
		for (i = 0; i < 4; i++) {
			index = (4 * (i)) + alphaKey - 1;
			arrayAlpha.push(index);
			cards[index].classList.add('select');
		}
	} else if (numKey !== '') {
		highLighCards(arrayNum);
		arrayNum = [];
		for (i = 0; i < 4; i++) {
			index = (4 * (numKey - 1)) + i;
			arrayNum.push(index);
			cards[index].classList.add('select');
		}
	}

	if (arrayAlpha.length > 0 && arrayNum.length > 0) {

		index = arrayAlpha.filter(x => arrayNum.includes(x));

		cards[index].classList.remove('select');

		main(cards[index]);

		setTimeout(() => {

			highLighCards(arrayAlpha);
			highLighCards(arrayNum);

			arrayNum = [];
			arrayAlpha = [];

		},500);
	}
}

//altera a cor das cartas da coluna ou linha informada pelo teclado
function highLighCards (arrayCards) {
	arrayCards.forEach(index => {
		cards[index].classList.toggle('select');
	});
}

//reinicia o jogo
restart.addEventListener('click', function(event) {
	restartGame();
});

//fecha o modal e inicia um novo jogo
closeButton.addEventListener('click', function() {
	showCongratulation();
	restartGame();
});

//vira a carta selecionada
function show (card) {
	card.classList.add('open','show');
	incMoves();
}

//zera as informações do painel de pontos e desvira todas as cartas
function restartGame() {
	clearInterval(time);
	resetTime();
	close(true);
	countStar = 3;
}

//para o tempo do jogo
function endGame() {
	clearInterval(time);
	showCongratulation();
}

//abre o modal para mostrar o resultado do jogo
function showCongratulation() {
	textCongratulation.textContent = `With ${countMoves} moves and ${countStar} star in ${timer.textContent}.`;
	modal.classList.toggle('modal-show');
	modalContent.classList.toggle('modal-show');
}

//incrementa os movimentos
function incMoves () {
	countMoves = ++moves.textContent;
	level(countMoves);
};

//verifica se as cartas são iguais
function compare () {
	(firstCard.firstElementChild.classList[1]
		=== secondCard.firstElementChild.classList[1]) ? match() : close();
}

//atribui a classe match as cartas caso iguais
function match () {
	setTimeout(() => {

		firstCard.classList.remove('show');
		secondCard.classList.remove('show');

		firstCard.classList.add('match');
		secondCard.classList.add('match');

		blockedClick = false;

		progress();

	},800);
}

//verifica se o jogo acabou
function progress() {
	const matchCards = document.querySelectorAll('.match');

	if (matchCards.length === cards.length)
		endGame();
}

//desvira as cartas
//caso restart = true será desviradas todas as cartas
function close (restart) {
	setTimeout(() => {

		if (restart) {
			cards.forEach(card => {
				if (card.classList.contains('open')) {
					card.classList.add('close');
				}
			});
		} else {
			firstCard.classList.add('close');
			secondCard.classList.add('close');
		}

		clear(restart);

	},600);
}

//retira todas as classes das cartas com exceção da.card
function clear (restart) {
	setTimeout(() => {

		if (restart) {
			cards.forEach(card => {
				card.classList.remove('show','open','close','match','select');
			});

			stars.forEach(star => {
				star.classList.add('level');
			});

			moves.textContent = 0;
			openedCard = false;

			shuffle(cards);
		} else {
			firstCard.classList.remove('show','open','close');
			secondCard.classList.remove('show','open','close');
		}

		blockedClick = false;

		firstCard = '';
		secondCard = '';

	},600);
}

//remove estrelas baseado na quantidade de movimentos
function level() {
	switch (countMoves) {
		case 20:
			stars[2].classList.remove('level');
			countStar = 2;
			break;
		case 31:
			stars[1].classList.remove('level');
			countStar = 1;
			break;
		case 36:
			stars[0].classList.remove('level');
			countStar = 0;
			break;
	}
}