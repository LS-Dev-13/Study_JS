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
