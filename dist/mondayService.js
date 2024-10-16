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
exports.executeGraphQLQuery = void 0;
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
exports.executeGraphQLQuery = executeGraphQLQuery;
//# sourceMappingURL=mondayService.js.map