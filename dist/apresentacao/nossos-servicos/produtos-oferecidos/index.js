"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aplicacoes_1 = __importDefault(require("./aplicacoes"));
const bots_1 = __importDefault(require("./bots"));
const web_sites_1 = __importDefault(require("./web-sites"));
exports.default = {
    id: '3',
    title: 'Produtos Oferecidos',
    text: 'Na nossa empresa, oferecemos soluções digitais inovadoras que incluem bots personalizados, aplicações e websites. Nossos bots inteligentes automatizam interações, melhorando o atendimento ao cliente e facilitando processos. Criamos aplicações sob medida, tanto para dispositivos móveis quanto para a web, garantindo uma experiência ágil e acessível. Além disso, desenvolvemos websites profissionais, que vão desde sites institucionais até lojas virtuais, todos projetados para serem atraentes, funcionais e otimizados para SEO. Com foco na qualidade e usabilidade, estamos prontos para transformar suas ideias em realidade. Entre em contato e descubra como podemos ajudar!',
    options: [aplicacoes_1.default, bots_1.default, web_sites_1.default],
};
