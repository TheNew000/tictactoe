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

var winners2 = [
["Aa1", "Aa2", "Aa3"],
["Bb1", "Bb2", "Bb3"],
["Cc1", "Cc2", "Cc3"],
["Aa1", "Bb2", "Cc3"],
["Aa1", "Bb1", "Cc1"],
["Aa2", "Bb2", "Cc2"],
["Aa3", "Bb3", "Cc3"],
["Aa3", "Bb2", "Cc1"]
];

// var player1 = {
//     A2: 1;
// }




 //Array where we will stach the swuares player1 has checked
 player1 = [];
var player2 = []; //Array for player2
var computer = [];
var someoneWon = false;
var board1 = document.getElementById("game-wrapper");
var board2 = document.getElementById("game2-wrapper");

var A1 = document.getElementById('Aa1');
var A2 = document.getElementById('Aa2');
var A3 = document.getElementById('Aa3');
var B1 = document.getElementById('Bb1');
var B2 = document.getElementById('Bb2');
var B3 = document.getElementById('Bb3');
var C1 = document.getElementById('Cc1');
var C2 = document.getElementById('Cc2');
var C3 = document.getElementById('Cc3');

var win1 = [["Aa3", "Aa2"], ["Cc3", "Bb2"], ["Bb1", "Cc1"]];
var win2 = [["Aa3", "Aa1"], ["Cc2", "Bb2"]];
var win3 = [["Aa1", "Aa2"], ["Cc1", "Bb2"], ["Bb3", "Cc3"]];
var win4 = [["Aa1", "Bb2"], ["Aa3", "Bb3"], ["Cc2", "Cc1"]];
var win5 = [["Bb2", "Aa3"], ["Aa1", "Bb1"], ["Cc2", "Cc3"]];
var win6 = [["Aa2", "Bb2"], ["Cc1", "Cc3"]];
var win7 = [["Bb3", "Bb2"], ["Aa1", "Cc1"]];
var win8 = [["Aa3", "Cc3"], ["Bb1", "Bb2"]];
var win9 = [["Aa3", "Cc1"], ["Cc3", "Aa1"], ["Bb3", "Bb1"], ["Cc2", "Aa2"]];



var possCombo = [win1, win2, win3, win4, win5, win6, win7, win8, win9];

function Visibility(){
    board1.style.display = "none";
    board2.style.display = "none";
}

function boardVisible(firstBoard, secondBoard){
    if (firstBoard.style.display === "none" && secondBoard.style.display === "block"){
        secondBoard.style.display = "none";
        firstBoard.style.display = "block";
    }else if(firstBoard.style.display == "block"){
        firstBoard.style.display = "none";
    }else if(firstBoard.style.display == "none") {
        firstBoard.style.display = "block";
    }
}

// Functions for two players:

function markSquare(square){
    if(someoneWon){
        console.log("Someone already won");
    }else if(player1.indexOf(square.id) == -1 && player2.indexOf(square.id) == -1){
        if(whosTurn == 1){
        square.innerHTML = 'X';
        whosTurn = 2;
        player1.push(square.id);
        checkWin(player1, 1);
        }else{
            square.innerHTML = 'O';
            whosTurn = 1;
            player2.push(square.id);
            checkWin(player2, 2);
        }
    }else{
        alert("Somethings already there!! No cheating!!");
    }
}

function checkWin(currentPlayer, whoJustMarked){
    var rowCount = 0;
    // Loops through the outer array
    for (var i = 0; i < winners.length; i++) {
        // Loop through each row's (inner array)
        rowCount = 0;
        for (var j = 0; j < winners[i].length; j++) {
            if(currentPlayer.indexOf(winners[i][j]) > -1){
                //HIT!
                rowCount++;
            }
            if(rowCount == 3){
                gameOver(whoJustMarked, winners[i]);
            }
        }
    }
}



// Functions for Computer Player:

function compPlay(square){
    if(whosTurn == 1 && (player1.indexOf(square.id) == -1 && computer.indexOf(square.id) == -1)){
            square.innerHTML = 'X';
            player1.push(square.id);
            checkWin2(player1, 1);
            whosTurn = 0;
            checkMove();
    }else{
            square.innerHTML = '0';
            computer.push(square.id);
            checkWin2(computer, 0);
            whosTurn = 1;
    }
}


