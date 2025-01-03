export class Asset {
  private _publicUrl: string;
  private _name: string;
  private _assetId: string;
  private _fileSize: number;
  constructor(
    _publicUrl: string,
    _name: string,
    _assetId: string,
    _fileSize: number
  ) {
    this._publicUrl = _publicUrl;
    this._name = _name;
    this._assetId = _assetId;
    this._fileSize = _fileSize;
  }

  public get publicUrl() {
    return this._publicUrl;
  }
  public get name() {
    return this._name;
  }
  public get assetId() {
    return this._assetId;
  }
  public get fileSize() {
    return this._fileSize;
  }
}
