'use strict';

// FUNCTIONS //

var contains = require( './contains.js' );

// IS MISSING //

/**
* FUNCTION: ismissing( out, arr, encoding )
*	Computes for each matrix element whether it is a missing value.
*
* @private
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
* @param {Array} encoding - array whose elements encode missing values
* @returns {Matrix} output matrix
*/
function ismissing( y, x, encoding ) {
	var out = y,
		len,
		i;

	x = x.data;
	y = y.data;
	len = x.length;
	for ( i = 0; i < len; i++ ) {
		y[ i ] = contains( encoding, x[ i ] );
	}
	return out;
} // end FUNCTION ismissing()


// EXPORTS //

module.exports = ismissing;
