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

let balance = deposit();
const numberOfLines = getNumberOfLines();

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

const bet = getBet(balance, numberOfLines);