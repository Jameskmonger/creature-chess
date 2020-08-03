/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/app/index.tsx","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/app.tsx":
/*!*************************!*\
  !*** ./src/app/app.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var game_1 = __webpack_require__(/*! ./display/stages/game */ "./src/app/display/stages/game.tsx");
var CallbackPage_1 = __webpack_require__(/*! ./pages/CallbackPage */ "./src/app/pages/CallbackPage.tsx");
var LoginPage_1 = __webpack_require__(/*! ./pages/LoginPage */ "./src/app/pages/LoginPage.tsx");
var UnauthenticatedRoutes = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: LoginPage_1.LoginPage }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/callback", component: CallbackPage_1.CallbackPage })));
};
var AuthenticatedRoutes = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: game_1.Game }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/callback", component: CallbackPage_1.CallbackPage })));
};
var App = function () {
    var isLoggedIn = react_redux_1.useSelector(function (state) { return state.auth !== null; });
    if (isLoggedIn) {
        return React.createElement(AuthenticatedRoutes, null);
    }
    return React.createElement(UnauthenticatedRoutes, null);
};
exports.App = App;


/***/ }),

/***/ "./src/app/auth/auth0.ts":
/*!*******************************!*\
  !*** ./src/app/auth/auth0.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var auth0_js_1 = __webpack_require__(/*! auth0-js */ "./node_modules/auth0-js/dist/auth0.min.esm.js");
var domain = "creaturechess.eu.auth0.com";
var clientID = "HNUYYyRCtFJsA3xKGp964Kgy4jwx8bW1";
var local = false;
var redirectUri = local ? "http://localhost:8090/callback" : "http://creaturechess.jamesmonger.com/callback";
var logoutRedirectUrl = local ? "http://localhost:8090" : "http://creaturechess.jamesmonger.com/";
var auth0Client = new auth0_js_1.WebAuth({
    domain: domain,
    clientID: clientID,
    redirectUri: redirectUri,
    audience: "https://" + domain + "/userinfo",
    responseType: "id_token",
    scope: "openid profile email"
});
exports.handleAuthentication = function () { return (new Promise(function (resolve, reject) {
    auth0Client.parseHash(function (err, authResult) {
        if (err) {
            return reject(err);
        }
        if (!authResult || !authResult.idToken) {
            return reject(err);
        }
        var idToken = authResult.idToken;
        var profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        var expiresAt = authResult.idTokenPayload.exp * 1000;
        resolve({
            authenticated: true,
            idToken: idToken,
            profile: profile,
            expiresAt: expiresAt
        });
    });
})); };
exports.signIn = function () { return auth0Client.authorize(); };
exports.signOut = function () {
    auth0Client.logout({
        clientID: clientID,
        returnTo: logoutRedirectUrl
    });
};


/***/ }),

/***/ "./src/app/display/animation.ts":
/*!**************************************!*\
  !*** ./src/app/display/animation.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var lodash_1 = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
exports.getAnimationCssVariables = function (animations) {
    var variables = lodash_1.assign.apply(void 0, tslib_1.__spread([{}], animations.filter(function (a) { return a.variables; }).map(function (a) { return a.variables; })));
    return lodash_1.assign.apply(void 0, tslib_1.__spread([{}], lodash_1.keys(variables).map(function (key) {
        var _a;
        return (_a = {}, _a["--" + key] = variables[key], _a);
    })));
};


/***/ }),

/***/ "./src/app/display/bench.tsx":
/*!***********************************!*\
  !*** ./src/app/display/bench.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var benchTile_1 = __webpack_require__(/*! ./board/tile/benchTile */ "./src/app/display/board/tile/benchTile.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var positionablePiece_1 = __webpack_require__(/*! ./piece/positionablePiece */ "./src/app/display/piece/positionablePiece.tsx");
var BenchPieces = function () {
    var pieces = react_redux_1.useSelector(function (state) { return state.bench.pieces; });
    var pieceElements = [];
    pieces.forEach(function (piece, index) {
        if (!piece) {
            return;
        }
        pieceElements.push(React.createElement(positionablePiece_1.PositionablePiece, { key: piece.id, id: piece.id, x: piece.position.x, y: 0, draggable: true, animate: false }));
    });
    return (React.createElement(React.Fragment, null, pieceElements));
};
var Bench = function () {
    // get this from local player style
    var tileStyle = position_1.TileStyle.DEFAULT;
    var tiles = [];
    for (var x = 0; x < models_1.Constants.GRID_SIZE.width; x++) {
        tiles.push(React.createElement(benchTile_1.BenchTile, { key: "tile-" + x, slot: x, tileStyle: tileStyle }));
    }
    return (React.createElement("div", { className: "bench" },
        tiles,
        React.createElement(BenchPieces, null)));
};
exports.Bench = Bench;


/***/ }),

/***/ "./src/app/display/board/board.tsx":
/*!*****************************************!*\
  !*** ./src/app/display/board/board.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var pieceComponent_1 = __webpack_require__(/*! ../piece/pieceComponent */ "./src/app/display/piece/pieceComponent.tsx");
var boardRow_1 = __webpack_require__(/*! ./boardRow */ "./src/app/display/board/boardRow.tsx");
var opponentBoardPlaceholder_1 = __webpack_require__(/*! ./overlays/opponentBoardPlaceholder */ "./src/app/display/board/overlays/opponentBoardPlaceholder.tsx");
var announcement_1 = __webpack_require__(/*! ./overlays/announcement */ "./src/app/display/board/overlays/announcement.tsx");
var victoryOverlay_1 = __webpack_require__(/*! ./overlays/victoryOverlay */ "./src/app/display/board/overlays/victoryOverlay.tsx");
var reconnectModal_1 = __webpack_require__(/*! ./overlays/reconnectModal */ "./src/app/display/board/overlays/reconnectModal.tsx");
var BoardPieces = function (props) {
    var e_1, _a;
    var inPreparingPhase = react_redux_1.useSelector(function (state) { return state.game.phase === models_1.GamePhase.PREPARING; });
    var pieces = react_redux_1.useSelector(function (state) { return state.board.piecePositions; });
    var pieceElements = [];
    try {
        for (var _b = tslib_1.__values(Object.entries(pieces)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = tslib_1.__read(_c.value, 2), position = _d[0], id = _d[1];
            if (!id) {
                continue;
            }
            var _e = tslib_1.__read(position.split(","), 2), x = _e[0], y = _e[1];
            pieceElements.push(React.createElement("div", { key: id, className: "positionable-piece x-" + x + " y-" + y },
                React.createElement(pieceComponent_1.PieceComponent, { id: id, draggable: inPreparingPhase, animate: !inPreparingPhase })));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return (React.createElement(React.Fragment, null, pieceElements));
};
var Board = function (props) {
    var showOpponentBoardPlaceholder = react_redux_1.useSelector(function (state) { return state.game.phase === models_1.GamePhase.WAITING || state.game.phase === models_1.GamePhase.PREPARING; });
    var localPlayerStyle = position_1.TileStyle.DEFAULT;
    var opponentStyle = position_1.TileStyle.DEFAULT;
    var rows = [];
    if (!showOpponentBoardPlaceholder) {
        for (var y = 0; y < models_1.Constants.GRID_SIZE.height / 2; y++) {
            rows.push(React.createElement(boardRow_1.BoardRow, { key: "tile-row-" + y, y: y, tileStyle: opponentStyle }));
        }
    }
    for (var y = models_1.Constants.GRID_SIZE.height / 2; y < models_1.Constants.GRID_SIZE.height; y++) {
        rows.push(React.createElement(boardRow_1.BoardRow, { key: "tile-row-" + y, y: y, tileStyle: localPlayerStyle }));
    }
    return (React.createElement("div", { className: "chessboard" },
        showOpponentBoardPlaceholder && React.createElement(opponentBoardPlaceholder_1.OpponentBoardPlaceholder, null),
        rows,
        React.createElement(BoardPieces, null),
        React.createElement(announcement_1.Announcement, null),
        React.createElement(victoryOverlay_1.VictoryOverlay, null),
        React.createElement(reconnectModal_1.ReconnectModal, null)));
};
exports.Board = Board;


/***/ }),

/***/ "./src/app/display/board/boardRow.tsx":
/*!********************************************!*\
  !*** ./src/app/display/board/boardRow.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var boardTile_1 = __webpack_require__(/*! ./tile/boardTile */ "./src/app/display/board/tile/boardTile.tsx");
var getClassForTileStyle_1 = __webpack_require__(/*! ./getClassForTileStyle */ "./src/app/display/board/getClassForTileStyle.ts");
var getRowClassForY = function (y) {
    if (y === 0) {
        return "first";
    }
    if (y === 7) {
        return "last";
    }
    return "";
};
var BoardRow = function (_a) {
    var y = _a.y, tileStyle = _a.tileStyle;
    var tiles = [];
    for (var x = 0; x < models_1.Constants.GRID_SIZE.width; x++) {
        tiles.push(React.createElement(boardTile_1.BoardTile, { key: "tile-" + x, x: x, y: y, tileStyle: tileStyle }));
    }
    return React.createElement("div", { className: "tile-row " + getClassForTileStyle_1.getClassForTileStyle(tileStyle) + " " + getRowClassForY(y) }, tiles);
};
exports.BoardRow = BoardRow;


/***/ }),

/***/ "./src/app/display/board/getClassForTileStyle.ts":
/*!*******************************************************!*\
  !*** ./src/app/display/board/getClassForTileStyle.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
exports.getClassForTileStyle = function (style) {
    switch (style) {
        case position_1.TileStyle.JAMES:
        // return "style-james";
        case position_1.TileStyle.DEFAULT:
        default:
            return "style-default";
    }
};


/***/ }),

/***/ "./src/app/display/board/overlays/announcement.tsx":
/*!*********************************************************!*\
  !*** ./src/app/display/board/overlays/announcement.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var Announcement = function () {
    var mainAnnouncement = react_redux_1.useSelector(function (state) { return state.game.mainAnnouncement; });
    var subAnnouncement = react_redux_1.useSelector(function (state) { return state.game.subAnnouncement; });
    if (!mainAnnouncement) {
        return null;
    }
    return (React.createElement("div", { className: "announcement" },
        subAnnouncement && React.createElement("h3", { className: "sub" }, subAnnouncement),
        React.createElement("h2", { className: "main" }, mainAnnouncement)));
};
exports.Announcement = Announcement;


/***/ }),

/***/ "./src/app/display/board/overlays/opponentBoardPlaceholder.tsx":
/*!*********************************************************************!*\
  !*** ./src/app/display/board/overlays/opponentBoardPlaceholder.tsx ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var readyUpButton_1 = __webpack_require__(/*! ./readyUpButton */ "./src/app/display/board/overlays/readyUpButton.tsx");
var selectedCreature_1 = __webpack_require__(/*! @app/features/selectedCreature/selectedCreature */ "./src/app/features/selectedCreature/selectedCreature.tsx");
exports.OpponentBoardPlaceholder = function (props) {
    return (React.createElement("div", { className: "opponent-board-placeholder" },
        React.createElement("div", { className: "o-group stretch" },
            React.createElement(selectedCreature_1.SelectedCreature, null)),
        React.createElement("div", { className: "o-group" },
            React.createElement(readyUpButton_1.ReadyUpButton, null))));
};


/***/ }),

/***/ "./src/app/display/board/overlays/readyUpButton.tsx":
/*!**********************************************************!*\
  !*** ./src/app/display/board/overlays/readyUpButton.tsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var player_1 = __webpack_require__(/*! @common/player */ "./src/shared/player/index.ts");
var ReadyUpButton = function () {
    var canReadyUp = react_redux_1.useSelector(function (state) { return state.game.phase === models_1.GamePhase.PREPARING && state.localPlayer.ready === false; });
    var dispatch = react_redux_1.useDispatch();
    if (!canReadyUp) {
        return null;
    }
    var onReadyUp = function () { return dispatch(player_1.PlayerActions.readyUpAction()); };
    return React.createElement("button", { className: "ready-up", onClick: onReadyUp }, "Ready");
};
exports.ReadyUpButton = ReadyUpButton;


/***/ }),

/***/ "./src/app/display/board/overlays/reconnectModal.tsx":
/*!***********************************************************!*\
  !*** ./src/app/display/board/overlays/reconnectModal.tsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var networking_1 = __webpack_require__(/*! @common/networking */ "./src/shared/networking/index.ts");
var ReconnectModal = function () {
    var connectionStatus = react_redux_1.useSelector(function (state) { return state.game.connectionStatus; });
    if (connectionStatus === networking_1.ConnectionStatus.NOT_CONNECTED
        || connectionStatus === networking_1.ConnectionStatus.CONNECTED) {
        return null;
    }
    return (React.createElement("div", { className: "reconnect" },
        connectionStatus === networking_1.ConnectionStatus.DISCONNECTED
            && (React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text" }, "Oops - you've been disconnected"),
                React.createElement("p", { className: "text" }, "Please refresh the page and press 'Find Game' to rejoin"))),
        connectionStatus === networking_1.ConnectionStatus.RECONNECTED
            && (React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text" }, "Reconnected!"),
                React.createElement("p", { className: "text" }, "Please wait for the current round to finish...")))));
};
exports.ReconnectModal = ReconnectModal;


/***/ }),

/***/ "./src/app/display/board/overlays/victoryOverlay.tsx":
/*!***********************************************************!*\
  !*** ./src/app/display/board/overlays/victoryOverlay.tsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var VictoryOverlay = function () {
    var winnerName = react_redux_1.useSelector(function (state) { return state.game.winnerName; });
    if (!winnerName) {
        return null;
    }
    return (React.createElement("div", { className: "victory" },
        React.createElement("h2", { className: "game-over" }, "Game Over"),
        React.createElement("p", null,
            React.createElement("span", { className: "winner" }, winnerName),
            " wins!")));
};
exports.VictoryOverlay = VictoryOverlay;


/***/ }),

/***/ "./src/app/display/board/responsiveBoardStyles.tsx":
/*!*********************************************************!*\
  !*** ./src/app/display/board/responsiveBoardStyles.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var use_window_size_1 = __webpack_require__(/*! ../../use-window-size */ "./src/app/use-window-size.ts");
var inPortraitMode = function (width, height) { return (height >= width); };
var getBoardInformation = function (width, height) {
    if (inPortraitMode(width, height)) {
        // board + spacing
        var colsRequired = models_1.Constants.GRID_SIZE.width;
        // in portrait mode, use full width
        var tileWidth = width / colsRequired;
        return {
            tileSize: tileWidth,
            boardHeight: tileWidth * (models_1.Constants.GRID_SIZE.height + 1 + 0.5) + "px",
            boardWidth: tileWidth * models_1.Constants.GRID_SIZE.width + "px"
        };
    }
    // board + bench + spacing
    var rowsRequired = models_1.Constants.GRID_SIZE.height + 1 + 0.5;
    // in landscape mode, use full height
    var tileHeight = height / rowsRequired;
    return {
        tileSize: tileHeight,
        boardHeight: "100%",
        boardWidth: tileHeight * models_1.Constants.GRID_SIZE.width + "px"
    };
};
var getTilePosition = function (tileSize, x, y) {
    return {
        left: (x * tileSize),
        top: (y * tileSize)
    };
};
var getPositionablePieceStyles = function (tileSize) {
    var styles = [];
    var TILE_BASE_Z_INDEX = 10;
    for (var x = 0; x < models_1.Constants.GRID_SIZE.width; x++) {
        for (var y = 0; y < models_1.Constants.GRID_SIZE.height; y++) {
            var _a = getTilePosition(tileSize, x, y), left = _a.left, top_1 = _a.top;
            styles.push(".positionable-piece.x-" + x + " { left: " + left + "px; }");
            styles.push(".positionable-piece.y-" + y + " { top: " + top_1 + "px; z-index: " + (TILE_BASE_Z_INDEX + y + 1) + "; }");
        }
    }
    return styles.join("\n");
};
var ResponsiveBoardStyles = function () {
    var _a = use_window_size_1.useWindowSize(), width = _a.width, height = _a.height;
    var _b = getBoardInformation(width, height), tileSize = _b.tileSize, boardHeight = _b.boardHeight, boardWidth = _b.boardWidth;
    // todo this is ugly
    var boardContainerStyle = inPortraitMode(width, height)
        ? "{ width: " + boardWidth + "; margin: 0 auto 0.5rem; }"
        : "{ height: " + boardHeight + "; width: " + boardWidth + "; }";
    var positionablePieceStyles = getPositionablePieceStyles(tileSize);
    return (React.createElement("style", { dangerouslySetInnerHTML: {
            __html: "\n            #approot { height: 100%; }\n            .tile { width: " + tileSize + "px; height: " + tileSize + "px; }\n            .positionable-piece { width: " + tileSize + "px; height: " + tileSize + "px; }\n            .piece { width: " + tileSize + "px; height: " + tileSize + "px; }\n\n            .board-container " + boardContainerStyle + "\n\n            " + positionablePieceStyles + "\n\n            .chessboard { height: " + tileSize * models_1.Constants.GRID_SIZE.height + "px; }\n\n            .bench { height: " + tileSize + "px; }\n\n            .opponent-board-placeholder { height: " + tileSize * models_1.Constants.GRID_SIZE.height / 2 + "px; }\n            "
        } }));
};
exports.ResponsiveBoardStyles = ResponsiveBoardStyles;


/***/ }),

/***/ "./src/app/display/board/tile/benchTile.tsx":
/*!**************************************************!*\
  !*** ./src/app/display/board/tile/benchTile.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var tile_1 = __webpack_require__(/*! ./tile */ "./src/app/display/board/tile/tile.tsx");
var BenchTile = function (props) {
    return (React.createElement(tile_1.Tile, { type: position_1.TileType.BENCH, x: props.slot, y: null, tileStyle: props.tileStyle }));
};
exports.BenchTile = BenchTile;


/***/ }),

/***/ "./src/app/display/board/tile/boardTile.tsx":
/*!**************************************************!*\
  !*** ./src/app/display/board/tile/boardTile.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var tile_1 = __webpack_require__(/*! ./tile */ "./src/app/display/board/tile/tile.tsx");
var BoardTile = function (props) {
    return (React.createElement(tile_1.Tile, { type: position_1.TileType.BOARD, x: props.x, y: props.y, tileStyle: props.tileStyle }));
};
exports.BoardTile = BoardTile;


/***/ }),

/***/ "./src/app/display/board/tile/tile.tsx":
/*!*********************************************!*\
  !*** ./src/app/display/board/tile/tile.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/esm/index.js");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var getClassForTileStyle_1 = __webpack_require__(/*! ../getClassForTileStyle */ "./src/app/display/board/getClassForTileStyle.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var pieceSelectors_1 = __webpack_require__(/*! @common/player/pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var actions_1 = __webpack_require__(/*! @common/player/actions */ "./src/shared/player/actions.ts");
var gameActions_1 = __webpack_require__(/*! @app/store/actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var pieceSelectors_2 = __webpack_require__(/*! @app/store/pieceSelectors */ "./src/app/store/pieceSelectors.ts");
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var playerSelectors_1 = __webpack_require__(/*! @common/player/playerSelectors */ "./src/shared/player/playerSelectors.ts");
// tslint:disable-next-line:no-bitwise
var isBoardTileDark = function (x, y) { return ((y ^ x) & 1) !== 0; };
var getClassName = function (tileType, x, y) {
    if (tileType === position_1.TileType.BENCH) {
        return "bench";
    }
    return isBoardTileDark(x, y) ? "dark" : "light";
};
var getOverlayClassName = function (isDragging, canDrop) {
    if (isDragging && canDrop === false) {
        return "overlay not-allowed";
    }
    return "overlay";
};
var onDropPiece = function (dispatch, piece, type, x, y) {
    var from = (piece.position.y !== null
        ? ({
            type: "board",
            location: { x: piece.position.x, y: piece.position.y }
        })
        : ({
            type: "bench",
            location: { slot: piece.position.x }
        }));
    var to = (type === position_1.TileType.BOARD
        ? ({
            type: "board",
            location: { x: x, y: y }
        })
        : ({
            type: "bench",
            location: { slot: x }
        }));
    dispatch(actions_1.playerDropPiece(piece.id, from, to));
    dispatch(gameActions_1.clearSelectedPiece());
};
var Tile = function (_a) {
    var x = _a.x, y = _a.y, type = _a.type, tileStyle = _a.tileStyle;
    var dispatch = react_redux_1.useDispatch();
    var piece = react_redux_1.useSelector(function (state) { return (type === position_1.TileType.BOARD
        ? pieceSelectors_2.boardTilePieceSelector(state, { x: x, y: y })
        : pieceSelectors_2.benchTilePieceSelector(state, { x: x })); });
    var boardLocked = react_redux_1.useSelector(function (state) { return state.board.locked; });
    var belowPieceLimit = react_redux_1.useSelector(function (state) { return pieceSelectors_2.ownedPieceSelector(state).length < playerSelectors_1.getPlayerLevel(state); });
    var canMovePiece = react_redux_1.useSelector(function (state) { return state.game.phase === models_1.GamePhase.PREPARING || type === position_1.TileType.BENCH; });
    var selectedPiece = react_redux_1.useSelector(function (state) { return state.game.selectedPieceId ? pieceSelectors_1.getPiece(state, state.game.selectedPieceId) : null; });
    var isSelected = piece && selectedPiece && piece.id === selectedPiece.id;
    var _b = tslib_1.__read(react_dnd_1.useDrop({
        accept: "Piece",
        drop: function (item) { return onDropPiece(dispatch, item.piece, type, x, y); },
        canDrop: function (item) { return board_1.canDropPiece(item.piece, x, y, piece === null, boardLocked, belowPieceLimit); },
        collect: function (monitor) { return ({
            canDrop: !!monitor.canDrop(),
            isDragging: !!monitor.getItem()
        }); }
    }), 2), _c = _b[0], canDrop = _c.canDrop, isDragging = _c.isDragging, drop = _b[1];
    // this can be improved by having a piece movement saga
    // that just listens for clicks and drops
    var onClick = function () {
        if (selectedPiece && canMovePiece) {
            onDropPiece(dispatch, selectedPiece, type, x, y);
            return;
        }
    };
    return (React.createElement("div", { ref: drop, className: "tile " + getClassName(type, x, y) + (isSelected ? " selected" : "") + " " + getClassForTileStyle_1.getClassForTileStyle(tileStyle), "touch-action": "none", onPointerUp: onClick },
        React.createElement("div", { className: "" + getOverlayClassName(isDragging, canDrop) })));
};
exports.Tile = Tile;


/***/ }),

/***/ "./src/app/display/countdown.tsx":
/*!***************************************!*\
  !*** ./src/app/display/countdown.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var Countdown = function (_a) {
    var countdownToSeconds = _a.countdownToSeconds, render = _a.render;
    var _b = tslib_1.__read(React.useState(null), 2), secondsRemaining = _b[0], setSecondsRemaining = _b[1];
    var updateSecondsRemaining = function () {
        if (countdownToSeconds === null) {
            return;
        }
        var currentSeconds = Date.now() / 1000;
        setSecondsRemaining(Math.ceil(countdownToSeconds - currentSeconds));
    };
    React.useEffect(function () {
        updateSecondsRemaining();
        var intervalId = setInterval(updateSecondsRemaining, 1000);
        return function () { return clearInterval(intervalId); };
    }, [countdownToSeconds]);
    if (secondsRemaining === null) {
        return null;
    }
    var safeSecondsRemaining = secondsRemaining > 1 ? secondsRemaining : 1;
    if (render) {
        return render(safeSecondsRemaining);
    }
    return React.createElement("span", null, safeSecondsRemaining);
};
exports.Countdown = Countdown;


/***/ }),

/***/ "./src/app/display/creatureImage.tsx":
/*!*******************************************!*\
  !*** ./src/app/display/creatureImage.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var CreatureImage = function (_a) {
    var facing = _a.facing, definitionId = _a.definitionId;
    return (React.createElement("img", { className: "image", src: "images/" + (facing || "front") + "/" + definitionId + ".png" }));
};
exports.CreatureImage = CreatureImage;


/***/ }),

/***/ "./src/app/display/game/boardContainer.tsx":
/*!*************************************************!*\
  !*** ./src/app/display/game/boardContainer.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var board_1 = __webpack_require__(/*! ../board/board */ "./src/app/display/board/board.tsx");
var bench_1 = __webpack_require__(/*! ../bench */ "./src/app/display/bench.tsx");
var BoardContainer = function () {
    return (React.createElement("div", { className: "group board-container" },
        React.createElement(board_1.Board, null),
        React.createElement(bench_1.Bench, null)));
};
exports.BoardContainer = BoardContainer;


/***/ }),

/***/ "./src/app/display/game/help.tsx":
/*!***************************************!*\
  !*** ./src/app/display/game/help.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var Help = function () {
    return (React.createElement("div", { className: "help" },
        React.createElement("div", { className: "section" },
            React.createElement("h2", { className: "header" }, "The Game"),
            React.createElement("p", null, "Buy pieces and place them on the board. Your board then battles another random player's board. If you lose, your health will decrease. If your health hits 0, you will be knocked out."),
            React.createElement("p", null, "The winner is the last player remaining!")),
        React.createElement("div", { className: "section" },
            React.createElement("h2", { className: "header" }, "Creatures"),
            React.createElement("p", null, "Three creatures (level 1) will combine to make a stronger creature (level 2). Three level 2 creatures can then evolve into a level 3 creature."),
            React.createElement("p", null, "Each creature has a class and a type. Their class determines their fighting style, and types give some boost/reduction to damage when fighting other types."),
            React.createElement("h3", { className: "subheader" }, "Classes"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("span", { className: "list-header" }, "Valiant:"),
                    " All-round melee."),
                React.createElement("li", null,
                    React.createElement("span", { className: "list-header" }, "Cunning:"),
                    " High damage, low-health melee."),
                React.createElement("li", null,
                    React.createElement("span", { className: "list-header" }, "Arcane:"),
                    " Ranged.")),
            React.createElement("h3", { className: "subheader" }, "Types"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("span", { className: "list-header" }, "Earth:"),
                    " Overcomes water. Immunity to fire."),
                React.createElement("li", null,
                    React.createElement("span", { className: "list-header" }, "Metal:"),
                    " Overcomes wood. Immunity to earth."),
                React.createElement("li", null,
                    React.createElement("span", { className: "list-header" }, "Water:"),
                    " Overcomes fire. Immunity to metal."),
                React.createElement("li", null,
                    React.createElement("span", { className: "list-header" }, "Wood:"),
                    " Overcomes earth. Immunity to water."),
                React.createElement("li", null,
                    React.createElement("span", { className: "list-header" }, "Fire:"),
                    " Overcomes metal. Immunity to wood."))),
        React.createElement("div", { className: "section" },
            React.createElement("h2", { className: "header" }, "Money"),
            React.createElement("p", null, "After each round you will receive some money:"),
            React.createElement("ul", null,
                React.createElement("li", null, "Bonus for winning the round"),
                React.createElement("li", null, "10% interest"),
                React.createElement("li", null, "Win / loss streak bonus")))));
};
exports.Help = Help;


/***/ }),

/***/ "./src/app/display/game/mobileGame.tsx":
/*!*********************************************!*\
  !*** ./src/app/display/game/mobileGame.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var boardContainer_1 = __webpack_require__(/*! ./boardContainer */ "./src/app/display/game/boardContainer.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var overlay_1 = __webpack_require__(/*! @app/overlay */ "./src/app/overlay.ts");
