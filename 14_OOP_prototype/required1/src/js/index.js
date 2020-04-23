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


