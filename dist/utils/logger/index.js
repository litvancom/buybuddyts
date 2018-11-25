"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
exports.logger = pino_1.default({
    name: "bbl",
    level: "debug",
    prettyPrint: true
});
exports.logCath = (e) => {
    exports.logger.error(e);
};
//# sourceMappingURL=index.js.map