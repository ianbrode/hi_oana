'use strict';

const View = require('./view');

class RelatedArticle extends View {
  template() {
    return `<a target='_blank' href=${this.attr.unescapedUrl} />${this.attr.title}</a>`;
  }
}

module.exports = RelatedArticle;
