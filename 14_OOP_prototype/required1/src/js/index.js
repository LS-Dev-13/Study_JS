'use strict';

let DomElement = function (selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;  
};

DomElement.prototype.createElem = function () {
  let body = document.querySelector('body');
  let newElem;

  if (this.selector[0] === '.') {
    newElem = document.createElement('div');
    newElem.classList.add(this.selector.substring(1));
  } else if (this.selector[0] === '#') {
    newElem = document.createElement('p');
    newElem.setAttribute('id', this.selector.substring(1));
  }
  newElem.style.cssText = `height: ${this.height}; width: ${this.width}; 
  background-color: ${this.bg}; font-size: ${this.fontSize}`;
  newElem.textContent = 'tesstNewElem';        // `` - бэктики?
  body.append(newElem);
};

let newObjectClass = new DomElement('.new_obj_class', '228px', '228px', 'green', '30px');
let newObjectID = new DomElement('#new_obj_ID', '228px', '228px', 'blue', '30px');


newObjectClass.createElem();
console.log(newObjectClass);
newObjectID.createElem();
console.log(newObjectID);







// LESSON14 Наследование, прототипы, конструкторы и классы
// JS - прототипно-ориентированный язык
/* прототип - скрытая ссылка обьекта. 
Это обьект с которого текущий обьект "черпает" недостающие методы и свойства
*/

// let arr = [1, 2, 3, 4, 5];
// console.log(arr.__proto__);
// console.log(Array.prototype);

// let car = {
//   doors: 4,
//   turbocharging: false,
//   ride: function() {
//     console.log('машина едет');
//   }
// };
// сделаем обьект car прототипом для newCar
// наследуются все методы и свойства
// let newCar = Object.create(car);
// newCar.model = 'mazda 3';
// console.log(newCar.doors);
// /* метод hasOwnProperty - возвращает булевое. 
// проверяет на наличие свойств именно в обьекет, не учитывая что он наследует. */
// console.log(newCar.hasOwnProperty('model'));
// console.log(newCar.hasOwnProperty('doors'));
// // можно проверить свойство прототипа
// console.log(newCar.__proto__.hasOwnProperty('model'));
// console.log(newCar.__proto__.hasOwnProperty('doors'));
// // isPrototypeof показывает являетяс ли car прототипом newCar
// // принимает один параметр - обьект
// console.log(car.isPrototypeOf(newCar));


// *CONSTRUCTORS
/*  - обычная функция, соданная для описания "сущности" (иснтрукция) 
функция вызывается чтобы собрать "пазл" по этой инструкции*/
// выделяется названием с большой буквы
// function Car(model, color) {
//   this.model = model;
//   this.color = color;
// }
 /* new - делает новый обьект в памяти js - вызывает ф-цию Car() 
 прототип Car становится прототипом нового объекта (который в памяти)
 становится this для вызова конструктора - возращает новый объект и мы
 его присваемваем на car1*/
//  * ЭТО И ЕСТЬ 4-Е ПРАВИЛО THIS! 
 // Обьект созданный через оператор new - то this будет указывать на этот объект
// let car1 = new Car('Mazda', 'black');
// console.log(car1);
// Конструктор создаёт "прослойку" в которую можно добавлять свои методы
// console.dir(Car);
// Car.prototype.ride = function () {
//   console.log('ехать');
// };
// car1.ride();
// создадим новый обьект и сравним с первым
// let car2 = new Car('VAZ', 'Grey');
// console.log(car2);
// console.log(car1.ride === car2.ride);

// * КЛАССЫ ООП! 
/* ООП Подход к решению задачи при помощи манипуляции объектами =
= задача разбирается на объекты и помощи них решается*/
/*КЛАСС ООП - абстрактная единица описывающая обьект*/
/*ОБЬЕКТ ООП - создается на основе класса ООП. 
Класс декларирует объект - описывает структуру, саойство, поведение, но не создаёт обьект.
Любой объект это структура которая имеет свойства и методы описанных в классе */ 
// создадим конструктор - класс
// function Car(brand, model, options) {
//   this.brand = brand;
//   this.model = model;
//   options = options || {};
//   this.color = options.color;
//   this.transmission = options.transmission;
// }
// // объекты созданы при помощи конструктора на основе класса Car
// let car1 = new Car ('mazda', '3', {color: 'black'}); 
// // цвет добавляется, так как описана в конструкторе
// let car2 = new Car ('bmw', 'x6', {ABS: true}); 
// // ABS не добавляется, потому что не описан в конструкторе
// // Мы можем декларировать "поведение" автомобилей
// Car.prototype.ride = function () {
//   console.log(this.brand + ' ' + this.model + ' ' + 'Поехала!');
// };
// //проверим являются ли наши обьекты  частью конструктора(прототипа) Car
// // 1-й способ isPrototypeOf
// console.log(Car.prototype.isPrototypeOf(car1));
// // 2-й способ instanceof
// console.log(car2 instanceof Car);
// // применем наш метод ride (который мы добавили в прототип) для каждого обьекта отдельно
// car1.ride();
// car2.ride();

// * НАСЛЕДОВАНИЕ КЛАССОВ 
// Наследование это "отношение" между классасми.
// Класс использует структуру другого класса = одиночное наследование
// Класс использует структуру многих других классов - множественное наследование
// function Car(countryBuild, options) {
//   this.countryBuild = countryBuild;
//   options = options || {};
//   this.color = options.color;
//   this.transmission = options.transmission;
// }
// // создадим метод и конструктора(класса) Car
// Car.prototype.ride = function () {
//   console.log(this.brand + ' ' + this.model + ' Поехала!' );
// };
// // создадим ещё один конструктор и привяжем его к нашему Car
// // класс Audi наследует класс Car
// function Audi(countryBuild, options, model, type) {
//   this.brand = 'Audi';
//   Car.apply(this, arguments);
//   this.model = model;
//   this.type = type;
// }

// // Привяжем прототип функции Сar к прототипу функции Audi
// Audi.prototype = Object.create(Car.prototype);
// Audi.prototype.constructor = Audi;

// let audiQ7 = new Audi ('germany', {color: 'black', transmission: 'auto'}, 'Q7', 'Type S');

// console.log(audiQ7);
// console.log(audiQ7 instanceof Audi);
// console.log(audiQ7 instanceof Car);

// audiQ7.ride();

// // * так же работают встроенные конструкторы в JS
// // Object на верху цепочки!
// console.log(new Object());




