/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.tsx":
/*!*********************!*\
  !*** ./src/app.tsx ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.App = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_modal_1 = __importDefault(__webpack_require__(/*! react-modal */ "../../node_modules/react-modal/lib/index.js"));
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "../../node_modules/react-router-dom/index.js");
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "../../node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var auth_web_1 = __webpack_require__(/*! @creature-chess/auth-web */ "../../modules/@creature-chess/auth-web/index.ts");
var ui_1 = __webpack_require__(/*! @creature-chess/ui */ "../../modules/@creature-chess/ui/index.ts");
var patchUser_1 = __webpack_require__(/*! ./patchUser */ "./src/patchUser.ts");
var UnauthenticatedRootPage = function () {
    var _a = (0, auth0_react_1.useAuth0)(), loginWithRedirect = _a.loginWithRedirect, isLoading = _a.isLoading;
    return React.createElement(ui_1.LoginPage, { isLoading: isLoading, onSignInClick: loginWithRedirect });
};
var UnauthenticatedRoutes = function () { return (React.createElement(react_router_dom_1.Routes, null,
    React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(UnauthenticatedRootPage, null) }))); };
var AuthenticatedRootPage = function () {
    var _a = (0, auth0_react_1.useAuth0)(), user = _a.user, logout = _a.logout, getAccessTokenSilently = _a.getAccessTokenSilently, getIdTokenClaims = _a.getIdTokenClaims;
    // todo move the contexts out of here
    if (!(0, auth_web_1.isRegistered)(user)) {
        var updateUser = function (nickname, image) { return __awaiter(void 0, void 0, void 0, function () {
            var token, response, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getAccessTokenSilently()];
                    case 1:
                        token = _a.sent();
                        return [4 /*yield*/, (0, patchUser_1.patchUser)(token, nickname, image)];
                    case 2:
                        response = _a.sent();
                        if (!(response.status === 400)) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json()];
                    case 3:
                        error = (_a.sent()).error;
                        return [2 /*return*/, { error: error }];
                    case 4:
                        if (!(response.status === 200)) return [3 /*break*/, 7];
                        return [4 /*yield*/, getAccessTokenSilently({ ignoreCache: true })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, getIdTokenClaims()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, { error: null }];
                    case 7: return [2 /*return*/, { error: "An unknown error occured" }];
                }
            });
        }); };
        return React.createElement(ui_1.RegistrationPage, { updateUser: updateUser });
    }
    var onLogoutClick = function () { return logout(); };
    var onFindGameClick = function () {
        window.location.href = "https://creaturechess.com/game/";
    };
    var menuPageContext = {
        findGame: onFindGameClick,
        auth: {
            logout: onLogoutClick
        }
    };
    return (React.createElement(ui_1.MenuPageContextProvider, { value: menuPageContext },
        React.createElement(ui_1.MenuPage, null)));
};
var AuthenticatedRoutes = function () { return (React.createElement(react_router_dom_1.Routes, null,
    React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(AuthenticatedRootPage, null) }))); };
react_modal_1["default"].setAppElement("#approot");
var App = function () {
    var _a = (0, auth0_react_1.useAuth0)(), isAuthenticated = _a.isAuthenticated, isLoading = _a.isLoading;
    (0, ui_1.useGlobalStyles)();
    if (isLoading) {
        return React.createElement("span", null, "Loading");
    }
    if (isAuthenticated) {
        return React.createElement(AuthenticatedRoutes, null);
    }
    return React.createElement(UnauthenticatedRoutes, null);
};
exports.App = App;


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var ReactDOM = __importStar(__webpack_require__(/*! react-dom */ "../../node_modules/react-dom/index.js"));
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "../../node_modules/react-router-dom/index.js");
var Sentry = __importStar(__webpack_require__(/*! @sentry/react */ "../../node_modules/@sentry/react/esm/index.js"));
var tracing_1 = __webpack_require__(/*! @sentry/tracing */ "../../node_modules/@sentry/tracing/esm/index.js");
var auth_web_1 = __webpack_require__(/*! @creature-chess/auth-web */ "../../modules/@creature-chess/auth-web/index.ts");
var app_1 = __webpack_require__(/*! ./app */ "./src/app.tsx");
if (true) {
    Sentry.init({
        dsn: "https://aa3e547dcf464bbcb7bdd7f36c18d334@o571659.ingest.sentry.io/5720153",
        environment:  false ? 0 : "production",
        integrations: [new tracing_1.Integrations.BrowserTracing()],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0
    });
}
var BrowserRouterChild = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var onRedirectCallback = function (appState) {
        // Use the router's history module to replace the url
        navigate((appState === null || appState === void 0 ? void 0 : appState.returnTo) || window.location.pathname);
    };
    return (React.createElement(auth_web_1.AuthProvider, { onRedirectCallback: onRedirectCallback },
        React.createElement(app_1.App, null)));
};
ReactDOM.render(React.createElement(react_router_dom_1.BrowserRouter, null,
    React.createElement(BrowserRouterChild, null)), document.getElementById("approot"));


/***/ }),

/***/ "./src/patchUser.ts":
/*!**************************!*\
  !*** ./src/patchUser.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.patchUser = void 0;
var CURRENT_USER_ENDPOINT = "".concat("https://creaturechess.com/info", "/user/current");
var patchUser = function (token, nickname, picture) { return fetch(CURRENT_USER_ENDPOINT, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
    },
    body: JSON.stringify({ nickname: nickname, picture: picture })
}); };
exports.patchUser = patchUser;


/***/ }),

/***/ "../../modules/@creature-chess/auth-web/config.ts":
/*!********************************************************!*\
  !*** ../../modules/@creature-chess/auth-web/config.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.auth0Config = void 0;
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
exports.auth0Config = {
    domain: models_1.config.auth0.domain,
    clientID: models_1.config.auth0.spaClientId,
    redirectUri: models_1.config.appUrl,
    logoutRedirectUri: models_1.config.appUrl,
    audience: "https://".concat(models_1.config.auth0.domain, "/api/v2/"),
    scope: "openid profile email"
};


/***/ }),

/***/ "../../modules/@creature-chess/auth-web/index.ts":
/*!*******************************************************!*\
  !*** ../../modules/@creature-chess/auth-web/index.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.usePlayerId = exports.hasNickname = exports.isRegistered = exports.AuthProvider = void 0;
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "../../node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var provider_1 = __webpack_require__(/*! ./provider */ "../../modules/@creature-chess/auth-web/provider.tsx");
__createBinding(exports, provider_1, "AuthProvider");
var isRegistered_1 = __webpack_require__(/*! ./isRegistered */ "../../modules/@creature-chess/auth-web/isRegistered.ts");
__createBinding(exports, isRegistered_1, "isRegistered");
__createBinding(exports, isRegistered_1, "hasNickname");
var usePlayerId = function () {
    var user = (0, auth0_react_1.useAuth0)().user;
    if (!user) {
        return "";
    }
    return user["https://creaturechess.jamesmonger.com/playerId"];
};
exports.usePlayerId = usePlayerId;


/***/ }),

/***/ "../../modules/@creature-chess/auth-web/isRegistered.ts":
/*!**************************************************************!*\
  !*** ../../modules/@creature-chess/auth-web/isRegistered.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.isRegistered = exports.hasNickname = void 0;
var namespace = "https://creaturechess.jamesmonger.com";
var hasNickname = function (user) {
    return Boolean(user && user["".concat(namespace, "/playerNickname")] !== null);
};
exports.hasNickname = hasNickname;
var isRegistered = function (user) {
    return Boolean(user && user["".concat(namespace, "/playerNickname")] !== null && user["".concat(namespace, "/playerPicture")] !== null);
};
exports.isRegistered = isRegistered;


/***/ }),

/***/ "../../modules/@creature-chess/auth-web/provider.tsx":
/*!***********************************************************!*\
  !*** ../../modules/@creature-chess/auth-web/provider.tsx ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AuthProvider = void 0;
var react_1 = __importDefault(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "../../node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var config_1 = __webpack_require__(/*! ./config */ "../../modules/@creature-chess/auth-web/config.ts");
var AuthProvider = function (_a) {
    var children = _a.children, onRedirectCallback = _a.onRedirectCallback;
    return (react_1["default"].createElement(auth0_react_1.Auth0Provider, { domain: config_1.auth0Config.domain, clientId: config_1.auth0Config.clientID, redirectUri: config_1.auth0Config.redirectUri, audience: config_1.auth0Config.audience, scope: config_1.auth0Config.scope, cacheLocation: "localstorage", onRedirectCallback: onRedirectCallback, useRefreshTokens: true }, children));
};
exports.AuthProvider = AuthProvider;


/***/ }),

/***/ "../../modules/@creature-chess/models/index.ts":
/*!*****************************************************!*\
  !*** ../../modules/@creature-chess/models/index.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.Builders = exports.config = exports.QuickChatOption = exports.getXpToNextLevel = exports.defaultGameOptions = exports.getOptions = exports.clonePieceCombatState = exports.createPieceCombatState = exports.CreatureType = exports.DefinitionClass = exports.attackTypes = exports.getRelativeDirection = exports.getDelta = exports.getDistance = exports.createTileCoordinates = exports.Directions = exports.TileType = exports.TITLES = exports.PlayerTitle = exports.GamePhase = exports.validateNicknameFormat = exports.Constants = exports.StreakType = exports.finishedBattle = exports.inProgressBattle = exports.PlayerBattleStatus = exports.PlayerStatus = void 0;
var player_list_player_1 = __webpack_require__(/*! ./src/player-list-player */ "../../modules/@creature-chess/models/src/player-list-player.ts");
__createBinding(exports, player_list_player_1, "PlayerStatus");
__createBinding(exports, player_list_player_1, "PlayerBattleStatus");
__createBinding(exports, player_list_player_1, "inProgressBattle");
__createBinding(exports, player_list_player_1, "finishedBattle");
var streakType_1 = __webpack_require__(/*! ./src/streakType */ "../../modules/@creature-chess/models/src/streakType.ts");
__createBinding(exports, streakType_1, "StreakType");
var Constants = __importStar(__webpack_require__(/*! ./src/constants */ "../../modules/@creature-chess/models/src/constants.ts"));
exports.Constants = Constants;
__exportStar(__webpack_require__(/*! ./src/constants */ "../../modules/@creature-chess/models/src/constants.ts"), exports);
var nickname_1 = __webpack_require__(/*! ./src/nickname */ "../../modules/@creature-chess/models/src/nickname.ts");
__createBinding(exports, nickname_1, "validateNicknameFormat");
var game_phase_1 = __webpack_require__(/*! ./src/game-phase */ "../../modules/@creature-chess/models/src/game-phase.ts");
__createBinding(exports, game_phase_1, "GamePhase");
var titles_1 = __webpack_require__(/*! ./src/titles */ "../../modules/@creature-chess/models/src/titles.ts");
__createBinding(exports, titles_1, "PlayerTitle");
__createBinding(exports, titles_1, "TITLES");
var position_1 = __webpack_require__(/*! ./src/position */ "../../modules/@creature-chess/models/src/position.ts");
__createBinding(exports, position_1, "TileType");
__createBinding(exports, position_1, "Directions");
__createBinding(exports, position_1, "createTileCoordinates");
__createBinding(exports, position_1, "getDistance");
__createBinding(exports, position_1, "getDelta");
__createBinding(exports, position_1, "getRelativeDirection");
var creatureDefinition_1 = __webpack_require__(/*! ./src/creatureDefinition */ "../../modules/@creature-chess/models/src/creatureDefinition.ts");
__createBinding(exports, creatureDefinition_1, "attackTypes");
__createBinding(exports, creatureDefinition_1, "DefinitionClass");
var creatureType_1 = __webpack_require__(/*! ./src/creatureType */ "../../modules/@creature-chess/models/src/creatureType.ts");
__createBinding(exports, creatureType_1, "CreatureType");
var pieceCombat_1 = __webpack_require__(/*! ./src/pieceCombat */ "../../modules/@creature-chess/models/src/pieceCombat.ts");
__createBinding(exports, pieceCombat_1, "createPieceCombatState");
__createBinding(exports, pieceCombat_1, "clonePieceCombatState");
var options_1 = __webpack_require__(/*! ./src/options */ "../../modules/@creature-chess/models/src/options.ts");
__createBinding(exports, options_1, "getOptions");
__createBinding(exports, options_1, "defaultOptions", "defaultGameOptions");
var getXpToNextLevel_1 = __webpack_require__(/*! ./src/getXpToNextLevel */ "../../modules/@creature-chess/models/src/getXpToNextLevel.ts");
__createBinding(exports, getXpToNextLevel_1, "getXpToNextLevel");
var quickChat_1 = __webpack_require__(/*! ./src/quickChat */ "../../modules/@creature-chess/models/src/quickChat.ts");
__createBinding(exports, quickChat_1, "QuickChatOption");
var config_1 = __webpack_require__(/*! ./src/config */ "../../modules/@creature-chess/models/src/config/index.ts");
__createBinding(exports, config_1, "config");
exports.Builders = __importStar(__webpack_require__(/*! ./src/builders */ "../../modules/@creature-chess/models/src/builders/index.ts"));


