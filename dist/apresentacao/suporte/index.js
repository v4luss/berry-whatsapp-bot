"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const financeiro_1 = __importDefault(require("./financeiro"));
const problema_com_projeto_1 = __importDefault(require("./problema-com-projeto"));
exports.default = {
    id: '3',
    title: 'Suporte',
    text: 'Estamos aqui para oferecer suporte completo! Nossa equipe ajuda com problemas técnicos relacionados ao seu projeto, garantindo que tudo funcione bem. Também oferecemos assistência financeira para esclarecer dúvidas sobre faturamento e pagamentos. Entre em contato conosco sempre que precisar!',
    options: [financeiro_1.default, problema_com_projeto_1.default],
};
