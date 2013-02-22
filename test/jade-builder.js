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

      var fn = 'require("simple/template")({title:"Node", name: "Foo"})';
      var returned = vm.runInNewContext(res.require + res.js + '; ' + fn);

      var html = read(__dirname + '/fixtures/simple.html', 'utf8');
      expect(html).to.equal(returned);
      done();
    })
  })

  it('should render correct jade for dependencies', function(done){
    var builder = new Builder('test/fixtures/boot');
    builder.use(jadeBuilder);
    builder.addLookup(__dirname + '/fixtures');

    builder.build(function(err, res){
      if (err) return done(err);

      var fn = 'require("simple/template")({title:"Node", name: "Foo"})';
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

      var fn = 'require("boot/template")({title:"Node", name: "Foo"})';
      var returned = vm.runInNewContext(res.require + res.js + '; ' + fn);

      var html = read(__dirname + '/fixtures/boot.html', 'utf8');
      expect(html).to.equal(returned);
      done();
    })
  })


})