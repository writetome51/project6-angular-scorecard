var TestClass = /** @class */ (function () {
    function TestClass() {
        this._thing = '';
    }
    Object.defineProperty(TestClass.prototype, "thing", {
        get: function () {
            return this._thing;
        },
        set: function (value) {
            this._thing = 'This is the ' + value;
        },
        enumerable: true,
        configurable: true
    });
    return TestClass;
}());
var test = new TestClass();
test.thing = 'beast';
console.log(test.thing);
console.log();
