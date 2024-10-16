"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllClients = exports.deleteClient = exports.getClient = exports.createMondayClient = void 0;
const queries_js_1 = require("./queries.js");
const clients = new Map();
function createMondayClient(options) {
    if (clients.get(options.name)) {
        throw new Error(`Monday client with name: ${options.name} already exists.`);
    }
    const instance = {
        getGroupsByBoard: queries_js_1.getGroupsByBoard.bind(null, options),
        getRowsByGroup: queries_js_1.getRowsByGroup.bind(null, options),
    };
    clients.set(options.name, instance);
    return instance;
}
exports.createMondayClient = createMondayClient;
function getClient(name) {
    if (clients.has(name)) {
        const instance = clients.get(name);
        if (instance)
            return instance;
    }
    throw new Error(`Monday client with name: ${name} does not exist.`);
}
exports.getClient = getClient;
function deleteClient(name) {
    return clients.delete(name);
}
exports.deleteClient = deleteClient;
function deleteAllClients() {
    return clients.clear();
}
exports.deleteAllClients = deleteAllClients;
//# sourceMappingURL=createMondayClient.js.map