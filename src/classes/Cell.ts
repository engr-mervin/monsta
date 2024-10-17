export class Cell {
  public readonly columnId: string;
  public readonly type: string;
  public readonly text: string | null;
  public readonly value: Record<string, unknown>;

  constructor(
    _columnId: string,
    _text: string | null,
    _type: string,
    _value: Record<string, unknown>
  ) {
    this.columnId = _columnId;
    this.text = _text;
    this.type = _type;
    this.value = _value;
  }
}
