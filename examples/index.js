'use strict';

var isMissing = require( './../lib' );

console.log( isMissing( [ 1, null, null, 3 ] ) );

console.log( isMissing( [ 'abc', 'def', '', 'ghi', 'jkl', ''], {'encoding': ['']} ) );

console.log( isMissing( [ {'x': 2}, {'x': 999}, {'x': 4} ], {'encoding': [999], 'accessor': function(d){ return d.x;}} ) );