var uiActions_1 = __webpack_require__(/*! @app/store/actions/uiActions */ "./src/app/store/actions/uiActions.ts");
var cardShop_1 = __webpack_require__(/*! @app/features/cardShop/cardShop */ "./src/app/features/cardShop/cardShop.tsx");
var playerList_1 = __webpack_require__(/*! @app/features/playerList/playerList */ "./src/app/features/playerList/playerList.tsx");
var profile_1 = __webpack_require__(/*! ../profile/profile */ "./src/app/display/profile/profile.tsx");
var help_1 = __webpack_require__(/*! ./help */ "./src/app/display/game/help.tsx");
var roundIndicator_1 = __webpack_require__(/*! ../roundIndicator */ "./src/app/display/roundIndicator.tsx");
var phaseInfo_1 = __webpack_require__(/*! ../phaseInfo */ "./src/app/display/phaseInfo.tsx");
var playerSelectors_1 = __webpack_require__(/*! @common/player/playerSelectors */ "./src/shared/player/playerSelectors.ts");
var NavItem = function (_a) {
    var overlay = _a.overlay, children = _a.children;
    var dispatch = react_redux_1.useDispatch();
    var isActive = react_redux_1.useSelector(function (state) { return state.ui.currentOverlay === overlay; });
    var onClick = function () {
        if (isActive) {
            dispatch(uiActions_1.closeOverlay());
            return;
        }
        dispatch(uiActions_1.openOverlay(overlay));
    };
    return React.createElement("button", { className: "navitem" + (isActive ? " active" : ""), onClick: onClick }, children);
};
var Navbar = function () {
    return (React.createElement("nav", { className: "navbar" },
        React.createElement(NavItem, { overlay: overlay_1.Overlay.PLAYERS }, "Players"),
        React.createElement(NavItem, { overlay: overlay_1.Overlay.SHOP }, "Shop"),
        React.createElement(NavItem, { overlay: overlay_1.Overlay.HELP }, "Help")));
};
var OverlayComponent = function (_a) {
    var title = _a.title, children = _a.children;
    var dispatch = react_redux_1.useDispatch();
    var dispatchCloseOverlay = function () { return dispatch(uiActions_1.closeOverlay()); };
    return (React.createElement("div", { className: "game-overlay" },
        React.createElement("div", { className: "overlay-header" },
            React.createElement("h2", { className: "overlay-title" }, title),
            React.createElement("button", { className: "close", onClick: dispatchCloseOverlay }, "X")),
        React.createElement("div", { className: "overlay-content" }, children)));
};
var GameOverlay = function (_a) {
    var currentOverlay = _a.currentOverlay;
    var currentBalance = react_redux_1.useSelector(playerSelectors_1.getPlayerMoney);
    if (currentOverlay === overlay_1.Overlay.PLAYERS) {
        return (React.createElement(OverlayComponent, { title: "Players" },
            React.createElement(profile_1.Profile, null),
            React.createElement(playerList_1.PlayerList, null)));
    }
    if (currentOverlay === overlay_1.Overlay.SHOP) {
        return (React.createElement(OverlayComponent, { title: "Balance: $" + currentBalance },
            React.createElement(cardShop_1.CardShop, { showBalance: false })));
    }
    if (currentOverlay === overlay_1.Overlay.HELP) {
        return (React.createElement(OverlayComponent, { title: "Help" },
            React.createElement(help_1.Help, null)));
    }
    return null;
};
var MobileGameContentPane = function () {
    var currentOverlay = react_redux_1.useSelector(function (state) { return state.ui.currentOverlay; });
    if (currentOverlay === null) {
        return (React.createElement("div", { className: "content-pane" },
            React.createElement(boardContainer_1.BoardContainer, null)));
    }
    return (React.createElement("div", { className: "content-pane" },
        React.createElement(GameOverlay, { currentOverlay: currentOverlay })));
};
var MobileGame = function () {
    return (React.createElement("div", { className: "game mobile portrait" },
        React.createElement("div", { className: "top-bar" },
            React.createElement(roundIndicator_1.RoundIndicator, null),
            React.createElement(phaseInfo_1.PhaseInfo, null)),
        React.createElement(MobileGameContentPane, null),
        React.createElement(Navbar, null)));
};
exports.MobileGame = MobileGame;


/***/ }),

/***/ "./src/app/display/index.ts":
/*!**********************************!*\
  !*** ./src/app/display/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var creatureImage_1 = __webpack_require__(/*! ./creatureImage */ "./src/app/display/creatureImage.tsx");
exports.CreatureImage = creatureImage_1.CreatureImage;
var progressBar_1 = __webpack_require__(/*! ./progressBar */ "./src/app/display/progressBar.tsx");
exports.ProgressBar = progressBar_1.ProgressBar;


/***/ }),

/***/ "./src/app/display/phaseInfo.tsx":
/*!***************************************!*\
  !*** ./src/app/display/phaseInfo.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var countdown_1 = __webpack_require__(/*! ./countdown */ "./src/app/display/countdown.tsx");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var renderPhaseInfoCountdown = function (secondsRemaining) { return React.createElement("span", { className: "highlight" },
    "(",
    secondsRemaining,
    ")"); };
var PhaseInfo = function () {
    var phase = react_redux_1.useSelector(function (state) { return state.game.phase; });
    var phaseStartedAtSeconds = react_redux_1.useSelector(function (state) { return state.game.phaseStartedAtSeconds; });
    if (phase === models_1.GamePhase.WAITING) {
        return React.createElement("div", { className: "phase-info" }, "Waiting for players");
    }
    if (phase === models_1.GamePhase.DEAD) {
        return React.createElement("div", { className: "phase-info" }, "You are dead");
    }
    var phaseEndTime = models_1.Constants.PHASE_LENGTHS[phase] + phaseStartedAtSeconds;
    return React.createElement("div", { className: "phase-info" },
        models_1.GamePhase[phase],
        " ",
        React.createElement(countdown_1.Countdown, { countdownToSeconds: phaseEndTime, render: renderPhaseInfoCountdown }));
};
exports.PhaseInfo = PhaseInfo;


/***/ }),

/***/ "./src/app/display/piece/components/healthbar.tsx":
/*!********************************************************!*\
  !*** ./src/app/display/piece/components/healthbar.tsx ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var progressBar_1 = __webpack_require__(/*! ../../progressBar */ "./src/app/display/progressBar.tsx");
var pieceSelectors_1 = __webpack_require__(/*! @common/player/pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var Healthbar = function (_a) {
    var pieceId = _a.pieceId, _b = _a.vertical, vertical = _b === void 0 ? false : _b;
    var showHealthbar = react_redux_1.useSelector(function (state) { return (state.game.phase === models_1.GamePhase.READY
        || state.game.phase === models_1.GamePhase.PLAYING); });
    var piece = react_redux_1.useSelector(function (state) { return pieceSelectors_1.getPiece(state, pieceId); });
    var localPlayerId = react_redux_1.useSelector(function (state) { return state.localPlayer.id; });
    var pieceIsOnBench = piece.position.y === null;
    if (!showHealthbar || !piece || pieceIsOnBench) {
        return null;
    }
    var ownerId = piece.ownerId, currentHealth = piece.currentHealth, maxHealth = piece.maxHealth;
    var friendly = (localPlayerId === ownerId);
    return (React.createElement(progressBar_1.ProgressBar, { className: "healthbar " + (friendly ? "friendly" : "enemy") + " " + (vertical ? "vertical" : ""), current: currentHealth, max: maxHealth, vertical: vertical }));
};
exports.Healthbar = Healthbar;


/***/ }),

/***/ "./src/app/display/piece/components/pieceImage.tsx":
/*!*********************************************************!*\
  !*** ./src/app/display/piece/components/pieceImage.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var pieceSelectors_1 = __webpack_require__(/*! @common/player/pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var creatureImage_1 = __webpack_require__(/*! ../../creatureImage */ "./src/app/display/creatureImage.tsx");
var PieceImage = function (_a) {
    var pieceId = _a.pieceId;
    var piece = react_redux_1.useSelector(function (state) { return pieceSelectors_1.getPiece(state, pieceId); });
    if (!piece) {
        return null;
    }
    return React.createElement(creatureImage_1.CreatureImage, { definitionId: piece.definitionId, facing: piece.facingAway ? "back" : "front" });
};
exports.PieceImage = PieceImage;


/***/ }),

/***/ "./src/app/display/piece/components/stageIndicator.tsx":
/*!*************************************************************!*\
  !*** ./src/app/display/piece/components/stageIndicator.tsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var pieceSelectors_1 = __webpack_require__(/*! @common/player/pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var StageIndicator = function (_a) {
    var pieceId = _a.pieceId;
    var piece = react_redux_1.useSelector(function (state) { return pieceSelectors_1.getPiece(state, pieceId); });
    if (!piece) {
        return null;
    }
    return React.createElement("div", { className: "piece-stage" }, piece.stage + 1);
};
exports.StageIndicator = StageIndicator;


/***/ }),

/***/ "./src/app/display/piece/pieceComponent.tsx":
/*!**************************************************!*\
  !*** ./src/app/display/piece/pieceComponent.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/esm/index.js");
var pieceImage_1 = __webpack_require__(/*! ./components/pieceImage */ "./src/app/display/piece/components/pieceImage.tsx");
var stageIndicator_1 = __webpack_require__(/*! ./components/stageIndicator */ "./src/app/display/piece/components/stageIndicator.tsx");
var healthbar_1 = __webpack_require__(/*! ./components/healthbar */ "./src/app/display/piece/components/healthbar.tsx");
var animation_1 = __webpack_require__(/*! ../animation */ "./src/app/display/animation.ts");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var pieceSelectors_1 = __webpack_require__(/*! @common/player/pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var boardActions_1 = __webpack_require__(/*! @app/store/actions/boardActions */ "./src/app/store/actions/boardActions.ts");
var projectile_1 = __webpack_require__(/*! ../projectile */ "./src/app/display/projectile.tsx");
var dyingAnimation = "dying";
var PieceComponent = function (props) {
    var id = props.id, draggable = props.draggable, animate = props.animate;
    var dispatch = react_redux_1.useDispatch();
    var _a = tslib_1.__read(React.useState([]), 2), currentAnimations = _a[0], setCurrentAnimations = _a[1];
    var _b = tslib_1.__read(React.useState(null), 2), oldPiece = _b[0], setOldPiece = _b[1];
    var localPlayerId = react_redux_1.useSelector(function (state) { return state.localPlayer.id; });
    var piece = react_redux_1.useSelector(function (state) { return pieceSelectors_1.getPiece(state, id); });
    var inPreparingPhase = react_redux_1.useSelector(function (state) { return state.game.phase === models_1.GamePhase.PREPARING; });
    var _c = tslib_1.__read(react_dnd_1.useDrag({
        item: { type: "Piece", piece: piece },
        canDrag: function () { return draggable && piece.ownerId === localPlayerId; }
    }), 2), _d = _c[0], drag = _c[1];
    var runAnimation = function (name, variables) { return setCurrentAnimations(function (oldAnimations) { return tslib_1.__spread(oldAnimations, [{ name: name, variables: variables }]); }); };
    var onAnimationEnd = function (_a) {
        var animationName = _a.animationName;
        setCurrentAnimations(function (oldAnimations) { return oldAnimations.filter(function (a) { return a.name !== animationName && !a.name.startsWith("move-"); }); });
    };
    var runAnimations = function (newPiece) {
        if (!animate) {
            return;
        }
        var attacking = newPiece.attacking, hit = newPiece.hit;
        if (!oldPiece) {
            setOldPiece(newPiece);
            return;
        }
        if (attacking && !oldPiece.attacking) {
            runAnimation("attack-" + attacking.attackType.name, {
                attackPower: attacking.damage,
                attackXDirection: attacking.direction.x,
                attackYDirection: attacking.direction.y,
                attackDistance: attacking.distance
            });
        }
        if (hit && !oldPiece.hit) {
            runAnimation("hit", { hitPower: hit.damage });
        }
        setOldPiece(newPiece);
    };
    var onClick = function () {
        var pieceIsOnBoard = piece.position.y !== null;
        // can only select a board piece in preparing phase
        if (pieceIsOnBoard && !inPreparingPhase) {
            return;
        }
        dispatch(boardActions_1.selectPiece(id));
    };
    React.useEffect(function () {
        if (piece) {
            runAnimations(piece);
        }
        else {
            setOldPiece(null);
        }
    }, [piece]);
    var isDead = piece.currentHealth === 0;
    return (React.createElement("div", { ref: drag, className: "piece " + currentAnimations.map(function (a) { return a.name; }).join(" ") + " " + (isDead ? dyingAnimation : ""), 
        // tslint:disable-next-line: jsx-ban-props
        style: animation_1.getAnimationCssVariables(currentAnimations), onClick: onClick, onAnimationEnd: onAnimationEnd },
        React.createElement("div", { className: "piece-meta" },
            React.createElement(stageIndicator_1.StageIndicator, { pieceId: id }),
            React.createElement(healthbar_1.Healthbar, { pieceId: id, vertical: true })),
        React.createElement(pieceImage_1.PieceImage, { pieceId: id }),
        React.createElement(projectile_1.Projectile, null)));
};
exports.PieceComponent = PieceComponent;


/***/ }),

/***/ "./src/app/display/piece/positionablePiece.tsx":
/*!*****************************************************!*\
  !*** ./src/app/display/piece/positionablePiece.tsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var pieceComponent_1 = __webpack_require__(/*! ./pieceComponent */ "./src/app/display/piece/pieceComponent.tsx");
var PositionablePiece = function (_a) {
    var id = _a.id, x = _a.x, y = _a.y, draggable = _a.draggable, animate = _a.animate;
    return (React.createElement("div", { className: "positionable-piece x-" + x + " y-" + y },
        React.createElement(pieceComponent_1.PieceComponent, { id: id, draggable: draggable, animate: animate })));
};
exports.PositionablePiece = PositionablePiece;


/***/ }),

/***/ "./src/app/display/profile/pieceCount.tsx":
/*!************************************************!*\
  !*** ./src/app/display/profile/pieceCount.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var pieceSelectors_1 = __webpack_require__(/*! @app/store/pieceSelectors */ "./src/app/store/pieceSelectors.ts");
var playerSelectors_1 = __webpack_require__(/*! @common/player/playerSelectors */ "./src/shared/player/playerSelectors.ts");
var PieceCount = function (props) {
    var level = react_redux_1.useSelector(playerSelectors_1.getPlayerLevel);
    var pieceCount = react_redux_1.useSelector(function (state) { return pieceSelectors_1.ownedPieceSelector(state).length; });
    if (pieceCount !== level) {
        return React.createElement("p", { className: "pieces warning" },
            pieceCount,
            " / ",
            level,
            " pieces (board not full!)");
    }
    return React.createElement("p", { className: "pieces" },
        pieceCount,
        " / ",
        level,
        " pieces");
};
exports.PieceCount = PieceCount;


/***/ }),

/***/ "./src/app/display/profile/profile.tsx":
/*!*********************************************!*\
  !*** ./src/app/display/profile/profile.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var progressBar_1 = __webpack_require__(/*! ../progressBar */ "./src/app/display/progressBar.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var utils_1 = __webpack_require__(/*! @common/utils */ "./src/shared/utils/index.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var pieceCount_1 = __webpack_require__(/*! ./pieceCount */ "./src/app/display/profile/pieceCount.tsx");
var player_1 = __webpack_require__(/*! @common/player */ "./src/shared/player/index.ts");
var playerSelectors_1 = __webpack_require__(/*! @common/player/playerSelectors */ "./src/shared/player/playerSelectors.ts");
var renderProgressBar = function (current, max) { return current + " / " + max + " xp"; };
var Profile = function () {
    var dispatch = react_redux_1.useDispatch();
    var gameStarted = react_redux_1.useSelector(function (state) { return state.game.phase !== models_1.GamePhase.WAITING; });
    var name = react_redux_1.useSelector(function (state) { return state.localPlayer.name; });
    var level = react_redux_1.useSelector(playerSelectors_1.getPlayerLevel);
    var xp = react_redux_1.useSelector(playerSelectors_1.getPlayerXp);
    if (gameStarted === false) {
        return null;
    }
    var xpForNextLevel = utils_1.getXpToNextLevel(level);
    var onBuyXp = function () { return dispatch(player_1.PlayerActions.buyXpAction()); };
    return (React.createElement("div", { className: "profile" },
        React.createElement("p", { className: "item name" }, name),
        React.createElement("p", { className: "item level" },
            "Level ",
            level),
        React.createElement("div", { className: "item" },
            React.createElement(pieceCount_1.PieceCount, null)),
        React.createElement("div", { className: "level-bar" },
            React.createElement(progressBar_1.ProgressBar, { className: "xp-progress", current: xp, max: xpForNextLevel, renderContents: renderProgressBar }),
            React.createElement("button", { onClick: onBuyXp, className: "buy-xp" },
                "Buy ",
                models_1.Constants.BUY_XP_AMOUNT,
                " xp ($",
                models_1.Constants.BUY_XP_COST,
                ")"))));
};
exports.Profile = Profile;


/***/ }),

/***/ "./src/app/display/progressBar.tsx":
/*!*****************************************!*\
  !*** ./src/app/display/progressBar.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var getPercentage = function (current, max) {
    return Math.floor((current / max) * 100) + "%";
};
var ProgressBar = function (_a) {
    var className = _a.className, current = _a.current, max = _a.max, _b = _a.vertical, vertical = _b === void 0 ? false : _b, renderContents = _a.renderContents;
    var fillStyle = (vertical
        ? { height: getPercentage(current, max) }
        : { width: getPercentage(current, max) });
    return (React.createElement("div", { className: className },
        React.createElement("div", { className: "fill", style: fillStyle }),
        renderContents
            && React.createElement("span", { className: "contents" }, renderContents(current, max))));
};
exports.ProgressBar = ProgressBar;


/***/ }),

/***/ "./src/app/display/projectile.tsx":
/*!****************************************!*\
  !*** ./src/app/display/projectile.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var Projectile = function () { return (React.createElement("svg", { className: "projectile", height: "12", width: "12" },
    React.createElement("circle", { cx: "6", cy: "6", r: "4", stroke: "#FAD17D", "stroke-width": "2", fill: "#F5E687" }))); };
exports.Projectile = Projectile;


/***/ }),

/***/ "./src/app/display/roundIndicator.tsx":
/*!********************************************!*\
  !*** ./src/app/display/roundIndicator.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var RoundIndicator = function () {
    var round = react_redux_1.useSelector(function (state) { return state.game.round; });
    if (round === null) {
        return null;
    }
    return React.createElement("div", { className: "round-indicator" },
        "Round ",
        React.createElement("span", { className: "highlight" }, round));
};
exports.RoundIndicator = RoundIndicator;


/***/ }),

/***/ "./src/app/display/stages/game.tsx":
/*!*****************************************!*\
  !*** ./src/app/display/stages/game.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gameStage_1 = __webpack_require__(/*! ./gameStage */ "./src/app/display/stages/gameStage.tsx");
var menuStage_1 = __webpack_require__(/*! ./menuStage */ "./src/app/display/stages/menuStage.tsx");
var lobbyStage_1 = __webpack_require__(/*! ./lobbyStage */ "./src/app/display/stages/lobbyStage.tsx");
var nicknameRequest_1 = __webpack_require__(/*! ./nicknameRequest */ "./src/app/display/stages/nicknameRequest.tsx");
var GameState;
(function (GameState) {
    GameState[GameState["MENU"] = 0] = "MENU";
    GameState[GameState["LOBBY"] = 1] = "LOBBY";
    GameState[GameState["GAME"] = 2] = "GAME";
})(GameState || (GameState = {}));
var gameStateSelector = function (state) {
    if (state.localPlayer.id !== null) {
        return GameState.GAME;
    }
    if (state.lobby.lobbyId !== null) {
        return GameState.LOBBY;
    }
    return GameState.MENU;
};
var Game = function () {
    var gameState = react_redux_1.useSelector(gameStateSelector);
    var requestNicknameMessage = react_redux_1.useSelector(function (state) { return state.lobby.requestNicknameMessage; });
    if (gameState === GameState.GAME) {
        return React.createElement(gameStage_1.GameStage, null);
    }
    if (gameState === GameState.LOBBY) {
        return React.createElement(lobbyStage_1.LobbyStage, null);
    }
    if (requestNicknameMessage) {
        return React.createElement(nicknameRequest_1.NicknameRequest, { message: requestNicknameMessage });
    }
    return React.createElement(menuStage_1.MenuStage, null);
};
exports.Game = Game;


/***/ }),

/***/ "./src/app/display/stages/gameStage.tsx":
/*!**********************************************!*\
  !*** ./src/app/display/stages/gameStage.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
// tslint:disable:jsx-ban-props
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/esm/index.js");
var react_dnd_multi_backend_1 = __webpack_require__(/*! react-dnd-multi-backend */ "./node_modules/react-dnd-multi-backend/dist/esm/index.js");
var HTML5toTouch_1 = __webpack_require__(/*! react-dnd-multi-backend/dist/esm/HTML5toTouch */ "./node_modules/react-dnd-multi-backend/dist/esm/HTML5toTouch.js");
var cardShop_1 = __webpack_require__(/*! ../../features/cardShop/cardShop */ "./src/app/features/cardShop/cardShop.tsx");
var playerList_1 = __webpack_require__(/*! ../../features/playerList/playerList */ "./src/app/features/playerList/playerList.tsx");
var react_media_1 = __webpack_require__(/*! react-media */ "./node_modules/react-media/esm/react-media.js");
var phaseInfo_1 = __webpack_require__(/*! ../../display/phaseInfo */ "./src/app/display/phaseInfo.tsx");
var profile_1 = __webpack_require__(/*! ../../display/profile/profile */ "./src/app/display/profile/profile.tsx");
var roundIndicator_1 = __webpack_require__(/*! ../../display/roundIndicator */ "./src/app/display/roundIndicator.tsx");
var responsiveBoardStyles_1 = __webpack_require__(/*! ../board/responsiveBoardStyles */ "./src/app/display/board/responsiveBoardStyles.tsx");
var boardContainer_1 = __webpack_require__(/*! ../game/boardContainer */ "./src/app/display/game/boardContainer.tsx");
var mobileGame_1 = __webpack_require__(/*! ../game/mobileGame */ "./src/app/display/game/mobileGame.tsx");
var GameStage = function () {
    return (React.createElement(react_dnd_1.DndProvider, { backend: react_dnd_multi_backend_1["default"], options: HTML5toTouch_1["default"] },
        React.createElement(responsiveBoardStyles_1.ResponsiveBoardStyles, null),
        React.createElement(react_media_1["default"], { query: "(orientation: landscape) and (min-width: 1200px)" },
            React.createElement("div", { className: "game landscape" },
                React.createElement("div", { className: "group" },
                    React.createElement(roundIndicator_1.RoundIndicator, null),
                    React.createElement(phaseInfo_1.PhaseInfo, null),
                    React.createElement(playerList_1.PlayerList, null)),
                React.createElement(boardContainer_1.BoardContainer, null),
                React.createElement("div", { className: "group" },
                    React.createElement(cardShop_1.CardShop, { showBalance: true }),
                    React.createElement(profile_1.Profile, null),
                    React.createElement("div", { className: "github-link" },
                        React.createElement("a", { href: "https://reddit.com/r/creaturechess/" }, "/r/CreatureChess"),
                        " - ",
                        React.createElement("a", { href: "https://github.com/Jameskmonger/creature-chess" }, "Source and Licenses on GitHub"))))),
        React.createElement(react_media_1["default"], { query: "(orientation: landscape) and (max-width: 1199px) and (min-width: 600px)" },
            React.createElement("div", { className: "game landscape" },
                React.createElement(boardContainer_1.BoardContainer, null),
                React.createElement("div", { className: "group" },
                    React.createElement(roundIndicator_1.RoundIndicator, null),
                    React.createElement(phaseInfo_1.PhaseInfo, null),
                    React.createElement(cardShop_1.CardShop, { showBalance: true }),
                    React.createElement(profile_1.Profile, null),
                    React.createElement(playerList_1.PlayerList, null),
                    React.createElement("div", { className: "github-link" },
                        React.createElement("a", { href: "https://reddit.com/r/creaturechess/" }, "/r/CreatureChess"),
                        " - ",
                        React.createElement("a", { href: "https://github.com/Jameskmonger/creature-chess" }, "Source and Licenses on GitHub"))))),
        React.createElement(react_media_1["default"], { query: "(orientation: portrait), (max-width: 599px)" },
            React.createElement(mobileGame_1.MobileGame, null))));
};
exports.GameStage = GameStage;


/***/ }),

/***/ "./src/app/display/stages/lobbyStage.tsx":
/*!***********************************************!*\
  !*** ./src/app/display/stages/lobbyStage.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var lobbyActions_1 = __webpack_require__(/*! ../../store/actions/lobbyActions */ "./src/app/store/actions/lobbyActions.ts");
var countdown_1 = __webpack_require__(/*! ../../display/countdown */ "./src/app/display/countdown.tsx");
var padNumberToTwo = function (val) { return val < 10 ? "0" + val : val.toString(); };
var countdownRender = function (totalSecondsRemaining) {
    var minutesRemaining = Math.floor(totalSecondsRemaining / 60);
    var secondsRemaining = Math.ceil(totalSecondsRemaining % 60);
    var time = minutesRemaining + ":" + padNumberToTwo(secondsRemaining);
    return (React.createElement("div", { className: "timeRemaining" },
        "Game starting in ",
        React.createElement("span", { className: "time" }, time)));
};
var LobbyStage = function () {
    var dispatch = react_redux_1.useDispatch();
    var lobbyId = react_redux_1.useSelector(function (state) { return state.lobby.lobbyId; });
    if (lobbyId === null) {
        return React.createElement("div", null, "An error occured, please refresh your page");
    }
    var players = react_redux_1.useSelector(function (state) { return state.lobby.players; });
    var isHost = react_redux_1.useSelector(function (state) { return state.lobby.isHost; });
    var lobbyStartingAtMs = react_redux_1.useSelector(function (state) { return state.lobby.startingAtMs; });
    var isPublic = lobbyStartingAtMs !== null;
    var onStartGameClick = function () { return dispatch(lobbyActions_1.startLobbyGame()); };
    return (React.createElement("div", { className: "lobby" },
        React.createElement("div", { className: "lobby-info" },
            React.createElement("div", { className: "players" }, players.map(function (p) { return (React.createElement("div", { className: "player" + (p.isBot ? " bot" : "") },
                React.createElement("span", null, p.name),
                p.isHost && React.createElement("span", { className: "host" }, "Host"))); })),
            React.createElement("div", { className: "text" },
                lobbyStartingAtMs
                    && (React.createElement(countdown_1.Countdown, { countdownToSeconds: lobbyStartingAtMs / 1000, render: countdownRender })),
                React.createElement("h2", { className: "lobby-id" },
                    "Lobby ID: ",
                    lobbyId),
                isHost && !isPublic
                    && (React.createElement("button", { className: "start-game", onClick: onStartGameClick }, "Start Game")),
                isPublic
                    && (React.createElement("p", null,
                        "The game will start ",
                        constants_1.LOBBY_WAIT_TIME,
                        " seconds after the lobby is created, or immediately when there are ",
                        constants_1.MAX_PLAYERS_IN_GAME,
                        " players")),
                !isPublic
                    && (React.createElement("p", null,
                        isHost ? "You" : "The host",
                        " can choose when to start the game, or it will start immediately when there are ",
                        constants_1.MAX_PLAYERS_IN_GAME,
                        " players")))),
        React.createElement("div", { className: "github-link" },
            React.createElement("a", { href: "https://reddit.com/r/creaturechess/" }, "/r/CreatureChess"),
            " - ",
            React.createElement("a", { href: "https://github.com/Jameskmonger/creature-chess" }, "Source and Licenses on GitHub"))));
};
exports.LobbyStage = LobbyStage;


