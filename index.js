var jade = require('jade')
  , path = require('path')
  , fs = require('fs');


/*
  Exports main jade middleware function
*/

module.exports = compileJade


/*
  Hooks into the component.js builder and compiles
  jade templates into javascript.

*/

function compileJade(builder) {

  builder.on('config', function(){
    var runtime = fs.readFileSync(__dirname + '/runtime.js', 'utf8');
    builder.addFile('scripts', 'jade.runtime.js', runtime);
  });

  builder.hook('before scripts', function(pkg){
    var templates = pkg.conf.templates;
    if (!templates) return;

    templates.forEach(function(file){
      var ext = path.extname(file);
      if ('.jade' != ext) return;

      file = pkg.path(file);
      var template = fs.readFileSync(file, 'utf8');
      var js = jade.compile(template, { client: true, compileDebug: false });

      file = path.basename(file, '.jade') + '.js';

      var name = builder.root
        ? builder.conf.name
        : builder.basename;

      var fn = 'var jade = require("/' + name + '/jade.runtime");\n'
      fn = fn + 'module.exports = ' + js;

      pkg.addFile('scripts', file, fn);
    });
  });
}