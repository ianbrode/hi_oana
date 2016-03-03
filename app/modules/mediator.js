'use strict';

module.exports = {
  events: {},
  subscribe(event, func) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(func);
  },
  publish(event, value) {
    if (!this.events[event]) return;
    this.events[event].forEach((func) => func(value));
  }
};