/***/ }),

/***/ "../../modules/@creature-chess/models/src/builders/index.ts":
/*!******************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/builders/index.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.buildCard = exports.buildPieceModel = exports.buildDefinition = void 0;
var creatureDefinition_1 = __webpack_require__(/*! ../creatureDefinition */ "../../modules/@creature-chess/models/src/creatureDefinition.ts");
var creatureType_1 = __webpack_require__(/*! ../creatureType */ "../../modules/@creature-chess/models/src/creatureType.ts");
var buildDefinition = function (definition) {
    if (definition === void 0) { definition = {}; }
    return (__assign({ id: 1, name: "Creature", type: creatureType_1.CreatureType.Earth, "class": creatureDefinition_1.DefinitionClass.ARCANE, cost: 1, stages: [] }, definition));
};
exports.buildDefinition = buildDefinition;
var buildPieceModel = function (piece) {
    if (piece === void 0) { piece = {}; }
    return (__assign({ id: "123", ownerId: "abc", definitionId: 1, definition: (0, exports.buildDefinition)(), facingAway: false, maxHealth: 100, currentHealth: 100, stage: 0 }, piece));
};
exports.buildPieceModel = buildPieceModel;
var buildCard = function (card) {
    if (card === void 0) { card = {}; }
    return (__assign({ id: "123", name: "Card", definitionId: 1, type: creatureType_1.CreatureType.Metal, "class": creatureDefinition_1.DefinitionClass.ARCANE, cost: 1 }, card));
};
exports.buildCard = buildCard;


/***/ }),

/***/ "../../modules/@creature-chess/models/src/config/config.live.ts":
/*!**********************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/config/config.live.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.config = void 0;
exports.config = {
    auth0: {
        domain: "creaturechess.eu.auth0.com",
        spaClientId: "HNUYYyRCtFJsA3xKGp964Kgy4jwx8bW1",
        machineToMachineClientId: "gWNTtsTNepgyyqE7QAEC4e7nt5A3ZZ4k"
    },
    appUrl: "https://creaturechess.com"
};


/***/ }),

/***/ "../../modules/@creature-chess/models/src/config/config.local.ts":
/*!***********************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/config/config.local.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.config = void 0;
exports.config = {
    auth0: {
        domain: "creaturechess.eu.auth0.com",
        spaClientId: "HNUYYyRCtFJsA3xKGp964Kgy4jwx8bW1",
        machineToMachineClientId: "gWNTtsTNepgyyqE7QAEC4e7nt5A3ZZ4k"
    },
    appUrl: "http://localhost:8080"
};


/***/ }),

/***/ "../../modules/@creature-chess/models/src/config/index.ts":
/*!****************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/config/index.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.config = void 0;
var config_live_1 = __webpack_require__(/*! ./config.live */ "../../modules/@creature-chess/models/src/config/config.live.ts");
var config_local_1 = __webpack_require__(/*! ./config.local */ "../../modules/@creature-chess/models/src/config/config.local.ts");
exports.config =  false ? 0 : config_live_1.config;


/***/ }),

/***/ "../../modules/@creature-chess/models/src/constants.ts":
/*!*************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/constants.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
exports.__esModule = true;
exports.AVAILABLE_PROFILE_PICTURES = exports.LOBBY_WAIT_TIME = exports.MAX_PLAYERS_IN_GAME = exports.MAX_NAME_LENGTH = exports.DAMAGE_RATIO = exports.DEFAULT_TURN_DURATION = exports.DEFAULT_TURN_COUNT = exports.PIECES_TO_EVOLVE = exports.BUY_XP_AMOUNT = exports.BUY_XP_COST = exports.HEALTH_LOST_PER_PIECE = exports.MAX_PLAYER_LEVEL = exports.STARTING_HEALTH = exports.STARTING_LEVEL = exports.STARTING_MONEY = exports.REROLL_COST = exports.PHASE_LENGTHS = exports.GRID_SIZE = void 0;
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "../../modules/@creature-chess/models/src/game-phase.ts");
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
exports.LOBBY_WAIT_TIME = 45;
exports.AVAILABLE_PROFILE_PICTURES = {
    1: "Budaye",
    4: "Aardorn",
    5: "Nut",
    7: "Embra",
    8: "Tweesher"
};


/***/ }),

/***/ "../../modules/@creature-chess/models/src/creatureDefinition.ts":
/*!**********************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/creatureDefinition.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


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

/***/ "../../modules/@creature-chess/models/src/creatureType.ts":
/*!****************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/creatureType.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


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

/***/ "../../modules/@creature-chess/models/src/game-phase.ts":
/*!**************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/game-phase.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.GamePhase = void 0;
var GamePhase;
(function (GamePhase) {
    GamePhase[GamePhase["PREPARING"] = 0] = "PREPARING";
    GamePhase[GamePhase["READY"] = 1] = "READY";
    GamePhase[GamePhase["PLAYING"] = 2] = "PLAYING";
})(GamePhase = exports.GamePhase || (exports.GamePhase = {}));


/***/ }),

/***/ "../../modules/@creature-chess/models/src/getXpToNextLevel.ts":
/*!********************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/getXpToNextLevel.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.getXpToNextLevel = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "../../modules/@creature-chess/models/src/constants.ts");
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
var getXpToNextLevel = function (level) {
    if (level === constants_1.MAX_PLAYER_LEVEL) {
        return 0;
    }
    var result = XP_TO_NEXT_LEVEL[level - 1];
    if (result === undefined) {
        return 0;
    }
    return result;
};
exports.getXpToNextLevel = getXpToNextLevel;


/***/ }),

/***/ "../../modules/@creature-chess/models/src/nickname.ts":
/*!************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/nickname.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.validateNicknameFormat = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "../../modules/@creature-chess/models/src/constants.ts");
var NAME_REGEX = /^[a-zA-Z0-9\ ]*$/;
var validateNicknameFormat = function (nickname) {
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
exports.validateNicknameFormat = validateNicknameFormat;


/***/ }),

/***/ "../../modules/@creature-chess/models/src/options.ts":
/*!***********************************************************!*\
  !*** ../../modules/@creature-chess/models/src/options.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var constants_1 = __webpack_require__(/*! ./constants */ "../../modules/@creature-chess/models/src/constants.ts");
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "../../modules/@creature-chess/models/src/game-phase.ts");
exports.defaultOptions = {
    phaseLengths: constants_1.PHASE_LENGTHS,
    turnCount: constants_1.DEFAULT_TURN_COUNT,
    turnDuration: constants_1.DEFAULT_TURN_DURATION
};
var getOptions = function (options) { return (__assign(__assign({}, exports.defaultOptions), options)); };
exports.getOptions = getOptions;


/***/ }),

/***/ "../../modules/@creature-chess/models/src/pieceCombat.ts":
/*!***************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/pieceCombat.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports) {


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
exports.clonePieceCombatState = exports.createPieceCombatState = void 0;
var createPieceCombatState = function () { return ({
    board: {
        canMoveAtTurn: null,
        canBeAttackedAtTurn: 0,
        canAttackAtTurn: null,
        removeFromBoardAtTurn: null
    },
    targetId: null
}); };
exports.createPieceCombatState = createPieceCombatState;
var clonePieceCombatState = function (combat) {
    if (!combat || !combat.board) {
        return (0, exports.createPieceCombatState)();
    }
    return __assign(__assign({}, combat), { board: __assign({}, combat.board) });
};
exports.clonePieceCombatState = clonePieceCombatState;


/***/ }),

/***/ "../../modules/@creature-chess/models/src/player-list-player.ts":
/*!**********************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/player-list-player.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
    PlayerStatus[PlayerStatus["DEAD"] = 1] = "DEAD";
    PlayerStatus[PlayerStatus["QUIT"] = 2] = "QUIT";
})(PlayerStatus = exports.PlayerStatus || (exports.PlayerStatus = {}));
var inProgressBattle = function (opponentId) { return ({
    status: PlayerBattleStatus.IN_PROGRESS,
    opponentId: opponentId
}); };
exports.inProgressBattle = inProgressBattle;
var finishedBattle = function (opponentId, isHomePlayer, homeScore, awayScore) { return ({
    status: PlayerBattleStatus.FINISHED,
    opponentId: opponentId,
    isHomePlayer: isHomePlayer,
    homeScore: homeScore,
    awayScore: awayScore
}); };
exports.finishedBattle = finishedBattle;


/***/ }),

/***/ "../../modules/@creature-chess/models/src/position.ts":
/*!************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/position.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.TileType = exports.getRelativeDirection = exports.Directions = exports.getDistance = exports.getDelta = exports.createTileCoordinates = void 0;
var createTileCoordinates = function (x, y) { return ({ x: x, y: y }); };
exports.createTileCoordinates = createTileCoordinates;
var getDelta = function (a, b) { return ({
    x: Math.abs(a.x - b.x),
    y: Math.abs(a.y - b.y)
}); };
exports.getDelta = getDelta;
var getDistance = function (a, b) {
    var _a = (0, exports.getDelta)(a, b), x = _a.x, y = _a.y;
    return x + y;
};
exports.getDistance = getDistance;
exports.Directions = {
    UP: { x: 0, y: -1 },
    RIGHT: { x: 1, y: 0 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 }
};
/**
 * Returns the relative direction of position b from the perspective of position a
 *
 * @param from The position to find the direction relative from
 * @param to The position to find the direction relative to
 */
var getRelativeDirection = function (from, to) {
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
exports.getRelativeDirection = getRelativeDirection;
var TileType;
(function (TileType) {
    TileType[TileType["BOARD"] = 0] = "BOARD";
    TileType[TileType["BENCH"] = 1] = "BENCH";
})(TileType = exports.TileType || (exports.TileType = {}));


/***/ }),

/***/ "../../modules/@creature-chess/models/src/quickChat.ts":
/*!*************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/quickChat.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.QuickChatOption = void 0;
var QuickChatOption;
(function (QuickChatOption) {
    QuickChatOption["GL"] = "GL";
    QuickChatOption["HAPPY"] = "\uD83D\uDE03";
    QuickChatOption["SHOCKED"] = "\uD83D\uDE31";
    QuickChatOption["ANGRY"] = "\uD83D\uDE20";
})(QuickChatOption = exports.QuickChatOption || (exports.QuickChatOption = {}));


/***/ }),

/***/ "../../modules/@creature-chess/models/src/streakType.ts":
/*!**************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/streakType.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.StreakType = void 0;
var StreakType;
(function (StreakType) {
    StreakType[StreakType["WIN"] = 0] = "WIN";
    StreakType[StreakType["LOSS"] = 1] = "LOSS";
})(StreakType = exports.StreakType || (exports.StreakType = {}));


/***/ }),

