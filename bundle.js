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
/******/ 			if(installedChunks[chunkId]) {
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

/***/ "./src/app/board/bench.tsx":
/*!*********************************!*\
  !*** ./src/app/board/bench.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var benchTile_1 = __webpack_require__(/*! ./tile/benchTile */ "./src/app/board/tile/benchTile.tsx");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var Bench = function () {
    var tiles = [];
    for (var x = 0; x < _common_1.Constants.GRID_SIZE; x++) {
        tiles.push(React.createElement(benchTile_1.BenchTile, { key: "tile-" + x, slot: x }));
    }
    return (React.createElement("div", { className: "tile-row" }, tiles));
};
exports.Bench = Bench;


/***/ }),

/***/ "./src/app/board/benchPiece/benchPiece.tsx":
/*!*************************************************!*\
  !*** ./src/app/board/benchPiece/benchPiece.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var recompose_1 = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var benchPieceDragDrop_1 = __webpack_require__(/*! ./benchPieceDragDrop */ "./src/app/board/benchPiece/benchPieceDragDrop.ts");
var benchPieceUnconnected_1 = __webpack_require__(/*! ./benchPieceUnconnected */ "./src/app/board/benchPiece/benchPieceUnconnected.tsx");
var mapStateToProps = function (state) { return ({
    canDrag: true
}); };
var BenchPiece = recompose_1.compose(react_redux_1.connect(mapStateToProps), benchPieceDragDrop_1.benchPieceDragSource)(benchPieceUnconnected_1.BenchPieceUnconnected);
exports.BenchPiece = BenchPiece;


/***/ }),

/***/ "./src/app/board/benchPiece/benchPieceDragDrop.ts":
/*!********************************************************!*\
  !*** ./src/app/board/benchPiece/benchPieceDragDrop.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/lib/cjs/index.js");
var benchPieceUnconnected_1 = __webpack_require__(/*! ./benchPieceUnconnected */ "./src/app/board/benchPiece/benchPieceUnconnected.tsx");
var selectedPiece = {
    beginDrag: function (props) {
        return props.piece;
    },
    isDragging: function (props, monitor) {
        return props.piece === monitor.getItem();
    },
    canDrag: function (props) {
        return props.canDrag;
    }
};
var collect = function (connectToDragSource, monitor) { return ({
    connectDragSource: connectToDragSource.dragSource(),
    isDragging: monitor.isDragging()
}); };
exports.benchPieceDragSource = react_dnd_1.DragSource(typeof benchPieceUnconnected_1.BenchPieceUnconnected, selectedPiece, collect);


/***/ }),

/***/ "./src/app/board/benchPiece/benchPieceUnconnected.tsx":
/*!************************************************************!*\
  !*** ./src/app/board/benchPiece/benchPieceUnconnected.tsx ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var creatureImage_1 = __webpack_require__(/*! ../../components/creatureImage */ "./src/app/components/creatureImage.tsx");
var BenchPieceUnconnected = /** @class */ (function (_super) {
    tslib_1.__extends(BenchPieceUnconnected, _super);
    function BenchPieceUnconnected() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BenchPieceUnconnected.prototype.render = function () {
        var _a = this.props, piece = _a.piece, connectDragSource = _a.connectDragSource;
        var definitionId = piece.definitionId, stage = piece.stage;
        return connectDragSource(React.createElement("div", { className: "piece" },
            React.createElement(creatureImage_1.CreatureImage, { definitionId: definitionId, stage: stage })));
    };
    return BenchPieceUnconnected;
}(React.Component));
exports.BenchPieceUnconnected = BenchPieceUnconnected;


/***/ }),

/***/ "./src/app/board/board.tsx":
/*!*********************************!*\
  !*** ./src/app/board/board.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var boardRow_1 = __webpack_require__(/*! ./boardRow */ "./src/app/board/boardRow.tsx");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var Board = function (props) {
    var rows = [];
    for (var y = 0; y < _common_1.Constants.GRID_SIZE; y++) {
        rows.push(React.createElement(boardRow_1.BoardRow, { key: "tile-row-" + y, y: y }));
    }
    return (React.createElement(React.Fragment, null, rows));
};
exports.Board = Board;


/***/ }),

/***/ "./src/app/board/boardPiece/boardPiece.tsx":
/*!*************************************************!*\
  !*** ./src/app/board/boardPiece/boardPiece.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var recompose_1 = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gameSelector_1 = __webpack_require__(/*! ../../store/gameSelector */ "./src/app/store/gameSelector.ts");
var boardPieceDragDrop_1 = __webpack_require__(/*! ./boardPieceDragDrop */ "./src/app/board/boardPiece/boardPieceDragDrop.ts");
var boardPieceUnconnected_1 = __webpack_require__(/*! ./boardPieceUnconnected */ "./src/app/board/boardPiece/boardPieceUnconnected.tsx");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var mapStateToProps = function (state) { return ({
    canDrag: state.game.phase === _common_1.GamePhase.PREPARING,
    showDamagePerTurn: state.game.phase === _common_1.GamePhase.PREPARING,
    showHealthbar: state.game.phase === _common_1.GamePhase.READY || state.game.phase === _common_1.GamePhase.PLAYING,
    animate: state.game.debug === false,
    localPlayerId: gameSelector_1.localPlayerIdSelector(state)
}); };
var BoardPiece = recompose_1.compose(react_redux_1.connect(mapStateToProps), boardPieceDragDrop_1.boardPieceDragSource)(boardPieceUnconnected_1.BoardPieceUnconnected);
exports.BoardPiece = BoardPiece;


/***/ }),

/***/ "./src/app/board/boardPiece/boardPieceDragDrop.ts":
/*!********************************************************!*\
  !*** ./src/app/board/boardPiece/boardPieceDragDrop.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/lib/cjs/index.js");
var boardPieceProps_1 = __webpack_require__(/*! ./boardPieceProps */ "./src/app/board/boardPiece/boardPieceProps.ts");
var boardPieceUnconnected_1 = __webpack_require__(/*! ./boardPieceUnconnected */ "./src/app/board/boardPiece/boardPieceUnconnected.tsx");
var selectedPiece = {
    beginDrag: function (props) {
        return props.piece;
    },
    isDragging: function (props, monitor) {
        return props.piece === monitor.getItem();
    },
    canDrag: function (props, monitor) {
        return props.canDrag && boardPieceProps_1.isFriendly(props);
    }
};
var collect = function (connectToDragSource, monitor) { return ({
    connectDragSource: connectToDragSource.dragSource(),
    isDragging: monitor.isDragging()
}); };
exports.boardPieceDragSource = react_dnd_1.DragSource(typeof boardPieceUnconnected_1.BoardPieceUnconnected, selectedPiece, collect);


/***/ }),

/***/ "./src/app/board/boardPiece/boardPieceProps.ts":
/*!*****************************************************!*\
  !*** ./src/app/board/boardPiece/boardPieceProps.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.isFriendly = function (props) { return props.localPlayerId === props.piece.ownerId; };


/***/ }),

/***/ "./src/app/board/boardPiece/boardPieceUnconnected.tsx":
/*!************************************************************!*\
  !*** ./src/app/board/boardPiece/boardPieceUnconnected.tsx ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var progressBar_1 = __webpack_require__(/*! ../../components/progressBar */ "./src/app/components/progressBar.tsx");
var animation_1 = __webpack_require__(/*! ../../components/animation */ "./src/app/components/animation.ts");
var creatureImage_1 = __webpack_require__(/*! ../../components/creatureImage */ "./src/app/components/creatureImage.tsx");
var boardPieceProps_1 = __webpack_require__(/*! ./boardPieceProps */ "./src/app/board/boardPiece/boardPieceProps.ts");
var shared_1 = __webpack_require__(/*! ../../../shared */ "./src/shared/index.ts");
var dyingAnimation = "dying";
var BoardPieceUnconnected = /** @class */ (function (_super) {
    tslib_1.__extends(BoardPieceUnconnected, _super);
    function BoardPieceUnconnected() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currentAnimations: [],
            dead: _this.props.piece.currentHealth === 0
        };
        _this.runAnimations = function (oldProps) {
            var _a = _this.props.piece, moving = _a.moving, attacking = _a.attacking, hit = _a.hit, celebrating = _a.celebrating, currentHealth = _a.currentHealth;
            if (!oldProps.piece.moving && moving) {
                _this.runAnimation("move-" + moving.direction);
            }
            if (!oldProps.piece.attacking && attacking) {
                _this.runAnimation("attack-" + attacking.direction, { attackPower: attacking.damage });
            }
            if (!oldProps.piece.hit && hit) {
                _this.runAnimation("hit", { hitPower: hit.damage });
            }
            if (!oldProps.piece.celebrating && celebrating) {
                _this.runAnimation("celebrate");
            }
            else if (oldProps.piece.celebrating && !celebrating) {
                _this.stopCelebrateAnimation();
            }
            if (oldProps.piece.currentHealth > 0 && currentHealth === 0) {
                if (_this.props.animate === false) {
                    _this.setState({ dead: true });
                }
                else {
                    _this.runAnimation(dyingAnimation);
                }
            }
        };
        _this.runAnimation = function (name, variables) {
            if (_this.props.animate === false) {
                return;
            }
            _this.setState(function (prevState) { return (tslib_1.__assign({}, prevState, { currentAnimations: prevState.currentAnimations.concat([{ name: name, variables: variables }]) })); });
        };
        _this.onAnimationEnd = function (event) {
            var animationName = event.animationName;
            _this.setState(function (prevState) { return (tslib_1.__assign({}, prevState, { currentAnimations: prevState.currentAnimations.filter(function (a) { return a.name !== animationName && !a.name.startsWith("move-"); }).slice() })); });
            if (animationName === dyingAnimation) {
                _this.setState({ dead: true });
            }
        };
        return _this;
    }
    BoardPieceUnconnected.prototype.render = function () {
        if (this.state.dead) {
            return null;
        }
        var _a = this.props, piece = _a.piece, connectDragSource = _a.connectDragSource, showDamagePerTurn = _a.showDamagePerTurn, showHealthbar = _a.showHealthbar;
        var facingAway = piece.facingAway, definitionId = piece.definitionId, currentHealth = piece.currentHealth, maxHealth = piece.maxHealth, coolDown = piece.coolDown;
        var currentAnimations = this.state.currentAnimations;
        var friendly = boardPieceProps_1.isFriendly(this.props);
        return connectDragSource(React.createElement("div", { className: "piece " + currentAnimations.map(function (a) { return a.name; }).join(" "), 
            // tslint:disable-next-line: jsx-ban-props
            style: animation_1.getAnimationCssVariables(currentAnimations), onAnimationEnd: this.onAnimationEnd },
            React.createElement(creatureImage_1.CreatureImage, { definitionId: definitionId, stage: piece.stage, facing: facingAway ? "back" : "front" }),
            showDamagePerTurn
                && piece.damagePerTurn !== null
                && React.createElement("div", { className: "damage-per-turn" },
                    piece.damagePerTurn.toFixed(0),
                    " dpt"),
            showHealthbar
                && (React.createElement("div", { className: "info" },
                    React.createElement(progressBar_1.ProgressBar, { className: "healthbar " + (friendly ? "friendly" : "enemy"), current: currentHealth, max: maxHealth }),
                    React.createElement(progressBar_1.ProgressBar, { className: "cooldownbar", current: coolDown, max: shared_1.Constants.INITIAL_COOLDOWN })))));
    };
    BoardPieceUnconnected.prototype.componentDidUpdate = function (oldProps) {
        this.runAnimations(oldProps);
        if (this.state.dead && this.props.piece.currentHealth > 0) {
            this.setState({ dead: false });
        }
    };
    BoardPieceUnconnected.prototype.componentDidMount = function () {
        var _a = this.props.piece, moving = _a.moving, attacking = _a.attacking, hit = _a.hit, celebrating = _a.celebrating, piece = tslib_1.__rest(_a, ["moving", "attacking", "hit", "celebrating"]);
        this.runAnimations(tslib_1.__assign({}, this.props, { piece: piece }));
    };
    BoardPieceUnconnected.prototype.stopCelebrateAnimation = function () {
        if (this.props.animate === false) {
            return;
        }
        this.setState(function (prevState) { return (tslib_1.__assign({}, prevState, { currentAnimations: prevState.currentAnimations.filter(function (a) { return a.name !== "celebrate"; }) })); });
    };
    return BoardPieceUnconnected;
}(React.Component));
exports.BoardPieceUnconnected = BoardPieceUnconnected;


/***/ }),

/***/ "./src/app/board/boardRow.tsx":
/*!************************************!*\
  !*** ./src/app/board/boardRow.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var position_1 = __webpack_require__(/*! @common/position */ "./src/shared/position.ts");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var boardTile_1 = __webpack_require__(/*! ./tile/boardTile */ "./src/app/board/tile/boardTile.tsx");
var BoardRow = function (_a) {
    var y = _a.y;
    var tiles = [];
    for (var x = 0; x < _common_1.Constants.GRID_SIZE; x++) {
        tiles.push(React.createElement(boardTile_1.BoardTile, { key: "tile-" + x, position: position_1.createTileCoordinates(x, y) }));
    }
    return React.createElement("div", { className: "tile-row" }, tiles);
};
exports.BoardRow = BoardRow;


/***/ }),

/***/ "./src/app/board/tile/benchTile.tsx":
/*!******************************************!*\
  !*** ./src/app/board/tile/benchTile.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var position_1 = __webpack_require__(/*! @common/position */ "./src/shared/position.ts");
var tile_1 = __webpack_require__(/*! ./tile */ "./src/app/board/tile/tile.tsx");
var benchPiece_1 = __webpack_require__(/*! ../benchPiece/benchPiece */ "./src/app/board/benchPiece/benchPiece.tsx");
var renderBenchTilePiece = function (piece) { return React.createElement(benchPiece_1.BenchPiece, { piece: piece, key: piece.id }); };
var BenchTile = function (props) {
    return (React.createElement(tile_1.Tile, { type: position_1.TileType.BENCH, position: position_1.createTileCoordinates(props.slot, null), renderPiece: renderBenchTilePiece }));
};
exports.BenchTile = BenchTile;


/***/ }),

/***/ "./src/app/board/tile/boardTile.tsx":
/*!******************************************!*\
  !*** ./src/app/board/tile/boardTile.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var position_1 = __webpack_require__(/*! @common/position */ "./src/shared/position.ts");
var tile_1 = __webpack_require__(/*! ./tile */ "./src/app/board/tile/tile.tsx");
var boardPiece_1 = __webpack_require__(/*! ../boardPiece/boardPiece */ "./src/app/board/boardPiece/boardPiece.tsx");
var renderBoardTilePiece = function (piece) { return React.createElement(boardPiece_1.BoardPiece, { piece: piece, key: piece.id }); };
var BoardTile = function (props) {
    return (React.createElement(tile_1.Tile, { type: position_1.TileType.BOARD, position: props.position, renderPiece: renderBoardTilePiece }));
};
exports.BoardTile = BoardTile;


