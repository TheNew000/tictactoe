var whosTurn = [];
var someoneWon = false;
var initialMoves = [B2, A1, C3, C2, B1];
var onePlayer = 0;
var twoPlayer = 0;
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
var player1 = {
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
var player2 = {
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
var computer = {
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
var A1 = document.getElementById('A1');
var A2 = document.getElementById('A2');
var A3 = document.getElementById('A3');
var B1 = document.getElementById('B1');
var B2 = document.getElementById('B2');
var B3 = document.getElementById('B3');
var C1 = document.getElementById('C1');
var C2 = document.getElementById('C2');
var C3 = document.getElementById('C3');

function whichGame(player){
    var elements = document.getElementsByClassName('box');
    if(player == onePlayer){
        whosTurn.push(1, 0);
    }else{
        whosTurn.push(1, 2);
    }
}

function markSquare(square){
    console.log(square);
    for (var i = 0; i < whosTurn.length; i++) {
        if(whosTurn[i] == 1 && (player1[square.id] == 0 && computer[square.id] == 0)){
            whatHappens(square, player1);
            if(whosTurn[1] === 0){
                return checkMove();
            }
        }else if (whosTurn === 0){
            return whatHappens(square, computer);
        }else if(whosTurn === 2){
            return whatHappens(square, player2);
        }else if(someoneWon){
            return console.log("Someone already won");
        }else{
            return alert("Somethings already there!! No cheating!!");
        }
    }
}

function whatHappens(square, player){
    if(player = player1){
        square.innerHTML = 'X';
        whosTurn[1];
    }else{
        square.innerHTML = 'O';
        whosTurn[0]
    }
    cells[square.id] = 1;
    player[square.id] = 1;
    checkWin(player, 1);
}

function checkMove(){
    for (property in moves) {
        if (moves.hasOwnProperty(property)) {
            for (var i = 0; i < property.length; i++) {
                var counter = 0;
                for (var j = 0; j < property[i].length; j++) {
                    if(player1[property]){
                        counter++;

                        if(counter == property[i].length && (player1[property.id] == 0 && computer[square.id] == 0)){
                            markSquare(property);
                        }
                    }else{
                        for (var k = 0; k < initialMoves.length; k++) {
                            if(initialMoves[k] && (player1[square.id] == 0 && computer[square.id] == 0)){ 
                                console.log(initialMoves[k]);
                                markSquare(initialMoves[k]);
                            }
                        }
                    }
                }    
            }
        }
    }  
}


function checkWin(currentPlayer, whoJustMarked){
    var rowCount = 0;
    // Loops through the outer array
    for (var i = 0; i < winners.length; i++) {
        // Loop through each row's (inner array)
        rowCount = 0;
        for (var j = 0; j < winners[i].length; j++) {
            if(currentPlayer[winners[i][j]]){
                rowCount++;
                if(rowCount == winners[i].length){
                    gameOver(whoJustMarked, winners[i]);
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
