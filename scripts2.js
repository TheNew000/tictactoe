// STATE CLASS
var State = function(old) {
    this.turn = "";
    this.movesCounter = 0;
    this.result = "still running";
    this.board = [];
    // checking to see if this is a brand new state or will we construct one off of a previous one
    if(typeof old !== "undefined") {
        // this sets the new board to the values of the one passed into the function
        var len = old.board.length;
        this.board = new Array(len);
        for(var i = 0 ; i < len ; i++) {
            this.board[i] = old.board[i];
        }
        this.movesCounter = old.movesCounter;
        this.result = old.result;
        this.turn = old.turn;
    }    
    this.advanceTurn = function() {
        this.turn = (this.turn === "X") ? "O" : "X";
    }
    this.emptyCells = function() {
        var cells = [];
        for(var l = 0; l < 9 ; l++) {
            if(this.board[l] === null) {
                cells.push(l);
            }
        }
        return cells;
    }
    // Check to see if anyone has won/ any of the diagonals/rows/columns are completed
    this.checkWinner = function() {
        var winCombo = [];
        var board = this.board;
        //check rows
        for(var i = 0; i <= 6; i = i + 3){
            if(board[i] !== null && board[i] === board[i + 1] && board[i + 1] === board[i + 2]){
                this.result = board[i] + "-won"; //update the state result
                winCombo.push(i, i+1, i+2);
                return winCombo;
            }
        }
        //check columns
        for(var i = 0; i <= 2 ; i++) {
            if(board[i] !== null && board[i] === board[i + 3] && board[i + 3] === board[i + 6]){
                this.result = board[i] + "-won"; //update the state result
                winCombo.push(i, i+3, i+6);
                return winCombo;
            }
        }
        //check diagonals
        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(board[i] !== null && board[i] == board[i + j] && board[i + j] === board[i + (2*j)]) {
                this.result = board[i] + "-won"; //update the state result
                winCombo.push(i, i+j, i+(2*j));
                return winCombo;
            }
        }
        var availableCells = this.emptyCells();
        // If there's no moves left then the game is a draw, otherwise keep playing
        if (availableCells.length == 0){
            this.result = "draw"; 
            return true;
        }else{
            return false; //update the state result
        } 
    };
}
// Computer Player Function
var CompPlayer = function(level) {
    var game = {};
    // minimax algorithm!!  Here it is folks:
    function miniMax(state) {
        // If game is finished the rest of the function doesn't need to run
        if(state.checkWinner()) {
            return Game.score(state);
        }else{
            // Depending on who is playing will depend on whether the computer is trying to minimize or maximize
            var miniMaxScore = (state.turn === "X") ? -100 : 100;
            var openCell = state.emptyCells();
            //create a "tree of possibilities" using the open cells
            var possStates = openCell.map(function(pos) {
                var action = new CompMoves(pos);
                var nextState = action.applyTo(state);
                return nextState;
            });
            // calculate the miniMaxScore for all the branches of possible states
            possStates.forEach(function(nextState) {
                var nextScore = miniMax(nextState);
                if(state.turn === 'X'){
                    if (nextScore > miniMaxScore){
                        miniMaxScore = nextScore;
                    } 
                }else{
                    if(nextScore < miniMaxScore){
                        miniMaxScore = nextScore
                    } 
                }
            });
            return miniMaxScore;
        }
    }

    this.plays = function(_game){
        game = _game;
    };

    this.compDifficulty = (turn) => {
        var availCells = game.currentState.emptyCells();
        if(level == 'blind'){
            var cellRandom = availCells[Math.floor(Math.random() * availCells.length)];
            var possMove = new CompMoves(cellRandom);
            var nextState = possMove.applyTo(game.currentState);
            ui.insertAt(cellRandom, turn);
            game.advanceTo(nextState);
        }else if(level == 'master' || level == 'novice'){
            //calculate the score for all the possible branch possibilities
            var availActions = availCells.map(function(pos) {
                //create the object for the next move
                var possMove =  new CompMoves(pos); 
                //get next state by applying the possMove
                var nextState = possMove.applyTo(game.currentState); 
                //calculate and set the possMove minmax value
                possMove.miniMaxScore = miniMax(nextState); 
                return possMove;
            });
            //sort the possible Moves list by score if it's the human players turn then sort the actions in a descending manner to have the possible Move with maximum miniMax value first otherwise sort in an ascending manner to have the poss move with minimum miniMax value first
            var upOrDown = (turn === "X") ? CompMoves.descend : CompMoves.ascend;
            availActions.sort(upOrDown);
            // either choose the possibility for a randomly less optimal position for the novice or the most optimal position for the master
            if(level == 'novice'){
                var chosenMove = Math.random()*100 <= 40 ? availActions[0] : (availActions.length >= 2 ? availActions[1] : availActions[0]);
            }else{  
                var chosenMove = availActions[0];
            }
            var nextMove = chosenMove.applyTo(game.currentState);
            // Physically mark the chosen cell 
            ui.insertAt(chosenMove.markCell, turn);
            game.advanceTo(nextMove);
        }
    }
};

var CompMoves = function(cell) {
    // the cell to be marked
    this.markCell = cell;
    // the value of the state that the marked cell could lead to
    this.miniMaxScore = 0;
    // starts creating the "tree" of states to see into the depth of possibilities
    this.applyTo = function(state) {
        var next = new State(state);
        //mark the cell with the appropriate letter
        next.board[this.markCell] = state.turn;
        if (state.turn === "O"){
            next.movesCounter++;
        }
        next.advanceTurn();
        return next;
    }
};

// sorts possible comp moves in ascending order returns integer
CompMoves.ascend = (firstAction, secondAction) => {
    if(firstAction.miniMaxScore < secondAction.miniMaxScore)
        return -1; //indicates that firstAction goes before secondAction
    else if(firstAction.miniMaxScore > secondAction.miniMaxScore)
        return 1; //indicates that secondAction goes before firstAction
    else
        return 0; //indicates a tie
}
// sorts possible comp moves in descending order returns integer
CompMoves.descend = (firstAction, secondAction) => {
    if(firstAction.miniMaxScore > secondAction.miniMaxScore)
        return -1; //indicates that firstAction goes before secondAction
    else if(firstAction.miniMaxScore < secondAction.miniMaxScore)
        return 1; //indicates that secondAction goes before firstAction
    else
        return 0; //indicates a tie
}

// creates a "game object"
var Game = function(CompPlayer) {
    // initialize computer Player
    this.comp = CompPlayer;
    // initialize the state of the board as it stands
    this.currentState = new State();
    //null stands for empty board cell
    this.currentState.board = [null, null, null,
                               null, null, null,
                               null, null, null];
    this.currentState.turn = "X"; //X plays first
    // initialize status to the beginning of the game
    this.status = "beginning";
    // advances the game to the next "state"
    this.advanceTo = function(_state) {
        this.currentState = _state;
        if(_state.checkWinner()) {
            this.status = "ended";
            var array = _state.checkWinner();
            if(_state.result === "X-won"){
                for (var i = 0; i < array.length; i++) {
                    $('#' + array[i]).addClass('winner');
                }
                ui.switchViewTo("won");
            }else if(_state.result === "O-won"){
                for (var i = 0; i < array.length; i++) {
                    $('#' + array[i]).addClass('winner');
                }
                ui.switchViewTo("lost");
            }else{
                ui.switchViewTo("draw");
            }
            
            ui.markWinCells = function (a, b, c) {
                var board = $('.cell');
                $(board[a]).addClass('winner');
                $(board[b]).addClass('winner');
                $(board[c]).addClass('winner');
            }
        }else{
            //the game is still running
            if(this.currentState.turn === "X") {
                ui.switchViewTo("human");
            }else{
                ui.switchViewTo("comp");
                //computer turn
                this.comp.compDifficulty("O");
            }
        }
    };
    // begins the game
    this.start = function() {
        if(this.status = "beginning") {
            //invoke advanceTo with the intial state
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }
};

Game.score = function(_state) {
    if(_state.result === "X-won"){
        // the human player won with "n" amount of moves
        return 10 - _state.movesCounter;
    }
    else if(_state.result === "O-won") {
        //the computer won with "n" amount of moves
        return _state.movesCounter - 10;
    }
    else {
        //it's a draw
        return 0;
    }
}

var globals = {};

$(".level").each(function() {
    var $this = $(this);
    $this.click(function() {
        $('.selected').toggleClass('not-selected');
        $('.selected').toggleClass('selected');
        $this.toggleClass('not-selected');
        $this.toggleClass('selected');
        CompPlayer.level = $this.attr("id");
    });
});

// Grabs the difficultyLevel selected and prepares the conditions for the beginning of the game
$(".start").click(function() {
    var diffLevel = $('.selected').attr("id");
    if(typeof diffLevel !== "undefined") {
        var aiPlayer = new CompPlayer(diffLevel);
        globals.game = new Game(aiPlayer);
        aiPlayer.plays(globals.game);
        globals.game.start();
    }else{
        alert('Please Pick a Skill Level for the AI');
    }
});

$(".cell").each(function() {
    var $this = $(this);
    $this.click(function() {
        if(globals.game === undefined){
            alert('Please Pick a Skill Level for the AI');
        }else if(globals.game.status === "running" && globals.game.currentState.turn === "X" && !$this.hasClass('occupied')){
            var cell = parseInt($this.attr('id'));
            var nextState = new State(globals.game.currentState);
            nextState.board[cell] = "X";
            ui.insertAt(cell, "X");
            nextState.advanceTurn();
            globals.game.advanceTo(nextState);
        }
     });
});

var ui = {};
//holds the state of the intial controls visibility
ui.intialControlsVisible = true;
//holds the current visible view
ui.currentView = "";
/*
 * starts the flickering effect of the robot image
 */
ui.startRobotFlickering = function() {
    ui.robotFlickeringHandle = setInterval(function() {
        $("#robot").toggleClass('robot');
    }, 500);
};


// Switches the notifications at the bottom of the page
ui.switchViewTo = function(turn) {
    //helper function for async calling
    function _switch(_turn) {
        ui.currentView = "#" + _turn;
        $(ui.currentView).fadeIn("fast");
        ui.startRobotFlickering();
    }
    if(ui.intialControlsVisible){
        //if the game is just starting
        ui.intialControlsVisible = false;
        $('.intial').fadeOut({
            duration : "slow",
            done : function() {
                _switch(turn);
            }
        });
    }else{
        //if the game is in an intermediate state
        $(ui.currentView).fadeOut({
            duration: "fast",
            done: function() {
                _switch(turn);
            }
        });
    }
};

// actually marks the board with either an "X" or "O"
ui.insertAt = function(indx, symbol) {
    var board = $('.cell');
    var targetCell = $(board[indx]);
    if(!targetCell.hasClass('occupied')) {
        targetCell.html(symbol);
        targetCell.css({
            color : symbol == "X" ? "rgb(135,250,179)" : "rgb(250,135,206)"
        });
        targetCell.addClass('occupied');
    }
}
