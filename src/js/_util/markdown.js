var marked = require('marked');

function Markdown(){
  events.subscribe('editor.data', this.parse);
}

Markdown.prototype.parse = function(data){
  this.raw = data;
  this.parsed = marked(this.raw);
  events.publish('markdown.parsed', {
    raw: this.raw,
    parsed: this.parsed
  });
}

module.exports = Markdown;
