"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorUnauthenticated extends Error {
    constructor(message) {
        super(message || "Unauthenticated");
    }
}
exports.ErrorUnauthenticated = ErrorUnauthenticated;