/***/ "../../modules/@creature-chess/models/src/titles.ts":
/*!**********************************************************!*\
  !*** ../../modules/@creature-chess/models/src/titles.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {


var _a;
exports.__esModule = true;
exports.TITLES = exports.PlayerTitle = void 0;
var PlayerTitle;
(function (PlayerTitle) {
    PlayerTitle[PlayerTitle["Developer"] = 1] = "Developer";
    PlayerTitle[PlayerTitle["Contributor"] = 2] = "Contributor";
    PlayerTitle[PlayerTitle["HallOfFame"] = 3] = "HallOfFame";
})(PlayerTitle = exports.PlayerTitle || (exports.PlayerTitle = {}));
exports.TITLES = (_a = {},
    _a[PlayerTitle.Developer] = { text: "Developer" },
    _a[PlayerTitle.Contributor] = { text: "Contributor" },
    _a[PlayerTitle.HallOfFame] = { text: "Hall of Fame" },
    _a);


/***/ }),

/***/ "../../modules/@creature-chess/ui/index.ts":
/*!*************************************************!*\
  !*** ../../modules/@creature-chess/ui/index.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.Countdown = exports.useGlobalStyles = exports.Footer = exports.Projectile = exports.Piece = exports.StatusPlayerListItem = exports.PlayerListItem = exports.Label = exports.TypeIndicator = exports.ProgressBar = exports.CreatureImage = exports.Card = exports.CardShop = exports.Title = exports.PlayerAvatar = exports.PlayerProfile = exports.PlayerName = exports.PlayerHealthbar = exports.Layout = void 0;
exports.Layout = __importStar(__webpack_require__(/*! ./src/layout */ "../../modules/@creature-chess/ui/src/layout/index.ts"));
var player_1 = __webpack_require__(/*! ./src/player */ "../../modules/@creature-chess/ui/src/player/index.ts");
__createBinding(exports, player_1, "PlayerHealthbar");
__createBinding(exports, player_1, "PlayerName");
__createBinding(exports, player_1, "PlayerProfile");
__createBinding(exports, player_1, "PlayerAvatar");
__createBinding(exports, player_1, "Title");
var cardShop_1 = __webpack_require__(/*! ./src/cardShop */ "../../modules/@creature-chess/ui/src/cardShop/index.ts");
__createBinding(exports, cardShop_1, "CardShop");
__createBinding(exports, cardShop_1, "Card");
var display_1 = __webpack_require__(/*! ./src/display */ "../../modules/@creature-chess/ui/src/display/index.ts");
__createBinding(exports, display_1, "CreatureImage");
__createBinding(exports, display_1, "ProgressBar");
__createBinding(exports, display_1, "TypeIndicator");
__createBinding(exports, display_1, "Label");
var playerList_1 = __webpack_require__(/*! ./src/playerList */ "../../modules/@creature-chess/ui/src/playerList/index.ts");
__createBinding(exports, playerList_1, "PlayerListItem");
__createBinding(exports, playerList_1, "StatusPlayerListItem");
var piece_1 = __webpack_require__(/*! ./src/piece */ "../../modules/@creature-chess/ui/src/piece/index.ts");
__createBinding(exports, piece_1, "Piece");
__createBinding(exports, piece_1, "Projectile");
var Footer_1 = __webpack_require__(/*! ./src/Footer */ "../../modules/@creature-chess/ui/src/Footer.tsx");
__createBinding(exports, Footer_1, "Footer");
__exportStar(__webpack_require__(/*! ./pages */ "../../modules/@creature-chess/ui/pages/index.ts"), exports);
var styles_1 = __webpack_require__(/*! ./styles */ "../../modules/@creature-chess/ui/styles.ts");
__createBinding(exports, styles_1, "useGlobalStyles");
var countdown_1 = __webpack_require__(/*! ./src/countdown */ "../../modules/@creature-chess/ui/src/countdown.tsx");
__createBinding(exports, countdown_1, "Countdown");


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/index.ts":
/*!*******************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/index.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(__webpack_require__(/*! ./lobby */ "../../modules/@creature-chess/ui/pages/lobby/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./menu */ "../../modules/@creature-chess/ui/pages/menu/index.ts"), exports);


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/lobby/LobbyPage.styles.ts":
/*!************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/lobby/LobbyPage.styles.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.useStyles = void 0;
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
exports.useStyles = (0, react_jss_1.createUseStyles)({
    "lobby": {
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    "lobbyInfo": {
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        marginTop: "1rem",
        textAlign: "center",
        background: "#566c86"
    },
    "timeRemaining": {
        padding: "0.5em 0.6em",
        marginBottom: "1em",
        textTransform: "uppercase",
        background: "#333"
    },
    "timeRemainingHighlight": {
        fontWeight: "700"
    },
    "players": {
        flex: "1 0 0",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    "playerWrapper": {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    "@media (min-width: 1024px)": {
        playerWrapper: {
            width: "40%"
        }
    }
});


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/lobby/LobbyPage.tsx":
/*!******************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/lobby/LobbyPage.tsx ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.LobbyPage = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var countdown_1 = __webpack_require__(/*! ../../src/countdown */ "../../modules/@creature-chess/ui/src/countdown.tsx");
var LobbyPage_styles_1 = __webpack_require__(/*! ./LobbyPage.styles */ "../../modules/@creature-chess/ui/pages/lobby/LobbyPage.styles.ts");
var LobbyPlayerBanner_1 = __webpack_require__(/*! ./LobbyPlayerBanner/LobbyPlayerBanner */ "../../modules/@creature-chess/ui/pages/lobby/LobbyPlayerBanner/LobbyPlayerBanner.tsx");
var Footer_1 = __webpack_require__(/*! ../../src/Footer */ "../../modules/@creature-chess/ui/src/Footer.tsx");
var LobbyPageContext_1 = __webpack_require__(/*! ./LobbyPageContext */ "../../modules/@creature-chess/ui/pages/lobby/LobbyPageContext.ts");
var padNumberToTwo = function (val) { return val < 10 ? "0".concat(val) : val.toString(); };
var countdownRender = function (styles) { return function (totalSecondsRemaining) {
    var minutesRemaining = Math.floor(totalSecondsRemaining / 60);
    var secondsRemaining = Math.ceil(totalSecondsRemaining % 60);
    var time = "".concat(minutesRemaining, ":").concat(padNumberToTwo(secondsRemaining));
    return (React.createElement("div", { className: styles.timeRemaining },
        "Game starting in ",
        React.createElement("span", { className: styles.timeRemainingHighlight }, time)));
}; };
var LobbyPage = function () {
    var styles = (0, LobbyPage_styles_1.useStyles)();
    var _a = (0, LobbyPageContext_1.useLobbyPage)(), players = _a.players, startingAtMs = _a.startingAtMs;
    var botElements = [];
    for (var i = players.length; i < models_1.MAX_PLAYERS_IN_GAME; i++) {
        botElements.push(React.createElement("div", { key: i, className: styles.playerWrapper },
            React.createElement(LobbyPlayerBanner_1.LobbyPlayerBanner, { player: null })));
    }
    return (React.createElement("div", { className: styles.lobby },
        React.createElement("div", { className: styles.lobbyInfo },
            startingAtMs
                && (React.createElement(countdown_1.Countdown, { countdownToSeconds: startingAtMs / 1000, render: countdownRender(styles) })),
            React.createElement("div", { className: styles.players },
                players.map(function (p) { return (React.createElement("div", { key: p.id, className: styles.playerWrapper },
                    React.createElement(LobbyPlayerBanner_1.LobbyPlayerBanner, { player: p }))); }),
                botElements),
            React.createElement("p", null,
                "The game will start ",
                models_1.LOBBY_WAIT_TIME,
                " seconds after the lobby is created, or immediately when there are ",
                models_1.MAX_PLAYERS_IN_GAME,
                " players")),
        React.createElement(Footer_1.Footer, null)));
};
exports.LobbyPage = LobbyPage;


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/lobby/LobbyPageContext.ts":
/*!************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/lobby/LobbyPageContext.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.useLobbyPage = exports.LobbyPageContextProvider = void 0;
var react_1 = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var LobbyPageContext = (0, react_1.createContext)(null);
LobbyPageContext.displayName = "LobbyContext";
exports.LobbyPageContextProvider = LobbyPageContext.Provider;
var useLobbyPage = function () {
    var lobbyPage = (0, react_1.useContext)(LobbyPageContext);
    if (!lobbyPage) {
        throw new Error("No valid LobbyPageContext found for useLobbyPage");
    }
    return lobbyPage;
};
exports.useLobbyPage = useLobbyPage;


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/lobby/LobbyPlayerBanner/LobbyPlayerBanner.tsx":
/*!********************************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/lobby/LobbyPlayerBanner/LobbyPlayerBanner.tsx ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.LobbyPlayerBanner = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var title_1 = __webpack_require__(/*! ../../../src/player/title */ "../../modules/@creature-chess/ui/src/player/title.tsx");
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var useStyles = (0, react_jss_1.createUseStyles)({
    player: {
        padding: "0.4em 1em",
        marginBottom: "0.4em",
        fontWeight: "700",
        textAlign: "left",
        background: "#59616b",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#fff"
    },
    nameAndImage: {
        display: "flex",
        alignItems: "center",
        justifyContent: "stretch",
        marginBottom: "0.25rem"
    },
    bot: {
        fontStyle: "italic",
        color: "#d0d0d0"
    }
});
var LobbyPlayerBanner = function (_a) {
    var _b, _c;
    var player = _a.player;
    var styles = useStyles();
    if (!player) {
        return (React.createElement("div", { className: "".concat(styles.player, " ").concat(styles.bot) },
            React.createElement("span", { className: styles.nameAndImage },
                React.createElement("img", { src: "https://creaturechess.com/images/ui/no_player_img.png", alt: "no player image" }),
                React.createElement("div", { className: "spacer" }),
                "empty slot")));
    }
    ;
    return (React.createElement("div", { className: styles.player },
        React.createElement("span", { className: styles.nameAndImage },
            React.createElement("img", { src: "https://creaturechess.com/images/front/".concat((_b = player.profile) === null || _b === void 0 ? void 0 : _b.picture, ".png"), alt: "avatar" }),
            React.createElement("div", { className: "spacer" }),
            player.name),
        React.createElement(title_1.Title, { titleId: (_c = player.profile) === null || _c === void 0 ? void 0 : _c.title })));
};
exports.LobbyPlayerBanner = LobbyPlayerBanner;


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/lobby/index.ts":
/*!*************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/lobby/index.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.useLobbyPage = exports.LobbyPageContextProvider = exports.LobbyPage = void 0;
var LobbyPage_1 = __webpack_require__(/*! ./LobbyPage */ "../../modules/@creature-chess/ui/pages/lobby/LobbyPage.tsx");
__createBinding(exports, LobbyPage_1, "LobbyPage");
var LobbyPageContext_1 = __webpack_require__(/*! ./LobbyPageContext */ "../../modules/@creature-chess/ui/pages/lobby/LobbyPageContext.ts");
__createBinding(exports, LobbyPageContext_1, "LobbyPageContextProvider");
__createBinding(exports, LobbyPageContext_1, "useLobbyPage");


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/menu/MenuPage.styles.ts":
/*!**********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/menu/MenuPage.styles.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.useStyles = void 0;
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
exports.useStyles = (0, react_jss_1.createUseStyles)({
    menu: {
        "display": "flex",
        "flexDirection": "column",
        "fontFamily": "Arial, Helvetica, sans-serif",
        "color": "#fff",
        "alignItems": "center",
        "justifyContent": "center",
        "& h2": {
            marginBottom: "1rem",
            fontSize: "2em",
            textAlign: "center",
            userSelect: "none"
        }
    },
    findGameButton: {
        padding: "0.8em 2em",
        marginBottom: "1rem",
        fontSize: "1.4rem",
        fontWeight: "700",
        color: "#fff",
        cursor: "pointer",
        background: "#b13e53",
        border: "none"
    },
    joinGame: {
        padding: "1rem",
        marginTop: "3em",
        textAlign: "center",
        background: "#566c86"
    },
    discordButton: {
        maxWidth: "12em",
        marginBottom: "1rem",
        cursor: "pointer"
    },
    blurb: {
        "marginBottom": "0.5rem",
        "& p": {
            marginTop: "0",
            marginBottom: "0.25rem"
        },
        "& span": {
            fontSize: "1.2em",
            fontStyle: "italic",
            fontWeight: "700",
            color: "#bfbfbf"
        }
    },
    error: {
        padding: "1em 0.5em",
        marginBottom: "1em",
        color: "#db2828",
        background: "#ffe8e6",
        boxShadow: "0 0 0 1px #db2828 inset, 0 0 0 0 transparent"
    }
});


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/menu/MenuPage.tsx":
/*!****************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/menu/MenuPage.tsx ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.MenuPage = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var Footer_1 = __webpack_require__(/*! ../../src/Footer */ "../../modules/@creature-chess/ui/src/Footer.tsx");
var MenuPageContext_1 = __webpack_require__(/*! ./MenuPageContext */ "../../modules/@creature-chess/ui/pages/menu/MenuPageContext.ts");
var MenuPage_styles_1 = __webpack_require__(/*! ./MenuPage.styles */ "../../modules/@creature-chess/ui/pages/menu/MenuPage.styles.ts");
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var useNavbarStyles = (0, react_jss_1.createUseStyles)({
    navbar: {
        "position": "fixed",
        "top": "0",
        "display": "flex",
        "flexDirection": "row",
        "width": "100%",
        "height": "2em",
        "background": "#985763",
        "justifyContent": "flex-end",
        "& button": {
            fontWeight: "700",
            color: "#fff",
            cursor: "pointer",
            background: "#b13e53",
            border: "none",
            borderLeft: "1px solid #fff"
        }
    }
});
var Navbar = function () {
    var styles = useNavbarStyles();
    var logout = (0, MenuPageContext_1.useMenuPage)().auth.logout;
    return (React.createElement("nav", { className: styles.navbar },
        React.createElement("button", { onClick: logout }, "Log Out")));
};
var MenuPage = function (_a) {
    var error = _a.error;
    var styles = (0, MenuPage_styles_1.useStyles)();
    var findGame = (0, MenuPageContext_1.useMenuPage)().findGame;
    return (React.createElement("div", { className: styles.menu },
        React.createElement(Navbar, null),
        React.createElement("div", { className: styles.joinGame },
            React.createElement("h2", null, "Creature Chess"),
            React.createElement("div", { className: styles.blurb },
                React.createElement("p", null, "More fun with friends! Press \"Find Game\" at the same time to play together"),
                React.createElement("p", null, "Up to 8 players!")),
            React.createElement("button", { onClick: findGame, className: styles.findGameButton }, "Find Game"),
            React.createElement("div", { className: styles.blurb },
                React.createElement("p", null, "Join us on Discord to receive notifications when someone starts a lobby, and more!")),
            React.createElement("a", { href: "https://discord.gg/FhMm6saehb" },
                React.createElement("img", { src: "https://i.imgur.com/OBo2QRd.png", className: styles.discordButton })),
            React.createElement("div", { className: styles.blurb },
                React.createElement("p", null,
                    "This is a ",
                    React.createElement("span", null, "multiplayer strategy game"),
                    " in which you configure creatures on a board."),
                React.createElement("p", null, "Each round, your board is matched against an opponent's board. Defeat all their pieces to win the round."),
                React.createElement("p", null, "Every loss decreases your health bar. When your health reaches zero, you're out!"),
                React.createElement("p", null, "Players will battle against eachother until only one player remains."),
                React.createElement("p", null,
                    "Good luck! ",
                    React.createElement("span", null, "~ jkm"))),
            error
                && React.createElement("div", { className: styles.error },
                    React.createElement("p", null, error))),
        React.createElement(Footer_1.Footer, null)));
};
exports.MenuPage = MenuPage;


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/menu/MenuPageContext.ts":
/*!**********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/menu/MenuPageContext.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.useMenuPage = exports.MenuPageContextProvider = void 0;
var react_1 = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var MenuPageContext = (0, react_1.createContext)(null);
MenuPageContext.displayName = "MenuPageContext";
exports.MenuPageContextProvider = MenuPageContext.Provider;
var useMenuPage = function () {
    var menuPage = (0, react_1.useContext)(MenuPageContext);
    if (!menuPage) {
        throw new Error("No valid MenuPageContext found for useMenuPage");
    }
    return menuPage;
};
exports.useMenuPage = useMenuPage;


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/menu/index.ts":
/*!************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/menu/index.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.useMenuPage = exports.MenuPageContextProvider = exports.MenuPage = void 0;
var MenuPage_1 = __webpack_require__(/*! ./MenuPage */ "../../modules/@creature-chess/ui/pages/menu/MenuPage.tsx");
__createBinding(exports, MenuPage_1, "MenuPage");
var MenuPageContext_1 = __webpack_require__(/*! ./MenuPageContext */ "../../modules/@creature-chess/ui/pages/menu/MenuPageContext.ts");
__createBinding(exports, MenuPageContext_1, "MenuPageContextProvider");
__createBinding(exports, MenuPageContext_1, "useMenuPage");
__exportStar(__webpack_require__(/*! ./registration */ "../../modules/@creature-chess/ui/pages/menu/registration/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./login */ "../../modules/@creature-chess/ui/pages/menu/login/index.ts"), exports);


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/menu/login/LoginPage.styles.ts":
/*!*****************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/menu/login/LoginPage.styles.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.useStyles = void 0;
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
exports.useStyles = (0, react_jss_1.createUseStyles)({
    login: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#fff",
        alignItems: "center",
        justifyContent: "center",
        background: "#566c86"
    },
    banner: {
        "maxWidth": "700px",
        "marginTop": "1rem",
        "marginBottom": "1rem",
        "userSelect": "none",
        "& img": {
            width: "100%",
            userSelect: "none"
        }
    },
    group: {},
    groups: {
        "display": "flex",
        "width": "100%",
        "maxWidth": "700px",
        "& .group": {
            width: "50%",
            textAlign: "center"
        },
        "& p": {
            marginBottom: "0.5rem",
            fontSize: "0.8em"
        }
    },
    loginButton: {
        padding: "0.6em 1.2em",
        marginBottom: "1rem",
        fontSize: "1.4em",
        color: "#fff",
        cursor: "pointer",
        background: "#b13e53",
        border: "none"
    },
    discordButton: {
        maxWidth: "12em",
        marginBottom: "1rem",
        cursor: "pointer"
    }
});


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/menu/login/LoginPage.tsx":
/*!***********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/menu/login/LoginPage.tsx ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var Footer_1 = __webpack_require__(/*! ../../../src/Footer */ "../../modules/@creature-chess/ui/src/Footer.tsx");
var LoginPage_styles_1 = __webpack_require__(/*! ./LoginPage.styles */ "../../modules/@creature-chess/ui/pages/menu/login/LoginPage.styles.ts");
var LoginPage = function (_a) {
    var isLoading = _a.isLoading, onSignInClick = _a.onSignInClick;
    var styles = (0, LoginPage_styles_1.useStyles)();
    var _b = __read(React.useState(false), 2), loadingSignIn = _b[0], setLoadingSignIn = _b[1];
    var currentlyLoading = isLoading || loadingSignIn;
    var handleSignInClick = function () {
        if (currentlyLoading) {
            return;
        }
        setLoadingSignIn(true);
        onSignInClick();
    };
    if (currentlyLoading) {
        return React.createElement("span", null, "Loading");
    }
    return (React.createElement("div", { className: styles.login },
        React.createElement("div", { className: styles.banner },
            React.createElement("img", { src: "https://i.imgur.com/7FAcFwZ.png" })),
        React.createElement("div", { className: styles.groups },
            React.createElement("div", { className: "group" },
                React.createElement("p", null, "Creature Chess is a multiplayer game, so you need an account to play"),
                React.createElement("button", { onClick: handleSignInClick, className: styles.loginButton }, "Log in / Sign up"),
                React.createElement("p", null, "Join us on Discord to find other players and give feedback on the game"),
                React.createElement("a", { href: "https://discord.gg/FhMm6saehb" },
                    React.createElement("img", { src: "https://i.imgur.com/OBo2QRd.png", className: styles.discordButton })))),
        React.createElement(Footer_1.Footer, null)));
};
exports.LoginPage = LoginPage;


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/menu/login/index.ts":
/*!******************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/menu/login/index.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.LoginPage = void 0;
var LoginPage_1 = __webpack_require__(/*! ./LoginPage */ "../../modules/@creature-chess/ui/pages/menu/login/LoginPage.tsx");
__createBinding(exports, LoginPage_1, "LoginPage");


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/menu/registration/RegistrationPage.styles.ts":
/*!*******************************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/menu/registration/RegistrationPage.styles.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.useStyles = void 0;
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
exports.useStyles = (0, react_jss_1.createUseStyles)({
    register: {
        "display": "flex",
        "flexDirection": "column",
        "height": "100%",
        "padding": "1rem",
        "marginTop": "1em",
        "fontFamily": "Arial, Helvetica, sans-serif",
        "color": "#fff",
        "alignItems": "center",
        "justifyContent": "center",
        "textAlign": "center",
        "background": "#566c86",
        "& h1": {
            marginBottom: "1rem",
            fontSize: "2em"
        }
    },
    registerButton: {
        padding: "0.5rem 2rem",
        fontSize: "1.25rem",
        color: "#fff",
        cursor: "pointer",
        background: "#b13e53",
        border: "none"
    },
    error: {
        padding: "0.5rem 1rem",
        marginBottom: "1rem",
        border: "2px solid #a01515"
    }
});


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/menu/registration/RegistrationPage.tsx":
/*!*************************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/menu/registration/RegistrationPage.tsx ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var NicknameSelection_1 = __webpack_require__(/*! ./input/NicknameSelection */ "../../modules/@creature-chess/ui/pages/menu/registration/input/NicknameSelection.tsx");
var PictureSelection_1 = __webpack_require__(/*! ./input/PictureSelection */ "../../modules/@creature-chess/ui/pages/menu/registration/input/PictureSelection.tsx");
var RegistrationPage_styles_1 = __webpack_require__(/*! ./RegistrationPage.styles */ "../../modules/@creature-chess/ui/pages/menu/registration/RegistrationPage.styles.ts");
var RegistrationPage = function (_a) {
    var updateUser = _a.updateUser;
    var styles = (0, RegistrationPage_styles_1.useStyles)();
    var _b = __read(React.useState(""), 2), nickname = _b[0], setNickname = _b[1];
    var _c = __read(React.useState(1), 2), currentImage = _c[0], setCurrentImage = _c[1];
    var _d = __read(React.useState(false), 2), loading = _d[0], setLoading = _d[1];
    var _e = __read(React.useState(null), 2), error = _e[0], setError = _e[1];
    var handleNameChange = function (event) {
        if (loading) {
            return;
        }
        setNickname(event.target.value);
    };
    var handleImageChange = function (picture) {
        if (loading) {
            return;
        }
        setCurrentImage(picture);
    };
    var onRegisterClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var nicknameError, responseError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nicknameError = (0, models_1.validateNicknameFormat)(nickname);
                    if (nicknameError) {
                        setError(nicknameError);
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    return [4 /*yield*/, updateUser(nickname, currentImage)];
                case 1:
                    responseError = (_a.sent()).error;
                    if (!responseError) {
                        return [2 /*return*/];
                    }
                    setLoading(false);
                    setError(responseError);
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: styles.register },
        React.createElement("h1", null, "Registration"),
        error && React.createElement("p", { className: styles.error }, error),
        React.createElement(NicknameSelection_1.NicknameSelection, { nickname: nickname || "", onChange: handleNameChange, loading: loading }),
        React.createElement(PictureSelection_1.PictureSelection, { currentImage: currentImage, onChange: handleImageChange }),
        React.createElement("button", { className: styles.registerButton, onClick: onRegisterClick, disabled: loading },
            !loading && "Register",
            loading && "Loading...")));
};
exports.RegistrationPage = RegistrationPage;


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/menu/registration/index.ts":
/*!*************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/menu/registration/index.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.RegistrationPage = void 0;
var RegistrationPage_1 = __webpack_require__(/*! ./RegistrationPage */ "../../modules/@creature-chess/ui/pages/menu/registration/RegistrationPage.tsx");
__createBinding(exports, RegistrationPage_1, "RegistrationPage");


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/menu/registration/input/BaseRegistrationInput.tsx":
/*!************************************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/menu/registration/input/BaseRegistrationInput.tsx ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.BaseRegistrationInput = void 0;
var react_1 = __importDefault(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var useStyles = (0, react_jss_1.createUseStyles)({
    input: {
        marginBottom: "0.5rem"
    },
    inputHeading: {
        marginBottom: "0.5rem",
        fontSize: "1.4em"
    },
    info: {
        marginTop: "0.5rem"
    }
});
var BaseRegistrationInput = function (_a) {
    var heading = _a.heading, info = _a.info, children = _a.children;
    var styles = useStyles();
    return (react_1["default"].createElement("div", { className: styles.input },
        react_1["default"].createElement("h1", { className: styles.inputHeading }, heading),
        react_1["default"].createElement("h2", { className: styles.info }, info),
        children));
};
exports.BaseRegistrationInput = BaseRegistrationInput;


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/menu/registration/input/NicknameSelection.tsx":
/*!********************************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/menu/registration/input/NicknameSelection.tsx ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.NicknameSelection = void 0;
var react_1 = __importDefault(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var BaseRegistrationInput_1 = __webpack_require__(/*! ./BaseRegistrationInput */ "../../modules/@creature-chess/ui/pages/menu/registration/input/BaseRegistrationInput.tsx");
var useStyles = (0, react_jss_1.createUseStyles)({
    nameInput: {
        padding: "0.5rem 1rem",
        marginBottom: "1em"
    }
});
var NicknameSelection = function (_a) {
    var nickname = _a.nickname, onChange = _a.onChange, loading = _a.loading;
    var styles = useStyles();
    return (react_1["default"].createElement(BaseRegistrationInput_1.BaseRegistrationInput, { heading: "Nickname", info: "This nickname is permanent and cannot be changed" },
        react_1["default"].createElement("input", { className: styles.nameInput, maxLength: models_1.MAX_NAME_LENGTH, disabled: loading, value: nickname, placeholder: "Nickname", onChange: onChange })));
};
exports.NicknameSelection = NicknameSelection;


