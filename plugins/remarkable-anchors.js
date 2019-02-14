import * as slug from 'slug'

export default (md) => {
  md.renderer.rules.heading_open = function(tokens, idx) {
    return '<h' + tokens[idx].hLevel + '>' + '<a class="anchor" id="' + slug(tokens[idx+1].content).toLowerCase() + '"></a>';
  };

  md.renderer.rules.heading_close = function(tokens, idx) {
    return ' <a class="hash-link" href="#' + slug(tokens[idx-1].content).toLowerCase() + '">#</a>' + '</h' + tokens[idx].hLevel + '>\n';
  };
}