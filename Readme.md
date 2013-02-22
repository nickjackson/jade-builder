#jade-builder
[Jade](https://github.com/visionmedia/jade) middleware to use with [Component](https://github.com/component/component)'s [builder.js](https://github.com/component/builder.js)

## What it does

This will automatically register the Jade runtime and can be used with `require('jade.runtime')` in your client side app. The `jade` variable will not be global by default.

Any jade templates will automatically be compiled and registered so that they can be required just like any script. Also, the jade.runtime will be required automatically for each jade template also.

## License

  MIT
