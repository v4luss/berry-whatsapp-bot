"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_1 = __importDefault(require("./blog"));
const e_commerce_1 = __importDefault(require("./e-commerce"));
const institucionais_1 = __importDefault(require("./institucionais"));
const landing_page_1 = __importDefault(require("./landing-page"));
const portifolio_1 = __importDefault(require("./portifolio"));
exports.default = {
    id: '3',
    title: 'Web Sites',
    text: 'Oferecemos serviços de criação de websites personalizados para atender suas necessidades. Nossos projetos incluem e-commerce, blogs, landing pages, websites institucionais e portfólios. Criamos plataformas responsivas e otimizadas, que proporcionam uma excelente experiência de usuário e são adaptáveis a qualquer dispositivo.',
    options: [blog_1.default, e_commerce_1.default, institucionais_1.default, landing_page_1.default, portifolio_1.default],
};
