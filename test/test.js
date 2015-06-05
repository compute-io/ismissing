/* global require, describe, it */
'use strict';

// MODULES //

var matrix = require( 'dstructs-matrix' );

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	isMissing = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-ismissing', function tests() {

	it( 'should export a function', function test() {
		expect( isMissing ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid input type', function test() {
		var values = [
				5,
				'5',
				{},
				true,
				null,
				undefined,
				NaN,
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				isMissing( value );
			};
		}
	});

	it( 'should throw an error if `options` is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				isMissing( [1,2,3,4,5], value );
			};
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				isMissing( [1,2,3,4,5], {'accessor': value} );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean', function test() {
		var values = [
			'5',
			5,
			function(){},
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				isMissing( [1,2,3,4,5], {'copy': value} );
			};
		}
	});

	it( 'should throw an error if provided an encoding option which is not an array', function test() {
		var values = [
				5,
				'5',
				{},
				true,
				null,
				undefined,
				NaN,
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				isMissing( [1,2,3,4,5],{'encoding': value} );
			};
		}
	});

	it( 'should check whether elements in array are missing values using default encoding', function test() {
		var data, expected, results;

		data = [ 2, null, 5, null, 8, null ];
		expected = [ 0, 1, 0, 1, 0, 1 ];

		results = isMissing( data );

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
	});

	it( 'should check whether elements in array are missing values using custom encoding', function test() {
		var data, expected, results;

		data = [ 'abc', 'def', '', 'ghi', 'jkl', '' ];
		expected = [ 0, 0, 1, 0, 0, 1 ];

		results = isMissing( data, {'encoding': ['']} );

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
	});

	it( 'should check whether elements in array are missing values using custom encoding including NaN', function test() {
		var data, expected, results;

		data = [ 2, null, 5, NaN, 8, null ];
		expected = [ 0, 1, 0, 1, 0, 1 ];

		results = isMissing( data, {'encoding': [NaN, null]} );

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
	});

	it( 'should check whether elements in a matrix are missing values', function test() {
		var data, expected, results;

		data = matrix( new Int32Array( [ 2, 4, 5, 3, 999, 3, 999, 2, 1 ] ), [3,3] );
		expected = '0,0,0;0,1,0;1,0,0';

		results = isMissing( data, {'encoding':[999]} );

		assert.strictEqual( results.toString(), expected );
	});

	it( 'should check whether elements in array are missing values using an accessor', function test() {
		var data, expected, actual;

		data = [
			{'x':2},
			{'x':null},
			{'x':5},
			{'x':null},
			{'x':8},
			{'x':2}
		];

		actual = isMissing( data, {'accessor': getValue} );
		expected = [ 0, 1, 0, 1, 0, 0 ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should check whether elements in array are missing values and mutate the input array', function test() {
		var data, expected, results;

		data = [ 2, 4, null, 3, null, 2 ];
		expected = [ 0, 0, 1, 0, 1, 0 ];

		results = isMissing( data, {'copy': false} );

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
		assert.ok( results === data );
	});


	it( 'should check whether elements in a matrix are missing values and mutate the input array', function test() {
		var data, expected, results;

		data = matrix( new Int32Array( [ 2, 981, 999, 3 ] ), [2,2] );
		expected = matrix( new Int32Array( [ 0, 1, 1, 0 ] ), [2,2] );

		results = isMissing( data, {'copy': false, 'encoding': [999, 981]} );

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
		assert.ok( results === data );
	});

	it( 'should check whether elements in array are missing values using an accessor and mutate the input array', function test() {
		var data, expected, actual;

		data = [
			{'x':2},
			{'x':null},
			{'x':5},
			{'x':null},
			{'x':8},
			{'x':2}
		];

		actual = isMissing( data, {'accessor': getValue, 'copy':false} );
		expected = [ 0, 1, 0, 1, 0, 0 ];
		assert.ok( actual === data );

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});


	it( 'should return null if provided an empty array', function test() {
		assert.isNull( isMissing( [] ) );
	});

});
