"use strict";
// calculate costs of flight legs and routes
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateLeg = calculateLeg;
function calculateLeg(distance, flightTime) {
    var cost = distance * 15 + flightTime * 30;
    return parseFloat(cost.toFixed(2));
}
