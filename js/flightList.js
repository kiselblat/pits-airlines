"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightList = void 0;
// Manages edges in an adjacency list.
// Implements adding and updating flights and retrieving entire list
var FlightList = /** @class */ (function () {
    function FlightList() {
        this.flights = {};
    }
    FlightList.prototype.addOrUpdateFlight = function (origin, destination, distance, time) {
        if (!this.flights[origin]) {
            this.flights[origin] = [];
        }
        var legIndex = this.flights[origin].findIndex(function (leg) { return leg.destination === destination; });
        if (legIndex >= 0) {
            this.flights[origin][legIndex].distance = distance;
            this.flights[origin][legIndex].time = time;
        }
        else {
            this.flights[origin].push({ destination: destination, distance: distance, time: time });
        }
    };
    FlightList.prototype.getFlights = function () {
        return this.flights;
    };
    return FlightList;
}());
exports.FlightList = FlightList;
