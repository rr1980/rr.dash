
import 'zone.js/dist/zone';

// Polyfills
import 'reflect-metadata';
// import 'core-js/client/shim';
// import 'core-js/es6';
// Added parts of es6 which are necessary for your project or your browser support requirements.
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/weak-set';
// import 'core-js/es6/typed';
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
// see issue https://github.com/AngularClass/angular2-webpack-starter/issues/709
// import 'core-js/es6/promise';

// import 'classlist.js';
import 'web-animations-js';

//import 'zone.js/dist/long-stack-trace-zone';

import * as jQuery from 'jquery';

window["$"] = jQuery;
window["jQuery"] = jQuery;
//jQuery.fn.load = function (callback) { $(window).on("load", callback) };