/***/ }),

/***/ "./src/app/display/stages/menuStage.tsx":
/*!**********************************************!*\
  !*** ./src/app/display/stages/menuStage.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gameActions_1 = __webpack_require__(/*! ../../store/actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var gameSelector_1 = __webpack_require__(/*! ../../store/gameSelector */ "./src/app/store/gameSelector.ts");
var get_url_parameter_1 = __webpack_require__(/*! ../../get-url-parameter */ "./src/app/get-url-parameter.ts");
var auth0_1 = __webpack_require__(/*! @app/auth/auth0 */ "./src/app/auth/auth0.ts");
var PlayerInfo = function () {
    var nickname = react_redux_1.useSelector(function (state) { var _a; return (_a = state.auth.profile.nickname) === null || _a === void 0 ? void 0 : _a.value; });
    return (React.createElement("div", { className: "player-info" },
        React.createElement("span", { className: "welcome" },
            "Logged in (",
            React.createElement("span", { className: "email" }, nickname ? nickname : "No nickname set"),
            ")"),
        React.createElement("button", { className: "sign-out", onClick: auth0_1.signOut }, "Log out")));
};
var MenuStageUnconnected = /** @class */ (function (_super) {
    tslib_1.__extends(MenuStageUnconnected, _super);
    function MenuStageUnconnected() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            serverIP: "",
            debugModeClickCount: 0
        };
        _this.onTitleClick = function () {
            if (_this.state.debugModeClickCount === 3) {
                return;
            }
            _this.setState(function (prevState) { return ({
                debugModeClickCount: prevState.debugModeClickCount + 1
            }); }, function () {
                if (_this.state.debugModeClickCount !== 3) {
                    return;
                }
                _this.props.enableDebugMode();
            });
        };
        _this.onServerIPChange = function (event) {
            if (_this.state.debugModeClickCount !== 3) {
                return;
            }
            _this.setState({
                serverIP: event.target.value
            });
        };
        _this.onFindGameClick = function () {
            if (!_this.state.serverIP) {
                _this.props.setError("Server IP field empty");
                return;
            }
            _this.props.onFindGame(_this.state.serverIP);
        };
        return _this;
    }
    MenuStageUnconnected.prototype.componentDidMount = function () {
        var serverParam = get_url_parameter_1.getUrlParameter("server");
        this.setState({
            serverIP: serverParam || "https://cc-server.jamesmonger.com"
        });
    };
    MenuStageUnconnected.prototype.render = function () {
        var title = this.state.debugModeClickCount === 3
            ? React.createElement("h2", { className: "title" },
                "Creature Chess ",
                React.createElement("span", { className: "debug-mode" }, "(Debug Mode)"))
            : React.createElement("h2", { className: "title", onClick: this.onTitleClick }, "Creature Chess");
        if (this.props.loading) {
            return (React.createElement("div", { className: "menu" },
                React.createElement("div", { className: "join-game" },
                    title,
                    React.createElement("p", null, "Loading game..."))));
        }
        return (React.createElement("div", { className: "menu" },
            React.createElement(PlayerInfo, null),
            React.createElement("div", { className: "join-game" },
                title,
                React.createElement("p", null, "Click \"Find Game\" to start playing. If you haven't set a nickname, you will be prompted to choose one."),
                React.createElement("div", { className: "join-options" },
                    React.createElement("div", { className: "option" },
                        React.createElement("button", { onClick: this.onFindGameClick, className: "option-button primary" }, "Find Game"))),
                this.props.error
                    && React.createElement("div", { className: "error" },
                        React.createElement("p", null, this.props.error)),
                this.state.debugModeClickCount === 3
                    && (React.createElement("input", { value: this.state.serverIP, onChange: this.onServerIPChange, placeholder: "Server IP" }))),
            React.createElement("div", { className: "how-to-play" },
                React.createElement("div", { className: "header" }, "How to play"),
                React.createElement("div", { className: "content" },
                    React.createElement("p", null, "This game is a strategy game where you have to arrange pieces on a chess board"),
                    React.createElement("p", null, "Every turn, these pieces will be matched against an opponent's board, to fight to the winner"),
                    React.createElement("p", null, "Losing will decrease your health bar, when you reach 0 health you will be knocked out"),
                    React.createElement("p", null, "\u00A0"),
                    React.createElement("p", null, "You can buy pieces from the shop on the right - this refreshes every turn"),
                    React.createElement("p", null, "When you have 3 identical pieces, they will combine and upgrade - each piece has 3 levels"),
                    React.createElement("p", null, "There is also an XP shop, where you can buy XP to level up and place more pieces on the board"),
                    React.createElement("p", null, "\u00A0"),
                    React.createElement("p", null, "Good luck!"))),
            React.createElement("div", { className: "github-link" },
                React.createElement("a", { href: "https://reddit.com/r/creaturechess/" }, "/r/CreatureChess"),
                " - ",
                React.createElement("a", { href: "https://github.com/Jameskmonger/creature-chess" }, "Source and Licenses on GitHub"))));
    };
    return MenuStageUnconnected;
}(React.Component));
var mapStateToProps = function (state) { return ({
    loading: gameSelector_1.loadingSelector(state),
    error: state.game.menuError
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onFindGame: function (serverIP) { return dispatch(gameActions_1.findGameAction(serverIP)); },
    enableDebugMode: function () { return dispatch(gameActions_1.enableDebugMode()); },
    setError: function (error) { return dispatch(gameActions_1.joinGameError(error)); }
}); };
var MenuStage = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MenuStageUnconnected);
exports.MenuStage = MenuStage;


/***/ }),

/***/ "./src/app/display/stages/nicknameRequest.tsx":
/*!****************************************************!*\
  !*** ./src/app/display/stages/nicknameRequest.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var lobbyActions_1 = __webpack_require__(/*! @app/store/actions/lobbyActions */ "./src/app/store/actions/lobbyActions.ts");
var NicknameRequest = function (_a) {
    var message = _a.message;
    var dispatch = react_redux_1.useDispatch();
    var _b = tslib_1.__read(React.useState(""), 2), nickname = _b[0], setNickname = _b[1];
    var onNameChange = function (event) { return setNickname(event.target.value); };
    var onClick = function () { return dispatch(lobbyActions_1.nicknameChosen(nickname)); };
    return (React.createElement("div", { className: "menu" },
        React.createElement("div", { className: "join-game" },
            React.createElement("p", null, message),
            React.createElement("h2", { className: "nickname-warning" }, "This nickname is permanent and cannot be changed"),
            React.createElement("input", { value: nickname, onChange: onNameChange, maxLength: constants_1.MAX_NAME_LENGTH, placeholder: "Nickname", className: "name-input" }),
            React.createElement("div", { className: "join-options" },
                React.createElement("div", { className: "option" },
                    React.createElement("button", { onClick: onClick, className: "option-button primary" }, "Choose nickname"))))));
};
exports.NicknameRequest = NicknameRequest;


/***/ }),

/***/ "./src/app/display/style/index.scss":
/*!******************************************!*\
  !*** ./src/app/display/style/index.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/app/features/cardShop/balanceDisplay.tsx":
/*!******************************************************!*\
  !*** ./src/app/features/cardShop/balanceDisplay.tsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var BalanceDisplay = function (_a) {
    var value = _a.value;
    return (React.createElement(React.Fragment, null,
        React.createElement("span", { className: "item" }, "Balance"),
        React.createElement("span", { className: "item" },
            "$",
            value)));
};
exports.BalanceDisplay = BalanceDisplay;


/***/ }),

/***/ "./src/app/features/cardShop/card.tsx":
/*!********************************************!*\
  !*** ./src/app/features/cardShop/card.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var display_1 = __webpack_require__(/*! @app/display */ "./src/app/display/index.ts");
var definitionProvider_1 = __webpack_require__(/*! @common/game/definitionProvider */ "./src/shared/game/definitionProvider.ts");
var definitionProvider = new definitionProvider_1.DefinitionProvider();
var Card = function (_a) {
    var definitionId = _a.definitionId, buyable = _a.buyable, onClick = _a.onClick, _b = _a.fullWidth, fullWidth = _b === void 0 ? false : _b;
    var creature = definitionProvider.get(definitionId);
    var cardClassName = "card" + (fullWidth ? " full-width" : "");
    return (React.createElement("div", { className: cardClassName, onClick: (buyable && onClick) ? onClick : undefined },
        React.createElement("div", { className: "card-content" },
            React.createElement("div", { className: "card-content-group" },
                React.createElement(display_1.CreatureImage, { definitionId: definitionId })),
            !fullWidth
                && (React.createElement(React.Fragment, null,
                    React.createElement("h2", { className: "card-name" }, creature.name),
                    React.createElement("div", { className: "card-meta" },
                        React.createElement("span", { className: "card-class" }, creature["class"]),
                        React.createElement("div", { className: "divider" }),
                        React.createElement("span", { className: "card-type" }, creature.type)))),
            fullWidth
                && (React.createElement("div", { className: "card-content-group" },
                    React.createElement("h2", { className: "card-name" }, creature.name),
                    React.createElement("span", { className: "card-class" }, creature["class"]),
                    React.createElement("span", { className: "card-type" }, creature.type)))),
        React.createElement("div", { className: "price" },
            React.createElement("div", null,
                "$",
                creature.cost))));
};
exports.Card = Card;


/***/ }),

/***/ "./src/app/features/cardShop/cardShop.tsx":
/*!************************************************!*\
  !*** ./src/app/features/cardShop/cardShop.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var card_1 = __webpack_require__(/*! ./card */ "./src/app/features/cardShop/card.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var rerollButton_1 = __webpack_require__(/*! ./rerollButton */ "./src/app/features/cardShop/rerollButton.tsx");
var balanceDisplay_1 = __webpack_require__(/*! ./balanceDisplay */ "./src/app/features/cardShop/balanceDisplay.tsx");
var player_1 = __webpack_require__(/*! @common/player */ "./src/shared/player/index.ts");
var playerSelectors_1 = __webpack_require__(/*! @common/player/playerSelectors */ "./src/shared/player/playerSelectors.ts");
var CardShop = function (_a) {
    var showBalance = _a.showBalance;
    var dispatch = react_redux_1.useDispatch();
    var cards = react_redux_1.useSelector(function (state) { return state.cards; });
    var money = react_redux_1.useSelector(playerSelectors_1.getPlayerMoney);
    var canUseShop = react_redux_1.useSelector(function (state) { return state.game.phase !== models_1.GamePhase.WAITING && state.game.phase !== models_1.GamePhase.DEAD; });
    var shopLocked = react_redux_1.useSelector(function (state) { return state.game.shopLocked; });
    var createCard = function (card, index) {
        if (card === null) {
            return null;
        }
        var onClick = function () { return dispatch(player_1.PlayerActions.buyCard(index)); };
        return (React.createElement(card_1.Card, { key: index + "-" + card.definitionId, definitionId: card.definitionId, buyable: money >= card.cost, onClick: onClick }));
    };
    if (canUseShop === false) {
        return null;
    }
    // todo move this inside RerollButton
    var rerollBuyable = money >= models_1.Constants.REROLL_COST;
    var onBuyReroll = function () { return dispatch(player_1.PlayerActions.rerollCards()); };
    var onToggleLock = function () { return dispatch(player_1.PlayerActions.toggleShopLock()); };
    return (React.createElement("div", { className: "card-selector" },
        showBalance
            && (React.createElement("div", { className: "balance" },
                React.createElement(balanceDisplay_1.BalanceDisplay, { value: money }))),
        React.createElement("div", { className: "cards" },
            cards.map(createCard),
            React.createElement("div", { className: "shop-actions" },
                React.createElement(rerollButton_1.RerollButton, { buyable: rerollBuyable, cost: models_1.Constants.REROLL_COST, onBuy: onBuyReroll }),
                React.createElement("button", { className: "shop-action", onClick: onToggleLock }, shopLocked
                    ? "Unlock"
                    : "Lock")))));
};
exports.CardShop = CardShop;


/***/ }),

/***/ "./src/app/features/cardShop/closeShopOnFirstBuy.ts":
/*!**********************************************************!*\
  !*** ./src/app/features/cardShop/closeShopOnFirstBuy.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! @common/player/actions */ "./src/shared/player/actions.ts");
var overlay_1 = __webpack_require__(/*! @app/overlay */ "./src/app/overlay.ts");
var uiActions_1 = __webpack_require__(/*! @app/store/actions/uiActions */ "./src/app/store/actions/uiActions.ts");
exports.closeShopOnFirstBuy = function () {
    var shopIsOpen;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.take(actions_1.BUY_CARD)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.select(function (state) { return state.ui.currentOverlay === overlay_1.Overlay.SHOP; })];
            case 2:
                shopIsOpen = _a.sent();
                if (!shopIsOpen) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, effects_1.put(uiActions_1.closeOverlay())];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/app/features/cardShop/rerollButton.tsx":
/*!****************************************************!*\
  !*** ./src/app/features/cardShop/rerollButton.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var RerollButton = function (_a) {
    var buyable = _a.buyable, cost = _a.cost, onBuy = _a.onBuy;
    return (React.createElement("button", { className: "reroll shop-action", onClick: buyable ? onBuy : undefined, disabled: buyable === false },
        "New Cards ($",
        cost,
        ")"));
};
exports.RerollButton = RerollButton;


/***/ }),

/***/ "./src/app/features/playerList/battleInfo.tsx":
/*!****************************************************!*\
  !*** ./src/app/features/playerList/battleInfo.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var playerSelectors_1 = __webpack_require__(/*! @app/store/playerSelectors */ "./src/app/store/playerSelectors.ts");
var player_list_player_1 = __webpack_require__(/*! @common/models/player-list-player */ "./src/shared/models/player-list-player.ts");
var playerName_1 = __webpack_require__(/*! ./playerName */ "./src/app/features/playerList/playerName.tsx");
var getBattleText = function (battle) {
    if (battle.status === player_list_player_1.PlayerBattleStatus.IN_PROGRESS) {
        return "Battling";
    }
    if (battle.status === player_list_player_1.PlayerBattleStatus.FINISHED) {
        return battle.homeScore + " - " + battle.awayScore;
    }
    return "";
};
var getBattleHighlightClass = function (battle) {
    if (battle.status === player_list_player_1.PlayerBattleStatus.FINISHED) {
        var homeScore = battle.homeScore, awayScore = battle.awayScore;
        if (homeScore > awayScore) {
            return " win";
        }
        return " loss";
    }
    return "";
};
var BattleInfo = function (_a) {
    var playerId = _a.playerId;
    var player = react_redux_1.useSelector(playerSelectors_1.getPlayerById(playerId));
    if (!player || !player.battle) {
        return null;
    }
    var battle = player.battle;
    var highlightClass = getBattleHighlightClass(battle);
    var text = getBattleText(battle);
    return (React.createElement("div", { className: "battle-info" },
        React.createElement("span", { className: "highlight" + highlightClass }, text),
        "\u00A0vs\u00A0",
        React.createElement("span", { className: "highlight opponent-name" },
            React.createElement(playerName_1.PlayerName, { playerId: battle.opponentId }))));
};
exports.BattleInfo = BattleInfo;


/***/ }),

/***/ "./src/app/features/playerList/playerList.tsx":
/*!****************************************************!*\
  !*** ./src/app/features/playerList/playerList.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var playerListItem_1 = __webpack_require__(/*! ./playerListItem */ "./src/app/features/playerList/playerListItem.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gameSelector_1 = __webpack_require__(/*! ../../store/gameSelector */ "./src/app/store/gameSelector.ts");
var PlayerList = function () {
    var players = react_redux_1.useSelector(function (state) { return state.playerList; });
    var opponentId = react_redux_1.useSelector(gameSelector_1.opponentIdSelector);
    var localPlayerId = react_redux_1.useSelector(gameSelector_1.localPlayerIdSelector);
    var showReadyIndicators = react_redux_1.useSelector(function (state) { return state.game.phase === models_1.GamePhase.PREPARING; });
    return (React.createElement("div", { className: "player-list" }, players.map(function (p) {
        return React.createElement(playerListItem_1.PlayerListItem, { key: p.id, playerId: p.id, player: p, isLocal: p.id === localPlayerId, isOpponent: p.id === opponentId, ready: showReadyIndicators ? p.ready : null, streakType: p.streakType, streakAmount: p.streakAmount });
    })));
};
exports.PlayerList = PlayerList;


/***/ }),

/***/ "./src/app/features/playerList/playerListActionTypes.ts":
/*!**************************************************************!*\
  !*** ./src/app/features/playerList/playerListActionTypes.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PLAYER_LIST_UPDATED = "PLAYER_LIST_UPDATED";


/***/ }),

/***/ "./src/app/features/playerList/playerListActions.ts":
/*!**********************************************************!*\
  !*** ./src/app/features/playerList/playerListActions.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var playerListActionTypes_1 = __webpack_require__(/*! ./playerListActionTypes */ "./src/app/features/playerList/playerListActionTypes.ts");
exports.playerListUpdated = function (payload) { return ({
    type: playerListActionTypes_1.PLAYER_LIST_UPDATED,
    payload: payload
}); };


/***/ }),

/***/ "./src/app/features/playerList/playerListItem.tsx":
/*!********************************************************!*\
  !*** ./src/app/features/playerList/playerListItem.tsx ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var display_1 = __webpack_require__(/*! @app/display */ "./src/app/display/index.ts");
var playerName_1 = __webpack_require__(/*! ./playerName */ "./src/app/features/playerList/playerName.tsx");
var battleInfo_1 = __webpack_require__(/*! ./battleInfo */ "./src/app/features/playerList/battleInfo.tsx");
var ReadyIndicator = function (_a) {
    var ready = _a.ready;
    if (ready === null) {
        return null;
    }
    return (React.createElement("div", { className: "ready-indicator " + (ready ? "ready" : "not-ready") }));
};
var StreakIndicator = function (_a) {
    var type = _a.type, amount = _a.amount;
    if (type === null || !amount || amount === 1) {
        return null;
    }
    return React.createElement("div", { className: "streak-indicator " + (type === models_1.StreakType.WIN ? "win" : "lose") }, amount);
};
var PlayerListItem = function (props) {
    var className = "player-list-item " + (props.isLocal ? " local" : "") + " " + (props.isOpponent ? " opponent" : "");
    return (React.createElement("div", { className: className },
        React.createElement("div", { className: "row" },
            React.createElement("span", { className: "name" },
                React.createElement(playerName_1.PlayerName, { playerId: props.playerId })),
            React.createElement("div", { className: "badges" },
                React.createElement(StreakIndicator, { type: props.streakType, amount: props.streakAmount }),
                React.createElement(ReadyIndicator, { ready: props.ready }))),
        React.createElement(battleInfo_1.BattleInfo, { playerId: props.playerId }),
        React.createElement(display_1.ProgressBar, { className: "healthbar player-health", current: props.player.health, max: 100 })));
};
exports.PlayerListItem = PlayerListItem;


/***/ }),

/***/ "./src/app/features/playerList/playerListReducer.ts":
/*!**********************************************************!*\
  !*** ./src/app/features/playerList/playerListReducer.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var playerListActionTypes_1 = __webpack_require__(/*! ./playerListActionTypes */ "./src/app/features/playerList/playerListActionTypes.ts");
function playerList(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case playerListActionTypes_1.PLAYER_LIST_UPDATED:
            return action.payload;
        default:
            return state;
    }
}
exports.playerList = playerList;


/***/ }),

/***/ "./src/app/features/playerList/playerName.tsx":
/*!****************************************************!*\
  !*** ./src/app/features/playerList/playerName.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var playerSelectors_1 = __webpack_require__(/*! @app/store/playerSelectors */ "./src/app/store/playerSelectors.ts");
var PlayerName = function (_a) {
    var playerId = _a.playerId;
    var player = react_redux_1.useSelector(playerSelectors_1.getPlayerById(playerId));
    if (!player) {
        return null;
    }
    return React.createElement(React.Fragment, null, player.name);
};
exports.PlayerName = PlayerName;


/***/ }),

/***/ "./src/app/features/selectedCreature/selectedCreature.tsx":
/*!****************************************************************!*\
  !*** ./src/app/features/selectedCreature/selectedCreature.tsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var pieceSelectors_1 = __webpack_require__(/*! @common/player/pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var card_1 = __webpack_require__(/*! ../cardShop/card */ "./src/app/features/cardShop/card.tsx");
var actions_1 = __webpack_require__(/*! @common/player/actions */ "./src/shared/player/actions.ts");
var selectedPieceSelector = function (state) {
    return state.game.selectedPieceId
        ? pieceSelectors_1.getPiece(state, state.game.selectedPieceId)
        : null;
};
var SellPieceButton = function (_a) {
    var pieceId = _a.pieceId;
    var dispatch = react_redux_1.useDispatch();
    var onClick = function () { return dispatch(actions_1.playerSellPiece(pieceId)); };
    return React.createElement("button", { className: "ready-up", onClick: onClick }, "Sell Piece");
};
var SelectedCreature = function () {
    var selectedPiece = react_redux_1.useSelector(selectedPieceSelector);
    if (!selectedPiece) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(card_1.Card, { definitionId: selectedPiece.definitionId, buyable: false, fullWidth: true }),
        React.createElement(SellPieceButton, { pieceId: selectedPiece.id })));
};
exports.SelectedCreature = SelectedCreature;


/***/ }),

/***/ "./src/app/get-url-parameter.ts":
/*!**************************************!*\
  !*** ./src/app/get-url-parameter.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
// this doesn't handle boolean parameters e.g. foo.com?bool
// getUrlParameter("bool") and getUrlParameter("nonexistent") both return ""
exports.getUrlParameter = function (name) {
    var sanitizedName = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + sanitizedName + "=([^&#]*)");
    var results = regex.exec(window.location.search);
    if (results === null) {
        return "";
    }
    return decodeURIComponent(results[1].replace(/\+/g, " "));
};


/***/ }),

/***/ "./src/app/index.tsx":
/*!***************************!*\
  !*** ./src/app/index.tsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
__webpack_require__(/*! pepjs */ "./node_modules/pepjs/dist/pep.js");
__webpack_require__(/*! ./display/style/index.scss */ "./src/app/display/style/index.scss");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
var store_1 = __webpack_require__(/*! ./store/store */ "./src/app/store/store.ts");
var app_1 = __webpack_require__(/*! ./app */ "./src/app/app.tsx");
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(app_1.App, null))), document.getElementById("approot"));


/***/ }),

/***/ "./src/app/log.ts":
/*!************************!*\
  !*** ./src/app/log.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
// tslint:disable:no-console
exports.log = function (message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    return console.log.apply(console, tslib_1.__spread([message], optionalParams));
};


/***/ }),

/***/ "./src/app/networking/saga.ts":
/*!************************************!*\
  !*** ./src/app/networking/saga.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var io = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var gameActions_1 = __webpack_require__(/*! ../store/actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var playerListActions_1 = __webpack_require__(/*! ../features/playerList/playerListActions */ "./src/app/features/playerList/playerListActions.ts");
