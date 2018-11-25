"use strict";
exports.__esModule = true;
var pino = require("pino");
exports.logger = pino({
    name: "bbl",
    level: "debug",
    prettyPrint: true
});
exports.logCath = function (e) {
    exports.logger.error(e);
};
