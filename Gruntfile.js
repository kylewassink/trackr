module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			build: {
				src: [
					'src/app.js',
					'src/services/*.js',
					'src/controllers/*.js',
					'<%= ngtemplates.build.dest %>'
				],
				dest: 'tmp/<%= pkg.name %>.js'
			}
		},
		jshint: {
			options: {
				ignores: ['src/lib/*']
			},
			all: [
				'src/*.js',
				'src/*/*.js',
				'Gruntfile.js'
			]
		},
		uglify: {
			build: {
				option: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
				},
				files: {
					'build/<%= pkg.name %>.min.js': ['<%= concat.build.dest %>']
				}
			}
		},
		ngtemplates: {
			build: {
				src: 'src/views/*.html',
				dest: 'tmp/templates.js',
				options: {
					module: 'trackr',
					htmlmin: {
						collapseWhitespace: true,
						removeComments: true,
						preserveLineBreaks: false
					}
				}
			}
		},
		htmlmin: {
			build: {
				options: {
					collapseWhitespace: true,
					removeComments: true,
					preserveLineBreaks: false
				},
				files: {
					'build/index.html': 'src/index.html'
				}
			}
		},
		sass: {
			build: {
				options: {
					style: 'nested',
					cacheLocation: 'tmp/sass-cache',
					sourcemap: 'none'
				},
				files: {
					'build/trackr.css': 'src/app.scss'
				}
			}
		},
		copy: {
			build: {
				expand: true,
				src: 'src/lib/*',
				dest: 'build/',
				flatten: true,
				filter: 'isFile'
			}
		}
	});	

	//load packages
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');


	//specify commands
	grunt.registerTask('default',['jshint:all','ngtemplates:build','concat:build','uglify:build','htmlmin:build','sass:build','copy:build']);
};
