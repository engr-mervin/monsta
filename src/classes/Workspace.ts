import { getWorkspace } from "../queries/methods/getWorkspace";
import { ClientOptions, QueryRequestOptions } from "../types/types";
import { Board } from "./Board";

export class Workspace {
  private readonly _clientOptions!: ClientOptions;
  private _workspaceId: number;
  private _name: string;
  private _boards?: Board[];

  constructor(
    _clientOptions: ClientOptions,
    _workspaceId: number,
    _name: string,
    _boards?: Board[]
  ) {
    Object.defineProperty(this, "_clientOptions", {
      value: _clientOptions,
      enumerable: false,
      writable: true,
      configurable: true,
    });
    this._workspaceId = _workspaceId;
    this._name = _name;
    this._boards = _boards;
  }

  public get name() {
    return this._name;
  }
  public get workspaceId() {
    return this._workspaceId;
  }
  public get boards() {
    return this._boards;
  }

  public async update(
    requestOptions: QueryRequestOptions & { includeColumns: boolean }
  ) {
    const updatedWS = await getWorkspace(
      this._clientOptions,
      this._workspaceId,
      requestOptions
    );
    if (!updatedWS) {
      throw new Error("Tried updating deleted workspace");
    }
    this._name = updatedWS.name;
    this._boards = updatedWS.boards;

    return this;
  }
}
