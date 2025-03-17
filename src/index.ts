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
import { MongoClient } from 'mongodb';
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

// MongoDB setup
const uri = process.env.MONGODB_URI;
const mongoClient = new MongoClient(uri);

async function loadSession() {
	await mongoClient.connect();
	const db = mongoClient.db('whatsapp_bot');
	const sessions = db.collection('sessions');
	const sessionData = await sessions.findOne({ id: 'whatsapp_session' });
	return sessionData ? sessionData.data : null;
}

async function saveSession(session) {
	const db = mongoClient.db('whatsapp_bot');
	const sessions = db.collection('sessions');
	await sessions.updateOne(
		{ id: 'whatsapp_session' },
		{ $set: { data: session } },
		{ upsert: true },
	);
}

const client = new Client({
	authStrategy: new NoAuth(), // Force QR code generation
	session: await loadSession(),
	puppeteer: {
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	},
});

let berrysCompanyGroup: any;
let strategy = new Strategy(presentationNode);
let img;

client.on('authenticated', async (session) => {
	await saveSession(session);
	console.log('Session saved to MongoDB');
});

client.on('qr', async (qr: string) => {
	qrcode.generate(qr, { small: true });
	const qrImageUrl = await QRCode.toDataURL(qr);
	img = qrImageUrl;
	console.log('QR Code URL:', qrImageUrl);
});

client.on('ready', async () => {
	console.log('Client is ready.');
	try {
		const group = await client.createGroup('Berry Company Chat', [
			client.info.wid._serialized,
		]);
	} catch (e) {
		console.log('Erro ao criar grupo:', e);
	}
});

client.on('message_create', async (message: any) => {
	if (
		message.body.toLowerCase() == 'iniciar' ||
		message.body.toLowerCase() == 'voltar'
	) {
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
		const messageToSend = `${strategy.displayTitle()}
        ${strategy.displayText()}
        ${strategy.displayOptions()}
        ${
		nodesForwardAssistance.includes(strategy.currentNode.title)
			? 'Digite "ok" para falar com um assistente.'
			: ''
	}
        voltar
        `;
		client.sendMessage(
			(await message.getChat()).id._serialized,
			messageToSend,
		);
	}
	if (
		nodesForwardAssistance.includes(strategy.currentNode.title) &&
		message.body.toLowerCase() == 'ok'
	) {
		const number = process.env.CALLBACK_PHONE_NUMBER as string;
		const chatId = number.substring(1) + '@c.us';
		client.sendMessage(
			(await message.getChat()).id._serialized,
			`Para entrar em contato com um de nossos atendentes, encaminhe uma mensagem para ${process.env.CALLBACK_PHONE_NUMBER} com o titulo "${strategy.currentNode.title}", obrigado!`,
		);
	}
});

client.initialize();

app.get('/', (req, res) => {
	if (img) {
		res.send(`<img src="${img}" alt="QR Code" />`);
	} else {
		res.send('Waiting for QR code...');
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
