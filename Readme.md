#jade-builder
[Jade](https://github.com/visionmedia/jade) middleware to use with [Component](https://github.com/component/component)'s [builder.js](https://github.com/component/builder.js)

## What it does

This will automatically register the Jade client side runtime and can be required with `require('name/jade.runtime')` where `name` is the name of the root component being built. The `jade` variable will not be global.

Any Jade templates will automatically be compiled and registered so that they can be required just like any script. The `jade.runtime` script will be required automatically for each jade template registered.


## Other
A lot of the code is from the example [here](https://github.com/component/builder.js/blob/master/examples/transpile/index.js)


## License

  MIT
