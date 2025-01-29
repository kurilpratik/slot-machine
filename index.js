/*
1. Deposit some money
2. Determine number of lines to bet on
3. Collect a bet omount
4. SPin the slot machine
5. Check if the user won
6. Give the user their winnings
7. Play again or end game
*/

const prompt = require('prompt-sync')();

const ROWS = 3;
const COLS = 3;

// item distribution
const SYMBOLS_COUNT = {
    "A":2, 
    "B":4, // entry
    "C":6,
    "D":8
};

// item value
const SYMBOL_VALUES = {
    "A":5,
    "B":4,
    "C":3,
    "D":2
}

const deposit = () => {
    while(true){
        const depositAmount = parseFloat(prompt("Enter a deposit amount: "));
        //parseFloat -> Converting input to floating point, "17.2" -> 17.2 , "hehe" -. NaN
        if(isNaN(depositAmount)){
            console.log("Kindly enter a valid number, try again.");
        }
        else if(depositAmount <= 0){
            console.log("Deposit amount must be greater than 0, try again");
        }
        else {
            return depositAmount;
        }
    }
}


const getNumberOfLines = () => {
    while(true){
        const numberOfLines = parseInt(prompt("Enter number of lines to bet on (1-3): "));
        if(isNaN(numberOfLines)){
            console.log("Kindly enter a valid number, try again.");
        }
        else if(numberOfLines <= 0 || numberOfLines > 3){
            console.log("Number of lines must be between 1 and 3, try again.");
        } else {
            return numberOfLines;
        }
    }
}


// Say bet = 10
// totalBet = 10 * 2 = 20
// totalBet < balance
// 10 * 2 < balance
// 10 < bal / 2
// i.e bet < balance / lines
// so if bet > balance / lines -> invalid

const getBet = (balance, lines) => {
    while(true){
        const bet = parseInt(prompt("Enter the bet per line: "));
        if(isNaN(bet)){
            console.log("Kindly enter a valid number, try again.");
        }
        else if(bet <= 0 || bet > balance/lines){
            console.log(`Bet amount must be greather than 0 and less than or equal to ${balance}, try again.`);
            console.log("Your bet amount is "+ bet * lines);
        } else {
            return bet;
        }
    }
}


const spin = () => {
    const symbols = []; // Array is a reference data type, meaning we can change what is inside of it w/o changing the reference to it. Hence, we can edit an array even though it is a const
    for ( const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i=0; i<count; i++) {
            symbols.push(symbol);
        }
    }
    // console.log(symbols);
    const reels = [];
    
    // Add a random reelSymbols from symbols to the reel and then pop it from reelSymbols so we can't reuse it
    for (let i=0; i<COLS; i++) {
        reels.push([]); // Create a new col for total no. of cols in the reels
        const reelSymbols = [...symbols]; // Copying symbols into reelSymbols
        for (let j=0; j<ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1); // 1 removes just 1 element
        }
    }

    return reels;
}

/*
    Need to transpose the matrix

    [[D C B], [D B C], [D A C]]
    ->
    [ [D D D],
      [C B A],
      [B C C] ]

*/

const transpose = (reels) => {
    const rows = [];
    for (let i=0; i<ROWS; i++) {
        rows.push([]);
        for (let j=0; j<COLS; j++) {
            rows[i].push(reels[j][i]); // Actual transpose
        }
    }
    return rows;
}

const display2D = (matrix) => {
    for (let row of matrix) {
        const rowString = row.join(' ');
        console.log(rowString);
    }
}

// Enhanced version of display2D
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = '';
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != rows.length - 1) {
                rowString += ' | '; 
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    // If lines is 1 we only need to look at index 0, if lines = 2, index = 0 and 1 ...
    for (let row=0; row<lines; row++) {
        const symbols = rows[row]; // Store all symbols of a row
        let allSame = true;
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if(allSame) {
            winnings += bet*SYMBOL_VALUES(symbols[0]) // using this to find out multiplier, eg pass A gives 5
        }
    }
    return winnings;
}

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const reels = spin();
const matrix = transpose(reels);
printRows(matrix);
const winnings = getWinnings(matrix, bet, numberOfLines);
console.log(winnings);
