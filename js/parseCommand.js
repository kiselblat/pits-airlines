"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommand = parseCommand;
function parseCommand(line) {
    var spaceIdx = line.indexOf(" ");
    if (spaceIdx === -1) {
        return null;
    }
    var command = line.substring(0, spaceIdx).trim();
    var paramStr = line.substring(spaceIdx + 1).trim();
    if (!command)
        return null;
    var params = paramStr.split(",").map(function (param) { return param.trim(); });
    return { command: command, params: params };
}