var gameActionTypes_1 = __webpack_require__(/*! ../store/actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var log_1 = __webpack_require__(/*! ../log */ "./src/app/log.ts");
var localPlayerActions_1 = __webpack_require__(/*! ../store/actions/localPlayerActions */ "./src/app/store/actions/localPlayerActions.ts");
var battleEventChannel_1 = __webpack_require__(/*! @common/match/combat/battleEventChannel */ "./src/shared/match/combat/battleEventChannel.ts");
var lobbyActions_1 = __webpack_require__(/*! ../store/actions/lobbyActions */ "./src/app/store/actions/lobbyActions.ts");
var incoming_packet_registry_1 = __webpack_require__(/*! @common/networking/incoming-packet-registry */ "./src/shared/networking/incoming-packet-registry.ts");
var server_to_client_1 = __webpack_require__(/*! @common/networking/server-to-client */ "./src/shared/networking/server-to-client.ts");
var outgoing_packet_registry_1 = __webpack_require__(/*! @common/networking/outgoing-packet-registry */ "./src/shared/networking/outgoing-packet-registry.ts");
var client_to_server_1 = __webpack_require__(/*! @common/networking/client-to-server */ "./src/shared/networking/client-to-server.ts");
var networking_1 = __webpack_require__(/*! @common/networking */ "./src/shared/networking/index.ts");
var actions_1 = __webpack_require__(/*! @common/player/actions */ "./src/shared/player/actions.ts");
var auth0_1 = __webpack_require__(/*! @app/auth/auth0 */ "./src/app/auth/auth0.ts");
var nickname_1 = __webpack_require__(/*! @common/validation/nickname */ "./src/shared/validation/nickname.ts");
var gameInfo_1 = __webpack_require__(/*! @common/player/gameInfo */ "./src/shared/player/gameInfo/index.ts");
var cardShop_1 = __webpack_require__(/*! @common/player/cardShop */ "./src/shared/player/cardShop/index.ts");
var boardActions_1 = __webpack_require__(/*! @common/board/actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
var benchActions_1 = __webpack_require__(/*! @common/player/bench/benchActions */ "./src/shared/player/bench/benchActions.ts");
var level_1 = __webpack_require__(/*! @common/player/level */ "./src/shared/player/level/index.ts");
var getSocket = function (serverIP, idToken, nickname) {
    // force to websocket for now until CORS is sorted
    var socket = io(serverIP, { transports: ["websocket", "xhr-polling"], reconnection: false });
    return new Promise(function (resolve, reject) {
        socket.on("connect", function () {
            socket.emit("authenticate", { idToken: idToken, nickname: nickname });
        });
        var onAuthenticated = function (_a) {
            var error = _a.error;
            if (!error) {
                socket.off("authenticate_response", onAuthenticated);
                resolve(socket);
                return;
            }
            socket.disconnect();
            reject(error);
        };
        socket.on("authenticate_response", onAuthenticated);
    });
};
var subscribe = function (registry, socket) {
    return redux_saga_1.eventChannel(function (emit) {
        socket.on("disconnect", function () {
            emit(gameActions_1.clearAnnouncement());
            emit(gameActions_1.updateConnectionStatus(networking_1.ConnectionStatus.DISCONNECTED));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, function (packet) {
            log_1.log("[PLAYER_LIST_UPDATE]", packet);
            emit(playerListActions_1.playerListUpdated(packet));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.CARDS_UPDATE, function (packet) {
            log_1.log("[CARDS_UPDATE]", packet);
            emit(cardShop_1.cardsUpdated(packet));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.MONEY_UPDATE, function (packet) {
            log_1.log("[MONEY_UPDATE]", packet);
            emit(gameInfo_1.moneyUpdateAction(packet));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.PHASE_UPDATE, function (packet) {
            log_1.log("[PHASE_UPDATE]", packet);
            emit(gameActions_1.updateConnectionStatus(networking_1.ConnectionStatus.CONNECTED));
            emit(gameInfo_1.gamePhaseUpdate(packet));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.LEVEL_UPDATE, function (packet) {
            log_1.log("[LEVEL_UPDATE]", packet);
            emit(level_1.setLevelAction(packet.level, packet.xp));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.LOBBY_PLAYER_UPDATE, function (packet) {
            log_1.log("[LOBBY_PLAYER_UPDATE]", packet);
            emit(lobbyActions_1.updateLobbyPlayerAction(packet.index, packet.player));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.JOIN_GAME, function (packet) {
            if (packet.type === "lobby") {
                var _a = packet.payload, playerId = _a.playerId, lobbyId = _a.lobbyId, players = _a.players, startTimestamp = _a.startTimestamp;
                emit(lobbyActions_1.joinLobbyAction(playerId, lobbyId, players, startTimestamp, false // todo remove this parameter
                ));
            }
            if (packet.type === "game") {
                var _b = packet.payload, localPlayerId = _b.localPlayerId, gameId = _b.gameId, name_1 = _b.name;
                emit(localPlayerActions_1.joinCompleteAction(localPlayerId, gameId, name_1));
                var _c = packet.payload.fullState, money = _c.money, cards = _c.cards, players = _c.players, _d = _c.level, level = _d.level, xp = _d.xp, board = _c.board, bench = _c.bench, phase = _c.phase;
                emit(gameInfo_1.moneyUpdateAction(money));
                emit(cardShop_1.cardsUpdated(cards));
                emit(playerListActions_1.playerListUpdated(players));
                emit(level_1.setLevelAction(level, xp));
                emit(boardActions_1.initialiseBoard(board));
                emit(benchActions_1.initialiseBench(bench));
                if (phase) {
                    emit(gameInfo_1.gamePhaseUpdate(phase));
                }
                else {
                    emit(gameActions_1.updateConnectionStatus(networking_1.ConnectionStatus.RECONNECTED));
                }
            }
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.FINISH_GAME, function (packet) {
            log_1.log("[FINISH_GAME]", packet);
            emit(gameActions_1.finishGameAction(packet.winnerName));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE, function (packet) {
            log_1.log("[SHOP_LOCK_UPDATE]", packet);
            emit(gameActions_1.shopLockUpdated(packet.locked));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.PLAYERS_RESURRECTED, function (_a) {
            var playerIds = _a.playerIds;
            emit(gameActions_1.playersResurrected(playerIds));
        });
        // tslint:disable-next-line:no-empty
        return function () { };
    });
};
var readPacketsToActions = function (incomingRegistry, socket) {
    var channel;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.call(subscribe, incomingRegistry, socket)];
            case 1:
                channel = _a.sent();
                return [4 /*yield*/, effects_1.takeEvery(channel, function (action) {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.put(action)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
var sendPlayerActions = function (registry) {
    var transmissionInProgress, actionPacketIndex, pendingActions, emitPendingActions, queueAction;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transmissionInProgress = false;
                actionPacketIndex = 0;
                pendingActions = [];
                emitPendingActions = function () {
                    // if there's a transmission in progress then wait
                    if (transmissionInProgress) {
                        return;
                    }
                    if (pendingActions.length === 0) {
                        return;
                    }
                    transmissionInProgress = true;
                    var index = ++actionPacketIndex;
                    var actions = tslib_1.__spread(pendingActions);
                    pendingActions = [];
                    var timeout;
                    var sendPacket = function () {
                        registry.emit(client_to_server_1.ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS, { index: index, actions: actions }, function (accepted, packetIndex) {
                            // if packet was not accepted, let's finish here
                            if (!accepted) {
                                return;
                            }
                            // if indices don't match, something weird must have happened.
                            // stop here for safety, but it shouldn't happen
                            if (packetIndex !== index) {
                                return;
                            }
                            // if the action just acknowledged isn't the most recent action, then stop -
                            // we must have already processed this acknowledgement in another flow
                            if (actionPacketIndex !== index) {
                                return;
                            }
                            // close the transmission
                            transmissionInProgress = false;
                            clearTimeout(timeout);
                            // emit any pending actions queued while this was being sent
                            emitPendingActions();
                        });
                        timeout = setTimeout(sendPacket, client_to_server_1.SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS);
                    };
                    sendPacket();
                };
                queueAction = function (action) {
                    pendingActions.push(action);
                    emitPendingActions();
                };
                return [4 /*yield*/, effects_1.takeEvery(actions_1.PlayerActionTypesArray, function (action) {
                        return tslib_1.__generator(this, function (_a) {
                            queueAction(action);
                            return [2 /*return*/];
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
var writeActionsToPackets = function (registry) {
    var _a, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = effects_1.all;
                _b = [effects_1.takeEvery(battleEventChannel_1.BATTLE_FINISHED, function () {
                        return tslib_1.__generator(this, function (_a) {
                            registry.emit(client_to_server_1.ClientToServerPacketOpcodes.FINISH_MATCH, { empty: true });
                            return [2 /*return*/];
                        });
                    }),
                    effects_1.takeEvery(lobbyActions_1.START_LOBBY_GAME, function () {
                        return tslib_1.__generator(this, function (_a) {
                            registry.emit(client_to_server_1.ClientToServerPacketOpcodes.START_LOBBY_GAME, { empty: true });
                            return [2 /*return*/];
                        });
                    })];
                return [4 /*yield*/, effects_1.fork(sendPlayerActions, registry)];
            case 1: return [4 /*yield*/, _a.apply(void 0, [_b.concat([
                        _c.sent()
                    ])])];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
};
exports.networking = function () {
    var action, state, isLoggedIn, idToken, socket, chosenNickname, e_1, nickname, error, nickname, error, outgoingRegistry, incomingRegistry;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.take(gameActionTypes_1.FIND_GAME)];
            case 1:
                action = _a.sent();
                return [4 /*yield*/, effects_1.select()];
            case 2:
                state = _a.sent();
                isLoggedIn = state.auth !== null;
                if (!isLoggedIn) {
                    auth0_1.signIn();
                    return [2 /*return*/];
                }
                idToken = state.auth.idToken;
                socket = null;
                chosenNickname = null;
                _a.label = 3;
            case 3:
                if (!(socket === null)) return [3 /*break*/, 25];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 24]);
                return [4 /*yield*/, effects_1.call(getSocket, action.payload.serverIP, idToken, chosenNickname)];
            case 5:
                socket = _a.sent();
                return [3 /*break*/, 24];
            case 6:
                e_1 = _a.sent();
                if (!(e_1.type === "nickname_required")) return [3 /*break*/, 14];
                chosenNickname = null;
                return [4 /*yield*/, effects_1.put(lobbyActions_1.requestNickname("You must choose a unique nickname before you can play!"))];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                if (!(chosenNickname === null)) return [3 /*break*/, 13];
                return [4 /*yield*/, effects_1.take(lobbyActions_1.NICKNAME_CHOSEN)];
            case 9:
                nickname = (_a.sent()).payload.nickname;
                error = nickname_1.validateNickname(nickname);
                if (!error) return [3 /*break*/, 11];
                return [4 /*yield*/, effects_1.put(lobbyActions_1.requestNickname(error))];
            case 10:
                _a.sent();
                return [3 /*break*/, 12];
            case 11:
                // this stops the loop
                chosenNickname = nickname;
                _a.label = 12;
            case 12: return [3 /*break*/, 8];
            case 13: return [3 /*break*/, 23];
            case 14:
                if (!(e_1.type === "invalid_nickname")) return [3 /*break*/, 22];
                chosenNickname = null;
                return [4 /*yield*/, effects_1.put(lobbyActions_1.requestNickname("Error: " + e_1.error))];
            case 15:
                _a.sent();
                _a.label = 16;
            case 16:
                if (!(chosenNickname === null)) return [3 /*break*/, 21];
                return [4 /*yield*/, effects_1.take(lobbyActions_1.NICKNAME_CHOSEN)];
            case 17:
                nickname = (_a.sent()).payload.nickname;
                error = nickname_1.validateNickname(nickname);
                if (!error) return [3 /*break*/, 19];
                return [4 /*yield*/, effects_1.put(lobbyActions_1.requestNickname(error))];
            case 18:
                _a.sent();
                return [3 /*break*/, 20];
            case 19:
                // this stops the loop
                chosenNickname = nickname;
                _a.label = 20;
            case 20: return [3 /*break*/, 16];
            case 21: return [3 /*break*/, 23];
            case 22:
                auth0_1.signIn();
                return [2 /*return*/];
            case 23: return [3 /*break*/, 24];
            case 24: return [3 /*break*/, 3];
            case 25:
                outgoingRegistry = new outgoing_packet_registry_1.OutgoingPacketRegistry(function (opcode, payload, ack) { return socket.emit(opcode, payload, ack); });
                incomingRegistry = new incoming_packet_registry_1.IncomingPacketRegistry(function (opcode, handler) { return socket.on(opcode, handler); });
                return [4 /*yield*/, effects_1.put(gameActions_1.updateConnectionStatus(networking_1.ConnectionStatus.CONNECTED))];
            case 26:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(readPacketsToActions, incomingRegistry, socket)];
            case 27:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(writeActionsToPackets, outgoingRegistry)];
            case 28:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/app/overlay.ts":
/*!****************************!*\
  !*** ./src/app/overlay.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Overlay;
(function (Overlay) {
    Overlay[Overlay["PLAYERS"] = 0] = "PLAYERS";
    Overlay[Overlay["SHOP"] = 1] = "SHOP";
    Overlay[Overlay["HELP"] = 2] = "HELP";
})(Overlay = exports.Overlay || (exports.Overlay = {}));


/***/ }),

/***/ "./src/app/pages/CallbackPage.tsx":
/*!****************************************!*\
  !*** ./src/app/pages/CallbackPage.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var react_router_1 = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
var authActions_1 = __webpack_require__(/*! @app/store/actions/authActions */ "./src/app/store/actions/authActions.ts");
var CallbackPage = function () {
    var isLoggedIn = react_redux_1.useSelector(function (state) { return state.auth !== null; });
    var dispatch = react_redux_1.useDispatch();
    React.useEffect(function () {
        if (isLoggedIn) {
            return;
        }
        dispatch(authActions_1.handleAuthenticationCallback());
    }, []);
    if (isLoggedIn) {
        return React.createElement(react_router_1.Redirect, { to: "/" });
    }
    return React.createElement("div", { className: "text-center" }, "Loading user profile.");
};
exports.CallbackPage = CallbackPage;


/***/ }),

/***/ "./src/app/pages/LoginPage.tsx":
/*!*************************************!*\
  !*** ./src/app/pages/LoginPage.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var auth0_1 = __webpack_require__(/*! ../auth/auth0 */ "./src/app/auth/auth0.ts");
var LoginPage = function () {
    var _a = tslib_1.__read(React.useState(false), 2), loading = _a[0], setLoading = _a[1];
    var onLoginClick = function () {
        setLoading(true);
        auth0_1.signIn();
    };
    return (React.createElement("div", { className: "menu" },
        React.createElement("div", { className: "join-game" },
            React.createElement("h2", { className: "title" }, "Creature Chess"),
            React.createElement("div", { className: "join-options" },
                React.createElement("div", { className: "option" },
                    loading
                        && React.createElement("button", { className: "option-button primary" }, "Loading..."),
                    !loading
                        && React.createElement("button", { onClick: onLoginClick, className: "option-button primary" }, "Log in / Sign up"),
                    React.createElement("p", { className: "description" },
                        "Creature Chess is completely free to play.",
                        React.createElement("br", null),
                        React.createElement("br", null),
                        "Use the button above to create an account, or to log in if you already have one.")))),
        React.createElement("div", { className: "how-to-play" },
            React.createElement("div", { className: "header" }, "Why do I need an account?"),
            React.createElement("div", { className: "content" },
                React.createElement("p", null, "Logging into an account allows the game to keep your session, so that if you get"),
                React.createElement("p", null, "disconnected, you can get right back into the game."),
                React.createElement("p", null, "\u00A0"),
                React.createElement("p", null, "I don't store any of your personal data. Your game data might be deleted occasionally as I"),
                React.createElement("p", null, "develop the game further.")))));
};
exports.LoginPage = LoginPage;


/***/ }),

/***/ "./src/app/store/actions/authActions.ts":
/*!**********************************************!*\
  !*** ./src/app/store/actions/authActions.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.USER_LOADED = "USER_LOADED";
exports.HANDLE_AUTHENTICATION_CALLBACK = "HANDLE_AUTHENTICATION_CALLBACK";
exports.userLoaded = function (user) { return ({
    type: exports.USER_LOADED,
    payload: {
        user: user
    }
}); };
exports.handleAuthenticationCallback = function () { return ({ type: exports.HANDLE_AUTHENTICATION_CALLBACK }); };


/***/ }),

/***/ "./src/app/store/actions/boardActions.ts":
/*!***********************************************!*\
  !*** ./src/app/store/actions/boardActions.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var boardActionTypes_1 = __webpack_require__(/*! ../actiontypes/boardActionTypes */ "./src/app/store/actiontypes/boardActionTypes.ts");
exports.selectPiece = function (id) { return ({
    type: boardActionTypes_1.SELECT_PIECE,
    payload: {
        id: id
    }
}); };


/***/ }),

/***/ "./src/app/store/actions/gameActions.ts":
/*!**********************************************!*\
  !*** ./src/app/store/actions/gameActions.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var gameActionTypes_1 = __webpack_require__(/*! ../actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
exports.findGameAction = function (serverIP) { return ({
    type: gameActionTypes_1.FIND_GAME,
    payload: {
        serverIP: serverIP
    }
}); };
exports.joinGameError = function (error) { return ({
    type: gameActionTypes_1.JOIN_ERROR,
    payload: {
        error: error
    }
}); };
exports.phaseStartSeconds = function (timeSeconds) { return ({
    type: gameActionTypes_1.PHASE_START_SECONDS,
    payload: {
        time: timeSeconds
    }
}); };
exports.enableDebugMode = function () { return ({
    type: gameActionTypes_1.ENABLE_DEBUG_MODE
}); };
exports.updateAnnouncement = function (main, sub) { return ({
    type: gameActionTypes_1.UPDATE_ANNOUNCEMENT,
    payload: {
        main: main, sub: sub
    }
}); };
exports.clearAnnouncement = function () { return ({ type: gameActionTypes_1.CLEAR_ANNOUNCEMENT }); };
exports.playersResurrected = function (playerIds) { return ({
    type: gameActionTypes_1.PLAYERS_RESURRECTED,
    payload: {
        playerIds: playerIds
    }
}); };
exports.updateConnectionStatus = function (status) { return ({
    type: gameActionTypes_1.UPDATE_CONNECTION_STATUS,
    payload: {
        status: status
    }
}); };
exports.shopLockUpdated = function (locked) { return ({
    type: gameActionTypes_1.SHOP_LOCK_UPDATED,
    payload: { locked: locked }
}); };
exports.finishGameAction = function (winnerName) { return ({
    type: gameActionTypes_1.FINISH_GAME,
    payload: {
        winnerName: winnerName
    }
}); };
exports.clearSelectedPiece = function () { return ({ type: gameActionTypes_1.CLEAR_SELECTED_PIECE }); };


/***/ }),

/***/ "./src/app/store/actions/lobbyActions.ts":
/*!***********************************************!*\
  !*** ./src/app/store/actions/lobbyActions.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.JOIN_LOBBY = "JOIN_LOBBY";
exports.UPDATE_LOBBY_PLAYER = "UPDATE_LOBBY_PLAYER";
exports.START_LOBBY_GAME = "START_LOBBY_GAME";
exports.REQUEST_NICKNAME = "REQUEST_NICKNAME";
exports.NICKNAME_CHOSEN = "NICKNAME_CHOSEN";
exports.joinLobbyAction = function (localPlayerId, lobbyId, players, startTimestamp, isHost) { return ({
    type: exports.JOIN_LOBBY,
    payload: {
        localPlayerId: localPlayerId,
        lobbyId: lobbyId,
        players: players,
        startTimestamp: startTimestamp,
        isHost: isHost
    }
}); };
exports.updateLobbyPlayerAction = function (index, player) { return ({
    type: exports.UPDATE_LOBBY_PLAYER,
    payload: {
        index: index,
        player: player
    }
}); };
exports.startLobbyGame = function () { return ({ type: exports.START_LOBBY_GAME }); };
exports.requestNickname = function (reason) { return ({ type: exports.REQUEST_NICKNAME, payload: { reason: reason } }); };
exports.nicknameChosen = function (nickname) { return ({ type: exports.NICKNAME_CHOSEN, payload: { nickname: nickname } }); };


/***/ }),

/***/ "./src/app/store/actions/localPlayerActions.ts":
/*!*****************************************************!*\
  !*** ./src/app/store/actions/localPlayerActions.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var localPlayerActionTypes_1 = __webpack_require__(/*! ../actiontypes/localPlayerActionTypes */ "./src/app/store/actiontypes/localPlayerActionTypes.ts");
exports.joinCompleteAction = function (playerId, gameId, name) { return ({
    type: localPlayerActionTypes_1.JOIN_COMPLETE,
    payload: {
        playerId: playerId,
        gameId: gameId,
        name: name
    }
}); };


/***/ }),

/***/ "./src/app/store/actions/uiActions.ts":
/*!********************************************!*\
  !*** ./src/app/store/actions/uiActions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.OPEN_OVERLAY = "OPEN_OVERLAY";
exports.CLOSE_OVERLAY = "CLOSE_OVERLAY";
exports.openOverlay = function (overlay) { return ({
    type: exports.OPEN_OVERLAY,
    payload: {
        overlay: overlay
    }
}); };
exports.closeOverlay = function () { return ({ type: exports.CLOSE_OVERLAY }); };


/***/ }),

/***/ "./src/app/store/actiontypes/boardActionTypes.ts":
/*!*******************************************************!*\
  !*** ./src/app/store/actiontypes/boardActionTypes.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.SELECT_PIECE = "SELECT_PIECE";


/***/ }),

/***/ "./src/app/store/actiontypes/gameActionTypes.ts":
/*!******************************************************!*\
  !*** ./src/app/store/actiontypes/gameActionTypes.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.FIND_GAME = "FIND_GAME";
exports.JOIN_ERROR = "JOIN_ERROR";
exports.PLAYERS_RESURRECTED = "PLAYERS_RESURRECTED";
exports.PHASE_START_SECONDS = "PHASE_START_SECONDS";
exports.ENABLE_DEBUG_MODE = "ENABLE_DEBUG_MODE";
exports.UPDATE_ANNOUNCEMENT = "UPDATE_ANNOUNCEMENT";
exports.CLEAR_ANNOUNCEMENT = "CLEAR_ANNOUNCEMENT";
exports.UPDATE_CONNECTION_STATUS = "UPDATE_CONNECTION_STATUS";
exports.SHOP_LOCK_UPDATED = "SHOP_LOCK_UPDATED";
exports.CLEAR_SELECTED_PIECE = "CLEAR_SELECTED_PIECE";
exports.FINISH_GAME = "FINISH_GAME";


/***/ }),

/***/ "./src/app/store/actiontypes/localPlayerActionTypes.ts":
/*!*************************************************************!*\
  !*** ./src/app/store/actiontypes/localPlayerActionTypes.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.JOIN_COMPLETE = "JOIN_COMPLETE";


/***/ }),

/***/ "./src/app/store/gameSelector.ts":
/*!***************************************!*\
  !*** ./src/app/store/gameSelector.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.loadingSelector = function (state) { return state.game.loading; };
exports.localPlayerIdSelector = function (state) { return state.localPlayer.id; };
exports.opponentIdSelector = function (state) { return state.game.opponentId; };


/***/ }),

/***/ "./src/app/store/pieceSelectors.ts":
/*!*****************************************!*\
  !*** ./src/app/store/pieceSelectors.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var reselect_1 = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");
var gameSelector_1 = __webpack_require__(/*! ./gameSelector */ "./src/app/store/gameSelector.ts");
exports.benchTilePieceSelector = reselect_1.createSelector(function (state) { return state.bench; }, function (state, props) { return ({ x: props.x }); }, function (_a, _b) {
    var pieces = _a.pieces;
    var x = _b.x;
    return pieces[x] || null;
});
exports.boardTilePieceSelector = reselect_1.createSelector(function (state) { return state.board.pieces; }, function (state) { return state.board.piecePositions; }, function (state, props) { return ({ x: props.x, y: props.y }); }, function (pieces, piecePositions, _a) {
    var x = _a.x, y = _a.y;
    var positionString = x + "," + y;
    var pieceId = piecePositions[positionString];
    if (!pieceId) {
        return null;
    }
    return pieces[pieceId] || null;
});
exports.ownedPieceSelector = function (state) {
    var playerId = gameSelector_1.localPlayerIdSelector(state);
    return Object.values(state.board.pieces).filter(function (p) { return p.ownerId === playerId; });
};


/***/ }),

/***/ "./src/app/store/playerSelectors.ts":
/*!******************************************!*\
  !*** ./src/app/store/playerSelectors.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var reselect_1 = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");
exports.getPlayers = function (state) { return state.playerList; };
exports.getPlayerById = function (id) {
    return reselect_1.createSelector(exports.getPlayers, function (players) { return players.find(function (p) { return p.id === id; }) || null; });
};


/***/ }),

/***/ "./src/app/store/reducers/authReducer.ts":
/*!***********************************************!*\
  !*** ./src/app/store/reducers/authReducer.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var authActions_1 = __webpack_require__(/*! ../actions/authActions */ "./src/app/store/actions/authActions.ts");
exports.initialState = null;
function auth(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case authActions_1.USER_LOADED:
            var _a = action.payload.user, authenticated = _a.authenticated, expiresAt = _a.expiresAt, idToken = _a.idToken, profile = _a.profile;
            return {
                authenticated: authenticated,
                expiresAt: expiresAt,
                idToken: idToken,
                profile: profile
            };
        default:
            return state;
    }
}
exports.auth = auth;


/***/ }),

/***/ "./src/app/store/reducers/gameReducer.ts":
/*!***********************************************!*\
  !*** ./src/app/store/reducers/gameReducer.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var gameActionTypes_1 = __webpack_require__(/*! ../actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var localPlayerActionTypes_1 = __webpack_require__(/*! ../actiontypes/localPlayerActionTypes */ "./src/app/store/actiontypes/localPlayerActionTypes.ts");
var boardActionTypes_1 = __webpack_require__(/*! ../actiontypes/boardActionTypes */ "./src/app/store/actiontypes/boardActionTypes.ts");
var networking_1 = __webpack_require__(/*! @common/networking */ "./src/shared/networking/index.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var gameInfo_1 = __webpack_require__(/*! @common/player/gameInfo */ "./src/shared/player/gameInfo/index.ts");
exports.initialState = {
    gameId: null,
    opponentId: null,
    loading: false,
    menuError: null,
    phase: models_1.GamePhase.WAITING,
    phaseStartedAtSeconds: null,
    round: null,
    debug: false,
    mainAnnouncement: null,
    subAnnouncement: null,
    selectedPieceId: null,
    connectionStatus: networking_1.ConnectionStatus.NOT_CONNECTED,
    shopLocked: false,
    winnerName: null
};
function game(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case gameActionTypes_1.UPDATE_CONNECTION_STATUS:
            return tslib_1.__assign(tslib_1.__assign({}, state), { connectionStatus: action.payload.status });
        case gameActionTypes_1.FIND_GAME:
            return tslib_1.__assign(tslib_1.__assign({}, state), { loading: true });
        case gameActionTypes_1.JOIN_ERROR:
            return tslib_1.__assign(tslib_1.__assign({}, state), { loading: false, menuError: action.payload.error });
        case localPlayerActionTypes_1.JOIN_COMPLETE:
            return tslib_1.__assign(tslib_1.__assign({}, state), { loading: false, menuError: null, gameId: action.payload.gameId });
        case gameActionTypes_1.PHASE_START_SECONDS:
            return tslib_1.__assign(tslib_1.__assign({}, state), { phaseStartedAtSeconds: action.payload.time });
        case gameInfo_1.GAME_PHASE_UPDATE:
            // set opponent id when entering ready phase
            if (action.payload.phase === models_1.GamePhase.READY) {
                return tslib_1.__assign(tslib_1.__assign({}, state), { phase: action.payload.phase, opponentId: action.payload.payload.opponentId });
            }
            // clear opponent id when entering preparing phase
            if (action.payload.phase === models_1.GamePhase.PREPARING) {
                return tslib_1.__assign(tslib_1.__assign({}, state), { phase: action.payload.phase, round: action.payload.payload.round, opponentId: null });
            }
            return tslib_1.__assign(tslib_1.__assign({}, state), { phase: action.payload.phase });
        case gameActionTypes_1.ENABLE_DEBUG_MODE: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { debug: true });
        }
        case gameActionTypes_1.UPDATE_ANNOUNCEMENT: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { mainAnnouncement: action.payload.main, subAnnouncement: action.payload.sub });
        }
        case gameActionTypes_1.CLEAR_ANNOUNCEMENT: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { mainAnnouncement: null, subAnnouncement: null });
        }
        case boardActionTypes_1.SELECT_PIECE: {
            var isSamePiece = state.selectedPieceId && state.selectedPieceId === action.payload.id;
            return tslib_1.__assign(tslib_1.__assign({}, state), { selectedPieceId: isSamePiece ? null : action.payload.id });
        }
        case gameActionTypes_1.SHOP_LOCK_UPDATED: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { shopLocked: action.payload.locked });
        }
        case gameActionTypes_1.FINISH_GAME: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { winnerName: action.payload.winnerName });
        }
        case gameActionTypes_1.CLEAR_SELECTED_PIECE: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { selectedPieceId: null });
        }
        default:
            return state;
    }
}
exports.game = game;


/***/ }),

/***/ "./src/app/store/reducers/index.ts":
/*!*****************************************!*\
  !*** ./src/app/store/reducers/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var bench_1 = __webpack_require__(/*! @common/player/bench */ "./src/shared/player/bench/index.ts");
var cardShop_1 = __webpack_require__(/*! @common/player/cardShop */ "./src/shared/player/cardShop/index.ts");
var gameInfo_1 = __webpack_require__(/*! @common/player/gameInfo */ "./src/shared/player/gameInfo/index.ts");
var playerListReducer_1 = __webpack_require__(/*! ../../features/playerList/playerListReducer */ "./src/app/features/playerList/playerListReducer.ts");
var gameReducer_1 = __webpack_require__(/*! ./gameReducer */ "./src/app/store/reducers/gameReducer.ts");
var localPlayerReducer_1 = __webpack_require__(/*! ./localPlayerReducer */ "./src/app/store/reducers/localPlayerReducer.ts");
var lobbyReducer_1 = __webpack_require__(/*! ./lobbyReducer */ "./src/app/store/reducers/lobbyReducer.ts");
var authReducer_1 = __webpack_require__(/*! ./authReducer */ "./src/app/store/reducers/authReducer.ts");
var uiReducer_1 = __webpack_require__(/*! ./uiReducer */ "./src/app/store/reducers/uiReducer.ts");
var level_1 = __webpack_require__(/*! @common/player/level */ "./src/shared/player/level/index.ts");
exports.reducers = {
    board: board_1.boardReducer,
    bench: bench_1.benchReducer,
    playerList: playerListReducer_1.playerList,
    cards: cardShop_1.cardsReducer,
    gameInfo: gameInfo_1.gameInfoReducer,
    level: level_1.levelReducer,
    game: gameReducer_1.game,
    localPlayer: localPlayerReducer_1.localPlayer,
    lobby: lobbyReducer_1.lobby,
    auth: authReducer_1.auth,
    ui: uiReducer_1.ui
};


/***/ }),

/***/ "./src/app/store/reducers/lobbyReducer.ts":
/*!************************************************!*\
  !*** ./src/app/store/reducers/lobbyReducer.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var lobbyActions_1 = __webpack_require__(/*! ../actions/lobbyActions */ "./src/app/store/actions/lobbyActions.ts");
