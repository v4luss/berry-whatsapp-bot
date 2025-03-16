import WAWebJS, { Chat, Client } from 'whatsapp-web.js';

export async function getBerrysCompanyCreatedGroup(client: Client) {
	const chats = await client.getChats();
	const a = chats.filter((c) => c.name == 'Berry Companys Chat')[0];
	console.log(a);
	return a;
}
export async function createBerrysCompanyGroup(client: Client) {
	const g = await client.createGroup(
		'Berry Companys Chat',
		client.info.wid._serialized,
	);
	console.log(g);
	return g as WAWebJS.CreateGroupResult;
}
export async function startChat(client: Client) {
	const createdGroup = await getBerrysCompanyCreatedGroup(client);
	return createdGroup && createdGroup != null
		? createdGroup
		: await createBerrysCompanyGroup(client);
}
