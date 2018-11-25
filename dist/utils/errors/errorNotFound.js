"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorNotFound extends Error {
    constructor(message) {
        super(message || "Not Found");
    }
}
exports.ErrorNotFound = ErrorNotFound;
