var whosTurn = 1; //start off on player 1's turn

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

var someoneWon = false;
var board1 = document.getElementById("game-wrapper");
var board2 = document.getElementById("game2-wrapper");

var A1 = document.getElementById('A1');
var A2 = document.getElementById('A2');
var A3 = document.getElementById('A3');
var B1 = document.getElementById('B1');
var B2 = document.getElementById('B2');
var B3 = document.getElementById('B3');
var C1 = document.getElementById('C1');
var C2 = document.getElementById('C2');
var C3 = document.getElementById('C3');



// function createMemories(){
//   for (var i = 0; i < array.length; ++i) {
//       game[i] = [];
//   }
//   return game;
// }

var openCell = [];

function compPlay(square){
    if(whosTurn == 1 && (!player1[square.id] && !computer[square.id]){
            square.innerHTML = 'X';
            cells[square.id] = 1;
            player1[square.id] = 1;
            checkWin2(player1, 1);
            whosTurn = 0;
            checkMove();
    }else{
            square.innerHTML = '0';
            computer[square.id] = 1;
            cells[square.id] = 1;
            checkWin2(computer, 0);
            whosTurn = 1;
    }
}

function checkMove(){
    for (property in moves) {
        if (moves.hasOwnProperty(property)) {
            for (var i = 0; i < property.length; i++) {
                var counter = 0;
                for (var j = 0; j < property[i].length; j++) {
                    if(cells[property[i][j]]){
                        counter++;
                        if(counter == property[i].length){
                            compPlay(moves[i]);
                        }
                    }else{

                    } 
                }
            }
        }
    }  
}
