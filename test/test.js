'use strict';

// MODULES //

var test = require( 'tape' );
var lib = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof lib === 'function', 'main export is a function' );
	t.end();
});
