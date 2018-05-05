module.exports.encode = function(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports.CONTEXT_TAGS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'FIGCAPTION', 'LI', 'DT', 'DD', 'TR', 'QUOTE'];

module.exports.identify = function(doc) {

  // Add spans with ids around every token
  _identify(doc);

  return doc.outerHTML;
}

// These only work for the Latin alphabet:
// var PUNCT = new RegExp(/[^\w\s]/);
// var ALPHA = new RegExp(/\p{L}/); //new RegExp(/[a-zA-Z]/);

var NUMBER = new RegExp(/^[0-9]$/);
var URL_OR_EMAIL = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/);
var USERNAME = new RegExp(/^@(\w){1,15}$/);
var HASHTAG = new RegExp(/^#(\w){1,15}$/);

var STOPWORDS = {};

const encode = module.exports.encode;
const CONTEXT_TAGS = module.exports.CONTEXT_TAGS;

function _identify(doc) {

  var id = 0;

  for (var tag of CONTEXT_TAGS) {
    const els = doc.querySelectorAll(tag);
    for (var el of els) {
      const _html = [];
      for (let t of el.textContent.split(' ')) {
        const span = "<span class=_" + id++ + ">" + encode(t) + "</span>";
        _html.push(span);
      }
      el.innerHTML = _html.join(' ');
    }
  }
}
