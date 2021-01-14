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
/******/ 	deferredModules.push(["./src/index.tsx","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../models/lib/constants.js":
/*!**********************************!*\
  !*** ../models/lib/constants.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
exports.__esModule = true;
exports.LOBBY_WAIT_TIME = exports.MAX_PLAYERS_IN_GAME = exports.MAX_NAME_LENGTH = exports.DAMAGE_RATIO = exports.DEFAULT_TURN_DURATION = exports.DEFAULT_TURN_COUNT = exports.PIECES_TO_EVOLVE = exports.BUY_XP_AMOUNT = exports.BUY_XP_COST = exports.HEALTH_LOST_PER_PIECE = exports.MAX_PLAYER_LEVEL = exports.RESURRECT_HEALTH = exports.STARTING_HEALTH = exports.STARTING_LEVEL = exports.STARTING_MONEY = exports.REROLL_COST = exports.PHASE_LENGTHS = exports.GRID_SIZE = void 0;
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "../models/lib/game-phase.js");
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
exports.MAX_PLAYER_LEVEL = 10;
exports.HEALTH_LOST_PER_PIECE = 5;
exports.BUY_XP_COST = 5;
exports.BUY_XP_AMOUNT = 4;
exports.PIECES_TO_EVOLVE = 3;
exports.DEFAULT_TURN_COUNT = 300;
exports.DEFAULT_TURN_DURATION = 100;
exports.DAMAGE_RATIO = 10;
exports.MAX_NAME_LENGTH = 16;
exports.MAX_PLAYERS_IN_GAME = 8;
exports.LOBBY_WAIT_TIME = 90;


/***/ }),

/***/ "../models/lib/creatureDefinition.js":
/*!*******************************************!*\
  !*** ../models/lib/creatureDefinition.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.attackTypes = exports.DefinitionClass = void 0;
var DefinitionClass;
(function (DefinitionClass) {
    DefinitionClass["VALIANT"] = "Valiant";
    DefinitionClass["ARCANE"] = "Arcane";
    DefinitionClass["CUNNING"] = "Cunning";
})(DefinitionClass = exports.DefinitionClass || (exports.DefinitionClass = {}));
exports.attackTypes = {
    basic: { name: "basic", range: 1 },
    shoot: { name: "shoot", range: 2 }
};


/***/ }),

/***/ "../models/lib/creatureType.js":
/*!*************************************!*\
  !*** ../models/lib/creatureType.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.CreatureType = void 0;
var CreatureType;
(function (CreatureType) {
    CreatureType["Wood"] = "Wood";
    CreatureType["Earth"] = "Earth";
    CreatureType["Water"] = "Water";
    CreatureType["Fire"] = "Fire";
    CreatureType["Metal"] = "Metal";
})(CreatureType = exports.CreatureType || (exports.CreatureType = {}));


/***/ }),

/***/ "../models/lib/game-phase.js":
/*!***********************************!*\
  !*** ../models/lib/game-phase.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.GamePhase = void 0;
var GamePhase;
(function (GamePhase) {
    GamePhase[GamePhase["PREPARING"] = 0] = "PREPARING";
    GamePhase[GamePhase["READY"] = 1] = "READY";
    GamePhase[GamePhase["PLAYING"] = 2] = "PLAYING";
})(GamePhase = exports.GamePhase || (exports.GamePhase = {}));


/***/ }),

/***/ "../models/lib/index.js":
/*!******************************!*\
  !*** ../models/lib/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.Constants = void 0;
var player_list_player_1 = __webpack_require__(/*! ./player-list-player */ "../models/lib/player-list-player.js");
__createBinding(exports, player_list_player_1, "PlayerStatus");
__createBinding(exports, player_list_player_1, "PlayerBattleStatus");
__createBinding(exports, player_list_player_1, "inProgressBattle");
__createBinding(exports, player_list_player_1, "finishedBattle");
var streakType_1 = __webpack_require__(/*! ./streakType */ "../models/lib/streakType.js");
__createBinding(exports, streakType_1, "StreakType");
var Constants = __webpack_require__(/*! ./constants */ "../models/lib/constants.js");
exports.Constants = Constants;
__exportStar(__webpack_require__(/*! ./constants */ "../models/lib/constants.js"), exports);
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "../models/lib/game-phase.js");
__createBinding(exports, game_phase_1, "GamePhase");
var position_1 = __webpack_require__(/*! ./position */ "../models/lib/position.js");
__createBinding(exports, position_1, "TileType");
__createBinding(exports, position_1, "Directions");
__createBinding(exports, position_1, "createTileCoordinates");
__createBinding(exports, position_1, "getDistance");
__createBinding(exports, position_1, "getDelta");
__createBinding(exports, position_1, "getRelativeDirection");
var creatureDefinition_1 = __webpack_require__(/*! ./creatureDefinition */ "../models/lib/creatureDefinition.js");
__createBinding(exports, creatureDefinition_1, "attackTypes");
__createBinding(exports, creatureDefinition_1, "DefinitionClass");
var creatureType_1 = __webpack_require__(/*! ./creatureType */ "../models/lib/creatureType.js");
__createBinding(exports, creatureType_1, "CreatureType");
var pieceCombat_1 = __webpack_require__(/*! ./pieceCombat */ "../models/lib/pieceCombat.js");
__createBinding(exports, pieceCombat_1, "createPieceCombatState");


/***/ }),

/***/ "../models/lib/pieceCombat.js":
/*!************************************!*\
  !*** ../models/lib/pieceCombat.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.createPieceCombatState = void 0;
exports.createPieceCombatState = function () { return ({
    board: {
        canMoveAtTurn: null,
        canBeAttackedAtTurn: 0,
        canAttackAtTurn: null,
        removeFromBoardAtTurn: null
    },
    targetId: null
}); };


/***/ }),

/***/ "../models/lib/player-list-player.js":
/*!*******************************************!*\
  !*** ../models/lib/player-list-player.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.finishedBattle = exports.inProgressBattle = exports.PlayerStatus = exports.PlayerBattleStatus = void 0;
var PlayerBattleStatus;
(function (PlayerBattleStatus) {
    PlayerBattleStatus[PlayerBattleStatus["IN_PROGRESS"] = 0] = "IN_PROGRESS";
    PlayerBattleStatus[PlayerBattleStatus["FINISHED"] = 1] = "FINISHED";
})(PlayerBattleStatus = exports.PlayerBattleStatus || (exports.PlayerBattleStatus = {}));
var PlayerStatus;
(function (PlayerStatus) {
    PlayerStatus[PlayerStatus["CONNECTED"] = 0] = "CONNECTED";
    PlayerStatus[PlayerStatus["QUIT"] = 1] = "QUIT";
})(PlayerStatus = exports.PlayerStatus || (exports.PlayerStatus = {}));
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

/***/ "../models/lib/position.js":
/*!*********************************!*\
  !*** ../models/lib/position.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.inFriendlyBoard = exports.inBench = exports.TileType = exports.getRelativeDirection = exports.Directions = exports.getDistance = exports.getDelta = exports.subtract = exports.arePositionsEqual = exports.createTileCoordinates = void 0;
exports.createTileCoordinates = function (x, y) { return ({ x: x, y: y }); };
exports.arePositionsEqual = function (a, b) { return a && b && a.x === b.x && a.y === b.y; };
exports.subtract = function (a, b) { return ({ x: a.x - b.x, y: a.y - b.y }); };
exports.getDelta = function (a, b) {
    return {
        x: Math.abs(a.x - b.x),
        y: Math.abs(a.y - b.y)
    };
};
exports.getDistance = function (a, b) {
    var _a = exports.getDelta(a, b), x = _a.x, y = _a.y;
    return x + y;
};
exports.Directions = {
    UP: { x: 0, y: -1 },
    RIGHT: { x: 1, y: 0 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 }
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

/***/ "../models/lib/streakType.js":
/*!***********************************!*\
  !*** ../models/lib/streakType.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.StreakType = void 0;
var StreakType;
(function (StreakType) {
    StreakType[StreakType["WIN"] = 0] = "WIN";
    StreakType[StreakType["LOSS"] = 1] = "LOSS";
})(StreakType = exports.StreakType || (exports.StreakType = {}));


/***/ }),

/***/ "../shared/lib/board/commands.js":
/*!***************************************!*\
  !*** ../shared/lib/board/commands.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.unlockBoard = exports.lockBoard = exports.moveBoardPiece = exports.updateBoardPieces = exports.updateBoardPiece = exports.removeBoardPieces = exports.removeBoardPiece = exports.addBoardPiece = exports.initialiseBoard = exports.UNLOCK_BOARD_COMMAND = exports.LOCK_BOARD_COMMAND = exports.MOVE_BOARD_PIECE_COMMAND = exports.UPDATE_BOARD_PIECES_COMMAND = exports.UPDATE_BOARD_PIECE_COMMAND = exports.INITIALISE_BOARD_COMMAND = exports.ADD_BOARD_PIECE_COMMAND = exports.REMOVE_BOARD_PIECES_COMMAND = exports.REMOVE_BOARD_PIECE_COMMAND = void 0;
exports.REMOVE_BOARD_PIECE_COMMAND = "REMOVE_BOARD_PIECE_COMMAND";
exports.REMOVE_BOARD_PIECES_COMMAND = "REMOVE_BOARD_PIECES_COMMAND";
exports.ADD_BOARD_PIECE_COMMAND = "ADD_BOARD_PIECE_COMMAND";
exports.INITIALISE_BOARD_COMMAND = "INITIALISE_BOARD_COMMAND";
exports.UPDATE_BOARD_PIECE_COMMAND = "UPDATE_BOARD_PIECE_COMMAND";
exports.UPDATE_BOARD_PIECES_COMMAND = "UPDATE_BOARD_PIECES_COMMAND";
exports.MOVE_BOARD_PIECE_COMMAND = "MOVE_BOARD_PIECE_COMMAND";
exports.LOCK_BOARD_COMMAND = "LOCK_BOARD_COMMAND";
exports.UNLOCK_BOARD_COMMAND = "UNLOCK_BOARD_COMMAND";
exports.initialiseBoard = function (pieces) { return ({
    type: exports.INITIALISE_BOARD_COMMAND,
    payload: {
        pieces: pieces
    }
}); };
exports.addBoardPiece = function (piece, x, y) { return ({
    type: exports.ADD_BOARD_PIECE_COMMAND,
    payload: {
        piece: piece,
        x: x,
        y: y
    }
}); };
exports.removeBoardPiece = function (pieceId) { return ({
    type: exports.REMOVE_BOARD_PIECE_COMMAND,
    payload: {
        pieceId: pieceId
    }
}); };
exports.removeBoardPieces = function (pieceIds) { return ({
    type: exports.REMOVE_BOARD_PIECES_COMMAND,
    payload: {
        pieceIds: pieceIds
    }
}); };
exports.updateBoardPiece = function (piece) { return ({
    type: exports.UPDATE_BOARD_PIECE_COMMAND,
    payload: {
        piece: piece
    }
}); };
exports.updateBoardPieces = function (pieces) { return ({
    type: exports.UPDATE_BOARD_PIECES_COMMAND,
    payload: {
        pieces: pieces
    }
}); };
exports.moveBoardPiece = function (pieceId, from, to) { return ({
    type: exports.MOVE_BOARD_PIECE_COMMAND,
    payload: {
        pieceId: pieceId,
        from: from,
        to: to
    }
}); };
exports.lockBoard = function () { return ({ type: exports.LOCK_BOARD_COMMAND }); };
exports.unlockBoard = function () { return ({ type: exports.UNLOCK_BOARD_COMMAND }); };


/***/ }),

/***/ "../shared/lib/board/index.js":
/*!************************************!*\
  !*** ../shared/lib/board/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var state_1 = __webpack_require__(/*! ./state */ "../shared/lib/board/state.js");
__createBinding(exports, state_1, "reducer", "boardReducer");
exports.BoardCommands = __webpack_require__(/*! ./commands */ "../shared/lib/board/commands.js");
var mergeBoards_1 = __webpack_require__(/*! ./utils/mergeBoards */ "../shared/lib/board/utils/mergeBoards.js");
__createBinding(exports, mergeBoards_1, "mergeBoards");


/***/ }),

/***/ "../shared/lib/board/reducers/lockedReducer.js":
/*!*****************************************************!*\
  !*** ../shared/lib/board/reducers/lockedReducer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.locked = void 0;
var commands_1 = __webpack_require__(/*! ../commands */ "../shared/lib/board/commands.js");
var initialState = false;
var locked = function (state, command) {
    if (state === void 0) { state = initialState; }
    switch (command.type) {
        case commands_1.LOCK_BOARD_COMMAND:
            return true;
        case commands_1.UNLOCK_BOARD_COMMAND:
            return false;
        default:
            return state;
    }
};
exports.locked = locked;


/***/ }),

/***/ "../shared/lib/board/reducers/piecePositionsReducer.js":
/*!*************************************************************!*\
  !*** ../shared/lib/board/reducers/piecePositionsReducer.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.piecePositions = void 0;
var commands_1 = __webpack_require__(/*! ../commands */ "../shared/lib/board/commands.js");
var initialState = {};
var removePieceByIdList = function (state, ids) {
    return Object.entries(state).reduce(function (acc, _a) {
        var _b = __read(_a, 2), position = _b[0], pieceId = _b[1];
        // skip the desired piece
        if (ids.includes(pieceId)) {
            return acc;
        }
        acc[position] = pieceId;
        return acc;
    }, {});
};
var removePieceById = function (state, targetPieceId) { return removePieceByIdList(state, [targetPieceId]); };
var piecePositions = function (state, command) {
    var e_1, _a, _b, _c, _d;
    if (state === void 0) { state = initialState; }
    switch (command.type) {
        case commands_1.INITIALISE_BOARD_COMMAND:
            return Object.entries(command.payload.pieces)
                .reduce(function (acc, _a) {
                var _b = __read(_a, 2), pieceId = _b[0], piece = _b[1];
                acc[piece.position.x + "," + piece.position.y] = pieceId;
                return acc;
            }, {});
        case commands_1.UPDATE_BOARD_PIECES_COMMAND: {
            var pieces = command.payload.pieces;
            var newState = removePieceByIdList(state, pieces.map(function (p) { return p.id; }));
            try {
                for (var pieces_1 = __values(pieces), pieces_1_1 = pieces_1.next(); !pieces_1_1.done; pieces_1_1 = pieces_1.next()) {
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
        case commands_1.UPDATE_BOARD_PIECE_COMMAND: {
            var piece = command.payload.piece;
            var filtered = removePieceById(state, piece.id);
            return __assign(__assign({}, filtered), (_b = {}, _b[piece.position.x + "," + piece.position.y] = piece.id, _b));
        }
        case commands_1.REMOVE_BOARD_PIECE_COMMAND:
            return removePieceById(state, command.payload.pieceId);
        case commands_1.REMOVE_BOARD_PIECES_COMMAND:
            return removePieceByIdList(state, command.payload.pieceIds);
        case commands_1.ADD_BOARD_PIECE_COMMAND: {
            var _e = command.payload, x = _e.x, y = _e.y, piece = _e.piece;
            return __assign(__assign({}, state), (_c = {}, _c[x + "," + y] = piece.id, _c));
        }
        case commands_1.MOVE_BOARD_PIECE_COMMAND: {
            var _f = command.payload, pieceId = _f.pieceId, from = _f.from, to = _f.to;
            var fromString = from.x + "," + from.y;
            var toString_1 = to.x + "," + to.y;
            // safety check
            if (state[fromString] !== pieceId) {
                return state;
            }
            return __assign(__assign({}, state), (_d = {}, _d[fromString] = null, _d[toString_1] = pieceId, _d));
        }
        default:
            return state;
    }
};
exports.piecePositions = piecePositions;


/***/ }),

/***/ "../shared/lib/board/reducers/piecesReducer.js":
/*!*****************************************************!*\
  !*** ../shared/lib/board/reducers/piecesReducer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.pieces = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var commands_1 = __webpack_require__(/*! ../commands */ "../shared/lib/board/commands.js");
