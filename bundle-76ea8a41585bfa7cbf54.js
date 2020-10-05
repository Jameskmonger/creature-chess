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

/***/ "../models/src/constants.ts":
/*!**********************************!*\
  !*** ../models/src/constants.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
exports.__esModule = true;
exports.LOBBY_WAIT_TIME = exports.MAX_PLAYERS_IN_GAME = exports.MAX_NAME_LENGTH = exports.DAMAGE_RATIO = exports.DEFAULT_TURN_DURATION = exports.DEFAULT_TURN_COUNT = exports.PIECES_TO_EVOLVE = exports.BUY_XP_AMOUNT = exports.BUY_XP_COST = exports.MAX_PLAYER_LEVEL = exports.RESURRECT_HEALTH = exports.STARTING_HEALTH = exports.STARTING_LEVEL = exports.STARTING_MONEY = exports.REROLL_COST = exports.PHASE_LENGTHS = exports.GRID_SIZE = void 0;
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "../models/src/game-phase.ts");
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

/***/ "../models/src/creatureDefinition.ts":
/*!*******************************************!*\
  !*** ../models/src/creatureDefinition.ts ***!
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

/***/ "../models/src/creatureType.ts":
/*!*************************************!*\
  !*** ../models/src/creatureType.ts ***!
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

/***/ "../models/src/game-phase.ts":
/*!***********************************!*\
  !*** ../models/src/game-phase.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.GamePhase = void 0;
var GamePhase;
(function (GamePhase) {
    GamePhase[GamePhase["WAITING"] = 0] = "WAITING";
    GamePhase[GamePhase["PREPARING"] = 1] = "PREPARING";
    GamePhase[GamePhase["READY"] = 2] = "READY";
    GamePhase[GamePhase["PLAYING"] = 3] = "PLAYING";
    GamePhase[GamePhase["DEAD"] = 4] = "DEAD";
})(GamePhase = exports.GamePhase || (exports.GamePhase = {}));


/***/ }),

/***/ "../models/src/index.ts":
/*!******************************!*\
  !*** ../models/src/index.ts ***!
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
exports.Constants = void 0;
var player_list_player_1 = __webpack_require__(/*! ./player-list-player */ "../models/src/player-list-player.ts");
__createBinding(exports, player_list_player_1, "PlayerStatus");
var streakType_1 = __webpack_require__(/*! ./streakType */ "../models/src/streakType.ts");
__createBinding(exports, streakType_1, "StreakType");
var Constants = __webpack_require__(/*! ./constants */ "../models/src/constants.ts");
exports.Constants = Constants;
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "../models/src/game-phase.ts");
__createBinding(exports, game_phase_1, "GamePhase");


/***/ }),

/***/ "../models/src/player-list-player.ts":
/*!*******************************************!*\
  !*** ../models/src/player-list-player.ts ***!
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

/***/ "../models/src/position.ts":
/*!*********************************!*\
  !*** ../models/src/position.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.inFriendlyBoard = exports.inBench = exports.TileStyle = exports.TileType = exports.getRelativeDirection = exports.getAdjacentPositions = exports.Directions = exports.getDistance = exports.subtract = exports.arePositionsEqual = exports.createTileCoordinates = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "../models/src/constants.ts");
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

/***/ "../models/src/streakType.ts":
/*!***********************************!*\
  !*** ../models/src/streakType.ts ***!
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

/***/ "../shared/board/actions/boardActionTypes.ts":
/*!***************************************************!*\
  !*** ../shared/board/actions/boardActionTypes.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.UNLOCK_BOARD = exports.LOCK_BOARD = exports.MOVE_BOARD_PIECE = exports.UPDATE_BOARD_PIECES = exports.UPDATE_BOARD_PIECE = exports.INITIALISE_BOARD = exports.ADD_BOARD_PIECE = exports.REMOVE_BOARD_PIECES = exports.REMOVE_BOARD_PIECE = void 0;
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

/***/ "../shared/board/actions/boardActions.ts":
/*!***********************************************!*\
  !*** ../shared/board/actions/boardActions.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.unlockBoard = exports.lockBoard = exports.moveBoardPiece = exports.updateBoardPieces = exports.updateBoardPiece = exports.removeBoardPieces = exports.removeBoardPiece = exports.addBoardPiece = exports.initialiseBoard = void 0;
var boardActionTypes_1 = __webpack_require__(/*! ./boardActionTypes */ "../shared/board/actions/boardActionTypes.ts");
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

/***/ "../shared/board/can-drop-piece.ts":
/*!*****************************************!*\
  !*** ../shared/board/can-drop-piece.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.canDropPiece = void 0;
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
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

/***/ "../shared/board/get-first-empty-bench-slot.ts":
/*!*****************************************************!*\
  !*** ../shared/board/get-first-empty-bench-slot.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getFirstEmptyBenchSlot = void 0;
exports.getFirstEmptyBenchSlot = function (bench) {
    return bench.findIndex(function (p) { return p === null; });
};


/***/ }),

/***/ "../shared/board/index.ts":
/*!********************************!*\
  !*** ../shared/board/index.ts ***!
  \********************************/
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
exports.BoardActionTypes = exports.BoardActions = void 0;
var can_drop_piece_1 = __webpack_require__(/*! ./can-drop-piece */ "../shared/board/can-drop-piece.ts");
__createBinding(exports, can_drop_piece_1, "canDropPiece");
var get_first_empty_bench_slot_1 = __webpack_require__(/*! ./get-first-empty-bench-slot */ "../shared/board/get-first-empty-bench-slot.ts");
__createBinding(exports, get_first_empty_bench_slot_1, "getFirstEmptyBenchSlot");
var BoardActions = __webpack_require__(/*! ./actions/boardActions */ "../shared/board/actions/boardActions.ts");
exports.BoardActions = BoardActions;
var BoardActionTypes = __webpack_require__(/*! ./actions/boardActionTypes */ "../shared/board/actions/boardActionTypes.ts");
exports.BoardActionTypes = BoardActionTypes;
var state_1 = __webpack_require__(/*! ./state */ "../shared/board/state.ts");
__createBinding(exports, state_1, "reducer", "boardReducer");


/***/ }),

/***/ "../shared/board/reducers/lockedReducer.ts":
/*!*************************************************!*\
  !*** ../shared/board/reducers/lockedReducer.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.locked = void 0;
var boardActionTypes_1 = __webpack_require__(/*! ../actions/boardActionTypes */ "../shared/board/actions/boardActionTypes.ts");
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

/***/ "../shared/board/reducers/piecePositionsReducer.ts":
/*!*********************************************************!*\
  !*** ../shared/board/reducers/piecePositionsReducer.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.piecePositions = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var boardActionTypes_1 = __webpack_require__(/*! ../actions/boardActionTypes */ "../shared/board/actions/boardActionTypes.ts");
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

/***/ "../shared/board/reducers/piecesReducer.ts":
/*!*************************************************!*\
  !*** ../shared/board/reducers/piecesReducer.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.pieces = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var boardActionTypes_1 = __webpack_require__(/*! ../actions/boardActionTypes */ "../shared/board/actions/boardActionTypes.ts");
var position_1 = __webpack_require__(/*! @creature-chess/models/src/position */ "../models/src/position.ts");
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

/***/ "../shared/board/state.ts":
/*!********************************!*\
  !*** ../shared/board/state.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.reducer = void 0;
var redux_1 = __webpack_require__(/*! redux */ "../../node_modules/redux/es/redux.js");
var piecesReducer_1 = __webpack_require__(/*! ./reducers/piecesReducer */ "../shared/board/reducers/piecesReducer.ts");
var piecePositionsReducer_1 = __webpack_require__(/*! ./reducers/piecePositionsReducer */ "../shared/board/reducers/piecePositionsReducer.ts");
var lockedReducer_1 = __webpack_require__(/*! ./reducers/lockedReducer */ "../shared/board/reducers/lockedReducer.ts");
var reducer = redux_1.combineReducers({
    pieces: piecesReducer_1.pieces,
    piecePositions: piecePositionsReducer_1.piecePositions,
    locked: lockedReducer_1.locked
});
exports.reducer = reducer;


/***/ }),

/***/ "../shared/game/definitionProvider.ts":
/*!********************************************!*\
  !*** ../shared/game/definitionProvider.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.DefinitionProvider = void 0;
var definitions_1 = __webpack_require__(/*! ./definitions/definitions */ "../shared/game/definitions/definitions.ts");
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

/***/ "../shared/game/definitions/definitionClass.ts":
/*!*****************************************************!*\
  !*** ../shared/game/definitions/definitionClass.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
exports.__esModule = true;
exports.getStages = exports.classBuilds = void 0;
var creatureDefinition_1 = __webpack_require__(/*! @creature-chess/models/src/creatureDefinition */ "../models/src/creatureDefinition.ts");
// each class has points to assign
// these are then used, along with piece cost and stage, to get stats
// the decimals here indicate how the points are assigned for each class
exports.classBuilds = (_a = {},
    _a[creatureDefinition_1.DefinitionClass.VALIANT] = {
        hp: 0.4,
        attack: 0.2,
        defense: 0.3,
        speed: 0.2
    },
    _a[creatureDefinition_1.DefinitionClass.ARCANE] = {
        hp: 0.2,
        attack: 0.4,
        defense: 0.2,
        speed: 0.3
    },
    _a[creatureDefinition_1.DefinitionClass.CUNNING] = {
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
    var attackType = (definitionClass === creatureDefinition_1.DefinitionClass.ARCANE
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

/***/ "../shared/game/definitions/definitions.ts":
/*!*************************************************!*\
  !*** ../shared/game/definitions/definitions.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.definitions = void 0;
var creatureType_1 = __webpack_require__(/*! @creature-chess/models/src/creatureType */ "../models/src/creatureType.ts");
var creatureDefinition_1 = __webpack_require__(/*! @creature-chess/models/src/creatureDefinition */ "../models/src/creatureDefinition.ts");
var definitionClass_1 = __webpack_require__(/*! ./definitionClass */ "../shared/game/definitions/definitionClass.ts");
var createDefinition = function (id, name, type, definitionClass, cost) { return ({
    id: id,
    name: name,
    type: type,
    "class": definitionClass,
    cost: cost,
    stages: definitionClass_1.getStages(definitionClass, cost)
}); };
exports.definitions = [
    createDefinition(1, "Budaye", creatureType_1.CreatureType.Wood, creatureDefinition_1.DefinitionClass.VALIANT, 1),
    createDefinition(2, "Anoleaf", creatureType_1.CreatureType.Wood, creatureDefinition_1.DefinitionClass.CUNNING, 1),
    createDefinition(3, "Rockitten", creatureType_1.CreatureType.Earth, creatureDefinition_1.DefinitionClass.VALIANT, 1),
    createDefinition(4, "Aardorn", creatureType_1.CreatureType.Earth, creatureDefinition_1.DefinitionClass.CUNNING, 1),
    createDefinition(5, "Nut", creatureType_1.CreatureType.Metal, creatureDefinition_1.DefinitionClass.VALIANT, 1),
    createDefinition(6, "Puparmor", creatureType_1.CreatureType.Metal, creatureDefinition_1.DefinitionClass.VALIANT, 1),
    createDefinition(7, "Embra", creatureType_1.CreatureType.Fire, creatureDefinition_1.DefinitionClass.ARCANE, 1),
    createDefinition(8, "Tweesher", creatureType_1.CreatureType.Water, creatureDefinition_1.DefinitionClass.ARCANE, 1),
    createDefinition(9, "Bamboon", creatureType_1.CreatureType.Wood, creatureDefinition_1.DefinitionClass.VALIANT, 2),
    createDefinition(10, "Chenipode", creatureType_1.CreatureType.Earth, creatureDefinition_1.DefinitionClass.CUNNING, 2),
    createDefinition(11, "Bolt", creatureType_1.CreatureType.Metal, creatureDefinition_1.DefinitionClass.VALIANT, 2),
    createDefinition(12, "Weavifly", creatureType_1.CreatureType.Metal, creatureDefinition_1.DefinitionClass.ARCANE, 2),
    createDefinition(13, "Cardiling", creatureType_1.CreatureType.Fire, creatureDefinition_1.DefinitionClass.CUNNING, 2),
    createDefinition(14, "Agnite", creatureType_1.CreatureType.Fire, creatureDefinition_1.DefinitionClass.VALIANT, 2),
    createDefinition(15, "Elowind", creatureType_1.CreatureType.Water, creatureDefinition_1.DefinitionClass.ARCANE, 2),
    createDefinition(16, "Fluttaflap", creatureType_1.CreatureType.Water, creatureDefinition_1.DefinitionClass.VALIANT, 2),
    createDefinition(17, "Velocitile", creatureType_1.CreatureType.Wood, creatureDefinition_1.DefinitionClass.CUNNING, 3),
    createDefinition(18, "Sapsnap", creatureType_1.CreatureType.Wood, creatureDefinition_1.DefinitionClass.VALIANT, 3),
    createDefinition(19, "Rockat", creatureType_1.CreatureType.Earth, creatureDefinition_1.DefinitionClass.CUNNING, 3),
    createDefinition(20, "Grintot", creatureType_1.CreatureType.Earth, creatureDefinition_1.DefinitionClass.VALIANT, 3),
    createDefinition(21, "Propellorcat", creatureType_1.CreatureType.Metal, creatureDefinition_1.DefinitionClass.CUNNING, 3),
    createDefinition(22, "Sumchon", creatureType_1.CreatureType.Metal, creatureDefinition_1.DefinitionClass.VALIANT, 3),
    createDefinition(23, "Ignibus", creatureType_1.CreatureType.Fire, creatureDefinition_1.DefinitionClass.VALIANT, 3),
    createDefinition(24, "Ruption", creatureType_1.CreatureType.Fire, creatureDefinition_1.DefinitionClass.ARCANE, 3),
    createDefinition(25, "Noctalo", creatureType_1.CreatureType.Water, creatureDefinition_1.DefinitionClass.CUNNING, 3),
    createDefinition(26, "Lightmare", creatureType_1.CreatureType.Water, creatureDefinition_1.DefinitionClass.VALIANT, 3),
    createDefinition(27, "Narcileaf", creatureType_1.CreatureType.Wood, creatureDefinition_1.DefinitionClass.ARCANE, 4),
    createDefinition(28, "Coleorus", creatureType_1.CreatureType.Wood, creatureDefinition_1.DefinitionClass.CUNNING, 4),
    createDefinition(29, "Aardart", creatureType_1.CreatureType.Earth, creatureDefinition_1.DefinitionClass.CUNNING, 4),
    createDefinition(30, "Hubursa", creatureType_1.CreatureType.Earth, creatureDefinition_1.DefinitionClass.ARCANE, 4),
    createDefinition(31, "Sampsack", creatureType_1.CreatureType.Metal, creatureDefinition_1.DefinitionClass.VALIANT, 4),
    createDefinition(32, "Cairfrey", creatureType_1.CreatureType.Metal, creatureDefinition_1.DefinitionClass.ARCANE, 4),
    createDefinition(33, "Prophetoise", creatureType_1.CreatureType.Fire, creatureDefinition_1.DefinitionClass.ARCANE, 4),
    createDefinition(34, "Tikorch", creatureType_1.CreatureType.Fire, creatureDefinition_1.DefinitionClass.CUNNING, 4),
    createDefinition(35, "Nudimind", creatureType_1.CreatureType.Water, creatureDefinition_1.DefinitionClass.ARCANE, 4),
    createDefinition(36, "Dollfin", creatureType_1.CreatureType.Water, creatureDefinition_1.DefinitionClass.VALIANT, 4),
    createDefinition(37, "Arbelder", creatureType_1.CreatureType.Wood, creatureDefinition_1.DefinitionClass.VALIANT, 5),
    createDefinition(38, "Viviphyta", creatureType_1.CreatureType.Wood, creatureDefinition_1.DefinitionClass.CUNNING, 5),
    createDefinition(39, "Grintrock", creatureType_1.CreatureType.Earth, creatureDefinition_1.DefinitionClass.VALIANT, 5),
    createDefinition(40, "Jemuar", creatureType_1.CreatureType.Earth, creatureDefinition_1.DefinitionClass.CUNNING, 5),
    createDefinition(41, "Pyraminx", creatureType_1.CreatureType.Metal, creatureDefinition_1.DefinitionClass.VALIANT, 5),
    createDefinition(42, "AV8R", creatureType_1.CreatureType.Metal, creatureDefinition_1.DefinitionClass.CUNNING, 5),
    createDefinition(43, "Agnigon", creatureType_1.CreatureType.Fire, creatureDefinition_1.DefinitionClass.VALIANT, 5),
    createDefinition(44, "Cardinale", creatureType_1.CreatureType.Fire, creatureDefinition_1.DefinitionClass.CUNNING, 5),
    createDefinition(45, "Nudikill", creatureType_1.CreatureType.Water, creatureDefinition_1.DefinitionClass.VALIANT, 5),
    createDefinition(46, "Eaglace", creatureType_1.CreatureType.Water, creatureDefinition_1.DefinitionClass.CUNNING, 5)
];


/***/ }),

/***/ "../shared/log.ts":
/*!************************!*\
  !*** ../shared/log.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.log = void 0;
// tslint:disable:no-console
exports.log = function (message) { return console.log(message); };


/***/ }),

/***/ "../shared/match/combat/battleEventChannel.ts":
/*!****************************************************!*\
  !*** ../shared/match/combat/battleEventChannel.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.battleEventChannel = exports.BATTLE_FINISHED = exports.BATTLE_TURN = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var present = __webpack_require__(/*! present */ "../../node_modules/present/lib/present-browser.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "../../node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var utils_1 = __webpack_require__(/*! ../../utils */ "../shared/utils/index.ts");
var boardActions_1 = __webpack_require__(/*! ../../board/actions/boardActions */ "../shared/board/actions/boardActions.ts");
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

/***/ "../shared/match/combat/battleSaga.ts":
/*!********************************************!*\
  !*** ../shared/match/combat/battleSaga.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.battle = exports.startBattle = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var battleEventChannel_1 = __webpack_require__(/*! ./battleEventChannel */ "../shared/match/combat/battleEventChannel.ts");
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

/***/ "../shared/match/combat/movement.ts":
/*!******************************************!*\
  !*** ../shared/match/combat/movement.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getNewPiecePosition = exports.getAttackableEnemyFromCurrentPosition = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var pathfinding_1 = __webpack_require__(/*! ./pathfinding */ "../shared/match/combat/pathfinding.ts");
var lodash_1 = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
var position_1 = __webpack_require__(/*! @creature-chess/models/src/position */ "../models/src/position.ts");
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
var pieceSelectors_1 = __webpack_require__(/*! ../../player/pieceSelectors */ "../shared/player/pieceSelectors.ts");
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

/***/ "../shared/match/combat/pathfinding.ts":
/*!*********************************************!*\
  !*** ../shared/match/combat/pathfinding.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getNextPiecePosition = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var javascript_astar_1 = __webpack_require__(/*! javascript-astar */ "../../node_modules/javascript-astar/astar.js");
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
var position_1 = __webpack_require__(/*! @creature-chess/models/src/position */ "../models/src/position.ts");
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

/***/ "../shared/match/combat/turnSimulator.ts":
/*!***********************************************!*\
  !*** ../shared/match/combat/turnSimulator.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.TurnSimulator = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var movement_1 = __webpack_require__(/*! ./movement */ "../shared/match/combat/movement.ts");
var position_1 = __webpack_require__(/*! @creature-chess/models/src/position */ "../models/src/position.ts");
var board_1 = __webpack_require__(/*! ../../board */ "../shared/board/index.ts");
var boardActions_1 = __webpack_require__(/*! ../../board/actions/boardActions */ "../shared/board/actions/boardActions.ts");
var piece_utils_1 = __webpack_require__(/*! ../../utils/piece-utils */ "../shared/utils/piece-utils.ts");
var get_type_attack_bonus_1 = __webpack_require__(/*! ../../utils/get-type-attack-bonus */ "../shared/utils/get-type-attack-bonus.ts");
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

/***/ "../shared/networking/client-to-server.ts":
/*!************************************************!*\
  !*** ../shared/networking/client-to-server.ts ***!
  \************************************************/
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

/***/ "../shared/networking/connection-status.ts":
/*!*************************************************!*\
  !*** ../shared/networking/connection-status.ts ***!
  \*************************************************/
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
    ConnectionStatus[ConnectionStatus["RECONNECTED"] = 3] = "RECONNECTED";
})(ConnectionStatus = exports.ConnectionStatus || (exports.ConnectionStatus = {}));


/***/ }),

/***/ "../shared/networking/incoming-packet-registry.ts":
/*!********************************************************!*\
  !*** ../shared/networking/incoming-packet-registry.ts ***!
  \********************************************************/
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

/***/ "../shared/networking/index.ts":
/*!*************************************!*\
  !*** ../shared/networking/index.ts ***!
  \*************************************/
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
var ServerToClient = __webpack_require__(/*! ./server-to-client */ "../shared/networking/server-to-client.ts");
exports.ServerToClient = ServerToClient;
var connection_status_1 = __webpack_require__(/*! ./connection-status */ "../shared/networking/connection-status.ts");
__createBinding(exports, connection_status_1, "ConnectionStatus");


/***/ }),

/***/ "../shared/networking/outgoing-packet-registry.ts":
/*!********************************************************!*\
  !*** ../shared/networking/outgoing-packet-registry.ts ***!
  \********************************************************/
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

/***/ "../shared/networking/server-to-client.ts":
/*!************************************************!*\
  !*** ../shared/networking/server-to-client.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ServerToClientPacketOpcodes = void 0;
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

/***/ "../shared/player/actions.ts":
/*!***********************************!*\
  !*** ../shared/player/actions.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.quitGame = exports.readyUpAction = exports.buyXpAction = exports.toggleShopLock = exports.buyCard = exports.rerollCards = exports.playerSellPiece = exports.playerDropPiece = exports.PlayerActionTypesArray = exports.QUIT_GAME = exports.TOGGLE_SHOP_LOCK = exports.READY_UP = exports.BUY_XP = exports.BUY_CARD = exports.REROLL_CARDS = exports.PLAYER_SELL_PIECE = exports.PLAYER_DROP_PIECE = void 0;
exports.PLAYER_DROP_PIECE = "PLAYER_DROP_PIECE";
exports.PLAYER_SELL_PIECE = "PLAYER_SELL_PIECE";
exports.REROLL_CARDS = "REROLL_CARDS";
exports.BUY_CARD = "BUY_CARD";
exports.BUY_XP = "BUY_XP";
exports.READY_UP = "READY_UP";
exports.TOGGLE_SHOP_LOCK = "TOGGLE_SHOP_LOCK";
exports.QUIT_GAME = "QUIT_GAME";
exports.PlayerActionTypesArray = [
    exports.PLAYER_DROP_PIECE, exports.PLAYER_SELL_PIECE, exports.REROLL_CARDS, exports.BUY_CARD,
    exports.BUY_XP, exports.READY_UP, exports.TOGGLE_SHOP_LOCK, exports.QUIT_GAME
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
exports.quitGame = function () { return ({ type: exports.QUIT_GAME }); };


/***/ }),

/***/ "../shared/player/bench/benchActionTypes.ts":
/*!**************************************************!*\
  !*** ../shared/player/bench/benchActionTypes.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.MOVE_BENCH_PIECE = exports.UNLOCK_BENCH = exports.LOCK_BENCH = exports.INITIALISE_BENCH = exports.ADD_BENCH_PIECE = exports.REMOVE_BENCH_PIECES = exports.REMOVE_BENCH_PIECE = void 0;
exports.REMOVE_BENCH_PIECE = "REMOVE_BENCH_PIECE";
exports.REMOVE_BENCH_PIECES = "REMOVE_BENCH_PIECES";
exports.ADD_BENCH_PIECE = "ADD_BENCH_PIECE";
exports.INITIALISE_BENCH = "INITIALISE_BENCH";
exports.LOCK_BENCH = "LOCK_BENCH";
exports.UNLOCK_BENCH = "UNLOCK_BENCH";
exports.MOVE_BENCH_PIECE = "MOVE_BENCH_PIECE";


/***/ }),

/***/ "../shared/player/bench/benchActions.ts":
/*!**********************************************!*\
  !*** ../shared/player/bench/benchActions.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.unlockBench = exports.lockBench = exports.moveBenchPiece = exports.removeBenchPieces = exports.removeBenchPiece = exports.addBenchPiece = exports.initialiseBench = void 0;
var benchActionTypes_1 = __webpack_require__(/*! ./benchActionTypes */ "../shared/player/bench/benchActionTypes.ts");
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

/***/ "../shared/player/bench/index.ts":
/*!***************************************!*\
  !*** ../shared/player/bench/index.ts ***!
  \***************************************/
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
var state_1 = __webpack_require__(/*! ./state */ "../shared/player/bench/state.ts");
__createBinding(exports, state_1, "reducer", "benchReducer");


/***/ }),

/***/ "../shared/player/bench/reducers/lockedReducer.ts":
/*!********************************************************!*\
  !*** ../shared/player/bench/reducers/lockedReducer.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.locked = void 0;
var benchActionTypes_1 = __webpack_require__(/*! ../benchActionTypes */ "../shared/player/bench/benchActionTypes.ts");
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

/***/ "../shared/player/bench/reducers/piecesReducer.ts":
/*!********************************************************!*\
  !*** ../shared/player/bench/reducers/piecesReducer.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.pieces = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var benchActionTypes_1 = __webpack_require__(/*! ../benchActionTypes */ "../shared/player/bench/benchActionTypes.ts");
var position_1 = __webpack_require__(/*! @creature-chess/models/src/position */ "../models/src/position.ts");
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

/***/ "../shared/player/bench/state.ts":
/*!***************************************!*\
  !*** ../shared/player/bench/state.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.reducer = void 0;
var redux_1 = __webpack_require__(/*! redux */ "../../node_modules/redux/es/redux.js");
var piecesReducer_1 = __webpack_require__(/*! ./reducers/piecesReducer */ "../shared/player/bench/reducers/piecesReducer.ts");
var lockedReducer_1 = __webpack_require__(/*! ./reducers/lockedReducer */ "../shared/player/bench/reducers/lockedReducer.ts");
var reducer = redux_1.combineReducers({
    pieces: piecesReducer_1.pieces,
    locked: lockedReducer_1.locked
});
exports.reducer = reducer;


/***/ }),

/***/ "../shared/player/cardShop/actions.ts":
/*!********************************************!*\
  !*** ../shared/player/cardShop/actions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.cardsUpdated = exports.CARDS_UPDATED = void 0;
exports.CARDS_UPDATED = "CARDS_UPDATED";
exports.cardsUpdated = function (cards) { return ({
    type: exports.CARDS_UPDATED,
    payload: {
        cards: cards
    }
}); };


/***/ }),

/***/ "../shared/player/cardShop/index.ts":
/*!******************************************!*\
  !*** ../shared/player/cardShop/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.cardsReducer = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
tslib_1.__exportStar(__webpack_require__(/*! ./actions */ "../shared/player/cardShop/actions.ts"), exports);
var reducer_1 = __webpack_require__(/*! ./reducer */ "../shared/player/cardShop/reducer.ts");
exports.cardsReducer = reducer_1.cards;


/***/ }),

/***/ "../shared/player/cardShop/reducer.ts":
/*!********************************************!*\
  !*** ../shared/player/cardShop/reducer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.cards = void 0;
var actions_1 = __webpack_require__(/*! ./actions */ "../shared/player/cardShop/actions.ts");
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

/***/ "../shared/player/cardShop/saga.ts":
/*!*****************************************!*\
  !*** ../shared/player/cardShop/saga.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.cardShopSagaFactory = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! ../actions */ "../shared/player/actions.ts");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var board_1 = __webpack_require__(/*! ../../board */ "../shared/board/index.ts");
var piece_utils_1 = __webpack_require__(/*! ../../utils/piece-utils */ "../shared/utils/piece-utils.ts");
var benchActions_1 = __webpack_require__(/*! ../bench/benchActions */ "../shared/player/bench/benchActions.ts");
var actions_2 = __webpack_require__(/*! ./actions */ "../shared/player/cardShop/actions.ts");
var gameInfo_1 = __webpack_require__(/*! ../gameInfo */ "../shared/player/gameInfo/index.ts");
var log_1 = __webpack_require__(/*! ../../log */ "../shared/log.ts");
var playerSelectors_1 = __webpack_require__(/*! ../playerSelectors */ "../shared/player/playerSelectors.ts");
var boardActions_1 = __webpack_require__(/*! ../../board/actions/boardActions */ "../shared/board/actions/boardActions.ts");
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
exports.cardShopSagaFactory = function (definitionProvider, playerId) {
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
                                    piece = piece_utils_1.createPieceFromCard(definitionProvider, playerId, card);
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

/***/ "../shared/player/gameInfo/actions.ts":
/*!********************************************!*\
  !*** ../shared/player/gameInfo/actions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.phaseStartSeconds = exports.moneyUpdateAction = exports.shopLockUpdated = exports.gamePhaseUpdate = exports.PHASE_START_SECONDS = exports.MONEY_UPDATE = exports.SHOP_LOCK_UPDATED = exports.GAME_PHASE_UPDATE = void 0;
exports.GAME_PHASE_UPDATE = "GAME_PHASE_UPDATE";
exports.SHOP_LOCK_UPDATED = "SHOP_LOCK_UPDATED";
exports.MONEY_UPDATE = "MONEY_UPDATE";
exports.PHASE_START_SECONDS = "PHASE_START_SECONDS";
exports.gamePhaseUpdate = function (packet) { return ({
    type: exports.GAME_PHASE_UPDATE,
    payload: packet
}); };
exports.shopLockUpdated = function (locked) { return ({
    type: exports.SHOP_LOCK_UPDATED,
    payload: { locked: locked }
}); };
exports.moneyUpdateAction = function (money) { return ({
    type: exports.MONEY_UPDATE,
    payload: {
        money: money
    }
}); };
exports.phaseStartSeconds = function (timeSeconds) { return ({
    type: exports.PHASE_START_SECONDS,
    payload: {
        time: timeSeconds
    }
}); };


/***/ }),

/***/ "../shared/player/gameInfo/index.ts":
/*!******************************************!*\
  !*** ../shared/player/gameInfo/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.gameInfoReducer = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
tslib_1.__exportStar(__webpack_require__(/*! ./actions */ "../shared/player/gameInfo/actions.ts"), exports);
var reducer_1 = __webpack_require__(/*! ./reducer */ "../shared/player/gameInfo/reducer.ts");
exports.gameInfoReducer = reducer_1.gameInfo;


/***/ }),

/***/ "../shared/player/gameInfo/reducer.ts":
/*!********************************************!*\
  !*** ../shared/player/gameInfo/reducer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.gameInfo = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var actions_1 = __webpack_require__(/*! ./actions */ "../shared/player/gameInfo/actions.ts");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
var actions_2 = __webpack_require__(/*! ../actions */ "../shared/player/actions.ts");
var initialState = {
    phase: models_1.GamePhase.WAITING,
    phaseStartedAtSeconds: null,
    opponentId: null,
    shopLocked: false,
    money: constants_1.STARTING_MONEY,
    ready: false
};
function gameInfo(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_1.MONEY_UPDATE:
            return tslib_1.__assign(tslib_1.__assign({}, state), { money: action.payload.money });
        case actions_1.GAME_PHASE_UPDATE:
            // set ready to false, and set opponent id when entering ready phase
            if (action.payload.phase === models_1.GamePhase.READY) {
                return tslib_1.__assign(tslib_1.__assign({}, state), { phase: action.payload.phase, opponentId: action.payload.payload.opponentId, ready: false });
            }
            // clear opponent id when entering preparing phase
            if (action.payload.phase === models_1.GamePhase.PREPARING) {
                return tslib_1.__assign(tslib_1.__assign({}, state), { phase: action.payload.phase, opponentId: null });
            }
            return tslib_1.__assign(tslib_1.__assign({}, state), { phase: action.payload.phase });
        case actions_1.SHOP_LOCK_UPDATED: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { shopLocked: action.payload.locked });
        }
        case actions_1.PHASE_START_SECONDS:
            return tslib_1.__assign(tslib_1.__assign({}, state), { phaseStartedAtSeconds: action.payload.time });
        case actions_2.READY_UP:
            return tslib_1.__assign(tslib_1.__assign({}, state), { ready: true });
        default:
            return state;
    }
}
exports.gameInfo = gameInfo;


/***/ }),

/***/ "../shared/player/index.ts":
/*!*********************************!*\
  !*** ../shared/player/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PlayerActionTypesArray = exports.PlayerActions = void 0;
var PlayerActions = __webpack_require__(/*! ./actions */ "../shared/player/actions.ts");
exports.PlayerActions = PlayerActions;
var actions_1 = __webpack_require__(/*! ./actions */ "../shared/player/actions.ts");
exports.PlayerActionTypesArray = actions_1.PlayerActionTypesArray;


/***/ }),

/***/ "../shared/player/level/actions.ts":
/*!*****************************************!*\
  !*** ../shared/player/level/actions.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.setLevelAction = exports.LEVEL_UPDATE = void 0;
exports.LEVEL_UPDATE = "LEVEL_UPDATE";
exports.setLevelAction = function (level, xp) { return ({
    type: exports.LEVEL_UPDATE,
    payload: {
        level: level, xp: xp
    }
}); };


/***/ }),

/***/ "../shared/player/level/index.ts":
/*!***************************************!*\
  !*** ../shared/player/level/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.levelReducer = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
tslib_1.__exportStar(__webpack_require__(/*! ./actions */ "../shared/player/level/actions.ts"), exports);
var reducer_1 = __webpack_require__(/*! ./reducer */ "../shared/player/level/reducer.ts");
exports.levelReducer = reducer_1.level;


/***/ }),

/***/ "../shared/player/level/reducer.ts":
/*!*****************************************!*\
  !*** ../shared/player/level/reducer.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.level = void 0;
var actions_1 = __webpack_require__(/*! ./actions */ "../shared/player/level/actions.ts");
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
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

/***/ "../shared/player/pieceSelectors.ts":
/*!******************************************!*\
  !*** ../shared/player/pieceSelectors.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getFirstEmptyBenchSlot = exports.hasSpaceOnBench = exports.getBoardPieceCount = exports.getBenchPiecesForDefinition = exports.getBoardPiecesForDefinition = exports.getAllPieces = exports.getBoardPieceForPosition = exports.getBenchPieceForSlot = exports.getPiece = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
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
exports.getBoardPiecesForDefinition = function (state, definitionId) {
    return Object.values(state.board.pieces).filter(function (p) { return p.definitionId === definitionId; });
};
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

/***/ "../shared/player/playerSelectors.ts":
/*!*******************************************!*\
  !*** ../shared/player/playerSelectors.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getOpponentId = exports.getMostExpensiveBenchPiece = exports.getPlayerFirstEmptyBoardSlot = exports.getPlayerBelowPieceLimit = exports.getPlayerXp = exports.getPlayerLevel = exports.getPlayerMoney = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var pieceSelectors_1 = __webpack_require__(/*! ./pieceSelectors */ "../shared/player/pieceSelectors.ts");
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
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
exports.getOpponentId = function (state) { return state.gameInfo.opponentId; };


/***/ }),

/***/ "../shared/player/sagas/dropPiece.ts":
/*!*******************************************!*\
  !*** ../shared/player/sagas/dropPiece.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.dropPieceSagaFactory = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! ../actions */ "../shared/player/actions.ts");
var pieceSelectors = __webpack_require__(/*! ../pieceSelectors */ "../shared/player/pieceSelectors.ts");
var boardActions_1 = __webpack_require__(/*! ../../board/actions/boardActions */ "../shared/board/actions/boardActions.ts");
var benchActions_1 = __webpack_require__(/*! ../bench/benchActions */ "../shared/player/bench/benchActions.ts");
var playerSelectors_1 = __webpack_require__(/*! ../playerSelectors */ "../shared/player/playerSelectors.ts");
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

/***/ "../shared/player/sagas/evolution.ts":
/*!*******************************************!*\
  !*** ../shared/player/sagas/evolution.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.evolutionSagaFactory = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var benchActions_1 = __webpack_require__(/*! ../bench/benchActions */ "../shared/player/bench/benchActions.ts");
var benchActionTypes_1 = __webpack_require__(/*! ../bench/benchActionTypes */ "../shared/player/bench/benchActionTypes.ts");
var definitionProvider_1 = __webpack_require__(/*! ../../game/definitionProvider */ "../shared/game/definitionProvider.ts");
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
var boardActionTypes_1 = __webpack_require__(/*! ../../board/actions/boardActionTypes */ "../shared/board/actions/boardActionTypes.ts");
var pieceSelectors = __webpack_require__(/*! ../pieceSelectors */ "../shared/player/pieceSelectors.ts");
var boardActions_1 = __webpack_require__(/*! ../../board/actions/boardActions */ "../shared/board/actions/boardActions.ts");
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

/***/ "../shared/utils/debounce.ts":
/*!***********************************!*\
  !*** ../shared/utils/debounce.ts ***!
  \***********************************/
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

/***/ "../shared/utils/get-pieces-for-stage.ts":
/*!***********************************************!*\
  !*** ../shared/utils/get-pieces-for-stage.ts ***!
  \***********************************************/
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

/***/ "../shared/utils/get-total-health-by-team.ts":
/*!***************************************************!*\
  !*** ../shared/utils/get-total-health-by-team.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getTotalHealthByTeam = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
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

/***/ "../shared/utils/get-type-attack-bonus.ts":
/*!************************************************!*\
  !*** ../shared/utils/get-type-attack-bonus.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
exports.__esModule = true;
exports.getTypeAttackBonus = exports.isOvercomeBy = exports.isGeneratedBy = exports.typeInteractions = void 0;
var creatureType_1 = __webpack_require__(/*! @creature-chess/models/src/creatureType */ "../models/src/creatureType.ts");
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

/***/ "../shared/utils/get-xp-for-level.ts":
/*!*******************************************!*\
  !*** ../shared/utils/get-xp-for-level.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getXpToNextLevel = void 0;
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
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
    if (level === constants_1.MAX_PLAYER_LEVEL) {
        return null;
    }
    var result = XP_TO_NEXT_LEVEL[level - 1];
    if (result === undefined) {
        return null;
    }
    return result;
};


/***/ }),

/***/ "../shared/utils/index.ts":
/*!********************************!*\
  !*** ../shared/utils/index.ts ***!
  \********************************/
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
var debounce_1 = __webpack_require__(/*! ./debounce */ "../shared/utils/debounce.ts");
__createBinding(exports, debounce_1, "debounce");
var get_pieces_for_stage_1 = __webpack_require__(/*! ./get-pieces-for-stage */ "../shared/utils/get-pieces-for-stage.ts");
__createBinding(exports, get_pieces_for_stage_1, "getPiecesForStage");
var get_total_health_by_team_1 = __webpack_require__(/*! ./get-total-health-by-team */ "../shared/utils/get-total-health-by-team.ts");
__createBinding(exports, get_total_health_by_team_1, "getTotalHealthByTeam");
var get_type_attack_bonus_1 = __webpack_require__(/*! ./get-type-attack-bonus */ "../shared/utils/get-type-attack-bonus.ts");
__createBinding(exports, get_type_attack_bonus_1, "getTypeAttackBonus");
var get_xp_for_level_1 = __webpack_require__(/*! ./get-xp-for-level */ "../shared/utils/get-xp-for-level.ts");
__createBinding(exports, get_xp_for_level_1, "getXpToNextLevel");
var is_a_team_defeated_1 = __webpack_require__(/*! ./is-a-team-defeated */ "../shared/utils/is-a-team-defeated.ts");
__createBinding(exports, is_a_team_defeated_1, "isATeamDefeated");
var pieceUtils = __webpack_require__(/*! ./piece-utils */ "../shared/utils/piece-utils.ts");
exports.pieceUtils = pieceUtils;
var random_from_array_1 = __webpack_require__(/*! ./random-from-array */ "../shared/utils/random-from-array.ts");
__createBinding(exports, random_from_array_1, "randomFromArray");


/***/ }),

/***/ "../shared/utils/is-a-team-defeated.ts":
/*!*********************************************!*\
  !*** ../shared/utils/is-a-team-defeated.ts ***!
  \*********************************************/
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

/***/ "../shared/utils/piece-utils.ts":
/*!**************************************!*\
  !*** ../shared/utils/piece-utils.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.rotatePiecePosition = exports.moveOrAddPiece = exports.clonePiece = exports.createPieceFromCard = exports.getStats = exports.createPiece = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var uuid = __webpack_require__(/*! uuid/v4 */ "../../node_modules/uuid/v4.js");
var position_1 = __webpack_require__(/*! @creature-chess/models/src/position */ "../models/src/position.ts");
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
exports.createPiece = function (definitionProvider, ownerId, definitionId, position, id, stage) {
    if (stage === void 0) { stage = 0; }
    var stats = definitionProvider.get(definitionId).stages[0];
    return {
        id: id || uuid(),
        ownerId: ownerId,
        definitionId: definitionId,
        definition: definitionProvider.get(definitionId),
        position: position ? position_1.createTileCoordinates.apply(void 0, tslib_1.__spread(position)) : null,
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

/***/ "../shared/utils/random-from-array.ts":
/*!********************************************!*\
  !*** ../shared/utils/random-from-array.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.randomFromArray = void 0;
exports.randomFromArray = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};


/***/ }),

/***/ "../shared/validation/nickname.ts":
/*!****************************************!*\
  !*** ../shared/validation/nickname.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.validateNickname = void 0;
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
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

/***/ "./src/app.tsx":
/*!*********************!*\
  !*** ./src/app.tsx ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.App = void 0;
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "../../node_modules/react-router-dom/esm/react-router-dom.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
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
    if (state.game.id !== null) {
        return GameState.GAME;
    }
    if (state.lobby.lobbyId !== null) {
        return GameState.LOBBY;
    }
    return GameState.MENU;
};
var AuthenticatedRootPage = function () {
    var gameState = react_redux_1.useSelector(gameStateSelector);
    var requestNicknameMessage = react_redux_1.useSelector(function (state) { return state.lobby.requestNicknameMessage; });
    if (gameState === GameState.GAME) {
        return React.createElement(game_1.GamePage, null);
    }
    if (gameState === GameState.LOBBY) {
        return React.createElement(lobby_1.LobbyPage, null);
    }
    if (requestNicknameMessage) {
        return React.createElement(menu_1.NicknameRequestPage, { message: requestNicknameMessage });
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "../../node_modules/react-router-dom/esm/react-router-dom.js");
var loading_1 = __webpack_require__(/*! ../display/loading */ "./src/display/loading.tsx");
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

exports.__esModule = true;
exports.LoginPage = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var auth0_1 = __webpack_require__(/*! ./auth0 */ "./src/auth/auth0.ts");
var selectors_1 = __webpack_require__(/*! ./store/selectors */ "./src/auth/store/selectors.ts");
var footer_1 = __webpack_require__(/*! ../display/footer */ "./src/display/footer.tsx");
var loading_1 = __webpack_require__(/*! ../display/loading */ "./src/display/loading.tsx");
var LoginPage = function () {
    var checkingSession = react_redux_1.useSelector(selectors_1.isCheckingSession);
    var _a = tslib_1.__read(React.useState(false), 2), loadingSignIn = _a[0], setLoadingSignIn = _a[1];
    var onSignInClick = function () {
        setLoadingSignIn(true);
        auth0_1.signIn();
    };
    if (checkingSession) {
        return React.createElement(loading_1.Loading, null);
    }
    return (React.createElement("div", { className: "menu" },
        React.createElement("div", { className: "join-game" },
            React.createElement("h2", { className: "title" }, "Creature Chess"),
            React.createElement("div", { className: "join-options" },
                React.createElement("div", { className: "option" },
                    loadingSignIn
                        && React.createElement("button", { className: "option-button primary" }, "Loading..."),
                    !loadingSignIn
                        && React.createElement("button", { onClick: onSignInClick, className: "option-button primary" }, "Log in / Sign up"),
                    React.createElement("p", { className: "description" },
                        "Creature Chess is completely free to play.",
                        React.createElement("br", null),
                        React.createElement("br", null),
                        "Use the button above to create an account, or to log in if you already have one.")))),
        React.createElement("div", { className: "segment" },
            React.createElement("div", { className: "header" }, "Why do I need an account?"),
            React.createElement("div", { className: "content" },
                React.createElement("p", null, "Logging into an account allows the game to keep your session, so that if you get"),
                React.createElement("p", null, "disconnected, you can get right back into the game."),
                React.createElement("p", null, "\u00A0"),
                React.createElement("p", null, "I don't store any of your personal data. Your game data might be deleted occasionally as I"),
                React.createElement("p", null, "develop the game further."))),
        React.createElement(footer_1.Footer, null)));
};
exports.LoginPage = LoginPage;


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
var auth0_js_1 = __webpack_require__(/*! auth0-js */ "../../node_modules/auth0-js/dist/auth0.min.esm.js");
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
exports.CURRENT_USER_ENDPOINT = exports.scope = exports.audience = exports.logoutRedirectUrl = exports.redirectUri = exports.clientID = exports.domain = void 0;
var local = false;
exports.domain = "creaturechess.eu.auth0.com";
exports.clientID = "HNUYYyRCtFJsA3xKGp964Kgy4jwx8bW1";
exports.redirectUri = local ? "http://localhost:8090/callback" : "http://creaturechess.jamesmonger.com/callback";
exports.logoutRedirectUrl = local ? "http://localhost:8090" : "http://creaturechess.jamesmonger.com/";
exports.audience = "https://" + exports.domain + "/userinfo";
exports.scope = "openid profile email";
exports.CURRENT_USER_ENDPOINT = local ? "http://localhost:3001/user/current" : "https://cc-server-info.herokuapp.com/user/current";


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


/***/ }),

/***/ "./src/auth/store/actions.ts":
/*!***********************************!*\
  !*** ./src/auth/store/actions.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.handleAuthenticationCallback = exports.sessionChecked = exports.userAuthenticated = exports.HANDLE_AUTHENTICATION_CALLBACK = exports.SESSION_CHECKED = exports.USER_AUTHENTICATED = void 0;
exports.USER_AUTHENTICATED = "USER_AUTHENTICATED";
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

exports.__esModule = true;
exports.authReducer = exports.initialState = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
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
        case actions_1.USER_AUTHENTICATED:
            var _a = action.payload, token = _a.token, expiry = _a.expiry, user = _a.user;
            return tslib_1.__assign(tslib_1.__assign({}, state), { checkingSession: false, token: token, tokenExpiry: expiry, user: user });
        case actions_1.SESSION_CHECKED:
            return tslib_1.__assign(tslib_1.__assign({}, state), { checkingSession: false });
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

exports.__esModule = true;
exports.authSaga = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! ./actions */ "./src/auth/store/actions.ts");
var auth0_1 = __webpack_require__(/*! ../auth0 */ "./src/auth/auth0.ts");
var getCurrentUser_1 = __webpack_require__(/*! ../utils/getCurrentUser */ "./src/auth/utils/getCurrentUser.ts");
exports.authSaga = function () {
    var existingSession, user, newSession, newUser;
    return tslib_1.__generator(this, function (_a) {
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

exports.__esModule = true;
exports.getCurrentUser = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var config_1 = __webpack_require__(/*! ../config */ "./src/auth/config.ts");
exports.getCurrentUser = function (token) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var response, profile;
    return tslib_1.__generator(this, function (_a) {
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

/***/ "./src/display/animation.ts":
/*!**********************************!*\
  !*** ./src/display/animation.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getAnimationCssVariables = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var lodash_1 = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
exports.getAnimationCssVariables = function (animations) {
    var variables = lodash_1.assign.apply(void 0, tslib_1.__spread([{}], animations.filter(function (a) { return a.variables; }).map(function (a) { return a.variables; })));
    return lodash_1.assign.apply(void 0, tslib_1.__spread([{}], lodash_1.keys(variables).map(function (key) {
        var _a;
        return (_a = {}, _a["--" + key] = variables[key], _a);
    })));
};


/***/ }),

/***/ "./src/display/countdown.tsx":
/*!***********************************!*\
  !*** ./src/display/countdown.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Countdown = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
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

/***/ "./src/display/creatureImage.tsx":
/*!***************************************!*\
  !*** ./src/display/creatureImage.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.CreatureImage = void 0;
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var CreatureImage = function (_a) {
    var facing = _a.facing, definitionId = _a.definitionId;
    return (React.createElement("img", { className: "image", src: "images/" + (facing || "front") + "/" + definitionId + ".png" }));
};
exports.CreatureImage = CreatureImage;


/***/ }),

/***/ "./src/display/footer.tsx":
/*!********************************!*\
  !*** ./src/display/footer.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Footer = void 0;
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
exports.Footer = function () {
    return (React.createElement("div", { className: "github-link" },
        React.createElement("a", { href: "https://reddit.com/r/creaturechess/" }, "/r/CreatureChess"),
        " - ",
        React.createElement("a", { href: "http://creaturechess.jamesmonger.com/privacy" }, "Privacy Policy"),
        " - ",
        React.createElement("a", { href: "https://github.com/Jameskmonger/creature-chess" }, "Source and Licenses on GitHub")));
};


/***/ }),

/***/ "./src/display/index.ts":
/*!******************************!*\
  !*** ./src/display/index.ts ***!
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
var creatureImage_1 = __webpack_require__(/*! ./creatureImage */ "./src/display/creatureImage.tsx");
__createBinding(exports, creatureImage_1, "CreatureImage");
var progressBar_1 = __webpack_require__(/*! ./progressBar */ "./src/display/progressBar.tsx");
__createBinding(exports, progressBar_1, "ProgressBar");


/***/ }),

/***/ "./src/display/loading.tsx":
/*!*********************************!*\
  !*** ./src/display/loading.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Loading = void 0;
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var Loading = function () {
    return (React.createElement("div", { className: "loading-full" },
        React.createElement("h1", null, "Loading..."),
        React.createElement("p", null, "This can sometimes take up to 30 secs")));
};
exports.Loading = Loading;


/***/ }),

/***/ "./src/display/progressBar.tsx":
/*!*************************************!*\
  !*** ./src/display/progressBar.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ProgressBar = void 0;
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
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

/***/ "./src/display/projectile.tsx":
/*!************************************!*\
  !*** ./src/display/projectile.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Projectile = void 0;
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var Projectile = function () { return (React.createElement("svg", { className: "projectile", height: "12", width: "12" },
    React.createElement("circle", { cx: "6", cy: "6", r: "4", stroke: "#FAD17D", "stroke-width": "2", fill: "#F5E687" }))); };
exports.Projectile = Projectile;


/***/ }),

/***/ "./src/display/style/index.scss":
/*!**************************************!*\
  !*** ./src/display/style/index.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var position_1 = __webpack_require__(/*! @creature-chess/models/src/position */ "../models/src/position.ts");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
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

/***/ "./src/game/features/board/board.tsx":
/*!*******************************************!*\
  !*** ./src/game/features/board/board.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Board = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var position_1 = __webpack_require__(/*! @creature-chess/models/src/position */ "../models/src/position.ts");
var pieceComponent_1 = __webpack_require__(/*! ./piece/pieceComponent */ "./src/game/features/board/piece/pieceComponent.tsx");
var boardRow_1 = __webpack_require__(/*! ./boardRow */ "./src/game/features/board/boardRow.tsx");
var opponentBoardPlaceholder_1 = __webpack_require__(/*! ./overlays/opponentBoardPlaceholder */ "./src/game/features/board/overlays/opponentBoardPlaceholder.tsx");
var announcement_1 = __webpack_require__(/*! ./overlays/announcement */ "./src/game/features/board/overlays/announcement.tsx");
var victoryOverlay_1 = __webpack_require__(/*! ./overlays/victoryOverlay */ "./src/game/features/board/overlays/victoryOverlay.tsx");
var reconnectModal_1 = __webpack_require__(/*! ./overlays/reconnectModal */ "./src/game/features/board/overlays/reconnectModal.tsx");
var BoardPieces = function (props) {
    var e_1, _a;
    var inPreparingPhase = react_redux_1.useSelector(function (state) { return state.gameInfo.phase === models_1.GamePhase.PREPARING; });
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
    var showOpponentBoardPlaceholder = react_redux_1.useSelector(function (state) { return state.gameInfo.phase === models_1.GamePhase.WAITING || state.gameInfo.phase === models_1.GamePhase.PREPARING; });
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

/***/ "./src/game/features/board/boardContainer.tsx":
/*!****************************************************!*\
  !*** ./src/game/features/board/boardContainer.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.BoardContainer = void 0;
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var boardTile_1 = __webpack_require__(/*! ./tile/boardTile */ "./src/game/features/board/tile/boardTile.tsx");
var getClassForTileStyle_1 = __webpack_require__(/*! ./getClassForTileStyle */ "./src/game/features/board/getClassForTileStyle.ts");
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

/***/ "./src/game/features/board/getClassForTileStyle.ts":
/*!*********************************************************!*\
  !*** ./src/game/features/board/getClassForTileStyle.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getClassForTileStyle = void 0;
var position_1 = __webpack_require__(/*! @creature-chess/models/src/position */ "../models/src/position.ts");
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

/***/ "./src/game/features/board/overlays/announcement.tsx":
/*!***********************************************************!*\
  !*** ./src/game/features/board/overlays/announcement.tsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Announcement = void 0;
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var player_1 = __webpack_require__(/*! @creature-chess/shared/player */ "../shared/player/index.ts");
var ReadyUpButton = function () {
    var canReadyUp = react_redux_1.useSelector(function (state) { return state.gameInfo.phase === models_1.GamePhase.PREPARING && state.gameInfo.ready === false; });
    var dispatch = react_redux_1.useDispatch();
    if (!canReadyUp) {
        return null;
    }
    var onReadyUp = function () { return dispatch(player_1.PlayerActions.readyUpAction()); };
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var networking_1 = __webpack_require__(/*! @creature-chess/shared/networking */ "../shared/networking/index.ts");
var ReconnectModal = function () {
    var connectionStatus = react_redux_1.useSelector(function (state) { return state.ui.connectionStatus; });
    if (connectionStatus === networking_1.ConnectionStatus.NOT_CONNECTED
        || connectionStatus === networking_1.ConnectionStatus.CONNECTED) {
        return null;
    }
    return (React.createElement("div", { className: "reconnect" },
        connectionStatus === networking_1.ConnectionStatus.DISCONNECTED
            && (React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text" }, "You've been disconnected - but you can get back in!"),
                React.createElement("p", { className: "text" }, "Please refresh the page and press 'Find Game' to rejoin"))),
        connectionStatus === networking_1.ConnectionStatus.RECONNECTED
            && (React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text" }, "Reconnected!"),
                React.createElement("p", { className: "text" }, "Please wait for the current round to finish...")))));
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var pieceSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/pieceSelectors */ "../shared/player/pieceSelectors.ts");
var actions_1 = __webpack_require__(/*! @creature-chess/shared/player/actions */ "../shared/player/actions.ts");
var cardShop_1 = __webpack_require__(/*! ../../cardShop */ "./src/game/features/cardShop/index.ts");
var selectedPieceSelector = function (state) {
    return state.ui.selectedPieceId
        ? pieceSelectors_1.getPiece(state, state.ui.selectedPieceId)
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var pieceSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/pieceSelectors */ "../shared/player/pieceSelectors.ts");
var progressBar_1 = __webpack_require__(/*! ../../../../../display/progressBar */ "./src/display/progressBar.tsx");
var selectors_1 = __webpack_require__(/*! ../../../../../auth/store/selectors */ "./src/auth/store/selectors.ts");
var Healthbar = function (_a) {
    var pieceId = _a.pieceId, _b = _a.vertical, vertical = _b === void 0 ? false : _b;
    var showHealthbar = react_redux_1.useSelector(function (state) { return (state.gameInfo.phase === models_1.GamePhase.READY
        || state.gameInfo.phase === models_1.GamePhase.PLAYING); });
    var piece = react_redux_1.useSelector(function (state) { return pieceSelectors_1.getPiece(state, pieceId); });
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var pieceSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/pieceSelectors */ "../shared/player/pieceSelectors.ts");
var creatureImage_1 = __webpack_require__(/*! ../../../../../display/creatureImage */ "./src/display/creatureImage.tsx");
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

/***/ "./src/game/features/board/piece/components/stageIndicator.tsx":
/*!*********************************************************************!*\
  !*** ./src/game/features/board/piece/components/stageIndicator.tsx ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.StageIndicator = void 0;
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var pieceSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/pieceSelectors */ "../shared/player/pieceSelectors.ts");
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

/***/ "./src/game/features/board/piece/pieceComponent.tsx":
/*!**********************************************************!*\
  !*** ./src/game/features/board/piece/pieceComponent.tsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PieceComponent = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "../../node_modules/react-dnd/dist/esm/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var pieceSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/pieceSelectors */ "../shared/player/pieceSelectors.ts");
var animation_1 = __webpack_require__(/*! ../../../../display/animation */ "./src/display/animation.ts");
var projectile_1 = __webpack_require__(/*! ../../../../display/projectile */ "./src/display/projectile.tsx");
var actions_1 = __webpack_require__(/*! ../actions */ "./src/game/features/board/actions.ts");
var pieceImage_1 = __webpack_require__(/*! ./components/pieceImage */ "./src/game/features/board/piece/components/pieceImage.tsx");
var stageIndicator_1 = __webpack_require__(/*! ./components/stageIndicator */ "./src/game/features/board/piece/components/stageIndicator.tsx");
var healthbar_1 = __webpack_require__(/*! ./components/healthbar */ "./src/game/features/board/piece/components/healthbar.tsx");
var selectors_1 = __webpack_require__(/*! ../../../../auth/store/selectors */ "./src/auth/store/selectors.ts");
var dyingAnimation = "dying";
var PieceComponent = function (props) {
    var id = props.id, draggable = props.draggable, animate = props.animate;
    var dispatch = react_redux_1.useDispatch();
    var _a = tslib_1.__read(React.useState([]), 2), currentAnimations = _a[0], setCurrentAnimations = _a[1];
    var _b = tslib_1.__read(React.useState(null), 2), oldPiece = _b[0], setOldPiece = _b[1];
    var localPlayerId = react_redux_1.useSelector(selectors_1.getUserId);
    var piece = react_redux_1.useSelector(function (state) { return pieceSelectors_1.getPiece(state, id); });
    var inPreparingPhase = react_redux_1.useSelector(function (state) { return state.gameInfo.phase === models_1.GamePhase.PREPARING; });
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var position_1 = __webpack_require__(/*! @creature-chess/models/src/position */ "../models/src/position.ts");
var tile_1 = __webpack_require__(/*! ./tile */ "./src/game/features/board/tile/tile.tsx");
var BenchTile = function (props) {
    return (React.createElement(tile_1.Tile, { type: position_1.TileType.BENCH, x: props.slot, y: null, tileStyle: props.tileStyle }));
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var position_1 = __webpack_require__(/*! @creature-chess/models/src/position */ "../models/src/position.ts");
var tile_1 = __webpack_require__(/*! ./tile */ "./src/game/features/board/tile/tile.tsx");
var BoardTile = function (props) {
    return (React.createElement(tile_1.Tile, { type: position_1.TileType.BOARD, x: props.x, y: props.y, tileStyle: props.tileStyle }));
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

exports.__esModule = true;
exports.Tile = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "../../node_modules/react-dnd/dist/esm/index.js");
var position_1 = __webpack_require__(/*! @creature-chess/models/src/position */ "../models/src/position.ts");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var getClassForTileStyle_1 = __webpack_require__(/*! ../getClassForTileStyle */ "./src/game/features/board/getClassForTileStyle.ts");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var pieceSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/pieceSelectors */ "../shared/player/pieceSelectors.ts");
var actions_1 = __webpack_require__(/*! @creature-chess/shared/player/actions */ "../shared/player/actions.ts");
var pieceSelectors_2 = __webpack_require__(/*! ../../../../store/pieceSelectors */ "./src/store/pieceSelectors.ts");
var board_1 = __webpack_require__(/*! @creature-chess/shared/board */ "../shared/board/index.ts");
var playerSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/playerSelectors */ "../shared/player/playerSelectors.ts");
var actions_2 = __webpack_require__(/*! ../actions */ "./src/game/features/board/actions.ts");
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
    dispatch(actions_2.clearSelectedPiece());
};
var Tile = function (_a) {
    var x = _a.x, y = _a.y, type = _a.type, tileStyle = _a.tileStyle;
    var dispatch = react_redux_1.useDispatch();
    var piece = react_redux_1.useSelector(function (state) { return (type === position_1.TileType.BOARD
        ? pieceSelectors_2.boardTilePieceSelector(state, { x: x, y: y })
        : pieceSelectors_2.benchTilePieceSelector(state, { x: x })); });
    var boardLocked = react_redux_1.useSelector(function (state) { return state.board.locked; });
    var belowPieceLimit = react_redux_1.useSelector(function (state) { return pieceSelectors_2.ownedPieceSelector(state).length < playerSelectors_1.getPlayerLevel(state); });
    var canMovePiece = react_redux_1.useSelector(function (state) { return state.gameInfo.phase === models_1.GamePhase.PREPARING || type === position_1.TileType.BENCH; });
    var selectedPiece = react_redux_1.useSelector(function (state) { return state.ui.selectedPieceId ? pieceSelectors_1.getPiece(state, state.ui.selectedPieceId) : null; });
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

/***/ "./src/game/features/cardShop/balanceDisplay.tsx":
/*!*******************************************************!*\
  !*** ./src/game/features/cardShop/balanceDisplay.tsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.BalanceDisplay = void 0;
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var definitionProvider_1 = __webpack_require__(/*! @creature-chess/shared/game/definitionProvider */ "../shared/game/definitionProvider.ts");
var display_1 = __webpack_require__(/*! ../../../display */ "./src/display/index.ts");
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

/***/ "./src/game/features/cardShop/cardShop.tsx":
/*!*************************************************!*\
  !*** ./src/game/features/cardShop/cardShop.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.CardShop = void 0;
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var card_1 = __webpack_require__(/*! ./card */ "./src/game/features/cardShop/card.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var rerollButton_1 = __webpack_require__(/*! ./rerollButton */ "./src/game/features/cardShop/rerollButton.tsx");
var balanceDisplay_1 = __webpack_require__(/*! ./balanceDisplay */ "./src/game/features/cardShop/balanceDisplay.tsx");
var player_1 = __webpack_require__(/*! @creature-chess/shared/player */ "../shared/player/index.ts");
var playerSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/playerSelectors */ "../shared/player/playerSelectors.ts");
var toggleLockButton_1 = __webpack_require__(/*! ./toggleLockButton */ "./src/game/features/cardShop/toggleLockButton.tsx");
var CardShop = function (_a) {
    var showBalance = _a.showBalance;
    var dispatch = react_redux_1.useDispatch();
    var cards = react_redux_1.useSelector(function (state) { return state.cards; });
    var money = react_redux_1.useSelector(playerSelectors_1.getPlayerMoney);
    var canUseShop = react_redux_1.useSelector(function (state) { return state.gameInfo.phase !== models_1.GamePhase.WAITING && state.gameInfo.phase !== models_1.GamePhase.DEAD; });
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

exports.__esModule = true;
exports.closeShopOnFirstBuy = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! @creature-chess/shared/player/actions */ "../shared/player/actions.ts");
var overlay_1 = __webpack_require__(/*! ../../overlay */ "./src/game/overlay.ts");
var uiActions_1 = __webpack_require__(/*! ../../../store/actions/uiActions */ "./src/store/actions/uiActions.ts");
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
var actions_1 = __webpack_require__(/*! @creature-chess/shared/player/actions */ "../shared/player/actions.ts");
var playerSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/playerSelectors */ "../shared/player/playerSelectors.ts");
var RerollButton = function () {
    var dispatch = react_redux_1.useDispatch();
    var money = react_redux_1.useSelector(playerSelectors_1.getPlayerMoney);
    var buyable = money >= constants_1.REROLL_COST;
    var onBuy = function () { return dispatch(actions_1.rerollCards()); };
    return (React.createElement("button", { className: "reroll shop-action", onClick: buyable ? onBuy : undefined, disabled: buyable === false },
        "New Cards ($",
        constants_1.REROLL_COST,
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var actions_1 = __webpack_require__(/*! @creature-chess/shared/player/actions */ "../shared/player/actions.ts");
var ToggleLockButton = function () {
    var dispatch = react_redux_1.useDispatch();
    var shopLocked = react_redux_1.useSelector(function (state) { return state.gameInfo.shopLocked; });
    var onToggleLock = function () { return dispatch(actions_1.toggleShopLock()); };
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var footer_1 = __webpack_require__(/*! ../../display/footer */ "./src/display/footer.tsx");
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
                React.createElement("li", null, "Win / loss streak bonus"))),
        React.createElement(footer_1.Footer, null)));
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var countdown_1 = __webpack_require__(/*! ../../display/countdown */ "./src/display/countdown.tsx");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var renderPhaseInfoCountdown = function (secondsRemaining) { return React.createElement("span", { className: "highlight" },
    "(",
    secondsRemaining,
    ")"); };
var PhaseInfo = function () {
    var phase = react_redux_1.useSelector(function (state) { return state.gameInfo.phase; });
    var phaseStartedAtSeconds = react_redux_1.useSelector(function (state) { return state.gameInfo.phaseStartedAtSeconds; });
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

/***/ "./src/game/features/playerList/battleInfo.tsx":
/*!*****************************************************!*\
  !*** ./src/game/features/playerList/battleInfo.tsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.BattleInfo = void 0;
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var playerSelectors_1 = __webpack_require__(/*! ../../../store/playerSelectors */ "./src/store/playerSelectors.ts");
var playerName_1 = __webpack_require__(/*! ./playerName */ "./src/game/features/playerList/playerName.tsx");
var player_list_player_1 = __webpack_require__(/*! @creature-chess/models/src/player-list-player */ "../models/src/player-list-player.ts");
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var playerListItem_1 = __webpack_require__(/*! ./playerListItem */ "./src/game/features/playerList/playerListItem.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var playerSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/playerSelectors */ "../shared/player/playerSelectors.ts");
var selectors_1 = __webpack_require__(/*! ../../../auth/store/selectors */ "./src/auth/store/selectors.ts");
var PlayerList = function () {
    var players = react_redux_1.useSelector(function (state) { return state.playerList; });
    var opponentId = react_redux_1.useSelector(playerSelectors_1.getOpponentId);
    var localPlayerId = react_redux_1.useSelector(selectors_1.getUserId);
    var showReadyIndicators = react_redux_1.useSelector(function (state) { return state.gameInfo.phase === models_1.GamePhase.PREPARING; });
    var localPlayerMoney = react_redux_1.useSelector(playerSelectors_1.getPlayerMoney);
    var localPlayerLevel = react_redux_1.useSelector(playerSelectors_1.getPlayerLevel);
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var display_1 = __webpack_require__(/*! ../../../display */ "./src/display/index.ts");
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var pieceSelectors_1 = __webpack_require__(/*! ../../../store/pieceSelectors */ "./src/store/pieceSelectors.ts");
var playerSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/playerSelectors */ "../shared/player/playerSelectors.ts");
var PieceCount = function (props) {
    var level = react_redux_1.useSelector(playerSelectors_1.getPlayerLevel);
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var progressBar_1 = __webpack_require__(/*! ../../../display/progressBar */ "./src/display/progressBar.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var utils_1 = __webpack_require__(/*! @creature-chess/shared/utils */ "../shared/utils/index.ts");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var pieceCount_1 = __webpack_require__(/*! ./pieceCount */ "./src/game/features/profile/pieceCount.tsx");
var player_1 = __webpack_require__(/*! @creature-chess/shared/player */ "../shared/player/index.ts");
var playerSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/playerSelectors */ "../shared/player/playerSelectors.ts");
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
var renderProgressBar = function (current, max) { return current + " / " + max + " xp"; };
var Profile = function () {
    var dispatch = react_redux_1.useDispatch();
    var gameStarted = react_redux_1.useSelector(function (state) { return state.gameInfo.phase !== models_1.GamePhase.WAITING; });
    var level = react_redux_1.useSelector(playerSelectors_1.getPlayerLevel);
    var xp = react_redux_1.useSelector(playerSelectors_1.getPlayerXp);
    if (gameStarted === false) {
        return null;
    }
    return (React.createElement("div", { className: "profile" },
        React.createElement("p", { className: "item level" },
            "Level ",
            level),
        React.createElement(pieceCount_1.PieceCount, null),
        level !== constants_1.MAX_PLAYER_LEVEL
            && (React.createElement("div", { className: "level-bar" },
                React.createElement(progressBar_1.ProgressBar, { className: "xp-progress", current: xp, max: utils_1.getXpToNextLevel(level), renderContents: renderProgressBar }),
                React.createElement("button", { className: "buy-xp", onClick: function () { return dispatch(player_1.PlayerActions.buyXpAction()); } },
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
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

exports.__esModule = true;
exports.QuitGameButton = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var actions_1 = __webpack_require__(/*! @creature-chess/shared/player/actions */ "../shared/player/actions.ts");
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var QuitGameButton = function () {
    var dispatch = react_redux_1.useDispatch();
    var _a = tslib_1.__read(React.useState(false), 2), areYouSure = _a[0], setAreYouSure = _a[1];
    var onClick = (areYouSure
        ? function () {
            dispatch(actions_1.quitGame());
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var footer_1 = __webpack_require__(/*! ../../../display/footer */ "./src/display/footer.tsx");
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "../../node_modules/react-dnd/dist/esm/index.js");
var react_dnd_multi_backend_1 = __webpack_require__(/*! react-dnd-multi-backend */ "../../node_modules/react-dnd-multi-backend/dist/esm/index.js");
var HTML5toTouch_1 = __webpack_require__(/*! react-dnd-multi-backend/dist/esm/HTML5toTouch */ "../../node_modules/react-dnd-multi-backend/dist/esm/HTML5toTouch.js");
var react_media_1 = __webpack_require__(/*! react-media */ "../../node_modules/react-media/esm/react-media.js");
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
__createBinding(exports, sagas_1, "gameSagaFactory");
var gamePage_1 = __webpack_require__(/*! ./gamePage */ "./src/game/gamePage.tsx");
__createBinding(exports, gamePage_1, "GamePage");
var store_1 = __webpack_require__(/*! ./store */ "./src/game/store/index.ts");
__createBinding(exports, store_1, "reducer", "gameReducer");


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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var boardContainer_1 = __webpack_require__(/*! ../features/board/boardContainer */ "./src/game/features/board/boardContainer.tsx");
var cardShop_1 = __webpack_require__(/*! ../features/cardShop */ "./src/game/features/cardShop/index.ts");
var playerList_1 = __webpack_require__(/*! ../features/playerList */ "./src/game/features/playerList/index.ts");
var profile_1 = __webpack_require__(/*! ../features/profile */ "./src/game/features/profile/index.ts");
var roundIndicator_1 = __webpack_require__(/*! ../features/roundIndicator */ "./src/game/features/roundIndicator.tsx");
var phaseInfo_1 = __webpack_require__(/*! ../features/phaseInfo */ "./src/game/features/phaseInfo.tsx");
var settings_1 = __webpack_require__(/*! ../features/settings */ "./src/game/features/settings/index.ts");
var footer_1 = __webpack_require__(/*! ../../display/footer */ "./src/display/footer.tsx");
var DesktopGame = function () {
    return (React.createElement("div", { className: "game landscape" },
        React.createElement("div", { className: "group" },
            React.createElement(roundIndicator_1.RoundIndicator, null),
            React.createElement(phaseInfo_1.PhaseInfo, null),
            React.createElement(playerList_1.PlayerList, null)),
        React.createElement(boardContainer_1.BoardContainer, null),
        React.createElement("div", { className: "group" },
            React.createElement(settings_1.QuitGameButton, null),
            React.createElement(cardShop_1.CardShop, { showBalance: true }),
            React.createElement(profile_1.Profile, null),
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var react_fontawesome_1 = __webpack_require__(/*! @fortawesome/react-fontawesome */ "../../node_modules/@fortawesome/react-fontawesome/index.es.js");
var free_solid_svg_icons_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "../../node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
var playerSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/playerSelectors */ "../shared/player/playerSelectors.ts");
var overlay_1 = __webpack_require__(/*! ../overlay */ "./src/game/overlay.ts");
var uiActions_1 = __webpack_require__(/*! ../../store/actions/uiActions */ "./src/store/actions/uiActions.ts");
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
            dispatch(uiActions_1.closeOverlay());
            return;
        }
        dispatch(uiActions_1.openOverlay(overlay));
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

/***/ "./src/game/overlay.ts":
/*!*****************************!*\
  !*** ./src/game/overlay.ts ***!
  \*****************************/
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

/***/ "./src/game/sagas/actions/announcement.ts":
/*!************************************************!*\
  !*** ./src/game/sagas/actions/announcement.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.announcement = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var gameInfo_1 = __webpack_require__(/*! @creature-chess/shared/player/gameInfo */ "../shared/player/gameInfo/index.ts");
var actions_1 = __webpack_require__(/*! packages/app/src/game/store/actions */ "./src/game/store/actions.ts");
var uiActions_1 = __webpack_require__(/*! packages/app/src/store/actions/uiActions */ "./src/store/actions/uiActions.ts");
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
            case 0: return [4 /*yield*/, effects_1.takeLatest([gameInfo_1.GAME_PHASE_UPDATE, actions_1.PLAYERS_RESURRECTED], function (action) {
                    var state, opponentId_1, opponent, playerIds, state_1, playerNames, message;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(action.type === gameInfo_1.GAME_PHASE_UPDATE)) return [3 /*break*/, 5];
                                if (!(action.payload.phase === models_1.GamePhase.PLAYING)) return [3 /*break*/, 2];
                                return [4 /*yield*/, effects_1.put(uiActions_1.clearAnnouncement())];
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
                                return [4 /*yield*/, effects_1.put(uiActions_1.updateAnnouncement(opponent.name, "Now Playing"))];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5:
                                if (!(action.type === actions_1.PLAYERS_RESURRECTED)) return [3 /*break*/, 10];
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
                                return [4 /*yield*/, effects_1.put(uiActions_1.updateAnnouncement("Players Resurrected", message))];
                            case 7:
                                _a.sent();
                                return [4 /*yield*/, effects_1.delay(2000)];
                            case 8:
                                _a.sent();
                                return [4 /*yield*/, effects_1.put(uiActions_1.clearAnnouncement())];
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

/***/ "./src/game/sagas/actions/gamePhase.ts":
/*!*********************************************!*\
  !*** ./src/game/sagas/actions/gamePhase.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.gamePhase = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var battleSaga_1 = __webpack_require__(/*! @creature-chess/shared/match/combat/battleSaga */ "../shared/match/combat/battleSaga.ts");
var benchActions_1 = __webpack_require__(/*! @creature-chess/shared/player/bench/benchActions */ "../shared/player/bench/benchActions.ts");
var boardActions_1 = __webpack_require__(/*! @creature-chess/shared/board/actions/boardActions */ "../shared/board/actions/boardActions.ts");
var pieceSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/pieceSelectors */ "../shared/player/pieceSelectors.ts");
var uiActions_1 = __webpack_require__(/*! ../../../store/actions/uiActions */ "./src/store/actions/uiActions.ts");
var overlay_1 = __webpack_require__(/*! ../../overlay */ "./src/game/overlay.ts");
var gameInfo_1 = __webpack_require__(/*! @creature-chess/shared/player/gameInfo */ "../shared/player/gameInfo/index.ts");
var cardShop_1 = __webpack_require__(/*! @creature-chess/shared/player/cardShop */ "../shared/player/cardShop/index.ts");
var actions_1 = __webpack_require__(/*! ../../features/board/actions */ "./src/game/features/board/actions.ts");
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
                                    if (!payload.board) return [3 /*break*/, 2];
                                    return [4 /*yield*/, effects_1.put(boardActions_1.initialiseBoard(payload.board.pieces))];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, effects_1.put(benchActions_1.initialiseBench(payload.bench))];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(boardActions_1.lockBoard())];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(uiActions_1.closeOverlay())];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.select()];
                                case 6:
                                    state = _a.sent();
                                    selectedPiece = pieceSelectors_1.getPiece(state, state.ui.selectedPieceId);
                                    if (!(selectedPiece && selectedPiece.position.y !== null)) return [3 /*break*/, 8];
                                    return [4 /*yield*/, effects_1.put(actions_1.clearSelectedPiece())];
                                case 7:
                                    _a.sent();
                                    _a.label = 8;
                                case 8: return [2 /*return*/];
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

/***/ "./src/game/sagas/actions/phaseTimer.ts":
/*!**********************************************!*\
  !*** ./src/game/sagas/actions/phaseTimer.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.phaseTimer = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var gameInfo_1 = __webpack_require__(/*! @creature-chess/shared/player/gameInfo */ "../shared/player/gameInfo/index.ts");
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
                                return [4 /*yield*/, effects_1.put(gameInfo_1.phaseStartSeconds(seconds))];
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

/***/ "./src/game/sagas/actions/preventAccidentalClose.ts":
/*!**********************************************************!*\
  !*** ./src/game/sagas/actions/preventAccidentalClose.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.preventAccidentalClose = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var actions_1 = __webpack_require__(/*! @creature-chess/shared/player/actions */ "../shared/player/actions.ts");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
exports.preventAccidentalClose = function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // display an "Are you sure you want to leave this page?" dialog
                window.onbeforeunload = function () { return "Are you sure you want to leave this page? There is currently no way to rejoin a game"; };
                return [4 /*yield*/, effects_1.take(actions_1.QUIT_GAME)];
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

/***/ "./src/game/sagas/actions/sellPiece.ts":
/*!*********************************************!*\
  !*** ./src/game/sagas/actions/sellPiece.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.sellPiece = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! @creature-chess/shared/player/actions */ "../shared/player/actions.ts");
var pieceSelectors_1 = __webpack_require__(/*! @creature-chess/shared/player/pieceSelectors */ "../shared/player/pieceSelectors.ts");
var benchActions_1 = __webpack_require__(/*! @creature-chess/shared/player/bench/benchActions */ "../shared/player/bench/benchActions.ts");
var boardActions_1 = __webpack_require__(/*! @creature-chess/shared/board/actions/boardActions */ "../shared/board/actions/boardActions.ts");
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

/***/ "./src/game/sagas/index.ts":
/*!*********************************!*\
  !*** ./src/game/sagas/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.gameSagaFactory = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var preventAccidentalClose_1 = __webpack_require__(/*! ../../game/sagas/actions/preventAccidentalClose */ "./src/game/sagas/actions/preventAccidentalClose.ts");
var battleSaga_1 = __webpack_require__(/*! @creature-chess/shared/match/combat/battleSaga */ "../shared/match/combat/battleSaga.ts");
var turnSimulator_1 = __webpack_require__(/*! @creature-chess/shared/match/combat/turnSimulator */ "../shared/match/combat/turnSimulator.ts");
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
var evolution_1 = __webpack_require__(/*! @creature-chess/shared/player/sagas/evolution */ "../shared/player/sagas/evolution.ts");
var saga_1 = __webpack_require__(/*! @creature-chess/shared/player/cardShop/saga */ "../shared/player/cardShop/saga.ts");
var dropPiece_1 = __webpack_require__(/*! @creature-chess/shared/player/sagas/dropPiece */ "../shared/player/sagas/dropPiece.ts");
var definitionProvider_1 = __webpack_require__(/*! @creature-chess/shared/game/definitionProvider */ "../shared/game/definitionProvider.ts");
var closeShopOnFirstBuy_1 = __webpack_require__(/*! ../features/cardShop/closeShopOnFirstBuy */ "./src/game/features/cardShop/closeShopOnFirstBuy.ts");
var phaseTimer_1 = __webpack_require__(/*! ./actions/phaseTimer */ "./src/game/sagas/actions/phaseTimer.ts");
var gamePhase_1 = __webpack_require__(/*! ./actions/gamePhase */ "./src/game/sagas/actions/gamePhase.ts");
var sellPiece_1 = __webpack_require__(/*! ./actions/sellPiece */ "./src/game/sagas/actions/sellPiece.ts");
var announcement_1 = __webpack_require__(/*! ./actions/announcement */ "./src/game/sagas/actions/announcement.ts");
exports.gameSagaFactory = function (playerId) {
    var turnSimulator = new turnSimulator_1.TurnSimulator();
    var definitionProvider = new definitionProvider_1.DefinitionProvider();
    return function () {
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
                    return [4 /*yield*/, effects_1.fork(phaseTimer_1.phaseTimer)];
                case 2:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(announcement_1.announcement)];
                case 3:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(gamePhase_1.gamePhase)];
                case 4:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(sellPiece_1.sellPiece)];
                case 5:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(closeShopOnFirstBuy_1.closeShopOnFirstBuy)];
                case 6:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(dropPiece_1.dropPieceSagaFactory(playerId))];
                case 7:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(evolution_1.evolutionSagaFactory())];
                case 8:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(saga_1.cardShopSagaFactory(definitionProvider, playerId))];
                case 9:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(battleSaga_1.battle, turnSimulator, constants_1.DEFAULT_TURN_COUNT, constants_1.DEFAULT_TURN_DURATION)];
                case 10: return [4 /*yield*/, _a.apply(void 0, [_b.concat([
                            _c.sent()
                        ])])];
                case 11:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    };
};


/***/ }),

/***/ "./src/game/sagas/networking/saga.ts":
/*!*******************************************!*\
  !*** ./src/game/sagas/networking/saga.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.networking = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var io = __webpack_require__(/*! socket.io-client */ "../../node_modules/socket.io-client/lib/index.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "../../node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actions_1 = __webpack_require__(/*! ../../store/actions */ "./src/game/store/actions.ts");
var playerListActions_1 = __webpack_require__(/*! ../../features/playerList/playerListActions */ "./src/game/features/playerList/playerListActions.ts");
var log_1 = __webpack_require__(/*! ../../../log */ "./src/log.ts");
var battleEventChannel_1 = __webpack_require__(/*! @creature-chess/shared/match/combat/battleEventChannel */ "../shared/match/combat/battleEventChannel.ts");
var incoming_packet_registry_1 = __webpack_require__(/*! @creature-chess/shared/networking/incoming-packet-registry */ "../shared/networking/incoming-packet-registry.ts");
var server_to_client_1 = __webpack_require__(/*! @creature-chess/shared/networking/server-to-client */ "../shared/networking/server-to-client.ts");
var outgoing_packet_registry_1 = __webpack_require__(/*! @creature-chess/shared/networking/outgoing-packet-registry */ "../shared/networking/outgoing-packet-registry.ts");
var client_to_server_1 = __webpack_require__(/*! @creature-chess/shared/networking/client-to-server */ "../shared/networking/client-to-server.ts");
var networking_1 = __webpack_require__(/*! @creature-chess/shared/networking */ "../shared/networking/index.ts");
var actions_2 = __webpack_require__(/*! @creature-chess/shared/player/actions */ "../shared/player/actions.ts");
var auth0_1 = __webpack_require__(/*! ../../../auth/auth0 */ "./src/auth/auth0.ts");
var nickname_1 = __webpack_require__(/*! @creature-chess/shared/validation/nickname */ "../shared/validation/nickname.ts");
var gameInfo_1 = __webpack_require__(/*! @creature-chess/shared/player/gameInfo */ "../shared/player/gameInfo/index.ts");
var cardShop_1 = __webpack_require__(/*! @creature-chess/shared/player/cardShop */ "../shared/player/cardShop/index.ts");
var boardActions_1 = __webpack_require__(/*! @creature-chess/shared/board/actions/boardActions */ "../shared/board/actions/boardActions.ts");
var benchActions_1 = __webpack_require__(/*! @creature-chess/shared/player/bench/benchActions */ "../shared/player/bench/benchActions.ts");
var level_1 = __webpack_require__(/*! @creature-chess/shared/player/level */ "../shared/player/level/index.ts");
var auth_1 = __webpack_require__(/*! ../../../auth */ "./src/auth/index.ts");
var uiActions_1 = __webpack_require__(/*! ../../../store/actions/uiActions */ "./src/store/actions/uiActions.ts");
var actions_3 = __webpack_require__(/*! ../../../lobby/store/actions */ "./src/lobby/store/actions.ts");
var getSocket = function (serverIP, idToken, nickname) {
    // force to websocket for now until CORS is sorted
    var socket = io(serverIP, {
        transports: ["websocket", "xhr-polling"],
        reconnectionAttempts: 15,
        reconnectionDelay: 100,
        reconnectionDelayMax: 1000
    });
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
        socket.on("reconnect_failed", function () {
            emit(uiActions_1.clearAnnouncement());
            emit(uiActions_1.updateConnectionStatus(networking_1.ConnectionStatus.DISCONNECTED));
        });
        socket.on("reconnect_error", function () {
            emit(uiActions_1.clearAnnouncement());
            emit(uiActions_1.updateConnectionStatus(networking_1.ConnectionStatus.DISCONNECTED));
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
            emit(uiActions_1.updateConnectionStatus(networking_1.ConnectionStatus.CONNECTED));
            emit(gameInfo_1.gamePhaseUpdate(packet));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.LEVEL_UPDATE, function (packet) {
            log_1.log("[LEVEL_UPDATE]", packet);
            emit(level_1.setLevelAction(packet.level, packet.xp));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.LOBBY_PLAYER_UPDATE, function (packet) {
            log_1.log("[LOBBY_PLAYER_UPDATE]", packet);
            emit(actions_3.updateLobbyPlayerAction(packet.index, packet.player));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.JOIN_GAME, function (packet) {
            if (packet.type === "lobby") {
                var _a = packet.payload, playerId = _a.playerId, lobbyId = _a.lobbyId, players = _a.players, startTimestamp = _a.startTimestamp;
                emit(actions_3.joinLobbyAction(playerId, lobbyId, players, startTimestamp));
            }
            if (packet.type === "game") {
                var id = packet.payload.id;
                emit(actions_1.joinCompleteAction(id));
                var _b = packet.payload.fullState, money = _b.money, cards = _b.cards, players = _b.players, _c = _b.level, level = _c.level, xp = _c.xp, board = _b.board, bench = _b.bench, phase = _b.phase;
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
                    emit(uiActions_1.updateConnectionStatus(networking_1.ConnectionStatus.RECONNECTED));
                }
            }
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.FINISH_GAME, function (packet) {
            log_1.log("[FINISH_GAME]", packet);
            emit(actions_1.finishGameAction(packet.winnerName));
            socket.close();
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE, function (packet) {
            log_1.log("[SHOP_LOCK_UPDATE]", packet);
            emit(gameInfo_1.shopLockUpdated(packet.locked));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.PLAYERS_RESURRECTED, function (_a) {
            var playerIds = _a.playerIds;
            emit(actions_1.playersResurrected(playerIds));
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
                return [4 /*yield*/, effects_1.takeEvery(actions_2.PlayerActionTypesArray, function (action) {
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
    var action, state, idToken, socket, chosenNickname, e_1, nickname, error, nickname, error, outgoingRegistry, incomingRegistry;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.take(actions_1.FIND_GAME)];
            case 1:
                action = _a.sent();
                return [4 /*yield*/, effects_1.select()];
            case 2:
                state = _a.sent();
                // this should never happen, but it doesn't hurt to be safe
                if (!auth_1.AuthSelectors.isLoggedIn(state)) {
                    auth0_1.signIn();
                    return [2 /*return*/];
                }
                idToken = auth_1.AuthSelectors.getIdToken(state);
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
                return [4 /*yield*/, effects_1.put(actions_3.requestNickname("You must choose a unique nickname before you can play!"))];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                if (!(chosenNickname === null)) return [3 /*break*/, 13];
                return [4 /*yield*/, effects_1.take(actions_3.NICKNAME_CHOSEN)];
            case 9:
                nickname = (_a.sent()).payload.nickname;
                error = nickname_1.validateNickname(nickname);
                if (!error) return [3 /*break*/, 11];
                return [4 /*yield*/, effects_1.put(actions_3.requestNickname(error))];
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
                return [4 /*yield*/, effects_1.put(actions_3.requestNickname("Error: " + e_1.error))];
            case 15:
                _a.sent();
                _a.label = 16;
            case 16:
                if (!(chosenNickname === null)) return [3 /*break*/, 21];
                return [4 /*yield*/, effects_1.take(actions_3.NICKNAME_CHOSEN)];
            case 17:
                nickname = (_a.sent()).payload.nickname;
                error = nickname_1.validateNickname(nickname);
                if (!error) return [3 /*break*/, 19];
                return [4 /*yield*/, effects_1.put(actions_3.requestNickname(error))];
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
                return [4 /*yield*/, effects_1.put(uiActions_1.updateConnectionStatus(networking_1.ConnectionStatus.CONNECTED))];
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

/***/ "./src/game/store/actions.ts":
/*!***********************************!*\
  !*** ./src/game/store/actions.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.finishGameAction = exports.playersResurrected = exports.joinGameError = exports.joinCompleteAction = exports.findGameAction = exports.FINISH_GAME = exports.PLAYERS_RESURRECTED = exports.JOIN_ERROR = exports.JOIN_COMPLETE = exports.FIND_GAME = void 0;
exports.FIND_GAME = "FIND_GAME";
exports.JOIN_COMPLETE = "JOIN_COMPLETE";
exports.JOIN_ERROR = "JOIN_ERROR";
exports.PLAYERS_RESURRECTED = "PLAYERS_RESURRECTED";
exports.FINISH_GAME = "FINISH_GAME";
exports.findGameAction = function (serverIP) { return ({
    type: exports.FIND_GAME,
    payload: {
        serverIP: serverIP
    }
}); };
exports.joinCompleteAction = function (gameId) { return ({
    type: exports.JOIN_COMPLETE,
    payload: {
        gameId: gameId
    }
}); };
exports.joinGameError = function (error) { return ({
    type: exports.JOIN_ERROR,
    payload: {
        error: error
    }
}); };
exports.playersResurrected = function (playerIds) { return ({
    type: exports.PLAYERS_RESURRECTED,
    payload: {
        playerIds: playerIds
    }
}); };
exports.finishGameAction = function (winnerName) { return ({
    type: exports.FINISH_GAME,
    payload: {
        winnerName: winnerName
    }
}); };


/***/ }),

/***/ "./src/game/store/index.ts":
/*!*********************************!*\
  !*** ./src/game/store/index.ts ***!
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
var reducer_1 = __webpack_require__(/*! ./reducer */ "./src/game/store/reducer.ts");
__createBinding(exports, reducer_1, "reducer");


/***/ }),

/***/ "./src/game/store/reducer.ts":
/*!***********************************!*\
  !*** ./src/game/store/reducer.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.reducer = exports.initialState = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var actions_1 = __webpack_require__(/*! ./actions */ "./src/game/store/actions.ts");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/src/index.ts");
var gameInfo_1 = __webpack_require__(/*! @creature-chess/shared/player/gameInfo */ "../shared/player/gameInfo/index.ts");
exports.initialState = {
    id: null,
    round: null
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case actions_1.JOIN_COMPLETE:
            return tslib_1.__assign(tslib_1.__assign({}, state), { id: action.payload.gameId });
        case gameInfo_1.GAME_PHASE_UPDATE:
            if (action.payload.phase === models_1.GamePhase.PREPARING) {
                return tslib_1.__assign(tslib_1.__assign({}, state), { round: action.payload.payload.round });
            }
            return state;
        default:
            return state;
    }
}
exports.reducer = reducer;


/***/ }),

/***/ "./src/game/use-window-size.ts":
/*!*************************************!*\
  !*** ./src/game/use-window-size.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.useWindowSize = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var react_1 = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
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

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var ReactDOM = __webpack_require__(/*! react-dom */ "../../node_modules/react-dom/index.js");
__webpack_require__(/*! pepjs */ "../../node_modules/pepjs/dist/pep.js");
__webpack_require__(/*! ./display/style/index.scss */ "./src/display/style/index.scss");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "../../node_modules/react-router-dom/esm/react-router-dom.js");
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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
var countdown_1 = __webpack_require__(/*! ../display/countdown */ "./src/display/countdown.tsx");
var footer_1 = __webpack_require__(/*! ../display/footer */ "./src/display/footer.tsx");
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
            React.createElement("div", { className: "players" }, players.map(function (p) { return (React.createElement("div", { className: "player" + (p.isBot ? " bot" : "") },
                React.createElement("span", null, p.name))); })),
            React.createElement("div", { className: "text" },
                lobbyStartingAtMs
                    && (React.createElement(countdown_1.Countdown, { countdownToSeconds: lobbyStartingAtMs / 1000, render: countdownRender })),
                React.createElement("h2", { className: "lobby-id" },
                    "Lobby ID: ",
                    lobbyId),
                React.createElement("p", null,
                    "The game will start ",
                    constants_1.LOBBY_WAIT_TIME,
                    " seconds after the lobby is created, or immediately when there are ",
                    constants_1.MAX_PLAYERS_IN_GAME,
                    " players"))),
        React.createElement(footer_1.Footer, null)));
};
exports.LobbyPage = LobbyPage;


/***/ }),

/***/ "./src/lobby/store/actions.ts":
/*!************************************!*\
  !*** ./src/lobby/store/actions.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.nicknameChosen = exports.requestNickname = exports.updateLobbyPlayerAction = exports.joinLobbyAction = exports.NICKNAME_CHOSEN = exports.REQUEST_NICKNAME = exports.UPDATE_LOBBY_PLAYER = exports.JOIN_LOBBY = void 0;
exports.JOIN_LOBBY = "JOIN_LOBBY";
exports.UPDATE_LOBBY_PLAYER = "UPDATE_LOBBY_PLAYER";
exports.REQUEST_NICKNAME = "REQUEST_NICKNAME";
exports.NICKNAME_CHOSEN = "NICKNAME_CHOSEN";
exports.joinLobbyAction = function (localPlayerId, lobbyId, players, startTimestamp) { return ({
    type: exports.JOIN_LOBBY,
    payload: {
        localPlayerId: localPlayerId,
        lobbyId: lobbyId,
        players: players,
        startTimestamp: startTimestamp
    }
}); };
exports.updateLobbyPlayerAction = function (index, player) { return ({
    type: exports.UPDATE_LOBBY_PLAYER,
    payload: {
        index: index,
        player: player
    }
}); };
exports.requestNickname = function (reason) { return ({ type: exports.REQUEST_NICKNAME, payload: { reason: reason } }); };
exports.nicknameChosen = function (nickname) { return ({ type: exports.NICKNAME_CHOSEN, payload: { nickname: nickname } }); };


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

exports.__esModule = true;
exports.reducer = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var actions_1 = __webpack_require__(/*! ./actions */ "./src/lobby/store/actions.ts");
var initialState = {
    lobbyId: null,
    localPlayerId: null,
    players: [],
    startingAtMs: null,
    requestNicknameMessage: null
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_1.REQUEST_NICKNAME: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { requestNicknameMessage: action.payload.reason });
        }
        case actions_1.JOIN_LOBBY:
            return tslib_1.__assign(tslib_1.__assign({}, state), { lobbyId: action.payload.lobbyId, localPlayerId: action.payload.localPlayerId, players: action.payload.players, startingAtMs: action.payload.startTimestamp });
        case actions_1.UPDATE_LOBBY_PLAYER:
            var cloned = tslib_1.__assign(tslib_1.__assign({}, state), { players: tslib_1.__spread(state.players) });
            cloned.players[action.payload.index] = action.payload.player;
            return cloned;
        default:
            return state;
    }
}
exports.reducer = reducer;


/***/ }),

/***/ "./src/log.ts":
/*!********************!*\
  !*** ./src/log.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.log = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
// tslint:disable:no-console
exports.log = function (message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    return console.log.apply(console, tslib_1.__spread([message], optionalParams));
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
var nicknameRequestPage_1 = __webpack_require__(/*! ./nicknameRequestPage */ "./src/menu/nicknameRequestPage.tsx");
__createBinding(exports, nicknameRequestPage_1, "NicknameRequestPage");


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
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var use_http_1 = __webpack_require__(/*! use-http */ "../../node_modules/use-http/dist/esm/index.js");
var LeaderboardContents = function (_a) {
    var data = _a.data;
    return (React.createElement("table", { className: "leaderboard" },
        React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("td", null, "Player"),
                React.createElement("td", null, "Wins"))),
        React.createElement("tbody", null, data.map(function (_a, index) {
            var wins = _a.wins, name = _a.name;
            return (React.createElement("tr", { key: index + "-" + name },
                React.createElement("td", null, name),
                React.createElement("td", null, wins)));
        }))));
};
var Leaderboard = function () {
    var _a = use_http_1["default"]("https://cc-server-info.herokuapp.com/leaderboard", {}, []), loading = _a.loading, error = _a.error, _b = _a.data, data = _b === void 0 ? [] : _b;
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

exports.__esModule = true;
exports.MenuPage = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var actions_1 = __webpack_require__(/*! ../game/store/actions */ "./src/game/store/actions.ts");
var get_url_parameter_1 = __webpack_require__(/*! ./get-url-parameter */ "./src/menu/get-url-parameter.ts");
var auth0_1 = __webpack_require__(/*! ../auth/auth0 */ "./src/auth/auth0.ts");
var footer_1 = __webpack_require__(/*! ../display/footer */ "./src/display/footer.tsx");
var leaderboard_1 = __webpack_require__(/*! ./leaderboard */ "./src/menu/leaderboard.tsx");
var uiActions_1 = __webpack_require__(/*! ../store/actions/uiActions */ "./src/store/actions/uiActions.ts");
var loading_1 = __webpack_require__(/*! ../display/loading */ "./src/display/loading.tsx");
var PlayerInfo = function () {
    return (React.createElement("div", { className: "player-info" },
        React.createElement("span", { className: "welcome" }, "Logged in"),
        React.createElement("button", { className: "sign-out", onClick: auth0_1.signOut }, "Log out")));
};
var MenuPageUnconnected = /** @class */ (function (_super) {
    tslib_1.__extends(MenuPageUnconnected, _super);
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
            serverIP: serverParam || "https://cc-server.jamesmonger.com"
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
            React.createElement(leaderboard_1.Leaderboard, null),
            React.createElement("div", { className: "segment" },
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
    enableDebugMode: function () { return dispatch(uiActions_1.enableDebugMode()); },
    setError: function (error) { return dispatch(actions_1.joinGameError(error)); }
}); };
var MenuPage = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MenuPageUnconnected);
exports.MenuPage = MenuPage;


/***/ }),

/***/ "./src/menu/nicknameRequestPage.tsx":
/*!******************************************!*\
  !*** ./src/menu/nicknameRequestPage.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.NicknameRequestPage = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var React = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
var constants_1 = __webpack_require__(/*! @creature-chess/models/src/constants */ "../models/src/constants.ts");
var actions_1 = __webpack_require__(/*! ../lobby/store/actions */ "./src/lobby/store/actions.ts");
var NicknameRequestPage = function (_a) {
    var message = _a.message;
    var dispatch = react_redux_1.useDispatch();
    var _b = tslib_1.__read(React.useState(""), 2), nickname = _b[0], setNickname = _b[1];
    var onNameChange = function (event) { return setNickname(event.target.value); };
    var onClick = function () { return dispatch(actions_1.nicknameChosen(nickname)); };
    return (React.createElement("div", { className: "menu" },
        React.createElement("div", { className: "join-game" },
            React.createElement("p", null, message),
            React.createElement("h2", { className: "nickname-warning" }, "This nickname is permanent and cannot be changed"),
            React.createElement("h2", { className: "nickname-warning" }, "All player accounts have been reset. Please feel free to choose a new name!"),
            React.createElement("input", { value: nickname, onChange: onNameChange, maxLength: constants_1.MAX_NAME_LENGTH, placeholder: "Nickname", className: "name-input" }),
            React.createElement("div", { className: "join-options" },
                React.createElement("div", { className: "option" },
                    React.createElement("button", { onClick: onClick, className: "option-button primary" }, "Choose nickname"))))));
};
exports.NicknameRequestPage = NicknameRequestPage;


/***/ }),

/***/ "./src/store/actions/uiActions.ts":
/*!****************************************!*\
  !*** ./src/store/actions/uiActions.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.updateConnectionStatus = exports.enableDebugMode = exports.clearAnnouncement = exports.updateAnnouncement = exports.closeOverlay = exports.openOverlay = exports.UPDATE_CONNECTION_STATUS = exports.ENABLE_DEBUG_MODE = exports.CLEAR_ANNOUNCEMENT = exports.UPDATE_ANNOUNCEMENT = exports.CLOSE_OVERLAY = exports.OPEN_OVERLAY = void 0;
exports.OPEN_OVERLAY = "OPEN_OVERLAY";
exports.CLOSE_OVERLAY = "CLOSE_OVERLAY";
exports.UPDATE_ANNOUNCEMENT = "UPDATE_ANNOUNCEMENT";
exports.CLEAR_ANNOUNCEMENT = "CLEAR_ANNOUNCEMENT";
exports.ENABLE_DEBUG_MODE = "ENABLE_DEBUG_MODE";
exports.UPDATE_CONNECTION_STATUS = "UPDATE_CONNECTION_STATUS";
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
var reselect_1 = __webpack_require__(/*! reselect */ "../../node_modules/reselect/es/index.js");
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
var reselect_1 = __webpack_require__(/*! reselect */ "../../node_modules/reselect/es/index.js");
exports.getPlayers = function (state) { return state.playerList; };
exports.getPlayerById = function (id) {
    return reselect_1.createSelector(exports.getPlayers, function (players) { return players.find(function (p) { return p.id === id; }) || null; });
};


/***/ }),

/***/ "./src/store/reducers/index.ts":
/*!*************************************!*\
  !*** ./src/store/reducers/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.reducers = void 0;
var board_1 = __webpack_require__(/*! @creature-chess/shared/board */ "../shared/board/index.ts");
var bench_1 = __webpack_require__(/*! @creature-chess/shared/player/bench */ "../shared/player/bench/index.ts");
var cardShop_1 = __webpack_require__(/*! @creature-chess/shared/player/cardShop */ "../shared/player/cardShop/index.ts");
var gameInfo_1 = __webpack_require__(/*! @creature-chess/shared/player/gameInfo */ "../shared/player/gameInfo/index.ts");
var playerListReducer_1 = __webpack_require__(/*! ../../game/features/playerList/playerListReducer */ "./src/game/features/playerList/playerListReducer.ts");
var uiReducer_1 = __webpack_require__(/*! ./uiReducer */ "./src/store/reducers/uiReducer.ts");
var level_1 = __webpack_require__(/*! @creature-chess/shared/player/level */ "../shared/player/level/index.ts");
var auth_1 = __webpack_require__(/*! ../../auth */ "./src/auth/index.ts");
var lobby_1 = __webpack_require__(/*! ../../lobby */ "./src/lobby/index.ts");
var game_1 = __webpack_require__(/*! ../../game */ "./src/game/index.ts");
exports.reducers = {
    board: board_1.boardReducer,
    bench: bench_1.benchReducer,
    lobby: lobby_1.lobbyReducer,
    playerList: playerListReducer_1.playerList,
    cards: cardShop_1.cardsReducer,
    gameInfo: gameInfo_1.gameInfoReducer,
    level: level_1.levelReducer,
    game: game_1.gameReducer,
    auth: auth_1.authReducer,
    ui: uiReducer_1.ui
};


/***/ }),

/***/ "./src/store/reducers/uiReducer.ts":
/*!*****************************************!*\
  !*** ./src/store/reducers/uiReducer.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ui = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var uiActions_1 = __webpack_require__(/*! ../actions/uiActions */ "./src/store/actions/uiActions.ts");
var actions_1 = __webpack_require__(/*! ../../game/features/board/actions */ "./src/game/features/board/actions.ts");
var actions_2 = __webpack_require__(/*! ../../game/store/actions */ "./src/game/store/actions.ts");
var networking_1 = __webpack_require__(/*! @creature-chess/shared/networking */ "../shared/networking/index.ts");
var initialState = {
    loading: false,
    currentOverlay: null,
    selectedPieceId: null,
    winnerName: null,
    mainAnnouncement: null,
    subAnnouncement: null,
    menuError: null,
    debug: false,
    connectionStatus: networking_1.ConnectionStatus.NOT_CONNECTED
};
function ui(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_2.FIND_GAME:
            return tslib_1.__assign(tslib_1.__assign({}, state), { loading: true });
        case uiActions_1.UPDATE_CONNECTION_STATUS:
            return tslib_1.__assign(tslib_1.__assign({}, state), { connectionStatus: action.payload.status });
        case uiActions_1.ENABLE_DEBUG_MODE: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { debug: true });
        }
        case uiActions_1.OPEN_OVERLAY: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { currentOverlay: action.payload.overlay });
        }
        case uiActions_1.CLOSE_OVERLAY: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { currentOverlay: null });
        }
        case actions_1.SELECT_PIECE: {
            var isSamePiece = state.selectedPieceId && state.selectedPieceId === action.payload.id;
            return tslib_1.__assign(tslib_1.__assign({}, state), { selectedPieceId: isSamePiece ? null : action.payload.id });
        }
        case actions_1.CLEAR_SELECTED_PIECE: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { selectedPieceId: null });
        }
        case actions_2.FINISH_GAME: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { winnerName: action.payload.winnerName });
        }
        case uiActions_1.UPDATE_ANNOUNCEMENT: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { mainAnnouncement: action.payload.main, subAnnouncement: action.payload.sub });
        }
        case uiActions_1.CLEAR_ANNOUNCEMENT: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { mainAnnouncement: null, subAnnouncement: null });
        }
        case actions_2.JOIN_ERROR:
            return tslib_1.__assign(tslib_1.__assign({}, state), { loading: false, menuError: action.payload.error });
        case actions_2.JOIN_COMPLETE:
            return tslib_1.__assign(tslib_1.__assign({}, state), { loading: false, menuError: null });
        default:
            return state;
    }
}
exports.ui = ui;


/***/ }),

/***/ "./src/store/saga.ts":
/*!***************************!*\
  !*** ./src/store/saga.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.rootSaga = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var auth_1 = __webpack_require__(/*! ../auth */ "./src/auth/index.ts");
var saga_1 = __webpack_require__(/*! ../game/sagas/networking/saga */ "./src/game/sagas/networking/saga.ts");
var game_1 = __webpack_require__(/*! ../game */ "./src/game/index.ts");
var actions_1 = __webpack_require__(/*! ../game/store/actions */ "./src/game/store/actions.ts");
exports.rootSaga = function () {
    var _a, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = effects_1.all;
                return [4 /*yield*/, effects_1.fork(auth_1.authSaga)];
            case 1:
                _b = [
                    _c.sent()
                ];
                return [4 /*yield*/, effects_1.fork(saga_1.networking)];
            case 2:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.takeEvery(actions_1.JOIN_COMPLETE, function () {
                        var user;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.select(function (state) { return state.auth.user; })];
                                case 1:
                                    user = _a.sent();
                                    return [4 /*yield*/, effects_1.fork(game_1.gameSagaFactory(user.id))];
                                case 2:
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

/***/ "./src/store/store.ts":
/*!****************************!*\
  !*** ./src/store/store.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.store = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.js");
var redux_1 = __webpack_require__(/*! redux */ "../../node_modules/redux/es/redux.js");
var reducers_1 = __webpack_require__(/*! ./reducers */ "./src/store/reducers/index.ts");
var redux_devtools_extension_1 = __webpack_require__(/*! redux-devtools-extension */ "../../node_modules/redux-devtools-extension/index.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "../../node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var saga_1 = __webpack_require__(/*! ./saga */ "./src/store/saga.ts");
var sagaMiddleware = redux_saga_1["default"]();
var store = redux_1.createStore(redux_1.combineReducers(tslib_1.__assign({}, reducers_1.reducers)), redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(sagaMiddleware)));
exports.store = store;
sagaMiddleware.run(saga_1.rootSaga);


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