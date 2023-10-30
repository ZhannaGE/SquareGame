const colors = ['../img/1.png', '../img/2.png', '../img/3.png', '../img/4.png', '../img/5.png', '../img/6.png', '../img/7.png', '../img/8.png', '../img/9.png', '../img/10.png', '../img/11.png', '../img/12.png', '../img/13.png', '../img/14.png', '../img/15.png', '../img/16.png', '../img/17.png', '../img/18.png', '../img/18.png', '../img/20.png', '../img/21.png', '../img/22.png', '../img/23.png', '../img/25.png', '../img/25.png', '../img/26.png', '../img/27.png', '../img/28.png', '../img/29.png'];

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

class SquareGame {
    MAX_LEVEL = 3;
    timeLeft = 3;

    // Функция-конструктор
    // Запускается один раз, но каждый раз когда мы создаём новую игру (через слвоо нью)
    constructor(level, parentSelector) {
        this.gameState = {
            gameDifficulty: level,
            fadeTime: 2,
        };
        // this.gameState.gameDifficulty = level;
        this.width = (this.gameState.gameDifficulty + 2) * 100 + 'px';
        this.parentDiv = document.querySelector(parentSelector);
        this.userMovemantColors = [];
        this.sqaureWrapper = this.parentDiv.querySelector('.squareWrapper');
        this.sqaureWrapper.addEventListener('click', this.checkSameColors.bind(this));
        this.repeatedColor;
        this.timerElement = document.getElementById("timer");
        this.timerInterval = null;
        //console.log(this.gameState)
    }


    //запуск игры по нажатию кнопки
    start() {
        const startButton = document.getElementById("start-button");
        startButton.addEventListener("click", () => {
            startButton.parentNode.removeChild(startButton);

            /*
            if(true) {
                console.log('Проверить есть ли стейт в куки, и если есть то загрузить и применить уго к стейту приложения');
                this.loadStateFromCookies()
            }


             */
            this.startNewLevel();
        });
    }


//таймер чтобы пользователь не кликал раньше времени
    startTimer() {
        // this.timeLeft = 3;
        console.log(this.gameState.fadeTime)
        console.log(this.gameState)
        this.timerInterval = setInterval(() => {
            this.gameState.fadeTime--;
            //console.log(this.gameState)
            this.timerElement.textContent = this.gameState.fadeTime;

            if (this.gameState.fadeTime < 1) {
                clearInterval(this.timerInterval);
                this.timerElement.textContent = "Go!";
                const color = document.querySelector('.circle');
                color.style.backgroundColor = '#f9474b';
                this.unblockClick();
                this.hideColors();
            }
        }, 1000);

        // Блокируем все клики на странице
        document.documentElement.style.pointerEvents = "none";
    }

   //разблокируем клики
    unblockClick() {
        document.documentElement.style.pointerEvents = "auto";
    }

    //start new game level
    startNewLevel() {

        this.repeatedColor = getRandomColor();
        this.userMovemantColors = [];
        this.cleanDiv();
        this.numberOfSquares = (this.gameState.gameDifficulty + 1) * (this.gameState.gameDifficulty + 1);
        this.width = (this.gameState.gameDifficulty + 2) * 100 + 'px';
        this.sqaureWrapper.style.width = this.width;
        this.generateSquares();
        this.startTimer();
        this.userLife = 2;
        document.getElementById("output").textContent = this.userLife;
        this.saveStateToCookies();
    }

    nextLevel() {
        this.setDifficultyLevel(this.gameState.gameDifficulty + 1);
        this.startNewLevel();
    }

    prevLevel() {
        this.setDifficultyLevel(this.gameState.gameDifficulty - 1);
        this.startNewLevel();
    }

    //выбор сложности
    setDifficultyLevel(lvl) {
        this.gameState.gameDifficulty = lvl;
        if (this.gameState.gameDifficulty < 1) {
            this.gameState.gameDifficulty = 1;
        } else if (this.gameState.gameDifficulty > this.MAX_LEVEL) {
            this.gameState.gameDifficulty = this.MAX_LEVEL;
        }
        document.getElementById("output2").textContent = this.gameState.gameDifficulty;
    }

    // Генерация цветов
    generateSquares() {
        let randomColors = generateColors();
        let repeatedColor = this.repeatedColor;
        //генерация квадратов одинакового цвета
        let repeatedColorIndex = randomColors.indexOf(repeatedColor);
        randomColors.splice(repeatedColorIndex, 1);
        for (let i = 0; i < this.gameState.gameDifficulty + 1; i++) {
            this.createSquare(repeatedColor)
        }

        // генерация квадратов разных цветов
        for (let i = this.gameState.gameDifficulty + 1; i < this.numberOfSquares; i++) {
            this.createSquare(randomColors[i])
        }
    }

