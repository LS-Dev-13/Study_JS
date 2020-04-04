// этот код работает в современном режиме
'use strict';
// проверяем на тип данных (число) и конечное ли. универсальная.
function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
// Получение случайного целого числа в заданном интервале, включительно
const getRandomNum = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
  /* Выше = Максимум и минимум включаются*/
};
// Напишем функцию, которая считает количество выполненых попыток - счетчик
const getCounter = function() {
  let counter = 0;
  return function() {
    return ++counter;
  };
};
/* функция при помощи которые мы будем запускать игру, 
назначать число + вопросы и функционал
*/
const gameRandom = function(attemps) {
  const randomNum = getRandomNum(1, 100);
  console.log(randomNum);
  let counter = getCounter();
  return (function checkNum() {
    const userNum = prompt('Угадай число от 1 до 100!)');
    if(isNum(userNum)){
      let count = counter();
      console.log(count);
      let repeat = false;
      if (count < attemps){
        const num = +userNum;
        if (num > randomNum) {
          alert('Загаданное число меньше, осталось попыток ' + (attemps - count));
          return checkNum();
        }
        if (num < randomNum) {
          alert('Загаданное число больше, осталось попыток ' + (attemps - count));
          return checkNum();
        }
        repeat = confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
      } else {
        repeat = confirm('Попытки закончились! Хотели бы сыграть еще?');
      } 
      if (repeat) {
        gameRandom (attemps);
      }
    } else {
      if (userNum !== null) {
        alert('Введите число!');
        checkNum();
      }
    }
    alert('Заходите к нам ещё!)');
  })();
};
gameRandom(10);