var initialState = {
    lobbyId: null,
    localPlayerId: null,
    players: [],
    startingAtMs: null,
    isHost: false,
    requestNicknameMessage: null
};
function lobby(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case lobbyActions_1.REQUEST_NICKNAME: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { requestNicknameMessage: action.payload.reason });
        }
        case lobbyActions_1.JOIN_LOBBY:
            return tslib_1.__assign(tslib_1.__assign({}, state), { lobbyId: action.payload.lobbyId, localPlayerId: action.payload.localPlayerId, players: action.payload.players, isHost: action.payload.isHost, startingAtMs: action.payload.startTimestamp });
        case lobbyActions_1.UPDATE_LOBBY_PLAYER:
            var cloned = tslib_1.__assign(tslib_1.__assign({}, state), { players: tslib_1.__spread(state.players) });
            cloned.players[action.payload.index] = action.payload.player;
            return cloned;
        default:
            return state;
    }
}
exports.lobby = lobby;


/***/ }),

/***/ "./src/app/store/reducers/localPlayerReducer.ts":
/*!******************************************************!*\
  !*** ./src/app/store/reducers/localPlayerReducer.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var localPlayerActionTypes_1 = __webpack_require__(/*! ../actiontypes/localPlayerActionTypes */ "./src/app/store/actiontypes/localPlayerActionTypes.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var gameInfo_1 = __webpack_require__(/*! @common/player/gameInfo */ "./src/shared/player/gameInfo/index.ts");
var actions_1 = __webpack_require__(/*! @common/player/actions */ "./src/shared/player/actions.ts");
var initialState = {
    id: null,
    name: null,
    ready: false
};
function localPlayer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case localPlayerActionTypes_1.JOIN_COMPLETE:
            return tslib_1.__assign(tslib_1.__assign({}, state), { id: action.payload.playerId, name: action.payload.name, ready: false });
        case actions_1.READY_UP:
            return tslib_1.__assign(tslib_1.__assign({}, state), { ready: true });
        case gameInfo_1.GAME_PHASE_UPDATE:
            if (action.payload.phase !== models_1.GamePhase.READY) {
                return state;
            }
            return tslib_1.__assign(tslib_1.__assign({}, state), { ready: false });
        default:
            return state;
    }
}
exports.localPlayer = localPlayer;


/***/ }),

/***/ "./src/app/store/reducers/uiReducer.ts":
/*!*********************************************!*\
  !*** ./src/app/store/reducers/uiReducer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var uiActions_1 = __webpack_require__(/*! ../actions/uiActions */ "./src/app/store/actions/uiActions.ts");
var initialState = {
    currentOverlay: null
};
function ui(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case uiActions_1.OPEN_OVERLAY: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { currentOverlay: action.payload.overlay });
        }
        case uiActions_1.CLOSE_OVERLAY: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { currentOverlay: null });
        }
        default:
            return state;
    }
}
exports.ui = ui;


/***/ }),

/***/ "./src/app/store/sagas/actions/announcement.ts":
/*!*****************************************************!*\
  !*** ./src/app/store/sagas/actions/announcement.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var gameActionTypes_1 = __webpack_require__(/*! ../../actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var gameActions_1 = __webpack_require__(/*! ../../actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var gameInfo_1 = __webpack_require__(/*! @common/player/gameInfo */ "./src/shared/player/gameInfo/index.ts");
// distinctLastJoin(["James", "Bob", "William", "Steve"], ", ", " and ")
// -> "James, Bob, William and Steve"
var distinctLastJoin = function (items, mainSeparator, lastSeparator) {
    if (!items || !items.length) {
        return null;
    }
    if (items.length === 1) {
        return items[0];
    }
    var output = items[0];
    for (var i = 1; i < items.length - 1; i++) {
        output = output + mainSeparator + items[i];
    }
    output = output + lastSeparator + items[items.length - 1];
    return output;
};
exports.announcement = function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest([gameInfo_1.GAME_PHASE_UPDATE, gameActionTypes_1.PLAYERS_RESURRECTED], function (action) {
                    var state, opponentId_1, opponent, playerIds, state_1, playerNames, message;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(action.type === gameInfo_1.GAME_PHASE_UPDATE)) return [3 /*break*/, 5];
                                if (!(action.payload.phase === models_1.GamePhase.PLAYING)) return [3 /*break*/, 2];
                                return [4 /*yield*/, effects_1.put(gameActions_1.clearAnnouncement())];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                            case 2:
                                if (!(action.payload.phase === models_1.GamePhase.READY)) return [3 /*break*/, 5];
                                return [4 /*yield*/, effects_1.select()];
                            case 3:
                                state = _a.sent();
                                opponentId_1 = action.payload.payload.opponentId;
                                opponent = state.playerList.find(function (p) { return p.id === opponentId_1; });
                                if (!opponent) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, effects_1.put(gameActions_1.updateAnnouncement(opponent.name, "Now Playing"))];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5:
                                if (!(action.type === gameActionTypes_1.PLAYERS_RESURRECTED)) return [3 /*break*/, 10];
                                playerIds = action.payload.playerIds;
                                return [4 /*yield*/, effects_1.select()];
                            case 6:
                                state_1 = _a.sent();
                                playerNames = playerIds.map(function (playerId) {
                                    var player = state_1.playerList.find(function (p) { return p.id === playerId; });
                                    if (!player) {
                                        return null;
                                    }
                                    return player.name;
                                }).filter(function (name) { return name !== null; });
                                message = distinctLastJoin(playerNames, ", ", " and ");
                                if (!message) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, effects_1.put(gameActions_1.updateAnnouncement("Players Resurrected", message))];
                            case 7:
                                _a.sent();
                                return [4 /*yield*/, effects_1.delay(2000)];
                            case 8:
                                _a.sent();
                                return [4 /*yield*/, effects_1.put(gameActions_1.clearAnnouncement())];
                            case 9:
                                _a.sent();
                                _a.label = 10;
                            case 10: return [2 /*return*/];
                        }
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/app/store/sagas/actions/auth.ts":
/*!*********************************************!*\
  !*** ./src/app/store/sagas/actions/auth.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var authActions_1 = __webpack_require__(/*! @app/store/actions/authActions */ "./src/app/store/actions/authActions.ts");
var auth0_1 = __webpack_require__(/*! @app/auth/auth0 */ "./src/app/auth/auth0.ts");
exports.auth = function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(authActions_1.HANDLE_AUTHENTICATION_CALLBACK, function parseHash() {
                    var authInfo;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, effects_1.call(auth0_1.handleAuthentication)];
                            case 1:
                                authInfo = _a.sent();
                                return [4 /*yield*/, effects_1.put(authActions_1.userLoaded(authInfo))];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/app/store/sagas/actions/gamePhase.ts":
/*!**************************************************!*\
  !*** ./src/app/store/sagas/actions/gamePhase.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var gameActions_1 = __webpack_require__(/*! ../../actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var battleSaga_1 = __webpack_require__(/*! @common/match/combat/battleSaga */ "./src/shared/match/combat/battleSaga.ts");
var benchActions_1 = __webpack_require__(/*! @common/player/bench/benchActions */ "./src/shared/player/bench/benchActions.ts");
var boardActions_1 = __webpack_require__(/*! @common/board/actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
var pieceSelectors_1 = __webpack_require__(/*! @common/player/pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var uiActions_1 = __webpack_require__(/*! @app/store/actions/uiActions */ "./src/app/store/actions/uiActions.ts");
var overlay_1 = __webpack_require__(/*! @app/overlay */ "./src/app/overlay.ts");
var gameInfo_1 = __webpack_require__(/*! @common/player/gameInfo */ "./src/shared/player/gameInfo/index.ts");
var cardShop_1 = __webpack_require__(/*! @common/player/cardShop */ "./src/shared/player/cardShop/index.ts");
var isGamePhaseUpdate = function (phase) {
    return function (action) { return action.type === gameInfo_1.GAME_PHASE_UPDATE && action.payload.phase === phase; };
};
exports.gamePhase = function () {
    var _a, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = effects_1.all;
                return [4 /*yield*/, effects_1.takeEvery(isGamePhaseUpdate(models_1.GamePhase.PREPARING), function (action) {
                        var payload;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    payload = action.payload.payload;
                                    return [4 /*yield*/, effects_1.put(boardActions_1.initialiseBoard(payload.pieces.board.pieces))];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(benchActions_1.initialiseBench(payload.pieces.bench))];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(cardShop_1.cardsUpdated(payload.cards))];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(boardActions_1.unlockBoard())];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(uiActions_1.openOverlay(overlay_1.Overlay.SHOP))];
                                case 5:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    })];
            case 1:
                _b = [
                    _c.sent()
                ];
                return [4 /*yield*/, effects_1.takeEvery(isGamePhaseUpdate(models_1.GamePhase.READY), function (action) {
                        var payload, state, selectedPiece;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    payload = action.payload.payload;
                                    return [4 /*yield*/, effects_1.put(boardActions_1.initialiseBoard(payload.board.pieces))];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(benchActions_1.initialiseBench(payload.bench))];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(boardActions_1.lockBoard())];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(uiActions_1.closeOverlay())];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.select()];
                                case 5:
                                    state = _a.sent();
                                    selectedPiece = pieceSelectors_1.getPiece(state, state.game.selectedPieceId);
                                    if (!(selectedPiece && selectedPiece.position.y !== null)) return [3 /*break*/, 7];
                                    return [4 /*yield*/, effects_1.put(gameActions_1.clearSelectedPiece())];
                                case 6:
                                    _a.sent();
                                    _a.label = 7;
                                case 7: return [2 /*return*/];
                            }
                        });
                    })];
            case 2:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.takeEvery(isGamePhaseUpdate(models_1.GamePhase.PLAYING), function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.put(battleSaga_1.startBattle())];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    })];
            case 3: return [4 /*yield*/, _a.apply(void 0, [_b.concat([
                        _c.sent()
                    ])])];
            case 4:
                _c.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/app/store/sagas/actions/phaseTimer.ts":
/*!***************************************************!*\
  !*** ./src/app/store/sagas/actions/phaseTimer.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var gameActions_1 = __webpack_require__(/*! ../../actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var gameInfo_1 = __webpack_require__(/*! @common/player/gameInfo */ "./src/shared/player/gameInfo/index.ts");
exports.phaseTimer = function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(gameInfo_1.GAME_PHASE_UPDATE, function (action) {
                    var nowMs, seconds;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                nowMs = action ? action.payload.startedAt : Date.now();
                                seconds = Math.floor(nowMs / 1000);
                                return [4 /*yield*/, effects_1.put(gameActions_1.phaseStartSeconds(seconds))];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/app/store/sagas/actions/preventAccidentalClose.ts":
/*!***************************************************************!*\
  !*** ./src/app/store/sagas/actions/preventAccidentalClose.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var localPlayerActionTypes_1 = __webpack_require__(/*! ../../actiontypes/localPlayerActionTypes */ "./src/app/store/actiontypes/localPlayerActionTypes.ts");
exports.preventAccidentalClose = function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.take(localPlayerActionTypes_1.JOIN_COMPLETE)];
            case 1:
                _a.sent();
                // display an "Are you sure you want to leave this page?" dialog
                window.onbeforeunload = function () { return "Are you sure you want to leave this page? There is currently no way to rejoin a game"; };
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/app/store/sagas/actions/sellPiece.ts":
/*!**************************************************!*\
  !*** ./src/app/store/sagas/actions/sellPiece.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! @common/player/actions */ "./src/shared/player/actions.ts");
var pieceSelectors_1 = __webpack_require__(/*! @common/player/pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var benchActions_1 = __webpack_require__(/*! @common/player/bench/benchActions */ "./src/shared/player/bench/benchActions.ts");
var boardActions_1 = __webpack_require__(/*! @common/board/actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
exports.sellPiece = function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(actions_1.PLAYER_SELL_PIECE, function (_a) {
                    var state, piece;
                    var pieceId = _a.payload.pieceId;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, effects_1.select()];
                            case 1:
                                state = _b.sent();
                                piece = pieceSelectors_1.getPiece(state, pieceId);
                                if (!piece) {
                                    return [2 /*return*/];
                                }
                                if (!(piece.position.y === null)) return [3 /*break*/, 3];
                                return [4 /*yield*/, effects_1.put(benchActions_1.removeBenchPiece(pieceId))];
                            case 2:
                                _b.sent();
                                return [3 /*break*/, 5];
                            case 3: return [4 /*yield*/, effects_1.put(boardActions_1.removeBoardPiece(pieceId))];
                            case 4:
                                _b.sent();
                                _b.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/app/store/sagas/index.ts":
/*!**************************************!*\
  !*** ./src/app/store/sagas/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var phaseTimer_1 = __webpack_require__(/*! ./actions/phaseTimer */ "./src/app/store/sagas/actions/phaseTimer.ts");
var gamePhase_1 = __webpack_require__(/*! ./actions/gamePhase */ "./src/app/store/sagas/actions/gamePhase.ts");
var preventAccidentalClose_1 = __webpack_require__(/*! ./actions/preventAccidentalClose */ "./src/app/store/sagas/actions/preventAccidentalClose.ts");
var battleSaga_1 = __webpack_require__(/*! @common/match/combat/battleSaga */ "./src/shared/match/combat/battleSaga.ts");
var turnSimulator_1 = __webpack_require__(/*! @common/match/combat/turnSimulator */ "./src/shared/match/combat/turnSimulator.ts");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var announcement_1 = __webpack_require__(/*! ./actions/announcement */ "./src/app/store/sagas/actions/announcement.ts");
var localPlayerActionTypes_1 = __webpack_require__(/*! ../actiontypes/localPlayerActionTypes */ "./src/app/store/actiontypes/localPlayerActionTypes.ts");
var saga_1 = __webpack_require__(/*! ../../networking/saga */ "./src/app/networking/saga.ts");
var evolution_1 = __webpack_require__(/*! @common/player/sagas/evolution */ "./src/shared/player/sagas/evolution.ts");
var sellPiece_1 = __webpack_require__(/*! ./actions/sellPiece */ "./src/app/store/sagas/actions/sellPiece.ts");
var auth_1 = __webpack_require__(/*! ./actions/auth */ "./src/app/store/sagas/actions/auth.ts");
var saga_2 = __webpack_require__(/*! @common/player/cardShop/saga */ "./src/shared/player/cardShop/saga.ts");
var dropPiece_1 = __webpack_require__(/*! @common/player/sagas/dropPiece */ "./src/shared/player/sagas/dropPiece.ts");
var closeShopOnFirstBuy_1 = __webpack_require__(/*! @app/features/cardShop/closeShopOnFirstBuy */ "./src/app/features/cardShop/closeShopOnFirstBuy.ts");
var gameSagaFactory = function (playerId) {
    return function () {
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = effects_1.all;
                    return [4 /*yield*/, effects_1.fork(phaseTimer_1.phaseTimer)];
                case 1:
                    _b = [
                        _c.sent()
                    ];
                    return [4 /*yield*/, effects_1.fork(announcement_1.announcement)];
                case 2:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(gamePhase_1.gamePhase)];
                case 3:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(sellPiece_1.sellPiece)];
                case 4:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(closeShopOnFirstBuy_1.closeShopOnFirstBuy)];
                case 5:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(dropPiece_1.dropPieceSagaFactory(playerId))];
                case 6:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(evolution_1.evolutionSagaFactory())];
                case 7:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(saga_2.cardShopSagaFactory(playerId))];
                case 8:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(battleSaga_1.battle, new turnSimulator_1.TurnSimulator(), constants_1.DEFAULT_TURN_COUNT, constants_1.DEFAULT_TURN_DURATION)];
                case 9: return [4 /*yield*/, _a.apply(void 0, [_b.concat([
                            _c.sent()
                        ])])];
                case 10:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    };
};
exports.rootSaga = function () {
    var _a, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = effects_1.all;
                return [4 /*yield*/, effects_1.fork(preventAccidentalClose_1.preventAccidentalClose)];
            case 1:
                _b = [
                    _c.sent()
                ];
                return [4 /*yield*/, effects_1.fork(auth_1.auth)];
            case 2:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(saga_1.networking)];
            case 3:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.takeEvery(localPlayerActionTypes_1.JOIN_COMPLETE, function (_a) {
                        var playerId = _a.payload.playerId;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, effects_1.fork(gameSagaFactory(playerId))];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    })];
            case 4: return [4 /*yield*/, _a.apply(void 0, [_b.concat([
                        _c.sent()
                    ])])];
            case 5:
                _c.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/app/store/store.ts":
/*!********************************!*\
  !*** ./src/app/store/store.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var redux_1 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
var reducers_1 = __webpack_require__(/*! ./reducers */ "./src/app/store/reducers/index.ts");
var redux_devtools_extension_1 = __webpack_require__(/*! redux-devtools-extension */ "./node_modules/redux-devtools-extension/index.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var sagas_1 = __webpack_require__(/*! ./sagas */ "./src/app/store/sagas/index.ts");
var sagaMiddleware = redux_saga_1["default"]();
var store = redux_1.createStore(redux_1.combineReducers(tslib_1.__assign({}, reducers_1.reducers)), redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(sagaMiddleware)));
exports.store = store;
sagaMiddleware.run(sagas_1.rootSaga);


/***/ }),

/***/ "./src/app/use-window-size.ts":
/*!************************************!*\
  !*** ./src/app/use-window-size.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
exports.useWindowSize = function () {
    var _a = tslib_1.__read(react_1.useState(window.innerWidth), 2), width = _a[0], setWidth = _a[1];
    var _b = tslib_1.__read(react_1.useState(window.innerHeight), 2), height = _b[0], setHeight = _b[1];
    react_1.useEffect(function () {
        var handleResize = function () {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener("resize", handleResize);
        return function () {
            window.removeEventListener("resize", handleResize);
        };
    });
    return { width: width, height: height };
};


/***/ }),

/***/ "./src/shared/board/actions/boardActionTypes.ts":
/*!******************************************************!*\
  !*** ./src/shared/board/actions/boardActionTypes.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.REMOVE_BOARD_PIECE = "REMOVE_BOARD_PIECE";
exports.REMOVE_BOARD_PIECES = "REMOVE_BOARD_PIECES";
exports.ADD_BOARD_PIECE = "ADD_BOARD_PIECE";
exports.INITIALISE_BOARD = "INITIALISE_BOARD";
exports.UPDATE_BOARD_PIECE = "UPDATE_BOARD_PIECE";
exports.UPDATE_BOARD_PIECES = "UPDATE_BOARD_PIECES";
exports.MOVE_BOARD_PIECE = "MOVE_BOARD_PIECE";
exports.LOCK_BOARD = "LOCK_BOARD";
exports.UNLOCK_BOARD = "UNLOCK_BOARD";


/***/ }),

/***/ "./src/shared/board/actions/boardActions.ts":
/*!**************************************************!*\
  !*** ./src/shared/board/actions/boardActions.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var boardActionTypes_1 = __webpack_require__(/*! ./boardActionTypes */ "./src/shared/board/actions/boardActionTypes.ts");
exports.initialiseBoard = function (pieces) { return ({
    type: boardActionTypes_1.INITIALISE_BOARD,
    payload: {
        pieces: pieces
    }
}); };
exports.addBoardPiece = function (piece, x, y) { return ({
    type: boardActionTypes_1.ADD_BOARD_PIECE,
    payload: {
        piece: piece,
        x: x,
        y: y
    }
}); };
exports.removeBoardPiece = function (pieceId) { return ({
    type: boardActionTypes_1.REMOVE_BOARD_PIECE,
    payload: {
        pieceId: pieceId
    }
}); };
exports.removeBoardPieces = function (pieceIds) { return ({
    type: boardActionTypes_1.REMOVE_BOARD_PIECES,
    payload: {
        pieceIds: pieceIds
    }
}); };
exports.updateBoardPiece = function (piece) { return ({
    type: boardActionTypes_1.UPDATE_BOARD_PIECE,
    payload: {
        piece: piece
    }
}); };
exports.updateBoardPieces = function (pieces) { return ({
    type: boardActionTypes_1.UPDATE_BOARD_PIECES,
    payload: {
        pieces: pieces
    }
}); };
exports.moveBoardPiece = function (pieceId, from, to) { return ({
    type: boardActionTypes_1.MOVE_BOARD_PIECE,
    payload: {
        pieceId: pieceId,
        from: from,
        to: to
    }
}); };
exports.lockBoard = function () { return ({ type: boardActionTypes_1.LOCK_BOARD }); };
exports.unlockBoard = function () { return ({ type: boardActionTypes_1.UNLOCK_BOARD }); };


/***/ }),

/***/ "./src/shared/board/can-drop-piece.ts":
/*!********************************************!*\
  !*** ./src/shared/board/can-drop-piece.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var inBench = function (targetY) { return targetY === null; };
var inFriendlyBoard = function (targetY) { return targetY !== null && targetY > (constants_1.GRID_SIZE.height / 2) - 1; };
exports.canDropPiece = function (piece, targetX, targetY, tileEmpty, boardLocked, belowPieceLimit) {
    var targetIsBench = inBench(targetY);
    var benchToBenchMove = targetIsBench && inBench(piece.position.y);
    var targetIsFriendlyBoard = inFriendlyBoard(targetY);
    var boardToBoardMove = targetIsFriendlyBoard && inFriendlyBoard(piece.position.y);
    var belowPieceLimitOrBoardToBoard = (targetIsBench || belowPieceLimit || boardToBoardMove);
    return (tileEmpty
        && (benchToBenchMove || boardLocked === false)
        && belowPieceLimitOrBoardToBoard
        && (targetIsBench || targetIsFriendlyBoard));
};


/***/ }),

/***/ "./src/shared/board/get-first-empty-bench-slot.ts":
/*!********************************************************!*\
  !*** ./src/shared/board/get-first-empty-bench-slot.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getFirstEmptyBenchSlot = function (bench) {
    return bench.findIndex(function (p) { return p === null; });
};


/***/ }),

/***/ "./src/shared/board/index.ts":
/*!***********************************!*\
  !*** ./src/shared/board/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var can_drop_piece_1 = __webpack_require__(/*! ./can-drop-piece */ "./src/shared/board/can-drop-piece.ts");
exports.canDropPiece = can_drop_piece_1.canDropPiece;
var get_first_empty_bench_slot_1 = __webpack_require__(/*! ./get-first-empty-bench-slot */ "./src/shared/board/get-first-empty-bench-slot.ts");
exports.getFirstEmptyBenchSlot = get_first_empty_bench_slot_1.getFirstEmptyBenchSlot;
var BoardActions = __webpack_require__(/*! ./actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
exports.BoardActions = BoardActions;
var BoardActionTypes = __webpack_require__(/*! ./actions/boardActionTypes */ "./src/shared/board/actions/boardActionTypes.ts");
exports.BoardActionTypes = BoardActionTypes;
var state_1 = __webpack_require__(/*! ./state */ "./src/shared/board/state.ts");
exports.boardReducer = state_1.reducer;


/***/ }),

/***/ "./src/shared/board/reducers/lockedReducer.ts":
/*!****************************************************!*\
  !*** ./src/shared/board/reducers/lockedReducer.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var boardActionTypes_1 = __webpack_require__(/*! ../actions/boardActionTypes */ "./src/shared/board/actions/boardActionTypes.ts");
var initialState = false;
var locked = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case boardActionTypes_1.LOCK_BOARD:
            return true;
        case boardActionTypes_1.UNLOCK_BOARD:
            return false;
        default:
            return state;
    }
};
exports.locked = locked;


/***/ }),

/***/ "./src/shared/board/reducers/piecePositionsReducer.ts":
/*!************************************************************!*\
  !*** ./src/shared/board/reducers/piecePositionsReducer.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var boardActionTypes_1 = __webpack_require__(/*! ../actions/boardActionTypes */ "./src/shared/board/actions/boardActionTypes.ts");
var initialState = {};
var removePieceByIdList = function (state, ids) {
    return Object.entries(state).reduce(function (acc, _a) {
        var _b = tslib_1.__read(_a, 2), position = _b[0], pieceId = _b[1];
        // skip the desired piece
        if (ids.includes(pieceId)) {
            return acc;
        }
        acc[position] = pieceId;
        return acc;
    }, {});
};
var removePieceById = function (state, targetPieceId) { return removePieceByIdList(state, [targetPieceId]); };
var piecePositions = function (state, action) {
    var e_1, _a, _b, _c, _d;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case boardActionTypes_1.INITIALISE_BOARD:
            return Object.entries(action.payload.pieces)
                .reduce(function (acc, _a) {
                var _b = tslib_1.__read(_a, 2), pieceId = _b[0], piece = _b[1];
                acc[piece.position.x + "," + piece.position.y] = pieceId;
                return acc;
            }, {});
        case boardActionTypes_1.UPDATE_BOARD_PIECES: {
            var pieces = action.payload.pieces;
            var newState = removePieceByIdList(state, pieces.map(function (p) { return p.id; }));
            try {
                for (var pieces_1 = tslib_1.__values(pieces), pieces_1_1 = pieces_1.next(); !pieces_1_1.done; pieces_1_1 = pieces_1.next()) {
                    var piece = pieces_1_1.value;
                    newState[piece.position.x + "," + piece.position.y] = piece.id;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (pieces_1_1 && !pieces_1_1.done && (_a = pieces_1["return"])) _a.call(pieces_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return newState;
        }
        case boardActionTypes_1.UPDATE_BOARD_PIECE: {
            var piece = action.payload.piece;
            var filtered = removePieceById(state, piece.id);
            return tslib_1.__assign(tslib_1.__assign({}, filtered), (_b = {}, _b[piece.position.x + "," + piece.position.y] = piece.id, _b));
        }
        case boardActionTypes_1.REMOVE_BOARD_PIECE:
            return removePieceById(state, action.payload.pieceId);
        case boardActionTypes_1.REMOVE_BOARD_PIECES:
            return removePieceByIdList(state, action.payload.pieceIds);
        case boardActionTypes_1.ADD_BOARD_PIECE: {
            var _e = action.payload, x = _e.x, y = _e.y, piece = _e.piece;
            return tslib_1.__assign(tslib_1.__assign({}, state), (_c = {}, _c[x + "," + y] = piece.id, _c));
        }
        case boardActionTypes_1.MOVE_BOARD_PIECE: {
            var _f = action.payload, pieceId = _f.pieceId, from = _f.from, to = _f.to;
            var fromString = from.x + "," + from.y;
            var toString_1 = to.x + "," + to.y;
            // safety check
            if (state[fromString] !== pieceId) {
                return state;
            }
            return tslib_1.__assign(tslib_1.__assign({}, state), (_d = {}, _d[fromString] = null, _d[toString_1] = pieceId, _d));
        }
        default:
            return state;
    }
};
exports.piecePositions = piecePositions;


/***/ }),

/***/ "./src/shared/board/reducers/piecesReducer.ts":
/*!****************************************************!*\
  !*** ./src/shared/board/reducers/piecesReducer.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var boardActionTypes_1 = __webpack_require__(/*! ../actions/boardActionTypes */ "./src/shared/board/actions/boardActionTypes.ts");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var initialState = {};
