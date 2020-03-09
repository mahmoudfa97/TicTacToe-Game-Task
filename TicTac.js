class TicTac {
    constructor() {
        this.gameState = ["", "", "", "", "", "", "", "", ""];
        this.gameActive = true;
        this.currentPlayer = "X";
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.init();
    }

    init = () => {
        const gameStatus = document.createElement("h2");
        const gameContainer = document.createElement("div");
        gameContainer.classList.add('game--container');
        const restBtn = document.createElement("button")
        //creattion of x o cells.
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute('index', i)
            gameContainer.appendChild(cell);
        }
        //append all created elements to dom
        document.querySelector('section').appendChild(gameContainer)
        document.querySelector('section').appendChild(gameStatus)
        document.querySelector('section').appendChild(restBtn)
        restBtn.innerText = 'RESET'

        gameStatus.innerHTML = this.currentPlayerTurn();

        //event listeners
        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', this.handleCellClick));
        restBtn.addEventListener('click', this.handleRestartGame);
    }

    handleRestartGame = () => {
        this.gameActive = true;
        this.currentPlayer = "X";
        this.gameState = ["", "", "", "", "", "", "", "", ""];
        document.querySelector('h2').innerHTML = this.currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    }

    handlePlayerChange = () => {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        document.querySelector('h2').innerHTML = this.currentPlayerTurn();
    }

    handleCellPlayed = (clickedCell, clickedCellIndex) => {
        this.gameState[clickedCellIndex] = this.currentPlayer;
        clickedCell.innerHTML = this.currentPlayer;
    }

    winningMessage = () => `Player ${this.currentPlayer} has won!`;

    drawMessage = () => `Game ended in a draw!`;

    currentPlayerTurn = () => `It's ${this.currentPlayer}'s turn`;

    handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = this.winningConditions[i];
            const a = this.gameState[winCondition[0]];
            const b = this.gameState[winCondition[1]];
            const c = this.gameState[winCondition[2]];
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
            this.gameActive = false;
            return;
        }

        let roundDraw = !(this.gameState.includes(""));
        if (roundDraw) {
            document.querySelector('h2').innerHTML = this.drawMessage();
            this.gameActive = false;
            return;
        }

        this.handlePlayerChange();
    }

    handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('index'));

        if ((this.gameState[clickedCellIndex] !== "") || !(this.gameActive)) {
            return;
        }

        this.handleCellPlayed(clickedCell, clickedCellIndex);
        this.handleResultValidation();
    }
}

new TicTac();