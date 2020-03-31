'use strict';
// Task 1
// Решение через if
// объявляем переменные
let lang = 'en';
let arr;
// задаём условие. выводим console и проверяем на соответствие
if (lang === 'ru') {
arr = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
}
if (lang === 'en') {
  arr = ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'];
}
console.log(arr);

//Решение через switch-case
// объявляем переменные
let lang2 = 'en';
let arr2;
// задаём условие. выводим console и проверяем на соответствие
switch (lang2) {
  case 'ru':
    arr2 = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    break;
  case 'en':
    arr2 = ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'];
    break;
}
console.log(arr2);

//Решение через многомерный массив
// объявляем переменные
let lang3 = 'ru';
// задаём массивы. выводим console
let arr3 = {
  'ru': ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
  'en': ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'],
};
console.log(arr3[lang3]);


// задание 2
// задаём "отправную" переменную и через тернарный оператор идём по условиям
const amePerson = 'Леонид';
console.log(amePerson === 'Артём' ? 'директор' : amePerson === 'Максим' ? 'преподаватель' : 'студент');






// console.log(confirm('Тебе есть 18 лет?'));

// let question = confirm('Тебе есть 18 лет?');
// let question2 = +prompt('Cколько тебе лет?', '18');
// console.log('question2: ', question2);
// console.log(typeof question2);
// console.log('question: ',typeof question);

// console.log(5 + '5');
// console.log(typeof (5 + '5'));

// console.log(5 - '5');
// console.log(5 * '5');
// console.log('js' / '5');

// console.log(5 === '5');


// console.log(Boolean(5));
// console.log(!!5);
// console.log(!!'js');

// console.log(String([1,2,3]));
// console.log(typeof ''+([1,2,3]));
// console.log(typeof ([1,2,3] .toString()));
// console.log(typeof (10..toString()));

// console.log(typeof Number('33'));
// console.log(typeof +('10'));

// let n = '10';
// n *= 1;
// console.log('n: ',typeof n);
// console.log('n: ', n);

// console.log(parseInt('10ff px', 16));
// console.log(parseFloat('10.5 px'));

/*

Если (жарко) {
  одеваем шорты;
  одеваем футболку;
} иначе {
  одеваем джинсы;
  одеваем кофту;
}

*/

// if (true) console.log('истина');
// if (false) console.log('не выполняется');

// let n = 3;
// if (n === 55){
//   console.log('command 1');
//   console.log('command 2');
// } else if(n === 4){
//   console.log('не верно');
// } else {
//   console.log('не верно2');
// }

// switch (n){
//   case 3:
//   case 4:
//   case 5:
//     console.log('3-5');
//     break;
//   case 6:
//     console.log(6);
//     break;
//   default:
//     console.log('ne verno');
// }

// let result = n === 5 ? '1b' : '0a';
// console.log('result: ', result);

// Объявляем переменную (Var (es5), Let, Const (es6))

