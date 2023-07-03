const colors = ['/img/1.png', '/img/2.png', '/img/3.png', '/img/4.png', '/img/5.png', '/img/6.png', '/img/7.png', '/img/8.png', '/img/9.png', '/img/10.png', '/img/11.png', '/img/12.png', '/img/13.png', '/img/14.png', '/img/15.png', '/img/16.png', '/img/17.png', '/img/18.png', '/img/18.png', '/img/20.png', '/img/21.png', '/img/22.png', '/img/23.png', '/img/25.png', '/img/25.png', '/img/26.png', '/img/27.png', '/img/28.png', '/img/29.png'];

//Функция для генерации случайного числа в заданном диапазоне
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = getRandomInt(0, i);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Генерация случайных цветов
function generateColors() {
    return shuffleArray(colors).slice();
}

// Генерация случайного цвета без перемешивания массива
function getRandomColor() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function startNewGame(level) {
    if (level == null) {
        level = 1
    }
    let squareGame = new SquareGame(level, ".simpleGameApp");
    squareGame.start();
}

class SquareGame {
    // Функция-конструктор
    // Запускается один раз, но каждый раз когда мы создаём новую игру (через слвоо нью)
    constructor(level, parentSelector) {
        this.gameDifficulty = level;
        this.width = (this.gameDifficulty + 2) * 100 + 'px';
        this.parentDiv = document.querySelector(parentSelector);
        this.userMovemantColors = [];
        this.sqaureWrapper = this.parentDiv.querySelector('.squareWrapper');
        this.sqaureWrapper.addEventListener('click', this.checkSameColors.bind(this));
        this.repeatedColor;
        this.levelSelector = this.parentDiv.querySelector('select');
        this.levelSelector.addEventListener('change', this.setDifficultyLevel.bind(this));
        this.timerElement = document.getElementById("timer");
        this.timerInterval = null;
        this.timeLeft = 3;
        // document.getElementById("output2").textContent = this.gameDifficulty;

    }


    //запуск игры по нажатию кнопки
    start() {
        const startButton = document.getElementById("start-button");
        startButton.addEventListener("click", () => {
            startButton.parentNode.removeChild(startButton);
            this.startNewLevel();
        });
    }


//таймер чтобы пользователь не кликал раньше времени
    startTimer() {
        this.timeLeft = 3;
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.timerElement.textContent = this.timeLeft;

            if (this.timeLeft < 1) {
                clearInterval(this.timerInterval);
                this.timerElement.textContent = "Go!";
                const color = document.querySelector('.circle');
                color.style.backgroundColor = '#f9474b';
                this.startNewGame();
                this.hideColors();
            }
        }, 1000);

        // Блокируем все клики на странице
        document.documentElement.style.pointerEvents = "none";
    }

//разблокируем клики
    startNewGame() {
        document.documentElement.style.pointerEvents = "auto";
    }

    //start new game level
    startNewLevel() {
        this.repeatedColor = getRandomColor();
        this.userMovemantColors = [];
        this.cleanDiv();
        this.numberOfSquares = (this.gameDifficulty + 1) * (this.gameDifficulty + 1);
        this.width = (this.gameDifficulty + 2) * 100 + 'px';
        this.sqaureWrapper.style.width = this.width;
        this.generateSquares();
        this.startTimer();
        this.userLife = 2;
        document.getElementById("output").textContent = this.userLife;
        console.log(this.gameDifficulty)
    }

    nextLevel() {
        this.changeDifficultyLevel('next');
        this.startNewLevel();
    }

    prevLevel() {
        this.changeDifficultyLevel('prev');
        this.startNewLevel();
    }

    changeDifficultyLevel(direction) {
        if (direction === 'next' && this.gameDifficulty <= 2) {
            this.gameDifficulty++;
            console.log(this.gameDifficulty)
        }
        else if(direction === 'next' && this.gameDifficulty === 3){
            console.log('you win');
            startNewGame()
        }
        else if (direction === 'prev' && this.gameDifficulty >= 2) {
            this.gameDifficulty--;
        }
    }


    // Генерация цветов
    generateSquares() {
        let randomColors = generateColors();
        let repeatedColor = this.repeatedColor;
        // Взять искомый цвет, найти его в массиве "случайных цветов" и убрать оттуда
        //генерация квадратов одинакового цвета
        let repeatedColorIndex = randomColors.indexOf(repeatedColor);
        randomColors.splice(repeatedColorIndex, 1);


        for (let i = 0; i < this.gameDifficulty + 1; i++) {
            let square = document.createElement("div");
            square.className = "square";
            square.style.backgroundImage = `url(${repeatedColor})`;
            square.style.order = Math.floor(Math.random() * this.numberOfSquares);
            this.sqaureWrapper.appendChild(square);
        }

        // генерация квадратов разных цветов
        for (let i = this.gameDifficulty + 1; i < this.numberOfSquares; i++) {
            let square = document.createElement("div");
            square.className = "square";
            square.style.backgroundImage = `url(${randomColors[i]})`;
            square.style.order = Math.floor(Math.random() * this.numberOfSquares);
            this.sqaureWrapper.appendChild(square);
        }
    }

    //окрашивание квадратов в один свет
    hideColors() {
        const allSquares = this.sqaureWrapper.querySelectorAll('.square');
        setTimeout(() => {
            for (let i = 0; i < allSquares.length; i++) {
                allSquares[i].classList.add("grey");
            }

        }, 1000);
    }


    //чистим прежнюю игру
    cleanDiv() {
        this.sqaureWrapper.innerHTML = "";
    }


    // Выбор сложности
    setDifficultyLevel() {
        if (this.levelSelector.value === "1") {
            this.gameDifficulty = 1;
        }
        if (this.levelSelector.value === "2") {
            this.gameDifficulty = 2;
        } else if (this.levelSelector.value === "3") {
            this.gameDifficulty = 3;
        }
        this.startNewLevel();

    };

//переход на следующий уровень
    checkSameColors(event) {
        let repeatedColor = this.repeatedColor;
        const target = event.target;
        target.classList.remove('grey');
        let currentColor = target.style.backgroundImage.toString();
        let string = target.style.backgroundImage;
        let cardName = string.substring(string.indexOf('/'), string.lastIndexOf('"'));

        if (repeatedColor === cardName) {
            this.userMovemantColors.push(currentColor);
            if (this.userMovemantColors.length === this.gameDifficulty + 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'победа',
                    text: 'переходим к следующему уровню',
                }).then(() => {
                    this.nextLevel();
                })

            }
        } else {
            if (this.userLife > 0) {
                this.userLife -= 1;
                document.getElementById("output").textContent = this.userLife;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'неудача',
                    text: 'попробуй еще раз',
                }).then(() => {
                    this.prevLevel();
                })
            }
        }

    }
}


const squareWrapper = document.querySelector('.squareWrapper');
const buttonStart = document.querySelector('.start-button');
const audioSquare = new Audio('/audio/click.ogg');
const audioButtonStart = new Audio('/audio/songscard.mp3');

// Функция для воспроизведения звука при клике
function playClickSound(song) {
    song.currentTime = 0;
    song.play();
}

squareWrapper.addEventListener('click', () => playClickSound(audioSquare));
buttonStart.addEventListener('click', () => playClickSound(audioButtonStart));

startNewGame()

