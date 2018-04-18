/*global module:false*/
var path = require('path');
var webpackConfig = require('./webpack.config');

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-webpack');

	// Project configuration.
	grunt.initConfig({
		simplemocha: {
			all: ['test/ansi_to_html.js'],
			options: {reporter: 'tap'}
		},
		coffee: {
			src: {
				src: 'src/ansi_to_html.coffee',
				dest: 'lib/ansi_to_html.js'
			},
			cli: {
				src: 'src/cli.coffee',
				dest: 'lib/cli.js'
			},
			test: {
				src: 'test/ansi_to_html.coffee',
				dest: 'test/ansi_to_html.js'
			}
		},
		watch: {
			files: ['src/**/*.coffee', 'test/**/*.coffee'],
			tasks: 'default'
		},
		webpack: {
			all: webpackConfig
		}
	});

	// Default task.
	grunt.registerTask('default', ['coffee', 'simplemocha', 'webpack']);
};

