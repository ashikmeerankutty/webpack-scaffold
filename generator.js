const Generator = require('yeoman-generator')
const List = require('@webpack-cli/webpack-scaffold').List
const Input = require('@webpack-cli/webpack-scaffold').Input
const createDevConfig = require('./dev-config')

module.exports = class WebpackGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        opts.env.configuration = {
            dev: { webpackOptions: {} }
        }
    }
    prompting() {
        return this.prompt([List('confirm', 'Welcome to scaffold Demo !', ['Yes', 'No']),
        Input('entry', 'What is the entry point in your app?'),
        Input('plugin', 'What do you want to name your commonsChunk?')
    ]).then((answer) => {
            if (answer['confirm'] === 'Yes') {
                this.options.env.configuration.dev.webpackOptions = createDevConfig(answer);        
                this.options.env.configuration.dev.topScope = [
					'const path = require("path")',
					'const webpack = require("webpack")'
                ];
                this.options.env.configuration.dev.configName = 'myconfig';
            }
        })
    }
    writing() {
		this.config.set('configuration', this.options.env.configuration);
	}
}
