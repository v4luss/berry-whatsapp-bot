"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const planos_1 = __importDefault(require("./planos"));
const portifolio_1 = __importDefault(require("./portifolio"));
const produtos_oferecidos_1 = __importDefault(require("./produtos-oferecidos"));
exports.default = {
    id: '1',
    title: 'Nossos Serviços.',
    text: 'Oferecemos soluções personalizadas para atender às suas necessidades. Conheça nossos principais serviços:',
    options: [planos_1.default, portifolio_1.default, produtos_oferecidos_1.default],
};
