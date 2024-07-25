'use strict';
const Player1 = document.querySelector('.player--0');
const Player2 = document.querySelector('.player--1');
// const Current1 = document.querySelector('#current--0');
// const Current2 = document.querySelector('#current--1');
// const Score1 = document.querySelector('#score--0');
// const Score2 = document.querySelector('#score--1');
const Btn_Roll = document.querySelector('.btn--roll');
const Dice = document.querySelector('.dice');
const Btn_Hold = document.querySelector('.btn--hold');
const Btn_New = document.querySelector('.btn--new'); 
const currentScores = document.querySelectorAll('.current-score');
const Score = document.querySelectorAll('.score');
const Players = [ Player1, Player2];
const cheerSound = new Audio('audio/cheer.wav');

// let score = 100;
// let currentScore = 0
// let playing = true;
// let currentPlayer = 0;
// let totalScores = [0, 0];

let score, totalScores, currentScore, currentPlayer, playing;


const changePlayer = () => {
    currentScores[currentPlayer].textContent = 0;

    currentScore = 0;

    currentPlayer = currentPlayer === 0 ? 1 : 0;

    Player1.classList.toggle('player--active');
    Player2.classList.toggle('player--active');
}

Btn_Roll.addEventListener('click', function () {
    if (playing) {
        Dice.classList.remove('hidden');
        let diceRoll = Math.trunc(Math.random() * 6) + 1;
        
        //     let imageChange = () => {
        //         if (diceRoll === 1) {
        //         Dice.src = '/image/dice-1.png'; 
        //     } else if (diceRoll === 2) {
        //        Dice.src = '/image/dice-2.png';
        //     } else if (diceRoll === 3) {
        //         Dice.src = '/image/dice-3.png';
        //     } else if ( diceRoll === 4) {
        //         Dice.src = '/image/dice-4.png';
        //     } else if (diceRoll === 5) {
        //         Dice.src = '/image/dice-5.png';
        //     } else {
        //        Dice.src = '/image/dice-6.png';
        //     }
        // };

        //     if (playing) {
        //         imageChange();
        //         if (diceRoll === 1) {
        //             changePlayer();
        //         } else {
        //             currentScore += diceRoll;
        //             currentScores[currentPlayer].textContent = currentScore;
        //         }
        //     }
        // })


        Dice.src = `./image/dice-${diceRoll}.png`;

        if (diceRoll === 1) {
            changePlayer();
        } else {
            currentScore += diceRoll;
            currentScores[currentPlayer].textContent = currentScore;
        }
    }
})

Btn_Hold.addEventListener('click', function () {
    if (playing) {
        totalScores[currentPlayer] += currentScore;
        Score[currentPlayer].textContent = totalScores[currentPlayer];

        if (totalScores[currentPlayer] >= score) {
            playing = false;
            Dice.classList.add('hidden');
            // Btn_Hold.classList.add('hidden');
            Players[currentPlayer].classList.add('player--winner');
            Players[currentPlayer].classList.remove('player--active');

            cheerSound.play();
        } else {
            changePlayer();
        }
    }
})

const resetGame = () => {
    totalScores = [0, 0];
    currentScore = 0;
    playing = true;
    currentPlayer = 0;
    score = 100;

    currentScores.forEach(scoreElement => scoreElement.textContent = 0);
    Score.forEach(scoreElement => scoreElement.textContent = 0);

    Dice.classList.add('hidden');

    Player1.classList.remove('player--winner', 'player--active');
    Player2.classList.remove('player--winner', 'player--active');

    Player1.classList.add('player--active');
}
resetGame();

Btn_New.addEventListener('click', resetGame);
