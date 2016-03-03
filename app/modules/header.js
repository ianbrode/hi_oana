'use strict';

const View = require('./view');
const mediator = require('./mediator');

class Header extends View {
  template() {
    return `<h1 class='header__logo'>Trump Everywhere</h1>
    <input class='header__search' type='text' placeholder='Type here'>
    <button class='header__sort'>Sort By Date</button>`;
  }

  setEvents() {
    return {
      'search': ['.header__search', 'keyup'],
      'sortByDate': ['.header__sort', 'click']
    };
  }

  search() {
    mediator.publish('search', this.el.querySelector('.header__search').value);
  }

  sortByDate() {
    mediator.publish('sortByDate', this.el.querySelector('.header__sort').value);
  }
}

module.exports = Header;