/***/ }),

/***/ "../../modules/@creature-chess/ui/pages/menu/registration/input/PictureSelection.tsx":
/*!*******************************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/pages/menu/registration/input/PictureSelection.tsx ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.PictureSelection = void 0;
var react_1 = __importDefault(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var BaseRegistrationInput_1 = __webpack_require__(/*! ./BaseRegistrationInput */ "../../modules/@creature-chess/ui/pages/menu/registration/input/BaseRegistrationInput.tsx");
var useStyles = (0, react_jss_1.createUseStyles)({
    pictureList: {
        display: "inline-block"
    }
});
var PictureSelection = function (_a) {
    var currentImage = _a.currentImage, onChange = _a.onChange;
    var styles = useStyles();
    return (react_1["default"].createElement(BaseRegistrationInput_1.BaseRegistrationInput, { heading: "Profile Picture", info: "Choose a profile picture - more can be unlocked!" }, Object.entries(models_1.AVAILABLE_PROFILE_PICTURES).map(function (_a) {
        var _b = __read(_a, 2), pictureString = _b[0], creatureName = _b[1];
        var picture = parseInt(pictureString, 10);
        var onSelect = function () { return onChange(picture); };
        return (react_1["default"].createElement("div", { className: styles.pictureList, key: picture },
            react_1["default"].createElement("img", { src: "https://creaturechess.com/images/front/".concat(picture, ".png"), alt: creatureName }),
            react_1["default"].createElement("p", null, creatureName),
            react_1["default"].createElement("input", { type: "radio", value: picture, checked: currentImage === picture, onChange: onSelect })));
    })));
};
exports.PictureSelection = PictureSelection;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/Footer.tsx":
/*!*******************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/Footer.tsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Footer = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var APP_VERSION = (__webpack_require__(/*! ../../../../package.json */ "../../package.json").version);
var useStyles = (0, react_jss_1.createUseStyles)({
    footer: {
        marginTop: "0.5em",
        marginBottom: "0.5em",
        textAlign: "center"
    },
    item: {
        fontFamily: "Arial, sans-serif",
        fontSize: "0.8em",
        fontStyle: "italic",
        color: "#fff"
    }
});
var Footer = function () {
    var classes = useStyles();
    return (React.createElement("div", { className: classes.footer },
        React.createElement("span", { className: classes.item },
            "v",
            APP_VERSION || "-.-.-"),
        " - ",
        React.createElement("a", { className: classes.item, href: "https://reddit.com/r/creaturechess/" }, "/r/CreatureChess"),
        " - ",
        React.createElement("a", { className: classes.item, href: "https://creaturechess.com/privacy" }, "Privacy Policy"),
        " - ",
        React.createElement("a", { className: classes.item, href: "https://github.com/Jameskmonger/creature-chess" }, "Licenses on GitHub")));
};
exports.Footer = Footer;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/button.tsx":
/*!*******************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/button.tsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Button = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
// todo implement primary style
var getColor = function (style) { return style === "primary" ? "#fff" : "#fff"; };
var getBackground = function (style) { return style === "primary" ? "#1a1c2c" : "#1a1c2c"; };
var useStyles = (0, react_jss_1.createUseStyles)({
    button: function (props) { return ({
        padding: "0.25em 1em",
        fontSize: "1em",
        color: getColor(props.type),
        background: getBackground(props.type),
        border: "none",
        cursor: "pointer",
        "&:disabled": {
            background: "#575758",
            cursor: "not-allowed"
        }
    }); }
});
var Button = function (props) {
    var classes = useStyles(props);
    var onClick = props.onClick, _a = props.disabled, disabled = _a === void 0 ? false : _a, children = props.children;
    return React.createElement("button", { className: classes.button, onClick: !disabled ? onClick : undefined, disabled: disabled }, children);
};
exports.Button = Button;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/cardShop/card.tsx":
/*!**************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/cardShop/card.tsx ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Card = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var layout_1 = __webpack_require__(/*! ../layout */ "../../modules/@creature-chess/ui/src/layout/index.ts");
var useStyles = (0, react_jss_1.createUseStyles)({
    card: {
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
        textAlign: "center",
        cursor: function (_a) {
            var _b = _a.disabled, disabled = _b === void 0 ? false : _b;
            return disabled ? "not-allowed" : "pointer";
        },
        userSelect: "none",
        background: "#4e4e4e",
        paddingBottom: "0.5em"
    },
    name: {
        fontSize: "0.8em",
        fontWeight: 700
    },
    typeIndicator: {
        zIndex: 20,
        marginTop: "-0.5em",
        marginLeft: "-0.125em",
        width: "24px",
        height: "24px"
    },
    cost: {
        padding: "0.125em",
        marginTop: "-0.5em",
        marginRight: "-0.1em",
        background: "rgb(128, 128, 128)"
    },
    cardMeta: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
    },
    metaItem: {
        fontSize: "0.6rem",
        fontWeight: 700,
        textTransform: "uppercase"
    }
});
var Card = function (props) {
    var classes = useStyles(props);
    var _a = props.card, name = _a.name, definitionId = _a.definitionId, type = _a.type, cost = _a.cost, cardClass = _a["class"], onClick = props.onClick, _b = props.disabled, disabled = _b === void 0 ? false : _b;
    return (React.createElement("div", { className: classes.card, onClick: !disabled ? onClick || undefined : undefined },
        React.createElement(layout_1.Layout, { direction: "column", noSpacer: true },
            React.createElement(layout_1.Layout, { direction: "row", noSpacer: true },
                React.createElement("div", { className: classes.typeIndicator },
                    React.createElement(display_1.TypeIndicator, { type: type })),
                React.createElement("div", { className: classes.cost },
                    React.createElement("span", null,
                        "$",
                        cost))),
            React.createElement(display_1.CreatureImage, { definitionId: definitionId, baseUrl: "https://creaturechess.com/" }),
            React.createElement("h2", { className: classes.name }, name),
            React.createElement("div", { className: classes.cardMeta },
                React.createElement("span", { className: classes.metaItem }, cardClass),
                React.createElement("span", { className: classes.metaItem }, type)))));
};
exports.Card = Card;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/cardShop/cardSelector.tsx":
/*!**********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/cardShop/cardSelector.tsx ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.CardSelector = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var layout_1 = __webpack_require__(/*! ../layout */ "../../modules/@creature-chess/ui/src/layout/index.ts");
var card_1 = __webpack_require__(/*! ./card */ "../../modules/@creature-chess/ui/src/cardShop/card.tsx");
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var useStyles = (0, react_jss_1.createUseStyles)({
    container: {
        position: "relative",
        marginBottom: "1em"
    },
    tray: {
        position: "absolute",
        bottom: "5%",
        width: "100%",
        height: "70%",
        background: "#2b2b2b"
    },
    cardContainer: {
        zIndex: 10,
        width: "15%"
    },
    selected: {
        marginTop: "-1em"
    }
});
var CardSelector = function (_a) {
    var cards = _a.cards, money = _a.money, selectedCardIndex = _a.selectedCardIndex, onSelectCard = _a.onSelectCard;
    var classes = useStyles();
    var createCard = function (card, index) {
        var _a;
        if (card === null) {
            return null;
        }
        var isSelected = selectedCardIndex === index;
        var onClick = function () {
            if (!onSelectCard) {
                return;
            }
            onSelectCard(isSelected ? null : index);
        };
        return (React.createElement("div", { className: (0, classnames_1["default"])(classes.cardContainer, (_a = {}, _a[classes.selected] = isSelected, _a)) },
            React.createElement(card_1.Card, { key: "".concat(index, "-").concat(card.definitionId), disabled: money < card.cost, card: card, onClick: onSelectCard ? onClick : undefined })));
    };
    return (React.createElement(layout_1.Layout, { className: classes.container, direction: "row", justifyContent: "space-around", noSpacer: true },
        React.createElement("div", { className: classes.tray }),
        cards.map(createCard)));
};
exports.CardSelector = CardSelector;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/cardShop/cardShop.tsx":
/*!******************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/cardShop/cardShop.tsx ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var layout_1 = __webpack_require__(/*! ../layout */ "../../modules/@creature-chess/ui/src/layout/index.ts");
var cardSelector_1 = __webpack_require__(/*! ./cardSelector */ "../../modules/@creature-chess/ui/src/cardShop/cardSelector.tsx");
var currentCard_1 = __webpack_require__(/*! ./currentCard */ "../../modules/@creature-chess/ui/src/cardShop/currentCard.tsx");
var button_1 = __webpack_require__(/*! ../button */ "../../modules/@creature-chess/ui/src/button.tsx");
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var useStyles = (0, react_jss_1.createUseStyles)({
    container: {
        width: "100%",
        height: "100%"
    },
    grow: {
        flex: 1,
        marginBottom: "2em"
    },
    balance: {
        background: "#2f2f2f",
        padding: "0 1em",
        lineHeight: "1.5em"
    }
});
var CardShop = function (_a) {
    var cards = _a.cards, money = _a.money, _b = _a.isLocked, isLocked = _b === void 0 ? false : _b, onReroll = _a.onReroll, onToggleLock = _a.onToggleLock, onBuy = _a.onBuy, _c = _a.showSelectedCard, showSelectedCard = _c === void 0 ? true : _c;
    var classes = useStyles();
    var _d = __read(React.useState(null), 2), selectedIndex = _d[0], setSelectedIndex = _d[1];
    var onBuyCurrentCard = function () { return onBuy && selectedIndex !== null && onBuy(selectedIndex); };
    var selectedCard = selectedIndex !== null ? cards[selectedIndex] : null;
    React.useEffect(function () {
        if (!selectedCard) {
            return;
        }
        var canAfford = selectedCard.cost <= money;
        if (!canAfford) {
            setSelectedIndex(null);
        }
    }, [selectedCard, money]);
    return (React.createElement(layout_1.Layout, { className: classes.container, direction: "column" },
        React.createElement(layout_1.Layout, { direction: "column", justifyContent: "center", className: classes.grow }, selectedCard
            && showSelectedCard
            && React.createElement(currentCard_1.CurrentCard, { card: selectedCard, onBuy: onBuyCurrentCard })),
        React.createElement(cardSelector_1.CardSelector, { cards: cards, money: money, selectedCardIndex: selectedIndex, onSelectCard: setSelectedIndex }),
        React.createElement(layout_1.Layout, { direction: "row", justifyContent: "space-between" },
            React.createElement(button_1.Button, { type: "primary", onClick: onReroll, disabled: money < models_1.REROLL_COST },
                "New ($",
                models_1.REROLL_COST,
                ")"),
            React.createElement("div", { className: classes.balance },
                React.createElement(display_1.Label, null, "Balance:"),
                " ",
                React.createElement(display_1.Label, { type: "highlight" },
                    "$",
                    money)),
            React.createElement(button_1.Button, { type: "primary", onClick: onToggleLock }, isLocked ? "Unlock" : "Lock (1 turn)"))));
};
exports.CardShop = CardShop;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/cardShop/currentCard.tsx":
/*!*********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/cardShop/currentCard.tsx ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.CurrentCard = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var layout_1 = __webpack_require__(/*! ../layout */ "../../modules/@creature-chess/ui/src/layout/index.ts");
var button_1 = __webpack_require__(/*! ../button */ "../../modules/@creature-chess/ui/src/button.tsx");
var useStyles = (0, react_jss_1.createUseStyles)({
    buyCard: {
        textAlign: "center",
        padding: "1em",
        background: "#4e4e4e"
    },
    currentCard: {
        background: "#2f2f2f"
    },
    cardText: {
        padding: "1em",
        fontFamily: "Arial, sans-serif",
        fontWeight: 700,
        color: "#fff",
        fontSize: "0.7em",
        textTransform: "uppercase"
    },
    cardName: {
        textTransform: "none",
        marginBottom: "0.35em"
    }
});
var CurrentCard = function (_a) {
    var card = _a.card, onBuy = _a.onBuy;
    var classes = useStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement(layout_1.Layout, { direction: "row", justifyContent: "center", noSpacer: true, className: classes.currentCard },
            React.createElement("div", null,
                React.createElement(display_1.CreatureImage, { definitionId: card.definitionId, baseUrl: "https://creaturechess.com/" })),
            React.createElement(layout_1.Layout, { direction: "column", className: classes.cardText },
                React.createElement("h2", { className: classes.cardName }, card.name),
                React.createElement("span", null, card.type),
                React.createElement("span", null, card["class"]))),
        React.createElement("div", { className: classes.buyCard },
            React.createElement(button_1.Button, { type: "primary", onClick: onBuy },
                "Buy ($",
                card.cost,
                ")"))));
};
exports.CurrentCard = CurrentCard;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/cardShop/index.ts":
/*!**************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/cardShop/index.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.CardShop = exports.CardSelector = exports.Card = void 0;
var card_1 = __webpack_require__(/*! ./card */ "../../modules/@creature-chess/ui/src/cardShop/card.tsx");
__createBinding(exports, card_1, "Card");
var cardSelector_1 = __webpack_require__(/*! ./cardSelector */ "../../modules/@creature-chess/ui/src/cardShop/cardSelector.tsx");
__createBinding(exports, cardSelector_1, "CardSelector");
var cardShop_1 = __webpack_require__(/*! ./cardShop */ "../../modules/@creature-chess/ui/src/cardShop/cardShop.tsx");
__createBinding(exports, cardShop_1, "CardShop");


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/countdown.tsx":
/*!**********************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/countdown.tsx ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
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

/***/ "../../modules/@creature-chess/ui/src/display/TypeIndicator.tsx":
/*!**********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/display/TypeIndicator.tsx ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
exports.__esModule = true;
exports.TypeIndicator = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var ICON_FOR_TYPE = (_a = {},
    _a[models_1.CreatureType.Fire] = "http://creaturechess.com/images/ui/type-fire.svg",
    _a[models_1.CreatureType.Earth] = "http://creaturechess.com/images/ui/type-earth.svg",
    _a[models_1.CreatureType.Metal] = "http://creaturechess.com/images/ui/type-metal.svg",
    _a[models_1.CreatureType.Water] = "http://creaturechess.com/images/ui/type-water.svg",
    _a[models_1.CreatureType.Wood] = "http://creaturechess.com/images/ui/type-wood.svg",
    _a);
var TypeIndicator = function (_a) {
    var type = _a.type, className = _a.className;
    return React.createElement("img", { className: className, src: ICON_FOR_TYPE[type] });
};
exports.TypeIndicator = TypeIndicator;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/display/creatureImage.tsx":
/*!**********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/display/creatureImage.tsx ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.CreatureImage = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var CreatureImage = function (_a) {
    var _b = _a.baseUrl, baseUrl = _b === void 0 ? "" : _b, facing = _a.facing, definitionId = _a.definitionId;
    return (React.createElement("img", { className: "image creature-image", src: "".concat(baseUrl, "/images/").concat(facing || "front", "/").concat(definitionId, ".png") }));
};
exports.CreatureImage = CreatureImage;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/display/index.ts":
/*!*************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/display/index.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.TypeIndicator = exports.ProgressBar = exports.Label = exports.CreatureImage = void 0;
var creatureImage_1 = __webpack_require__(/*! ./creatureImage */ "../../modules/@creature-chess/ui/src/display/creatureImage.tsx");
__createBinding(exports, creatureImage_1, "CreatureImage");
var label_1 = __webpack_require__(/*! ./label */ "../../modules/@creature-chess/ui/src/display/label.tsx");
__createBinding(exports, label_1, "Label");
var progressBar_1 = __webpack_require__(/*! ./progressBar */ "../../modules/@creature-chess/ui/src/display/progressBar.tsx");
__createBinding(exports, progressBar_1, "ProgressBar");
var TypeIndicator_1 = __webpack_require__(/*! ./TypeIndicator */ "../../modules/@creature-chess/ui/src/display/TypeIndicator.tsx");
__createBinding(exports, TypeIndicator_1, "TypeIndicator");


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/display/label.tsx":
/*!**************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/display/label.tsx ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Label = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var useStyles = (0, react_jss_1.createUseStyles)({
    label: {
        fontFamily: "Arial, sans-serif",
        fontSize: "0.8rem",
        fontWeight: 700,
        color: function (props) { return props.type === "highlight" ? "#ffcd75" : "#fff"; }
    }
});
var Label = function (props) {
    var classes = useStyles(props);
    return React.createElement("span", { className: classes.label }, props.children);
};
exports.Label = Label;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/display/progressBar.tsx":
/*!********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/display/progressBar.tsx ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ProgressBar = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var getPercentage = function (current, max) { return Math.floor((current / max) * 100) + "%"; };
var getFillStyle = function (_a) {
    var _b = _a.vertical, vertical = _b === void 0 ? false : _b, current = _a.current, max = _a.max;
    return (vertical
        ? { height: getPercentage(current, max) }
        : { width: getPercentage(current, max) });
};
var useStyles = (0, react_jss_1.createUseStyles)({
    container: {
        width: "101%",
        height: "100%",
        position: "relative",
        background: "#636363",
        boxSizing: "border-box"
    },
    fill: function (props) { return (__assign({ position: "absolute", height: "100%", width: "100%", boxSizing: "border-box" }, getFillStyle(props))); },
    contents: {
        position: "absolute",
        top: "0",
        right: "0.5em",
        fontWeight: 700,
        lineHeight: "1.75em"
    }
});
var ProgressBar = function (props) {
    var classes = useStyles(props);
    var className = props.className, _a = props.fillClassName, fillClassName = _a === void 0 ? "" : _a, _b = props.contentClassName, contentClassName = _b === void 0 ? "" : _b, current = props.current, max = props.max, renderContents = props.renderContents, children = props.children;
    return (React.createElement("div", { className: (0, classnames_1["default"])(classes.container, className) },
        React.createElement("div", { className: (0, classnames_1["default"])(classes.fill, fillClassName) }),
        renderContents
            && React.createElement("span", { className: (0, classnames_1["default"])(classes.contents, contentClassName) }, renderContents(current, max)),
        children));
};
exports.ProgressBar = ProgressBar;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/hooks/useOnClickOutside.ts":
/*!***********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/hooks/useOnClickOutside.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.useOnClickOutside = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var useOnClickOutside = function (ref, handler) {
    React.useEffect(function () {
        var listener = function (event) {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return function () {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, 
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]);
};
exports.useOnClickOutside = useOnClickOutside;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/layout/half.tsx":
/*!************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/layout/half.tsx ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Half = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __importDefault(__webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js"));
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var styles = function (_a) {
    var isVertical = _a.isVertical;
    return ({
        half: isVertical
            ? { height: "50%" }
            : { width: "50%" }
    });
};
var UnstyledHalf = (function (props) { return (React.createElement("div", { className: (0, classnames_1["default"])(props.classes.half, props.className) }, props.children)); });
var Half = (0, react_jss_1["default"])(styles)(UnstyledHalf);
exports.Half = Half;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/layout/index.ts":
/*!************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/layout/index.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.Layout = exports.Half = void 0;
var half_1 = __webpack_require__(/*! ./half */ "../../modules/@creature-chess/ui/src/layout/half.tsx");
__createBinding(exports, half_1, "Half");
var layout_1 = __webpack_require__(/*! ./layout */ "../../modules/@creature-chess/ui/src/layout/layout.tsx");
__createBinding(exports, layout_1, "Layout");


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/layout/layout.tsx":
/*!**************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/layout/layout.tsx ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Layout = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var isVertical = function (direction) { return direction === "column" || direction === "column-reverse"; };
var getSpacer = function (noSpacer) { return noSpacer ? {} : { padding: "0.25em" }; };
var useStyles = (0, react_jss_1.createUseStyles)({
    layout: function (_a) {
        var direction = _a.direction, _b = _a.justifyContent, justifyContent = _b === void 0 ? "space-between" : _b, _c = _a.noSpacer, noSpacer = _c === void 0 ? false : _c;
        return (__assign({ display: "flex", justifyContent: justifyContent, flexDirection: direction }, getSpacer(noSpacer)));
    }
});
var Layout = function (props) {
    var classes = useStyles(props);
    var theme = { isVertical: isVertical(props.direction) };
    return (React.createElement("div", { className: (0, classnames_1["default"])(classes.layout, props.className) },
        React.createElement(react_jss_1.ThemeProvider, { theme: theme }, props.children)));
};
exports.Layout = Layout;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/piece/healthbar.tsx":
/*!****************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/piece/healthbar.tsx ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Healthbar = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var getFillBackground = function (_a) {
    var color = _a.color;
    if (color === "spectating") {
        return "#601a4a";
    }
    if (color === "enemy") {
        return "#e03c71";
    }
    return "#3887ca";
};
var useStyles = (0, react_jss_1.createUseStyles)({
    fill: {
        background: getFillBackground,
        position: "absolute",
        bottom: 0
    }
});
var Healthbar = function (props) {
    var classes = useStyles(props);
    return (React.createElement(display_1.ProgressBar, { fillClassName: classes.fill, current: props.current, max: props.max, vertical: true }, props.children));
};
exports.Healthbar = Healthbar;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/piece/index.ts":
/*!***********************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/piece/index.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.Projectile = exports.Piece = void 0;
var piece_1 = __webpack_require__(/*! ./piece */ "../../modules/@creature-chess/ui/src/piece/piece.tsx");
__createBinding(exports, piece_1, "Piece");
var projectile_1 = __webpack_require__(/*! ./projectile */ "../../modules/@creature-chess/ui/src/piece/projectile.tsx");
__createBinding(exports, projectile_1, "Projectile");


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/piece/meta.tsx":
/*!***********************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/piece/meta.tsx ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.PieceMeta = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var stageIndicator_1 = __webpack_require__(/*! ./stageIndicator */ "../../modules/@creature-chess/ui/src/piece/stageIndicator.tsx");
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var healthbar_1 = __webpack_require__(/*! ./healthbar */ "../../modules/@creature-chess/ui/src/piece/healthbar.tsx");
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var layout_1 = __webpack_require__(/*! ../layout */ "../../modules/@creature-chess/ui/src/layout/index.ts");
var useStyles = (0, react_jss_1.createUseStyles)({
    "meta": {},
    "typeIndicator": {
        marginBottom: "0.25em",
        width: "100%"
    },
    "healthbarContainer": {
        flex: 1,
        position: "relative"
    },
    "stage": {
        "position": "absolute",
        "top": "10%",
        "left": "7%",
        "width": "86%",
        "height": "80%",
        "& > img": {
            width: "100%"
        }
    },
    "metaTop": {
        flex: 1,
        boxSizing: "border-box",
        textAlign: "center"
    },
    "@media only screen and (max-width: 799px)": {
        meta: {
            width: "30%"
        },
        metaTop: {
            height: "30%"
        }
    },
    "@media only screen and (min-width: 800px)": {
        meta: {
            width: "22%"
        },
        metaTop: {
            height: "22%"
        }
    }
});
var PieceMeta = function (_a) {
    var piece = _a.piece, className = _a.className, _b = _a.healthbarColor, healthbarColor = _b === void 0 ? "none" : _b;
    var classes = useStyles();
    return (React.createElement(layout_1.Layout, { direction: "row", className: className, noSpacer: true },
        React.createElement(layout_1.Layout, { direction: "column", className: classes.meta, noSpacer: true },
            React.createElement(display_1.TypeIndicator, { className: classes.typeIndicator, type: piece.definition.type }),
            React.createElement("div", { className: classes.healthbarContainer },
                healthbarColor !== "none"
                    && (React.createElement(healthbar_1.Healthbar, { color: healthbarColor, current: piece.currentHealth, max: piece.maxHealth },
                        React.createElement(stageIndicator_1.StageIndicator, { className: classes.stage, stage: piece.stage }))),
                healthbarColor === "none"
                    && React.createElement(stageIndicator_1.StageIndicator, { className: classes.stage, stage: piece.stage }))),
        React.createElement("div", { className: classes.metaTop })));
};
exports.PieceMeta = PieceMeta;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/piece/piece.tsx":
/*!************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/piece/piece.tsx ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Piece = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var meta_1 = __webpack_require__(/*! ./meta */ "../../modules/@creature-chess/ui/src/piece/meta.tsx");
var useStyles = (0, react_jss_1.createUseStyles)({
    piece: {
        "position": "relative",
        "width": "100%",
        "height": "100%",
        "& > img": {
            "position": "absolute",
            "bottom": 0,
            "right": 0,
            "width": "80%"
        }
    },
    metaContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        padding: "2%"
    }
});
var Piece = React.forwardRef(function (props, ref) {
    var classes = useStyles();
    var piece = props.piece, healthbar = props.healthbar, children = props.children, className = props.className, onClick = props.onClick;
    return (React.createElement("div", { className: (0, classnames_1["default"])(classes.piece, className), ref: ref /* todo what to do here? */, onClick: onClick },
        React.createElement(meta_1.PieceMeta, { piece: piece, healthbarColor: healthbar, className: classes.metaContainer }),
        React.createElement(display_1.CreatureImage, { definitionId: piece.definitionId, facing: piece.facingAway ? "back" : "front", baseUrl: "https://creaturechess.com" }),
        children));
});
exports.Piece = Piece;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/piece/projectile.tsx":
/*!*****************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/piece/projectile.tsx ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Projectile = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var Projectile = function () { return (React.createElement("svg", { className: "projectile", height: "12", width: "12" },
    React.createElement("circle", { cx: "6", cy: "6", r: "4", stroke: "#FAD17D", strokeWidth: "2", fill: "#F5E687" }))); };
exports.Projectile = Projectile;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/piece/stageIndicator.tsx":
/*!*********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/piece/stageIndicator.tsx ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.StageIndicator = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var layout_1 = __webpack_require__(/*! ../layout */ "../../modules/@creature-chess/ui/src/layout/index.ts");
var StageIndicator = function (_a) {
    var stage = _a.stage, className = _a.className;
    var stars = [];
    if (stage === 0) {
        return null;
    }
    for (var i = 0; i <= stage; i++) {
        stars.push(React.createElement("img", { key: i, src: "https://creaturechess.com/images/ui/star.svg" }));
    }
    return React.createElement(layout_1.Layout, { className: className, direction: "column", justifyContent: "center", noSpacer: true }, stars);
};
exports.StageIndicator = StageIndicator;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/player/avatar.tsx":
/*!**************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/player/avatar.tsx ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.PlayerAvatar = void 0;
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var useStyles = (0, react_jss_1.createUseStyles)({
    image: {
        height: "64px"
    }
});
var PlayerAvatar = function (_a) {
    var _b;
    var player = _a.player;
    var classes = useStyles();
    if (!player || !((_b = player.profile) === null || _b === void 0 ? void 0 : _b.picture)) {
        return null;
    }
    return React.createElement("img", { className: (0, classnames_1["default"])(classes.image, "avatar"), src: "https://creaturechess.com/images/front/".concat(player.profile.picture, ".png") });
};
exports.PlayerAvatar = PlayerAvatar;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/player/healthbar.tsx":
/*!*****************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/player/healthbar.tsx ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.PlayerHealthbar = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var useStyles = (0, react_jss_1.createUseStyles)({
    playerHealth: {
        position: "relative",
        display: "block",
        width: "100%",
        height: "16px"
    },
    fill: {
        background: "#20b720"
    },
    content: {
        position: "absolute",
        top: 0,
        right: "0.25em",
        fontFamily: "Arial, sans-serif",
        fontSize: "0.8em",
        fontWeight: 700,
        color: "#000"
    }
});
var renderHealthbar = function (current) { return current.toString(); };
var PlayerHealthbar = function (_a) {
    var health = _a.health;
    var classes = useStyles();
    return (React.createElement(display_1.ProgressBar, { className: classes.playerHealth, fillClassName: classes.fill, contentClassName: classes.content, current: health, max: 100, renderContents: renderHealthbar }));
};
exports.PlayerHealthbar = PlayerHealthbar;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/player/index.ts":
/*!************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/player/index.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.Title = exports.PlayerProfile = exports.PlayerName = exports.PlayerHealthbar = exports.PlayerAvatar = void 0;
var avatar_1 = __webpack_require__(/*! ./avatar */ "../../modules/@creature-chess/ui/src/player/avatar.tsx");
__createBinding(exports, avatar_1, "PlayerAvatar");
var healthbar_1 = __webpack_require__(/*! ./healthbar */ "../../modules/@creature-chess/ui/src/player/healthbar.tsx");
__createBinding(exports, healthbar_1, "PlayerHealthbar");
var name_1 = __webpack_require__(/*! ./name */ "../../modules/@creature-chess/ui/src/player/name.tsx");
__createBinding(exports, name_1, "PlayerName");
var profile_1 = __webpack_require__(/*! ./profile */ "../../modules/@creature-chess/ui/src/player/profile.tsx");
__createBinding(exports, profile_1, "PlayerProfile");
var title_1 = __webpack_require__(/*! ./title */ "../../modules/@creature-chess/ui/src/player/title.tsx");
__createBinding(exports, title_1, "Title");


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/player/name.tsx":
/*!************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/player/name.tsx ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.PlayerName = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var getLocalStyles = function (_a) {
    var _b = _a.isLocal, isLocal = _b === void 0 ? false : _b;
    return isLocal ? { fontStyle: "italic", color: "#ffcd75" } : {};
};
var useStyles = (0, react_jss_1.createUseStyles)({
    name: function (props) { return (__assign({ fontFamily: "Arial, sans-serif", fontSize: "0.8em", fontWeight: 700, color: "#fff", textTransform: "uppercase" }, getLocalStyles(props))); }
});
var PlayerName = function (props) {
    var classes = useStyles(props);
    return React.createElement("span", { className: classes.name },
        props.position,
        ".\u00A0",
        props.name);
};
exports.PlayerName = PlayerName;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/player/profile.tsx":
/*!***************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/player/profile.tsx ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.PlayerProfile = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var title_1 = __webpack_require__(/*! ./title */ "../../modules/@creature-chess/ui/src/player/title.tsx");
var name_1 = __webpack_require__(/*! ./name */ "../../modules/@creature-chess/ui/src/player/name.tsx");
var useStyles = (0, react_jss_1.createUseStyles)({
    container: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: "0.15rem"
    },
    name: {
        marginBottom: "0.25rem"
    }
});
var PlayerProfile = function (props) {
    var _a;
    var classes = useStyles();
    var position = props.position, player = props.player, isLocal = props.isLocal;
    return (React.createElement("div", { className: classes.container },
        React.createElement("div", { className: classes.name },
            React.createElement(name_1.PlayerName, { position: position, name: player.name, isLocal: isLocal })),
        React.createElement(title_1.Title, { titleId: ((_a = player.profile) === null || _a === void 0 ? void 0 : _a.title) || null })));
};
exports.PlayerProfile = PlayerProfile;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/player/title.tsx":
/*!*************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/player/title.tsx ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Title = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var getColor = function (titleId) {
    switch (titleId) {
        case models_1.PlayerTitle.Developer:
            return "#79ffe0";
        case models_1.PlayerTitle.Contributor:
            return "#e89292";
        case models_1.PlayerTitle.HallOfFame:
            return "#f7ee85";
        default:
            return "#d6d0d0";
    }
};
var useStyles = (0, react_jss_1.createUseStyles)({
    title: {
        fontFamily: "Arial, sans-serif",
        fontSize: function (_a) {
            var _b = _a.size, size = _b === void 0 ? "small" : _b;
            return size === "small" ? "0.65rem" : "1rem";
        },
        fontWeight: 700,
        color: function (_a) {
            var titleId = _a.titleId;
            return getColor(titleId);
        },
        textAlign: "inherit",
        textTransform: "uppercase"
    }
});
var Title = function (props) {
    var classes = useStyles(props);
    if (!props.titleId) {
        return null;
    }
    return React.createElement("span", { className: classes.title }, models_1.TITLES[props.titleId].text);
};
exports.Title = Title;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/playerList/battleInfo.tsx":
/*!**********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/playerList/battleInfo.tsx ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.BattleInfo = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var getBattleText = function (battle) {
    if (!battle) {
        return "";
    }
    if (battle.status === models_1.PlayerBattleStatus.IN_PROGRESS) {
        return "Battling";
    }
    if (battle.status === models_1.PlayerBattleStatus.FINISHED) {
        return "".concat(battle.homeScore, " - ").concat(battle.awayScore);
    }
    return "";
};
var getResultColor = function (props) {
    if (!props || !props.battle || props.battle.status !== models_1.PlayerBattleStatus.FINISHED) {
        return "#ffcd74";
    }
    var _a = props.battle, isHomePlayer = _a.isHomePlayer, homeScore = _a.homeScore, awayScore = _a.awayScore;
    var win = isHomePlayer ? homeScore > awayScore : awayScore > homeScore;
    return win ? "#38b764" : "#b13e53";
};
var useStyles = (0, react_jss_1.createUseStyles)({
    battleInfo: {
        width: "fit-content",
        padding: "0.4em 1.2em",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        fontSize: "0.75em",
        color: "#c3c3c3",
        textAlign: "center",
        background: "#333"
    },
    highlight: {
        fontWeight: 700,
        color: "#fff",
        textTransform: "uppercase"
    },
    result: function (props) { return ({ color: getResultColor(props) }); }
});
var BattleInfo = function (props) {
    var classes = useStyles(props);
    var text = getBattleText(props.battle);
    if (!props.battle) {
        return null;
    }
    return (React.createElement("div", { className: classes.battleInfo },
        React.createElement("span", { className: (0, classnames_1["default"])(classes.highlight, classes.result) }, text),
        "\u00A0vs\u00A0",
        React.createElement("span", { className: classes.highlight }, props.opponentName || "")));
};
exports.BattleInfo = BattleInfo;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/playerList/index.ts":
/*!****************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/playerList/index.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.StatusPlayerListItem = exports.PlayerListItem = void 0;
var playerListItem_1 = __webpack_require__(/*! ./playerListItem */ "../../modules/@creature-chess/ui/src/playerList/playerListItem.tsx");
__createBinding(exports, playerListItem_1, "PlayerListItem");
var statusPlayerListItem_1 = __webpack_require__(/*! ./statusPlayerListItem */ "../../modules/@creature-chess/ui/src/playerList/statusPlayerListItem.tsx");
__createBinding(exports, statusPlayerListItem_1, "StatusPlayerListItem");


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/playerList/playerListItem.tsx":
/*!**************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/playerList/playerListItem.tsx ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
exports.PlayerListItem = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_1 = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var battleInfo_1 = __webpack_require__(/*! ./battleInfo */ "../../modules/@creature-chess/ui/src/playerList/battleInfo.tsx");
var useOnClickOutside_1 = __webpack_require__(/*! ../hooks/useOnClickOutside */ "../../modules/@creature-chess/ui/src/hooks/useOnClickOutside.ts");
var button_1 = __webpack_require__(/*! ../button */ "../../modules/@creature-chess/ui/src/button.tsx");
var streakIndicator_1 = __webpack_require__(/*! ./streakIndicator */ "../../modules/@creature-chess/ui/src/playerList/streakIndicator.tsx");
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var player_1 = __webpack_require__(/*! ../player */ "../../modules/@creature-chess/ui/src/player/index.ts");
var layout_1 = __webpack_require__(/*! ../layout */ "../../modules/@creature-chess/ui/src/layout/index.ts");
var getDetailReadyColor = function (_a) {
    var ready = _a.player.ready, _b = _a.showReadyIndicator, showReadyIndicator = _b === void 0 ? false : _b;
    return (ready && showReadyIndicator) ? "#20b720" : "#ccc";
};
var useStyles = (0, react_jss_1.createUseStyles)({
    container: function (props) { return ({
        "border": props.isOpponent ? "3px solid #b13e53" : "",
        "boxSizing": "border-box",
        "padding": "0.5rem",
        "background": "#566c86",
        "&:not(:last-child)": {
            marginBottom: "0.25em"
        }
    }); },
    details: function (props) { return ({
        flex: 1,
        paddingLeft: "0.5em",
        borderLeft: "5px solid ".concat(getDetailReadyColor(props))
    }); },
    badges: {
        "&>:not(:last-child)": {
            marginRight: "0.25em"
        }
    }
});
var PlayerListItem = function (props) {
    var classes = useStyles(props);
    var index = props.index, player = props.player, opponentName = props.opponentName, isLocal = props.isLocal, onSpectateClick = props.onSpectateClick, _a = props.currentlySpectating, currentlySpectating = _a === void 0 ? false : _a;
    var ref = (0, react_1.useRef)();
    var _b = __read((0, react_1.useState)(false), 2), isExpanded = _b[0], setIsExpanded = _b[1];
    (0, useOnClickOutside_1.useOnClickOutside)(ref, function () { return setIsExpanded(false); });
    var toggleExpanded = function () {
        // don't open for local player
        if (isLocal) {
            return;
        }
        setIsExpanded(!isExpanded);
    };
    return (React.createElement("div", { className: classes.container, onClick: toggleExpanded, ref: ref },
        React.createElement(layout_1.Layout, { direction: "row", noSpacer: true },
            React.createElement("div", { className: "picture" },
                React.createElement(player_1.PlayerAvatar, { player: player })),
            React.createElement("div", { className: classes.details },
                React.createElement(layout_1.Layout, { direction: "row", noSpacer: true },
                    React.createElement(layout_1.Half, null,
                        React.createElement(player_1.PlayerProfile, { position: index + 1, player: player, isLocal: isLocal })),
                    React.createElement(layout_1.Half, null,
                        React.createElement(player_1.PlayerHealthbar, { health: player.health }))),
                React.createElement(layout_1.Layout, { direction: "row" },
                    React.createElement(layout_1.Half, { className: classes.badges },
                        React.createElement(display_1.Label, { type: "highlight" },
                            "$",
                            player.money),
                        React.createElement(display_1.Label, null,
                            "Lv ",
                            player.level)),
                    React.createElement(layout_1.Half, null, currentlySpectating || isExpanded
                        ? React.createElement(button_1.Button, { onClick: onSpectateClick }, currentlySpectating ? "Stop spectating" : "Spectate")
                        : React.createElement(layout_1.Layout, { direction: "row", noSpacer: true },
                            React.createElement(battleInfo_1.BattleInfo, { battle: player.battle, opponentName: opponentName }),
                            React.createElement(streakIndicator_1.StreakIndicator, { type: player.streakType, amount: player.streakAmount }))))))));
};
exports.PlayerListItem = PlayerListItem;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/playerList/statusPlayerListItem.tsx":
/*!********************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/playerList/statusPlayerListItem.tsx ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.StatusPlayerListItem = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var battleInfo_1 = __webpack_require__(/*! ./battleInfo */ "../../modules/@creature-chess/ui/src/playerList/battleInfo.tsx");
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var useStyles = (0, react_jss_1.createUseStyles)({
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        boxSizing: "border-box",
        padding: "0.4rem",
        marginBottom: "0.25em",
        fontFamily: "Arial, sans-serif",
        fontSize: "1.2em",
        fontWeight: "700",
        color: "#fff",
        textAlign: "center",
        textTransform: "uppercase",
        background: "#3b3d40"
    },
    // todo make this into a component
    col: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "space-around"
    },
    subtitle: {
        padding: "0.5em 0",
        marginTop: "0.5em",
        fontFamily: "Arial, sans-serif",
        fontSize: "0.9em",
        fontWeight: 700,
        color: "#847878",
        textAlign: "center",
        textTransform: "uppercase",
        borderTop: "2px solid #847878",
        borderBottom: "2px solid #847878"
    },
    name: {
        fontSize: "1.8em",
        fontStyle: "italic",
        color: "#cecece"
    }
});
var StatusPlayerListItem = function (_a) {
    var name = _a.name, opponentName = _a.opponentName, battle = _a.battle, status = _a.status, subtitle = _a.subtitle;
    var classes = useStyles();
    return (React.createElement("div", { className: classes.container },
        React.createElement("div", { className: classes.col },
            React.createElement("span", { className: classes.name }, name)),
        React.createElement("div", { className: classes.col },
            React.createElement(display_1.Label, null, status),
            React.createElement(battleInfo_1.BattleInfo, { battle: battle, opponentName: opponentName }),
            subtitle && React.createElement("span", { className: classes.subtitle }, subtitle))));
};
exports.StatusPlayerListItem = StatusPlayerListItem;


