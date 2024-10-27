export class Cell {
  public readonly columnId: string;
  public readonly type: string;
  public readonly text: string | null;
  public readonly value: Record<string, unknown>;
  public readonly title: string;

  constructor(
    _columnId: string,
    _text: string | null,
    _type: string,
    _value: Record<string, unknown>,
    _title: string,
  ) {
    this.columnId = _columnId;
    this.text = _text;
    this.type = _type;
    this.value = _value;
    this.title = _title;
  }


  public getValue(): null | boolean | number | string {
    if(this.type === 'checkbox'){
      return Boolean(this.value.checked);
    } else if (this.type === 'numbers') {
      return Number(this.text);
    } else {
      return this.text;
    }
  }
}
