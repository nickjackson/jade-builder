#jade-builder
[Jade](https://github.com/visionmedia/jade) middleware to use with [Component](https://github.com/component/component)'s [builder.js](https://github.com/component/builder.js)

## What it does

This will automatically register the Jade client side runtime and can be required with `require('jade.runtime')`. The `jade` variable will not be global.

Any Jade templates will automatically be compiled and registered so that they can be required just like any script. The `jade.runtime` script will be required automatically for each jade template registered.

## License

  MIT