var initialState = {};
var removePieceByIdList = function (state, pieceIds) {
    var e_1, _a;
    var newState = __assign({}, state);
    try {
        for (var pieceIds_1 = __values(pieceIds), pieceIds_1_1 = pieceIds_1.next(); !pieceIds_1_1.done; pieceIds_1_1 = pieceIds_1.next()) {
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
var pieces = function (state, command) {
    var _a, e_2, _b, _c, _d;
    if (state === void 0) { state = initialState; }
    switch (command.type) {
        case commands_1.INITIALISE_BOARD_COMMAND: {
            return __assign({}, command.payload.pieces);
        }
        case commands_1.UPDATE_BOARD_PIECE_COMMAND: {
            var piece = command.payload.piece;
            return __assign(__assign({}, state), (_a = {}, _a[piece.id] = piece, _a));
        }
        case commands_1.UPDATE_BOARD_PIECES_COMMAND: {
            var newState = __assign({}, state);
            try {
                for (var _e = __values(command.payload.pieces), _f = _e.next(); !_f.done; _f = _e.next()) {
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
        case commands_1.REMOVE_BOARD_PIECE_COMMAND:
            return removePieceByIdList(state, [command.payload.pieceId]);
        case commands_1.REMOVE_BOARD_PIECES_COMMAND:
            return removePieceByIdList(state, command.payload.pieceIds);
        case commands_1.ADD_BOARD_PIECE_COMMAND: {
            var _g = command.payload, piece = _g.piece, x = _g.x, y = _g.y;
            return __assign(__assign({}, state), (_c = {}, _c[piece.id] = __assign(__assign({}, piece), { position: models_1.createTileCoordinates(x, y), facingAway: true }), _c));
        }
        case commands_1.MOVE_BOARD_PIECE_COMMAND: {
            var _h = command.payload, pieceId = _h.pieceId, from = _h.from, to = _h.to;
            var piece = state[pieceId];
            // safety catch
            if (!piece || !piece.position || piece.id !== pieceId || piece.position.x !== from.x || piece.position.y !== from.y) {
                return state;
            }
            return __assign(__assign({}, state), (_d = {}, _d[piece.id] = __assign(__assign({}, piece), { position: {
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

/***/ "../shared/lib/board/state.js":
/*!************************************!*\
  !*** ../shared/lib/board/state.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.reducer = void 0;
var redux_1 = __webpack_require__(/*! redux */ "../shared/node_modules/redux/es/redux.js");
var piecesReducer_1 = __webpack_require__(/*! ./reducers/piecesReducer */ "../shared/lib/board/reducers/piecesReducer.js");
var piecePositionsReducer_1 = __webpack_require__(/*! ./reducers/piecePositionsReducer */ "../shared/lib/board/reducers/piecePositionsReducer.js");
var lockedReducer_1 = __webpack_require__(/*! ./reducers/lockedReducer */ "../shared/lib/board/reducers/lockedReducer.js");
var reducer = redux_1.combineReducers({
    pieces: piecesReducer_1.pieces,
    piecePositions: piecePositionsReducer_1.piecePositions,
    locked: lockedReducer_1.locked
});
exports.reducer = reducer;


/***/ }),

/***/ "../shared/lib/board/utils/mergeBoards.js":
/*!************************************************!*\
  !*** ../shared/lib/board/utils/mergeBoards.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.mergeBoards = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var rotateGridPosition = function (gridSize, position) {
    return models_1.createTileCoordinates(gridSize.width - 1 - position.x, gridSize.height - 1 - position.y);
};
var transformAwayPieces = function (gridSize, pieces) {
    return Object.entries(pieces).reduce(function (acc, _a) {
        // it's not too bad to mutate `acc` here, because we're creating it as an empty object in this reduce call
        var _b = __read(_a, 2), pieceId = _b[0], piece = _b[1];
        acc[pieceId] = __assign(__assign({}, piece), { facingAway: false, position: rotateGridPosition(gridSize, piece.position) });
        return acc;
    }, {});
};
exports.mergeBoards = function (gridSize, home, away) {
    var transformedAway = transformAwayPieces(gridSize, away);
    return __assign(__assign({}, home), transformedAway);
};


/***/ }),

/***/ "../shared/lib/game/cardDeck.js":
/*!**************************************!*\
  !*** ../shared/lib/game/cardDeck.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.CardDeck = void 0;
var uuid_1 = __webpack_require__(/*! uuid */ "../shared/node_modules/uuid/dist/esm-browser/index.js");
var shuffle = __webpack_require__(/*! lodash.shuffle */ "../shared/node_modules/lodash.shuffle/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
// CARD_COST_CHANCES[2][5] gives the chance (/100) to roll a level 3 piece at level 6
var CARD_COST_CHANCES = [
    [100, 70, 60, 50, 40, 33, 30, 24, 22, 19],
    [0, 30, 35, 35, 35, 30, 30, 30, 30, 25],
    [0, 0, 5, 15, 23, 30, 30, 30, 25, 25],
    [0, 0, 0, 2, 5, 9, 12, 16, 20, 25],
    [0, 0, 0, 0, 1, 3, 5, 7, 10, 14]
];
var CARD_LEVEL_QUANTITIES = [45, 30, 25, 15, 10];
var canTakeCardAtCost = function (level, cost) {
    var chance = CARD_COST_CHANCES[cost - 1][level - 1];
    if (!chance) {
        return false;
    }
    var roll = Math.floor(Math.random() * 100);
    // roll is 0 - 100, but chance is out of 100
    // so if chance is 30, roll must be under 30 to score
    return roll <= chance;
};
var CardDeck = /** @class */ (function () {
    function CardDeck(definitions) {
        var _this = this;
        this.definitions = definitions;
        this.deck = [
            [], [], [], [], []
        ];
        this.definitions.filter(function (d) { return d.cost; }).forEach(function (d) {
            for (var count = 0; count < CARD_LEVEL_QUANTITIES[d.cost - 1]; count++) {
                _this.addDefinition(d);
            }
        });
        this.shuffle();
    }
    CardDeck.prototype.reroll = function (input, level, count) {
        this.addCards(input);
        this.shuffle();
        return this.take(level, count);
    };
    CardDeck.prototype.take = function (level, count) {
        var output = [];
        for (var i = 0; i < count; i++) {
            output.push(this.takeCard(level));
        }
        return output;
    };
    CardDeck.prototype.addCards = function (cards) {
        var e_1, _a;
        var cardsToAdd = cards.filter(function (card) { return card !== null; });
        try {
            for (var cardsToAdd_1 = __values(cardsToAdd), cardsToAdd_1_1 = cardsToAdd_1.next(); !cardsToAdd_1_1.done; cardsToAdd_1_1 = cardsToAdd_1.next()) {
                var card = cardsToAdd_1_1.value;
                this.getDeckForCost(card.cost).push(card);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cardsToAdd_1_1 && !cardsToAdd_1_1.done && (_a = cardsToAdd_1["return"])) _a.call(cardsToAdd_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.shuffle();
    };
    CardDeck.prototype.addPiece = function (piece) {
        var definition = this.definitions.find(function (p) { return p.id === piece.definitionId; });
        var cardCount = (piece.stage + 1) * models_1.PIECES_TO_EVOLVE;
        for (var i = 0; i < cardCount; i++) {
            this.addDefinition(definition);
        }
        this.shuffle();
    };
    CardDeck.prototype.addPieces = function (pieces) {
        var e_2, _a;
        try {
            for (var pieces_1 = __values(pieces), pieces_1_1 = pieces_1.next(); !pieces_1_1.done; pieces_1_1 = pieces_1.next()) {
                var piece = pieces_1_1.value;
                this.addPiece(piece);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (pieces_1_1 && !pieces_1_1.done && (_a = pieces_1["return"])) _a.call(pieces_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    CardDeck.prototype.shuffle = function () {
        for (var i = 0; i < this.deck.length; i++) {
            this.deck[i] = shuffle(this.deck[i]);
        }
    };
    CardDeck.prototype.getDeckForCost = function (cost) {
        return this.deck[cost - 1];
    };
    CardDeck.prototype.takeCard = function (level) {
        // start at 5 and work downwards
        for (var cost = CARD_COST_CHANCES.length; cost >= 1; cost--) {
            var roll = canTakeCardAtCost(level, cost);
            if (!roll) {
                continue;
            }
            var card = this.getDeckForCost(cost).pop();
            if (card) {
                return card;
            }
        }
        // otherwise go back up and give them the first existing card
        for (var cost = 1; cost <= CARD_COST_CHANCES.length; cost++) {
            var card = this.getDeckForCost(cost).pop();
            if (card) {
                return card;
            }
        }
        return null;
    };
    CardDeck.prototype.addDefinition = function (definition) {
        var card = {
            id: uuid_1.v4(),
            definitionId: definition.id,
            cost: definition.cost,
            name: definition.name
        };
        this.getDeckForCost(definition.cost).push(card);
    };
    return CardDeck;
}());
exports.CardDeck = CardDeck;


/***/ }),

/***/ "../shared/lib/game/definitions/definitionClass.js":
/*!*********************************************************!*\
  !*** ../shared/lib/game/definitions/definitionClass.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
exports.__esModule = true;
exports.getStages = exports.classBuilds = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
// each class has points to assign
// these are then used, along with piece cost and stage, to get stats
// the decimals here indicate how the points are assigned for each class
exports.classBuilds = (_a = {},
    _a[models_1.DefinitionClass.VALIANT] = {
        hp: 0.4,
        attack: 0.2,
        defense: 0.3,
        speed: 0.2
    },
    _a[models_1.DefinitionClass.ARCANE] = {
        hp: 0.2,
        attack: 0.4,
        defense: 0.2,
        speed: 0.3
    },
    _a[models_1.DefinitionClass.CUNNING] = {
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
    var attackType = (definitionClass === models_1.DefinitionClass.ARCANE
        ? models_1.attackTypes.shoot
        : models_1.attackTypes.basic);
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

/***/ "../shared/lib/game/definitions/definitionProvider.js":
/*!************************************************************!*\
  !*** ../shared/lib/game/definitions/definitionProvider.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.DefinitionProvider = void 0;
var definitions_1 = __webpack_require__(/*! ./definitions */ "../shared/lib/game/definitions/definitions.js");
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

/***/ "../shared/lib/game/definitions/definitions.js":
/*!*****************************************************!*\
  !*** ../shared/lib/game/definitions/definitions.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.definitions = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var definitionClass_1 = __webpack_require__(/*! ./definitionClass */ "../shared/lib/game/definitions/definitionClass.js");
var createDefinition = function (id, name, type, definitionClass, cost) { return ({
    id: id,
    name: name,
    type: type,
    "class": definitionClass,
    cost: cost,
    stages: definitionClass_1.getStages(definitionClass, cost)
}); };
exports.definitions = [
    createDefinition(1, "Budaye", models_1.CreatureType.Wood, models_1.DefinitionClass.VALIANT, 1),
    createDefinition(2, "Anoleaf", models_1.CreatureType.Wood, models_1.DefinitionClass.CUNNING, 1),
    createDefinition(3, "Rockitten", models_1.CreatureType.Earth, models_1.DefinitionClass.VALIANT, 1),
    createDefinition(4, "Aardorn", models_1.CreatureType.Earth, models_1.DefinitionClass.CUNNING, 1),
    createDefinition(5, "Nut", models_1.CreatureType.Metal, models_1.DefinitionClass.VALIANT, 1),
    createDefinition(6, "Puparmor", models_1.CreatureType.Metal, models_1.DefinitionClass.VALIANT, 1),
    createDefinition(7, "Embra", models_1.CreatureType.Fire, models_1.DefinitionClass.ARCANE, 1),
    createDefinition(8, "Tweesher", models_1.CreatureType.Water, models_1.DefinitionClass.ARCANE, 1),
    createDefinition(9, "Bamboon", models_1.CreatureType.Wood, models_1.DefinitionClass.VALIANT, 2),
    createDefinition(10, "Chenipode", models_1.CreatureType.Earth, models_1.DefinitionClass.CUNNING, 2),
    createDefinition(11, "Bolt", models_1.CreatureType.Metal, models_1.DefinitionClass.VALIANT, 2),
    createDefinition(12, "Weavifly", models_1.CreatureType.Metal, models_1.DefinitionClass.ARCANE, 2),
    createDefinition(13, "Cardiling", models_1.CreatureType.Fire, models_1.DefinitionClass.CUNNING, 2),
    createDefinition(14, "Agnite", models_1.CreatureType.Fire, models_1.DefinitionClass.VALIANT, 2),
    createDefinition(15, "Elowind", models_1.CreatureType.Water, models_1.DefinitionClass.ARCANE, 2),
    createDefinition(16, "Fluttaflap", models_1.CreatureType.Water, models_1.DefinitionClass.VALIANT, 2),
    createDefinition(17, "Velocitile", models_1.CreatureType.Wood, models_1.DefinitionClass.CUNNING, 3),
    createDefinition(18, "Sapsnap", models_1.CreatureType.Wood, models_1.DefinitionClass.VALIANT, 3),
    createDefinition(19, "Rockat", models_1.CreatureType.Earth, models_1.DefinitionClass.CUNNING, 3),
    createDefinition(20, "Grintot", models_1.CreatureType.Earth, models_1.DefinitionClass.VALIANT, 3),
    createDefinition(21, "Propellorcat", models_1.CreatureType.Metal, models_1.DefinitionClass.CUNNING, 3),
    createDefinition(22, "Sumchon", models_1.CreatureType.Metal, models_1.DefinitionClass.VALIANT, 3),
    createDefinition(23, "Ignibus", models_1.CreatureType.Fire, models_1.DefinitionClass.VALIANT, 3),
    createDefinition(24, "Ruption", models_1.CreatureType.Fire, models_1.DefinitionClass.ARCANE, 3),
    createDefinition(25, "Noctalo", models_1.CreatureType.Water, models_1.DefinitionClass.CUNNING, 3),
    createDefinition(26, "Lightmare", models_1.CreatureType.Water, models_1.DefinitionClass.VALIANT, 3),
    createDefinition(27, "Narcileaf", models_1.CreatureType.Wood, models_1.DefinitionClass.ARCANE, 4),
    createDefinition(28, "Coleorus", models_1.CreatureType.Wood, models_1.DefinitionClass.CUNNING, 4),
    createDefinition(29, "Aardart", models_1.CreatureType.Earth, models_1.DefinitionClass.CUNNING, 4),
    createDefinition(30, "Hubursa", models_1.CreatureType.Earth, models_1.DefinitionClass.ARCANE, 4),
    createDefinition(31, "Sampsack", models_1.CreatureType.Metal, models_1.DefinitionClass.VALIANT, 4),
    createDefinition(32, "Cairfrey", models_1.CreatureType.Metal, models_1.DefinitionClass.ARCANE, 4),
    createDefinition(33, "Prophetoise", models_1.CreatureType.Fire, models_1.DefinitionClass.ARCANE, 4),
    createDefinition(34, "Tikorch", models_1.CreatureType.Fire, models_1.DefinitionClass.CUNNING, 4),
    createDefinition(35, "Nudimind", models_1.CreatureType.Water, models_1.DefinitionClass.ARCANE, 4),
    createDefinition(36, "Dollfin", models_1.CreatureType.Water, models_1.DefinitionClass.VALIANT, 4),
    createDefinition(37, "Arbelder", models_1.CreatureType.Wood, models_1.DefinitionClass.VALIANT, 5),
    createDefinition(38, "Viviphyta", models_1.CreatureType.Wood, models_1.DefinitionClass.CUNNING, 5),
    createDefinition(39, "Grintrock", models_1.CreatureType.Earth, models_1.DefinitionClass.VALIANT, 5),
    createDefinition(40, "Jemuar", models_1.CreatureType.Earth, models_1.DefinitionClass.CUNNING, 5),
    createDefinition(41, "Pyraminx", models_1.CreatureType.Metal, models_1.DefinitionClass.VALIANT, 5),
    createDefinition(42, "AV8R", models_1.CreatureType.Metal, models_1.DefinitionClass.CUNNING, 5),
    createDefinition(43, "Agnigon", models_1.CreatureType.Fire, models_1.DefinitionClass.VALIANT, 5),
    createDefinition(44, "Cardinale", models_1.CreatureType.Fire, models_1.DefinitionClass.CUNNING, 5),
    createDefinition(45, "Nudikill", models_1.CreatureType.Water, models_1.DefinitionClass.VALIANT, 5),
    createDefinition(46, "Eaglace", models_1.CreatureType.Water, models_1.DefinitionClass.CUNNING, 5)
];


/***/ }),

/***/ "../shared/lib/game/game.js":
/*!**********************************!*\
  !*** ../shared/lib/game/game.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.Game = void 0;
var uuid_1 = __webpack_require__(/*! uuid */ "../shared/node_modules/uuid/dist/esm-browser/index.js");
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var delay_1 = __webpack_require__(/*! delay */ "../shared/node_modules/delay/index.js");
var pDefer = __webpack_require__(/*! p-defer */ "../shared/node_modules/p-defer/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var log_1 = __webpack_require__(/*! ../log */ "../shared/lib/log.js");
var definitionProvider_1 = __webpack_require__(/*! ./definitions/definitionProvider */ "../shared/lib/game/definitions/definitionProvider.js");
var opponentProvider_1 = __webpack_require__(/*! ./opponentProvider */ "../shared/lib/game/opponentProvider.js");
var playerList_1 = __webpack_require__(/*! ./playerList */ "../shared/lib/game/playerList.js");
var store_1 = __webpack_require__(/*! ./store */ "../shared/lib/game/store/index.js");
var options_1 = __webpack_require__(/*! ./options */ "../shared/lib/game/options.js");
var readyNotifier_1 = __webpack_require__(/*! ./readyNotifier */ "../shared/lib/game/readyNotifier.js");
var match_1 = __webpack_require__(/*! ./match */ "../shared/lib/game/match/index.js");
var cardDeck_1 = __webpack_require__(/*! ./cardDeck */ "../shared/lib/game/cardDeck.js");
var events_2 = __webpack_require__(/*! ./store/events */ "../shared/lib/game/store/events.js");
var startStopwatch = function () { return process.hrtime(); };
var stopwatch = function (start) {
    var end = process.hrtime(start);
    return Math.round((end[0] * 1000) + (end[1] / 1000000));
};
var finishGameEventKey = "FINISH_GAME";
var Game = /** @class */ (function () {
    function Game(players, options) {
        var _this = this;
        this.lastLivingPlayerCount = 0;
        this.opponentProvider = new opponentProvider_1.OpponentProvider();
        this.playerList = new playerList_1.PlayerList();
        this.definitionProvider = new definitionProvider_1.DefinitionProvider();
        this.players = [];
        this.events = new events_1.EventEmitter();
        this.store = store_1.createGameStore();
        this.addPlayer = function (player) {
            _this.players.push(player);
            _this.playerList.addPlayer(player);
            player.setDeck(_this.deck);
            player.setGetGameState(_this.store.getState);
            player.setGetPlayerListPlayers(_this.playerList.getValue);
            player.setDefinitionProvider(_this.definitionProvider);
        };
        this.onPlayerListUpdate = function (playerList) {
            _this.dispatchPublicGameEvent(events_2.playerListChangedEvent(playerList));
        };
        this.startGame = function () { return __awaiter(_this, void 0, void 0, function () {
            var startTime, duration, winner, event, gamePlayers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.store.getState().phase !== null) {
                            return [2 /*return*/];
                        }
                        startTime = startStopwatch();
                        _a.label = 1;
                    case 1:
                        if (false) {}
                        return [4 /*yield*/, this.runPreparingPhase()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.runReadyPhase()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.runPlayingPhase()];
                    case 4:
                        _a.sent();
                        if (this.getLivingPlayers().length === 1) {
                            return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 1];
                    case 5:
                        duration = stopwatch(startTime);
                        log_1.log("Match complete in " + (duration) + " ms (" + this.store.getState().round + " rounds)");
                        // teardown
                        this.opponentProvider = null;
                        this.deck = null;
                        this.playerList.deconstructor();
                        this.playerList = null;
                        this.definitionProvider = null;
                        winner = this.getLivingPlayers()[0];
                        event = events_2.gameFinishEvent(winner.name);
                        this.players.filter(function (p) { return p.getStatus() !== models_1.PlayerStatus.QUIT; }).forEach(function (p) { return p.receiveGameEvent(event); });
                        gamePlayers = this.players.map(function (p) { return ({
                            id: p.id,
                            name: p.name
                        }); });
                        this.events.emit(finishGameEventKey, winner, gamePlayers);
                        // more teardown
                        this.events.removeAllListeners();
                        this.events = null;
                        return [2 /*return*/];
                }
            });
        }); };
        this.getLivingPlayers = function () { return _this.players.filter(function (p) { return p.getStatus() !== models_1.PlayerStatus.QUIT && p.isAlive(); }); };
        this.delayPhaseLength = function (phase) { return delay_1["default"](_this.options.phaseLengths[phase] * 1000); };
        this.id = uuid_1.v4();
        this.options = options_1.getOptions(options);
        this.deck = new cardDeck_1.CardDeck(this.definitionProvider.getAll());
        this.playerList.onUpdate(this.onPlayerListUpdate);
        players.forEach(this.addPlayer);
        this.updateOpponentProvider();
        // execute at the end of the execution queue
        setTimeout(this.startGame);
    }
    Game.prototype.onFinish = function (fn) {
        this.events.on(finishGameEventKey, fn);
    };
    Game.prototype.getPlayerById = function (playerId) {
        return this.players.find(function (p) { return p.getStatus() !== models_1.PlayerStatus.QUIT && p.id === playerId; });
    };
    Game.prototype.getPlayerList = function () {
        return this.playerList.getValue();
    };
    Game.prototype.dispatchPublicGameEvent = function (event) {
        this.store.dispatch(event);
        this.players.filter(function (p) { return p.getStatus() === models_1.PlayerStatus.CONNECTED; })
            .forEach(function (p) { return p.receiveGameEvent(event); });
    };
    Game.prototype.runPreparingPhase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var livingPlayers, notifier, round;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        livingPlayers = this.getLivingPlayers();
                        livingPlayers.forEach(function (p) { return p.enterPreparingPhase(); });
                        notifier = readyNotifier_1.readyNotifier(livingPlayers);
                        round = this.store.getState().round;
                        this.dispatchPublicGameEvent(store_1.GameEvents.gamePhaseStartedEvent(models_1.GamePhase.PREPARING, Date.now() / 1000, round + 1));
                        return [4 /*yield*/, Promise.race([
                                notifier.promise,
                                this.delayPhaseLength(models_1.GamePhase.PREPARING)
                            ])];
                    case 1:
                        _a.sent();
                        notifier.dispose();
                        this.getLivingPlayers().forEach(function (p) { return p.fillBoard(); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.runReadyPhase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.updateOpponentProvider();
                        this.getLivingPlayers().forEach(function (player) {
                            var opponent = _this.opponentProvider.getOpponent(player.id);
                            var match = new match_1.Match(player, opponent, _this.options);
                            player.enterReadyPhase(match);
                        });
                        this.opponentProvider.updateRotation();
                        this.dispatchPublicGameEvent(store_1.GameEvents.gamePhaseStartedEvent(models_1.GamePhase.READY, Date.now() / 1000));
                        return [4 /*yield*/, this.delayPhaseLength(models_1.GamePhase.READY)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.runPlayingPhase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var battleTimeoutDeferred, _a, round, newPhaseStartedAt, promises, justDiedPlayers, justDiedPlayers_1, justDiedPlayers_1_1, player, justDiedPlayerIds, event_1, _b, _c, player, _d, _e, player;
            var e_1, _f, e_2, _g, e_3, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        battleTimeoutDeferred = pDefer();
                        this.delayPhaseLength(models_1.GamePhase.PLAYING).then(function () { return battleTimeoutDeferred.resolve(); });
                        _a = this.store.getState(), round = _a.round, newPhaseStartedAt = _a.phaseStartedAtSeconds;
                        promises = this.getLivingPlayers().map(function (p) { return p.fightMatch(newPhaseStartedAt, battleTimeoutDeferred); });
                        this.dispatchPublicGameEvent(store_1.GameEvents.gamePhaseStartedEvent(models_1.GamePhase.PLAYING, Date.now() / 1000));
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _j.sent();
                        if (this.getLivingPlayers().length === 0) {
                            justDiedPlayers = this.players.filter(function (p) { return p.getStatus() !== models_1.PlayerStatus.QUIT && p.getRoundDiedAt() === round; });
                            try {
                                for (justDiedPlayers_1 = __values(justDiedPlayers), justDiedPlayers_1_1 = justDiedPlayers_1.next(); !justDiedPlayers_1_1.done; justDiedPlayers_1_1 = justDiedPlayers_1.next()) {
                                    player = justDiedPlayers_1_1.value;
                                    player.resurrect(models_1.RESURRECT_HEALTH);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (justDiedPlayers_1_1 && !justDiedPlayers_1_1.done && (_f = justDiedPlayers_1["return"])) _f.call(justDiedPlayers_1);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            justDiedPlayerIds = justDiedPlayers.map(function (p) { return p.id; });
                            event_1 = events_2.playersResurrectedEvent(justDiedPlayerIds);
                            try {
                                for (_b = __values(this.players), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    player = _c.value;
                                    player.receiveGameEvent(event_1);
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_g = _b["return"])) _g.call(_b);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        try {
                            for (_d = __values(this.players.filter(function (p) { return p.getStatus() !== models_1.PlayerStatus.QUIT && p.getRoundDiedAt() === round; })), _e = _d.next(); !_e.done; _e = _d.next()) {
                                player = _e.value;
                                player.kill();
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_e && !_e.done && (_h = _d["return"])) _h.call(_d);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        // some battles go right up to the end, so it's nice to have a delay
                        // rather than jumping straight into the next phase
                        return [4 /*yield*/, delay_1["default"](3000)];
                    case 2:
                        // some battles go right up to the end, so it's nice to have a delay
                        // rather than jumping straight into the next phase
                        _j.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.updateOpponentProvider = function () {
        var livingPlayers = this.getLivingPlayers();
        var livingPlayerCount = livingPlayers.length;
        if (livingPlayerCount !== this.lastLivingPlayerCount) {
            this.opponentProvider.setPlayers(livingPlayers);
            this.lastLivingPlayerCount = livingPlayerCount;
        }
    };
    return Game;
}());
exports.Game = Game;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../app/node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "../shared/lib/game/index.js":
/*!***********************************!*\
  !*** ../shared/lib/game/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var game_1 = __webpack_require__(/*! ./game */ "../shared/lib/game/game.js");
__createBinding(exports, game_1, "Game");
var player_1 = __webpack_require__(/*! ./player */ "../shared/lib/game/player/index.js");
__createBinding(exports, player_1, "Player");
__createBinding(exports, player_1, "PlayerActions");
__createBinding(exports, player_1, "PlayerEvents");
__createBinding(exports, player_1, "PlayerSagas");
__createBinding(exports, player_1, "PlayerActionSagas");
var pieceSelectors_1 = __webpack_require__(/*! ./player/pieceSelectors */ "../shared/lib/game/player/pieceSelectors.js");
__createBinding(exports, pieceSelectors_1, "getPiece");
__createBinding(exports, pieceSelectors_1, "getAllPieces");
__createBinding(exports, pieceSelectors_1, "getBoardPieceForPosition");
var playerSelectors_1 = __webpack_require__(/*! ./player/playerSelectors */ "../shared/lib/game/player/playerSelectors.js");
__createBinding(exports, playerSelectors_1, "getPlayerLevel");
__createBinding(exports, playerSelectors_1, "getPlayerMoney");
__createBinding(exports, playerSelectors_1, "getOpponentId");
__createBinding(exports, playerSelectors_1, "getPlayerXp");
__createBinding(exports, playerSelectors_1, "isPlayerAlive");
var can_drop_piece_1 = __webpack_require__(/*! ./player/can-drop-piece */ "../shared/lib/game/player/can-drop-piece.js");
__createBinding(exports, can_drop_piece_1, "canDropPiece");
var playerInfo_1 = __webpack_require__(/*! ./player/playerInfo */ "../shared/lib/game/player/playerInfo/index.js");
__createBinding(exports, playerInfo_1, "PlayerInfoCommands");
__createBinding(exports, playerInfo_1, "playerInfoReducer");
var bench_1 = __webpack_require__(/*! ./player/bench */ "../shared/lib/game/player/bench/index.js");
__createBinding(exports, bench_1, "benchReducer");
__createBinding(exports, bench_1, "BenchCommands");
var store_1 = __webpack_require__(/*! ./player/store */ "../shared/lib/game/player/store.js");
__createBinding(exports, store_1, "createPlayerStore");
var store_2 = __webpack_require__(/*! ./store */ "../shared/lib/game/store/index.js");
__createBinding(exports, store_2, "gameReducer");
__createBinding(exports, store_2, "GameEvents");
var match_1 = __webpack_require__(/*! ./match */ "../shared/lib/game/match/index.js");
__createBinding(exports, match_1, "BATTLE_FINISH_EVENT");
__createBinding(exports, match_1, "battleSaga");
__createBinding(exports, match_1, "startBattle");
var definitionProvider_1 = __webpack_require__(/*! ./definitions/definitionProvider */ "../shared/lib/game/definitions/definitionProvider.js");
__createBinding(exports, definitionProvider_1, "DefinitionProvider");
var options_1 = __webpack_require__(/*! ./options */ "../shared/lib/game/options.js");
__createBinding(exports, options_1, "defaultOptions", "defaultGameOptions");
var match_2 = __webpack_require__(/*! ./match */ "../shared/lib/game/match/index.js");
__createBinding(exports, match_2, "Match");


/***/ }),

/***/ "../shared/lib/game/match/combat/battleSaga.js":
/*!*****************************************************!*\
  !*** ../shared/lib/game/match/combat/battleSaga.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.battleSaga = exports.startBattle = exports.BATTLE_FINISH_EVENT = exports.BATTLE_TURN_EVENT = void 0;
var present = __webpack_require__(/*! present */ "../shared/node_modules/present/lib/present-browser.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "../shared/node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var utils_1 = __webpack_require__(/*! ../../../utils */ "../shared/lib/utils/index.js");
var board_1 = __webpack_require__(/*! ../../../board */ "../shared/lib/board/index.js");
var turnSimulator_1 = __webpack_require__(/*! ./turnSimulator */ "../shared/lib/game/match/combat/turnSimulator.js");
exports.BATTLE_TURN_EVENT = "BATTLE_TURN_EVENT";
exports.BATTLE_FINISH_EVENT = "BATTLE_FINISH_EVENT";
var battleTurnEvent = function (turn) { return ({ type: exports.BATTLE_TURN_EVENT, payload: { turn: turn } }); };
var battleFinishEvent = function (turns) { return ({ type: exports.BATTLE_FINISH_EVENT, payload: { turns: turns } }); };
var START_BATTLE = "START_BATTLE";
exports.startBattle = function (turn) { return ({ type: START_BATTLE, payload: { turn: turn } }); };
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
var addCombatState = function (pieces) {
    return Object.entries(pieces)
        .reduce(function (acc, _a) {
        var _b = __read(_a, 2), pieceId = _b[0], piece = _b[1];
        acc[pieceId] = __assign(__assign({}, piece), { combat: models_1.createPieceCombatState() });
        return acc;
    }, {});
};
var battleEventChannel = function (startingBoardState, startingTurn, options, bufferSize) {
    return redux_saga_1.eventChannel(function (emit) {
        var cancelled = false;
        var board = {
            pieces: addCombatState(startingBoardState.pieces),
            piecePositions: __assign({}, startingBoardState.piecePositions),
            locked: startingBoardState.locked
        };
        var run = function () { return __awaiter(void 0, void 0, void 0, function () {
            var turnCount, shouldStop, turnTimer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        turnCount = startingTurn;
                        _a.label = 1;
                    case 1:
                        if (false) {}
                        shouldStop = (cancelled
                            || turnCount >= options.turnCount
                            || utils_1.isATeamDefeated(board));
                        if (shouldStop) {
                            emit(battleFinishEvent(turnCount));
                            return [3 /*break*/, 3];
                        }
                        turnTimer = duration(options.turnDuration);
                        board = turnSimulator_1.simulateTurn(++turnCount, board);
                        emit(battleTurnEvent(turnCount));
                        emit(board_1.BoardCommands.initialiseBoard(board.pieces));
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
exports.battleSaga = function (gameOptions) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(START_BATTLE, function (_a) {
                    var board, battleChannel;
                    var turn = _a.payload.turn;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, effects_1.select(function (state) { return state.board; })];
                            case 1:
                                board = _b.sent();
                                return [4 /*yield*/, effects_1.call(battleEventChannel, board, turn || 0, gameOptions, 100)];
                            case 2:
                                battleChannel = _b.sent();
                                return [4 /*yield*/, effects_1.takeEvery(battleChannel, function (battleAction) {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, effects_1.put(battleAction)];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    })];
                            case 3:
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


/***/ }),

/***/ "../shared/lib/game/match/combat/index.js":
/*!************************************************!*\
  !*** ../shared/lib/game/match/combat/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var battleSaga_1 = __webpack_require__(/*! ./battleSaga */ "../shared/lib/game/match/combat/battleSaga.js");
__createBinding(exports, battleSaga_1, "battleSaga");
__createBinding(exports, battleSaga_1, "startBattle");
__createBinding(exports, battleSaga_1, "BATTLE_FINISH_EVENT");
__createBinding(exports, battleSaga_1, "BATTLE_TURN_EVENT");


/***/ }),

/***/ "../shared/lib/game/match/combat/pathfinding.js":
/*!******************************************************!*\
  !*** ../shared/lib/game/match/combat/pathfinding.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.getNextPiecePosition = void 0;
var javascript_astar_1 = __webpack_require__(/*! javascript-astar */ "../shared/node_modules/javascript-astar/astar.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var getTargetAttackPositions_1 = __webpack_require__(/*! ./utils/getTargetAttackPositions */ "../shared/lib/game/match/combat/utils/getTargetAttackPositions.js");
var createEmptyWeightGrid = function () {
    var grid = [];
    // todo this is a weird way round
    for (var x = 0; x < models_1.GRID_SIZE.width; x++) {
        var column = [];
        for (var y = 0; y < models_1.GRID_SIZE.height; y++) {
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
        var _b = __read(_a, 2), position = _b[0], pieceId = _b[1];
        var _c = __read(position.split(","), 2), x = _c[0], y = _c[1];
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
exports.getNextPiecePosition = function (attacker, attackerStats, target, board) {
    var attackRange = attackerStats.attackType.range;
    var targetTiles = getTargetAttackPositions_1.getTargetAttackPositions(target, attackRange);
    var paths = targetTiles.map(function (pos) { return findPath(board, attacker.position, pos); }).filter(function (path) { return path !== null; });
    if (paths.length === 0) {
        return null;
    }
    paths.sort(function (a, b) { return a.stepCount - b.stepCount; });
    return paths[0].firstStep;
};


/***/ }),

/***/ "../shared/lib/game/match/combat/turnSimulator.js":
/*!********************************************************!*\
  !*** ../shared/lib/game/match/combat/turnSimulator.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.simulateTurn = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var board_1 = __webpack_require__(/*! ../../../board */ "../shared/lib/board/index.js");
var piece_utils_1 = __webpack_require__(/*! ../../../utils/piece-utils */ "../shared/lib/utils/piece-utils.js");
var get_type_attack_bonus_1 = __webpack_require__(/*! ../../../utils/get-type-attack-bonus */ "../shared/lib/utils/get-type-attack-bonus.js");
var inAttackRange_1 = __webpack_require__(/*! ./utils/inAttackRange */ "../shared/lib/game/match/combat/utils/inAttackRange.js");
var findTargetId_1 = __webpack_require__(/*! ./utils/findTargetId */ "../shared/lib/game/match/combat/utils/findTargetId.js");
var pathfinding_1 = __webpack_require__(/*! ./pathfinding */ "../shared/lib/game/match/combat/pathfinding.js");
var DYING_DURATION = 10;
var ATTACK_TURN_DURATION = 2;
var MOVE_TURN_DURATION = 2;
// todo tune this
var getCooldownForSpeed = function (speed) { return (180 - speed) / 24; };
var STRONG_ATTACK_MODIFIER = 1.7;
var WEAK_ATTACK_MODIFIER = 0.3;
exports.simulateTurn = function (currentTurn, board) {
    var pieceEntries = Object.entries(board.pieces);
    pieceEntries.sort(function (_a, _b) {
        var _c = __read(_a, 2), aPiece = _c[1];
        var _d = __read(_b, 2), bPiece = _d[1];
        var aStats = piece_utils_1.getStats(aPiece);
        var bStats = piece_utils_1.getStats(bPiece);
        return bStats.speed - aStats.speed;
    });
    return pieceEntries.reduce(function (b, _a) {
        var _b = __read(_a, 1), pieceId = _b[0];
        return takePieceTurn(currentTurn, pieceId, b);
    }, board);
};
var takePieceTurn = function (currentTurn, pieceId, board) {
    // create a new piece object, reset combat properties
    var attacker = __assign(__assign({}, board.pieces[pieceId]), { attacking: null, hit: null });
    var attackerStats = piece_utils_1.getStats(attacker);
    var _a = attacker.combat, attackerTargetId = _a.targetId, attackerBoardState = _a.board;
    // board management
    if (attackerBoardState.removeFromBoardAtTurn === currentTurn) {
        return board_1.boardReducer(board, board_1.BoardCommands.removeBoardPiece(pieceId));
    }
    if (attacker.currentHealth === 0) {
        if (attackerBoardState.removeFromBoardAtTurn) {
            return board;
        }
        attackerBoardState.removeFromBoardAtTurn = currentTurn + DYING_DURATION;
        return board_1.boardReducer(board, board_1.BoardCommands.updateBoardPiece(attacker));
    }
    var cooldown = getCooldownForSpeed(attackerStats.speed);
    if (attackerBoardState.canMoveAtTurn === null) {
        attackerBoardState.canMoveAtTurn = currentTurn + cooldown;
    }
    if (attackerBoardState.canAttackAtTurn === null) {
        attackerBoardState.canAttackAtTurn = currentTurn + cooldown;
    }
    // combat logic
    if (!attackerTargetId) {
        attacker.combat.targetId = findTargetId_1.findTargetId(attacker, board);
        return board_1.boardReducer(board, board_1.BoardCommands.updateBoardPiece(attacker));
    }
    var target = board.pieces[attackerTargetId];
    // if we can't attack yet, wait for cooldown
    if (attackerBoardState.canAttackAtTurn > currentTurn) {
        // todo check if attacker has been changed
        return board_1.boardReducer(board, board_1.BoardCommands.updateBoardPiece(attacker));
    }
    // if the enemy can't be attacked yet, wait
    // todo consider breaking and choosing different target..
    if (target.combat.board.canBeAttackedAtTurn > currentTurn) {
        return board_1.boardReducer(board, board_1.BoardCommands.updateBoardPiece(attacker));
    }
    var inRange = inAttackRange_1.inAttackRange(attacker, target, attackerStats.attackType);
    var targetAlive = target.currentHealth > 0;
    if (!targetAlive) {
        // target is dead, so clear target
        // todo should we increment canAttackAtTurn here?
        attacker.combat.targetId = null;
        return board_1.boardReducer(board, board_1.BoardCommands.updateBoardPiece(attacker));
    }
    else if (inRange) {
        // target is in range, so attack
        var damage = getAttackDamage(attacker, target);
        var newDefenderHealth = Math.max(target.currentHealth - damage, 0);
        var attackerDirection = models_1.getRelativeDirection(attacker.position, target.position);
        var attackerDistance = models_1.getDistance(attacker.position, target.position);
        var attackerFacingAway = getNewAttackerFacingAway(attacker.facingAway, attackerDirection);
        var newAttacker = __assign(__assign({}, attacker), { combat: __assign(__assign({}, attacker.combat), { board: __assign(__assign({}, attacker.combat.board), { 
                    // attack cooldown
                    canAttackAtTurn: currentTurn + ATTACK_TURN_DURATION + getCooldownForSpeed(attackerStats.speed) }) }), attacking: {
                attackType: attackerStats.attackType,
                distance: attackerDistance,
                direction: attackerDirection,
                damage: damage
            }, facingAway: attackerFacingAway });
        var defender = __assign(__assign({}, target), { currentHealth: newDefenderHealth, hit: {
                direction: models_1.getRelativeDirection(target.position, attacker.position),
                damage: damage
            } });
        return board_1.boardReducer(board, board_1.BoardCommands.updateBoardPieces([newAttacker, defender]));
    }
    else {
        // target is out of range, so move towards
        if (attackerBoardState.canMoveAtTurn > currentTurn) {
            return board_1.boardReducer(board, board_1.BoardCommands.updateBoardPiece(attacker));
        }
        // todo make getNextPiecePosition take range into account
        var nextPosition = pathfinding_1.getNextPiecePosition(attacker, attackerStats, target, board);
        if (!nextPosition) {
            return board_1.boardReducer(board, board_1.BoardCommands.updateBoardPiece(attacker));
        }
        var attackerDirection = models_1.getRelativeDirection(attacker.position, target.position);
        attacker.position = nextPosition;
        attacker.facingAway = getNewAttackerFacingAway(attacker.facingAway, attackerDirection);
        attackerBoardState.canMoveAtTurn = currentTurn + MOVE_TURN_DURATION + getCooldownForSpeed(attackerStats.speed);
        attackerBoardState.canBeAttackedAtTurn = currentTurn + MOVE_TURN_DURATION + 2;
        attackerBoardState.canAttackAtTurn = currentTurn + MOVE_TURN_DURATION + 2;
        return board_1.boardReducer(board, board_1.BoardCommands.updateBoardPiece(attacker));
    }
};
var getNewAttackerFacingAway = function (oldFacingAway, direction) {
    if (direction === models_1.Directions.LEFT || direction === models_1.Directions.RIGHT) {
        // if it's left or right we don't need to change it
        return oldFacingAway;
    }
    if (direction === models_1.Directions.UP) {
        return true;
    }
    return false;
};
var getAttackBonus = function (attacker, defender) {
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
var getAttackDamage = function (attacker, defender) {
    var attackerStats = piece_utils_1.getStats(attacker);
    var defenderStats = piece_utils_1.getStats(defender);
    var attackBonus = getAttackBonus(attacker.definition.type, defender.definition.type);
    return (attackerStats.attack / defenderStats.defense) * attackBonus * 8; // todo tweak this
};


/***/ }),

/***/ "../shared/lib/game/match/combat/utils/findTargetId.js":
/*!*************************************************************!*\
  !*** ../shared/lib/game/match/combat/utils/findTargetId.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.findTargetId = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var getLivingEnemies = function (piece, board) {
    var e_1, _a;
    var output = [];
    try {
        for (var _b = __values(Object.values(board.pieces)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var other = _c.value;
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
exports.findTargetId = function (piece, board) {
    var enemies = getLivingEnemies(piece, board);
    if (enemies.length === 0) {
        return null;
    }
    var enemyDeltas = enemies.map(function (enemy) { return ({
        enemy: enemy,
        delta: models_1.getDelta(piece.position, enemy.position)
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
    return enemyDeltas[0].enemy.id;
};


/***/ }),

/***/ "../shared/lib/game/match/combat/utils/getTargetAttackPositions.js":
/*!*************************************************************************!*\
  !*** ../shared/lib/game/match/combat/utils/getTargetAttackPositions.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getTargetAttackPositions = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var isInsideGrid = function (position) {
    var x = position.x, y = position.y;
    return x >= 0 && y >= 0 && x < models_1.GRID_SIZE.width && y < models_1.GRID_SIZE.height;
};
exports.getTargetAttackPositions = function (target, range) {
    if (range === void 0) { range = 1; }
    var _a = target.position, x = _a.x, y = _a.y;
    var positions = [];
    for (var _x = x - range; _x <= x + range; _x++) {
        if (_x === x) {
            continue;
        }
        positions.push(models_1.createTileCoordinates(_x, y));
    }
    for (var _y = y - range; _y <= y + range; _y++) {
        if (_y === y) {
            continue;
        }
        positions.push(models_1.createTileCoordinates(x, _y));
    }
    // filter out any that are outside the grid
    return positions.filter(isInsideGrid);
};


/***/ }),

/***/ "../shared/lib/game/match/combat/utils/inAttackRange.js":
/*!**************************************************************!*\
  !*** ../shared/lib/game/match/combat/utils/inAttackRange.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.inAttackRange = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
exports.inAttackRange = function (a, b, attackType) {
    var _a = models_1.getDelta(a.position, b.position), deltaX = _a.x, deltaY = _a.y;
    // Pieces cannot attack diagonally
    var result = (Math.min(deltaX, deltaY) === 0 && Math.max(deltaX, deltaY) <= attackType.range);
    return result;
};


/***/ }),

/***/ "../shared/lib/game/match/index.js":
/*!*****************************************!*\
  !*** ../shared/lib/game/match/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var match_1 = __webpack_require__(/*! ./match */ "../shared/lib/game/match/match.js");
__createBinding(exports, match_1, "Match");
var battleSaga_1 = __webpack_require__(/*! ./combat/battleSaga */ "../shared/lib/game/match/combat/battleSaga.js");
__createBinding(exports, battleSaga_1, "battleSaga");
__createBinding(exports, battleSaga_1, "startBattle");
__createBinding(exports, battleSaga_1, "BATTLE_FINISH_EVENT");


/***/ }),

/***/ "../shared/lib/game/match/match.js":
/*!*****************************************!*\
  !*** ../shared/lib/game/match/match.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Match = void 0;
var pDefer = __webpack_require__(/*! p-defer */ "../shared/node_modules/p-defer/index.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "../shared/node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var redux_1 = __webpack_require__(/*! redux */ "../shared/node_modules/redux/es/redux.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var board_1 = __webpack_require__(/*! ../../board */ "../shared/lib/board/index.js");
var combat_1 = __webpack_require__(/*! ./combat */ "../shared/lib/game/match/combat/index.js");
var turnReducer = function (state, event) {
    if (state === void 0) { state = 0; }
    return (event.type === combat_1.BATTLE_TURN_EVENT ? event.payload.turn : state);
};
var Match = /** @class */ (function () {
    function Match(home, away, gameOptions) {
        this.serverFinishedMatch = pDefer();
        this.clientFinishedMatch = pDefer();
        this.home = home;
        this.away = away;
        this.store = this.createStore(gameOptions);
        var board = board_1.mergeBoards(models_1.GRID_SIZE, home.getBoard().pieces, away.getBoard().pieces);
        this.store.dispatch(board_1.BoardCommands.initialiseBoard(board));
    }
    Match.prototype.onClientFinishMatch = function () {
        this.clientFinishedMatch.resolve();
    };
    Match.prototype.getBoard = function () {
        return this.store.getState().board;
    };
    Match.prototype.getTurn = function () {
        return this.store.getState().turn;
    };
    Match.prototype.getFinalBoard = function () {
        return this.finalBoard;
    };
    Match.prototype.fight = function (battleTimeout) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.store.dispatch(combat_1.startBattle());
                        return [4 /*yield*/, Promise.race([
                                battleTimeout,
                                Promise.all([this.serverFinishedMatch.promise, this.clientFinishedMatch.promise])
                            ])];
                    case 1:
                        _a.sent();
                        this.finalBoard = this.store.getState().board;
                        return [2 /*return*/, this.finalBoard];
                }
            });
        });
    };
    Match.prototype.createStore = function (gameOptions) {
        // required to preserve inside the generator
        // tslint:disable-next-line:variable-name
        var _this = this;
        var rootSaga = function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = effects_1.all;
                        return [4 /*yield*/, effects_1.fork(combat_1.battleSaga, gameOptions)];
                    case 1:
                        _b = [
                            _c.sent()
                        ];
                        return [4 /*yield*/, effects_1.takeEvery(combat_1.BATTLE_FINISH_EVENT, function () {
                                return __generator(this, function (_a) {
                                    _this.onServerFinishMatch();
                                    return [2 /*return*/];
                                });
                            })];
                    case 2: return [4 /*yield*/, _a.apply(void 0, [_b.concat([
                                _c.sent()
                            ])])];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        };
        var sagaMiddleware = redux_saga_1["default"]();
        var store = redux_1.createStore(redux_1.combineReducers({
            board: board_1.boardReducer,
            turn: turnReducer
        }), redux_1.applyMiddleware(sagaMiddleware));
        sagaMiddleware.run(rootSaga);
        return store;
    };
    Match.prototype.onServerFinishMatch = function () {
        this.serverFinishedMatch.resolve();
    };
    return Match;
}());
exports.Match = Match;


/***/ }),

/***/ "../shared/lib/game/opponentProvider.js":
/*!**********************************************!*\
  !*** ../shared/lib/game/opponentProvider.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.OpponentProvider = void 0;
var shuffle = __webpack_require__(/*! lodash.shuffle */ "../shared/node_modules/lodash.shuffle/index.js");
var utils_1 = __webpack_require__(/*! ../utils */ "../shared/lib/utils/index.js");
var OpponentProvider = /** @class */ (function () {
    function OpponentProvider() {
    }
    OpponentProvider.prototype.updateRotation = function () {
        var chosen = utils_1.randomFromArray(this.remainingRotations);
        this.remainingRotations = this.remainingRotations.filter(function (i) { return i !== chosen; });
        this.rotation = chosen;
    };
    OpponentProvider.prototype.setPlayers = function (players) {
        this.players = players;
        this.generateRotations();
    };
    OpponentProvider.prototype.getOpponent = function (localPlayerId) {
        var index = this.players.findIndex(function (p) { return p.id === localPlayerId; });
        var player = this.players[(index + this.rotation) % this.players.length];
        if (player) {
            return player;
        }
        var otherPlayers = this.players.filter(function (p) { return p.id !== localPlayerId; });
        return utils_1.randomFromArray(otherPlayers);
    };
    OpponentProvider.prototype.generateRotations = function () {
        var rotations = [];
        // a 3 player game will have rotations: [ 1, 2 ]
        for (var i = 1; i < this.players.length; i++) {
            rotations.push(i);
        }
        this.remainingRotations = shuffle(rotations);
        this.updateRotation();
    };
    return OpponentProvider;
}());
exports.OpponentProvider = OpponentProvider;


/***/ }),

/***/ "../shared/lib/game/options.js":
/*!*************************************!*\
  !*** ../shared/lib/game/options.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getOptions = exports.defaultOptions = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
exports.defaultOptions = {
    phaseLengths: models_1.PHASE_LENGTHS,
    turnCount: models_1.DEFAULT_TURN_COUNT,
    turnDuration: models_1.DEFAULT_TURN_DURATION
};
exports.getOptions = function (options) {
    return __assign(__assign({}, exports.defaultOptions), options);
};


/***/ }),

/***/ "../shared/lib/game/player/actions.js":
/*!********************************************!*\
  !*** ../shared/lib/game/player/actions.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.quitGameAction = exports.readyUpAction = exports.buyXpAction = exports.toggleShopLock = exports.buyCardAction = exports.rerollCardsAction = exports.playerSellPieceAction = exports.playerDropPieceAction = exports.PlayerActionTypesArray = exports.QUIT_GAME_ACTION = exports.TOGGLE_SHOP_LOCK_ACTION = exports.READY_UP_ACTION = exports.BUY_XP_ACTION = exports.BUY_CARD_ACTION = exports.REROLL_CARDS_ACTION = exports.PLAYER_SELL_PIECE_ACTION = exports.PLAYER_DROP_PIECE_ACTION = void 0;
exports.PLAYER_DROP_PIECE_ACTION = "PLAYER_DROP_PIECE_ACTION";
exports.PLAYER_SELL_PIECE_ACTION = "PLAYER_SELL_PIECE_ACTION";
exports.REROLL_CARDS_ACTION = "REROLL_CARDS_ACTION";
exports.BUY_CARD_ACTION = "BUY_CARD_ACTION";
exports.BUY_XP_ACTION = "BUY_XP_ACTION";
exports.READY_UP_ACTION = "READY_UP_ACTION";
exports.TOGGLE_SHOP_LOCK_ACTION = "TOGGLE_SHOP_LOCK_ACTION";
exports.QUIT_GAME_ACTION = "QUIT_GAME_ACTION";
exports.PlayerActionTypesArray = [
    exports.PLAYER_DROP_PIECE_ACTION, exports.PLAYER_SELL_PIECE_ACTION, exports.REROLL_CARDS_ACTION, exports.BUY_CARD_ACTION,
    exports.BUY_XP_ACTION, exports.READY_UP_ACTION, exports.TOGGLE_SHOP_LOCK_ACTION, exports.QUIT_GAME_ACTION
];
exports.playerDropPieceAction = function (pieceId, from, to) { return ({
    type: exports.PLAYER_DROP_PIECE_ACTION,
    payload: { pieceId: pieceId, to: to, from: from }
}); };
exports.playerSellPieceAction = function (pieceId) { return ({
    type: exports.PLAYER_SELL_PIECE_ACTION,
    payload: { pieceId: pieceId }
}); };
exports.rerollCardsAction = function () { return ({ type: exports.REROLL_CARDS_ACTION }); };
exports.buyCardAction = function (index) { return ({ type: exports.BUY_CARD_ACTION, payload: { index: index } }); };
exports.toggleShopLock = function () { return ({ type: exports.TOGGLE_SHOP_LOCK_ACTION }); };
exports.buyXpAction = function () { return ({ type: exports.BUY_XP_ACTION }); };
exports.readyUpAction = function () { return ({ type: exports.READY_UP_ACTION }); };
exports.quitGameAction = function () { return ({ type: exports.QUIT_GAME_ACTION }); };


/***/ }),

/***/ "../shared/lib/game/player/bench/commands.js":
/*!***************************************************!*\
  !*** ../shared/lib/game/player/bench/commands.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.unlockBenchCommand = exports.lockBenchCommand = exports.moveBenchPieceCommand = exports.removeBenchPiecesCommand = exports.removeBenchPieceCommand = exports.addBenchPieceCommand = exports.initialiseBenchCommand = exports.MOVE_BENCH_PIECE_COMMAND = exports.UNLOCK_BENCH_COMMAND = exports.LOCK_BENCH_COMMAND = exports.INITIALISE_BENCH_COMMAND = exports.ADD_BENCH_PIECE_COMMAND = exports.REMOVE_BENCH_PIECES_COMMAND = exports.REMOVE_BENCH_PIECE_COMMAND = void 0;
exports.REMOVE_BENCH_PIECE_COMMAND = "REMOVE_BENCH_PIECE_COMMAND";
exports.REMOVE_BENCH_PIECES_COMMAND = "REMOVE_BENCH_PIECES_COMMAND";
exports.ADD_BENCH_PIECE_COMMAND = "ADD_BENCH_PIECE_COMMAND";
exports.INITIALISE_BENCH_COMMAND = "INITIALISE_BENCH_COMMAND";
exports.LOCK_BENCH_COMMAND = "LOCK_BENCH_COMMAND";
exports.UNLOCK_BENCH_COMMAND = "UNLOCK_BENCH_COMMAND";
exports.MOVE_BENCH_PIECE_COMMAND = "MOVE_BENCH_PIECE_COMMAND";
exports.initialiseBenchCommand = function (state) { return ({
    type: exports.INITIALISE_BENCH_COMMAND,
    payload: {
        state: state
    }
}); };
exports.addBenchPieceCommand = function (piece, slot) { return ({
    type: exports.ADD_BENCH_PIECE_COMMAND,
    payload: {
        piece: piece,
        slot: slot
    }
}); };
exports.removeBenchPieceCommand = function (pieceId) { return ({
    type: exports.REMOVE_BENCH_PIECE_COMMAND,
    payload: {
        pieceId: pieceId
    }
}); };
exports.removeBenchPiecesCommand = function (pieceIds) { return ({
    type: exports.REMOVE_BENCH_PIECES_COMMAND,
    payload: {
        pieceIds: pieceIds
    }
}); };
exports.moveBenchPieceCommand = function (pieceId, from, to) { return ({
    type: exports.MOVE_BENCH_PIECE_COMMAND,
    payload: {
        pieceId: pieceId,
        from: from,
        to: to
    }
}); };
exports.lockBenchCommand = function () { return ({ type: exports.LOCK_BENCH_COMMAND }); };
exports.unlockBenchCommand = function () { return ({ type: exports.UNLOCK_BENCH_COMMAND }); };


/***/ }),

/***/ "../shared/lib/game/player/bench/index.js":
/*!************************************************!*\
  !*** ../shared/lib/game/player/bench/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var state_1 = __webpack_require__(/*! ./state */ "../shared/lib/game/player/bench/state.js");
__createBinding(exports, state_1, "reducer", "benchReducer");
exports.BenchCommands = __webpack_require__(/*! ./commands */ "../shared/lib/game/player/bench/commands.js");


/***/ }),

/***/ "../shared/lib/game/player/bench/reducers/lockedReducer.js":
/*!*****************************************************************!*\
  !*** ../shared/lib/game/player/bench/reducers/lockedReducer.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.locked = void 0;
var commands_1 = __webpack_require__(/*! ../commands */ "../shared/lib/game/player/bench/commands.js");
var initialState = false;
var locked = function (state, command) {
    if (state === void 0) { state = initialState; }
    switch (command.type) {
        case commands_1.LOCK_BENCH_COMMAND:
            return true;
        case commands_1.UNLOCK_BENCH_COMMAND:
            return false;
        default:
            return state;
    }
};
exports.locked = locked;


/***/ }),

/***/ "../shared/lib/game/player/bench/reducers/piecesReducer.js":
/*!*****************************************************************!*\
  !*** ../shared/lib/game/player/bench/reducers/piecesReducer.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.pieces = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var commands_1 = __webpack_require__(/*! ../commands */ "../shared/lib/game/player/bench/commands.js");
var initialState = [null, null, null, null, null, null, null];
var removePieces = function (state, pieceIds) {
    var e_1, _a;
    var newState = [];
    try {
        for (var state_1 = __values(state), state_1_1 = state_1.next(); !state_1_1.done; state_1_1 = state_1.next()) {
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
var pieces = function (state, command) {
    if (state === void 0) { state = initialState; }
    switch (command.type) {
        case commands_1.INITIALISE_BENCH_COMMAND:
            return __spread(command.payload.state.pieces);
        case commands_1.ADD_BENCH_PIECE_COMMAND: {
            var _a = command.payload, piece = _a.piece, slot = _a.slot;
            var newState = __spread(state);
            var slotToUse = slot !== null ? slot : newState.findIndex(function (p) { return p === null; });
            newState[slotToUse] = __assign(__assign({}, piece), { position: models_1.createTileCoordinates(slotToUse, null), facingAway: false });
            return newState;
        }
        case commands_1.REMOVE_BENCH_PIECE_COMMAND: {
            return removePieces(state, [command.payload.pieceId]);
        }
        case commands_1.REMOVE_BENCH_PIECES_COMMAND: {
            return removePieces(state, command.payload.pieceIds);
        }
        case commands_1.MOVE_BENCH_PIECE_COMMAND: {
            var _b = command.payload, pieceId = _b.pieceId, from = _b.from, to = _b.to;
            var piece = state[from.slot];
            // safety catch
            if (!piece || !piece.position || piece.id !== pieceId || piece.position.x !== from.slot || piece.position.y !== null) {
                return state;
            }
            var newState = __spread(state);
            newState[from.slot] = null;
            newState[to.slot] = __assign(__assign({}, piece), { position: models_1.createTileCoordinates(to.slot, null) });
            return newState;
        }
        default:
            return state;
    }
};
exports.pieces = pieces;


/***/ }),

/***/ "../shared/lib/game/player/bench/state.js":
/*!************************************************!*\
  !*** ../shared/lib/game/player/bench/state.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.reducer = void 0;
var redux_1 = __webpack_require__(/*! redux */ "../shared/node_modules/redux/es/redux.js");
var piecesReducer_1 = __webpack_require__(/*! ./reducers/piecesReducer */ "../shared/lib/game/player/bench/reducers/piecesReducer.js");
var lockedReducer_1 = __webpack_require__(/*! ./reducers/lockedReducer */ "../shared/lib/game/player/bench/reducers/lockedReducer.js");
var reducer = redux_1.combineReducers({
    pieces: piecesReducer_1.pieces,
    locked: lockedReducer_1.locked
});
exports.reducer = reducer;


/***/ }),

/***/ "../shared/lib/game/player/can-drop-piece.js":
/*!***************************************************!*\
  !*** ../shared/lib/game/player/can-drop-piece.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.canDropPiece = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var inBench = function (targetY) { return targetY === null; };
var inFriendlyBoard = function (targetY) { return targetY !== null && targetY > (models_1.GRID_SIZE.height / 2) - 1; };
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

/***/ "../shared/lib/game/player/events.js":
/*!*******************************************!*\
  !*** ../shared/lib/game/player/events.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.playerDeathEvent = exports.PLAYER_DEATH_EVENT = exports.clientFinishMatchEvent = exports.CLIENT_FINISH_MATCH_EVENT = exports.afterRerollCardsEvent = exports.AFTER_REROLL_CARDS_EVENT = exports.afterSellPieceEvent = exports.AFTER_SELL_PIECE_EVENT = exports.playerFinishMatchEvent = exports.PLAYER_FINISH_MATCH_EVENT = void 0;
exports.PLAYER_FINISH_MATCH_EVENT = "PLAYER_FINISH_MATCH_EVENT";
exports.playerFinishMatchEvent = function (homeScore, awayScore) { return ({
    type: exports.PLAYER_FINISH_MATCH_EVENT,
    payload: { homeScore: homeScore, awayScore: awayScore }
}); };
exports.AFTER_SELL_PIECE_EVENT = "AFTER_SELL_PIECE_EVENT";
exports.afterSellPieceEvent = function (piece) { return ({ type: exports.AFTER_SELL_PIECE_EVENT, payload: { piece: piece } }); };
exports.AFTER_REROLL_CARDS_EVENT = "AFTER_REROLL_CARDS_EVENT";
exports.afterRerollCardsEvent = function () { return ({ type: exports.AFTER_REROLL_CARDS_EVENT }); };
exports.CLIENT_FINISH_MATCH_EVENT = "CLIENT_FINISH_MATCH_EVENT";
exports.clientFinishMatchEvent = function () { return ({ type: exports.CLIENT_FINISH_MATCH_EVENT }); };
exports.PLAYER_DEATH_EVENT = "PLAYER_DEATH_EVENT";
exports.playerDeathEvent = function () { return ({ type: exports.PLAYER_DEATH_EVENT }); };


/***/ }),

/***/ "../shared/lib/game/player/index.js":
/*!******************************************!*\
  !*** ../shared/lib/game/player/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var player_1 = __webpack_require__(/*! ./player */ "../shared/lib/game/player/player.js");
__createBinding(exports, player_1, "Player");
exports.PlayerActions = __webpack_require__(/*! ./actions */ "../shared/lib/game/player/actions.js");
exports.PlayerEvents = __webpack_require__(/*! ./events */ "../shared/lib/game/player/events.js");
exports.PlayerSagas = __webpack_require__(/*! ./sagas */ "../shared/lib/game/player/sagas/index.js");
var sagas_1 = __webpack_require__(/*! ./sagas */ "../shared/lib/game/player/sagas/index.js");
__createBinding(exports, sagas_1, "PlayerActionSagas");


/***/ }),

/***/ "../shared/lib/game/player/pieceSelectors.js":
/*!***************************************************!*\
  !*** ../shared/lib/game/player/pieceSelectors.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.getFirstEmptyBenchSlot = exports.hasSpaceOnBench = exports.getBoardPieceCount = exports.getBenchPiecesForDefinition = exports.getBoardPiecesForDefinition = exports.getAllPieces = exports.getBoardPieceForPosition = exports.getBenchPieceForSlot = exports.getPiece = void 0;
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
exports.getAllPieces = function (state) { return __spread(Object.values(state.board.pieces), state.bench.pieces.filter(function (p) { return p !== null; })); };
exports.getBoardPiecesForDefinition = function (state, definitionId) {
    return Object.values(state.board.pieces).filter(function (p) { return p.definitionId === definitionId; });
};
exports.getBenchPiecesForDefinition = function (state, definitionId) { return state.bench.pieces.filter(function (p) { return p && p.definitionId === definitionId; }); };
exports.getBoardPieceCount = function (state) { return Object.values(state.board.pieces).length; };
exports.hasSpaceOnBench = function (state) { return exports.getFirstEmptyBenchSlot(state) !== null; };
exports.getFirstEmptyBenchSlot = function (state) {
    var index = state.bench.pieces.findIndex(function (p) { return p === null; });
    if (index === -1) {
        return null;
    }
    return index;
};


/***/ }),

/***/ "../shared/lib/game/player/player.js":
/*!*******************************************!*\
  !*** ../shared/lib/game/player/player.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.Player = void 0;
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var board_1 = __webpack_require__(/*! ../../board */ "../shared/lib/board/index.js");
var sagas_1 = __webpack_require__(/*! ./sagas */ "../shared/lib/game/player/sagas/index.js");
var events_2 = __webpack_require__(/*! ./events */ "../shared/lib/game/player/events.js");
var store_1 = __webpack_require__(/*! ./store */ "../shared/lib/game/player/store.js");
var playerInfo_1 = __webpack_require__(/*! ./playerInfo */ "../shared/lib/game/player/playerInfo/index.js");
var bench_1 = __webpack_require__(/*! ./bench */ "../shared/lib/game/player/bench/index.js");
var playerSelectors_1 = __webpack_require__(/*! ./playerSelectors */ "../shared/lib/game/player/playerSelectors.js");
var pieceSelectors_1 = __webpack_require__(/*! ./pieceSelectors */ "../shared/lib/game/player/pieceSelectors.js");
var actions_1 = __webpack_require__(/*! ./actions */ "../shared/lib/game/player/actions.js");
var store_2 = __webpack_require__(/*! ../store */ "../shared/lib/game/store/index.js");
var PlayerEvent;
(function (PlayerEvent) {
    PlayerEvent["QUIT_GAME"] = "QUIT_GAME";
})(PlayerEvent || (PlayerEvent = {}));
var Player = /** @class */ (function () {
    function Player(id, name) {
        var _this = this;
        this.match = null;
        this.events = new events_1.EventEmitter();
        this.getMatch = function () { return _this.match; };
        this.rerollCards = function () {
            if (playerSelectors_1.isPlayerAlive(_this.store.getState()) === false) {
                return;
            }
            var cards = _this.store.getState().playerInfo.cards;
            var newCards = _this.deck.reroll(cards, _this.getLevel(), 5);
            _this.store.dispatch(playerInfo_1.PlayerInfoCommands.updateCardsCommand(newCards));
        };
        this.id = id;
        this.name = name;
        var _a = store_1.createPlayerStore(this.id), store = _a.store, sagaMiddleware = _a.sagaMiddleware;
        this.store = store;
        this.sagaMiddleware = sagaMiddleware;
        this.sagaMiddleware.run(this.afterSellPieceEventSaga());
        this.sagaMiddleware.run(this.afterRerollCardsEventSaga());
        this.sagaMiddleware.run(this.quitGameSaga());
        this.sagaMiddleware.run(this.clientFinishMatchSaga());
        this.sagaMiddleware.run(this.finishGameSaga());
        sagas_1.playerStreak(this.sagaMiddleware);
        sagas_1.playerBattle(this.sagaMiddleware);
        sagas_1.playerMatchRewards(this.sagaMiddleware);
        this.propertyUpdateRegistry = sagas_1.createPropertyUpdateRegistry(this.sagaMiddleware);
    }
    Player.prototype.receiveGameEvent = function (gameEvent) {
        this.store.dispatch(gameEvent);
    };
    Player.prototype.propertyUpdates = function () {
        return this.propertyUpdateRegistry;
    };
    Player.prototype.setGetGameState = function (fn) {
        this.getGameState = fn;
    };
    Player.prototype.setGetPlayerListPlayers = function (fn) {
        this.getPlayerListPlayers = fn;
    };
    Player.prototype.setDefinitionProvider = function (definitionProvider) {
        this.definitionProvider = definitionProvider;
    };
    Player.prototype.getHealth = function () {
        return this.store.getState().playerInfo.health;
    };
    Player.prototype.getReady = function () {
        return this.store.getState().playerInfo.ready;
    };
    Player.prototype.getStreak = function () {
        return this.store.getState().playerInfo.streak;
    };
    Player.prototype.getLevel = function () {
        return this.store.getState().playerInfo.level;
    };
    Player.prototype.getXp = function () {
        return this.store.getState().playerInfo.xp;
    };
    Player.prototype.getMoney = function () {
        return this.store.getState().playerInfo.money;
    };
    Player.prototype.getShopLocked = function () {
        return this.store.getState().playerInfo.shopLocked;
    };
    Player.prototype.getStatus = function () {
        return this.store.getState().playerInfo.status;
    };
    Player.prototype.getBattle = function () {
        return this.store.getState().playerInfo.battle;
    };
    Player.prototype.setDeck = function (deck) {
        this.deck = deck;
    };
    Player.prototype.enterPreparingPhase = function () {
        if (this.store.getState().playerInfo.shopLocked === false) {
            this.rerollCards();
        }
        this.store.dispatch(playerInfo_1.PlayerInfoCommands.clearOpponentCommand());
        this.store.dispatch(bench_1.BenchCommands.unlockBenchCommand());
    };
    Player.prototype.fillBoard = function () {
        this.store.dispatch(sagas_1.fillBoardCommand());
    };
    Player.prototype.enterReadyPhase = function (match) {
        this.match = match;
        this.store.dispatch(bench_1.BenchCommands.lockBenchCommand());
        this.store.dispatch(playerInfo_1.PlayerInfoCommands.updateOpponentCommand(match.away.id));
    };
    Player.prototype.fightMatch = function (startedAt, battleTimeout) {
        return __awaiter(this, void 0, void 0, function () {
            var finalMatchBoard, pieces, surviving, homeScore, awayScore, damage, opponentName;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.match.fight(battleTimeout.promise)];
                    case 1:
                        finalMatchBoard = _a.sent();
                        pieces = Object.values(finalMatchBoard.pieces);
                        surviving = {
                            home: pieces.filter(function (p) { return p.currentHealth > 0 && p.ownerId === _this.id; }),
                            away: pieces.filter(function (p) { return p.currentHealth > 0 && p.ownerId !== _this.id; })
                        };
                        homeScore = surviving.home.length;
                        awayScore = surviving.away.length;
                        damage = awayScore * models_1.HEALTH_LOST_PER_PIECE;
                        this.store.dispatch(sagas_1.subtractHealthCommand(this.getGameState().round, damage));
                        this.store.dispatch(events_2.playerFinishMatchEvent(homeScore, awayScore));
                        opponentName = this.match.away.name;
                        this.match = null;
                        return [2 /*return*/, {
                                homePlayer: this,
                                opponentName: opponentName,
                                homeScore: homeScore,
                                awayScore: awayScore
                            }];
                }
            });
        });
    };
    Player.prototype.onQuitGame = function (fn) {
        var _this = this;
        this.events.on(PlayerEvent.QUIT_GAME, fn);
        return function () { return _this.events.off(PlayerEvent.QUIT_GAME, fn); };
    };
    Player.prototype.clearPieces = function () {
        var e_1, _a;
        var pieces = pieceSelectors_1.getAllPieces(this.store.getState());
        this.store.dispatch(board_1.BoardCommands.initialiseBoard({}));
        // todo this is ugly
        this.store.dispatch(bench_1.BenchCommands.initialiseBenchCommand({
            pieces: [],
            locked: this.store.getState().bench.locked
        }));
        try {
            for (var pieces_1 = __values(pieces), pieces_1_1 = pieces_1.next(); !pieces_1_1.done; pieces_1_1 = pieces_1.next()) {
                var piece = pieces_1_1.value;
                this.deck.addPiece(piece);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (pieces_1_1 && !pieces_1_1.done && (_a = pieces_1["return"])) _a.call(pieces_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var cards = this.store.getState().playerInfo.cards;
        this.store.dispatch(playerInfo_1.PlayerInfoCommands.updateCardsCommand([]));
        this.deck.addCards(cards);
        this.deck.shuffle();
    };
    Player.prototype.kill = function () {
        this.clearPieces();
        this.store.dispatch(events_2.playerDeathEvent());
    };
    Player.prototype.resurrect = function (startingHealth) {
        this.store.dispatch(playerInfo_1.PlayerInfoCommands.updateRoundDiedAtCommand(null));
        this.store.dispatch(playerInfo_1.PlayerInfoCommands.updateHealthCommand(startingHealth));
    };
    Player.prototype.isAlive = function () {
        return playerSelectors_1.isPlayerAlive(this.store.getState());
    };
    Player.prototype.getRoundDiedAt = function () {
        return this.store.getState().playerInfo.roundDiedAt;
    };
    Player.prototype.getBoard = function () {
        return this.store.getState().board;
    };
    Player.prototype.getBench = function () {
        return this.store.getState().bench;
    };
    Player.prototype.getCards = function () {
        return this.store.getState().playerInfo.cards;
    };
    Player.prototype.afterSellPieceEventSaga = function () {
        var _this = this;
        var addPieceToDeck = function (piece) {
            _this.deck.addPiece(piece);
            _this.deck.shuffle();
        };
        return function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, effects_1.takeEvery(events_2.AFTER_SELL_PIECE_EVENT, function (_a) {
                            var piece = _a.payload.piece;
                            return __generator(this, function (_b) {
                                addPieceToDeck(piece);
                                return [2 /*return*/];
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        };
    };
    Player.prototype.afterRerollCardsEventSaga = function () {
        var thisRerollCards = this.rerollCards;
        return function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, effects_1.takeEvery(events_2.AFTER_REROLL_CARDS_EVENT, function () {
                            return __generator(this, function (_a) {
                                thisRerollCards();
                                return [2 /*return*/];
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        };
    };
    Player.prototype.quitGameSaga = function () {
        var _this = this;
        var emitEvent = function () { return _this.events.emit(PlayerEvent.QUIT_GAME, _this); };
        return function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, effects_1.takeEvery(actions_1.QUIT_GAME_ACTION, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, effects_1.put(playerInfo_1.PlayerInfoCommands.updateStatusCommand(models_1.PlayerStatus.QUIT))];
                                    case 1:
                                        _a.sent();
                                        emitEvent();
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
    Player.prototype.clientFinishMatchSaga = function () {
        var _this = this;
        var finishMatch = function () {
            if (_this.match === null) {
                return;
            }
            _this.match.onClientFinishMatch();
        };
        return function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, effects_1.takeLatest(events_2.CLIENT_FINISH_MATCH_EVENT, function () {
                            return __generator(this, function (_a) {
                                finishMatch();
                                return [2 /*return*/];
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        };
    };
    Player.prototype.finishGameSaga = function () {
        var _this = this;
        var removeListeners = function () { return _this.events.removeAllListeners(); };
        return function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, effects_1.takeLatest(store_2.GameEvents.GAME_FINISH_EVENT, function () {
                            return __generator(this, function (_a) {
                                removeListeners();
                                return [2 /*return*/];
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        };
    };
    return Player;
}());
exports.Player = Player;


/***/ }),

/***/ "../shared/lib/game/player/playerInfo/commands.js":
/*!********************************************************!*\
  !*** ../shared/lib/game/player/playerInfo/commands.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.updateCardsCommand = exports.updateLevelCommand = exports.updateMoneyCommand = exports.clearOpponentCommand = exports.updateOpponentCommand = exports.updateShopLockCommand = exports.updateRoundDiedAtCommand = exports.updateStreakCommand = exports.updateHealthCommand = exports.updateBattleCommand = exports.updateStatusCommand = exports.UPDATE_MONEY_COMMAND = exports.UPDATE_LEVEL_COMMAND = exports.UPDATE_CARDS_COMMAND = exports.UPDATE_SHOP_LOCK_COMMAND = exports.CLEAR_OPPONENT_COMMAND = exports.UPDATE_OPPONENT_COMMAND = exports.UPDATE_ROUND_DIED_AT_COMMAND = exports.UPDATE_STREAK_COMMAND = exports.UPDATE_HEALTH_COMMAND = exports.UPDATE_BATTLE_COMMAND = exports.UPDATE_STATUS_COMMAND = void 0;
exports.UPDATE_STATUS_COMMAND = "UPDATE_STATUS_COMMAND";
exports.UPDATE_BATTLE_COMMAND = "UPDATE_BATTLE_COMMAND";
exports.UPDATE_HEALTH_COMMAND = "UPDATE_HEALTH_COMMAND";
exports.UPDATE_STREAK_COMMAND = "UPDATE_STREAK_COMMAND";
exports.UPDATE_ROUND_DIED_AT_COMMAND = "UPDATE_ROUND_DIED_AT_COMMAND";
exports.UPDATE_OPPONENT_COMMAND = "UPDATE_OPPONENT_COMMAND";
exports.CLEAR_OPPONENT_COMMAND = "CLEAR_OPPONENT_COMMAND";
exports.UPDATE_SHOP_LOCK_COMMAND = "UPDATE_SHOP_LOCK_COMMAND";
exports.UPDATE_CARDS_COMMAND = "UPDATE_CARDS_COMMAND";
exports.UPDATE_LEVEL_COMMAND = "UPDATE_LEVEL_COMMAND";
exports.UPDATE_MONEY_COMMAND = "UPDATE_MONEY_COMMAND";
exports.updateStatusCommand = function (status) { return ({ type: exports.UPDATE_STATUS_COMMAND, payload: { status: status } }); };
exports.updateBattleCommand = function (battle) { return ({ type: exports.UPDATE_BATTLE_COMMAND, payload: { battle: battle } }); };
exports.updateHealthCommand = function (health) { return ({ type: exports.UPDATE_HEALTH_COMMAND, payload: { health: health } }); };
exports.updateStreakCommand = function (type, amount) {
    return ({ type: exports.UPDATE_STREAK_COMMAND, payload: { type: type, amount: amount } });
};
exports.updateRoundDiedAtCommand = function (roundDiedAt) { return ({ type: exports.UPDATE_ROUND_DIED_AT_COMMAND, payload: { roundDiedAt: roundDiedAt } }); };
exports.updateShopLockCommand = function (locked) { return ({ type: exports.UPDATE_SHOP_LOCK_COMMAND, payload: { locked: locked } }); };
exports.updateOpponentCommand = function (opponentId) { return ({ type: exports.UPDATE_OPPONENT_COMMAND, payload: { opponentId: opponentId } }); };
exports.clearOpponentCommand = function () { return ({ type: exports.CLEAR_OPPONENT_COMMAND }); };
exports.updateMoneyCommand = function (money) { return ({ type: exports.UPDATE_MONEY_COMMAND, payload: { money: money } }); };
exports.updateLevelCommand = function (level, xp) {
    return ({ type: exports.UPDATE_LEVEL_COMMAND, payload: { level: level, xp: xp } });
};
exports.updateCardsCommand = function (cards) { return ({ type: exports.UPDATE_CARDS_COMMAND, payload: { cards: cards } }); };


/***/ }),

/***/ "../shared/lib/game/player/playerInfo/index.js":
/*!*****************************************************!*\
  !*** ../shared/lib/game/player/playerInfo/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.PlayerInfoCommands = __webpack_require__(/*! ./commands */ "../shared/lib/game/player/playerInfo/commands.js");
var reducer_1 = __webpack_require__(/*! ./reducer */ "../shared/lib/game/player/playerInfo/reducer.js");
__createBinding(exports, reducer_1, "playerInfoReducer");


/***/ }),

/***/ "../shared/lib/game/player/playerInfo/reducer.js":
/*!*******************************************************!*\
  !*** ../shared/lib/game/player/playerInfo/reducer.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.playerInfoReducer = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var commands_1 = __webpack_require__(/*! ./commands */ "../shared/lib/game/player/playerInfo/commands.js");
var actions_1 = __webpack_require__(/*! ../actions */ "../shared/lib/game/player/actions.js");
var events_1 = __webpack_require__(/*! ../events */ "../shared/lib/game/player/events.js");
var initialState = {
    status: models_1.PlayerStatus.CONNECTED,
    health: models_1.STARTING_HEALTH,
    roundDiedAt: null,
    dead: false,
    streak: {
        type: models_1.StreakType.WIN,
        amount: 0
    },
    battle: null,
    opponentId: null,
    shopLocked: false,
    money: models_1.STARTING_MONEY,
    ready: false,
    level: models_1.STARTING_LEVEL,
    xp: 0,
    cards: []
};
function playerInfoReducer(state, command) {
    if (state === void 0) { state = initialState; }
    switch (command.type) {
        case events_1.PLAYER_DEATH_EVENT:
            return __assign(__assign({}, state), { dead: true });
        case commands_1.UPDATE_STATUS_COMMAND:
            return __assign(__assign({}, state), { status: command.payload.status });
        case commands_1.UPDATE_BATTLE_COMMAND:
            return __assign(__assign({}, state), { battle: command.payload.battle });
        case commands_1.UPDATE_HEALTH_COMMAND:
            return __assign(__assign({}, state), { health: command.payload.health });
        case commands_1.UPDATE_STREAK_COMMAND:
            return __assign(__assign({}, state), { streak: {
                    amount: command.payload.amount,
                    type: command.payload.type
                } });
        case commands_1.UPDATE_ROUND_DIED_AT_COMMAND:
            return __assign(__assign({}, state), { roundDiedAt: command.payload.roundDiedAt });
        case commands_1.UPDATE_CARDS_COMMAND:
            return __assign(__assign({}, state), { cards: command.payload.cards });
        case commands_1.UPDATE_LEVEL_COMMAND:
            return __assign(__assign({}, state), { level: command.payload.level, xp: command.payload.xp });
        case commands_1.UPDATE_MONEY_COMMAND:
            return __assign(__assign({}, state), { money: command.payload.money });
        case commands_1.UPDATE_OPPONENT_COMMAND:
            return __assign(__assign({}, state), { opponentId: command.payload.opponentId, ready: false });
        case commands_1.CLEAR_OPPONENT_COMMAND:
            return __assign(__assign({}, state), { opponentId: null });
        case commands_1.UPDATE_SHOP_LOCK_COMMAND:
            return __assign(__assign({}, state), { shopLocked: command.payload.locked });
        case actions_1.READY_UP_ACTION:
            return __assign(__assign({}, state), { ready: true });
        default:
            return state;
    }
}
exports.playerInfoReducer = playerInfoReducer;


/***/ }),

/***/ "../shared/lib/game/player/playerSelectors.js":
/*!****************************************************!*\
  !*** ../shared/lib/game/player/playerSelectors.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.getOpponentId = exports.getMostExpensiveBenchPiece = exports.getPlayerFirstEmptyBoardSlot = exports.getPlayerBelowPieceLimit = exports.isPlayerShopLocked = exports.isPlayerAlive = exports.getPlayerXp = exports.getPlayerLevel = exports.getPlayerMoney = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var pieceSelectors_1 = __webpack_require__(/*! ./pieceSelectors */ "../shared/lib/game/player/pieceSelectors.js");
exports.getPlayerMoney = function (state) { return state.playerInfo.money; };
exports.getPlayerLevel = function (state) { return state.playerInfo.level; };
exports.getPlayerXp = function (state) { return state.playerInfo.xp; };
exports.isPlayerAlive = function (state) { return state.playerInfo.health > 0; };
exports.isPlayerShopLocked = function (state) { return state.playerInfo.shopLocked; };
exports.getPlayerBelowPieceLimit = function (state, playerId) {
    var ownedBoardPieceCount = Object.values(state.board.pieces).filter(function (p) { return p.ownerId === playerId; }).length;
    var level = exports.getPlayerLevel(state);
    return ownedBoardPieceCount < level;
};
var PREFERRED_COLUMN_ORDERS = {
    8: [3, 4, 2, 5, 1, 6, 0, 7],
    7: [3, 4, 2, 5, 1, 6, 0]
};
exports.getPlayerFirstEmptyBoardSlot = function (state) {
    var e_1, _a;
    var preferredColumnOrder = PREFERRED_COLUMN_ORDERS[models_1.GRID_SIZE.width];
    for (var y = (models_1.GRID_SIZE.height / 2); y < models_1.GRID_SIZE.height; y++) {
        try {
            for (var preferredColumnOrder_1 = (e_1 = void 0, __values(preferredColumnOrder)), preferredColumnOrder_1_1 = preferredColumnOrder_1.next(); !preferredColumnOrder_1_1.done; preferredColumnOrder_1_1 = preferredColumnOrder_1.next()) {
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
exports.getOpponentId = function (state) { return state.playerInfo.opponentId; };


/***/ }),

/***/ "../shared/lib/game/player/sagas/battle.js":
/*!*************************************************!*\
  !*** ../shared/lib/game/player/sagas/battle.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.playerBattle = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var events_1 = __webpack_require__(/*! ../events */ "../shared/lib/game/player/events.js");
var playerInfo_1 = __webpack_require__(/*! ../playerInfo */ "../shared/lib/game/player/playerInfo/index.js");
exports.playerBattle = function (sagaMiddleware) {
    sagaMiddleware.run(function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = effects_1.all;
                    return [4 /*yield*/, effects_1.takeLatest(playerInfo_1.PlayerInfoCommands.UPDATE_OPPONENT_COMMAND, function (_a) {
                            var opponentId = _a.payload.opponentId;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, effects_1.put(playerInfo_1.PlayerInfoCommands.updateBattleCommand(models_1.inProgressBattle(opponentId)))];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        })];
                case 1:
                    _b = [
                        _c.sent()
                    ];
                    return [4 /*yield*/, effects_1.takeLatest(events_1.PLAYER_FINISH_MATCH_EVENT, function (_a) {
                            var opponentId;
                            var _b = _a.payload, homeScore = _b.homeScore, awayScore = _b.awayScore;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.opponentId; })];
                                    case 1:
                                        opponentId = _c.sent();
                                        return [4 /*yield*/, effects_1.put(playerInfo_1.PlayerInfoCommands.updateBattleCommand(models_1.finishedBattle(opponentId, homeScore, awayScore)))];
                                    case 2:
                                        _c.sent();
                                        return [2 /*return*/];
                                }
                            });
                        })];
                case 2: return [4 /*yield*/, _a.apply(void 0, [_b.concat([
                            _c.sent()
                        ])])];
                case 3:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
};


/***/ }),

/***/ "../shared/lib/game/player/sagas/evolution.js":
/*!****************************************************!*\
  !*** ../shared/lib/game/player/sagas/evolution.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.evolutionSagaFactory = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var commands_1 = __webpack_require__(/*! ../bench/commands */ "../shared/lib/game/player/bench/commands.js");
var definitionProvider_1 = __webpack_require__(/*! ../../definitions/definitionProvider */ "../shared/lib/game/definitions/definitionProvider.js");
var board_1 = __webpack_require__(/*! ../../../board */ "../shared/lib/board/index.js");
var pieceSelectors = __webpack_require__(/*! ../pieceSelectors */ "../shared/lib/game/player/pieceSelectors.js");
var commands_2 = __webpack_require__(/*! ../../../board/commands */ "../shared/lib/board/commands.js");
var definitionProvider = new definitionProvider_1.DefinitionProvider();
var pieceCanEvolve = function (piece) {
    var stages = definitionProvider.get(piece.definitionId).stages;
    return piece.stage < stages.length - 1;
};
exports.evolutionSagaFactory = function () {
    return function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeLatest(
                    // need to check when bench/board pieces are added (could have come from shop)
                    // or when board piece is updated (could be due to a previous evolution)
                    [commands_1.ADD_BENCH_PIECE_COMMAND, board_1.BoardCommands.ADD_BOARD_PIECE_COMMAND, board_1.BoardCommands.UPDATE_BOARD_PIECE_COMMAND], function (_a) {
                        var boardLocked, state, targetDefinitionId, targetStage, getCombinablePieces, matchingBoardPieces, matchingBenchPieces, totalInstances, pieceToReplace, boardPieceIds, benchPieceIds, newPiece, benchPieceIds, newPiece;
                        var piece = _a.payload.piece;
                        return __generator(this, function (_b) {
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
                                    return [4 /*yield*/, effects_1.take(board_1.BoardCommands.UNLOCK_BOARD_COMMAND)];
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
                                    if (totalInstances < models_1.PIECES_TO_EVOLVE) {
                                        return [2 /*return*/];
                                    }
                                    if (!(matchingBoardPieces.length > 0)) return [3 /*break*/, 9];
                                    pieceToReplace = matchingBoardPieces.pop();
                                    boardPieceIds = matchingBoardPieces.map(function (p) { return p.id; });
                                    return [4 /*yield*/, effects_1.put(commands_2.removeBoardPieces(boardPieceIds))];
                                case 6:
                                    _b.sent();
                                    benchPieceIds = matchingBenchPieces.map(function (p) { return p.id; });
                                    return [4 /*yield*/, effects_1.put(commands_1.removeBenchPiecesCommand(__spread(benchPieceIds, [piece.id])))];
                                case 7:
                                    _b.sent();
                                    newPiece = __assign(__assign({}, pieceToReplace), { stage: targetStage + 1 });
                                    return [4 /*yield*/, effects_1.put(commands_2.updateBoardPiece(newPiece))];
                                case 8:
                                    _b.sent();
                                    return [3 /*break*/, 13];
                                case 9:
                                    benchPieceIds = matchingBenchPieces.map(function (p) { return p.id; });
                                    return [4 /*yield*/, effects_1.put(commands_1.removeBenchPiecesCommand(benchPieceIds))];
                                case 10:
                                    _b.sent();
                                    newPiece = __assign(__assign({}, piece), { stage: targetStage + 1 });
                                    // todo make updateBenchPiece action
                                    return [4 /*yield*/, effects_1.put(commands_1.removeBenchPieceCommand(piece.id))];
                                case 11:
                                    // todo make updateBenchPiece action
                                    _b.sent();
                                    return [4 /*yield*/, effects_1.put(commands_1.addBenchPieceCommand(newPiece, null))];
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

/***/ "../shared/lib/game/player/sagas/fillBoard.js":
/*!****************************************************!*\
  !*** ../shared/lib/game/player/sagas/fillBoard.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.fillBoardSagaFactory = exports.fillBoardCommand = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var playerSelectors_1 = __webpack_require__(/*! ../playerSelectors */ "../shared/lib/game/player/playerSelectors.js");
var actions_1 = __webpack_require__(/*! ../actions */ "../shared/lib/game/player/actions.js");
var FILL_BOARD_COMMAND = "FILL_BOARD_COMMAND";
exports.fillBoardCommand = function () { return ({ type: FILL_BOARD_COMMAND }); };
exports.fillBoardSagaFactory = function (playerId) {
    return function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeEvery(FILL_BOARD_COMMAND, function () {
                        var isAlive, state, belowPieceLimit, benchPiece, destination, fromLocation, toLocation;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.select(playerSelectors_1.isPlayerAlive)];
                                case 1:
                                    isAlive = _a.sent();
                                    if (!isAlive) {
                                        return [2 /*return*/];
                                    }
                                    _a.label = 2;
                                case 2:
                                    if (false) {}
                                    return [4 /*yield*/, effects_1.select()];
                                case 3:
                                    state = _a.sent();
                                    belowPieceLimit = playerSelectors_1.getPlayerBelowPieceLimit(state, playerId);
                                    if (!belowPieceLimit) {
                                        return [2 /*return*/];
                                    }
                                    benchPiece = playerSelectors_1.getMostExpensiveBenchPiece(state);
                                    if (!benchPiece) {
                                        return [2 /*return*/];
                                    }
                                    destination = playerSelectors_1.getPlayerFirstEmptyBoardSlot(state);
                                    if (!destination) {
                                        return [2 /*return*/];
                                    }
                                    fromLocation = {
                                        type: "bench",
                                        location: {
                                            slot: benchPiece.position.x
                                        }
                                    };
                                    toLocation = {
                                        type: "board",
                                        location: {
                                            x: destination.x,
                                            y: destination.y
                                        }
                                    };
                                    return [4 /*yield*/, effects_1.put(actions_1.playerDropPieceAction(benchPiece.id, fromLocation, toLocation))];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 2];
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
};


/***/ }),

/***/ "../shared/lib/game/player/sagas/health.js":
/*!*************************************************!*\
  !*** ../shared/lib/game/player/sagas/health.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.healthSagaFactory = exports.subtractHealthCommand = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var commands_1 = __webpack_require__(/*! ../playerInfo/commands */ "../shared/lib/game/player/playerInfo/commands.js");
var HEALTH_SUBTRACT_COMMAND = "HEALTH_SUBTRACT_COMMAND";
// todo remove currentround from here
exports.subtractHealthCommand = function (currentRound, amount) { return ({
    type: HEALTH_SUBTRACT_COMMAND,
    payload: { currentRound: currentRound, amount: amount }
}); };
exports.healthSagaFactory = function () {
    return function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = effects_1.all;
                    return [4 /*yield*/, effects_1.takeEvery(HEALTH_SUBTRACT_COMMAND, function (_a) {
                            var state, oldValue, newValue;
                            var _b = _a.payload, currentRound = _b.currentRound, amount = _b.amount;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, effects_1.select()];
                                    case 1:
                                        state = _c.sent();
                                        oldValue = state.playerInfo.health;
                                        newValue = oldValue - amount;
                                        newValue = (newValue < 0) ? 0 : newValue;
                                        return [4 /*yield*/, effects_1.put(commands_1.updateHealthCommand(newValue))];
                                    case 2:
                                        _c.sent();
                                        if (!(newValue === 0 && oldValue !== 0)) return [3 /*break*/, 4];
                                        // player has just died
                                        return [4 /*yield*/, effects_1.put(commands_1.updateRoundDiedAtCommand(currentRound))];
                                    case 3:
                                        // player has just died
                                        _c.sent();
                                        _c.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        })];
                case 1: return [4 /*yield*/, _a.apply(void 0, [[
                            _b.sent()
                        ]])];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    };
};


/***/ }),

/***/ "../shared/lib/game/player/sagas/index.js":
/*!************************************************!*\
  !*** ../shared/lib/game/player/sagas/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var evolution_1 = __webpack_require__(/*! ./evolution */ "../shared/lib/game/player/sagas/evolution.js");
__createBinding(exports, evolution_1, "evolutionSagaFactory");
var fillBoard_1 = __webpack_require__(/*! ./fillBoard */ "../shared/lib/game/player/sagas/fillBoard.js");
__createBinding(exports, fillBoard_1, "fillBoardCommand");
__createBinding(exports, fillBoard_1, "fillBoardSagaFactory");
var health_1 = __webpack_require__(/*! ./health */ "../shared/lib/game/player/sagas/health.js");
__createBinding(exports, health_1, "subtractHealthCommand");
__createBinding(exports, health_1, "healthSagaFactory");
var xp_1 = __webpack_require__(/*! ./xp */ "../shared/lib/game/player/sagas/xp.js");
__createBinding(exports, xp_1, "addXpCommand");
__createBinding(exports, xp_1, "xpSagaFactory");
var streak_1 = __webpack_require__(/*! ./streak */ "../shared/lib/game/player/sagas/streak.js");
__createBinding(exports, streak_1, "playerStreak");
var battle_1 = __webpack_require__(/*! ./battle */ "../shared/lib/game/player/sagas/battle.js");
__createBinding(exports, battle_1, "playerBattle");
var matchRewards_1 = __webpack_require__(/*! ./matchRewards */ "../shared/lib/game/player/sagas/matchRewards.js");
__createBinding(exports, matchRewards_1, "playerMatchRewards");
var playerPropertyUpdates_1 = __webpack_require__(/*! ./playerPropertyUpdates */ "../shared/lib/game/player/sagas/playerPropertyUpdates.js");
__createBinding(exports, playerPropertyUpdates_1, "createPropertyUpdateRegistry");
exports.PlayerActionSagas = __webpack_require__(/*! ./playerActions */ "../shared/lib/game/player/sagas/playerActions/index.js");


/***/ }),

/***/ "../shared/lib/game/player/sagas/matchRewards.js":
/*!*******************************************************!*\
  !*** ../shared/lib/game/player/sagas/matchRewards.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.playerMatchRewards = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var events_1 = __webpack_require__(/*! ../events */ "../shared/lib/game/player/events.js");
var commands_1 = __webpack_require__(/*! ../playerInfo/commands */ "../shared/lib/game/player/playerInfo/commands.js");
var xp_1 = __webpack_require__(/*! ./xp */ "../shared/lib/game/player/sagas/xp.js");
var getStreakBonus = function (streak) {
    if (streak >= 9) {
        return 3;
    }
    if (streak >= 6) {
        return 2;
    }
    if (streak >= 3) {
        return 1;
    }
    return 0;
};
var getMoneyForMatch = function (currentMoney, streak, win) {
    var base = 3;
    var winBonus = win ? 1 : 0;
    var streakBonus = getStreakBonus(streak);
    var interest = Math.min(Math.floor(currentMoney / 10), 5);
    var total = base + winBonus + streakBonus + interest;
    return total;
};
exports.playerMatchRewards = function (sagaMiddleware) {
    sagaMiddleware.run(function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeLatest(events_1.PLAYER_FINISH_MATCH_EVENT, function (_a) {
                        var win, currentMoney, streak, rewardMoney;
                        var _b = _a.payload, homeScore = _b.homeScore, awayScore = _b.awayScore;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    win = homeScore > awayScore;
                                    // wait for preparing phase to give money
                                    return [4 /*yield*/, effects_1.take(commands_1.CLEAR_OPPONENT_COMMAND)];
                                case 1:
                                    // wait for preparing phase to give money
                                    _c.sent();
                                    return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.money; })];
                                case 2:
                                    currentMoney = _c.sent();
                                    return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.streak.amount; })];
                                case 3:
                                    streak = _c.sent();
                                    rewardMoney = getMoneyForMatch(currentMoney, streak, win);
                                    // todo make addMoneyCommand
                                    return [4 /*yield*/, effects_1.put(commands_1.updateMoneyCommand(currentMoney + rewardMoney))];
                                case 4:
                                    // todo make addMoneyCommand
                                    _c.sent();
                                    return [4 /*yield*/, effects_1.put(xp_1.addXpCommand(1))];
                                case 5:
                                    _c.sent();
                                    return [2 /*return*/];
                            }
                        });
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};


/***/ }),

/***/ "../shared/lib/game/player/sagas/playerActions/buyCard.js":
/*!****************************************************************!*\
  !*** ../shared/lib/game/player/sagas/playerActions/buyCard.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.buyCardPlayerActionSagaFactory = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! ../../actions */ "../shared/lib/game/player/actions.js");
var board_1 = __webpack_require__(/*! ../../../../board */ "../shared/lib/board/index.js");
var piece_utils_1 = __webpack_require__(/*! ../../../../utils/piece-utils */ "../shared/lib/utils/piece-utils.js");
var commands_1 = __webpack_require__(/*! ../../bench/commands */ "../shared/lib/game/player/bench/commands.js");
var log_1 = __webpack_require__(/*! ../../../../log */ "../shared/lib/log.js");
var playerSelectors_1 = __webpack_require__(/*! ../../playerSelectors */ "../shared/lib/game/player/playerSelectors.js");
var commands_2 = __webpack_require__(/*! ../../playerInfo/commands */ "../shared/lib/game/player/playerInfo/commands.js");
var pieceSelectors_1 = __webpack_require__(/*! ../../pieceSelectors */ "../shared/lib/game/player/pieceSelectors.js");
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
    var benchSlot = pieceSelectors_1.getFirstEmptyBenchSlot(state);
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
exports.buyCardPlayerActionSagaFactory = function (definitionProvider, playerId) {
    return function () {
        var _loop_1, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function () {
                        var index, state, card, money, destination, piece, remainingCards;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.take(actions_1.BUY_CARD_ACTION)];
                                case 1:
                                    index = (_a.sent()).payload.index;
                                    return [4 /*yield*/, effects_1.select()];
                                case 2:
                                    state = _a.sent();
                                    card = state.playerInfo.cards[index];
                                    money = state.playerInfo.money;
                                    // card doesn't exist or player can't afford
                                    if (!card) {
                                        log_1.log("attempted to buy null/undefined card");
                                        return [2 /*return*/, { value: void 0 }];
                                    }
                                    if (money < card.cost) {
                                        log_1.log("attempted to buy card costing $" + card.cost + " but only had $" + money);
                                        return [2 /*return*/, { value: void 0 }];
                                    }
                                    destination = getCardDestination(state, playerId);
                                    // no valid slots
                                    if (destination === null) {
                                        log_1.log("attempted to buy a card but has no available destination");
                                        return [2 /*return*/, { value: void 0 }];
                                    }
                                    piece = piece_utils_1.createPieceFromCard(definitionProvider, playerId, card);
                                    remainingCards = state.playerInfo.cards.map(function (c) { return c === card ? null : c; });
                                    if (!(destination.type === "board")) return [3 /*break*/, 4];
                                    return [4 /*yield*/, effects_1.put(board_1.BoardCommands.addBoardPiece(piece, destination.location.x, destination.location.y))];
                                case 3:
                                    _a.sent();
                                    return [3 /*break*/, 6];
                                case 4:
                                    if (!(destination.type === "bench")) return [3 /*break*/, 6];
                                    return [4 /*yield*/, effects_1.put(commands_1.addBenchPieceCommand(piece, destination.location.slot))];
                                case 5:
                                    _a.sent();
                                    _a.label = 6;
                                case 6: return [4 /*yield*/, effects_1.put(commands_2.updateMoneyCommand(money - card.cost))];
                                case 7:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(commands_2.updateCardsCommand(remainingCards))];
                                case 8:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 1;
                case 1:
                    if (false) {}
                    return [5 /*yield**/, _loop_1()];
                case 2:
                    state_1 = _a.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    };
};


/***/ }),

/***/ "../shared/lib/game/player/sagas/playerActions/buyXp.js":
/*!**************************************************************!*\
  !*** ../shared/lib/game/player/sagas/playerActions/buyXp.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.buyXpPlayerActionSagaFactory = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! ../../actions */ "../shared/lib/game/player/actions.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var playerSelectors_1 = __webpack_require__(/*! ../../playerSelectors */ "../shared/lib/game/player/playerSelectors.js");
var commands_1 = __webpack_require__(/*! ../../playerInfo/commands */ "../shared/lib/game/player/playerInfo/commands.js");
var xp_1 = __webpack_require__(/*! ../xp */ "../shared/lib/game/player/sagas/xp.js");
exports.buyXpPlayerActionSagaFactory = function () {
    return function () {
        var isAlive, currentLevel, money;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (false) {}
                    return [4 /*yield*/, effects_1.take(actions_1.BUY_XP_ACTION)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, effects_1.select(playerSelectors_1.isPlayerAlive)];
                case 2:
                    isAlive = _a.sent();
                    if (isAlive === false) {
                        console.log("Attempted to reroll, but dead");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.level; })];
                case 3:
                    currentLevel = _a.sent();
                    if (currentLevel === models_1.MAX_PLAYER_LEVEL) {
                        console.log("Attempted to buy xp, but at max level");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.money; })];
                case 4:
                    money = _a.sent();
                    // not enough money
                    if (money < models_1.BUY_XP_COST) {
                        console.log("Attempted to buy xp costing $" + models_1.BUY_XP_COST + " but only had $" + money);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, effects_1.put(xp_1.addXpCommand(models_1.BUY_XP_AMOUNT))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, effects_1.put(commands_1.updateMoneyCommand(money - models_1.BUY_XP_COST))];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 7: return [2 /*return*/];
            }
        });
    };
};


/***/ }),

/***/ "../shared/lib/game/player/sagas/playerActions/dropPiece.js":
/*!******************************************************************!*\
  !*** ../shared/lib/game/player/sagas/playerActions/dropPiece.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.dropPiecePlayerActionSagaFactory = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! ../../actions */ "../shared/lib/game/player/actions.js");
var pieceSelectors = __webpack_require__(/*! ../../pieceSelectors */ "../shared/lib/game/player/pieceSelectors.js");
var board_1 = __webpack_require__(/*! ../../../../board */ "../shared/lib/board/index.js");
var commands_1 = __webpack_require__(/*! ../../bench/commands */ "../shared/lib/game/player/bench/commands.js");
var playerSelectors_1 = __webpack_require__(/*! ../../playerSelectors */ "../shared/lib/game/player/playerSelectors.js");
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
exports.dropPiecePlayerActionSagaFactory = function (playerId) {
    return function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeEvery(actions_1.PLAYER_DROP_PIECE_ACTION, function (_a) {
                        var state, fromPiece, toPiece, belowPieceLimit;
                        var _b = _a.payload, from = _b.from, pieceId = _b.pieceId, to = _b.to;
                        return __generator(this, function (_c) {
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
                                    return [4 /*yield*/, effects_1.put(board_1.BoardCommands.moveBoardPiece(pieceId, from.location, to.location))];
                                case 2:
                                    _c.sent();
                                    return [3 /*break*/, 11];
                                case 3:
                                    if (!(from.type !== "board" && to.type !== "board")) return [3 /*break*/, 5];
                                    return [4 /*yield*/, effects_1.put(commands_1.moveBenchPieceCommand(pieceId, from.location, to.location))];
                                case 4:
                                    _c.sent();
                                    return [3 /*break*/, 11];
                                case 5:
                                    if (!(from.type === "board" && to.type !== "board")) return [3 /*break*/, 8];
                                    return [4 /*yield*/, effects_1.put(board_1.BoardCommands.removeBoardPiece(pieceId))];
                                case 6:
                                    _c.sent();
                                    return [4 /*yield*/, effects_1.put(commands_1.addBenchPieceCommand(fromPiece, to.location.slot))];
                                case 7:
                                    _c.sent();
                                    return [3 /*break*/, 11];
                                case 8:
                                    if (!(from.type !== "board" && to.type === "board")) return [3 /*break*/, 11];
                                    return [4 /*yield*/, effects_1.put(commands_1.removeBenchPieceCommand(pieceId))];
                                case 9:
                                    _c.sent();
                                    return [4 /*yield*/, effects_1.put(board_1.BoardCommands.addBoardPiece(fromPiece, to.location.x, to.location.y))];
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

/***/ "../shared/lib/game/player/sagas/playerActions/index.js":
/*!**************************************************************!*\
  !*** ../shared/lib/game/player/sagas/playerActions/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var buyCard_1 = __webpack_require__(/*! ./buyCard */ "../shared/lib/game/player/sagas/playerActions/buyCard.js");
__createBinding(exports, buyCard_1, "buyCardPlayerActionSagaFactory");
var buyXp_1 = __webpack_require__(/*! ./buyXp */ "../shared/lib/game/player/sagas/playerActions/buyXp.js");
__createBinding(exports, buyXp_1, "buyXpPlayerActionSagaFactory");
var dropPiece_1 = __webpack_require__(/*! ./dropPiece */ "../shared/lib/game/player/sagas/playerActions/dropPiece.js");
__createBinding(exports, dropPiece_1, "dropPiecePlayerActionSagaFactory");
var rerollCards_1 = __webpack_require__(/*! ./rerollCards */ "../shared/lib/game/player/sagas/playerActions/rerollCards.js");
__createBinding(exports, rerollCards_1, "rerollCardsPlayerActionSagaFactory");
var sellPiece_1 = __webpack_require__(/*! ./sellPiece */ "../shared/lib/game/player/sagas/playerActions/sellPiece.js");
__createBinding(exports, sellPiece_1, "sellPiecePlayerActionSagaFactory");
var toggleShopLock_1 = __webpack_require__(/*! ./toggleShopLock */ "../shared/lib/game/player/sagas/playerActions/toggleShopLock.js");
__createBinding(exports, toggleShopLock_1, "toggleShopLockPlayerActionSagaFactory");


/***/ }),

/***/ "../shared/lib/game/player/sagas/playerActions/rerollCards.js":
/*!********************************************************************!*\
  !*** ../shared/lib/game/player/sagas/playerActions/rerollCards.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.rerollCardsPlayerActionSagaFactory = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! ../../actions */ "../shared/lib/game/player/actions.js");
var commands_1 = __webpack_require__(/*! ../../playerInfo/commands */ "../shared/lib/game/player/playerInfo/commands.js");
var events_1 = __webpack_require__(/*! ../../events */ "../shared/lib/game/player/events.js");
var playerSelectors_1 = __webpack_require__(/*! ../../playerSelectors */ "../shared/lib/game/player/playerSelectors.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
exports.rerollCardsPlayerActionSagaFactory = function () {
    return function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeEvery(actions_1.REROLL_CARDS_ACTION, function () {
                        var isAlive, money;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.select(playerSelectors_1.isPlayerAlive)];
                                case 1:
                                    isAlive = _a.sent();
                                    if (isAlive === false) {
                                        console.log("Attempted to reroll, but dead");
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.money; })];
                                case 2:
                                    money = _a.sent();
                                    // not enough money
                                    if (money < models_1.REROLL_COST) {
                                        console.log("Attempted to reroll costing $" + models_1.REROLL_COST + " but only had $" + money);
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, effects_1.put(commands_1.updateMoneyCommand(money - models_1.REROLL_COST))];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(events_1.afterRerollCardsEvent())];
                                case 4:
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
};


/***/ }),

/***/ "../shared/lib/game/player/sagas/playerActions/sellPiece.js":
/*!******************************************************************!*\
  !*** ../shared/lib/game/player/sagas/playerActions/sellPiece.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.sellPiecePlayerActionSagaFactory = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var pieceSelectors_1 = __webpack_require__(/*! ../../pieceSelectors */ "../shared/lib/game/player/pieceSelectors.js");
var utils_1 = __webpack_require__(/*! ../../../../utils */ "../shared/lib/utils/index.js");
var actions_1 = __webpack_require__(/*! ../../actions */ "../shared/lib/game/player/actions.js");
var commands_1 = __webpack_require__(/*! ../../playerInfo/commands */ "../shared/lib/game/player/playerInfo/commands.js");
var commands_2 = __webpack_require__(/*! ../../bench/commands */ "../shared/lib/game/player/bench/commands.js");
var board_1 = __webpack_require__(/*! ../../../../board */ "../shared/lib/board/index.js");
var events_1 = __webpack_require__(/*! ../../events */ "../shared/lib/game/player/events.js");
exports.sellPiecePlayerActionSagaFactory = function () {
    return function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeEvery(actions_1.PLAYER_SELL_PIECE_ACTION, function (_a) {
                        var piece, piecesUsed, pieceCost, currentMoney;
                        var pieceId = _a.payload.pieceId;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, effects_1.select(function (state) { return pieceSelectors_1.getPiece(state, pieceId); })];
                                case 1:
                                    piece = _b.sent();
                                    if (!piece) {
                                        console.log("Attempted to sell piece with id " + pieceId + " but did not own it");
                                        return [2 /*return*/];
                                    }
                                    piecesUsed = utils_1.getPiecesForStage(piece.stage);
                                    pieceCost = piece.definition.cost;
                                    return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.money; })];
                                case 2:
                                    currentMoney = _b.sent();
                                    return [4 /*yield*/, effects_1.put(commands_1.updateMoneyCommand(currentMoney + (pieceCost * piecesUsed)))];
                                case 3:
                                    _b.sent();
                                    if (!(piece.position.y === null)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, effects_1.put(commands_2.removeBenchPieceCommand(pieceId))];
                                case 4:
                                    _b.sent();
                                    return [3 /*break*/, 7];
                                case 5: return [4 /*yield*/, effects_1.put(board_1.BoardCommands.removeBoardPiece(pieceId))];
                                case 6:
                                    _b.sent();
                                    _b.label = 7;
                                case 7: return [4 /*yield*/, effects_1.put(events_1.afterSellPieceEvent(piece))];
                                case 8:
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

/***/ "../shared/lib/game/player/sagas/playerActions/toggleShopLock.js":
/*!***********************************************************************!*\
  !*** ../shared/lib/game/player/sagas/playerActions/toggleShopLock.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.toggleShopLockPlayerActionSagaFactory = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! ../../actions */ "../shared/lib/game/player/actions.js");
var commands_1 = __webpack_require__(/*! ../../playerInfo/commands */ "../shared/lib/game/player/playerInfo/commands.js");
var playerSelectors_1 = __webpack_require__(/*! ../../playerSelectors */ "../shared/lib/game/player/playerSelectors.js");
exports.toggleShopLockPlayerActionSagaFactory = function () {
    return function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeEvery(actions_1.TOGGLE_SHOP_LOCK_ACTION, function () {
                        var currentLockState;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.select(playerSelectors_1.isPlayerShopLocked)];
                                case 1:
                                    currentLockState = _a.sent();
                                    return [4 /*yield*/, effects_1.put(commands_1.updateShopLockCommand(!currentLockState))];
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
};


/***/ }),

/***/ "../shared/lib/game/player/sagas/playerPropertyUpdates.js":
/*!****************************************************************!*\
  !*** ../shared/lib/game/player/sagas/playerPropertyUpdates.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createPropertyUpdateRegistry = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var playerInfo_1 = __webpack_require__(/*! ../playerInfo */ "../shared/lib/game/player/playerInfo/index.js");
var actions_1 = __webpack_require__(/*! ../actions */ "../shared/lib/game/player/actions.js");
var PlayerPropertyUpdateEvent;
(function (PlayerPropertyUpdateEvent) {
    PlayerPropertyUpdateEvent["UPDATE_HEALTH"] = "UPDATE_HEALTH";
    PlayerPropertyUpdateEvent["UPDATE_READY"] = "UPDATE_READY";
    PlayerPropertyUpdateEvent["UPDATE_STREAK"] = "UPDATE_STREAK";
    PlayerPropertyUpdateEvent["UPDATE_BATTLE"] = "UPDATE_BATTLE";
    PlayerPropertyUpdateEvent["UPDATE_STATUS"] = "UPDATE_STATUS";
})(PlayerPropertyUpdateEvent || (PlayerPropertyUpdateEvent = {}));
exports.createPropertyUpdateRegistry = function (sagaMiddleware) {
    var events = new events_1.EventEmitter();
    sagaMiddleware.run(function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = effects_1.all;
                    return [4 /*yield*/, effects_1.takeLatest(playerInfo_1.PlayerInfoCommands.UPDATE_HEALTH_COMMAND, function (_a) {
                            var health = _a.payload.health;
                            return __generator(this, function (_b) {
                                events.emit(PlayerPropertyUpdateEvent.UPDATE_HEALTH, health);
                                return [2 /*return*/];
                            });
                        })];
                case 1:
                    _b = [
                        _c.sent()
                    ];
                    return [4 /*yield*/, effects_1.takeLatest(playerInfo_1.PlayerInfoCommands.UPDATE_STREAK_COMMAND, function (_a) {
                            var streak = _a.payload;
                            return __generator(this, function (_b) {
                                events.emit(PlayerPropertyUpdateEvent.UPDATE_STREAK, streak);
                                return [2 /*return*/];
                            });
                        })];
                case 2:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.takeLatest(playerInfo_1.PlayerInfoCommands.UPDATE_STATUS_COMMAND, function (_a) {
                            var status = _a.payload.status;
                            return __generator(this, function (_b) {
                                events.emit(PlayerPropertyUpdateEvent.UPDATE_STATUS, status);
                                return [2 /*return*/];
                            });
                        })];
                case 3:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.takeLatest(playerInfo_1.PlayerInfoCommands.UPDATE_BATTLE_COMMAND, function (_a) {
                            var battle = _a.payload.battle;
                            return __generator(this, function (_b) {
                                events.emit(PlayerPropertyUpdateEvent.UPDATE_BATTLE, battle);
                                return [2 /*return*/];
                            });
                        })];
                case 4:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    // todo create a single "READY_UPDATED" action
                    return [4 /*yield*/, effects_1.takeLatest(actions_1.READY_UP_ACTION, function () {
                            return __generator(this, function (_a) {
                                events.emit(PlayerPropertyUpdateEvent.UPDATE_READY, true);
                                return [2 /*return*/];
                            });
                        })];
                case 5:
                    _b = _b.concat([
                        // todo create a single "READY_UPDATED" action
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.takeLatest(playerInfo_1.PlayerInfoCommands.CLEAR_OPPONENT_COMMAND, function () {
                            return __generator(this, function (_a) {
                                events.emit(PlayerPropertyUpdateEvent.UPDATE_READY, false);
                                return [2 /*return*/];
                            });
                        })];
                case 6: return [4 /*yield*/, _a.apply(void 0, [_b.concat([
                            _c.sent()
                        ])])];
                case 7:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
    return {
        onHealthUpdate: function (fn) {
            return events.on(PlayerPropertyUpdateEvent.UPDATE_HEALTH, fn);
        },
        onReadyUpdate: function (fn) {
            events.on(PlayerPropertyUpdateEvent.UPDATE_READY, fn);
            return function () { return events.off(PlayerPropertyUpdateEvent.UPDATE_READY, fn); };
        },
        onStreakUpdate: function (fn) {
            return events.on(PlayerPropertyUpdateEvent.UPDATE_STREAK, fn);
        },
        onBattleUpdate: function (fn) {
            return events.on(PlayerPropertyUpdateEvent.UPDATE_BATTLE, fn);
        },
        onStatusUpdate: function (fn) {
            return events.on(PlayerPropertyUpdateEvent.UPDATE_STATUS, fn);
        }
    };
};


/***/ }),

/***/ "../shared/lib/game/player/sagas/streak.js":
/*!*************************************************!*\
  !*** ../shared/lib/game/player/sagas/streak.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.playerStreak = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var events_1 = __webpack_require__(/*! ../events */ "../shared/lib/game/player/events.js");
var commands_1 = __webpack_require__(/*! ../playerInfo/commands */ "../shared/lib/game/player/playerInfo/commands.js");
exports.playerStreak = function (sagaMiddleware) {
    sagaMiddleware.run(function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeLatest(events_1.PLAYER_FINISH_MATCH_EVENT, function (_a) {
                        var win, type, existingStreak, newAmount;
                        var _b = _a.payload, homeScore = _b.homeScore, awayScore = _b.awayScore;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    win = homeScore > awayScore;
                                    type = win ? models_1.StreakType.WIN : models_1.StreakType.LOSS;
                                    return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.streak; })];
                                case 1:
                                    existingStreak = _c.sent();
                                    newAmount = (type === existingStreak.type) ? existingStreak.amount + 1 : 0;
                                    return [4 /*yield*/, effects_1.put(commands_1.updateStreakCommand(type, newAmount))];
                                case 2:
                                    _c.sent();
                                    return [2 /*return*/];
                            }
                        });
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};


/***/ }),

/***/ "../shared/lib/game/player/sagas/xp.js":
/*!*********************************************!*\
  !*** ../shared/lib/game/player/sagas/xp.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.xpSagaFactory = exports.addXpCommand = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var commands_1 = __webpack_require__(/*! ../playerInfo/commands */ "../shared/lib/game/player/playerInfo/commands.js");
var utils_1 = __webpack_require__(/*! ../../../utils */ "../shared/lib/utils/index.js");
var ADD_XP_COMMAND = "ADD_XP_COMMAND";
exports.addXpCommand = function (amount) { return ({
    type: ADD_XP_COMMAND,
    payload: { amount: amount }
}); };
exports.xpSagaFactory = function () {
    return function () {
        var amount, level, xp, i, toNextLevel, newXp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (false) {}
                    return [4 /*yield*/, effects_1.take(ADD_XP_COMMAND)];
                case 1:
                    amount = (_a.sent()).payload.amount;
                    return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.level; })];
                case 2:
                    level = _a.sent();
                    return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.xp; })];
                case 3:
                    xp = _a.sent();
                    for (i = 0; i < amount; i++) {
                        toNextLevel = utils_1.getXpToNextLevel(level);
                        newXp = xp + 1;
                        if (newXp === toNextLevel) {
                            xp = 0;
                            level++;
                        }
                        else {
                            xp = newXp;
                        }
                    }
                    return [4 /*yield*/, effects_1.put(commands_1.updateLevelCommand(level, xp))];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 5: return [2 /*return*/];
            }
        });
    };
};


/***/ }),

/***/ "../shared/lib/game/player/store.js":
/*!******************************************!*\
  !*** ../shared/lib/game/player/store.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createPlayerStore = void 0;
var redux_1 = __webpack_require__(/*! redux */ "../shared/node_modules/redux/es/redux.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "../shared/node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../shared/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var board_1 = __webpack_require__(/*! ../../board */ "../shared/lib/board/index.js");
var definitionProvider_1 = __webpack_require__(/*! ../definitions/definitionProvider */ "../shared/lib/game/definitions/definitionProvider.js");
var bench_1 = __webpack_require__(/*! ./bench */ "../shared/lib/game/player/bench/index.js");
var playerInfo_1 = __webpack_require__(/*! ./playerInfo */ "../shared/lib/game/player/playerInfo/index.js");
var sagas_1 = __webpack_require__(/*! ./sagas */ "../shared/lib/game/player/sagas/index.js");
exports.createPlayerStore = function (playerId) {
    var rootSaga = function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = effects_1.all;
                    return [4 /*yield*/, effects_1.fork(sagas_1.PlayerActionSagas.buyCardPlayerActionSagaFactory(new definitionProvider_1.DefinitionProvider(), playerId))];
                case 1:
                    _b = [
                        _c.sent()
                    ];
                    return [4 /*yield*/, effects_1.fork(sagas_1.PlayerActionSagas.buyXpPlayerActionSagaFactory())];
                case 2:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(sagas_1.PlayerActionSagas.dropPiecePlayerActionSagaFactory(playerId))];
                case 3:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(sagas_1.PlayerActionSagas.rerollCardsPlayerActionSagaFactory())];
                case 4:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(sagas_1.PlayerActionSagas.toggleShopLockPlayerActionSagaFactory())];
                case 5:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(sagas_1.PlayerActionSagas.sellPiecePlayerActionSagaFactory())];
                case 6:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(sagas_1.evolutionSagaFactory())];
                case 7:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(sagas_1.healthSagaFactory())];
                case 8:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(sagas_1.xpSagaFactory())];
                case 9:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(sagas_1.fillBoardSagaFactory(playerId))];
                case 10: return [4 /*yield*/, _a.apply(void 0, [_b.concat([
                            _c.sent()
                        ])])];
                case 11:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    };
    var sagaMiddleware = redux_saga_1["default"]();
    var store = redux_1.createStore(redux_1.combineReducers({
        board: board_1.boardReducer,
        bench: bench_1.benchReducer,
        playerInfo: playerInfo_1.playerInfoReducer
    }), redux_1.applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return {
        store: store,
        sagaMiddleware: sagaMiddleware
    };
};


/***/ }),

/***/ "../shared/lib/game/playerList.js":
/*!****************************************!*\
  !*** ../shared/lib/game/playerList.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PlayerList = void 0;
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var utils_1 = __webpack_require__(/*! ../utils */ "../shared/lib/utils/index.js");
var PlayerListEvents;
(function (PlayerListEvents) {
    PlayerListEvents["UPDATE"] = "UPDATE";
})(PlayerListEvents || (PlayerListEvents = {}));
var sortPlayers = function (a, b) {
    var SORT_A_FIRST = -1;
    var SORT_A_SECOND = 1;
    if (a.status !== models_1.PlayerStatus.QUIT && b.status === models_1.PlayerStatus.QUIT) {
        return SORT_A_FIRST;
    }
    if (a.status === models_1.PlayerStatus.QUIT && b.status !== models_1.PlayerStatus.QUIT) {
        return SORT_A_SECOND;
    }
    if (a.health > b.health) {
        return SORT_A_FIRST;
    }
    if (a.health < b.health) {
        return SORT_A_SECOND;
    }
    if (a.roundDiedAt > b.roundDiedAt) {
        return SORT_A_FIRST;
    }
    if (a.roundDiedAt < b.roundDiedAt) {
        return SORT_A_SECOND;
    }
    return 0;
};
var PlayerList = /** @class */ (function () {
    function PlayerList() {
        var _this = this;
        this.players = [];
        this.events = new events_1.EventEmitter();
        this.emitUpdate = utils_1.debounce(function () {
            // incase the debounce lands after deconstructor is called
            // todo cancel this manually
            if (!_this.events) {
                return;
            }
            _this.events.emit(PlayerListEvents.UPDATE, _this.players);
        }, 500);
        this.getValue = function () { return _this.players; };
    }
    PlayerList.prototype.deconstructor = function () {
        this.events.removeAllListeners();
        this.events = null;
    };
    PlayerList.prototype.onUpdate = function (fn) {
        this.events.on(PlayerListEvents.UPDATE, fn);
    };
    PlayerList.prototype.addPlayer = function (player) {
        var streak = player.getStreak();
        var playerListPlayer = {
            id: player.id,
            name: player.name,
            health: player.getHealth(),
            ready: player.getReady(),
            level: player.getLevel(),
            money: player.getMoney(),
            streakType: streak.type,
            streakAmount: streak.amount,
            battle: null,
            roundDiedAt: player.getRoundDiedAt(),
            status: player.getStatus()
        };
        this.players.push(playerListPlayer);
        var update = this.updatePlayer(player);
        player.propertyUpdates().onReadyUpdate(update);
        player.propertyUpdates().onStreakUpdate(update);
        player.propertyUpdates().onHealthUpdate(update);
        player.propertyUpdates().onBattleUpdate(update);
        player.propertyUpdates().onStatusUpdate(update);
    };
    PlayerList.prototype.updatePlayer = function (player) {
        var _this = this;
        return function () {
            var index = _this.players.findIndex(function (p) { return p.id === player.id; });
            if (index === -1) {
                return;
            }
            _this.players.splice(index, 1);
            var streak = player.getStreak();
            _this.players.push({
                id: player.id,
                name: player.name,
                health: player.getHealth(),
                ready: player.getReady(),
                level: player.getLevel(),
                money: player.getMoney(),
                streakType: streak.type,
                streakAmount: streak.amount,
                battle: player.getBattle(),
                roundDiedAt: player.getRoundDiedAt(),
                status: player.getStatus()
            });
            _this.players.sort(sortPlayers);
            _this.emitUpdate();
        };
    };
    return PlayerList;
}());
exports.PlayerList = PlayerList;


/***/ }),

/***/ "../shared/lib/game/readyNotifier.js":
/*!*******************************************!*\
  !*** ../shared/lib/game/readyNotifier.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.readyNotifier = void 0;
var limitedQueue_1 = __webpack_require__(/*! ../utils/limitedQueue */ "../shared/lib/utils/limitedQueue.js");
exports.readyNotifier = function (livingPlayers) {
    var queue = limitedQueue_1.limitedQueue(livingPlayers.length);
    var disposePlayerFns = livingPlayers.map(function (player) {
        var disposeReady = player.propertyUpdates().onReadyUpdate(function (ready) {
            if (ready) {
                queue.add(player.id);
            }
        });
        var disposeQuit = player.onQuitGame(function () {
            if (player.isAlive() && player.getReady() === false) {
                queue.add(player.id);
            }
        });
        return function () {
            disposeReady();
            disposeQuit();
        };
    });
    var deferred = limitedQueue_1.deferLimitedQueue(queue);
    return {
        promise: deferred.promise,
        dispose: function () {
            disposePlayerFns.forEach(function (fn) { return fn(); });
            deferred.dispose();
        }
    };
};


/***/ }),

/***/ "../shared/lib/game/store/events.js":
/*!******************************************!*\
  !*** ../shared/lib/game/store/events.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.playersResurrectedEvent = exports.PLAYERS_RESURRECTED_EVENT = exports.playerListChangedEvent = exports.PLAYER_LIST_CHANGED_EVENT = exports.gameFinishEvent = exports.GAME_FINISH_EVENT = exports.gamePhaseStartedEvent = exports.GAME_PHASE_STARTED_EVENT = void 0;
exports.GAME_PHASE_STARTED_EVENT = "GAME_PHASE_STARTED_EVENT";
exports.gamePhaseStartedEvent = function (phase, startedAt, round) { return ({
    type: exports.GAME_PHASE_STARTED_EVENT,
    payload: { phase: phase, startedAt: startedAt, round: round }
}); };
exports.GAME_FINISH_EVENT = "GAME_FINISH_EVENT";
exports.gameFinishEvent = function (winnerName) { return ({
    type: exports.GAME_FINISH_EVENT,
    payload: { winnerName: winnerName }
}); };
exports.PLAYER_LIST_CHANGED_EVENT = "PLAYER_LIST_CHANGED_EVENT";
exports.playerListChangedEvent = function (players) { return ({
    type: exports.PLAYER_LIST_CHANGED_EVENT,
    payload: { players: players }
}); };
exports.PLAYERS_RESURRECTED_EVENT = "PLAYERS_RESURRECTED_EVENT";
exports.playersResurrectedEvent = function (playerIds) { return ({
    type: exports.PLAYERS_RESURRECTED_EVENT,
    payload: { playerIds: playerIds }
}); };


/***/ }),

/***/ "../shared/lib/game/store/index.js":
/*!*****************************************!*\
  !*** ../shared/lib/game/store/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var store_1 = __webpack_require__(/*! ./store */ "../shared/lib/game/store/store.js");
__createBinding(exports, store_1, "createGameStore");
var reducer_1 = __webpack_require__(/*! ./reducer */ "../shared/lib/game/store/reducer.js");
__createBinding(exports, reducer_1, "reducer", "gameReducer");
exports.GameEvents = __webpack_require__(/*! ./events */ "../shared/lib/game/store/events.js");


/***/ }),

/***/ "../shared/lib/game/store/reducer.js":
/*!*******************************************!*\
  !*** ../shared/lib/game/store/reducer.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.reducer = exports.initialState = void 0;
var events_1 = __webpack_require__(/*! ./events */ "../shared/lib/game/store/events.js");
exports.initialState = {
    round: null,
    phase: null,
    phaseStartedAtSeconds: null
};
function reducer(state, command) {
    if (state === void 0) { state = exports.initialState; }
    switch (command.type) {
        case events_1.GAME_PHASE_STARTED_EVENT:
            if (command.payload.round) {
                return __assign(__assign({}, state), { phase: command.payload.phase, phaseStartedAtSeconds: Math.floor(command.payload.startedAt), round: command.payload.round });
            }
            return __assign(__assign({}, state), { phase: command.payload.phase, phaseStartedAtSeconds: Math.floor(command.payload.startedAt) });
        default:
            return state;
    }
}
exports.reducer = reducer;


/***/ }),

/***/ "../shared/lib/game/store/store.js":
/*!*****************************************!*\
  !*** ../shared/lib/game/store/store.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.createGameStore = void 0;
var redux_1 = __webpack_require__(/*! redux */ "../shared/node_modules/redux/es/redux.js");
var reducer_1 = __webpack_require__(/*! ./reducer */ "../shared/lib/game/store/reducer.js");
exports.createGameStore = function () {
    var store = redux_1.createStore(reducer_1.reducer);
    return store;
};


/***/ }),

/***/ "../shared/lib/index.js":
/*!******************************!*\
  !*** ../shared/lib/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var log_1 = __webpack_require__(/*! ./log */ "../shared/lib/log.js");
__createBinding(exports, log_1, "log");
var utils_1 = __webpack_require__(/*! ./utils */ "../shared/lib/utils/index.js");
__createBinding(exports, utils_1, "randomFromArray");
__createBinding(exports, utils_1, "getXpToNextLevel");
var validation_1 = __webpack_require__(/*! ./validation */ "../shared/lib/validation/index.js");
__createBinding(exports, validation_1, "validateNickname");
var board_1 = __webpack_require__(/*! ./board */ "../shared/lib/board/index.js");
__createBinding(exports, board_1, "BoardCommands");
__createBinding(exports, board_1, "boardReducer");
var game_1 = __webpack_require__(/*! ./game */ "../shared/lib/game/index.js");
__createBinding(exports, game_1, "DefinitionProvider");
__createBinding(exports, game_1, "battleSaga");
__createBinding(exports, game_1, "startBattle");
__createBinding(exports, game_1, "BATTLE_FINISH_EVENT");
__createBinding(exports, game_1, "gameReducer");
__createBinding(exports, game_1, "Game");
__createBinding(exports, game_1, "Player");
__createBinding(exports, game_1, "GameEvents");
__createBinding(exports, game_1, "getPiece");
__createBinding(exports, game_1, "getAllPieces");
__createBinding(exports, game_1, "getBoardPieceForPosition");
__createBinding(exports, game_1, "canDropPiece");
__createBinding(exports, game_1, "getPlayerLevel");
__createBinding(exports, game_1, "getPlayerMoney");
__createBinding(exports, game_1, "getOpponentId");
__createBinding(exports, game_1, "getPlayerXp");
__createBinding(exports, game_1, "isPlayerAlive");
__createBinding(exports, game_1, "PlayerInfoCommands");
__createBinding(exports, game_1, "playerInfoReducer");
__createBinding(exports, game_1, "BenchCommands");
__createBinding(exports, game_1, "benchReducer");
__createBinding(exports, game_1, "PlayerActions");
__createBinding(exports, game_1, "PlayerSagas");
__createBinding(exports, game_1, "PlayerActionSagas");
__createBinding(exports, game_1, "PlayerEvents");
__createBinding(exports, game_1, "defaultGameOptions");
__createBinding(exports, game_1, "Match");
var networking_1 = __webpack_require__(/*! ./networking */ "../shared/lib/networking/index.js");
__createBinding(exports, networking_1, "ConnectionStatus");
__createBinding(exports, networking_1, "IncomingPacketRegistry");
__createBinding(exports, networking_1, "OutgoingPacketRegistry");
__createBinding(exports, networking_1, "ServerToClientPacketOpcodes");
__createBinding(exports, networking_1, "ServerToClientLobbyPacketOpcodes");
__createBinding(exports, networking_1, "ServerToClientMenuPacketOpcodes");
__createBinding(exports, networking_1, "ClientToServerPacketOpcodes");
__createBinding(exports, networking_1, "SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS");


/***/ }),

/***/ "../shared/lib/log.js":
/*!****************************!*\
  !*** ../shared/lib/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.log = void 0;
// tslint:disable:no-console
exports.log = function (message) { return console.log(message); };


/***/ }),

/***/ "../shared/lib/networking/client-to-server.js":
/*!****************************************************!*\
  !*** ../shared/lib/networking/client-to-server.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS = exports.ClientToServerPacketOpcodes = void 0;
var ClientToServerPacketOpcodes;
(function (ClientToServerPacketOpcodes) {
    ClientToServerPacketOpcodes["FINISH_MATCH"] = "finishMatch";
    ClientToServerPacketOpcodes["SEND_PLAYER_ACTIONS"] = "sendPlayerActions";
})(ClientToServerPacketOpcodes = exports.ClientToServerPacketOpcodes || (exports.ClientToServerPacketOpcodes = {}));
exports.SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS = 300;


/***/ }),

/***/ "../shared/lib/networking/connection-status.js":
/*!*****************************************************!*\
  !*** ../shared/lib/networking/connection-status.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ConnectionStatus = void 0;
var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus[ConnectionStatus["NOT_CONNECTED"] = 0] = "NOT_CONNECTED";
    ConnectionStatus[ConnectionStatus["CONNECTED"] = 1] = "CONNECTED";
    ConnectionStatus[ConnectionStatus["DISCONNECTED"] = 2] = "DISCONNECTED";
})(ConnectionStatus = exports.ConnectionStatus || (exports.ConnectionStatus = {}));


/***/ }),

/***/ "../shared/lib/networking/incoming-packet-registry.js":
/*!************************************************************!*\
  !*** ../shared/lib/networking/incoming-packet-registry.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.IncomingPacketRegistry = void 0;
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

/***/ "../shared/lib/networking/index.js":
/*!*****************************************!*\
  !*** ../shared/lib/networking/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.ServerToClient = void 0;
var ServerToClient = __webpack_require__(/*! ./server-to-client */ "../shared/lib/networking/server-to-client.js");
exports.ServerToClient = ServerToClient;
var connection_status_1 = __webpack_require__(/*! ./connection-status */ "../shared/lib/networking/connection-status.js");
__createBinding(exports, connection_status_1, "ConnectionStatus");
var incoming_packet_registry_1 = __webpack_require__(/*! ./incoming-packet-registry */ "../shared/lib/networking/incoming-packet-registry.js");
__createBinding(exports, incoming_packet_registry_1, "IncomingPacketRegistry");
var outgoing_packet_registry_1 = __webpack_require__(/*! ./outgoing-packet-registry */ "../shared/lib/networking/outgoing-packet-registry.js");
__createBinding(exports, outgoing_packet_registry_1, "OutgoingPacketRegistry");
var server_to_client_1 = __webpack_require__(/*! ./server-to-client */ "../shared/lib/networking/server-to-client.js");
__createBinding(exports, server_to_client_1, "ServerToClientPacketOpcodes");
var server_to_client_lobby_1 = __webpack_require__(/*! ./server-to-client-lobby */ "../shared/lib/networking/server-to-client-lobby.js");
__createBinding(exports, server_to_client_lobby_1, "ServerToClientLobbyPacketOpcodes");
var server_to_client_menu_1 = __webpack_require__(/*! ./server-to-client-menu */ "../shared/lib/networking/server-to-client-menu.js");
__createBinding(exports, server_to_client_menu_1, "ServerToClientMenuPacketOpcodes");
var client_to_server_1 = __webpack_require__(/*! ./client-to-server */ "../shared/lib/networking/client-to-server.js");
__createBinding(exports, client_to_server_1, "ClientToServerPacketOpcodes");
__createBinding(exports, client_to_server_1, "SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS");


/***/ }),

/***/ "../shared/lib/networking/outgoing-packet-registry.js":
/*!************************************************************!*\
  !*** ../shared/lib/networking/outgoing-packet-registry.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.OutgoingPacketRegistry = void 0;
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

/***/ "../shared/lib/networking/server-to-client-lobby.js":
/*!**********************************************************!*\
  !*** ../shared/lib/networking/server-to-client-lobby.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ServerToClientLobbyPacketOpcodes = void 0;
var ServerToClientLobbyPacketOpcodes;
(function (ServerToClientLobbyPacketOpcodes) {
    ServerToClientLobbyPacketOpcodes["LOBBY_GAME_STARTED"] = "lobbyGameStarted";
    ServerToClientLobbyPacketOpcodes["LOBBY_PLAYER_UPDATE"] = "lobbyPlayerUpdate";
})(ServerToClientLobbyPacketOpcodes = exports.ServerToClientLobbyPacketOpcodes || (exports.ServerToClientLobbyPacketOpcodes = {}));


/***/ }),

/***/ "../shared/lib/networking/server-to-client-menu.js":
/*!*********************************************************!*\
  !*** ../shared/lib/networking/server-to-client-menu.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ServerToClientMenuPacketOpcodes = void 0;
var ServerToClientMenuPacketOpcodes;
(function (ServerToClientMenuPacketOpcodes) {
    ServerToClientMenuPacketOpcodes["LOBBY_CONNECTED"] = "lobbyConnected";
    ServerToClientMenuPacketOpcodes["GAME_CONNECTED"] = "gameConnected";
})(ServerToClientMenuPacketOpcodes = exports.ServerToClientMenuPacketOpcodes || (exports.ServerToClientMenuPacketOpcodes = {}));


/***/ }),

/***/ "../shared/lib/networking/server-to-client.js":
/*!****************************************************!*\
  !*** ../shared/lib/networking/server-to-client.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ServerToClientPacketOpcodes = void 0;
var ServerToClientPacketOpcodes;
(function (ServerToClientPacketOpcodes) {
    ServerToClientPacketOpcodes["CARDS_UPDATE"] = "cardsUpdate";
    ServerToClientPacketOpcodes["PLAYER_LIST_UPDATE"] = "playerListUpdate";
    ServerToClientPacketOpcodes["PHASE_UPDATE"] = "phaseUpdate";
    ServerToClientPacketOpcodes["MONEY_UPDATE"] = "moneyUpdate";
    ServerToClientPacketOpcodes["LEVEL_UPDATE"] = "levelUpdate";
    ServerToClientPacketOpcodes["FINISH_GAME"] = "finishGame";
    ServerToClientPacketOpcodes["SHOP_LOCK_UPDATE"] = "shopLockUpdate";
    ServerToClientPacketOpcodes["PLAYERS_RESURRECTED"] = "playersResurrected";
    ServerToClientPacketOpcodes["PLAYER_DEAD"] = "playerDead";
})(ServerToClientPacketOpcodes = exports.ServerToClientPacketOpcodes || (exports.ServerToClientPacketOpcodes = {}));


/***/ }),

/***/ "../shared/lib/utils/debounce.js":
/*!***************************************!*\
  !*** ../shared/lib/utils/debounce.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.debounce = void 0;
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

/***/ "../shared/lib/utils/get-pieces-for-stage.js":
/*!***************************************************!*\
  !*** ../shared/lib/utils/get-pieces-for-stage.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getPiecesForStage = void 0;
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

/***/ "../shared/lib/utils/get-total-health-by-team.js":
/*!*******************************************************!*\
  !*** ../shared/lib/utils/get-total-health-by-team.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.getTotalHealthByTeam = void 0;
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
        var _b = __read(_a, 2), key = _b[0], values = _b[1];
        return {
            ownerId: key,
            totalHealth: values.reduce(function (acc, cur) { return acc + cur.currentHealth; }, 0)
        };
    });
};


/***/ }),

/***/ "../shared/lib/utils/get-type-attack-bonus.js":
/*!****************************************************!*\
  !*** ../shared/lib/utils/get-type-attack-bonus.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
exports.__esModule = true;
exports.getTypeAttackBonus = exports.isOvercomeBy = exports.isGeneratedBy = exports.typeInteractions = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
// overcome / generated are Tuxemon language
exports.typeInteractions = (_a = {},
    _a[models_1.CreatureType.Earth] = {
        generatedBy: models_1.CreatureType.Fire,
        overcomeBy: models_1.CreatureType.Wood
    },
    _a[models_1.CreatureType.Metal] = {
        generatedBy: models_1.CreatureType.Earth,
        overcomeBy: models_1.CreatureType.Fire
    },
    _a[models_1.CreatureType.Water] = {
        generatedBy: models_1.CreatureType.Metal,
        overcomeBy: models_1.CreatureType.Earth
    },
    _a[models_1.CreatureType.Wood] = {
        generatedBy: models_1.CreatureType.Water,
        overcomeBy: models_1.CreatureType.Metal
    },
    _a[models_1.CreatureType.Fire] = {
        generatedBy: models_1.CreatureType.Wood,
        overcomeBy: models_1.CreatureType.Water
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

/***/ "../shared/lib/utils/get-xp-for-level.js":
/*!***********************************************!*\
  !*** ../shared/lib/utils/get-xp-for-level.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getXpToNextLevel = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
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
    if (level === models_1.MAX_PLAYER_LEVEL) {
        return null;
    }
    var result = XP_TO_NEXT_LEVEL[level - 1];
    if (result === undefined) {
        return null;
    }
    return result;
};


/***/ }),

/***/ "../shared/lib/utils/index.js":
/*!************************************!*\
  !*** ../shared/lib/utils/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.pieceUtils = void 0;
var debounce_1 = __webpack_require__(/*! ./debounce */ "../shared/lib/utils/debounce.js");
__createBinding(exports, debounce_1, "debounce");
var get_pieces_for_stage_1 = __webpack_require__(/*! ./get-pieces-for-stage */ "../shared/lib/utils/get-pieces-for-stage.js");
__createBinding(exports, get_pieces_for_stage_1, "getPiecesForStage");
var get_total_health_by_team_1 = __webpack_require__(/*! ./get-total-health-by-team */ "../shared/lib/utils/get-total-health-by-team.js");
__createBinding(exports, get_total_health_by_team_1, "getTotalHealthByTeam");
var get_type_attack_bonus_1 = __webpack_require__(/*! ./get-type-attack-bonus */ "../shared/lib/utils/get-type-attack-bonus.js");
__createBinding(exports, get_type_attack_bonus_1, "getTypeAttackBonus");
var get_xp_for_level_1 = __webpack_require__(/*! ./get-xp-for-level */ "../shared/lib/utils/get-xp-for-level.js");
__createBinding(exports, get_xp_for_level_1, "getXpToNextLevel");
var is_a_team_defeated_1 = __webpack_require__(/*! ./is-a-team-defeated */ "../shared/lib/utils/is-a-team-defeated.js");
__createBinding(exports, is_a_team_defeated_1, "isATeamDefeated");
var pieceUtils = __webpack_require__(/*! ./piece-utils */ "../shared/lib/utils/piece-utils.js");
exports.pieceUtils = pieceUtils;
var random_from_array_1 = __webpack_require__(/*! ./random-from-array */ "../shared/lib/utils/random-from-array.js");
__createBinding(exports, random_from_array_1, "randomFromArray");


/***/ }),

/***/ "../shared/lib/utils/is-a-team-defeated.js":
/*!*************************************************!*\
  !*** ../shared/lib/utils/is-a-team-defeated.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.isATeamDefeated = void 0;
exports.isATeamDefeated = function (board) {
    var pieces = Object.values(board.pieces);
    var pieceOwnerIds = pieces.map(function (p) { return p.ownerId; });
    // if there are only pieces belonging to 1 player, then we have a winner
    return (new Set(pieceOwnerIds).size === 1);
};


/***/ }),

/***/ "../shared/lib/utils/limitedQueue.js":
/*!*******************************************!*\
  !*** ../shared/lib/utils/limitedQueue.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.deferLimitedQueue = exports.limitedQueue = void 0;
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var pDefer = __webpack_require__(/*! p-defer */ "../shared/node_modules/p-defer/index.js");
exports.limitedQueue = function (size) {
    var events = new events_1.EventEmitter();
    var items = [];
    var checkFull = function () {
        if (items.length === size) {
            events.emit("reachLimit");
        }
    };
    return {
        clear: function () { return items = []; },
        isFull: function () { return items.length === size; },
        onReachLimit: function (fn) { return events.on("reachLimit", fn); },
        add: function (item) {
            if (items.length === size) {
                throw Error("Limit " + size + " reached");
            }
            items.push(item);
            checkFull();
        },
        dispose: function () { return events.removeAllListeners(); }
    };
};
exports.deferLimitedQueue = function (queue) {
    var deferred = pDefer();
    queue.onReachLimit(function () {
        deferred.resolve();
        queue.dispose();
    });
    return {
        promise: deferred.promise,
        dispose: queue.dispose
    };
};


/***/ }),

/***/ "../shared/lib/utils/piece-utils.js":
/*!******************************************!*\
  !*** ../shared/lib/utils/piece-utils.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.createMockPiece = exports.rotatePiecePosition = exports.moveOrAddPiece = exports.clonePiece = exports.createPieceFromCard = exports.getStats = exports.createPiece = void 0;
var uuid_1 = __webpack_require__(/*! uuid */ "../shared/node_modules/uuid/dist/esm-browser/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var definitionProvider_1 = __webpack_require__(/*! ../game/definitions/definitionProvider */ "../shared/lib/game/definitions/definitionProvider.js");
exports.createPiece = function (definitionProvider, ownerId, definitionId, position, id, stage) {
    if (stage === void 0) { stage = 0; }
    var stats = definitionProvider.get(definitionId).stages[0];
    return {
        id: id || uuid_1.v4(),
        ownerId: ownerId,
        definitionId: definitionId,
        definition: definitionProvider.get(definitionId),
        position: position ? models_1.createTileCoordinates.apply(void 0, __spread(position)) : null,
        facingAway: true,
        maxHealth: stats.hp,
        currentHealth: stats.hp,
        stage: stage
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
exports.createPieceFromCard = function (definitionProvider, ownerId, card) {
    return exports.createPiece(definitionProvider, ownerId, card.definitionId, null, card.id);
};
exports.clonePiece = function (definitionProvider, piece) {
    return exports.createPiece(definitionProvider, piece.ownerId, piece.definitionId, [piece.position.x, piece.position.y], piece.id, piece.stage);
};
exports.moveOrAddPiece = function (allPieces, target) {
    var e_1, _a;
    var result = [];
    var targetAdded = false;
    try {
        for (var allPieces_1 = __values(allPieces), allPieces_1_1 = allPieces_1.next(); !allPieces_1_1.done; allPieces_1_1 = allPieces_1.next()) {
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
    piece.position.x = models_1.GRID_SIZE.width - 1 - piece.position.x;
    piece.position.y = models_1.GRID_SIZE.height - 1 - piece.position.y;
    return piece;
};
exports.createMockPiece = function (id) { return ({
    id: id,
    ownerId: "123",
    definitionId: 1,
    definition: new definitionProvider_1.DefinitionProvider().get(1),
    stage: 0,
    position: models_1.createTileCoordinates(0, 0),
    facingAway: true,
    currentHealth: 100,
    maxHealth: 100
}); };


/***/ }),

/***/ "../shared/lib/utils/random-from-array.js":
/*!************************************************!*\
  !*** ../shared/lib/utils/random-from-array.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.randomFromArray = void 0;
exports.randomFromArray = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};


/***/ }),

/***/ "../shared/lib/validation/index.js":
/*!*****************************************!*\
  !*** ../shared/lib/validation/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var nickname_1 = __webpack_require__(/*! ./nickname */ "../shared/lib/validation/nickname.js");
__createBinding(exports, nickname_1, "validateNickname");


/***/ }),

/***/ "../shared/lib/validation/nickname.js":
/*!********************************************!*\
  !*** ../shared/lib/validation/nickname.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.validateNickname = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var NAME_REGEX = /^[a-zA-Z0-9\ ]*$/;
exports.validateNickname = function (nickname) {
    if (!nickname || !nickname.length || nickname.length < 4) {
        return "Nickname must be at least 4 characters long";
    }
    if (nickname.length > models_1.MAX_NAME_LENGTH) {
        return "Name too long";
    }
    if (nickname.match(NAME_REGEX) === null) {
        return "Invalid characters in name";
    }
    return null;
};


/***/ }),

/***/ "./src/app.tsx":
/*!*********************!*\
  !*** ./src/app.tsx ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.App = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var auth_1 = __webpack_require__(/*! ./auth */ "./src/auth/index.ts");
var game_1 = __webpack_require__(/*! ./game */ "./src/game/index.ts");
var lobby_1 = __webpack_require__(/*! ./lobby */ "./src/lobby/index.ts");
var menu_1 = __webpack_require__(/*! ./menu */ "./src/menu/index.ts");
var UnauthenticatedRoutes = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: auth_1.LoginPage }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/callback", component: auth_1.CallbackPage })));
};
var GameState;
(function (GameState) {
    GameState[GameState["MENU"] = 0] = "MENU";
    GameState[GameState["LOBBY"] = 1] = "LOBBY";
    GameState[GameState["GAME"] = 2] = "GAME";
})(GameState || (GameState = {}));
var gameStateSelector = function (state) {
    if (state.game.phase !== null) {
        return GameState.GAME;
    }
    if (state.lobby.lobbyId !== null) {
        return GameState.LOBBY;
    }
    return GameState.MENU;
};
var AuthenticatedRootPage = function () {
    var gameState = react_redux_1.useSelector(gameStateSelector);
    var registered = react_redux_1.useSelector(function (state) { return state.auth.user.registered; });
    if (!registered) {
        return React.createElement(auth_1.RegistrationPage, null);
    }
    if (gameState === GameState.GAME) {
        return React.createElement(game_1.GamePage, null);
    }
    if (gameState === GameState.LOBBY) {
        return React.createElement(lobby_1.LobbyPage, null);
    }
    return React.createElement(menu_1.MenuPage, null);
};
var AuthenticatedRoutes = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: AuthenticatedRootPage }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/callback", component: auth_1.CallbackPage })));
};
var App = function () {
    var loggedIn = react_redux_1.useSelector(auth_1.AuthSelectors.isLoggedIn);
    if (loggedIn) {
        return React.createElement(AuthenticatedRoutes, null);
    }
    return React.createElement(UnauthenticatedRoutes, null);
};
exports.App = App;


/***/ }),

/***/ "./src/auth/CallbackPage.tsx":
/*!***********************************!*\
  !*** ./src/auth/CallbackPage.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.CallbackPage = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
var loading_1 = __webpack_require__(/*! ../ui/display/loading */ "./src/ui/display/loading.tsx");
var actions_1 = __webpack_require__(/*! ./store/actions */ "./src/auth/store/actions.ts");
var selectors_1 = __webpack_require__(/*! ./store/selectors */ "./src/auth/store/selectors.ts");
var CallbackPage = function () {
    var loggedIn = react_redux_1.useSelector(selectors_1.isLoggedIn);
    var checkingSession = react_redux_1.useSelector(selectors_1.isCheckingSession);
    var dispatch = react_redux_1.useDispatch();
    React.useEffect(function () {
        if (loggedIn || checkingSession) {
            return;
        }
        dispatch(actions_1.handleAuthenticationCallback());
    }, [checkingSession]);
    if (loggedIn) {
        return React.createElement(react_router_dom_1.Redirect, { to: "/" });
    }
    return React.createElement(loading_1.Loading, null);
};
exports.CallbackPage = CallbackPage;


/***/ }),

/***/ "./src/auth/LoginPage.tsx":
/*!********************************!*\
  !*** ./src/auth/LoginPage.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.LoginPage = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var auth0_1 = __webpack_require__(/*! ./auth0 */ "./src/auth/auth0.ts");
var selectors_1 = __webpack_require__(/*! ./store/selectors */ "./src/auth/store/selectors.ts");
var footer_1 = __webpack_require__(/*! ../ui/display/footer */ "./src/ui/display/footer.tsx");
var loading_1 = __webpack_require__(/*! ../ui/display/loading */ "./src/ui/display/loading.tsx");
var Segment = function (_a) {
    var open = _a.open, onHeaderClick = _a.onHeaderClick, header = _a.header, children = _a.children;
    return (React.createElement("div", { className: "segment " + (open ? "" : "closed") },
        React.createElement("div", { className: "header", onClick: onHeaderClick },
            header,
            " ",
            open ? "-" : "+"),
        React.createElement("div", { className: "content" }, children)));
};
var LoginPage = function () {
    var checkingSession = react_redux_1.useSelector(selectors_1.isCheckingSession);
    var _a = __read(React.useState(false), 2), loadingSignIn = _a[0], setLoadingSignIn = _a[1];
    var _b = __read(React.useState(false), 2), demoOpen = _b[0], setDemoOpen = _b[1];
    var onSignInClick = function () {
        setLoadingSignIn(true);
        auth0_1.signIn();
    };
    var onDemoClick = function () { return setDemoOpen(!demoOpen); };
    if (checkingSession || loadingSignIn) {
        return React.createElement(loading_1.Loading, null);
    }
    return (React.createElement("div", { className: "login" },
        React.createElement("div", { className: "banner" },
            React.createElement("img", { src: "https://i.imgur.com/7FAcFwZ.png" })),
        React.createElement("div", { className: "groups" },
            React.createElement("div", { className: "group main" },
                React.createElement("p", { className: "subtext" }, "Creature Chess is a multiplayer game, so you need an account to play. Watch the demo video to see a preview"),
                React.createElement("button", { onClick: onSignInClick, className: "login-button" }, "Log in / Sign up"),
                React.createElement("p", { className: "subtext" }, "Join us on Discord to find other players and give feedback on the game"),
                React.createElement("a", { href: "https://discord.gg/FhMm6saehb" },
                    React.createElement("img", { src: "https://i.imgur.com/YNyTNuw.png", className: "discord-button" }))),
            React.createElement("div", { className: "group" },
                React.createElement(Segment, { header: "Watch a demo video", open: demoOpen, onHeaderClick: onDemoClick },
                    React.createElement("div", { className: "video-container" },
                        React.createElement("video", { controls: true, autoPlay: true, className: "video" },
                            React.createElement("source", { src: "https://i.imgur.com/EAwP0Qm.mp4", type: "video/mp4" }),
                            "Your browser does not support videos."))))),
        React.createElement(footer_1.Footer, null)));
};
exports.LoginPage = LoginPage;


/***/ }),

/***/ "./src/auth/RegistrationPage.tsx":
/*!***************************************!*\
  !*** ./src/auth/RegistrationPage.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.RegistrationPage = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var actions_1 = __webpack_require__(/*! ./store/actions */ "./src/auth/store/actions.ts");
var patchUser_1 = __webpack_require__(/*! ./utils/patchUser */ "./src/auth/utils/patchUser.ts");
var RegistrationPage = function () {
    var dispatch = react_redux_1.useDispatch();
    var token = react_redux_1.useSelector(function (state) { return state.auth.token; });
    var _a = __read(React.useState(""), 2), nickname = _a[0], setNickname = _a[1];
    var _b = __read(React.useState(false), 2), loading = _b[0], setLoading = _b[1];
    var _c = __read(React.useState(null), 2), error = _c[0], setError = _c[1];
    var onNameChange = function (event) { return setNickname(event.target.value); };
    var onClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var nicknameError, response, responseError, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nicknameError = shared_1.validateNickname(nickname);
                    if (nicknameError) {
                        setError(nicknameError);
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    return [4 /*yield*/, patchUser_1.patchUser(token, nickname)];
                case 1:
                    response = _a.sent();
                    setLoading(false);
                    if (!(response.status === 400)) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseError = (_a.sent()).error;
                    setError(responseError);
                    return [2 /*return*/];
                case 3:
                    if (!(response.status === 200)) return [3 /*break*/, 5];
                    return [4 /*yield*/, response.json()];
                case 4:
                    user = _a.sent();
                    dispatch(actions_1.userUpdated(user));
                    return [2 /*return*/];
                case 5:
                    setError("An unknown error occured");
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "register" },
        React.createElement("h1", { className: "register-heading" }, "Registration"),
        error && React.createElement("p", { className: "register-error" }, error),
        React.createElement("h2", { className: "nickname-warning" }, "This nickname is permanent and cannot be changed"),
        React.createElement("input", { value: nickname, onChange: onNameChange, maxLength: models_1.MAX_NAME_LENGTH, placeholder: "Nickname", className: "name-input", disabled: loading }),
        React.createElement("div", null,
            React.createElement("button", { className: "register-button", onClick: onClick, disabled: loading },
                !loading && "Register",
                loading && "Loading..."))));
};
exports.RegistrationPage = RegistrationPage;


/***/ }),

/***/ "./src/auth/auth0.ts":
/*!***************************!*\
  !*** ./src/auth/auth0.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.signOut = exports.signIn = exports.handleAuthentication = exports.checkSession = void 0;
var auth0_js_1 = __webpack_require__(/*! auth0-js */ "./node_modules/auth0-js/dist/auth0.min.esm.js");
var config_1 = __webpack_require__(/*! ./config */ "./src/auth/config.ts");
var auth0Client = new auth0_js_1.WebAuth({
    domain: config_1.domain,
    clientID: config_1.clientID,
    redirectUri: config_1.redirectUri,
    audience: config_1.audience,
    responseType: "id_token",
    scope: config_1.scope
});
exports.checkSession = function () { return new Promise(function (resolve, reject) {
    var options = { audience: config_1.audience, scope: config_1.scope };
    auth0Client.checkSession(options, function (err, authResult) {
        if (err) {
            if (err.code === "login_required") {
                return resolve(null);
            }
            return reject(err);
        }
        if (!authResult || !authResult.idToken) {
            return resolve(null);
        }
        var token = authResult.idToken;
        var expiry = authResult.idTokenPayload.exp * 1000;
        resolve({ token: token, expiry: expiry });
    });
}); };
exports.handleAuthentication = function () { return new Promise(function (resolve, reject) {
    auth0Client.parseHash(function (err, authResult) {
        if (err) {
            return reject(err);
        }
        if (!authResult || !authResult.idToken) {
            return reject(err);
        }
        var token = authResult.idToken;
        var expiry = authResult.idTokenPayload.exp * 1000;
        resolve({ token: token, expiry: expiry });
    });
}); };
exports.signIn = function () { return auth0Client.authorize(); };
exports.signOut = function () {
    auth0Client.logout({
        clientID: config_1.clientID,
        returnTo: config_1.logoutRedirectUrl
    });
};


/***/ }),

/***/ "./src/auth/config.ts":
/*!****************************!*\
  !*** ./src/auth/config.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.LEADERBOARD_ENDPOINT = exports.CURRENT_USER_ENDPOINT = exports.GAME_SERVER_URL = exports.scope = exports.audience = exports.logoutRedirectUrl = exports.redirectUri = exports.clientID = exports.domain = void 0;
var local = false;
exports.domain = "creaturechess.eu.auth0.com";
exports.clientID = "HNUYYyRCtFJsA3xKGp964Kgy4jwx8bW1";
exports.redirectUri = local ? "http://localhost:8090/callback" : "http://creaturechess.jamesmonger.com/callback";
exports.logoutRedirectUrl = local ? "http://localhost:8090" : "http://creaturechess.jamesmonger.com/";
exports.audience = "https://" + exports.domain + "/userinfo";
exports.scope = "openid profile email";
exports.GAME_SERVER_URL = "https://cc-server.jamesmonger.com";
exports.CURRENT_USER_ENDPOINT = local ? "http://localhost:3001/user/current" : "https://cc-server-info.herokuapp.com/user/current";
exports.LEADERBOARD_ENDPOINT = local ? "http://localhost:3001/leaderboard" : "https://cc-server-info.herokuapp.com/leaderboard";


/***/ }),

/***/ "./src/auth/index.ts":
/*!***************************!*\
  !*** ./src/auth/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.AuthActions = __webpack_require__(/*! ./store/actions */ "./src/auth/store/actions.ts");
var reducer_1 = __webpack_require__(/*! ./store/reducer */ "./src/auth/store/reducer.ts");
__createBinding(exports, reducer_1, "authReducer");
var saga_1 = __webpack_require__(/*! ./store/saga */ "./src/auth/store/saga.ts");
__createBinding(exports, saga_1, "authSaga");
exports.AuthSelectors = __webpack_require__(/*! ./store/selectors */ "./src/auth/store/selectors.ts");
var CallbackPage_1 = __webpack_require__(/*! ./CallbackPage */ "./src/auth/CallbackPage.tsx");
__createBinding(exports, CallbackPage_1, "CallbackPage");
var LoginPage_1 = __webpack_require__(/*! ./LoginPage */ "./src/auth/LoginPage.tsx");
__createBinding(exports, LoginPage_1, "LoginPage");
var RegistrationPage_1 = __webpack_require__(/*! ./RegistrationPage */ "./src/auth/RegistrationPage.tsx");
__createBinding(exports, RegistrationPage_1, "RegistrationPage");
var auth0_1 = __webpack_require__(/*! ./auth0 */ "./src/auth/auth0.ts");
__createBinding(exports, auth0_1, "signIn");


/***/ }),

/***/ "./src/auth/store/actions.ts":
/*!***********************************!*\
  !*** ./src/auth/store/actions.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.handleAuthenticationCallback = exports.sessionChecked = exports.userUpdated = exports.userAuthenticated = exports.HANDLE_AUTHENTICATION_CALLBACK = exports.SESSION_CHECKED = exports.USER_UPDATED = exports.USER_AUTHENTICATED = void 0;
exports.USER_AUTHENTICATED = "USER_AUTHENTICATED";
exports.USER_UPDATED = "USER_UPDATED";
exports.SESSION_CHECKED = "SESSION_CHECKED";
exports.HANDLE_AUTHENTICATION_CALLBACK = "HANDLE_AUTHENTICATION_CALLBACK";
exports.userAuthenticated = function (token, expiry, user) { return ({
    type: exports.USER_AUTHENTICATED,
    payload: {
        token: token,
        expiry: expiry,
        user: user
    }
}); };
exports.userUpdated = function (user) { return ({ type: exports.USER_UPDATED, payload: { user: user } }); };
exports.sessionChecked = function () { return ({ type: exports.SESSION_CHECKED }); };
exports.handleAuthenticationCallback = function () { return ({ type: exports.HANDLE_AUTHENTICATION_CALLBACK }); };


/***/ }),

/***/ "./src/auth/store/reducer.ts":
/*!***********************************!*\
  !*** ./src/auth/store/reducer.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.authReducer = exports.initialState = void 0;
var actions_1 = __webpack_require__(/*! ./actions */ "./src/auth/store/actions.ts");
exports.initialState = {
    checkingSession: true,
    token: null,
    tokenExpiry: null,
    user: null
};
function authReducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case actions_1.USER_AUTHENTICATED: {
            var _a = action.payload, token = _a.token, expiry = _a.expiry, user = _a.user;
            return __assign(__assign({}, state), { checkingSession: false, token: token, tokenExpiry: expiry, user: user });
        }
        case actions_1.USER_UPDATED: {
            var user = action.payload.user;
            return __assign(__assign({}, state), { user: user });
        }
        case actions_1.SESSION_CHECKED: {
            return __assign(__assign({}, state), { checkingSession: false });
        }
        default:
            return state;
    }
}
exports.authReducer = authReducer;


/***/ }),

/***/ "./src/auth/store/saga.ts":
/*!********************************!*\
  !*** ./src/auth/store/saga.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.authSaga = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! ./actions */ "./src/auth/store/actions.ts");
var auth0_1 = __webpack_require__(/*! ../auth0 */ "./src/auth/auth0.ts");
var getCurrentUser_1 = __webpack_require__(/*! ../utils/getCurrentUser */ "./src/auth/utils/getCurrentUser.ts");
exports.authSaga = function () {
    var existingSession, user, newSession, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.call(auth0_1.checkSession)];
            case 1:
                existingSession = _a.sent();
                if (!existingSession) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.call(getCurrentUser_1.getCurrentUser, existingSession.token)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, effects_1.put(actions_1.userAuthenticated(existingSession.token, existingSession.expiry, user))];
            case 3:
                _a.sent();
                return [2 /*return*/];
            case 4: return [4 /*yield*/, effects_1.put(actions_1.sessionChecked())];
            case 5:
                _a.sent();
                return [4 /*yield*/, effects_1.take(actions_1.HANDLE_AUTHENTICATION_CALLBACK)];
            case 6:
                _a.sent();
                return [4 /*yield*/, effects_1.call(auth0_1.handleAuthentication)];
            case 7:
                newSession = _a.sent();
                return [4 /*yield*/, effects_1.call(getCurrentUser_1.getCurrentUser, newSession.token)];
            case 8:
                newUser = _a.sent();
                return [4 /*yield*/, effects_1.put(actions_1.userAuthenticated(newSession.token, newSession.expiry, newUser))];
            case 9:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/auth/store/selectors.ts":
/*!*************************************!*\
  !*** ./src/auth/store/selectors.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getIdToken = exports.isCheckingSession = exports.getUserId = exports.isLoggedIn = void 0;
exports.isLoggedIn = function (state) { return state.auth.user !== null; };
exports.getUserId = function (state) { return state.auth.user.id; };
exports.isCheckingSession = function (state) { return state.auth.checkingSession; };
exports.getIdToken = function (state) { return state.auth.token; };


/***/ }),

/***/ "./src/auth/utils/getCurrentUser.ts":
/*!******************************************!*\
  !*** ./src/auth/utils/getCurrentUser.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getCurrentUser = void 0;
var config_1 = __webpack_require__(/*! ../config */ "./src/auth/config.ts");
exports.getCurrentUser = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var response, profile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(config_1.CURRENT_USER_ENDPOINT, { headers: { Authorization: token } })];
            case 1:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, response.json()];
            case 2:
                profile = _a.sent();
                return [2 /*return*/, profile];
            case 3: return [2 /*return*/, null];
        }
    });
}); };


/***/ }),

/***/ "./src/auth/utils/patchUser.ts":
/*!*************************************!*\
  !*** ./src/auth/utils/patchUser.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.patchUser = void 0;
var config_1 = __webpack_require__(/*! ../config */ "./src/auth/config.ts");
exports.patchUser = function (token, nickname) {
    return fetch(config_1.CURRENT_USER_ENDPOINT, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ nickname: nickname })
    });
};


/***/ }),

/***/ "./src/game/features/board/actions.ts":
/*!********************************************!*\
  !*** ./src/game/features/board/actions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.clearSelectedPiece = exports.selectPiece = exports.CLEAR_SELECTED_PIECE = exports.SELECT_PIECE = void 0;
exports.SELECT_PIECE = "SELECT_PIECE";
exports.CLEAR_SELECTED_PIECE = "CLEAR_SELECTED_PIECE";
exports.selectPiece = function (id) { return ({
    type: exports.SELECT_PIECE,
    payload: {
        id: id
    }
}); };
exports.clearSelectedPiece = function () { return ({ type: exports.CLEAR_SELECTED_PIECE }); };


/***/ }),

/***/ "./src/game/features/board/bench.tsx":
/*!*******************************************!*\
  !*** ./src/game/features/board/bench.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Bench = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var benchTile_1 = __webpack_require__(/*! ./tile/benchTile */ "./src/game/features/board/tile/benchTile.tsx");
var positionablePiece_1 = __webpack_require__(/*! ./piece/positionablePiece */ "./src/game/features/board/piece/positionablePiece.tsx");
var BenchPieces = function () {
    var pieces = react_redux_1.useSelector(function (state) { return state.bench.pieces; });
    var pieceElements = [];
    pieces.forEach(function (piece) {
        if (!piece) {
            return;
        }
        pieceElements.push(React.createElement(positionablePiece_1.PositionablePiece, { key: piece.id, id: piece.id, x: piece.position.x, y: 0, draggable: true, animate: false }));
    });
    return (React.createElement(React.Fragment, null, pieceElements));
};
var Bench = function () {
    var tiles = [];
    for (var x = 0; x < models_1.Constants.GRID_SIZE.width; x++) {
        tiles.push(React.createElement(benchTile_1.BenchTile, { key: "tile-" + x, slot: x }));
    }
    return (React.createElement("div", { className: "bench" },
        tiles,
        React.createElement(BenchPieces, null)));
};
exports.Bench = Bench;


/***/ }),

/***/ "./src/game/features/board/board.tsx":
/*!*******************************************!*\
  !*** ./src/game/features/board/board.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.Board = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var pieceComponent_1 = __webpack_require__(/*! ./piece/pieceComponent */ "./src/game/features/board/piece/pieceComponent.tsx");
var boardRow_1 = __webpack_require__(/*! ./boardRow */ "./src/game/features/board/boardRow.tsx");
var opponentBoardPlaceholder_1 = __webpack_require__(/*! ./overlays/opponentBoardPlaceholder */ "./src/game/features/board/overlays/opponentBoardPlaceholder.tsx");
var announcement_1 = __webpack_require__(/*! ./overlays/announcement */ "./src/game/features/board/overlays/announcement.tsx");
var victoryOverlay_1 = __webpack_require__(/*! ./overlays/victoryOverlay */ "./src/game/features/board/overlays/victoryOverlay.tsx");
var reconnectModal_1 = __webpack_require__(/*! ./overlays/reconnectModal */ "./src/game/features/board/overlays/reconnectModal.tsx");
var BoardPieces = function (props) {
    var e_1, _a;
    var inPreparingPhase = react_redux_1.useSelector(function (state) { return state.game.phase === models_1.GamePhase.PREPARING; });
    var pieces = react_redux_1.useSelector(function (state) { return state.board.piecePositions; });
    var pieceElements = [];
    try {
        for (var _b = __values(Object.entries(pieces)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), position = _d[0], id = _d[1];
            if (!id) {
                continue;
            }
            var _e = __read(position.split(","), 2), x = _e[0], y = _e[1];
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
    var showOpponentBoardPlaceholder = react_redux_1.useSelector(function (state) { return state.game.phase === models_1.GamePhase.PREPARING; });
    var rows = [];
    if (!showOpponentBoardPlaceholder) {
        for (var y = 0; y < models_1.Constants.GRID_SIZE.height / 2; y++) {
            rows.push(React.createElement(boardRow_1.BoardRow, { key: "tile-row-" + y, y: y }));
        }
    }
    for (var y = models_1.Constants.GRID_SIZE.height / 2; y < models_1.Constants.GRID_SIZE.height; y++) {
        rows.push(React.createElement(boardRow_1.BoardRow, { key: "tile-row-" + y, y: y }));
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

/***/ "./src/game/features/board/boardContainer.tsx":
/*!****************************************************!*\
  !*** ./src/game/features/board/boardContainer.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.BoardContainer = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var board_1 = __webpack_require__(/*! ./board */ "./src/game/features/board/board.tsx");
var bench_1 = __webpack_require__(/*! ./bench */ "./src/game/features/board/bench.tsx");
var BoardContainer = function () {
    return (React.createElement("div", { className: "group board-container" },
        React.createElement(board_1.Board, null),
        React.createElement(bench_1.Bench, null)));
};
exports.BoardContainer = BoardContainer;


/***/ }),

/***/ "./src/game/features/board/boardRow.tsx":
/*!**********************************************!*\
  !*** ./src/game/features/board/boardRow.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.BoardRow = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var boardTile_1 = __webpack_require__(/*! ./tile/boardTile */ "./src/game/features/board/tile/boardTile.tsx");
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
    var y = _a.y;
    var tiles = [];
    for (var x = 0; x < models_1.Constants.GRID_SIZE.width; x++) {
        tiles.push(React.createElement(boardTile_1.BoardTile, { key: "tile-" + x, x: x, y: y }));
    }
    return React.createElement("div", { className: "tile-row style-default " + getRowClassForY(y) }, tiles);
};
exports.BoardRow = BoardRow;


/***/ }),

/***/ "./src/game/features/board/overlays/announcement.tsx":
/*!***********************************************************!*\
  !*** ./src/game/features/board/overlays/announcement.tsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Announcement = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var Announcement = function () {
    var mainAnnouncement = react_redux_1.useSelector(function (state) { return state.ui.mainAnnouncement; });
    var subAnnouncement = react_redux_1.useSelector(function (state) { return state.ui.subAnnouncement; });
    if (!mainAnnouncement) {
        return null;
    }
    return (React.createElement("div", { className: "announcement" },
        subAnnouncement && React.createElement("h3", { className: "sub" }, subAnnouncement),
        React.createElement("h2", { className: "main" }, mainAnnouncement)));
};
exports.Announcement = Announcement;


/***/ }),

/***/ "./src/game/features/board/overlays/opponentBoardPlaceholder.tsx":
/*!***********************************************************************!*\
  !*** ./src/game/features/board/overlays/opponentBoardPlaceholder.tsx ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.OpponentBoardPlaceholder = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var readyUpButton_1 = __webpack_require__(/*! ./readyUpButton */ "./src/game/features/board/overlays/readyUpButton.tsx");
var selectedCreature_1 = __webpack_require__(/*! ./selectedCreature */ "./src/game/features/board/overlays/selectedCreature.tsx");
exports.OpponentBoardPlaceholder = function (props) {
    return (React.createElement("div", { className: "opponent-board-placeholder" },
        React.createElement("div", { className: "o-group stretch" },
            React.createElement(selectedCreature_1.SelectedCreature, null)),
        React.createElement("div", { className: "o-group" },
            React.createElement(readyUpButton_1.ReadyUpButton, null))));
};


/***/ }),

/***/ "./src/game/features/board/overlays/readyUpButton.tsx":
/*!************************************************************!*\
  !*** ./src/game/features/board/overlays/readyUpButton.tsx ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ReadyUpButton = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var ReadyUpButton = function () {
    var canReadyUp = react_redux_1.useSelector(function (state) { return state.game.phase === models_1.GamePhase.PREPARING && state.playerInfo.ready === false; });
    var dispatch = react_redux_1.useDispatch();
    if (!canReadyUp) {
        return null;
    }
    var onReadyUp = function () { return dispatch(shared_1.PlayerActions.readyUpAction()); };
    return React.createElement("button", { className: "ready-up", onClick: onReadyUp }, "Ready");
};
exports.ReadyUpButton = ReadyUpButton;


/***/ }),

/***/ "./src/game/features/board/overlays/reconnectModal.tsx":
/*!*************************************************************!*\
  !*** ./src/game/features/board/overlays/reconnectModal.tsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ReconnectModal = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var ReconnectModal = function () {
    var connectionStatus = react_redux_1.useSelector(function (state) { return state.ui.connectionStatus; });
    if (connectionStatus === shared_1.ConnectionStatus.NOT_CONNECTED
        || connectionStatus === shared_1.ConnectionStatus.CONNECTED) {
        return null;
    }
    return (React.createElement("div", { className: "reconnect" }, connectionStatus === shared_1.ConnectionStatus.DISCONNECTED
        && (React.createElement(React.Fragment, null,
            React.createElement("p", { className: "text" }, "You've been disconnected - but you can get back in!"),
            React.createElement("p", { className: "text" }, "Please refresh the page and press 'Find Game' to rejoin")))));
};
exports.ReconnectModal = ReconnectModal;


/***/ }),

/***/ "./src/game/features/board/overlays/selectedCreature.tsx":
/*!***************************************************************!*\
  !*** ./src/game/features/board/overlays/selectedCreature.tsx ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.SelectedCreature = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var cardShop_1 = __webpack_require__(/*! ../../cardShop */ "./src/game/features/cardShop/index.ts");
var selectedPieceSelector = function (state) {
    return state.ui.selectedPieceId
        ? shared_1.getPiece(state, state.ui.selectedPieceId)
        : null;
};
var SellPieceButton = function (_a) {
    var pieceId = _a.pieceId;
    var dispatch = react_redux_1.useDispatch();
    var onClick = function () { return dispatch(shared_1.PlayerActions.playerSellPieceAction(pieceId)); };
    return React.createElement("button", { className: "ready-up", onClick: onClick }, "Sell Piece");
};
var SelectedCreature = function () {
    var selectedPiece = react_redux_1.useSelector(selectedPieceSelector);
    if (!selectedPiece) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(cardShop_1.Card, { definitionId: selectedPiece.definitionId, buyable: false, fullWidth: true }),
        React.createElement(SellPieceButton, { pieceId: selectedPiece.id })));
};
exports.SelectedCreature = SelectedCreature;


/***/ }),

/***/ "./src/game/features/board/overlays/victoryOverlay.tsx":
/*!*************************************************************!*\
  !*** ./src/game/features/board/overlays/victoryOverlay.tsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.VictoryOverlay = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var VictoryOverlay = function () {
    var winnerName = react_redux_1.useSelector(function (state) { return state.ui.winnerName; });
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

/***/ "./src/game/features/board/piece/components/healthbar.tsx":
/*!****************************************************************!*\
  !*** ./src/game/features/board/piece/components/healthbar.tsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Healthbar = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var progressBar_1 = __webpack_require__(/*! ../../../../../ui/display/progressBar */ "./src/ui/display/progressBar.tsx");
var selectors_1 = __webpack_require__(/*! ../../../../../auth/store/selectors */ "./src/auth/store/selectors.ts");
var Healthbar = function (_a) {
    var pieceId = _a.pieceId, _b = _a.vertical, vertical = _b === void 0 ? false : _b;
    var showHealthbar = react_redux_1.useSelector(function (state) { return (state.game.phase === models_1.GamePhase.READY
        || state.game.phase === models_1.GamePhase.PLAYING); });
    var piece = react_redux_1.useSelector(function (state) { return shared_1.getPiece(state, pieceId); });
    var localPlayerId = react_redux_1.useSelector(selectors_1.getUserId);
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

/***/ "./src/game/features/board/piece/components/pieceImage.tsx":
/*!*****************************************************************!*\
  !*** ./src/game/features/board/piece/components/pieceImage.tsx ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PieceImage = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var creatureImage_1 = __webpack_require__(/*! ../../../../../ui/display/creatureImage */ "./src/ui/display/creatureImage.tsx");
var PieceImage = function (_a) {
    var pieceId = _a.pieceId;
    var piece = react_redux_1.useSelector(function (state) { return shared_1.getPiece(state, pieceId); });
    if (!piece) {
        return null;
    }
    return React.createElement(creatureImage_1.CreatureImage, { definitionId: piece.definitionId, facing: piece.facingAway ? "back" : "front" });
};
exports.PieceImage = PieceImage;


/***/ }),

/***/ "./src/game/features/board/piece/components/stageIndicator.tsx":
/*!*********************************************************************!*\
  !*** ./src/game/features/board/piece/components/stageIndicator.tsx ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.StageIndicator = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var StageIndicator = function (_a) {
    var pieceId = _a.pieceId;
    var piece = react_redux_1.useSelector(function (state) { return shared_1.getPiece(state, pieceId); });
    if (!piece) {
        return null;
    }
    return React.createElement("div", { className: "piece-stage" }, piece.stage + 1);
};
exports.StageIndicator = StageIndicator;


/***/ }),

/***/ "./src/game/features/board/piece/pieceComponent.tsx":
/*!**********************************************************!*\
  !*** ./src/game/features/board/piece/pieceComponent.tsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.PieceComponent = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/esm/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var animation_1 = __webpack_require__(/*! ../../../../ui/display/animation */ "./src/ui/display/animation.ts");
var projectile_1 = __webpack_require__(/*! ../../../../ui/display/projectile */ "./src/ui/display/projectile.tsx");
var actions_1 = __webpack_require__(/*! ../actions */ "./src/game/features/board/actions.ts");
var pieceImage_1 = __webpack_require__(/*! ./components/pieceImage */ "./src/game/features/board/piece/components/pieceImage.tsx");
var stageIndicator_1 = __webpack_require__(/*! ./components/stageIndicator */ "./src/game/features/board/piece/components/stageIndicator.tsx");
var healthbar_1 = __webpack_require__(/*! ./components/healthbar */ "./src/game/features/board/piece/components/healthbar.tsx");
var selectors_1 = __webpack_require__(/*! ../../../../auth/store/selectors */ "./src/auth/store/selectors.ts");
var dyingAnimation = "dying";
var PieceComponent = function (props) {
    var id = props.id, draggable = props.draggable, animate = props.animate;
    var dispatch = react_redux_1.useDispatch();
    var _a = __read(React.useState([]), 2), currentAnimations = _a[0], setCurrentAnimations = _a[1];
    var _b = __read(React.useState(null), 2), oldPiece = _b[0], setOldPiece = _b[1];
    var localPlayerId = react_redux_1.useSelector(selectors_1.getUserId);
    var piece = react_redux_1.useSelector(function (state) { return shared_1.getPiece(state, id); });
    var inPreparingPhase = react_redux_1.useSelector(function (state) { return state.game.phase === models_1.GamePhase.PREPARING; });
    var _c = __read(react_dnd_1.useDrag({
        item: { type: "Piece", piece: piece },
        canDrag: function () { return draggable && piece.ownerId === localPlayerId; }
    }), 2), _d = _c[0], drag = _c[1];
    var runAnimation = function (name, variables) { return setCurrentAnimations(function (oldAnimations) { return __spread(oldAnimations, [{ name: name, variables: variables }]); }); };
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
        dispatch(actions_1.selectPiece(id));
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

/***/ "./src/game/features/board/piece/positionablePiece.tsx":
/*!*************************************************************!*\
  !*** ./src/game/features/board/piece/positionablePiece.tsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PositionablePiece = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var pieceComponent_1 = __webpack_require__(/*! ./pieceComponent */ "./src/game/features/board/piece/pieceComponent.tsx");
var PositionablePiece = function (_a) {
    var id = _a.id, x = _a.x, y = _a.y, draggable = _a.draggable, animate = _a.animate;
    return (React.createElement("div", { className: "positionable-piece x-" + x + " y-" + y },
        React.createElement(pieceComponent_1.PieceComponent, { id: id, draggable: draggable, animate: animate })));
};
exports.PositionablePiece = PositionablePiece;


/***/ }),

/***/ "./src/game/features/board/responsiveBoardStyles.tsx":
/*!***********************************************************!*\
  !*** ./src/game/features/board/responsiveBoardStyles.tsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ResponsiveBoardStyles = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var use_window_size_1 = __webpack_require__(/*! ../../use-window-size */ "./src/game/use-window-size.ts");
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

/***/ "./src/game/features/board/tile/benchTile.tsx":
/*!****************************************************!*\
  !*** ./src/game/features/board/tile/benchTile.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.BenchTile = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var tile_1 = __webpack_require__(/*! ./tile */ "./src/game/features/board/tile/tile.tsx");
var BenchTile = function (props) {
    return (React.createElement(tile_1.Tile, { type: models_1.TileType.BENCH, x: props.slot, y: null }));
};
exports.BenchTile = BenchTile;


/***/ }),

/***/ "./src/game/features/board/tile/boardTile.tsx":
/*!****************************************************!*\
  !*** ./src/game/features/board/tile/boardTile.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.BoardTile = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var tile_1 = __webpack_require__(/*! ./tile */ "./src/game/features/board/tile/tile.tsx");
var BoardTile = function (props) {
    return (React.createElement(tile_1.Tile, { type: models_1.TileType.BOARD, x: props.x, y: props.y }));
};
exports.BoardTile = BoardTile;


/***/ }),

/***/ "./src/game/features/board/tile/tile.tsx":
/*!***********************************************!*\
  !*** ./src/game/features/board/tile/tile.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.Tile = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/esm/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_2 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var pieceSelectors_1 = __webpack_require__(/*! ../../../../store/pieceSelectors */ "./src/store/pieceSelectors.ts");
var shared_2 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var actions_1 = __webpack_require__(/*! ../actions */ "./src/game/features/board/actions.ts");
// tslint:disable-next-line:no-bitwise
var isBoardTileDark = function (x, y) { return ((y ^ x) & 1) !== 0; };
var getClassName = function (tileType, x, y) {
    if (tileType === models_1.TileType.BENCH) {
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
    var to = (type === models_1.TileType.BOARD
        ? ({
            type: "board",
            location: { x: x, y: y }
        })
        : ({
            type: "bench",
            location: { slot: x }
        }));
    dispatch(shared_2.PlayerActions.playerDropPieceAction(piece.id, from, to));
    dispatch(actions_1.clearSelectedPiece());
};
var Tile = function (_a) {
    var x = _a.x, y = _a.y, type = _a.type;
    var dispatch = react_redux_1.useDispatch();
    var piece = react_redux_1.useSelector(function (state) { return (type === models_1.TileType.BOARD
        ? pieceSelectors_1.boardTilePieceSelector(state, { x: x, y: y })
        : pieceSelectors_1.benchTilePieceSelector(state, { x: x })); });
    var boardLocked = react_redux_1.useSelector(function (state) { return state.board.locked; });
    var belowPieceLimit = react_redux_1.useSelector(function (state) { return pieceSelectors_1.ownedPieceSelector(state).length < shared_2.getPlayerLevel(state); });
    var canMovePiece = react_redux_1.useSelector(function (state) { return state.game.phase === models_2.GamePhase.PREPARING || type === models_1.TileType.BENCH; });
    var selectedPiece = react_redux_1.useSelector(function (state) { return state.ui.selectedPieceId ? shared_1.getPiece(state, state.ui.selectedPieceId) : null; });
    var isSelected = piece && selectedPiece && piece.id === selectedPiece.id;
    var _b = __read(react_dnd_1.useDrop({
        accept: "Piece",
        drop: function (item) { return onDropPiece(dispatch, item.piece, type, x, y); },
        canDrop: function (item) { return shared_2.canDropPiece(item.piece, x, y, piece === null, boardLocked, belowPieceLimit); },
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
    return (React.createElement("div", { ref: drop, className: "tile " + getClassName(type, x, y) + (isSelected ? " selected" : "") + " style-default", "touch-action": "none", onPointerUp: onClick },
        React.createElement("div", { className: "" + getOverlayClassName(isDragging, canDrop) })));
};
exports.Tile = Tile;


/***/ }),

/***/ "./src/game/features/cardShop/balanceDisplay.tsx":
/*!*******************************************************!*\
  !*** ./src/game/features/cardShop/balanceDisplay.tsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.BalanceDisplay = void 0;
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

/***/ "./src/game/features/cardShop/card.tsx":
/*!*********************************************!*\
  !*** ./src/game/features/cardShop/card.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Card = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var display_1 = __webpack_require__(/*! ../../../ui/display */ "./src/ui/display/index.ts");
var definitionProvider = new shared_1.DefinitionProvider();
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

/***/ "./src/game/features/cardShop/cardShop.tsx":
/*!*************************************************!*\
  !*** ./src/game/features/cardShop/cardShop.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.CardShop = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var card_1 = __webpack_require__(/*! ./card */ "./src/game/features/cardShop/card.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var rerollButton_1 = __webpack_require__(/*! ./rerollButton */ "./src/game/features/cardShop/rerollButton.tsx");
var balanceDisplay_1 = __webpack_require__(/*! ./balanceDisplay */ "./src/game/features/cardShop/balanceDisplay.tsx");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var toggleLockButton_1 = __webpack_require__(/*! ./toggleLockButton */ "./src/game/features/cardShop/toggleLockButton.tsx");
var CardShop = function (_a) {
    var showBalance = _a.showBalance;
    var dispatch = react_redux_1.useDispatch();
    var cards = react_redux_1.useSelector(function (state) { return state.playerInfo.cards; });
    var money = react_redux_1.useSelector(shared_1.getPlayerMoney);
    var canUseShop = react_redux_1.useSelector(function (state) { return state.playerInfo.dead === false; });
    var createCard = function (card, index) {
        if (card === null) {
            return null;
        }
        var onClick = function () { return dispatch(shared_1.PlayerActions.buyCardAction(index)); };
        return (React.createElement(card_1.Card, { key: index + "-" + card.definitionId, definitionId: card.definitionId, buyable: money >= card.cost, onClick: onClick }));
    };
    if (canUseShop === false) {
        return null;
    }
    return (React.createElement("div", { className: "card-selector" },
        showBalance
            && (React.createElement("div", { className: "balance" },
                React.createElement(balanceDisplay_1.BalanceDisplay, { value: money }))),
        React.createElement("div", { className: "cards" },
            React.createElement("div", { className: "shop-actions" },
                React.createElement(rerollButton_1.RerollButton, null),
                React.createElement(toggleLockButton_1.ToggleLockButton, null)),
            cards.map(createCard))));
};
exports.CardShop = CardShop;


/***/ }),

/***/ "./src/game/features/cardShop/closeShopOnFirstBuy.ts":
/*!***********************************************************!*\
  !*** ./src/game/features/cardShop/closeShopOnFirstBuy.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.closeShopOnFirstBuy = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var overlay_1 = __webpack_require__(/*! ../../../ui/overlay */ "./src/ui/overlay.ts");
var actions_1 = __webpack_require__(/*! ../../../ui/actions */ "./src/ui/actions.ts");
exports.closeShopOnFirstBuy = function () {
    var shopIsOpen;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.take(shared_1.PlayerActions.BUY_CARD_ACTION)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.select(function (state) { return state.ui.currentOverlay === overlay_1.Overlay.SHOP; })];
            case 2:
                shopIsOpen = _a.sent();
                if (!shopIsOpen) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, effects_1.put(actions_1.closeOverlay())];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/game/features/cardShop/index.ts":
/*!*********************************************!*\
  !*** ./src/game/features/cardShop/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var cardShop_1 = __webpack_require__(/*! ./cardShop */ "./src/game/features/cardShop/cardShop.tsx");
__createBinding(exports, cardShop_1, "CardShop");
var card_1 = __webpack_require__(/*! ./card */ "./src/game/features/cardShop/card.tsx");
__createBinding(exports, card_1, "Card");


/***/ }),

/***/ "./src/game/features/cardShop/rerollButton.tsx":
/*!*****************************************************!*\
  !*** ./src/game/features/cardShop/rerollButton.tsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.RerollButton = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var RerollButton = function () {
    var dispatch = react_redux_1.useDispatch();
    var money = react_redux_1.useSelector(shared_1.getPlayerMoney);
    var buyable = money >= models_1.REROLL_COST;
    var onBuy = function () { return dispatch(shared_1.PlayerActions.rerollCardsAction()); };
    return (React.createElement("button", { className: "reroll shop-action", onClick: buyable ? onBuy : undefined, disabled: buyable === false },
        "New Cards ($",
        models_1.REROLL_COST,
        ")"));
};
exports.RerollButton = RerollButton;


/***/ }),

/***/ "./src/game/features/cardShop/toggleLockButton.tsx":
/*!*********************************************************!*\
  !*** ./src/game/features/cardShop/toggleLockButton.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ToggleLockButton = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var ToggleLockButton = function () {
    var dispatch = react_redux_1.useDispatch();
    var shopLocked = react_redux_1.useSelector(function (state) { return state.playerInfo.shopLocked; });
    var onToggleLock = function () { return dispatch(shared_1.PlayerActions.toggleShopLock()); };
    return (React.createElement("button", { className: "shop-action", onClick: onToggleLock }, shopLocked
        ? "Unlock"
        : "Lock"));
};
exports.ToggleLockButton = ToggleLockButton;


/***/ }),

/***/ "./src/game/features/help.tsx":
/*!************************************!*\
  !*** ./src/game/features/help.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Help = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var footer_1 = __webpack_require__(/*! ../../ui/display/footer */ "./src/ui/display/footer.tsx");
var Help = function (_a) {
    var _b = _a.hideFooter, hideFooter = _b === void 0 ? false : _b;
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
                React.createElement("li", null, "Win / loss streak bonus"))),
        !hideFooter && React.createElement(footer_1.Footer, null)));
};
exports.Help = Help;


/***/ }),

/***/ "./src/game/features/phaseInfo.tsx":
/*!*****************************************!*\
  !*** ./src/game/features/phaseInfo.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PhaseInfo = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var countdown_1 = __webpack_require__(/*! ../../ui/display/countdown */ "./src/ui/display/countdown.tsx");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var renderPhaseInfoCountdown = function (secondsRemaining) { return React.createElement("span", { className: "highlight" },
    "(",
    secondsRemaining,
    ")"); };
var PhaseInfo = function () {
    var phase = react_redux_1.useSelector(function (state) { return state.game.phase; });
    var phaseStartedAtSeconds = react_redux_1.useSelector(function (state) { return state.game.phaseStartedAtSeconds; });
    var isDead = react_redux_1.useSelector(function (state) { return state.playerInfo.dead; });
    if (isDead) {
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

/***/ "./src/game/features/playerList/battleInfo.tsx":
/*!*****************************************************!*\
  !*** ./src/game/features/playerList/battleInfo.tsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.BattleInfo = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var playerSelectors_1 = __webpack_require__(/*! ../../../store/playerSelectors */ "./src/store/playerSelectors.ts");
var playerName_1 = __webpack_require__(/*! ./playerName */ "./src/game/features/playerList/playerName.tsx");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var getBattleText = function (battle) {
    if (battle.status === models_1.PlayerBattleStatus.IN_PROGRESS) {
        return "Battling";
    }
    if (battle.status === models_1.PlayerBattleStatus.FINISHED) {
        return battle.homeScore + " - " + battle.awayScore;
    }
    return "";
};
var getBattleHighlightClass = function (battle) {
    if (battle.status === models_1.PlayerBattleStatus.FINISHED) {
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

/***/ "./src/game/features/playerList/index.ts":
/*!***********************************************!*\
  !*** ./src/game/features/playerList/index.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var playerList_1 = __webpack_require__(/*! ./playerList */ "./src/game/features/playerList/playerList.tsx");
__createBinding(exports, playerList_1, "PlayerList");


/***/ }),

/***/ "./src/game/features/playerList/playerList.tsx":
/*!*****************************************************!*\
  !*** ./src/game/features/playerList/playerList.tsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PlayerList = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var playerListItem_1 = __webpack_require__(/*! ./playerListItem */ "./src/game/features/playerList/playerListItem.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var selectors_1 = __webpack_require__(/*! ../../../auth/store/selectors */ "./src/auth/store/selectors.ts");
var PlayerList = function () {
    var players = react_redux_1.useSelector(function (state) { return state.playerList; });
    var opponentId = react_redux_1.useSelector(shared_1.getOpponentId);
    var localPlayerId = react_redux_1.useSelector(selectors_1.getUserId);
    var showReadyIndicators = react_redux_1.useSelector(function (state) { return state.game.phase === models_1.GamePhase.PREPARING; });
    var localPlayerMoney = react_redux_1.useSelector(shared_1.getPlayerMoney);
    var localPlayerLevel = react_redux_1.useSelector(shared_1.getPlayerLevel);
    return (React.createElement("div", { className: "player-list" }, players.map(function (p) { return (p.status === models_1.PlayerStatus.QUIT
        ? (React.createElement(playerListItem_1.QuitPlayerListItem, { key: p.id, playerId: p.id }))
        : (React.createElement(playerListItem_1.PlayerListItem, { key: p.id, playerId: p.id, player: p, isLocal: p.id === localPlayerId, isOpponent: p.id === opponentId, ready: showReadyIndicators ? p.ready : null, streakType: p.streakType, streakAmount: p.streakAmount, money: p.id === localPlayerId ? localPlayerMoney : p.money, level: p.id === localPlayerId ? localPlayerLevel : p.level }))); })));
};
exports.PlayerList = PlayerList;


/***/ }),

/***/ "./src/game/features/playerList/playerListActionTypes.ts":
/*!***************************************************************!*\
  !*** ./src/game/features/playerList/playerListActionTypes.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PLAYER_LIST_UPDATED = void 0;
exports.PLAYER_LIST_UPDATED = "PLAYER_LIST_UPDATED";


/***/ }),

/***/ "./src/game/features/playerList/playerListActions.ts":
/*!***********************************************************!*\
  !*** ./src/game/features/playerList/playerListActions.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.playerListUpdated = void 0;
var playerListActionTypes_1 = __webpack_require__(/*! ./playerListActionTypes */ "./src/game/features/playerList/playerListActionTypes.ts");
exports.playerListUpdated = function (payload) { return ({
    type: playerListActionTypes_1.PLAYER_LIST_UPDATED,
    payload: payload
}); };


/***/ }),

/***/ "./src/game/features/playerList/playerListItem.tsx":
/*!*********************************************************!*\
  !*** ./src/game/features/playerList/playerListItem.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.QuitPlayerListItem = exports.PlayerListItem = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var display_1 = __webpack_require__(/*! ../../../ui/display */ "./src/ui/display/index.ts");
var playerName_1 = __webpack_require__(/*! ./playerName */ "./src/game/features/playerList/playerName.tsx");
var battleInfo_1 = __webpack_require__(/*! ./battleInfo */ "./src/game/features/playerList/battleInfo.tsx");
var ReadyIndicator = function (_a) {
    var ready = _a.ready;
    if (ready === null) {
        return null;
    }
    return (React.createElement("span", { className: "ready-indicator " + (ready ? "ready" : "not-ready") }));
};
var StreakIndicator = function (_a) {
    var type = _a.type, amount = _a.amount;
    if (type === null || !amount || amount === 1) {
        return null;
    }
    return React.createElement("div", { className: "streak-indicator " + (type === models_1.StreakType.WIN ? "win" : "lose") }, amount);
};
var QuitPlayerListItem = function (_a) {
    var playerId = _a.playerId;
    return (React.createElement("div", { className: "player-list-item quit" },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "row-half" },
                React.createElement("span", { className: "name" },
                    React.createElement(playerName_1.PlayerName, { playerId: playerId })))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "row-half" }),
            React.createElement("div", { className: "row-half" },
                React.createElement("span", { className: "status" }, "Quit")))));
};
exports.QuitPlayerListItem = QuitPlayerListItem;
var PlayerListItem = function (props) {
    var className = "player-list-item " + (props.isLocal ? " local" : "") + " " + (props.isOpponent ? " opponent" : "");
    return (React.createElement("div", { className: className },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "row-half" },
                React.createElement("span", { className: "name" },
                    React.createElement(ReadyIndicator, { ready: props.ready }),
                    React.createElement(playerName_1.PlayerName, { playerId: props.playerId }),
                    " ",
                    props.player.status === models_1.PlayerStatus.QUIT && 'has quit')),
            React.createElement("div", { className: "row-half" },
                React.createElement(display_1.ProgressBar, { className: "healthbar player-health", current: props.player.health, max: 100 }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "row-half" },
                React.createElement("div", { className: "badges" },
                    React.createElement("span", { className: "badge money" },
                        "$",
                        props.money),
                    React.createElement("span", { className: "badge" },
                        "Lv ",
                        props.level))),
            React.createElement("div", { className: "row-half" },
                React.createElement(battleInfo_1.BattleInfo, { playerId: props.playerId }),
                React.createElement(StreakIndicator, { type: props.streakType, amount: props.streakAmount })))));
};
exports.PlayerListItem = PlayerListItem;


/***/ }),

/***/ "./src/game/features/playerList/playerListReducer.ts":
/*!***********************************************************!*\
  !*** ./src/game/features/playerList/playerListReducer.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.playerList = void 0;
var playerListActionTypes_1 = __webpack_require__(/*! ./playerListActionTypes */ "./src/game/features/playerList/playerListActionTypes.ts");
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

/***/ "./src/game/features/playerList/playerName.tsx":
/*!*****************************************************!*\
  !*** ./src/game/features/playerList/playerName.tsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PlayerName = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var playerSelectors_1 = __webpack_require__(/*! ../../../store/playerSelectors */ "./src/store/playerSelectors.ts");
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

/***/ "./src/game/features/profile/index.ts":
/*!********************************************!*\
  !*** ./src/game/features/profile/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var profile_1 = __webpack_require__(/*! ./profile */ "./src/game/features/profile/profile.tsx");
__createBinding(exports, profile_1, "Profile");


/***/ }),

/***/ "./src/game/features/profile/pieceCount.tsx":
/*!**************************************************!*\
  !*** ./src/game/features/profile/pieceCount.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PieceCount = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var pieceSelectors_1 = __webpack_require__(/*! ../../../store/pieceSelectors */ "./src/store/pieceSelectors.ts");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var PieceCount = function (props) {
    var level = react_redux_1.useSelector(shared_1.getPlayerLevel);
    var pieceCount = react_redux_1.useSelector(function (state) { return pieceSelectors_1.ownedPieceSelector(state).length; });
    if (pieceCount !== level) {
        return React.createElement("p", { className: "item pieces warning" },
            pieceCount,
            " / ",
            level,
            " pieces (board not full!)");
    }
    return React.createElement("p", { className: "item pieces" },
        pieceCount,
        " / ",
        level,
        " pieces");
};
exports.PieceCount = PieceCount;


/***/ }),

/***/ "./src/game/features/profile/profile.tsx":
/*!***********************************************!*\
  !*** ./src/game/features/profile/profile.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Profile = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var progressBar_1 = __webpack_require__(/*! ../../../ui/display/progressBar */ "./src/ui/display/progressBar.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var pieceCount_1 = __webpack_require__(/*! ./pieceCount */ "./src/game/features/profile/pieceCount.tsx");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var models_2 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var renderProgressBar = function (current, max) { return current + " / " + max + " xp"; };
var Profile = function () {
    var dispatch = react_redux_1.useDispatch();
    var level = react_redux_1.useSelector(shared_1.getPlayerLevel);
    var xp = react_redux_1.useSelector(shared_1.getPlayerXp);
    return (React.createElement("div", { className: "profile" },
        React.createElement("p", { className: "item level" },
            "Level ",
            level),
        React.createElement(pieceCount_1.PieceCount, null),
        level !== models_2.MAX_PLAYER_LEVEL
            && (React.createElement("div", { className: "level-bar" },
                React.createElement(progressBar_1.ProgressBar, { className: "xp-progress", current: xp, max: shared_1.getXpToNextLevel(level), renderContents: renderProgressBar }),
                React.createElement("button", { className: "buy-xp", onClick: function () { return dispatch(shared_1.PlayerActions.buyXpAction()); } },
                    "Buy ",
                    models_1.Constants.BUY_XP_AMOUNT,
                    " xp ($",
                    models_1.Constants.BUY_XP_COST,
                    ")")))));
};
exports.Profile = Profile;


/***/ }),

/***/ "./src/game/features/roundIndicator.tsx":
/*!**********************************************!*\
  !*** ./src/game/features/roundIndicator.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.RoundIndicator = void 0;
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

/***/ "./src/game/features/settings/index.ts":
/*!*********************************************!*\
  !*** ./src/game/features/settings/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var settings_1 = __webpack_require__(/*! ./settings */ "./src/game/features/settings/settings.tsx");
__createBinding(exports, settings_1, "Settings");
var quitGameButton_1 = __webpack_require__(/*! ./quitGameButton */ "./src/game/features/settings/quitGameButton.tsx");
__createBinding(exports, quitGameButton_1, "QuitGameButton");


/***/ }),

/***/ "./src/game/features/settings/quitGameButton.tsx":
/*!*******************************************************!*\
  !*** ./src/game/features/settings/quitGameButton.tsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.QuitGameButton = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var QuitGameButton = function () {
    var dispatch = react_redux_1.useDispatch();
    var _a = __read(React.useState(false), 2), areYouSure = _a[0], setAreYouSure = _a[1];
    var onClick = (areYouSure
        ? function () {
            dispatch(shared_1.PlayerActions.quitGameAction());
        }
        : function () {
            setAreYouSure(true);
        });
    if (!areYouSure) {
        return React.createElement("button", { onClick: onClick, className: "button" }, "Quit Game");
    }
    return React.createElement("button", { onClick: onClick, className: "button" }, "Click again to quit");
};
exports.QuitGameButton = QuitGameButton;


/***/ }),

/***/ "./src/game/features/settings/settings.tsx":
/*!*************************************************!*\
  !*** ./src/game/features/settings/settings.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Settings = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var footer_1 = __webpack_require__(/*! ../../../ui/display/footer */ "./src/ui/display/footer.tsx");
var quitGameButton_1 = __webpack_require__(/*! ./quitGameButton */ "./src/game/features/settings/quitGameButton.tsx");
var Settings = function () {
    return (React.createElement("div", { className: "settings" },
        React.createElement(quitGameButton_1.QuitGameButton, null),
        React.createElement(footer_1.Footer, null)));
};
exports.Settings = Settings;


/***/ }),

/***/ "./src/game/gamePage.tsx":
/*!*******************************!*\
  !*** ./src/game/gamePage.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.GamePage = void 0;
// tslint:disable:jsx-ban-props
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/esm/index.js");
var react_dnd_multi_backend_1 = __webpack_require__(/*! react-dnd-multi-backend */ "./node_modules/react-dnd-multi-backend/dist/esm/index.js");
var HTML5toTouch_1 = __webpack_require__(/*! react-dnd-multi-backend/dist/esm/HTML5toTouch */ "./node_modules/react-dnd-multi-backend/dist/esm/HTML5toTouch.js");
var react_media_1 = __webpack_require__(/*! react-media */ "./node_modules/react-media/esm/react-media.js");
var responsiveBoardStyles_1 = __webpack_require__(/*! ./features/board/responsiveBoardStyles */ "./src/game/features/board/responsiveBoardStyles.tsx");
var mobileGame_1 = __webpack_require__(/*! ./layouts/mobileGame */ "./src/game/layouts/mobileGame.tsx");
var desktopGame_1 = __webpack_require__(/*! ./layouts/desktopGame */ "./src/game/layouts/desktopGame.tsx");
var GamePage = function () {
    return (React.createElement(react_dnd_1.DndProvider, { backend: react_dnd_multi_backend_1["default"], options: HTML5toTouch_1["default"] },
        React.createElement(responsiveBoardStyles_1.ResponsiveBoardStyles, null),
        React.createElement(react_media_1["default"], { query: "(orientation: landscape) and (min-width: 1200px)" },
            React.createElement(desktopGame_1.DesktopGame, null)),
        React.createElement(react_media_1["default"], { query: "(orientation: landscape) and (max-width: 1199px) and (min-width: 600px)" },
            React.createElement(mobileGame_1.MobileGame, null)),
        React.createElement(react_media_1["default"], { query: "(orientation: portrait), (max-width: 599px)" },
            React.createElement(mobileGame_1.MobileGame, null))));
};
exports.GamePage = GamePage;


/***/ }),

/***/ "./src/game/index.ts":
/*!***************************!*\
  !*** ./src/game/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var sagas_1 = __webpack_require__(/*! ./sagas */ "./src/game/sagas/index.ts");
__createBinding(exports, sagas_1, "gameSaga");
var gamePage_1 = __webpack_require__(/*! ./gamePage */ "./src/game/gamePage.tsx");
__createBinding(exports, gamePage_1, "GamePage");


/***/ }),

/***/ "./src/game/layouts/desktopGame.tsx":
/*!******************************************!*\
  !*** ./src/game/layouts/desktopGame.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.DesktopGame = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var boardContainer_1 = __webpack_require__(/*! ../features/board/boardContainer */ "./src/game/features/board/boardContainer.tsx");
var cardShop_1 = __webpack_require__(/*! ../features/cardShop */ "./src/game/features/cardShop/index.ts");
var playerList_1 = __webpack_require__(/*! ../features/playerList */ "./src/game/features/playerList/index.ts");
var profile_1 = __webpack_require__(/*! ../features/profile */ "./src/game/features/profile/index.ts");
var roundIndicator_1 = __webpack_require__(/*! ../features/roundIndicator */ "./src/game/features/roundIndicator.tsx");
var phaseInfo_1 = __webpack_require__(/*! ../features/phaseInfo */ "./src/game/features/phaseInfo.tsx");
var settings_1 = __webpack_require__(/*! ../features/settings */ "./src/game/features/settings/index.ts");
var footer_1 = __webpack_require__(/*! ../../ui/display/footer */ "./src/ui/display/footer.tsx");
var help_1 = __webpack_require__(/*! ../features/help */ "./src/game/features/help.tsx");
var DesktopGame = function () {
    return (React.createElement("div", { className: "game landscape" },
        React.createElement("div", { className: "group" },
            React.createElement(roundIndicator_1.RoundIndicator, null),
            React.createElement(phaseInfo_1.PhaseInfo, null),
            React.createElement(playerList_1.PlayerList, null)),
        React.createElement(boardContainer_1.BoardContainer, null),
        React.createElement("div", { className: "group right" },
            React.createElement(settings_1.QuitGameButton, null),
            React.createElement(cardShop_1.CardShop, { showBalance: true }),
            React.createElement("p", { className: "connection-warning" }, "If you encounter connection issues, please refresh and press \"Find Game\" to reconnect"),
            React.createElement(profile_1.Profile, null),
            React.createElement("div", { className: "help-container" },
                React.createElement(help_1.Help, { hideFooter: true })),
            React.createElement(footer_1.Footer, null))));
};
exports.DesktopGame = DesktopGame;


/***/ }),

/***/ "./src/game/layouts/mobileGame.tsx":
/*!*****************************************!*\
  !*** ./src/game/layouts/mobileGame.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.MobileGame = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var react_fontawesome_1 = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
var free_solid_svg_icons_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var overlay_1 = __webpack_require__(/*! ../../ui/overlay */ "./src/ui/overlay.ts");
var actions_1 = __webpack_require__(/*! ../../ui/actions */ "./src/ui/actions.ts");
var boardContainer_1 = __webpack_require__(/*! ../features/board/boardContainer */ "./src/game/features/board/boardContainer.tsx");
var cardShop_1 = __webpack_require__(/*! ../features/cardShop */ "./src/game/features/cardShop/index.ts");
var playerList_1 = __webpack_require__(/*! ../features/playerList */ "./src/game/features/playerList/index.ts");
var profile_1 = __webpack_require__(/*! ../features/profile */ "./src/game/features/profile/index.ts");
var settings_1 = __webpack_require__(/*! ../features/settings */ "./src/game/features/settings/index.ts");
var roundIndicator_1 = __webpack_require__(/*! ../features/roundIndicator */ "./src/game/features/roundIndicator.tsx");
var phaseInfo_1 = __webpack_require__(/*! ../features/phaseInfo */ "./src/game/features/phaseInfo.tsx");
var help_1 = __webpack_require__(/*! ../features/help */ "./src/game/features/help.tsx");
var NavItem = function (_a) {
    var overlay = _a.overlay, icon = _a.icon;
    var dispatch = react_redux_1.useDispatch();
    var isActive = react_redux_1.useSelector(function (state) { return state.ui.currentOverlay === overlay; });
    var onClick = function () {
        if (isActive) {
            dispatch(actions_1.closeOverlay());
            return;
        }
        dispatch(actions_1.openOverlay(overlay));
    };
    return (React.createElement("button", { className: "navitem" + (isActive ? " active" : ""), onClick: onClick },
        React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: icon })));
};
var Navbar = function () {
    return (React.createElement("nav", { className: "navbar" },
        React.createElement(NavItem, { overlay: overlay_1.Overlay.PLAYERS, icon: free_solid_svg_icons_1.faUsers }),
        React.createElement(NavItem, { overlay: overlay_1.Overlay.SHOP, icon: free_solid_svg_icons_1.faShoppingCart }),
        React.createElement(NavItem, { overlay: overlay_1.Overlay.HELP, icon: free_solid_svg_icons_1.faQuestionCircle }),
        React.createElement(NavItem, { overlay: overlay_1.Overlay.SETTINGS, icon: free_solid_svg_icons_1.faCog })));
};
var OverlayComponent = function (_a) {
    var title = _a.title, children = _a.children;
    var dispatch = react_redux_1.useDispatch();
    var dispatchCloseOverlay = function () { return dispatch(actions_1.closeOverlay()); };
    return (React.createElement("div", { className: "game-overlay" },
        React.createElement("div", { className: "overlay-header" },
            React.createElement("h2", { className: "overlay-title" }, title),
            React.createElement("button", { className: "close", onClick: dispatchCloseOverlay }, "X")),
        React.createElement("div", { className: "overlay-content" }, children)));
};
var GameOverlay = function (_a) {
    var currentOverlay = _a.currentOverlay;
    var currentBalance = react_redux_1.useSelector(shared_1.getPlayerMoney);
    if (currentOverlay === overlay_1.Overlay.PLAYERS) {
        return (React.createElement(OverlayComponent, { title: "Players" },
            React.createElement(playerList_1.PlayerList, null)));
    }
    if (currentOverlay === overlay_1.Overlay.SHOP) {
        return (React.createElement(OverlayComponent, { title: "Balance: $" + currentBalance },
            React.createElement(cardShop_1.CardShop, { showBalance: false }),
            React.createElement(profile_1.Profile, null)));
    }
    if (currentOverlay === overlay_1.Overlay.HELP) {
        return (React.createElement(OverlayComponent, { title: "Help" },
            React.createElement(help_1.Help, null)));
    }
    if (currentOverlay === overlay_1.Overlay.SETTINGS) {
        return (React.createElement(OverlayComponent, { title: "Settings" },
            React.createElement(settings_1.Settings, null)));
    }
    return null;
};
var MobileGameContentPane = function () {
    var currentOverlay = react_redux_1.useSelector(function (state) { return state.ui.currentOverlay; });
    if (currentOverlay === null) {
        return (React.createElement("div", { className: "content-pane" },
            React.createElement("p", { className: "connection-warning" }, "If you encounter connection issues, please refresh and press \"Find Game\" to reconnect"),
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

/***/ "./src/game/sagas/actions/announcement.ts":
/*!************************************************!*\
  !*** ./src/game/sagas/actions/announcement.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.announcement = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! ../../../ui/actions */ "./src/ui/actions.ts");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
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
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest([shared_1.PlayerInfoCommands.UPDATE_OPPONENT_COMMAND, actions_1.PLAYERS_RESURRECTED], function (action) {
                    var state, opponent, playerIds, state_1, playerNames, message;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(action.type === shared_1.PlayerInfoCommands.UPDATE_OPPONENT_COMMAND)) return [3 /*break*/, 3];
                                return [4 /*yield*/, effects_1.select()];
                            case 1:
                                state = _a.sent();
                                opponent = state.playerList.find(function (p) { return p.id === action.payload.opponentId; });
                                if (!opponent) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, effects_1.put(actions_1.updateAnnouncement(opponent.name, "Now Playing"))];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                if (!(action.type === actions_1.PLAYERS_RESURRECTED)) return [3 /*break*/, 8];
                                playerIds = action.payload.playerIds;
                                return [4 /*yield*/, effects_1.select()];
                            case 4:
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
                                return [4 /*yield*/, effects_1.put(actions_1.updateAnnouncement("Players Resurrected", message))];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, effects_1.delay(2000)];
                            case 6:
                                _a.sent();
                                return [4 /*yield*/, effects_1.put(actions_1.clearAnnouncement())];
                            case 7:
                                _a.sent();
                                _a.label = 8;
                            case 8: return [2 /*return*/];
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

/***/ "./src/game/sagas/actions/preventAccidentalClose.ts":
/*!**********************************************************!*\
  !*** ./src/game/sagas/actions/preventAccidentalClose.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.preventAccidentalClose = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
exports.preventAccidentalClose = function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // display an "Are you sure you want to leave this page?" dialog
                window.onbeforeunload = function () { return "Are you sure you want to leave this page? There is currently no way to rejoin a game"; };
                return [4 /*yield*/, effects_1.take(shared_1.PlayerActions.QUIT_GAME_ACTION)];
            case 1:
                _a.sent();
                // just to allow the packets to send
                setTimeout(function () {
                    window.onbeforeunload = undefined;
                    location.reload();
                }, 100);
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/game/sagas/index.ts":
/*!*********************************!*\
  !*** ./src/game/sagas/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.gameSaga = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var preventAccidentalClose_1 = __webpack_require__(/*! ../../game/sagas/actions/preventAccidentalClose */ "./src/game/sagas/actions/preventAccidentalClose.ts");
var closeShopOnFirstBuy_1 = __webpack_require__(/*! ../features/cardShop/closeShopOnFirstBuy */ "./src/game/features/cardShop/closeShopOnFirstBuy.ts");
var announcement_1 = __webpack_require__(/*! ./actions/announcement */ "./src/game/sagas/actions/announcement.ts");
var saga_1 = __webpack_require__(/*! ./networking/saga */ "./src/game/sagas/networking/saga.ts");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
exports.gameSaga = function (playerId, socket) {
    var definitionProvider, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                definitionProvider = new shared_1.DefinitionProvider();
                _a = effects_1.all;
                return [4 /*yield*/, effects_1.fork(saga_1.gameNetworking, socket)];
            case 1:
                _b = [
                    _c.sent()
                ];
                return [4 /*yield*/, effects_1.fork(preventAccidentalClose_1.preventAccidentalClose)];
            case 2:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(announcement_1.announcement)];
            case 3:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(closeShopOnFirstBuy_1.closeShopOnFirstBuy)];
            case 4:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(shared_1.PlayerSagas.evolutionSagaFactory())];
            case 5:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(shared_1.PlayerActionSagas.sellPiecePlayerActionSagaFactory())];
            case 6:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(shared_1.PlayerActionSagas.rerollCardsPlayerActionSagaFactory())];
            case 7:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(shared_1.PlayerActionSagas.toggleShopLockPlayerActionSagaFactory())];
            case 8:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(shared_1.PlayerActionSagas.buyCardPlayerActionSagaFactory(definitionProvider, playerId))];
            case 9:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(shared_1.PlayerActionSagas.buyXpPlayerActionSagaFactory())];
            case 10:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(shared_1.PlayerActionSagas.dropPiecePlayerActionSagaFactory(playerId))];
            case 11:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(shared_1.PlayerSagas.xpSagaFactory())];
            case 12:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(shared_1.battleSaga, shared_1.defaultGameOptions)];
            case 13: return [4 /*yield*/, _a.apply(void 0, [_b.concat([
                        _c.sent()
                    ])])];
            case 14:
                _c.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/game/sagas/networking/incoming.ts":
/*!***********************************************!*\
  !*** ./src/game/sagas/networking/incoming.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.incomingGameNetworking = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var playerListActions_1 = __webpack_require__(/*! ../../features/playerList/playerListActions */ "./src/game/features/playerList/playerListActions.ts");
var actions_1 = __webpack_require__(/*! ../../features/board/actions */ "./src/game/features/board/actions.ts");
var actions_2 = __webpack_require__(/*! ../../../ui/actions */ "./src/ui/actions.ts");
var overlay_1 = __webpack_require__(/*! ../../../ui/overlay */ "./src/ui/overlay.ts");
var readPacketsToActions = function (registry, socket) {
    var channel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                channel = redux_saga_1.eventChannel(function (emit) {
                    socket.on("reconnect_failed", function () {
                        emit(actions_2.clearAnnouncement());
                        emit(actions_2.updateConnectionStatus(shared_1.ConnectionStatus.DISCONNECTED));
                    });
                    socket.on("reconnect_error", function () {
                        emit(actions_2.clearAnnouncement());
                        emit(actions_2.updateConnectionStatus(shared_1.ConnectionStatus.DISCONNECTED));
                    });
                    registry.on(shared_1.ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, function (packet) {
                        emit(playerListActions_1.playerListUpdated(packet));
                    });
                    registry.on(shared_1.ServerToClientPacketOpcodes.CARDS_UPDATE, function (packet) {
                        emit(shared_1.PlayerInfoCommands.updateCardsCommand(packet));
                    });
                    registry.on(shared_1.ServerToClientPacketOpcodes.MONEY_UPDATE, function (packet) {
                        emit(shared_1.PlayerInfoCommands.updateMoneyCommand(packet));
                    });
                    registry.on(shared_1.ServerToClientPacketOpcodes.LEVEL_UPDATE, function (packet) {
                        emit(shared_1.PlayerInfoCommands.updateLevelCommand(packet.level, packet.xp));
                    });
                    registry.on(shared_1.ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE, function (packet) {
                        emit(shared_1.PlayerInfoCommands.updateShopLockCommand(packet.locked));
                    });
                    registry.on(shared_1.ServerToClientPacketOpcodes.PLAYERS_RESURRECTED, function (_a) {
                        var playerIds = _a.playerIds;
                        emit(actions_2.playersResurrected(playerIds));
                    });
                    registry.on(shared_1.ServerToClientPacketOpcodes.FINISH_GAME, function (packet) {
                        emit(actions_2.finishGameAction(packet.winnerName));
                        socket.close();
                    });
                    registry.on(shared_1.ServerToClientPacketOpcodes.PHASE_UPDATE, function (packet) {
                        // todo this is ugly
                        if (packet.phase === models_1.GamePhase.PREPARING) {
                            emit(shared_1.GameEvents.gamePhaseStartedEvent(packet.phase, packet.startedAtSeconds, packet.payload.round));
                        }
                        else {
                            emit(shared_1.GameEvents.gamePhaseStartedEvent(packet.phase, packet.startedAtSeconds));
                        }
                        switch (packet.phase) {
                            case models_1.GamePhase.PREPARING: {
                                var _a = packet.payload, cards = _a.cards, _b = _a.pieces, board = _b.board, bench = _b.bench, round = _a.round;
                                emit(shared_1.GameEvents.gamePhaseStartedEvent(packet.phase, packet.startedAtSeconds, round));
                                emit(shared_1.BoardCommands.initialiseBoard(board.pieces));
                                emit(shared_1.BenchCommands.initialiseBenchCommand(bench));
                                emit(shared_1.PlayerInfoCommands.updateCardsCommand(cards));
                                emit(shared_1.PlayerInfoCommands.clearOpponentCommand());
                                emit(shared_1.BoardCommands.unlockBoard());
                                emit(actions_2.openOverlay(overlay_1.Overlay.SHOP));
                                emit(actions_2.clearAnnouncement());
                                return;
                            }
                            case models_1.GamePhase.READY: {
                                var _c = packet.payload, board = _c.board, bench = _c.bench, opponentId = _c.opponentId;
                                if (board) {
                                    emit(shared_1.BoardCommands.initialiseBoard(board.pieces));
                                }
                                emit(shared_1.BenchCommands.initialiseBenchCommand(bench));
                                emit(shared_1.BoardCommands.lockBoard());
                                emit(actions_2.closeOverlay());
                                emit(shared_1.PlayerInfoCommands.updateOpponentCommand(opponentId));
                                emit(actions_1.clearSelectedPiece());
                                return;
                            }
                            case models_1.GamePhase.PLAYING: {
                                emit(shared_1.startBattle());
                                return;
                            }
                            default:
                                return;
                        }
                    });
                    // todo registry off here
                    // tslint:disable-next-line:no-empty
                    return function () { };
                });
                return [4 /*yield*/, effects_1.takeEvery(channel, function (action) {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.put(action)];
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
exports.incomingGameNetworking = function (socket) {
    var registry;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                registry = new shared_1.IncomingPacketRegistry(function (opcode, handler) { return socket.on(opcode, handler); });
                return [4 /*yield*/, effects_1.fork(readPacketsToActions, registry, socket)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/game/sagas/networking/outgoing.ts":
/*!***********************************************!*\
  !*** ./src/game/sagas/networking/outgoing.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.outgoingGameNetworking = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var sendPlayerActions = function (registry) {
    var lastSentIndex, action, index;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lastSentIndex = 0;
                _a.label = 1;
            case 1:
                if (false) {}
                return [4 /*yield*/, effects_1.take(shared_1.PlayerActions.PlayerActionTypesArray)];
            case 2:
                action = _a.sent();
                index = ++lastSentIndex;
                registry.emit(shared_1.ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS, { index: index, actions: [action] });
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
};
var writeActionsToPackets = function (registry) {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = effects_1.all;
                _b = [effects_1.takeEvery(shared_1.BATTLE_FINISH_EVENT, function () {
                        return __generator(this, function (_a) {
                            registry.emit(shared_1.ClientToServerPacketOpcodes.FINISH_MATCH, { empty: true });
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
exports.outgoingGameNetworking = function (socket) {
    var registry;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                registry = new shared_1.OutgoingPacketRegistry(function (opcode, payload, ack) { return socket.emit(opcode, payload, ack); });
                return [4 /*yield*/, effects_1.fork(writeActionsToPackets, registry)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/game/sagas/networking/saga.ts":
/*!*******************************************!*\
  !*** ./src/game/sagas/networking/saga.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.gameNetworking = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var actions_1 = __webpack_require__(/*! ../../../ui/actions */ "./src/ui/actions.ts");
var incoming_1 = __webpack_require__(/*! ./incoming */ "./src/game/sagas/networking/incoming.ts");
var outgoing_1 = __webpack_require__(/*! ./outgoing */ "./src/game/sagas/networking/outgoing.ts");
exports.gameNetworking = function (socket) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.put(actions_1.updateConnectionStatus(shared_1.ConnectionStatus.CONNECTED))];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(outgoing_1.outgoingGameNetworking, socket)];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(incoming_1.incomingGameNetworking, socket)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/game/use-window-size.ts":
/*!*************************************!*\
  !*** ./src/game/use-window-size.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.useWindowSize = void 0;
var react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
exports.useWindowSize = function () {
    var _a = __read(react_1.useState(window.innerWidth), 2), width = _a[0], setWidth = _a[1];
    var _b = __read(react_1.useState(window.innerHeight), 2), height = _b[0], setHeight = _b[1];
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

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
__webpack_require__(/*! pepjs */ "./node_modules/pepjs/dist/pep.js");
__webpack_require__(/*! ./ui/display/style/index.scss */ "./src/ui/display/style/index.scss");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
var store_1 = __webpack_require__(/*! ./store/store */ "./src/store/store.ts");
var app_1 = __webpack_require__(/*! ./app */ "./src/app.tsx");
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(app_1.App, null))), document.getElementById("approot"));


/***/ }),

/***/ "./src/lobby/index.ts":
/*!****************************!*\
  !*** ./src/lobby/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var store_1 = __webpack_require__(/*! ./store */ "./src/lobby/store/index.ts");
__createBinding(exports, store_1, "reducer", "lobbyReducer");
var lobbyPage_1 = __webpack_require__(/*! ./lobbyPage */ "./src/lobby/lobbyPage.tsx");
__createBinding(exports, lobbyPage_1, "LobbyPage");


/***/ }),

/***/ "./src/lobby/lobbyPage.tsx":
/*!*********************************!*\
  !*** ./src/lobby/lobbyPage.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.LobbyPage = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var countdown_1 = __webpack_require__(/*! ../ui/display/countdown */ "./src/ui/display/countdown.tsx");
var footer_1 = __webpack_require__(/*! ../ui/display/footer */ "./src/ui/display/footer.tsx");
var padNumberToTwo = function (val) { return val < 10 ? "0" + val : val.toString(); };
var countdownRender = function (totalSecondsRemaining) {
    var minutesRemaining = Math.floor(totalSecondsRemaining / 60);
    var secondsRemaining = Math.ceil(totalSecondsRemaining % 60);
    var time = minutesRemaining + ":" + padNumberToTwo(secondsRemaining);
    return (React.createElement("div", { className: "timeRemaining" },
        "Game starting in ",
        React.createElement("span", { className: "time" }, time)));
};
var LobbyPage = function () {
    var lobbyId = react_redux_1.useSelector(function (state) { return state.lobby.lobbyId; });
    if (lobbyId === null) {
        return React.createElement("div", null, "An error occured, please refresh your page");
    }
    var players = react_redux_1.useSelector(function (state) { return state.lobby.players; });
    var lobbyStartingAtMs = react_redux_1.useSelector(function (state) { return state.lobby.startingAtMs; });
    return (React.createElement("div", { className: "lobby" },
        React.createElement("div", { className: "lobby-info" },
            React.createElement("div", { className: "players" }, players.map(function (p) { return (React.createElement("div", { key: p.id, className: "player" + (p.isBot ? " bot" : "") },
                React.createElement("span", null, p.name))); })),
            React.createElement("div", { className: "text" },
                lobbyStartingAtMs
                    && (React.createElement(countdown_1.Countdown, { countdownToSeconds: lobbyStartingAtMs / 1000, render: countdownRender })),
                React.createElement("h2", { className: "lobby-id" },
                    "Lobby ID: ",
                    lobbyId),
                React.createElement("p", null,
                    "The game will start ",
                    models_1.LOBBY_WAIT_TIME,
                    " seconds after the lobby is created, or immediately when there are ",
                    models_1.MAX_PLAYERS_IN_GAME,
                    " players"))),
        React.createElement(footer_1.Footer, null)));
};
exports.LobbyPage = LobbyPage;


/***/ }),

/***/ "./src/lobby/networking.ts":
/*!*********************************!*\
  !*** ./src/lobby/networking.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.lobbyNetworking = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var actions_1 = __webpack_require__(/*! ./store/actions */ "./src/lobby/store/actions.ts");
var game_1 = __webpack_require__(/*! ../game */ "./src/game/index.ts");
var readPacketsToActions = function (registry) {
    var channel, action;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, , 5, 7]);
                channel = redux_saga_1.eventChannel(function (emit) {
                    registry.on(shared_1.ServerToClientLobbyPacketOpcodes.LOBBY_PLAYER_UPDATE, function (_a) {
                        var index = _a.index, player = _a.player;
                        emit(actions_1.updateLobbyPlayerAction(index, player));
                    });
                    registry.on(shared_1.ServerToClientLobbyPacketOpcodes.LOBBY_GAME_STARTED, function () {
                        emit(actions_1.lobbyGameStartedEvent());
                    });
                    // tslint:disable-next-line:no-empty
                    return function () {
                        // todo registry.off or registry.close
                    };
                });
                _a.label = 1;
            case 1:
                if (false) {}
                return [4 /*yield*/, effects_1.take(channel)];
            case 2:
                action = _a.sent();
                return [4 /*yield*/, effects_1.put(action)];
            case 3:
                _a.sent();
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, effects_1.cancelled()];
            case 6:
                if (_a.sent()) {
                    channel.close();
                }
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
};
exports.lobbyNetworking = function (socket) {
    var registry, readPacketsTask, playerId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                registry = new shared_1.IncomingPacketRegistry(function (opcode, handler) { return socket.on(opcode, handler); });
                return [4 /*yield*/, effects_1.fork(readPacketsToActions, registry)];
            case 1:
                readPacketsTask = _a.sent();
                return [4 /*yield*/, effects_1.take(actions_1.LOBBY_GAME_STARTED_EVENT)];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.cancel(readPacketsTask)];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.select(function (state) { return state.auth.user.id; })];
            case 4:
                playerId = _a.sent();
                return [4 /*yield*/, effects_1.fork(game_1.gameSaga, playerId, socket)];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/lobby/store/actions.ts":
/*!************************************!*\
  !*** ./src/lobby/store/actions.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.updateLobbyPlayerAction = exports.lobbyGameStartedEvent = exports.gameConnectedEvent = exports.joinLobbyAction = exports.UPDATE_LOBBY_PLAYER = exports.LOBBY_GAME_STARTED_EVENT = exports.GAME_CONNECTED = exports.JOIN_LOBBY = void 0;
exports.JOIN_LOBBY = "JOIN_LOBBY";
exports.GAME_CONNECTED = "GAME_CONNECTED";
exports.LOBBY_GAME_STARTED_EVENT = "LOBBY_GAME_STARTED_EVENT";
exports.UPDATE_LOBBY_PLAYER = "UPDATE_LOBBY_PLAYER";
// todo rename this to lobbyConnected (to match gameConnected)
exports.joinLobbyAction = function (localPlayerId, lobbyId, players, startTimestamp) { return ({
    type: exports.JOIN_LOBBY,
    payload: {
        localPlayerId: localPlayerId,
        lobbyId: lobbyId,
        players: players,
        startTimestamp: startTimestamp
    }
}); };
exports.gameConnectedEvent = function (payload) { return ({ type: exports.GAME_CONNECTED, payload: payload }); };
exports.lobbyGameStartedEvent = function () { return ({ type: exports.LOBBY_GAME_STARTED_EVENT }); };
exports.updateLobbyPlayerAction = function (index, player) { return ({
    type: exports.UPDATE_LOBBY_PLAYER,
    payload: {
        index: index,
        player: player
    }
}); };


/***/ }),

/***/ "./src/lobby/store/index.ts":
/*!**********************************!*\
  !*** ./src/lobby/store/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var reducer_1 = __webpack_require__(/*! ./reducer */ "./src/lobby/store/reducer.ts");
__createBinding(exports, reducer_1, "reducer");


/***/ }),

/***/ "./src/lobby/store/reducer.ts":
/*!************************************!*\
  !*** ./src/lobby/store/reducer.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.reducer = void 0;
var actions_1 = __webpack_require__(/*! ./actions */ "./src/lobby/store/actions.ts");
var initialState = {
    lobbyId: null,
    localPlayerId: null,
    players: [],
    startingAtMs: null
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_1.JOIN_LOBBY:
            return __assign(__assign({}, state), { lobbyId: action.payload.lobbyId, localPlayerId: action.payload.localPlayerId, players: action.payload.players, startingAtMs: action.payload.startTimestamp });
        case actions_1.UPDATE_LOBBY_PLAYER:
            var cloned = __assign(__assign({}, state), { players: __spread(state.players) });
            cloned.players[action.payload.index] = action.payload.player;
            return cloned;
        default:
            return state;
    }
}
exports.reducer = reducer;


/***/ }),

/***/ "./src/menu/findGame.ts":
/*!******************************!*\
  !*** ./src/menu/findGame.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.findGame = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var auth_1 = __webpack_require__(/*! ../auth */ "./src/auth/index.ts");
var networking_1 = __webpack_require__(/*! ../lobby/networking */ "./src/lobby/networking.ts");
var actions_1 = __webpack_require__(/*! ../lobby/store/actions */ "./src/lobby/store/actions.ts");
var actions_2 = __webpack_require__(/*! ../ui/actions */ "./src/ui/actions.ts");
var socket_1 = __webpack_require__(/*! ../ui/socket */ "./src/ui/socket.ts");
var game_1 = __webpack_require__(/*! ../game */ "./src/game/index.ts");
var playerListActions_1 = __webpack_require__(/*! ../game/features/playerList/playerListActions */ "./src/game/features/playerList/playerListActions.ts");
exports.findGame = function () {
    var findGameAction, state, idToken, socket, registry, channel, _a, lobby, game, playerId, _b, board, bench, players, battleTurn, _c, phase, phaseStartedAtSeconds, _d, money, cards, level, xp;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, effects_1.take(actions_2.FIND_GAME)];
            case 1:
                findGameAction = _e.sent();
                return [4 /*yield*/, effects_1.select()];
            case 2:
                state = _e.sent();
                // this should never happen, but it doesn't hurt to be safe
                if (!auth_1.AuthSelectors.isLoggedIn(state)) {
                    auth_1.signIn();
                    return [2 /*return*/];
                }
                idToken = auth_1.AuthSelectors.getIdToken(state);
                return [4 /*yield*/, effects_1.call(socket_1.getSocket, findGameAction.payload.serverIP, idToken)];
            case 3:
                socket = _e.sent();
                registry = new shared_1.IncomingPacketRegistry(function (opcode, handler) { return socket.on(opcode, handler); });
                channel = redux_saga_1.eventChannel(function (emit) {
                    registry.on(shared_1.ServerToClientMenuPacketOpcodes.LOBBY_CONNECTED, function (_a) {
                        var playerId = _a.playerId, lobbyId = _a.lobbyId, players = _a.players, startTimestamp = _a.startTimestamp;
                        emit(actions_1.joinLobbyAction(playerId, lobbyId, players, startTimestamp));
                    });
                    registry.on(shared_1.ServerToClientMenuPacketOpcodes.GAME_CONNECTED, function (payload) {
                        emit(actions_1.gameConnectedEvent(payload));
                    });
                    // todo registry.off
                    // tslint:disable-next-line:no-empty
                    return function () { };
                });
                return [4 /*yield*/, effects_1.takeEvery(channel, function (action) {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.put(action)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    })];
            case 4:
                _e.sent();
                return [4 /*yield*/, effects_1.race({
                        lobby: effects_1.take(actions_1.JOIN_LOBBY),
                        game: effects_1.take(actions_1.GAME_CONNECTED)
                    })];
            case 5:
                _a = _e.sent(), lobby = _a.lobby, game = _a.game;
                channel.close();
                if (!lobby) return [3 /*break*/, 7];
                return [4 /*yield*/, effects_1.fork(networking_1.lobbyNetworking, socket)];
            case 6:
                _e.sent();
                return [3 /*break*/, 18];
            case 7:
                if (!game) return [3 /*break*/, 18];
                return [4 /*yield*/, effects_1.select(function (s) { return s.auth.user.id; })];
            case 8:
                playerId = _e.sent();
                return [4 /*yield*/, effects_1.fork(game_1.gameSaga, playerId, socket)];
            case 9:
                _e.sent();
                _b = game.payload, board = _b.board, bench = _b.bench, players = _b.players, battleTurn = _b.battleTurn, _c = _b.game, phase = _c.phase, phaseStartedAtSeconds = _c.phaseStartedAtSeconds, _d = _b.playerInfo, money = _d.money, cards = _d.cards, level = _d.level, xp = _d.xp;
                return [4 /*yield*/, effects_1.put(shared_1.BoardCommands.initialiseBoard(board.pieces))];
            case 10:
                _e.sent();
                return [4 /*yield*/, effects_1.put(shared_1.BenchCommands.initialiseBenchCommand(bench))];
            case 11:
                _e.sent();
                return [4 /*yield*/, effects_1.put(shared_1.PlayerInfoCommands.updateMoneyCommand(money))];
            case 12:
                _e.sent();
                return [4 /*yield*/, effects_1.put(shared_1.PlayerInfoCommands.updateCardsCommand(cards))];
            case 13:
                _e.sent();
                return [4 /*yield*/, effects_1.put(shared_1.PlayerInfoCommands.updateLevelCommand(level, xp))];
            case 14:
                _e.sent();
                return [4 /*yield*/, effects_1.put(playerListActions_1.playerListUpdated(players))];
            case 15:
                _e.sent();
                return [4 /*yield*/, effects_1.put(shared_1.GameEvents.gamePhaseStartedEvent(phase, phaseStartedAtSeconds))];
            case 16:
                _e.sent();
                if (!(battleTurn !== null)) return [3 /*break*/, 18];
                return [4 /*yield*/, effects_1.put(shared_1.startBattle(battleTurn))];
            case 17:
                _e.sent();
                _e.label = 18;
            case 18: return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/menu/get-url-parameter.ts":
/*!***************************************!*\
  !*** ./src/menu/get-url-parameter.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getUrlParameter = void 0;
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

/***/ "./src/menu/index.ts":
/*!***************************!*\
  !*** ./src/menu/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var menuPage_1 = __webpack_require__(/*! ./menuPage */ "./src/menu/menuPage.tsx");
__createBinding(exports, menuPage_1, "MenuPage");


/***/ }),

/***/ "./src/menu/leaderboard.tsx":
/*!**********************************!*\
  !*** ./src/menu/leaderboard.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Leaderboard = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var use_http_1 = __webpack_require__(/*! use-http */ "./node_modules/use-http/dist/esm/index.js");
var config_1 = __webpack_require__(/*! ../auth/config */ "./src/auth/config.ts");
var LeaderboardContents = function (_a) {
    var data = _a.data;
    return (React.createElement(React.Fragment, null,
        React.createElement("table", { className: "leaderboard" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("td", null, "Player"),
                    React.createElement("td", null, "Wins"))),
            React.createElement("tbody", null, data.map(function (_a, index) {
                var wins = _a.wins, name = _a.name;
                return (React.createElement("tr", { key: index + "-" + name },
                    React.createElement("td", null, name),
                    React.createElement("td", null, wins)));
            }))),
        React.createElement("div", { className: "wipe-warning" },
            React.createElement("p", null, "Thanks so much for playing! I hope you're enjoying the game"),
            React.createElement("p", null, "Please don't get too attached to these scores for now"),
            React.createElement("p", null, "The user accounts will be wiped during development"))));
};
var Leaderboard = function () {
    var _a = use_http_1["default"](config_1.LEADERBOARD_ENDPOINT, {}, []), loading = _a.loading, error = _a.error, _b = _a.data, data = _b === void 0 ? [] : _b;
    return (React.createElement("div", { className: "segment" },
        React.createElement("div", { className: "header" }, "Leaderboard"),
        React.createElement("div", { className: "content" },
            loading
                && React.createElement("span", null, "Loading"),
            !loading
                && React.createElement(LeaderboardContents, { data: data }))));
};
exports.Leaderboard = Leaderboard;


/***/ }),

/***/ "./src/menu/menuPage.tsx":
/*!*******************************!*\
  !*** ./src/menu/menuPage.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.MenuPage = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var get_url_parameter_1 = __webpack_require__(/*! ./get-url-parameter */ "./src/menu/get-url-parameter.ts");
var auth0_1 = __webpack_require__(/*! ../auth/auth0 */ "./src/auth/auth0.ts");
var footer_1 = __webpack_require__(/*! ../ui/display/footer */ "./src/ui/display/footer.tsx");
var leaderboard_1 = __webpack_require__(/*! ./leaderboard */ "./src/menu/leaderboard.tsx");
var actions_1 = __webpack_require__(/*! ../ui/actions */ "./src/ui/actions.ts");
var loading_1 = __webpack_require__(/*! ../ui/display/loading */ "./src/ui/display/loading.tsx");
var config_1 = __webpack_require__(/*! ../auth/config */ "./src/auth/config.ts");
var Navbar = function () {
    return (React.createElement("nav", { className: "navbar" },
        React.createElement("button", { className: "sign-out", onClick: auth0_1.signOut }, "Log Out")));
};
var MenuPageUnconnected = /** @class */ (function (_super) {
    __extends(MenuPageUnconnected, _super);
    function MenuPageUnconnected() {
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
    MenuPageUnconnected.prototype.componentDidMount = function () {
        var serverParam = get_url_parameter_1.getUrlParameter("server");
        this.setState({
            serverIP: serverParam || config_1.GAME_SERVER_URL
        });
    };
    MenuPageUnconnected.prototype.render = function () {
        var title = this.state.debugModeClickCount === 3
            ? React.createElement("h2", { className: "title" },
                "Creature Chess ",
                React.createElement("span", { className: "debug-mode" }, "(Debug Mode)"))
            : React.createElement("h2", { className: "title", onClick: this.onTitleClick }, "Creature Chess");
        if (this.props.loading) {
            return React.createElement(loading_1.Loading, null);
        }
        return (React.createElement("div", { className: "menu" },
            React.createElement(Navbar, null),
            React.createElement("div", { className: "join-game" },
                title,
                React.createElement("div", { className: "blurb" },
                    React.createElement("p", null, "More fun with friends! Press \"Find Game\" at the same time to play together")),
                React.createElement("button", { onClick: this.onFindGameClick, className: "find-game" }, "Find Game"),
                React.createElement("div", { className: "blurb" },
                    React.createElement("p", null, "Join us on Discord to receive notifications when someone starts a lobby, and more!")),
                React.createElement("a", { href: "https://discord.gg/FhMm6saehb" },
                    React.createElement("img", { src: "https://i.imgur.com/YNyTNuw.png", className: "discord-button" })),
                React.createElement("div", { className: "blurb" },
                    React.createElement("p", null,
                        "This is a ",
                        React.createElement("span", { className: "highlight" }, "multiplayer strategy game"),
                        " in which you configure creatures on a board."),
                    React.createElement("p", null, "Each round, your board is matched against an opponent's board. Defeat all their pieces to win the round."),
                    React.createElement("p", null, "Every loss decreases your health bar. When your health reaches zero, you're out!"),
                    React.createElement("p", null, "Players will battle against eachother until only one player remains."),
                    React.createElement("p", null,
                        "Good luck! ",
                        React.createElement("span", { className: "highlight" }, "~ jkm"))),
                this.props.error
                    && React.createElement("div", { className: "error" },
                        React.createElement("p", null, this.props.error)),
                this.state.debugModeClickCount === 3
                    && (React.createElement("input", { value: this.state.serverIP, onChange: this.onServerIPChange, placeholder: "Server IP" }))),
            React.createElement(leaderboard_1.Leaderboard, null),
            React.createElement(footer_1.Footer, null)));
    };
    return MenuPageUnconnected;
}(React.Component));
var mapStateToProps = function (state) { return ({
    loading: state.ui.loading,
    error: state.ui.menuError
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onFindGame: function (serverIP) { return dispatch(actions_1.findGameAction(serverIP)); },
    enableDebugMode: function () { return dispatch(actions_1.enableDebugMode()); },
    setError: function (error) { return dispatch(actions_1.joinGameError(error)); }
}); };
var MenuPage = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MenuPageUnconnected);
exports.MenuPage = MenuPage;


/***/ }),

/***/ "./src/store/pieceSelectors.ts":
/*!*************************************!*\
  !*** ./src/store/pieceSelectors.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ownedPieceSelector = exports.boardTilePieceSelector = exports.benchTilePieceSelector = void 0;
var reselect_1 = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");
var selectors_1 = __webpack_require__(/*! ../auth/store/selectors */ "./src/auth/store/selectors.ts");
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
    var playerId = selectors_1.getUserId(state);
    return Object.values(state.board.pieces).filter(function (p) { return p.ownerId === playerId; });
};


/***/ }),

/***/ "./src/store/playerSelectors.ts":
/*!**************************************!*\
  !*** ./src/store/playerSelectors.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getPlayerById = exports.getPlayers = void 0;
var reselect_1 = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");
exports.getPlayers = function (state) { return state.playerList; };
exports.getPlayerById = function (id) {
    return reselect_1.createSelector(exports.getPlayers, function (players) { return players.find(function (p) { return p.id === id; }) || null; });
};


/***/ }),

/***/ "./src/store/reducers.ts":
/*!*******************************!*\
  !*** ./src/store/reducers.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.reducers = void 0;
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var playerListReducer_1 = __webpack_require__(/*! ../game/features/playerList/playerListReducer */ "./src/game/features/playerList/playerListReducer.ts");
var auth_1 = __webpack_require__(/*! ../auth */ "./src/auth/index.ts");
var lobby_1 = __webpack_require__(/*! ../lobby */ "./src/lobby/index.ts");
var ui_1 = __webpack_require__(/*! ../ui */ "./src/ui/index.ts");
exports.reducers = {
    board: shared_1.boardReducer,
    bench: shared_1.benchReducer,
    lobby: lobby_1.lobbyReducer,
    playerList: playerListReducer_1.playerList,
    playerInfo: shared_1.playerInfoReducer,
    game: shared_1.gameReducer,
    auth: auth_1.authReducer,
    ui: ui_1.uiReducer
};


/***/ }),

/***/ "./src/store/saga.ts":
/*!***************************!*\
  !*** ./src/store/saga.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.rootSaga = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var auth_1 = __webpack_require__(/*! ../auth */ "./src/auth/index.ts");
var findGame_1 = __webpack_require__(/*! ../menu/findGame */ "./src/menu/findGame.ts");
exports.rootSaga = function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = effects_1.all;
                return [4 /*yield*/, effects_1.fork(auth_1.authSaga)];
            case 1:
                _b = [
                    _c.sent()
                ];
                return [4 /*yield*/, effects_1.fork(findGame_1.findGame)];
            case 2: return [4 /*yield*/, _a.apply(void 0, [_b.concat([
                        _c.sent()
                    ])])];
            case 3:
                _c.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/store/store.ts":
/*!****************************!*\
  !*** ./src/store/store.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.store = void 0;
var redux_1 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
var reducers_1 = __webpack_require__(/*! ./reducers */ "./src/store/reducers.ts");
var redux_devtools_extension_1 = __webpack_require__(/*! redux-devtools-extension */ "./node_modules/redux-devtools-extension/index.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var saga_1 = __webpack_require__(/*! ./saga */ "./src/store/saga.ts");
var sagaMiddleware = redux_saga_1["default"]();
var store = redux_1.createStore(redux_1.combineReducers(__assign({}, reducers_1.reducers)), redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(sagaMiddleware)));
exports.store = store;
sagaMiddleware.run(saga_1.rootSaga);


/***/ }),

/***/ "./src/ui/actions.ts":
/*!***************************!*\
  !*** ./src/ui/actions.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.playersResurrected = exports.finishGameAction = exports.updateConnectionStatus = exports.enableDebugMode = exports.clearAnnouncement = exports.updateAnnouncement = exports.closeOverlay = exports.openOverlay = exports.joinGameError = exports.findGameAction = exports.PLAYERS_RESURRECTED = exports.FINISH_GAME = exports.JOIN_ERROR = exports.UPDATE_CONNECTION_STATUS = exports.ENABLE_DEBUG_MODE = exports.CLEAR_ANNOUNCEMENT = exports.UPDATE_ANNOUNCEMENT = exports.CLOSE_OVERLAY = exports.OPEN_OVERLAY = exports.FIND_GAME = void 0;
exports.FIND_GAME = "FIND_GAME";
exports.OPEN_OVERLAY = "OPEN_OVERLAY";
exports.CLOSE_OVERLAY = "CLOSE_OVERLAY";
exports.UPDATE_ANNOUNCEMENT = "UPDATE_ANNOUNCEMENT";
exports.CLEAR_ANNOUNCEMENT = "CLEAR_ANNOUNCEMENT";
exports.ENABLE_DEBUG_MODE = "ENABLE_DEBUG_MODE";
exports.UPDATE_CONNECTION_STATUS = "UPDATE_CONNECTION_STATUS";
exports.JOIN_ERROR = "JOIN_ERROR";
exports.FINISH_GAME = "FINISH_GAME";
exports.PLAYERS_RESURRECTED = "PLAYERS_RESURRECTED";
exports.findGameAction = function (serverIP) { return ({
    type: exports.FIND_GAME,
    payload: {
        serverIP: serverIP
    }
}); };
exports.joinGameError = function (error) { return ({
    type: exports.JOIN_ERROR,
    payload: {
        error: error
    }
}); };
exports.openOverlay = function (overlay) { return ({
    type: exports.OPEN_OVERLAY,
    payload: {
        overlay: overlay
    }
}); };
exports.closeOverlay = function () { return ({ type: exports.CLOSE_OVERLAY }); };
exports.updateAnnouncement = function (main, sub) { return ({
    type: exports.UPDATE_ANNOUNCEMENT,
    payload: {
        main: main, sub: sub
    }
}); };
exports.clearAnnouncement = function () { return ({ type: exports.CLEAR_ANNOUNCEMENT }); };
exports.enableDebugMode = function () { return ({ type: exports.ENABLE_DEBUG_MODE }); };
exports.updateConnectionStatus = function (status) { return ({
    type: exports.UPDATE_CONNECTION_STATUS,
    payload: {
        status: status
    }
}); };
exports.finishGameAction = function (winnerName) { return ({
    type: exports.FINISH_GAME,
    payload: {
        winnerName: winnerName
    }
}); };
exports.playersResurrected = function (playerIds) { return ({
    type: exports.PLAYERS_RESURRECTED,
    payload: {
        playerIds: playerIds
    }
}); };


/***/ }),

/***/ "./src/ui/display/animation.ts":
/*!*************************************!*\
  !*** ./src/ui/display/animation.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.getAnimationCssVariables = void 0;
exports.getAnimationCssVariables = function (animations) {
    var variables = Object.assign.apply(Object, __spread([{}], animations.filter(function (a) { return a.variables; }).map(function (a) { return a.variables; })));
    return Object.assign.apply(Object, __spread([{}], Object.keys(variables).map(function (key) {
        var _a;
        return (_a = {}, _a["--" + key] = variables[key], _a);
    })));
};


/***/ }),

/***/ "./src/ui/display/countdown.tsx":
/*!**************************************!*\
  !*** ./src/ui/display/countdown.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.Countdown = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var Countdown = function (_a) {
    var countdownToSeconds = _a.countdownToSeconds, render = _a.render;
    var _b = __read(React.useState(null), 2), secondsRemaining = _b[0], setSecondsRemaining = _b[1];
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

/***/ "./src/ui/display/creatureImage.tsx":
/*!******************************************!*\
  !*** ./src/ui/display/creatureImage.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.CreatureImage = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var CreatureImage = function (_a) {
    var facing = _a.facing, definitionId = _a.definitionId;
    return (React.createElement("img", { className: "image", src: "images/" + (facing || "front") + "/" + definitionId + ".png" }));
};
exports.CreatureImage = CreatureImage;


/***/ }),

/***/ "./src/ui/display/footer.tsx":
/*!***********************************!*\
  !*** ./src/ui/display/footer.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Footer = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
exports.Footer = function () {
    return (React.createElement("div", { className: "footer" },
        React.createElement("span", null,
            "v",
            "0.2.11"),
        " - ",
        React.createElement("a", { href: "https://reddit.com/r/creaturechess/" }, "/r/CreatureChess"),
        " - ",
        React.createElement("a", { href: "http://creaturechess.jamesmonger.com/privacy" }, "Privacy Policy"),
        " - ",
        React.createElement("a", { href: "https://github.com/Jameskmonger/creature-chess" }, "Licenses on GitHub")));
};


/***/ }),

/***/ "./src/ui/display/index.ts":
/*!*********************************!*\
  !*** ./src/ui/display/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var creatureImage_1 = __webpack_require__(/*! ./creatureImage */ "./src/ui/display/creatureImage.tsx");
__createBinding(exports, creatureImage_1, "CreatureImage");
var progressBar_1 = __webpack_require__(/*! ./progressBar */ "./src/ui/display/progressBar.tsx");
__createBinding(exports, progressBar_1, "ProgressBar");


/***/ }),

/***/ "./src/ui/display/loading.tsx":
/*!************************************!*\
  !*** ./src/ui/display/loading.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Loading = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var Loading = function () {
    return (React.createElement("div", { className: "loading-full" },
        React.createElement("h1", null, "Loading..."),
        React.createElement("p", null, "This can sometimes take up to 30 secs")));
};
exports.Loading = Loading;


/***/ }),

/***/ "./src/ui/display/progressBar.tsx":
/*!****************************************!*\
  !*** ./src/ui/display/progressBar.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ProgressBar = void 0;
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

/***/ "./src/ui/display/projectile.tsx":
/*!***************************************!*\
  !*** ./src/ui/display/projectile.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Projectile = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var Projectile = function () { return (React.createElement("svg", { className: "projectile", height: "12", width: "12" },
    React.createElement("circle", { cx: "6", cy: "6", r: "4", stroke: "#FAD17D", strokeWidth: "2", fill: "#F5E687" }))); };
exports.Projectile = Projectile;


/***/ }),

/***/ "./src/ui/display/style/index.scss":
/*!*****************************************!*\
  !*** ./src/ui/display/style/index.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/ui/index.ts":
/*!*************************!*\
  !*** ./src/ui/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var reducer_1 = __webpack_require__(/*! ./reducer */ "./src/ui/reducer.ts");
__createBinding(exports, reducer_1, "reducer", "uiReducer");


/***/ }),

/***/ "./src/ui/overlay.ts":
/*!***************************!*\
  !*** ./src/ui/overlay.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Overlay = void 0;
var Overlay;
(function (Overlay) {
    Overlay[Overlay["PLAYERS"] = 0] = "PLAYERS";
    Overlay[Overlay["SHOP"] = 1] = "SHOP";
    Overlay[Overlay["HELP"] = 2] = "HELP";
    Overlay[Overlay["SETTINGS"] = 3] = "SETTINGS";
})(Overlay = exports.Overlay || (exports.Overlay = {}));


/***/ }),

/***/ "./src/ui/reducer.ts":
/*!***************************!*\
  !*** ./src/ui/reducer.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.reducer = void 0;
var actions_1 = __webpack_require__(/*! ./actions */ "./src/ui/actions.ts");
var actions_2 = __webpack_require__(/*! ../game/features/board/actions */ "./src/game/features/board/actions.ts");
var shared_1 = __webpack_require__(/*! @creature-chess/shared */ "../shared/lib/index.js");
var initialState = {
    loading: false,
    currentOverlay: null,
    selectedPieceId: null,
    winnerName: null,
    mainAnnouncement: null,
    subAnnouncement: null,
    menuError: null,
    debug: false,
    connectionStatus: shared_1.ConnectionStatus.NOT_CONNECTED
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_1.FIND_GAME:
            return __assign(__assign({}, state), { loading: true });
        case actions_1.UPDATE_CONNECTION_STATUS:
            return __assign(__assign({}, state), { connectionStatus: action.payload.status });
        case actions_1.ENABLE_DEBUG_MODE: {
            return __assign(__assign({}, state), { debug: true });
        }
        case actions_1.OPEN_OVERLAY: {
            return __assign(__assign({}, state), { currentOverlay: action.payload.overlay });
        }
        case actions_1.CLOSE_OVERLAY: {
            return __assign(__assign({}, state), { currentOverlay: null });
        }
        case actions_2.SELECT_PIECE: {
            var isSamePiece = state.selectedPieceId && state.selectedPieceId === action.payload.id;
            return __assign(__assign({}, state), { selectedPieceId: isSamePiece ? null : action.payload.id });
        }
        case actions_2.CLEAR_SELECTED_PIECE: {
            return __assign(__assign({}, state), { selectedPieceId: null });
        }
        case actions_1.FINISH_GAME: {
            return __assign(__assign({}, state), { winnerName: action.payload.winnerName });
        }
        case actions_1.UPDATE_ANNOUNCEMENT: {
            return __assign(__assign({}, state), { mainAnnouncement: action.payload.main, subAnnouncement: action.payload.sub });
        }
        case actions_1.CLEAR_ANNOUNCEMENT: {
            return __assign(__assign({}, state), { mainAnnouncement: null, subAnnouncement: null });
        }
        case actions_1.JOIN_ERROR:
            return __assign(__assign({}, state), { loading: false, menuError: action.payload.error });
        case shared_1.GameEvents.GAME_PHASE_STARTED_EVENT:
            return __assign(__assign({}, state), { loading: false, menuError: null });
        default:
            return state;
    }
}
exports.reducer = reducer;


/***/ }),

/***/ "./src/ui/socket.ts":
/*!**************************!*\
  !*** ./src/ui/socket.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getSocket = void 0;
var io = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
var auth_1 = __webpack_require__(/*! ../auth */ "./src/auth/index.ts");
exports.getSocket = function (serverIP, idToken) {
    // force to websocket for now until CORS is sorted
    var socket = io(serverIP, {
        transports: ["websocket", "xhr-polling"],
        reconnectionAttempts: 15,
        reconnectionDelay: 100,
        reconnectionDelayMax: 1000
    });
    return new Promise(function (resolve, reject) {
        socket.on("connect", function () {
            socket.emit("authenticate", { idToken: idToken });
        });
        var onAuthenticated = function (_a) {
            var error = _a.error;
            if (!error) {
                socket.off("authenticate_response", onAuthenticated);
                resolve(socket);
                return;
            }
            socket.disconnect();
            // todo improve this
            auth_1.signIn();
        };
        socket.on("authenticate_response", onAuthenticated);
    });
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