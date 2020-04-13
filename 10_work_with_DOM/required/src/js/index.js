'use_strict';

// получаем коллекцию элементов книг
const collectionBooks = document.querySelectorAll('.book');

// добавим каждой книге class 
collectionBooks[0].classList.add('book__2');
collectionBooks[1].classList.add('book__1');
collectionBooks[2].classList.add('book__6');
collectionBooks[3].classList.add('book__4');
collectionBooks[4].classList.add('book__3');
collectionBooks[5].classList.add('book__5');

// восстановим порядок книг
collectionBooks[0].before(collectionBooks[1]);
collectionBooks[0].after(collectionBooks[4]);
collectionBooks[5].after(collectionBooks[2]);

// поменяем картинку заднего фона
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// исправим ошибку в заголовке книги 3
const titleBookThree = document.querySelector('.book__3>h2>a');
titleBookThree.textContent = 'Книга 3. this и Прототипы Объектов';

// удалим рекламу на странице
const adv = document.querySelector('.adv');
adv.remove();

// восстановим порядок глав в книге 2
const bookTwoChapters = document.querySelectorAll('.book__2 li');
bookTwoChapters[2].before(bookTwoChapters[3]);
bookTwoChapters[2].before(bookTwoChapters[6]);
bookTwoChapters[2].before(bookTwoChapters[8]);
bookTwoChapters[2].before(bookTwoChapters[4]);
bookTwoChapters[2].before(bookTwoChapters[5]);
bookTwoChapters[2].before(bookTwoChapters[7]);
bookTwoChapters[2].before(bookTwoChapters[9]);
// восстановим порядок глав в книге 5
const bookThreeChapters = document.querySelectorAll('.book__5 li');
bookThreeChapters[2].before(bookThreeChapters[9]);
bookThreeChapters[2].before(bookThreeChapters[3]);
bookThreeChapters[2].before(bookThreeChapters[4]);
bookThreeChapters[5].before(bookThreeChapters[6]);
bookThreeChapters[5].before(bookThreeChapters[7]);

// добавим главу 8 в книге 6
// создадим новую главу, добавим в неё текст и поместим в книгу 6
const bookSixUl = document.querySelector('.book__6 ul');
const bookSixChapters = document.querySelectorAll('.book__6 li');
bookSixUl.insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>');
bookSixUl.append(bookSixChapters[9]);





// const collections = document.querySelectorAll('ul'),
//       elems = document.querySelectorAll('li');
// console.log(collections, elems);

// // УПРАВЛЕНИЕ ЭЛЕМЕНТАМИ
// // удаляем эелменты по индексу
// elems[3].remove();
// elems[0].remove();
// // вставляем элементы по индексу в коллецию по индексу
// // append - берет и перемещает элементы в конец. не создаёт копии
// collections[1].append(elems[3]);
// collections[1].append(elems[0]);
// // prepend - берет и перемещает элементы в начало. не создаёт копии
// collections[1].prepend(elems[5]);
// // beforе\after вставляет указанные коллекции(элементы) до/после выбранного пути
// // collections[0].before(collections[1]);
// // elems[4].after(elems[0]);
// // replace - меняет местами, а который на которого место ставим исчезает из DOM
// // можно вставлять кроме єлементо и другое. Например: строку и т.д.
// // elems[5].replaceWith(elems[11]);
// elems[5].replaceWith('ТестРеплейс');
// // так же мы можем клонировать элементы
// // cloneNode() - копирует "ноду" сам элемент без содержимого.
// // а если в параметрах написать true - копирует полностью.
// const elemClone = elems[7].cloneNode(true);
// // добавим в него новый класс. или поменяем текст.
// elemClone.classList.add('newElem');
// elemClone.textContent = 'new Elem';
// collections[1].append(elemClone);


// // СОЗДАНИЕ ЭЛЕМЕНТОВ
// /* в существующий добавляем или меняем только текст внутри эелемента - textContent. ЗАТИРАЕТ ТЕКСТ */
// elems[2].textContent = 'Text textContent';
// console.log(elems[2].textContent);
// // в существующиий добавляем любые элементы с содержимым. затирает вёрстку!!!
// elems[2].innerHTML = '<span>innerTest</span>';
// // создадим новый элемент в памяти JS createElement
// const newElem2 = document.createElement('li');
// // можем добавить в него текст и поместить в коллекцию, например.
// newElem2.textContent = 'New Element2';
// console.log('newElem: ', newElem2);
// newElem2.classList.add('newelem2_class');
// collections[1].append(newElem2);

