/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
const stars = document.querySelectorAll('.stars > li');
const timer = document.querySelector('.timer');

let firstCard, secondCard;
let openedCard = false;
let blockedClick = false;
let countMoves = 0;
let time;
let start = false;

function incMoves () {
		
	countMoves = moves.textContent++;

	level(countMoves);
	
};

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

    return array;
}

shuffle(cards);

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

function stopTime() {
    clearInterval(time);
}

function resetTime() {
	seconds = '00';
    minutes = '00';

	timer.textContent = minutes + ':' + seconds;
}

restart.addEventListener('click', function(event) {
	clearInterval(time);
	resetTime();
	close(true);	
});

deck.addEventListener('click', function (event) {

	//inicia contador
	if (!start) {
		startTime();
		start = true;
	};

	//evita que seja selecionada a mesma carta duas vezes
	if (firstCard === event.target) return;

	//bloquear caso duas cartas viradas;
	if (blockedClick) return;

	//verifica se está clicando em uma carta
	if (event.target.classList[0] !== 'card') return;

	//caso carta já virada não irá verificar novamente
	if (event.target.classList.contains('match','open')) return;	

	show(event);

	if (!openedCard) {
		openedCard = true;
		firstCard = event.target;

		return;
	}
	
	blockedClick = true;
	secondCard = event.target;
	openedCard = false;

	compare();

});	


function show (event) {	

	event.target.classList.add('open','show');		
	incMoves();
}

function compare () {

	(firstCard.firstElementChild.classList[1]
		=== secondCard.firstElementChild.classList[1]) ? match() : close();

}

function match () {

	setTimeout(() => {

		firstCard.classList.remove('show');
		secondCard.classList.remove('show');

		firstCard.classList.add('match');
		secondCard.classList.add('match');

		blockedClick = false;

	},800);

}

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

function clear (restart) {

	setTimeout(() => {

		if (restart) {
			cards.forEach(card => {				
				card.classList.remove('show','open','close','match');		
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

function level() {
	
	switch (countMoves) {
		case 16:
			stars[2].classList.remove('level');
			break;
		case 24:
			stars[1].classList.remove('level');
			break;
		case 32:
			stars[0].classList.remove('level');
			break;
	}

}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */