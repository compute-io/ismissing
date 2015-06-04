'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' );


// VALIDATE //

/**
* FUNCTION: validate( opts )
*	Validates function options. If an option is not present, a default option value is set.
*
* @private
* @param {Object} opts - function options
* @param {Array} encoding - array of values encoding missing values
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new array
* @param {Function} [opts.accessor=null] - accessor function for accessing array values
* @returns {Null|Error} null or an error
*/
function validate( opts ) {
	if ( !isObject( opts ) ) {
		return new TypeError( 'iseven()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
	}

	if ( opts.hasOwnProperty( 'encoding' ) ) {
		if ( !isArray( opts.encoding ) ) {
			return new TypeError( 'ismissing()::invalid option. Encoding option must be an array. Option: `' + opts.encoding + '`.' );
		}
	} else {
		opts.encoding = [ null ];
	}

	if ( opts.hasOwnProperty( 'copy' ) ) {
		if ( !isBoolean( opts.copy ) ) {
			return new TypeError( 'iseven()::invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	} else {
		opts.copy = true;
	}

	if ( opts.hasOwnProperty( 'accessor' ) ) {
		if ( !isFunction( opts.accessor ) ) {
			return new TypeError( 'iseven()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.' );
		}
	} else {
		opts.accessor = null;
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
