'use strict';

// MODULES //

var copy = require( 'utils-copy' ),
	isArray = require( 'validate.io-array' ),
	isMatrix = require( 'validate.io-matrix'),
	matrix = require( 'compute-matrix' ),
	validate = require( './validate.js' );

// FUNCTIONS //

var ismissing1 = require( './array.js' ),
	ismissing2 = require( './accessor.js' ),
	ismissing3 = require( './matrix.js' );

// IS MISSING //

/**
* FUNCTION: ismissing( x[, opts] )
*	Computes
*
* @param {Number|Number[]|Array} x - input value
* @param {Object} [opts] - function options
* @param {Array} [opts.encoding=[null, NaN]] - array whose elements encode missing values
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new array
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @returns {Number|Number[]|Null} output array or null
*/
function ismissing( x, options ) {

	var opts,
		err,
		out;

	if ( arguments.length > 1 ) {
		opts = copy( options );
		err = validate( opts );
		if ( err ) {
			throw err;
		}
	} else {
		opts = {
			'encoding': [ null ]
		};
	}
	if ( isArray( x ) ) {
		if ( !x.length ) {
			return null;
		}
		if ( opts.copy ) {
			out = new Array( x.length );
		}
		else {
			out = x;
		}
 		if ( opts.accessor ) {
			out = ismissing2( out, x, opts.encoding, opts.accessor );
		}
		else {
			out = ismissing1( out, x, opts.encoding );
		}
		return out;
	}

	if ( isMatrix( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		}
		else {
			out = matrix( x.shape, x.dtype );
		}
		out = ismissing3( out, x, opts.encoding );
		return out;
	}

	throw new TypeError( 'iseven()::invalid input argument. Input value type not currently supported. Value: `' + x + '`.' );

} // end FUNCTION iseven()


// EXPORTS //

module.exports = ismissing;
