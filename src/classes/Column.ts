export class Column {
    private _columnId: string;
    private _type: string;
    private _title: string;
  
    constructor(
      _columnId: string,
      _type: string,
      _title: string
    ) {
      this._columnId = _columnId;
      this._type = _type;
      this._title = _title;
    }
  
    public get title() {
      return this._title;
    }
  
    public get columnId() {
      return this._columnId;
    }
  
    public get type(){
      return this._type;
    }
  }
  