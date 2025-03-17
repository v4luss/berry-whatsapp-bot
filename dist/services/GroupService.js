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
exports.getBerrysCompanyCreatedGroup = getBerrysCompanyCreatedGroup;
exports.createBerrysCompanyGroup = createBerrysCompanyGroup;
exports.startChat = startChat;
function getBerrysCompanyCreatedGroup(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const chats = yield client.getChats();
        const a = chats.filter((c) => c.name == 'Berry Companys Chat')[0];
        console.log(a);
        return a;
    });
}
function createBerrysCompanyGroup(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const g = yield client.createGroup('Berry Companys Chat', client.info.wid._serialized);
        console.log(g);
        return g;
    });
}
function startChat(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdGroup = yield getBerrysCompanyCreatedGroup(client);
        return createdGroup && createdGroup != null
            ? createdGroup
            : yield createBerrysCompanyGroup(client);
    });
}
