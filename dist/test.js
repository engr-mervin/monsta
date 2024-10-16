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
const createMondayClient_js_1 = require("./createMondayClient.js");
const m1 = (0, createMondayClient_js_1.createMondayClient)({
    name: "test",
    apiToken: "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI5NTgxMzQ5MywiYWFpIjoxMSwidWlkIjo1MDQ2MTIxNCwiaWFkIjoiMjAyMy0xMS0xM1QxMzoxNTowNy4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6OTExNTEwMSwicmduIjoidXNlMSJ9.uRv_szENt79ENltg_SEDWPvWdG31o_fBT-TKVeUcRkQ",
    version: "2024-10",
});
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const groups = yield m1.getGroupsByBoard(7339350165);
        console.log(JSON.stringify(groups));
        const rows = yield m1.getRowsByGroup(groups[0]);
        console.log(JSON.stringify(rows[0].cells["status_17__1"], null, 2));
    });
})();
//# sourceMappingURL=test.js.map