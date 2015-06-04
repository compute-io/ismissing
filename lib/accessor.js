'use strict';

// FUNCTIONS //

var contains = require( './contains.js' );

// IS MISSING //

/**
* FUNCTION: ismissing( out, arr, encoding, accessor )
*	Computes for each array element whether it is a missing value.
*
* @private
* @param {Array} out - output array
* @param {Array} arr - input array
* @param {Array} encoding - array whose elements encode missing values
* @param {Function} accessor - accessor function for accessing array values
* @returns {Array} output array
*/
function ismissing( y, x, encoding, clbk ) {
	var len = x.length,
		i;

	for ( i = 0; i < len; i++ ) {
		y[ i ] = contains( encoding, clbk( x[ i ], i ) );
	}

	return y;
} // end FUNCTION ismissing()


// EXPORTS //

module.exports = ismissing;
