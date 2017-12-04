/**
 * Created by Andriy on 10.03.2015.
 */
module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    //Налаштування збірки Grunt
    var config = {
        //Інформацію про проект з файлу package.json
        pkg: grunt.file.readJSON('package.json'),

        //Конфігурація для модуля browserify (перетворює require(..) в код
        browserify:     {
            //Загальні налаштування (grunt-browserify)
            options:      {

                //brfs замість fs.readFileSync вставляє вміст файлу
                transform:  [ require('brfs') ],
                browserifyOptions: {
                    //Папка з корнем джерельних кодів javascript
                    basedir: "Frontend/src/js/"
                }
            },

            //Збірка з назвою піца
            rangePage: {
                src: 'Frontend/src/rangePage.js',
                dest: 'Frontend/www/assets/js/rangePage.js'
            },
            orderPage: {
                src: 'Frontend/src/orderPage.js',
                dest: 'Frontend/www/assets/js/orderPage.js'
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "Frontend/www/assets/css/common.css": "Frontend/www/assets/less/common.less",
                    "Frontend/www/assets/css/mainPage.css": "Frontend/www/assets/less/mainPage.less",
                    "Frontend/www/assets/css/orderPage.css": "Frontend/www/assets/less/orderPage.less"
                }
            }
        }
    };

    //Налаштування відстежування змін в проекті
    var watchDebug = {
        options: {
            'no-beep': true
        },
        //Назва завдання будь-яка
        scripts: {
            //На зміни в яких файлах реагувати
            files: ['Frontend/src/**/*.js', 'Frontend/**/*.ejs'],
            //Які завдання виконувати під час зміни в файлах
            tasks: ['browserify:pizza']
        }
    };


    //Ініціалузвати Grunt
    config.watch = watchDebug;
    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default',
        [
            'browserify:rangePage',
            'browserify:orderPage',
            'less'
        ]
    );

};