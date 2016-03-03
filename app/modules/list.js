'use strict';

const Article = require('./article');
const View = require('./view');

const ajax = require('./ajax');
const mediator = require('./mediator');

class List extends View {
  render() {
    this.el = this.createElement(this.tagName);
    this.ordered = true;

    ajax('./assets/json/data.json', (res) => {
      let results = res.results;
      this.build(results);

      mediator.subscribe('search', function(val) {
        if (val.length >= 3) {
          results = res.results.filter((el) => {
            return el.title.includes(val) || el.content.includes(val);
          });
        } else if (val.length === 0) {
          results = res.results;
        } else {
          results = [];
        }
        this.build(results);
      }.bind(this));

      mediator.subscribe('sortByDate', function() {
        this.ordered = this.ordered ? false : true;
        this.sortByDate(results, this.ordered);
        this.build(results);
      }.bind(this));
    });

    return this.el;
  }

  formatTime(date) {
    let dateObj = new Date(date).toTimeString();
    let dateArr = dateObj.split(':');
    return dateArr[0] + ':' + dateArr[1];
  }

  build(arr) {
    this.clearChildren();
    arr.forEach((el) => {
      el.time = this.formatTime(el.publishedDate);
      let article = new Article({ attr: el, tagName: 'li' });
      this.children.push(article);
      this.el.appendChild(article.render());
    });
  }

  sortByDate(arr, reverse) {
    arr.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
    if (reverse) arr.reverse();
  }
}

module.exports = List;
