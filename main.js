function gameBoard(positionsSelectoin) {
    let winner = false;

    const winnerOfGame = positionsSelectoin.reduce((acc, element, index, array) => {
        if (element === 0) {
            const arrayTestX = array.slice(0, array.length);
            arrayTestX.splice(index, 1);

            if ((arrayTestX.find(value => value === 1))
                && (arrayTestX.find(value => value === 2))) {
                winner = true;
            }

            if ((arrayTestX.find(value => value === 4))
                && (arrayTestX.find(value => value === 8))) {
                winner = true;
            }

            if ((arrayTestX.find(value => value === 3))
                && (arrayTestX.find(value => value === 6))) {
                winner = true;
            }
        }

        if (element === 1) {
            const arrayTestX = array.slice(0, array.length);
            arrayTestX.splice(index, 1);

            if ((arrayTestX.find(value => value === 4))
                && (arrayTestX.find(value => value === 7))) {
                winner = true;
            }
        }

        if (element === 2) {
            const arrayTestX = array.slice(0, array.length);
            arrayTestX.splice(index, 1);

            if ((arrayTestX.find(value => value === 4))
                && (arrayTestX.find(value => value === 6))) {
                winner = true;
            }

            if ((arrayTestX.find(value => value === 5))
                && (arrayTestX.find(value => value === 8))) {
                winner = true;
            }
        }

        if (element === 3) {
            const arrayTestX = array.slice(0, array.length);
            arrayTestX.splice(index, 1);

            if ((arrayTestX.find(value => value === 4))
                && (arrayTestX.find(value => value === 5))) {
                winner = true;
            }
        }

        if (element === 6) {
            const arrayTestX = array.slice(0, array.length);
            arrayTestX.splice(index, 1);

            if ((arrayTestX.find(value => value === 7))
                && (arrayTestX.find(value => value === 8))) {
                winner = true;
            }
        }
        return winner;
    }, 'valueacc');
    return winnerOfGame;
}

function winnerOfGamer(valuePositionX, valuePosition0, player1, player2) {
    const winnerX = gameBoard(valuePositionX);
    const winner0 = gameBoard(valuePosition0);

    if (winnerX) return player1;    

    if (winner0) return player2;

    return false;
}

const Player = (name) => {
    return { name };
}

const displayController = (() => {
    const container = document.querySelector('.container');
    const btnPlay = document.querySelector('.btn-play');
    const table = document.querySelector('.table');
    const btnRestart = document.querySelector('.btn-restart');
    const cells = document.querySelectorAll('.cell');
    const inputPlayer1 = document.querySelector('#player1');
    const inputPlayer2 = document.querySelector('#player2');
    const playing = document.querySelector('.playing');
    let valuePositionX = [];
    let valuePosition0 = [];
    let player1;
    let player2;
    let gameOver = false;
    let displayValue = 'X';

    btnPlay.addEventListener('click', e => {
        e.preventDefault();
        container.style.cssText += 'display: none;';
        table.style.cssText += 'display: block;';
        btnRestart.style.cssText += 'display: block;';

        player1 = Player(inputPlayer1.value);
        player2 = Player(inputPlayer2.value);
        if (!player1) player1 = 'Player1';
        if (!player2) player2 = 'Player2';
        playing.textContent = `${player1.name} to move`;
        console.log('É a vez do ', player1.name);
    });

    btnRestart.addEventListener('click', e => {
        for (let cell of cells) {
            cell.textContent = '';
        }
        gameOver = false;
        if ((valuePosition0.length + valuePositionX.length) % 2 === 0) {
            if (displayValue === 'X') {
                displayValue = '0';
                playing.textContent = `${player2.name} to move`;
                console.log('É a vez do ', player2.name);
            } else {
                displayValue = 'X';
                playing.textContent = `${player1.name} to move`;
                console.log('É a vez do ', player1.name);
            }
        }else {
            if(displayValue === 'X') playing.textContent = `${player1.name} to move`;
            if(displayValue === '0') playing.textContent = `${player2.name} to move`;
        }

        valuePositionX = [];
        valuePosition0 = [];
        
    });

    for (let cell of cells) {
        cell.addEventListener('click', e => {
            if (e.target.className !== 'cell') return;
            if (cell.textContent) return;
            if (gameOver) return;

            if (displayValue === 'X') {
                valuePositionX.push(Number(e.target.attributes['1'].value));
                playing.textContent = `${player2.name} to move`;
            }

            if (displayValue === '0') {
                valuePosition0.push(Number(e.target.attributes['1'].value));
                playing.textContent = `${player1.name} to move`;
            }

            if (valuePositionX.length >= 3 || valuePosition0.length >= 3) {
                gameOver = winnerOfGamer(valuePositionX, valuePosition0,
                    player1.name, player2.name);
            }
            if (gameOver) playing.textContent = `${gameOver} winner`;

            cell.textContent = displayValue;
            if (displayValue === 'X') {
                displayValue = '0';
            } else displayValue = 'X';
        });
    }
})();