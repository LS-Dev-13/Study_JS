// этот код работает в современном режиме
'use strict';
// проверяем на тип данных (число) и конечное ли. универсальная.
function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// урок 6.1 область видимости
// let x = 5; // если задать без let...(без ключего слова) область видимости глобальная 
// console.log(x);
// function one(){
//   let y = 10;//локальная область видимости в рамках функции;
//   let x = 3; // област видимости в зоне function one
//   console.log(x);
//   console.log(y);
//   function two(){
//     let x = 1; // область видимости в зоне two;
//     console.log(x);
//   }
//   two();
// }
// one();
// console.log(y);

/* у функции есть скрытый объект "lexical environment". 
объект содержит все локальные перменные. к нему нельзя обратиться */
// let y = 10;
// function three(x, z) {
//   // lexicalEnvironment = {x: 3, z: undefined};
//   //scope = globalScope = window.y = 10;
//   // let y = 5; //локальная область видимости в рамках функции;
//   // lexicalEnvironment = {x: 3, y: 5, z: undefined};
//   console.log(x, y, z);
//   function two() {
//     // lexicalEnvironment = {};
//     /*scope = (ссылка на lexicalEnvironment родителя - 
//       one.lexicalEnvironment = {x: 3, y: 5, z: undefined}; ) */
//     console.log(y);
//   }
//   two();
// }
// three(3);

// лексическое окружение определяется во время вызовы функции.
// scope определяется во время описание функции.
// let y = 5;
// function four(x){
//   //scope = globalScope = window = {y: 5};
//  console.log(x + y);// x берется из lexicalEnvironment. y берется из scope;
// }

// function five(){
//   let y = 15;
//   four(3); // функция four не видит значение y в функции five
// }
// five();
// // получили 8, а не 18 - потому что scope определён во врем опиисания функции.

//lesson 6.2  Замыкания
// Замыкание это функция внутри функции. Подробное описание:
// Замыкание - функция со всеми её переменными, которые доступны.
// let a = 50; 
/* a = глобальная область видимости. 
если используется "где-то" далее она не является замкнутой
Это просто использование глобальной переменной*/
// function one() {
//   let x = 10;
//   function two(y) {
//       function three() {
//         return x * y * a; // функция замкнута two и one.
//       }
//         console.dir(three);
//     return x + y + three(); // переменная x замкнута с функцией two
//   }
//   return two(15);
// }
// console.log(one());

// вариант 1 замыкания
// function funcMath() {
//   const a = 10;
//   return function() {
//     console.log(a * a);
//   };
// }
// const mathPow = funcMath();
// mathPow();
// вариант 2 замыкания
// function funcMath() {
//   const a = 10;
//   return function () {
//     console.log(a * a);
//   };
// }

// const mathPow = funcMath();
// mathPow();
// console.dir(mathPow); // scope = closure(замыкание) на a; script; global;

// const mathPow2 = function () {
//   console.log(a * a);
// };
// console.dir(mathPow2); // scope = script; global;

// // делаем тоже самое с параметрами
// function funcMath(a) {
//   return function(b) {
//     console.log(a * b);
//   };
// }

// const mathPow = funcMath(10);
// mathPow(5);
// console.dir(mathPow); // scope = closure(замыкание) на a; script; global;


// // (час + (минуты / 60)) * 30 - минуты * 6
// function getAngleTime(){
//  return function(a, b) {
//   console.log(Math.abs((a + (b / 60)) * 30 - (b * 6)));
// };
// }
// let angelTime = getAngleTime();
// angelTime(3, 30);
