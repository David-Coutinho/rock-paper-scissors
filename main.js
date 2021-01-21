/*1.Randomly return 'Rock', 'Paper' or 'Scissors'
1.1.Randomize number output between 0 and 3
1.2.Atribute number to each of the 3 options (enumerate)
*/

const GAMEOPTIONS = ['Rock','Paper','Scissors'];

// Returns a random integer between <start> and <end>
function randomInt(start, end) {
    return Math.floor(Math.random()*(end-start+1))+start;
}

function randomOption(){
    let max = GAMEOPTIONS.length;
    let min = 0;
    let position = randomInt(min,max-1);
    return GAMEOPTIONS[position];
}

function firstCharToUpper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function validateOption(option,validOptionsArray) {
    return (validOptionsArray.indexOf(option) !== -1) ? true :  false;
}

function getPlayerSelection () {
    let playerSelection;
    valid = false;
    while(!valid){
        playerSelection = prompt("Please choose between 'Rock','Paper' and 'Scissors': ");
        if (playerSelection) {
            playerSelection = firstCharToUpper(playerSelection);
        } else {
            playerSelection = 'CANCEL';
            break;
         }
        valid = validateOption(playerSelection,GAMEOPTIONS);
    }
    console.log("Player selection: %s",playerSelection);
    return playerSelection;
}



function computerPlay() {
    return randomOption();
}

function getComputerSelection() {
    let computerSelection = computerPlay();
    console.log("Computer selection: %s",computerSelection);
    return computerSelection;
}

let score = [0,0];

function playRound(playerSelection, computerSelection){
    finalMsg = document.querySelectorAll('.finalMsg');
    finalMsg.forEach((msg)=>msg.remove());
    resultMsg = document.querySelectorAll('.resultMsg');
    resultMsg.forEach((msg)=>msg.remove());
    // calcOutcome - win (true), lose(false) or tie (null)
    if (playerSelection === 'Rock') {
        if (computerSelection === 'Scissors') {
            outcome = true;
            score[0]++;
        } else if (computerSelection === 'Paper') {
            outcome = false;
            score[1]++;
        } else {
            outcome = null;
        }
    } else if (playerSelection === 'Paper') {
        if (computerSelection === 'Rock') {
            outcome = true;
            score[0]++;
        } else if (computerSelection === 'Scissors') {
            outcome = false;
            score[1]++;
        } else {
            outcome = null;
        }
    } else {
        if (computerSelection === 'Paper') {
            outcome = true;
            score[0]++;
        } else if (computerSelection === 'Rock') {
            outcome = false;
            score[1]++;
        } else {
            outcome = null;
        }
    }
    
    let outcomeMsg = '';
    if (outcome) {
        outcomeMsg = `You Win! ${playerSelection} beats ${computerSelection}`;
    } else  if (outcome === null) {
        outcomeMsg = "It's a Tie...";
    } else {
        outcomeMsg = `You Lose! ${computerSelection} beats ${playerSelection}`;
    }

    //
    totalScore = score.reduce((a, b) => {return a + b;});
    if (totalScore === 4) {
        btnOptions = document.querySelectorAll('.btn-options');
        btnOptions.forEach((button) =>{button.style.display = 'none';});
        para = document.querySelector('body').lastChild;
        finalMsg = document.createElement('p');
        finalMsg.classList.add('finalMsg');
        if (score[0] > score[1]) {
            finalMsg.textContent = 'Game Over, YOU WIN!';
        } else {
            finalMsg.textContent = 'Game Over, YOU LOSE!';
        }
        para.after(finalMsg);
        resetScore();
    }
    //

    return outcomeMsg;
}

function game(rounds) {
    let playerSelection, computerSelection;
    let para = document.querySelector('p');
    let outcome;
    for(let i = 0; i < rounds; i++){
        playerSelection = getPlayerSelection();
        computerSelection = getComputerSelection();
        if(playerSelection === 'CANCEL') return;
        para.style.display = 'inline';
        outcome = playRound(playerSelection,computerSelection);
        para.textContent = outcome;
        console.log(outcome);
        console.log("Game %d",i+1);
    }
}

/*
Display the running score, and announce a winner of the game once one player reaches 5 points.
*/


const btnStart = document.querySelector('#btn__start');
btnStart.addEventListener('click',()=>{
    // Get playerSelection from clicked button
    btnOptions = document.querySelectorAll('.btn-options');
    btnOptions.forEach((button) =>{
            button.style.display = 'inline';
            button.addEventListener('click', () => {
                resultMsg = document.querySelectorAll('.resultMsg');
                resultMsg.forEach((msg)=>msg.remove());
                document.querySelector('p').style.display = 'inline';
                computerSelection = getComputerSelection();
                playerSelection = button.value;
                playerSelectionMsg = document.createElement('p');
                playerSelectionMsg.classList.add('resultMsg');
                playerSelectionMsg.textContent = "Player Selection:" +
                        playerSelection;
                computerSelectionMsg = document.createElement('p');
                computerSelectionMsg.classList.add('resultMsg');
                computerSelectionMsg.textContent = "Computer Selection: " +
                        computerSelection;
                outcomeMsg = document.createElement('p');
                outcomeMsg.classList.add('resultMsg');
                outcomeMsg.textContent =
                        playRound(playerSelection,computerSelection);
                para = document.querySelector('p');
                para.after(playerSelectionMsg);
                para.after(computerSelectionMsg);
                para.after(outcomeMsg);

                
            });
        });
});





function resetScore (){
    score = [0,0];
    return true;
}