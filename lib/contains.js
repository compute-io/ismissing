'use strict';

/**
* FUNCTION: contains( arr, val )
*	Checks whether input array contains a certain value
*
* @private
* @param {Array} arr - input array
* @param {*} val - input value
* @returns {Number} 1 if input array contains val, 0 otherwise
*/
function contains( arr, val ) {

	var i, ret = 0;
	if ( !isNaN( val ) ) {
		for ( i = 0; i < arr.length; i++ ) {
			if ( arr[ i ] === val) {
				ret = 1;
			}
		}
	} else {
		for ( i = 0; i < arr.length; i++ ) {
			if ( isNaN( arr[ i ] ) ) {
				ret = 1;
			}
		}
	}
	return ret;
}

module.exports = contains;
