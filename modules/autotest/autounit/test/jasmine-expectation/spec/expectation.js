// "toBe" means "equal"
describe("A suite", function() {
	it("contains spec with an expectation", function() {
		expect(true).toBe(true);
	});
});


//
describe("The 'toBe' matcher compares with ===", function() {

	it("and has a positive case ", function() {
		expect(true).toBe(true);
	});

	it("and can have a negative case", function() {
		expect(false).not.toBe(true);
	});

});


describe("Included matchers:", function() {

	describe("The 'toEqual' matcher", function() {

		it("works for simple literals and variables", function() {
			var a = 12;
			expect(a).toEqual(12);
		});

		it("should work for objects", function() {
			var foo = {
				a: 12,
				b: 34
			};
			var bar = {
				a: 12,
				b: 34
			};
			expect(foo).toEqual(bar);
		});
	});


	it("The 'toMatch' matcher is for regular expressions", function() {
		var message = 'foo bar baz';

		expect(message).toMatch(/bar/);
		expect(message).toMatch('bar');
		expect(message).not.toMatch(/quux/);
	});

	it("The 'toBeDefined' matcher compares against `undefined`", function() {
		var a = {
			foo: 'foo'
		};

		expect(a.foo).toBeDefined();
		expect(a.bar).not.toBeDefined();
	});

	it("The `toBeUndefined` matcher compares against `undefined`", function() {
		var a = {
			foo: 'foo'
		};

		expect(a.foo).not.toBeUndefined();
		expect(a.bar).toBeUndefined();
	});

	it("The 'toBeNull' matcher compares against null", function() {
		var a = null;
		var foo = 'foo';

		expect(null).toBeNull();
		expect(a).toBeNull();
		expect(foo).not.toBeNull();
	});

	it("The 'toBeTruthy' matcher is for boolean casting testing", function() {
		var a, foo = 'foo';

		expect(foo).toBeTruthy();
		expect(a).not.toBeTruthy();
	});

	it("The 'toBeFalsy' matcher is for boolean casting testing", function() {
		var a, foo = 'foo';

		expect(a).toBeFalsy();
		expect(foo).not.toBeFalsy();
	});

	it("The 'toContain' matcher is for finding an item in an Array", function() {
		var a = ['foo', 'bar', 'baz'];

		expect(a).toContain('bar');
		expect(a).not.toContain('quux');
	});

	it("The 'toBeLessThan' matcher is for mathematical comparisons", function() {
		var pi = 3.1415926,
			e = 2.78;

		expect(e).toBeLessThan(pi);
		expect(pi).not.toBeLessThan(e);
	});

	it("The 'toBeGreaterThan' is for mathematical comparisons", function() {
		var pi = 3.1415926,
			e = 2.78;

		expect(pi).toBeGreaterThan(e);
		expect(e).not.toBeGreaterThan(pi);
	});

	it("The 'toBeCloseTo' matcher is for precision math comparison", function() {
		var pi = 3.1415926,
			e = 2.78;

		expect(pi).not.toBeCloseTo(e, 2);
		expect(pi).toBeCloseTo(e, 0);
	});

	it("The 'toThrow' matcher is for testing if a function throws an exception", function() {
		var foo = function() {
			return 1 + 2;
		};
		var bar = function() {
			return a + 1;
		};

		expect(foo).not.toThrow();
		expect(bar).toThrow();
	});
});



describe("A spec", function() {
	it("is just a function, so it can contain any code", function() {
		var foo = 0;
		foo += 1;

		expect(foo).toEqual(1);
	});

	it("can have more than one expectation", function() {
		var foo = 0;
		foo += 1;

		expect(foo).toEqual(1);
		expect(true).toEqual(true);
	});
});


describe("A spec (with setup and tear-down)", function() {
	var foo;

	beforeEach(function() {
		foo = 0;
		foo += 1;
	});

	afterEach(function() {
		foo = 0;
	});

	it("is just a function, so it can contain any code", function() {
		expect(foo).toEqual(1);
	});

	it("can have more than one expectation", function() {
		expect(foo).toEqual(1);
		expect(true).toEqual(true);
	});
});

describe("A spec", function() {
	var foo;

	beforeEach(function() {
		foo = 0;
		foo += 1;
	});

	afterEach(function() {
		foo = 0;
	});

	it("is just a function, so it can contain any code", function() {
		expect(foo).toEqual(1);
	});

	it("can have more than one expectation", function() {
		expect(foo).toEqual(1);
		expect(true).toEqual(true);
	});

	describe("nested inside a second describe", function() {
		var bar;

		beforeEach(function() {
			bar = 1;
		});

		it("can reference both scopes as needed ", function() {
			expect(foo).toEqual(bar);
		});
	});
});


describe("A spy", function() {
	var foo, bar = null;

	beforeEach(function() {
		foo = {
			setBar: function(value) {
				bar = value;
			}
		};

		spyOn(foo, 'setBar');

		foo.setBar(123);
		foo.setBar(456, 'another param');
	});

	it("tracks that the spy was called", function() {
		expect(foo.setBar).toHaveBeenCalled();
	});

	it("tracks its number of calls", function() {
		expect(foo.setBar.calls.length).toEqual(2);
	});

	it("tracks all the arguments of its calls", function() {
		expect(foo.setBar).toHaveBeenCalledWith(123);
		expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
	});

	it("allows access to the most recent call", function() {
		expect(foo.setBar.mostRecentCall.args[0]).toEqual(456);
	});

	it("allows access to other calls", function() {
		expect(foo.setBar.calls[0].args[0]).toEqual(123);
	});

	it("stops all execution on a function", function() {
		expect(bar).toBeNull();
	});
});



describe("Asynchronous specs", function() {
	var value, flag;

	it("should support async execution of test preparation and exepectations", function() {

		runs(function() {
			flag = false;
			value = 0;

			setTimeout(function() {
				flag = true;
			}, 3000);
		});

		waitsFor(function() {
			value++;
			return flag;
		}, "The Value should be incremented", 4000);

		runs(function() {
			expect(value).toBeGreaterThan(0);
		});
	});
});