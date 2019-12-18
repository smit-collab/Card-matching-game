/*
 * Create a list that holds all of your cards
 */
var time = 0;
var timer, timer1;
var finalRating;
setTimer();
var time1 = 0;

const finalTimer = document.querySelector(".timer");
const finalTimer1 = document.querySelector(".timer");
var nowTime;
var match = 0;
var second = 0;


//the below array will contain all the icons.

const symbols = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const icons = symbols.concat(symbols);

let openedCards = []; //empty array and will be filled after click event
let matchedCards = [];

// creating card dynamically 
const cardsContainer = document.querySelector(".deck");


// initializing the game
function init() {
	shuffle(icons);
    for (let i = 0; i < icons.length; i++) {
        // shuffle(icons);
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = "<i class='" + icons[i] + "'</i>";
        cardsContainer.appendChild(card);

        //calling clickOnCards fun
        clickOnCards(card);
    }

     movesContaining.innerHTML = 0;
     movesinGame=0;
}




//click events on the cards 
function clickOnCards(card) {
    card.addEventListener("click", function() {


        const currentCard = this;
        const previousCard = openedCards[0];

        /* first time card is clicked it will go into else condn
        Second time clicked will go to if condn.*/
        if (openedCards.length === 1) {

            card.classList.add("open", "show", "disable");
            openedCards.push(this); // this means the cards on which click events is performed.

            compareTwoCards(currentCard, previousCard);

        } else {
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this); // this means the cards on which click events is performed
            // console.log(card.innerHTML);
        }

    });

}


function compareTwoCards(currentCard, previousCard) {
    //now comparing the two cards. if first card is opened.
    //last clicked element(second element) === first element
    if (currentCard.innerHTML === previousCard.innerHTML) {
        currentCard.classList.add('match');
        previousCard.classList.add('match');

        matchedCards.push(currentCard, previousCard);
        /*now after the two cards matched there should be only
        two elements in the array and then we need to reset it.*/
        openedCards = [];

        isGameOver();
        // console.log('Matched');

    } else {
        setTimeout(function() { //for 600ms
            // console.log('Dosen\'t match');
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");
            //resetting openCards array again

        }, 600);
        openedCards = [];
    }
    //move fun
    addMoves();
}




//moves implement
const movesContaining = document.querySelector(".moves");
let movesinGame = 0;
movesContaining.innerHTML = 0;

function addMoves() {
    movesinGame++;
    movesContaining.innerHTML = movesinGame;
    //after each move calling rating fun
    rating();
}


//  implement rating system
const ratingContaining = document.querySelector('.stars');
//will contain 3 stars
ratingContaining.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;

function rating() {

    switch (true) {


        case movesinGame >= 4 && movesinGame <= 10: //2 stars
            ratingContaining.innerHTML = `<li><i class="fa fa-star">
	 			</i></li>
        		<li><i class="fa fa-star"></i></li>`;
            break;

        case movesinGame > 11: //1 stars
            ratingContaining.innerHTML = `
				<li><i class="fa fa-star">
	 			</i></li>`;
            break;
    }

}


//  when ok button is clicked on confirm box to reset everything again i.e  will work as restart button.
function resettingBoard() {
    cardsContainer.innerHTML = [];
    init();
    //on clicking restart button clear timer ,set value of time to 0 and start again
    clearTimer();
    time = 0;
    setTimer();

    matchedCards = [];
    movesinGame = 0;
    ratingContaining.innerHTML = `<li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>`;
    movesContaining.innerHTML = 0;
   
}

// reload or restart button  implement 
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function() {
    cardsContainer.innerHTML = []; 
    matchedCards = [];
    init();

    //on clicking restart button clear timer ,set value of time to 0 and start again
    clearTimer();
    time = 0;
    setTimer();

    movesinGame = 0;
    ratingContaining.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
    movesContaining.innerHTML=0;
})


//time function

function setTimer() {
        timer = setInterval(function() {
        cool = time++;
        console.log(time);
        finalTimer.innerHTML = time;
    }, 1000); //start at 1sec.

}

function clearTimer() {
    clearInterval(timer);
}




//below fun is called when ok button is clicked on confirm box
function show_confirm() {
    var r = confirm("Game Over!! " + " Time taken : " + cool + " seconds ." + "\n" + "Rating : " + finalRating +"\n"+"Moves Taken: " +movesinGame+
        "\n" + "Do you want to play again.Then press ok?");
    if (r == true) {
        resettingBoard();
    } else {
        alert("Game Over . !!!!!");
    }
}


// gameOver fun
function isGameOver(time) {
    if (matchedCards.length === icons.length) {
        clearTimer();
        if (movesinGame > 11) {
            finalRating = '1 Star';
        } else if (movesinGame >= 4 && movesinGame <= 10) {
            finalRating = '2 Stars'
        }
        cool = cool + 1; //just to match exact time show in console.
        // alert("Game Over!! "+" Time taken : " + cool + " seconds ."+"\n"+"Rating : "+ finalRating
        // +"\n" + "Do you want to play again?");//cool var contains time
        show_confirm();
    }
}




init();




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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