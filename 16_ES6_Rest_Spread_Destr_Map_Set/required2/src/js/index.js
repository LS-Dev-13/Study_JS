'use strict';

class First {
  constructor() {}
  hello() {
    console.log('Привет, я метод родителя!');
  }
}

class Second extends First {
  constructor() {
    super();
  }

  hello() {
    super.hello();
    this.helloNew();
  }
  helloNew() {
    console.log('А я наследуемый метод!');
  }
}
const helloRes = new Second();
helloRes.hello();
