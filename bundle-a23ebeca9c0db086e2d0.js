/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.tsx":
/*!*********************!*\
  !*** ./src/app.tsx ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.App = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_modal_1 = __importDefault(__webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js"));
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var game_1 = __webpack_require__(/*! ./game */ "./src/game/index.ts");
var lobby_1 = __webpack_require__(/*! ./lobby */ "./src/lobby/index.ts");
var menu_1 = __webpack_require__(/*! ./menu */ "./src/menu/index.ts");
var auth_1 = __webpack_require__(/*! ./auth */ "./src/auth/index.ts");
var loading_1 = __webpack_require__(/*! ./display/loading */ "./src/display/loading.tsx");
var UnauthenticatedRoutes = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: auth_1.LoginPage })));
};
var GameState;
(function (GameState) {
    GameState[GameState["MENU"] = 0] = "MENU";
    GameState[GameState["LOBBY"] = 1] = "LOBBY";
    GameState[GameState["GAME"] = 2] = "GAME";
})(GameState || (GameState = {}));
var gameStateSelector = function (state) {
    if (state.game.roundInfo.phase !== null) {
        return GameState.GAME;
    }
    if (state.lobby.lobbyId !== null) {
        return GameState.LOBBY;
    }
    return GameState.MENU;
};
var AuthenticatedRootPage = function () {
    var user = auth0_react_1.useAuth0().user;
    var gameState = react_redux_1.useSelector(gameStateSelector);
    var registered = user["https://creaturechess.jamesmonger.com/playerNickname"] !== null;
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
        React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: AuthenticatedRootPage })));
};
react_modal_1["default"].setAppElement('#approot');
var App = function () {
    var _a = auth0_react_1.useAuth0(), isAuthenticated = _a.isAuthenticated, isLoading = _a.isLoading;
    if (isLoading) {
        return React.createElement(loading_1.Loading, null);
    }
    if (isAuthenticated) {
        return React.createElement(AuthenticatedRoutes, null);
    }
    return React.createElement(UnauthenticatedRoutes, null);
};
exports.App = App;


/***/ }),

/***/ "./src/auth/LoginPage.tsx":
/*!********************************!*\
  !*** ./src/auth/LoginPage.tsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.LoginPage = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var display_1 = __webpack_require__(/*! ../display */ "./src/display/index.ts");
var LoginPage = function () {
    var _a = auth0_react_1.useAuth0(), loginWithRedirect = _a.loginWithRedirect, isLoading = _a.isLoading;
    var _b = __read(React.useState(false), 2), loadingSignIn = _b[0], setLoadingSignIn = _b[1];
    var _c = __read(React.useState(false), 2), demoOpen = _c[0], setDemoOpen = _c[1];
    var onSignInClick = function () {
        setLoadingSignIn(true);
        loginWithRedirect();
    };
    var onDemoClick = function () { return setDemoOpen(!demoOpen); };
    if (isLoading || loadingSignIn) {
        return React.createElement(display_1.Loading, null);
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
                React.createElement(display_1.Segment, { header: "Watch a demo video", open: demoOpen, onHeaderClick: onDemoClick },
                    React.createElement("div", { className: "video-container" },
                        React.createElement("video", { controls: true, autoPlay: true, className: "video" },
                            React.createElement("source", { src: "https://i.imgur.com/EAwP0Qm.mp4", type: "video/mp4" }),
                            "Your browser does not support videos."))))),
        React.createElement(display_1.Footer, null)));
};
exports.LoginPage = LoginPage;


/***/ }),

/***/ "./src/auth/RegistrationPage.tsx":
/*!***************************************!*\
  !*** ./src/auth/RegistrationPage.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.RegistrationPage = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var patchUser_1 = __webpack_require__(/*! ./utils/patchUser */ "./src/auth/utils/patchUser.ts");
var RegistrationPage = function () {
    var _a = auth0_react_1.useAuth0(), getAccessTokenSilently = _a.getAccessTokenSilently, getIdTokenClaims = _a.getIdTokenClaims;
    var _b = __read(React.useState(""), 2), nickname = _b[0], setNickname = _b[1];
    var _c = __read(React.useState(false), 2), loading = _c[0], setLoading = _c[1];
    var _d = __read(React.useState(null), 2), error = _d[0], setError = _d[1];
    var onNameChange = function (event) { return setNickname(event.target.value); };
    var onClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var nicknameError, token, response, responseError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nicknameError = models_1.validateNickname(nickname);
                    if (nicknameError) {
                        setError(nicknameError);
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    return [4 /*yield*/, getAccessTokenSilently()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, patchUser_1.patchUser(token, nickname)];
                case 2:
                    response = _a.sent();
                    setLoading(false);
                    if (!(response.status === 400)) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseError = (_a.sent()).error;
                    setError(responseError);
                    return [2 /*return*/];
                case 4:
                    if (!(response.status === 200)) return [3 /*break*/, 7];
                    return [4 /*yield*/, getAccessTokenSilently({ ignoreCache: true })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, getIdTokenClaims()];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
                case 7:
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

/***/ "./src/auth/config.ts":
/*!****************************!*\
  !*** ./src/auth/config.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.LEADERBOARD_ENDPOINT = exports.CURRENT_USER_ENDPOINT = exports.GAME_SERVER_URL = exports.auth0Config = void 0;
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
exports.auth0Config = {
    domain: gamemode_1.config.auth0.domain,
    clientID: gamemode_1.config.auth0.spaClientId,
    redirectUri: gamemode_1.config.appUrl,
    logoutRedirectUri: gamemode_1.config.appUrl,
    audience: "https://" + gamemode_1.config.auth0.domain + "/api/v2/",
    scope: "openid profile email"
};
exports.GAME_SERVER_URL = gamemode_1.config.serverUrl;
exports.CURRENT_USER_ENDPOINT = gamemode_1.config.serverInfoUrl + "/user/current";
exports.LEADERBOARD_ENDPOINT = gamemode_1.config.serverInfoUrl + "/leaderboard";


/***/ }),

/***/ "./src/auth/hooks.ts":
/*!***************************!*\
  !*** ./src/auth/hooks.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.usePlayerId = void 0;
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
exports.usePlayerId = function () {
    var user = auth0_react_1.useAuth0().user;
    return user["https://creaturechess.jamesmonger.com/playerId"];
};


/***/ }),

/***/ "./src/auth/index.ts":
/*!***************************!*\
  !*** ./src/auth/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var LoginPage_1 = __webpack_require__(/*! ./LoginPage */ "./src/auth/LoginPage.tsx");
__createBinding(exports, LoginPage_1, "LoginPage");
var RegistrationPage_1 = __webpack_require__(/*! ./RegistrationPage */ "./src/auth/RegistrationPage.tsx");
__createBinding(exports, RegistrationPage_1, "RegistrationPage");
var hooks_1 = __webpack_require__(/*! ./hooks */ "./src/auth/hooks.ts");
__createBinding(exports, hooks_1, "usePlayerId");


/***/ }),

/***/ "./src/auth/utils/patchUser.ts":
/*!*************************************!*\
  !*** ./src/auth/utils/patchUser.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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

/***/ "./src/board/BoardGrid.tsx":
/*!*********************************!*\
  !*** ./src/board/BoardGrid.tsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.BoardGrid = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var context_1 = __webpack_require__(/*! ./context */ "./src/board/context.ts");
var UndroppableTile_1 = __webpack_require__(/*! ./tile/UndroppableTile */ "./src/board/tile/UndroppableTile.tsx");
var DroppableTile_1 = __webpack_require__(/*! ./tile/DroppableTile */ "./src/board/tile/DroppableTile.tsx");
var BoardItems_1 = __webpack_require__(/*! ./BoardItems */ "./src/board/BoardItems.tsx");
var isBoardTileDark = function (x, y) { return ((y ^ x) & 1) !== 0; };
var getTileColourClassName = function (x, y) { return isBoardTileDark(x, y) ? "dark" : "light"; };
var BoardRows = function (_a) {
    var onDrop = _a.onDrop, onClick = _a.onClick;
    var _b = context_1.useBoard(), locked = _b.locked, piecePositions = _b.piecePositions, _c = _b.size, width = _c.width, height = _c.height;
    var rows = [];
    for (var y = 0; y < height; y++) {
        var tiles = [];
        for (var x = 0; x < width; x++) {
            var className = getTileColourClassName(x, y);
            var piecePositionKey = x + "," + y;
            var tileContainsPiece = Boolean(piecePositions[piecePositionKey]);
            tiles.push((!tileContainsPiece && !locked)
                ? React.createElement(DroppableTile_1.DroppableTile, { key: "tile-" + x, className: className, x: x, y: y, onDrop: onDrop, onClick: onClick })
                : React.createElement(UndroppableTile_1.UndroppableTile, { key: "tile-" + x, className: className }));
        }
        rows.push(React.createElement("div", { key: "row-" + y, className: "tile-row" }, tiles));
    }
    return React.createElement(React.Fragment, null, rows);
};
var BoardGrid = function (_a) {
    var state = _a.state, renderItem = _a.renderItem, onDrop = _a.onDrop, onClick = _a.onClick;
    return (React.createElement(context_1.BoardContextProvider, { value: state },
        React.createElement(BoardRows, { onDrop: onDrop, onClick: onClick }),
        React.createElement(BoardItems_1.BoardItems, { render: renderItem })));
};
exports.BoardGrid = BoardGrid;


/***/ }),

/***/ "./src/board/BoardItems.tsx":
/*!**********************************!*\
  !*** ./src/board/BoardItems.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.BoardItems = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var context_1 = __webpack_require__(/*! ./context */ "./src/board/context.ts");
var BoardItem = function (_a) {
    var x = _a.x, y = _a.y, children = _a.children;
    return (React.createElement("div", { className: "positionable-piece x-" + x + " y-" + y }, children));
};
var BoardItems = function (_a) {
    var e_1, _b;
    var render = _a.render;
    var piecePositions = context_1.useBoard().piecePositions;
    var pieceElements = [];
    // this weird code is needed so that React keeps the same DOM elements, thus preserving the CSS animations
    var entries = Object.entries(piecePositions);
    entries.sort(function (_a, _b) {
        var _c = __read(_a, 2), aPosition = _c[0], aId = _c[1];
        var _d = __read(_b, 2), bPosition = _d[0], bId = _d[1];
        return aId.localeCompare(bId);
    });
    try {
        for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
            var _c = __read(entries_1_1.value, 2), position = _c[0], id = _c[1];
            if (!id) {
                continue;
            }
            var _d = __read(position.split(",").map(function (x) { return parseInt(x, 10); }), 2), x = _d[0], y = _d[1];
            pieceElements.push(React.createElement(BoardItem, { key: id, x: x, y: y }, render(id, x, y)));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (entries_1_1 && !entries_1_1.done && (_b = entries_1["return"])) _b.call(entries_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return React.createElement("div", { className: "board-items-container" },
        React.createElement("div", { className: "board-items" }, pieceElements));
};
exports.BoardItems = BoardItems;


/***/ }),

/***/ "./src/board/context.ts":
/*!******************************!*\
  !*** ./src/board/context.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.usePiecePositions = exports.usePieces = exports.useBelowPieceLimit = exports.useBoard = exports.BoardContextProvider = void 0;
var react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
var BoardContext = react_1.createContext(null);
BoardContext.displayName = "BoardContext";
exports.BoardContextProvider = BoardContext.Provider;
exports.useBoard = function () { return react_1.useContext(BoardContext); };
exports.useBelowPieceLimit = function () {
    var board = react_1.useContext(BoardContext);
    if (!board) {
        return;
    }
    return board.pieceLimit === null || board_1.BoardSelectors.isBelowPieceLimit(board);
};
exports.usePieces = function () {
    var board = react_1.useContext(BoardContext);
    if (!board) {
        return null;
    }
    return board.pieces;
};
exports.usePiecePositions = function () {
    var board = react_1.useContext(BoardContext);
    if (!board) {
        return null;
    }
    return board.piecePositions;
};


/***/ }),

/***/ "./src/board/tile/DroppableTile.tsx":
/*!******************************************!*\
  !*** ./src/board/tile/DroppableTile.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.DroppableTile = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/esm/index.js");
var getOverlayClassName_1 = __webpack_require__(/*! ./getOverlayClassName */ "./src/board/tile/getOverlayClassName.ts");
var context_1 = __webpack_require__(/*! ../context */ "./src/board/context.ts");
var DroppableTile = function (_a) {
    var className = _a.className, x = _a.x, y = _a.y, onDrop = _a.onDrop, onClick = _a.onClick;
    var belowPieceLimit = context_1.useBelowPieceLimit();
    var pieces = context_1.usePieces();
    var _b = __read(react_dnd_1.useDrop({
        accept: "Piece",
        drop: function (item) { return onDrop(item, x, y); },
        canDrop: function (_a) {
            var piece = _a.piece;
            var pieceIsFromSameBoard = Boolean(pieces[piece.id]);
            return belowPieceLimit || pieceIsFromSameBoard;
        },
        collect: function (monitor) { return ({
            canDrop: !!monitor.canDrop(),
            isDragging: !!monitor.getItem()
        }); }
    }), 2), _c = _b[0], canDrop = _c.canDrop, isDragging = _c.isDragging, drop = _b[1];
    return (React.createElement("div", { ref: drop, className: "tile " + className, "touch-action": "none", onPointerUp: function () { return onClick(x, y); } },
        React.createElement("div", { className: "" + getOverlayClassName_1.getOverlayClassName(isDragging, canDrop) })));
};
exports.DroppableTile = DroppableTile;


/***/ }),

/***/ "./src/board/tile/UndroppableTile.tsx":
/*!********************************************!*\
  !*** ./src/board/tile/UndroppableTile.tsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.UndroppableTile = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/esm/index.js");
var context_1 = __webpack_require__(/*! ../context */ "./src/board/context.ts");
var getOverlayClassName_1 = __webpack_require__(/*! ./getOverlayClassName */ "./src/board/tile/getOverlayClassName.ts");
var UndroppableTile = function (_a) {
    var className = _a.className;
    var id = context_1.useBoard().id;
    var _b = __read(react_dnd_1.useDrop({
        accept: "Piece",
        collect: function (monitor) { return ({
            isDragging: !!monitor.getItem()
        }); }
    }), 2), isDragging = _b[0].isDragging, drop = _b[1];
    return (React.createElement("div", { ref: drop, className: "board-" + id + "-tile tile " + className + " style-default", "touch-action": "none" },
        React.createElement("div", { className: "" + getOverlayClassName_1.getOverlayClassName(isDragging, false) })));
};
exports.UndroppableTile = UndroppableTile;


/***/ }),

/***/ "./src/board/tile/getOverlayClassName.ts":
/*!***********************************************!*\
  !*** ./src/board/tile/getOverlayClassName.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.getOverlayClassName = void 0;
exports.getOverlayClassName = function (isDragging, canDrop) {
    if (isDragging && canDrop === false) {
        return "overlay not-allowed";
    }
    return "overlay";
};


/***/ }),

/***/ "./src/display/animation.ts":
/*!**********************************!*\
  !*** ./src/display/animation.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports) {

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

/***/ "./src/display/countdown.tsx":
/*!***********************************!*\
  !*** ./src/display/countdown.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.Countdown = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
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

/***/ "./src/display/creatureImage.tsx":
/*!***************************************!*\
  !*** ./src/display/creatureImage.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.CreatureImage = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Footer = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
exports.Footer = function () {
    return (React.createElement("div", { className: "footer" },
        React.createElement("span", null,
            "v",
            "0.3.45"),
        " - ",
        React.createElement("a", { href: "https://reddit.com/r/creaturechess/" }, "/r/CreatureChess"),
        " - ",
        React.createElement("a", { href: "https://creaturechess.jamesmonger.com/privacy" }, "Privacy Policy"),
        " - ",
        React.createElement("a", { href: "https://github.com/Jameskmonger/creature-chess" }, "Licenses on GitHub")));
};


/***/ }),

/***/ "./src/display/index.ts":
/*!******************************!*\
  !*** ./src/display/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var footer_1 = __webpack_require__(/*! ./footer */ "./src/display/footer.tsx");
__createBinding(exports, footer_1, "Footer");
var loading_1 = __webpack_require__(/*! ./loading */ "./src/display/loading.tsx");
__createBinding(exports, loading_1, "Loading");
var segment_1 = __webpack_require__(/*! ./segment */ "./src/display/segment.tsx");
__createBinding(exports, segment_1, "Segment");


/***/ }),

/***/ "./src/display/loading.tsx":
/*!*********************************!*\
  !*** ./src/display/loading.tsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.Loading = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var segment_1 = __webpack_require__(/*! ./segment */ "./src/display/segment.tsx");
var Loading = function () {
    var _a = __read(React.useState(false), 2), demoOpen = _a[0], setDemoOpen = _a[1];
    var onDemoClick = function () { return setDemoOpen(!demoOpen); };
    return (React.createElement("div", { className: "loading-full" },
        React.createElement("h1", null, "Loading..."),
        React.createElement("p", null, "This can sometimes take up to 30 secs (sorry! I'm using cheap and free servers)"),
        React.createElement(segment_1.Segment, { header: "Why not watch a demo video while you wait?", open: demoOpen, onHeaderClick: onDemoClick },
            React.createElement("div", { className: "video-container" },
                React.createElement("video", { controls: true, autoPlay: true, className: "video" },
                    React.createElement("source", { src: "https://i.imgur.com/EAwP0Qm.mp4", type: "video/mp4" }),
                    "Your browser does not support videos.")))));
};
exports.Loading = Loading;


/***/ }),

/***/ "./src/display/progressBar.tsx":
/*!*************************************!*\
  !*** ./src/display/progressBar.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.ProgressBar = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Projectile = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var Projectile = function () { return (React.createElement("svg", { className: "projectile", height: "12", width: "12" },
    React.createElement("circle", { cx: "6", cy: "6", r: "4", stroke: "#FAD17D", strokeWidth: "2", fill: "#F5E687" }))); };
exports.Projectile = Projectile;


/***/ }),

/***/ "./src/display/segment.tsx":
/*!*********************************!*\
  !*** ./src/display/segment.tsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Segment = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var Segment = function (_a) {
    var open = _a.open, onHeaderClick = _a.onHeaderClick, header = _a.header, children = _a.children;
    return (React.createElement("div", { className: "segment " + (open ? "" : "closed") },
        React.createElement("div", { className: "header", onClick: onHeaderClick },
            header,
            " ",
            open ? "-" : "+"),
        React.createElement("div", { className: "content" }, children)));
};
exports.Segment = Segment;


/***/ }),

/***/ "./src/game/connection-status.ts":
/*!***************************************!*\
  !*** ./src/game/connection-status.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

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

/***/ "./src/game/index.ts":
/*!***************************!*\
  !*** ./src/game/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var page_1 = __webpack_require__(/*! ./page */ "./src/game/page.tsx");
__createBinding(exports, page_1, "GamePage");
var state_1 = __webpack_require__(/*! ./state */ "./src/game/state.ts");
__createBinding(exports, state_1, "createGameReducer");


/***/ }),

/***/ "./src/game/layouts/desktopGame.tsx":
/*!******************************************!*\
  !*** ./src/game/layouts/desktopGame.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.DesktopGame = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var display_1 = __webpack_require__(/*! ../../display */ "./src/display/index.ts");
var module_1 = __webpack_require__(/*! ../module */ "./src/game/module/index.ts");
var DesktopGame = function () {
    return (React.createElement("div", { className: "game landscape" },
        React.createElement("div", { className: "group" },
            React.createElement(module_1.RoundIndicator, null),
            React.createElement(module_1.PhaseInfo, null),
            React.createElement(module_1.NowPlaying, null),
            React.createElement(module_1.PlayerList, null)),
        React.createElement(module_1.BoardContainer, null),
        React.createElement("div", { className: "group right" },
            React.createElement(module_1.QuitGameButton, null),
            React.createElement(module_1.CardShop, { showBalance: true }),
            React.createElement(module_1.Profile, null),
            React.createElement("div", { className: "help-container" },
                React.createElement(module_1.Help, { hideFooter: true })),
            React.createElement(display_1.Footer, null))));
};
exports.DesktopGame = DesktopGame;


/***/ }),

/***/ "./src/game/layouts/mobileGame.tsx":
/*!*****************************************!*\
  !*** ./src/game/layouts/mobileGame.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.MobileGame = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var react_fontawesome_1 = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
var free_solid_svg_icons_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var overlay_1 = __webpack_require__(/*! ../ui/overlay */ "./src/game/ui/overlay.ts");
var actions_1 = __webpack_require__(/*! ../ui/actions */ "./src/game/ui/actions.ts");
var module_1 = __webpack_require__(/*! ../module */ "./src/game/module/index.ts");
var NavItem = function (_a) {
    var overlay = _a.overlay, icon = _a.icon;
    var dispatch = react_redux_1.useDispatch();
    var isActive = react_redux_1.useSelector(function (state) { return state.game.ui.currentOverlay === overlay; });
    var canUseShop = react_redux_1.useSelector(function (state) { return state.game.playerInfo.health !== 0; });
    var onClick = function () {
        if (isActive) {
            dispatch(actions_1.closeOverlay());
            return;
        }
        if (overlay === overlay_1.Overlay.SHOP) {
            if (!canUseShop) {
                return;
            }
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
    var title = _a.title, children = _a.children, _b = _a.fullscreen, fullscreen = _b === void 0 ? false : _b;
    var dispatch = react_redux_1.useDispatch();
    var dispatchCloseOverlay = function () { return dispatch(actions_1.closeOverlay()); };
    return (React.createElement("div", { className: "game-overlay" },
        React.createElement("div", { className: "overlay-header" },
            React.createElement("h2", { className: "overlay-title" }, title),
            React.createElement("button", { className: "close", onClick: dispatchCloseOverlay }, "X")),
        React.createElement("div", { className: "overlay-content " + (fullscreen ? "fullscreen" : "") }, children)));
};
var GameOverlay = function (_a) {
    var currentOverlay = _a.currentOverlay;
    var currentBalance = react_redux_1.useSelector(function (state) { return gamemode_1.getPlayerMoney(state.game); });
    if (currentOverlay === overlay_1.Overlay.PLAYERS) {
        return (React.createElement(OverlayComponent, { title: "Players" },
            React.createElement(module_1.PlayerList, null)));
    }
    if (currentOverlay === overlay_1.Overlay.SHOP) {
        return (React.createElement(OverlayComponent, { title: "Balance: $" + currentBalance, fullscreen: true },
            React.createElement(module_1.CardShop, { showBalance: false })));
    }
    if (currentOverlay === overlay_1.Overlay.HELP) {
        return (React.createElement(OverlayComponent, { title: "Help" },
            React.createElement(module_1.Help, null)));
    }
    if (currentOverlay === overlay_1.Overlay.SETTINGS) {
        return (React.createElement(OverlayComponent, { title: "Settings" },
            React.createElement(module_1.Settings, null)));
    }
    return null;
};
var MobileGameContentPane = function () {
    var currentOverlay = react_redux_1.useSelector(function (state) { return state.game.ui.currentOverlay; });
    if (currentOverlay === null) {
        return (React.createElement("div", { className: "content-pane" },
            React.createElement(module_1.Profile, null),
            React.createElement(module_1.BoardContainer, { showNowPlaying: true })));
    }
    return (React.createElement("div", { className: "content-pane" },
        React.createElement(GameOverlay, { currentOverlay: currentOverlay })));
};
var MobileGame = function () {
    return (React.createElement("div", { className: "game mobile portrait" },
        React.createElement("div", { className: "top-bar" },
            React.createElement(module_1.RoundIndicator, null),
            React.createElement(module_1.PhaseInfo, null)),
        React.createElement(MobileGameContentPane, null),
        React.createElement(Navbar, null)));
};
exports.MobileGame = MobileGame;


/***/ }),

/***/ "./src/game/module/board/boardContainer.tsx":
/*!**************************************************!*\
  !*** ./src/game/module/board/boardContainer.tsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.BoardContainer = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
var opponentBoardPlaceholder_1 = __webpack_require__(/*! ./overlays/opponentBoardPlaceholder */ "./src/game/module/board/overlays/opponentBoardPlaceholder.tsx");
var victoryOverlay_1 = __webpack_require__(/*! ./overlays/victoryOverlay */ "./src/game/module/board/overlays/victoryOverlay.tsx");
var reconnectOverlay_1 = __webpack_require__(/*! ./overlays/reconnectOverlay */ "./src/game/module/board/overlays/reconnectOverlay.tsx");
var matchRewardsOverlay_1 = __webpack_require__(/*! ./overlays/matchRewardsOverlay */ "./src/game/module/board/overlays/matchRewardsOverlay.tsx");
var BoardGrid_1 = __webpack_require__(/*! ../../../board/BoardGrid */ "./src/board/BoardGrid.tsx");
var actions_1 = __webpack_require__(/*! ../../ui/actions */ "./src/game/ui/actions.ts");
var nowPlaying_1 = __webpack_require__(/*! ../nowPlaying */ "./src/game/module/nowPlaying.tsx");
var pieceComponent_1 = __webpack_require__(/*! ./piece/pieceComponent */ "./src/game/module/board/piece/pieceComponent.tsx");
var clickToDropSaga_1 = __webpack_require__(/*! ./clickToDropSaga */ "./src/game/module/board/clickToDropSaga.ts");
var getLocationForPiece = function (pieceId, board, bench) {
    if (board) {
        var boardPiecePosition = board_1.BoardSelectors.getPiecePosition(board, pieceId);
        if (boardPiecePosition) {
            return {
                type: "board",
                location: boardPiecePosition
            };
        }
    }
    if (bench) {
        var benchPiecePosition = board_1.BoardSelectors.getPiecePosition(bench, pieceId);
        if (benchPiecePosition !== undefined) {
            return {
                type: "bench",
                location: benchPiecePosition
            };
        }
    }
    return null;
};
var onDropPiece = function (dispatch, locationType, board, bench) {
    return function (item, x, y) {
        var piece = item.piece;
        var from = getLocationForPiece(piece.id, board, bench);
        var location = {
            type: locationType,
            location: { x: x, y: y }
        };
        // todo `from` is here as a safety check, is it needed?
        dispatch(gamemode_1.PlayerGameActions.dropPiecePlayerAction({
            pieceId: piece.id,
            from: from,
            to: location
        }));
        dispatch(actions_1.clearSelectedPiece());
    };
};
var onTileClick = function (dispatch, locationType) {
    return function (x, y) { return dispatch(clickToDropSaga_1.playerClickTileAction({ tile: { type: locationType, location: { x: x, y: y } } })); };
};
var BoardContainer = function (_a) {
    var _b = _a.showNowPlaying, showNowPlaying = _b === void 0 ? false : _b;
    var dispatch = react_redux_1.useDispatch();
    // todo decouple this, make a playerDropPiece saga
    var board = react_redux_1.useSelector(function (state) { return state.game.board; });
    var bench = react_redux_1.useSelector(function (state) { return state.game.bench; });
    var selectedPieceId = react_redux_1.useSelector(function (state) { return state.game.ui.selectedPieceId; });
    var inPreparingPhase = react_redux_1.useSelector(function (state) { return state.game.roundInfo.phase === models_1.GamePhase.PREPARING; });
    return (React.createElement("div", { className: "group board-container style-default" },
        showNowPlaying && React.createElement(nowPlaying_1.NowPlaying, null),
        React.createElement("div", { className: "chessboard" },
            inPreparingPhase && React.createElement(opponentBoardPlaceholder_1.OpponentBoardPlaceholder, null),
            React.createElement("div", { className: "board-tiles" },
                React.createElement(BoardGrid_1.BoardGrid, { state: board, onDrop: onDropPiece(dispatch, "board", board, bench), onClick: onTileClick(dispatch, "board"), renderItem: function (id) { return (React.createElement(pieceComponent_1.PieceComponent, { id: id, draggable: inPreparingPhase, animate: !inPreparingPhase, selected: id === selectedPieceId, pieceIsOnBench: false })); } })),
            React.createElement(victoryOverlay_1.VictoryOverlay, null),
            React.createElement(matchRewardsOverlay_1.MatchRewardsOverlay, null),
            React.createElement(reconnectOverlay_1.ReconnectOverlay, null)),
        React.createElement("div", { className: "bench" },
            React.createElement(BoardGrid_1.BoardGrid, { state: bench, onDrop: onDropPiece(dispatch, "bench", board, bench), onClick: onTileClick(dispatch, "bench"), renderItem: function (id) { return (React.createElement(pieceComponent_1.PieceComponent, { id: id, draggable: true, animate: false, selected: id === selectedPieceId, pieceIsOnBench: true })); } }))));
};
exports.BoardContainer = BoardContainer;


/***/ }),

/***/ "./src/game/module/board/clickToDropSaga.ts":
/*!**************************************************!*\
  !*** ./src/game/module/board/clickToDropSaga.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.clickToDropSaga = exports.playerClickTileAction = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
var actions_1 = __webpack_require__(/*! ../../ui/actions */ "./src/game/ui/actions.ts");
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var getLocationForPiece = function (pieceId, board, bench) {
    if (board) {
        var boardPiecePosition = board_1.BoardSelectors.getPiecePosition(board, pieceId);
        if (boardPiecePosition) {
            return {
                type: "board",
                location: boardPiecePosition
            };
        }
    }
    if (bench) {
        var benchPiecePosition = board_1.BoardSelectors.getPiecePosition(bench, pieceId);
        if (benchPiecePosition !== undefined) {
            return {
                type: "bench",
                location: benchPiecePosition
            };
        }
    }
    return null;
};
exports.playerClickTileAction = toolkit_1.createAction("playerClickTileAction");
exports.clickToDropSaga = function () {
    var action, tile, piece, tileEmpty, bench, board, piecePositionKey, from;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (false) {}
                return [4 /*yield*/, effects_1.take(exports.playerClickTileAction.toString())];
            case 1:
                action = _a.sent();
                tile = action.payload.tile;
                return [4 /*yield*/, effects_1.select(function (state) { return state.game.ui.selectedPieceId ? gamemode_1.getPiece(state.game, state.game.ui.selectedPieceId) : null; })];
            case 2:
                piece = _a.sent();
                if (!piece) {
                    return [3 /*break*/, 0];
                }
                tileEmpty = false;
                return [4 /*yield*/, effects_1.select(function (state) { return state.game.bench; })];
            case 3:
                bench = _a.sent();
                return [4 /*yield*/, effects_1.select(function (state) { return state.game.board; })];
            case 4:
                board = _a.sent();
                piecePositionKey = tile.location.x + "," + tile.location.y;
                if (tile.type === "bench") {
                    tileEmpty = !bench.piecePositions[piecePositionKey];
                    ;
                }
                else if (tile.type === "board") {
                    tileEmpty = !board.piecePositions[piecePositionKey];
                    ;
                }
                if (!tileEmpty) {
                    return [3 /*break*/, 0];
                }
                from = getLocationForPiece(piece.id, board, bench);
                return [4 /*yield*/, effects_1.put(gamemode_1.PlayerGameActions.dropPiecePlayerAction({
                        pieceId: piece.id,
                        from: from,
                        to: tile
                    }))];
            case 5:
                _a.sent();
                return [4 /*yield*/, effects_1.put(actions_1.clearSelectedPiece())];
            case 6:
                _a.sent();
                return [3 /*break*/, 0];
            case 7: return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/game/module/board/index.ts":
/*!****************************************!*\
  !*** ./src/game/module/board/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var boardContainer_1 = __webpack_require__(/*! ./boardContainer */ "./src/game/module/board/boardContainer.tsx");
__createBinding(exports, boardContainer_1, "BoardContainer");
var clickToDropSaga_1 = __webpack_require__(/*! ./clickToDropSaga */ "./src/game/module/board/clickToDropSaga.ts");
__createBinding(exports, clickToDropSaga_1, "clickToDropSaga");
var responsiveBoardStyles_1 = __webpack_require__(/*! ./responsiveBoardStyles */ "./src/game/module/board/responsiveBoardStyles.tsx");
__createBinding(exports, responsiveBoardStyles_1, "ResponsiveBoardStyles");


/***/ }),

/***/ "./src/game/module/board/overlays/boardOverlay.tsx":
/*!*********************************************************!*\
  !*** ./src/game/module/board/overlays/boardOverlay.tsx ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.BoardOverlay = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_modal_1 = __importDefault(__webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js"));
var BoardOverlay = function (_a) {
    var children = _a.children;
    return (React.createElement(react_modal_1["default"], { isOpen: true, className: "modal", overlayClassName: "modal-overlay", parentSelector: function () { return document.querySelector(".chessboard"); } }, children));
};
exports.BoardOverlay = BoardOverlay;


/***/ }),

/***/ "./src/game/module/board/overlays/matchRewardsOverlay.tsx":
/*!****************************************************************!*\
  !*** ./src/game/module/board/overlays/matchRewardsOverlay.tsx ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.MatchRewardsOverlay = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var boardOverlay_1 = __webpack_require__(/*! ./boardOverlay */ "./src/game/module/board/overlays/boardOverlay.tsx");
var MatchRewardsOverlay = function () {
    var matchRewards = react_redux_1.useSelector(function (state) { return state.game.playerInfo.matchRewards; });
    var victoryOverlayShowing = react_redux_1.useSelector(function (state) { return state.game.ui.winnerId !== null; });
    if (!matchRewards || victoryOverlayShowing) {
        return null;
    }
    var damage = matchRewards.damage, justDied = matchRewards.justDied, _a = matchRewards.rewardMoney, total = _a.total, base = _a.base, winBonus = _a.winBonus, streakBonus = _a.streakBonus, interest = _a.interest;
    if (justDied) {
        return (React.createElement(boardOverlay_1.BoardOverlay, null,
            React.createElement("div", { className: "match-rewards-content" },
                React.createElement("h2", null, "You Died"),
                React.createElement("p", { className: "health" },
                    React.createElement("span", { className: "highlight" }, damage),
                    " health lost"),
                React.createElement("div", { className: "discord-link" },
                    React.createElement("p", null, "Join us on Discord to receive notifications when someone starts a lobby, and more!"),
                    React.createElement("a", { href: "https://discord.gg/FhMm6saehb" },
                        React.createElement("img", { src: "https://i.imgur.com/YNyTNuw.png", className: "discord-button" }))))));
    }
    if (damage === 0) {
        return (React.createElement(boardOverlay_1.BoardOverlay, null,
            React.createElement("div", { className: "match-rewards-content" },
                React.createElement("h2", null, "Round Won"),
                React.createElement("div", { className: "money" },
                    React.createElement("h3", null,
                        React.createElement("span", { className: "highlight" },
                            "$",
                            total),
                        " gained"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            "Base: ",
                            React.createElement("span", { className: "highlight" },
                                "$",
                                base)),
                        React.createElement("li", null,
                            "Win Bonus: ",
                            React.createElement("span", { className: "highlight" },
                                "$",
                                winBonus)),
                        React.createElement("li", null,
                            "Streak Bonus: ",
                            React.createElement("span", { className: "highlight" },
                                "$",
                                streakBonus)),
                        React.createElement("li", null,
                            "Interest (10%): ",
                            React.createElement("span", { className: "highlight" },
                                "$",
                                interest)))))));
    }
    return (React.createElement(boardOverlay_1.BoardOverlay, null,
        React.createElement("div", { className: "match-rewards-content" },
            React.createElement("h2", null, "Round Lost"),
            React.createElement("p", { className: "health" },
                React.createElement("span", { className: "highlight" }, damage),
                " health lost"),
            React.createElement("div", { className: "money" },
                React.createElement("h3", null,
                    React.createElement("span", { className: "highlight" },
                        "$",
                        total),
                    " gained"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Base: ",
                        React.createElement("span", { className: "highlight" },
                            "$",
                            base)),
                    React.createElement("li", null,
                        "Win Bonus: ",
                        React.createElement("span", { className: "highlight" },
                            "$",
                            winBonus)),
                    React.createElement("li", null,
                        "Streak Bonus: ",
                        React.createElement("span", { className: "highlight" },
                            "$",
                            streakBonus)),
                    React.createElement("li", null,
                        "Interest (10%): ",
                        React.createElement("span", { className: "highlight" },
                            "$",
                            interest)))))));
};
exports.MatchRewardsOverlay = MatchRewardsOverlay;


/***/ }),

/***/ "./src/game/module/board/overlays/opponentBoardPlaceholder.tsx":
/*!*********************************************************************!*\
  !*** ./src/game/module/board/overlays/opponentBoardPlaceholder.tsx ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.OpponentBoardPlaceholder = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var readyUpButton_1 = __webpack_require__(/*! ./readyUpButton */ "./src/game/module/board/overlays/readyUpButton.tsx");
var selectedCreature_1 = __webpack_require__(/*! ./selectedCreature */ "./src/game/module/board/overlays/selectedCreature.tsx");
exports.OpponentBoardPlaceholder = function (props) {
    return (React.createElement("div", { className: "opponent-board-placeholder" },
        React.createElement("div", { className: "o-group stretch" },
            React.createElement(selectedCreature_1.SelectedCreature, null)),
        React.createElement("div", { className: "o-group" },
            React.createElement(readyUpButton_1.ReadyUpButton, null))));
};


/***/ }),

/***/ "./src/game/module/board/overlays/readyUpButton.tsx":
/*!**********************************************************!*\
  !*** ./src/game/module/board/overlays/readyUpButton.tsx ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.ReadyUpButton = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var ReadyUpButton = function () {
    var canReadyUp = react_redux_1.useSelector(function (state) { return state.game.roundInfo.phase === models_1.GamePhase.PREPARING && state.game.playerInfo.ready === false; });
    var dispatch = react_redux_1.useDispatch();
    if (!canReadyUp) {
        return null;
    }
    var onReadyUp = function () { return dispatch(gamemode_1.PlayerGameActions.readyUpPlayerAction()); };
    return React.createElement("button", { className: "ready-up", onClick: onReadyUp }, "Ready");
};
exports.ReadyUpButton = ReadyUpButton;


/***/ }),

/***/ "./src/game/module/board/overlays/reconnectOverlay.tsx":
/*!*************************************************************!*\
  !*** ./src/game/module/board/overlays/reconnectOverlay.tsx ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.ReconnectOverlay = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var connection_status_1 = __webpack_require__(/*! ../../../connection-status */ "./src/game/connection-status.ts");
var boardOverlay_1 = __webpack_require__(/*! ./boardOverlay */ "./src/game/module/board/overlays/boardOverlay.tsx");
var ReconnectOverlay = function () {
    var connectionStatus = react_redux_1.useSelector(function (state) { return state.game.ui.connectionStatus; });
    if (connectionStatus === connection_status_1.ConnectionStatus.NOT_CONNECTED
        || connectionStatus === connection_status_1.ConnectionStatus.CONNECTED) {
        return null;
    }
    return (React.createElement(boardOverlay_1.BoardOverlay, null,
        React.createElement("div", { className: "reconnect-overlay" }, connectionStatus === connection_status_1.ConnectionStatus.DISCONNECTED
            && (React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text" }, "You've been disconnected - but you can get back in!"),
                React.createElement("p", { className: "text" }, "Please refresh the page and press 'Find Game' to rejoin"))))));
};
exports.ReconnectOverlay = ReconnectOverlay;


/***/ }),

/***/ "./src/game/module/board/overlays/selectedCreature.tsx":
/*!*************************************************************!*\
  !*** ./src/game/module/board/overlays/selectedCreature.tsx ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.SelectedCreature = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var selectedPieceSelector = function (state) {
    return state.game.ui.selectedPieceId
        ? gamemode_1.getPiece(state.game, state.game.ui.selectedPieceId)
        : null;
};
var SellPieceButton = function (_a) {
    var pieceId = _a.pieceId;
    var dispatch = react_redux_1.useDispatch();
    var _b = __read(React.useState(false), 2), areYouSure = _b[0], setAreYouSure = _b[1];
    var onClick = (areYouSure
        ? function () {
            dispatch(gamemode_1.PlayerGameActions.sellPiecePlayerAction({ pieceId: pieceId }));
        }
        : function () {
            setAreYouSure(true);
        });
    React.useEffect(function () {
        setAreYouSure(false);
    }, [pieceId]);
    if (!areYouSure) {
        return React.createElement("button", { className: "ready-up", onClick: onClick }, "Sell Piece");
    }
    return React.createElement("button", { className: "ready-up", onClick: onClick }, "Confirm?");
};
var SelectedCreature = function () {
    var selectedPiece = react_redux_1.useSelector(selectedPieceSelector);
    if (!selectedPiece) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(SellPieceButton, { pieceId: selectedPiece.id })));
};
exports.SelectedCreature = SelectedCreature;


/***/ }),

/***/ "./src/game/module/board/overlays/victoryOverlay.tsx":
/*!***********************************************************!*\
  !*** ./src/game/module/board/overlays/victoryOverlay.tsx ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.VictoryOverlay = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var selectors_1 = __webpack_require__(/*! ../../playerList/components/selectors */ "./src/game/module/playerList/components/selectors.ts");
var boardOverlay_1 = __webpack_require__(/*! ./boardOverlay */ "./src/game/module/board/overlays/boardOverlay.tsx");
var VictoryOverlay = function () {
    var winnerName = react_redux_1.useSelector(function (state) {
        var winnerId = state.game.ui.winnerId;
        if (!winnerId) {
            return null;
        }
        // todo fix this selector
        return selectors_1.getPlayerById(winnerId)(state).name;
    });
    if (!winnerName) {
        return null;
    }
    return (React.createElement(boardOverlay_1.BoardOverlay, null,
        React.createElement("div", { className: "victory-overlay" },
            React.createElement("h2", { className: "game-over" }, "Game Over"),
            React.createElement("p", { className: "winner" },
                React.createElement("span", { className: "highlight" }, winnerName),
                " wins!"),
            React.createElement("div", { className: "discord-link" },
                React.createElement("p", null, "Join us on Discord to receive notifications when someone starts a lobby, and more!"),
                React.createElement("a", { href: "https://discord.gg/FhMm6saehb" },
                    React.createElement("img", { src: "https://i.imgur.com/YNyTNuw.png", className: "discord-button" }))))));
};
exports.VictoryOverlay = VictoryOverlay;


/***/ }),

/***/ "./src/game/module/board/piece/components/StageIndicator.tsx":
/*!*******************************************************************!*\
  !*** ./src/game/module/board/piece/components/StageIndicator.tsx ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.StageIndicator = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var StageIndicator = function (_a) {
    var pieceId = _a.pieceId;
    var piece = react_redux_1.useSelector(function (state) { return gamemode_1.getPiece(state.game, pieceId); });
    if (!piece || piece.stage === 0) {
        return null;
    }
    var stars = [];
    for (var i = 0; i <= piece.stage; i++) {
        stars.push(React.createElement("img", { key: i, src: "https://creaturechess.jamesmonger.com/images/ui/star.svg" }));
    }
    return React.createElement("div", { className: "piece-stage" }, stars);
};
exports.StageIndicator = StageIndicator;


/***/ }),

/***/ "./src/game/module/board/piece/components/TypeIndicator.tsx":
/*!******************************************************************!*\
  !*** ./src/game/module/board/piece/components/TypeIndicator.tsx ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
exports.__esModule = true;
exports.TypeIndicator = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var ICON_FOR_TYPE = (_a = {},
    _a[models_1.CreatureType.Fire] = "http://creaturechess.jamesmonger.com/images/ui/type-fire.svg",
    _a[models_1.CreatureType.Earth] = "http://creaturechess.jamesmonger.com/images/ui/type-earth.svg",
    _a[models_1.CreatureType.Metal] = "http://creaturechess.jamesmonger.com/images/ui/type-metal.svg",
    _a[models_1.CreatureType.Water] = "http://creaturechess.jamesmonger.com/images/ui/type-water.svg",
    _a[models_1.CreatureType.Wood] = "http://creaturechess.jamesmonger.com/images/ui/type-wood.svg",
    _a);
var TypeIndicator = function (_a) {
    var type = _a.type;
    return (React.createElement("div", { className: "piece-type" },
        React.createElement("img", { src: ICON_FOR_TYPE[type] })));
};
exports.TypeIndicator = TypeIndicator;


/***/ }),

/***/ "./src/game/module/board/piece/components/healthbar.tsx":
/*!**************************************************************!*\
  !*** ./src/game/module/board/piece/components/healthbar.tsx ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Healthbar = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var display_1 = __webpack_require__(/*! ../../../../../display */ "./src/display/index.ts");
var auth_1 = __webpack_require__(/*! ../../../../../auth */ "./src/auth/index.ts");
var Healthbar = function (_a) {
    var pieceId = _a.pieceId, _b = _a.vertical, vertical = _b === void 0 ? false : _b, _c = _a.pieceIsOnBench, pieceIsOnBench = _c === void 0 ? false : _c;
    var localPlayerId = auth_1.usePlayerId();
    var showHealthbar = react_redux_1.useSelector(function (state) { return (state.game.roundInfo.phase === models_1.GamePhase.READY
        || state.game.roundInfo.phase === models_1.GamePhase.PLAYING); });
    var piece = react_redux_1.useSelector(function (state) { return gamemode_1.getPiece(state.game, pieceId); });
    if (!showHealthbar || !piece || pieceIsOnBench) {
        return null;
    }
    var ownerId = piece.ownerId, currentHealth = piece.currentHealth, maxHealth = piece.maxHealth;
    var friendly = (localPlayerId === ownerId);
    return (React.createElement(display_1.ProgressBar, { className: "healthbar " + (friendly ? "friendly" : "enemy") + " " + (vertical ? "vertical" : ""), current: currentHealth, max: maxHealth, vertical: vertical }));
};
exports.Healthbar = Healthbar;


/***/ }),

/***/ "./src/game/module/board/piece/components/pieceImage.tsx":
/*!***************************************************************!*\
  !*** ./src/game/module/board/piece/components/pieceImage.tsx ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.PieceImage = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var creatureImage_1 = __webpack_require__(/*! ../../../../../display/creatureImage */ "./src/display/creatureImage.tsx");
var PieceImage = function (_a) {
    var pieceId = _a.pieceId;
    var piece = react_redux_1.useSelector(function (state) { return gamemode_1.getPiece(state.game, pieceId); });
    if (!piece) {
        return null;
    }
    return React.createElement(creatureImage_1.CreatureImage, { definitionId: piece.definitionId, facing: piece.facingAway ? "back" : "front" });
};
exports.PieceImage = PieceImage;


/***/ }),

/***/ "./src/game/module/board/piece/pieceComponent.tsx":
/*!********************************************************!*\
  !*** ./src/game/module/board/piece/pieceComponent.tsx ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.PieceComponent = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/esm/index.js");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var animation_1 = __webpack_require__(/*! ../../../../display/animation */ "./src/display/animation.ts");
var projectile_1 = __webpack_require__(/*! ../../../../display/projectile */ "./src/display/projectile.tsx");
var actions_1 = __webpack_require__(/*! ../../../ui/actions */ "./src/game/ui/actions.ts");
var auth_1 = __webpack_require__(/*! ../../../../auth */ "./src/auth/index.ts");
var pieceImage_1 = __webpack_require__(/*! ./components/pieceImage */ "./src/game/module/board/piece/components/pieceImage.tsx");
var pieceMeta_1 = __webpack_require__(/*! ./pieceMeta */ "./src/game/module/board/piece/pieceMeta.tsx");
var dyingAnimation = "dying";
var PieceComponent = function (props) {
    var id = props.id, draggable = props.draggable, animate = props.animate, selected = props.selected, _a = props.pieceIsOnBench, pieceIsOnBench = _a === void 0 ? false : _a;
    var dispatch = react_redux_1.useDispatch();
    var _b = __read(React.useState([]), 2), currentAnimations = _b[0], setCurrentAnimations = _b[1];
    var _c = __read(React.useState(null), 2), oldPiece = _c[0], setOldPiece = _c[1];
    var localPlayerId = auth_1.usePlayerId();
    var piece = react_redux_1.useSelector(function (state) { return gamemode_1.getPiece(state.game, id); });
    var inPreparingPhase = react_redux_1.useSelector(function (state) { return state.game.roundInfo.phase === models_1.GamePhase.PREPARING; });
    var _d = __read(react_dnd_1.useDrag({
        item: { type: "Piece", piece: piece },
        canDrag: function () { return draggable && piece.ownerId === localPlayerId; }
    }), 2), _e = _d[0], drag = _d[1];
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
        // can only select a board piece in preparing phase
        if (!pieceIsOnBench && !inPreparingPhase) {
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
    var className = "piece " + currentAnimations.map(function (a) { return a.name; }).join(" ") + " " + (isDead ? dyingAnimation : "") + " " + (selected ? "selected" : "");
    return (React.createElement("div", { ref: drag, className: className, 
        // tslint:disable-next-line: jsx-ban-props
        style: animation_1.getAnimationCssVariables(currentAnimations), onClick: onClick, onAnimationEnd: onAnimationEnd },
        React.createElement(pieceMeta_1.PieceMeta, { id: id, pieceIsOnBench: pieceIsOnBench }),
        React.createElement(pieceImage_1.PieceImage, { pieceId: id }),
        React.createElement(projectile_1.Projectile, null)));
};
exports.PieceComponent = PieceComponent;


/***/ }),

/***/ "./src/game/module/board/piece/pieceMeta.tsx":
/*!***************************************************!*\
  !*** ./src/game/module/board/piece/pieceMeta.tsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.PieceMeta = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var healthbar_1 = __webpack_require__(/*! ./components/healthbar */ "./src/game/module/board/piece/components/healthbar.tsx");
var StageIndicator_1 = __webpack_require__(/*! ./components/StageIndicator */ "./src/game/module/board/piece/components/StageIndicator.tsx");
var TypeIndicator_1 = __webpack_require__(/*! ./components/TypeIndicator */ "./src/game/module/board/piece/components/TypeIndicator.tsx");
var PieceMeta = function (_a) {
    var id = _a.id, _b = _a.pieceIsOnBench, pieceIsOnBench = _b === void 0 ? false : _b;
    var piece = react_redux_1.useSelector(function (state) { return gamemode_1.getPiece(state.game, id); });
    return (React.createElement("div", { className: "piece-meta-container" },
        React.createElement("div", { className: "piece-meta" },
            React.createElement(TypeIndicator_1.TypeIndicator, { type: piece.definition.type }),
            React.createElement("div", { className: "health-bar-container" },
                React.createElement(healthbar_1.Healthbar, { pieceId: id, vertical: true, pieceIsOnBench: pieceIsOnBench }),
                React.createElement(StageIndicator_1.StageIndicator, { pieceId: id }))),
        React.createElement("div", { className: "piece-meta-top" })));
};
exports.PieceMeta = PieceMeta;


/***/ }),

/***/ "./src/game/module/board/responsiveBoardStyles.tsx":
/*!*********************************************************!*\
  !*** ./src/game/module/board/responsiveBoardStyles.tsx ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.ResponsiveBoardStyles = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var use_window_size_1 = __webpack_require__(/*! ./use-window-size */ "./src/game/module/board/use-window-size.ts");
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
        ? "{ width: " + boardWidth + "; margin: 0 auto; }"
        : "{ height: " + boardHeight + "; width: " + boardWidth + "; }";
    var positionablePieceStyles = getPositionablePieceStyles(tileSize);
    return (React.createElement("style", { dangerouslySetInnerHTML: {
            __html: "\n            #approot { height: 100%; }\n            .tile { width: " + tileSize + "px; height: " + tileSize + "px; }\n            .positionable-piece { width: " + tileSize + "px; height: " + tileSize + "px; }\n            .piece { width: " + tileSize + "px; height: " + tileSize + "px; }\n\n            .board-container " + boardContainerStyle + "\n\n            " + positionablePieceStyles + "\n\n            .chessboard { height: " + tileSize * models_1.Constants.GRID_SIZE.height + "px; }\n\n            .bench { height: " + tileSize + "px; }\n\n            .opponent-board-placeholder { height: " + tileSize * models_1.Constants.GRID_SIZE.height / 2 + "px; }\n            "
        } }));
};
exports.ResponsiveBoardStyles = ResponsiveBoardStyles;


/***/ }),

/***/ "./src/game/module/board/use-window-size.ts":
/*!**************************************************!*\
  !*** ./src/game/module/board/use-window-size.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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

/***/ "./src/game/module/cardShop/cardShop.tsx":
/*!***********************************************!*\
  !*** ./src/game/module/cardShop/cardShop.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.CardShop = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var card_1 = __webpack_require__(/*! ./components/card */ "./src/game/module/cardShop/components/card.tsx");
var rerollButton_1 = __webpack_require__(/*! ./components/rerollButton */ "./src/game/module/cardShop/components/rerollButton.tsx");
var balanceDisplay_1 = __webpack_require__(/*! ./components/balanceDisplay */ "./src/game/module/cardShop/components/balanceDisplay.tsx");
var toggleLockButton_1 = __webpack_require__(/*! ./components/toggleLockButton */ "./src/game/module/cardShop/components/toggleLockButton.tsx");
var display_1 = __webpack_require__(/*! ../../../display */ "./src/display/index.ts");
var CurrentCard = function (_a) {
    var card = _a.card, onBuy = _a.onBuy;
    if (!card) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "current-card-detail" },
            React.createElement("div", { className: "card-image" },
                React.createElement(display_1.CreatureImage, { definitionId: card.definitionId })),
            React.createElement("div", { className: "card-text" },
                React.createElement("h2", null, card.name),
                React.createElement("span", null, card.type),
                React.createElement("span", null, card["class"]))),
        React.createElement("div", { className: "current-card-buy" },
            React.createElement("button", { onClick: onBuy },
                "Buy ($",
                card.cost,
                ")"))));
};
var CardShop = function (_a) {
    var showBalance = _a.showBalance;
    var dispatch = react_redux_1.useDispatch();
    var cards = react_redux_1.useSelector(function (state) { return state.game.cardShop.cards; });
    var money = react_redux_1.useSelector(function (state) { return gamemode_1.getPlayerMoney(state.game); });
    var canUseShop = react_redux_1.useSelector(function (state) { return state.game.playerInfo.health > 0; });
    var _b = __read(React.useState(null), 2), currentCardIndex = _b[0], setCurrentCardIndex = _b[1];
    var createCard = function (card, index) {
        if (card === null) {
            return null;
        }
        var onClick = function () {
            if (currentCardIndex === index) {
                setCurrentCardIndex(null);
            }
            else {
                setCurrentCardIndex(index);
            }
        };
        return (React.createElement(card_1.Card, { key: index + "-" + card.definitionId, card: card, selected: index === currentCardIndex, onClick: onClick }));
    };
    if (cards === null || canUseShop === false) {
        return null;
    }
    var onBuy = function () {
        if (currentCardIndex === null) {
            return;
        }
        dispatch(gamemode_1.PlayerGameActions.buyCardPlayerAction({ index: currentCardIndex }));
        setCurrentCardIndex(null);
    };
    var afterReroll = function () { return setCurrentCardIndex(null); };
    return (React.createElement("div", { className: "card-selector" },
        React.createElement("div", { className: "shop-actions" },
            React.createElement("div", { className: "third" }, showBalance
                && (React.createElement("div", { className: "balance" },
                    React.createElement(balanceDisplay_1.BalanceDisplay, { value: money })))),
            React.createElement("div", { className: "two-thirds" },
                React.createElement(rerollButton_1.RerollButton, { afterReroll: afterReroll }),
                React.createElement(toggleLockButton_1.ToggleLockButton, null))),
        React.createElement("div", { className: "current-card" },
            React.createElement(CurrentCard, { card: cards[currentCardIndex], onBuy: onBuy })),
        React.createElement("div", { className: "cards" },
            React.createElement("div", { className: "tray" }),
            cards.map(createCard))));
};
exports.CardShop = CardShop;


/***/ }),

/***/ "./src/game/module/cardShop/closeShopOnFirstBuySaga.ts":
/*!*************************************************************!*\
  !*** ./src/game/module/cardShop/closeShopOnFirstBuySaga.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.closeShopOnFirstBuySaga = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var overlay_1 = __webpack_require__(/*! ../../ui/overlay */ "./src/game/ui/overlay.ts");
var actions_1 = __webpack_require__(/*! ../../ui/actions */ "./src/game/ui/actions.ts");
exports.closeShopOnFirstBuySaga = function () {
    var shopIsOpen;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.take(gamemode_1.PlayerGameActions.buyCardPlayerAction.toString())];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.select(function (state) { return state.game.ui.currentOverlay === overlay_1.Overlay.SHOP; })];
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

/***/ "./src/game/module/cardShop/components/balanceDisplay.tsx":
/*!****************************************************************!*\
  !*** ./src/game/module/cardShop/components/balanceDisplay.tsx ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.BalanceDisplay = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
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

/***/ "./src/game/module/cardShop/components/card.tsx":
/*!******************************************************!*\
  !*** ./src/game/module/cardShop/components/card.tsx ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Card = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var display_1 = __webpack_require__(/*! ../../../../display */ "./src/display/index.ts");
var TypeIndicator_1 = __webpack_require__(/*! ../../board/piece/components/TypeIndicator */ "./src/game/module/board/piece/components/TypeIndicator.tsx");
var Card = function (_a) {
    var card = _a.card, onClick = _a.onClick, selected = _a.selected;
    var money = react_redux_1.useSelector(function (state) { return gamemode_1.getPlayerMoney(state.game); });
    var buyable = money >= card.cost;
    var cardClassName = "card" + (selected ? " selected" : "");
    return (React.createElement("div", { className: cardClassName, onClick: (buyable && onClick) ? onClick : undefined },
        React.createElement("div", { className: "card-content" },
            React.createElement("div", { className: "card-content-group" },
                React.createElement("div", { className: "half" },
                    React.createElement(TypeIndicator_1.TypeIndicator, { type: card.type })),
                React.createElement("div", { className: "half" },
                    React.createElement("span", null,
                        "$",
                        card.cost))),
            React.createElement("div", { className: "card-content-group" },
                React.createElement(display_1.CreatureImage, { definitionId: card.definitionId })),
            React.createElement("h2", { className: "card-name" }, card.name),
            React.createElement("div", { className: "card-meta" },
                React.createElement("div", { className: "card-details" },
                    React.createElement("span", { className: "card-class" }, card["class"]),
                    React.createElement("span", { className: "card-type" }, card.type))))));
};
exports.Card = Card;


/***/ }),

/***/ "./src/game/module/cardShop/components/rerollButton.tsx":
/*!**************************************************************!*\
  !*** ./src/game/module/cardShop/components/rerollButton.tsx ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.RerollButton = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var RerollButton = function (_a) {
    var afterReroll = _a.afterReroll;
    var dispatch = react_redux_1.useDispatch();
    var money = react_redux_1.useSelector(function (state) { return gamemode_1.getPlayerMoney(state.game); });
    var buyable = money >= models_1.REROLL_COST;
    var onBuy = function () {
        dispatch(gamemode_1.PlayerGameActions.rerollCardsPlayerAction());
        afterReroll();
    };
    return (React.createElement("button", { className: "reroll shop-action", onClick: buyable ? onBuy : undefined, disabled: buyable === false },
        "New Cards ($",
        models_1.REROLL_COST,
        ")"));
};
exports.RerollButton = RerollButton;


/***/ }),

/***/ "./src/game/module/cardShop/components/toggleLockButton.tsx":
/*!******************************************************************!*\
  !*** ./src/game/module/cardShop/components/toggleLockButton.tsx ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.ToggleLockButton = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var ToggleLockButton = function () {
    var dispatch = react_redux_1.useDispatch();
    var shopLocked = react_redux_1.useSelector(function (state) { return state.game.cardShop.locked; });
    var onToggleLock = function () { return dispatch(gamemode_1.PlayerGameActions.toggleShopLockPlayerAction()); };
    return (React.createElement("button", { className: "shop-action", onClick: onToggleLock }, shopLocked
        ? "Unlock"
        : "Lock"));
};
exports.ToggleLockButton = ToggleLockButton;


/***/ }),

/***/ "./src/game/module/cardShop/index.ts":
/*!*******************************************!*\
  !*** ./src/game/module/cardShop/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var cardShop_1 = __webpack_require__(/*! ./cardShop */ "./src/game/module/cardShop/cardShop.tsx");
__createBinding(exports, cardShop_1, "CardShop");
var closeShopOnFirstBuySaga_1 = __webpack_require__(/*! ./closeShopOnFirstBuySaga */ "./src/game/module/cardShop/closeShopOnFirstBuySaga.ts");
__createBinding(exports, closeShopOnFirstBuySaga_1, "closeShopOnFirstBuySaga");


/***/ }),

/***/ "./src/game/module/help.tsx":
/*!**********************************!*\
  !*** ./src/game/module/help.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Help = void 0;
var lib_1 = __webpack_require__(/*! packages/models/lib */ "../models/lib/index.js");
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var footer_1 = __webpack_require__(/*! ../../display/footer */ "./src/display/footer.tsx");
var TypeIndicator_1 = __webpack_require__(/*! ./board/piece/components/TypeIndicator */ "./src/game/module/board/piece/components/TypeIndicator.tsx");
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
                    React.createElement("span", { className: "list-header" },
                        React.createElement(TypeIndicator_1.TypeIndicator, { type: lib_1.CreatureType.Earth }),
                        " Earth:"),
                    " Overcomes water."),
                React.createElement("li", null,
                    React.createElement("span", { className: "list-header" },
                        React.createElement(TypeIndicator_1.TypeIndicator, { type: lib_1.CreatureType.Metal }),
                        "Metal:"),
                    " Overcomes wood."),
                React.createElement("li", null,
                    React.createElement("span", { className: "list-header" },
                        React.createElement(TypeIndicator_1.TypeIndicator, { type: lib_1.CreatureType.Water }),
                        "Water:"),
                    " Overcomes fire."),
                React.createElement("li", null,
                    React.createElement("span", { className: "list-header" },
                        React.createElement(TypeIndicator_1.TypeIndicator, { type: lib_1.CreatureType.Wood }),
                        "Wood:"),
                    " Overcomes earth."),
                React.createElement("li", null,
                    React.createElement("span", { className: "list-header" },
                        React.createElement(TypeIndicator_1.TypeIndicator, { type: lib_1.CreatureType.Fire }),
                        "Fire:"),
                    " Overcomes metal."))),
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

/***/ "./src/game/module/index.ts":
/*!**********************************!*\
  !*** ./src/game/module/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var playerList_1 = __webpack_require__(/*! ./playerList */ "./src/game/module/playerList/index.ts");
__createBinding(exports, playerList_1, "PlayerList");
__createBinding(exports, playerList_1, "playerListReducer");
__createBinding(exports, playerList_1, "PlayerListCommands");
var board_1 = __webpack_require__(/*! ../module/board */ "./src/game/module/board/index.ts");
__createBinding(exports, board_1, "BoardContainer");
__createBinding(exports, board_1, "clickToDropSaga");
__createBinding(exports, board_1, "ResponsiveBoardStyles");
var cardShop_1 = __webpack_require__(/*! ../module/cardShop */ "./src/game/module/cardShop/index.ts");
__createBinding(exports, cardShop_1, "CardShop");
__createBinding(exports, cardShop_1, "closeShopOnFirstBuySaga");
var profile_1 = __webpack_require__(/*! ./profile */ "./src/game/module/profile/index.ts");
__createBinding(exports, profile_1, "Profile");
var settings_1 = __webpack_require__(/*! ./settings */ "./src/game/module/settings/index.ts");
__createBinding(exports, settings_1, "Settings");
__createBinding(exports, settings_1, "QuitGameButton");
var roundIndicator_1 = __webpack_require__(/*! ./roundIndicator */ "./src/game/module/roundIndicator.tsx");
__createBinding(exports, roundIndicator_1, "RoundIndicator");
var phaseInfo_1 = __webpack_require__(/*! ./phaseInfo */ "./src/game/module/phaseInfo.tsx");
__createBinding(exports, phaseInfo_1, "PhaseInfo");
var help_1 = __webpack_require__(/*! ./help */ "./src/game/module/help.tsx");
__createBinding(exports, help_1, "Help");
var nowPlaying_1 = __webpack_require__(/*! ./nowPlaying */ "./src/game/module/nowPlaying.tsx");
__createBinding(exports, nowPlaying_1, "NowPlaying");


/***/ }),

/***/ "./src/game/module/nowPlaying.tsx":
/*!****************************************!*\
  !*** ./src/game/module/nowPlaying.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.NowPlaying = void 0;
var lib_1 = __webpack_require__(/*! packages/models/lib */ "../models/lib/index.js");
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var getOpponentName = function (state) { var _a; return (_a = state.game.playerList.find(function (p) { return p.id === state.game.playerInfo.opponentId; })) === null || _a === void 0 ? void 0 : _a.name; };
var NowPlaying = function () {
    var phase = react_redux_1.useSelector(function (state) { return state.game.roundInfo.phase; });
    var opponentName = react_redux_1.useSelector(getOpponentName);
    if (phase !== lib_1.GamePhase.READY && phase !== lib_1.GamePhase.PLAYING) {
        return null;
    }
    if (!opponentName) {
        return null;
    }
    return React.createElement("div", { className: "now-playing" },
        React.createElement("span", { className: "label" },
            "Now Playing: ",
            opponentName));
};
exports.NowPlaying = NowPlaying;


/***/ }),

/***/ "./src/game/module/phaseInfo.tsx":
/*!***************************************!*\
  !*** ./src/game/module/phaseInfo.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.PhaseInfo = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var countdown_1 = __webpack_require__(/*! ../../display/countdown */ "./src/display/countdown.tsx");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var renderPhaseInfoCountdown = function (secondsRemaining) { return React.createElement("span", { className: "highlight" },
    "(",
    secondsRemaining,
    ")"); };
var PhaseInfo = function () {
    var phase = react_redux_1.useSelector(function (state) { return state.game.roundInfo.phase; });
    var phaseStartedAtSeconds = react_redux_1.useSelector(function (state) { return state.game.roundInfo.phaseStartedAtSeconds; });
    var isDead = react_redux_1.useSelector(function (state) { return state.game.playerInfo.health === 0; });
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

/***/ "./src/game/module/playerList/components/battleInfo.tsx":
/*!**************************************************************!*\
  !*** ./src/game/module/playerList/components/battleInfo.tsx ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.BattleInfo = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var selectors_1 = __webpack_require__(/*! ./selectors */ "./src/game/module/playerList/components/selectors.ts");