var removePieceByIdList = function (state, pieceIds) {
    var e_1, _a;
    var newState = tslib_1.__assign({}, state);
    try {
        for (var pieceIds_1 = tslib_1.__values(pieceIds), pieceIds_1_1 = pieceIds_1.next(); !pieceIds_1_1.done; pieceIds_1_1 = pieceIds_1.next()) {
            var pieceId = pieceIds_1_1.value;
            if (newState[pieceId]) {
                delete newState[pieceId];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (pieceIds_1_1 && !pieceIds_1_1.done && (_a = pieceIds_1["return"])) _a.call(pieceIds_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return newState;
};
var pieces = function (state, action) {
    var _a, e_2, _b, _c, _d;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case boardActionTypes_1.INITIALISE_BOARD: {
            return tslib_1.__assign({}, action.payload.pieces);
        }
        case boardActionTypes_1.UPDATE_BOARD_PIECE: {
            var piece = action.payload.piece;
            return tslib_1.__assign(tslib_1.__assign({}, state), (_a = {}, _a[piece.id] = piece, _a));
        }
        case boardActionTypes_1.UPDATE_BOARD_PIECES: {
            var newState = tslib_1.__assign({}, state);
            try {
                for (var _e = tslib_1.__values(action.payload.pieces), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var piece = _f.value;
                    newState[piece.id] = piece;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return newState;
        }
        case boardActionTypes_1.REMOVE_BOARD_PIECE:
            return removePieceByIdList(state, [action.payload.pieceId]);
        case boardActionTypes_1.REMOVE_BOARD_PIECES:
            return removePieceByIdList(state, action.payload.pieceIds);
        case boardActionTypes_1.ADD_BOARD_PIECE: {
            var _g = action.payload, piece = _g.piece, x = _g.x, y = _g.y;
            return tslib_1.__assign(tslib_1.__assign({}, state), (_c = {}, _c[piece.id] = tslib_1.__assign(tslib_1.__assign({}, piece), { position: position_1.createTileCoordinates(x, y), facingAway: true }), _c));
        }
        case boardActionTypes_1.MOVE_BOARD_PIECE: {
            var _h = action.payload, pieceId = _h.pieceId, from = _h.from, to = _h.to;
            var piece = state[pieceId];
            // safety catch
            if (!piece || !piece.position || piece.id !== pieceId || piece.position.x !== from.x || piece.position.y !== from.y) {
                return state;
            }
            return tslib_1.__assign(tslib_1.__assign({}, state), (_d = {}, _d[piece.id] = tslib_1.__assign(tslib_1.__assign({}, piece), { position: {
                    x: to.x,
                    y: to.y
                } }), _d));
        }
        default:
            return state;
    }
};
exports.pieces = pieces;


/***/ }),

/***/ "./src/shared/board/state.ts":
/*!***********************************!*\
  !*** ./src/shared/board/state.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var redux_1 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
var piecesReducer_1 = __webpack_require__(/*! ./reducers/piecesReducer */ "./src/shared/board/reducers/piecesReducer.ts");
var piecePositionsReducer_1 = __webpack_require__(/*! ./reducers/piecePositionsReducer */ "./src/shared/board/reducers/piecePositionsReducer.ts");
var lockedReducer_1 = __webpack_require__(/*! ./reducers/lockedReducer */ "./src/shared/board/reducers/lockedReducer.ts");
var reducer = redux_1.combineReducers({
    pieces: piecesReducer_1.pieces,
    piecePositions: piecePositionsReducer_1.piecePositions,
    locked: lockedReducer_1.locked
});
exports.reducer = reducer;


/***/ }),

/***/ "./src/shared/game/definitionProvider.ts":
/*!***********************************************!*\
  !*** ./src/shared/game/definitionProvider.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var definitions_1 = __webpack_require__(/*! ./definitions/definitions */ "./src/shared/game/definitions/definitions.ts");
var DefinitionProvider = /** @class */ (function () {
    function DefinitionProvider() {
        var _this = this;
        this.definitions = new Map();
        definitions_1.definitions.forEach(function (d) {
            _this.definitions.set(d.id, d);
        });
    }
    DefinitionProvider.prototype.get = function (id) {
        return this.definitions.get(id);
    };
    DefinitionProvider.prototype.getAll = function () {
        return Array.from(this.definitions.values());
    };
    return DefinitionProvider;
}());
exports.DefinitionProvider = DefinitionProvider;


/***/ }),

/***/ "./src/shared/game/definitions/definitionClass.ts":
/*!********************************************************!*\
  !*** ./src/shared/game/definitions/definitionClass.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
exports.__esModule = true;
var creatureDefinition_1 = __webpack_require__(/*! @common/models/creatureDefinition */ "./src/shared/models/creatureDefinition.ts");
var DefinitionClass;
(function (DefinitionClass) {
    DefinitionClass["VALIANT"] = "Valiant";
    DefinitionClass["ARCANE"] = "Arcane";
    DefinitionClass["CUNNING"] = "Cunning";
})(DefinitionClass = exports.DefinitionClass || (exports.DefinitionClass = {}));
// each class has points to assign
// these are then used, along with piece cost and stage, to get stats
// the decimals here indicate how the points are assigned for each class
exports.classBuilds = (_a = {},
    _a[DefinitionClass.VALIANT] = {
        hp: 0.4,
        attack: 0.2,
        defense: 0.3,
        speed: 0.2
    },
    _a[DefinitionClass.ARCANE] = {
        hp: 0.2,
        attack: 0.4,
        defense: 0.2,
        speed: 0.3
    },
    _a[DefinitionClass.CUNNING] = {
        hp: 0.1,
        attack: 0.4,
        defense: 0.1,
        speed: 0.45
    },
    _a);
var getBaseStats = function () {
    return {
        hp: 10,
        attack: 10,
        defense: 10,
        speed: 10
    };
};
var getPoints = function (cost, stage) {
    var COST_MODIFIER = 1.5;
    if (stage === 0) {
        return (cost * COST_MODIFIER) * 20;
    }
    if (stage === 1) {
        return (cost * COST_MODIFIER) * 80;
    }
    if (stage === 2) {
        return (cost * COST_MODIFIER) * 210;
    }
};
var getStat = function (baseStat, buildStat, availablePoints) {
    return baseStat + Math.ceil(buildStat * availablePoints);
};
var getStats = function (definitionClass, cost, stage) {
    var baseStats = getBaseStats();
    var availablePoints = getPoints(cost, stage);
    var build = exports.classBuilds[definitionClass];
    var attackType = (definitionClass === DefinitionClass.ARCANE
        ? creatureDefinition_1.attackTypes.shoot
        : creatureDefinition_1.attackTypes.basic);
    return {
        hp: getStat(baseStats.hp, build.hp, availablePoints),
        attack: getStat(baseStats.attack, build.attack, availablePoints),
        defense: getStat(baseStats.defense, build.defense, availablePoints),
        speed: getStat(baseStats.speed, build.speed, availablePoints),
        attackType: attackType
    };
};
exports.getStages = function (definitionClass, cost) {
    return [
        getStats(definitionClass, cost, 0),
        getStats(definitionClass, cost, 1),
        getStats(definitionClass, cost, 2)
    ];
};


/***/ }),

/***/ "./src/shared/game/definitions/definitions.ts":
/*!****************************************************!*\
  !*** ./src/shared/game/definitions/definitions.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var creatureType_1 = __webpack_require__(/*! ../../models/creatureType */ "./src/shared/models/creatureType.ts");
var definitionClass_1 = __webpack_require__(/*! ./definitionClass */ "./src/shared/game/definitions/definitionClass.ts");
var createDefinition = function (id, name, type, definitionClass, cost) { return ({
    id: id,
    name: name,
    type: type,
    "class": definitionClass,
    cost: cost,
    stages: definitionClass_1.getStages(definitionClass, cost)
}); };
exports.definitions = [
    createDefinition(1, "Budaye", creatureType_1.CreatureType.Wood, definitionClass_1.DefinitionClass.VALIANT, 1),
    createDefinition(2, "Anoleaf", creatureType_1.CreatureType.Wood, definitionClass_1.DefinitionClass.CUNNING, 1),
    createDefinition(3, "Rockitten", creatureType_1.CreatureType.Earth, definitionClass_1.DefinitionClass.VALIANT, 1),
    createDefinition(4, "Aardorn", creatureType_1.CreatureType.Earth, definitionClass_1.DefinitionClass.CUNNING, 1),
    createDefinition(5, "Nut", creatureType_1.CreatureType.Metal, definitionClass_1.DefinitionClass.VALIANT, 1),
    createDefinition(6, "Puparmor", creatureType_1.CreatureType.Metal, definitionClass_1.DefinitionClass.VALIANT, 1),
    createDefinition(7, "Embra", creatureType_1.CreatureType.Fire, definitionClass_1.DefinitionClass.ARCANE, 1),
    createDefinition(8, "Tweesher", creatureType_1.CreatureType.Water, definitionClass_1.DefinitionClass.ARCANE, 1),
    createDefinition(9, "Bamboon", creatureType_1.CreatureType.Wood, definitionClass_1.DefinitionClass.VALIANT, 2),
    createDefinition(10, "Chenipode", creatureType_1.CreatureType.Earth, definitionClass_1.DefinitionClass.CUNNING, 2),
    createDefinition(11, "Bolt", creatureType_1.CreatureType.Metal, definitionClass_1.DefinitionClass.VALIANT, 2),
    createDefinition(12, "Weavifly", creatureType_1.CreatureType.Metal, definitionClass_1.DefinitionClass.ARCANE, 2),
    createDefinition(13, "Cardiling", creatureType_1.CreatureType.Fire, definitionClass_1.DefinitionClass.CUNNING, 2),
    createDefinition(14, "Agnite", creatureType_1.CreatureType.Fire, definitionClass_1.DefinitionClass.VALIANT, 2),
    createDefinition(15, "Elowind", creatureType_1.CreatureType.Water, definitionClass_1.DefinitionClass.ARCANE, 2),
    createDefinition(16, "Fluttaflap", creatureType_1.CreatureType.Water, definitionClass_1.DefinitionClass.VALIANT, 2),
    createDefinition(17, "Velocitile", creatureType_1.CreatureType.Wood, definitionClass_1.DefinitionClass.CUNNING, 3),
    createDefinition(18, "Sapsnap", creatureType_1.CreatureType.Wood, definitionClass_1.DefinitionClass.VALIANT, 3),
    createDefinition(19, "Rockat", creatureType_1.CreatureType.Earth, definitionClass_1.DefinitionClass.CUNNING, 3),
    createDefinition(20, "Grintot", creatureType_1.CreatureType.Earth, definitionClass_1.DefinitionClass.VALIANT, 3),
    createDefinition(21, "Propellorcat", creatureType_1.CreatureType.Metal, definitionClass_1.DefinitionClass.CUNNING, 3),
    createDefinition(22, "Sumchon", creatureType_1.CreatureType.Metal, definitionClass_1.DefinitionClass.VALIANT, 3),
    createDefinition(23, "Ignibus", creatureType_1.CreatureType.Fire, definitionClass_1.DefinitionClass.VALIANT, 3),
    createDefinition(24, "Ruption", creatureType_1.CreatureType.Fire, definitionClass_1.DefinitionClass.ARCANE, 3),
    createDefinition(25, "Noctalo", creatureType_1.CreatureType.Water, definitionClass_1.DefinitionClass.CUNNING, 3),
    createDefinition(26, "Lightmare", creatureType_1.CreatureType.Water, definitionClass_1.DefinitionClass.VALIANT, 3),
    createDefinition(27, "Narcileaf", creatureType_1.CreatureType.Wood, definitionClass_1.DefinitionClass.ARCANE, 4),
    createDefinition(28, "Coleorus", creatureType_1.CreatureType.Wood, definitionClass_1.DefinitionClass.CUNNING, 4),
    createDefinition(29, "Aardart", creatureType_1.CreatureType.Earth, definitionClass_1.DefinitionClass.CUNNING, 4),
    createDefinition(30, "Hubursa", creatureType_1.CreatureType.Earth, definitionClass_1.DefinitionClass.ARCANE, 4),
    createDefinition(31, "Sampsack", creatureType_1.CreatureType.Metal, definitionClass_1.DefinitionClass.VALIANT, 4),
    createDefinition(32, "Cairfrey", creatureType_1.CreatureType.Metal, definitionClass_1.DefinitionClass.ARCANE, 4),
    createDefinition(33, "Prophetoise", creatureType_1.CreatureType.Fire, definitionClass_1.DefinitionClass.ARCANE, 4),
    createDefinition(34, "Tikorch", creatureType_1.CreatureType.Fire, definitionClass_1.DefinitionClass.CUNNING, 4),
    createDefinition(35, "Nudimind", creatureType_1.CreatureType.Water, definitionClass_1.DefinitionClass.ARCANE, 4),
    createDefinition(36, "Dollfin", creatureType_1.CreatureType.Water, definitionClass_1.DefinitionClass.VALIANT, 4),
    createDefinition(37, "Arbelder", creatureType_1.CreatureType.Wood, definitionClass_1.DefinitionClass.VALIANT, 5),
    createDefinition(38, "Viviphyta", creatureType_1.CreatureType.Wood, definitionClass_1.DefinitionClass.CUNNING, 5),
    createDefinition(39, "Grintrock", creatureType_1.CreatureType.Earth, definitionClass_1.DefinitionClass.VALIANT, 5),
    createDefinition(40, "Jemuar", creatureType_1.CreatureType.Earth, definitionClass_1.DefinitionClass.CUNNING, 5),
    createDefinition(41, "Pyraminx", creatureType_1.CreatureType.Metal, definitionClass_1.DefinitionClass.VALIANT, 5),
    createDefinition(42, "AV8R", creatureType_1.CreatureType.Metal, definitionClass_1.DefinitionClass.CUNNING, 5),
    createDefinition(43, "Agnigon", creatureType_1.CreatureType.Fire, definitionClass_1.DefinitionClass.VALIANT, 5),
    createDefinition(44, "Cardinale", creatureType_1.CreatureType.Fire, definitionClass_1.DefinitionClass.CUNNING, 5),
    createDefinition(45, "Nudikill", creatureType_1.CreatureType.Water, definitionClass_1.DefinitionClass.VALIANT, 5),
    createDefinition(46, "Eaglace", creatureType_1.CreatureType.Water, definitionClass_1.DefinitionClass.CUNNING, 5)
];


/***/ }),

/***/ "./src/shared/log.ts":
/*!***************************!*\
  !*** ./src/shared/log.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
// tslint:disable:no-console
exports.log = function (message) { return console.log(message); };


/***/ }),

/***/ "./src/shared/match/combat/battleEventChannel.ts":
/*!*******************************************************!*\
  !*** ./src/shared/match/combat/battleEventChannel.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var present = __webpack_require__(/*! present */ "./node_modules/present/lib/present-browser.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var utils_1 = __webpack_require__(/*! @common/utils */ "./src/shared/utils/index.ts");
var boardActions_1 = __webpack_require__(/*! @common/board/actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
exports.BATTLE_TURN = "BATTLE_TURN";
exports.BATTLE_FINISHED = "BATTLE_FINISHED";
var finishAction = function (turns) { return ({ type: exports.BATTLE_FINISHED, payload: { turns: turns } }); };
var duration = function (ms) {
    var startTime = present();
    return {
        remaining: function () {
            return new Promise(function (resolve) {
                var endTime = present();
                var timePassed = endTime - startTime;
                var remaining = Math.max(ms - timePassed, 0);
                if (remaining === 0) {
                    resolve();
                    return;
                }
                setTimeout(function () { return resolve(); }, remaining);
            });
        }
    };
};
var addBattleBrains = function (pieces) {
    return Object.entries(pieces)
        .reduce(function (acc, _a) {
        var _b = tslib_1.__read(_a, 2), pieceId = _b[0], piece = _b[1];
        acc[pieceId] = tslib_1.__assign(tslib_1.__assign({}, piece), { battleBrain: {
                canMoveAtTurn: null,
                canBeAttackedAtTurn: 0,
                canAttackAtTurn: null,
                removeFromBoardAtTurn: null
            } });
        return acc;
    }, {});
};
exports.battleEventChannel = function (turnSimulator, turnDuration, startingBoardState, maxTurns, bufferSize) {
    return redux_saga_1.eventChannel(function (emit) {
        var cancelled = false;
        var board = {
            pieces: addBattleBrains(startingBoardState.pieces),
            piecePositions: tslib_1.__assign({}, startingBoardState.piecePositions),
            locked: startingBoardState.locked
        };
        var run = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var turnCount, shouldStop, turnTimer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        turnCount = 0;
                        _a.label = 1;
                    case 1:
                        if (false) {}
                        shouldStop = (cancelled
                            || turnCount >= maxTurns
                            || utils_1.isATeamDefeated(board));
                        if (shouldStop) {
                            emit(finishAction(turnCount));
                            return [3 /*break*/, 3];
                        }
                        turnTimer = duration(turnDuration);
                        board = turnSimulator.simulateTurn(++turnCount, board);
                        emit(boardActions_1.initialiseBoard(board.pieces));
                        return [4 /*yield*/, turnTimer.remaining()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        run();
        return function () {
            cancelled = true;
        };
    }, redux_saga_1.buffers.expanding(bufferSize));
};


/***/ }),

/***/ "./src/shared/match/combat/battleSaga.ts":
/*!***********************************************!*\
  !*** ./src/shared/match/combat/battleSaga.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var battleEventChannel_1 = __webpack_require__(/*! ./battleEventChannel */ "./src/shared/match/combat/battleEventChannel.ts");
var START_BATTLE = "START_BATTLE";
exports.startBattle = function () { return ({ type: START_BATTLE }); };
exports.battle = function (turnSimulator, turnCount, turnDuration) {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(START_BATTLE, function () {
                    var board, battleChannel;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, effects_1.select(function (state) { return state.board; })];
                            case 1:
                                board = _a.sent();
                                return [4 /*yield*/, effects_1.call(battleEventChannel_1.battleEventChannel, turnSimulator, turnDuration, board, turnCount, 100)];
                            case 2:
                                battleChannel = _a.sent();
                                return [4 /*yield*/, effects_1.takeEvery(battleChannel, function (battleAction) {
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, effects_1.put(battleAction)];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    })];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/shared/match/combat/movement.ts":
/*!*********************************************!*\
  !*** ./src/shared/match/combat/movement.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var pathfinding_1 = __webpack_require__(/*! ./pathfinding */ "./src/shared/match/combat/pathfinding.ts");
var lodash_1 = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var pieceSelectors_1 = __webpack_require__(/*! @common/player/pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var applyVector = function (position, vector) {
    var newX = position.x + vector.x;
    var newY = position.y + vector.y;
    var maxX = constants_1.GRID_SIZE.width - 1;
    var maxY = constants_1.GRID_SIZE.height - 1;
    if (newX < 0 || newY < 0 || newX > maxX || newY > maxY) {
        return null;
    }
    return { x: newX, y: newY };
};
var getAttackingTiles = function (facingUp, attackType) {
    var attackDirections = facingUp
        ? [position_1.Directions.UP, position_1.Directions.RIGHT, position_1.Directions.LEFT, position_1.Directions.DOWN]
        : [position_1.Directions.DOWN, position_1.Directions.LEFT, position_1.Directions.RIGHT, position_1.Directions.UP];
    return lodash_1.flatten(lodash_1.range(1, attackType.range + 1).map(function (r) { return attackDirections.map(function (d) { return ({ x: d.x * r, y: d.y * r }); }); }));
};
var getLivingEnemies = function (piece, board) {
    var e_1, _a;
    var output = [];
    try {
        for (var _b = tslib_1.__values(Object.entries(board.pieces)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = tslib_1.__read(_c.value, 2), id = _d[0], other = _d[1];
            if (other.ownerId !== piece.ownerId && other.currentHealth > 0) {
                output.push(other);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return output;
};
var getDelta = function (a, b) {
    return {
        x: Math.abs(a.position.x - b.position.x),
        y: Math.abs(a.position.y - b.position.y)
    };
};
var canAttack = function (a, b, attackType) {
    var _a = getDelta(a, b), deltaX = _a.x, deltaY = _a.y;
    // Pieces cannot attack diagonally
    var result = (Math.min(deltaX, deltaY) === 0 && Math.max(deltaX, deltaY) <= attackType.range);
    return result;
};
var getTargetPiece = function (piece, board) {
    if (piece.targetPieceId === null) {
        return null;
    }
    var target = board.pieces[piece.targetPieceId];
    if (target === undefined || target.currentHealth <= 0) {
        return null;
    }
    return target;
};
exports.getAttackableEnemyFromCurrentPosition = function (piece, attackType, board) {
    var e_2, _a;
    var target = getTargetPiece(piece, board);
    if (target && canAttack(piece, target, attackType)) {
        return target;
    }
    var attackDirections = getAttackingTiles(piece.facingAway, attackType);
    try {
        for (var attackDirections_1 = tslib_1.__values(attackDirections), attackDirections_1_1 = attackDirections_1.next(); !attackDirections_1_1.done; attackDirections_1_1 = attackDirections_1.next()) {
            var direction = attackDirections_1_1.value;
            var targetPosition = applyVector(piece.position, direction);
            // targetPosition will be null if the direction is out of bounds
            if (targetPosition === null) {
                continue;
            }
            var pieceInTargetPosition = pieceSelectors_1.getBoardPieceForPosition(board, targetPosition.x, targetPosition.y);
            if (pieceInTargetPosition
                && pieceInTargetPosition.ownerId !== piece.ownerId
                && pieceInTargetPosition.currentHealth > 0) {
                return pieceInTargetPosition;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (attackDirections_1_1 && !attackDirections_1_1.done && (_a = attackDirections_1["return"])) _a.call(attackDirections_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return null;
};
var findClosestEnemy = function (piece, board) {
    var enemies = getLivingEnemies(piece, board);
    if (enemies.length === 0) {
        return null;
    }
    var enemyDeltas = enemies.map(function (enemy) { return ({
        enemy: enemy,
        delta: getDelta(piece, enemy)
    }); });
    // sort by column then by row
    enemyDeltas.sort(function (a, b) {
        if (a.delta.y < b.delta.y) {
            return -1;
        }
        if (a.delta.y > b.delta.y) {
            return 1;
        }
        if (a.delta.x < b.delta.x) {
            return -1;
        }
        if (a.delta.x > b.delta.x) {
            return 1;
        }
        if (a.enemy.definition.cost > b.enemy.definition.cost) {
            return -1;
        }
        return 1;
    });
    return enemyDeltas[0].enemy;
};
exports.getNewPiecePosition = function (piece, board) {
    var target = findClosestEnemy(piece, board);
    if (target === null) {
        return null;
    }
    return {
        nextPosition: pathfinding_1.getNextPiecePosition(piece, target, board),
        targetPosition: target.position
    };
};


/***/ }),

/***/ "./src/shared/match/combat/pathfinding.ts":
/*!************************************************!*\
  !*** ./src/shared/match/combat/pathfinding.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var javascript_astar_1 = __webpack_require__(/*! javascript-astar */ "./node_modules/javascript-astar/astar.js");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var createEmptyWeightGrid = function () {
    var grid = [];
    // todo this is a weird way round
    for (var x = 0; x < constants_1.GRID_SIZE.width; x++) {
        var column = [];
        for (var y = 0; y < constants_1.GRID_SIZE.height; y++) {
            column.push(1);
        }
        grid.push(column);
    }
    return grid;
};
var createWeightGrid = function (start, board) {
    var grid = createEmptyWeightGrid();
    Object.entries(board.piecePositions)
        .forEach(function (_a) {
        var _b = tslib_1.__read(_a, 2), position = _b[0], pieceId = _b[1];
        var _c = tslib_1.__read(position.split(","), 2), x = _c[0], y = _c[1];
        grid[x][y] = 0;
    });
    grid[start.x][start.y] = 1;
    return grid;
};
var findPath = function (board, start, end) {
    var weights = createWeightGrid(start, board);
    var graph = new javascript_astar_1.Graph(weights);
    var startGraphItem = graph.grid[start.x][start.y];
    var endGraphItem = graph.grid[end.x][end.y];
    var path = javascript_astar_1.astar.search(graph, startGraphItem, endGraphItem);
    var firstPathNode = path[0];
    if (!firstPathNode) {
        return null;
    }
    var firstStep = firstPathNode;
    return {
        stepCount: path.length,
        firstStep: firstStep
    };
};
exports.getNextPiecePosition = function (piece, target, board) {
    var targetTiles = position_1.getAdjacentPositions(target);
    var paths = targetTiles.map(function (pos) { return findPath(board, piece.position, pos); }).filter(function (path) { return path !== null; });
    if (paths.length === 0) {
        return null;
    }
    paths.sort(function (a, b) { return a.stepCount - b.stepCount; });
    return paths[0].firstStep;
};


/***/ }),

/***/ "./src/shared/match/combat/turnSimulator.ts":
/*!**************************************************!*\
  !*** ./src/shared/match/combat/turnSimulator.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var movement_1 = __webpack_require__(/*! ./movement */ "./src/shared/match/combat/movement.ts");
