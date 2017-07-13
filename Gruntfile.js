// Generated on 2016-01-18 using generator-angular 0.15.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Automatically load required Grunt tasks
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin',
		ngtemplates: 'grunt-angular-templates',
		cdnify: 'grunt-google-cdn'
	});

	// Configurable paths for the application
	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist'
	};

	grunt.loadNpmTasks('grunt-ng-constant');
	grunt.loadNpmTasks('grunt-protractor-runner');

	// Define the configuration for all the tasks
	grunt.initConfig({
		ngconstant: {
			// Options for all targets
			options: {
				space: '  ',
				wrap: '"use strict";\n\n {%= __ngModule %}',
				name: 'config',
			},
			// Environment targets
			development: {
				options: {
					dest: '<%= simpledocfyweb.app %>/scripts/config.js'
				},
				constants: {
					ENV: {
						sdServer: 'https://quiet-peak-31489.herokuapp.com',
						customerService: 'https://quiet-peak-31489.herokuapp.com'
					}
				}
			},
			homolog: {
				options: {
					dest: '<%= simpledocfyweb.app %>/scripts/config.js'
				},
				constants: {
					ENV: {
						sdServer: 'https://quiet-peak-31489.herokuapp.com',
						customerService: 'https://quiet-peak-31489.herokuapp.com'
					}
				}
			},
			production: {
				options: {
					dest: '<%= simpledocfyweb.dist %>/scripts/config.js'
				},
				constants: {
					ENV: {
						sdServer: 'https://quiet-peak-31489.herokuapp.com',
						customerService: 'https://quiet-peak-31489.herokuapp.com'
					}
				}
			}
		},

		// Project settings
		simpledocfyweb: appConfig,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['<%= simpledocfyweb.app %>/scripts/**/*.js'],
				tasks: ['newer:jshint:all', 'newer:jscs:all'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			jsTest: {
				files: ['test/spec/**/*.js'],
				tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
			},
			styles: {
				files: ['<%= simpledocfyweb.app %>/styles/**/*.css'],
				tasks: ['newer:copy:styles', 'postcss']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= simpledocfyweb.app %>/**/*.html',
					'.tmp/styles/**/*.css',
					'<%= simpledocfyweb.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= simpledocfyweb.app %>/resources/**/*.json'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: '0.0.0.0',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect().use(
								'/app/styles',
								connect.static('./app/styles')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},
			test: {
				options: {
					port: 9001,
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect.static('test'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= simpledocfyweb.dist %>'
				}
			}
		},

		// Make sure there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'<%= simpledocfyweb.app %>/scripts/**/*.js'
				]
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/spec/**/*.js']
			}
		},

		// Make sure code styles are up to par
		jscs: {
			options: {
				config: '.jscsrc',
				verbose: true
			},
			all: {
				src: [
					'Gruntfile.js',
					'<%= simpledocfyweb.app %>/scripts/**/*.js'
				]
			},
			test: {
				src: ['test/spec/**/*.js']
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= simpledocfyweb.dist %>/**/*',
						'!<%= simpledocfyweb.dist %>/.git**/*'
					]
				}]
			},
			server: '.tmp'
		},

		// Add vendor prefixed styles
		postcss: {
			options: {
				processors: [
					require('autoprefixer-core')({
						browsers: ['last 1 version']
					})
				]
			},
			server: {
				options: {
					map: true
				},
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '**/*.css',
					dest: '.tmp/styles/'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '**/*.css',
					dest: '.tmp/styles/'
				}]
			}
		},

		// Automatically inject Bower components into the app
		wiredep: {
			app: {
				src: ['<%= simpledocfyweb.app %>/index.html'],
				ignorePath: /\.\.\//
			},
			test: {
				devDependencies: true,
				src: '<%= karma.unit.configFile %>',
				ignorePath: /\.\.\//,
				fileTypes: {
					js: {
						block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
						detect: {
							js: /'(.*\.js)'/gi
						},
						replace: {
							js: '\'{{filePath}}\','
						}
					}
				}
			}
		},

		// Renames files for browser caching purposes
		filerev: {
			dist: {
				src: [
					'<%= simpledocfyweb.dist %>/scripts/**/*.js',
					'<%= simpledocfyweb.dist %>/styles/**/*.css',
					'<%= simpledocfyweb.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= simpledocfyweb.dist %>/styles/fonts/*'
				]
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= simpledocfyweb.app %>/index.html',
			options: {
				dest: '<%= simpledocfyweb.dist %>',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},

		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin: {
			html: ['<%= simpledocfyweb.dist %>/**/*.html'],
			css: ['<%= simpledocfyweb.dist %>/styles/**/*.css'],
			js: ['<%= simpledocfyweb.dist %>/scripts/**/*.js'],
			options: {
				assetsDirs: [
					'<%= simpledocfyweb.dist %>',
					'<%= simpledocfyweb.dist %>/images',
					'<%= simpledocfyweb.dist %>/styles'
				],
				patterns: {
					js: [
						[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']
					]
				}
			}
		},

		// The following *-min tasks will produce minified files in the dist folder
		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//   dist: {
		//     files: {
		//       '<%= simpledocfyweb.dist %>/styles/main.css': [
		//         '.tmp/styles/{,*/}*.css'
		//       ]
		//     }
		//   }
		// },
		// uglify: {
		//   dist: {
		//     files: {
		//       '<%= simpledocfyweb.dist %>/scripts/scripts.js': [
		//         '<%= simpledocfyweb.dist %>/scripts/scripts.js'
		//       ]
		//     }
		//   }
		// },
		// concat: {
		//   dist: {}
		// },

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= simpledocfyweb.app %>/images',
					src: '**/*.{png,jpg,jpeg,gif}',
					dest: '<%= simpledocfyweb.dist %>/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= simpledocfyweb.app %>/images',
					src: '**/*.svg',
					dest: '<%= simpledocfyweb.dist %>/images'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {},
				files: [{
					expand: true,
					cwd: '<%= simpledocfyweb.dist %>',
					src: ['*.html'],
					dest: '<%= simpledocfyweb.dist %>'
				}]
			}
		},

		ngtemplates: {
			dist: {
				options: {
					module: 'simpleDocfyWebApp',
					htmlmin: '<%= htmlmin.dist.options %>',
					usemin: 'scripts/scripts.js'
				},
				cwd: '<%= simpledocfyweb.app %>',
				src: 'views/**/*.html',
				dest: '.tmp/templateCache.js'
			}
		},

		// ng-annotate tries to make the code safe for minification automatically
		// by using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: '*.js',
					dest: '.tmp/concat/scripts'
				}]
			}
		},

		// Replace Google CDN references
		cdnify: {
			dist: {
				html: ['<%= simpledocfyweb.dist %>/*.html']
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= simpledocfyweb.app %>',
					dest: '<%= simpledocfyweb.dist %>',
					src: [
						'*.{ico,png,txt}',
						'*.html',
						'images/**/*.{webp}',
						'styles/fonts/**/*.*',
						'resources/**/*.*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= simpledocfyweb.dist %>/images',
					src: ['generated/*']
				}, {
					expand: true,
					cwd: 'bower_components/bootstrap/dist',
					src: 'fonts/*',
					dest: '<%= simpledocfyweb.dist %>'
				}, {
					expand: true,
					cwd: 'bower_components/angular-i18n/',
					src: '*.js',
					dest: '<%= simpledocfyweb.dist %>/bower_components/angular-i18n'
				}]
			},
			styles: {
				expand: true,
				cwd: '<%= simpledocfyweb.app %>/styles',
				dest: '.tmp/styles/',
				src: '**/*.css'
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'copy:styles'
			],
			test: [
				'copy:styles'
			],
			dist: [
				'copy:styles',
				'imagemin',
				'svgmin'
			]
		},

		// Test settings
		karma: {
			unit: {
				configFile: 'test/karma.conf.js',
				singleRun: true
			}
		},

		protractor: {
			options: {
				// Location of your protractor config file
				configFile: 'test/e2e/conf.js',

				// Do you want the output to use fun colors?
				noColor: false,

				// Set to true if you would like to use the Protractor command line debugging tool
				// debug: true,

				// Additional arguments that are passed to the webdriver command
				args: {}
			},
			e2e: {
				options: {
					// Stops Grunt process if a test fails
					keepAlive: false
				}
			},
			continuous: {
				options: {
					keepAlive: true
				}
			}
		}
	});


	grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'wiredep',
			'concurrent:server',
			'ngconstant:development',
			'postcss:server',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('serve-hmg', 'Compile then start a connect web server', function(target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'wiredep',
			'concurrent:server',
			'ngconstant:homolog',
			'postcss:server',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'wiredep',
		'concurrent:test',
		'postcss',
		'connect:test',
		'karma'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'ngconstant:homolog',
		'wiredep',
		'useminPrepare',
		'concurrent:dist',
		'postcss',
		'ngtemplates',
		'concat',
		'ngAnnotate',
		'copy:dist',
		'cdnify',
		'cssmin',
		'uglify',
		'filerev',
		'usemin',
		'htmlmin'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'newer:jscs',
		'test',
		'build'
	]);

	grunt.registerTask('e2e-test', [
		'clean:server',
		'ngconstant:development',
		'wiredep',
		'concurrent:server',
		'postcss:server',
		'connect:test',
		'protractor:e2e'
	]);
};
