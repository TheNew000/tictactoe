var board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
var playerMove = false;
var numNodes = 0;
var booleans;

$(document).ready(function() {
    $(".box").click(function() {
        var cell = $(this).attr("id");
        var row = parseInt(cell[cell.length - 2]);
        var col = parseInt(cell[cell.length - 1]);
        if (!playerMove) {
            board[row][col] = false;
            playerMove = true;
            gameStatus();
            markBoard();
        }
    });
    $("#restart").click(restartGame);
});

if (playerMove) {
    markBoard();
}

function gameStatus() {
    updateCells();
    var winner = check4Winner(board);

    if(winner == 1){
        $("#winner").text("Computer Won!");
    }else if(winner == 0){
        $("#winner").text("You Won!");
    }else if(winner == -1){
        $("#winner").text("Tie!");
    }else{
        $("#winner").text("");
    }
    if(playerMove){
        $("#move").text("Computer's Move");
    }else{
        $("#move").text("Your Move!");
    }
}

// Check to see if game is over
function check4Winner(board) {
    booleans = [true, false];
    var nullCells = true;
    for (var i = 0; i < booleans.length; i++) {
        var value = booleans[i];
        
        // Check if winning combo is completed across diagonal, row, or columns (i.e. !null)
        var diagonalComplete1 = true;
        var diagonalComplete2 = true;
        for (var j = 0; j < 3; j++) {
            if (board[j][j] != value) {
                diagonalComplete1 = false;
            }
            if (board[2 - j][j] != value) {
                diagonalComplete2 = false;
            }
            var completeRow = true;
            var completeCol = true;
            for (var k = 0; k < 3; k++) {
                if (board[j][k] != value) {
                    completeRow = false;
                }
                if (board[k][j] != value) {
                    completeCol = false;
                }
                if (board[j][k] == null) {
                    nullCells = false;
                }
            }
            if (completeRow || completeCol) {
                return value ? 1 : 0;
            }
        }
        if (diagonalComplete1 || diagonalComplete2) {
            return value ? 1 : 0;
        }
    }
    if (nullCells) {
        return -1;
    }
    return null;
}
    
function updateCells() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            console.dir("#box" + i + "" + j);
            if(board[i][j] == false){
                $("#box" + i + "" + j).text("X");
            }else if(board[i][j] == true){
                $("#box" + i + "" + j).text("O");
            }else{
                $("#box" + i + "" + j).text("");
            }
        }
    }
}

function markBoard() {
    board = compMove(board);
    playerMove = false;
    gameStatus();
}

function compMove(board) {
    numNodes = 0;
    return miniMax(board, true)[1];
}


function miniMax(board, player) {
    numNodes++;
    var winner = check4Winner(board);
    if (winner != null) {
        switch(winner) {
            case 1:
                // Computer wins
                return [1, board]
            case 0:
                // You win
                return [-1, board]
            case -1:
                // Tie
                return [0, board];
        }
    } else {
        // Next states
        var nextVal = null;
        var nextBoard = null;
        
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] == null) {
                    board[i][j] = player;
                    var value = miniMax(board, !player)[0];
                    if ((player && (nextVal == null || value > nextVal)) || (!player && (nextVal == null || value < nextVal))) {
                        nextBoard = board.map(function(arr) {
                            return arr.slice();
                        });
                        nextVal = value;
                    }
                    board[i][j] = null;
                }
            }
        }
        return [nextVal, nextBoard];
    }
}


function restartGame() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    playerMove = false;
    gameStatus();
}


gameStatus();
