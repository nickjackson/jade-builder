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
      
      var template = fs.readFileSync(pkg.path(file), 'utf8');
      var js = jade.compile(template, { client: true, compileDebug: false });

      var name = builder.root
        ? builder.conf.name
        : builder.basename;

      var fn = 'var jade = require("/' + name + '/jade.runtime");\n'
      fn = fn + 'module.exports = ' + js;

      pkg.addFile('scripts', file + '.js' , fn);
    });
  });
}