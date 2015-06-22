'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options. If an option is not present, a default option value is set.
*
* @private
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Array} [opts.encoding=[null] ] - array of values encoding missing values
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new array
* @param {Function} [opts.accessor=null] - accessor function for accessing array values
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'ismissing()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
	}

	if ( options.hasOwnProperty( 'encoding' ) ) {
		opts.encoding = options.encoding;
		if ( !isArray( opts.encoding ) ) {
			return new TypeError( 'ismissing()::invalid option. Encoding option must be an array. Option: `' + opts.encoding + '`.' );
		}
	}

	if ( options.hasOwnProperty( 'copy' ) ) {
		opts.copy = options.copy;
		if ( !isBoolean( opts.copy ) ) {
			return new TypeError( 'ismissing()::invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	}

	if ( options.hasOwnProperty( 'accessor' ) ) {
		opts.accessor = options.accessor;
		if ( !isFunction( opts.accessor ) ) {
			return new TypeError( 'ismissing()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.' );
		}
	}

	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
