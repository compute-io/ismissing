ismissing
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise check for missing values.


## Installation

``` bash
$ npm install compute-ismissing
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var isMissing = require( 'compute-ismissing' );
```

#### isMissing( x, options )

This function checks for each element of `arrays` and `matrices` whether they are missing values. It returns  an `array` with length equal to that of the input `array` or a `matrix` with same dimensions as input `x`. Each output element is either `0` or `1`. A value of `1` means that an element constitutes a missing value and `0` means that an element is __not__ missing. By default, all elements equal to `null` are considered missing values.

The function accepts three `options`:

* __encoding__: `array` holding all values which will be regarded as missing values. Default: `[null]`.
*  __copy__: `boolean` indicating whether to return a new `array` containing 0/1's indicating whether the corresponding element is an even number. Default: `true`.
*  __accessor__: accessor `function` for accessing numeric values in object `arrays`.

To mutate the input `array` (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var arr = [ 1, null, 3 ];

var out = isMissing( arr, {
	'copy': false
});
// returns [ 0, 1, 0 ]

console.log( arr === out );
// returns true
```

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 1],
	['boop', null],
	['bip', 3],
	['bap', NaN],
	['baz', 5]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = isMissing( data, {
	'accessor': getValue
});
// returns [ 0, 1, 0, 1, 0 ]
```

## Examples

``` javascript
var isMissing = require( 'compute-ismissing' );

console.log( isMissing( [ 1, null, null, 3 ] ) );

console.log( isMissing( [ 'abc', 'def', '', 'ghi', 'jkl', ''], {'encoding': ['']} ) );

console.log( isMissing( [ {'x': 2}, {'x': 999}, {'x': 4} ], {'encoding': [999], 'accessor': function(d){ return d.x;}} ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The Compute.io Authors.


[npm-image]: http://img.shields.io/npm/v/compute-ismissing.svg
[npm-url]: https://npmjs.org/package/compute-ismissing

[travis-image]: http://img.shields.io/travis/compute-io/ismissing/master.svg
[travis-url]: https://travis-ci.org/compute-io/ismissing

[coveralls-image]: https://img.shields.io/coveralls/compute-io/ismissing/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/ismissing?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/ismissing.svg
[dependencies-url]: https://david-dm.org/compute-io/ismissing

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/ismissing.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/ismissing

[github-issues-image]: http://img.shields.io/github/issues/compute-io/ismissing.svg
[github-issues-url]: https://github.com/compute-io/ismissing/issues