/***/ }),

/***/ "./src/app/board/tile/tile.tsx":
/*!*************************************!*\
  !*** ./src/app/board/tile/tile.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var recompose_1 = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var pieceSelectors_1 = __webpack_require__(/*! ../../store/pieceSelectors */ "./src/app/store/pieceSelectors.ts");
var tileDragDrop_1 = __webpack_require__(/*! ./tileDragDrop */ "./src/app/board/tile/tileDragDrop.ts");
var tileUnconnected_1 = __webpack_require__(/*! ./tileUnconnected */ "./src/app/board/tile/tileUnconnected.tsx");
var mapStateToProps = function (state, ownProps) { return ({
    pieces: pieceSelectors_1.tilePieceSelector(state, ownProps),
    gamePhase: state.game.phase,
    belowPieceLimit: pieceSelectors_1.ownedPieceSelector(state).length < state.localPlayer.level
}); };
var mapDispatchToProps = function (dispatch, _a) {
    var type = _a.type, position = _a.position;
    return ({
        onMovePiece: function (piece) { return dispatch(board_1.BoardActions.pieceMoved(piece, position, type)); }
    });
};
var Tile = recompose_1.compose(react_redux_1.connect(mapStateToProps, mapDispatchToProps), tileDragDrop_1.tileDropTarget)(tileUnconnected_1.TileUnconnected);
exports.Tile = Tile;


/***/ }),

/***/ "./src/app/board/tile/tileDragDrop.ts":
/*!********************************************!*\
  !*** ./src/app/board/tile/tileDragDrop.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/lib/cjs/index.js");
var tileUnconnected_1 = __webpack_require__(/*! ./tileUnconnected */ "./src/app/board/tile/tileUnconnected.tsx");
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var boxTarget = {
    drop: function (props, monitor) {
        props.onMovePiece(monitor.getItem());
    },
    canDrop: function (props, monitor) {
        var item = monitor.getItem();
        return board_1.canDropPiece(item, props.position, props.pieces, props.gamePhase, props.belowPieceLimit);
    }
};
var collect = function (connector, monitor) { return ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    isDragging: !!(monitor.getItem())
}); };
exports.tileDropTarget = react_dnd_1.DropTarget(typeof tileUnconnected_1.TileUnconnected, boxTarget, collect);


/***/ }),

/***/ "./src/app/board/tile/tileUnconnected.tsx":
/*!************************************************!*\
  !*** ./src/app/board/tile/tileUnconnected.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var position_1 = __webpack_require__(/*! @common/position */ "./src/shared/position.ts");
// tslint:disable-next-line:no-bitwise
var isBoardTileDark = function (_a) {
    var x = _a.x, y = _a.y;
    return ((y ^ x) & 1) !== 0;
};
var getClassName = function (tileType, position) {
    if (tileType === position_1.TileType.BENCH) {
        return "bench";
    }
    return isBoardTileDark(position) ? "dark" : "light";
};
var getOverlayClassName = function (isDragging, canDrop) {
    if (isDragging && canDrop === false) {
        return "overlay not-allowed";
    }
    return "overlay";
};
var TileUnconnected = function (props) {
    var type = props.type, pieces = props.pieces, position = props.position, renderPiece = props.renderPiece, connectDropTarget = props.connectDropTarget, isDragging = props.isDragging, canDrop = props.canDrop;
    return connectDropTarget(React.createElement("div", { className: "tile " + getClassName(type, position) },
        pieces.map(renderPiece),
        React.createElement("div", { className: "" + getOverlayClassName(isDragging, canDrop) })));
};
exports.TileUnconnected = TileUnconnected;


/***/ }),

/***/ "./src/app/cardShop/card.tsx":
/*!***********************************!*\
  !*** ./src/app/cardShop/card.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var creatureImage_1 = __webpack_require__(/*! ../components/creatureImage */ "./src/app/components/creatureImage.tsx");
var definitionProvider_1 = __webpack_require__(/*! @common/game/definitionProvider */ "./src/shared/game/definitionProvider.ts");
var definitionProvider = new definitionProvider_1.DefinitionProvider();
var Card = function (_a) {
    var definitionId = _a.definitionId, cost = _a.cost, name = _a.name, buyable = _a.buyable, onClick = _a.onClick;
    var className = "card " + definitionProvider.get(definitionId).type.toLowerCase() + (buyable ? "" : " not-buyable");
    return (React.createElement("div", { className: className, onClick: buyable ? onClick : undefined },
        React.createElement("div", { className: "header" },
            React.createElement("div", null,
                React.createElement("span", { className: "price" },
                    "$",
                    cost)),
            React.createElement("div", null,
                React.createElement(creatureImage_1.CreatureImage, { definitionId: definitionId, stage: 0 }))),
        React.createElement("div", null, name)));
};
exports.Card = Card;


/***/ }),

/***/ "./src/app/cardShop/cardActionTypes.ts":
/*!*********************************************!*\
  !*** ./src/app/cardShop/cardActionTypes.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.CARDS_UPDATED = "CARDS_UPDATED";
exports.REROLL_CARDS = "REROLL_CARDS";
exports.BUY_CARD = "BUY_CARD";


/***/ }),

/***/ "./src/app/cardShop/cardActions.ts":
/*!*****************************************!*\
  !*** ./src/app/cardShop/cardActions.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var cardActionTypes_1 = __webpack_require__(/*! ./cardActionTypes */ "./src/app/cardShop/cardActionTypes.ts");
exports.cardsUpdated = function (payload) { return ({
    type: cardActionTypes_1.CARDS_UPDATED,
    payload: payload
}); };
exports.rerollCards = function () { return ({
    type: cardActionTypes_1.REROLL_CARDS
}); };
exports.buyCard = function (index) { return ({
    type: cardActionTypes_1.BUY_CARD,
    payload: {
        index: index
    }
}); };


/***/ }),

/***/ "./src/app/cardShop/cardShop.tsx":
/*!***************************************!*\
  !*** ./src/app/cardShop/cardShop.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var fa_1 = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var card_1 = __webpack_require__(/*! ./card */ "./src/app/cardShop/card.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var cardActions_1 = __webpack_require__(/*! ./cardActions */ "./src/app/cardShop/cardActions.ts");
var dropToSell_1 = __webpack_require__(/*! ./dropToSell/dropToSell */ "./src/app/cardShop/dropToSell/dropToSell.tsx");
var CardShopUnconnected = function (props) {
    var cards = props.cards, money = props.money, onReroll = props.onReroll, onBuyCard = props.onBuyCard, canUseShop = props.canUseShop;
    var onCardClick = function (index) {
        return function () { return onBuyCard(index); };
    };
    var createCard = function (card, index) {
        if (card === null) {
            return null;
        }
        return (React.createElement(card_1.Card, { key: index + "-" + card.definitionId, definitionId: card.definitionId, cost: card.cost, name: card.name, buyable: money >= card.cost, onClick: onCardClick(index) }));
    };
    if (canUseShop === false) {
        return null;
    }
    var rerollBuyable = money >= _common_1.Constants.REROLL_COST;
    return (React.createElement("div", { className: "card-selector" },
        React.createElement("div", { className: "balance" },
            React.createElement("span", { className: "item" }, "Balance"),
            React.createElement("span", { className: "item" },
                "$",
                money),
            React.createElement("span", { className: "item" }, "\u00A0|\u00A0"),
            React.createElement("span", { className: "item" },
                React.createElement(fa_1.FaSyncAlt, { onClick: rerollBuyable ? onReroll : undefined, className: "reroll-icon" + (rerollBuyable ? "" : " not-buyable") })),
            React.createElement("span", { className: "item" },
                "($",
                _common_1.Constants.REROLL_COST,
                ")")),
        React.createElement("div", { className: "cards" },
            React.createElement("div", { className: "shop" }, cards.map(createCard)),
            React.createElement(dropToSell_1.DropToSell, null))));
};
var mapStateToProps = function (state) { return ({
    cards: state.cards,
    money: state.game.money,
    canUseShop: state.game.phase !== _common_1.GamePhase.WAITING && state.game.phase !== _common_1.GamePhase.DEAD
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onReroll: function () { return dispatch(cardActions_1.rerollCards()); },
    onBuyCard: function (index) { return dispatch(cardActions_1.buyCard(index)); }
}); };
var CardShop = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CardShopUnconnected);
exports.CardShop = CardShop;


/***/ }),

/***/ "./src/app/cardShop/cardsReducer.ts":
/*!******************************************!*\
  !*** ./src/app/cardShop/cardsReducer.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var cardActionTypes_1 = __webpack_require__(/*! ./cardActionTypes */ "./src/app/cardShop/cardActionTypes.ts");
function cards(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case cardActionTypes_1.CARDS_UPDATED:
            return action.payload;
        default:
            return state;
    }
}
exports.cards = cards;


/***/ }),

/***/ "./src/app/cardShop/dropToSell/dropToSell.tsx":
/*!****************************************************!*\
  !*** ./src/app/cardShop/dropToSell/dropToSell.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var dropToSellDragDrop_1 = __webpack_require__(/*! ./dropToSellDragDrop */ "./src/app/cardShop/dropToSell/dropToSellDragDrop.ts");
var recompose_1 = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
var dropToSellUnconnected_1 = __webpack_require__(/*! ./dropToSellUnconnected */ "./src/app/cardShop/dropToSell/dropToSellUnconnected.tsx");
var mapDispatchToProps = function (dispatch) { return ({
    onDropPiece: function (piece) { return dispatch(board_1.BoardActions.sellPiece(piece.id)); }
}); };
var DropToSell = recompose_1.compose(react_redux_1.connect(null, mapDispatchToProps), dropToSellDragDrop_1.dropToSellDropTarget)(dropToSellUnconnected_1.DropToSellUnconnected);
exports.DropToSell = DropToSell;


/***/ }),

/***/ "./src/app/cardShop/dropToSell/dropToSellDragDrop.ts":
/*!***********************************************************!*\
  !*** ./src/app/cardShop/dropToSell/dropToSellDragDrop.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/lib/cjs/index.js");
var dropToSellUnconnected_1 = __webpack_require__(/*! ./dropToSellUnconnected */ "./src/app/cardShop/dropToSell/dropToSellUnconnected.tsx");
var boxTarget = {
    drop: function (props, monitor) {
        props.onDropPiece(monitor.getItem());
    }
};
var collect = function (connector, monitor) { return ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    isDragging: !!(monitor.getItem())
}); };
exports.dropToSellDropTarget = react_dnd_1.DropTarget(typeof dropToSellUnconnected_1.DropToSellUnconnected, boxTarget, collect);


/***/ }),

/***/ "./src/app/cardShop/dropToSell/dropToSellUnconnected.tsx":
/*!***************************************************************!*\
  !*** ./src/app/cardShop/dropToSell/dropToSellUnconnected.tsx ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var DropToSellUnconnected = function (props) {
    var connectDropTarget = props.connectDropTarget;
    return connectDropTarget(React.createElement("div", { className: "drop-to-sell" },
        React.createElement("span", { className: "drop-to-sell-text" }, "Drop piece here to sell")));
};
exports.DropToSellUnconnected = DropToSellUnconnected;


/***/ }),

/***/ "./src/app/chat/chatActionTypes.ts":
/*!*****************************************!*\
  !*** ./src/app/chat/chatActionTypes.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.SEND_CHAT_MESSAGE = "SEND_CHAT_MESSAGE";


/***/ }),

/***/ "./src/app/chat/chatActions.ts":
/*!*************************************!*\
  !*** ./src/app/chat/chatActions.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var chatActionTypes_1 = __webpack_require__(/*! ./chatActionTypes */ "./src/app/chat/chatActionTypes.ts");
exports.sendChatMessage = function (message) { return ({
    type: chatActionTypes_1.SEND_CHAT_MESSAGE,
    payload: {
        message: message
    }
}); };


/***/ }),

/***/ "./src/app/chat/chatInput.tsx":
/*!************************************!*\
  !*** ./src/app/chat/chatInput.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var chatActions_1 = __webpack_require__(/*! ./chatActions */ "./src/app/chat/chatActions.ts");
var ChatInputUnconnected = function (props) {
    var _a = React.useState(""), message = _a[0], setMessage = _a[1];
    var onSubmit = function (event) {
        event.preventDefault();
        if (!message) {
            return;
        }
        props.onSend(message);
        setMessage("");
    };
    var onChange = function (event) {
        setMessage(event.target.value);
    };
    return (React.createElement("form", { onSubmit: onSubmit, className: "chat-input" },
        React.createElement("input", { className: "text-input", value: message, onChange: onChange }),
        React.createElement("button", { className: "send-button" }, "Send")));
};
var mapDispatchToProps = function (dispatch) { return ({
    onSend: function (message) { return dispatch(chatActions_1.sendChatMessage(message)); }
}); };
var ChatInput = react_redux_1.connect(null, mapDispatchToProps)(ChatInputUnconnected);
exports.ChatInput = ChatInput;


/***/ }),

/***/ "./src/app/components/animation.ts":
/*!*****************************************!*\
  !*** ./src/app/components/animation.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var lodash_1 = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
exports.getAnimationCssVariables = function (animations) {
    var variables = lodash_1.assign.apply(void 0, [{}].concat(animations.filter(function (a) { return a.variables; }).map(function (a) { return a.variables; })));
    return lodash_1.assign.apply(void 0, [{}].concat(lodash_1.keys(variables).map(function (key) {
        var _a;
        return (_a = {}, _a["--" + key] = variables[key], _a);
    })));
};


/***/ }),

/***/ "./src/app/components/creatureImage.tsx":
/*!**********************************************!*\
  !*** ./src/app/components/creatureImage.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var CreatureImage = function (_a) {
    var facing = _a.facing, definitionId = _a.definitionId, stage = _a.stage;
    return (React.createElement("img", { className: "image", src: "/images/" + (facing || "front") + "/" + definitionId + "_" + stage + ".png" }));
};
exports.CreatureImage = CreatureImage;


/***/ }),

/***/ "./src/app/components/gameId.tsx":
/*!***************************************!*\
  !*** ./src/app/components/gameId.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var GameIdUnconnected = function (_a) {
    var gameId = _a.gameId;
    return React.createElement("div", { className: "game-id" },
        "Game ID: ",
        gameId);
};
var mapStateToProps = function (state) { return ({
    gameId: state.game.gameId
}); };
var GameId = react_redux_1.connect(mapStateToProps)(GameIdUnconnected);
exports.GameId = GameId;


/***/ }),