function checkMove(){
    player1.sort();
    // Loops through the outer array
    for (var i = 0; i < possCombo.length; i++) {
        // Loop through each row's (inner array)
        for (var j = 0; j < possCombo[i].length; j++){
            for(var k = 0; k < possCombo[i][j].length; k++){
                if(player1.length > 1){
                    if (player1[i] == possCombo[0][j][k] && (player1.indexOf(A1.id) == -1 && computer.indexOf(A1.id) == -1)){
                        console.log(player1);
                        return compPlay(A1); 
                    }else if (player1[i] == possCombo[1][j][k] && (player1.indexOf(A2.id) == -1 && computer.indexOf(A2.id) == -1)){
                        console.log(player1);
                       return compPlay(A2);
                    }else if (player1[i] == possCombo[2][j][k] && (player1.indexOf(A3.id) == -1 && computer.indexOf(A3.id) == -1)){
                        console.log(player1);
                       return compPlay(A3);
                    }else if (player1.indexOf(win4[i]) && (player1.indexOf(C3.id) == -1 && computer.indexOf(C3.id) == -1)){
                        console.log(player1);
                       return compPlay(C3);
                    }else if (player1[i] == possCombo[i][j][k] && (player1.indexOf(C1.id) == -1 && computer.indexOf(C1.id) == -1)){
                        console.log(player1);
                       return compPlay(C1);
                    }else if (player1.indexOf(win6[i]) && (player1.indexOf(C2.id) == -1 && computer.indexOf(C2.id) == -1)){
                       return compPlay(C2);
                    }else if (player1.indexOf(win7[i]) && (player1.indexOf(B1.id) == -1 && computer.indexOf(B1.id) == -1)){
                       return compPlay(B1);
                    }else if (player1.indexOf(win8[i]) && (player1.indexOf(B3.id) == -1 && computer.indexOf(B3.id) == -1)){
                       return compPlay(B3);
                    }else if (player1.indexOf(win9[i]) && (player1.indexOf(B2.id) == -1 && computer.indexOf(B2.id) == -1)){
                       return compPlay(B2);
                    }
                }else if(player1.indexOf(B2.id) == -1 && computer.indexOf(B2.id) == -1){
                   return compPlay(B2);
                }else if(player1.indexOf(A1.id) == -1 && computer.indexOf(A1.id) == -1) {
                   return compPlay(A1);
                }else if(player1.indexOf(C3.id) == -1 && computer.indexOf(C3.id) == -1) {
                   return compPlay(C3);  
                }else if(player1.indexOf(C2.id) == -1 && computer.indexOf(C2.id) == -1) {
                   return compPlay(C2);                          
                }else if(player1.indexOf(B1.id) == -1 && computer.indexOf(B1.id) == -1) {
                   return compPlay(B1);      
                }
            }
        }
    }
}

function checkWin2(currentPlayer, whoJustPlayed){
    var rowCount = 0;
    // Loops through the outer array
    for (var i = 0; i < winners2.length; i++) {
        // Loop through each row's (inner array)
        rowCount = 0;
        for (var j = 0; j < winners2[i].length; j++) {
            if(currentPlayer.indexOf(winners2[i][j]) > -1){
                //HIT!
                rowCount++;
            }
            if(rowCount == 3){
                gameOver(whoJustPlayed, winners2[i]);
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


// function organizeArray(){
//     for (var i = 0; i < win1.length; i++) {
//         win1[i].sort();
//     }
//     for (var i = 0; i < win2.length; i++) {
//         win2[i].sort();
//     }
//     for (var i = 0; i < win3.length; i++) {
//         win3[i].sort();
//     }
//     for (var i = 0; i < win4.length; i++) {
//         win4[i].sort();
//     }
//     for (var i = 0; i < win5.length; i++) {
//         win5[i].sort();
//     }
//     for (var i = 0; i < win6.length; i++) {
//         win6[i].sort();
//     }
//     for (var i = 0; i < win7.length; i++) {
//         win7[i].sort();
//     }
//     for (var i = 0; i < win8.length; i++) {
//         win8[i].sort();
//     }
//     for (var i = 0; i < win9.length; i++) {
//         win9[i].sort();
//     }
// }

Visibility();
// organizeArray();