    //создание квадратов
    createSquare(imgUrl) {
        let flipCard = document.createElement("div");
        flipCard.classList.add("square");
        flipCard.classList.add('flip-card');
        flipCard.style.backgroundImage = `url(${imgUrl})`;
        flipCard.style.order = Math.floor(Math.random() * this.numberOfSquares);
        let flipCardInner = document.createElement('div');
        flipCardInner.classList.add('flip-card-inner');
        let flipCardFront = document.createElement('div');
        flipCardFront.classList.add('flip-card-back');
        flipCardInner.append(flipCardFront)
        flipCard.append(flipCardInner);
        this.sqaureWrapper.appendChild(flipCard);
    }

    //окрашивание квадратов в один свет
    hideColors() {
        const allSquares = this.sqaureWrapper.querySelectorAll('.square');
        setTimeout(() => {
            for (let i = 0; i < allSquares.length; i++) {
                // allSquares[i].classList.add("backColorCard");

                setTimeout(() => {
                    allSquares[i].classList.add('covered');
                }, 500 * Math.random())

            }

        }, 1000);
    }


    //чистим прежнюю игру
    cleanDiv() {
        this.sqaureWrapper.innerHTML = "";
    }

//переход на следующий уровень
    checkSameColors(event) {
        let repeatedColor = this.repeatedColor;
        const target = event.target;
        const flipCard= target.closest('.flip-card');


        flipCard.classList.remove('flip-card-back');
        flipCard.classList.remove('covered');


        let currentColor = flipCard.style.backgroundImage.toString();
        let string = flipCard.style.backgroundImage;
        let cardName = string.substring(string.indexOf('/'), string.lastIndexOf('"'));
        if (repeatedColor === cardName) {
            this.userMovemantColors.push(currentColor);

            if (this.userMovemantColors.length === this.gameState.gameDifficulty + 1) {

                if (this.gameState.gameDifficulty < this.MAX_LEVEL) {
                    Swal.fire({
                        icon: 'success',
                        title: 'победа',
                        text: 'переходим к следующему уровню',
                    }).then(() => {
                        this.nextLevel();
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: "YOU WIN"
                    }).then(() => {
                        // имеет смысл сделать отдельную ф-ю для "очистки старых данных" перед перезапуском ВСЕХ уровней
                        this.setDifficultyLevel(1);
                        //this.userLife = 1;
                        // this.MAX_LEVEL += 1;
                        this.startNewLevel();
                    })

                }
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

    // Save state to cookies
    saveStateToCookies() {
        console.log('save state to cookies')
        // "key=value"
        let stringState = JSON.stringify(this.gameState)
        let encodedState = encodeURIComponent(stringState)
        console.log(stringState)
        document.cookie = "state=" + encodedState;

    }

    // Load state from cookies
    loadStateFromCookies() {
        console.log('load from cookies');
        console.log(document.cookie)
        let cookieState = this.getValueFromCookie("state");
        console.log(cookieState);
        this.gameState = cookieState;


    }

    // GET FROM COOKIES
    getValueFromCookie(name) {
        const cookies = document.cookie;
        console.log(cookies)
        let decodedCookies = decodeURIComponent(cookies);
        console.log(decodedCookies);

        let arrCookies = decodedCookies.split('; ');
        console.log(arrCookies)
        for (let i = 0; i < arrCookies.length; i++) {
            // 'state={"gameDifficulty":1,"test key":"Жанна ученик","lastGameLevel":["green",""]}'
            let splitedCookies = arrCookies[i].split('=');
            let keyCookies = splitedCookies[0];
            let valueCookies = splitedCookies[1];
            if(name === keyCookies) {

                let parsedCookie = JSON.parse(valueCookies);
                return parsedCookie;
            }
        }
        // return value;
    }



}





// Функция для воспроизведения звука при клике
// function music() {
//     const squareWrapper = document.querySelector('.squareWrapper');
//     const buttonStart = document.querySelector('.start-button');
//     const audioSquare = new Audio('../audio/click.ogg');
//     const audioButtonStart = new Audio('../audio/songscard.mp3');
//     function playClickSound(song) {
//         song.currentTime = 0;
//         song.play();
//     }
//
//     squareWrapper.addEventListener('click', () => playClickSound(audioSquare));
//     buttonStart.addEventListener('click', () => playClickSound(audioButtonStart));
//
// }
//
// music()

let squareGame = new SquareGame(1, ".simpleGameApp");
squareGame.start();