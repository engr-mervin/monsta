export class Group {
  public readonly id: string;
  public readonly title: string;
  public readonly boardId: string;

  constructor(_id: string, _title: string, _boardId: string) {
    this.id = _id;
    this.title = _title;
    this.boardId = _boardId;
  }
}

export class Row {
  public readonly id: string;
  public readonly groupId: string;
  public readonly boardId: string;
  public readonly cells: Record<string, Cell>;

  constructor(_id: string, _groupId: string, _boardId: string, _cells: Record<string, Cell>) {
    this.id = _id;
    this.groupId = _groupId;
    this.boardId = _boardId;
    this.cells = _cells;
  }
}

export class Cell {
  public readonly id: string;
  public readonly type: string;
  public readonly text: string | null;
  public readonly value: Record<string, unknown>;

  constructor(_id: string, _text: string | null, _type: string, _value: Record<string, unknown>) {
    this.id = _id;
    this.text = _text;
    this.type = _type;
    this.value = _value;
  }
}
