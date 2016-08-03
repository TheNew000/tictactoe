var board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
var myMove = false;
var numNodes = 0;
var bools;

$(document).ready(function() {
    $(".box").click(function() {
        var cell = $(this).attr("id");
        var row = parseInt(cell[cell.length - 2]);
        var col = parseInt(cell[cell.length - 1]);
        if (!myMove) {
            board[row][col] = false;
            myMove = true;
            updateMove();
            makeMove();
        }
    });
    $("#restart").click(restartGame);
});

if (myMove) {
    makeMove();
}

function updateMove() {
    updateCells();
    var winner = getWinner(board);

    if(winner == 1){
        $("#winner").text("Computer Won!");
    }else if(winner == 0){
        $("#winner").text("You Won!");
    }else if(winner == -1){
        $("#winner").text("Tie!");
    }else{
        $("#winner").text("");
    }
    if(myMove){
        $("#move").text("Computer's Move");
    }else{
        $("#move").text("Your Move!");
    }
}

function getWinner(board) {
    // Check if someone won
    bools = [true, false];
    var allCellsNull = true;
    for (var k = 0; k < bools.length; k++) {
        var value = bools[k];
        
        // Check rows, columns, and diagonals
        var diagonalComplete1 = true;
        var diagonalComplete2 = true;
        for (var i = 0; i < 3; i++) {
            if (board[i][i] != value) {
                diagonalComplete1 = false;
            }
            if (board[2 - i][i] != value) {
                diagonalComplete2 = false;
            }
            var rowComplete = true;
            var colComplete = true;
            for (var j = 0; j < 3; j++) {
                if (board[i][j] != value) {
                    rowComplete = false;
                }
                if (board[j][i] != value) {
                    colComplete = false;
                }
                if (board[i][j] == null) {
                    allCellsNull = false;
                }
            }
            if (rowComplete || colComplete) {
                return value ? 1 : 0;
            }
        }
        if (diagonalComplete1 || diagonalComplete2) {
            return value ? 1 : 0;
        }
    }
    if (allCellsNull) {
        return -1;
    }
    return null;
}
    
function updateCells() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            console.dir("#cell-" + i + "" + j);
            if(board[i][j] == false){
                $("#cell-" + i + "" + j).text("X");
            }else if(board[i][j] == true){
                $("#cell-" + i + "" + j).text("O");
            }else{
                $("#cell-" + i + "" + j).text("");
            }
        }
    }
}

function makeMove() {
    board = minimaxMove(board);
    myMove = false;
    updateMove();
}

function minimaxMove(board) {
    numNodes = 0;
    return miniMax(board, true)[1];
}

function miniMax(board, player) {
    numNodes++;
    var winner = getWinner(board);
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
    myMove = false;
    updateMove();
}


updateMove();
