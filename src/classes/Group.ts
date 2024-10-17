export class Group {
  public readonly groupId: string;
  public readonly title: string;
  public readonly boardId: number;

  constructor(_groupId: string, _title: string, _boardId: number) {
    this.groupId = _groupId;
    this.title = _title;
    this.boardId = _boardId;
  }
}
