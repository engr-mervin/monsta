export class Cell {
  private _columnId: string;
  private _type: string;
  private _text: string | null;
  private _value: Record<string, unknown>;
  private _title: string;

  constructor(
    _columnId: string,
    _text: string | null,
    _type: string,
    _value: Record<string, unknown>,
    _title: string
  ) {
    this._columnId = _columnId;
    this._text = _text;
    this._type = _type;
    this._value = _value;
    this._title = _title;
  }

  public get title() {
    return this._title;
  }

  public get columnId() {
    return this._columnId;
  }

  public get rawValue() {
    return this._value;
  }

  public get value(): null | boolean | number | string | [string, string] {
    if (this._type === "checkbox") {
      return Boolean(this._value.checked);
    } else if (this._type === "numbers") {
      return Number(this._text);
    } else if (this._type === "timeline") {
      return [this._value.from as string, this._value.to as string];
    } else {
      return this._text;
    }
  }
}
