'use strict';

var isMissing = require( './../lib' );
var matrix = require( 'dstructs-matrix' );

console.log( isMissing( [ 1, null, null, 3 ] ) );

console.log( isMissing( [ 'abc', 'def', '', 'ghi', 'jkl', ''], {
		'encoding': ['']
	})
);

console.log( isMissing( [ {'x': 2}, {'x': 999}, {'x': 4} ], {
		'encoding': [999], 'accessor': function( d ) { return d.x; }
	})
);

var mat = matrix( new Int32Array( [ 2, 981, 999, 3 ] ), [2,2] );
console.log( isMissing( mat, {'encoding': [981, 999]} ) );
