"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allPaths = allPaths;
var calculateCost_1 = require("./calculateCost");
function allPaths(flights, origin, destination) {
    var results = [];
    function search(city, destination, path, totalCost) {
        if (city === destination) {
            results.push({
                cities: __spreadArray([], path, true),
                cost: parseFloat(totalCost.toFixed(2)),
            });
            return;
        }
        if (!flights[city]) {
            return;
        }
        for (var _i = 0, _a = flights[city]; _i < _a.length; _i++) {
            var leg = _a[_i];
            var next = leg.destination;
            if (!path.includes(next)) {
                var legCost = (0, calculateCost_1.calculateLeg)(leg.distance, leg.time);
                search(next, destination, __spreadArray(__spreadArray([], path, true), [next], false), totalCost + legCost);
            }
        }
    }
    search(origin, destination, [origin], 0);
    return results;
}