var playerName_1 = __webpack_require__(/*! ./playerName */ "./src/game/module/playerList/components/playerName.tsx");
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
    var player = react_redux_1.useSelector(selectors_1.getPlayerById(playerId));
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

/***/ "./src/game/module/playerList/components/items/playerListItem.tsx":
/*!************************************************************************!*\
  !*** ./src/game/module/playerList/components/items/playerListItem.tsx ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.PlayerListItem = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var display_1 = __webpack_require__(/*! ../../../../../display */ "./src/display/index.ts");
var playerName_1 = __webpack_require__(/*! ../playerName */ "./src/game/module/playerList/components/playerName.tsx");
var playerTitle_1 = __webpack_require__(/*! ../playerTitle */ "./src/game/module/playerList/components/playerTitle.tsx");
var battleInfo_1 = __webpack_require__(/*! ../battleInfo */ "./src/game/module/playerList/components/battleInfo.tsx");
var playerPicture_1 = __webpack_require__(/*! ../playerPicture */ "./src/game/module/playerList/components/playerPicture.tsx");
var StreakIndicator = function (_a) {
    var type = _a.type, amount = _a.amount;
    if (type === null || !amount || amount === 1) {
        return null;
    }
    return React.createElement("div", { className: "streak-indicator " + (type === models_1.StreakType.WIN ? "win" : "lose") }, amount);
};
var PlayerListItem = function (_a) {
    var index = _a.index, playerId = _a.playerId, isOpponent = _a.isOpponent, isLocal = _a.isLocal, _b = _a.showReadyIndicator, showReadyIndicator = _b === void 0 ? false : _b, _c = _a.level, level = _c === void 0 ? null : _c, _d = _a.money, money = _d === void 0 ? null : _d;
    var player = react_redux_1.useSelector(function (state) { return state.game.playerList.find(function (p) { return p.id === playerId; }); });
    var inPreparingPhase = react_redux_1.useSelector(function (state) { return state.game.roundInfo.phase === models_1.GamePhase.PREPARING; });
    var readyClassName = (player.ready && showReadyIndicator) ? "ready" : "not-ready";
    var className = "player-list-item " + (isLocal ? "local" : "") + " " + (isOpponent ? "opponent" : "") + " " + (inPreparingPhase ? readyClassName : "not-ready");
    return (React.createElement("div", { className: className },
        React.createElement("div", { className: "picture" },
            React.createElement(playerPicture_1.PlayerPicture, { playerId: playerId })),
        React.createElement("div", { className: "details" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "row-half name-container" },
                    React.createElement("span", { className: "name" },
                        index + 1,
                        ".\u00A0",
                        React.createElement(playerName_1.PlayerName, { playerId: playerId })),
                    React.createElement(playerTitle_1.PlayerTitle, { playerId: playerId })),
                React.createElement("div", { className: "row-half" },
                    React.createElement(display_1.ProgressBar, { className: "healthbar player-health", current: player.health, max: 100, renderContents: function (current) { return current.toString(); } }))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "row-half" },
                    React.createElement("div", { className: "badges" },
                        React.createElement("span", { className: "badge money" },
                            "$",
                            money ? money : player.money),
                        React.createElement("span", { className: "badge" },
                            "Lv ",
                            level ? level : player.level))),
                React.createElement("div", { className: "row-half" },
                    React.createElement(battleInfo_1.BattleInfo, { playerId: playerId }),
                    React.createElement(StreakIndicator, { type: player.streakType, amount: player.streakAmount }))))));
};
exports.PlayerListItem = PlayerListItem;


/***/ }),

/***/ "./src/game/module/playerList/components/items/statusPlayerListItem.tsx":
/*!******************************************************************************!*\
  !*** ./src/game/module/playerList/components/items/statusPlayerListItem.tsx ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.StatusPlayerListItem = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var playerName_1 = __webpack_require__(/*! ../playerName */ "./src/game/module/playerList/components/playerName.tsx");
var battleInfo_1 = __webpack_require__(/*! ../battleInfo */ "./src/game/module/playerList/components/battleInfo.tsx");
var StatusPlayerListItem = function (_a) {
    var playerId = _a.playerId, status = _a.status, subtitle = _a.subtitle;
    return (React.createElement("div", { className: "player-list-item quit" },
        React.createElement("div", { className: "half" },
            React.createElement("span", { className: "name" },
                React.createElement(playerName_1.PlayerName, { playerId: playerId }))),
        React.createElement("div", { className: "half" },
            React.createElement("span", { className: "status" }, status),
            React.createElement(battleInfo_1.BattleInfo, { playerId: playerId }),
            subtitle && React.createElement("span", { className: "subtitle" }, subtitle))));
};
exports.StatusPlayerListItem = StatusPlayerListItem;


/***/ }),

/***/ "./src/game/module/playerList/components/playerList.tsx":
/*!**************************************************************!*\
  !*** ./src/game/module/playerList/components/playerList.tsx ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.PlayerList = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var playerListItem_1 = __webpack_require__(/*! ./items/playerListItem */ "./src/game/module/playerList/components/items/playerListItem.tsx");
var statusPlayerListItem_1 = __webpack_require__(/*! ./items/statusPlayerListItem */ "./src/game/module/playerList/components/items/statusPlayerListItem.tsx");
var auth_1 = __webpack_require__(/*! ../../../../auth */ "./src/auth/index.ts");
// todo move this
function ordinal_suffix_of(i) {
    var j = i % 10, k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
var PlayerList = function () {
    var localPlayerId = auth_1.usePlayerId();
    var players = react_redux_1.useSelector(function (state) { return state.game.playerList; });
    var opponentId = react_redux_1.useSelector(function (state) { return state.game.playerInfo.opponentId; });
    var showReadyIndicators = react_redux_1.useSelector(function (state) { return state.game.roundInfo.phase === models_1.GamePhase.PREPARING; });
    var localPlayerMoney = react_redux_1.useSelector(function (state) { return gamemode_1.getPlayerMoney(state.game); });
    var localPlayerLevel = react_redux_1.useSelector(function (state) { return gamemode_1.getPlayerLevel(state.game); });
    return (React.createElement("div", { className: "player-list" }, players.map(function (p, index) {
        if (p.status === models_1.PlayerStatus.QUIT) {
            return React.createElement(statusPlayerListItem_1.StatusPlayerListItem, { key: p.id, playerId: p.id, status: "Quit" });
        }
        if (p.roundDiedAt) {
            return React.createElement(statusPlayerListItem_1.StatusPlayerListItem, { key: p.id, playerId: p.id, status: "Dead", subtitle: ordinal_suffix_of(index + 1) + " place" });
        }
        return (React.createElement(playerListItem_1.PlayerListItem, { key: p.id, playerId: p.id, index: index, isLocal: p.id === localPlayerId, isOpponent: p.id === opponentId, showReadyIndicator: showReadyIndicators, money: p.id === localPlayerId ? localPlayerMoney : p.money, level: p.id === localPlayerId ? localPlayerLevel : p.level }));
    })));
};
exports.PlayerList = PlayerList;


/***/ }),

/***/ "./src/game/module/playerList/components/playerName.tsx":
/*!**************************************************************!*\
  !*** ./src/game/module/playerList/components/playerName.tsx ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.PlayerName = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var selectors_1 = __webpack_require__(/*! ./selectors */ "./src/game/module/playerList/components/selectors.ts");
var PlayerName = function (_a) {
    var playerId = _a.playerId;
    var player = react_redux_1.useSelector(selectors_1.getPlayerById(playerId));
    if (!player) {
        return null;
    }
    return React.createElement(React.Fragment, null, player.name);
};
exports.PlayerName = PlayerName;


/***/ }),

/***/ "./src/game/module/playerList/components/playerPicture.tsx":
/*!*****************************************************************!*\
  !*** ./src/game/module/playerList/components/playerPicture.tsx ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.PlayerPicture = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var selectors_1 = __webpack_require__(/*! ./selectors */ "./src/game/module/playerList/components/selectors.ts");
var PlayerPicture = function (_a) {
    var playerId = _a.playerId;
    var player = react_redux_1.useSelector(selectors_1.getPlayerById(playerId));
    if (!player || !player.picture) {
        return null;
    }
    return React.createElement("img", { src: "https://creaturechess.jamesmonger.com/images/front/" + player.picture + ".png" });
};
exports.PlayerPicture = PlayerPicture;


/***/ }),

/***/ "./src/game/module/playerList/components/playerTitle.tsx":
/*!***************************************************************!*\
  !*** ./src/game/module/playerList/components/playerTitle.tsx ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.PlayerTitle = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var selectors_1 = __webpack_require__(/*! ./selectors */ "./src/game/module/playerList/components/selectors.ts");
var PlayerTitle = function (_a) {
    var playerId = _a.playerId;
    var player = react_redux_1.useSelector(selectors_1.getPlayerById(playerId));
    if (!player || !player.title) {
        return null;
    }
    return React.createElement("span", { className: "player-profile-title " + player.title.className }, player.title.text);
};
exports.PlayerTitle = PlayerTitle;


/***/ }),

/***/ "./src/game/module/playerList/components/selectors.ts":
/*!************************************************************!*\
  !*** ./src/game/module/playerList/components/selectors.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.getPlayerById = void 0;
var reselect_1 = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");
var getPlayers = function (state) { return state.game.playerList; };
exports.getPlayerById = function (id) {
    return reselect_1.createSelector(getPlayers, function (players) { return players.find(function (p) { return p.id === id; }) || null; });
};


/***/ }),

/***/ "./src/game/module/playerList/index.ts":
/*!*********************************************!*\
  !*** ./src/game/module/playerList/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var playerList_1 = __webpack_require__(/*! ./components/playerList */ "./src/game/module/playerList/components/playerList.tsx");
__createBinding(exports, playerList_1, "PlayerList");
var state_1 = __webpack_require__(/*! ./state */ "./src/game/module/playerList/state.ts");
__createBinding(exports, state_1, "reducer", "playerListReducer");
__createBinding(exports, state_1, "commands", "PlayerListCommands");


/***/ }),

/***/ "./src/game/module/playerList/state.ts":
/*!*********************************************!*\
  !*** ./src/game/module/playerList/state.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
exports.__esModule = true;
exports.commands = exports.reducer = void 0;
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var initialState = [];
exports.reducer = (_a = toolkit_1.createSlice({
    name: "playerlist",
    initialState: initialState,
    reducers: {
        updatePlayerListCommand: function (state, _a) {
            var players = _a.payload;
            return (__spread(players));
        }
    }
}), _a.reducer), exports.commands = _a.actions;


/***/ }),

/***/ "./src/game/module/profile/index.ts":
/*!******************************************!*\
  !*** ./src/game/module/profile/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var profile_1 = __webpack_require__(/*! ./profile */ "./src/game/module/profile/profile.tsx");
__createBinding(exports, profile_1, "Profile");


/***/ }),

/***/ "./src/game/module/profile/pieceCount.tsx":
/*!************************************************!*\
  !*** ./src/game/module/profile/pieceCount.tsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.PieceCount = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
var auth_1 = __webpack_require__(/*! ../../../auth */ "./src/auth/index.ts");
var PieceCount = function (props) {
    var playerId = auth_1.usePlayerId();
    var level = react_redux_1.useSelector(function (state) { return gamemode_1.getPlayerLevel(state.game); });
    var board = react_redux_1.useSelector(function (state) { return state.game.board; });
    var pieceCount = board_1.BoardSelectors.getAllPieces(board).filter(function (p) { return p.ownerId === playerId; }).length;
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

/***/ "./src/game/module/profile/profile.tsx":
/*!*********************************************!*\
  !*** ./src/game/module/profile/profile.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Profile = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var progressBar_1 = __webpack_require__(/*! ../../../display/progressBar */ "./src/display/progressBar.tsx");
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var pieceCount_1 = __webpack_require__(/*! ./pieceCount */ "./src/game/module/profile/pieceCount.tsx");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var models_2 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var auth_1 = __webpack_require__(/*! ../../../auth */ "./src/auth/index.ts");
var renderProgressBar = function (current, max) { return current + " / " + max + " xp"; };
var Profile = function () {
    var dispatch = react_redux_1.useDispatch();
    var playerId = auth_1.usePlayerId();
    var level = react_redux_1.useSelector(function (state) { return gamemode_1.getPlayerLevel(state.game); });
    var xp = react_redux_1.useSelector(function (state) { return gamemode_1.getPlayerXp(state.game); });
    var money = react_redux_1.useSelector(function (state) { return gamemode_1.getPlayerMoney(state.game); });
    // todo reselect
    var health = react_redux_1.useSelector(function (state) {
        var player = state.game.playerList.find(function (p) { return p.id === playerId; });
        return player ? player.health : null;
    });
    if (health === null) {
        return null;
    }
    return (React.createElement("div", { className: "profile" },
        React.createElement("div", { className: "row" },
            React.createElement("p", { className: "item level" },
                "Level ",
                level,
                " ",
                React.createElement("span", { className: "highlight" },
                    "$",
                    money)),
            level !== models_2.MAX_PLAYER_LEVEL
                && (React.createElement(progressBar_1.ProgressBar, { className: "xp-progress", current: xp, max: models_1.getXpToNextLevel(level), renderContents: renderProgressBar }))),
        React.createElement("div", { className: "row" },
            React.createElement(pieceCount_1.PieceCount, null),
            level !== models_2.MAX_PLAYER_LEVEL
                && (React.createElement("button", { className: "buy-xp", onClick: function () { return dispatch(gamemode_1.PlayerGameActions.buyXpPlayerAction()); } },
                    "Buy ",
                    models_1.Constants.BUY_XP_AMOUNT,
                    " xp ($",
                    models_1.Constants.BUY_XP_COST,
                    ")"))),
        React.createElement(progressBar_1.ProgressBar, { className: "healthbar player-health", current: health, max: 100, renderContents: function (current) { return current.toString(); } })));
};
exports.Profile = Profile;


/***/ }),

/***/ "./src/game/module/roundIndicator.tsx":
/*!********************************************!*\
  !*** ./src/game/module/roundIndicator.tsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.RoundIndicator = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var RoundIndicator = function () {
    var round = react_redux_1.useSelector(function (state) { return state.game.roundInfo.round; });
    if (round === null) {
        return null;
    }
    return React.createElement("div", { className: "round-indicator" },
        "Round ",
        React.createElement("span", { className: "highlight" }, round));
};
exports.RoundIndicator = RoundIndicator;


/***/ }),

/***/ "./src/game/module/settings/index.ts":
/*!*******************************************!*\
  !*** ./src/game/module/settings/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var settings_1 = __webpack_require__(/*! ./settings */ "./src/game/module/settings/settings.tsx");
__createBinding(exports, settings_1, "Settings");
var quitGameButton_1 = __webpack_require__(/*! ./quitGameButton */ "./src/game/module/settings/quitGameButton.tsx");
__createBinding(exports, quitGameButton_1, "QuitGameButton");


/***/ }),

/***/ "./src/game/module/settings/quitGameButton.tsx":
/*!*****************************************************!*\
  !*** ./src/game/module/settings/quitGameButton.tsx ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.QuitGameButton = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var QuitGameButton = function () {
    var dispatch = react_redux_1.useDispatch();
    var _a = __read(React.useState(false), 2), areYouSure = _a[0], setAreYouSure = _a[1];
    var onClick = (areYouSure
        ? function () {
            dispatch(gamemode_1.PlayerGameActions.quitGamePlayerAction());
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

/***/ "./src/game/module/settings/settings.tsx":
/*!***********************************************!*\
  !*** ./src/game/module/settings/settings.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Settings = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var footer_1 = __webpack_require__(/*! ../../../display/footer */ "./src/display/footer.tsx");
var quitGameButton_1 = __webpack_require__(/*! ./quitGameButton */ "./src/game/module/settings/quitGameButton.tsx");
var Settings = function () {
    return (React.createElement("div", { className: "settings" },
        React.createElement(quitGameButton_1.QuitGameButton, null),
        React.createElement(footer_1.Footer, null)));
};
exports.Settings = Settings;


/***/ }),

/***/ "./src/game/page.tsx":
/*!***************************!*\
  !*** ./src/game/page.tsx ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GamePage = void 0;
// tslint:disable:jsx-ban-props
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/esm/index.js");
var react_dnd_multi_backend_1 = __importDefault(__webpack_require__(/*! react-dnd-multi-backend */ "./node_modules/react-dnd-multi-backend/dist/esm/index.js"));
var HTML5toTouch_1 = __importDefault(__webpack_require__(/*! react-dnd-multi-backend/dist/esm/HTML5toTouch */ "./node_modules/react-dnd-multi-backend/dist/esm/HTML5toTouch.js"));
var react_media_1 = __importDefault(__webpack_require__(/*! react-media */ "./node_modules/react-media/esm/react-media.js"));
var module_1 = __webpack_require__(/*! ./module */ "./src/game/module/index.ts");
var mobileGame_1 = __webpack_require__(/*! ./layouts/mobileGame */ "./src/game/layouts/mobileGame.tsx");
var desktopGame_1 = __webpack_require__(/*! ./layouts/desktopGame */ "./src/game/layouts/desktopGame.tsx");
var GamePage = function () {
    return (React.createElement(react_dnd_1.DndProvider, { backend: react_dnd_multi_backend_1["default"], options: HTML5toTouch_1["default"] },
        React.createElement(module_1.ResponsiveBoardStyles, null),
        React.createElement(react_media_1["default"], { query: "(orientation: landscape) and (min-width: 1200px)" },
            React.createElement(desktopGame_1.DesktopGame, null)),
        React.createElement(react_media_1["default"], { query: "(orientation: landscape) and (max-width: 1199px) and (min-width: 600px)" },
            React.createElement(mobileGame_1.MobileGame, null)),
        React.createElement(react_media_1["default"], { query: "(orientation: portrait), (max-width: 599px)" },
            React.createElement(mobileGame_1.MobileGame, null))));
};
exports.GamePage = GamePage;


/***/ }),

/***/ "./src/game/sagas/actions/preventAccidentalClose.ts":
/*!**********************************************************!*\
  !*** ./src/game/sagas/actions/preventAccidentalClose.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
exports.preventAccidentalClose = function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // display an "Are you sure you want to leave this page?" dialog
                window.onbeforeunload = function () { return "Are you sure you want to leave this page? There is currently no way to rejoin a game"; };
                return [4 /*yield*/, effects_1.take(gamemode_1.PlayerGameActions.quitGamePlayerAction.toString())];
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

/***/ "./src/game/sagas/events/battle.ts":
/*!*****************************************!*\
  !*** ./src/game/sagas/events/battle.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.clientBattleSaga = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var battle_1 = __webpack_require__(/*! @creature-chess/battle */ "../battle/lib/index.js");
var roundUpdate_1 = __webpack_require__(/*! ./roundUpdate */ "./src/game/sagas/events/roundUpdate.ts");
exports.clientBattleSaga = function (slices) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.fork(battle_1.battleSagaFactory(function (state) { return state.game.board; }), models_1.defaultGameOptions, slices.boardSlice)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(battle_1.BattleEvents.BATTLE_TURN_EVENT, function (_a) {
                        var board = _a.payload.board;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, effects_1.put(slices.boardSlice.commands.setBoardPiecesCommand({
                                        pieces: board.pieces,
                                        piecePositions: board.piecePositions,
                                        size: undefined // todo improve this
                                    }))];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(roundUpdate_1.gameRoundUpdateEvent.toString(), function (_a) {
                        var phase = _a.payload.phase;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(phase === models_1.GamePhase.PLAYING)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, effects_1.put(battle_1.startBattle())];
                                case 1:
                                    _b.sent();
                                    _b.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/game/sagas/events/index.ts":
/*!****************************************!*\
  !*** ./src/game/sagas/events/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var roundUpdate_1 = __webpack_require__(/*! ./roundUpdate */ "./src/game/sagas/events/roundUpdate.ts");
__createBinding(exports, roundUpdate_1, "gameRoundUpdateEvent");
__createBinding(exports, roundUpdate_1, "roundUpdateSaga");
var battle_1 = __webpack_require__(/*! ./battle */ "./src/game/sagas/events/battle.ts");
__createBinding(exports, battle_1, "clientBattleSaga");
var ui_1 = __webpack_require__(/*! ./ui */ "./src/game/sagas/events/ui.ts");
__createBinding(exports, ui_1, "uiSaga");


/***/ }),

/***/ "./src/game/sagas/events/roundUpdate.ts":
/*!**********************************************!*\
  !*** ./src/game/sagas/events/roundUpdate.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.roundUpdateSaga = exports.gameRoundUpdateEvent = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var battle_1 = __webpack_require__(/*! @creature-chess/battle */ "../battle/lib/index.js");
exports.gameRoundUpdateEvent = toolkit_1.createAction("gameRoundUpdateEvent");
exports.roundUpdateSaga = function (_a) {
    var benchSlice = _a.benchSlice, boardSlice = _a.boardSlice;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(exports.gameRoundUpdateEvent.toString(), function (_a) {
                    var _b, _c, cards, _d, board, bench, round, _e, board, bench, opponentId;
                    var packet = _a.payload;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                _b = packet.phase;
                                switch (_b) {
                                    case models_1.GamePhase.PREPARING: return [3 /*break*/, 1];
                                    case models_1.GamePhase.READY: return [3 /*break*/, 7];
                                    case models_1.GamePhase.PLAYING: return [3 /*break*/, 13];
                                }
                                return [3 /*break*/, 15];
                            case 1:
                                _c = packet.payload, cards = _c.cards, _d = _c.pieces, board = _d.board, bench = _d.bench, round = _c.round;
                                return [4 /*yield*/, effects_1.put(boardSlice.commands.setBoardPiecesCommand(board))];
                            case 2:
                                _f.sent();
                                return [4 /*yield*/, effects_1.put(benchSlice.commands.setBoardPiecesCommand(bench))];
                            case 3:
                                _f.sent();
                                return [4 /*yield*/, effects_1.put(gamemode_1.PlayerCommands.updateCardsCommand(cards))];
                            case 4:
                                _f.sent();
                                return [4 /*yield*/, effects_1.put(gamemode_1.PlayerInfoCommands.clearOpponentCommand())];
                            case 5:
                                _f.sent();
                                return [4 /*yield*/, effects_1.put(boardSlice.commands.unlockBoardCommand())];
                            case 6:
                                _f.sent();
                                return [2 /*return*/];
                            case 7:
                                _e = packet.payload, board = _e.board, bench = _e.bench, opponentId = _e.opponentId;
                                if (!board) return [3 /*break*/, 9];
                                return [4 /*yield*/, effects_1.put(boardSlice.commands.setBoardPiecesCommand(board))];
                            case 8:
                                _f.sent();
                                _f.label = 9;
                            case 9: return [4 /*yield*/, effects_1.put(benchSlice.commands.setBoardPiecesCommand(bench))];
                            case 10:
                                _f.sent();
                                return [4 /*yield*/, effects_1.put(boardSlice.commands.lockBoardCommand())];
                            case 11:
                                _f.sent();
                                return [4 /*yield*/, effects_1.put(gamemode_1.PlayerInfoCommands.updateOpponentCommand(opponentId))];
                            case 12:
                                _f.sent();
                                return [2 /*return*/];
                            case 13: return [4 /*yield*/, effects_1.put(battle_1.startBattle())];
                            case 14:
                                _f.sent();
                                return [2 /*return*/];
                            case 15: return [2 /*return*/];
                        }
                    });
                })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/game/sagas/events/ui.ts":
/*!*************************************!*\
  !*** ./src/game/sagas/events/ui.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.uiSaga = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var ui_1 = __webpack_require__(/*! ../../ui */ "./src/game/ui/index.ts");
var roundUpdate_1 = __webpack_require__(/*! ./roundUpdate */ "./src/game/sagas/events/roundUpdate.ts");
exports.uiSaga = function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(roundUpdate_1.gameRoundUpdateEvent.toString(), function (_a) {
                    var _b, isDead;
                    var phase = _a.payload.phase;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = phase;
                                switch (_b) {
                                    case models_1.GamePhase.PREPARING: return [3 /*break*/, 1];
                                    case models_1.GamePhase.READY: return [3 /*break*/, 4];
                                }
                                return [3 /*break*/, 7];
                            case 1: return [4 /*yield*/, effects_1.select(function (state) { return state.game.playerInfo.health === 0; })];
                            case 2:
                                isDead = _c.sent();
                                if (!!isDead) return [3 /*break*/, 4];
                                return [4 /*yield*/, effects_1.put(ui_1.openOverlay(ui_1.Overlay.SHOP))];
                            case 3:
                                _c.sent();
                                return [2 /*return*/];
                            case 4: return [4 /*yield*/, effects_1.put(ui_1.closeOverlay())];
                            case 5:
                                _c.sent();
                                return [4 /*yield*/, effects_1.put(ui_1.clearSelectedPiece())];
                            case 6:
                                _c.sent();
                                return [2 /*return*/];
                            case 7: return [2 /*return*/];
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var battle_1 = __webpack_require__(/*! @creature-chess/battle */ "../battle/lib/index.js");
var actions_1 = __webpack_require__(/*! ../../networking/actions */ "./src/networking/actions.ts");
var module_1 = __webpack_require__(/*! ../module */ "./src/game/module/index.ts");
var preventAccidentalClose_1 = __webpack_require__(/*! ./actions/preventAccidentalClose */ "./src/game/sagas/actions/preventAccidentalClose.ts");
var lobby_1 = __webpack_require__(/*! ../../lobby */ "./src/lobby/index.ts");
var events_1 = __webpack_require__(/*! ./events */ "./src/game/sagas/events/index.ts");
exports.gameSaga = function (slices) {
    var action, _a, board, bench, players, battleTurn, _b, phase, phaseStartedAtSeconds, _c, money, cards, level, xp, update;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, effects_1.take([actions_1.GAME_CONNECTED_EVENT, lobby_1.LobbyEvents.LOBBY_GAME_STARTED_EVENT])];
            case 1:
                action = _d.sent();
                return [4 /*yield*/, effects_1.fork(preventAccidentalClose_1.preventAccidentalClose)];
            case 2:
                _d.sent();
                return [4 /*yield*/, effects_1.fork(module_1.closeShopOnFirstBuySaga)];
            case 3:
                _d.sent();
                return [4 /*yield*/, effects_1.fork(module_1.clickToDropSaga)];
            case 4:
                _d.sent();
                return [4 /*yield*/, effects_1.fork(events_1.roundUpdateSaga, slices)];
            case 5:
                _d.sent();
                return [4 /*yield*/, effects_1.fork(events_1.clientBattleSaga, slices)];
            case 6:
                _d.sent();
                return [4 /*yield*/, effects_1.fork(events_1.uiSaga)];
            case 7:
                _d.sent();
                if (!(action && action.payload)) return [3 /*break*/, 16];
                _a = action.payload, board = _a.board, bench = _a.bench, players = _a.players, battleTurn = _a.battleTurn, _b = _a.game, phase = _b.phase, phaseStartedAtSeconds = _b.phaseStartedAtSeconds, _c = _a.playerInfo, money = _c.money, cards = _c.cards, level = _c.level, xp = _c.xp;
                return [4 /*yield*/, effects_1.put(slices.boardSlice.commands.setBoardPiecesCommand(board))];
            case 8:
                _d.sent();
                return [4 /*yield*/, effects_1.put(slices.benchSlice.commands.setBoardPiecesCommand(bench))];
            case 9:
                _d.sent();
                return [4 /*yield*/, effects_1.put(gamemode_1.PlayerInfoCommands.updateMoneyCommand(money))];
            case 10:
                _d.sent();
                return [4 /*yield*/, effects_1.put(gamemode_1.PlayerCommands.updateCardsCommand(cards))];
            case 11:
                _d.sent();
                return [4 /*yield*/, effects_1.put(gamemode_1.PlayerInfoCommands.updateLevelCommand(level, xp))];
            case 12:
                _d.sent();
                return [4 /*yield*/, effects_1.put(module_1.PlayerListCommands.updatePlayerListCommand(players))];
            case 13:
                _d.sent();
                update = { phase: phase, startedAt: phaseStartedAtSeconds };
                return [4 /*yield*/, effects_1.put(gamemode_1.RoundInfoCommands.setRoundInfoCommand(update))];
            case 14:
                _d.sent();
                if (!(battleTurn !== null)) return [3 /*break*/, 16];
                return [4 /*yield*/, effects_1.put(battle_1.startBattle(battleTurn))];
            case 15:
                _d.sent();
                _d.label = 16;
            case 16: return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/game/state.ts":
/*!***************************!*\
  !*** ./src/game/state.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.createGameReducer = void 0;
var redux_1 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var module_1 = __webpack_require__(/*! ./module */ "./src/game/module/index.ts");
var ui_1 = __webpack_require__(/*! ./ui */ "./src/game/ui/index.ts");
exports.createGameReducer = function (_a) {
    var boardSlice = _a.boardSlice, benchSlice = _a.benchSlice;
    return redux_1.combineReducers({
        roundInfo: gamemode_1.roundInfoReducer,
        board: boardSlice.boardReducer,
        bench: benchSlice.boardReducer,
        playerList: module_1.playerListReducer,
        playerInfo: gamemode_1.playerInfoReducer,
        cardShop: gamemode_1.PlayerReducers.cardShopReducer,
        ui: ui_1.uiReducer
    });
};


/***/ }),

/***/ "./src/game/ui/actions.ts":
/*!********************************!*\
  !*** ./src/game/ui/actions.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.updateConnectionStatus = exports.closeOverlay = exports.openOverlay = exports.clearSelectedPiece = exports.selectPiece = exports.CLEAR_SELECTED_PIECE = exports.SELECT_PIECE = exports.setWinnerIdCommand = exports.UPDATE_CONNECTION_STATUS = exports.CLOSE_OVERLAY = exports.OPEN_OVERLAY = void 0;
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
exports.OPEN_OVERLAY = "OPEN_OVERLAY";
exports.CLOSE_OVERLAY = "CLOSE_OVERLAY";
exports.UPDATE_CONNECTION_STATUS = "UPDATE_CONNECTION_STATUS";
exports.setWinnerIdCommand = toolkit_1.createAction("setWinnerIdCommand");
exports.SELECT_PIECE = "SELECT_PIECE";
exports.CLEAR_SELECTED_PIECE = "CLEAR_SELECTED_PIECE";
exports.selectPiece = function (id) { return ({
    type: exports.SELECT_PIECE,
    payload: {
        id: id
    }
}); };
exports.clearSelectedPiece = function () { return ({ type: exports.CLEAR_SELECTED_PIECE }); };
exports.openOverlay = function (overlay) { return ({
    type: exports.OPEN_OVERLAY,
    payload: {
        overlay: overlay
    }
}); };
exports.closeOverlay = function () { return ({ type: exports.CLOSE_OVERLAY }); };
exports.updateConnectionStatus = function (status) { return ({
    type: exports.UPDATE_CONNECTION_STATUS,
    payload: {
        status: status
    }
}); };


/***/ }),

/***/ "./src/game/ui/index.ts":
/*!******************************!*\
  !*** ./src/game/ui/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var reducer_1 = __webpack_require__(/*! ./reducer */ "./src/game/ui/reducer.ts");
__createBinding(exports, reducer_1, "reducer", "uiReducer");
var actions_1 = __webpack_require__(/*! ./actions */ "./src/game/ui/actions.ts");
__createBinding(exports, actions_1, "openOverlay");
__createBinding(exports, actions_1, "closeOverlay");
__createBinding(exports, actions_1, "clearSelectedPiece");
var overlay_1 = __webpack_require__(/*! ./overlay */ "./src/game/ui/overlay.ts");
__createBinding(exports, overlay_1, "Overlay");


/***/ }),

/***/ "./src/game/ui/overlay.ts":
/*!********************************!*\
  !*** ./src/game/ui/overlay.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

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

/***/ "./src/game/ui/reducer.ts":
/*!********************************!*\
  !*** ./src/game/ui/reducer.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var actions_1 = __webpack_require__(/*! ./actions */ "./src/game/ui/actions.ts");
var connection_status_1 = __webpack_require__(/*! ../connection-status */ "./src/game/connection-status.ts");
var initialState = {
    currentOverlay: null,
    selectedPieceId: null,
    winnerId: null,
    connectionStatus: connection_status_1.ConnectionStatus.NOT_CONNECTED
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_1.UPDATE_CONNECTION_STATUS:
            return __assign(__assign({}, state), { connectionStatus: action.payload.status });
        case actions_1.OPEN_OVERLAY: {
            return __assign(__assign({}, state), { currentOverlay: action.payload.overlay });
        }
        case actions_1.CLOSE_OVERLAY: {
            return __assign(__assign({}, state), { currentOverlay: null });
        }
        case actions_1.SELECT_PIECE: {
            var isSamePiece = state.selectedPieceId && state.selectedPieceId === action.payload.id;
            return __assign(__assign({}, state), { selectedPieceId: isSamePiece ? null : action.payload.id });
        }
        case actions_1.CLEAR_SELECTED_PIECE: {
            return __assign(__assign({}, state), { selectedPieceId: null });
        }
        case "setWinnerIdCommand": {
            return __assign(__assign({}, state), { winnerId: action.payload.winnerId });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var ReactDOM = __importStar(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var Sentry = __importStar(__webpack_require__(/*! @sentry/react */ "./node_modules/@sentry/react/esm/index.js"));
var tracing_1 = __webpack_require__(/*! @sentry/tracing */ "./node_modules/@sentry/tracing/esm/index.js");
__webpack_require__(/*! pepjs */ "./node_modules/pepjs/dist/pep.js");
__webpack_require__(/*! ./display/style/index.scss */ "./src/display/style/index.scss");
var store_1 = __webpack_require__(/*! ./store/store */ "./src/store/store.ts");
var app_1 = __webpack_require__(/*! ./app */ "./src/app.tsx");
var config_1 = __webpack_require__(/*! ./auth/config */ "./src/auth/config.ts");
if (true) {
    Sentry.init({
        dsn: "https://aa3e547dcf464bbcb7bdd7f36c18d334@o571659.ingest.sentry.io/5720153",
        environment:  false ? 0 : 'production',
        integrations: [new tracing_1.Integrations.BrowserTracing()],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0
    });
}
var BrowserRouterChild = function () {
    var history = react_router_dom_1.useHistory();
    var onRedirectCallback = function (appState) {
        // Use the router's history module to replace the url
        history.replace((appState === null || appState === void 0 ? void 0 : appState.returnTo) || window.location.pathname);
    };
    return (React.createElement(auth0_react_1.Auth0Provider, { domain: config_1.auth0Config.domain, clientId: config_1.auth0Config.clientID, redirectUri: config_1.auth0Config.redirectUri, audience: config_1.auth0Config.audience, scope: config_1.auth0Config.scope, onRedirectCallback: onRedirectCallback },
        React.createElement(Auth0ProviderChild, null)));
};
var Auth0ProviderChild = function () {
    // https://github.com/auth0/auth0-react/pull/134#issuecomment-717834548
    var _a = auth0_react_1.useAuth0(), getAccessTokenSilently = _a.getAccessTokenSilently, loginWithRedirect = _a.loginWithRedirect;
    var store = store_1.createAppStore(getAccessTokenSilently, loginWithRedirect);
    return (React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(app_1.App, null)));
};
ReactDOM.render(React.createElement(react_router_dom_1.BrowserRouter, null,
    React.createElement(BrowserRouterChild, null)), document.getElementById("approot"));


/***/ }),

/***/ "./src/lobby/events.ts":
/*!*****************************!*\
  !*** ./src/lobby/events.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.lobbyGameStartedEvent = exports.LOBBY_GAME_STARTED_EVENT = void 0;
exports.LOBBY_GAME_STARTED_EVENT = "LOBBY_GAME_STARTED_EVENT";
exports.lobbyGameStartedEvent = function () { return ({ type: exports.LOBBY_GAME_STARTED_EVENT }); };


/***/ }),

/***/ "./src/lobby/index.ts":
/*!****************************!*\
  !*** ./src/lobby/index.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var state_1 = __webpack_require__(/*! ./state */ "./src/lobby/state.ts");
__createBinding(exports, state_1, "reducer", "lobbyReducer");
__createBinding(exports, state_1, "LobbyCommands");
exports.LobbyEvents = __importStar(__webpack_require__(/*! ./events */ "./src/lobby/events.ts"));
var lobbyPage_1 = __webpack_require__(/*! ./lobbyPage */ "./src/lobby/lobbyPage.tsx");
__createBinding(exports, lobbyPage_1, "LobbyPage");


/***/ }),

/***/ "./src/lobby/lobbyPage.tsx":
/*!*********************************!*\
  !*** ./src/lobby/lobbyPage.tsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.LobbyPage = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
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
            lobbyStartingAtMs
                && (React.createElement(countdown_1.Countdown, { countdownToSeconds: lobbyStartingAtMs / 1000, render: countdownRender })),
            React.createElement("h2", { className: "lobby-id" },
                "Lobby ID: ",
                lobbyId),
            React.createElement("p", null,
                React.createElement("strong", null, "tip:"),
                " you can always sell your pieces back for their costs. Don't be afraid to change your team!"),
            React.createElement("p", null,
                React.createElement("strong", null, "tip:"),
                " building a balanced team is key to winning. Check out the help page to see type advantages!"),
            React.createElement("div", { className: "players" }, players.map(function (p) { return (React.createElement("div", { key: p.id, className: "player" + (p.isBot ? " bot" : "") },
                React.createElement("span", { className: "name" }, p.name),
                p.title && React.createElement("span", { className: "player-profile-title " + p.title.className }, p.title.text))); })),
            React.createElement("p", null,
                "The game will start ",
                models_1.LOBBY_WAIT_TIME,
                " seconds after the lobby is created, or immediately when there are ",
                models_1.MAX_PLAYERS_IN_GAME,
                " players")),
        React.createElement(footer_1.Footer, null)));
};
exports.LobbyPage = LobbyPage;


/***/ }),

/***/ "./src/lobby/state.ts":
/*!****************************!*\
  !*** ./src/lobby/state.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
exports.__esModule = true;
exports.LobbyCommands = exports.reducer = void 0;
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var initialState = {
    lobbyId: null,
    players: [],
    startingAtMs: null
};
exports.reducer = (_a = toolkit_1.createSlice({
    name: "lobby",
    initialState: initialState,
    reducers: {
        setLobbyDetailsCommand: function (state, action) { return (__assign(__assign({}, state), { lobbyId: action.payload.lobbyId, players: action.payload.players, startingAtMs: action.payload.startTimestamp })); },
        updateLobbyPlayerCommand: function (state, action) {
            var cloned = __assign(__assign({}, state), { players: __spread(state.players) });
            cloned.players[action.payload.index] = action.payload.player;
            return cloned;
        }
    }
}), _a.reducer), exports.LobbyCommands = _a.actions;


/***/ }),

/***/ "./src/menu/actions.ts":
/*!*****************************!*\
  !*** ./src/menu/actions.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.findGameAction = exports.FIND_GAME = void 0;
exports.FIND_GAME = "FIND_GAME";
exports.findGameAction = function (serverIP) { return ({
    type: exports.FIND_GAME,
    payload: { serverIP: serverIP }
}); };


/***/ }),

/***/ "./src/menu/get-url-parameter.ts":
/*!***************************************!*\
  !*** ./src/menu/get-url-parameter.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var menuPage_1 = __webpack_require__(/*! ./menuPage */ "./src/menu/menuPage.tsx");
__createBinding(exports, menuPage_1, "MenuPage");
exports.MenuActions = __importStar(__webpack_require__(/*! ./actions */ "./src/menu/actions.ts"));
var state_1 = __webpack_require__(/*! ./state */ "./src/menu/state.ts");
__createBinding(exports, state_1, "reducer", "menuReducer");


/***/ }),

/***/ "./src/menu/leaderboard.tsx":
/*!**********************************!*\
  !*** ./src/menu/leaderboard.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Leaderboard = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var use_http_1 = __importDefault(__webpack_require__(/*! use-http */ "./node_modules/use-http/dist/esm/index.js"));
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.MenuPage = void 0;
var React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var config_1 = __webpack_require__(/*! ../auth/config */ "./src/auth/config.ts");
var get_url_parameter_1 = __webpack_require__(/*! ./get-url-parameter */ "./src/menu/get-url-parameter.ts");
var leaderboard_1 = __webpack_require__(/*! ./leaderboard */ "./src/menu/leaderboard.tsx");
var actions_1 = __webpack_require__(/*! ./actions */ "./src/menu/actions.ts");
var state_1 = __webpack_require__(/*! ./state */ "./src/menu/state.ts");
var display_1 = __webpack_require__(/*! ../display */ "./src/display/index.ts");
var Navbar = function () {
    var logout = auth0_react_1.useAuth0().logout;
    var onLogoutClick = function () { return logout(); };
    return (React.createElement("nav", { className: "navbar" },
        React.createElement("button", { className: "sign-out", onClick: onLogoutClick }, "Log Out")));
};
var TestButton = function () {
    var _a = auth0_react_1.useAuth0(), getAccessTokenSilently = _a.getAccessTokenSilently, getIdTokenClaims = _a.getIdTokenClaims, user = _a.user;
    var _b = __read(React.useState(false), 2), loading = _b[0], setLoading = _b[1];
    var onClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAccessTokenSilently({ ignoreCache: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getIdTokenClaims()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    if (loading) {
        return React.createElement("button", { disabled: true }, "Loading...");
    }
    return React.createElement("button", { onClick: onClick }, "Test");
};
var MenuPageUnconnected = /** @class */ (function (_super) {
    __extends(MenuPageUnconnected, _super);
    function MenuPageUnconnected() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onFindGameClick = function () {
            var serverIP = get_url_parameter_1.getUrlParameter("server") || config_1.GAME_SERVER_URL;
            _this.props.onFindGame(serverIP);
        };
        return _this;
    }
    MenuPageUnconnected.prototype.render = function () {
        if (this.props.loading) {
            return React.createElement(display_1.Loading, null);
        }
        return (React.createElement("div", { className: "menu" },
            React.createElement(Navbar, null),
            React.createElement("div", { className: "join-game" },
                React.createElement(TestButton, null),
                React.createElement("h2", { className: "title" }, "Creature Chess"),
                React.createElement("div", { className: "blurb" },
                    React.createElement("p", null, "More fun with friends! Press \"Find Game\" at the same time to play together"),
                    React.createElement("p", null, "Up to 8 players!")),
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
                        React.createElement("p", null, this.props.error))),
            React.createElement(leaderboard_1.Leaderboard, null),
            React.createElement(display_1.Footer, null)));
    };
    return MenuPageUnconnected;
}(React.Component));
var mapStateToProps = function (state) { return ({
    loading: state.menu.loading,
    error: state.menu.error
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onFindGame: function (serverIP) {
        dispatch(state_1.startLoading());
        dispatch(actions_1.findGameAction(serverIP));
    },
    setError: function (error) { return dispatch(state_1.finishLoading(error)); }
}); };
var MenuPage = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MenuPageUnconnected);
exports.MenuPage = MenuPage;


/***/ }),

/***/ "./src/menu/state.ts":
/*!***************************!*\
  !*** ./src/menu/state.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
exports.__esModule = true;
exports.finishLoading = exports.startLoading = exports.reducer = void 0;
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var initialState = {
    loading: false,
    error: null
};
exports.reducer = (_a = toolkit_1.createSlice({
    name: "menu",
    initialState: initialState,
    reducers: {
        startLoading: function (state) { return (__assign(__assign({}, state), { loading: true })); },
        finishLoading: function (state, _a) {
            var _b = _a.payload, error = _b === void 0 ? null : _b;
            return (__assign(__assign({}, state), { loading: false, error: error }));
        }
    }
}), _a.reducer), exports.startLoading = (_b = _a.actions, _b.startLoading), exports.finishLoading = _b.finishLoading;


/***/ }),

/***/ "./src/networking/actions.ts":
/*!***********************************!*\
  !*** ./src/networking/actions.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.gameConnectedEvent = exports.lobbyConnectedEvent = exports.GAME_CONNECTED_EVENT = exports.LOBBY_CONNECTED_EVENT = void 0;
exports.LOBBY_CONNECTED_EVENT = "LOBBY_CONNECTED_EVENT";
exports.GAME_CONNECTED_EVENT = "GAME_CONNECTED_EVENT";
exports.lobbyConnectedEvent = function (lobbyId, players, startTimestamp) { return ({
    type: exports.LOBBY_CONNECTED_EVENT,
    payload: {
        lobbyId: lobbyId,
        players: players,
        startTimestamp: startTimestamp
    }
}); };
exports.gameConnectedEvent = function (payload) { return ({ type: exports.GAME_CONNECTED_EVENT, payload: payload }); };


/***/ }),

/***/ "./src/networking/index.ts":
/*!*********************************!*\
  !*** ./src/networking/index.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var findGame_1 = __webpack_require__(/*! ./sagas/findGame */ "./src/networking/sagas/findGame.ts");
__createBinding(exports, findGame_1, "findGame");


/***/ }),

/***/ "./src/networking/sagas/findGame.ts":
/*!******************************************!*\
  !*** ./src/networking/sagas/findGame.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var networking_1 = __webpack_require__(/*! @creature-chess/networking */ "../networking/lib/index.js");
var lobby_1 = __webpack_require__(/*! ../../lobby */ "./src/lobby/index.ts");
var menu_1 = __webpack_require__(/*! ../../menu */ "./src/menu/index.ts");
var socket_1 = __webpack_require__(/*! ../socket */ "./src/networking/socket.ts");
var actions_1 = __webpack_require__(/*! ../actions */ "./src/networking/actions.ts");
var networkingSaga_1 = __webpack_require__(/*! ./networkingSaga */ "./src/networking/sagas/networkingSaga.ts");
exports.findGame = function (auth, slices) {
    var findGameAction, idToken, socket, error_1, registry, channel, _a, lobby, game;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, effects_1.take(menu_1.MenuActions.FIND_GAME)];
            case 1:
                findGameAction = _b.sent();
                return [4 /*yield*/, effects_1.call(auth.getAccessTokenSilently)];
            case 2:
                idToken = _b.sent();
                socket = null;
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, effects_1.call(socket_1.getSocket, findGameAction.payload.serverIP, idToken)];
            case 4:
                socket = _b.sent();
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                auth.loginWithRedirect();
                return [2 /*return*/];
            case 6:
                registry = new networking_1.IncomingPacketRegistry(function (opcode, handler) { return socket.on(opcode, handler); });
                channel = redux_saga_1.eventChannel(function (emit) {
                    registry.on(networking_1.ServerToClient.Menu.PacketOpcodes.LOBBY_CONNECTED, function (_a) {
                        var lobbyId = _a.lobbyId, players = _a.players, startTimestamp = _a.startTimestamp;
                        emit(actions_1.lobbyConnectedEvent(lobbyId, players, startTimestamp));
                    });
                    registry.on(networking_1.ServerToClient.Menu.PacketOpcodes.GAME_CONNECTED, function (payload) {
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
            case 7:
                _b.sent();
                return [4 /*yield*/, effects_1.race({
                        lobby: effects_1.take(actions_1.LOBBY_CONNECTED_EVENT),
                        game: effects_1.take(actions_1.GAME_CONNECTED_EVENT)
                    })];
            case 8:
                _a = _b.sent(), lobby = _a.lobby, game = _a.game;
                channel.close();
                return [4 /*yield*/, effects_1.fork(networkingSaga_1.networkingSaga, socket, slices)];
            case 9:
                _b.sent();
                if (!lobby) return [3 /*break*/, 12];
                return [4 /*yield*/, effects_1.put(lobby_1.LobbyCommands.setLobbyDetailsCommand(lobby.payload))];
            case 10:
                _b.sent();
                return [4 /*yield*/, effects_1.put(lobby)];
            case 11:
                _b.sent();
                return [3 /*break*/, 14];
            case 12:
                if (!game) return [3 /*break*/, 14];
                return [4 /*yield*/, effects_1.put(game)];
            case 13:
                _b.sent();
                _b.label = 14;
            case 14: return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/networking/sagas/game/incoming.ts":
/*!***********************************************!*\
  !*** ./src/networking/sagas/game/incoming.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.__esModule = true;
exports.incomingGameNetworking = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var networking_1 = __webpack_require__(/*! @creature-chess/networking */ "../networking/lib/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var actions_1 = __webpack_require__(/*! ../../../game/ui/actions */ "./src/game/ui/actions.ts");
var module_1 = __webpack_require__(/*! ../../../game/module */ "./src/game/module/index.ts");
var connection_status_1 = __webpack_require__(/*! ../../../game/connection-status */ "./src/game/connection-status.ts");
var events_1 = __webpack_require__(/*! ../../../game/sagas/events */ "./src/game/sagas/events/index.ts");
var readPacketsToActions = function (registry, socket, _a) {
    var channel;
    var benchSlice = _a.benchSlice, boardSlice = _a.boardSlice;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                channel = redux_saga_1.eventChannel(function (emit) {
                    socket.on("reconnect_failed", function () {
                        emit(actions_1.updateConnectionStatus(connection_status_1.ConnectionStatus.DISCONNECTED));
                    });
                    socket.on("reconnect_error", function () {
                        emit(actions_1.updateConnectionStatus(connection_status_1.ConnectionStatus.DISCONNECTED));
                    });
                    registry.on(networking_1.ServerToClient.Game.PacketOpcodes.PLAYER_LIST_UPDATE, function (packet) {
                        emit(module_1.PlayerListCommands.updatePlayerListCommand(packet));
                    });
                    registry.on(networking_1.ServerToClient.Game.PacketOpcodes.BOARD_UPDATE, function (_a) {
                        var state = _a.state;
                        emit(boardSlice.commands.setBoardPiecesCommand(state));
                    });
                    registry.on(networking_1.ServerToClient.Game.PacketOpcodes.BENCH_UPDATE, function (_a) {
                        var state = _a.state;
                        emit(benchSlice.commands.setBoardPiecesCommand(state));
                    });
                    registry.on(networking_1.ServerToClient.Game.PacketOpcodes.CARDS_UPDATE, function (packet) {
                        emit(gamemode_1.PlayerCommands.updateCardsCommand(packet));
                    });
                    registry.on(networking_1.ServerToClient.Game.PacketOpcodes.SHOP_LOCK_UPDATE, function (packet) {
                        emit(gamemode_1.PlayerCommands.updateShopLockCommand(packet.locked));
                    });
                    registry.on(networking_1.ServerToClient.Game.PacketOpcodes.MONEY_UPDATE, function (packet) {
                        emit(gamemode_1.PlayerInfoCommands.updateMoneyCommand(packet));
                    });
                    registry.on(networking_1.ServerToClient.Game.PacketOpcodes.HEALTH_UPDATE, function (packet) {
                        emit(gamemode_1.PlayerInfoCommands.updateHealthCommand(packet));
                    });
                    registry.on(networking_1.ServerToClient.Game.PacketOpcodes.LEVEL_UPDATE, function (packet) {
                        emit(gamemode_1.PlayerInfoCommands.updateLevelCommand(packet.level, packet.xp));
                        emit(boardSlice.commands.setPieceLimitCommand(packet.level));
                    });
                    registry.on(networking_1.ServerToClient.Game.PacketOpcodes.MATCH_REWARDS, function (payload) {
                        emit(gamemode_1.PlayerEvents.playerMatchRewardsEvent(payload));
                    });
                    registry.on(networking_1.ServerToClient.Game.PacketOpcodes.FINISH_GAME, function (_a) {
                        var winnerId = _a.winnerId;
                        emit(actions_1.setWinnerIdCommand({ winnerId: winnerId }));
                        socket.close();
                    });
                    registry.on(networking_1.ServerToClient.Game.PacketOpcodes.PHASE_UPDATE, function (packet) {
                        var update = __assign({ phase: packet.phase, startedAt: packet.startedAtSeconds }, (packet.phase === models_1.GamePhase.PREPARING ? { round: packet.payload.round } : undefined));
                        emit(gamemode_1.RoundInfoCommands.setRoundInfoCommand(update));
                        emit(events_1.gameRoundUpdateEvent(packet));
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
                _b.sent();
                return [2 /*return*/];
        }
    });
};
exports.incomingGameNetworking = function (socket, slices) {
    var registry;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                registry = new networking_1.IncomingPacketRegistry(function (opcode, handler) { return socket.on(opcode, handler); });
                return [4 /*yield*/, effects_1.fork(readPacketsToActions, registry, socket, slices)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/networking/sagas/game/index.ts":
/*!********************************************!*\
  !*** ./src/networking/sagas/game/index.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var incoming_1 = __webpack_require__(/*! ./incoming */ "./src/networking/sagas/game/incoming.ts");
var outgoing_1 = __webpack_require__(/*! ./outgoing */ "./src/networking/sagas/game/outgoing.ts");
var actions_1 = __webpack_require__(/*! ../../../game/ui/actions */ "./src/game/ui/actions.ts");
var actions_2 = __webpack_require__(/*! ../../actions */ "./src/networking/actions.ts");
var lobby_1 = __webpack_require__(/*! ../../../lobby */ "./src/lobby/index.ts");
var connection_status_1 = __webpack_require__(/*! ../../../game/connection-status */ "./src/game/connection-status.ts");
exports.gameNetworking = function (socket, slices) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.take([actions_2.GAME_CONNECTED_EVENT, lobby_1.LobbyEvents.LOBBY_GAME_STARTED_EVENT])];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.put(actions_1.updateConnectionStatus(connection_status_1.ConnectionStatus.CONNECTED))];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(outgoing_1.outgoingGameNetworking, socket)];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(incoming_1.incomingGameNetworking, socket, slices)];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/networking/sagas/game/outgoing.ts":
/*!***********************************************!*\
  !*** ./src/networking/sagas/game/outgoing.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var gamemode_1 = __webpack_require__(/*! @creature-chess/gamemode */ "../gamemode/lib/index.js");
var networking_1 = __webpack_require__(/*! @creature-chess/networking */ "../networking/lib/index.js");
var battle_1 = __webpack_require__(/*! @creature-chess/battle */ "../battle/lib/index.js");
var sendPlayerActions = function (registry) {
    var lastSentIndex, action, index;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lastSentIndex = 0;
                _a.label = 1;
            case 1:
                if (false) {}
                return [4 /*yield*/, effects_1.take(gamemode_1.PlayerGameActions.PlayerGameActionTypesArray)];
            case 2:
                action = _a.sent();
                index = ++lastSentIndex;
                registry.emit(networking_1.ClientToServer.PacketOpcodes.SEND_PLAYER_ACTIONS, { index: index, actions: [action] });
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
                _b = [effects_1.takeEvery(battle_1.BattleEvents.BATTLE_FINISH_EVENT, function () {
                        return __generator(this, function (_a) {
                            registry.emit(networking_1.ClientToServer.PacketOpcodes.FINISH_MATCH, { empty: true });
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
                registry = new networking_1.OutgoingPacketRegistry(function (opcode, payload, ack) { return socket.emit(opcode, payload, ack); });
                return [4 /*yield*/, effects_1.fork(writeActionsToPackets, registry)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/networking/sagas/lobby.ts":
/*!***************************************!*\
  !*** ./src/networking/sagas/lobby.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var networking_1 = __webpack_require__(/*! @creature-chess/networking */ "../networking/lib/index.js");
var actions_1 = __webpack_require__(/*! ../actions */ "./src/networking/actions.ts");
var lobby_1 = __webpack_require__(/*! ../../lobby */ "./src/lobby/index.ts");
var readPacketsToActions = function (registry) {
    var channel, action;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, , 5, 7]);
                channel = redux_saga_1.eventChannel(function (emit) {
                    registry.on(networking_1.ServerToClient.Lobby.PacketOpcodes.LOBBY_PLAYER_UPDATE, function (_a) {
                        var index = _a.index, player = _a.player;
                        emit(lobby_1.LobbyCommands.updateLobbyPlayerCommand({ index: index, player: player }));
                    });
                    registry.on(networking_1.ServerToClient.Lobby.PacketOpcodes.LOBBY_GAME_STARTED, function () {
                        emit(lobby_1.LobbyEvents.lobbyGameStartedEvent());
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
    var registry, readPacketsTask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.take(actions_1.LOBBY_CONNECTED_EVENT)];
            case 1:
                _a.sent();
                registry = new networking_1.IncomingPacketRegistry(function (opcode, handler) { return socket.on(opcode, handler); });
                return [4 /*yield*/, effects_1.fork(readPacketsToActions, registry)];
            case 2:
                readPacketsTask = _a.sent();
                return [4 /*yield*/, effects_1.take(lobby_1.LobbyEvents.LOBBY_GAME_STARTED_EVENT)];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.cancel(readPacketsTask)];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/networking/sagas/networkingSaga.ts":
/*!************************************************!*\
  !*** ./src/networking/sagas/networkingSaga.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.networkingSaga = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var lobby_1 = __webpack_require__(/*! ./lobby */ "./src/networking/sagas/lobby.ts");
var game_1 = __webpack_require__(/*! ./game */ "./src/networking/sagas/game/index.ts");
exports.networkingSaga = function (socket, slices) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.fork(lobby_1.lobbyNetworking, socket)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(game_1.gameNetworking, socket, slices)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/networking/socket.ts":
/*!**********************************!*\
  !*** ./src/networking/socket.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.getSocket = void 0;
var io = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
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
            reject(error);
        };
        socket.on("authenticate_response", onAuthenticated);
    });
};


/***/ }),

/***/ "./src/store/reducers.ts":
/*!*******************************!*\
  !*** ./src/store/reducers.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.createReducers = void 0;
var lobby_1 = __webpack_require__(/*! ../lobby */ "./src/lobby/index.ts");
var menu_1 = __webpack_require__(/*! ../menu */ "./src/menu/index.ts");
var game_1 = __webpack_require__(/*! ../game */ "./src/game/index.ts");
exports.createReducers = function (slices) { return ({
    lobby: lobby_1.lobbyReducer,
    game: game_1.createGameReducer(slices),
    menu: menu_1.menuReducer
}); };


/***/ }),

/***/ "./src/store/saga.ts":
/*!***************************!*\
  !*** ./src/store/saga.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var networking_1 = __webpack_require__(/*! ../networking */ "./src/networking/index.ts");
var game_1 = __webpack_require__(/*! ../game */ "./src/game/index.ts");
exports.rootSaga = function (getAccessTokenSilently, loginWithRedirect, slices) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.fork(networking_1.findGame, { getAccessTokenSilently: getAccessTokenSilently, loginWithRedirect: loginWithRedirect }, slices)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(game_1.gameSaga, slices)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/store/store.ts":
/*!****************************!*\
  !*** ./src/store/store.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createAppStore = void 0;
var redux_1 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
var redux_saga_1 = __importDefault(__webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js"));
var redux_devtools_extension_1 = __webpack_require__(/*! redux-devtools-extension */ "./node_modules/redux-devtools-extension/index.js");
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
var reducers_1 = __webpack_require__(/*! ./reducers */ "./src/store/reducers.ts");
var saga_1 = __webpack_require__(/*! ./saga */ "./src/store/saga.ts");
exports.createAppStore = function (getAccessTokenSilently, loginWithRedirect) {
    var sagaMiddleware = redux_saga_1["default"]();
    var boardSlice = board_1.createBoardSlice("local-board", { width: 7, height: 3 });
    var benchSlice = board_1.createBoardSlice("local-bench", { width: 7, height: 1 });
    var store = redux_1.createStore(redux_1.combineReducers(reducers_1.createReducers({ boardSlice: boardSlice, benchSlice: benchSlice })), redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(saga_1.rootSaga, getAccessTokenSilently, loginWithRedirect, { benchSlice: benchSlice, boardSlice: boardSlice });
    return store;
};


/***/ }),

/***/ "./src/display/style/index.scss":
/*!**************************************!*\
  !*** ./src/display/style/index.scss ***!
  \**************************************/
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../battle/lib/battleSaga.js":
/*!***********************************!*\
  !*** ../battle/lib/battleSaga.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.battleSagaFactory = exports.startBattle = void 0;
var present = __webpack_require__(/*! present */ "../battle/node_modules/present/lib/present-browser.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "../battle/node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../battle/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var turnSimulator_1 = __webpack_require__(/*! ./turnSimulator */ "../battle/lib/turnSimulator.js");
var is_a_team_defeated_1 = __webpack_require__(/*! ./utils/is-a-team-defeated */ "../battle/lib/utils/is-a-team-defeated.js");
var events_1 = __webpack_require__(/*! ./events */ "../battle/lib/events.js");
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
var battleEventChannel = function (startingBoardState, boardSlice, startingTurn, options, bufferSize) {
    return redux_saga_1.eventChannel(function (emit) {
        var cancelled = false;
        var board = {
            id: startingBoardState.id,
            pieces: addCombatState(startingBoardState.pieces),
            piecePositions: __assign({}, startingBoardState.piecePositions),
            locked: startingBoardState.locked,
            size: startingBoardState.size,
            pieceLimit: null
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
                            || is_a_team_defeated_1.isATeamDefeated(board));
                        if (!shouldStop) return [3 /*break*/, 3];
                        return [4 /*yield*/, duration(1000).remaining()];
                    case 2:
                        _a.sent();
                        emit(events_1.battleFinishEvent(turnCount));
                        return [3 /*break*/, 5];
                    case 3:
                        turnTimer = duration(options.turnDuration);
                        board = turnSimulator_1.simulateTurn(++turnCount, board, boardSlice);
                        emit(events_1.battleTurnEvent(turnCount, board));
                        return [4 /*yield*/, turnTimer.remaining()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        run();
        return function () {
            cancelled = true;
        };
    }, redux_saga_1.buffers.expanding(bufferSize));
};
exports.battleSagaFactory = function (boardSelector) { return function (gameOptions, boardSlice) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(START_BATTLE, function (_a) {
                    var board, battleChannel;
                    var turn = _a.payload.turn;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, effects_1.select(boardSelector)];
                            case 1:
                                board = _b.sent();
                                return [4 /*yield*/, effects_1.call(battleEventChannel, board, boardSlice, turn || 0, gameOptions, 100)];
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
}; };


/***/ }),

/***/ "../battle/lib/events.js":
/*!*******************************!*\
  !*** ../battle/lib/events.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.battleFinishEvent = exports.battleTurnEvent = exports.BATTLE_FINISH_EVENT = exports.BATTLE_TURN_EVENT = void 0;
exports.BATTLE_TURN_EVENT = "BATTLE_TURN_EVENT";
exports.BATTLE_FINISH_EVENT = "BATTLE_FINISH_EVENT";
exports.battleTurnEvent = function (turn, board) { return ({ type: exports.BATTLE_TURN_EVENT, payload: { turn: turn, board: board } }); };
exports.battleFinishEvent = function (turns) { return ({ type: exports.BATTLE_FINISH_EVENT, payload: { turns: turns } }); };


/***/ }),

/***/ "../battle/lib/index.js":
/*!******************************!*\
  !*** ../battle/lib/index.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.BattleEvents = __webpack_require__(/*! ./events */ "../battle/lib/events.js");
var battleSaga_1 = __webpack_require__(/*! ./battleSaga */ "../battle/lib/battleSaga.js");
__createBinding(exports, battleSaga_1, "battleSagaFactory");
__createBinding(exports, battleSaga_1, "startBattle");


/***/ }),

/***/ "../battle/lib/pathfinding.js":
/*!************************************!*\
  !*** ../battle/lib/pathfinding.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var javascript_astar_1 = __webpack_require__(/*! javascript-astar */ "../battle/node_modules/javascript-astar/astar.js");
var getTargetAttackPositions_1 = __webpack_require__(/*! ./utils/getTargetAttackPositions */ "../battle/lib/utils/getTargetAttackPositions.js");
var createEmptyWeightGrid = function (_a) {
    var width = _a.width, height = _a.height;
    var grid = [];
    // todo this is a weird way round
    for (var x = 0; x < width; x++) {
        var column = [];
        for (var y = 0; y < height; y++) {
            column.push(1);
        }
        grid.push(column);
    }
    return grid;
};
var createWeightGrid = function (start, board) {
    var grid = createEmptyWeightGrid(board.size);
    Object.entries(board.piecePositions)
        .forEach(function (_a) {
        var _b = __read(_a, 2), position = _b[0], pieceId = _b[1];
        var _c = __read(position.split(","), 2), x = _c[0], y = _c[1];
        if (pieceId) {
            grid[x][y] = 0;
        }
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
exports.getNextPiecePosition = function (attackerPosition, attackerStats, targetPosition, board) {
    var attackRange = attackerStats.attackType.range;
    var targetTiles = getTargetAttackPositions_1.getTargetAttackPositions(board, targetPosition, attackRange);
    var paths = targetTiles.map(function (pos) { return findPath(board, attackerPosition, pos); }).filter(function (path) { return path !== null; });
    if (paths.length === 0) {
        return null;
    }
    paths.sort(function (a, b) { return a.stepCount - b.stepCount; });
    return paths[0].firstStep;
};


/***/ }),

/***/ "../battle/lib/turnSimulator.js":
/*!**************************************!*\
  !*** ../battle/lib/turnSimulator.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
var get_type_attack_bonus_1 = __webpack_require__(/*! ./utils/get-type-attack-bonus */ "../battle/lib/utils/get-type-attack-bonus.js");
var inAttackRange_1 = __webpack_require__(/*! ./utils/inAttackRange */ "../battle/lib/utils/inAttackRange.js");
var findTargetId_1 = __webpack_require__(/*! ./utils/findTargetId */ "../battle/lib/utils/findTargetId.js");
var pathfinding_1 = __webpack_require__(/*! ./pathfinding */ "../battle/lib/pathfinding.js");
var DYING_DURATION = 10;
var ATTACK_TURN_DURATION = 2;
var MOVE_TURN_DURATION = 2;
// todo tune this
var getCooldownForSpeed = function (speed) { return (180 - speed) / 24; };
var STRONG_ATTACK_MODIFIER = 1.7;
var WEAK_ATTACK_MODIFIER = 0.3;
var getStats = function (piece) { return piece.definition.stages[piece.stage]; };
exports.simulateTurn = function (currentTurn, board, boardSlice) {
    var pieceEntries = Object.entries(board.pieces);
    pieceEntries.sort(function (_a, _b) {
        var _c = __read(_a, 2), aPiece = _c[1];
        var _d = __read(_b, 2), bPiece = _d[1];
        var aStats = getStats(aPiece);
        var bStats = getStats(bPiece);
        return bStats.speed - aStats.speed;
    });
    return pieceEntries.reduce(function (b, _a) {
        var _b = __read(_a, 1), pieceId = _b[0];
        return takePieceTurn(currentTurn, pieceId, b, boardSlice);
    }, board);
};
var takePieceTurn = function (currentTurn, pieceId, board, boardSlice) {
    var originalPiece = board_1.BoardSelectors.getPiece(board, pieceId);
    // create a new piece object, reset combat properties
    var attacker = __assign(__assign({}, originalPiece), { attacking: null, hit: null, combat: __assign(__assign({}, originalPiece.combat), { board: __assign({}, originalPiece.combat.board) }) });
    var attackerPosition = board_1.BoardSelectors.getPiecePosition(board, pieceId);
    var attackerTargetId = attacker.combat.targetId;
    var attackerBoardState = attacker.combat.board;
    var attackerStats = getStats(attacker);
    // board management
    if (attackerBoardState.removeFromBoardAtTurn === currentTurn) {
        return boardSlice.boardReducer(board, boardSlice.commands.removeBoardPiecesCommand([pieceId]));
    }
    if (attacker.currentHealth === 0) {
        if (attackerBoardState.removeFromBoardAtTurn) {
            return board;
        }
        attackerBoardState.removeFromBoardAtTurn = currentTurn + DYING_DURATION;
        return boardSlice.boardReducer(board, boardSlice.commands.updateBoardPiecesCommand([attacker]));
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
        return boardSlice.boardReducer(board, boardSlice.commands.updateBoardPiecesCommand([attacker]));
    }
    var target = board_1.BoardSelectors.getPiece(board, attackerTargetId);
    // if we can't attack yet, wait for cooldown
    if (attackerBoardState.canAttackAtTurn > currentTurn) {
        // todo check if attacker has been changed
        return boardSlice.boardReducer(board, boardSlice.commands.updateBoardPiecesCommand([attacker]));
    }
    // if the enemy can't be attacked yet, wait
    // todo consider breaking and choosing different target..
    if (target.combat.board.canBeAttackedAtTurn > currentTurn) {
        return boardSlice.boardReducer(board, boardSlice.commands.updateBoardPiecesCommand([attacker]));
    }
    var targetPosition = board_1.BoardSelectors.getPiecePosition(board, attackerTargetId);
    var inRange = inAttackRange_1.inAttackRange(attackerPosition, targetPosition, attackerStats.attackType);
    var targetAlive = target.currentHealth > 0;
    if (!targetAlive) {
        // target is dead, so clear target
        // todo should we increment canAttackAtTurn here?
        attacker.combat.targetId = null;
        return boardSlice.boardReducer(board, boardSlice.commands.updateBoardPiecesCommand([attacker]));
    }
    else if (inRange) {
        // target is in range, so attack
        var damage = getAttackDamage(attacker, target);
        var newDefenderHealth = Math.max(target.currentHealth - damage, 0);
        var attackerDirection = models_1.getRelativeDirection(attackerPosition, targetPosition);
        var attackerDistance = models_1.getDistance(attackerPosition, targetPosition);
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
                direction: models_1.getRelativeDirection(targetPosition, attackerPosition),
                damage: damage
            } });
        return boardSlice.boardReducer(board, boardSlice.commands.updateBoardPiecesCommand([newAttacker, defender]));
    }
    else {
        // target is out of range, so move towards
        if (attackerBoardState.canMoveAtTurn > currentTurn) {
            return boardSlice.boardReducer(board, boardSlice.commands.updateBoardPiecesCommand([attacker]));
        }
        var nextPosition = pathfinding_1.getNextPiecePosition(attackerPosition, attackerStats, targetPosition, board);
        if (!nextPosition) {
            return boardSlice.boardReducer(board, boardSlice.commands.updateBoardPiecesCommand([attacker]));
        }
        var attackerDirection = models_1.getRelativeDirection(attackerPosition, targetPosition);
        attacker.facingAway = getNewAttackerFacingAway(attacker.facingAway, attackerDirection);
        attackerBoardState.canMoveAtTurn = currentTurn + MOVE_TURN_DURATION + getCooldownForSpeed(attackerStats.speed);
        attackerBoardState.canBeAttackedAtTurn = currentTurn + MOVE_TURN_DURATION + 2;
        attackerBoardState.canAttackAtTurn = currentTurn + MOVE_TURN_DURATION + 2;
        return boardSlice.boardReducer(boardSlice.boardReducer(board, boardSlice.commands.moveBoardPieceCommand({ pieceId: pieceId, from: attackerPosition, to: nextPosition })), boardSlice.commands.updateBoardPiecesCommand([attacker]));
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
    var attackerStats = getStats(attacker);
    var defenderStats = getStats(defender);
    var attackBonus = getAttackBonus(attacker.definition.type, defender.definition.type);
    return (attackerStats.attack / defenderStats.defense) * attackBonus * 8; // todo tweak this
};


/***/ }),

/***/ "../battle/lib/utils/findTargetId.js":
/*!*******************************************!*\
  !*** ../battle/lib/utils/findTargetId.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.findTargetId = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
var getLivingEnemies = function (piece, board) {
    return board_1.BoardSelectors.getAllPieces(board).filter(function (other) { return other.ownerId !== piece.ownerId && other.currentHealth > 0; });
};
exports.findTargetId = function (piece, board) {
    var enemies = getLivingEnemies(piece, board);
    if (enemies.length === 0) {
        return null;
    }
    var attackerPosition = board_1.BoardSelectors.getPiecePosition(board, piece.id);
    var enemyDeltas = enemies.map(function (enemy) {
        var enemyPosition = board_1.BoardSelectors.getPiecePosition(board, enemy.id);
        if (!enemyPosition) {
            return null;
        }
        return {
            enemy: enemy,
            delta: models_1.getDelta(attackerPosition, enemyPosition)
        };
    }).filter(function (x) { return x !== null; });
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

/***/ "../battle/lib/utils/get-type-attack-bonus.js":
/*!****************************************************!*\
  !*** ../battle/lib/utils/get-type-attack-bonus.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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
    // an attack is strong against the element it overcomes, and weak against things that overcome the attacker
    var defenderInteractions = exports.typeInteractions[defenceType];
    if (defenderInteractions.overcomeBy === attackType) {
        return 1.4;
    }
    var attackerInteractions = exports.typeInteractions[defenceType];
    if (attackerInteractions.overcomeBy === defenceType) {
        return 0.7;
    }
    return 1;
};


/***/ }),

/***/ "../battle/lib/utils/getTargetAttackPositions.js":
/*!*******************************************************!*\
  !*** ../battle/lib/utils/getTargetAttackPositions.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.getTargetAttackPositions = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var isInsideGrid = function (_a) {
    var width = _a.width, height = _a.height;
    return function (position) {
        var x = position.x, y = position.y;
        return x >= 0 && y >= 0 && x < width && y < height;
    };
};
exports.getTargetAttackPositions = function (board, _a, range) {
    var positionX = _a.x, positionY = _a.y;
    if (range === void 0) { range = 1; }
    var positions = [];
    for (var x = positionX - range; x <= positionX + range; x++) {
        if (x === positionX) {
            continue;
        }
        positions.push(models_1.createTileCoordinates(x, positionY));
    }
    for (var y = positionY - range; y <= positionY + range; y++) {
        if (y === positionY) {
            continue;
        }
        positions.push(models_1.createTileCoordinates(positionX, y));
    }
    // filter out any that are outside the grid
    return positions.filter(isInsideGrid(board.size));
};


/***/ }),

/***/ "../battle/lib/utils/inAttackRange.js":
/*!********************************************!*\
  !*** ../battle/lib/utils/inAttackRange.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.inAttackRange = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
exports.inAttackRange = function (attacker, target, attackType) {
    var _a = models_1.getDelta(attacker, target), deltaX = _a.x, deltaY = _a.y;
    // Pieces cannot attack diagonally
    var result = (Math.min(deltaX, deltaY) === 0 && Math.max(deltaX, deltaY) <= attackType.range);
    return result;
};


/***/ }),

/***/ "../battle/lib/utils/is-a-team-defeated.js":
/*!*************************************************!*\
  !*** ../battle/lib/utils/is-a-team-defeated.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.isATeamDefeated = void 0;
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
exports.isATeamDefeated = function (board) {
    var pieceOwnerIds = board_1.BoardSelectors.getAllPieces(board).map(function (p) { return p.ownerId; });
    // if there are only pieces belonging to 1 player, then we have a winner
    return (new Set(pieceOwnerIds).size === 1);
};


/***/ }),

/***/ "../board/lib/index.js":
/*!*****************************!*\
  !*** ../board/lib/index.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var state_1 = __webpack_require__(/*! ./state */ "../board/lib/state.js");
__createBinding(exports, state_1, "createBoardSlice");
exports.BoardSelectors = __webpack_require__(/*! ./selectors */ "../board/lib/selectors.js");
var mergeBoards_1 = __webpack_require__(/*! ./utils/mergeBoards */ "../board/lib/utils/mergeBoards.js");
__createBinding(exports, mergeBoards_1, "mergeBoards");
var rotateGridPosition_1 = __webpack_require__(/*! ./utils/rotateGridPosition */ "../board/lib/utils/rotateGridPosition.js");
__createBinding(exports, rotateGridPosition_1, "rotatePiecesAboutCenter");
var positionSort_1 = __webpack_require__(/*! ./positionSort */ "../board/lib/positionSort.js");
__createBinding(exports, positionSort_1, "topToBottomMiddleSortPositions");
__createBinding(exports, positionSort_1, "topLeftToBottomRightSortPositions");


/***/ }),

/***/ "../board/lib/positionSort.js":
/*!************************************!*\
  !*** ../board/lib/positionSort.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.topLeftToBottomRightSortPositions = exports.topToBottomMiddleSortPositions = void 0;
var SORT_A_FIRST = -1;
var SORT_A_SECOND = 1;
exports.topToBottomMiddleSortPositions = function (a, b) {
    if (a.y < b.y) {
        return SORT_A_FIRST;
    }
    if (a.y > b.y) {
        return SORT_A_SECOND;
    }
    // todo tie this into board size
    var distanceFromMiddleA = Math.abs(a.x - 3);
    var distanceFromMiddleB = Math.abs(b.x - 3);
    if (distanceFromMiddleA < distanceFromMiddleB) {
        return SORT_A_FIRST;
    }
    if (distanceFromMiddleA > distanceFromMiddleB) {
        return SORT_A_SECOND;
    }
    return SORT_A_FIRST;
};
exports.topLeftToBottomRightSortPositions = function (a, b) {
    if (a.y < b.y) {
        return SORT_A_FIRST;
    }
    if (a.y > b.y) {
        return SORT_A_SECOND;
    }
    if (a.x < b.x) {
        return SORT_A_FIRST;
    }
    if (a.x > b.x) {
        return SORT_A_SECOND;
    }
    return SORT_A_FIRST;
};


/***/ }),

/***/ "../board/lib/selectors.js":
/*!*********************************!*\
  !*** ../board/lib/selectors.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.getFirstEmptySlot = exports.getPieceForPosition = exports.isBelowPieceLimit = exports.getPiece = exports.getAllPieces = exports.getPiecePosition = void 0;
var positionSort_1 = __webpack_require__(/*! ./positionSort */ "../board/lib/positionSort.js");
// todo add a position-for-id lookup to the board state to improve this
exports.getPiecePosition = function (state, pieceId) {
    var entry = Object.entries(state.piecePositions)
        .find(function (_a) {
        var _b = __read(_a, 2), _ = _b[0], id = _b[1];
        return id === pieceId;
    });
    if (!entry) {
        return null;
    }
    var _a = __read(entry[0].split(",")
        .map(function (val) { return parseInt(val, 10); }), 2), x = _a[0], y = _a[1];
    return { x: x, y: y };
};
exports.getAllPieces = function (state) { return Object.values(state.pieces); };
exports.getPiece = function (state, pieceId) { return state.pieces[pieceId] || null; };
exports.isBelowPieceLimit = function (state) { return exports.getAllPieces(state).length < state.pieceLimit; };
exports.getPieceForPosition = function (state, x, y) {
    return state.pieces[state.piecePositions[x + "," + y]] || null;
};
exports.getFirstEmptySlot = function (state, sortPositions) {
    if (sortPositions === void 0) { sortPositions = positionSort_1.topToBottomMiddleSortPositions; }
    var emptyPositions = [];
    for (var y = 0; y < state.size.height; y++) {
        for (var x = 0; x < state.size.width; x++) {
            var boardPiece = exports.getPieceForPosition(state, x, y);
            if (!boardPiece) {
                emptyPositions.push({ x: x, y: y });
            }
        }
    }
    if (emptyPositions.length === 0) {
        return null;
    }
    emptyPositions.sort(sortPositions);
    var position = emptyPositions[0];
    return {
        x: position.x,
        y: position.y
    };
};


/***/ }),

/***/ "../board/lib/state.js":
/*!*****************************!*\
  !*** ../board/lib/state.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.createBoardSlice = void 0;
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "../board/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var filter_1 = __webpack_require__(/*! ./utils/filter */ "../board/lib/utils/filter.js");
var createInitialState = function (id, size) {
    if (size === void 0) { size = {
        width: 7,
        height: 3
    }; }
    return ({
        id: id,
        pieces: {},
        piecePositions: {},
        locked: false,
        pieceLimit: null,
        size: size
    });
};
exports.createBoardSlice = function (id, size) {
    var _a = toolkit_1.createSlice({
        name: "board-" + id,
        initialState: createInitialState(id, size),
        reducers: {
            setBoardSizeCommand: function (state, _a) {
                var _b = _a.payload, width = _b.width, height = _b.height;
                var differenceWidth = width - state.size.width;
                var differenceHeight = height - state.size.height;
                return __assign(__assign({}, state), { size: { width: width, height: height }, piecePositions: Object.entries(state.piecePositions).reduce(function (newPiecePositions, _a) {
                        var _b;
                        var _c = __read(_a, 2), position = _c[0], pieceId = _c[1];
                        var _d = __read(position.split(",").map(function (val) { return parseInt(val, 10); }), 2), x = _d[0], y = _d[1];
                        var newX = x + differenceWidth;
                        var newY = y + differenceHeight;
                        return __assign(__assign({}, newPiecePositions), (_b = {}, _b[newX + "," + newY] = pieceId, _b));
                    }, {}) });
            },
            lockBoardCommand: function (state) { return (__assign(__assign({}, state), { locked: true })); },
            unlockBoardCommand: function (state) { return (__assign(__assign({}, state), { locked: false })); },
            setPieceLimitCommand: function (state, _a) {
                var limit = _a.payload;
                return (__assign(__assign({}, state), { pieceLimit: limit }));
            },
            setBoardPiecesCommand: function (state, _a) {
                var _b = _a.payload, pieces = _b.pieces, piecePositions = _b.piecePositions, newSize = _b.size;
                return (__assign(__assign(__assign({}, state), { pieces: __assign({}, pieces), piecePositions: __assign({}, piecePositions) }), (newSize ? { size: { width: newSize.width, height: newSize.height } } : {})));
            },
            addBoardPieceCommand: function (state, _a) {
                var _b, _c;
                var _d = _a.payload, x = _d.x, y = _d.y, piece = _d.piece;
                return __assign(__assign({}, state), { pieces: __assign(__assign({}, state.pieces), (_b = {}, _b[piece.id] = piece, _b)), piecePositions: __assign(__assign({}, state.piecePositions), (_c = {}, _c[x + "," + y] = piece.id, _c)) });
            },
            moveBoardPieceCommand: function (state, _a) {
                var _b;
                var _c = _a.payload, pieceId = _c.pieceId, from = _c.from, to = _c.to;
                var piece = state.pieces[pieceId];
                var fromString = from.x + "," + from.y;
                var pieceAtFrom = state.piecePositions[fromString];
                // safety catch
                if (!piece || piece.id !== pieceId || piece.id !== pieceAtFrom) {
                    return state;
                }
                var toString = to.x + "," + to.y;
                var newState = __assign(__assign({}, state), { piecePositions: __assign(__assign({}, state.piecePositions), (_b = {}, _b[toString] = pieceId, _b)) });
                delete newState.piecePositions[fromString];
                return newState;
            },
            removeBoardPiecesCommand: function (state, _a) {
                var pieceIds = _a.payload;
                return __assign(__assign({}, state), { pieces: filter_1.getPiecesWithoutIds(state.pieces, pieceIds), piecePositions: filter_1.getPiecePositionsWithoutIds(state.piecePositions, pieceIds) });
            },
            updateBoardPiecesCommand: function (state, _a) {
                var e_1, _b;
                var pieces = _a.payload;
                var newPieces = __assign({}, state.pieces);
                try {
                    for (var pieces_1 = __values(pieces), pieces_1_1 = pieces_1.next(); !pieces_1_1.done; pieces_1_1 = pieces_1.next()) {
                        var piece = pieces_1_1.value;
                        newPieces[piece.id] = piece;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (pieces_1_1 && !pieces_1_1.done && (_b = pieces_1["return"])) _b.call(pieces_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return __assign(__assign({}, state), { pieces: newPieces });
            }
        }
    }), reducer = _a.reducer, _b = _a.actions, setBoardSizeCommand = _b.setBoardSizeCommand, lockBoardCommand = _b.lockBoardCommand, unlockBoardCommand = _b.unlockBoardCommand, setPieceLimitCommand = _b.setPieceLimitCommand, setBoardPiecesCommand = _b.setBoardPiecesCommand, addBoardPieceCommand = _b.addBoardPieceCommand, moveBoardPieceCommand = _b.moveBoardPieceCommand, removeBoardPiecesCommand = _b.removeBoardPiecesCommand, updateBoardPiecesCommand = _b.updateBoardPiecesCommand;
    return {
        boardReducer: reducer,
        commands: {
            setBoardSizeCommand: setBoardSizeCommand,
            lockBoardCommand: lockBoardCommand,
            unlockBoardCommand: unlockBoardCommand,
            setPieceLimitCommand: setPieceLimitCommand,
            setBoardPiecesCommand: setBoardPiecesCommand,
            addBoardPieceCommand: addBoardPieceCommand,
            moveBoardPieceCommand: moveBoardPieceCommand,
            removeBoardPiecesCommand: removeBoardPiecesCommand,
            updateBoardPiecesCommand: updateBoardPiecesCommand
        }
    };
};


/***/ }),

/***/ "../board/lib/utils/filter.js":
/*!************************************!*\
  !*** ../board/lib/utils/filter.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports) {

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
exports.__esModule = true;
exports.getPiecePositionsWithoutIds = exports.getPiecesWithoutIds = void 0;
exports.getPiecesWithoutIds = function (pieces, ids) {
    var e_1, _a;
    var newPieces = __assign({}, pieces);
    try {
        for (var ids_1 = __values(ids), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
            var pieceId = ids_1_1.value;
            if (newPieces[pieceId]) {
                delete newPieces[pieceId];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (ids_1_1 && !ids_1_1.done && (_a = ids_1["return"])) _a.call(ids_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return newPieces;
};
exports.getPiecePositionsWithoutIds = function (piecePositions, ids) {
    return Object.entries(piecePositions).reduce(function (newPiecePositions, _a) {
        var _b = __read(_a, 2), position = _b[0], pieceId = _b[1];
        // skip the desired piece
        if (!pieceId || ids.includes(pieceId)) {
            return newPiecePositions;
        }
        newPiecePositions[position] = pieceId;
        return newPiecePositions;
    }, {});
};


/***/ }),

/***/ "../board/lib/utils/mergeBoards.js":
/*!*****************************************!*\
  !*** ../board/lib/utils/mergeBoards.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var rotateGridPosition_1 = __webpack_require__(/*! ./rotateGridPosition */ "../board/lib/utils/rotateGridPosition.js");
var expandBoard = function (board, _a) {
    var width = _a.width, height = _a.height;
    var differenceWidth = width - board.size.width;
    var differenceHeight = height - board.size.height;
    return __assign(__assign({}, board), { size: { width: width, height: height }, piecePositions: Object.entries(board.piecePositions).reduce(function (newPiecePositions, _a) {
            var _b;
            var _c = __read(_a, 2), position = _c[0], pieceId = _c[1];
            var _d = __read(position.split(",").map(function (val) { return parseInt(val, 10); }), 2), x = _d[0], y = _d[1];
            var newX = x + differenceWidth;
            var newY = y + differenceHeight;
            return __assign(__assign({}, newPiecePositions), (_b = {}, _b[newX + "," + newY] = pieceId, _b));
        }, {}) });
};
exports.mergeBoards = function (id, home, away) {
    if (home.size.width !== away.size.width || home.size.height !== away.size.height) {
        throw Error("Trying to merge odd-sized boards");
    }
    var newSize = {
        width: home.size.width,
        height: home.size.height * 2
    };
    var expandedHome = expandBoard(home, newSize);
    var expandedAway = expandBoard(away, newSize);
    var rotatedAway = rotateGridPosition_1.rotatePiecesAboutCenter(expandedAway);
    return {
        id: id,
        pieces: __assign(__assign({}, expandedHome.pieces), rotatedAway.pieces),
        piecePositions: __assign(__assign({}, expandedHome.piecePositions), rotatedAway.piecePositions),
        locked: true,
        pieceLimit: null,
        size: newSize
    };
};


/***/ }),

/***/ "../board/lib/utils/rotateGridPosition.js":
/*!************************************************!*\
  !*** ../board/lib/utils/rotateGridPosition.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.__esModule = true;
exports.rotatePiecesAboutCenter = exports.rotateGridPosition = void 0;
var selectors_1 = __webpack_require__(/*! ../selectors */ "../board/lib/selectors.js");
exports.rotateGridPosition = function (gridSize, position) {
    return {
        x: gridSize.width - 1 - position.x,
        y: gridSize.height - 1 - position.y
    };
};
exports.rotatePiecesAboutCenter = function (state) {
    var e_1, _a;
    var newPositions = [];
    try {
        for (var _b = __values(Object.entries(state.pieces)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 1), pieceId = _d[0];
            var position = selectors_1.getPiecePosition(state, pieceId);
            var newPosition = exports.rotateGridPosition(state.size, position);
            var newPositionKey = newPosition.x + "," + newPosition.y;
            newPositions.push({ pieceId: pieceId, position: newPositionKey });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return __assign(__assign({}, state), { piecePositions: newPositions.reduce(function (acc, _a) {
            var _b;
            var pieceId = _a.pieceId, position = _a.position;
            return (__assign(__assign({}, acc), (_b = {}, _b[position] = pieceId, _b)));
        }, {}) });
};


/***/ }),

/***/ "../gamemode/lib/config/config.live.js":
/*!*********************************************!*\
  !*** ../gamemode/lib/config/config.live.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.config = void 0;
exports.config = {
    auth0: {
        domain: "creaturechess.eu.auth0.com",
        spaClientId: "HNUYYyRCtFJsA3xKGp964Kgy4jwx8bW1",
        machineToMachineClientId: "gWNTtsTNepgyyqE7QAEC4e7nt5A3ZZ4k"
    },
    appUrl: "https://creaturechess.jamesmonger.com",
    serverUrl: "https://cc-server.jamesmonger.com",
    serverInfoUrl: "https://cc-server-info.herokuapp.com"
};


/***/ }),

/***/ "../gamemode/lib/config/config.local.js":
/*!**********************************************!*\
  !*** ../gamemode/lib/config/config.local.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.config = void 0;
exports.config = {
    auth0: {
        domain: "creaturechess.eu.auth0.com",
        spaClientId: "HNUYYyRCtFJsA3xKGp964Kgy4jwx8bW1",
        machineToMachineClientId: "gWNTtsTNepgyyqE7QAEC4e7nt5A3ZZ4k"
    },
    appUrl: "https://creaturechess.local-dev.com:8090",
    serverUrl: "ws://localhost:3000",
    serverInfoUrl: "http://localhost:3001"
};


/***/ }),

/***/ "../gamemode/lib/config/index.js":
/*!***************************************!*\
  !*** ../gamemode/lib/config/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.config = void 0;
var config_live_1 = __webpack_require__(/*! ./config.live */ "../gamemode/lib/config/config.live.js");
var config_local_1 = __webpack_require__(/*! ./config.local */ "../gamemode/lib/config/config.local.js");
exports.config =  false ? 0 : config_live_1.config;


/***/ }),

/***/ "../gamemode/lib/definitions/definitionClass.js":
/*!******************************************************!*\
  !*** ../gamemode/lib/definitions/definitionClass.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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

/***/ "../gamemode/lib/definitions/index.js":
/*!********************************************!*\
  !*** ../gamemode/lib/definitions/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.getAllDefinitions = exports.getDefinitionById = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var definitionClass_1 = __webpack_require__(/*! ./definitionClass */ "../gamemode/lib/definitions/definitionClass.js");
var createDefinition = function (id, name, type, definitionClass, cost) { return ({
    id: id,
    name: name,
    type: type,
    "class": definitionClass,
    cost: cost,
    stages: definitionClass_1.getStages(definitionClass, cost)
}); };
var definitionsArray = [
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
    createDefinition(12, "Weavifly", models_1.CreatureType.Metal, models_1.DefinitionClass.ARCANE, 1),
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
    createDefinition(32, "Cairfrey", models_1.CreatureType.Metal, models_1.DefinitionClass.ARCANE, 3),
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
    createDefinition(46, "Eaglace", models_1.CreatureType.Water, models_1.DefinitionClass.CUNNING, 5),
    createDefinition(47, "Kirkanon", models_1.CreatureType.Metal, models_1.DefinitionClass.ARCANE, 5)
];
var definitionMap = new Map();
definitionsArray.forEach(function (d) {
    definitionMap.set(d.id, d);
});
exports.getDefinitionById = function (id) { return definitionMap.get(id); };
exports.getAllDefinitions = function () { return __spread(definitionsArray); };


/***/ }),

/***/ "../gamemode/lib/game.js":
/*!*******************************!*\
  !*** ../gamemode/lib/game.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.Game = void 0;
var uuid_1 = __webpack_require__(/*! uuid */ "../gamemode/node_modules/uuid/dist/esm-browser/index.js");
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var opponentProvider_1 = __webpack_require__(/*! ./game/opponentProvider */ "../gamemode/lib/game/opponentProvider.js");
var playerList_1 = __webpack_require__(/*! ./game/playerList */ "../gamemode/lib/game/playerList.js");
var cardDeck_1 = __webpack_require__(/*! ./game/cardDeck */ "../gamemode/lib/game/cardDeck.js");
var events_2 = __webpack_require__(/*! ./game/events */ "../gamemode/lib/game/events.js");
var store_1 = __webpack_require__(/*! ./game/store */ "../gamemode/lib/game/store.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var roundInfo_1 = __webpack_require__(/*! ./game/roundInfo */ "../gamemode/lib/game/roundInfo/index.js");
var gameLoop_1 = __webpack_require__(/*! ./game/gameLoop */ "../gamemode/lib/game/gameLoop/index.js");
var startStopwatch = function () { return process.hrtime(); };
var stopwatch = function (start) {
    var end = process.hrtime(start);
    return Math.round((end[0] * 1000) + (end[1] / 1000000));
};
var finishGameEventKey = "FINISH_GAME";
var Game = /** @class */ (function () {
    function Game(createLogger, players, options) {
        var _this = this;
        this.lastLivingPlayerCount = 0;
        this.opponentProvider = new opponentProvider_1.HeadToHeadOpponentProvider();
        this.playerList = new playerList_1.PlayerList();
        this.players = [];
        this.events = new events_1.EventEmitter();
        this.sendPublicEventsSagaFactory = function () {
            var broadcast = function (event) {
                _this.dispatchPublicGameEvent(event);
            };
            return function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, effects_1.takeLatest(roundInfo_1.RoundInfoCommands.setRoundInfoCommand.toString(), function (_a) {
                                var payload = _a.payload;
                                return __generator(this, function (_b) {
                                    broadcast(events_2.gamePhaseStartedEvent(payload));
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
        this.gameSagaFactory = function (players) {
            var sagaDependencies = {
                options: _this.options,
                getMatchups: function () {
                    _this.updateOpponentProvider();
                    return _this.opponentProvider.getMatchups();
                },
                players: {
                    getAll: function () { return _this.players; },
                    getLiving: _this.getLivingPlayers,
                    getById: function (id) { return _this.players.find(function (p) { return p.id === id; }) || null; }
                },
                logger: _this.logger
            };
            return function () {
                var startTime, winnerId, duration, round;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startTime = startStopwatch();
                            sagaDependencies.logger.info("Game started with " + players.length + " players: " + players.map(function (p) { return p.name; }).join(", "));
                            return [4 /*yield*/, effects_1.call(gameLoop_1.gameLoopSaga, sagaDependencies)];
                        case 1:
                            winnerId = (_a.sent()).winnerId;
                            duration = stopwatch(startTime);
                            return [4 /*yield*/, effects_1.select(function (state) { return state.roundInfo.round; })];
                        case 2:
                            round = _a.sent();
                            sagaDependencies.logger.info("Match complete in " + (duration) + " ms (" + round + " rounds)");
                            return [4 /*yield*/, effects_1.put(events_2.gameFinishEvent({ winnerId: winnerId }))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            };
        };
        this.gameTeardownSagaFactory = function () {
            var broadcast = function (event) {
                _this.dispatchPublicGameEvent(event);
                _this.events.emit(finishGameEventKey, event.payload.winnerId);
            };
            var teardown = function () {
                _this.opponentProvider = null;
                _this.deck = null;
                _this.playerList.deconstructor();
                _this.playerList = null;
                _this.events.removeAllListeners();
                _this.events = null;
            };
            return function () {
                var event;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, effects_1.take(events_2.gameFinishEvent.toString())];
                        case 1:
                            event = _a.sent();
                            broadcast(event);
                            teardown();
                            return [2 /*return*/];
                    }
                });
            };
        };
        this.addPlayer = function (player) {
            player.setLogger(_this.logger);
            _this.players.push(player);
            _this.playerList.addPlayer(player);
            player.setDeck(_this.deck);
            player.setGetRoundInfoState(function () { return _this.store.getState().roundInfo; });
            player.setGetPlayerListPlayers(_this.playerList.getValue);
        };
        this.getLivingPlayers = function () { return _this.players.filter(function (p) { return p.getStatus() !== models_1.PlayerStatus.QUIT && p.isAlive(); }); };
        this.id = uuid_1.v4();
        var _a = store_1.createGameStore(), store = _a.store, sagaMiddleware = _a.sagaMiddleware;
        this.store = store;
        this.options = models_1.getOptions(options);
        this.logger = createLogger(this.id);
        this.deck = new cardDeck_1.CardDeck(this.logger);
        players.forEach(this.addPlayer);
        this.updateOpponentProvider();
        this.playerList.onUpdate(function (players) {
            _this.dispatchPublicGameEvent(events_2.playerListChangedEvent({ players: players }));
        });
        sagaMiddleware.run(this.sendPublicEventsSagaFactory());
        sagaMiddleware.run(this.gameSagaFactory(players));
        sagaMiddleware.run(this.gameTeardownSagaFactory());
    }
    Game.prototype.onFinish = function (fn) {
        this.events.on(finishGameEventKey, fn);
    };
    Game.prototype.getPlayerById = function (playerId) {
        return this.players.find(function (p) { return p.getStatus() !== models_1.PlayerStatus.QUIT && p.id === playerId; });
    };
    Game.prototype.dispatchPublicGameEvent = function (event) {
        this.players.filter(function (p) { return p.getStatus() === models_1.PlayerStatus.CONNECTED; })
            .forEach(function (p) { return p.receiveGameEvent(event); });
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


/***/ }),

/***/ "../gamemode/lib/game/cardDeck.js":
/*!****************************************!*\
  !*** ../gamemode/lib/game/cardDeck.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.CardDeck = void 0;
var uuid_1 = __webpack_require__(/*! uuid */ "../gamemode/node_modules/uuid/dist/esm-browser/index.js");
var shuffle = __webpack_require__(/*! lodash.shuffle */ "../gamemode/node_modules/lodash.shuffle/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var definitions_1 = __webpack_require__(/*! ../definitions */ "../gamemode/lib/definitions/index.js");
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
var BLESSED_HAND_CHANCE = [0, 0.1, 0.2, 0.15, 0.15, 0.23, 0.23, 0.1, 0.1, 0.1];
var isHandBlessed = function (level) { return (Math.floor(Math.random() * 100) * 0.01) <= BLESSED_HAND_CHANCE[level - 1]; };
var CardDeck = /** @class */ (function () {
    function CardDeck(logger) {
        var _this = this;
        this.logger = logger;
        this.deck = [
            [], [], [], [], []
        ];
        definitions_1.getAllDefinitions().filter(function (d) { return d.cost; }).forEach(function (d) {
            for (var count = 0; count < CARD_LEVEL_QUANTITIES[d.cost - 1]; count++) {
                _this.addDefinition(d);
            }
        });
        this.shuffle();
    }
    CardDeck.prototype.reroll = function (input, count, level, blessCandidates, excludeCards) {
        if (excludeCards === void 0) { excludeCards = []; }
        this.addCards(input);
        this.shuffle();
        return this.take(count, level, blessCandidates, excludeCards);
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
        var definition = definitions_1.getDefinitionById(piece.definitionId);
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
    CardDeck.prototype.take = function (count, level, blessCandidates, excludeCards) {
        if (excludeCards === void 0) { excludeCards = []; }
        var output = [];
        var blessedHand = isHandBlessed(level);
        if (blessedHand) {
            this.logger.info("Hand is blessed!");
        }
        for (var i = 0; i < count; i++) {
            var _a = this.takeCard(level, blessedHand, blessCandidates, excludeCards), card = _a.card, blessed = _a.blessed;
            output.push(card);
            // clear blessed if it was used
            if (blessed) {
                blessedHand = false;
            }
        }
        return output;
    };
    CardDeck.prototype.takeCard = function (level, isBlessed, blessCandidates, excludeDefinitions) {
        var e_3, _a;
        if (isBlessed && blessCandidates.length > 0) {
            var _loop_1 = function (candidate) {
                var definition = definitions_1.getDefinitionById(candidate);
                var deck = this_1.getDeckForCost(definition.cost);
                var index = deck.findIndex(function (c) { return c.definitionId === candidate; });
                if (!index) {
                    return "continue";
                }
                var _a = __read(deck.splice(index, 1), 1), card = _a[0];
                if (card.definitionId !== candidate) {
                    deck.push(card);
                    this_1.logger.warn("- Definition " + card.definitionId + " mismatch, pulled for bless candidate " + candidate);
                    return "continue";
                }
                this_1.logger.info("- Bless pulled " + definition.name + ", worth $" + definition.cost + "!");
                return { value: { card: card, blessed: true } };
            };
            var this_1 = this;
            try {
                for (var _b = __values(shuffle(blessCandidates)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var candidate = _c.value;
                    var state_1 = _loop_1(candidate);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.logger.warn("- No card pulled for bless");
        }
        // start at 5 and work downwards
        for (var cost = CARD_COST_CHANCES.length; cost >= 1; cost--) {
            var roll = canTakeCardAtCost(level, cost);
            if (!roll) {
                continue;
            }
            // try 3 times to get a non-excluded card
            // todo rethink this as below
            for (var i = 0; i < 3; i++) {
                var card = this.getDeckForCost(cost).pop();
                if (card) {
                    if (!excludeDefinitions.includes(card.definitionId)) {
                        return { card: card, blessed: false };
                    }
                    this.addCards([card]);
                }
            }
        }
        this.logger.warn("Falling back for second pass to find card");
        // otherwise go back up and give them the first existing card
        for (var cost = 1; cost <= CARD_COST_CHANCES.length; cost++) {
            // try 3 times to get a non-excluded card
            // todo rethink this as above
            for (var i = 0; i < 3; i++) {
                var card = this.getDeckForCost(cost).pop();
                if (card) {
                    if (!excludeDefinitions.includes(card.definitionId)) {
                        return { card: card, blessed: false };
                    }
                    this.addCards([card]);
                }
            }
        }
        this.logger.error("No card found at all");
        return null;
    };
    CardDeck.prototype.addDefinition = function (definition) {
        var card = {
            id: uuid_1.v4(),
            definitionId: definition.id,
            cost: definition.cost,
            name: definition.name,
            type: definition.type,
            "class": definition["class"]
        };
        this.getDeckForCost(definition.cost).push(card);
    };
    return CardDeck;
}());
exports.CardDeck = CardDeck;


/***/ }),

/***/ "../gamemode/lib/game/events.js":
/*!**************************************!*\
  !*** ../gamemode/lib/game/events.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.playerListChangedEvent = exports.gameFinishEvent = exports.gamePhaseStartedEvent = void 0;
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "../gamemode/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
exports.gamePhaseStartedEvent = toolkit_1.createAction("gamePhaseStartedEvent");
exports.gameFinishEvent = toolkit_1.createAction("gameFinishEvent");
exports.playerListChangedEvent = toolkit_1.createAction("playerListChangedEvent");


/***/ }),

/***/ "../gamemode/lib/game/gameLoop/index.js":
/*!**********************************************!*\
  !*** ../gamemode/lib/game/gameLoop/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.gameLoopSaga = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var phases_1 = __webpack_require__(/*! ./phases */ "../gamemode/lib/game/gameLoop/phases/index.js");
exports.gameLoopSaga = function (dependencies) {
    var winner;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (false) {}
                return [4 /*yield*/, effects_1.call(phases_1.runPreparingPhase, dependencies)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.call(phases_1.runReadyPhase, dependencies)];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.call(phases_1.runPlayingPhase, dependencies)];
            case 3:
                _a.sent();
                if (dependencies.players.getLiving().length < 2) {
                    return [3 /*break*/, 4];
                }
                return [3 /*break*/, 0];
            case 4:
                winner = dependencies.players.getLiving()[0];
                dependencies.logger.info("Game finished, won by " + winner.name);
                return [2 /*return*/, {
                        winnerId: winner.id
                    }];
        }
    });
};


/***/ }),

/***/ "../gamemode/lib/game/gameLoop/phases/index.js":
/*!*****************************************************!*\
  !*** ../gamemode/lib/game/gameLoop/phases/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var playing_1 = __webpack_require__(/*! ./playing */ "../gamemode/lib/game/gameLoop/phases/playing.js");
__createBinding(exports, playing_1, "runPlayingPhase");
var preparing_1 = __webpack_require__(/*! ./preparing */ "../gamemode/lib/game/gameLoop/phases/preparing.js");
__createBinding(exports, preparing_1, "runPreparingPhase");
var ready_1 = __webpack_require__(/*! ./ready */ "../gamemode/lib/game/gameLoop/phases/ready.js");
__createBinding(exports, ready_1, "runReadyPhase");


/***/ }),

/***/ "../gamemode/lib/game/gameLoop/phases/playing.js":
/*!*******************************************************!*\
  !*** ../gamemode/lib/game/gameLoop/phases/playing.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.runPlayingPhase = void 0;
var pDefer = __webpack_require__(/*! p-defer */ "../gamemode/node_modules/p-defer/index.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var delay_1 = __webpack_require__(/*! delay */ "../gamemode/node_modules/delay/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var roundInfo_1 = __webpack_require__(/*! ../../roundInfo */ "../gamemode/lib/game/roundInfo/index.js");
exports.runPlayingPhase = function (_a) {
    var battleTimeoutDeferred, phase, startedAt, promises, round, _b, _c, player;
    var e_1, _d;
    var options = _a.options, players = _a.players;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                battleTimeoutDeferred = pDefer();
                phase = models_1.GamePhase.PLAYING;
                delay_1["default"](options.phaseLengths[models_1.GamePhase.PLAYING] * 1000).then(function () { return battleTimeoutDeferred.resolve(); });
                startedAt = Date.now() / 1000;
                return [4 /*yield*/, effects_1.put(roundInfo_1.RoundInfoCommands.setRoundInfoCommand({ phase: phase, startedAt: startedAt }))];
            case 1:
                _e.sent();
                promises = players.getLiving().map(function (p) { return p.fightMatch(startedAt, battleTimeoutDeferred); });
                return [4 /*yield*/, Promise.all(promises)];
            case 2:
                _e.sent();
                return [4 /*yield*/, effects_1.select(function (state) { return state.roundInfo.round; })];
            case 3:
                round = _e.sent();
                try {
                    for (_b = __values(players.getAll().filter(function (p) { return p.getStatus() !== models_1.PlayerStatus.QUIT && p.getRoundDiedAt() === round; })), _c = _b.next(); !_c.done; _c = _b.next()) {
                        player = _c.value;
                        player.kill();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_d = _b["return"])) _d.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                // some battles go right up to the end, so it's nice to have a delay
                // rather than jumping straight into the next phase
                return [4 /*yield*/, delay_1["default"](5000)];
            case 4:
                // some battles go right up to the end, so it's nice to have a delay
                // rather than jumping straight into the next phase
                _e.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "../gamemode/lib/game/gameLoop/phases/preparing.js":
/*!*********************************************************!*\
  !*** ../gamemode/lib/game/gameLoop/phases/preparing.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.runPreparingPhase = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var roundInfo_1 = __webpack_require__(/*! ../../roundInfo */ "../gamemode/lib/game/roundInfo/index.js");
var readyNotifier_1 = __webpack_require__(/*! ../../readyNotifier */ "../gamemode/lib/game/readyNotifier/index.js");
exports.runPreparingPhase = function (_a) {
    var round, phase, startedAt, notifier;
    var options = _a.options, players = _a.players;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, effects_1.select(function (state) { return state.roundInfo.round; })];
            case 1:
                round = _b.sent();
                phase = models_1.GamePhase.PREPARING;
                startedAt = Date.now() / 1000;
                return [4 /*yield*/, effects_1.put(roundInfo_1.RoundInfoCommands.setRoundInfoCommand({ phase: phase, startedAt: startedAt, round: round + 1 }))];
            case 2:
                _b.sent();
                players.getLiving().forEach(function (p) { return p.enterPreparingPhase(); });
                notifier = readyNotifier_1.readyNotifier(players.getLiving());
                return [4 /*yield*/, effects_1.race([
                        notifier.promise,
                        effects_1.delay(options.phaseLengths[models_1.GamePhase.PREPARING] * 1000)
                    ])];
            case 3:
                _b.sent();
                notifier.dispose();
                players.getLiving().forEach(function (p) { return p.fillBoard(); });
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "../gamemode/lib/game/gameLoop/phases/ready.js":
/*!*****************************************************!*\
  !*** ../gamemode/lib/game/gameLoop/phases/ready.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.runReadyPhase = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var roundInfo_1 = __webpack_require__(/*! ../../roundInfo */ "../gamemode/lib/game/roundInfo/index.js");
var match_1 = __webpack_require__(/*! ../../match */ "../gamemode/lib/game/match.js");
exports.runReadyPhase = function (_a) {
    var matchups, phase, startedAt;
    var getMatchups = _a.getMatchups, options = _a.options, players = _a.players;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                matchups = getMatchups();
                matchups.forEach(function (_a) {
                    var homeId = _a.homeId, awayId = _a.awayId, awayIsClone = _a.awayIsClone;
                    var homePlayer = players.getById(homeId);
                    var awayPlayer = players.getById(awayId);
                    var match = new match_1.Match(homePlayer, awayPlayer, options);
                    homePlayer.enterReadyPhase(match);
                    if (!awayIsClone) {
                        awayPlayer.enterReadyPhase(match);
                    }
                });
                phase = models_1.GamePhase.READY;
                startedAt = Date.now() / 1000;
                return [4 /*yield*/, effects_1.put(roundInfo_1.RoundInfoCommands.setRoundInfoCommand({ phase: phase, startedAt: startedAt }))];
            case 1:
                _b.sent();
                return [4 /*yield*/, effects_1.delay(options.phaseLengths[models_1.GamePhase.READY] * 1000)];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "../gamemode/lib/game/match.js":
/*!*************************************!*\
  !*** ../gamemode/lib/game/match.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.Match = void 0;
var pDefer = __webpack_require__(/*! p-defer */ "../gamemode/node_modules/p-defer/index.js");
var uuid_1 = __webpack_require__(/*! uuid */ "../gamemode/node_modules/uuid/dist/esm-browser/index.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "../gamemode/node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var redux_1 = __webpack_require__(/*! redux */ "../gamemode/node_modules/redux/es/redux.js");
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
var battle_1 = __webpack_require__(/*! @creature-chess/battle */ "../battle/lib/index.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var turnReducer = function (state, event) {
    if (state === void 0) { state = 0; }
    return (event.type === battle_1.BattleEvents.BATTLE_TURN_EVENT ? event.payload.turn : state);
};
var Match = /** @class */ (function () {
    function Match(home, away, gameOptions) {
        this.boardId = uuid_1.v4();
        this.board = board_1.createBoardSlice(this.boardId, models_1.GRID_SIZE);
        this.serverFinishedMatch = pDefer();
        this.clientFinishedMatch = pDefer();
        this.home = home;
        this.away = away;
        this.store = this.createStore(gameOptions);
        var mergedBoard = board_1.mergeBoards(this.boardId, home.getBoard(), away.getBoard());
        var board = __assign(__assign({}, mergedBoard), { pieces: Object.entries(mergedBoard.pieces).reduce(function (acc, _a) {
                var _b;
                var _c = __read(_a, 2), id = _c[0], piece = _c[1];
                return (__assign(__assign({}, acc), (_b = {}, _b[id] = __assign(__assign({}, piece), { facingAway: (piece.ownerId === home.id) }), _b)));
            }, {}) });
        this.store.dispatch(this.board.commands.setBoardPiecesCommand(board));
    }
    Match.prototype.onClientFinishMatch = function () {
        this.clientFinishedMatch.resolve();
    };
    Match.prototype.getBoardForPlayer = function (playerId) {
        var board = this.store.getState().board;
        // rotate the board for the away player, so that their pieces are shown on their own side
        if (playerId === this.away.id) {
            var rotatedBoard = board_1.rotatePiecesAboutCenter(board);
            // todo improve this
            var newState = __assign(__assign({}, rotatedBoard), { pieces: Object.entries(rotatedBoard.pieces).reduce(function (acc, _a) {
                    var _b;
                    var _c = __read(_a, 2), id = _c[0], piece = _c[1];
                    return (__assign(__assign({}, acc), (_b = {}, _b[id] = __assign(__assign({}, piece), { facingAway: !piece.facingAway }), _b)));
                }, {}) });
            return newState;
        }
        return board;
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
                        this.store.dispatch(battle_1.startBattle());
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
                        return [4 /*yield*/, effects_1.fork(battle_1.battleSagaFactory(function (state) { return state.board; }), gameOptions, _this.board)];
                    case 1:
                        _b = [
                            _c.sent()
                        ];
                        return [4 /*yield*/, effects_1.takeEvery(battle_1.BattleEvents.BATTLE_FINISH_EVENT, function () {
                                return __generator(this, function (_a) {
                                    _this.onServerFinishMatch();
                                    return [2 /*return*/];
                                });
                            })];
                    case 2:
                        _b = _b.concat([
                            _c.sent()
                        ]);
                        return [4 /*yield*/, effects_1.takeLatest(battle_1.BattleEvents.BATTLE_TURN_EVENT, function (_a) {
                                var board = _a.payload.board;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, effects_1.put(_this.board.commands.setBoardPiecesCommand({
                                                pieces: board.pieces,
                                                piecePositions: board.piecePositions,
                                                size: undefined // todo improve this
                                            }))];
                                        case 1:
                                            _b.sent();
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
        var sagaMiddleware = redux_saga_1["default"]();
        var store = redux_1.createStore(redux_1.combineReducers({
            board: this.board.boardReducer,
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

/***/ "../gamemode/lib/game/opponentProvider.js":
/*!************************************************!*\
  !*** ../gamemode/lib/game/opponentProvider.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.HeadToHeadOpponentProvider = void 0;
var shuffle = __webpack_require__(/*! lodash.shuffle */ "../gamemode/node_modules/lodash.shuffle/index.js");
var randomFromArray = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};
var HeadToHeadOpponentProvider = /** @class */ (function () {
    function HeadToHeadOpponentProvider() {
        this.remainingRotations = null;
        this.lastOddMatchupHomeId = null;
        this.lastOddMatchupAwayId = null;
    }
    HeadToHeadOpponentProvider.prototype.setPlayers = function (players) {
        this.playerIds = players.map(function (p) { return p.id; });
        this.remainingRotations = null;
    };
    HeadToHeadOpponentProvider.prototype.getMatchups = function () {
        if (this.remainingRotations === null || this.remainingRotations.length === 0) {
            this.generateRotations();
        }
        var isEven = this.playerIds.length % 2 === 0;
        var output = isEven ? this.getMatchupsEven(this.playerIds) : this.getMatchupsOdd(this.playerIds);
        this.updateRotation();
        return output;
    };
    HeadToHeadOpponentProvider.prototype.getMatchupsEven = function (playerIds) {
        var matchups = [];
        var remainingPlayerIds = __spread(playerIds);
        var _loop_1 = function () {
            // increment rotation by 1 if it would pick player 0
            var rotation = this_1.rotation % remainingPlayerIds.length === 0
                ? this_1.rotation + 1
                : this_1.rotation;
            var playerA = remainingPlayerIds[0];
            var playerB = remainingPlayerIds[rotation % remainingPlayerIds.length];
            remainingPlayerIds = remainingPlayerIds.filter(function (id) { return id !== playerA && id !== playerB; });
            // dice roll
            var playerAIsHome = (Math.floor(Math.random() * Math.floor(2))) === 0;
            if (playerAIsHome) {
                matchups.push({ homeId: playerA, awayId: playerB, awayIsClone: false });
            }
            else {
                matchups.push({ homeId: playerB, awayId: playerA, awayIsClone: false });
            }
        };
        var this_1 = this;
        while (remainingPlayerIds.length > 0) {
            _loop_1();
        }
        return matchups;
    };
    HeadToHeadOpponentProvider.prototype.getMatchupsOdd = function (playerIds) {
        var cloneMatchup = this.getOddCloneMatchup(playerIds);
        var otherPlayers = playerIds.filter(function (id) { return id !== cloneMatchup.homeId; });
        return __spread([
            cloneMatchup
        ], this.getMatchupsEven(otherPlayers));
    };
    HeadToHeadOpponentProvider.prototype.getOddCloneMatchup = function (playerIds) {
        var _this = this;
        var potentialHomePlayers = playerIds.filter(function (id) { return id !== _this.lastOddMatchupHomeId || _this.lastOddMatchupHomeId === null; });
        var homeId = randomFromArray(potentialHomePlayers);
        var potentialAwayPlayers = playerIds.filter(function (id) { return id !== homeId && (id !== _this.lastOddMatchupAwayId || _this.lastOddMatchupAwayId === null); });
        var awayId = randomFromArray(potentialAwayPlayers);
        this.lastOddMatchupHomeId = homeId;
        this.lastOddMatchupAwayId = awayId;
        return {
            homeId: homeId,
            awayId: awayId,
            awayIsClone: true
        };
    };
    HeadToHeadOpponentProvider.prototype.generateRotations = function () {
        var rotations = [];
        // in head-to-head rotation,
        // a 3 player game will have rotations: [ 1, 2 ]
        for (var i = 1; i < this.playerIds.length; i++) {
            rotations.push(i);
        }
        this.remainingRotations = shuffle(rotations);
        this.updateRotation();
    };
    HeadToHeadOpponentProvider.prototype.updateRotation = function () {
        var chosen = randomFromArray(this.remainingRotations);
        this.remainingRotations = this.remainingRotations.filter(function (i) { return i !== chosen; });
        this.rotation = chosen;
    };
    return HeadToHeadOpponentProvider;
}());
exports.HeadToHeadOpponentProvider = HeadToHeadOpponentProvider;


/***/ }),

/***/ "../gamemode/lib/game/playerList.js":
/*!******************************************!*\
  !*** ../gamemode/lib/game/playerList.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.PlayerList = void 0;
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var debounce = function (func, wait) {
    var timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            func();
        }, wait);
    };
};
var PlayerListEvents;
(function (PlayerListEvents) {
    PlayerListEvents["UPDATE"] = "UPDATE";
})(PlayerListEvents || (PlayerListEvents = {}));
var sortPlayers = function (a, b) {
    var SORT_A_FIRST = -1;
    var SORT_A_SECOND = 1;
    if (a.sortValues.health > b.sortValues.health) {
        return SORT_A_FIRST;
    }
    if (a.sortValues.health < b.sortValues.health) {
        return SORT_A_SECOND;
    }
    if (!a.sortValues.hasQuit && b.sortValues.hasQuit) {
        return SORT_A_FIRST;
    }
    if (a.sortValues.hasQuit && !b.sortValues.hasQuit) {
        return SORT_A_SECOND;
    }
    // if A is coming from a higher position than B, it should come first
    if (a.position < b.position) {
        return SORT_A_FIRST;
    }
    if (a.position > b.position) {
        return SORT_A_SECOND;
    }
    return 0;
};
var PlayerList = /** @class */ (function () {
    function PlayerList() {
        var _this = this;
        this.players = [];
        this.gamePlayers = {};
        this.events = new events_1.EventEmitter();
        this.emitUpdate = debounce(function () {
            // incase the debounce lands after deconstructor is called
            // todo cancel this manually
            if (!_this.events) {
                return;
            }
            _this.events.emit(PlayerListEvents.UPDATE, _this.getValue());
        }, 500);
        this.getValue = function () {
            return _this.players.map(function (_a) {
                var id = _a.id;
                var player = _this.gamePlayers[id];
                var streak = player.getStreak();
                return {
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
                    status: player.getStatus(),
                    title: models_1.PLAYER_TITLES[player.id] || null,
                    picture: player.picture
                };
            });
        };
    }
    PlayerList.prototype.deconstructor = function () {
        this.events.removeAllListeners();
        this.events = null;
    };
    PlayerList.prototype.onUpdate = function (fn) {
        this.events.on(PlayerListEvents.UPDATE, fn);
    };
    PlayerList.prototype.addPlayer = function (player) {
        var _this = this;
        this.players.push({
            id: player.id,
            position: null,
            sortValues: {
                health: player.getHealth(),
                hasQuit: player.getStatus() === models_1.PlayerStatus.QUIT
            }
        });
        this.gamePlayers[player.id] = player;
        player.propertyUpdates().onHealthUpdate(function (health) { return _this.updateSortedValue(player.id, { health: health }); });
        player.propertyUpdates().onStatusUpdate(function (status) { return _this.updateSortedValue(player.id, { hasQuit: status === models_1.PlayerStatus.QUIT }); });
        player.propertyUpdates().onReadyUpdate(this.emitUpdate);
        player.propertyUpdates().onStreakUpdate(this.emitUpdate);
        player.propertyUpdates().onBattleUpdate(this.emitUpdate);
    };
    PlayerList.prototype.updateSortedValue = function (id, patch) {
        var index = this.players.findIndex(function (p) { return p.id === id; });
        if (index === -1) {
            return;
        }
        this.players[index] = __assign(__assign({}, this.players[index]), { sortValues: __assign(__assign({}, this.players[index].sortValues), patch) });
        var newPlayers = __spread(this.players);
        newPlayers.sort(sortPlayers);
        this.players = newPlayers.reduce(function (acc, cur, i) {
            if (cur.position === i + 1) {
                return __spread(acc, [cur]);
            }
            return __spread(acc, [
                __assign(__assign({}, cur), { position: i + 1 })
            ]);
        }, []);
        this.emitUpdate();
    };
    return PlayerList;
}());
exports.PlayerList = PlayerList;


/***/ }),

/***/ "../gamemode/lib/game/readyNotifier/index.js":
/*!***************************************************!*\
  !*** ../gamemode/lib/game/readyNotifier/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.readyNotifier = void 0;
var limitedQueue_1 = __webpack_require__(/*! ./limitedQueue */ "../gamemode/lib/game/readyNotifier/limitedQueue.js");
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

/***/ "../gamemode/lib/game/readyNotifier/limitedQueue.js":
/*!**********************************************************!*\
  !*** ../gamemode/lib/game/readyNotifier/limitedQueue.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.deferLimitedQueue = exports.limitedQueue = void 0;
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var pDefer = __webpack_require__(/*! p-defer */ "../gamemode/node_modules/p-defer/index.js");
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

/***/ "../gamemode/lib/game/roundInfo/index.js":
/*!***********************************************!*\
  !*** ../gamemode/lib/game/roundInfo/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var state_1 = __webpack_require__(/*! ./state */ "../gamemode/lib/game/roundInfo/state.js");
__createBinding(exports, state_1, "RoundInfoCommands");
__createBinding(exports, state_1, "reducer", "roundInfoReducer");


/***/ }),

/***/ "../gamemode/lib/game/roundInfo/state.js":
/*!***********************************************!*\
  !*** ../gamemode/lib/game/roundInfo/state.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
exports.__esModule = true;
exports.RoundInfoCommands = exports.setRoundInfoCommand = exports.reducer = void 0;
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "../gamemode/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var initialState = {
    round: null,
    phase: null,
    phaseStartedAtSeconds: null
};
exports.reducer = (_a = toolkit_1.createSlice({
    name: "roundInfo",
    initialState: initialState,
    reducers: {
        setRoundInfoCommand: function (state, command) {
            if (command.payload.round) {
                return __assign(__assign({}, state), { phase: command.payload.phase, phaseStartedAtSeconds: Math.floor(command.payload.startedAt), round: command.payload.round });
            }
            return __assign(__assign({}, state), { phase: command.payload.phase, phaseStartedAtSeconds: Math.floor(command.payload.startedAt) });
        }
    }
}), _a.reducer), exports.setRoundInfoCommand = _a.actions.setRoundInfoCommand;
var RoundInfoCommands = { setRoundInfoCommand: exports.setRoundInfoCommand };
exports.RoundInfoCommands = RoundInfoCommands;


/***/ }),

/***/ "../gamemode/lib/game/store.js":
/*!*************************************!*\
  !*** ../gamemode/lib/game/store.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.createGameStore = void 0;
var redux_1 = __webpack_require__(/*! redux */ "../gamemode/node_modules/redux/es/redux.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "../gamemode/node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var roundInfo_1 = __webpack_require__(/*! ./roundInfo */ "../gamemode/lib/game/roundInfo/index.js");
exports.createGameStore = function () {
    var sagaMiddleware = redux_saga_1["default"]();
    var store = redux_1.createStore(redux_1.combineReducers({
        roundInfo: roundInfo_1.roundInfoReducer
    }), redux_1.applyMiddleware(sagaMiddleware));
    return { store: store, sagaMiddleware: sagaMiddleware };
};


/***/ }),

/***/ "../gamemode/lib/index.js":
/*!********************************!*\
  !*** ../gamemode/lib/index.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var game_1 = __webpack_require__(/*! ./game */ "../gamemode/lib/game.js");
__createBinding(exports, game_1, "Game");
var player_1 = __webpack_require__(/*! ./player */ "../gamemode/lib/player/index.js");
__createBinding(exports, player_1, "Player");
__createBinding(exports, player_1, "PlayerEvents");
__createBinding(exports, player_1, "PlayerSagas");
__createBinding(exports, player_1, "PlayerSelectors");
__createBinding(exports, player_1, "PlayerCommands");
__createBinding(exports, player_1, "PlayerReducers");
__createBinding(exports, player_1, "PlayerGameActions");
var pieceSelectors_1 = __webpack_require__(/*! ./player/pieceSelectors */ "../gamemode/lib/player/pieceSelectors.js");
__createBinding(exports, pieceSelectors_1, "getPiece");
__createBinding(exports, pieceSelectors_1, "getAllPieces");
var playerSelectors_1 = __webpack_require__(/*! ./player/playerSelectors */ "../gamemode/lib/player/playerSelectors.js");
__createBinding(exports, playerSelectors_1, "getPlayerLevel");
__createBinding(exports, playerSelectors_1, "getPlayerMoney");
__createBinding(exports, playerSelectors_1, "getPlayerXp");
__createBinding(exports, playerSelectors_1, "isPlayerAlive");
var playerInfo_1 = __webpack_require__(/*! ./player/playerInfo */ "../gamemode/lib/player/playerInfo/index.js");
__createBinding(exports, playerInfo_1, "PlayerInfoCommands");
__createBinding(exports, playerInfo_1, "playerInfoReducer");
var store_1 = __webpack_require__(/*! ./player/store */ "../gamemode/lib/player/store.js");
__createBinding(exports, store_1, "createPlayerStore");
var roundInfo_1 = __webpack_require__(/*! ./game/roundInfo */ "../gamemode/lib/game/roundInfo/index.js");
__createBinding(exports, roundInfo_1, "roundInfoReducer");
__createBinding(exports, roundInfo_1, "RoundInfoCommands");
exports.GameEvents = __webpack_require__(/*! ./game/events */ "../gamemode/lib/game/events.js");
var definitions_1 = __webpack_require__(/*! ./definitions */ "../gamemode/lib/definitions/index.js");
__createBinding(exports, definitions_1, "getDefinitionById");
var match_1 = __webpack_require__(/*! ./game/match */ "../gamemode/lib/game/match.js");
__createBinding(exports, match_1, "Match");
var config_1 = __webpack_require__(/*! ./config */ "../gamemode/lib/config/index.js");
__createBinding(exports, config_1, "config");


/***/ }),

/***/ "../gamemode/lib/player/cardShop.js":
/*!******************************************!*\
  !*** ../gamemode/lib/player/cardShop.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
exports.__esModule = true;
exports.cardShopReducer = exports.updateShopLockCommand = exports.updateCardsCommand = void 0;
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "../gamemode/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var initialState = {
    cards: [],
    locked: false
};
exports.updateCardsCommand = (_a = toolkit_1.createSlice({
    name: "cards",
    initialState: initialState,
    reducers: {
        updateCardsCommand: function (state, _a) {
            var cards = _a.payload;
            return (__assign(__assign({}, state), { cards: cards }));
        },
        updateShopLockCommand: function (state, _a) {
            var locked = _a.payload;
            return (__assign(__assign({}, state), { locked: locked }));
        }
    }
}), _b = _a.actions, _b.updateCardsCommand), exports.updateShopLockCommand = _b.updateShopLockCommand, exports.cardShopReducer = _a.reducer;


/***/ }),

/***/ "../gamemode/lib/player/commands.js":
/*!******************************************!*\
  !*** ../gamemode/lib/player/commands.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var cardShop_1 = __webpack_require__(/*! ./cardShop */ "../gamemode/lib/player/cardShop.js");
__createBinding(exports, cardShop_1, "updateCardsCommand");
__createBinding(exports, cardShop_1, "updateShopLockCommand");


/***/ }),

/***/ "../gamemode/lib/player/events.js":
/*!****************************************!*\
  !*** ../gamemode/lib/player/events.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.playerMatchRewardsEvent = exports.PLAYER_MATCH_REWARDS_EVENT = exports.playerDeathEvent = exports.PLAYER_DEATH_EVENT = exports.clientFinishMatchEvent = exports.CLIENT_FINISH_MATCH_EVENT = exports.afterRerollCardsEvent = exports.AFTER_REROLL_CARDS_EVENT = exports.afterSellPieceEvent = exports.AFTER_SELL_PIECE_EVENT = exports.playerFinishMatchEvent = exports.PLAYER_FINISH_MATCH_EVENT = void 0;
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
exports.PLAYER_MATCH_REWARDS_EVENT = "PLAYER_MATCH_REWARDS_EVENT";
exports.playerMatchRewardsEvent = function (payload) { return ({
    type: exports.PLAYER_MATCH_REWARDS_EVENT,
    payload: payload
}); };


/***/ }),

/***/ "../gamemode/lib/player/index.js":
/*!***************************************!*\
  !*** ../gamemode/lib/player/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var player_1 = __webpack_require__(/*! ./player */ "../gamemode/lib/player/player.js");
__createBinding(exports, player_1, "Player");
exports.PlayerEvents = __webpack_require__(/*! ./events */ "../gamemode/lib/player/events.js");
exports.PlayerSagas = __webpack_require__(/*! ./sagas */ "../gamemode/lib/player/sagas/index.js");
exports.PlayerSelectors = __webpack_require__(/*! ./playerSelectors */ "../gamemode/lib/player/playerSelectors.js");
exports.PlayerCommands = __webpack_require__(/*! ./commands */ "../gamemode/lib/player/commands.js");
exports.PlayerReducers = __webpack_require__(/*! ./reducers */ "../gamemode/lib/player/reducers.js");
exports.PlayerGameActions = __webpack_require__(/*! ./playerGameActions */ "../gamemode/lib/player/playerGameActions/index.js");


/***/ }),

/***/ "../gamemode/lib/player/pieceSelectors.js":
/*!************************************************!*\
  !*** ../gamemode/lib/player/pieceSelectors.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.getPiecesExceptStage = exports.getPiecesForStage = exports.getPiecesForDefinition = exports.getAllPieces = exports.getPiece = void 0;
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
exports.getPiece = function (state, pieceId) {
    return board_1.BoardSelectors.getPiece(state.board, pieceId)
        || board_1.BoardSelectors.getPiece(state.bench, pieceId)
        || null;
};
exports.getAllPieces = function (state) { return __spread(board_1.BoardSelectors.getAllPieces(state.board), board_1.BoardSelectors.getAllPieces(state.bench)); };
exports.getPiecesForDefinition = function (state, definitionId) {
    return board_1.BoardSelectors.getAllPieces(state).filter(function (p) { return p.definitionId === definitionId; });
};
exports.getPiecesForStage = function (state, stage) {
    return board_1.BoardSelectors.getAllPieces(state).filter(function (p) { return p.stage === stage; });
};
exports.getPiecesExceptStage = function (state, stage) {
    return board_1.BoardSelectors.getAllPieces(state).filter(function (p) { return p.stage !== stage; });
};


/***/ }),

/***/ "../gamemode/lib/player/player.js":
/*!****************************************!*\
  !*** ../gamemode/lib/player/player.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.Player = void 0;
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
var sagas_1 = __webpack_require__(/*! ./sagas */ "../gamemode/lib/player/sagas/index.js");
var events_2 = __webpack_require__(/*! ./events */ "../gamemode/lib/player/events.js");
var store_1 = __webpack_require__(/*! ./store */ "../gamemode/lib/player/store.js");
var playerInfo_1 = __webpack_require__(/*! ./playerInfo */ "../gamemode/lib/player/playerInfo/index.js");
var playerSelectors_1 = __webpack_require__(/*! ./playerSelectors */ "../gamemode/lib/player/playerSelectors.js");
var pieceSelectors_1 = __webpack_require__(/*! ./pieceSelectors */ "../gamemode/lib/player/pieceSelectors.js");
var events_3 = __webpack_require__(/*! ../game/events */ "../gamemode/lib/game/events.js");
var cardShop_1 = __webpack_require__(/*! ./cardShop */ "../gamemode/lib/player/cardShop.js");
var playerGameActions_1 = __webpack_require__(/*! ./playerGameActions */ "../gamemode/lib/player/playerGameActions/index.js");
var PlayerEvent;
(function (PlayerEvent) {
    PlayerEvent["QUIT_GAME"] = "QUIT_GAME";
})(PlayerEvent || (PlayerEvent = {}));
var Player = /** @class */ (function () {
    function Player(id, name, picture) {
        var _this = this;
        this.match = null;
        this.events = new events_1.EventEmitter();
        this.getLogger = function () { return _this.logger; };
        this.getMatch = function () { return _this.match; };
        this.rerollCards = function () {
            if (playerSelectors_1.isPlayerAlive(_this.store.getState()) === false) {
                return;
            }
            var state = _this.store.getState();
            var cards = state.cardShop.cards;
            var threeStarBoardPieces = pieceSelectors_1.getPiecesForStage(state.board, 2);
            var threeStarBenchPieces = pieceSelectors_1.getPiecesForStage(state.bench, 2);
            var excludeIds = __spread(threeStarBoardPieces, threeStarBenchPieces).map(function (p) { return p.definitionId; });
            var blessCandidateIds = __spread(new Set(pieceSelectors_1.getPiecesExceptStage(state.board, 2).map(function (p) { return p.definitionId; })));
            var newCards = _this.deck.reroll(cards, 5, _this.getLevel(), blessCandidateIds, excludeIds);
            _this.store.dispatch(cardShop_1.updateCardsCommand(newCards));
        };
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.boardSlice = board_1.createBoardSlice("player-" + this.id + "-board", { width: 7, height: 3 });
        this.benchSlice = board_1.createBoardSlice("player-" + this.id + "-bench", { width: 7, height: 1 });
        var _a = store_1.createPlayerStore(this.getLogger, this.id, this.name, {
            boardSlice: this.boardSlice,
            benchSlice: this.benchSlice
        }), store = _a.store, sagaMiddleware = _a.sagaMiddleware;
        this.store = store;
        this.sagaMiddleware = sagaMiddleware;
        this.sagaMiddleware.run(this.afterSellPieceEventSaga());
        this.sagaMiddleware.run(this.afterRerollCardsEventSaga());
        this.sagaMiddleware.run(this.quitGameSaga());
        this.sagaMiddleware.run(this.clientFinishMatchSaga());
        this.sagaMiddleware.run(this.finishGameSaga());
        sagas_1.playerBattle(this.sagaMiddleware);
        this.sagaMiddleware.run(sagas_1.playerMatchRewards(this.id));
        this.propertyUpdateRegistry = sagas_1.createPropertyUpdateRegistry(this.sagaMiddleware);
    }
    Player.prototype.setLogger = function (logger) {
        this.logger = logger;
    };
    Player.prototype.receiveGameEvent = function (gameEvent) {
        this.store.dispatch(gameEvent);
    };
    Player.prototype.propertyUpdates = function () {
        return this.propertyUpdateRegistry;
    };
    Player.prototype.setGetRoundInfoState = function (fn) {
        this.getRoundInfoState = fn;
    };
    Player.prototype.setGetPlayerListPlayers = function (fn) {
        this.getPlayerListPlayers = fn;
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
        return this.store.getState().cardShop.locked;
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
        if (!this.getShopLocked()) {
            this.rerollCards();
        }
        this.store.dispatch(playerInfo_1.PlayerInfoCommands.clearOpponentCommand());
        this.store.dispatch(this.boardSlice.commands.setPieceLimitCommand(this.getLevel()));
        this.store.dispatch(this.boardSlice.commands.unlockBoardCommand());
    };
    Player.prototype.fillBoard = function () {
        this.store.dispatch(sagas_1.fillBoardCommand());
    };
    Player.prototype.enterReadyPhase = function (match) {
        this.match = match;
        this.store.dispatch(this.boardSlice.commands.lockBoardCommand());
        var opponentId = match.home.id === this.id
            ? match.away.id
            : match.home.id;
        this.store.dispatch(playerInfo_1.PlayerInfoCommands.updateOpponentCommand(opponentId));
    };
    Player.prototype.fightMatch = function (startedAt, battleTimeout) {
        return __awaiter(this, void 0, void 0, function () {
            var finalMatchBoard, survivingPieces, surviving, homeScore, awayScore, opponentName;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.match.fight(battleTimeout.promise)];
                    case 1:
                        finalMatchBoard = _a.sent();
                        survivingPieces = board_1.BoardSelectors.getAllPieces(finalMatchBoard).filter(function (p) { return p.currentHealth > 0; });
                        surviving = {
                            home: survivingPieces.filter(function (p) { return p.ownerId === _this.id; }),
                            away: survivingPieces.filter(function (p) { return p.ownerId !== _this.id; })
                        };
                        homeScore = surviving.home.length;
                        awayScore = surviving.away.length;
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
        this.store.dispatch(this.boardSlice.commands.setBoardPiecesCommand({ pieces: {}, piecePositions: {} }));
        this.store.dispatch(this.benchSlice.commands.setBoardPiecesCommand({ pieces: {}, piecePositions: {} }));
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
        var cards = this.store.getState().cardShop.cards;
        this.store.dispatch(cardShop_1.updateCardsCommand([]));
        this.deck.addCards(cards);
        this.deck.shuffle();
    };
    Player.prototype.kill = function () {
        this.clearPieces();
        this.store.dispatch(events_2.playerDeathEvent());
    };
    Player.prototype.isAlive = function () {
        return playerSelectors_1.isPlayerAlive(this.store.getState());
    };
    Player.prototype.isDead = function () {
        return !this.isAlive();
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
        return this.store.getState().cardShop.cards;
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
                    case 0: return [4 /*yield*/, effects_1.takeEvery(playerGameActions_1.quitGamePlayerAction.toString(), function () {
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
                    case 0: return [4 /*yield*/, effects_1.takeLatest(events_3.gameFinishEvent.toString(), function () {
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

/***/ "../gamemode/lib/player/playerGameActions/buyCard.js":
/*!***********************************************************!*\
  !*** ../gamemode/lib/player/playerGameActions/buyCard.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.buyCardPlayerActionSaga = exports.buyCardPlayerAction = void 0;
var uuid_1 = __webpack_require__(/*! uuid */ "../gamemode/node_modules/uuid/dist/esm-browser/index.js");
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "../gamemode/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
var playerSelectors_1 = __webpack_require__(/*! ../playerSelectors */ "../gamemode/lib/player/playerSelectors.js");
var commands_1 = __webpack_require__(/*! ../playerInfo/commands */ "../gamemode/lib/player/playerInfo/commands.js");
var cardShop_1 = __webpack_require__(/*! ../cardShop */ "../gamemode/lib/player/cardShop.js");
var definitions_1 = __webpack_require__(/*! ../../definitions */ "../gamemode/lib/definitions/index.js");
var getCardDestination = function (state, playerId, sortPositions) {
    var belowPieceLimit = playerSelectors_1.getPlayerBelowPieceLimit(state, playerId);
    var inPreparingPhase = state.roundInfo.phase === models_1.GamePhase.PREPARING;
    if (belowPieceLimit && inPreparingPhase) {
        var boardSlot = board_1.BoardSelectors.getFirstEmptySlot(state.board, sortPositions);
        if (boardSlot) {
            return {
                type: "board",
                location: boardSlot
            };
        }
    }
    var benchSlot = board_1.BoardSelectors.getFirstEmptySlot(state.bench, board_1.topLeftToBottomRightSortPositions);
    if (benchSlot !== null) {
        return {
            type: "bench",
            location: benchSlot
        };
    }
    return null;
};
var createPieceFromCard = function (ownerId, card) {
    var id = card.id, definitionId = card.definitionId;
    var definition = definitions_1.getDefinitionById(definitionId);
    var stats = definition.stages[0];
    return {
        id: id || uuid_1.v4(),
        ownerId: ownerId,
        definitionId: definitionId,
        definition: definition,
        facingAway: true,
        maxHealth: stats.hp,
        currentHealth: stats.hp,
        stage: 0
    };
};
exports.buyCardPlayerAction = toolkit_1.createAction("buyCardPlayerAction");
exports.buyCardPlayerActionSaga = function () {
    var _loop_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _loop_1 = function () {
                    var playerId, name_1, getLogger, _a, boardSlice, benchSlice, action, index, sortPositions, state, cards, money, card, destination, piece, remainingCards, _b, x, y;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, effects_1.getContext("playerId")];
                            case 1:
                                playerId = _c.sent();
                                return [4 /*yield*/, effects_1.getContext("playerName")];
                            case 2:
                                name_1 = _c.sent();
                                return [4 /*yield*/, effects_1.getContext("dependencies")];
                            case 3:
                                getLogger = (_c.sent()).getLogger;
                                return [4 /*yield*/, effects_1.getContext("boardSlices")];
                            case 4:
                                _a = _c.sent(), boardSlice = _a.boardSlice, benchSlice = _a.benchSlice;
                                return [4 /*yield*/, effects_1.take(exports.buyCardPlayerAction.toString())];
                            case 5:
                                action = _c.sent();
                                index = action.payload.index;
                                sortPositions = action.payload.sortPositions || undefined;
                                return [4 /*yield*/, effects_1.select()];
                            case 6:
                                state = _c.sent();
                                cards = state.cardShop.cards, money = state.playerInfo.money;
                                card = cards[index];
                                if (!!card) return [3 /*break*/, 9];
                                getLogger().warn("Player attempted to buy null/undefined card", { actor: { playerId: playerId, name: name_1 } });
                                return [4 /*yield*/, effects_1.put(commands_1.updateMoneyCommand(money))];
                            case 7:
                                _c.sent();
                                return [4 /*yield*/, effects_1.put(cardShop_1.updateCardsCommand(cards))];
                            case 8:
                                _c.sent();
                                return [2 /*return*/, "continue"];
                            case 9:
                                if (!(money < card.cost)) return [3 /*break*/, 12];
                                getLogger().warn("Not enough money to buy card", {
                                    actor: { playerId: playerId, name: name_1 },
                                    details: { index: index }
                                });
                                return [4 /*yield*/, effects_1.put(commands_1.updateMoneyCommand(money))];
                            case 10:
                                _c.sent();
                                return [4 /*yield*/, effects_1.put(cardShop_1.updateCardsCommand(cards))];
                            case 11:
                                _c.sent();
                                return [2 /*return*/, "continue"];
                            case 12:
                                destination = getCardDestination(state, playerId, sortPositions);
                                // no valid slots
                                if (destination === null) {
                                    getLogger().warn("Player attempted to buy a card but has no available destination", { actor: { playerId: playerId, name: name_1 } });
                                    return [2 /*return*/, "continue"];
                                }
                                piece = createPieceFromCard(playerId, card);
                                remainingCards = cards.map(function (c) { return c === card ? null : c; });
                                if (!(destination.type === "board")) return [3 /*break*/, 14];
                                _b = destination.location, x = _b.x, y = _b.y;
                                return [4 /*yield*/, effects_1.put(boardSlice.commands.addBoardPieceCommand({ piece: piece, x: x, y: y }))];
                            case 13:
                                _c.sent();
                                return [3 /*break*/, 16];
                            case 14:
                                if (!(destination.type === "bench")) return [3 /*break*/, 16];
                                return [4 /*yield*/, effects_1.put(benchSlice.commands.addBoardPieceCommand({ piece: piece, x: destination.location.x, y: 0 }))];
                            case 15:
                                _c.sent();
                                _c.label = 16;
                            case 16: return [4 /*yield*/, effects_1.put(commands_1.updateMoneyCommand(money - card.cost))];
                            case 17:
                                _c.sent();
                                return [4 /*yield*/, effects_1.put(cardShop_1.updateCardsCommand(remainingCards))];
                            case 18:
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                _a.label = 1;
            case 1:
                if (false) {}
                return [5 /*yield**/, _loop_1()];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "../gamemode/lib/player/playerGameActions/buyXp.js":
/*!*********************************************************!*\
  !*** ../gamemode/lib/player/playerGameActions/buyXp.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.buyXpPlayerActionSaga = exports.buyXpPlayerAction = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var playerSelectors_1 = __webpack_require__(/*! ../playerSelectors */ "../gamemode/lib/player/playerSelectors.js");
var commands_1 = __webpack_require__(/*! ../playerInfo/commands */ "../gamemode/lib/player/playerInfo/commands.js");
var xp_1 = __webpack_require__(/*! ../sagas/xp */ "../gamemode/lib/player/sagas/xp.js");
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "../gamemode/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
exports.buyXpPlayerAction = toolkit_1.createAction("buyXpPlayerAction");
exports.buyXpPlayerActionSaga = function () {
    var playerId, name_1, getLogger, isAlive, currentLevel, money;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (false) {}
                return [4 /*yield*/, effects_1.getContext("playerId")];
            case 1:
                playerId = _a.sent();
                return [4 /*yield*/, effects_1.getContext("playerName")];
            case 2:
                name_1 = _a.sent();
                return [4 /*yield*/, effects_1.getContext("dependencies")];
            case 3:
                getLogger = (_a.sent()).getLogger;
                return [4 /*yield*/, effects_1.take(exports.buyXpPlayerAction.toString())];
            case 4:
                _a.sent();
                getLogger().info("BUY_XP_ACTION received", { actor: { playerId: playerId, name: name_1 } });
                return [4 /*yield*/, effects_1.select(playerSelectors_1.isPlayerAlive)];
            case 5:
                isAlive = _a.sent();
                if (isAlive === false) {
                    getLogger().info("Player attempted to buy xp, but dead", { actor: { playerId: playerId, name: name_1 } });
                    return [3 /*break*/, 0];
                }
                return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.level; })];
            case 6:
                currentLevel = _a.sent();
                if (currentLevel === models_1.MAX_PLAYER_LEVEL) {
                    getLogger().info("Player attempted to buy xp, but at max level", { actor: { playerId: playerId, name: name_1 } });
                    return [3 /*break*/, 0];
                }
                return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.money; })];
            case 7:
                money = _a.sent();
                if (!(money < models_1.BUY_XP_COST)) return [3 /*break*/, 9];
                getLogger().info("Not enough money to buy xp", {
                    actor: { playerId: playerId, name: name_1 },
                    details: {
                        money: money,
                        cost: models_1.BUY_XP_COST
                    }
                });
                return [4 /*yield*/, effects_1.put(commands_1.updateMoneyCommand(money))];
            case 8:
                _a.sent();
                return [3 /*break*/, 0];
            case 9: return [4 /*yield*/, effects_1.put(xp_1.addXpCommand(models_1.BUY_XP_AMOUNT))];
            case 10:
                _a.sent();
                return [4 /*yield*/, effects_1.put(commands_1.updateMoneyCommand(money - models_1.BUY_XP_COST))];
            case 11:
                _a.sent();
                return [3 /*break*/, 0];
            case 12: return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "../gamemode/lib/player/playerGameActions/dropPiece.js":
/*!*************************************************************!*\
  !*** ../gamemode/lib/player/playerGameActions/dropPiece.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.dropPiecePlayerActionSaga = exports.dropPiecePlayerAction = void 0;
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "../gamemode/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
var playerSelectors_1 = __webpack_require__(/*! ../playerSelectors */ "../gamemode/lib/player/playerSelectors.js");
var findPiece = function (state, location) {
    if (location.type === "board") {
        var _a = location.location, x = _a.x, y = _a.y;
        return board_1.BoardSelectors.getPieceForPosition(state.board, x, y);
    }
    if (location.type === "bench") {
        var x = location.location.x;
        return board_1.BoardSelectors.getPieceForPosition(state.bench, x, 0);
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
exports.dropPiecePlayerAction = toolkit_1.createAction("dropPiecePlayerAction");
exports.dropPiecePlayerActionSaga = function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(exports.dropPiecePlayerAction.toString(), function (_a) {
                    var playerId, _b, boardSlice, benchSlice, state, fromPiece, toPiece, belowPieceLimit, fromBench, toBench, _c, x, y;
                    var _d = _a.payload, from = _d.from, pieceId = _d.pieceId, to = _d.to;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0: return [4 /*yield*/, effects_1.getContext("playerId")];
                            case 1:
                                playerId = _e.sent();
                                return [4 /*yield*/, effects_1.getContext("boardSlices")];
                            case 2:
                                _b = _e.sent(), boardSlice = _b.boardSlice, benchSlice = _b.benchSlice;
                                return [4 /*yield*/, effects_1.select()];
                            case 3:
                                state = _e.sent();
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
                                if (!(from.type === "board" && to.type === "board")) return [3 /*break*/, 5];
                                return [4 /*yield*/, effects_1.put(boardSlice.commands.moveBoardPieceCommand({ pieceId: pieceId, from: from.location, to: to.location }))];
                            case 4:
                                _e.sent();
                                return [3 /*break*/, 13];
                            case 5:
                                if (!(from.type !== "board" && to.type !== "board")) return [3 /*break*/, 7];
                                fromBench = { x: from.location.x, y: 0 };
                                toBench = { x: to.location.x, y: 0 };
                                return [4 /*yield*/, effects_1.put(benchSlice.commands.moveBoardPieceCommand({ pieceId: pieceId, from: fromBench, to: toBench }))];
                            case 6:
                                _e.sent();
                                return [3 /*break*/, 13];
                            case 7:
                                if (!(from.type === "board" && to.type !== "board")) return [3 /*break*/, 10];
                                return [4 /*yield*/, effects_1.put(boardSlice.commands.removeBoardPiecesCommand([pieceId]))];
                            case 8:
                                _e.sent();
                                return [4 /*yield*/, effects_1.put(benchSlice.commands.addBoardPieceCommand({ piece: fromPiece, x: to.location.x, y: 0 }))];
                            case 9:
                                _e.sent();
                                return [3 /*break*/, 13];
                            case 10:
                                if (!(from.type !== "board" && to.type === "board")) return [3 /*break*/, 13];
                                return [4 /*yield*/, effects_1.put(benchSlice.commands.removeBoardPiecesCommand([pieceId]))];
                            case 11:
                                _e.sent();
                                _c = to.location, x = _c.x, y = _c.y;
                                return [4 /*yield*/, effects_1.put(boardSlice.commands.addBoardPieceCommand({ piece: fromPiece, x: x, y: y }))];
                            case 12:
                                _e.sent();
                                _e.label = 13;
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


/***/ }),

/***/ "../gamemode/lib/player/playerGameActions/index.js":
/*!*********************************************************!*\
  !*** ../gamemode/lib/player/playerGameActions/index.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.PlayerGameActionTypesArray = exports.playerGameActionsSaga = exports.dropPiecePlayerAction = exports.quitGamePlayerAction = exports.readyUpPlayerAction = exports.sellPiecePlayerAction = exports.toggleShopLockPlayerAction = exports.rerollCardsPlayerAction = exports.buyXpPlayerAction = exports.buyCardPlayerAction = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var buyCard_1 = __webpack_require__(/*! ./buyCard */ "../gamemode/lib/player/playerGameActions/buyCard.js");
exports.buyCardPlayerAction = buyCard_1.buyCardPlayerAction;
var buyXp_1 = __webpack_require__(/*! ./buyXp */ "../gamemode/lib/player/playerGameActions/buyXp.js");
exports.buyXpPlayerAction = buyXp_1.buyXpPlayerAction;
var rerollCards_1 = __webpack_require__(/*! ./rerollCards */ "../gamemode/lib/player/playerGameActions/rerollCards.js");
exports.rerollCardsPlayerAction = rerollCards_1.rerollCardsPlayerAction;
var toggleShopLock_1 = __webpack_require__(/*! ./toggleShopLock */ "../gamemode/lib/player/playerGameActions/toggleShopLock.js");
exports.toggleShopLockPlayerAction = toggleShopLock_1.toggleShopLockPlayerAction;
var sellPiece_1 = __webpack_require__(/*! ./sellPiece */ "../gamemode/lib/player/playerGameActions/sellPiece.js");
exports.sellPiecePlayerAction = sellPiece_1.sellPiecePlayerAction;
var readyUp_1 = __webpack_require__(/*! ./readyUp */ "../gamemode/lib/player/playerGameActions/readyUp.js");
exports.readyUpPlayerAction = readyUp_1.readyUpPlayerAction;
var quitGame_1 = __webpack_require__(/*! ./quitGame */ "../gamemode/lib/player/playerGameActions/quitGame.js");
exports.quitGamePlayerAction = quitGame_1.quitGamePlayerAction;
var dropPiece_1 = __webpack_require__(/*! ./dropPiece */ "../gamemode/lib/player/playerGameActions/dropPiece.js");
exports.dropPiecePlayerAction = dropPiece_1.dropPiecePlayerAction;
exports.playerGameActionsSaga = function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.fork(buyXp_1.buyXpPlayerActionSaga)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(buyCard_1.buyCardPlayerActionSaga)];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(rerollCards_1.rerollCardsPlayerActionSaga)];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(toggleShopLock_1.toggleShopLockPlayerActionSaga)];
            case 4:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(sellPiece_1.sellPiecePlayerActionSaga)];
            case 5:
                _a.sent();
                return [4 /*yield*/, effects_1.fork(dropPiece_1.dropPiecePlayerActionSaga)];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
exports.PlayerGameActionTypesArray = [
    buyXp_1.buyXpPlayerAction.toString(),
    buyCard_1.buyCardPlayerAction.toString(),
    rerollCards_1.rerollCardsPlayerAction.toString(),
    toggleShopLock_1.toggleShopLockPlayerAction.toString(),
    sellPiece_1.sellPiecePlayerAction.toString(),
    readyUp_1.readyUpPlayerAction.toString(),
    quitGame_1.quitGamePlayerAction.toString(),
    dropPiece_1.dropPiecePlayerAction.toString()
];


/***/ }),

/***/ "../gamemode/lib/player/playerGameActions/quitGame.js":
/*!************************************************************!*\
  !*** ../gamemode/lib/player/playerGameActions/quitGame.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.quitGamePlayerAction = void 0;
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "../gamemode/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
exports.quitGamePlayerAction = toolkit_1.createAction("quitGamePlayerAction");


/***/ }),

/***/ "../gamemode/lib/player/playerGameActions/readyUp.js":
/*!***********************************************************!*\
  !*** ../gamemode/lib/player/playerGameActions/readyUp.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.readyUpPlayerAction = void 0;
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "../gamemode/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
exports.readyUpPlayerAction = toolkit_1.createAction("readyUpPlayerAction");


/***/ }),

/***/ "../gamemode/lib/player/playerGameActions/rerollCards.js":
/*!***************************************************************!*\
  !*** ../gamemode/lib/player/playerGameActions/rerollCards.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.rerollCardsPlayerActionSaga = exports.rerollCardsPlayerAction = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var playerSelectors_1 = __webpack_require__(/*! ../playerSelectors */ "../gamemode/lib/player/playerSelectors.js");
var commands_1 = __webpack_require__(/*! ../playerInfo/commands */ "../gamemode/lib/player/playerInfo/commands.js");
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "../gamemode/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var events_1 = __webpack_require__(/*! ../events */ "../gamemode/lib/player/events.js");
exports.rerollCardsPlayerAction = toolkit_1.createAction("rerollCardsPlayerAction");
exports.rerollCardsPlayerActionSaga = function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(exports.rerollCardsPlayerAction.toString(), function () {
                    var getLogger, isAlive, money;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, effects_1.getContext("dependencies")];
                            case 1:
                                getLogger = (_a.sent()).getLogger;
                                return [4 /*yield*/, effects_1.select(playerSelectors_1.isPlayerAlive)];
                            case 2:
                                isAlive = _a.sent();
                                if (isAlive === false) {
                                    getLogger().info("Attempted to reroll, but dead");
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.money; })];
                            case 3:
                                money = _a.sent();
                                // not enough money
                                if (money < models_1.REROLL_COST) {
                                    getLogger().info("Attempted to reroll costing $" + models_1.REROLL_COST + " but only had $" + money);
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, effects_1.put(commands_1.updateMoneyCommand(money - models_1.REROLL_COST))];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, effects_1.put(events_1.afterRerollCardsEvent())];
                            case 5:
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

/***/ "../gamemode/lib/player/playerGameActions/sellPiece.js":
/*!*************************************************************!*\
  !*** ../gamemode/lib/player/playerGameActions/sellPiece.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.sellPiecePlayerActionSaga = exports.sellPiecePlayerAction = void 0;
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "../gamemode/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var pieceSelectors_1 = __webpack_require__(/*! ../pieceSelectors */ "../gamemode/lib/player/pieceSelectors.js");
var commands_1 = __webpack_require__(/*! ../playerInfo/commands */ "../gamemode/lib/player/playerInfo/commands.js");
var events_1 = __webpack_require__(/*! ../events */ "../gamemode/lib/player/events.js");
exports.sellPiecePlayerAction = toolkit_1.createAction("sellPiecePlayerAction");
var PIECES_FOR_STAGE = [1, 3, 9];
exports.sellPiecePlayerActionSaga = function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(exports.sellPiecePlayerAction.toString(), function (_a) {
                    var _b, boardSlice, benchSlice, piece, piecesUsed, pieceCost, currentMoney;
                    var pieceId = _a.payload.pieceId;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, effects_1.getContext("boardSlices")];
                            case 1:
                                _b = _c.sent(), boardSlice = _b.boardSlice, benchSlice = _b.benchSlice;
                                return [4 /*yield*/, effects_1.select(function (state) { return pieceSelectors_1.getPiece(state, pieceId); })];
                            case 2:
                                piece = _c.sent();
                                if (!piece) {
                                    // console.log(`Attempted to sell piece with id ${pieceId} but did not own it`);
                                    return [2 /*return*/];
                                }
                                piecesUsed = PIECES_FOR_STAGE[piece.stage];
                                pieceCost = piece.definition.cost;
                                return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.money; })];
                            case 3:
                                currentMoney = _c.sent();
                                return [4 /*yield*/, effects_1.put(commands_1.updateMoneyCommand(currentMoney + (pieceCost * piecesUsed)))];
                            case 4:
                                _c.sent();
                                return [4 /*yield*/, effects_1.put(benchSlice.commands.removeBoardPiecesCommand([pieceId]))];
                            case 5:
                                _c.sent();
                                return [4 /*yield*/, effects_1.put(boardSlice.commands.removeBoardPiecesCommand([pieceId]))];
                            case 6:
                                _c.sent();
                                return [4 /*yield*/, effects_1.put(events_1.afterSellPieceEvent(piece))];
                            case 7:
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
};


/***/ }),

/***/ "../gamemode/lib/player/playerGameActions/toggleShopLock.js":
/*!******************************************************************!*\
  !*** ../gamemode/lib/player/playerGameActions/toggleShopLock.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.toggleShopLockPlayerActionSaga = exports.toggleShopLockPlayerAction = void 0;
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "../gamemode/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var cardShop_1 = __webpack_require__(/*! ../cardShop */ "../gamemode/lib/player/cardShop.js");
var playerSelectors_1 = __webpack_require__(/*! ../playerSelectors */ "../gamemode/lib/player/playerSelectors.js");
exports.toggleShopLockPlayerAction = toolkit_1.createAction("toggleShopLockPlayerAction");
exports.toggleShopLockPlayerActionSaga = function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(exports.toggleShopLockPlayerAction.toString(), function () {
                    var currentLockState;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, effects_1.select(playerSelectors_1.isPlayerShopLocked)];
                            case 1:
                                currentLockState = _a.sent();
                                return [4 /*yield*/, effects_1.put(cardShop_1.updateShopLockCommand(!currentLockState))];
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

/***/ "../gamemode/lib/player/playerInfo/commands.js":
/*!*****************************************************!*\
  !*** ../gamemode/lib/player/playerInfo/commands.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.updateLevelCommand = exports.updateMoneyCommand = exports.clearOpponentCommand = exports.updateOpponentCommand = exports.updateRoundDiedAtCommand = exports.updateStreakCommand = exports.updateHealthCommand = exports.updateBattleCommand = exports.updateStatusCommand = exports.UPDATE_MONEY_COMMAND = exports.UPDATE_LEVEL_COMMAND = exports.CLEAR_OPPONENT_COMMAND = exports.UPDATE_OPPONENT_COMMAND = exports.UPDATE_ROUND_DIED_AT_COMMAND = exports.UPDATE_STREAK_COMMAND = exports.UPDATE_HEALTH_COMMAND = exports.UPDATE_BATTLE_COMMAND = exports.UPDATE_STATUS_COMMAND = void 0;
exports.UPDATE_STATUS_COMMAND = "UPDATE_STATUS_COMMAND";
exports.UPDATE_BATTLE_COMMAND = "UPDATE_BATTLE_COMMAND";
exports.UPDATE_HEALTH_COMMAND = "UPDATE_HEALTH_COMMAND";
exports.UPDATE_STREAK_COMMAND = "UPDATE_STREAK_COMMAND";
exports.UPDATE_ROUND_DIED_AT_COMMAND = "UPDATE_ROUND_DIED_AT_COMMAND";
exports.UPDATE_OPPONENT_COMMAND = "UPDATE_OPPONENT_COMMAND";
exports.CLEAR_OPPONENT_COMMAND = "CLEAR_OPPONENT_COMMAND";
exports.UPDATE_LEVEL_COMMAND = "UPDATE_LEVEL_COMMAND";
exports.UPDATE_MONEY_COMMAND = "UPDATE_MONEY_COMMAND";
exports.updateStatusCommand = function (status) { return ({ type: exports.UPDATE_STATUS_COMMAND, payload: { status: status } }); };
exports.updateBattleCommand = function (battle) { return ({ type: exports.UPDATE_BATTLE_COMMAND, payload: { battle: battle } }); };
exports.updateHealthCommand = function (health) { return ({ type: exports.UPDATE_HEALTH_COMMAND, payload: { health: health } }); };
exports.updateStreakCommand = function (type, amount) {
    return ({ type: exports.UPDATE_STREAK_COMMAND, payload: { type: type, amount: amount } });
};
exports.updateRoundDiedAtCommand = function (roundDiedAt) { return ({
    type: exports.UPDATE_ROUND_DIED_AT_COMMAND,
    payload: { roundDiedAt: roundDiedAt }
}); };
exports.updateOpponentCommand = function (opponentId) { return ({ type: exports.UPDATE_OPPONENT_COMMAND, payload: { opponentId: opponentId } }); };
exports.clearOpponentCommand = function () { return ({ type: exports.CLEAR_OPPONENT_COMMAND }); };
exports.updateMoneyCommand = function (money) { return ({ type: exports.UPDATE_MONEY_COMMAND, payload: { money: money } }); };
exports.updateLevelCommand = function (level, xp) {
    return ({ type: exports.UPDATE_LEVEL_COMMAND, payload: { level: level, xp: xp } });
};


/***/ }),

/***/ "../gamemode/lib/player/playerInfo/index.js":
/*!**************************************************!*\
  !*** ../gamemode/lib/player/playerInfo/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.PlayerInfoCommands = __webpack_require__(/*! ./commands */ "../gamemode/lib/player/playerInfo/commands.js");
var reducer_1 = __webpack_require__(/*! ./reducer */ "../gamemode/lib/player/playerInfo/reducer.js");
__createBinding(exports, reducer_1, "playerInfoReducer");


/***/ }),

/***/ "../gamemode/lib/player/playerInfo/reducer.js":
/*!****************************************************!*\
  !*** ../gamemode/lib/player/playerInfo/reducer.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var commands_1 = __webpack_require__(/*! ./commands */ "../gamemode/lib/player/playerInfo/commands.js");
