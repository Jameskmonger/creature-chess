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

/***/ "./src/app/display/animation.ts":
/*!**************************************!*\
  !*** ./src/app/display/animation.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var lodash_1 = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
exports.getAnimationCssVariables = function (animations) {
    var variables = lodash_1.assign.apply(void 0, tslib_1.__spread([{}], animations.filter(function (a) { return a.variables; }).map(function (a) { return a.variables; })));
    return lodash_1.assign.apply(void 0, tslib_1.__spread([{}], lodash_1.keys(variables).map(function (key) {
        var _a;
        return (_a = {}, _a["--" + key] = variables[key], _a);
    })));
};


/***/ }),

/***/ "./src/app/display/board/announcement.tsx":
/*!************************************************!*\
  !*** ./src/app/display/board/announcement.tsx ***!
  \************************************************/
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

/***/ "./src/app/display/board/bench.tsx":
/*!*****************************************!*\
  !*** ./src/app/display/board/bench.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var benchTile_1 = __webpack_require__(/*! ./tile/benchTile */ "./src/app/display/board/tile/benchTile.tsx");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var Bench = function (props) {
    // get this from local player style
    var tileStyle = position_1.TileStyle.DEFAULT;
    var tiles = [];
    for (var x = 0; x < models_1.Constants.GRID_SIZE; x++) {
        tiles.push(React.createElement(benchTile_1.BenchTile, { key: "tile-" + x, slot: x, tileStyle: tileStyle }));
    }
    return (React.createElement("div", { className: "tile-row" }, tiles));
};
exports.Bench = Bench;


/***/ }),

/***/ "./src/app/display/board/benchPiece/benchPiece.tsx":
/*!*********************************************************!*\
  !*** ./src/app/display/board/benchPiece/benchPiece.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var recompose_1 = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var benchPieceDragDrop_1 = __webpack_require__(/*! ./benchPieceDragDrop */ "./src/app/display/board/benchPiece/benchPieceDragDrop.ts");
var benchPieceUnconnected_1 = __webpack_require__(/*! ./benchPieceUnconnected */ "./src/app/display/board/benchPiece/benchPieceUnconnected.tsx");
var boardActions_1 = __webpack_require__(/*! ../../../store/actions/boardActions */ "./src/app/store/actions/boardActions.ts");
var mapStateToProps = function (state) { return ({
    canDrag: true
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onBeginDrag: function () { return dispatch(boardActions_1.beginDragBenchPiece()); }
}); };
var BenchPiece = recompose_1.compose(react_redux_1.connect(mapStateToProps, mapDispatchToProps), benchPieceDragDrop_1.benchPieceDragSource)(benchPieceUnconnected_1.BenchPieceUnconnected);
exports.BenchPiece = BenchPiece;


/***/ }),

/***/ "./src/app/display/board/benchPiece/benchPieceDragDrop.ts":
/*!****************************************************************!*\
  !*** ./src/app/display/board/benchPiece/benchPieceDragDrop.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/lib/cjs/index.js");
var benchPieceUnconnected_1 = __webpack_require__(/*! ./benchPieceUnconnected */ "./src/app/display/board/benchPiece/benchPieceUnconnected.tsx");
var selectedPiece = {
    beginDrag: function (props) {
        props.onBeginDrag();
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

/***/ "./src/app/display/board/benchPiece/benchPieceUnconnected.tsx":
/*!********************************************************************!*\
  !*** ./src/app/display/board/benchPiece/benchPieceUnconnected.tsx ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var creatureImage_1 = __webpack_require__(/*! ../../../display/creatureImage */ "./src/app/display/creatureImage.tsx");
var BenchPieceUnconnected = /** @class */ (function (_super) {
    tslib_1.__extends(BenchPieceUnconnected, _super);
    function BenchPieceUnconnected() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BenchPieceUnconnected.prototype.render = function () {
        var _a = this.props, piece = _a.piece, connectDragSource = _a.connectDragSource;
        var definitionId = piece.definitionId, stage = piece.stage;
        return connectDragSource(React.createElement("div", { className: "piece" },
            React.createElement(creatureImage_1.CreatureImage, { definitionId: definitionId }),
            React.createElement("div", { className: "piece-stage" }, stage + 1)));
    };
    return BenchPieceUnconnected;
}(React.Component));
exports.BenchPieceUnconnected = BenchPieceUnconnected;


/***/ }),

/***/ "./src/app/display/board/board.tsx":
/*!*****************************************!*\
  !*** ./src/app/display/board/board.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var boardRow_1 = __webpack_require__(/*! ./boardRow */ "./src/app/display/board/boardRow.tsx");
var opponentBoardPlaceholder_1 = __webpack_require__(/*! ./opponentBoardPlaceholder */ "./src/app/display/board/opponentBoardPlaceholder.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var Board = function (props) {
    var showOpponentBoardPlaceholder = react_redux_1.useSelector(function (state) { return state.game.phase === models_1.GamePhase.WAITING || state.game.phase === models_1.GamePhase.PREPARING; });
    var localPlayerStyle = position_1.TileStyle.DEFAULT;
    var opponentStyle = position_1.TileStyle.DEFAULT;
    var rows = [];
    if (!showOpponentBoardPlaceholder) {
        for (var y = 0; y < models_1.Constants.GRID_SIZE / 2; y++) {
            rows.push(React.createElement(boardRow_1.BoardRow, { key: "tile-row-" + y, y: y, tileStyle: opponentStyle }));
        }
    }
    for (var y = models_1.Constants.GRID_SIZE / 2; y < models_1.Constants.GRID_SIZE; y++) {
        rows.push(React.createElement(boardRow_1.BoardRow, { key: "tile-row-" + y, y: y, tileStyle: localPlayerStyle }));
    }
    return (React.createElement(React.Fragment, null,
        showOpponentBoardPlaceholder && React.createElement(opponentBoardPlaceholder_1.OpponentBoardPlaceholder, null),
        rows));
};
exports.Board = Board;


/***/ }),

/***/ "./src/app/display/board/boardContainer.tsx":
/*!**************************************************!*\
  !*** ./src/app/display/board/boardContainer.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var announcement_1 = __webpack_require__(/*! ./announcement */ "./src/app/display/board/announcement.tsx");
var bench_1 = __webpack_require__(/*! ./bench */ "./src/app/display/board/bench.tsx");
var board_1 = __webpack_require__(/*! ./board */ "./src/app/display/board/board.tsx");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var reconnectModal_1 = __webpack_require__(/*! ./reconnectModal */ "./src/app/display/board/reconnectModal.tsx");
var use_window_size_1 = __webpack_require__(/*! ../../use-window-size */ "./src/app/use-window-size.ts");
var victoryOverlay_1 = __webpack_require__(/*! ./victoryOverlay/victoryOverlay */ "./src/app/display/board/victoryOverlay/victoryOverlay.ts");
var getWidthFromHeight = function (height) {
    return ((height / (models_1.Constants.GRID_SIZE + 1)) * models_1.Constants.GRID_SIZE);
};
var getHeightFromWidth = function (width) {
    return ((width / models_1.Constants.GRID_SIZE) * (models_1.Constants.GRID_SIZE + 1));
};
var BoardContainer = function () {
    var _a = use_window_size_1.useWindowSize(), width = _a.width, height = _a.height;
    var portrait = width < height;
    var boardMargin = 15;
    var marginDelta = boardMargin * 3.1;
    var BOARD_TO_BENCH_SPACE_PX = 12;
    var boardContainerStyle = {
        height: portrait
            ? (getHeightFromWidth(width) - marginDelta + BOARD_TO_BENCH_SPACE_PX) + "px"
            : (height - marginDelta + BOARD_TO_BENCH_SPACE_PX) + "px",
        width: portrait
            ? (width - marginDelta) + "px"
            : (getWidthFromHeight(height) - marginDelta) + "px"
    };
    return (React.createElement("div", { className: "group board-container", style: boardContainerStyle },
        React.createElement("div", { className: "chessboard" },
            React.createElement(board_1.Board, null),
            React.createElement(bench_1.Bench, null)),
        React.createElement(announcement_1.Announcement, null),
        React.createElement(victoryOverlay_1.VictoryOverlay, null),
        React.createElement(reconnectModal_1.ReconnectModal, null)));
};
exports.BoardContainer = BoardContainer;


/***/ }),

/***/ "./src/app/display/board/boardPiece/boardPiece.tsx":
/*!*********************************************************!*\
  !*** ./src/app/display/board/boardPiece/boardPiece.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var recompose_1 = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gameSelector_1 = __webpack_require__(/*! ../../../store/gameSelector */ "./src/app/store/gameSelector.ts");
var boardPieceDragDrop_1 = __webpack_require__(/*! ./boardPieceDragDrop */ "./src/app/display/board/boardPiece/boardPieceDragDrop.ts");
var boardPieceUnconnected_1 = __webpack_require__(/*! ./boardPieceUnconnected */ "./src/app/display/board/boardPiece/boardPieceUnconnected.tsx");
var boardActions_1 = __webpack_require__(/*! ../../../store/actions/boardActions */ "./src/app/store/actions/boardActions.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var mapStateToProps = function (state) { return ({
    canDrag: state.game.phase === models_1.GamePhase.PREPARING,
    showDamagePerTurn: state.game.phase === models_1.GamePhase.PREPARING,
    showHealthbar: state.game.phase === models_1.GamePhase.READY || state.game.phase === models_1.GamePhase.PLAYING,
    animate: state.game.debug === false,
    localPlayerId: gameSelector_1.localPlayerIdSelector(state)
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onBeginDrag: function () { return dispatch(boardActions_1.beginDragBoardPiece()); }
}); };
var BoardPiece = recompose_1.compose(react_redux_1.connect(mapStateToProps, mapDispatchToProps), boardPieceDragDrop_1.boardPieceDragSource)(boardPieceUnconnected_1.BoardPieceUnconnected);
exports.BoardPiece = BoardPiece;


/***/ }),

/***/ "./src/app/display/board/boardPiece/boardPieceDragDrop.ts":
/*!****************************************************************!*\
  !*** ./src/app/display/board/boardPiece/boardPieceDragDrop.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/lib/cjs/index.js");
var boardPieceProps_1 = __webpack_require__(/*! ./boardPieceProps */ "./src/app/display/board/boardPiece/boardPieceProps.ts");
var boardPieceUnconnected_1 = __webpack_require__(/*! ./boardPieceUnconnected */ "./src/app/display/board/boardPiece/boardPieceUnconnected.tsx");
var selectedPiece = {
    beginDrag: function (props) {
        props.onBeginDrag();
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

/***/ "./src/app/display/board/boardPiece/boardPieceProps.ts":
/*!*************************************************************!*\
  !*** ./src/app/display/board/boardPiece/boardPieceProps.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.isFriendly = function (props) { return props.localPlayerId === props.piece.ownerId; };


/***/ }),

/***/ "./src/app/display/board/boardPiece/boardPieceUnconnected.tsx":
/*!********************************************************************!*\
  !*** ./src/app/display/board/boardPiece/boardPieceUnconnected.tsx ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var progressBar_1 = __webpack_require__(/*! ../../../display/progressBar */ "./src/app/display/progressBar.tsx");
var animation_1 = __webpack_require__(/*! ../../../display/animation */ "./src/app/display/animation.ts");
var creatureImage_1 = __webpack_require__(/*! ../../../display/creatureImage */ "./src/app/display/creatureImage.tsx");
var boardPieceProps_1 = __webpack_require__(/*! ./boardPieceProps */ "./src/app/display/board/boardPiece/boardPieceProps.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
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
            _this.setState(function (prevState) { return (tslib_1.__assign({}, prevState, { currentAnimations: tslib_1.__spread(prevState.currentAnimations, [{ name: name, variables: variables }]) })); });
        };
        _this.onAnimationEnd = function (event) {
            var animationName = event.animationName;
            _this.setState(function (prevState) { return (tslib_1.__assign({}, prevState, { currentAnimations: tslib_1.__spread(prevState.currentAnimations.filter(function (a) { return a.name !== animationName && !a.name.startsWith("move-"); })) })); });
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
        var facingAway = piece.facingAway, definitionId = piece.definitionId, currentHealth = piece.currentHealth, maxHealth = piece.maxHealth, coolDown = piece.coolDown, stage = piece.stage, damagePerTurn = piece.damagePerTurn;
        var currentAnimations = this.state.currentAnimations;
        var friendly = boardPieceProps_1.isFriendly(this.props);
        return connectDragSource(React.createElement("div", { className: "piece " + currentAnimations.map(function (a) { return a.name; }).join(" "), 
            // tslint:disable-next-line: jsx-ban-props
            style: animation_1.getAnimationCssVariables(currentAnimations), onAnimationEnd: this.onAnimationEnd },
            React.createElement(creatureImage_1.CreatureImage, { definitionId: definitionId, facing: facingAway ? "back" : "front" }),
            showDamagePerTurn
                && damagePerTurn !== null
                && React.createElement("div", { className: "damage-per-turn" },
                    damagePerTurn.toFixed(0),
                    " dpt"),
            React.createElement("div", { className: "piece-stage" }, stage + 1),
            showHealthbar
                && (React.createElement("div", { className: "info" },
                    React.createElement(progressBar_1.ProgressBar, { className: "healthbar " + (friendly ? "friendly" : "enemy"), current: currentHealth, max: maxHealth }),
                    React.createElement(progressBar_1.ProgressBar, { className: "cooldownbar", current: coolDown, max: models_1.Constants.INITIAL_COOLDOWN })))));
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
    for (var x = 0; x < models_1.Constants.GRID_SIZE; x++) {
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

/***/ "./src/app/display/board/opponentBoardPlaceholder.tsx":
/*!************************************************************!*\
  !*** ./src/app/display/board/opponentBoardPlaceholder.tsx ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var readyUpButton_1 = __webpack_require__(/*! ./readyUpButton */ "./src/app/display/board/readyUpButton.tsx");
exports.OpponentBoardPlaceholder = function (props) {
    return (React.createElement("div", { className: "opponent-board-placeholder" },
        React.createElement("span", { className: "label" }, "Opponent's Board"),
        React.createElement(readyUpButton_1.ReadyUpButton, null)));
};


/***/ }),

/***/ "./src/app/display/board/readyUpButton.tsx":
/*!*************************************************!*\
  !*** ./src/app/display/board/readyUpButton.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var localPlayerActions_1 = __webpack_require__(/*! ../../store/actions/localPlayerActions */ "./src/app/store/actions/localPlayerActions.ts");
var ReadyUpButton = function () {
    var canReadyUp = react_redux_1.useSelector(function (state) { return state.game.phase === models_1.GamePhase.PREPARING && state.localPlayer.ready === false; });
    var dispatch = react_redux_1.useDispatch();
    if (!canReadyUp) {
        return null;
    }
    var onReadyUp = function () { return dispatch(localPlayerActions_1.readyUpAction()); };
    return React.createElement("button", { className: "ready-up", onClick: onReadyUp }, "Click to Ready Up");
};
exports.ReadyUpButton = ReadyUpButton;


/***/ }),

/***/ "./src/app/display/board/reconnectModal.tsx":
/*!**************************************************!*\
  !*** ./src/app/display/board/reconnectModal.tsx ***!
  \**************************************************/
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
        connectionStatus === networking_1.ConnectionStatus.DISCONNECTED_WILL_RECONNECT
            && (React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text" }, "Oops - you've been disconnected"),
                React.createElement("p", { className: "text" }, "Please wait while we reconnect you..."))),
        connectionStatus === networking_1.ConnectionStatus.RECONNECTED_NEED_AUTHENTICATION
            && (React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text" }, "Restoring connection with server"),
                React.createElement("p", { className: "text" }, "Authenticating with server..."))),
        connectionStatus === networking_1.ConnectionStatus.RECONNECTED
            && (React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text" }, "Reconnected!"),
                React.createElement("p", { className: "text" }, "Please wait for the current round to finish..."))),
        connectionStatus === networking_1.ConnectionStatus.DISCONNECTED_FINAL
            && (React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text" }, "Sorry - we couldn't reconnect you"),
                React.createElement("p", { className: "text" }, "We're working on fixing this")))));
};
exports.ReconnectModal = ReconnectModal;


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
var benchPiece_1 = __webpack_require__(/*! ../benchPiece/benchPiece */ "./src/app/display/board/benchPiece/benchPiece.tsx");
var renderBenchTilePiece = function (piece) { return React.createElement(benchPiece_1.BenchPiece, { piece: piece, key: piece.id }); };
var BenchTile = function (props) {
    return (React.createElement(tile_1.Tile, { type: position_1.TileType.BENCH, x: props.slot, y: null, renderPiece: renderBenchTilePiece, tileStyle: props.tileStyle }));
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
var boardPiece_1 = __webpack_require__(/*! ../boardPiece/boardPiece */ "./src/app/display/board/boardPiece/boardPiece.tsx");
var renderBoardTilePiece = function (piece) { return React.createElement(boardPiece_1.BoardPiece, { piece: piece, key: piece.id }); };
var BoardTile = function (props) {
    return (React.createElement(tile_1.Tile, { type: position_1.TileType.BOARD, x: props.x, y: props.y, renderPiece: renderBoardTilePiece, tileStyle: props.tileStyle }));
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
var recompose_1 = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var pieceSelectors_1 = __webpack_require__(/*! ../../../store/pieceSelectors */ "./src/app/store/pieceSelectors.ts");
var tileDragDrop_1 = __webpack_require__(/*! ./tileDragDrop */ "./src/app/display/board/tile/tileDragDrop.ts");
var tileUnconnected_1 = __webpack_require__(/*! ./tileUnconnected */ "./src/app/display/board/tile/tileUnconnected.tsx");
var boardActions_1 = __webpack_require__(/*! src/app/store/actions/boardActions */ "./src/app/store/actions/boardActions.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var actions_1 = __webpack_require__(/*! @common/player/actions */ "./src/shared/player/actions.ts");
var pieceSelectors_2 = __webpack_require__(/*! @common/player/pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var gameActions_1 = __webpack_require__(/*! @app/store/actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var canDropPieceOnTile = function (props) {
    return function (piece) {
        var tileEmpty = props.piece === null;
        var boardLocked = props.gamePhase !== models_1.GamePhase.PREPARING;
        return board_1.canDropPiece(piece, props.x, props.y, tileEmpty, boardLocked, props.belowPieceLimit);
    };
};
var mapStateToProps = function (state, ownProps) {
    var piece = (ownProps.type === position_1.TileType.BOARD
        ? pieceSelectors_1.boardTilePieceSelector(state, ownProps)
        : pieceSelectors_1.benchTilePieceSelector(state, ownProps));
    // todo make a reselect selector for this
    var selectedPiece = pieceSelectors_2.getPiece(state, state.game.selectedPieceId);
    return {
        piece: piece,
        gamePhase: state.game.phase,
        belowPieceLimit: pieceSelectors_1.ownedPieceSelector(state).length < state.localPlayer.level,
        selectedPiece: selectedPiece
    };
};
var mapDispatchToProps = function (dispatch, ownProps) { return ({
    onDropPiece: function (piece) {
        var from = (piece.position.y !== null
            ? ({
                type: "board",
                location: { x: piece.position.x, y: piece.position.y }
            })
            : ({
                type: "bench",
                location: { slot: piece.position.x }
            }));
        var to = (ownProps.type === position_1.TileType.BOARD
            ? ({
                type: "board",
                location: { x: ownProps.x, y: ownProps.y }
            })
            : ({
                type: "bench",
                location: { slot: ownProps.x }
            }));
        dispatch(actions_1.playerDropPiece(piece.id, from, to));
        dispatch(gameActions_1.clearSelectedPiece());
    },
    onSelectPiece: function (piece) { return dispatch(boardActions_1.selectPiece(piece)); }
}); };
var Tile = recompose_1.compose(react_redux_1.connect(mapStateToProps, mapDispatchToProps), recompose_1.withHandlers({
    canDropPiece: canDropPieceOnTile
}), tileDragDrop_1.tileDropTarget)(tileUnconnected_1.TileUnconnected);
exports.Tile = Tile;


/***/ }),

/***/ "./src/app/display/board/tile/tileDragDrop.ts":
/*!****************************************************!*\
  !*** ./src/app/display/board/tile/tileDragDrop.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/lib/cjs/index.js");
var tileUnconnected_1 = __webpack_require__(/*! ./tileUnconnected */ "./src/app/display/board/tile/tileUnconnected.tsx");
var boxTarget = {
    drop: function (props, monitor) {
        var item = monitor.getItem();
        return props.onDropPiece(item);
    },
    canDrop: function (props, monitor) {
        var item = monitor.getItem();
        return props.canDropPiece(item);
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

/***/ "./src/app/display/board/tile/tileUnconnected.tsx":
/*!********************************************************!*\
  !*** ./src/app/display/board/tile/tileUnconnected.tsx ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var getClassForTileStyle_1 = __webpack_require__(/*! ../getClassForTileStyle */ "./src/app/display/board/getClassForTileStyle.ts");
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
var TileUnconnected = function (props) {
    var type = props.type, piece = props.piece, x = props.x, y = props.y, renderPiece = props.renderPiece, connectDropTarget = props.connectDropTarget, isDragging = props.isDragging, canDrop = props.canDrop, canDropPiece = props.canDropPiece, currentSelectedPiece = props.selectedPiece, onDropPiece = props.onDropPiece, onSelectPiece = props.onSelectPiece, gamePhase = props.gamePhase, tileStyle = props.tileStyle;
    var canSelectPiece = (gamePhase === models_1.GamePhase.PREPARING || type === position_1.TileType.BENCH);
    var selectPiece = function () { return canSelectPiece && onSelectPiece(piece); };
    var dropPiece = function () { return canDropPiece(currentSelectedPiece) && onDropPiece(currentSelectedPiece); };
    // this can be improved by having a piece movement saga
    // that just listens for clicks and drops
    var onClick = (piece
        ? selectPiece
        : ((currentSelectedPiece)
            ? dropPiece
            : null));
    var isSelected = piece && currentSelectedPiece && piece.id === currentSelectedPiece.id;
    return connectDropTarget(React.createElement("div", { className: "tile " + getClassName(type, x, y) + (isSelected ? " selected" : "") + " " + getClassForTileStyle_1.getClassForTileStyle(tileStyle), "touch-action": "none", onPointerUp: onClick },
        piece && renderPiece(piece),
        React.createElement("div", { className: "" + getOverlayClassName(isDragging, canDrop) })));
};
exports.TileUnconnected = TileUnconnected;


/***/ }),

/***/ "./src/app/display/board/victoryOverlay/victoryOverlay.ts":
/*!****************************************************************!*\
  !*** ./src/app/display/board/victoryOverlay/victoryOverlay.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var victoryOverlayUnconnected_1 = __webpack_require__(/*! ./victoryOverlayUnconnected */ "./src/app/display/board/victoryOverlay/victoryOverlayUnconnected.tsx");
var mapStateToProps = function (state, ownProps) {
    return {
        winnerName: state.game.winnerName
    };
};
exports.VictoryOverlay = react_redux_1.connect(mapStateToProps)(victoryOverlayUnconnected_1.VictoryOverlayUnconnected);


/***/ }),

/***/ "./src/app/display/board/victoryOverlay/victoryOverlayUnconnected.tsx":
/*!****************************************************************************!*\
  !*** ./src/app/display/board/victoryOverlay/victoryOverlayUnconnected.tsx ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
exports.VictoryOverlayUnconnected = function (_a) {
    var winnerName = _a.winnerName;
    if (!winnerName) {
        return null;
    }
    return (React.createElement("div", { className: "victory" },
        React.createElement("h2", { className: "game-over" }, "Game Over"),
        React.createElement("p", null,
            React.createElement("span", { className: "winner" }, winnerName),
            " wins!")));
};


/***/ }),

/***/ "./src/app/display/countdown.tsx":
/*!***************************************!*\
  !*** ./src/app/display/countdown.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
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
    return (React.createElement("img", { className: "image", src: "images/" + (facing || "front") + "/" + definitionId + "_0.png" }));
};
exports.CreatureImage = CreatureImage;


/***/ }),

/***/ "./src/app/display/gameId.tsx":
/*!************************************!*\
  !*** ./src/app/display/gameId.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var GameIdUnconnected = function (_a) {
    var gameId = _a.gameId;
    // currently unused, will be used for spectator mode
    return null; // <div className="game-id">Game ID: {gameId}</div>;
};
var mapStateToProps = function (state) { return ({
    gameId: state.game.gameId
}); };
var GameId = react_redux_1.connect(mapStateToProps)(GameIdUnconnected);
exports.GameId = GameId;


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
var PhaseInfoUnconnected = function (_a) {
    var phase = _a.phase, phaseStartedAtSeconds = _a.phaseStartedAtSeconds;
    if (phase === models_1.GamePhase.WAITING) {
        return React.createElement("div", { className: "phase-info" }, "Waiting for players");
    }
    if (phase === models_1.GamePhase.DEAD) {
        return React.createElement("div", { className: "phase-info" }, "You are dead");
    }
    var phaseEndTime = models_1.Constants.PHASE_LENGTHS[phase] + phaseStartedAtSeconds;
    return React.createElement("div", { className: "phase-info" },
        models_1.GamePhase[phase],
        " - ",
        React.createElement(countdown_1.Countdown, { countdownToSeconds: phaseEndTime }));
};
var mapStateToProps = function (state) { return ({
    phase: state.game.phase,
    phaseStartedAtSeconds: state.game.phaseStartedAtSeconds
}); };
var PhaseInfo = react_redux_1.connect(mapStateToProps)(PhaseInfoUnconnected);
exports.PhaseInfo = PhaseInfo;


/***/ }),

/***/ "./src/app/display/profile.tsx":
/*!*************************************!*\
  !*** ./src/app/display/profile.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var progressBar_1 = __webpack_require__(/*! ./progressBar */ "./src/app/display/progressBar.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var utils_1 = __webpack_require__(/*! @common/utils */ "./src/shared/utils/index.ts");
var pieceSelectors_1 = __webpack_require__(/*! ../store/pieceSelectors */ "./src/app/store/pieceSelectors.ts");
var localPlayerActions_1 = __webpack_require__(/*! ../store/actions/localPlayerActions */ "./src/app/store/actions/localPlayerActions.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var renderProgressBar = function (current, max) { return current + " / " + max + " xp"; };
var ProfileUnconnected = function (props) {
    var name = props.name, level = props.level, xp = props.xp, pieceCount = props.pieceCount, gameStarted = props.gameStarted, onBuyXp = props.onBuyXp;
    if (gameStarted === false) {
        return null;
    }
    var xpForNextLevel = utils_1.getXpToNextLevel(level);
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
                models_1.Constants.BUY_XP_AMOUNT,
                " xp ($",
                models_1.Constants.BUY_XP_COST,
                ")"))));
};
var mapStateToProps = function (state) { return ({
    name: state.localPlayer.name,
    level: state.localPlayer.level,
    xp: state.localPlayer.xp,
    gameStarted: state.game.phase !== models_1.GamePhase.WAITING,
    pieceCount: pieceSelectors_1.ownedPieceSelector(state).length
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onBuyXp: function () { return dispatch(localPlayerActions_1.buyXpAction()); }
}); };
var Profile = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ProfileUnconnected);
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
    var className = _a.className, current = _a.current, max = _a.max, renderContents = _a.renderContents;
    return (React.createElement("div", { className: className },
        React.createElement("div", { className: "fill", style: { width: getPercentage(current, max) } }),
        renderContents
            && React.createElement("span", { className: "contents" }, renderContents(current, max))));
};
exports.ProgressBar = ProgressBar;


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

