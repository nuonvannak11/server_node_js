"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTimeout = void 0;
function withTimeout(fn, timeout) {
    return async (req, res, next) => {
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), timeout));
        try {
            await Promise.race([fn(req, res, next), timeoutPromise]);
        }
        catch (error) {
            console.log("error", error);
            next(error);
        }
    };
}
exports.withTimeout = withTimeout;