/***/ }),

/***/ "../../modules/@creature-chess/ui/src/playerList/streakIndicator.tsx":
/*!***************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/src/playerList/streakIndicator.tsx ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.StreakIndicator = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var getBackground = function (type) { return type === models_1.StreakType.WIN ? "#38b764" : "#b13e53"; };
var useStyles = (0, react_jss_1.createUseStyles)({
    indicator: function (props) { return ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: "0 0.4em",
        fontFamily: "Arial, sans-serif",
        fontSize: "0.8em",
        color: "#fff",
        background: getBackground(props.type),
        borderRadius: "50%"
    }); }
});
var StreakIndicator = function (props) {
    var classes = useStyles(props);
    if (props.type === null || !props.amount || props.amount === 1) {
        return null;
    }
    return React.createElement("div", { className: classes.indicator }, props.amount);
};
exports.StreakIndicator = StreakIndicator;


/***/ }),

/***/ "../../modules/@creature-chess/ui/styles.ts":
/*!**************************************************!*\
  !*** ../../modules/@creature-chess/ui/styles.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
exports.__esModule = true;
exports.useGlobalStyles = void 0;
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var useResetStyles = (0, react_jss_1.createUseStyles)({
    "@global": (_a = {},
        _a["html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p,"
            + "blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em,"
            + "img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i,"
            + "center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption,"
            + "tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,"
            + "figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary,"
            + "time, mark, audio, video"] = {
            padding: "0",
            margin: "0",
            font: "inherit",
            fontSize: "100%",
            verticalAlign: "baseline",
            border: "0"
        },
        _a["article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section"] = {
            display: "block"
        },
        _a["body"] = {
            lineHeight: "1"
        },
        _a["ol, ul"] = {
            listStyle: "none"
        },
        _a["blockquote, q"] = {
            quotes: "none"
        },
        _a["blockquote::before, blockquote::after, q::before, q::after"] = {
            content: "none"
        },
        _a["table"] = {
            borderSpacing: "0",
            borderCollapse: "collapse"
        },
        _a)
});
var useGlobalGameStyles = (0, react_jss_1.createUseStyles)({
    "@global": {
        "*": {
            userSelect: "none"
        },
        ".approot": {
            width: "100%",
            height: "100vh"
        },
        "body": {
            background: "#333c57"
        }
    }
});
var useGlobalStyles = function () {
    useResetStyles();
    useGlobalGameStyles();
};
exports.useGlobalStyles = useGlobalStyles;


/***/ }),

