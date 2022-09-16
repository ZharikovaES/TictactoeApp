const tictactoe = document.querySelector('#tictactoe');
const tictactoeCell = document.querySelectorAll('.tictactoe__cell');
const score = document.querySelector('#score');
const player = document.querySelector('#player');
const line = document.querySelector('.tictactoe-line');

// все возможные выигрышные комбинации на игровой сетке
const winnings = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let playerNow = 'X';

// класс игрока
class Player {
    moves = new Array();
    score = 0;

    clearAll() {
        this.clearMoves();
        this.score = 0;
    };
    clearMoves(){
        this.moves.length = 0;
    };
    addMove(move) {
        this.moves.push(move);
    };
    sortMoves() {
        this.moves.sort(function(a, b){
            return b - a;
        });
    };

    // проверка на наличие выигрышной комбинации
    checkField(){
        this.sortMoves();
        for (let i = 0; i < this.moves.length; i++) {
            for (let j = 0; j < this.moves.length && i !== j; j++) {
                for (let k = 0; k < this.moves.length && i !== k && j !== k; k++) {
                    for (let m = 0; m < winnings.length; m++) {
                        if (this.moves[i] === winnings[m][0] && this.moves[j] === winnings[m][1] && this.moves[k] === winnings[m][2]) {
                            this.createLine(this.moves[i], this.moves[j], this.moves[k]);
                            this.score++;
                            score.innerText = `${x.score} : ${o.score}`;
                            clearField();
                            return true;            
                        }
                    }
                }        
            }
        }
        return false;
    };

    // отображение линии, перечеркивающей выигрышную комбинацию крестиков или кружков
    createLine(...profit) {
            if (profit[1] === 4) {
                switch (profit[0]) {
                    case 0:
                        line.style.transform = 'rotate(45deg) translate(-50%, -50%)';
                        line.style.top = '100%';
                        line.style.left = '28%';
                        line.style.width = Math.sqrt(tictactoe.offsetWidth ** 2 + tictactoe.offsetHeight ** 2) + 'px';        
                        break;
                    case 1:
                        line.style.transform = 'rotate(90deg)';
                        line.style.top = '48%';
                        line.style.left = '0%';
                        line.style.width = tictactoe.offsetHeight + 'px';        
                        break;
                    case 2:
                        line.style.transform = 'rotate(-45deg) translate(-50%, -50%)';
                        line.style.top = '0%';
                        line.style.left = '30%';
                        line.style.width = Math.sqrt(tictactoe.offsetWidth ** 2 + tictactoe.offsetHeight ** 2) + 'px';        
                        break;
                    case 3:
                        line.style.transform = 'translate(0%, -50%)';
                        line.style.top = '50%';
                        line.style.left = '0%';
                        line.style.width = tictactoe.offsetWidth + 'px';        
                        break;
                }
                line.style.display = 'block';
            }
            else if (profit[1] % 2 === 1) {
                switch (profit[1]) {
                    case 1:
                        line.style.transform = 'translate(0%, -50%)';
                        line.style.top = 'calc(100% / 6)';
                        line.style.left = '0%';
                        line.style.width = tictactoe.offsetWidth + 'px';
                        break;
                    case 3:
                        line.style.transform = 'translate(0%, -50%) rotate(90deg)';
                        line.style.top = '50%';
                        line.style.left = '-34%';
                        line.style.width = tictactoe.offsetHeight + 'px';
                        break;
                    case 5:
                        line.style.transform = 'translate(0%, -50%) rotate(90deg)';
                        line.style.top = '50%';
                        line.style.left = '34%';
                        line.style.width = tictactoe.offsetHeight + 'px';
                        break;
                    case 7:
                        line.style.transform = 'translate(0%, -50%)';
                        line.style.top = 'calc(100% * 5 / 6)';
                        line.style.left = '0%';
                        line.style.width = tictactoe.offsetWidth + 'px';
                        break;
                }
                line.style.display = 'block';
            }
    };
}

const x = new Player();
const o = new Player();

tictactoeCell.forEach((el, index) => {
    el.style.height = el.offsetWidth + 'px';

    // функция, вызывающаяся после выбора игроком ячейки
    el.addEventListener('click', function() {
        if (this.classList.length === 1 && this.classList.contains('tictactoe__cell')) {
            if (playerNow === 'X') {
                this.classList.add('tictactoe-cross');
                x.addMove(index);
                playerNow = 'O';
                checkCountMoves(x);
            }
            else {
                this.classList.add('tictactoe-zero');
                o.addMove(index);
                playerNow = 'X';
                checkCountMoves(o);
            }
            player.innerText = playerNow;
        }
    });
});

// очистка поля после завершения игры
function clearField() {
    setTimeout(() => {
        playerNow = 'X';
        player.innerText = playerNow;
        tictactoeCell.forEach((el) => {
            el.classList.remove('tictactoe-cross');
            el.classList.remove('tictactoe-zero');
        });
        line.style.display = 'none';
        x.clearMoves();
        o.clearMoves();
    }, 1500);
}

// функция проверяет, может ли игра продолжаться: если нет, то игра начинается сначала
function checkCountMoves(player) {
    if (!player.checkField() && x.moves.length + o.moves.length === 9) {
        clearField();
    }
}
