'use strict';

const View = require('./view');
const ArticleDetail = require('./articleDetail');
const ArticleRelated = require('./articleRelated');

class Article extends View {
  template() {
    return `
      <article class='news-item'>
        <div>
          <time>${this.attr.time}</time>
          <h2 class='news-item__title'> ${this.attr.title} </h2>
        </div>
        <div class='news-item__details _hidden'></div>
        <div class='news-item__related'></div>
      </article>`;
  }

  print() {
    if (this.child) return;

    this.child = new ArticleDetail({
      attr: this.attr,
      tagName: 'div'
    });

    let details = this.el.querySelector('.news-item__details');
    details.classList.remove('_hidden');
    details.appendChild(this.child.render());

    if (!this.attr.relatedStories) return;
    let related = this.el.querySelector('.news-item__related');
    related.innerHTML = '<h3 class="news-item__related-title">Related articles</h3>';

    if (this.attr.relatedStories) {
      this.attr.relatedStories.forEach((el) => {
        related.appendChild(new ArticleRelated({
          attr: el,
          tagName: 'div'
        }).render());
      });
    }
  }

  setEvents() {
    return {
      'print': ['h2', 'click']
    };
  }
}

module.exports = Article;