/***/ "../../package.json":
/*!**************************!*\
  !*** ../../package.json ***!
  \**************************/
/***/ ((module) => {

module.exports = JSON.parse('{"private":true,"name":"creature-chess","version":"0.4.23","description":"Creature Chess","scripts":{"build-web-game":"yarn workspace @creature-chess/web-game build","build-server-game":"yarn build-web-game && cp -r apps/web-game/public apps/server-game","build-server-info":"","build-web-menu":"","dev-web-game":"yarn workspace @creature-chess/web-game dev","dev-web-menu":"yarn workspace @creature-chess/web-menu dev","dev-tools":"yarn workspace @creature-chess/tools start","start-server-game":"ts-node-dev apps/server-game/index.ts","start-server-info":"ts-node-dev apps/server-info/index.ts 3000","start-web-menu":"yarn workspace @creature-chess/web-menu dev","test":"yarn workspaces foreach run test","dockerup":"docker-compose build && docker-compose up","storybook":"yarn workspace @creature-chess/ui storybook","lint":"eslint \\"apps/**/*.ts\\" \\"modules/**/*.ts\\"","ecr-push":"sh ./scripts/ecr-push.sh"},"workspaces":["modules/@creature-chess/*","modules/@shoki/*","apps/*"],"author":"","license":"ISC","devDependencies":{"@babel/core":"^7.16.0","@types/jest":"^26.0.24","@types/node":"^16.4.3","@types/react-modal":"^3.12.0","@types/ws":"^7.4.7","@typescript-eslint/eslint-plugin":"^4.28.5","@typescript-eslint/parser":"^4.28.5","eslint":"^7.31.0","eslint-plugin-import":"^2.23.4","eslint-plugin-jsdoc":"^36.0.4","eslint-plugin-prefer-arrow":"^1.2.3","eslint-plugin-react":"^7.24.0","jest":"^27.0.6","jest-standard-reporter":"^2.0.0","node-sass":"^4.12.0","ts-jest":"^27.0.4","typescript":"^4.3.5"},"dependencies":{"@types/react":"^17.0.15","@types/react-dom":"^17.0.9","react":"^17.0.2","react-dnd":"^14.0.4","react-dom":"^17.0.2","redux":"^4.1.0","redux-saga":"^1.1.3","ts-node-dev":"^1.1.8"},"packageManager":"yarn@3.1.1"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
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
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_creature_chess_web_menu"] = self["webpackChunk_creature_chess_web_menu"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_auth0_auth0-react_dist_auth0-react_esm_js-node_modules_sentry_react_esm_-75311e"], () => (__webpack_require__("./src/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle-762c29093ffc74167032.js.map