/***/ "./src/app/components/phaseInfo.tsx":
/*!******************************************!*\
  !*** ./src/app/components/phaseInfo.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var PhaseInfoUnconnected = function (_a) {
    var phase = _a.phase, phaseTimer = _a.phaseTimer;
    if (phase === _common_1.GamePhase.WAITING) {
        return React.createElement("div", { className: "phase-info" }, "Waiting for players");
    }
    if (phase === _common_1.GamePhase.DEAD) {
        return React.createElement("div", { className: "phase-info" }, "You are dead");
    }
    return React.createElement("div", { className: "phase-info" },
        _common_1.GamePhase[phase],
        " - ",
        phaseTimer);
};
var mapStateToProps = function (state) { return ({
    phase: state.game.phase,
    phaseTimer: state.game.phaseTimer
}); };
var PhaseInfo = react_redux_1.connect(mapStateToProps)(PhaseInfoUnconnected);
exports.PhaseInfo = PhaseInfo;


/***/ }),

/***/ "./src/app/components/profile.tsx":
/*!****************************************!*\
  !*** ./src/app/components/profile.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var progressBar_1 = __webpack_require__(/*! ./progressBar */ "./src/app/components/progressBar.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var pieceSelectors_1 = __webpack_require__(/*! ../store/pieceSelectors */ "./src/app/store/pieceSelectors.ts");
var localPlayerActions_1 = __webpack_require__(/*! ../store/actions/localPlayerActions */ "./src/app/store/actions/localPlayerActions.ts");
var renderProgressBar = function (current, max) { return current + " / " + max + " xp"; };
var ProfileUnconnected = function (props) {
    var name = props.name, level = props.level, xp = props.xp, pieceCount = props.pieceCount, gameStarted = props.gameStarted, canReadyUp = props.canReadyUp, onBuyXp = props.onBuyXp, onReadyUp = props.onReadyUp;
    if (gameStarted === false) {
        return null;
    }
    var xpForNextLevel = _common_1.getXpToNextLevel(level);
    return (React.createElement("div", { className: "profile" },
        React.createElement("p", { className: "item name" }, name),
        React.createElement("p", { className: "item level" },
            "Level ",
            level),
        React.createElement("p", { className: "item pieces" },
            pieceCount,
            " / ",
            level,
            " pieces"),
        React.createElement("div", { className: "level-bar" },
            React.createElement(progressBar_1.ProgressBar, { className: "xp-progress", current: xp, max: xpForNextLevel, renderContents: renderProgressBar }),
            React.createElement("button", { onClick: onBuyXp, className: "buy-xp" },
                "Buy ",
                _common_1.Constants.BUY_XP_AMOUNT,
                " xp ($",
                _common_1.Constants.BUY_XP_COST,
                ")")),
        canReadyUp
            && React.createElement("button", { onClick: onReadyUp, className: "ready-up" }, "Ready Up")));
};
var mapStateToProps = function (state) { return ({
    name: state.localPlayer.name,
    level: state.localPlayer.level,
    xp: state.localPlayer.xp,
    gameStarted: state.game.phase !== _common_1.GamePhase.WAITING,
    canReadyUp: (state.game.phase === _common_1.GamePhase.PREPARING && state.localPlayer.ready === false),
    pieceCount: pieceSelectors_1.ownedPieceSelector(state).length
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onBuyXp: function () { return dispatch(localPlayerActions_1.buyXpAction()); },
    onReadyUp: function () { return dispatch(localPlayerActions_1.readyUpAction()); }
}); };
var Profile = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ProfileUnconnected);
exports.Profile = Profile;


/***/ }),

/***/ "./src/app/components/progressBar.tsx":
/*!********************************************!*\
  !*** ./src/app/components/progressBar.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var getPercentage = function (current, max) {
    return Math.floor((current / max) * 100) + "%";
};
var ProgressBar = function (_a) {
    var className = _a.className, current = _a.current, max = _a.max, renderContents = _a.renderContents;
    return (React.createElement("div", { className: className },
        React.createElement("div", { className: "fill", style: { width: getPercentage(current, max) } }),
        renderContents
            && React.createElement("span", { className: "contents" }, renderContents(current, max))));
};
exports.ProgressBar = ProgressBar;


/***/ }),

/***/ "./src/app/components/roundIndicator.tsx":
/*!***********************************************!*\
  !*** ./src/app/components/roundIndicator.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var RoundIndicatorUnconnected = function (_a) {
    var round = _a.round;
    if (round === null) {
        return null;
    }
    return React.createElement("div", { className: "round-indicator" },
        "Round ",
        round);
};
var mapStateToProps = function (state) { return ({
    round: state.game.round
}); };
var RoundIndicator = react_redux_1.connect(mapStateToProps)(RoundIndicatorUnconnected);
exports.RoundIndicator = RoundIndicator;


/***/ }),

/***/ "./src/app/feed/feed.tsx":
/*!*******************************!*\
  !*** ./src/app/feed/feed.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var feed_message_1 = __webpack_require__(/*! @common/feed-message */ "./src/shared/feed-message.ts");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var chatInput_1 = __webpack_require__(/*! ../chat/chatInput */ "./src/app/chat/chatInput.tsx");
var BattleFeedMessage = function (_a) {
    var message = _a.message;
    return (React.createElement("p", { className: "battle-feed-message" },
        React.createElement("span", { className: "player-name home" }, message.home),
        " ",
        React.createElement("span", { className: "score" }, message.homeScore),
        React.createElement("span", { className: "vs" }, " vs "),
        React.createElement("span", { className: "score" }, message.awayScore),
        " ",
        React.createElement("span", { className: "player-name away" }, message.away)));
};
var ChatFeedMessage = function (_a) {
    var message = _a.message, getMessageAuthor = _a.getMessageAuthor;
    return (React.createElement("p", { className: "chat-feed-message" },
        React.createElement("span", { className: "sender" },
            getMessageAuthor(message),
            ": "),
        React.createElement("span", { className: "message" }, message.text)));
};
var FeedUnconnected = function (_a) {
    var messages = _a.messages, getMessageAuthor = _a.getMessageAuthor;
    return (React.createElement("div", { className: "feed" },
        React.createElement(chatInput_1.ChatInput, null),
        messages.map(function (message) {
            if (message.type === feed_message_1.FeedMessageType.BATTLE) {
                return React.createElement(BattleFeedMessage, { key: message.id, message: message.payload });
            }
            if (message.type === feed_message_1.FeedMessageType.CHAT) {
                return React.createElement(ChatFeedMessage, { key: message.id, message: message.payload, getMessageAuthor: getMessageAuthor });
            }
        })));
};
var mapStateToProps = function (state) { return ({
    messages: state.feedMessages,
    getMessageAuthor: function (_a) {
        var fromId = _a.fromId;
        return state.playerList.find(function (p) { return p.id === fromId; }).name;
    }
}); };
var Feed = react_redux_1.connect(mapStateToProps)(FeedUnconnected);
exports.Feed = Feed;


/***/ }),

/***/ "./src/app/feed/feedActionTypes.ts":
/*!*****************************************!*\
  !*** ./src/app/feed/feedActionTypes.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.NEW_FEED_MESSAGE = "NEW_FEED_MESSAGE";


/***/ }),

/***/ "./src/app/feed/feedActions.ts":
/*!*************************************!*\
  !*** ./src/app/feed/feedActions.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var feedActionTypes_1 = __webpack_require__(/*! ./feedActionTypes */ "./src/app/feed/feedActionTypes.ts");
exports.newFeedMessage = function (payload) { return ({
    type: feedActionTypes_1.NEW_FEED_MESSAGE,
    payload: payload
}); };


/***/ }),

/***/ "./src/app/feed/feedMessagesReducer.ts":
/*!*********************************************!*\
  !*** ./src/app/feed/feedMessagesReducer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var feed_message_1 = __webpack_require__(/*! @common/feed-message */ "./src/shared/feed-message.ts");
var feedActionTypes_1 = __webpack_require__(/*! ./feedActionTypes */ "./src/app/feed/feedActionTypes.ts");
var gameActionTypes_1 = __webpack_require__(/*! ../store/actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var shared_1 = __webpack_require__(/*! ../../shared */ "./src/shared/index.ts");
exports.feedMessages = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case feedActionTypes_1.NEW_FEED_MESSAGE:
            return [action.payload].concat(state);
        case gameActionTypes_1.GAME_PHASE_UPDATE:
            if (action.payload.phase !== shared_1.GamePhase.READY) {
                return state;
            }
            return state.filter(function (m) { return m.type !== feed_message_1.FeedMessageType.BATTLE; });
        default:
            return state;
    }
};


/***/ }),

/***/ "./src/app/game/game.tsx":
/*!*******************************!*\
  !*** ./src/app/game/game.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gameStage_1 = __webpack_require__(/*! ./gameStage */ "./src/app/game/gameStage.tsx");
var lobbyStage_1 = __webpack_require__(/*! ./lobbyStage */ "./src/app/game/lobbyStage.tsx");
var gameSelector_1 = __webpack_require__(/*! ../store/gameSelector */ "./src/app/store/gameSelector.ts");
var GameUnconnected = /** @class */ (function (_super) {
    tslib_1.__extends(GameUnconnected, _super);
    function GameUnconnected(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        _this.updateDimensions = _this.updateDimensions.bind(_this);
        return _this;
    }
    GameUnconnected.prototype.render = function () {
        var inLobby = this.props.inLobby;
        var _a = this.state, width = _a.width, height = _a.height;
        return (React.createElement(React.Fragment, null, inLobby
            ? React.createElement(lobbyStage_1.LobbyStage, null)
            : React.createElement(gameStage_1.GameStage, { width: width, height: height })));
    };
    GameUnconnected.prototype.componentDidMount = function () {
        window.addEventListener("resize", this.updateDimensions);
    };
    GameUnconnected.prototype.componentWillUnmount = function () {
        window.removeEventListener("resize", this.updateDimensions);
    };
    GameUnconnected.prototype.updateDimensions = function () {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };
    return GameUnconnected;
}(React.Component));
var mapStateToProps = function (state) { return ({
    inLobby: gameSelector_1.localPlayerIdSelector(state) === null
}); };
var Game = react_redux_1.connect(mapStateToProps)(GameUnconnected);
exports.Game = Game;


/***/ }),

/***/ "./src/app/game/gameStage.tsx":
/*!************************************!*\
  !*** ./src/app/game/gameStage.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// tslint:disable:jsx-ban-props
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/lib/cjs/index.js");
var react_dnd_multi_backend_1 = __webpack_require__(/*! react-dnd-multi-backend */ "./node_modules/react-dnd-multi-backend/lib/index.js");
var HTML5toTouch_1 = __webpack_require__(/*! react-dnd-multi-backend/lib/HTML5toTouch */ "./node_modules/react-dnd-multi-backend/lib/HTML5toTouch.js");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var board_1 = __webpack_require__(/*! ../board/board */ "./src/app/board/board.tsx");
var bench_1 = __webpack_require__(/*! ../board/bench */ "./src/app/board/bench.tsx");
var cardShop_1 = __webpack_require__(/*! ../cardShop/cardShop */ "./src/app/cardShop/cardShop.tsx");
var playerList_1 = __webpack_require__(/*! ../playerList/playerList */ "./src/app/playerList/playerList.tsx");
var react_media_1 = __webpack_require__(/*! react-media */ "./node_modules/react-media/esm/react-media.js");
var phaseInfo_1 = __webpack_require__(/*! ../components/phaseInfo */ "./src/app/components/phaseInfo.tsx");
var profile_1 = __webpack_require__(/*! ../components/profile */ "./src/app/components/profile.tsx");
var feed_1 = __webpack_require__(/*! ../feed/feed */ "./src/app/feed/feed.tsx");
var gameId_1 = __webpack_require__(/*! ../components/gameId */ "./src/app/components/gameId.tsx");
var roundIndicator_1 = __webpack_require__(/*! ../components/roundIndicator */ "./src/app/components/roundIndicator.tsx");
var getWidthFromHeight = function (height) {
    return ((height / (_common_1.Constants.GRID_SIZE + 1)) * _common_1.Constants.GRID_SIZE);
};
var getHeightFromWidth = function (width) {
    return ((width / _common_1.Constants.GRID_SIZE) * (_common_1.Constants.GRID_SIZE + 1));
};
var GameStageUnconnected = /** @class */ (function (_super) {
    tslib_1.__extends(GameStageUnconnected, _super);
    function GameStageUnconnected() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameStageUnconnected.prototype.render = function () {
        var _a = this.props, width = _a.width, height = _a.height;
        var portrait = width < height;
        var boardMargin = 15;
        var marginDelta = boardMargin * 3.1;
        var boardContainerStyle = {
            height: portrait
                ? (getHeightFromWidth(width) - marginDelta) + "px"
                : (height - marginDelta) + "px",
            width: portrait
                ? (width - marginDelta) + "px"
                : (getWidthFromHeight(height) - marginDelta) + "px"
        };
        return (React.createElement(React.Fragment, null,
            React.createElement(react_media_1["default"], { query: "(orientation: landscape) and (min-width: 1200px)" },
                React.createElement("div", { className: "game landscape" },
                    React.createElement("div", { className: "group" },
                        React.createElement(roundIndicator_1.RoundIndicator, null),
                        React.createElement(phaseInfo_1.PhaseInfo, null),
                        React.createElement(playerList_1.PlayerList, null),
                        React.createElement(gameId_1.GameId, null),
                        React.createElement(feed_1.Feed, null)),
                    React.createElement("div", { className: "group board-container", style: boardContainerStyle },
                        React.createElement("div", { className: "chessboard" },
                            React.createElement(board_1.Board, null),
                            React.createElement(bench_1.Bench, null))),
                    React.createElement("div", { className: "group" },
                        React.createElement(cardShop_1.CardShop, null),
                        React.createElement(profile_1.Profile, null)))),
            React.createElement(react_media_1["default"], { query: "(orientation: landscape) and (max-width: 1199px) and (min-width: 600px)" },
                React.createElement("div", { className: "game landscape" },
                    React.createElement("div", { className: "group board-container", style: boardContainerStyle },
                        React.createElement("div", { className: "chessboard" },
                            React.createElement(board_1.Board, null),
                            React.createElement(bench_1.Bench, null))),
                    React.createElement("div", { className: "group" },
                        React.createElement(roundIndicator_1.RoundIndicator, null),
                        React.createElement(phaseInfo_1.PhaseInfo, null),
                        React.createElement(cardShop_1.CardShop, null),
                        React.createElement(profile_1.Profile, null),
                        React.createElement(playerList_1.PlayerList, null),
                        React.createElement(gameId_1.GameId, null),
                        React.createElement(feed_1.Feed, null)))),
            React.createElement(react_media_1["default"], { query: "(orientation: portrait), (max-width: 599px)" },
                React.createElement("div", { className: "game portrait" },
                    React.createElement("div", { className: "group board-container", style: boardContainerStyle },
                        React.createElement("div", { className: "chessboard" },
                            React.createElement(board_1.Board, null),
                            React.createElement(bench_1.Bench, null))),
                    React.createElement("div", { className: "group" },
                        React.createElement(roundIndicator_1.RoundIndicator, null),
                        React.createElement(phaseInfo_1.PhaseInfo, null),
                        React.createElement(cardShop_1.CardShop, null),
                        React.createElement(profile_1.Profile, null),
                        React.createElement(playerList_1.PlayerList, null),
                        React.createElement(gameId_1.GameId, null),
                        React.createElement(feed_1.Feed, null))))));
    };
    return GameStageUnconnected;
}(React.Component));
var GameStage = react_dnd_1.DragDropContext(react_dnd_multi_backend_1["default"](HTML5toTouch_1["default"]))(GameStageUnconnected);
exports.GameStage = GameStage;


/***/ }),

/***/ "./src/app/game/lobbyStage.tsx":
/*!*************************************!*\
  !*** ./src/app/game/lobbyStage.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gameActions_1 = __webpack_require__(/*! ../store/actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var gameSelector_1 = __webpack_require__(/*! ../store/gameSelector */ "./src/app/store/gameSelector.ts");
var constants_1 = __webpack_require__(/*! @common/constants */ "./src/shared/constants.ts");
var LobbyStageUnconnected = /** @class */ (function (_super) {
    tslib_1.__extends(LobbyStageUnconnected, _super);
    function LobbyStageUnconnected() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            name: "",
            playerCount: "",
            botCount: "",
            gameId: "",
            serverIP: "https://cc-server.jamesmonger.com",
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
        _this.onNameChange = function (event) {
            _this.setState({
                name: event.target.value
            });
        };
        _this.onPlayerCountChange = function (event) {
            _this.setState({
                playerCount: event.target.value
            });
        };
        _this.onBotCountChange = function (event) {
            _this.setState({
                botCount: event.target.value
            });
        };
        _this.onGameIdChange = function (event) {
            _this.setState({
                gameId: event.target.value
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
        _this.onJoinGameClick = function () {
            if (!_this.state.serverIP) {
                _this.props.setError("Server IP field empty");
                return;
            }
            if (!_this.state.gameId) {
                _this.props.setError("Game ID field empty");
                return;
            }
            if (!_this.state.name) {
                _this.props.setError("Name field empty");
                return;
            }
            if (_this.state.name.length > constants_1.MAX_NAME_LENGTH) {
                _this.props.setError("Name too long. Max " + constants_1.MAX_NAME_LENGTH + " characters");
                return;
            }
            _this.props.onJoinGame(_this.state.serverIP, _this.state.name, _this.state.gameId);
        };
        _this.onCreateGameClick = function () {
            if (!_this.state.serverIP) {
                _this.props.setError("Server IP field empty");
                return;
            }
            if (!_this.state.name) {
                _this.props.setError("Name field empty");
                return;
            }
            if (!_this.state.playerCount || isNaN(_this.state.playerCount)) {
                _this.props.setError("Non-numeric player count");
                return;
            }
            if (!_this.state.botCount || isNaN(_this.state.botCount)) {
                _this.props.setError("Non-numeric bot count");
                return;
            }
            var playerCount = parseInt(_this.state.playerCount, 10);
            var botCount = parseInt(_this.state.botCount, 10);
            _this.props.onCreateGame(_this.state.serverIP, _this.state.name, playerCount, botCount);
        };
        return _this;
    }
    LobbyStageUnconnected.prototype.render = function () {
        var title = this.state.debugModeClickCount === 3
            ? React.createElement("h2", { className: "title" },
                "Creature Chess ",
                React.createElement("span", { className: "debug-mode" }, "(Debug Mode)"))
            : React.createElement("h2", { className: "title", onClick: this.onTitleClick }, "Creature Chess");
        if (this.props.loading) {
            return (React.createElement("div", { className: "lobby" },
                React.createElement("div", { className: "join-game" },
                    title,
                    React.createElement("p", null, "Loading game..."))));
        }
        return (React.createElement("div", { className: "lobby" },
            React.createElement("div", { className: "join-game" },
                title,
                React.createElement("input", { value: this.state.name, onChange: this.onNameChange, maxLength: constants_1.MAX_NAME_LENGTH, placeholder: "Your name", className: "name-input" }),
                React.createElement("div", { className: "join-options" },
                    React.createElement("div", { className: "option" },
                        React.createElement("input", { value: this.state.playerCount, onChange: this.onPlayerCountChange, placeholder: "Player count", className: "option-input" }),
                        React.createElement("input", { value: this.state.botCount, onChange: this.onBotCountChange, placeholder: "Bot count", className: "option-input" }),
                        React.createElement("button", { onClick: this.onCreateGameClick, className: "option-button create-button" }, "Create Game")),
                    React.createElement("div", { className: "option" },
                        React.createElement("input", { value: this.state.gameId, onChange: this.onGameIdChange, placeholder: "Game ID", className: "option-input" }),
                        React.createElement("button", { onClick: this.onJoinGameClick, className: "option-button join-button" }, "Join Game"))),
                this.props.error
                    && React.createElement("div", { className: "error" },
                        React.createElement("p", null, this.props.error)),
                this.state.debugModeClickCount === 3
                    && (React.createElement("input", { value: this.state.serverIP, onChange: this.onServerIPChange, placeholder: "Server IP" })))));
    };
    return LobbyStageUnconnected;
}(React.Component));
var mapStateToProps = function (state) { return ({
    loading: gameSelector_1.loadingSelector(state),
    error: state.game.lobbyError
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onCreateGame: function (serverIP, name, playerCount, botCount) { return dispatch(gameActions_1.createGameAction(serverIP, name, playerCount, botCount)); },
    onJoinGame: function (serverIP, name, gameId) { return dispatch(gameActions_1.joinGameAction(serverIP, name, gameId)); },
    enableDebugMode: function () { return dispatch(gameActions_1.enableDebugMode()); },
    setError: function (error) { return dispatch(gameActions_1.joinGameError(error)); }
}); };
var LobbyStage = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(LobbyStageUnconnected);
exports.LobbyStage = LobbyStage;


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
var game_1 = __webpack_require__(/*! ./game/game */ "./src/app/game/game.tsx");
__webpack_require__(/*! ./style/index.scss */ "./src/app/style/index.scss");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var store_1 = __webpack_require__(/*! ./store/store */ "./src/app/store/store.ts");
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(game_1.Game, null)), document.getElementById("approot"));


/***/ }),

/***/ "./src/app/log.ts":
/*!************************!*\
  !*** ./src/app/log.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
// tslint:disable:no-console
exports.log = function (message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    return console.log.apply(console, [message].concat(optionalParams));
};


/***/ }),

/***/ "./src/app/playerList/playerList.tsx":
/*!*******************************************!*\
  !*** ./src/app/playerList/playerList.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var playerListItem_1 = __webpack_require__(/*! ./playerListItem */ "./src/app/playerList/playerListItem.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gameSelector_1 = __webpack_require__(/*! ../store/gameSelector */ "./src/app/store/gameSelector.ts");
var PlayerListUnconnected = function (_a) {
    var players = _a.players, localPlayerId = _a.localPlayerId, opponentId = _a.opponentId, showReadyIndicators = _a.showReadyIndicators;
    return (React.createElement("div", { className: "player-list" }, players.map(function (p) {
        return React.createElement(playerListItem_1.PlayerListItem, { key: p.id, player: p, isLocal: p.id === localPlayerId, isOpponent: p.id === opponentId, ready: showReadyIndicators ? p.ready : null, streakType: p.streakType, streakAmount: p.streakAmount });
    })));
};
var mapStateToProps = function (state) { return ({
    players: state.playerList,
    opponentId: gameSelector_1.opponentIdSelector(state),
    localPlayerId: gameSelector_1.localPlayerIdSelector(state),
    showReadyIndicators: state.game.phase === _common_1.GamePhase.PREPARING
}); };
var PlayerList = react_redux_1.connect(mapStateToProps)(PlayerListUnconnected);
exports.PlayerList = PlayerList;


/***/ }),

/***/ "./src/app/playerList/playerListActionTypes.ts":
/*!*****************************************************!*\
  !*** ./src/app/playerList/playerListActionTypes.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PLAYER_LIST_UPDATED = "PLAYER_LIST_UPDATED";


/***/ }),

/***/ "./src/app/playerList/playerListActions.ts":
/*!*************************************************!*\
  !*** ./src/app/playerList/playerListActions.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var playerListActionTypes_1 = __webpack_require__(/*! ./playerListActionTypes */ "./src/app/playerList/playerListActionTypes.ts");
exports.playerListUpdated = function (payload) { return ({
    type: playerListActionTypes_1.PLAYER_LIST_UPDATED,
    payload: payload
}); };


/***/ }),

/***/ "./src/app/playerList/playerListItem.tsx":
/*!***********************************************!*\
  !*** ./src/app/playerList/playerListItem.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var progressBar_1 = __webpack_require__(/*! ../components/progressBar */ "./src/app/components/progressBar.tsx");
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
            React.createElement("span", { className: "name" }, props.player.name),
            React.createElement("div", { className: "badges" },
                React.createElement(StreakIndicator, { type: props.streakType, amount: props.streakAmount }),
                React.createElement(ReadyIndicator, { ready: props.ready }))),
        React.createElement(progressBar_1.ProgressBar, { className: "healthbar friendly", current: props.player.health, max: 100 })));
};
exports.PlayerListItem = PlayerListItem;


/***/ }),

/***/ "./src/app/playerList/playerListReducer.ts":
/*!*************************************************!*\
  !*** ./src/app/playerList/playerListReducer.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var playerListActionTypes_1 = __webpack_require__(/*! ./playerListActionTypes */ "./src/app/playerList/playerListActionTypes.ts");
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

/***/ "./src/app/store/actions/gameActions.ts":
/*!**********************************************!*\
  !*** ./src/app/store/actions/gameActions.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var gameActionTypes_1 = __webpack_require__(/*! ../actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
exports.joinGameAction = function (serverIP, name, gameId) { return ({
    type: gameActionTypes_1.JOIN_GAME,
    payload: {
        name: name,
        serverIP: serverIP,
        gameId: gameId
    }
}); };
exports.createGameAction = function (serverIP, name, playerCount, botCount) { return ({
    type: gameActionTypes_1.CREATE_GAME,
    payload: {
        name: name,
        serverIP: serverIP,
        playerCount: playerCount,
        botCount: botCount
    }
}); };
exports.joinGameError = function (error) { return ({
    type: gameActionTypes_1.JOIN_ERROR,
    payload: {
        error: error
    }
}); };
exports.gamePhaseUpdate = function (packet) { return ({
    type: gameActionTypes_1.GAME_PHASE_UPDATE,
    payload: packet
}); };
exports.moneyUpdateAction = function (money) { return ({
    type: gameActionTypes_1.MONEY_UPDATE,
    payload: {
        money: money
    }
}); };
exports.phaseTimerUpdated = function (time) { return ({
    type: gameActionTypes_1.PHASE_TIMER_UPDATED,
    payload: {
        time: time
    }
}); };
exports.enableDebugMode = function () { return ({
    type: gameActionTypes_1.ENABLE_DEBUG_MODE
}); };


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
exports.joinCompleteAction = function (payload) { return ({
    type: localPlayerActionTypes_1.JOIN_COMPLETE,
    payload: payload
}); };
exports.localPlayerLevelUpdate = function (level, xp) { return ({
    type: localPlayerActionTypes_1.LEVEL_UPDATE,
    payload: {
        level: level,
        xp: xp
    }
}); };
exports.buyXpAction = function () { return ({
    type: localPlayerActionTypes_1.BUY_XP
}); };
exports.readyUpAction = function () { return ({
    type: localPlayerActionTypes_1.READY_UP
}); };


/***/ }),

/***/ "./src/app/store/actions/networkActions.ts":
/*!*************************************************!*\
  !*** ./src/app/store/actions/networkActions.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var networkActionTypes_1 = __webpack_require__(/*! ../actiontypes/networkActionTypes */ "./src/app/store/actiontypes/networkActionTypes.ts");
exports.sendPacket = function (opcode) {
    var data = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
    }
    return ({
        type: networkActionTypes_1.SEND_PACKET,
        payload: {
            opcode: opcode,
            data: data
        }
    });
};


/***/ }),

/***/ "./src/app/store/actiontypes/gameActionTypes.ts":
/*!******************************************************!*\
  !*** ./src/app/store/actiontypes/gameActionTypes.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.JOIN_GAME = "JOIN_GAME";
exports.CREATE_GAME = "CREATE_GAME";
exports.JOIN_ERROR = "JOIN_ERROR";
exports.GAME_PHASE_UPDATE = "GAME_PHASE_UPDATE";
exports.MONEY_UPDATE = "MONEY_UPDATE";
exports.PHASE_TIMER_UPDATED = "PHASE_TIMER_UPDATED";
exports.ENABLE_DEBUG_MODE = "ENABLE_DEBUG_MODE";


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
exports.LEVEL_UPDATE = "LEVEL_UPDATE";
exports.BUY_XP = "BUY_XP";
exports.READY_UP = "READY_UP";


/***/ }),

/***/ "./src/app/store/actiontypes/networkActionTypes.ts":
/*!*********************************************************!*\
  !*** ./src/app/store/actiontypes/networkActionTypes.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.SEND_PACKET = "SEND_PACKET";


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
var position_1 = __webpack_require__(/*! @common/position */ "./src/shared/position.ts");
var gameSelector_1 = __webpack_require__(/*! ./gameSelector */ "./src/app/store/gameSelector.ts");
var piecesSelector = function (state, props) {
    return props.type === position_1.TileType.BOARD ? state.board : state.bench;
};
var positionSelector = function (state, props) { return props.position; };
var piecePositionFilter = function (position) {
    return function (p) {
        return p.position.x === position.x && p.position.y === position.y;
    };
};
exports.tilePieceSelector = reselect_1.createSelector(piecesSelector, positionSelector, function (pieces, position) { return pieces.filter(piecePositionFilter(position)); });
exports.ownedPieceSelector = function (state) {
    var playerId = gameSelector_1.localPlayerIdSelector(state);
    return state.board.filter(function (p) { return p.ownerId === playerId; });
};


/***/ }),

/***/ "./src/app/store/reducers/gameReducer.ts":
/*!***********************************************!*\
  !*** ./src/app/store/reducers/gameReducer.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var gameActionTypes_1 = __webpack_require__(/*! ../actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var localPlayerActionTypes_1 = __webpack_require__(/*! ../actiontypes/localPlayerActionTypes */ "./src/app/store/actiontypes/localPlayerActionTypes.ts");
var initialState = {
    gameId: null,
    opponentId: null,
    loading: false,
    lobbyError: null,
    money: 0,
    phase: _common_1.GamePhase.WAITING,
    phaseTimer: null,
    round: null,
    debug: false
};
function game(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case gameActionTypes_1.JOIN_GAME:
        case gameActionTypes_1.CREATE_GAME:
            return tslib_1.__assign({}, state, { loading: true });
        case gameActionTypes_1.JOIN_ERROR:
            return tslib_1.__assign({}, state, { loading: false, lobbyError: action.payload.error });
        case localPlayerActionTypes_1.JOIN_COMPLETE:
            return tslib_1.__assign({}, state, { loading: false, lobbyError: null, gameId: action.payload.gameId });
        case gameActionTypes_1.GAME_PHASE_UPDATE:
            // set opponent id when entering ready phase
            if (action.payload.phase === _common_1.GamePhase.READY) {
                return tslib_1.__assign({}, state, { phase: action.payload.phase, opponentId: action.payload.payload.opponentId });
            }
            // clear opponent id when entering preparing phase
            if (action.payload.phase === _common_1.GamePhase.PREPARING) {
                return tslib_1.__assign({}, state, { phase: action.payload.phase, round: action.payload.payload.round, opponentId: null });
            }
            return tslib_1.__assign({}, state, { phase: action.payload.phase });
        case gameActionTypes_1.PHASE_TIMER_UPDATED:
            return tslib_1.__assign({}, state, { phaseTimer: action.payload.time });
        case gameActionTypes_1.MONEY_UPDATE:
            return tslib_1.__assign({}, state, { money: action.payload.money });
        case gameActionTypes_1.ENABLE_DEBUG_MODE: {
            return tslib_1.__assign({}, state, { debug: true });
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
var playerListReducer_1 = __webpack_require__(/*! ../../playerList/playerListReducer */ "./src/app/playerList/playerListReducer.ts");
var cardsReducer_1 = __webpack_require__(/*! ../../cardShop/cardsReducer */ "./src/app/cardShop/cardsReducer.ts");
var gameReducer_1 = __webpack_require__(/*! ./gameReducer */ "./src/app/store/reducers/gameReducer.ts");
var localPlayerReducer_1 = __webpack_require__(/*! ./localPlayerReducer */ "./src/app/store/reducers/localPlayerReducer.ts");
var feedMessagesReducer_1 = __webpack_require__(/*! ../../feed/feedMessagesReducer */ "./src/app/feed/feedMessagesReducer.ts");
exports.reducers = {
    board: board_1.boardReducer,
    bench: board_1.benchReducer,
    playerList: playerListReducer_1.playerList,
    cards: cardsReducer_1.cards,
    game: gameReducer_1.game,
    localPlayer: localPlayerReducer_1.localPlayer,
    feedMessages: feedMessagesReducer_1.feedMessages
};


/***/ }),

/***/ "./src/app/store/reducers/localPlayerReducer.ts":
/*!******************************************************!*\
  !*** ./src/app/store/reducers/localPlayerReducer.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var localPlayerActionTypes_1 = __webpack_require__(/*! ../actiontypes/localPlayerActionTypes */ "./src/app/store/actiontypes/localPlayerActionTypes.ts");
var gameActionTypes_1 = __webpack_require__(/*! ../actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var initialState = {
    id: null,
    name: null,
    level: null,
    xp: null,
    ready: false
};
function localPlayer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case localPlayerActionTypes_1.JOIN_COMPLETE:
            return {
                id: action.payload.playerId,
                name: action.payload.name,
                level: 1,
                xp: 0,
                ready: false
            };
        case localPlayerActionTypes_1.LEVEL_UPDATE:
            return tslib_1.__assign({}, state, { level: action.payload.level, xp: action.payload.xp });
        case localPlayerActionTypes_1.READY_UP:
            return tslib_1.__assign({}, state, { ready: true });
        case gameActionTypes_1.GAME_PHASE_UPDATE:
            if (action.payload.phase !== _common_1.GamePhase.READY) {
                return state;
            }
            return tslib_1.__assign({}, state, { ready: false });
        default:
            return state;
    }
}
exports.localPlayer = localPlayer;


/***/ }),

/***/ "./src/app/store/sagas/actions/cardShop.ts":
/*!*************************************************!*\
  !*** ./src/app/store/sagas/actions/cardShop.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var cardActions_1 = __webpack_require__(/*! ../../../cardShop/cardActions */ "./src/app/cardShop/cardActions.ts");
var cardActionTypes_1 = __webpack_require__(/*! ../../../cardShop/cardActionTypes */ "./src/app/cardShop/cardActionTypes.ts");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var piece_utils_1 = __webpack_require__(/*! @common/piece-utils */ "./src/shared/piece-utils.ts");
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var gameActions_1 = __webpack_require__(/*! ../../actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var definitionProvider_1 = __webpack_require__(/*! @common/game/definitionProvider */ "./src/shared/game/definitionProvider.ts");
var definitionProvider = new definitionProvider_1.DefinitionProvider();
exports.cardShop = function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(cardActionTypes_1.BUY_CARD, function (action) {
                    var state, gamePhase, card, money, slot, localPlayerId, piece, remainingCards;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, effects_1.select()];
                            case 1:
                                state = _a.sent();
                                gamePhase = state.game.phase;
                                // not in correct phase
                                if (gamePhase === _common_1.GamePhase.WAITING || gamePhase === _common_1.GamePhase.DEAD) {
                                    return [2 /*return*/];
                                }
                                card = state.cards[action.payload.index];
                                money = state.game.money;
                                // card doesn't exist or player can't afford
                                if (!card || money < card.cost) {
                                    return [2 /*return*/];
                                }
                                slot = board_1.getFirstEmptyBenchSlot(state.bench);
                                // no valid slots
                                if (slot === null) {
                                    return [2 /*return*/];
                                }
                                localPlayerId = state.localPlayer.id;
                                piece = piece_utils_1.createPieceFromCard(definitionProvider, localPlayerId, card, slot);
                                remainingCards = state.cards.map(function (c) { return c === card ? null : c; });
                                return [4 /*yield*/, effects_1.put(board_1.BenchActions.benchPieceAdded(piece))];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, effects_1.put(gameActions_1.moneyUpdateAction(money - card.cost))];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, effects_1.put(cardActions_1.cardsUpdated(remainingCards))];
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


/***/ }),

/***/ "./src/app/store/sagas/actions/gamePhase.ts":
/*!**************************************************!*\
  !*** ./src/app/store/sagas/actions/gamePhase.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var gameActionTypes_1 = __webpack_require__(/*! ../../actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var battleSaga_1 = __webpack_require__(/*! @common/match/combat/battleSaga */ "./src/shared/match/combat/battleSaga.ts");
var cardActions_1 = __webpack_require__(/*! ../../../cardShop/cardActions */ "./src/app/cardShop/cardActions.ts");
var board_2 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var isGamePhaseUpdate = function (phase) {
    return function (action) { return action.type === gameActionTypes_1.GAME_PHASE_UPDATE && action.payload.phase === phase; };
};
exports.gamePhase = function () {
    var _a, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = effects_1.all;
                return [4 /*yield*/, effects_1.takeEvery(isGamePhaseUpdate(_common_1.GamePhase.PREPARING), function (action) {
                        var payload;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    payload = action.payload.payload;
                                    return [4 /*yield*/, effects_1.put(board_1.BoardActions.piecesUpdated(payload.pieces))];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(board_1.BenchActions.benchPiecesUpdated(payload.bench))];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(cardActions_1.cardsUpdated(payload.cards))];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(board_2.LockEvolutionActions.unlockEvolutionAction())];
                                case 4:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    })];
            case 1:
                _b = [
                    _c.sent()
                ];
                return [4 /*yield*/, effects_1.takeEvery(isGamePhaseUpdate(_common_1.GamePhase.READY), function (action) {
                        var pieces;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    pieces = action.payload.payload.pieces;
                                    return [4 /*yield*/, effects_1.put(board_1.BoardActions.piecesUpdated(pieces))];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(board_2.LockEvolutionActions.lockEvolutionAction())];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    })];
            case 2:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.takeEvery(isGamePhaseUpdate(_common_1.GamePhase.PLAYING), function () {
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

/***/ "./src/app/store/sagas/actions/networking.ts":
/*!***************************************************!*\
  !*** ./src/app/store/sagas/actions/networking.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var io = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var packet_opcodes_1 = __webpack_require__(/*! @common/packet-opcodes */ "./src/shared/packet-opcodes.ts");
var gameActions_1 = __webpack_require__(/*! ../../actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var networkActions_1 = __webpack_require__(/*! ../../actions/networkActions */ "./src/app/store/actions/networkActions.ts");
var networkActionTypes_1 = __webpack_require__(/*! ../../actiontypes/networkActionTypes */ "./src/app/store/actiontypes/networkActionTypes.ts");
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var playerListActions_1 = __webpack_require__(/*! ../../../playerList/playerListActions */ "./src/app/playerList/playerListActions.ts");
var cardActions_1 = __webpack_require__(/*! ../../../cardShop/cardActions */ "./src/app/cardShop/cardActions.ts");
var gameActionTypes_1 = __webpack_require__(/*! ../../actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var cardActionTypes_1 = __webpack_require__(/*! ../../../cardShop/cardActionTypes */ "./src/app/cardShop/cardActionTypes.ts");
var position_1 = __webpack_require__(/*! @common/position */ "./src/shared/position.ts");
var log_1 = __webpack_require__(/*! ../../../log */ "./src/app/log.ts");
var localPlayerActions_1 = __webpack_require__(/*! ../../actions/localPlayerActions */ "./src/app/store/actions/localPlayerActions.ts");
var localPlayerActionTypes_1 = __webpack_require__(/*! ../../actiontypes/localPlayerActionTypes */ "./src/app/store/actiontypes/localPlayerActionTypes.ts");
var feedActions_1 = __webpack_require__(/*! ../../../feed/feedActions */ "./src/app/feed/feedActions.ts");
var chatActionTypes_1 = __webpack_require__(/*! ../../../chat/chatActionTypes */ "./src/app/chat/chatActionTypes.ts");
var battleEventChannel_1 = __webpack_require__(/*! @common/match/combat/battleEventChannel */ "./src/shared/match/combat/battleEventChannel.ts");
var getSocket = function (serverIP) {
    var socket = io(serverIP);
    return new Promise(function (resolve) {
        socket.on("connect", function () {
            resolve(socket);
        });
    });
};
var joinGame = function (socket, name, gameId) {
    return new Promise(function (resolve) {
        socket.emit(packet_opcodes_1.ClientToServerPacketOpcodes.JOIN_GAME, name, gameId, function (response) {
            resolve(response);
        });
    });
};
var createGame = function (socket, name, playerCount, botCount) {
    return new Promise(function (resolve) {
        socket.emit(packet_opcodes_1.ClientToServerPacketOpcodes.CREATE_GAME, name, playerCount, botCount, function (response) {
            resolve(response);
        });
    });
};
var subscribe = function (socket) {
    return redux_saga_1.eventChannel(function (emit) {
        socket.on(packet_opcodes_1.ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, function (players) {
            log_1.log("[PLAYER_LIST_UPDATE]", players);
            emit(playerListActions_1.playerListUpdated(players));
        });
        socket.on(packet_opcodes_1.ServerToClientPacketOpcodes.CARDS_UPDATE, function (cards) {
            log_1.log("[CARDS_UPDATE]", cards);
            emit(cardActions_1.cardsUpdated(cards));
        });
        socket.on(packet_opcodes_1.ServerToClientPacketOpcodes.MONEY_UPDATE, function (money) {
            log_1.log("[MONEY_UPDATE]", money);
            emit(gameActions_1.moneyUpdateAction(money));
        });
        socket.on(packet_opcodes_1.ServerToClientPacketOpcodes.PHASE_UPDATE, function (packet) {
            log_1.log("[PHASE_UPDATE]", packet);
            emit(gameActions_1.gamePhaseUpdate(packet));
        });
        socket.on(packet_opcodes_1.ServerToClientPacketOpcodes.LEVEL_UPDATE, function (packet) {
            log_1.log("[LEVEL_UPDATE]", packet);
            emit(localPlayerActions_1.localPlayerLevelUpdate(packet.level, packet.xp));
        });
        socket.on(packet_opcodes_1.ServerToClientPacketOpcodes.NEW_FEED_MESSAGE, function (packet) {
            log_1.log("[NEW_FEED_MESSAGE]", packet);
            emit(feedActions_1.newFeedMessage(packet));
        });
        // tslint:disable-next-line:no-empty
        return function () { };
    });
};
var readPacketsToActions = function (socket) {
    var channel;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.call(subscribe, socket)];
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
var writeActionsToPackets = function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.all([
                    effects_1.takeEvery(battleEventChannel_1.BATTLE_FINISHED, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.put(networkActions_1.sendPacket(packet_opcodes_1.ClientToServerPacketOpcodes.FINISH_MATCH))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }),
                    effects_1.takeEvery(cardActionTypes_1.REROLL_CARDS, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.put(networkActions_1.sendPacket(packet_opcodes_1.ClientToServerPacketOpcodes.BUY_REROLL))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }),
                    effects_1.takeEvery(localPlayerActionTypes_1.BUY_XP, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.put(networkActions_1.sendPacket(packet_opcodes_1.ClientToServerPacketOpcodes.BUY_XP))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }),
                    effects_1.takeEvery(localPlayerActionTypes_1.READY_UP, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.put(networkActions_1.sendPacket(packet_opcodes_1.ClientToServerPacketOpcodes.READY_UP))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }),
                    effects_1.takeEvery(cardActionTypes_1.BUY_CARD, function (_a) {
                        var payload = _a.payload;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, effects_1.put(networkActions_1.sendPacket(packet_opcodes_1.ClientToServerPacketOpcodes.BUY_CARD, payload.index))];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }),
                    effects_1.takeEvery(board_1.BoardActionTypes.SELL_PIECE, function (_a) {
                        var payload = _a.payload;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, effects_1.put(networkActions_1.sendPacket(packet_opcodes_1.ClientToServerPacketOpcodes.SELL_PIECE, payload.pieceId))];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }),
                    effects_1.takeEvery(board_1.BoardActionTypes.PIECE_MOVED_TO_BOARD, function (_a) {
                        var packet;
                        var payload = _a.payload;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    packet = {
                                        id: payload.piece.id,
                                        from: payload.piece.position,
                                        to: payload.position
                                    };
                                    return [4 /*yield*/, effects_1.put(networkActions_1.sendPacket(packet_opcodes_1.ClientToServerPacketOpcodes.MOVE_PIECE_TO_BOARD, packet))];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }),
                    effects_1.takeEvery(board_1.BoardActionTypes.PIECE_MOVED_TO_BENCH, function (_a) {
                        var packet;
                        var payload = _a.payload;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    packet = {
                                        id: payload.piece.id,
                                        from: payload.piece.position,
                                        to: position_1.createTileCoordinates(payload.slot, null)
                                    };
                                    return [4 /*yield*/, effects_1.put(networkActions_1.sendPacket(packet_opcodes_1.ClientToServerPacketOpcodes.MOVE_PIECE_TO_BENCH, packet))];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }),
                    effects_1.takeEvery(chatActionTypes_1.SEND_CHAT_MESSAGE, function (_a) {
                        var payload = _a.payload;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, effects_1.put(networkActions_1.sendPacket(packet_opcodes_1.ClientToServerPacketOpcodes.SEND_CHAT_MESSAGE, payload.message))];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    })
                ])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
