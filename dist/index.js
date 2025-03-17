"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const apresentacao_1 = __importDefault(require("./apresentacao"));
const Strategy_1 = __importDefault(require("./services/Strategy"));
const dotenv = __importStar(require("dotenv"));
const qrcode_1 = __importDefault(require("qrcode"));
const express = require('express');
const qrcode = require('qrcode-terminal');
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
const inputOptions = [
    'iniciar',
    'voltar',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
];
const nodesForwardAssistance = [
    'Problemas Com Projeto',
    'Plano Médio - R$350,00',
    'Plano Básico - R$165,00',
    'Empresarial',
    'Plano Avançado - R$900,00',
    'Aplicação',
    'Bots',
    'Web Sites',
    'Financeiro',
];
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.NoAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
});
let berrysCompanyGroup;
let strategy = new Strategy_1.default(apresentacao_1.default);
let img;
client.on('qr', (qr) => __awaiter(void 0, void 0, void 0, function* () {
    qrcode.generate(qr, { small: true });
    const qrImageUrl = yield qrcode_1.default.toDataURL(qr);
    img = qrImageUrl;
    console.log('QR Code URL:', qrImageUrl);
}));
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Client is ready.');
    try {
        client.createGroup('Berry Company Chat', client.info.wid._serialized);
    }
    catch (e) {
        console.log('Erro ao criar grupo.');
    }
}));
client.on('message_create', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (message.body.toLowerCase() == 'iniciar') {
        strategy = new Strategy_1.default(apresentacao_1.default);
    }
    if (message.body.toLowerCase() == 'voltar') {
        strategy = new Strategy_1.default(apresentacao_1.default);
    }
    if (((_a = strategy.currentNode.options) === null || _a === void 0 ? void 0 : _a.map((o) => o.id).includes(message.body.toLowerCase())) &&
        message.fromMe) {
        strategy.setNode(message.body);
    }
    if (inputOptions.includes(message.body.toLowerCase()) &&
        message.fromMe &&
        (yield message.getChat()).name == 'Berry Company Chat') {
        console.log(message.body);
        const messageToSend = `${strategy.displayTitle()}
		${strategy.displayText()}
		${strategy.displayOptions()}
		${nodesForwardAssistance.includes(strategy.currentNode.title)
            ? 'Digite "ok" para falar com um assistente.'
            : ''}
		voltar
		`;
        console.log(`
			Mensagem do cliente: ${message.body} 
			Mensagem do Bot: ${messageToSend}`);
        client.sendMessage((yield message.getChat()).id._serialized, messageToSend);
    }
    if (nodesForwardAssistance.includes(strategy.currentNode.title) &&
        message.body.toLowerCase() == 'ok') {
        // Number where you want to send the message.
        const number = process.env.CALLBACK_PHONE_NUMBER;
        // Your message.
        const text = `Úsuario quer assistencia para a área de ${strategy.currentNode.title}`;
        // Getting chatId from the number.
        // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
        const chatId = number.substring(1) + '@c.us';
        client.sendMessage((yield message.getChat()).id._serialized, 'Vamos botar você em contato com um de nossos assistentes! Obrigado por escolher a Berry Company!');
        // Sending message.
        client.sendMessage(chatId, text);
    }
}));
client.initialize();
app.get('/', (req, res, next) => {
    res.send(img);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
module.exports = app;
