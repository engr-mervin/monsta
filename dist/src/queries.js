"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRowsByGroup = exports.getGroupsByBoard = void 0;
const classes_js_1 = require("./classes.js");
function getGroupsByBoard(clientOptions, boardId, requestOptions = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `query($id: [ID!]){
    boards(ids: $id) {
      id
      groups {
        id
        title
      }
    }
  }`;
        const variables = {
            id: [boardId],
        };
        const result = yield executeGraphQLQuery(clientOptions, requestOptions, query, variables);
        const board = result.data.boards[0];
        if (!board) {
            throw new Error(`Board with board id: ${boardId} not found or you lack the necessary privileges to access this board.`);
        }
        return board.groups.map((group) => new classes_js_1.Group(group.id, group.title, board.id));
    });
}
exports.getGroupsByBoard = getGroupsByBoard;
function getRowsByGroup(clientOptions, group, requestOptions = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `query($id: [ID!], $groupId: [String!]){
    boards(ids: $id) {
        id
        groups(ids: $groupId) {
        id
        title
        items_page {
            items {
            id
            name
            column_values {
                id
                value
                text
                type
            }
            }
        }
        }
    }
    }`;
        const variables = {
            id: group.boardId,
            groupId: group.id,
        };
        const result = yield executeGraphQLQuery(clientOptions, requestOptions, query, variables);
        const board = result.data.boards[0];
        if (!board) {
            throw new Error(`Board with board id: ${group.boardId} not found or you lack the necessary privilege to access this board.`);
        }
        const foundGroup = board.groups[0];
        if (!foundGroup) {
            throw new Error(`Group with group id: ${group.id} not found or you lack the necessary privilege to access this group.`);
        }
        return foundGroup.items_page.items.map((row) => {
            const cells = {};
            row.column_values.forEach((col_value) => {
                cells[col_value.id] = new classes_js_1.Cell(col_value.id, col_value.text, col_value.type, JSON.parse(col_value.value));
            });
            return new classes_js_1.Row(row.id, group.id, group.boardId, cells);
        });
    });
}
exports.getRowsByGroup = getRowsByGroup;
function executeGraphQLQuery(clientOptions, requestOptions, query, variables) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof requestOptions.onStart === "function") {
            requestOptions.onStart();
        }
        else if (!requestOptions.noHooks && typeof clientOptions.onStart === "function") {
            clientOptions.onStart();
        }
        try {
            const response = yield fetch("https://api.monday.com/v2", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${clientOptions.apiToken}`,
                },
                body: JSON.stringify({
                    query,
                    variables,
                }),
            });
            const result = (yield response.json());
            if (typeof requestOptions.onSuccess === "function") {
                requestOptions.onSuccess(result);
            }
            else if (!requestOptions.noHooks && typeof clientOptions.onSuccess === "function") {
                clientOptions.onSuccess(result);
            }
            return result;
        }
        catch (error) {
            if (typeof requestOptions.onError === "function") {
                requestOptions.onError(error);
            }
            else if (!requestOptions.noHooks && typeof clientOptions.onError === "function") {
                clientOptions.onError(error);
            }
            throw error;
        }
    });
}
//# sourceMappingURL=queries.js.map