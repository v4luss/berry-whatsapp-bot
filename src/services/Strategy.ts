import { CurrentNode } from '../models/CurrentNode';

export default class Strategy {
	currentNode: CurrentNode;

	constructor(currentNode: CurrentNode) {
		this.currentNode = currentNode;
	}

	displayTitle: () => string = () => {
		return this.currentNode.title;
	};
	displayText: () => string = () => {
		return this.currentNode.text;
	};

	displayOptions: () => Array<string> = () => {
		if (this.currentNode.options)
			return this.currentNode.options.map(
				(option) => `
				${option.id}. ${option.title}`,
			);
		else return [];
	};

	setNode(id: string) {
		if (this.currentNode.options)
			this.currentNode = this.currentNode.options.find(
				(n) => n.id === id,
			) as CurrentNode;
	}
}