// // НОВЫЕ 3 МЕТОДА РЕДАКТИРОВАНИЕ ЭЛЕМЕНТОВ
// const mainHead = document.querySelector('h1');
// console.log('mainHead: ', mainHead);
// /* insertAdjacentText принимает 2 параметра. НЕ ЗАТИРАЕТ имеющийся в элементе.
// 1-й параметр место куда хотим вставить текст (4 варианта)
// 2-й параметр - сам текст.*/
// // mainHead.insertAdjacentText('beforebegin', 'beforebeginTest'); // до элемента
// // mainHead.insertAdjacentText('afterend', 'afterendTest'); // после элемента
// // mainHead.insertAdjacentText('afterbegin', 'afterbeginTest'); // внутри элемента вначале
// // mainHead.insertAdjacentText('beforeend', 'beforeendTest'); // внутри элемента вконце

// // //insertAdjacentElement принимает 2 параметра. НЕ ЗАТИРАЕТ ИМЕЮЩИЙССЯ ЄЛЕМЕНТ.
// // // 1-й параметр место куда хотим вставить текст (4 варианта)
// // // 2 - й параметр - сам єлемент. 
// // // попробуем поперемещать его
// // mainHead.insertAdjacentElement('beforebegin', newElem2); // до элемента
// // mainHead.insertAdjacentElement('afterend', newElem2); // после элемента
// // mainHead.insertAdjacentElement('afterbegin', newElem2); // внутри элемента вначале
// // mainHead.insertAdjacentElement('beforeend', newElem2); // внутри элемента вконце

// // //insertAdjacentHTML принимает 2 параметра. НЕ ЗАТИРАЕТ ИМЕЮЩИЙССЯ ЄЛЕМЕНТ.
// // // 1-й параметр место куда хотим вставить текст (4 варианта)
// // // 2 - й параметр - сам єлемент. 
// // // попробуем добавить элемент
// // mainHead.insertAdjacentHTML('beforebegin', '<h3>beforebegin</h3>'); // до элемента
// // mainHead.insertAdjacentHTML('afterend', '<h3>afterend</h3>'); // после элемента
// // mainHead.insertAdjacentHTML('afterbegin', '<p>afterbegin</p>'); // внутри элемента вначале
// // mainHead.insertAdjacentHTML('beforeend',  '<p>beforeend</p>'); // внутри элемента вконце

// // СТАРЫЕ МЕТОДЫ РЕДАКТИРОВАНИЯ ЭЛЕМЕНТОВ
// // appendChild вставить в конец элемента
// collections[0].appendChild(newElem2); // лучше юзать append
// collections[1].appendChild(elems[1]); // лучше юзать append
// //insertBefore. принимает 2 параметра. 1-й новый элемент. 2-й перед каким его вставить.
// collections[0].insertBefore(newElem2, elems[4]); // лучше юзать before
// //insertBefore - вставить элемент в самое начало элемента
// collections[0].insertBefore(elems[6], collections[0].firstChild); // лучше юзать prepend
// // replaceChild заменяет элементы первым параметром - новый. вторым - старый.
// collections[0].replaceChild(newElem2, elems[7]); // лучше юзать replaceWith 
// // removeChild - удаляет элемент
// collections[0].removeChild(elems[9]); // лучше юзать remove 





// let dna = function(n) {
//   let rna = '';
//   for (let i = 0; i < n.length; i += 1) {
//     switch (n[i]) {
//       case 'G':
//         rna += 'C';
//         break;
//       case 'C':
//         rna += 'G';
//         break;
//       case 'T':
//         rna += 'A';
//         break;
//       case 'A':
//         rna += 'U';
//         break;
//       default:
//         return null;
//     }
//   }
//   console.log(rna);
// };
// dna('ACGTGGTCTTAA');

// function getRna(dnk){
//   let rnk = "";
//   for (let i = 0; i < dnk.length; i += 1) {
//     if (dnk.length === 0) {
//       return '';
//     } else if (dnk[i] === "G") {
//       rnk += "C";
//     } else if (dnk[i] === "C") {
//       rnk += "G";
//     } else if (dnk[i] === "T") {
//       rnk += "A";
//     } else if (dnk[i] === "A") {
//       rnk += "U";
//     } else {
//       return null;
//     }
//   }
//   console.log(rnk);
//   return rnk;
// }
// getRna('ACGTGGTCTTAA');