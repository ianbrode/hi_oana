'use strict';

module.exports = function(url, callback) {
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      let data = JSON.parse(this.response);
      callback(data);
    }
  };
  request.send();
};
