/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	const ws = __webpack_require__(12);
	const background = __webpack_require__(14);
	const playground = __webpack_require__(13);
	const menu = __webpack_require__(15);

	const socket = io();

	menu.generate();
	ws.assignRoom(socket);
	ws.setChat(socket);
	ws.setMining(socket);
	background.generateSky();
	background.generateMountain();
	background.generateLand();
	background.generateMining();
	playground.setVehicle(socket);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./main.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, appvar, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol, ul {\n  list-style: none;\n}\nblockquote, q {\n  quotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* Main styles */\n\nbody {\n  font-family: Arial, sans-serif;\n  background: #ccc;\n}\n\nheader {\n  position: fixed;\n  z-index: 20;\n}\n\nheader p {\n  position: fixed;\n  left: 10px;\n  top: 10px;\n  color: #fff;\n  font-size: 2rem;\n  cursor: pointer;\n}\n\nheader p:hover, header p.active {\n  color: #111;\n}\n\n#area {\n  height: 2592px;\n  width: 2400px;\n}\n\n#menu {\n  position: fixed;\n  display: none;\n  top: 50px;\n}\n\n#menu.active {\n  display: block;\n}\n\n#menu a {\n  background-color: rgba(1, 1, 1, 0.5);\n  padding: 2px 10px;\n  display: block;\n  color: #fff;\n  text-decoration: none;\n  font-size: 0.8rem;\n  margin-bottom: 1px;\n  text-transform: uppercase;\n  line-height: 1.4rem;\n}\n\n.login {\n  padding: 20px;\n}\n\n.errors {\n  color: #f00;\n  font-weight: bold;\n  text-transform: uppercase;\n}\n\n/* form styles */\n\n.form {\n  margin: 50px 10px 0 120px;\n}\n\n.form h1 {\n  margin-bottom: 20px;\n}\n\n.form h2 {\n  margin: 10px 0 5px 0;\n}\n\n/* footer */\n\nfooter {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 65px;\n  background-color: rgba(1, 1, 1, 0.5);\n  z-index: 9;\n}\n\nfooter form {\n  display: inline-block;\n  float: right;\n}\n\n#health {\n  position: absolute;\n  left: 70px;\n  bottom: 10px;\n  height: 30px;\n  width: 120px;\n  z-index: 6;\n}\n\n#health .status {\n  border-radius: 100px;\n  width: 15px;\n  height: 15px;\n  margin-right: 3px;\n  background-color: #01db77;\n  float: left;\n}\n\n#health .status.damage {\n  background-color: #f00;\n}\n\n#messages {\n  position: absolute;\n  bottom: 41px;\n  right: 10px;\n}\n\n#messages li {\n  padding: 5px 8px;\n  margin-bottom: 1px;\n  background-color: rgba(1, 1, 1, 0.5);\n  color: #ddd;\n  font-weight: 100;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  width: 250px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  cursor: pointer;\n}\n\n#messages li:hover {\n  background-color: rgba(255, 255, 255, 0.5);\n  color: #888;\n}\n\n#messages li.hide {\n  opacity: 0;\n  transition: opacity 0.5s;\n  -webkit-transition: opacity 0.5s;\n}\n\n#messages li time {\n  font-size: 0.7rem;\n  margin-right: 5px;\n  font-style: italic;\n  color: #aaa;\n}\n\n#message input {\n  border: 0;\n  font-size: 0.8rem;\n  padding: 4px;\n  background-color: rgba(1, 1, 1, 0.4);\n  color: #eee;\n  width: 246px;\n}\n\n#active {\n  float: right;\n  display: inline-block;\n  padding: 5px 10px;\n  background-color: rgba(1, 1, 1, 0.7);\n  text-align: center;\n  color: #fff;\n}\n\n#message button {\n  display: none;\n}\n\n/* game styles */\n\n#back {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n#mountain {\n  width: 1400px;\n  height: 445px;\n  position: absolute;\n  left: 100px;\n  top: 85px;\n  z-index: 2;\n}\n\n#land-upper, #land-lower {\n  width: 2400px;\n  height: 500px;\n  position: absolute;\n  left: 0;\n  top: 400px;\n  z-index: 3;\n}\n\n#land-lower {\n  top: 700px;\n}\n\n#mining {\n  position: absolute;\n  top: 1000px;\n  width: 2400px;\n  height: 1600px;\n  z-index: 4;\n}\n\n#playground {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 2400px;\n  height: 1199px;\n  z-index: 7;\n}\n\n#mining-area {\n  position: absolute;\n  left: 0;\n  top: 1200px;\n  width: 2400px;\n  height: 1400px;\n  z-index: 7;\n}\n\n.square {\n  width: 50px;\n  height: 50px;\n}\n\n#vehicle, .hole {\n  position: absolute;\n  width: 100px;\n  height: 50px;\n  top: 0px;\n  left: 0;\n}\n\n.hole {\n  z-index: 4;\n  background-image: url(" + __webpack_require__(4) + ");\n  background-repeat: no-repeat;\n}\n\n.hole.fade {\n  opacity: 0;\n  transition: opacity 2s;\n  -webkit-transition: opacity 2s;\n}\n\n#vehicle {\n  z-index: 6;\n  background-image: url(" + __webpack_require__(5) + ");\n  background-repeat: no-repeat;\n}\n\n#vehicle.active {\n  background-color: rgba(255, 255, 255, 0.4);\n  border-radius: 100px;\n  box-shadow: #fff 0 0 25px;\n}\n\n#avatar {\n  position: absolute;\n  background-image: url(" + __webpack_require__(6) + ");\n  background-repeat: no-repeat;\n  width: 50px;\n  height: 50px;\n  z-index: 6;\n  bottom: 10px;\n  left: 10px;\n}\n\n.lava {\n  position: absolute;\n  display: inline-block;\n  width: 70px;\n  height: 70px;\n  z-index: 7;\n  top: -5px;\n  background-image: url(" + __webpack_require__(7) + ");\n  background-repeat: no-repeat;\n}\n\n.neon-pink, .neon-blue, .neon-green {\n  position: absolute;\n  display: inline-block;\n  width: 50px;\n  height: 50px;\n  z-index: 5;\n  background-repeat: no-repeat;\n}\n\n.neon-pink {\n  background-image: url(" + __webpack_require__(8) + ");\n}\n\n.neon-blue {\n  background-image: url(" + __webpack_require__(9) + ");\n}\n\n.neon-green {\n  background-image: url(" + __webpack_require__(10) + ");\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "1327a664509ea85656eac9c08d2885ed.svg";

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e74b96662ec0b31932976eb45c1ecb05.svg";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a0b1bd6eebaa1ca84a9e6e8db2a70d68.svg";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f9d5c2e7545aaa75725029ef09be7715.svg";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f12c6ce28cc2a46005965185f7c5a458.svg";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3cfc11e0418090d80700b92c8209d374.svg";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "10a18b03d2a035a0da62cc4c223d15d3.svg";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const playground = __webpack_require__(13);

	let currentRoom = document.body.getAttribute('data-room');
	let username = document.body.getAttribute('data-user');
	let mining = document.querySelector('#mining-area');

	exports.assignRoom = function (socket) {
	  if (currentRoom && currentRoom !== 'undefined') {
	    console.log('joining ', currentRoom);
	    socket.emit('join', {
	      room: currentRoom
	    });
	  } else {
	    console.log('no room available');
	  }
	};

	exports.setChat = function (socket) {
	  let messageForm = document.querySelector('#message');
	  let messages = document.querySelector('#messages');

	  messageForm.onsubmit = function (ev) {
	    ev.preventDefault();

	    let input = this.querySelector('input');

	    socket.emit('message', {
	      room: currentRoom,
	      message: input.value
	    });

	    input.value = '';
	  };

	  socket.on('message', data => {
	    let msg = document.createElement('li');
	    let time = document.createElement('time');
	    let span = document.createElement('span');
	    time.textContent = data.created;
	    span.textContent = username + ': ' + data.message;
	    msg.appendChild(time);
	    msg.appendChild(span);
	    messages.appendChild(msg);
	    msg.onclick = function () {
	      msg.classList.add('hide');

	      setTimeout(() => {
	        messages.removeChild(msg);
	      }, 600);
	    };
	  });
	};

	exports.setMining = function (socket) {
	  let active = document.querySelector('#active');

	  socket.on('active', data => {
	    active.textContent = data;
	  });

	  socket.on('mining', data => {
	    if (data.item) {
	      let item = document.createElement('img');
	      item.classList.add(data.name);
	      item.style.left = data.currX;
	      item.style.top = data.currY;
	      mining.appendChild(item);
	      socket.emit('mined', {
	        room: currentRoom,
	        name: data.name
	      });
	      setTimeout(() => {
	        mining.removeChild(item);
	      }, 2000);
	    }
	  });

	  playground.setHealth(socket);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	let currentRoom = document.body.getAttribute('data-room');
	let health = document.querySelector('#health');
	let isDamaged = false;

	exports.setHealth = function (socket) {
	  socket.on('damage', data => {
	    for (let i = 5; i > 0; i--) {
	      if (data === 0) {
	        isDamaged = true;
	      } else {
	        isDamaged = false;
	      }

	      if (i <= data) {
	        health.querySelector('#health-state' + i).classList.remove('damage');
	      } else {
	        health.querySelector('#health-state' + i).classList.add('damage');
	      }
	    }
	  });
	};

	exports.setVehicle = function (socket) {
	  let mining = document.querySelector('#mining-area');
	  let vehicle = document.querySelector('#vehicle');
	  let hole = document.querySelector('.hole');
	  let activeVehicle = false;
	  vehicle.style.left = 0;
	  vehicle.style.top = 0;

	  exports.setHealth(socket);

	  socket.on('damage', data => {
	    isDamaged = !data;
	  });

	  vehicle.onclick = function () {
	    if (!isDamaged) {
	      if (this.classList.contains('active')) {
	        this.classList.remove('active');
	        activeVehicle = false;
	      } else {
	        this.classList.add('active');
	        activeVehicle = true;
	      }
	    } else {
	      console.log('vehicle damaged');
	    }
	  };

	  document.onkeydown = checkArrowKey;

	  function checkArrowKey(ev) {
	    ev = ev || window.event;

	    if (isDamaged) {
	      vehicle.classList.remove('active');
	      return;
	    }

	    switch (ev.keyCode) {
	      case 38:
	        ev.preventDefault();
	        verifyMove('up');
	        break;
	      case 40:
	        ev.preventDefault();
	        verifyMove('down');
	        break;
	      case 37:
	        ev.preventDefault();
	        verifyMove('left');
	        break;
	      case 39:
	        ev.preventDefault();
	        verifyMove('right');
	        break;
	      default:
	        break;
	    }
	  }

	  function verifyMove(direction) {
	    let currX = parseInt(vehicle.style.left.split('px')[0], 10);
	    let currY = parseInt(vehicle.style.top.split('px')[0], 10);
	    let holeClone;

	    function fadeOut(hc) {
	      setTimeout(function () {
	        hc.classList.add('fade');
	        setTimeout(function () {
	          mining.removeChild(hc);
	        }, 2000);
	      }, 4000);
	    }

	    if (activeVehicle) {
	      switch (direction) {
	        case 'up':
	          if (currY > 0) {
	            vehicle.style.top = currY - 50 + 'px';
	          }
	          break;
	        case 'down':
	          if (currY < 1250) {
	            vehicle.style.top = currY + 50 + 'px';
	          }
	          break;
	        case 'left':
	          if (currX > 0) {
	            vehicle.style.left = currX - 100 + 'px';
	          }
	          break;
	        case 'right':
	          if (currX < 2300) {
	            vehicle.style.left = currX + 100 + 'px';
	          }
	          break;
	        default:
	          break;
	      }

	      holeClone = hole.cloneNode();
	      holeClone.classList.remove('fade');
	      holeClone.style.top = vehicle.style.top;
	      holeClone.style.left = vehicle.style.left;

	      socket.emit('mining', {
	        room: currentRoom,
	        currX: vehicle.style.left,
	        currY: vehicle.style.top
	      });

	      fadeOut(holeClone);
	      mining.appendChild(holeClone);
	    }
	  }
	};

	exports.setDamagedState = function (damage) {
	  isDamaged = damage;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	let currentTimeOfDay = new Date().getHours();

	exports.generateSky = function () {
	  const width = 2400;
	  const height = 530;
	  const snap = Snap('#back');

	  let vertices = [];
	  let triangles;
	  let grouping = snap.select('g[filter="url(#artifacts)"]');
	  let redMin;
	  let redMax;
	  let blueMin;
	  let blueMax;
	  let green;

	  // sky color
	  if (currentTimeOfDay >= 5 && currentTimeOfDay < 8) {
	    redMin = 150;
	    redMax = 120;
	    blueMin = 100;
	    blueMax = 150;
	    green = 120;
	  } else if (currentTimeOfDay >= 8 && currentTimeOfDay < 17) {
	    redMin = 70;
	    redMax = 60;
	    blueMin = 100;
	    blueMax = 210;
	    green = 185;
	  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
	    redMin = 100;
	    redMax = 150;
	    blueMin = 70;
	    blueMax = 50;
	    green = 100;
	  } else {
	    redMin = 50;
	    redMax = 20;
	    blueMin = 70;
	    blueMax = 50;
	    green = 10;
	  }

	  snap.attr({
	    width: width,
	    height: height
	  });

	  function createTriangles() {
	    for (let x = 0; x <= width; x += width / 6) {
	      for (let y = 0; y <= height; y += height / 6) {
	        let xp;
	        let yp;

	        if (x && x != width) {
	          xp = x + (Math.floor(Math.random() * (width / 4)) - width / 8);
	        } else {
	          xp = x;
	        }

	        if (y && y != height) {
	          yp = y + (Math.floor(Math.random() * (height / 4)) - height / 8);
	        } else {
	          yp = y;
	        }
	        vertices.push([xp, yp]);
	      }
	    }

	    triangles = Delaunay.triangulate(vertices);

	    for (let i = 0; i < triangles.length; i += 3) {
	      drawTriangle(i);
	    }
	  }

	  function drawTriangle(i) {
	    let poly = snap.polygon([vertices[triangles[i]][0], vertices[triangles[i]][1], vertices[triangles[i + 1]][0], vertices[triangles[i + 1]][1], vertices[triangles[i + 2]][0], vertices[triangles[i + 2]][1]]).attr({
	      fill: randomColor()
	    });

	    poly.centroid = {
	      x: (vertices[triangles[i]][0] + vertices[triangles[i + 1]][0] + vertices[triangles[i + 2]][0]) / 3,
	      y: (vertices[triangles[i]][1] + vertices[triangles[i + 1]][1] + vertices[triangles[i + 2]][1]) / 3
	    };

	    let cir = snap.polygon(0, 0, poly.centroid.x, poly.centroid.y, poly.centroid.x + 3, poly.centroid.y + 5).attr({
	      fill: 'rgba(255, 255, 255, 0.5)'
	    });

	    grouping.add(poly, cir);
	  }

	  function randomColor() {
	    let r = Math.floor(Math.random() * redMin) + redMax;
	    let b = Math.floor(Math.random() * blueMin) + blueMax;
	    return 'rgb(' + r.toString() + ', ' + green + ',' + b.toString() + ')';
	  }

	  createTriangles();
	  /*
	  function randomPoly() {
	    return Math.floor(Math.random() * (triangles.length - 1));
	  }
	   function nextPoly() {
	    var polyback = document.querySelectorAll('#back polygon');
	    var tween = new TimelineLite();
	     try {
	      tween.to(polyback[randomPoly()], 0.1, {
	        fill: randomColor(),
	        onComplete: nextPoly
	      });
	    } catch (e) {
	     }
	  }
	  nextPoly();
	  */
	};

	exports.generateMountain = function () {
	  let snap = Snap('#mountain');
	  let color;

	  // mountain color
	  if (currentTimeOfDay >= 5 && currentTimeOfDay < 8) {
	    color = 'rgba(241, 203, 255, 0.6)';
	  } else if (currentTimeOfDay >= 8 && currentTimeOfDay < 17) {
	    color = 'rgba(229, 253, 255, 0.6)';
	  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
	    color = 'rgba(255, 197, 168, 0.6)';
	  } else {
	    color = 'rgba(157, 150, 213, 0.4)';
	  }

	  let p = snap.path('M10-5-10,15M15,0,0,15M0-5-20,15').attr({
	    fill: 'none',
	    stroke: color,
	    strokeWidth: 25
	  });

	  p = p.pattern(0, 5, 25, 10);

	  snap.paper.polygon('1400.8,422.7 1371.4,293.2 1256.7,148.4 1131.7,174.1 ' + '1018.5,87.4 830.2,97.7 689.1,0.6 499.3,119.7 417,87.4 ' + '278.8,209.4 209.6,174.1 89.1,271.2 0.8,444.7 1400.8,444.7').attr({ fill: p });
	};

	exports.generateLand = function () {
	  let snap = Snap('#land-upper');
	  let color;

	  // land color
	  if (currentTimeOfDay >= 5 && currentTimeOfDay < 8) {
	    color = 'rgba(241, 203, 255, 0.9)';
	  } else if (currentTimeOfDay >= 8 && currentTimeOfDay < 17) {
	    color = 'rgba(189, 253, 255, 0.9)';
	  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
	    color = 'rgba(255, 197, 168, 0.9)';
	  } else {
	    color = 'rgba(157, 150, 213, 0.9)';
	  }

	  let p = snap.path('M0-15-10,15M15,10,0,25M0-5-20,15').attr({
	    fill: 'none',
	    stroke: color,
	    strokeWidth: 55
	  });

	  p = p.pattern(0, 15, 25, 10);

	  snap.paper.polygon('2400,500 2400,77 2287.9,131.4 2152.3,48.6 1979,90 1854.6,58.9 ' + '1719,90 1532.3,48.6 1421.2,90 1232.3,64.1 1081.2,9.8 919,58.9 779,69.3 ' + '630.1,9.8 496.8,69.3 352.3,69.3 227.9,48.6 125.7,90 65.7,48.6 0,131.4 0,500').attr({ fill: p });

	  snap = Snap('#land-lower');

	  // land color
	  if (currentTimeOfDay >= 5 && currentTimeOfDay < 8) {
	    color = 'rgba(141, 203, 255, 0.95)';
	  } else if (currentTimeOfDay >= 8 && currentTimeOfDay < 17) {
	    color = 'rgba(179, 143, 145, 0.95)';
	  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
	    color = 'rgba(155, 197, 168, 0.95)';
	  } else {
	    color = 'rgba(157, 150, 213, 0.9)';
	  }

	  p = snap.path('M10-35-20,5M15,20,50,25M10-5-20,15').attr({
	    fill: 'none',
	    stroke: color,
	    strokeWidth: 45
	  });

	  p = p.pattern(0, 15, 25, 10);

	  snap.paper.polygon('2400,500 2400,77 2287.9,131.4 2152.3,48.6 1979,90 1854.6,58.9 ' + '1719,90 1532.3,48.6 1421.2,90 1232.3,64.1 1081.2,9.8 919,58.9 779,69.3 ' + '630.1,9.8 496.8,69.3 352.3,69.3 227.9,48.6 125.7,90 65.7,48.6 0,131.4 0,500').attr({ fill: p });
	};

	exports.generateMining = function () {
	  let snap = Snap('#mining');
	  let color;

	  // mining color
	  if (currentTimeOfDay >= 5 && currentTimeOfDay < 8) {
	    color = 'rgba(41, 203, 255, 0.95)';
	  } else if (currentTimeOfDay >= 8 && currentTimeOfDay < 17) {
	    color = 'rgba(79, 143, 145, 0.95)';
	  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
	    color = 'rgba(25, 177, 168, 0.95)';
	  } else {
	    color = 'rgba(57, 150, 213, 0.9)';
	  }

	  let p = snap.path('M10-35-20,5M15,20,50,25M10-5-20,15').attr({
	    fill: 'none',
	    stroke: color,
	    strokeWidth: 45
	  });

	  p = p.pattern(0, 5, 15, 25);

	  snap.paper.polygon('0,146.2 0,80 143,80 468,122.4 628,80 903,106.5 1083,80 ' + '1288,106.5 1453,80 1678,106.5 1833,80 2033,106.5 2143,80 2400,106.5 ' + '2400,1680 0,1680 0,106.5').attr({ fill: p });
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	exports.generate = function () {
	  let menuButton = document.querySelector('header p');
	  let menu = document.querySelector('#menu');

	  menuButton.onclick = function () {
	    if (this.classList.contains('active')) {
	      menu.classList.remove('active');
	      this.classList.remove('active');
	    } else {
	      menu.classList.add('active');
	      this.classList.add('active');
	    }
	  };
	};

/***/ }
/******/ ]);