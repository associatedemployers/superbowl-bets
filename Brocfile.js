/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

/* Vendor CSS */
app.import('bower_components/font-awesome/css/font-awesome.css'); // Font Awesome Icons

/* Vendor JS */
app.import('bower_components/velocity/velocity.js');               // Velocity.js
app.import('bower_components/bootstrap/dist/js/bootstrap.min.js'); // Bootstrap JS
app.import('bower_components/moment/moment.js');                   // Moment.js

module.exports = app.toTree();
