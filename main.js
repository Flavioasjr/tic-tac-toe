function winnerOfGamer(winner, player1, player2) {
    if (winner === 'X') return player1;

    if (winner === 'O') return player2;

    return false;
}

class Player {
    constructor(name) {
        this.name = name;
    }

    set namePlayer(_name) {
        this.name = _name;
    }
}

function setPlayer(player, gameOver = false) {
    const playing = document.querySelector('.playing');

    if (gameOver) {
        playing.textContent = `${gameOver} winner`;
        return;
    }

    if (player === 'DRAW') {
        playing.textContent = player;
        return;
    }

    playing.textContent = `${player} to move`;
}

function showGameBoard() {
    const form = document.querySelector('.form');
    const table = document.querySelector('.table');
    const btnRestart = document.querySelector('.btn-restart');
    const title = document.querySelector('.title');
    const background = document.querySelector('.background');

    form.classList.add('form-display');
    table.classList.add('table-display');
    btnRestart.classList.add('btn-restart-display');
    title.classList.add('title-table');
    background.classList.add('background-display');
}

function resetGame() {
    const cells = document.querySelectorAll('.cell');

    for (let cell of cells) {
        cell.textContent = '';
    }
}

function compareGameBoard(valueBoardGame) {
    let invertedValueBoardGame = new Array(3);
    let arrayMainDiagonal = new Array(3);
    let arraySecondaryDiagonal = new Array(3);
    let auxArray = 2;

    for (let i = 0; i < 3; i++) {
        invertedValueBoardGame[i] = new Array(3);
    }

    for (let i = 0; i < valueBoardGame.length; i++) {
        arrayMainDiagonal[i] = valueBoardGame[i][i];
        arraySecondaryDiagonal[i] = valueBoardGame[i][auxArray];
        auxArray--; 
        for (let j = 0; j < valueBoardGame[i].length; j++) {
            if (!valueBoardGame[i][j]) valueBoardGame[i][j] = 'vazio';
            invertedValueBoardGame[j][i] = valueBoardGame[i][j];
        }
    }

    for (let i = 0; i < valueBoardGame.length; i++) {
        const compareRows = valueBoardGame[i].reduce((previousValue, currentValue) => {
            if (previousValue === 'vazio') return false;

            if (previousValue === currentValue) {
                return previousValue;
            } else return false;
        });
        if (compareRows) return compareRows;

        const compareColumn = invertedValueBoardGame[i].reduce((previousValue, currentValue) => {
            if (previousValue === 'vazio') return false;

            if (previousValue === currentValue) {
                return previousValue;
            } else return false;
        });
        if (compareColumn) return compareColumn;
        
        const compareDiagonal = arrayMainDiagonal.reduce((previousValue, currentValue) => {
                if (previousValue === 'vazio') return false;
        
                if (previousValue === currentValue) {
                    return previousValue;
                } else return false;

        });
        if (compareDiagonal) return compareDiagonal;

        const compareSecondaryDiagonal = arraySecondaryDiagonal.reduce((previousValue, currentValue) => {
            if (previousValue === 'vazio') return false;
    
            if (previousValue === currentValue) {
                return previousValue;
            } else return false;

    });
    if (compareSecondaryDiagonal) return compareSecondaryDiagonal;

    }
}

const displayController = (() => {
    const btnPlay = document.querySelector('.btn-play');
    const btnRestart = document.querySelector('.btn-restart');
    const cells = document.querySelectorAll('.cell');
    const inputPlayer1 = document.querySelector('#player1');
    const inputPlayer2 = document.querySelector('#player2');
    let valueBoardGame = new Array(3);
    let player1;
    let player2;
    let gameOver = false;
    let displayValue = 'X';
    let boardCounter = 0;

    for (let i = 0; i < 3; i++) {
        valueBoardGame[i] = new Array(3);
    }

    btnPlay.addEventListener('click', e => {
        e.preventDefault();

        showGameBoard();

        player1 = new Player(inputPlayer1.value);
        player2 = new Player(inputPlayer2.value);
        if (!player1.name) player1.namePlayer = 'Player1';
        if (!player2.name) player2.namePlayer = 'Player2';
        setPlayer(player1.name);
    });

    btnRestart.addEventListener('click', e => {
        resetGame();

        gameOver = false;
        if (boardCounter % 2 === 0) {
            if (displayValue === 'X') {
                displayValue = '0';
                setPlayer(player2.name);
            } else {
                displayValue = 'X';
                setPlayer(player1.name);
            }
        } else {
            if (displayValue === 'X') setPlayer(player1.name);
            if (displayValue === '0') setPlayer(player2.name);
        }

        boardCounter = 0;
        
        for (let i in valueBoardGame) {
            for(let j in valueBoardGame[i]) {
                valueBoardGame[i][j] = '';
            }
        }
    });

    for (let cell of cells) {
        cell.addEventListener('click', e => {
            if (e.target.className !== 'cell') return;
            if (cell.textContent) return;
            if (gameOver) return;

            boardCounter++;

            if (displayValue === 'X') {
                setPlayer(player2.name);
                valueBoardGame[Number(e.target.attributes['2'].value)][Number(e.target.attributes['3'].value)] = 'X'
            }

            if (displayValue === '0') {
                setPlayer(player1.name);
                valueBoardGame[Number(e.target.attributes['2'].value)][Number(e.target.attributes['3'].value)] = 'O'
            }

            const winner = compareGameBoard(valueBoardGame);
            gameOver = winnerOfGamer(winner, player1.name, player2.name);

            if (gameOver) setPlayer('', gameOver); 

            if ((boardCounter=== 9) && !gameOver) {
                setPlayer('DRAW');
            }

            cell.textContent = displayValue;
            if (displayValue === 'X') {
                displayValue = '0';
            } else displayValue = 'X';
        });
    }
})();