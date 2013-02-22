var Builder = require('component-builder')
  , jadeBuilder = require('../')
  , expect = require('expect.js')
  , vm = require('vm')
  , fs = require('fs')
  , read = fs.readFileSync


describe('jade-builder', function(){

  it('should render correct jade', function(done){
    var builder = new Builder('test/fixtures/simple');
    builder.use(jadeBuilder);

    builder.build(function(err, res){
      if (err) return done(err);

      var fn = 'require("simple/template.jade")({title:"Node", name: "Foo"})';
      var returned = vm.runInNewContext(res.require + res.js + '; ' + fn);

      var html = read(__dirname + '/fixtures/simple.html', 'utf8');
      expect(html).to.equal(returned);
      done();
    })
  })
  
  it('should render correct jade when in a subfolder', function(done){
    var builder = new Builder('test/fixtures/simple');
    builder.use(jadeBuilder);

    builder.build(function(err, res){
      if (err) return done(err);

      var fn = 'require("simple/templates/template2.jade")()';
      var returned = vm.runInNewContext(res.require + res.js + '; ' + fn);
      
      expect(returned).to.equal("<h1>Template 2</h1>");
      done();
    })
  })

  it('should render correct jade for dependencies', function(done){
    var builder = new Builder('test/fixtures/boot');
    builder.use(jadeBuilder);
    builder.addLookup(__dirname + '/fixtures');

    builder.build(function(err, res){
      if (err) return done(err);

      var fn = 'require("simple/template.jade")({title:"Node", name: "Foo"})';
      var returned = vm.runInNewContext(res.require + res.js + '; ' + fn);

      var html = read(__dirname + '/fixtures/simple.html', 'utf8');
      expect(html).to.equal(returned);
      done();
    })
  })

  it('should render correct jade for component with dependencies', function(done){
    var builder = new Builder('test/fixtures/boot');
    builder.use(jadeBuilder);
    builder.addLookup(__dirname + '/fixtures');

    builder.build(function(err, res){
      if (err) return done(err);

      var fn = 'require("boot/template.jade")({title:"Node", name: "Foo"})';
      var returned = vm.runInNewContext(res.require + res.js + '; ' + fn);

      var html = read(__dirname + '/fixtures/boot.html', 'utf8');
      expect(html).to.equal(returned);
      done();
    })
  })


})