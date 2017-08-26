'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Your code here
  const MAXGUESSES = 10;
  const boardColors = ['red', 'blue', 'green', 'white', 'yellow', 'purple', 'orange', 'black'];
  let turn = 0;
  // let guess = 0;

  function guess() {
    this.pegs = [];
    this.hint = '';
  }

  let board = {
    code: [],
    guesses: [],
    createCode: function() {
      for (let i = 0; i < 4; i++) {
        const randomIndex = getRandomInt(0, boardColors.length);
        this.code.push(randomIndex);
      }
      /**** COMMENT OUT FOR GAME ***/
      this.showAnswer();
      return true;

      function getRandomInt(min, max)  {
        return Math.floor(Math.random() * (max - min)) + min;
      }
    },  // createCode() method

    showAnswer: function() {
      let ansPegs = document.getElementById('answerRow').childNodes;
      for (let i=0; i<ansPegs.length-1; i++) {
        ansPegs[i].className = `peg ${boardColors[this.code[i]]}`;
      }
    },  // showAnswer() method

    populateChoice: function(selectedColor) {
      // console.log(selectedColor);
      if (this['guesses'].length) {  // length of guesses array.
        const currentGuess = this['guesses'][this['guesses'].length - 1];  // find the last (active) one
        if (currentGuess.pegs.length === 4) {  // if current guess alreay has 4 pegs...
          console.log('Please submit your answer or clear to re-enter');
        } else {  // push the peg into current guess.
          currentGuess.pegs.push(selectedColor);
        }
      } else {  // guesses array was 0, this is a new game, create our guess object.
        const currentGuess = new guess();
        currentGuess.pegs.push(selectedColor);  // push our peg onto current guess
        this['guesses'].push(currentGuess);  // push our new current guess object onto guesses array.
      }
      // console.log(this['guesses']);
      this.displayRow();
    },  // populateChoice()

    // displayRow handles 3 functions
    //   a) it populates a peg.
    //   b) handles clearing out a row.
    //   c) Displays the hint
    // displayRow is generic and always fills in the entire row for the current Guess
    // There is some slight inefficiencies since I am repopulating the colors
    // for previous pegs.
    displayRow: function() { //, col = null, pegColor = null) {
      // console.log(row, col, pegColor);
      const row = this['guesses'].length-1;
      console.log(row);
      const guessRows = document.getElementById('boardTbl').childNodes;
      console.log(guessRows[row]);
      const guessCols = guessRows[row].childNodes;
      console.log(guessCols);
      console.log(this['guesses'][row]);
      for (let i=0; i<5; i++) {
        if (i === 4) {
          console.log('if i=4');
          guessCols[i].textContent = this['guesses'][row].hint;
        } else if (this['guesses'][row].pegs[i]) {
          console.log('setting peg');
          guessCols[i].className = `peg ${boardColors[this['guesses'][row].pegs[i]]}`;
        } else {
          console.log('clearing peg');
          guessCols[i].className = `peg`;
        }
      }
    },  // displayRow()
    // Passing in strings to GenerateHint.  First off, I lifted this code
    // from my first version of the game and it used strings as input, then
    // converted those strings into an array.
    // Second.  This is my way of creating a new temp array.
    // Since passing arrays are by reference, when I  copied my
    // my guesses and code array and manipulated those copies
    // it was affecting the original array.
    generateHint: function(answer, guess) {
      console.log('In generate hint');
      // Initializing...
      let exactMatch = 0;
      let correctPeg = 0;
      let matchIndex = -1;
      // creating arrays out of the strings.
      let solutionArr = answer.split('');
      let myGuessArr = guess.split('');
      console.log(solutionArr);
      console.log(myGuessArr);
      // This piece of code tests for exact match
      myGuessArr.forEach((peg, index) => {
        if (peg === solutionArr[index]) {
          exactMatch++;
          // clear out value.  This sets us up to look for correct peg test later.  These won't be considered.
          solutionArr[index] = null;
          myGuessArr[index] = null;
        }
      });
      console.log('after match, before correct peg');
      console.log(solutionArr);
      console.log(myGuessArr);

      // This piece of code tests for correct peg only
      myGuessArr.forEach((peg) => {
        if (peg) {  // peg could be null from previous forEach statement.
          matchIndex = solutionArr.indexOf(peg);  // Let's find a matching peg in the solution!
          if (matchIndex !== -1) {  // We found a peg match in the string.
            correctPeg++
            solutionArr[matchIndex] = null;  // clear out value so value won't be considered with next peg tests.
          }
        }  // closing brace for if (peg)
      });
      console.log('after correct peg');
      console.log(solutionArr);
      console.log(myGuessArr);
      console.log(`${exactMatch}  |  ${correctPeg}`);
      return `${exactMatch}  |  ${correctPeg}`;
    } // generateHint
  }    // board object

  createPegCanvas();
  addListenersToButtons();
  generateBoard();
  board.createCode();
  // board.showAnswer();


  function createPegCanvas() {
    const colorsCanvas = document.getElementById('boardColors');
    for(let i = 0; i < boardColors.length; i++){
      const pegColor = document.createElement('div');
      pegColor.id = i;
      pegColor.className = `${boardColors[i]} box`;
      pegColor.addEventListener('click', (color) => {
        board.populateChoice(color.target.id);
      });
      colorsCanvas.appendChild(pegColor);
    }
  }  // createPegCanvas()

  function addListenersToButtons() {
    //** Submit Guess button **//
    // This button take the current row and first checks for a win.
    // If there is a win, it congratulates the user
    // If there is no win, it calls
    const checkBtn = document.getElementsByName('submit');
    checkBtn[0].addEventListener('click', () => {
      const currentGuess = board['guesses'][board['guesses'].length-1];
      const theCode = board['code'].join('');  // makes it simpler to compare
      const theGuess = currentGuess.pegs.join('');  // makes it easy to compare
      if (theCode === theGuess) {
        alert('Wow, you won!  Press New Game to restart');
        const clearBtn = document.getElementsByName('clear');
        clearBtn[0].disabled = true;
        checkBtn[0].disabled = true;
      } else {
        currentGuess['hint'] = board.generateHint(theCode, theGuess);
        board.displayRow();
        board['guesses'].push(new guess());  // Adding a new guess row.
      }
    });

    // We want the ability to clear the current row prior to submitting.
    // This will give the player the ability to change their answer.
    const clearBtn = document.getElementsByName('clear');
    clearBtn[0].addEventListener('click', () => {
      board['guesses'].pop();  // removing the current guess.
      board['guesses'].push(new guess())  // Adding an empty guess.
      board.displayRow();
    });

    // New Game button.  Needs to clear out code and guesses arrays.
    // Needs to clear the entire board.
    const newBtn = document.getElementsByName('new');
    newBtn[0].addEventListener('click', () => {
      board['code'] = [];  // clearing array.
      board['guesses'] = [];  // clearing array.
      clearBoard();
      const checkBtn = document.getElementsByName('submit');
      const clearBtn = document.getElementsByName('clear');
      clearBtn[0].disabled = false;
      checkBtn[0].disabled = false;
      board.createCode();
    });
  }  // addListenersToButtons()

  function generateBoard() {
    // This section creates the code breaker's guess.
    const boardTable = document.createElement("table");
    boardTable.id = 'boardTbl';
    document.getElementById('board').appendChild(boardTable);
    for(let i = 0; i < MAXGUESSES ; i++) {
      const guessRow = document.createElement("tr");
      guessRow.className = 'guessRow';
      boardTable.appendChild(guessRow);
      for (let j = 0; j < 5; j++) {
        const guessCol = document.createElement("td");
        j < 4? guessCol.className = `peg` : guessCol.className =  `hint`;
        guessRow.appendChild(guessCol);
      }
    }
    // Displays the Codemaker's Code.
    const ansTable = document.createElement("table");
    ansTable.id = 'answer';
    document.getElementById('board').appendChild(ansTable);
    const ansRow = document.createElement("tr");
    // document.cre
    ansRow.id = 'answerRow';
    ansTable.appendChild(ansRow);
    for (let j = 0; j < 5; j++) {
      const ansCol = document.createElement("td");
      j < 4? ansCol.className = `peg` : null;
      ansRow.appendChild(ansCol);
    }
  }  // ending to generateBoard

function clearBoard() {
  const guessRows = document.getElementById('boardTbl').childNodes;
  console.log(guessRows);
  guessRows.forEach((row) => {
    const pegsAndHint = row.childNodes;
    pegsAndHint.forEach((val, index) => {
      index !== 4? val.className = `peg` : val.textContent = null;
    });
  });
  const ansRow = document.getElementById('answerRow').childNodes;
  console.log(ansRow);
  ansRow.forEach((val, index) => {
      index !== 4? val.className = `peg` : null;
  });
}  // clearBoard()

});  //document.addEventListener('DOMContentLoaded'...
