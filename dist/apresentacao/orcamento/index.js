"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const bot_1 = __importDefault(require("./bot"));
const site_1 = __importDefault(require("./site"));
exports.default = {
    id: '2',
    title: 'Orçamento',
    text: 'Estamos prontos para ajudar você a transformar suas ideias em realidade! Oferecemos orçamentos personalizados para a criação de sites, aplicações e soluções que combinam ambos. Nosso processo de orçamento é simples e transparente, garantindo que você receba uma proposta que atenda às suas necessidades e expectativas.',
    options: [app_1.default, bot_1.default, site_1.default],
};