/***/ "./src/app/display/stages/game.tsx":
/*!*****************************************!*\
  !*** ./src/app/display/stages/game.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gameStage_1 = __webpack_require__(/*! ./gameStage */ "./src/app/display/stages/gameStage.tsx");
var menuStage_1 = __webpack_require__(/*! ./menuStage */ "./src/app/display/stages/menuStage.tsx");
var lobbyStage_1 = __webpack_require__(/*! ./lobbyStage */ "./src/app/display/stages/lobbyStage.tsx");
var GameState;
(function (GameState) {
    GameState[GameState["MENU"] = 0] = "MENU";
    GameState[GameState["LOBBY"] = 1] = "LOBBY";
    GameState[GameState["GAME"] = 2] = "GAME";
})(GameState || (GameState = {}));
var GameUnconnected = /** @class */ (function (_super) {
    tslib_1.__extends(GameUnconnected, _super);
    function GameUnconnected() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameUnconnected.prototype.render = function () {
        var gameState = this.props.gameState;
        if (gameState === GameState.GAME) {
            return React.createElement(gameStage_1.GameStage, null);
        }
        if (gameState === GameState.LOBBY) {
            return React.createElement(lobbyStage_1.LobbyStage, null);
        }
        return React.createElement(menuStage_1.MenuStage, null);
    };
    return GameUnconnected;
}(React.Component));
var gameStateSelector = function (state) {
    if (state.localPlayer.id !== null) {
        return GameState.GAME;
    }
    if (state.lobby.lobbyId !== null) {
        return GameState.LOBBY;
    }
    return GameState.MENU;
};
var mapStateToProps = function (state) { return ({
    gameState: gameStateSelector(state)
}); };
var Game = react_redux_1.connect(mapStateToProps)(GameUnconnected);
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// tslint:disable:jsx-ban-props
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/lib/cjs/index.js");
var react_dnd_multi_backend_1 = __webpack_require__(/*! react-dnd-multi-backend */ "./node_modules/react-dnd-multi-backend/lib/index.js");
var HTML5toTouch_1 = __webpack_require__(/*! react-dnd-multi-backend/lib/HTML5toTouch */ "./node_modules/react-dnd-multi-backend/lib/HTML5toTouch.js");
var cardShop_1 = __webpack_require__(/*! ../../features/cardShop/cardShop */ "./src/app/features/cardShop/cardShop.tsx");
var playerList_1 = __webpack_require__(/*! ../../features/playerList/playerList */ "./src/app/features/playerList/playerList.tsx");
var react_media_1 = __webpack_require__(/*! react-media */ "./node_modules/react-media/esm/react-media.js");
var phaseInfo_1 = __webpack_require__(/*! ../../display/phaseInfo */ "./src/app/display/phaseInfo.tsx");
var profile_1 = __webpack_require__(/*! ../../display/profile */ "./src/app/display/profile.tsx");
var feed_1 = __webpack_require__(/*! ../../features/feed/feed */ "./src/app/features/feed/feed.tsx");
var gameId_1 = __webpack_require__(/*! ../../display/gameId */ "./src/app/display/gameId.tsx");
var roundIndicator_1 = __webpack_require__(/*! ../../display/roundIndicator */ "./src/app/display/roundIndicator.tsx");
var boardContainer_1 = __webpack_require__(/*! ../board/boardContainer */ "./src/app/display/board/boardContainer.tsx");
var GameStageUnconnected = /** @class */ (function (_super) {
    tslib_1.__extends(GameStageUnconnected, _super);
    function GameStageUnconnected() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameStageUnconnected.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(react_media_1["default"], { query: "(orientation: landscape) and (min-width: 1200px)" },
                React.createElement("div", { className: "game landscape" },
                    React.createElement("div", { className: "group" },
                        React.createElement(roundIndicator_1.RoundIndicator, null),
                        React.createElement(phaseInfo_1.PhaseInfo, null),
                        React.createElement(playerList_1.PlayerList, null),
                        React.createElement(gameId_1.GameId, null),
                        React.createElement(feed_1.Feed, null)),
                    React.createElement(boardContainer_1.BoardContainer, null),
                    React.createElement("div", { className: "group" },
                        React.createElement(cardShop_1.CardShop, null),
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
                        React.createElement(cardShop_1.CardShop, null),
                        React.createElement(profile_1.Profile, null),
                        React.createElement(playerList_1.PlayerList, null),
                        React.createElement(gameId_1.GameId, null),
                        React.createElement("div", { className: "github-link" },
                            React.createElement("a", { href: "https://reddit.com/r/creaturechess/" }, "/r/CreatureChess"),
                            " - ",
                            React.createElement("a", { href: "https://github.com/Jameskmonger/creature-chess" }, "Source and Licenses on GitHub")),
                        React.createElement(feed_1.Feed, null)))),
            React.createElement(react_media_1["default"], { query: "(orientation: portrait), (max-width: 599px)" },
                React.createElement("div", { className: "game portrait" },
                    React.createElement(boardContainer_1.BoardContainer, null),
                    React.createElement("div", { className: "group" },
                        React.createElement(roundIndicator_1.RoundIndicator, null),
                        React.createElement(phaseInfo_1.PhaseInfo, null),
                        React.createElement(cardShop_1.CardShop, null),
                        React.createElement(profile_1.Profile, null),
                        React.createElement(playerList_1.PlayerList, null),
                        React.createElement(gameId_1.GameId, null),
                        React.createElement("div", { className: "github-link" },
                            React.createElement("a", { href: "https://reddit.com/r/creaturechess/" }, "/r/CreatureChess"),
                            " - ",
                            React.createElement("a", { href: "https://github.com/Jameskmonger/creature-chess" }, "Source and Licenses on GitHub")),
                        React.createElement(feed_1.Feed, null))))));
    };
    return GameStageUnconnected;
}(React.Component));
var GameStage = react_dnd_1.DragDropContext(react_dnd_multi_backend_1["default"](HTML5toTouch_1["default"]))(GameStageUnconnected);
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gameActions_1 = __webpack_require__(/*! ../../store/actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var gameSelector_1 = __webpack_require__(/*! ../../store/gameSelector */ "./src/app/store/gameSelector.ts");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var get_url_parameter_1 = __webpack_require__(/*! ../../get-url-parameter */ "./src/app/get-url-parameter.ts");
var MenuStageUnconnected = /** @class */ (function (_super) {
    tslib_1.__extends(MenuStageUnconnected, _super);
    function MenuStageUnconnected() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            name: "",
            gameId: "",
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
        _this.onNameChange = function (event) {
            _this.setState({
                name: event.target.value
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
        _this.onFindGameClick = function () {
            if (!_this.state.serverIP) {
                _this.props.setError("Server IP field empty");
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
            _this.props.onFindGame(_this.state.serverIP, _this.state.name);
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
            _this.props.onCreateGame(_this.state.serverIP, _this.state.name);
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
            React.createElement("div", { className: "join-game" },
                title,
                React.createElement("p", null, "Enter your name and select one of the options below to start playing"),
                React.createElement("input", { value: this.state.name, onChange: this.onNameChange, maxLength: constants_1.MAX_NAME_LENGTH, placeholder: "Your name", className: "name-input" }),
                React.createElement("div", { className: "join-options" },
                    React.createElement("div", { className: "option" },
                        React.createElement("button", { onClick: this.onFindGameClick, className: "option-button primary" }, "Find Game"),
                        React.createElement("p", { className: "description" }, "Automatically find a public game for you")),
                    React.createElement("div", { className: "option" },
                        React.createElement("input", { value: this.state.gameId, onChange: this.onGameIdChange, placeholder: "Game ID", className: "option-input" }),
                        React.createElement("button", { onClick: this.onJoinGameClick, className: "option-button primary" }, "Join Game"),
                        React.createElement("p", { className: "description" }, "Join a specific game")),
                    React.createElement("div", { className: "option" },
                        React.createElement("button", { onClick: this.onCreateGameClick, className: "option-button secondary" }, "Create Private Game"),
                        React.createElement("p", { className: "description" }, "Create a private game that others can join"))),
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
    onFindGame: function (serverIP, name) { return dispatch(gameActions_1.findGameAction(serverIP, name)); },
    onCreateGame: function (serverIP, name) { return dispatch(gameActions_1.createGameAction(serverIP, name)); },
    onJoinGame: function (serverIP, name, gameId) { return dispatch(gameActions_1.joinGameAction(serverIP, name, gameId)); },
    enableDebugMode: function () { return dispatch(gameActions_1.enableDebugMode()); },
    setError: function (error) { return dispatch(gameActions_1.joinGameError(error)); }
}); };
var MenuStage = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MenuStageUnconnected);
exports.MenuStage = MenuStage;


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
    var definitionId = _a.definitionId, cost = _a.cost, name = _a.name, buyable = _a.buyable, onClick = _a.onClick;
    var className = "card " + definitionProvider.get(definitionId).type.toLowerCase() + (buyable ? "" : " not-buyable");
    return (React.createElement("div", { className: className, onClick: buyable ? onClick : undefined },
        React.createElement("div", { className: "header" },
            React.createElement("div", null,
                React.createElement("span", { className: "price" },
                    "$",
                    cost)),
            React.createElement("div", null,
                React.createElement(display_1.CreatureImage, { definitionId: definitionId }))),
        React.createElement("div", null, name)));
};
exports.Card = Card;


/***/ }),

/***/ "./src/app/features/cardShop/cardActionTypes.ts":
/*!******************************************************!*\
  !*** ./src/app/features/cardShop/cardActionTypes.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.CARDS_UPDATED = "CARDS_UPDATED";
exports.REROLL_CARDS = "REROLL_CARDS";
exports.BUY_CARD = "BUY_CARD";


/***/ }),

/***/ "./src/app/features/cardShop/cardActions.ts":
/*!**************************************************!*\
  !*** ./src/app/features/cardShop/cardActions.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var cardActionTypes_1 = __webpack_require__(/*! ./cardActionTypes */ "./src/app/features/cardShop/cardActionTypes.ts");
exports.cardsUpdated = function (payload) { return ({
    type: cardActionTypes_1.CARDS_UPDATED,
    payload: payload
}); };
exports.rerollCards = function () { return ({ type: cardActionTypes_1.REROLL_CARDS }); };
exports.buyCard = function (index) { return ({
    type: cardActionTypes_1.BUY_CARD,
    payload: {
        index: index
    }
}); };


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
var cardActions_1 = __webpack_require__(/*! ./cardActions */ "./src/app/features/cardShop/cardActions.ts");
var dropToSell_1 = __webpack_require__(/*! ./dropToSell/dropToSell */ "./src/app/features/cardShop/dropToSell/dropToSell.tsx");
var rerollButton_1 = __webpack_require__(/*! ./rerollButton */ "./src/app/features/cardShop/rerollButton.tsx");
var balanceDisplay_1 = __webpack_require__(/*! ./balanceDisplay */ "./src/app/features/cardShop/balanceDisplay.tsx");
var lockButton_1 = __webpack_require__(/*! ./lockButton */ "./src/app/features/cardShop/lockButton.tsx");
var gameActions_1 = __webpack_require__(/*! ../../store/actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var CardShopDivider = function () { return React.createElement("span", { className: "item" }, "\u00A0|\u00A0"); };
var CardShopUnconnected = function (props) {
    var cards = props.cards, money = props.money, onReroll = props.onReroll, onBuyCard = props.onBuyCard, canUseShop = props.canUseShop, shopLocked = props.shopLocked, onToggleLock = props.onToggleLock;
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
    var rerollBuyable = money >= models_1.Constants.REROLL_COST;
    return (React.createElement("div", { className: "card-selector" },
        React.createElement("div", { className: "balance" },
            React.createElement(balanceDisplay_1.BalanceDisplay, { value: money }),
            React.createElement(CardShopDivider, null),
            React.createElement(rerollButton_1.RerollButton, { buyable: rerollBuyable, cost: models_1.Constants.REROLL_COST, onBuy: onReroll }),
            React.createElement(CardShopDivider, null),
            React.createElement(lockButton_1.LockButton, { locked: shopLocked, onToggle: onToggleLock })),
        React.createElement("div", { className: "cards" },
            React.createElement("div", { className: "shop" }, cards.map(createCard)),
            React.createElement(dropToSell_1.DropToSell, null))));
};
var mapStateToProps = function (state) { return ({
    cards: state.cards,
    money: state.game.money,
    canUseShop: state.game.phase !== models_1.GamePhase.WAITING && state.game.phase !== models_1.GamePhase.DEAD,
    shopLocked: state.game.shopLocked
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onReroll: function () { return dispatch(cardActions_1.rerollCards()); },
    onBuyCard: function (index) { return dispatch(cardActions_1.buyCard(index)); },
    onToggleLock: function () { return dispatch(gameActions_1.toggleShopLock()); }
}); };
var CardShop = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CardShopUnconnected);
exports.CardShop = CardShop;


/***/ }),

/***/ "./src/app/features/cardShop/cardsReducer.ts":
/*!***************************************************!*\
  !*** ./src/app/features/cardShop/cardsReducer.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var cardActionTypes_1 = __webpack_require__(/*! ./cardActionTypes */ "./src/app/features/cardShop/cardActionTypes.ts");
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

