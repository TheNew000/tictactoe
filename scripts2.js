var whosTurn = [];
var someoneWon = false;
var initialMoves = [4, 0, 8, 7, 3];
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
    C3: [["A1", "B2"], ["A3", "B3"], ["C2", "C1"]],
    C1: [["B2", "A3"], ["A1", "B1"], ["C2", "C3"]],
    C2: [["A2", "B2"], ["C1", "C3"]],
    B1: [["B3", "B2"], ["A1", "C1"]],
    B3: [["A3", "C3"], ["B1", "B2"]],
    B2: [["A3", "C1"], ["C3", "A1"], ["B3", "B1"], ["C2", "A2"]]
}
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
}
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
}
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
}
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
}
function whichGame(player){
    var elements = document.getElementsByClassName(box);
    if(onePlayer){
        whosTurn.push(1, 0);
    }else(twoPlayer){
        whosTurn.push(1, 2);
    }
}


function markSquare(square){
    if(someoneWon){
        console.log("Someone already won");
    }else if(whosTurn[i] == 1 && (!player1[square.id] && !computer[square.id])){
        whatHappens(square, player1);
        if(whosTurn[1] == 0){
            checkMove();
        }
    }else if (whosTurn == 0){
        whatHappens(square, computer);
    }else if(whosTurn == 2){
        whatHappens(square, player2);
    }else{
        alert("Somethings already there!! No cheating!!");
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
    checkWin2(player, 1);
    checkMove();

}
        



function checkMove(){
    for (property in moves) {
        if (moves.hasOwnProperty(property)) {
            for (var i = 0; i < property.length; i++) {
                var counter = 0;
                for (var j = 0; j < property[i].length; j++) {
                    if(player1[property[i][j]]){
                        counter++;
                        if(counter == property[i].length && !cells[i]){
                            markSquare(moves[i]);
                        }
                    }else{
                        for (var k = 0; k < initialMoves.length; k++) {
                            if(!cells[k]){ 
                                markSquare(moves[k]);
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
