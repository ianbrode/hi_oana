'use strict';

require('_stylesheets/app.styl');
require('_data/data.json');

const Header = require('./modules/header');
const List = require('./modules/list');

let header = new Header({tagName: 'div'}).render();
document.querySelector('header').appendChild(header);

let list = new List({tagName: 'ul'}).render();
document.querySelector('main').appendChild(list);