var events_1 = __webpack_require__(/*! ../events */ "../gamemode/lib/player/events.js");
var playerGameActions_1 = __webpack_require__(/*! ../playerGameActions */ "../gamemode/lib/player/playerGameActions/index.js");
var initialState = {
    status: models_1.PlayerStatus.CONNECTED,
    health: models_1.STARTING_HEALTH,
    roundDiedAt: null,
    streak: {
        type: models_1.StreakType.WIN,
        amount: 0
    },
    battle: null,
    matchRewards: null,
    opponentId: null,
    money: models_1.STARTING_MONEY,
    ready: false,
    level: models_1.STARTING_LEVEL,
    xp: 0
};
function playerInfoReducer(state, command) {
    if (state === void 0) { state = initialState; }
    switch (command.type) {
        case events_1.PLAYER_MATCH_REWARDS_EVENT:
            return __assign(__assign({}, state), { matchRewards: command.payload });
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
        case commands_1.UPDATE_LEVEL_COMMAND:
            return __assign(__assign({}, state), { level: command.payload.level, xp: command.payload.xp });
        case commands_1.UPDATE_MONEY_COMMAND:
            return __assign(__assign({}, state), { money: command.payload.money });
        case commands_1.UPDATE_OPPONENT_COMMAND:
            return __assign(__assign({}, state), { opponentId: command.payload.opponentId, ready: false });
        case commands_1.CLEAR_OPPONENT_COMMAND:
            return __assign(__assign({}, state), { opponentId: null });
        case playerGameActions_1.readyUpPlayerAction.toString():
            return __assign(__assign({}, state), { ready: true });
        default:
            return state;
    }
}
exports.playerInfoReducer = playerInfoReducer;


/***/ }),

/***/ "../gamemode/lib/player/playerSelectors.js":
/*!*************************************************!*\
  !*** ../gamemode/lib/player/playerSelectors.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.getMostExpensiveBenchPiece = exports.getPlayerBelowPieceLimit = exports.getOpponentId = exports.isPlayerShopLocked = exports.isPlayerAlive = exports.getPlayerXp = exports.getPlayerLevel = exports.getPlayerMoney = void 0;
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
exports.getPlayerMoney = function (state) { return state.playerInfo.money; };
exports.getPlayerLevel = function (state) { return state.playerInfo.level; };
exports.getPlayerXp = function (state) { return state.playerInfo.xp; };
exports.isPlayerAlive = function (state) { return state.playerInfo.health > 0; };
exports.isPlayerShopLocked = function (state) { return state.cardShop.locked; };
exports.getOpponentId = function (state) { return state.playerInfo.opponentId; };
// todo use piece limit from board, remove this
exports.getPlayerBelowPieceLimit = function (state, playerId) {
    var ownedBoardPieceCount = board_1.BoardSelectors.getAllPieces(state.board).filter(function (p) { return p.ownerId === playerId; }).length;
    var level = exports.getPlayerLevel(state);
    return ownedBoardPieceCount < level;
};
exports.getMostExpensiveBenchPiece = function (state) {
    var benchPieces = Object.values(state.bench.pieces);
    if (!benchPieces.length) {
        return null;
    }
    benchPieces.sort(function (a, b) { return b.definition.cost - a.definition.cost; });
    return benchPieces[0];
};


/***/ }),

/***/ "../gamemode/lib/player/reducers.js":
/*!******************************************!*\
  !*** ../gamemode/lib/player/reducers.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var cardShop_1 = __webpack_require__(/*! ./cardShop */ "../gamemode/lib/player/cardShop.js");
__createBinding(exports, cardShop_1, "cardShopReducer");


/***/ }),

/***/ "../gamemode/lib/player/sagas/battle.js":
/*!**********************************************!*\
  !*** ../gamemode/lib/player/sagas/battle.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var events_1 = __webpack_require__(/*! ../events */ "../gamemode/lib/player/events.js");
var playerInfo_1 = __webpack_require__(/*! ../playerInfo */ "../gamemode/lib/player/playerInfo/index.js");
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

/***/ "../gamemode/lib/player/sagas/evolution.js":
/*!*************************************************!*\
  !*** ../gamemode/lib/player/sagas/evolution.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
var pieceSelectors = __webpack_require__(/*! ../pieceSelectors */ "../gamemode/lib/player/pieceSelectors.js");
var definitions_1 = __webpack_require__(/*! ../../definitions */ "../gamemode/lib/definitions/index.js");
var pieceCanEvolve = function (piece) {
    var stages = definitions_1.getDefinitionById(piece.definitionId).stages;
    return piece.stage < stages.length - 1;
};
exports.evolutionSagaFactory = function (_a) {
    var boardSlice = _a.boardSlice, benchSlice = _a.benchSlice;
    return function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeLatest(
                    // need to check when bench/board pieces are added (could have come from shop)
                    // or when board piece is updated (could be due to a previous evolution)
                    [boardSlice.commands.addBoardPieceCommand, benchSlice.commands.addBoardPieceCommand], function (_a) {
                        var boardLocked, state, targetDefinitionId, targetStage, getCombinablePieces, matchingBoardPieces, matchingBenchPieces, totalInstances, pieceToReplace_1, piecePosition, boardPieceIds, benchPieceIds, newPiece, x, y, benchPieceIds, newPiece, _b, x, y;
                        var piece = _a.payload.piece;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (!pieceCanEvolve(piece)) {
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, effects_1.select(function (s) { return s.board.locked; })];
                                case 1:
                                    boardLocked = _c.sent();
                                    if (!boardLocked) return [3 /*break*/, 4];
                                    // todo check if we have 3 evolvable pieces on the bench and evolve those? maybe
                                    return [4 /*yield*/, effects_1.take(boardSlice.commands.unlockBoardCommand)];
                                case 2:
                                    // todo check if we have 3 evolvable pieces on the bench and evolve those? maybe
                                    _c.sent();
                                    return [4 /*yield*/, effects_1.delay(500)];
                                case 3:
                                    _c.sent();
                                    _c.label = 4;
                                case 4: return [4 /*yield*/, effects_1.select()];
                                case 5:
                                    state = _c.sent();
                                    targetDefinitionId = piece.definitionId;
                                    targetStage = piece.stage;
                                    getCombinablePieces = function (pieces) { return pieces.filter(function (p) { return p.stage === targetStage; }); };
                                    matchingBoardPieces = getCombinablePieces(pieceSelectors.getPiecesForDefinition(state.board, targetDefinitionId));
                                    matchingBenchPieces = getCombinablePieces(pieceSelectors.getPiecesForDefinition(state.bench, targetDefinitionId));
                                    totalInstances = matchingBoardPieces.length + matchingBenchPieces.length;
                                    if (totalInstances < models_1.PIECES_TO_EVOLVE) {
                                        return [2 /*return*/];
                                    }
                                    if (!(matchingBoardPieces.length > 0)) return [3 /*break*/, 10];
                                    pieceToReplace_1 = matchingBoardPieces.pop();
                                    return [4 /*yield*/, effects_1.select(function (s) { return board_1.BoardSelectors.getPiecePosition(s.board, pieceToReplace_1.id); })];
                                case 6:
                                    piecePosition = _c.sent();
                                    boardPieceIds = __spread(matchingBoardPieces, [pieceToReplace_1]).map(function (p) { return p.id; });
                                    return [4 /*yield*/, effects_1.put(boardSlice.commands.removeBoardPiecesCommand(boardPieceIds))];
                                case 7:
                                    _c.sent();
                                    benchPieceIds = matchingBenchPieces.map(function (p) { return p.id; });
                                    return [4 /*yield*/, effects_1.put(benchSlice.commands.removeBoardPiecesCommand(__spread(benchPieceIds, [piece.id])))];
                                case 8:
                                    _c.sent();
                                    newPiece = __assign(__assign({}, pieceToReplace_1), { stage: targetStage + 1 });
                                    x = piecePosition.x, y = piecePosition.y;
                                    return [4 /*yield*/, effects_1.put(boardSlice.commands.addBoardPieceCommand({ x: x, y: y, piece: newPiece }))];
                                case 9:
                                    _c.sent();
                                    return [3 /*break*/, 13];
                                case 10:
                                    benchPieceIds = matchingBenchPieces.map(function (p) { return p.id; });
                                    newPiece = __assign(__assign({}, piece), { stage: targetStage + 1 });
                                    _b = board_1.BoardSelectors.getPiecePosition(state.bench, piece.id), x = _b.x, y = _b.y;
                                    return [4 /*yield*/, effects_1.put(benchSlice.commands.removeBoardPiecesCommand(__spread(benchPieceIds, [piece.id])))];
                                case 11:
                                    _c.sent();
                                    return [4 /*yield*/, effects_1.put(benchSlice.commands.addBoardPieceCommand({ x: x, y: y, piece: newPiece }))];
                                case 12:
                                    _c.sent();
                                    _c.label = 13;
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

/***/ "../gamemode/lib/player/sagas/fillBoard.js":
/*!*************************************************!*\
  !*** ../gamemode/lib/player/sagas/fillBoard.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var board_1 = __webpack_require__(/*! @creature-chess/board */ "../board/lib/index.js");
var playerSelectors_1 = __webpack_require__(/*! ../playerSelectors */ "../gamemode/lib/player/playerSelectors.js");
var playerGameActions_1 = __webpack_require__(/*! ../playerGameActions */ "../gamemode/lib/player/playerGameActions/index.js");
var FILL_BOARD_COMMAND = "FILL_BOARD_COMMAND";
exports.fillBoardCommand = function () { return ({ type: FILL_BOARD_COMMAND }); };
exports.fillBoardSagaFactory = function (playerId) {
    return function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeEvery(FILL_BOARD_COMMAND, function () {
                        var isAlive, state, belowPieceLimit, benchPiece, destination, benchPiecePosition, fromLocation, toLocation;
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
                                    destination = board_1.BoardSelectors.getFirstEmptySlot(state.board);
                                    if (!destination) {
                                        return [2 /*return*/];
                                    }
                                    benchPiecePosition = board_1.BoardSelectors.getPiecePosition(state.bench, benchPiece.id);
                                    fromLocation = {
                                        type: "bench",
                                        location: benchPiecePosition
                                    };
                                    toLocation = {
                                        type: "board",
                                        location: {
                                            x: destination.x,
                                            y: destination.y
                                        }
                                    };
                                    return [4 /*yield*/, effects_1.put(playerGameActions_1.dropPiecePlayerAction({
                                            pieceId: benchPiece.id,
                                            from: fromLocation,
                                            to: toLocation
                                        }))];
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

/***/ "../gamemode/lib/player/sagas/health.js":
/*!**********************************************!*\
  !*** ../gamemode/lib/player/sagas/health.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var commands_1 = __webpack_require__(/*! ../playerInfo/commands */ "../gamemode/lib/player/playerInfo/commands.js");
var HEALTH_SUBTRACT_COMMAND = "HEALTH_SUBTRACT_COMMAND";
exports.subtractHealthCommand = function (amount) { return ({
    type: HEALTH_SUBTRACT_COMMAND,
    payload: { amount: amount }
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
                            var amount = _a.payload.amount;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, effects_1.select()];
                                    case 1:
                                        state = _b.sent();
                                        oldValue = state.playerInfo.health;
                                        newValue = oldValue - amount;
                                        newValue = (newValue < 0) ? 0 : newValue;
                                        return [4 /*yield*/, effects_1.put(commands_1.updateHealthCommand(newValue))];
                                    case 2:
                                        _b.sent();
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

/***/ "../gamemode/lib/player/sagas/index.js":
/*!*********************************************!*\
  !*** ../gamemode/lib/player/sagas/index.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var evolution_1 = __webpack_require__(/*! ./evolution */ "../gamemode/lib/player/sagas/evolution.js");
__createBinding(exports, evolution_1, "evolutionSagaFactory");
var fillBoard_1 = __webpack_require__(/*! ./fillBoard */ "../gamemode/lib/player/sagas/fillBoard.js");
__createBinding(exports, fillBoard_1, "fillBoardCommand");
__createBinding(exports, fillBoard_1, "fillBoardSagaFactory");
var health_1 = __webpack_require__(/*! ./health */ "../gamemode/lib/player/sagas/health.js");
__createBinding(exports, health_1, "subtractHealthCommand");
__createBinding(exports, health_1, "healthSagaFactory");
var xp_1 = __webpack_require__(/*! ./xp */ "../gamemode/lib/player/sagas/xp.js");
__createBinding(exports, xp_1, "addXpCommand");
__createBinding(exports, xp_1, "xpSagaFactory");
var battle_1 = __webpack_require__(/*! ./battle */ "../gamemode/lib/player/sagas/battle.js");
__createBinding(exports, battle_1, "playerBattle");
var matchRewards_1 = __webpack_require__(/*! ./matchRewards */ "../gamemode/lib/player/sagas/matchRewards.js");
__createBinding(exports, matchRewards_1, "playerMatchRewards");
var playerPropertyUpdates_1 = __webpack_require__(/*! ./playerPropertyUpdates */ "../gamemode/lib/player/sagas/playerPropertyUpdates.js");
__createBinding(exports, playerPropertyUpdates_1, "createPropertyUpdateRegistry");


/***/ }),

/***/ "../gamemode/lib/player/sagas/matchRewards.js":
/*!****************************************************!*\
  !*** ../gamemode/lib/player/sagas/matchRewards.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var events_1 = __webpack_require__(/*! ../events */ "../gamemode/lib/player/events.js");
var commands_1 = __webpack_require__(/*! ../playerInfo/commands */ "../gamemode/lib/player/playerInfo/commands.js");
var xp_1 = __webpack_require__(/*! ./xp */ "../gamemode/lib/player/sagas/xp.js");
var health_1 = __webpack_require__(/*! ./health */ "../gamemode/lib/player/sagas/health.js");
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
    return { total: total, base: base, winBonus: winBonus, streakBonus: streakBonus, interest: interest };
};
var updateStreak = function (win) {
    var type, existingStreak, newAmount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = win ? models_1.StreakType.WIN : models_1.StreakType.LOSS;
                return [4 /*yield*/, effects_1.select(function (state) { return state.playerInfo.streak; })];
            case 1:
                existingStreak = _a.sent();
                newAmount = (type === existingStreak.type) ? existingStreak.amount + 1 : 0;
                return [4 /*yield*/, effects_1.put(commands_1.updateStreakCommand(type, newAmount))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
exports.playerMatchRewards = function (playerId) {
    return function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.takeLatest(events_1.PLAYER_FINISH_MATCH_EVENT, function (_a) {
                        var win, damage, oldValue, newValue, justDied, currentRound, currentMoney, streak, _b, total, base, winBonus, streakBonus, interest;
                        var _c = _a.payload, homeScore = _c.homeScore, awayScore = _c.awayScore;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    win = homeScore > awayScore;
                                    return [4 /*yield*/, effects_1.call(updateStreak, win)];
                                case 1:
                                    _d.sent();
                                    damage = awayScore * models_1.HEALTH_LOST_PER_PIECE;
                                    return [4 /*yield*/, effects_1.select(function (_a) {
                                            var health = _a.playerInfo.health;
                                            return health;
                                        })];
                                case 2:
                                    oldValue = _d.sent();
                                    return [4 /*yield*/, effects_1.put(health_1.subtractHealthCommand(damage))];
                                case 3:
                                    _d.sent();
                                    // subtractHealthCommand emits an UPDATE_HEALTH_COMMAND so need to wait for that.
                                    // todo this is ugly
                                    return [4 /*yield*/, effects_1.take(commands_1.UPDATE_HEALTH_COMMAND)];
                                case 4:
                                    // subtractHealthCommand emits an UPDATE_HEALTH_COMMAND so need to wait for that.
                                    // todo this is ugly
                                    _d.sent();
                                    return [4 /*yield*/, effects_1.select(function (_a) {
                                            var health = _a.playerInfo.health;
                                            return health;
                                        })];
                                case 5:
                                    newValue = _d.sent();
                                    justDied = (newValue === 0 && oldValue !== 0);
                                    if (!justDied) return [3 /*break*/, 8];
                                    return [4 /*yield*/, effects_1.select(function (_a) {
                                            var round = _a.roundInfo.round;
                                            return round;
                                        })];
                                case 6:
                                    currentRound = _d.sent();
                                    return [4 /*yield*/, effects_1.put(commands_1.updateRoundDiedAtCommand(currentRound))];
                                case 7:
                                    _d.sent();
                                    _d.label = 8;
                                case 8: return [4 /*yield*/, effects_1.select(function (_a) {
                                        var money = _a.playerInfo.money;
                                        return money;
                                    })];
                                case 9:
                                    currentMoney = _d.sent();
                                    return [4 /*yield*/, effects_1.select(function (_a) {
                                            var amount = _a.playerInfo.streak.amount;
                                            return amount;
                                        })];
                                case 10:
                                    streak = _d.sent();
                                    _b = getMoneyForMatch(currentMoney, streak, win), total = _b.total, base = _b.base, winBonus = _b.winBonus, streakBonus = _b.streakBonus, interest = _b.interest;
                                    return [4 /*yield*/, effects_1.put(events_1.playerMatchRewardsEvent({
                                            damage: damage,
                                            justDied: justDied,
                                            rewardMoney: { total: total, base: base, winBonus: winBonus, streakBonus: streakBonus, interest: interest }
                                        }))];
                                case 11:
                                    _d.sent();
                                    // wait for preparing phase to give money
                                    return [4 /*yield*/, effects_1.take(commands_1.CLEAR_OPPONENT_COMMAND)];
                                case 12:
                                    // wait for preparing phase to give money
                                    _d.sent();
                                    return [4 /*yield*/, effects_1.put(events_1.playerMatchRewardsEvent(null))];
                                case 13:
                                    _d.sent();
                                    // todo make addMoneyCommand
                                    return [4 /*yield*/, effects_1.put(commands_1.updateMoneyCommand(currentMoney + total))];
                                case 14:
                                    // todo make addMoneyCommand
                                    _d.sent();
                                    return [4 /*yield*/, effects_1.put(xp_1.addXpCommand(1))];
                                case 15:
                                    _d.sent();
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

/***/ "../gamemode/lib/player/sagas/playerPropertyUpdates.js":
/*!*************************************************************!*\
  !*** ../gamemode/lib/player/sagas/playerPropertyUpdates.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var playerInfo_1 = __webpack_require__(/*! ../playerInfo */ "../gamemode/lib/player/playerInfo/index.js");
var playerGameActions_1 = __webpack_require__(/*! ../playerGameActions */ "../gamemode/lib/player/playerGameActions/index.js");
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
                    return [4 /*yield*/, effects_1.takeLatest(playerGameActions_1.readyUpPlayerAction.toString(), function () {
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

/***/ "../gamemode/lib/player/sagas/xp.js":
/*!******************************************!*\
  !*** ../gamemode/lib/player/sagas/xp.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../models/lib/index.js");
var commands_1 = __webpack_require__(/*! ../playerInfo/commands */ "../gamemode/lib/player/playerInfo/commands.js");
var ADD_XP_COMMAND = "ADD_XP_COMMAND";
exports.addXpCommand = function (amount) { return ({
    type: ADD_XP_COMMAND,
    payload: { amount: amount }
}); };
exports.xpSagaFactory = function (_a) {
    var boardSlice = _a.boardSlice;
    return function () {
        var amount, level, xp, oldLevel, i, toNextLevel, newXp, inPreparingPhase;
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
                    oldLevel = level;
                    for (i = 0; i < amount; i++) {
                        toNextLevel = models_1.getXpToNextLevel(level);
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
                    if (!(level !== oldLevel)) return [3 /*break*/, 7];
                    return [4 /*yield*/, effects_1.select(function (state) { return state.roundInfo.phase === models_1.GamePhase.PREPARING; })];
                case 5:
                    inPreparingPhase = _a.sent();
                    if (!inPreparingPhase) return [3 /*break*/, 7];
                    return [4 /*yield*/, effects_1.put(boardSlice.commands.setPieceLimitCommand(level))];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 0];
                case 8: return [2 /*return*/];
            }
        });
    };
};


/***/ }),

/***/ "../gamemode/lib/player/store.js":
/*!***************************************!*\
  !*** ../gamemode/lib/player/store.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var redux_1 = __webpack_require__(/*! redux */ "../gamemode/node_modules/redux/es/redux.js");
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "../gamemode/node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
var effects_1 = __webpack_require__(/*! @redux-saga/core/effects */ "../gamemode/node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js");
var playerInfo_1 = __webpack_require__(/*! ./playerInfo */ "../gamemode/lib/player/playerInfo/index.js");
var sagas_1 = __webpack_require__(/*! ./sagas */ "../gamemode/lib/player/sagas/index.js");
var roundInfo_1 = __webpack_require__(/*! ../game/roundInfo */ "../gamemode/lib/game/roundInfo/index.js");
var cardShop_1 = __webpack_require__(/*! ./cardShop */ "../gamemode/lib/player/cardShop.js");
var playerGameActions_1 = __webpack_require__(/*! ./playerGameActions */ "../gamemode/lib/player/playerGameActions/index.js");
exports.createPlayerStore = function (getLogger, playerId, playerName, boardSlices) {
    var rootSaga = function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = effects_1.all;
                    return [4 /*yield*/, effects_1.fork(playerGameActions_1.playerGameActionsSaga)];
                case 1:
                    _b = [
                        _c.sent()
                    ];
                    return [4 /*yield*/, effects_1.fork(sagas_1.evolutionSagaFactory(boardSlices))];
                case 2:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(sagas_1.healthSagaFactory())];
                case 3:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(sagas_1.xpSagaFactory(boardSlices))];
                case 4:
                    _b = _b.concat([
                        _c.sent()
                    ]);
                    return [4 /*yield*/, effects_1.fork(sagas_1.fillBoardSagaFactory(playerId))];
                case 5: return [4 /*yield*/, _a.apply(void 0, [_b.concat([
                            _c.sent()
                        ])])];
                case 6:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    };
    var sagaMiddleware = redux_saga_1["default"]({
        context: {
            playerId: playerId,
            playerName: playerName,
            boardSlices: boardSlices,
            dependencies: {
                getLogger: getLogger
            }
        }
    });
    var store = redux_1.createStore(redux_1.combineReducers({
        board: boardSlices.boardSlice.boardReducer,
        bench: boardSlices.benchSlice.boardReducer,
        playerInfo: playerInfo_1.playerInfoReducer,
        roundInfo: roundInfo_1.roundInfoReducer,
        cardShop: cardShop_1.cardShopReducer
    }), redux_1.applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return {
        store: store,
        sagaMiddleware: sagaMiddleware
    };
};


/***/ }),

/***/ "../models/lib/constants.js":
/*!**********************************!*\
  !*** ../models/lib/constants.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
exports.__esModule = true;
exports.LOBBY_WAIT_TIME = exports.MAX_PLAYERS_IN_GAME = exports.MAX_NAME_LENGTH = exports.DAMAGE_RATIO = exports.DEFAULT_TURN_DURATION = exports.DEFAULT_TURN_COUNT = exports.PIECES_TO_EVOLVE = exports.BUY_XP_AMOUNT = exports.BUY_XP_COST = exports.HEALTH_LOST_PER_PIECE = exports.MAX_PLAYER_LEVEL = exports.STARTING_HEALTH = exports.STARTING_LEVEL = exports.STARTING_MONEY = exports.REROLL_COST = exports.PHASE_LENGTHS = exports.GRID_SIZE = void 0;
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
exports.MAX_PLAYER_LEVEL = 10;
exports.HEALTH_LOST_PER_PIECE = 3;
exports.BUY_XP_COST = 5;
exports.BUY_XP_AMOUNT = 4;
exports.PIECES_TO_EVOLVE = 3;
exports.DEFAULT_TURN_COUNT = 300;
exports.DEFAULT_TURN_DURATION = 100;
exports.DAMAGE_RATIO = 7;
exports.MAX_NAME_LENGTH = 16;
exports.MAX_PLAYERS_IN_GAME = 8;
exports.LOBBY_WAIT_TIME = 90;


/***/ }),

/***/ "../models/lib/creatureDefinition.js":
/*!*******************************************!*\
  !*** ../models/lib/creatureDefinition.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

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
/***/ ((__unused_webpack_module, exports) => {

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
/***/ ((__unused_webpack_module, exports) => {

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

/***/ "../models/lib/getXpToNextLevel.js":
/*!*****************************************!*\
  !*** ../models/lib/getXpToNextLevel.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.getXpToNextLevel = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "../models/lib/constants.js");
var LOWER_XP = true;
var XP_TO_NEXT_LEVEL = LOWER_XP
    ? [
        1,
        1,
        2,
        4,
        8,
        13,
        18,
        24,
        30
    ]
    : [
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

/***/ "../models/lib/index.js":
/*!******************************!*\
  !*** ../models/lib/index.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var nickname_1 = __webpack_require__(/*! ./nickname */ "../models/lib/nickname.js");
__createBinding(exports, nickname_1, "validateNickname");
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "../models/lib/game-phase.js");
__createBinding(exports, game_phase_1, "GamePhase");
var titles_1 = __webpack_require__(/*! ./titles */ "../models/lib/titles.js");
__createBinding(exports, titles_1, "PLAYER_TITLES");
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
var options_1 = __webpack_require__(/*! ./options */ "../models/lib/options.js");
__createBinding(exports, options_1, "getOptions");
__createBinding(exports, options_1, "defaultOptions", "defaultGameOptions");
var getXpToNextLevel_1 = __webpack_require__(/*! ./getXpToNextLevel */ "../models/lib/getXpToNextLevel.js");
__createBinding(exports, getXpToNextLevel_1, "getXpToNextLevel");


/***/ }),

/***/ "../models/lib/nickname.js":
/*!*********************************!*\
  !*** ../models/lib/nickname.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.validateNickname = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "../models/lib/constants.js");
var NAME_REGEX = /^[a-zA-Z0-9\ ]*$/;
exports.validateNickname = function (nickname) {
    if (!nickname || !nickname.length || nickname.length < 4) {
        return "Nickname must be at least 4 characters long";
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

/***/ "../models/lib/options.js":
/*!********************************!*\
  !*** ../models/lib/options.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var constants_1 = __webpack_require__(/*! ./constants */ "../models/lib/constants.js");
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "../models/lib/game-phase.js");
exports.defaultOptions = {
    phaseLengths: constants_1.PHASE_LENGTHS,
    turnCount: constants_1.DEFAULT_TURN_COUNT,
    turnDuration: constants_1.DEFAULT_TURN_DURATION
};
exports.getOptions = function (options) {
    return __assign(__assign({}, exports.defaultOptions), options);
};


/***/ }),

/***/ "../models/lib/pieceCombat.js":
/*!************************************!*\
  !*** ../models/lib/pieceCombat.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

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
/***/ ((__unused_webpack_module, exports) => {

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
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.TileType = exports.getRelativeDirection = exports.Directions = exports.getDistance = exports.getDelta = exports.createTileCoordinates = void 0;
exports.createTileCoordinates = function (x, y) { return ({ x: x, y: y }); };
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


/***/ }),

/***/ "../models/lib/streakType.js":
/*!***********************************!*\
  !*** ../models/lib/streakType.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.StreakType = void 0;
var StreakType;
(function (StreakType) {
    StreakType[StreakType["WIN"] = 0] = "WIN";
    StreakType[StreakType["LOSS"] = 1] = "LOSS";
})(StreakType = exports.StreakType || (exports.StreakType = {}));


/***/ }),

/***/ "../models/lib/titles.js":
/*!*******************************!*\
  !*** ../models/lib/titles.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.PLAYER_TITLES = void 0;
var TITLES = {
    DEVELOPER: { className: "developer-001", text: "Developer" },
    CONTRIBUTOR: { className: "contributor-001", text: "Contributor" },
    HALL_OF_FAME: { className: "hall-of-fame-001", text: "Hall of Fame" }
};
exports.PLAYER_TITLES = {
    "276389458988761607": TITLES.DEVELOPER,
    "289896988988670470": TITLES.CONTRIBUTOR,
    "295493134844953090": TITLES.CONTRIBUTOR,
    "295122232268554758": TITLES.CONTRIBUTOR,
    "276850371065807367": TITLES.HALL_OF_FAME // huwbear
};


/***/ }),

/***/ "../networking/lib/client-to-server.js":
/*!*********************************************!*\
  !*** ../networking/lib/client-to-server.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.PacketOpcodes = void 0;
var PacketOpcodes;
(function (PacketOpcodes) {
    PacketOpcodes["FINISH_MATCH"] = "finishMatch";
    PacketOpcodes["SEND_PLAYER_ACTIONS"] = "sendPlayerActions";
})(PacketOpcodes = exports.PacketOpcodes || (exports.PacketOpcodes = {}));


/***/ }),

/***/ "../networking/lib/index.js":
/*!**********************************!*\
  !*** ../networking/lib/index.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var registry_1 = __webpack_require__(/*! ./registry */ "../networking/lib/registry/index.js");
__createBinding(exports, registry_1, "IncomingPacketRegistry");
__createBinding(exports, registry_1, "OutgoingPacketRegistry");
exports.ServerToClient = __webpack_require__(/*! ./server-to-client */ "../networking/lib/server-to-client/index.js");
exports.ClientToServer = __webpack_require__(/*! ./client-to-server */ "../networking/lib/client-to-server.js");


/***/ }),

/***/ "../networking/lib/registry/incoming-packet-registry.js":
/*!**************************************************************!*\
  !*** ../networking/lib/registry/incoming-packet-registry.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

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

/***/ "../networking/lib/registry/index.js":
/*!*******************************************!*\
  !*** ../networking/lib/registry/index.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var incoming_packet_registry_1 = __webpack_require__(/*! ./incoming-packet-registry */ "../networking/lib/registry/incoming-packet-registry.js");
__createBinding(exports, incoming_packet_registry_1, "IncomingPacketRegistry");
var outgoing_packet_registry_1 = __webpack_require__(/*! ./outgoing-packet-registry */ "../networking/lib/registry/outgoing-packet-registry.js");
__createBinding(exports, outgoing_packet_registry_1, "OutgoingPacketRegistry");


/***/ }),

/***/ "../networking/lib/registry/outgoing-packet-registry.js":
/*!**************************************************************!*\
  !*** ../networking/lib/registry/outgoing-packet-registry.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

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

/***/ "../networking/lib/server-to-client/index.js":
/*!***************************************************!*\
  !*** ../networking/lib/server-to-client/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.Game = __webpack_require__(/*! ./server-to-client-game */ "../networking/lib/server-to-client/server-to-client-game.js");
exports.Lobby = __webpack_require__(/*! ./server-to-client-lobby */ "../networking/lib/server-to-client/server-to-client-lobby.js");
exports.Menu = __webpack_require__(/*! ./server-to-client-menu */ "../networking/lib/server-to-client/server-to-client-menu.js");


/***/ }),

/***/ "../networking/lib/server-to-client/server-to-client-game.js":
/*!*******************************************************************!*\
  !*** ../networking/lib/server-to-client/server-to-client-game.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.PacketOpcodes = void 0;
var PacketOpcodes;
(function (PacketOpcodes) {
    PacketOpcodes["BENCH_UPDATE"] = "benchUpdate";
    PacketOpcodes["BOARD_UPDATE"] = "boardUpdate";
    PacketOpcodes["CARDS_UPDATE"] = "cardsUpdate";
    PacketOpcodes["PLAYER_LIST_UPDATE"] = "playerListUpdate";
    PacketOpcodes["PHASE_UPDATE"] = "phaseUpdate";
    PacketOpcodes["MONEY_UPDATE"] = "moneyUpdate";
    PacketOpcodes["HEALTH_UPDATE"] = "healthUpdate";
    PacketOpcodes["LEVEL_UPDATE"] = "levelUpdate";
    PacketOpcodes["FINISH_GAME"] = "finishGame";
    PacketOpcodes["SHOP_LOCK_UPDATE"] = "shopLockUpdate";
    PacketOpcodes["MATCH_REWARDS"] = "matchRewards";
    PacketOpcodes["PLAYER_DEAD"] = "playerDead";
})(PacketOpcodes = exports.PacketOpcodes || (exports.PacketOpcodes = {}));


/***/ }),

/***/ "../networking/lib/server-to-client/server-to-client-lobby.js":
/*!********************************************************************!*\
  !*** ../networking/lib/server-to-client/server-to-client-lobby.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.PacketOpcodes = void 0;
var PacketOpcodes;
(function (PacketOpcodes) {
    PacketOpcodes["LOBBY_GAME_STARTED"] = "lobbyGameStarted";
    PacketOpcodes["LOBBY_PLAYER_UPDATE"] = "lobbyPlayerUpdate";
})(PacketOpcodes = exports.PacketOpcodes || (exports.PacketOpcodes = {}));


/***/ }),

/***/ "../networking/lib/server-to-client/server-to-client-menu.js":
/*!*******************************************************************!*\
  !*** ../networking/lib/server-to-client/server-to-client-menu.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.PacketOpcodes = void 0;
var PacketOpcodes;
(function (PacketOpcodes) {
    PacketOpcodes["LOBBY_CONNECTED"] = "lobbyConnected";
    PacketOpcodes["GAME_CONNECTED"] = "gameConnected";
})(PacketOpcodes = exports.PacketOpcodes || (exports.PacketOpcodes = {}));


/***/ }),

/***/ "?98fa":
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {}
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/index.tsx","vendors-node_modules_auth0_auth0-react_dist_auth0-react_esm_js-node_modules_fortawesome_free--94ba37"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_creature_chess_app"] = self["webpackChunk_creature_chess_app"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	__webpack_require__.x();
/******/ })()
;