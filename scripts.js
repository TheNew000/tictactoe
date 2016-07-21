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

var A1;
var A2;
var A3;
var B1;
var B2;
var B3;
var C1;
var C2;
var C3;

var player1 = []; //Array where we will stach the swuares player1 has checked
var player2 = []; //Array for player2
var someoneWon = false;

function activateAI(player){
    if(player === 1){
        compMove();
    }else if(player === 2){
        markSquare();
    }
}

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
        console.dir(square.id);
    }else{
        console.log("Somethings already there!! No cheating!!");
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

function gameOver(whoWon, winningCombo){
    var message = document.getElementById('message');
    message.innerHTML = "Congratulations Player " + whoWon + "!! You slayed with " + winningCombo.join(', ');
    for (var i = 0; i < winningCombo.length; i++) {
        document.getElementById(winningCombo[i]).className += ' winner';
    }
    someoneWon = true;
}

// Function detects whether box is avaialble

function boardCheck() {
    A1 = $('#A1').html();
    A2 = $('#A2').html();
    A3 = $('#A3').html();
    B1 = $('#B1').html();
    B2 = $('#B2').html();
    B3 = $('#B3').html();
    C1 = $('#C1').html();
    C2 = $('#C2').html();
    C3 = $('#C3').html();
};

var win1 = ["A3", "A2", "C3", "B2", "B1", "C1"];

function compMove(){
    var hitCount = 0;
    for (var i = 0; i < win1.length; i++) {
        if(player1.indexOf(win1[i]) > -1){
            hitCount++;
        }else if (hitCount == win1[i]){
        markSquare(A1);
        }
    }
}

function (){
    player1.indexOf(square.id) == -1 && player2.indexOf(square.id) == -1)
    if (A1 == "" && ((A3 == "X" && A2 == "X") || (C3 == "X" && B2 == "X") || (C1 == "X" && B1 == "X"))) {
        $('#A1').text("O");
        turn = 0;
    } else {
      if (A2 == "" && ((A1 == "X" && A3 == "X") || (C2 == "X" && B2 == "X"))) {
        $('#A2').text("O");
        turn = 0;
        }
        else{
        if (A3 == "" && ((A1 == "X" && A2 == "X") || (C1 == "X" && B2 == "X") || (C3 == "X" && B3 == "X"))) {
            $('#A3').text("O");
            turn = 0;
        }
            else{
            if (C3 == "" && ((C1 == "X" && C2 == "X") || (A1 == "X" && B2 == "X") || (A3 == "X" && B3 == "X"))) {
                $('#C3').text("O");
                turn = 0;
        }
                else{
                if (C1 == "" && ((C3 == "X" && C2 == "X") || (A3 == "X" && B2 == "X") || (A1 == "X" && B1 == "X"))) {
                    $('#C1').text("O");
                    turn = 0;
        }
                    else{
                    if (C2 == "" && ((C3 == "X" && C1 == "X") || (A2 == "X" && B2 == "X"))) {
                        $('#C2').text("O");
                        turn = 0;
        }
                        else{
                        if (B1 == "" && ((B3 == "X" && B2 == "X") || (A1 == "X" && C1 == "X"))) {
                            $('#B1').text("O");
                            turn = 0;
        }
                            else{
                            if (B3 == "" && ((A3 == "X" && C3 == "X") || (B2 == "X" && B1 == "X"))) {
                                $('#B3').text("O");
                                turn = 0;
        }
                                else{
                                if (B2 == "" && ((A3 == "X" && C1 == "X") || (C3 == "X" && A1 == "X") || (B3 == "X" && B1 == "X") || (C2 == "X" && A2 == "X"))) {
                                    $('#B2').text("O");
                                    turn = 0;
        }
                                   else{ // IF NO OPP TO BLOCK A WIN, THEN PLAY IN ONE OF THESE SQUARES
                                    if (B2 == "") {
                                        $('#B2').text("O");
                                        turn = 0;
                                       
                                    }
                                        else{
                                        if (A1 == "") {
                                            $('#A1').text("O");
                                            turn = 0;
                                            
                                    }
                                            else{
                                            if (C3 == "") {
                                            $('#C3').text("O");
                                            turn = 0;
                                          
                                    } 
                                                else {
                                                if (C2 == "") {
                                            $('#C2').text("O");
                                            turn = 0;
                                          
                                    }
                                                    else{
                                                    if (B1 == "") {
                                            $('#B1').text("O");
                                            turn = 0;
                                          
                                    }
                                                    }
                                                }
                                            }
                                   
                                    
                                        }
                                   }
                                }
                            }
                        }
                    }
                }
            }
        }
    }   
};

