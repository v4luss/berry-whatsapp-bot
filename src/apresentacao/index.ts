import { CurrentNode } from '../models/CurrentNode';
import nossosServicos from './nossos-servicos';
import orcamento from './orcamento';
import support from './suporte';

export default {
	id: '1',
	title: 'Apresentação',
	text: 'Olá! 👋 Bem-vindo à Berry Companys! Estamos aqui para ajudar você com soluções de software, websites e aplicativos. Como posso ajudá-lo(a) hoje? (Para navegar pelas opções, escreva o numero correspondente.)',
	options: [nossosServicos, orcamento, support],
};
