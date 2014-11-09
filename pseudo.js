(function (window, document, undefined) {
  var ps = function(config) {
    this.version = '0.0.2';
    this.sheet = psLibSheet;
    this.config = config;
    this.cache = this.cache || [];
    this.uid = this.uid || ('ps' + (+ new Date()));
  },

  psLibSheet = (function() {
    var style = document.createElement('style');

    style.setAttribute('media', 'screen')
    style.appendChild(document.createTextNode(''));

    document.head.appendChild(style);

    return style.sheet ? style.sheet : style.styleSheet;
  })();

  ps.prototype.style = function(selectors, styles) {
    if (typeof selectors === 'string') {
      selectors = [selectors];
    }

    // if (typeof selectors === 'object') {
    //   return this.applyStyles(selectors, styles);
    // }

    var length = selectors.length;

    while (length--) {
      var currentSelector = selectors[length];

      if (currentSelector) {
        this.createOrUpdateStyles(currentSelector, styles);
      }
    }
  };

  ps.prototype.createOrUpdateStyles = function(selector, styles) {
    var elSelector = selector.split(':')[0],
        elements = [].slice.call(document.querySelectorAll(elSelector)),
        length = elements.length;

    while (length--) {
      this.applyStyles(elements[length], selector, styles);
    }

  };

  ps.prototype.applyStyles = function (node, selector, styles) {
    var pseudo = selector.split(':')[1],
        index = this.index(node, selector);

    this.addRule(selector, styles, index);
  };

  ps.prototype.addRule = function (selector, rules, index) {
    if (typeof rules === 'object' ) {
      var parsedRules = JSON.stringify(rules).replace(/{|}|"|"/g, '');
    }

    if ("insertRule" in this.sheet) {
      this.sheet.insertRule(selector + "{" + parsedRules + "}", index);
    } else if ("addRule" in this.sheet) {
      this.sheet.addRule(selector, parsedRules, index);
    }
  };

  ps.prototype.store = function (element, key, data) {
    if (data !== undefined) {
      var tmpCache = {};
      tmpCache[key] = data;
      this.cache.push(tmpCache);
      element[this.uid] = this.cache.length - 1;
      return data;
    } else {
      return this.cache[element[this.uid]][key];
    }
  };

  ps.prototype.index = function (node, selector) {
    if (node[this.uid]) {
      return this.store(node, selector);
    }

    return this.store(node, selector, this.sheet.cssRules.length);
  };

  // create instance
  var _ps = new ps();

  // expose library
  window.pseudo = _ps;

})(window, document);