var position_1 = __webpack_require__(/*! ../../models/position */ "./src/shared/models/position.ts");
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var boardActions_1 = __webpack_require__(/*! @common/board/actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
var piece_utils_1 = __webpack_require__(/*! @common/utils/piece-utils */ "./src/shared/utils/piece-utils.ts");
var get_type_attack_bonus_1 = __webpack_require__(/*! @common/utils/get-type-attack-bonus */ "./src/shared/utils/get-type-attack-bonus.ts");
var DYING_DURATION = 10;
var ATTACK_TURN_DURATION = 2;
var MOVE_TURN_DURATION = 2;
// todo tune this
var getCooldownForSpeed = function (speed) { return (180 - speed) / 24; };
var STRONG_ATTACK_MODIFIER = 1.7;
var WEAK_ATTACK_MODIFIER = 0.3;
var TurnSimulator = /** @class */ (function () {
    function TurnSimulator() {
    }
    TurnSimulator.prototype.simulateTurn = function (currentTurn, board) {
        var _this = this;
        var pieceEntries = Object.entries(board.pieces);
        pieceEntries.sort(function (_a, _b) {
            var _c = tslib_1.__read(_a, 2), aPiece = _c[1];
            var _d = tslib_1.__read(_b, 2), bPiece = _d[1];
            var aStats = piece_utils_1.getStats(aPiece);
            var bStats = piece_utils_1.getStats(bPiece);
            return bStats.speed - aStats.speed;
        });
        pieceEntries.forEach(function (_a) {
            var _b = tslib_1.__read(_a, 1), pieceId = _b[0];
            board = _this.takePieceTurn(currentTurn, pieceId, board);
        });
        return board;
    };
    TurnSimulator.prototype.takePieceTurn = function (currentTurn, pieceId, board) {
        // create a new piece object, reset combat properties
        var attacker = tslib_1.__assign(tslib_1.__assign({}, board.pieces[pieceId]), { attacking: null, hit: null });
        var attackerStats = piece_utils_1.getStats(attacker);
        if (attacker.battleBrain.removeFromBoardAtTurn === currentTurn) {
            return board_1.boardReducer(board, boardActions_1.removeBoardPiece(pieceId));
        }
        if (attacker.currentHealth === 0) {
            if (attacker.battleBrain.removeFromBoardAtTurn) {
                return board;
            }
            attacker.battleBrain.removeFromBoardAtTurn = currentTurn + DYING_DURATION;
            return board_1.boardReducer(board, boardActions_1.updateBoardPiece(attacker));
        }
        var cooldown = getCooldownForSpeed(attackerStats.speed);
        if (attacker.battleBrain.canMoveAtTurn === null) {
            attacker.battleBrain.canMoveAtTurn = currentTurn + cooldown;
        }
        if (attacker.battleBrain.canAttackAtTurn === null) {
            attacker.battleBrain.canAttackAtTurn = currentTurn + cooldown;
        }
        // try to find an enemy in attack range
        var attackableEnemy = movement_1.getAttackableEnemyFromCurrentPosition(attacker, attackerStats.attackType, board);
        if (attackableEnemy) {
            // if there's an enemy in range but we can't attack it yet, just wait for cooldown
            if (attacker.battleBrain.canAttackAtTurn > currentTurn) {
                // todo check if attacker has been changed
                return board_1.boardReducer(board, boardActions_1.updateBoardPiece(attacker));
            }
            // if the enemy can't be attacked yet, wait
            if (attackableEnemy.battleBrain.canBeAttackedAtTurn > currentTurn) {
                return board_1.boardReducer(board, boardActions_1.updateBoardPiece(attacker));
            }
            var attackResult = this.attack(attacker, attackableEnemy);
            // if no attack result, no need to update defender
            if (attackResult == null) {
                return board_1.boardReducer(board, boardActions_1.updateBoardPiece(attacker));
            }
            attackResult.attacker.targetPieceId = attackResult.defender.id;
            attacker.battleBrain.canAttackAtTurn = currentTurn + ATTACK_TURN_DURATION + getCooldownForSpeed(attackerStats.speed);
            return board_1.boardReducer(board, boardActions_1.updateBoardPieces([attackResult.attacker, attackResult.defender]));
        }
        // clear target if they're no longer in attack range
        attacker.targetPieceId = null;
        if (attacker.battleBrain.canMoveAtTurn > currentTurn) {
            return board_1.boardReducer(board, boardActions_1.updateBoardPiece(attacker));
        }
        var newPosition = movement_1.getNewPiecePosition(attacker, board);
        if (newPosition === null || newPosition.nextPosition === null) {
            return board_1.boardReducer(board, boardActions_1.updateBoardPiece(attacker));
        }
        var nextPosition = newPosition.nextPosition, targetPosition = newPosition.targetPosition;
        var attackerDirection = position_1.getRelativeDirection(attacker.position, targetPosition);
        attacker.position = nextPosition;
        attacker.facingAway = this.getNewAttackerFacingAway(attacker.facingAway, attackerDirection);
        attacker.battleBrain.canMoveAtTurn = currentTurn + MOVE_TURN_DURATION + getCooldownForSpeed(attackerStats.speed);
        attacker.battleBrain.canBeAttackedAtTurn = currentTurn + MOVE_TURN_DURATION + 2;
        attacker.battleBrain.canAttackAtTurn = currentTurn + MOVE_TURN_DURATION + 2;
        return board_1.boardReducer(board, boardActions_1.updateBoardPiece(attacker));
    };
    TurnSimulator.prototype.getNewAttackerFacingAway = function (oldFacingAway, direction) {
        if (direction === position_1.Directions.LEFT || direction === position_1.Directions.RIGHT) {
            // if it's left or right we don't need to change it
            return oldFacingAway;
        }
        if (direction === position_1.Directions.UP) {
            return true;
        }
        return false;
    };
    TurnSimulator.prototype.getAttackBonus = function (attacker, defender) {
        var isDefenderOvercome = get_type_attack_bonus_1.isOvercomeBy(defender, attacker);
        if (isDefenderOvercome) {
            return STRONG_ATTACK_MODIFIER;
        }
        var isDefenderGenerated = get_type_attack_bonus_1.isGeneratedBy(defender, attacker);
        var isAttackerOvercome = get_type_attack_bonus_1.isOvercomeBy(attacker, defender);
        if (isDefenderGenerated || isAttackerOvercome) {
            return WEAK_ATTACK_MODIFIER;
        }
        return 1;
    };
    TurnSimulator.prototype.attack = function (attacker, defender) {
        if (attacker.currentHealth === 0) {
            return null;
        }
        var attackerStats = piece_utils_1.getStats(attacker);
        var defenderStats = piece_utils_1.getStats(defender);
        var attackBonus = this.getAttackBonus(attacker.definition.type, defender.definition.type);
        var damage = (attackerStats.attack / defenderStats.defense) * attackBonus * 8; // todo tweak this
        var newDefenderHealth = Math.max(defender.currentHealth - damage, 0);
        var attackerDirection = position_1.getRelativeDirection(attacker.position, defender.position);
        return {
            attacker: tslib_1.__assign(tslib_1.__assign({}, attacker), { attacking: {
                    attackType: attackerStats.attackType,
                    distance: position_1.getDistance(attacker.position, defender.position),
                    direction: attackerDirection,
                    damage: damage
                }, targetPieceId: defender.id, facingAway: this.getNewAttackerFacingAway(attacker.facingAway, attackerDirection) }),
            defender: tslib_1.__assign(tslib_1.__assign({}, defender), { currentHealth: newDefenderHealth, hit: {
                    direction: position_1.getRelativeDirection(defender.position, attacker.position),
                    damage: damage
                } })
        };
    };
    return TurnSimulator;
}());
exports.TurnSimulator = TurnSimulator;


/***/ }),

/***/ "./src/shared/models/constants.ts":
/*!****************************************!*\
  !*** ./src/shared/models/constants.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
exports.__esModule = true;
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "./src/shared/models/game-phase.ts");
exports.GRID_SIZE = {
    width: 7,
    height: 6 // THIS MUST BE AN EVEN NUMBER
};
exports.PHASE_LENGTHS = (_a = {},
    _a[game_phase_1.GamePhase.PREPARING] = 30,
    _a[game_phase_1.GamePhase.READY] = 5,
    _a[game_phase_1.GamePhase.PLAYING] = 30,
    _a);
exports.REROLL_COST = 2;
exports.STARTING_MONEY = 3;
exports.STARTING_LEVEL = 1;
exports.STARTING_HEALTH = 100;
exports.RESURRECT_HEALTH = 6;
exports.BUY_XP_COST = 5;
exports.BUY_XP_AMOUNT = 4;
exports.PIECES_TO_EVOLVE = 3;
exports.DEFAULT_TURN_COUNT = 300;
exports.DEFAULT_TURN_DURATION = 100;
exports.DAMAGE_RATIO = 10;
exports.MAX_NAME_LENGTH = 16;
exports.MAX_PLAYERS_IN_GAME = 8;
exports.LOBBY_WAIT_TIME = 60;


/***/ }),

/***/ "./src/shared/models/creatureDefinition.ts":
/*!*************************************************!*\
  !*** ./src/shared/models/creatureDefinition.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.attackTypes = {
    basic: { name: "basic", range: 1 },
    shoot: { name: "shoot", range: 2 }
};


/***/ }),

/***/ "./src/shared/models/creatureType.ts":
/*!*******************************************!*\
  !*** ./src/shared/models/creatureType.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var CreatureType;
(function (CreatureType) {
    CreatureType["Wood"] = "Wood";
    CreatureType["Earth"] = "Earth";
    CreatureType["Water"] = "Water";
    CreatureType["Fire"] = "Fire";
    CreatureType["Metal"] = "Metal";
})(CreatureType = exports.CreatureType || (exports.CreatureType = {}));


/***/ }),

/***/ "./src/shared/models/game-phase.ts":
/*!*****************************************!*\
  !*** ./src/shared/models/game-phase.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var GamePhase;
(function (GamePhase) {
    GamePhase[GamePhase["WAITING"] = 0] = "WAITING";
    GamePhase[GamePhase["PREPARING"] = 1] = "PREPARING";
    GamePhase[GamePhase["READY"] = 2] = "READY";
    GamePhase[GamePhase["PLAYING"] = 3] = "PLAYING";
    GamePhase[GamePhase["DEAD"] = 4] = "DEAD";
})(GamePhase = exports.GamePhase || (exports.GamePhase = {}));


/***/ }),

/***/ "./src/shared/models/index.ts":
/*!************************************!*\
  !*** ./src/shared/models/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var streakType_1 = __webpack_require__(/*! ./streakType */ "./src/shared/models/streakType.ts");
exports.StreakType = streakType_1.StreakType;
var Constants = __webpack_require__(/*! ./constants */ "./src/shared/models/constants.ts");
exports.Constants = Constants;
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "./src/shared/models/game-phase.ts");
exports.GamePhase = game_phase_1.GamePhase;


/***/ }),

/***/ "./src/shared/models/player-list-player.ts":
/*!*************************************************!*\
  !*** ./src/shared/models/player-list-player.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var PlayerBattleStatus;
(function (PlayerBattleStatus) {
    PlayerBattleStatus[PlayerBattleStatus["IN_PROGRESS"] = 0] = "IN_PROGRESS";
    PlayerBattleStatus[PlayerBattleStatus["FINISHED"] = 1] = "FINISHED";
})(PlayerBattleStatus = exports.PlayerBattleStatus || (exports.PlayerBattleStatus = {}));
exports.inProgressBattle = function (opponentId) { return ({
    status: PlayerBattleStatus.IN_PROGRESS,
    opponentId: opponentId
}); };
exports.finishedBattle = function (opponentId, homeScore, awayScore) { return ({
    status: PlayerBattleStatus.FINISHED,
    opponentId: opponentId,
    homeScore: homeScore,
    awayScore: awayScore
}); };


/***/ }),

/***/ "./src/shared/models/position.ts":
/*!***************************************!*\
  !*** ./src/shared/models/position.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var constants_1 = __webpack_require__(/*! ./constants */ "./src/shared/models/constants.ts");
exports.createTileCoordinates = function (x, y) { return ({ x: x, y: y }); };
exports.arePositionsEqual = function (a, b) { return a && b && a.x === b.x && a.y === b.y; };
exports.subtract = function (a, b) { return ({ x: a.x - b.x, y: a.y - b.y }); };
exports.getDistance = function (a, b) {
    var distances = exports.subtract(a, b);
    return Math.abs(distances.x) + Math.abs(distances.y);
};
exports.Directions = {
    UP: { x: 0, y: -1 },
    RIGHT: { x: 1, y: 0 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 }
};
var isInsideGrid = function (position) {
    var x = position.x, y = position.y;
    return x >= 0 && y >= 0 && x < constants_1.GRID_SIZE.width && y < constants_1.GRID_SIZE.height;
};
exports.getAdjacentPositions = function (piece) {
    var _a = piece.position, x = _a.x, y = _a.y;
    var positions = [
        exports.createTileCoordinates(x, y - 1),
        exports.createTileCoordinates(x - 1, y),
        exports.createTileCoordinates(x + 1, y),
        exports.createTileCoordinates(x, y + 1)
    ];
    // filter out any that are outside the grid
    return positions.filter(isInsideGrid);
};
/**
 * Returns the relative direction of position b from the perspective of position a
 * @param from The position to find the direction relative from
 * @param to The position to find the direction relative to
 */
exports.getRelativeDirection = function (from, to) {
    if (from.x < to.x) {
        return exports.Directions.RIGHT;
    }
    if (from.x > to.x) {
        return exports.Directions.LEFT;
    }
    if (from.y < to.y) {
        return exports.Directions.DOWN;
    }
    if (from.y > to.y) {
        return exports.Directions.UP;
    }
    return { x: 0, y: 0 };
};
var TileType;
(function (TileType) {
    TileType[TileType["BOARD"] = 0] = "BOARD";
    TileType[TileType["BENCH"] = 1] = "BENCH";
})(TileType = exports.TileType || (exports.TileType = {}));
var TileStyle;
(function (TileStyle) {
    TileStyle[TileStyle["DEFAULT"] = 0] = "DEFAULT";
    TileStyle[TileStyle["JAMES"] = 1] = "JAMES";
})(TileStyle = exports.TileStyle || (exports.TileStyle = {}));
exports.inBench = function (_a) {
    var y = _a.y;
    return y === null;
};
// TODO: Make this use Constants.GRID_SIZE
exports.inFriendlyBoard = function (_a) {
    var y = _a.y;
    return y > 3;
};


/***/ }),

/***/ "./src/shared/models/streakType.ts":
/*!*****************************************!*\
  !*** ./src/shared/models/streakType.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var StreakType;
(function (StreakType) {
    StreakType[StreakType["WIN"] = 0] = "WIN";
    StreakType[StreakType["LOSS"] = 1] = "LOSS";
})(StreakType = exports.StreakType || (exports.StreakType = {}));


/***/ }),

/***/ "./src/shared/networking/client-to-server.ts":
/*!***************************************************!*\
  !*** ./src/shared/networking/client-to-server.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ClientToServerPacketOpcodes;
(function (ClientToServerPacketOpcodes) {
    ClientToServerPacketOpcodes["FINISH_MATCH"] = "finishMatch";
    ClientToServerPacketOpcodes["START_LOBBY_GAME"] = "startLobbyGame";
    ClientToServerPacketOpcodes["SEND_PLAYER_ACTIONS"] = "sendPlayerActions";
})(ClientToServerPacketOpcodes = exports.ClientToServerPacketOpcodes || (exports.ClientToServerPacketOpcodes = {}));
exports.SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS = 300;


/***/ }),

/***/ "./src/shared/networking/connection-status.ts":
/*!****************************************************!*\
  !*** ./src/shared/networking/connection-status.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus[ConnectionStatus["NOT_CONNECTED"] = 0] = "NOT_CONNECTED";
    ConnectionStatus[ConnectionStatus["CONNECTED"] = 1] = "CONNECTED";
    ConnectionStatus[ConnectionStatus["DISCONNECTED"] = 2] = "DISCONNECTED";
    ConnectionStatus[ConnectionStatus["RECONNECTED"] = 3] = "RECONNECTED";
})(ConnectionStatus = exports.ConnectionStatus || (exports.ConnectionStatus = {}));


/***/ }),

/***/ "./src/shared/networking/incoming-packet-registry.ts":
/*!***********************************************************!*\
  !*** ./src/shared/networking/incoming-packet-registry.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var IncomingPacketRegistry = /** @class */ (function () {
    function IncomingPacketRegistry(registerListener) {
        this.registerListener = registerListener;
    }
    IncomingPacketRegistry.prototype.on = function (opcode, handler) {
        this.registerListener(opcode, handler);
    };
    return IncomingPacketRegistry;
}());
exports.IncomingPacketRegistry = IncomingPacketRegistry;


/***/ }),

/***/ "./src/shared/networking/index.ts":
/*!****************************************!*\
  !*** ./src/shared/networking/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ServerToClient = __webpack_require__(/*! ./server-to-client */ "./src/shared/networking/server-to-client.ts");
exports.ServerToClient = ServerToClient;
var connection_status_1 = __webpack_require__(/*! ./connection-status */ "./src/shared/networking/connection-status.ts");
exports.ConnectionStatus = connection_status_1.ConnectionStatus;


/***/ }),

/***/ "./src/shared/networking/outgoing-packet-registry.ts":
/*!***********************************************************!*\
  !*** ./src/shared/networking/outgoing-packet-registry.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var OutgoingPacketRegistry = /** @class */ (function () {
    function OutgoingPacketRegistry(emitFn) {
        this.emitFn = emitFn;
    }
    OutgoingPacketRegistry.prototype.emit = function (opcode, payload, ack) {
        if (ack) {
            this.emitFn(opcode, payload, ack);
        }
        else {
            this.emitFn(opcode, payload);
        }
    };
    return OutgoingPacketRegistry;
}());
exports.OutgoingPacketRegistry = OutgoingPacketRegistry;


/***/ }),

/***/ "./src/shared/networking/server-to-client.ts":
/*!***************************************************!*\
  !*** ./src/shared/networking/server-to-client.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ServerToClientPacketOpcodes;
(function (ServerToClientPacketOpcodes) {
    ServerToClientPacketOpcodes["JOIN_GAME"] = "joinGame";
    ServerToClientPacketOpcodes["CARDS_UPDATE"] = "cardsUpdate";
    ServerToClientPacketOpcodes["PLAYER_LIST_UPDATE"] = "playerListUpdate";
    ServerToClientPacketOpcodes["PHASE_UPDATE"] = "phaseUpdate";
    ServerToClientPacketOpcodes["MONEY_UPDATE"] = "moneyUpdate";
    ServerToClientPacketOpcodes["LEVEL_UPDATE"] = "levelUpdate";
    ServerToClientPacketOpcodes["LOBBY_PLAYER_UPDATE"] = "lobbyPlayerUpdate";
    ServerToClientPacketOpcodes["FINISH_GAME"] = "finishGame";
    ServerToClientPacketOpcodes["SHOP_LOCK_UPDATE"] = "shopLockUpdate";
    ServerToClientPacketOpcodes["PLAYERS_RESURRECTED"] = "playersResurrected";
})(ServerToClientPacketOpcodes = exports.ServerToClientPacketOpcodes || (exports.ServerToClientPacketOpcodes = {}));


/***/ }),

/***/ "./src/shared/player/actions.ts":
/*!**************************************!*\
  !*** ./src/shared/player/actions.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PLAYER_DROP_PIECE = "PLAYER_DROP_PIECE";
exports.PLAYER_SELL_PIECE = "PLAYER_SELL_PIECE";
exports.REROLL_CARDS = "REROLL_CARDS";
exports.BUY_CARD = "BUY_CARD";
exports.BUY_XP = "BUY_XP";
exports.READY_UP = "READY_UP";
exports.TOGGLE_SHOP_LOCK = "TOGGLE_SHOP_LOCK";
exports.PlayerActionTypesArray = [
    exports.PLAYER_DROP_PIECE, exports.PLAYER_SELL_PIECE, exports.REROLL_CARDS, exports.BUY_CARD,
    exports.BUY_XP, exports.READY_UP, exports.TOGGLE_SHOP_LOCK
];
exports.playerDropPiece = function (pieceId, from, to) { return ({
    type: exports.PLAYER_DROP_PIECE,
    payload: {
        pieceId: pieceId, from: from, to: to
    }
}); };
exports.playerSellPiece = function (pieceId) { return ({
    type: exports.PLAYER_SELL_PIECE,
    payload: {
        pieceId: pieceId
    }
}); };
exports.rerollCards = function () { return ({ type: exports.REROLL_CARDS }); };
exports.buyCard = function (index) { return ({
    type: exports.BUY_CARD,
    payload: {
        index: index
    }
}); };
exports.toggleShopLock = function () { return ({ type: exports.TOGGLE_SHOP_LOCK }); };
exports.buyXpAction = function () { return ({
    type: exports.BUY_XP
}); };
exports.readyUpAction = function () { return ({
    type: exports.READY_UP
}); };


/***/ }),

/***/ "./src/shared/player/bench/benchActionTypes.ts":
/*!*****************************************************!*\
  !*** ./src/shared/player/bench/benchActionTypes.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.REMOVE_BENCH_PIECE = "REMOVE_BENCH_PIECE";
exports.REMOVE_BENCH_PIECES = "REMOVE_BENCH_PIECES";
exports.ADD_BENCH_PIECE = "ADD_BENCH_PIECE";
exports.INITIALISE_BENCH = "INITIALISE_BENCH";
exports.LOCK_BENCH = "LOCK_BENCH";
exports.UNLOCK_BENCH = "UNLOCK_BENCH";
exports.MOVE_BENCH_PIECE = "MOVE_BENCH_PIECE";


/***/ }),

/***/ "./src/shared/player/bench/benchActions.ts":
/*!*************************************************!*\
  !*** ./src/shared/player/bench/benchActions.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var benchActionTypes_1 = __webpack_require__(/*! ./benchActionTypes */ "./src/shared/player/bench/benchActionTypes.ts");
exports.initialiseBench = function (state) { return ({
    type: benchActionTypes_1.INITIALISE_BENCH,
    payload: {
        state: state
    }
}); };
exports.addBenchPiece = function (piece, slot) { return ({
    type: benchActionTypes_1.ADD_BENCH_PIECE,
    payload: {
        piece: piece,
        slot: slot
    }
}); };
exports.removeBenchPiece = function (pieceId) { return ({
    type: benchActionTypes_1.REMOVE_BENCH_PIECE,
    payload: {
        pieceId: pieceId
    }
}); };
exports.removeBenchPieces = function (pieceIds) { return ({
    type: benchActionTypes_1.REMOVE_BENCH_PIECES,
    payload: {
        pieceIds: pieceIds
    }
}); };
exports.moveBenchPiece = function (pieceId, from, to) { return ({
    type: benchActionTypes_1.MOVE_BENCH_PIECE,
    payload: {
        pieceId: pieceId,
        from: from,
        to: to
    }
}); };
exports.lockBench = function () { return ({ type: benchActionTypes_1.LOCK_BENCH }); };
exports.unlockBench = function () { return ({ type: benchActionTypes_1.UNLOCK_BENCH }); };


/***/ }),

/***/ "./src/shared/player/bench/index.ts":
/*!******************************************!*\
  !*** ./src/shared/player/bench/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var state_1 = __webpack_require__(/*! ./state */ "./src/shared/player/bench/state.ts");
exports.benchReducer = state_1.reducer;


/***/ }),

/***/ "./src/shared/player/bench/reducers/lockedReducer.ts":
/*!***********************************************************!*\
  !*** ./src/shared/player/bench/reducers/lockedReducer.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var benchActionTypes_1 = __webpack_require__(/*! ../benchActionTypes */ "./src/shared/player/bench/benchActionTypes.ts");
var initialState = false;
var locked = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case benchActionTypes_1.LOCK_BENCH:
            return true;
        case benchActionTypes_1.UNLOCK_BENCH:
            return false;
        default:
            return state;
    }
};
exports.locked = locked;


/***/ }),

/***/ "./src/shared/player/bench/reducers/piecesReducer.ts":
/*!***********************************************************!*\
  !*** ./src/shared/player/bench/reducers/piecesReducer.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var benchActionTypes_1 = __webpack_require__(/*! ../benchActionTypes */ "./src/shared/player/bench/benchActionTypes.ts");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var initialState = [null, null, null, null, null, null, null, null];
var removePieces = function (state, pieceIds) {
    var e_1, _a;
    var newState = [];
    try {
        for (var state_1 = tslib_1.__values(state), state_1_1 = state_1.next(); !state_1_1.done; state_1_1 = state_1.next()) {
            var piece = state_1_1.value;
            if (!piece || pieceIds.includes(piece.id)) {
                newState.push(null);
            }
            else {
                newState.push(piece);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (state_1_1 && !state_1_1.done && (_a = state_1["return"])) _a.call(state_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return newState;
};
var pieces = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case benchActionTypes_1.INITIALISE_BENCH:
            return tslib_1.__spread(action.payload.state.pieces);
        case benchActionTypes_1.ADD_BENCH_PIECE: {
            var _a = action.payload, piece = _a.piece, slot = _a.slot;
            var newState = tslib_1.__spread(state);
            var slotToUse = slot !== null ? slot : newState.findIndex(function (p) { return p === null; });
            newState[slotToUse] = tslib_1.__assign(tslib_1.__assign({}, piece), { position: position_1.createTileCoordinates(slotToUse, null), facingAway: false });
            return newState;
        }
        case benchActionTypes_1.REMOVE_BENCH_PIECE: {
            return removePieces(state, [action.payload.pieceId]);
        }
        case benchActionTypes_1.REMOVE_BENCH_PIECES: {
            return removePieces(state, action.payload.pieceIds);
        }
        case benchActionTypes_1.MOVE_BENCH_PIECE: {
            var _b = action.payload, pieceId = _b.pieceId, from = _b.from, to = _b.to;
            var piece = state[from.slot];
            // safety catch
            if (!piece || !piece.position || piece.id !== pieceId || piece.position.x !== from.slot || piece.position.y !== null) {
                return state;
            }
            var newState = tslib_1.__spread(state);
            newState[from.slot] = null;
            newState[to.slot] = tslib_1.__assign(tslib_1.__assign({}, piece), { position: position_1.createTileCoordinates(to.slot, null) });
            return newState;
        }
        default:
            return state;
    }
};
exports.pieces = pieces;


/***/ }),

/***/ "./src/shared/player/bench/state.ts":
/*!******************************************!*\
  !*** ./src/shared/player/bench/state.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var redux_1 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
var piecesReducer_1 = __webpack_require__(/*! ./reducers/piecesReducer */ "./src/shared/player/bench/reducers/piecesReducer.ts");
var lockedReducer_1 = __webpack_require__(/*! ./reducers/lockedReducer */ "./src/shared/player/bench/reducers/lockedReducer.ts");
var reducer = redux_1.combineReducers({
    pieces: piecesReducer_1.pieces,
    locked: lockedReducer_1.locked
});
exports.reducer = reducer;


/***/ }),

/***/ "./src/shared/player/cardShop/actions.ts":
/*!***********************************************!*\
  !*** ./src/shared/player/cardShop/actions.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.CARDS_UPDATED = "CARDS_UPDATED";
exports.cardsUpdated = function (cards) { return ({
    type: exports.CARDS_UPDATED,
    payload: {
        cards: cards
    }
}); };


/***/ }),

/***/ "./src/shared/player/cardShop/index.ts":
/*!*********************************************!*\
  !*** ./src/shared/player/cardShop/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
tslib_1.__exportStar(__webpack_require__(/*! ./actions */ "./src/shared/player/cardShop/actions.ts"), exports);
var reducer_1 = __webpack_require__(/*! ./reducer */ "./src/shared/player/cardShop/reducer.ts");
exports.cardsReducer = reducer_1.cards;


/***/ }),

/***/ "./src/shared/player/cardShop/reducer.ts":
/*!***********************************************!*\
  !*** ./src/shared/player/cardShop/reducer.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var actions_1 = __webpack_require__(/*! ./actions */ "./src/shared/player/cardShop/actions.ts");
function cards(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case actions_1.CARDS_UPDATED:
            return action.payload.cards;
        default:
            return state;
    }
}
exports.cards = cards;


/***/ }),

/***/ "./src/shared/player/cardShop/saga.ts":
/*!********************************************!*\
  !*** ./src/shared/player/cardShop/saga.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! ../actions */ "./src/shared/player/actions.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var definitionProvider_1 = __webpack_require__(/*! @common/game/definitionProvider */ "./src/shared/game/definitionProvider.ts");
var piece_utils_1 = __webpack_require__(/*! @common/utils/piece-utils */ "./src/shared/utils/piece-utils.ts");
var benchActions_1 = __webpack_require__(/*! ../bench/benchActions */ "./src/shared/player/bench/benchActions.ts");
var actions_2 = __webpack_require__(/*! ./actions */ "./src/shared/player/cardShop/actions.ts");
var gameInfo_1 = __webpack_require__(/*! ../gameInfo */ "./src/shared/player/gameInfo/index.ts");
var log_1 = __webpack_require__(/*! @common/log */ "./src/shared/log.ts");
var playerSelectors_1 = __webpack_require__(/*! ../playerSelectors */ "./src/shared/player/playerSelectors.ts");
var boardActions_1 = __webpack_require__(/*! @common/board/actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
// todo figure out dependency injection here - or at least construct one and pass it down :)
var definitionProvider = new definitionProvider_1.DefinitionProvider();
var getCardDestination = function (state, playerId) {
    var belowPieceLimit = playerSelectors_1.getPlayerBelowPieceLimit(state, playerId);
    if (belowPieceLimit) {
        var boardSlot = playerSelectors_1.getPlayerFirstEmptyBoardSlot(state);
        if (boardSlot) {
            return {
                type: "board",
                location: {
                    x: boardSlot.x,
                    y: boardSlot.y
                }
            };
        }
    }
    var benchSlot = board_1.getFirstEmptyBenchSlot(state.bench.pieces);
    if (benchSlot !== null) {
        return {
            type: "bench",
            location: {
                slot: benchSlot
            }
        };
    }
    return null;
};
exports.cardShopSagaFactory = function (playerId) {
    return function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeEvery(actions_1.BUY_CARD, function (_a) {
                        var state, gamePhase, card, money, destination, piece, remainingCards;
                        var index = _a.payload.index;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, effects_1.select()];
                                case 1:
                                    state = _b.sent();
                                    gamePhase = state.gameInfo.phase;
                                    // not in correct phase
                                    if (gamePhase === models_1.GamePhase.WAITING || gamePhase === models_1.GamePhase.DEAD) {
                                        return [2 /*return*/];
                                    }
                                    card = state.cards[index];
                                    money = state.gameInfo.money;
                                    // card doesn't exist or player can't afford
                                    if (!card) {
                                        log_1.log("attempted to buy null/undefined card");
                                        return [2 /*return*/];
                                    }
                                    if (money < card.cost) {
                                        log_1.log("attempted to buy card costing $" + card.cost + " but only had $" + money);
                                        return [2 /*return*/];
                                    }
                                    destination = getCardDestination(state, playerId);
                                    // no valid slots
                                    if (destination === null) {
                                        log_1.log("attempted to buy a card but has no available destination");
                                        return [2 /*return*/];
                                    }
                                    piece = piece_utils_1.createPieceFromCard(definitionProvider, playerId, card, destination);
                                    remainingCards = state.cards.map(function (c) { return c === card ? null : c; });
                                    if (!(destination.type === "board")) return [3 /*break*/, 3];
                                    return [4 /*yield*/, effects_1.put(boardActions_1.addBoardPiece(piece, destination.location.x, destination.location.y))];
                                case 2:
                                    _b.sent();
                                    return [3 /*break*/, 5];
                                case 3:
                                    if (!(destination.type === "bench")) return [3 /*break*/, 5];
                                    return [4 /*yield*/, effects_1.put(benchActions_1.addBenchPiece(piece, destination.location.slot))];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5: return [4 /*yield*/, effects_1.put(gameInfo_1.moneyUpdateAction(money - card.cost))];
                                case 6:
                                    _b.sent();
                                    return [4 /*yield*/, effects_1.put(actions_2.cardsUpdated(remainingCards))];
                                case 7:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
};


