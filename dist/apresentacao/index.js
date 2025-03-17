"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nossos_servicos_1 = __importDefault(require("./nossos-servicos"));
const orcamento_1 = __importDefault(require("./orcamento"));
const suporte_1 = __importDefault(require("./suporte"));
exports.default = {
    id: '1',
    title: 'Apresentação',
    text: 'Olá! 👋 Bem-vindo à Berry Companys! Estamos aqui para ajudar você com soluções de software, websites e aplicativos. Como posso ajudá-lo(a) hoje? (Para navegar pelas opções, escreva o numero correspondente.)',
    options: [nossos_servicos_1.default, orcamento_1.default, suporte_1.default],
};
