'use strict';

// MODULES //

var tape = require( 'tape' );
var ninf = require( 'const-ninf-float64' );
var pinf = require( 'const-pinf-float64' );
var copysign = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/data.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof copysign, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a double-precision floating-point number with the magnitude of `x` and the sign of `y`', function test( t ) {
	var expected;
	var actual;
	var x;
	var y;
	var i;

	x = data.x;
	y = data.y;
	expected = data.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = copysign( x[i], y[i] );
		t.equal( actual, expected[i], 'returns '+expected[i] );
	}
	t.end();
});

tape( 'if `x` is `NaN`, the function returns `NaN`', function test( t ) {
	var z;

	z = copysign( NaN, -1 );
	t.ok( z !== z, 'returns NaN' );

	z = copysign( NaN, 1 );
	t.ok( z !== z, 'returns NaN' );

	t.end();
});

tape( 'if `y` is `NaN`, the function could (theoretically) return either a positive or negative number', function test( t ) {
	var z;

	z = copysign( -1, NaN );
	t.ok( z === z, 'does not return NaN' );

	z = copysign( 1, NaN );
	t.ok( z === z, 'does not return NaN' );

	t.end();
});

tape( 'if `x` is `+infinity`, the function returns an infinite number', function test( t ) {
	var z;

	z = copysign( pinf, -1 );
	t.equal( z, ninf, 'returns -infinity' );

	z = copysign( pinf, 1 );
	t.equal( z, pinf, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `+infinity`, the function returns a positive number', function test( t ) {
	var z;

	z = copysign( -1, pinf );
	t.equal( z, 1, 'returns +1' );

	z = copysign( 1, pinf );
	t.equal( z, 1, 'returns +1' );

	t.end();
});

tape( 'if `x` is `-infinity`, the function returns an infinite number', function test( t ) {
	var z;

	z = copysign( ninf, -1 );
	t.equal( z, ninf, 'returns -infinity' );

	z = copysign( ninf, 1 );
	t.equal( z, pinf, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `-infinity`, the function returns a negative number', function test( t ) {
	var z;

	z = copysign( -1, ninf );
	t.equal( z, -1, 'returns -1' );

	z = copysign( 1, ninf );
	t.equal( z, -1, 'returns -1' );

	t.end();
});

tape( 'the function supports copying a sign from `0`', function test( t ) {
	var x;
	var z;

	x = 3.14;

	z = copysign( x, 0 );
	t.equal( z, 3.14, 'returns +3.14' );

	z = copysign( x, -0 );
	t.equal( z, -3.14, 'returns -3.14' );

	t.end();
});

tape( 'the function supports copying a sign to `0`', function test( t ) {
	var z;

	z = copysign( -0, 1 );
	t.equal( z, 0, 'returns +0' );

	z = copysign( 0, -1 );
	t.equal( 1/z, ninf, 'returns -0' );

	t.end();
});
