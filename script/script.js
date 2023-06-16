

const colors = ['cadetblue', 'skyblue', 'green', 'yellow', 'purple', 'orange', 'grey', 'pink', 'yellowgreen', 'cyan', 'chocolate', 'goldenrod', 'chartreuse', 'tomato', 'brown', 'salmon','Olive','Navy','Aquamarine','Teal'];

//Функция для генерации случайного числа в заданном диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для перемешивания массива
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = getRandomInt(0, i);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Генерация случайных цветов
function generateColors() {
  var shuffledColors = shuffleArray(colors);
  return shuffledColors;
}

// Генерация случайного цвета без пемешивания массива
 function  getRandomColor() {
  var randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}


// =========================уникальные настройки

class SquareGame{
  // Функция-конструктор
  // Запускается один раз, но каждый раз когда мы создаём новую игру (через слвоо нью)
  constructor(level, parentSelector) {
    this.level = level;
    this.width = (this.level + 2) * 100 + 'px';
    this.parentDiv = document.querySelector(parentSelector);
    this.sqaureWrapper = this.parentDiv.querySelector('.squareWrapper');
    this.levelSelector = this.parentDiv.querySelector('select');
    this.levelSelector.addEventListener('change', this.changeHardLevel.bind(this));
    this.statNewGame();   
     
  }

  // start new game
  statNewGame() {
    this.cleanDiv();
    this.numberOfSquares = (this.level + 1) * (this.level + 1);
    console.log(this.numberOfSquares)
    this.width = (this.level + 2) * 100 + 'px';
    this.sqaureWrapper.style.width = this.width;
    this.generateSquares();
    this.hiddColors();
  }
 
  // Генерация цветов
  generateSquares() {
    var randomColors = generateColors();
    var repeatedColor = getRandomColor();
   //генерация квадратов одинакового цвета 
    var repeatedPosition = Math.floor(Math.random() * this.numberOfSquares);
    for (var i = 0; i < this.level + 1; i++) {
      var square = document.createElement("div");
      square.className = "square";
      square.style.backgroundColor = repeatedColor;
      square.style.order = repeatedPosition;
      this.sqaureWrapper.appendChild(square);
    }

  // генерация квадратов разных цветов
    for (var i = this.level + 1; i < this.numberOfSquares; i++) {
      var square = document.createElement("div");
      square.className = "square";
      square.style.backgroundColor = randomColors[i];
      var randomPosition = Math.floor(Math.random() * this.numberOfSquares);
      square.style.order = randomPosition;
      this.sqaureWrapper.appendChild(square);
  };
 }
  
    hiddColors() {
       
      setTimeout(() => {
        for (var i = 0; i < this.numberOfSquares; i++) {
        console.log(this.numberOfSquares)
        var square = document.querySelectorAll('.square');
        square.className = "square";
        square.classList.add("grey");
        console.log(square)
      }
      }, 2000);

      }


//чистим прежнюю игру
  cleanDiv() {
      this.sqaureWrapper.innerHTML = ""; 
      }
      
  

  // Выбор сложности
  changeHardLevel () {
    if (this.levelSelector.value === "1") {
      console.log('hello')
      this.level = 1;
    }
    if (this.levelSelector.value === "2") {
      console.log('hi')
      this.level = 2;
    }
    else if (this.levelSelector.value === "3") {
      console.log('log');
      this.level = 3;
    }
  
    this.statNewGame() 
  };
}



let simpleGame = new SquareGame(1, ".simlpeGameApp");
let mediumGame = new SquareGame(2, "#mediumGame");