var writePacketsToSocket = function (socket) {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(networkActionTypes_1.SEND_PACKET, function (_a) {
                    var payload = _a.payload;
                    socket.emit.apply(socket, [payload.opcode].concat(payload.data));
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
exports.networking = function () {
    var action, socket, _a, error, response, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, effects_1.take([gameActionTypes_1.JOIN_GAME, gameActionTypes_1.CREATE_GAME])];
            case 1:
                action = _c.sent();
                return [4 /*yield*/, effects_1.call(getSocket, action.payload.serverIP)];
            case 2:
                socket = _c.sent();
                return [4 /*yield*/, effects_1.fork(readPacketsToActions, socket)];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4:
                if (false) {}
                if (!(action.type === gameActionTypes_1.JOIN_GAME)) return [3 /*break*/, 6];
                return [4 /*yield*/, effects_1.call(joinGame, socket, action.payload.name, action.payload.gameId)];
            case 5:
                _b = _c.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, effects_1.call(createGame, socket, action.payload.name, action.payload.playerCount, action.payload.botCount)];
            case 7:
                _b = _c.sent();
                _c.label = 8;
            case 8:
                _a = _b, error = _a.error, response = _a.response;
                if (!!error) return [3 /*break*/, 10];
                return [4 /*yield*/, effects_1.put(localPlayerActions_1.joinCompleteAction(tslib_1.__assign({}, response, { name: action.payload.name })))];
            case 9:
                _c.sent();
                return [3 /*break*/, 13];
            case 10: return [4 /*yield*/, effects_1.put(gameActions_1.joinGameError(error))];
            case 11:
                _c.sent();
                return [4 /*yield*/, effects_1.take([gameActionTypes_1.JOIN_GAME, gameActionTypes_1.CREATE_GAME])];
            case 12:
                action = _c.sent();
                return [3 /*break*/, 4];
            case 13: return [4 /*yield*/, effects_1.fork(writeActionsToPackets)];
            case 14:
                _c.sent();
                return [4 /*yield*/, effects_1.fork(writePacketsToSocket, socket)];
            case 15:
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var gameActionTypes_1 = __webpack_require__(/*! ../../actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var countdown_1 = __webpack_require__(/*! ../utils/countdown */ "./src/app/store/sagas/utils/countdown.ts");
var gameActions_1 = __webpack_require__(/*! ../../actions/gameActions */ "./src/app/store/actions/gameActions.ts");
exports.phaseTimer = function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(gameActionTypes_1.GAME_PHASE_UPDATE, function (action) {
                    var phaseLength, channel;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                phaseLength = _common_1.Constants.PHASE_LENGTHS[action.payload.phase];
                                if (!phaseLength) return [3 /*break*/, 4];
                                return [4 /*yield*/, effects_1.put(gameActions_1.phaseTimerUpdated(phaseLength))];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, effects_1.call(countdown_1.countdown, phaseLength)];
                            case 2:
                                channel = _a.sent();
                                return [4 /*yield*/, effects_1.takeEvery(channel, function (secs) {
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, effects_1.put(gameActions_1.phaseTimerUpdated(secs))];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    })];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [2 /*return*/];
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var localPlayerActionTypes_1 = __webpack_require__(/*! ../../actiontypes/localPlayerActionTypes */ "./src/app/store/actiontypes/localPlayerActionTypes.ts");
exports.preventAccidentalClose = function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.take(localPlayerActionTypes_1.JOIN_COMPLETE)];
            case 1:
                _a.sent();
                // display an "Are you sure you want to leave this page?" dialog
                window.onbeforeunload = function () { return false; };
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var networking_1 = __webpack_require__(/*! ./actions/networking */ "./src/app/store/sagas/actions/networking.ts");
var phaseTimer_1 = __webpack_require__(/*! ./actions/phaseTimer */ "./src/app/store/sagas/actions/phaseTimer.ts");
var gamePhase_1 = __webpack_require__(/*! ./actions/gamePhase */ "./src/app/store/sagas/actions/gamePhase.ts");
var preventAccidentalClose_1 = __webpack_require__(/*! ./actions/preventAccidentalClose */ "./src/app/store/sagas/actions/preventAccidentalClose.ts");
var cardShop_1 = __webpack_require__(/*! ./actions/cardShop */ "./src/app/store/sagas/actions/cardShop.ts");
var evolution_1 = __webpack_require__(/*! @common/board/sagas/evolution */ "./src/shared/board/sagas/evolution.ts");
var battleSaga_1 = __webpack_require__(/*! @common/match/combat/battleSaga */ "./src/shared/match/combat/battleSaga.ts");
var turnSimulator_1 = __webpack_require__(/*! @common/match/combat/turnSimulator */ "./src/shared/match/combat/turnSimulator.ts");
var definitionProvider_1 = __webpack_require__(/*! @common/game/definitionProvider */ "./src/shared/game/definitionProvider.ts");
var constants_1 = __webpack_require__(/*! @common/constants */ "./src/shared/constants.ts");
exports.rootSaga = function () {
    var _a, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = effects_1.all;
                return [4 /*yield*/, effects_1.fork(networking_1.networking)];
            case 1:
                _b = [
                    _c.sent()
                ];
                return [4 /*yield*/, effects_1.fork(phaseTimer_1.phaseTimer)];
            case 2:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(gamePhase_1.gamePhase)];
            case 3:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(preventAccidentalClose_1.preventAccidentalClose)];
            case 4:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(cardShop_1.cardShop)];
            case 5:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(evolution_1.evolutionSagaFactory())];
            case 6:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.fork(battleSaga_1.battle, new turnSimulator_1.TurnSimulator(new definitionProvider_1.DefinitionProvider()), constants_1.DEFAULT_TURN_COUNT, constants_1.DEFAULT_TURN_DURATION)];
            case 7: return [4 /*yield*/, _a.apply(void 0, [_b.concat([
                        _c.sent()
                    ])])];
            case 8:
                _c.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/app/store/sagas/utils/countdown.ts":
/*!************************************************!*\
  !*** ./src/app/store/sagas/utils/countdown.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
// https://stackoverflow.com/a/49295122/1916362
exports.countdown = function (secs) {
    return redux_saga_1.eventChannel(function (emitter) {
        var interval = setInterval(function () {
            secs -= 1;
            if (secs > 0) {
                emitter(secs);
            }
            else {
                // this causes the channel to close
                emitter(redux_saga_1.END);
            }
        }, 1000);
        // The subscriber must return an unsubscribe function
        return function () { return clearInterval(interval); };
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
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

/***/ "./src/app/style/index.scss":
/*!**********************************!*\
  !*** ./src/app/style/index.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/shared/board/actions/benchActionTypes.ts":
/*!******************************************************!*\
  !*** ./src/shared/board/actions/benchActionTypes.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.BENCH_PIECES_UPDATED = "BENCH_PIECES_UPDATED";
exports.BENCH_PIECE_ADDED = "BENCH_PIECE_ADDED";


/***/ }),

/***/ "./src/shared/board/actions/benchActions.ts":
/*!**************************************************!*\
  !*** ./src/shared/board/actions/benchActions.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var benchActionTypes_1 = __webpack_require__(/*! ./benchActionTypes */ "./src/shared/board/actions/benchActionTypes.ts");
exports.benchPiecesUpdated = function (payload) { return ({
    type: benchActionTypes_1.BENCH_PIECES_UPDATED,
    payload: payload
}); };
exports.benchPieceAdded = function (piece) { return ({
    type: benchActionTypes_1.BENCH_PIECE_ADDED,
    payload: {
        piece: piece
    }
}); };


/***/ }),

/***/ "./src/shared/board/actions/benchReducer.ts":
/*!**************************************************!*\
  !*** ./src/shared/board/actions/benchReducer.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var piece_utils_1 = __webpack_require__(/*! @common/piece-utils */ "./src/shared/piece-utils.ts");
var position_1 = __webpack_require__(/*! @common/position */ "./src/shared/position.ts");
var benchActionTypes_1 = __webpack_require__(/*! ./benchActionTypes */ "./src/shared/board/actions/benchActionTypes.ts");
var boardActionTypes_1 = __webpack_require__(/*! ./boardActionTypes */ "./src/shared/board/actions/boardActionTypes.ts");
var initialState = [];
exports.benchReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case benchActionTypes_1.BENCH_PIECES_UPDATED:
            return action.payload;
        case benchActionTypes_1.BENCH_PIECE_ADDED:
            return state.concat([action.payload.piece]);
        case boardActionTypes_1.PIECE_MOVED_TO_BENCH:
            var target = tslib_1.__assign({}, action.payload.piece, { position: position_1.createTileCoordinates(action.payload.slot, null) });
            return piece_utils_1.moveOrAddPiece(state, target);
        case boardActionTypes_1.PIECE_MOVED_TO_BOARD:
            return state.filter(function (s) { return s.id !== action.payload.piece.id; });
        case boardActionTypes_1.SELL_PIECE:
            return state.filter(function (piece) { return piece.id !== action.payload.pieceId; });
        default: {
            return state;
        }
    }
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
exports.PIECE_MOVED_TO_BOARD = "PIECE_MOVED_TO_BOARD";
exports.PIECE_MOVED_TO_BENCH = "PIECE_MOVED_TO_BENCH";
exports.PIECES_UPDATED = "PIECES_UPDATED";
exports.SELL_PIECE = "SELL_PIECE";


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
var position_1 = __webpack_require__(/*! @common/position */ "./src/shared/position.ts");
exports.pieceMoved = function (piece, position, tileType) {
    if (tileType === position_1.TileType.BOARD) {
        return {
            type: boardActionTypes_1.PIECE_MOVED_TO_BOARD,
            payload: {
                piece: piece,
                position: position
            }
        };
    }
    return {
        type: boardActionTypes_1.PIECE_MOVED_TO_BENCH,
        payload: {
            piece: piece,
            slot: position.x
        }
    };
};
exports.piecesUpdated = function (pieces) { return ({
    type: boardActionTypes_1.PIECES_UPDATED,
    payload: {
        pieces: pieces
    }
}); };
exports.sellPiece = function (pieceId) { return ({
    type: boardActionTypes_1.SELL_PIECE,
    payload: {
        pieceId: pieceId
    }
}); };


/***/ }),

/***/ "./src/shared/board/actions/boardReducer.ts":
/*!**************************************************!*\
  !*** ./src/shared/board/actions/boardReducer.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var piece_utils_1 = __webpack_require__(/*! @common/piece-utils */ "./src/shared/piece-utils.ts");
var boardActionTypes_1 = __webpack_require__(/*! ./boardActionTypes */ "./src/shared/board/actions/boardActionTypes.ts");
var initialState = [];
exports.boardReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case boardActionTypes_1.PIECES_UPDATED:
            return action.payload.pieces;
        case boardActionTypes_1.PIECE_MOVED_TO_BOARD:
            var target = tslib_1.__assign({}, action.payload.piece, { position: action.payload.position });
            return piece_utils_1.moveOrAddPiece(state, target);
        case boardActionTypes_1.PIECE_MOVED_TO_BENCH:
            return state.filter(function (s) { return s.id !== action.payload.piece.id; });
        case boardActionTypes_1.SELL_PIECE:
            return state.filter(function (piece) { return piece.id !== action.payload.pieceId; });
        default: {
            return state;
        }
    }
};


/***/ }),

/***/ "./src/shared/board/actions/evolutionLocked.ts":
/*!*****************************************************!*\
  !*** ./src/shared/board/actions/evolutionLocked.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.LOCK_EVOLUTIONS = "LOCK_EVOLUTIONS";
exports.UNLOCK_EVOLUTIONS = "UNLOCK_EVOLUTIONS";
exports.LockEvolutionActions = {
    lockEvolutionAction: function () { return ({ type: exports.LOCK_EVOLUTIONS }); },
    unlockEvolutionAction: function () { return ({ type: exports.UNLOCK_EVOLUTIONS }); }
};


/***/ }),

/***/ "./src/shared/board/can-drop-piece.ts":
/*!********************************************!*\
  !*** ./src/shared/board/can-drop-piece.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _common_1 = __webpack_require__(/*! @common */ "./src/shared/index.ts");
var position_1 = __webpack_require__(/*! @common/position */ "./src/shared/position.ts");
exports.canDropPiece = function (piece, target, tilePieces, gamePhase, belowPieceLimit) {
    var targetIsBench = position_1.inBench(target);
    var benchToBenchMove = targetIsBench && position_1.inBench(piece.position);
    var targetIsFriendlyBoard = position_1.inFriendlyBoard(target);
    var boardToBoardMove = targetIsFriendlyBoard && position_1.inFriendlyBoard(piece.position);
    var tileEmpty = tilePieces.length === 0;
    var inPreparingPhase = gamePhase === _common_1.GamePhase.PREPARING;
    var inPreparingPhaseOrBenchToBench = (inPreparingPhase || benchToBenchMove);
    var belowPieceLimitOrBoardToBoard = (targetIsBench || belowPieceLimit || boardToBoardMove);
    return (tileEmpty
        && inPreparingPhaseOrBenchToBench
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
var constants_1 = __webpack_require__(/*! ../constants */ "./src/shared/constants.ts");
exports.getFirstEmptyBenchSlot = function (bench) {
    var _loop_1 = function (slot) {
        var piece = bench.some(function (p) { return p.position.x === slot; });
        if (!piece) {
            return { value: slot };
        }
    };
    for (var slot = 0; slot < constants_1.GRID_SIZE; slot++) {
        var state_1 = _loop_1(slot);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return null;
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
var boardReducer_1 = __webpack_require__(/*! ./actions/boardReducer */ "./src/shared/board/actions/boardReducer.ts");
exports.boardReducer = boardReducer_1.boardReducer;
var benchReducer_1 = __webpack_require__(/*! ./actions/benchReducer */ "./src/shared/board/actions/benchReducer.ts");
exports.benchReducer = benchReducer_1.benchReducer;
var evolutionLocked_1 = __webpack_require__(/*! ./actions/evolutionLocked */ "./src/shared/board/actions/evolutionLocked.ts");
exports.LockEvolutionActions = evolutionLocked_1.LockEvolutionActions;
var BoardActions = __webpack_require__(/*! ./actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
exports.BoardActions = BoardActions;
var BoardActionTypes = __webpack_require__(/*! ./actions/boardActionTypes */ "./src/shared/board/actions/boardActionTypes.ts");
exports.BoardActionTypes = BoardActionTypes;
var BenchActions = __webpack_require__(/*! ./actions/benchActions */ "./src/shared/board/actions/benchActions.ts");
exports.BenchActions = BenchActions;
var BenchActionTypes = __webpack_require__(/*! ./actions/benchActionTypes */ "./src/shared/board/actions/benchActionTypes.ts");
exports.BenchActionTypes = BenchActionTypes;


/***/ }),

/***/ "./src/shared/board/sagas/evolution.ts":
/*!*********************************************!*\
  !*** ./src/shared/board/sagas/evolution.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var get_first_empty_bench_slot_1 = __webpack_require__(/*! ../get-first-empty-bench-slot */ "./src/shared/board/get-first-empty-bench-slot.ts");
var BoardActions = __webpack_require__(/*! ../actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
var BenchActions = __webpack_require__(/*! ../actions/benchActions */ "./src/shared/board/actions/benchActions.ts");
var BenchActionTypes = __webpack_require__(/*! ../actions/benchActionTypes */ "./src/shared/board/actions/benchActionTypes.ts");
var constants_1 = __webpack_require__(/*! @common/constants */ "./src/shared/constants.ts");
var definitionProvider_1 = __webpack_require__(/*! @common/game/definitionProvider */ "./src/shared/game/definitionProvider.ts");
var position_1 = __webpack_require__(/*! @common/position */ "./src/shared/position.ts");
var evolutionLocked_1 = __webpack_require__(/*! ../actions/evolutionLocked */ "./src/shared/board/actions/evolutionLocked.ts");
var definitionProvider = new definitionProvider_1.DefinitionProvider();
exports.evolutionSagaFactory = function () {
    return function () {
        var sagaState, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    sagaState = {
                        evolutionLocked: false
                    };
                    _a = effects_1.all;
                    return [4 /*yield*/, effects_1.takeLatest([evolutionLocked_1.LOCK_EVOLUTIONS, evolutionLocked_1.UNLOCK_EVOLUTIONS], function (action) {
                            return tslib_1.__generator(this, function (_a) {
                                sagaState.evolutionLocked = (action.type === evolutionLocked_1.LOCK_EVOLUTIONS);
                                return [2 /*return*/];
                            });
                        })];
                case 1:
                    _b = [
                        _c.sent()
                    ];
                    return [4 /*yield*/, effects_1.takeLatest(BenchActionTypes.BENCH_PIECE_ADDED, function (action) {
                            var piece, _a, bench, board, stages, nextStageIndex, nextStage, pieceIsMatching, getMatchingPieces, matchingBoardPieces, matchingBenchPieces, totalInstances, newBoard, newBench, slot, newPiece;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        piece = action.payload.piece;
                                        if (!sagaState.evolutionLocked) return [3 /*break*/, 3];
                                        return [4 /*yield*/, effects_1.take(evolutionLocked_1.UNLOCK_EVOLUTIONS)];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, effects_1.delay(500)];
                                    case 2:
                                        _b.sent();
                                        _b.label = 3;
                                    case 3: return [4 /*yield*/, effects_1.select(function (s) { return ({ bench: s.bench, board: s.board }); })];
                                    case 4:
                                        _a = _b.sent(), bench = _a.bench, board = _a.board;
                                        stages = definitionProvider.get(piece.definitionId).stages;
                                        nextStageIndex = piece.stage + 1;
                                        nextStage = stages[nextStageIndex];
                                        if (!nextStage) {
                                            return [2 /*return*/];
                                        }
                                        pieceIsMatching = function (p) { return p.definitionId === piece.definitionId && p.stage === piece.stage; };
                                        getMatchingPieces = function (pieces) { return pieces.filter(function (p) { return p.id !== piece.id && pieceIsMatching(p); }); };
                                        matchingBoardPieces = getMatchingPieces(board);
                                        matchingBenchPieces = getMatchingPieces(bench);
                                        totalInstances = matchingBoardPieces.length + matchingBenchPieces.length + 1;
                                        if (totalInstances < constants_1.PIECES_TO_EVOLVE) {
                                            return [2 /*return*/];
                                        }
                                        newBoard = board.filter(function (p) { return p.id !== piece.id && pieceIsMatching(p) === false; });
                                        newBench = bench.filter(function (p) { return p.id !== piece.id && pieceIsMatching(p) === false; });
                                        slot = get_first_empty_bench_slot_1.getFirstEmptyBenchSlot(newBench);
                                        newPiece = tslib_1.__assign({}, piece, { stage: nextStageIndex, position: position_1.createTileCoordinates(slot, null) });
                                        return [4 /*yield*/, effects_1.put(BoardActions.piecesUpdated(newBoard))];
                                    case 5:
                                        _b.sent();
                                        return [4 /*yield*/, effects_1.put(BenchActions.benchPiecesUpdated(newBench))];
                                    case 6:
                                        _b.sent();
                                        return [4 /*yield*/, effects_1.put(BenchActions.benchPieceAdded(newPiece))];
                                    case 7:
                                        _b.sent();
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
    };
};


/***/ }),

/***/ "./src/shared/constants.ts":
/*!*********************************!*\
  !*** ./src/shared/constants.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _a;
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "./src/shared/game-phase.ts");
exports.GRID_SIZE = 8;
exports.PHASE_LENGTHS = (_a = {},
    _a[game_phase_1.GamePhase.PREPARING] = 30,
    _a[game_phase_1.GamePhase.READY] = 5,
    _a[game_phase_1.GamePhase.PLAYING] = 30,
    _a);
exports.REROLL_COST = 2;
exports.BUY_XP_COST = 5;
exports.BUY_XP_AMOUNT = 4;
exports.INITIAL_COOLDOWN = 1000;
exports.CELEBRATION_TIME = 3000;
exports.PIECES_TO_EVOLVE = 3;
exports.DEFAULT_TURN_COUNT = 600;
exports.DEFAULT_TURN_DURATION = 50;
exports.DAMAGE_RATIO = 10;
exports.MAX_NAME_LENGTH = 16;


/***/ }),

/***/ "./src/shared/feed-message.ts":
/*!************************************!*\
  !*** ./src/shared/feed-message.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var FeedMessageType;
(function (FeedMessageType) {
    FeedMessageType[FeedMessageType["BATTLE"] = 0] = "BATTLE";
    FeedMessageType[FeedMessageType["CHAT"] = 1] = "CHAT";
})(FeedMessageType = exports.FeedMessageType || (exports.FeedMessageType = {}));


/***/ }),

/***/ "./src/shared/game-phase.ts":
/*!**********************************!*\
  !*** ./src/shared/game-phase.ts ***!
  \**********************************/
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

/***/ "./src/shared/game/definitionProvider.ts":
/*!***********************************************!*\
  !*** ./src/shared/game/definitionProvider.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var definitions_1 = __webpack_require__(/*! ./definitions */ "./src/shared/game/definitions.ts");
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

/***/ "./src/shared/game/definitions.ts":
/*!****************************************!*\
  !*** ./src/shared/game/definitions.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var creatureType_1 = __webpack_require__(/*! ../models/creatureType */ "./src/shared/models/creatureType.ts");
exports.definitions = [
    {
        id: 1,
        name: "Rockat",
        cost: 2,
        type: creatureType_1.CreatureType.Earth,
        stages: [
            {
                hp: 20,
                attack: 15,
                defense: 30,
                speed: 20
            },
            {
                hp: 30,
                attack: 22,
                defense: 33,
                speed: 30
            },
            {
                hp: 35,
                attack: 28,
                defense: 35,
                speed: 36
            }
        ]
    },
    {
        id: 2,
        name: "Grintrock",
        cost: 4,
        type: creatureType_1.CreatureType.Earth,
        stages: [
            {
                hp: 30,
                attack: 12,
                defense: 35,
                speed: 10
            },
            {
                hp: 40,
                attack: 18,
                defense: 38,
                speed: 20
            },
            {
                hp: 55,
                attack: 32,
                defense: 45,
                speed: 24
            }
        ]
    },
    {
        id: 3,
        name: "Heronquak",
        cost: 3,
        type: creatureType_1.CreatureType.Water,
        stages: [
            {
                hp: 20,
                attack: 15,
                defense: 10,
                speed: 35
            },
            {
                hp: 30,
                attack: 21,
                defense: 14,
                speed: 45
            },
            {
                hp: 55,
                attack: 33,
                defense: 20,
                speed: 30
            }
        ]
    },
    {
        id: 4,
        name: "Bigfin",
        cost: 4,
        type: creatureType_1.CreatureType.Water,
        stages: [
            {
                hp: 30,
                attack: 25,
                defense: 20,
                speed: 20
            },
            {
                hp: 40,
                attack: 32,
                defense: 24,
                speed: 24
            },
            {
                hp: 40,
                attack: 52,
                defense: 26,
                speed: 30
            }
        ]
    },
    {
        id: 5,
        name: "Bamboon",
        cost: 2,
        type: creatureType_1.CreatureType.Wood,
        stages: [
            {
                hp: 12,
                attack: 16,
                defense: 10,
                speed: 28
            },
            {
                hp: 18,
                attack: 22,
                defense: 16,
                speed: 34
            },
            {
                hp: 24,
                attack: 25,
                defense: 22,
                speed: 38
            }
        ]
    },
    {
        id: 6,
        name: "Gectile",
        cost: 4,
        type: creatureType_1.CreatureType.Wood,
        stages: [
            {
                hp: 20,
                attack: 15,
                defense: 10,
                speed: 35
            },
            {
                hp: 30,
                attack: 21,
                defense: 14,
                speed: 45
            },
            {
                hp: 55,
                attack: 33,
                defense: 20,
                speed: 30
            }
        ]
    },
    {
        id: 7,
        name: "Arthrobolt",
        cost: 2,
        type: creatureType_1.CreatureType.Metal,
        stages: [
            {
                hp: 20,
                attack: 10,
                defense: 16,
                speed: 14
            },
            {
                hp: 26,
                attack: 16,
                defense: 22,
                speed: 17
            },
            {
                hp: 35,
                attack: 25,
                defense: 20,
                speed: 25
            }
        ]
    },
    {
        id: 8,
        name: "Bugnin",
        cost: 4,
        type: creatureType_1.CreatureType.Metal,
        stages: [
            {
                hp: 20,
                attack: 9,
                defense: 30,
                speed: 20
            },
            {
                hp: 30,
                attack: 12,
                defense: 33,
                speed: 30
            },
            {
                hp: 35,
                attack: 38,
                defense: 35,
                speed: 36
            }
        ]
    },
    {
        id: 9,
        name: "Cardinale",
        cost: 2,
        type: creatureType_1.CreatureType.Fire,
        stages: [
            {
                hp: 12,
                attack: 16,
                defense: 10,
                speed: 28
            },
            {
                hp: 18,
                attack: 22,
                defense: 16,
                speed: 34
            },
            {
                hp: 24,
                attack: 25,
                defense: 20,
                speed: 38
            }
        ]
    },
    {
        id: 10,
        name: "Agnidon",
        cost: 4,
        type: creatureType_1.CreatureType.Fire,
        stages: [
            {
                hp: 20,
                attack: 15,
                defense: 10,
                speed: 35
            },
            {
                hp: 30,
                attack: 21,
                defense: 14,
                speed: 45
            },
            {
                hp: 55,
                attack: 33,
                defense: 20,
                speed: 30
            }
        ]
    },
    {
        id: 11,
        name: "Viviteel",
        cost: 5,
        type: creatureType_1.CreatureType.Metal,
        stages: [
            {
                hp: 30,
                attack: 27,
                defense: 25,
                speed: 35
            },
            {
                hp: 36,
                attack: 35,
                defense: 32,
                speed: 41
            },
            {
                hp: 42,
                attack: 42,
                defense: 39,
                speed: 47
            }
        ]
    }
];


/***/ }),

/***/ "./src/shared/get-total-health-by-team.ts":
/*!************************************************!*\
  !*** ./src/shared/get-total-health-by-team.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
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
exports.getTotalHealthByTeam = function (pieces) {
    var grouped = groupBy(pieces, function (p) { return p.ownerId; });
    return grouped.map(function (_a) {
        var key = _a[0], values = _a[1];
        return {
            ownerId: key,
            totalHealth: values.reduce(function (acc, cur) { return acc + cur.currentHealth; }, 0)
        };
    });
};


/***/ }),

/***/ "./src/shared/get-xp-for-level.ts":
/*!****************************************!*\
  !*** ./src/shared/get-xp-for-level.ts ***!
  \****************************************/
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

/***/ "./src/shared/index.ts":
/*!*****************************!*\
  !*** ./src/shared/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "./src/shared/game-phase.ts");
exports.GamePhase = game_phase_1.GamePhase;
var get_total_health_by_team_1 = __webpack_require__(/*! ./get-total-health-by-team */ "./src/shared/get-total-health-by-team.ts");
exports.getTotalHealthByTeam = get_total_health_by_team_1.getTotalHealthByTeam;
var Constants = __webpack_require__(/*! ./constants */ "./src/shared/constants.ts");
exports.Constants = Constants;
var Models = __webpack_require__(/*! ./models */ "./src/shared/models/index.ts");
exports.Models = Models;
var get_xp_for_level_1 = __webpack_require__(/*! ./get-xp-for-level */ "./src/shared/get-xp-for-level.ts");
exports.getXpToNextLevel = get_xp_for_level_1.getXpToNextLevel;


/***/ }),

/***/ "./src/shared/is-a-team-defeated.ts":
/*!******************************************!*\
  !*** ./src/shared/is-a-team-defeated.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var get_total_health_by_team_1 = __webpack_require__(/*! ./get-total-health-by-team */ "./src/shared/get-total-health-by-team.ts");
exports.isATeamDefeated = function (pieces) {
    var healthByTeam = get_total_health_by_team_1.getTotalHealthByTeam(pieces);
    return healthByTeam.length !== 2 || healthByTeam.some(function (x) { return x.totalHealth === 0; });
};


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

