import WAWebJS, { Chat, Client, Message, LocalAuth } from 'whatsapp-web.js';
import { CurrentNode } from './models/CurrentNode';
import presentationNode from './apresentacao';
import Strategy from './services/Strategy';
import * as dotenv from 'dotenv';
import QRCode from 'qrcode';
import fs from 'fs';
import express from 'express';
import qrcode from 'qrcode-terminal';

dotenv.config();

const inputOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

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
	authStrategy: new LocalAuth({
		dataPath: './.wwebjs_auth', // Custom path for session data
	}),

	puppeteer: {
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	},
});

let berrysCompanyGroup: WAWebJS.CreateGroupResult | undefined;
let strategy = new Strategy(presentationNode);
let img: string;

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Handle QR Code generation
client.on('qr', async (qr: string) => {
	try {
		// qrcode.generate(qr, { small: true });
		const qrImageUrl = await QRCode.toDataURL(qr);
		img = qrImageUrl;
		// console.log('QR Code URL:', qrImageUrl);
	} catch (error) {
		berrysCompanyGroup = undefined;
		console.error('Error generating QR code:', error);
	}
});

// Handle client ready event
client.on('ready', async () => {
	console.log('Client is ready.');
	console.log('Client info:', client.info);

	// Add a delay to ensure the client is fully initialized
	await new Promise((resolve) => setTimeout(resolve, 10000)); // 10-second delay

	// Check if the client is still connected
	if (client.info && client.info.wid && !berrysCompanyGroup) {
		try {
			berrysCompanyGroup = (await client.createGroup(
				'Berry Company Chat',
				[client.info.wid._serialized],
			)) as WAWebJS.CreateGroupResult;
			console.log('Group created:', berrysCompanyGroup);
		} catch (error) {
			berrysCompanyGroup = undefined;
			console.error('Error creating group:', error);
		}
	} else {
		berrysCompanyGroup = undefined;
		console.error(
			'Client is not fully authenticated or connected.',
		);
	}
});

client.on('message_create', async (message: any) => {
	try {
		if (message.body.toLowerCase() == 'iniciar') {
			strategy = new Strategy(presentationNode);
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
		if (message.body.toLowerCase() == 'voltar') {
			strategy = new Strategy(presentationNode);
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
	} catch (e) {
		berrysCompanyGroup = undefined;
		console.error('Error handling message:', e);
	}
});

// Handle client disconnection
client.on('disconnected', (reason) => {
	console.log('Client disconnected:', reason);
	berrysCompanyGroup = undefined; // Reset the group variable
	// Reinitialize the client after a delay
	setTimeout(() => {
		client.destroy().then(() => client.initialize());
	}, 5000);
});

// Handle logout event
client.on('logout', () => {
	console.log('Client logged out.');
	berrysCompanyGroup = undefined; // Reset the group variable
	// Reinitialize the client
	client.destroy().then(() => client.initialize());
});

// Initialize the client with error handling
const initializeClient = () => {
	client.initialize().catch((error) => {
		console.error('Error initializing client:', error);
		// Retry initialization after a delay
		setTimeout(initializeClient, 5000);
	});
};

initializeClient();

// Serve QR code image
app.get('/', (req, res) => {
	try {
		res.send(img);
	} catch (error) {
		berrysCompanyGroup = undefined;
		console.error('Error serving QR code:', error);
		res.status(500).send('Internal Server Error');
	}
});

// Start the Express server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

export default app;
