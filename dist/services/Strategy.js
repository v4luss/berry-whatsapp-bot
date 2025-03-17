"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Strategy {
    constructor(currentNode) {
        this.displayTitle = () => {
            return this.currentNode.title;
        };
        this.displayText = () => {
            return this.currentNode.text;
        };
        this.displayOptions = () => {
            if (this.currentNode.options)
                return this.currentNode.options.map((option) => `
				${option.id}. ${option.title}`);
            else
                return [];
        };
        this.currentNode = currentNode;
    }
    setNode(id) {
        if (this.currentNode.options)
            this.currentNode = this.currentNode.options.find((n) => n.id === id);
    }
}
exports.default = Strategy;
