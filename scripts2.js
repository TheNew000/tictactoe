var whosPlaying = [];
var whosTurn = 'player1';
var someoneWon = false;
var initialMoves = ['B2', 'A1', 'C3', 'C2', 'B1'];
var onePlayer = 0;
var twoPlayer = 0;
var player1 = [];
var player2 = [];
var computer = [];
var winners = [
["A1", "A2", "A3"],
["B1", "B2", "B3"],
["C1", "C2", "C3"],
["A1", "B2", "C3"],
["A1", "B1", "C1"],
["A2", "B2", "C2"],
["A3", "B3", "C3"],
["A3", "B2", "C1"]
];
var moves = {
    A1: [["A3", "A2"], ["C3", "B2"], ["B1", "C1"]],
    A2: [["A3", "A1"], ["C2", "B2"]],
    A3: [["A1", "A2"], ["C1", "B2"], ["B3", "C3"]],
    B1: [["B3", "B2"], ["A1", "C1"]],
    B2: [["A3", "C1"], ["C3", "A1"], ["B3", "B1"], ["C2", "A2"]],
    B3: [["A3", "C3"], ["B1", "B2"]],
    C1: [["B2", "A3"], ["A1", "B1"], ["C2", "C3"]],
    C2: [["A2", "B2"], ["C1", "C3"]],
    C3: [["A1", "B2"], ["A3", "B3"], ["C2", "C1"]]
};
// var player1Grid = {
//     A1: 0,
//     A2: 0,
//     A3: 0,
//     B1: 0,
//     B2: 0,
//     B3: 0,
//     C1: 0,
//     C2: 0,
//     C3: 0
// };
// var player2Grid = {
//     A1: 0,
//     A2: 0,
//     A3: 0,
//     B1: 0,
//     B2: 0,
//     B3: 0,
//     C1: 0,
//     C2: 0,
//     C3: 0
// };
var cells = {
    A1: 0,
    A2: 0,
    A3: 0,
    B1: 0,
    B2: 0,
    B3: 0,
    C1: 0,
    C2: 0,
    C3: 0
};
// var computer = {
//     A1: 0,
//     A2: 0,
//     A3: 0,
//     B1: 0,
//     B2: 0,
//     B3: 0,
//     C1: 0,
//     C2: 0,
//     C3: 0
// };

function whichGame(player){
    var elements = document.getElementsByClassName('box');
    if(player == onePlayer){
        whosPlaying.push('player1', 'computer');
    }else{
        whosPlaying.push('player1', 'player2');
    }
}

function markSquare(square){
    console.log(whosTurn);
        if(whosTurn == 'player1' && cells[square.id] == 0){
            whatHappens(square, 'player1');
            if(whosPlaying[1] === 'computer'){
                checkMove();
            }
        }else if (whosTurn == 'computer'){
            return whatHappens(square, computer);
        }else if(whosTurn == player2){
            return whatHappens(square, player2);
        }else if(someoneWon){
            return console.log("Someone already won");
        }else{
            return alert("Somethings already there!! No cheating!!");
        }
}

function whatHappens(square, player){
    if(player == 'player1'){
        square.innerHTML = 'X';
        cells[square.id] = 1;
        player1.push(square.id);
        checkWin(player1);
        whosTurn = whosPlaying[1];
    }else if(player == 'player2' || player == 'computer'){
        console.log(square);
        square.innerHTML = 'O';
        cells[square.id] = 1;
        if (player == 'player2'){
            player2.push(square.id);
            checkWin(player2);
        }else{
            computer.push(square.id);
            checkWin(computer); 
        }
        whosTurn = whosPlaying[0];
    }
}

function checkMove(){
    for (var property in moves) {
        if (moves.hasOwnProperty(property)) {
            for (var i = 0; i < property.length; i++) {
                for (var j = 0; j < property[i].length; j++) {
                    if(player1.indexOf(property[i][j]) > -1){
                        var newProperty = property.toString();
                        if(player1.indexOf(property[i][0]) > -1 && player1.indexOf(property[i][1]) > -1 && cells[newProperty] == 0){
                            var newSquare = document.getElementById(newProperty)
                            return markSquare(newSquare);
                        }
                    }else{
                        for (var k = 0; k < initialMoves.length; k++) {
                            if(player1.indexOf(initialMoves[k]) < 0 && cells[initialMoves[k]] == 0){
                                var newMove = initialMoves[k].toString();
                                var finalMove = document.getElementById(newMove);
                                console.log(finalMove);
                                return whatHappens(finalMove, 'computer');
                            }   
                        }
                    }
                }    
            }
        }
    }  
}


function checkWin(currentPlayer){
    var rowCount = 0;
    // Loops through the outer array
    for (var i = 0; i < winners.length; i++) {
        // Loop through each row's (inner array)
        rowCount = 0;
        for (var j = 0; j < winners[i].length; j++) {
            if(currentPlayer[winners[i][j]]){
                rowCount++;
                if(rowCount == winners[i].length){
                    gameOver(currentPlayer, winners[i]);
                    someoneWon = 1;
                }
            }else if(cells[i]){
                message.innerHTML = "It's a tie!";
            }
        }
    }
}

function gameOver(whoWon, winningCombo){
    var message = document.getElementById('message');
    if(whoWon == 1 || whoWon == 2){
        message.innerHTML = "Congratulations Player " + whoWon + "!! You slayed with " + winningCombo.join(', ');
    }else if(whoWon == 0){
        message.innerHTML = "Unfortunately you were slain with this combo: " + winningCombo.join(', ');
    }
    for (var i = 0; i < winningCombo.length; i++) {
        document.getElementById(winningCombo[i]).className += ' winner';
    }

}

function restart(){
    for (var i = 0; i < cells.length; i++) {
        cells[i] = 0;
        player1[i] = 0;
        player2[i] = 0;
        computer[i] = 0;
    }
}
