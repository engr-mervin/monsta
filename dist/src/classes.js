"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = exports.Row = exports.Group = void 0;
class Group {
    constructor(_id, _title, _boardId) {
        this.id = _id;
        this.title = _title;
        this.boardId = _boardId;
    }
}
exports.Group = Group;
class Row {
    constructor(_id, _groupId, _boardId, _cells) {
        this.id = _id;
        this.groupId = _groupId;
        this.boardId = _boardId;
        this.cells = _cells;
    }
}
exports.Row = Row;
class Cell {
    constructor(_id, _text, _type, _value) {
        this.id = _id;
        this.text = _text;
        this.type = _type;
        this.value = _value;
    }
}
exports.Cell = Cell;
//# sourceMappingURL=classes.js.map