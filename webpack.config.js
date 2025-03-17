const path = require('path');

module.exports = {
	mode: 'production', // or 'development'
	entry: './public/index.js', // Entry point after TypeScript compilation
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'), // Output to the 'public' directory
	},
	resolve: {
		extensions: ['.js', '.ts'], // Resolve both .js and .ts files
	},
	module: {
		rules: [
			{
				test: /\.ts$/, // Handle TypeScript files
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	target: 'node', // Ensure Webpack bundles for Node.js
};
