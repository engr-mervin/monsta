"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonstaError = void 0;
class MonstaError extends Error {
    constructor(_type, _callingFunction, _message) {
        super(_message);
        this.type = _type;
        this.callingFunction = _callingFunction;
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, MonstaError.prototype);
    }
}
exports.MonstaError = MonstaError;
//# sourceMappingURL=error.js.map