/***/ }),

/***/ "./src/shared/player/gameInfo/actions.ts":
/*!***********************************************!*\
  !*** ./src/shared/player/gameInfo/actions.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.GAME_PHASE_UPDATE = "GAME_PHASE_UPDATE";
exports.MONEY_UPDATE = "MONEY_UPDATE";
exports.gamePhaseUpdate = function (packet) { return ({
    type: exports.GAME_PHASE_UPDATE,
    payload: packet
}); };
exports.moneyUpdateAction = function (money) { return ({
    type: exports.MONEY_UPDATE,
    payload: {
        money: money
    }
}); };


/***/ }),

/***/ "./src/shared/player/gameInfo/index.ts":
/*!*********************************************!*\
  !*** ./src/shared/player/gameInfo/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
tslib_1.__exportStar(__webpack_require__(/*! ./actions */ "./src/shared/player/gameInfo/actions.ts"), exports);
var reducer_1 = __webpack_require__(/*! ./reducer */ "./src/shared/player/gameInfo/reducer.ts");
exports.gameInfoReducer = reducer_1.gameInfo;


/***/ }),

/***/ "./src/shared/player/gameInfo/reducer.ts":
/*!***********************************************!*\
  !*** ./src/shared/player/gameInfo/reducer.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var actions_1 = __webpack_require__(/*! ./actions */ "./src/shared/player/gameInfo/actions.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var initialState = {
    phase: models_1.GamePhase.WAITING,
    money: constants_1.STARTING_MONEY
};
function gameInfo(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_1.MONEY_UPDATE:
            return tslib_1.__assign(tslib_1.__assign({}, state), { money: action.payload.money });
        case actions_1.GAME_PHASE_UPDATE:
            return tslib_1.__assign(tslib_1.__assign({}, state), { phase: action.payload.phase });
        default:
            return state;
    }
}
exports.gameInfo = gameInfo;


/***/ }),

/***/ "./src/shared/player/index.ts":
/*!************************************!*\
  !*** ./src/shared/player/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var PlayerActions = __webpack_require__(/*! ./actions */ "./src/shared/player/actions.ts");
exports.PlayerActions = PlayerActions;
var actions_1 = __webpack_require__(/*! ./actions */ "./src/shared/player/actions.ts");
exports.PlayerActionTypesArray = actions_1.PlayerActionTypesArray;


/***/ }),

/***/ "./src/shared/player/level/actions.ts":
/*!********************************************!*\
  !*** ./src/shared/player/level/actions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.LEVEL_UPDATE = "LEVEL_UPDATE";
exports.setLevelAction = function (level, xp) { return ({
    type: exports.LEVEL_UPDATE,
    payload: {
        level: level, xp: xp
    }
}); };


/***/ }),

/***/ "./src/shared/player/level/index.ts":
/*!******************************************!*\
  !*** ./src/shared/player/level/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
tslib_1.__exportStar(__webpack_require__(/*! ./actions */ "./src/shared/player/level/actions.ts"), exports);
var reducer_1 = __webpack_require__(/*! ./reducer */ "./src/shared/player/level/reducer.ts");
exports.levelReducer = reducer_1.level;


/***/ }),

/***/ "./src/shared/player/level/reducer.ts":
/*!********************************************!*\
  !*** ./src/shared/player/level/reducer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var actions_1 = __webpack_require__(/*! ./actions */ "./src/shared/player/level/actions.ts");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var initialState = {
    level: constants_1.STARTING_LEVEL,
    xp: 0
};
function level(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_1.LEVEL_UPDATE:
            return {
                level: action.payload.level,
                xp: action.payload.xp
            };
        default:
            return state;
    }
}
exports.level = level;


/***/ }),

/***/ "./src/shared/player/pieceSelectors.ts":
/*!*********************************************!*\
  !*** ./src/shared/player/pieceSelectors.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
exports.getPiece = function (state, pieceId) {
    var boardPiece = state.board.pieces[pieceId];
    if (boardPiece) {
        return boardPiece;
    }
    var benchPiece = state.bench.pieces.find(function (p) { return p && p.id === pieceId; });
    if (benchPiece) {
        return benchPiece;
    }
    return null;
};
exports.getBenchPieceForSlot = function (state, slot) { return state.bench.pieces[slot] || null; };
exports.getBoardPieceForPosition = function (state, x, y) { return state.pieces[state.piecePositions[x + "," + y]] || null; };
exports.getAllPieces = function (state) { return tslib_1.__spread(Object.values(state.board.pieces), state.bench.pieces.filter(function (p) { return p !== null; })); };
exports.getBoardPiecesForDefinition = function (state, definitionId) { return Object.values(state.board.pieces).filter(function (p) { return p.definitionId === definitionId; }); };
exports.getBenchPiecesForDefinition = function (state, definitionId) { return state.bench.pieces.filter(function (p) { return p && p.definitionId === definitionId; }); };
exports.getBoardPieceCount = function (state) { return Object.values(state.board.pieces).length; };
exports.hasSpaceOnBench = function (state) { return exports.getFirstEmptyBenchSlot(state) !== null; };
exports.getFirstEmptyBenchSlot = function (state) {
    var index = state.bench.pieces.findIndex(function (p) { return p === null; });
    if (index === undefined) {
        return null;
    }
    return index;
};


/***/ }),

/***/ "./src/shared/player/playerSelectors.ts":
/*!**********************************************!*\
  !*** ./src/shared/player/playerSelectors.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var pieceSelectors_1 = __webpack_require__(/*! ./pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
exports.getPlayerMoney = function (state) { return state.gameInfo.money; };
exports.getPlayerLevel = function (state) { return state.level.level; };
exports.getPlayerXp = function (state) { return state.level.xp; };
exports.getPlayerBelowPieceLimit = function (state, playerId) {
    var ownedBoardPieceCount = Object.values(state.board.pieces).filter(function (p) { return p.ownerId === playerId; }).length;
    var level = state.level.level;
    return ownedBoardPieceCount < level;
};
var PREFERRED_COLUMN_ORDERS = {
    8: [3, 4, 2, 5, 1, 6, 0, 7],
    7: [3, 4, 2, 5, 1, 6, 0]
};
exports.getPlayerFirstEmptyBoardSlot = function (state) {
    var e_1, _a;
    var preferredColumnOrder = PREFERRED_COLUMN_ORDERS[constants_1.GRID_SIZE.width];
    for (var y = (constants_1.GRID_SIZE.height / 2); y < constants_1.GRID_SIZE.height; y++) {
        try {
            for (var preferredColumnOrder_1 = (e_1 = void 0, tslib_1.__values(preferredColumnOrder)), preferredColumnOrder_1_1 = preferredColumnOrder_1.next(); !preferredColumnOrder_1_1.done; preferredColumnOrder_1_1 = preferredColumnOrder_1.next()) {
                var x = preferredColumnOrder_1_1.value;
                var boardPiece = pieceSelectors_1.getBoardPieceForPosition(state.board, x, y);
                if (!boardPiece) {
                    return {
                        x: x,
                        y: y
                    };
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (preferredColumnOrder_1_1 && !preferredColumnOrder_1_1.done && (_a = preferredColumnOrder_1["return"])) _a.call(preferredColumnOrder_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return null;
};
exports.getMostExpensiveBenchPiece = function (state) {
    var benchPieces = state.bench.pieces.filter(function (p) { return p !== null; });
    if (!benchPieces.length) {
        return null;
    }
    benchPieces.sort(function (a, b) { return b.definition.cost - a.definition.cost; });
    return benchPieces[0];
};


/***/ }),

/***/ "./src/shared/player/sagas/dropPiece.ts":
/*!**********************************************!*\
  !*** ./src/shared/player/sagas/dropPiece.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! ../actions */ "./src/shared/player/actions.ts");
var pieceSelectors = __webpack_require__(/*! ../pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var boardActions_1 = __webpack_require__(/*! @common/board/actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
var benchActions_1 = __webpack_require__(/*! ../bench/benchActions */ "./src/shared/player/bench/benchActions.ts");
var playerSelectors_1 = __webpack_require__(/*! ../playerSelectors */ "./src/shared/player/playerSelectors.ts");
var findPiece = function (state, location) {
    if (location.type === "board") {
        var _a = location.location, x = _a.x, y = _a.y;
        return pieceSelectors.getBoardPieceForPosition(state.board, x, y);
    }
    if (location.type === "bench") {
        var slot = location.location.slot;
        return pieceSelectors.getBenchPieceForSlot(state, slot);
    }
    return null;
};
var isLocationLocked = function (state, location) {
    if (location.type === "board") {
        return state.board.locked;
    }
    if (location.type === "bench") {
        return state.bench.locked;
    }
    return true;
};
exports.dropPieceSagaFactory = function (playerId) {
    return function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeEvery(actions_1.PLAYER_DROP_PIECE, function (_a) {
                        var state, fromPiece, toPiece, belowPieceLimit;
                        var _b = _a.payload, from = _b.from, pieceId = _b.pieceId, to = _b.to;
                        return tslib_1.__generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, effects_1.select()];
                                case 1:
                                    state = _c.sent();
                                    if (isLocationLocked(state, from) || isLocationLocked(state, to)) {
                                        // source or destination is locked
                                        return [2 /*return*/];
                                    }
                                    fromPiece = findPiece(state, from);
                                    if (fromPiece === null || fromPiece.id !== pieceId) {
                                        // from piece not found or id wrong (position mismatch?)
                                        return [2 /*return*/];
                                    }
                                    toPiece = findPiece(state, to);
                                    if (toPiece !== null) {
                                        // destination tile not empty
                                        return [2 /*return*/];
                                    }
                                    if (to.type === "board" && from.type !== "board") {
                                        belowPieceLimit = playerSelectors_1.getPlayerBelowPieceLimit(state, playerId);
                                        if (!belowPieceLimit) {
                                            return [2 /*return*/];
                                        }
                                    }
                                    if (!(from.type === "board" && to.type === "board")) return [3 /*break*/, 3];
                                    return [4 /*yield*/, effects_1.put(boardActions_1.moveBoardPiece(pieceId, from.location, to.location))];
                                case 2:
                                    _c.sent();
                                    return [3 /*break*/, 11];
                                case 3:
                                    if (!(from.type !== "board" && to.type !== "board")) return [3 /*break*/, 5];
                                    return [4 /*yield*/, effects_1.put(benchActions_1.moveBenchPiece(pieceId, from.location, to.location))];
                                case 4:
                                    _c.sent();
                                    return [3 /*break*/, 11];
                                case 5:
                                    if (!(from.type === "board" && to.type !== "board")) return [3 /*break*/, 8];
                                    return [4 /*yield*/, effects_1.put(boardActions_1.removeBoardPiece(pieceId))];
                                case 6:
                                    _c.sent();
                                    return [4 /*yield*/, effects_1.put(benchActions_1.addBenchPiece(fromPiece, to.location.slot))];
                                case 7:
                                    _c.sent();
                                    return [3 /*break*/, 11];
                                case 8:
                                    if (!(from.type !== "board" && to.type === "board")) return [3 /*break*/, 11];
                                    return [4 /*yield*/, effects_1.put(benchActions_1.removeBenchPiece(pieceId))];
                                case 9:
                                    _c.sent();
                                    return [4 /*yield*/, effects_1.put(boardActions_1.addBoardPiece(fromPiece, to.location.x, to.location.y))];
                                case 10:
                                    _c.sent();
                                    _c.label = 11;
                                case 11: return [2 /*return*/];
                            }
                        });
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
};


/***/ }),

/***/ "./src/shared/player/sagas/evolution.ts":
/*!**********************************************!*\
  !*** ./src/shared/player/sagas/evolution.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var benchActions_1 = __webpack_require__(/*! ../bench/benchActions */ "./src/shared/player/bench/benchActions.ts");
var benchActionTypes_1 = __webpack_require__(/*! ../bench/benchActionTypes */ "./src/shared/player/bench/benchActionTypes.ts");
var definitionProvider_1 = __webpack_require__(/*! @common/game/definitionProvider */ "./src/shared/game/definitionProvider.ts");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var boardActionTypes_1 = __webpack_require__(/*! @common/board/actions/boardActionTypes */ "./src/shared/board/actions/boardActionTypes.ts");
var pieceSelectors = __webpack_require__(/*! ../pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var boardActions_1 = __webpack_require__(/*! @common/board/actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
var definitionProvider = new definitionProvider_1.DefinitionProvider();
var pieceCanEvolve = function (piece) {
    var stages = definitionProvider.get(piece.definitionId).stages;
    return piece.stage < stages.length - 1;
};
exports.evolutionSagaFactory = function () {
    return function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeLatest(
                    // need to check when bench/board pieces are added (could have come from shop)
                    // or when board piece is updated (could be due to a previous evolution)
                    [benchActionTypes_1.ADD_BENCH_PIECE, boardActionTypes_1.ADD_BOARD_PIECE, boardActionTypes_1.UPDATE_BOARD_PIECE], function (_a) {
                        var boardLocked, state, targetDefinitionId, targetStage, getCombinablePieces, matchingBoardPieces, matchingBenchPieces, totalInstances, pieceToReplace, boardPieceIds, benchPieceIds, newPiece, benchPieceIds, newPiece;
                        var piece = _a.payload.piece;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!pieceCanEvolve(piece)) {
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, effects_1.select(function (s) { return s.board.locked; })];
                                case 1:
                                    boardLocked = _b.sent();
                                    if (!boardLocked) return [3 /*break*/, 4];
                                    // todo check if we have 3 evolvable pieces on the bench and evolve those? maybe
                                    return [4 /*yield*/, effects_1.take(boardActionTypes_1.UNLOCK_BOARD)];
                                case 2:
                                    // todo check if we have 3 evolvable pieces on the bench and evolve those? maybe
                                    _b.sent();
                                    return [4 /*yield*/, effects_1.delay(500)];
                                case 3:
                                    _b.sent();
                                    _b.label = 4;
                                case 4: return [4 /*yield*/, effects_1.select()];
                                case 5:
                                    state = _b.sent();
                                    targetDefinitionId = piece.definitionId;
                                    targetStage = piece.stage;
                                    getCombinablePieces = function (pieces) { return pieces.filter(function (p) { return p.stage === targetStage; }); };
                                    matchingBoardPieces = getCombinablePieces(pieceSelectors.getBoardPiecesForDefinition(state, targetDefinitionId));
                                    matchingBenchPieces = getCombinablePieces(pieceSelectors.getBenchPiecesForDefinition(state, targetDefinitionId));
                                    totalInstances = matchingBoardPieces.length + matchingBenchPieces.length;
                                    if (totalInstances < constants_1.PIECES_TO_EVOLVE) {
                                        return [2 /*return*/];
                                    }
                                    if (!(matchingBoardPieces.length > 0)) return [3 /*break*/, 9];
                                    pieceToReplace = matchingBoardPieces.pop();
                                    boardPieceIds = matchingBoardPieces.map(function (p) { return p.id; });
                                    return [4 /*yield*/, effects_1.put(boardActions_1.removeBoardPieces(boardPieceIds))];
                                case 6:
                                    _b.sent();
                                    benchPieceIds = matchingBenchPieces.map(function (p) { return p.id; });
                                    return [4 /*yield*/, effects_1.put(benchActions_1.removeBenchPieces(tslib_1.__spread(benchPieceIds, [piece.id])))];
                                case 7:
                                    _b.sent();
                                    newPiece = tslib_1.__assign(tslib_1.__assign({}, pieceToReplace), { stage: targetStage + 1 });
                                    return [4 /*yield*/, effects_1.put(boardActions_1.updateBoardPiece(newPiece))];
                                case 8:
                                    _b.sent();
                                    return [3 /*break*/, 13];
                                case 9:
                                    benchPieceIds = matchingBenchPieces.map(function (p) { return p.id; });
                                    return [4 /*yield*/, effects_1.put(benchActions_1.removeBenchPieces(benchPieceIds))];
                                case 10:
                                    _b.sent();
                                    newPiece = tslib_1.__assign(tslib_1.__assign({}, piece), { stage: targetStage + 1 });
                                    // todo make updateBenchPiece action
                                    return [4 /*yield*/, effects_1.put(benchActions_1.removeBenchPiece(piece.id))];
                                case 11:
                                    // todo make updateBenchPiece action
                                    _b.sent();
                                    return [4 /*yield*/, effects_1.put(benchActions_1.addBenchPiece(newPiece, null))];
                                case 12:
                                    _b.sent();
                                    _b.label = 13;
                                case 13: return [2 /*return*/];
                            }
                        });
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
};


/***/ }),

/***/ "./src/shared/utils/debounce.ts":
/*!**************************************!*\
  !*** ./src/shared/utils/debounce.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.debounce = function (func, wait) {
    var timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            func();
        }, wait);
    };
};


/***/ }),

/***/ "./src/shared/utils/get-pieces-for-stage.ts":
/*!**************************************************!*\
  !*** ./src/shared/utils/get-pieces-for-stage.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getPiecesForStage = function (stage) {
    if (stage === 0) {
        return 1;
    }
    if (stage === 1) {
        return 3;
    }
    if (stage === 2) {
        return 9;
    }
    // shouldnt occur
    return 0;
};


/***/ }),

/***/ "./src/shared/utils/get-total-health-by-team.ts":
/*!******************************************************!*\
  !*** ./src/shared/utils/get-total-health-by-team.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var groupBy = function (list, keyGetter) {
    var map = new Map();
    list.forEach(function (item) {
        var key = keyGetter(item);
        var collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        }
        else {
            collection.push(item);
        }
    });
    return Array.from(map);
};
exports.getTotalHealthByTeam = function (board) {
    var piecesList = Object.values(board.pieces);
    var grouped = groupBy(piecesList, function (p) { return p.ownerId; });
    return grouped.map(function (_a) {
        var _b = tslib_1.__read(_a, 2), key = _b[0], values = _b[1];
        return {
            ownerId: key,
            totalHealth: values.reduce(function (acc, cur) { return acc + cur.currentHealth; }, 0)
        };
    });
};


/***/ }),

/***/ "./src/shared/utils/get-type-attack-bonus.ts":
/*!***************************************************!*\
  !*** ./src/shared/utils/get-type-attack-bonus.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
exports.__esModule = true;
var creatureType_1 = __webpack_require__(/*! ../models/creatureType */ "./src/shared/models/creatureType.ts");
// overcome / generated are Tuxemon language
exports.typeInteractions = (_a = {},
    _a[creatureType_1.CreatureType.Earth] = {
        generatedBy: creatureType_1.CreatureType.Fire,
        overcomeBy: creatureType_1.CreatureType.Wood
    },
    _a[creatureType_1.CreatureType.Metal] = {
        generatedBy: creatureType_1.CreatureType.Earth,
        overcomeBy: creatureType_1.CreatureType.Fire
    },
    _a[creatureType_1.CreatureType.Water] = {
        generatedBy: creatureType_1.CreatureType.Metal,
        overcomeBy: creatureType_1.CreatureType.Earth
    },
    _a[creatureType_1.CreatureType.Wood] = {
        generatedBy: creatureType_1.CreatureType.Water,
        overcomeBy: creatureType_1.CreatureType.Metal
    },
    _a[creatureType_1.CreatureType.Fire] = {
        generatedBy: creatureType_1.CreatureType.Wood,
        overcomeBy: creatureType_1.CreatureType.Water
    },
    _a);
exports.isGeneratedBy = function (defender, attacker) { return exports.typeInteractions[defender].generatedBy === attacker; };
exports.isOvercomeBy = function (defender, attacker) { return exports.typeInteractions[defender].overcomeBy === attacker; };
exports.getTypeAttackBonus = function (attackType, defenceType) {
    // an attack is weak against the element that it Generates and strong against the element that it Overcomes.
    var defenderInteractions = exports.typeInteractions[defenceType];
    if (defenderInteractions.generatedBy === attackType) {
        return 0.7;
    }
    if (defenderInteractions.overcomeBy === attackType) {
        return 1.4;
    }
    return 1;
};


/***/ }),

/***/ "./src/shared/utils/get-xp-for-level.ts":
/*!**********************************************!*\
  !*** ./src/shared/utils/get-xp-for-level.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var XP_TO_NEXT_LEVEL = [
    1,
    1,
    2,
    4,
    8,
    16,
    24,
    32,
    40
];
exports.getXpToNextLevel = function (level) {
    var result = XP_TO_NEXT_LEVEL[level - 1];
    if (result === undefined) {
        return null;
    }
    return result;
};


/***/ }),

/***/ "./src/shared/utils/index.ts":
/*!***********************************!*\
  !*** ./src/shared/utils/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var debounce_1 = __webpack_require__(/*! ./debounce */ "./src/shared/utils/debounce.ts");
exports.debounce = debounce_1.debounce;
var get_pieces_for_stage_1 = __webpack_require__(/*! ./get-pieces-for-stage */ "./src/shared/utils/get-pieces-for-stage.ts");
exports.getPiecesForStage = get_pieces_for_stage_1.getPiecesForStage;
var get_total_health_by_team_1 = __webpack_require__(/*! ./get-total-health-by-team */ "./src/shared/utils/get-total-health-by-team.ts");
exports.getTotalHealthByTeam = get_total_health_by_team_1.getTotalHealthByTeam;
var get_type_attack_bonus_1 = __webpack_require__(/*! ./get-type-attack-bonus */ "./src/shared/utils/get-type-attack-bonus.ts");
exports.getTypeAttackBonus = get_type_attack_bonus_1.getTypeAttackBonus;
var get_xp_for_level_1 = __webpack_require__(/*! ./get-xp-for-level */ "./src/shared/utils/get-xp-for-level.ts");
exports.getXpToNextLevel = get_xp_for_level_1.getXpToNextLevel;
var is_a_team_defeated_1 = __webpack_require__(/*! ./is-a-team-defeated */ "./src/shared/utils/is-a-team-defeated.ts");
exports.isATeamDefeated = is_a_team_defeated_1.isATeamDefeated;
var pieceUtils = __webpack_require__(/*! ./piece-utils */ "./src/shared/utils/piece-utils.ts");
exports.pieceUtils = pieceUtils;
var random_from_array_1 = __webpack_require__(/*! ./random-from-array */ "./src/shared/utils/random-from-array.ts");
exports.randomFromArray = random_from_array_1.randomFromArray;


/***/ }),

/***/ "./src/shared/utils/is-a-team-defeated.ts":
/*!************************************************!*\
  !*** ./src/shared/utils/is-a-team-defeated.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.isATeamDefeated = function (board) {
    var pieces = Object.values(board.pieces);
    var pieceOwnerIds = pieces.map(function (p) { return p.ownerId; });
    // if there are only pieces belonging to 1 player, then we have a winner
    return (new Set(pieceOwnerIds).size === 1);
};


/***/ }),

/***/ "./src/shared/utils/piece-utils.ts":
/*!*****************************************!*\
  !*** ./src/shared/utils/piece-utils.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");
var uuid = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
var position_1 = __webpack_require__(/*! ../models/position */ "./src/shared/models/position.ts");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
exports.createPiece = function (definitionProvider, ownerId, definitionId, position, id, stage) {
    if (stage === void 0) { stage = 0; }
    var stats = definitionProvider.get(definitionId).stages[0];
    return {
        id: id || uuid(),
        ownerId: ownerId,
        definitionId: definitionId,
        definition: definitionProvider.get(definitionId),
        position: position_1.createTileCoordinates.apply(void 0, tslib_1.__spread(position)),
        facingAway: true,
        maxHealth: stats.hp,
        currentHealth: stats.hp,
        stage: stage,
        targetPieceId: null
    };
};
exports.getStats = function (piece) { return piece.definition.stages[piece.stage]; };
var getPositionFromLocation = function (location) {
    if (location.type === "board") {
        return [location.location.x, location.location.y];
    }
    else if (location.type === "bench") {
        return [location.location.slot, null];
    }
};
exports.createPieceFromCard = function (definitionProvider, ownerId, card, destination) {
    var position = getPositionFromLocation(destination);
    return exports.createPiece(definitionProvider, ownerId, card.definitionId, position, card.id);
};
exports.clonePiece = function (definitionProvider, piece) {
    return exports.createPiece(definitionProvider, piece.ownerId, piece.definitionId, [piece.position.x, piece.position.y], piece.id, piece.stage);
};
exports.moveOrAddPiece = function (allPieces, target) {
    var e_1, _a;
    var result = [];
    var targetAdded = false;
    try {
        for (var allPieces_1 = tslib_1.__values(allPieces), allPieces_1_1 = allPieces_1.next(); !allPieces_1_1.done; allPieces_1_1 = allPieces_1.next()) {
            var p = allPieces_1_1.value;
            // if this isn't the target just push it
            if (p.id !== target.id) {
                result.push(p);
                continue;
            }
            // otherwise add the target
            result.push(target);
            targetAdded = true;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (allPieces_1_1 && !allPieces_1_1.done && (_a = allPieces_1["return"])) _a.call(allPieces_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (targetAdded === false) {
        result.push(target);
    }
    return result;
};
exports.rotatePiecePosition = function (piece) {
    piece.position.x = constants_1.GRID_SIZE.width - 1 - piece.position.x;
    piece.position.y = constants_1.GRID_SIZE.height - 1 - piece.position.y;
    return piece;
};


/***/ }),

/***/ "./src/shared/utils/random-from-array.ts":
/*!***********************************************!*\
  !*** ./src/shared/utils/random-from-array.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.randomFromArray = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};


/***/ }),

/***/ "./src/shared/validation/nickname.ts":
/*!*******************************************!*\
  !*** ./src/shared/validation/nickname.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var NAME_REGEX = /^[a-zA-Z0-9_\ ]*$/;
exports.validateNickname = function (nickname) {
    if (!nickname || !nickname.length || nickname.length < 4) {
        return "Your nickname must be at least 4 characters long.";
    }
    if (nickname.length > constants_1.MAX_NAME_LENGTH) {
        return "Name too long";
    }
    if (nickname.match(NAME_REGEX) === null) {
        return "Invalid characters in name";
    }
    return null;
};


/***/ }),

/***/ 0:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });