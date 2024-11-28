export class MonstaaError extends Error {
  public type: "query" | "mutation" | "access";

  constructor(_type: "query" | "mutation" | "access", _message: string) {
    super(_message);
    this.type = _type;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, MonstaaError.prototype);
  }
}