/***/ "./src/app/features/cardShop/dropToSell/dropToSell.tsx":
/*!*************************************************************!*\
  !*** ./src/app/features/cardShop/dropToSell/dropToSell.tsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var dropToSellDragDrop_1 = __webpack_require__(/*! ./dropToSellDragDrop */ "./src/app/features/cardShop/dropToSell/dropToSellDragDrop.ts");
var recompose_1 = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
var dropToSellUnconnected_1 = __webpack_require__(/*! ./dropToSellUnconnected */ "./src/app/features/cardShop/dropToSell/dropToSellUnconnected.tsx");
var mapDispatchToProps = function (dispatch) { return ({
    onDropPiece: function (piece) { return dispatch(board_1.BoardActions.removeBoardPiece(piece.id)); }
}); };
var DropToSell = recompose_1.compose(react_redux_1.connect(null, mapDispatchToProps), dropToSellDragDrop_1.dropToSellDropTarget)(dropToSellUnconnected_1.DropToSellUnconnected);
exports.DropToSell = DropToSell;


/***/ }),

/***/ "./src/app/features/cardShop/dropToSell/dropToSellDragDrop.ts":
/*!********************************************************************!*\
  !*** ./src/app/features/cardShop/dropToSell/dropToSellDragDrop.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/lib/cjs/index.js");
var dropToSellUnconnected_1 = __webpack_require__(/*! ./dropToSellUnconnected */ "./src/app/features/cardShop/dropToSell/dropToSellUnconnected.tsx");
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

/***/ "./src/app/features/cardShop/dropToSell/dropToSellUnconnected.tsx":
/*!************************************************************************!*\
  !*** ./src/app/features/cardShop/dropToSell/dropToSellUnconnected.tsx ***!
  \************************************************************************/
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

/***/ "./src/app/features/cardShop/lockButton.tsx":
/*!**************************************************!*\
  !*** ./src/app/features/cardShop/lockButton.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var fa_1 = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
var LockButton = function (_a) {
    var locked = _a.locked, onToggle = _a.onToggle;
    return (React.createElement(React.Fragment, null,
        React.createElement("span", { className: "item" }, locked
            ? React.createElement(fa_1.FaLock, { className: "lock-icon", onClick: onToggle })
            : React.createElement(fa_1.FaLockOpen, { className: "lock-icon", onClick: onToggle }))));
};
exports.LockButton = LockButton;


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
    return (React.createElement(React.Fragment, null,
        React.createElement("span", { className: "item" },
            React.createElement("button", { className: "reroll", onClick: buyable ? onBuy : undefined, disabled: buyable === false },
                "New Cards ($",
                cost,
                ")"))));
};
exports.RerollButton = RerollButton;


/***/ }),

/***/ "./src/app/features/chat/chatActionTypes.ts":
/*!**************************************************!*\
  !*** ./src/app/features/chat/chatActionTypes.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.SEND_CHAT_MESSAGE = "SEND_CHAT_MESSAGE";


/***/ }),

/***/ "./src/app/features/chat/chatActions.ts":
/*!**********************************************!*\
  !*** ./src/app/features/chat/chatActions.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var chatActionTypes_1 = __webpack_require__(/*! ./chatActionTypes */ "./src/app/features/chat/chatActionTypes.ts");
exports.sendChatMessage = function (message) { return ({
    type: chatActionTypes_1.SEND_CHAT_MESSAGE,
    payload: {
        message: message
    }
}); };


/***/ }),

/***/ "./src/app/features/chat/chatInput.tsx":
/*!*********************************************!*\
  !*** ./src/app/features/chat/chatInput.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var chatActions_1 = __webpack_require__(/*! ./chatActions */ "./src/app/features/chat/chatActions.ts");
var ChatInputUnconnected = function (props) {
    var _a = tslib_1.__read(React.useState(""), 2), message = _a[0], setMessage = _a[1];
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

/***/ "./src/app/features/feed/feed.tsx":
/*!****************************************!*\
  !*** ./src/app/features/feed/feed.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var feed_message_1 = __webpack_require__(/*! @common/models/feed-message */ "./src/shared/models/feed-message.ts");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var chatInput_1 = __webpack_require__(/*! ../chat/chatInput */ "./src/app/features/chat/chatInput.tsx");
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

/***/ "./src/app/features/feed/feedActionTypes.ts":
/*!**************************************************!*\
  !*** ./src/app/features/feed/feedActionTypes.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.NEW_FEED_MESSAGE = "NEW_FEED_MESSAGE";


/***/ }),

/***/ "./src/app/features/feed/feedActions.ts":
/*!**********************************************!*\
  !*** ./src/app/features/feed/feedActions.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var feedActionTypes_1 = __webpack_require__(/*! ./feedActionTypes */ "./src/app/features/feed/feedActionTypes.ts");
exports.newFeedMessage = function (payload) { return ({
    type: feedActionTypes_1.NEW_FEED_MESSAGE,
    payload: payload
}); };


/***/ }),

/***/ "./src/app/features/feed/feedMessagesReducer.ts":
/*!******************************************************!*\
  !*** ./src/app/features/feed/feedMessagesReducer.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var feed_message_1 = __webpack_require__(/*! @common/models/feed-message */ "./src/shared/models/feed-message.ts");
