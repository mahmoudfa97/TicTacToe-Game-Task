const ticTacToe = {
    self:this,
    gameState : ["", "", "", "", "", "", "", "", ""],
    gameActive : true,
    currentPlayer : "X",
    init: ()=>{
        var gameStatus = document.createElement("h2");
        var gameContainer = document.createElement("div");
        gameContainer.classList.add('game--container');
        var restBtn = document.createElement("button")
        //creattion of x o cells.
        for (var i = 0; i < 9 ; i++) {
            var cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute('index', i)
            gameContainer.appendChild(cell);
        }
        //append all created elements to dom
        document.querySelector('section').appendChild(gameContainer)
        document.querySelector('section').appendChild(gameStatus)
        document.querySelector('section').appendChild(restBtn)
        restBtn.innerText = 'RESET'
        
        gameStatus.innerHTML = self.currentPlayerTurn();

        //event listeners
        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', self.handleCellClick));
        restBtn.addEventListener('click', self.handleRestartGame);
    },
    winningConditions: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    handleRestartGame : ()=>{
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        document.querySelector('h2').innerHTML = this.currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    },
    handlePlayerChange: () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.querySelector('h2').innerHTML = this.currentPlayerTurn();
    },
    handleCellPlayed: (clickedCell, clickedCellIndex)=>{
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    },
    winningMessage: () => `Player ${currentPlayer} has won!`,
    drawMessage: () => `Game ended in a draw!`,
    currentPlayerTurn: () => `It's ${currentPlayer}'s turn`,
    handleResultValidation: () => {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }

        if (roundWon) {
            document.querySelector('h2').innerHTML = this.winningMessage();
            gameActive = false;
            return;
        }

        let roundDraw = !(gameState.includes(""));
        if (roundDraw) {
            document.querySelector('h2').innerHTML = this.drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange();
    },
    handleCellClick:  (clickedCellEvent)=>{
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('index'));

        if ((gameState[clickedCellIndex] !== "") || !(gameActive)) {
            return;
        }

        this.handleCellPlayed(clickedCell, clickedCellIndex);
        this.handleResultValidation();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ticTacToe.init()
})

