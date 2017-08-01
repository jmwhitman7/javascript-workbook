'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
  // Take the last value in the startStack, add it to the end of the endStack.
  stacks[endStack].push(stacks[startStack].pop());
}

function isLegal(startStack, endStack) {
  if (startStack && endStack){
    // Declare variables to hold the topmost piece in start and end stacks
    const startIndex = stacks[startStack].length - 1;
    const start = stacks[startStack][startIndex];
    const endIndex = stacks[endStack].length - 1;
    const end = stacks[endStack].length ? stacks[endStack][endIndex]: 0;

    // If the piece to be moved is larger than the last piece on endStack,
    console.log(start , end, start < end);
    if (end === 0 || start < end) {
      // If the piece to be moved is smaller than the last piece on endStack, the move is legal,
      // Allow move
      return 'legal move';
    }
  }
}

function checkForWin() {
  // If the length of either b or c stack is 4
  if (stacks.b.length === 4 || stacks.c.length === 4) {
    // Return a You Win to the winner
    return "You Win!";
  }
}

function towersOfHanoi(startStack, endStack) {
  // If the move is legal
  if (isLegal(startStack, endStack)) {
    // Move the piece
    movePiece(startStack, endStack);
    // Check for a win
    checkForWin();
  } else {
    console.log("Not a cool move! Choose another tower.");
    return "Not a cool move! Choose another tower.";
  }
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
} else {

  getPrompt();

}