var _this = this;
exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var present = __webpack_require__(/*! present */ "./node_modules/present/lib/present-browser.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var log_1 = __webpack_require__(/*! ../../log */ "./src/shared/log.ts");
var is_a_team_defeated_1 = __webpack_require__(/*! ../../is-a-team-defeated */ "./src/shared/is-a-team-defeated.ts");
var board_1 = __webpack_require__(/*! ../../board */ "./src/shared/board/index.ts");
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
exports.battleEventChannel = function (turnSimulator, turnDuration, startPieces, maxTurns) {
    return redux_saga_1.eventChannel(function (emit) {
        var shouldStop = false;
        var pieces = startPieces;
        var run = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var turnCount, defeated, turnTimer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        turnCount = 0;
                        _a.label = 1;
                    case 1:
                        if (false) {}
                        defeated = is_a_team_defeated_1.isATeamDefeated(pieces);
                        if (shouldStop) {
                            log_1.log("Fight ended at turn " + turnCount + " due to cancellation");
                            emit(finishAction(turnCount));
                            return [3 /*break*/, 3];
                        }
                        if (defeated) {
                            log_1.log("Fight ended at turn " + turnCount);
                            emit(finishAction(turnCount));
                            return [3 /*break*/, 3];
                        }
                        if (turnCount >= maxTurns) {
                            log_1.log("Fight timed out at turn " + turnCount);
                            emit(finishAction(turnCount));
                            return [3 /*break*/, 3];
                        }
                        turnTimer = duration(turnDuration);
                        pieces = turnSimulator.simulateTurn(++turnCount, pieces);
                        emit(board_1.BoardActions.piecesUpdated(pieces));
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
            shouldStop = true;
        };
    });
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
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
                            case 0: return [4 /*yield*/, effects_1.select()];
                            case 1:
                                board = (_a.sent()).board;
                                return [4 /*yield*/, effects_1.call(battleEventChannel_1.battleEventChannel, turnSimulator, turnDuration, board, turnCount)];
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

/***/ "./src/shared/match/combat/get-type-attack-bonus.ts":
/*!**********************************************************!*\
  !*** ./src/shared/match/combat/get-type-attack-bonus.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _a;
var creatureType_1 = __webpack_require__(/*! ../../models/creatureType */ "./src/shared/models/creatureType.ts");
// overcome / generated are Tuxemon language
var typeInteractions = (_a = {},
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
exports.getTypeAttackBonus = function (attackType, defenceType) {
    // an attack is weak against the element that it Generates and strong against the element that it Overcomes.
    var defenderInteractions = typeInteractions[defenceType];
    if (defenderInteractions.generatedBy === attackType) {
        return 0.5;
    }
    if (defenderInteractions.overcomeBy === attackType) {
        return 2;
    }
    return 1;
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
var pathfinding_1 = __webpack_require__(/*! ./pathfinding */ "./src/shared/match/combat/pathfinding.ts");
var getLivingEnemies = function (piece, pieces) {
    return pieces.filter(function (other) { return other.ownerId !== piece.ownerId && other.currentHealth > 0; });
};
var getDelta = function (a, b) {
    return {
        x: Math.abs(a.position.x - b.position.x),
        y: Math.abs(a.position.y - b.position.y)
    };
};
var isAdjacent = function (a) {
    return function (b) {
        var _a = getDelta(a, b), deltaX = _a.x, deltaY = _a.y;
        return (deltaX + deltaY === 1);
    };
};
exports.getAttackableEnemy = function (piece, others) {
    return getLivingEnemies(piece, others).find(isAdjacent(piece)) || null;
};
var getTargetPiece = function (piece, pieces) {
    var enemies = getLivingEnemies(piece, pieces);
    if (enemies.length === 0) {
        return null;
    }
    var enemyDeltas = enemies.map(function (enemy) { return ({
        enemy: enemy,
        delta: getDelta(piece, enemy)
    }); });
    // sort by column then by row
    enemyDeltas.sort(function (a, b) { return a.delta.y - b.delta.y || a.delta.x - b.delta.x; });
    return enemyDeltas[0].enemy;
};
exports.getNewPiecePosition = function (piece, pieces) {
    var target = getTargetPiece(piece, pieces);
    if (target === null) {
        return null;
    }
    return pathfinding_1.getNextPiecePosition(piece, target, pieces);
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
var javascript_astar_1 = __webpack_require__(/*! javascript-astar */ "./node_modules/javascript-astar/astar.js");
var constants_1 = __webpack_require__(/*! ../../constants */ "./src/shared/constants.ts");
var position_1 = __webpack_require__(/*! ../../position */ "./src/shared/position.ts");
var createEmptyWeightGrid = function () {
    var grid = [];
    for (var y = 0; y < constants_1.GRID_SIZE; y++) {
        var row = [];
        for (var x = 0; x < constants_1.GRID_SIZE; x++) {
            row.push(1);
        }
        grid.push(row);
    }
    return grid;
};
var createWeightGrid = function (start, pieces) {
    var grid = createEmptyWeightGrid();
    pieces.forEach(function (piece) {
        var _a = piece.position, x = _a.x, y = _a.y;
        grid[x][y] = 0;
    });
    grid[start.x][start.y] = 1;
    return grid;
};
var findPath = function (pieces, start, end) {
    var weights = createWeightGrid(start, pieces);
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
exports.getNextPiecePosition = function (piece, target, pieces) {
    var targetTiles = position_1.getAdjacentPositions(target);
    var paths = targetTiles.map(function (pos) { return findPath(pieces, piece.position, pos); }).filter(function (path) { return path !== null; });
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var movement_1 = __webpack_require__(/*! ./movement */ "./src/shared/match/combat/movement.ts");
var position_1 = __webpack_require__(/*! ../../position */ "./src/shared/position.ts");
var constants_1 = __webpack_require__(/*! ../../constants */ "./src/shared/constants.ts");
var is_a_team_defeated_1 = __webpack_require__(/*! ../../is-a-team-defeated */ "./src/shared/is-a-team-defeated.ts");
var get_type_attack_bonus_1 = __webpack_require__(/*! ./get-type-attack-bonus */ "./src/shared/match/combat/get-type-attack-bonus.ts");
var TurnSimulator = /** @class */ (function () {
    function TurnSimulator(definitionProvider) {
        this.definitionProvider = definitionProvider;
    }
    TurnSimulator.prototype.simulateTurn = function (turnCount, pieces) {
        var _this = this;
        var updatedPieces = pieces.map(function (p) { return (tslib_1.__assign({}, p, { attacking: null, hit: null, moving: null })); });
        updatedPieces.forEach(function (attacker, index) {
            if (attacker.currentHealth === 0) {
                return;
            }
            var attackerCombatInfo = _this.getPieceCombatInfo(attacker);
            if (attacker.coolDown > 0) {
                attacker.coolDown -= attackerCombatInfo.stats.speed;
                return;
            }
            var defender = movement_1.getAttackableEnemy(attacker, updatedPieces);
            if (!defender) {
                var newPosition = movement_1.getNewPiecePosition(attacker, updatedPieces.filter(function (p) { return p.currentHealth > 0; }));
                if (newPosition !== null) {
                    attacker.moving = { direction: position_1.getRelativeDirection(attacker.position, newPosition) };
                    attacker.position = newPosition;
                    attacker.coolDown = constants_1.INITIAL_COOLDOWN;
                }
                return;
            }
            var defenderCombatInfo = _this.getPieceCombatInfo(defender);
            var updatedFighters = _this.attack(turnCount, attackerCombatInfo, defenderCombatInfo);
            updatedPieces[index] = updatedFighters.attacker;
            updatedPieces[updatedPieces.indexOf(defender)] = updatedFighters.defender;
        });
        if (is_a_team_defeated_1.isATeamDefeated(updatedPieces)) {
            updatedPieces.forEach(function (p) { return p.celebrating = true; });
        }
        return updatedPieces;
    };
    TurnSimulator.prototype.getPieceCombatInfo = function (piece) {
        var definition = this.definitionProvider.get(piece.definitionId);
        return {
            piece: piece,
            stats: definition.stages[piece.stage],
            type: definition.type
        };
    };
    TurnSimulator.prototype.attack = function (turnCount, attacker, defender) {
        if (attacker.piece.currentHealth === 0) {
            // Dead Pokémon don't attack
            return {
                attacker: attacker.piece,
                defender: defender.piece
            };
        }
        var attackBonus = get_type_attack_bonus_1.getTypeAttackBonus(attacker.type, defender.type);
        var damage = (attacker.stats.attack / defender.stats.defense) * attackBonus * 10;
        var newDefenderHealth = Math.max(defender.piece.currentHealth - damage, 0);
        var totalDamage = attacker.piece.damagePerTurn * turnCount;
        return {
            attacker: tslib_1.__assign({}, attacker.piece, { coolDown: constants_1.INITIAL_COOLDOWN, attacking: {
                    direction: position_1.getRelativeDirection(attacker.piece.position, defender.piece.position),
                    damage: damage
                }, damagePerTurn: (totalDamage + (damage * constants_1.DAMAGE_RATIO)) / turnCount }),
            defender: tslib_1.__assign({}, defender.piece, { currentHealth: newDefenderHealth, hit: {
                    direction: position_1.getRelativeDirection(defender.piece.position, attacker.piece.position),
                    damage: damage
                } })
        };
    };
    return TurnSimulator;
}());
exports.TurnSimulator = TurnSimulator;


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

/***/ "./src/shared/packet-opcodes.ts":
/*!**************************************!*\
  !*** ./src/shared/packet-opcodes.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ServerToClientPacketOpcodes;
(function (ServerToClientPacketOpcodes) {
    ServerToClientPacketOpcodes["CARDS_UPDATE"] = "cardsUpdate";
    ServerToClientPacketOpcodes["PLAYER_LIST_UPDATE"] = "playerListUpdate";
    ServerToClientPacketOpcodes["PHASE_UPDATE"] = "phaseUpdate";
    ServerToClientPacketOpcodes["MONEY_UPDATE"] = "moneyUpdate";
    ServerToClientPacketOpcodes["LEVEL_UPDATE"] = "levelUpdate";
    ServerToClientPacketOpcodes["NEW_FEED_MESSAGE"] = "newFeedMessage";
})(ServerToClientPacketOpcodes = exports.ServerToClientPacketOpcodes || (exports.ServerToClientPacketOpcodes = {}));
var ClientToServerPacketOpcodes;
(function (ClientToServerPacketOpcodes) {
    ClientToServerPacketOpcodes["JOIN_GAME"] = "joinGame";
    ClientToServerPacketOpcodes["CREATE_GAME"] = "createGame";
    ClientToServerPacketOpcodes["BUY_CARD"] = "buyCard";
    ClientToServerPacketOpcodes["SELL_PIECE"] = "sellPiece";
    ClientToServerPacketOpcodes["BUY_REROLL"] = "rerollCards";
    ClientToServerPacketOpcodes["MOVE_PIECE_TO_BENCH"] = "movePieceToBench";
    ClientToServerPacketOpcodes["MOVE_PIECE_TO_BOARD"] = "movePieceToBoard";
    ClientToServerPacketOpcodes["BUY_XP"] = "buyXp";
    ClientToServerPacketOpcodes["SEND_CHAT_MESSAGE"] = "sendChatMessage";
    ClientToServerPacketOpcodes["FINISH_MATCH"] = "finishMatch";
    ClientToServerPacketOpcodes["READY_UP"] = "readyUp";
})(ClientToServerPacketOpcodes = exports.ClientToServerPacketOpcodes || (exports.ClientToServerPacketOpcodes = {}));


/***/ }),

/***/ "./src/shared/piece-utils.ts":
/*!***********************************!*\
  !*** ./src/shared/piece-utils.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var uuid = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
var position_1 = __webpack_require__(/*! ./position */ "./src/shared/position.ts");
var constants_1 = __webpack_require__(/*! ./constants */ "./src/shared/constants.ts");
exports.createPiece = function (definitionProvider, ownerId, definitionId, position, damagePerTurn, id, stage) {
    if (stage === void 0) { stage = 0; }
    var stats = definitionProvider.get(definitionId).stages[0];
    return {
        id: id || uuid(),
        ownerId: ownerId,
        definitionId: definitionId,
        position: position_1.createTileCoordinates.apply(void 0, position),
        facingAway: true,
        maxHealth: stats.hp,
        currentHealth: stats.hp,
        coolDown: constants_1.INITIAL_COOLDOWN,
        damagePerTurn: damagePerTurn,
        stage: stage
    };
};
exports.createPieceFromCard = function (definitionProvider, ownerId, card, slot) {
    return exports.createPiece(definitionProvider, ownerId, card.definitionId, [slot, null], null, card.id);
};
exports.clonePiece = function (definitionProvider, piece) {
    return exports.createPiece(definitionProvider, piece.ownerId, piece.definitionId, [piece.position.x, piece.position.y], 0, piece.id, piece.stage);
};
exports.moveOrAddPiece = function (allPieces, target) {
    var result = [];
    var targetAdded = false;
    for (var _i = 0, allPieces_1 = allPieces; _i < allPieces_1.length; _i++) {
        var p = allPieces_1[_i];
        // if this isn't the target just push it
        if (p.id !== target.id) {
            result.push(p);
            continue;
        }
        // otherwise add the target
        result.push(target);
        targetAdded = true;
    }
    if (targetAdded === false) {
        result.push(target);
    }
    return result;
};
exports.rotatePiecePosition = function (piece) {
    piece.position.x = constants_1.GRID_SIZE - 1 - piece.position.x;
    piece.position.y = constants_1.GRID_SIZE - 1 - piece.position.y;
    return piece;
};


/***/ }),

/***/ "./src/shared/position.ts":
/*!********************************!*\
  !*** ./src/shared/position.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var constants_1 = __webpack_require__(/*! ./constants */ "./src/shared/constants.ts");
exports.createTileCoordinates = function (x, y) { return ({ x: x, y: y }); };
var Direction;
(function (Direction) {
    Direction["Up"] = "up";
    Direction["Right"] = "right";
    Direction["Down"] = "down";
    Direction["Left"] = "left";
    Direction["Unknown"] = "unknown";
})(Direction = exports.Direction || (exports.Direction = {}));
var isInsideGrid = function (position) {
    var x = position.x, y = position.y;
    return x >= 0 && y >= 0 && x < constants_1.GRID_SIZE && y < constants_1.GRID_SIZE;
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
        return Direction.Right;
    }
    if (from.x > to.x) {
        return Direction.Left;
    }
    if (from.y < to.y) {
        return Direction.Down;
    }
    if (from.y > to.y) {
        return Direction.Up;
    }
    return Direction.Unknown;
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

/***/ 0:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });