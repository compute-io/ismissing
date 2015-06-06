'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );

// FUNCTIONS //

var ismissing1 = require( './array.js' ),
	ismissing2 = require( './accessor.js' ),
	ismissing3 = require( './matrix.js' );

// IS MISSING //

/**
* FUNCTION: ismissing( x[, opts] )
*	Computes an element-wise check for missing values.
*
* @param {Number|Number[]|Array} x - input value
* @param {Object} [opts] - function options
* @param {Array} [opts.encoding=[null, NaN] ] - array whose elements encode missing values
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new array
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @returns {Number|Number[]|Null} output array or null
*/
function ismissing( x, options ) {

	var opts = {},
		err,
		out,
		copy,
		encoding;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	copy = (opts.copy === undefined) ? true : false;
	encoding = opts.encoding || [ null ];

	if ( isMatrixLike( x ) ) {
		if ( copy === false ) {
			out = x;
		}
		else {
			out = matrix( x.shape, x.dtype );
		}
		out = ismissing3( out, x, encoding );
		return out;
	}

	if ( isArrayLike( x ) ) {
		if ( !x.length ) {
			return null;
		}
		if ( copy ) {
			out = new Array( x.length );
		}
		else {
			out = x;
		}
 		if ( opts.accessor ) {
			out = ismissing2( out, x, encoding, opts.accessor );
		}
		else {
			out = ismissing1( out, x, encoding );
		}
		return out;
	}

	throw new TypeError( 'ismissing()::invalid input argument. Input value type not currently supported. Value: `' + x + '`.' );

} // end FUNCTION ismissing()


// EXPORTS //

module.exports = ismissing;
