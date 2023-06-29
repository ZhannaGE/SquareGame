// const colors = ['cadetblue', 'skyblue', 'green', 'yellow', 'purple', 'orange', 'grey', 'pink', 'yellowgreen', 'cyan', 'chocolate', 'goldenrod', 'chartreuse', 'tomato', 'brown', 'salmon', 'olive', 'navy', 'aquamarine', 'teal'];
const colors = ['/img/1.png','/img/2.png','/img/3.png','/img/4.png','/img/5.png','/img/6.png','/img/7.png','/img/8.png','/img/9.png','/img/10.png','/img/11.png','/img/12.png','/img/13.png','/img/14.png','/img/15.png','/img/16.png','/img/17.png','/img/18.png','/img/18.png','/img/20.png','/img/21.png','/img/22.png','/img/23.png','/img/25.png','/img/25.png'];
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
    let shuffledColors = shuffleArray(colors).slice();
    console.log(shuffledColors)
    return shuffledColors;
}

// Генерация случайного цвета без перемешивания массива
function getRandomColor() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// level - уровень сложности
// newLevel - новый уровнь игры
// game - экземпляр игры


// =========================уникальные настройки

class SquareGame {
    // Функция-конструктор
    // Запускается один раз, но каждый раз когда мы создаём новую игру (через слвоо нью)
    constructor(level, parentSelector) {
        this.gameDifficulty = level;
        this.width = (this.gameDifficulty + 2) * 100 + 'px';
        this.parentDiv = document.querySelector(parentSelector);
        this.userMovemantColors = [];
        this.userLife = 1;
        this.sqaureWrapper = this.parentDiv.querySelector('.squareWrapper');
        this.sqaureWrapper.addEventListener('click', this.checkSameColors.bind(this));
        this.repeatedColor;
        this.levelSelector = this.parentDiv.querySelector('select');
        this.levelSelector.addEventListener('change', this.setDifficultyLevel.bind(this));
        this.start()
        this.timerElement = document.getElementById("timer");
        this.timerInterval = null;
        this.timeLeft = 3;
    }


    //запуск игры по нажатию кнопки
    start(){
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
                color.style.backgroundColor = '#4CAF50FF';
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
        // Swal.fire({
        //     title: 'внимание',
        //     text: 'игра начнется через несколько секунд, запомни одинаковые цвета',
        //     icon: 'info',
        //     confirmButtonText: 'начать'
        // }).then(()=>{
        //     this.hideColors();
        // })
        console.log(this.timeLeft)
        this.startTimer();

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
        if(direction === 'next' && this.gameDifficulty <= 3) {
            this.gameDifficulty++;
        }else if (direction === 'prev' && this.gameDifficulty >= 2) {
            this.gameDifficulty--;
        }
        console.log(this.gameDifficulty)
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
            console.log(repeatedColor)
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
        }
        else if (this.levelSelector.value === "3") {
            this.gameDifficulty = 3;
        }
        this.startNewLevel();
    };


    checkSameColors(event) {
        let repeatedColor = this.repeatedColor;
        const target = event.target;
        target.classList.toggle('grey');
        let currentColor = target.style.backgroundColor;
        if (repeatedColor === currentColor){
            this.userMovemantColors.push(currentColor);
        }
      if (this.userMovemantColors.length === this.gameDifficulty + 1){
          Swal.fire({
              icon: 'success',
              title: 'победа',
              text: 'переходим к следующему уровню',
          }).then(()=> {
              this.nextLevel();
          })

        }
        else if (repeatedColor !== currentColor) {
          Swal.fire({
              icon: 'error',
              title: 'неудача',
              text: 'попробуй еще раз',
          }).then(()=>{
              // if (this.userLife > 0) {
              //     this.prevLevel();
              // }
              this.userLife--;
          })
        }
        else {
          console.log('2you lose');
      }

    }

}


let simpleGame = new SquareGame(1, ".simpleGameApp");
//let mediumGame = new SquareGame(2, "#mediumGame");

// 1 менять уровень на один выше, после выйграша
//- как это сделать когда уровень привязан к значению из селект
//2 запускать startNewLevel() после пройграша
//3 менять уровень на один ниже, после пройграша



// ПРОДУМАТЬ ЛОГИКУ ИГРЫ ДО КОНЦА
// как можно выиграть? Как определить кто прошел дальше, а кто не так далеко
// сколько попыток дается на однну игру (сколько "жизней" - 1, 2, 3...)
// разобраться с кнопкой "старт игры" или не начинать игру при выборе уровня сложности
// улусшить дизайн (например таймер 3-2-1 почти не виден)





