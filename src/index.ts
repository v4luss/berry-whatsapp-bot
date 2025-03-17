import WAWebJS, {
	Chat,
	Client,
	Message,
	LocalAuth,
	NoAuth,
} from 'whatsapp-web.js';
import { createBerrysCompanyGroup, startChat } from './services/GroupService';
import { CurrentNode } from './models/CurrentNode';
import presentationNode from './apresentacao';
import Strategy from './services/Strategy';
import apresentacao from './apresentacao';
import * as dotenv from 'dotenv';
import QRCode from 'qrcode';
const fs = require('fs');
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

const client: Client = new Client({
	authStrategy: new LocalAuth(),
	puppeteer: {
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	},
});
let berrysCompanyGroup: any;
let strategy = new Strategy(presentationNode);
let img: string;

client.on('qr', async (qr: string) => {
	try {
		qrcode.generate(qr, { small: true });
		const qrImageUrl = await QRCode.toDataURL(qr);

		img = qrImageUrl;
		console.log('QR Code URL:', qrImageUrl);
	} catch (e) {}
});

client.on('ready', async () => {
	console.log('Client is ready.');
	try {
		client.createGroup(
			'Berry Company Chat',
			client.info.wid._serialized,
		);
	} catch (e) {
		console.log('Erro ao criar grupo.');
	}
});
client.on('message_create', async (message: any) => {
	try {
		if (message.body.toLowerCase() == 'iniciar') {
			strategy = new Strategy(presentationNode);
		}
		if (message.body.toLowerCase() == 'voltar') {
			strategy = new Strategy(presentationNode);
		}
		if (
			strategy.currentNode.options
				?.map((o) => o.id)
				.includes(message.body.toLowerCase()) &&
			message.fromMe
		) {
			strategy.setNode(message.body);
		}
		if (
			inputOptions.includes(message.body.toLowerCase()) &&
			message.fromMe &&
			(await message.getChat()).name == 'Berry Company Chat'
		) {
			console.log(message.body);
			const messageToSend = `${strategy.displayTitle()}
		${strategy.displayText()}
		${strategy.displayOptions()}
		${
			nodesForwardAssistance.includes(
				strategy.currentNode.title,
			)
				? 'Digite "ok" para falar com um assistente.'
				: ''
		}
		voltar
		`;

			console.log(`
			Mensagem do cliente: ${message.body} 
			Mensagem do Bot: ${messageToSend}`);

			client.sendMessage(
				(await message.getChat()).id._serialized,
				messageToSend,
			);
		}
		if (
			nodesForwardAssistance.includes(
				strategy.currentNode.title,
			) &&
			message.body.toLowerCase() == 'ok'
		) {
			// Number where you want to send the message.
			const number = process.env
				.CALLBACK_PHONE_NUMBER as string;

			// Your message.
			const text = `Úsuario quer assistencia para a área de ${strategy.currentNode.title}`;

			// Getting chatId from the number.
			// we have to delete "+" from the beginning and add "@c.us" at the end of the number.
			const chatId = number.substring(1) + '@c.us';

			client.sendMessage(
				(await message.getChat()).id._serialized,
				`Estamos encaminhando sua requisição para um de nossos atendentes! Obrigado por escolher a Berry Company!`,
			);
			// Sending message.
			client.sendMessage(chatId, text);
		}
	} catch (e) {}
});
client.initialize();

app.get('/', (req: any, res: any, next: any) => {
	try {
		res.send(img);
	} catch (e) {}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
module.exports = app;
