export interface JSONCell {
  _columnId: string;
  _type: string;
  _text: string | null;
  _value: Record<string, unknown>;
  _title: string;
}
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

  public static fromJSON(jsonCell: JSONCell) {
    return new Cell(
      jsonCell._columnId,
      jsonCell._text,
      jsonCell._type,
      jsonCell._value,
      jsonCell._title
    );
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

  public get text() {
    return this._text;
  }

  public get type() {
    return this._type;
  }

  public get value() {
    if (this._type === "checkbox") {
      return Boolean(this._value.checked);
    } else if (this._type === "numbers") {
      return this._text === "" ? null : Number(this._text);
    } else if (this._type === "timeline") {
      return this._value === null
        ? null
        : { from: this._value.from as string, to: this._value.to as string };
    } else if (this._type === "dropdown") {
      return this._text ? this._text.split(",") : null;
    } else if (this._type === "date") {
      return this._value === null ? null : (this._value.date as string);
    } else if (this._type === "file") {
      if (this._value === null) {
        return null;
      }
      const files = this._value.files as { assetId: string; name: string }[];
      return files.map((file) => Number(file.assetId));
    } else {
      return this._text;
    }
  }
}

export type NumberCellValue = null | number;
export type DateCellValue = null | string;
export type TimelineCellValue = null | { from: string; to: string };
export type FileCellValue = null | number[];
export type DropdownCellValue = null | string[];
export type HourCellValue = null | { hour: string; minute: string };

export type FileCellRawValue = {
  files: {
    name: string;
    assetId: number;
    isImage: string;
    fileType: string;
    createdAt: number;
    createdBy: string;
  }[];
};

export type CellValue =
  | null
  | boolean
  | number
  | string
  | DateCellValue
  | TimelineCellValue
  | FileCellValue
  | DropdownCellValue
  | NumberCellValue
  | HourCellValue;
