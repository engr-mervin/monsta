import { ClientOptions } from "../types/types";

export class User {
  private readonly _clientOptions!: ClientOptions;
  private _userId: number;
  private _name: string;
  private _email: string;

  constructor(
    _clientOptions: ClientOptions,
    _userId: number,
    _name: string,
    _email: string,
  ) {
    Object.defineProperty(this, "_clientOptions", {
      value: _clientOptions,
      enumerable: false,
      writable: true,
      configurable: true,
    });
    this._userId = _userId;
    this._name = _name;
    this._email = _email;
  }

  public get userId() {
    return this._userId;
  }

  public get name() {
    return this._name;
  }

  public get email() {
    return this._email;
  }
}
