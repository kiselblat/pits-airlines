"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var findRoutes_1 = require("./js/findRoutes");
var flightList_1 = require("./js/flightList");
var parseCommand_1 = require("./js/parseCommand");
var flights = new flightList_1.FlightList;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    //   terminal: false
});
rl.on("line", function (line) {
    var newLine = line.trim();
    if (!newLine) {
        return;
    }
    var processedCmd = (0, parseCommand_1.parseCommand)(newLine);
    if (!processedCmd) {
        handleMalformed(newLine);
        return;
    }
    var command = processedCmd.command, params = processedCmd.params;
    switch (command) {
        case "ADD":
            handleAdd(params);
            break;
        case "QUERY":
            handleQuery(params);
            break;
        default:
            handleMalformed(newLine);
            break;
    }
});
function handleAdd(params) {
    if (params.length !== 4) {
        handleMalformed("ADD,".concat(params.join(",")));
        return;
    }
    var origin = params[0], destination = params[1], distStr = params[2], timeStr = params[3];
    if (!origin || !destination || !distStr || !timeStr) {
        handleMalformed("ADD,".concat(params.join(",")));
        return;
    }
    var distance = parseFloat(distStr);
    var time = parseFloat(timeStr);
    if (isNaN(distance) || distance < 0 || isNaN(time) || time < 0) {
        handleMalformed("ADD,".concat(params.join(",")));
        return;
    }
    flights.addOrUpdateFlight(origin, destination, distance, time);
    console.log("EDGE ".concat(origin, ",").concat(destination, ",").concat(distStr, ",").concat(timeStr));
}
function handleQuery(params) {
    if (params.length !== 2) {
        handleMalformed("QUERY,".concat(params.join(",")));
        return;
    }
    var origin = params[0], destination = params[1];
    if (!origin || !destination) {
        handleMalformed("QUERY,".concat(params.join(",")));
        return;
    }
    var paths = (0, findRoutes_1.allPaths)(flights.getFlights(), origin, destination);
    if (paths.length === 0) {
        handleMalformed("QUERY,".concat(params.join(",")));
        return;
    }
    console.log("RESULT ".concat(origin, ",").concat(destination));
    paths.sort(function (a, b) { return a.cost = b.cost; });
    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
        var path = paths_1[_i];
        var pathStr = "PATH ".concat(path.cost, ",").concat(path.cities.join(","));
        console.log(pathStr);
    }
}
function handleMalformed(line) {
    console.error("MALFORMED ".concat(line));
}
