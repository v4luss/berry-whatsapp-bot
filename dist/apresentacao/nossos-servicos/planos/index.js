"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const avancado_1 = __importDefault(require("./avancado"));
const basico_1 = __importDefault(require("./basico"));
const empresarial_1 = __importDefault(require("./empresarial"));
const medio_1 = __importDefault(require("./medio"));
exports.default = {
    id: '1',
    title: 'Planos',
    text: 'Estamos aqui para oferecer a melhor solução para o seu projeto! Nossos planos são flexíveis e personalizados para atender às suas necessidades específicas. Conheça as opções que disponibilizamos:',
    options: [basico_1.default, medio_1.default, avancado_1.default, empresarial_1.default],
};