var feedActionTypes_1 = __webpack_require__(/*! ./feedActionTypes */ "./src/app/features/feed/feedActionTypes.ts");
var gameActionTypes_1 = __webpack_require__(/*! ../../store/actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
exports.feedMessages = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case feedActionTypes_1.NEW_FEED_MESSAGE:
            return tslib_1.__spread([action.payload], state);
        case gameActionTypes_1.GAME_PHASE_UPDATE:
            if (action.payload.phase !== models_1.GamePhase.READY) {
                return state;
            }
            return state.filter(function (m) { return m.type !== feed_message_1.FeedMessageType.BATTLE; });
        default:
            return state;
    }
};


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
    showReadyIndicators: state.game.phase === models_1.GamePhase.PREPARING
}); };
var PlayerList = react_redux_1.connect(mapStateToProps)(PlayerListUnconnected);
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
        React.createElement(display_1.ProgressBar, { className: "healthbar friendly", current: props.player.health, max: 100 })));
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
var game_1 = __webpack_require__(/*! ./display/stages/game */ "./src/app/display/stages/game.tsx");
__webpack_require__(/*! pepjs */ "./node_modules/pepjs/dist/pep.js");
__webpack_require__(/*! ./display/style/index.scss */ "./src/app/display/style/index.scss");
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var io = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var gameActions_1 = __webpack_require__(/*! ../store/actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var playerListActions_1 = __webpack_require__(/*! ../features/playerList/playerListActions */ "./src/app/features/playerList/playerListActions.ts");
var cardActions_1 = __webpack_require__(/*! ../features/cardShop/cardActions */ "./src/app/features/cardShop/cardActions.ts");
var gameActionTypes_1 = __webpack_require__(/*! ../store/actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var cardActionTypes_1 = __webpack_require__(/*! ../features/cardShop/cardActionTypes */ "./src/app/features/cardShop/cardActionTypes.ts");
var log_1 = __webpack_require__(/*! ../log */ "./src/app/log.ts");
var localPlayerActions_1 = __webpack_require__(/*! ../store/actions/localPlayerActions */ "./src/app/store/actions/localPlayerActions.ts");
var localPlayerActionTypes_1 = __webpack_require__(/*! ../store/actiontypes/localPlayerActionTypes */ "./src/app/store/actiontypes/localPlayerActionTypes.ts");
var feedActions_1 = __webpack_require__(/*! ../features/feed/feedActions */ "./src/app/features/feed/feedActions.ts");
var chatActionTypes_1 = __webpack_require__(/*! ../features/chat/chatActionTypes */ "./src/app/features/chat/chatActionTypes.ts");
var battleEventChannel_1 = __webpack_require__(/*! @common/match/combat/battleEventChannel */ "./src/shared/match/combat/battleEventChannel.ts");
var lobbyActions_1 = __webpack_require__(/*! ../store/actions/lobbyActions */ "./src/app/store/actions/lobbyActions.ts");
var lobbyActionTypes_1 = __webpack_require__(/*! ../store/actiontypes/lobbyActionTypes */ "./src/app/store/actiontypes/lobbyActionTypes.ts");
var incoming_packet_registry_1 = __webpack_require__(/*! @common/networking/incoming-packet-registry */ "./src/shared/networking/incoming-packet-registry.ts");
var server_to_client_1 = __webpack_require__(/*! @common/networking/server-to-client */ "./src/shared/networking/server-to-client.ts");
var outgoing_packet_registry_1 = __webpack_require__(/*! @common/networking/outgoing-packet-registry */ "./src/shared/networking/outgoing-packet-registry.ts");
var client_to_server_1 = __webpack_require__(/*! @common/networking/client-to-server */ "./src/shared/networking/client-to-server.ts");
var networking_1 = __webpack_require__(/*! @common/networking */ "./src/shared/networking/index.ts");
var actionTypes_1 = __webpack_require__(/*! @common/player/actionTypes */ "./src/shared/player/actionTypes.ts");
var getSocket = function (serverIP) {
    // force to websocket for now until CORS is sorted
    var socket = io(serverIP, { transports: ["websocket", "xhr-polling"] });
    return new Promise(function (resolve) {
        socket.on("connect", function () {
            resolve(socket);
        });
    });
};
var findGame = function (registry, name) {
    return new Promise(function (resolve) {
        registry.emit(client_to_server_1.ClientToServerPacketOpcodes.FIND_GAME, name, function (response) {
            resolve(response);
        });
    });
};
var joinGame = function (registry, name, gameId) {
    return new Promise(function (resolve) {
        registry.emit(client_to_server_1.ClientToServerPacketOpcodes.JOIN_GAME, { name: name, gameId: gameId }, function (response) {
            resolve(response);
        });
    });
};
var createGame = function (registry, name) {
    return new Promise(function (resolve) {
        registry.emit(client_to_server_1.ClientToServerPacketOpcodes.CREATE_GAME, name, function (response) {
            resolve(response);
        });
    });
};
var subscribe = function (registry, socket) {
    return redux_saga_1.eventChannel(function (emit) {
        var deliberateDisconnected = false;
        socket.on("disconnect", function () {
            if (deliberateDisconnected) {
                return;
            }
            emit(gameActions_1.clearAnnouncement());
            emit(gameActions_1.updateConnectionStatus(networking_1.ConnectionStatus.DISCONNECTED_WILL_RECONNECT));
        });
        socket.on("reconnect", function () { return emit(gameActions_1.updateConnectionStatus(networking_1.ConnectionStatus.RECONNECTED_NEED_AUTHENTICATION)); });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, function (packet) {
            log_1.log("[PLAYER_LIST_UPDATE]", packet);
            emit(playerListActions_1.playerListUpdated(packet));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.CARDS_UPDATE, function (packet) {
            log_1.log("[CARDS_UPDATE]", packet);
            emit(cardActions_1.cardsUpdated(packet));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.MONEY_UPDATE, function (packet) {
            log_1.log("[MONEY_UPDATE]", packet);
            emit(gameActions_1.moneyUpdateAction(packet));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.PHASE_UPDATE, function (packet) {
            log_1.log("[PHASE_UPDATE]", packet);
            emit(gameActions_1.updateConnectionStatus(networking_1.ConnectionStatus.CONNECTED));
            emit(gameActions_1.gamePhaseUpdate(packet));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.LEVEL_UPDATE, function (packet) {
            log_1.log("[LEVEL_UPDATE]", packet);
            emit(localPlayerActions_1.localPlayerLevelUpdate(packet.level, packet.xp));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.NEW_FEED_MESSAGE, function (packet) {
            log_1.log("[NEW_FEED_MESSAGE]", packet);
            emit(feedActions_1.newFeedMessage(packet));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.LOBBY_PLAYER_UPDATE, function (packet) {
            log_1.log("[LOBBY_PLAYER_UPDATE]", packet);
            emit(lobbyActions_1.updateLobbyPlayerAction(packet.index, packet.player));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.START_GAME, function (packet) {
            log_1.log("[START_GAME]", packet);
            emit(localPlayerActions_1.joinCompleteAction(packet.localPlayerId, packet.reconnectionSecret, packet.gameId, packet.name));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.FINISH_GAME, function (packet) {
            log_1.log("[FINISH_GAME]", packet);
            emit(gameActions_1.finishGameAction(packet.winnerName));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE, function (packet) {
            log_1.log("[SHOP_LOCK_UPDATE]", packet);
            emit(gameActions_1.shopLockUpdated(packet.locked));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_SUCCESS, function (packet) {
            log_1.log("[RECONNECT_AUTHENTICATE_SUCCESS]");
            emit(gameActions_1.updateConnectionStatus(networking_1.ConnectionStatus.RECONNECTED));
            emit(localPlayerActions_1.updateReconnectSecret(packet.reconnectSecret));
        });
        registry.on(server_to_client_1.ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_FAILURE, function () {
            log_1.log("[RECONNECT_AUTH_FAILURE]");
            emit(gameActions_1.updateConnectionStatus(networking_1.ConnectionStatus.DISCONNECTED_FINAL));
            deliberateDisconnected = true;
            socket.disconnect();
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
var writeActionsToPackets = function (registry) {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.all([
                    effects_1.takeEvery(battleEventChannel_1.BATTLE_FINISHED, function () {
                        return tslib_1.__generator(this, function (_a) {
                            registry.emit(client_to_server_1.ClientToServerPacketOpcodes.FINISH_MATCH, { empty: true });
                            return [2 /*return*/];
                        });
                    }),
                    effects_1.takeEvery(cardActionTypes_1.REROLL_CARDS, function () {
                        return tslib_1.__generator(this, function (_a) {
                            registry.emit(client_to_server_1.ClientToServerPacketOpcodes.BUY_REROLL, { empty: true });
                            return [2 /*return*/];
                        });
                    }),
                    effects_1.takeEvery(localPlayerActionTypes_1.BUY_XP, function () {
                        return tslib_1.__generator(this, function (_a) {
                            registry.emit(client_to_server_1.ClientToServerPacketOpcodes.BUY_XP, { empty: true });
                            return [2 /*return*/];
                        });
                    }),
                    effects_1.takeEvery(localPlayerActionTypes_1.READY_UP, function () {
                        return tslib_1.__generator(this, function (_a) {
                            registry.emit(client_to_server_1.ClientToServerPacketOpcodes.READY_UP, { empty: true });
                            return [2 /*return*/];
                        });
                    }),
                    effects_1.takeEvery(cardActionTypes_1.BUY_CARD, function (_a) {
                        var payload = _a.payload;
                        return tslib_1.__generator(this, function (_b) {
                            registry.emit(client_to_server_1.ClientToServerPacketOpcodes.BUY_CARD, payload.index);
                            return [2 /*return*/];
                        });
                    }),
                    effects_1.takeEvery(board_1.BoardActionTypes.REMOVE_BOARD_PIECE, function (_a) {
                        var payload = _a.payload;
                        return tslib_1.__generator(this, function (_b) {
                            registry.emit(client_to_server_1.ClientToServerPacketOpcodes.SELL_PIECE, payload.pieceId);
                            return [2 /*return*/];
                        });
                    }),
                    effects_1.takeEvery(chatActionTypes_1.SEND_CHAT_MESSAGE, function (_a) {
                        var payload = _a.payload;
                        return tslib_1.__generator(this, function (_b) {
                            registry.emit(client_to_server_1.ClientToServerPacketOpcodes.SEND_CHAT_MESSAGE, payload.message);
                            return [2 /*return*/];
                        });
                    }),
                    effects_1.takeEvery(lobbyActionTypes_1.START_LOBBY_GAME, function () {
                        return tslib_1.__generator(this, function (_a) {
                            registry.emit(client_to_server_1.ClientToServerPacketOpcodes.START_LOBBY_GAME, { empty: true });
                            return [2 /*return*/];
                        });
                    }),
                    effects_1.takeEvery(gameActionTypes_1.TOGGLE_SHOP_LOCK, function () {
                        return tslib_1.__generator(this, function (_a) {
                            registry.emit(client_to_server_1.ClientToServerPacketOpcodes.TOGGLE_SHOP_LOCK, { empty: true });
                            return [2 /*return*/];
                        });
                    }),
                    effects_1.takeEvery(actionTypes_1.PLAYER_DROP_PIECE, function (_a) {
                        var _b = _a.payload, pieceId = _b.pieceId, from = _b.from, to = _b.to;
                        return tslib_1.__generator(this, function (_c) {
                            registry.emit(client_to_server_1.ClientToServerPacketOpcodes.DROP_PIECE, { pieceId: pieceId, from: from, to: to });
                            return [2 /*return*/];
                        });
                    }),
                    effects_1.takeLatest(function (action) { return action.type === gameActionTypes_1.UPDATE_CONNECTION_STATUS && action.payload.status === networking_1.ConnectionStatus.RECONNECTED_NEED_AUTHENTICATION; }, function () {
                        var state;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, effects_1.select()];
                                case 1:
                                    state = _a.sent();
                                    if (!(state.localPlayer.id === null)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, effects_1.put(gameActions_1.updateConnectionStatus(networking_1.ConnectionStatus.DISCONNECTED_FINAL))];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                                case 3:
                                    registry.emit(client_to_server_1.ClientToServerPacketOpcodes.RECONNECT_AUTHENTICATE, {
                                        gameId: state.game.gameId,
                                        playerId: state.localPlayer.id,
                                        reconnectSecret: state.localPlayer.reconnectionSecret
                                    });
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
var getResponseForAction = function (registry, action) {
    if (action.type === gameActionTypes_1.JOIN_GAME) {
        return effects_1.call(joinGame, registry, action.payload.name, action.payload.gameId);
    }
    if (action.type === gameActionTypes_1.FIND_GAME) {
        return effects_1.call(findGame, registry, action.payload.name);
    }
    if (action.type === gameActionTypes_1.CREATE_GAME) {
        return effects_1.call(createGame, registry, action.payload.name);
    }
};
exports.networking = function () {
    var action, socket, outgoingRegistry, incomingRegistry, _a, error, response;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, effects_1.take([gameActionTypes_1.FIND_GAME, gameActionTypes_1.JOIN_GAME, gameActionTypes_1.CREATE_GAME])];
            case 1:
                action = _b.sent();
                return [4 /*yield*/, effects_1.call(getSocket, action.payload.serverIP)];
            case 2:
                socket = _b.sent();
                outgoingRegistry = new outgoing_packet_registry_1.OutgoingPacketRegistry(function (opcode, payload, ack) { return socket.emit(opcode, payload, ack); });
                incomingRegistry = new incoming_packet_registry_1.IncomingPacketRegistry(function (opcode, handler) { return socket.on(opcode, handler); });
                return [4 /*yield*/, effects_1.put(gameActions_1.updateConnectionStatus(networking_1.ConnectionStatus.CONNECTED))];
            case 3:
                _b.sent();
                return [4 /*yield*/, effects_1.fork(readPacketsToActions, incomingRegistry, socket)];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                if (false) {}
                return [4 /*yield*/, getResponseForAction(outgoingRegistry, action)];
            case 6:
                _a = _b.sent(), error = _a.error, response = _a.response;
                if (!!error) return [3 /*break*/, 8];
                return [4 /*yield*/, effects_1.put(lobbyActions_1.joinLobbyAction(response.playerId, response.lobbyId, response.players, response.startTimestamp, response.isHost))];
            case 7:
                _b.sent();
                return [3 /*break*/, 11];
            case 8: return [4 /*yield*/, effects_1.put(gameActions_1.joinGameError(error))];
            case 9:
                _b.sent();
                return [4 /*yield*/, effects_1.take([gameActionTypes_1.FIND_GAME, gameActionTypes_1.JOIN_GAME, gameActionTypes_1.CREATE_GAME])];
            case 10:
                action = _b.sent();
                return [3 /*break*/, 5];
            case 11: return [4 /*yield*/, effects_1.fork(writeActionsToPackets, outgoingRegistry)];
            case 12:
                _b.sent();
                return [2 /*return*/];
        }
    });
};


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
exports.beginDragBenchPiece = function () { return ({ type: boardActionTypes_1.BEGIN_DRAG_BENCH_PIECE }); };
exports.beginDragBoardPiece = function () { return ({ type: boardActionTypes_1.BEGIN_DRAG_BOARD_PIECE }); };
exports.selectPiece = function (piece) { return ({
    type: boardActionTypes_1.SELECT_PIECE,
    payload: {
        piece: piece
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
exports.findGameAction = function (serverIP, name) { return ({
    type: gameActionTypes_1.FIND_GAME,
    payload: {
        name: name,
        serverIP: serverIP
    }
}); };
exports.joinGameAction = function (serverIP, name, gameId) { return ({
    type: gameActionTypes_1.JOIN_GAME,
    payload: {
        name: name,
        serverIP: serverIP,
        gameId: gameId
    }
}); };
exports.createGameAction = function (serverIP, name) { return ({
    type: gameActionTypes_1.CREATE_GAME,
    payload: {
        name: name,
        serverIP: serverIP
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
exports.toggleShopLock = function () { return ({ type: gameActionTypes_1.TOGGLE_SHOP_LOCK }); };
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
var lobbyActionTypes_1 = __webpack_require__(/*! ../actiontypes/lobbyActionTypes */ "./src/app/store/actiontypes/lobbyActionTypes.ts");
exports.joinLobbyAction = function (localPlayerId, lobbyId, players, startTimestamp, isHost) { return ({
    type: lobbyActionTypes_1.JOIN_LOBBY,
    payload: {
        localPlayerId: localPlayerId,
        lobbyId: lobbyId,
        players: players,
        startTimestamp: startTimestamp,
        isHost: isHost
    }
}); };
exports.updateLobbyPlayerAction = function (index, player) { return ({
    type: lobbyActionTypes_1.UPDATE_LOBBY_PLAYER,
    payload: {
        index: index,
        player: player
    }
}); };
exports.startLobbyGame = function () { return ({ type: lobbyActionTypes_1.START_LOBBY_GAME }); };


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
exports.joinCompleteAction = function (playerId, reconnectionSecret, gameId, name) { return ({
    type: localPlayerActionTypes_1.JOIN_COMPLETE,
    payload: {
        playerId: playerId,
        reconnectionSecret: reconnectionSecret,
        gameId: gameId,
        name: name
    }
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
exports.updateReconnectSecret = function (secret) { return ({
    type: localPlayerActionTypes_1.UPDATE_RECONNECT_SECRET,
    payload: {
        secret: secret
    }
}); };


/***/ }),

/***/ "./src/app/store/actiontypes/boardActionTypes.ts":
/*!*******************************************************!*\
  !*** ./src/app/store/actiontypes/boardActionTypes.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.BEGIN_DRAG_BENCH_PIECE = "BEGIN_DRAG_BENCH_PIECE";
exports.BEGIN_DRAG_BOARD_PIECE = "BEGIN_DRAG_BOARD_PIECE";
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
exports.JOIN_GAME = "JOIN_GAME";
exports.CREATE_GAME = "CREATE_GAME";
exports.JOIN_ERROR = "JOIN_ERROR";
exports.GAME_PHASE_UPDATE = "GAME_PHASE_UPDATE";
exports.MONEY_UPDATE = "MONEY_UPDATE";
exports.PHASE_START_SECONDS = "PHASE_START_SECONDS";
exports.ENABLE_DEBUG_MODE = "ENABLE_DEBUG_MODE";
exports.UPDATE_ANNOUNCEMENT = "UPDATE_ANNOUNCEMENT";
exports.CLEAR_ANNOUNCEMENT = "CLEAR_ANNOUNCEMENT";
exports.UPDATE_CONNECTION_STATUS = "UPDATE_CONNECTION_STATUS";
exports.SHOP_LOCK_UPDATED = "SHOP_LOCK_UPDATED";
exports.TOGGLE_SHOP_LOCK = "TOGGLE_SHOP_LOCK";
exports.CLEAR_SELECTED_PIECE = "CLEAR_SELECTED_PIECE";
exports.FINISH_GAME = "FINISH_GAME";


/***/ }),

/***/ "./src/app/store/actiontypes/lobbyActionTypes.ts":
/*!*******************************************************!*\
  !*** ./src/app/store/actiontypes/lobbyActionTypes.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.JOIN_LOBBY = "JOIN_LOBBY";
exports.UPDATE_LOBBY_PLAYER = "UPDATE_LOBBY_PLAYER";
exports.START_LOBBY_GAME = "START_LOBBY_GAME";


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
exports.UPDATE_RECONNECT_SECRET = "UPDATE_RECONNECT_SECRET";


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
var localPlayerActionTypes_1 = __webpack_require__(/*! ../actiontypes/localPlayerActionTypes */ "./src/app/store/actiontypes/localPlayerActionTypes.ts");
var boardActionTypes_1 = __webpack_require__(/*! ../actiontypes/boardActionTypes */ "./src/app/store/actiontypes/boardActionTypes.ts");
var networking_1 = __webpack_require__(/*! @common/networking */ "./src/shared/networking/index.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
exports.initialState = {
    gameId: null,
    opponentId: null,
    loading: false,
    menuError: null,
    money: 0,
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
            return tslib_1.__assign({}, state, { connectionStatus: action.payload.status });
        case gameActionTypes_1.FIND_GAME:
        case gameActionTypes_1.JOIN_GAME:
        case gameActionTypes_1.CREATE_GAME:
            return tslib_1.__assign({}, state, { loading: true });
        case gameActionTypes_1.JOIN_ERROR:
            return tslib_1.__assign({}, state, { loading: false, menuError: action.payload.error });
        case localPlayerActionTypes_1.JOIN_COMPLETE:
            return tslib_1.__assign({}, state, { loading: false, menuError: null, gameId: action.payload.gameId });
        case gameActionTypes_1.PHASE_START_SECONDS:
            return tslib_1.__assign({}, state, { phaseStartedAtSeconds: action.payload.time });
        case gameActionTypes_1.GAME_PHASE_UPDATE:
            // set opponent id when entering ready phase
            if (action.payload.phase === models_1.GamePhase.READY) {
                return tslib_1.__assign({}, state, { phase: action.payload.phase, opponentId: action.payload.payload.opponentId });
            }
            // clear opponent id when entering preparing phase
            if (action.payload.phase === models_1.GamePhase.PREPARING) {
                return tslib_1.__assign({}, state, { phase: action.payload.phase, round: action.payload.payload.round, opponentId: null });
            }
            return tslib_1.__assign({}, state, { phase: action.payload.phase });
        case gameActionTypes_1.MONEY_UPDATE:
            return tslib_1.__assign({}, state, { money: action.payload.money });
        case gameActionTypes_1.ENABLE_DEBUG_MODE: {
            return tslib_1.__assign({}, state, { debug: true });
        }
        case gameActionTypes_1.UPDATE_ANNOUNCEMENT: {
            return tslib_1.__assign({}, state, { mainAnnouncement: action.payload.main, subAnnouncement: action.payload.sub });
        }
        case gameActionTypes_1.CLEAR_ANNOUNCEMENT: {
            return tslib_1.__assign({}, state, { mainAnnouncement: null, subAnnouncement: null });
        }
        case boardActionTypes_1.SELECT_PIECE: {
            var isSamePiece = state.selectedPieceId && state.selectedPieceId === action.payload.piece.id;
            return tslib_1.__assign({}, state, { selectedPieceId: isSamePiece ? null : action.payload.piece.id });
        }
        case gameActionTypes_1.SHOP_LOCK_UPDATED: {
            return tslib_1.__assign({}, state, { shopLocked: action.payload.locked });
        }
        case gameActionTypes_1.FINISH_GAME: {
            return tslib_1.__assign({}, state, { winnerName: action.payload.winnerName });
        }
        case gameActionTypes_1.CLEAR_SELECTED_PIECE: {
            return tslib_1.__assign({}, state, { selectedPieceId: null });
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
var playerListReducer_1 = __webpack_require__(/*! ../../features/playerList/playerListReducer */ "./src/app/features/playerList/playerListReducer.ts");
var cardsReducer_1 = __webpack_require__(/*! ../../features/cardShop/cardsReducer */ "./src/app/features/cardShop/cardsReducer.ts");
var gameReducer_1 = __webpack_require__(/*! ./gameReducer */ "./src/app/store/reducers/gameReducer.ts");
var localPlayerReducer_1 = __webpack_require__(/*! ./localPlayerReducer */ "./src/app/store/reducers/localPlayerReducer.ts");
var feedMessagesReducer_1 = __webpack_require__(/*! ../../features/feed/feedMessagesReducer */ "./src/app/features/feed/feedMessagesReducer.ts");
var lobbyReducer_1 = __webpack_require__(/*! ./lobbyReducer */ "./src/app/store/reducers/lobbyReducer.ts");
var bench_1 = __webpack_require__(/*! @common/player/bench */ "./src/shared/player/bench/index.ts");
exports.reducers = {
    board: board_1.boardReducer,
    bench: bench_1.benchReducer,
    playerList: playerListReducer_1.playerList,
    cards: cardsReducer_1.cards,
    game: gameReducer_1.game,
    localPlayer: localPlayerReducer_1.localPlayer,
    feedMessages: feedMessagesReducer_1.feedMessages,
    lobby: lobbyReducer_1.lobby
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var lobbyActionTypes_1 = __webpack_require__(/*! ../actiontypes/lobbyActionTypes */ "./src/app/store/actiontypes/lobbyActionTypes.ts");
var initialState = {
    lobbyId: null,
    localPlayerId: null,
    players: [],
    startingAtMs: null,
    isHost: false
};
function lobby(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case lobbyActionTypes_1.JOIN_LOBBY:
            return tslib_1.__assign({}, state, { lobbyId: action.payload.lobbyId, localPlayerId: action.payload.localPlayerId, players: action.payload.players, isHost: action.payload.isHost, startingAtMs: action.payload.startTimestamp });
        case lobbyActionTypes_1.UPDATE_LOBBY_PLAYER:
            var cloned = tslib_1.__assign({}, state, { players: tslib_1.__spread(state.players) });
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var localPlayerActionTypes_1 = __webpack_require__(/*! ../actiontypes/localPlayerActionTypes */ "./src/app/store/actiontypes/localPlayerActionTypes.ts");
var gameActionTypes_1 = __webpack_require__(/*! ../actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var initialState = {
    id: null,
    reconnectionSecret: null,
    name: null,
    level: null,
    xp: null,
    ready: false
};
function localPlayer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case localPlayerActionTypes_1.UPDATE_RECONNECT_SECRET:
            return tslib_1.__assign({}, state, { reconnectionSecret: action.payload.secret });
        case localPlayerActionTypes_1.JOIN_COMPLETE:
            return {
                id: action.payload.playerId,
                reconnectionSecret: action.payload.reconnectionSecret,
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
            if (action.payload.phase !== models_1.GamePhase.READY) {
                return state;
            }
            return tslib_1.__assign({}, state, { ready: false });
        default:
            return state;
    }
}
exports.localPlayer = localPlayer;


/***/ }),

/***/ "./src/app/store/sagas/actions/announcement.ts":
/*!*****************************************************!*\
  !*** ./src/app/store/sagas/actions/announcement.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var gameActionTypes_1 = __webpack_require__(/*! ../../actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var gameActions_1 = __webpack_require__(/*! ../../actions/gameActions */ "./src/app/store/actions/gameActions.ts");
exports.announcement = function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(gameActionTypes_1.GAME_PHASE_UPDATE, function (action) {
                    var state, opponentId_1, opponent;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(action.payload.phase === models_1.GamePhase.READY)) return [3 /*break*/, 3];
                                return [4 /*yield*/, effects_1.select()];
                            case 1:
                                state = _a.sent();
                                opponentId_1 = action.payload.payload.opponentId;
                                opponent = state.playerList.find(function (p) { return p.id === opponentId_1; });
                                if (!opponent) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, effects_1.put(gameActions_1.updateAnnouncement(opponent.name, "Now Playing"))];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 3:
                                if (!(action.payload.phase === models_1.GamePhase.PLAYING)) return [3 /*break*/, 5];
                                return [4 /*yield*/, effects_1.put(gameActions_1.clearAnnouncement())];
                            case 4:
                                _a.sent();
                                _a.label = 5;
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
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var utils_1 = __webpack_require__(/*! @common/utils */ "./src/shared/utils/index.ts");
var board_1 = __webpack_require__(/*! @common/board */ "./src/shared/board/index.ts");
var gameActions_1 = __webpack_require__(/*! ../../actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var definitionProvider_1 = __webpack_require__(/*! @common/game/definitionProvider */ "./src/shared/game/definitionProvider.ts");
var cardActionTypes_1 = __webpack_require__(/*! ../../../features/cardShop/cardActionTypes */ "./src/app/features/cardShop/cardActionTypes.ts");
var cardActions_1 = __webpack_require__(/*! ../../../features/cardShop/cardActions */ "./src/app/features/cardShop/cardActions.ts");
var benchActions_1 = __webpack_require__(/*! @common/player/bench/benchActions */ "./src/shared/player/bench/benchActions.ts");
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
                                if (gamePhase === models_1.GamePhase.WAITING || gamePhase === models_1.GamePhase.DEAD) {
                                    return [2 /*return*/];
                                }
                                card = state.cards[action.payload.index];
                                money = state.game.money;
                                // card doesn't exist or player can't afford
                                if (!card || money < card.cost) {
                                    return [2 /*return*/];
                                }
                                slot = board_1.getFirstEmptyBenchSlot(state.bench.pieces);
                                // no valid slots
                                if (slot === null) {
                                    return [2 /*return*/];
                                }
                                localPlayerId = state.localPlayer.id;
                                piece = utils_1.pieceUtils.createPieceFromCard(definitionProvider, localPlayerId, card, slot);
                                remainingCards = state.cards.map(function (c) { return c === card ? null : c; });
                                return [4 /*yield*/, effects_1.put(benchActions_1.addBenchPiece(piece, slot))];
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
var models_1 = __webpack_require__(/*! @common/models */ "./src/shared/models/index.ts");
var gameActionTypes_1 = __webpack_require__(/*! ../../actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var gameActions_1 = __webpack_require__(/*! ../../actions/gameActions */ "./src/app/store/actions/gameActions.ts");
var battleSaga_1 = __webpack_require__(/*! @common/match/combat/battleSaga */ "./src/shared/match/combat/battleSaga.ts");
var cardActions_1 = __webpack_require__(/*! ../../../features/cardShop/cardActions */ "./src/app/features/cardShop/cardActions.ts");
var benchActions_1 = __webpack_require__(/*! @common/player/bench/benchActions */ "./src/shared/player/bench/benchActions.ts");
var boardActions_1 = __webpack_require__(/*! @common/board/actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
var pieceSelectors_1 = __webpack_require__(/*! @common/player/pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var isGamePhaseUpdate = function (phase) {
    return function (action) { return action.type === gameActionTypes_1.GAME_PHASE_UPDATE && action.payload.phase === phase; };
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
                                    return [4 /*yield*/, effects_1.put(cardActions_1.cardsUpdated(payload.cards))];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(boardActions_1.unlockBoard())];
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
                return [4 /*yield*/, effects_1.takeEvery(isGamePhaseUpdate(models_1.GamePhase.READY), function (action) {
                        var payload, state, selectedPiece;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    payload = action.payload.payload;
                                    return [4 /*yield*/, effects_1.put(boardActions_1.initialiseBoard(payload.board.pieces))];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.put(boardActions_1.lockBoard())];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, effects_1.select()];
                                case 3:
                                    state = _a.sent();
                                    selectedPiece = pieceSelectors_1.getPiece(state, state.game.selectedPieceId);
                                    if (!(selectedPiece && selectedPiece.position.y !== null)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, effects_1.put(gameActions_1.clearSelectedPiece())];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5: return [2 /*return*/];
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var gameActionTypes_1 = __webpack_require__(/*! ../../actiontypes/gameActionTypes */ "./src/app/store/actiontypes/gameActionTypes.ts");
var gameActions_1 = __webpack_require__(/*! ../../actions/gameActions */ "./src/app/store/actions/gameActions.ts");
exports.phaseTimer = function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(gameActionTypes_1.GAME_PHASE_UPDATE, function () {
                    var seconds;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                seconds = Math.floor(Date.now() / 1000);
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
                window.onbeforeunload = function () { return "Are you sure you want to leave this page? There is currently no way to rejoin a game"; };
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
var phaseTimer_1 = __webpack_require__(/*! ./actions/phaseTimer */ "./src/app/store/sagas/actions/phaseTimer.ts");
var gamePhase_1 = __webpack_require__(/*! ./actions/gamePhase */ "./src/app/store/sagas/actions/gamePhase.ts");
var preventAccidentalClose_1 = __webpack_require__(/*! ./actions/preventAccidentalClose */ "./src/app/store/sagas/actions/preventAccidentalClose.ts");
var cardShop_1 = __webpack_require__(/*! ./actions/cardShop */ "./src/app/store/sagas/actions/cardShop.ts");
var battleSaga_1 = __webpack_require__(/*! @common/match/combat/battleSaga */ "./src/shared/match/combat/battleSaga.ts");
var turnSimulator_1 = __webpack_require__(/*! @common/match/combat/turnSimulator */ "./src/shared/match/combat/turnSimulator.ts");
var definitionProvider_1 = __webpack_require__(/*! @common/game/definitionProvider */ "./src/shared/game/definitionProvider.ts");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var announcement_1 = __webpack_require__(/*! ./actions/announcement */ "./src/app/store/sagas/actions/announcement.ts");
var localPlayerActionTypes_1 = __webpack_require__(/*! ../actiontypes/localPlayerActionTypes */ "./src/app/store/actiontypes/localPlayerActionTypes.ts");
var saga_1 = __webpack_require__(/*! ../../networking/saga */ "./src/app/networking/saga.ts");
var evolution_1 = __webpack_require__(/*! @common/player/sagas/evolution */ "./src/shared/player/sagas/evolution.ts");
var dropPiece_1 = __webpack_require__(/*! @common/player/sagas/dropPiece */ "./src/shared/player/sagas/dropPiece.ts");
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
                return [4 /*yield*/, effects_1.fork(saga_1.networking)];
            case 2:
                _b = _b.concat([
                    _c.sent()
                ]);
                return [4 /*yield*/, effects_1.takeEvery(localPlayerActionTypes_1.JOIN_COMPLETE, function () {
                        var _a, _b;
                        return tslib_1.__generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _a = effects_1.all;
                                    return [4 /*yield*/, effects_1.fork(dropPiece_1.dropPiece)];
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

/***/ "./src/app/use-window-size.ts":
/*!************************************!*\
  !*** ./src/app/use-window-size.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
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
var inBench = function (targetY) { return targetY === null; };
var inFriendlyBoard = function (targetY) { return targetY !== null && targetY > 3; };
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
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
    if (state === void 0) { state = initialState; }
    var e_1, _a, _b, _c, _d;
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
            return tslib_1.__assign({}, filtered, (_b = {}, _b[piece.position.x + "," + piece.position.y] = piece.id, _b));
        }
        case boardActionTypes_1.REMOVE_BOARD_PIECE:
            return removePieceById(state, action.payload.pieceId);
        case boardActionTypes_1.ADD_BOARD_PIECE: {
            var _e = action.payload, x = _e.x, y = _e.y, piece = _e.piece;
            return tslib_1.__assign({}, state, (_c = {}, _c[x + "," + y] = piece.id, _c));
        }
        case boardActionTypes_1.MOVE_BOARD_PIECE: {
            var _f = action.payload, pieceId = _f.pieceId, from = _f.from, to = _f.to;
            var fromString = from.x + "," + from.y;
            var toString_1 = to.x + "," + to.y;
            // safety check
            if (state[fromString] !== pieceId) {
                return state;
            }
            return tslib_1.__assign({}, state, (_d = {}, _d[fromString] = null, _d[toString_1] = pieceId, _d));
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var boardActionTypes_1 = __webpack_require__(/*! ../actions/boardActionTypes */ "./src/shared/board/actions/boardActionTypes.ts");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var initialState = {};
var pieces = function (state, action) {
    if (state === void 0) { state = initialState; }
    var _a, e_1, _b, _c, _d;
    switch (action.type) {
        case boardActionTypes_1.INITIALISE_BOARD: {
            return tslib_1.__assign({}, action.payload.pieces);
        }
        case boardActionTypes_1.UPDATE_BOARD_PIECE: {
            var piece = action.payload.piece;
            return tslib_1.__assign({}, state, (_a = {}, _a[piece.id] = piece, _a));
        }
        case boardActionTypes_1.UPDATE_BOARD_PIECES: {
            var newState = tslib_1.__assign({}, state);
            try {
                for (var _e = tslib_1.__values(action.payload.pieces), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var piece = _f.value;
                    newState[piece.id] = piece;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return newState;
        }
        case boardActionTypes_1.REMOVE_BOARD_PIECE: {
            var newState = tslib_1.__assign({}, state);
            if (newState[action.payload.pieceId]) {
                delete newState[action.payload.pieceId];
            }
            return newState;
        }
        case boardActionTypes_1.ADD_BOARD_PIECE: {
            var _g = action.payload, piece = _g.piece, x = _g.x, y = _g.y;
            return tslib_1.__assign({}, state, (_c = {}, _c[piece.id] = tslib_1.__assign({}, piece, { position: position_1.createTileCoordinates(x, y) }), _c));
        }
        case boardActionTypes_1.MOVE_BOARD_PIECE: {
            var _h = action.payload, pieceId = _h.pieceId, from = _h.from, to = _h.to;
            var piece = state[pieceId];
            // safety catch
            if (!piece || !piece.position || piece.id !== pieceId || piece.position.x !== from.x || piece.position.y !== from.y) {
                return state;
            }
            return tslib_1.__assign({}, state, (_d = {}, _d[piece.id] = tslib_1.__assign({}, piece, { position: {
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
exports.battleEventChannel = function (turnSimulator, turnDuration, startingBoardState, maxTurns, bufferSize) {
    return redux_saga_1.eventChannel(function (emit) {
        var cancelled = false;
        var pieces = tslib_1.__assign({}, startingBoardState.pieces);
        var run = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                            || utils_1.isATeamDefeated(Object.values(pieces)));
                        if (shouldStop) {
                            emit(finishAction(turnCount));
                            return [3 /*break*/, 3];
                        }
                        turnTimer = duration(turnDuration);
                        pieces = turnSimulator.simulateTurn(++turnCount, pieces);
                        emit(boardActions_1.initialiseBoard(pieces));
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var pathfinding_1 = __webpack_require__(/*! ./pathfinding */ "./src/shared/match/combat/pathfinding.ts");
var position_1 = __webpack_require__(/*! ../../models/position */ "./src/shared/models/position.ts");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var Directions = {
    UP: { x: 0, y: -1 },
    RIGHT: { x: 1, y: 0 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 }
};
var applyVector = function (position, vector) {
    var newX = position.x + vector.x;
    var newY = position.y + vector.y;
    var max = constants_1.GRID_SIZE - 1;
    if (newX < 0 || newY < 0 || newX > max || newY > max) {
        return null;
    }
    return { x: newX, y: newY };
};
var getAttackingTiles = function (facingUp) {
    return facingUp
        ? [Directions.UP, Directions.RIGHT, Directions.LEFT, Directions.DOWN]
        : [Directions.DOWN, Directions.LEFT, Directions.RIGHT, Directions.UP];
};
var getLivingEnemies = function (piece, pieces) {
    return pieces.filter(function (other) { return other.ownerId !== piece.ownerId && other.currentHealth > 0; });
};
var getDelta = function (a, b) {
    return {
        x: Math.abs(a.position.x - b.position.x),
        y: Math.abs(a.position.y - b.position.y)
    };
};
var arePiecesAdjacent = function (a, b) {
    var _a = getDelta(a, b), deltaX = _a.x, deltaY = _a.y;
    return (deltaX + deltaY === 1);
};
var getTargetPiece = function (piece, others) {
    if (piece.targetPieceId === null) {
        return null;
    }
    var target = others.find(function (o) { return o.id === piece.targetPieceId && o.currentHealth > 0; });
    if (target === undefined) {
        return null;
    }
    return target;
};
exports.getAttackableEnemy = function (piece, others) {
    var e_1, _a;
    var target = getTargetPiece(piece, others);
    if (target && arePiecesAdjacent(piece, target)) {
        return target;
    }
    var attackDirections = getAttackingTiles(piece.facingAway);
    var _loop_1 = function (direction) {
        var targetPosition = applyVector(piece.position, direction);
        // targetPosition will be null if there direction is out of bounds
        if (targetPosition === null) {
            return "continue";
        }
        var enemyInTile = others.find(function (other) {
            return other.ownerId !== piece.ownerId
                && other.currentHealth > 0
                && position_1.arePositionsEqual(targetPosition, other.position);
        });
        if (enemyInTile) {
            return { value: enemyInTile };
        }
    };
    try {
        for (var attackDirections_1 = tslib_1.__values(attackDirections), attackDirections_1_1 = attackDirections_1.next(); !attackDirections_1_1.done; attackDirections_1_1 = attackDirections_1.next()) {
            var direction = attackDirections_1_1.value;
            var state_1 = _loop_1(direction);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (attackDirections_1_1 && !attackDirections_1_1.done && (_a = attackDirections_1["return"])) _a.call(attackDirections_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return null;
};
var findClosestEnemy = function (piece, pieces) {
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
    var target = findClosestEnemy(piece, pieces);
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
var constants_1 = __webpack_require__(/*! ../../models/constants */ "./src/shared/models/constants.ts");
var position_1 = __webpack_require__(/*! ../../models/position */ "./src/shared/models/position.ts");
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
var position_1 = __webpack_require__(/*! ../../models/position */ "./src/shared/models/position.ts");
var constants_1 = __webpack_require__(/*! ../../models/constants */ "./src/shared/models/constants.ts");
var utils_1 = __webpack_require__(/*! @common/utils */ "./src/shared/utils/index.ts");
var TurnSimulator = /** @class */ (function () {
    function TurnSimulator(definitionProvider) {
        this.definitionProvider = definitionProvider;
    }
    TurnSimulator.prototype.simulateTurn = function (turnCount, pieces) {
        var e_1, _a, e_2, _b;
        var pieceIds = Object.keys(pieces);
        try {
            for (var pieceIds_1 = tslib_1.__values(pieceIds), pieceIds_1_1 = pieceIds_1.next(); !pieceIds_1_1.done; pieceIds_1_1 = pieceIds_1.next()) {
                var pieceId = pieceIds_1_1.value;
                // create a new piece object, reset combat properties
                var attacker = tslib_1.__assign({}, pieces[pieceId], { attacking: null, hit: null, moving: null });
                if (attacker.currentHealth === 0) {
                    continue;
                }
                var attackerCombatInfo = this.getPieceCombatInfo(attacker);
                if (attacker.coolDown > 0) {
                    attacker.coolDown -= attackerCombatInfo.stats.speed;
                    pieces[attacker.id] = attacker;
                    continue;
                }
                // TODO rework getAttackableEnemy and getNewPiecePosition to take pieces objects
                var updatedPieces = Object.values(pieces);
                var defender = movement_1.getAttackableEnemy(attacker, updatedPieces);
                if (!defender) {
                    attacker.targetPieceId = null;
                    var newPosition = movement_1.getNewPiecePosition(attacker, updatedPieces.filter(function (p) { return p.currentHealth > 0; }));
                    if (newPosition !== null) {
                        attacker.moving = { direction: position_1.getRelativeDirection(attacker.position, newPosition) };
                        attacker.position = newPosition;
                        attacker.coolDown = constants_1.INITIAL_COOLDOWN;
                    }
                    pieces[attacker.id] = attacker;
                    continue;
                }
                var defenderCombatInfo = this.getPieceCombatInfo(defender);
                var updatedFighters = this.attack(turnCount, attackerCombatInfo, defenderCombatInfo);
                updatedFighters.attacker.targetPieceId = updatedFighters.defender.id;
                pieces[updatedFighters.attacker.id] = updatedFighters.attacker;
                pieces[updatedFighters.defender.id] = updatedFighters.defender;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (pieceIds_1_1 && !pieceIds_1_1.done && (_a = pieceIds_1["return"])) _a.call(pieceIds_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // TODO rework isATeamDefeated to take a pieces object
        if (utils_1.isATeamDefeated(Object.values(pieces))) {
            try {
                for (var _c = tslib_1.__values(Object.keys(pieces)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var pieceId = _d.value;
                    pieces[pieceId].celebrating = true;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c["return"])) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return pieces;
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
        var attackBonus = utils_1.getTypeAttackBonus(attacker.type, defender.type);
        var damage = (attacker.stats.attack / defender.stats.defense) * attackBonus * 10;
        var newDefenderHealth = Math.max(defender.piece.currentHealth - damage, 0);
        var totalDamage = attacker.piece.damagePerTurn * turnCount;
        return {
            attacker: tslib_1.__assign({}, attacker.piece, { coolDown: constants_1.INITIAL_COOLDOWN, attacking: {
                    direction: position_1.getRelativeDirection(attacker.piece.position, defender.piece.position),
                    damage: damage
                }, damagePerTurn: (totalDamage + (damage * constants_1.DAMAGE_RATIO)) / turnCount, targetPieceId: defender.piece.id }),
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

/***/ "./src/shared/models/constants.ts":
/*!****************************************!*\
  !*** ./src/shared/models/constants.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _a;
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "./src/shared/models/game-phase.ts");
exports.GRID_SIZE = 8;
exports.PHASE_LENGTHS = (_a = {},
    _a[game_phase_1.GamePhase.PREPARING] = 3000,
    _a[game_phase_1.GamePhase.READY] = 5,
    _a[game_phase_1.GamePhase.PLAYING] = 30,
    _a);
exports.REROLL_COST = 2;
exports.STARTING_MONEY = 300;
exports.BUY_XP_COST = 5;
exports.BUY_XP_AMOUNT = 4;
exports.INITIAL_COOLDOWN = 1000;
exports.CELEBRATION_TIME = 3000;
exports.PIECES_TO_EVOLVE = 3;
exports.DEFAULT_TURN_COUNT = 600;
exports.DEFAULT_TURN_DURATION = 50;
exports.DAMAGE_RATIO = 10;
exports.MAX_NAME_LENGTH = 16;
exports.MAX_PLAYERS_IN_GAME = 8;
exports.LOBBY_WAIT_TIME = 60;


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

/***/ "./src/shared/models/feed-message.ts":
/*!*******************************************!*\
  !*** ./src/shared/models/feed-message.ts ***!
  \*******************************************/
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
var TileStyle;
(function (TileStyle) {
    TileStyle[TileStyle["DEFAULT"] = 0] = "DEFAULT";
    TileStyle[TileStyle["JAMES"] = 1] = "JAMES";
})(TileStyle = exports.TileStyle || (exports.TileStyle = {}));


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
    ClientToServerPacketOpcodes["FIND_GAME"] = "findGame";
    ClientToServerPacketOpcodes["JOIN_GAME"] = "joinGame";
    ClientToServerPacketOpcodes["CREATE_GAME"] = "createGame";
    ClientToServerPacketOpcodes["BUY_CARD"] = "buyCard";
    ClientToServerPacketOpcodes["SELL_PIECE"] = "sellPiece";
    ClientToServerPacketOpcodes["BUY_REROLL"] = "rerollCards";
    ClientToServerPacketOpcodes["DROP_PIECE"] = "dropPiece";
    ClientToServerPacketOpcodes["BUY_XP"] = "buyXp";
    ClientToServerPacketOpcodes["SEND_CHAT_MESSAGE"] = "sendChatMessage";
    ClientToServerPacketOpcodes["FINISH_MATCH"] = "finishMatch";
    ClientToServerPacketOpcodes["READY_UP"] = "readyUp";
    ClientToServerPacketOpcodes["START_LOBBY_GAME"] = "startLobbyGame";
    ClientToServerPacketOpcodes["TOGGLE_SHOP_LOCK"] = "toggleShopLock";
    ClientToServerPacketOpcodes["RECONNECT_AUTHENTICATE"] = "reconnectAuthenticate";
})(ClientToServerPacketOpcodes = exports.ClientToServerPacketOpcodes || (exports.ClientToServerPacketOpcodes = {}));


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
    ConnectionStatus[ConnectionStatus["DISCONNECTED_WILL_RECONNECT"] = 2] = "DISCONNECTED_WILL_RECONNECT";
    ConnectionStatus[ConnectionStatus["RECONNECTED_NEED_AUTHENTICATION"] = 3] = "RECONNECTED_NEED_AUTHENTICATION";
    ConnectionStatus[ConnectionStatus["RECONNECTED"] = 4] = "RECONNECTED";
    ConnectionStatus[ConnectionStatus["DISCONNECTED_FINAL"] = 5] = "DISCONNECTED_FINAL";
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
    ServerToClientPacketOpcodes["CARDS_UPDATE"] = "cardsUpdate";
    ServerToClientPacketOpcodes["PLAYER_LIST_UPDATE"] = "playerListUpdate";
    ServerToClientPacketOpcodes["PHASE_UPDATE"] = "phaseUpdate";
    ServerToClientPacketOpcodes["MONEY_UPDATE"] = "moneyUpdate";
    ServerToClientPacketOpcodes["LEVEL_UPDATE"] = "levelUpdate";
    ServerToClientPacketOpcodes["NEW_FEED_MESSAGE"] = "newFeedMessage";
    ServerToClientPacketOpcodes["LOBBY_PLAYER_UPDATE"] = "lobbyPlayerUpdate";
    ServerToClientPacketOpcodes["START_GAME"] = "startGame";
    ServerToClientPacketOpcodes["FINISH_GAME"] = "finishGame";
    ServerToClientPacketOpcodes["SHOP_LOCK_UPDATE"] = "shopLockUpdate";
    ServerToClientPacketOpcodes["RECONNECT_AUTHENTICATE_SUCCESS"] = "reconnectAuthSuccess";
    ServerToClientPacketOpcodes["RECONNECT_AUTHENTICATE_FAILURE"] = "reconnectAuthFailure";
})(ServerToClientPacketOpcodes = exports.ServerToClientPacketOpcodes || (exports.ServerToClientPacketOpcodes = {}));


/***/ }),

/***/ "./src/shared/player/actionTypes.ts":
/*!******************************************!*\
  !*** ./src/shared/player/actionTypes.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PLAYER_DROP_PIECE = "PLAYER_DROP_PIECE";


/***/ }),

/***/ "./src/shared/player/actions.ts":
/*!**************************************!*\
  !*** ./src/shared/player/actions.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var actionTypes_1 = __webpack_require__(/*! ./actionTypes */ "./src/shared/player/actionTypes.ts");
exports.playerDropPiece = function (pieceId, from, to) { return ({
    type: actionTypes_1.PLAYER_DROP_PIECE,
    payload: {
        pieceId: pieceId, from: from, to: to
    }
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var benchActionTypes_1 = __webpack_require__(/*! ../benchActionTypes */ "./src/shared/player/bench/benchActionTypes.ts");
var position_1 = __webpack_require__(/*! @common/models/position */ "./src/shared/models/position.ts");
var initialState = [null, null, null, null, null, null, null, null];
var pieces = function (state, action) {
    if (state === void 0) { state = initialState; }
    var e_1, _a;
    switch (action.type) {
        case benchActionTypes_1.INITIALISE_BENCH:
            return tslib_1.__spread(action.payload.state.pieces);
        case benchActionTypes_1.ADD_BENCH_PIECE: {
            var _b = action.payload, piece = _b.piece, slot = _b.slot;
            var newState = tslib_1.__spread(state);
            var slotToUse = slot !== null ? slot : newState.findIndex(function (p) { return p === null; });
            newState[slotToUse] = tslib_1.__assign({}, piece, { position: position_1.createTileCoordinates(slotToUse, null) });
            return newState;
        }
        case benchActionTypes_1.REMOVE_BENCH_PIECE: {
            var newState = [];
            try {
                for (var state_1 = tslib_1.__values(state), state_1_1 = state_1.next(); !state_1_1.done; state_1_1 = state_1.next()) {
                    var piece = state_1_1.value;
                    if (!piece || piece.id === action.payload.pieceId) {
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
        }
        case benchActionTypes_1.MOVE_BENCH_PIECE: {
            var _c = action.payload, pieceId = _c.pieceId, from = _c.from, to = _c.to;
            var piece = state[from.slot];
            // safety catch
            if (!piece || !piece.position || piece.id !== pieceId || piece.position.x !== from.slot || piece.position.y !== null) {
                return state;
            }
            var newState = tslib_1.__spread(state);
            newState[from.slot] = null;
            newState[to.slot] = tslib_1.__assign({}, piece, { position: position_1.createTileCoordinates(to.slot, null) });
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

/***/ "./src/shared/player/pieceSelectors.ts":
/*!*********************************************!*\
  !*** ./src/shared/player/pieceSelectors.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
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
exports.getBoardPieceForPosition = function (state, x, y) { return state.board.pieces[state.board.piecePositions[x + "," + y]] || null; };
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

/***/ "./src/shared/player/sagas/dropPiece.ts":
/*!**********************************************!*\
  !*** ./src/shared/player/sagas/dropPiece.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var actionTypes_1 = __webpack_require__(/*! ../actionTypes */ "./src/shared/player/actionTypes.ts");
var pieceSelectors = __webpack_require__(/*! ../pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var boardActions_1 = __webpack_require__(/*! @common/board/actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
var benchActions_1 = __webpack_require__(/*! ../bench/benchActions */ "./src/shared/player/bench/benchActions.ts");
var findPiece = function (state, location) {
    if (location.type === "board") {
        var _a = location.location, x = _a.x, y = _a.y;
        return pieceSelectors.getBoardPieceForPosition(state, x, y);
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
// listen for PLAYER_DROP_PIECE and modify board, bench accordingly
// do validation in here from isomorphic state - that way server will pick up and validate
exports.dropPiece = function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(actionTypes_1.PLAYER_DROP_PIECE, function (_a) {
                    var state, fromPiece, toPiece;
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


/***/ }),

/***/ "./src/shared/player/sagas/evolution.ts":
/*!**********************************************!*\
  !*** ./src/shared/player/sagas/evolution.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var benchActions_1 = __webpack_require__(/*! ../bench/benchActions */ "./src/shared/player/bench/benchActions.ts");
var benchActionTypes_1 = __webpack_require__(/*! ../bench/benchActionTypes */ "./src/shared/player/bench/benchActionTypes.ts");
var definitionProvider_1 = __webpack_require__(/*! @common/game/definitionProvider */ "./src/shared/game/definitionProvider.ts");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
var boardActionTypes_1 = __webpack_require__(/*! @common/board/actions/boardActionTypes */ "./src/shared/board/actions/boardActionTypes.ts");
var pieceSelectors = __webpack_require__(/*! ../pieceSelectors */ "./src/shared/player/pieceSelectors.ts");
var boardActions_1 = __webpack_require__(/*! @common/board/actions/boardActions */ "./src/shared/board/actions/boardActions.ts");
var definitionProvider = new definitionProvider_1.DefinitionProvider();
exports.evolutionSagaFactory = function () {
    return function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = effects_1.all;
                    return [4 /*yield*/, effects_1.takeLatest(benchActionTypes_1.ADD_BENCH_PIECE, function (_a) {
                            var e_1, _b, e_2, _c, stages, nextStageIndex, nextStage, boardLocked, getCombinablePieces, state, matchingBoardPieces, matchingBenchPieces, totalInstances, boardPieceIds, benchPieceIds, boardPieceIds_1, boardPieceIds_1_1, pieceId, e_1_1, benchPieceIds_1, benchPieceIds_1_1, pieceId, e_2_1, newPiece;
                            var piece = _a.payload.piece;
                            return tslib_1.__generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        stages = definitionProvider.get(piece.definitionId).stages;
                                        nextStageIndex = piece.stage + 1;
                                        nextStage = stages[nextStageIndex];
                                        if (!nextStage) {
                                            return [2 /*return*/];
                                        }
                                        return [4 /*yield*/, effects_1.select(function (s) { return s.board.locked; })];
                                    case 1:
                                        boardLocked = _d.sent();
                                        if (!boardLocked) return [3 /*break*/, 4];
                                        return [4 /*yield*/, effects_1.take(boardActionTypes_1.UNLOCK_BOARD)];
                                    case 2:
                                        _d.sent();
                                        return [4 /*yield*/, effects_1.delay(500)];
                                    case 3:
                                        _d.sent();
                                        _d.label = 4;
                                    case 4:
                                        getCombinablePieces = function (pieces) { return pieces.filter(function (p) { return p.id !== piece.id && p.stage === piece.stage; }); };
                                        return [4 /*yield*/, effects_1.select()];
                                    case 5:
                                        state = _d.sent();
                                        matchingBoardPieces = getCombinablePieces(pieceSelectors.getBoardPiecesForDefinition(state, piece.definitionId));
                                        matchingBenchPieces = getCombinablePieces(pieceSelectors.getBenchPiecesForDefinition(state, piece.definitionId));
                                        totalInstances = matchingBoardPieces.length + matchingBenchPieces.length + 1;
                                        if (totalInstances < constants_1.PIECES_TO_EVOLVE) {
                                            return [2 /*return*/];
                                        }
                                        boardPieceIds = matchingBoardPieces.map(function (p) { return p.id; });
                                        benchPieceIds = matchingBenchPieces.map(function (p) { return p.id; });
                                        _d.label = 6;
                                    case 6:
                                        _d.trys.push([6, 11, 12, 13]);
                                        boardPieceIds_1 = tslib_1.__values(boardPieceIds), boardPieceIds_1_1 = boardPieceIds_1.next();
                                        _d.label = 7;
                                    case 7:
                                        if (!!boardPieceIds_1_1.done) return [3 /*break*/, 10];
                                        pieceId = boardPieceIds_1_1.value;
                                        // make a single action here removeBoardPieces(boardPieceIds)
                                        return [4 /*yield*/, effects_1.put(boardActions_1.removeBoardPiece(pieceId))];
                                    case 8:
                                        // make a single action here removeBoardPieces(boardPieceIds)
                                        _d.sent();
                                        _d.label = 9;
                                    case 9:
                                        boardPieceIds_1_1 = boardPieceIds_1.next();
                                        return [3 /*break*/, 7];
                                    case 10: return [3 /*break*/, 13];
                                    case 11:
                                        e_1_1 = _d.sent();
                                        e_1 = { error: e_1_1 };
                                        return [3 /*break*/, 13];
                                    case 12:
                                        try {
                                            if (boardPieceIds_1_1 && !boardPieceIds_1_1.done && (_b = boardPieceIds_1["return"])) _b.call(boardPieceIds_1);
                                        }
                                        finally { if (e_1) throw e_1.error; }
                                        return [7 /*endfinally*/];
                                    case 13:
                                        _d.trys.push([13, 18, 19, 20]);
                                        benchPieceIds_1 = tslib_1.__values(benchPieceIds), benchPieceIds_1_1 = benchPieceIds_1.next();
                                        _d.label = 14;
                                    case 14:
                                        if (!!benchPieceIds_1_1.done) return [3 /*break*/, 17];
                                        pieceId = benchPieceIds_1_1.value;
                                        // make a single action here removeBenchPiece(benchPieceIds)
                                        return [4 /*yield*/, effects_1.put(benchActions_1.removeBenchPiece(pieceId))];
                                    case 15:
                                        // make a single action here removeBenchPiece(benchPieceIds)
                                        _d.sent();
                                        _d.label = 16;
                                    case 16:
                                        benchPieceIds_1_1 = benchPieceIds_1.next();
                                        return [3 /*break*/, 14];
                                    case 17: return [3 /*break*/, 20];
                                    case 18:
                                        e_2_1 = _d.sent();
                                        e_2 = { error: e_2_1 };
                                        return [3 /*break*/, 20];
                                    case 19:
                                        try {
                                            if (benchPieceIds_1_1 && !benchPieceIds_1_1.done && (_c = benchPieceIds_1["return"])) _c.call(benchPieceIds_1);
                                        }
                                        finally { if (e_2) throw e_2.error; }
                                        return [7 /*endfinally*/];
                                    case 20:
                                        newPiece = tslib_1.__assign({}, piece, { stage: nextStageIndex });
                                        // todo make updateBenchPiece action
                                        return [4 /*yield*/, effects_1.put(benchActions_1.removeBenchPiece(piece.id))];
                                    case 21:
                                        // todo make updateBenchPiece action
                                        _d.sent();
                                        return [4 /*yield*/, effects_1.put(benchActions_1.addBenchPiece(newPiece, null))];
                                    case 22:
                                        _d.sent();
                                        return [2 /*return*/];
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
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
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

exports.__esModule = true;
var _a;
var creatureType_1 = __webpack_require__(/*! ../models/creatureType */ "./src/shared/models/creatureType.ts");
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
var observable_1 = __webpack_require__(/*! ./observable */ "./src/shared/utils/observable.ts");
exports.Observable = observable_1.Observable;
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
var get_total_health_by_team_1 = __webpack_require__(/*! ./get-total-health-by-team */ "./src/shared/utils/get-total-health-by-team.ts");
exports.isATeamDefeated = function (pieces) {
    var healthByTeam = get_total_health_by_team_1.getTotalHealthByTeam(pieces);
    return healthByTeam.length !== 2 || healthByTeam.some(function (x) { return x.totalHealth === 0; });
};


/***/ }),

/***/ "./src/shared/utils/observable.ts":
/*!****************************************!*\
  !*** ./src/shared/utils/observable.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var ObservableEvents;
(function (ObservableEvents) {
    ObservableEvents["CHANGE"] = "CHANGE";
})(ObservableEvents || (ObservableEvents = {}));
var Observable = /** @class */ (function () {
    function Observable(initialValue) {
        this.events = new events_1.EventEmitter();
        this.value = initialValue;
    }
    Observable.prototype.onChange = function (callback) {
        this.events.on(ObservableEvents.CHANGE, callback);
        callback(this.value, undefined);
    };
    Observable.prototype.setValue = function (value) {
        var oldValue = this.value;
        if (value === oldValue) {
            return;
        }
        this.value = value;
        this.events.emit(ObservableEvents.CHANGE, value, oldValue);
    };
    Observable.prototype.getValue = function () {
        return this.value;
    };
    Observable.prototype.setMaxListeners = function (count) {
        this.events.setMaxListeners(count);
    };
    return Observable;
}());
exports.Observable = Observable;


/***/ }),

/***/ "./src/shared/utils/piece-utils.ts":
/*!*****************************************!*\
  !*** ./src/shared/utils/piece-utils.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var uuid = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
var position_1 = __webpack_require__(/*! ../models/position */ "./src/shared/models/position.ts");
var constants_1 = __webpack_require__(/*! @common/models/constants */ "./src/shared/models/constants.ts");
exports.createPiece = function (definitionProvider, ownerId, definitionId, position, damagePerTurn, id, stage) {
    if (stage === void 0) { stage = 0; }
    var stats = definitionProvider.get(definitionId).stages[0];
    return {
        id: id || uuid(),
        ownerId: ownerId,
        definitionId: definitionId,
        position: position_1.createTileCoordinates.apply(void 0, tslib_1.__spread(position)),
        facingAway: true,
        maxHealth: stats.hp,
        currentHealth: stats.hp,
        coolDown: constants_1.INITIAL_COOLDOWN,
        damagePerTurn: damagePerTurn,
        stage: stage,
        targetPieceId: null
    };
};
exports.createPieceFromCard = function (definitionProvider, ownerId, card, slot) {
    return exports.createPiece(definitionProvider, ownerId, card.definitionId, [slot, null], null, card.id);
};
exports.clonePiece = function (definitionProvider, piece) {
    return exports.createPiece(definitionProvider, piece.ownerId, piece.definitionId, [piece.position.x, piece.position.y], 0, piece.id, piece.stage);
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
    piece.position.x = constants_1.GRID_SIZE - 1 - piece.position.x;
    piece.position.y = constants_1.GRID_SIZE - 1 - piece.position.y;
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

/***/ 0:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });