"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var alsatian_1 = require("alsatian");
var TruthTests = /** @class */ (function () {
    function TruthTests() {
    }
    TruthTests.prototype.shouldBeTrue = function () {
        alsatian_1.Expect(true).toBeTruthy();
    };
    tslib_1.__decorate([
        alsatian_1.Test()
    ], TruthTests.prototype, "shouldBeTrue");
    TruthTests = tslib_1.__decorate([
        alsatian_1.TestFixture("Truth")
    ], TruthTests);
    return TruthTests;
}());
exports.TruthTests = TruthTests;
