'use strict';

class View {
  constructor(config) {
    this.attr = config.attr;
    this.tagName = config.tagName;
    this.children = [];
  }

  template() {
    return false;
  }

  setEvents() {
    return false;
  }

  render() {
    if (this.el) return;
    this.el = this.createElement(this.tagName);
    this.el.innerHTML = this.template();
    this.events = this.setEvents();
    this.processEvents();
    return this.el;
  }

  createElement(tagName) {
    return document.createElement(tagName);
  }

  processEvents(remove) {
    if (!this.events) return;
    let ev = Object.keys(this.events);
    for (let i = 0; i < ev.length; i++) {
      let method = ev[i];
      if (remove) {
        this.undelegate(this.events[method][0], this.events[method][1], this[method]);
      } else {
        this.delegate(this.events[method][0], this.events[method][1], this[method]);
      }
    }
  }

  delegate(selector, eventType, func) {
    this.el.querySelector(selector).addEventListener(eventType, func.bind(this));
  }

  undelegate(selector, eventType, func) {
    this.el.querySelector(selector).removeEventListener(eventType, func.bind(this));
  }

  clearChildren() {
    this.children.forEach((el) => el.destroy());
    this.children = [];
  }

  destroy() {
    this.clearChildren();
    this.processEvents(true);
    this.el.parentNode.removeChild(this.el);
  }
}

module.exports = View;
