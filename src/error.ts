export class MonstaError extends Error {
  public type: "query" | "mutation";
  public callingFunction: string;

  constructor(_type: "query" | "mutation", _callingFunction: string, _message: string) {
    super(_message);
    this.type = _type;
    this.callingFunction = _callingFunction;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, MonstaError.prototype);
  }
}
