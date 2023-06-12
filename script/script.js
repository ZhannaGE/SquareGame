
// const square = document.querySelectorAll(".square");
// let input = document.getElementById("myInput");
// const wrapper = document.querySelector('.wrapper')

// setTimeout(() => {
//    Array.from(square).forEach(function(element) {
//   element.classList.add("grey");
// });
//   }, 2000);

//  wrapper.addEventListener("click", function(event) {
//     let clickedElement = event.target;
//     clickedElement.classList.toggle('grey');
//     console.log(clickedElement)
//     if(clickedElement.classList.contains('blue')){
//         input.value += 1;
//     }
//   });

const colors = ['rust', 'skyblue', 'green', 'yellow', 'purple', 'orange', 'grey', 'pink', 'sky', 'yellowgreen', 'indigo', 'chocolate', 'vinous', 'beige', 'tomato', 'brown', 'oldrose'];

// Функция для генерации случайного числа в заданном диапазоне
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


// =========================
let select = document.querySelector('select');
console.log(select.value);
// let selectedValue = mySelect.value;

let level = 1;
let width = '300px';

// 1 -- 300 === 1+2 -> 3 * 100
// 2 -- 400 === 2+2 -> 4 * 100
// 3 -- 500 === 3+2 -> 5 * 100

class SquareGame{

  // Функция-конструктор
  // Запускается один раз, но каждый раз когда мы создаём новую игру (через слвоо нью)
  constructor(level, parentSelector) {
    console.log('Starg new game. Log from contrutor');
    this.level = level;
    this.width = (this.level + 2) * 100 + 'px';
   
    this.parentDiv = document.querySelector(parentSelector);
    this.sqaureWrapper = this.parentDiv.querySelector('.squareWrapper');
    this.levelSelector = this.parentDiv.querySelector('select');
    this.levelSelector.addEventListener('change', this.changeHardLevel.bind(this));
    console.log(this.levelSelector);
    this.statNewGame();    
  }

  // start new game
  statNewGame() {
    this.numberOfSquares = (this.level + 1) * (this.level + 1);
    this.width = (this.level + 2) * 100 + 'px';
    this.sqaureWrapper.style.width = this.width;
    this.generateSquares();
  }

  // Генерация квадратиков
  generateSquares() {
    // почистить поле от старых квадратиков


    var randomColors = generateColors();

    console.log(this.numberOfSquares);

    for (var i = 0; i < this.numberOfSquares; i++) {
      var square = document.createElement('div');
      square.style.backgroundColor = randomColors[i];
      square.className = 'square';
      console.log('test');
      this.sqaureWrapper.appendChild(square);
    }
  };

  // Выбор сложности
  changeHardLevel () {
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




// let medium = new DemoConfig(2, '400px');
// let hard = new DemoConfig(3, '500px');



// Object.keys(simple.width).forEach(function (key) {
//   parentDiv.style[key] = simple.width[key];
//   console.log(simple.width[key])
// });










