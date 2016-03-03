'use strict';

const View = require('./view');

class ArticleDetail extends View {
  template() {
    return `
    <div class='news-item__image-container'>
      <div
        class='news-item__image'
        style='background-image: url(${this.attr.image.tbUrl})''>
      </div>
    </div>
    <div class='news-item__text-container'>
      <p class='news-item__text'> ${this.attr.content}
        <a target='_blank' href=${this.attr.unescapedUrl}>Read more</a>
      </p>
    </div>
    `;
  }
}

module.exports = ArticleDetail;
