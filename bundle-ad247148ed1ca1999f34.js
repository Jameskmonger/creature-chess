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
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "../../node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var react_modal_1 = __importDefault(__webpack_require__(/*! react-modal */ "../../node_modules/react-modal/lib/index.js"));
var auth_web_1 = __webpack_require__(/*! @creature-chess/auth-web */ "../../modules/@creature-chess/auth-web/index.ts");
var ui_1 = __webpack_require__(/*! @creature-chess/ui */ "../../modules/@creature-chess/ui/index.ts");
var patchUser_1 = __webpack_require__(/*! ./patchUser */ "./src/patchUser.ts");
var UnauthenticatedRootPage = function () {
    var _a = (0, auth0_react_1.useAuth0)(), loginWithRedirect = _a.loginWithRedirect, isLoading = _a.isLoading;
    return React.createElement(ui_1.LoginPage, { isLoading: isLoading, onSignInClick: loginWithRedirect });
};
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
react_modal_1["default"].setAppElement("#approot");
var App = function () {
    var _a = (0, auth0_react_1.useAuth0)(), isAuthenticated = _a.isAuthenticated, isLoading = _a.isLoading;
    (0, ui_1.useGlobalStyles)();
    if (isLoading) {
        return React.createElement("span", null, "Loading");
    }
    if (isAuthenticated) {
        return React.createElement(AuthenticatedRootPage, null);
    }
    return React.createElement(UnauthenticatedRootPage, null);
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
var Sentry = __importStar(__webpack_require__(/*! @sentry/react */ "../../node_modules/@sentry/react/esm/index.js"));
var tracing_1 = __webpack_require__(/*! @sentry/tracing */ "../../node_modules/@sentry/tracing/esm/index.js");
var ReactDOM = __importStar(__webpack_require__(/*! react-dom */ "../../node_modules/react-dom/index.js"));
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
var AppRoot = function () {
    var onRedirectCallback = function (appState) {
        window.location.href = (appState === null || appState === void 0 ? void 0 : appState.returnTo) || window.location.pathname;
    };
    return (React.createElement(auth_web_1.AuthProvider, { onRedirectCallback: onRedirectCallback },
        React.createElement(app_1.App, null)));
};
ReactDOM.render(React.createElement(AppRoot, null), document.getElementById("approot"));


/***/ }),

/***/ "./src/patchUser.ts":
/*!**************************!*\
  !*** ./src/patchUser.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.patchUser = void 0;
var CURRENT_USER_ENDPOINT = "".concat("https://user-api.creaturechess.com", "/user/current");
var patchUser = function (token, nickname, picture) {
    return fetch(CURRENT_USER_ENDPOINT, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ nickname: nickname, picture: picture })
    });
};
exports.patchUser = patchUser;


/***/ }),

/***/ "../../modules/@creature-chess/auth-web/config.ts":
/*!********************************************************!*\
  !*** ../../modules/@creature-chess/auth-web/config.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.auth0Config = void 0;
exports.auth0Config = {
    domain: "creaturechess.eu.auth0.com",
    clientID: "HNUYYyRCtFJsA3xKGp964Kgy4jwx8bW1",
    redirectUri: "https://creaturechess.com/",
    audience: "https://".concat("creaturechess.eu.auth0.com", "/api/v2/"),
    scope: "openid profile email"
};


/***/ }),

/***/ "../../modules/@creature-chess/auth-web/context.tsx":
/*!**********************************************************!*\
  !*** ../../modules/@creature-chess/auth-web/context.tsx ***!
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
exports.__esModule = true;
exports.usePlayerId = exports.Auth0ContextProvider = exports.AuthContextProvider = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "../../node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var AuthContext = React.createContext({ user: null });
AuthContext.displayName = "AuthContext";
exports.AuthContextProvider = AuthContext.Provider;
function Auth0ContextProvider(_a) {
    var children = _a.children;
    var user = (0, auth0_react_1.useAuth0)().user;
    return (React.createElement(AuthContext.Provider, { value: { user: user || null } }, children));
}
exports.Auth0ContextProvider = Auth0ContextProvider;
var usePlayerId = function () {
    var user = React.useContext(AuthContext).user;
    if (!user) {
        return "";
    }
    return user["https://creaturechess.jamesmonger.com/playerId"];
};
exports.usePlayerId = usePlayerId;


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
exports.usePlayerId = exports.Auth0ContextProvider = exports.AuthContextProvider = exports.hasNickname = exports.isRegistered = exports.AuthProvider = void 0;
var provider_1 = __webpack_require__(/*! ./provider */ "../../modules/@creature-chess/auth-web/provider.tsx");
__createBinding(exports, provider_1, "AuthProvider");
var isRegistered_1 = __webpack_require__(/*! ./isRegistered */ "../../modules/@creature-chess/auth-web/isRegistered.ts");
__createBinding(exports, isRegistered_1, "isRegistered");
__createBinding(exports, isRegistered_1, "hasNickname");
var context_1 = __webpack_require__(/*! ./context */ "../../modules/@creature-chess/auth-web/context.tsx");
__createBinding(exports, context_1, "AuthContextProvider");
__createBinding(exports, context_1, "Auth0ContextProvider");
__createBinding(exports, context_1, "usePlayerId");


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
    return Boolean(user &&
        user["".concat(namespace, "/playerNickname")] !== null &&
        user["".concat(namespace, "/playerPicture")] !== null);
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
    var domain = config_1.auth0Config.domain, clientID = config_1.auth0Config.clientID, redirectUri = config_1.auth0Config.redirectUri;
    if (!domain) {
        throw Error("no auth0 domain");
    }
    if (!clientID) {
        throw Error("no auth0 clientID");
    }
    if (!redirectUri) {
        throw Error("no auth0 redirectUri");
    }
    return (react_1["default"].createElement(auth0_react_1.Auth0Provider, { domain: domain, clientId: clientID, redirectUri: config_1.auth0Config.redirectUri, audience: config_1.auth0Config.audience, scope: config_1.auth0Config.scope, cacheLocation: "localstorage", onRedirectCallback: onRedirectCallback, useRefreshTokens: true }, children));
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
exports.Builders = exports.QuickChatOption = exports.getXpToNextLevel = exports.defaultGameOptions = exports.getOptions = exports.CreatureType = exports.DefinitionClass = exports.attackTypes = exports.getRelativeDirection = exports.getDelta = exports.getDistance = exports.createTileCoordinates = exports.Directions = exports.TileType = exports.TITLES = exports.PlayerTitle = exports.GamePhase = exports.validateNicknameFormat = exports.Constants = exports.StreakType = exports.finishedBattle = exports.inProgressBattle = exports.PlayerBattleStatus = exports.PlayerStatus = void 0;
var Constants = __importStar(__webpack_require__(/*! ./src/constants */ "../../modules/@creature-chess/models/src/constants.ts"));
exports.Constants = Constants;
var player_list_player_1 = __webpack_require__(/*! ./src/player-list-player */ "../../modules/@creature-chess/models/src/player-list-player.ts");
__createBinding(exports, player_list_player_1, "PlayerStatus");
__createBinding(exports, player_list_player_1, "PlayerBattleStatus");
__createBinding(exports, player_list_player_1, "inProgressBattle");
__createBinding(exports, player_list_player_1, "finishedBattle");
var streakType_1 = __webpack_require__(/*! ./src/streakType */ "../../modules/@creature-chess/models/src/streakType.ts");
__createBinding(exports, streakType_1, "StreakType");
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
var options_1 = __webpack_require__(/*! ./src/options */ "../../modules/@creature-chess/models/src/options.ts");
__createBinding(exports, options_1, "getOptions");
__createBinding(exports, options_1, "defaultOptions", "defaultGameOptions");
var getXpToNextLevel_1 = __webpack_require__(/*! ./src/getXpToNextLevel */ "../../modules/@creature-chess/models/src/getXpToNextLevel.ts");
__createBinding(exports, getXpToNextLevel_1, "getXpToNextLevel");
var quickChat_1 = __webpack_require__(/*! ./src/quickChat */ "../../modules/@creature-chess/models/src/quickChat.ts");
__createBinding(exports, quickChat_1, "QuickChatOption");
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

/***/ "../../modules/@creature-chess/models/src/constants.ts":
/*!*************************************************************!*\
  !*** ../../modules/@creature-chess/models/src/constants.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
exports.__esModule = true;
exports.AVAILABLE_PROFILE_PICTURES = exports.LOBBY_WAIT_TIME = exports.MAX_PLAYERS_IN_GAME = exports.MAX_NAME_LENGTH = exports.DEFAULT_TURN_DURATION = exports.DEFAULT_TURN_COUNT = exports.PIECES_TO_EVOLVE = exports.BUY_XP_AMOUNT = exports.BUY_XP_COST = exports.HEALTH_LOST_PER_PIECE = exports.MAX_PLAYER_LEVEL = exports.STARTING_HEALTH = exports.STARTING_LEVEL = exports.STARTING_MONEY = exports.REROLL_COST = exports.PHASE_LENGTHS = exports.BENCH_SLOT_COUNT = exports.GRID_SIZE = void 0;
var game_phase_1 = __webpack_require__(/*! ./game-phase */ "../../modules/@creature-chess/models/src/game-phase.ts");
exports.GRID_SIZE = {
    width: 7,
    height: 6
};
exports.BENCH_SLOT_COUNT = 9;
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
exports.MAX_NAME_LENGTH = 16;
exports.MAX_PLAYERS_IN_GAME = 8;
exports.LOBBY_WAIT_TIME = 60;
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
    ? [1, 1, 2, 4, 8, 13, 18, 24, 30]
    : [1, 1, 2, 4, 8, 16, 24, 32, 40];
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

/***/ "../../modules/@creature-chess/ui/gameBoard/GameBoard.tsx":
/*!****************************************************************!*\
  !*** ../../modules/@creature-chess/ui/gameBoard/GameBoard.tsx ***!
  \****************************************************************/
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
exports.GameBoard = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var board_react_1 = __webpack_require__(/*! @shoki/board-react */ "../../modules/@shoki/board-react/index.ts");
var useElementSize_1 = __webpack_require__(/*! @shoki/board-react/src/useElementSize */ "../../modules/@shoki/board-react/src/useElementSize.tsx");
var GameBoardContext_1 = __webpack_require__(/*! ./GameBoardContext */ "../../modules/@creature-chess/ui/gameBoard/GameBoardContext.ts");
var createClickEvent = function (location) { return ({ location: location }); };
var createDropPieceEvent = function (id, location) { return ({ id: id, location: location }); };
function useEvents(_a) {
    var onClick = _a.onClick, onDropPiece = _a.onDropPiece;
    var onClickBoard = React.useCallback(function (_a) {
        var x = _a.x, y = _a.y;
        if (!onClick) {
            return;
        }
        onClick(createClickEvent({ locationType: "board", x: x, y: y }));
    }, [onClick]);
    var onClickBench = React.useCallback(function (_a) {
        var x = _a.x;
        if (!onClick) {
            return;
        }
        onClick(createClickEvent({ locationType: "bench", x: x }));
    }, [onClick]);
    var onDropBoard = React.useCallback(function (_a) {
        var id = _a.id, x = _a.x, y = _a.y;
        if (!onDropPiece) {
            return;
        }
        onDropPiece(createDropPieceEvent(id, { locationType: "board", x: x, y: y }));
    }, [onDropPiece]);
    var onDropBench = React.useCallback(function (_a) {
        var id = _a.id, x = _a.x;
        if (!onDropPiece) {
            return;
        }
        onDropPiece(createDropPieceEvent(id, { locationType: "bench", x: x }));
    }, [onDropPiece]);
    return {
        onClickBoard: onClickBoard,
        onClickBench: onClickBench,
        onDropBoard: onDropBoard,
        onDropBench: onDropBench
    };
}
function useRenderers(_a) {
    var renderBoardPiece = _a.renderBoardPiece, renderBenchPiece = _a.renderBenchPiece;
    var _b = (0, GameBoardContext_1.useGameBoard)(), board = _b.board, bench = _b.bench;
    var boardPieceRenderer = React.useMemo(function () { return function (item) {
        var piece = item;
        var draggable = !board.locked;
        return {
            item: renderBoardPiece(piece),
            draggable: draggable
        };
    }; }, [renderBoardPiece]);
    var benchPieceRenderer = React.useMemo(function () { return function (item) {
        var piece = item;
        var draggable = !bench.locked;
        return {
            item: renderBenchPiece(piece),
            draggable: draggable
        };
    }; }, [renderBoardPiece]);
    return { boardPieceRenderer: boardPieceRenderer, benchPieceRenderer: benchPieceRenderer };
}
var useStyles = (0, react_jss_1.createUseStyles)({
    gameBoard: {
        "height": "100%",
        "width": "100%",
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "center",
        "& .tile.dark": {
            background: "#38b764"
        },
        "& .tile.light": {
            background: "#a7f070"
        }
    },
    board: function (_a) {
        var isPortrait = _a.isPortrait;
        return (__assign(__assign({}, (isPortrait ? {} : { height: "78%" })), { display: "flex", justifyContent: "center", marginBottom: "1em" }));
    },
    bench: function (_a) {
        var isPortrait = _a.isPortrait, boardWidth = _a.boardWidth;
        return (__assign(__assign({}, (isPortrait ? {} : { height: "14%" })), { "width": "".concat(boardWidth, "px"), "margin": "0 auto", "& .tile": {
                background: "#9e9e9e !important",
                boxShadow: "inset 0 0 2px #404040"
            } }));
    }
});
function GameBoard(_a) {
    var renderBoardPiece = _a.renderBoardPiece, renderBenchPiece = _a.renderBenchPiece, onClick = _a.onClick, onDropPiece = _a.onDropPiece;
    var _b = (0, GameBoardContext_1.useGameBoard)(), board = _b.board, bench = _b.bench;
    var _c = useRenderers({
        renderBoardPiece: renderBoardPiece,
        renderBenchPiece: renderBenchPiece
    }), boardPieceRenderer = _c.boardPieceRenderer, benchPieceRenderer = _c.benchPieceRenderer;
    var _d = useEvents({
        onClick: onClick,
        onDropPiece: onDropPiece
    }), onClickBoard = _d.onClickBoard, onClickBench = _d.onClickBench, onDropBoard = _d.onDropBoard, onDropBench = _d.onDropBench;
    var _e = (0, useElementSize_1.useElementSize)(), ref = _e.ref, isPortrait = _e.isPortrait, size = _e.size;
    // listen to the board width and set the bench to be the same width
    var _f = (0, useElementSize_1.useElementSize)(), boardRef = _f.ref, boardSize = _f.size;
    var styles = useStyles({ isPortrait: isPortrait, boardWidth: boardSize.width });
    return (React.createElement("div", { className: styles.gameBoard, ref: ref },
        React.createElement("div", { className: styles.board },
            React.createElement(board_react_1.BoardGrid, { state: board, onDropItem: onDropBoard, onClickTile: onClickBoard, renderItem: boardPieceRenderer, scaleMode: isPortrait ? "width" : "height", ref: boardRef })),
        React.createElement("div", { className: styles.bench },
            React.createElement(board_react_1.BoardGrid, { state: bench, onDropItem: onDropBench, onClickTile: onClickBench, renderItem: benchPieceRenderer }))));
}
exports.GameBoard = GameBoard;


/***/ }),

/***/ "../../modules/@creature-chess/ui/gameBoard/GameBoardContext.ts":
/*!**********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/gameBoard/GameBoardContext.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.useGameBoard = exports.GameBoardContextProvider = void 0;
var react_1 = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var GameBoardContext = (0, react_1.createContext)(null);
GameBoardContext.displayName = "GameBoardContext";
exports.GameBoardContextProvider = GameBoardContext.Provider;
var useGameBoard = function () {
    var GameBoard = (0, react_1.useContext)(GameBoardContext);
    if (!GameBoard) {
        throw new Error("No valid GameBoardContext found for useGameBoard");
    }
    return GameBoard;
};
exports.useGameBoard = useGameBoard;


/***/ }),

/***/ "../../modules/@creature-chess/ui/gameBoard/index.ts":
/*!***********************************************************!*\
  !*** ../../modules/@creature-chess/ui/gameBoard/index.ts ***!
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
exports.useGameBoard = exports.GameBoardContextProvider = exports.GameBoard = void 0;
var GameBoard_1 = __webpack_require__(/*! ./GameBoard */ "../../modules/@creature-chess/ui/gameBoard/GameBoard.tsx");
__createBinding(exports, GameBoard_1, "GameBoard");
var GameBoardContext_1 = __webpack_require__(/*! ./GameBoardContext */ "../../modules/@creature-chess/ui/gameBoard/GameBoardContext.ts");
__createBinding(exports, GameBoardContext_1, "GameBoardContextProvider");
__createBinding(exports, GameBoardContext_1, "useGameBoard");


/***/ }),

/***/ "../../modules/@creature-chess/ui/hooks/index.ts":
/*!*******************************************************!*\
  !*** ../../modules/@creature-chess/ui/hooks/index.ts ***!
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
exports.useElementSize = exports.useOnClickOutside = void 0;
var useOnClickOutside_1 = __webpack_require__(/*! ./useOnClickOutside */ "../../modules/@creature-chess/ui/hooks/useOnClickOutside.ts");
__createBinding(exports, useOnClickOutside_1, "useOnClickOutside");
var useElementSize_1 = __webpack_require__(/*! ./useElementSize */ "../../modules/@creature-chess/ui/hooks/useElementSize.ts");
__createBinding(exports, useElementSize_1, "useElementSize");


/***/ }),

/***/ "../../modules/@creature-chess/ui/hooks/useElementSize.ts":
/*!****************************************************************!*\
  !*** ../../modules/@creature-chess/ui/hooks/useElementSize.ts ***!
  \****************************************************************/
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
exports.useElementSize = void 0;
var react_1 = __importDefault(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
function useElementSize() {
    var _a = __read(react_1["default"].useState([0, 0]), 2), size = _a[0], setSize = _a[1];
    var rowRef = react_1["default"].useRef(null);
    react_1["default"].useEffect(function () {
        if (rowRef.current) {
            setSize([rowRef.current.clientWidth, rowRef.current.clientHeight]);
        }
    }, [rowRef]);
    var isPortrait = react_1["default"].useMemo(function () { return size[1] > size[0]; }, [size]);
    return {
        isPortrait: isPortrait,
        size: { width: size[0], height: size[1] },
        ref: rowRef
    };
}
exports.useElementSize = useElementSize;


/***/ }),

/***/ "../../modules/@creature-chess/ui/hooks/useOnClickOutside.ts":
/*!*******************************************************************!*\
  !*** ../../modules/@creature-chess/ui/hooks/useOnClickOutside.ts ***!
  \*******************************************************************/
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.Countdown = exports.useGlobalStyles = exports.Footer = exports.StreakIndicator = exports.StatusPlayerListItem = exports.PlayerListItem = exports.Label = exports.TypeIndicator = exports.ProgressBar = exports.CreatureImage = exports.Card = exports.CardShop = exports.Title = exports.PlayerAvatar = exports.PlayerProfile = exports.PlayerName = exports.PlayerHealthbar = void 0;
__exportStar(__webpack_require__(/*! ./layout */ "../../modules/@creature-chess/ui/layout/index.ts"), exports);
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
__createBinding(exports, playerList_1, "StreakIndicator");
var Footer_1 = __webpack_require__(/*! ./src/Footer */ "../../modules/@creature-chess/ui/src/Footer.tsx");
__createBinding(exports, Footer_1, "Footer");
__exportStar(__webpack_require__(/*! ./pages */ "../../modules/@creature-chess/ui/pages/index.ts"), exports);
var styles_1 = __webpack_require__(/*! ./styles */ "../../modules/@creature-chess/ui/styles.ts");
__createBinding(exports, styles_1, "useGlobalStyles");
__exportStar(__webpack_require__(/*! ./gameBoard */ "../../modules/@creature-chess/ui/gameBoard/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./piece */ "../../modules/@creature-chess/ui/piece/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./player */ "../../modules/@creature-chess/ui/player/index.ts"), exports);
var countdown_1 = __webpack_require__(/*! ./src/countdown */ "../../modules/@creature-chess/ui/src/countdown.tsx");
__createBinding(exports, countdown_1, "Countdown");


/***/ }),

/***/ "../../modules/@creature-chess/ui/layout/Group.tsx":
/*!*********************************************************!*\
  !*** ../../modules/@creature-chess/ui/layout/Group.tsx ***!
  \*********************************************************/
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
exports.Group = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var SPACER = "1em";
var useStyles = (0, react_jss_1.createUseStyles)({
    "group": {
        display: "flex",
        flex: "1",
        boxSizing: "border-box",
        justifyContent: "center",
        flexDirection: "column"
    },
    "@media (orientation: portrait)": {
        group: function (_a) {
            var spacer = _a.spacer;
            return spacer
                ? {
                    "&:not(:first-child)": {
                        "margin-top": SPACER
                    }
                }
                : undefined;
        }
    },
    "@media (orientation: landscape)": {
        group: function (_a) {
            var spacer = _a.spacer;
            return spacer
                ? {
                    "&:not(:first-child)": {
                        "margin-left": SPACER
                    }
                }
                : undefined;
        }
    }
});
function Group(_a) {
    var children = _a.children, className = _a.className, _b = _a.spacer, spacer = _b === void 0 ? true : _b;
    var styles = useStyles({ spacer: spacer });
    return React.createElement("div", { className: (0, classnames_1["default"])(styles.group, className) }, children);
}
exports.Group = Group;


/***/ }),

/***/ "../../modules/@creature-chess/ui/layout/Half.tsx":
/*!********************************************************!*\
  !*** ../../modules/@creature-chess/ui/layout/Half.tsx ***!
  \********************************************************/
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
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var react_jss_1 = __importDefault(__webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js"));
var styles = function (_a) {
    var isVertical = _a.isVertical;
    return ({
        half: isVertical ? { height: "50%" } : { width: "50%" }
    });
};
var UnstyledHalf = function (props) { return (React.createElement("div", { className: (0, classnames_1["default"])(props.classes.half, props.className) }, props.children)); };
var Half = (0, react_jss_1["default"])(styles)(UnstyledHalf);
exports.Half = Half;


/***/ }),

/***/ "../../modules/@creature-chess/ui/layout/Layout.tsx":
/*!**********************************************************!*\
  !*** ../../modules/@creature-chess/ui/layout/Layout.tsx ***!
  \**********************************************************/
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
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var isVertical = function (direction) {
    return direction === "column" || direction === "column-reverse";
};
var getSpacer = function (noSpacer) {
    return noSpacer ? {} : { padding: "0.25em" };
};
var getSize = function (grow) {
    return grow ? { width: "100%", height: "100%" } : {};
};
var useStyles = (0, react_jss_1.createUseStyles)({
    layout: function (_a) {
        var direction = _a.direction, _b = _a.justifyContent, justifyContent = _b === void 0 ? "space-between" : _b, _c = _a.noSpacer, noSpacer = _c === void 0 ? false : _c, _d = _a.grow, grow = _d === void 0 ? false : _d;
        return (__assign(__assign({ display: "flex", justifyContent: justifyContent, flexDirection: direction }, getSize(grow)), getSpacer(noSpacer)));
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

/***/ "../../modules/@creature-chess/ui/layout/index.ts":
/*!********************************************************!*\
  !*** ../../modules/@creature-chess/ui/layout/index.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.Layout = exports.Half = exports.Group = void 0;
var Group_1 = __webpack_require__(/*! ./Group */ "../../modules/@creature-chess/ui/layout/Group.tsx");
__createBinding(exports, Group_1, "Group");
var Half_1 = __webpack_require__(/*! ./Half */ "../../modules/@creature-chess/ui/layout/Half.tsx");
__createBinding(exports, Half_1, "Half");
var Layout_1 = __webpack_require__(/*! ./Layout */ "../../modules/@creature-chess/ui/layout/Layout.tsx");
__createBinding(exports, Layout_1, "Layout");


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
    "lobbyPage": {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "scroll",
        paddingTop: "2em",
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
var Footer_1 = __webpack_require__(/*! ../../src/Footer */ "../../modules/@creature-chess/ui/src/Footer.tsx");
var countdown_1 = __webpack_require__(/*! ../../src/countdown */ "../../modules/@creature-chess/ui/src/countdown.tsx");
var LobbyPage_styles_1 = __webpack_require__(/*! ./LobbyPage.styles */ "../../modules/@creature-chess/ui/pages/lobby/LobbyPage.styles.ts");
var LobbyPageContext_1 = __webpack_require__(/*! ./LobbyPageContext */ "../../modules/@creature-chess/ui/pages/lobby/LobbyPageContext.ts");
var LobbyPlayerBanner_1 = __webpack_require__(/*! ./LobbyPlayerBanner/LobbyPlayerBanner */ "../../modules/@creature-chess/ui/pages/lobby/LobbyPlayerBanner/LobbyPlayerBanner.tsx");
var padNumberToTwo = function (val) { return (val < 10 ? "0".concat(val) : val.toString()); };
var countdownRender = function (styles) { return function (totalSecondsRemaining) {
    var minutesRemaining = Math.floor(totalSecondsRemaining / 60);
    var secondsRemaining = Math.ceil(totalSecondsRemaining % 60);
    var time = "".concat(minutesRemaining, ":").concat(padNumberToTwo(secondsRemaining));
    return (React.createElement("div", { className: styles.timeRemaining },
        "Game starting in",
        " ",
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
    return (React.createElement("div", { className: styles.lobbyPage },
        React.createElement("div", { className: styles.lobbyInfo },
            startingAtMs && (React.createElement(countdown_1.Countdown, { countdownToSeconds: startingAtMs / 1000, render: countdownRender(styles) })),
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
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var avatar_1 = __webpack_require__(/*! ../../../src/player/avatar */ "../../modules/@creature-chess/ui/src/player/avatar.tsx");
var title_1 = __webpack_require__(/*! ../../../src/player/title */ "../../modules/@creature-chess/ui/src/player/title.tsx");
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
    var _b;
    var player = _a.player;
    var styles = useStyles();
    if (!player) {
        return (React.createElement("div", { className: "".concat(styles.player, " ").concat(styles.bot) },
            React.createElement("span", { className: styles.nameAndImage },
                React.createElement("img", { src: "images/ui/no_player_img.png", alt: "no player image" }),
                React.createElement("div", null),
                "empty slot")));
    }
    return (React.createElement("div", { className: styles.player },
        React.createElement("span", { className: styles.nameAndImage },
            React.createElement(avatar_1.PlayerAvatar, { player: player }),
            React.createElement("div", null),
            player.name),
        React.createElement(title_1.Title, { titleId: (_b = player.profile) === null || _b === void 0 ? void 0 : _b.title })));
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
        "height": "100%",
        "width": "100%",
        "overflow": "scroll",
        "paddingTop": "2em",
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
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var Footer_1 = __webpack_require__(/*! ../../src/Footer */ "../../modules/@creature-chess/ui/src/Footer.tsx");
var MenuPage_styles_1 = __webpack_require__(/*! ./MenuPage.styles */ "../../modules/@creature-chess/ui/pages/menu/MenuPage.styles.ts");
var MenuPageContext_1 = __webpack_require__(/*! ./MenuPageContext */ "../../modules/@creature-chess/ui/pages/menu/MenuPageContext.ts");
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
            error && (React.createElement("div", { className: styles.error },
                React.createElement("p", null, error)))),
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
var RegistrationPage_styles_1 = __webpack_require__(/*! ./RegistrationPage.styles */ "../../modules/@creature-chess/ui/pages/menu/registration/RegistrationPage.styles.ts");
var NicknameSelection_1 = __webpack_require__(/*! ./input/NicknameSelection */ "../../modules/@creature-chess/ui/pages/menu/registration/input/NicknameSelection.tsx");
var PictureSelection_1 = __webpack_require__(/*! ./input/PictureSelection */ "../../modules/@creature-chess/ui/pages/menu/registration/input/PictureSelection.tsx");
function RegistrationPage(_a) {
    var _this = this;
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
    var onRegisterClick = function () { return __awaiter(_this, void 0, void 0, function () {
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
}
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
            react_1["default"].createElement("img", { src: "images/front/".concat(picture, ".png"), alt: creatureName }),
            react_1["default"].createElement("p", null, creatureName),
            react_1["default"].createElement("input", { type: "radio", value: picture, checked: currentImage === picture, onChange: onSelect })));
    })));
};
exports.PictureSelection = PictureSelection;


/***/ }),

/***/ "../../modules/@creature-chess/ui/piece/Piece.tsx":
/*!********************************************************!*\
  !*** ../../modules/@creature-chess/ui/piece/Piece.tsx ***!
  \********************************************************/
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
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var display_1 = __webpack_require__(/*! ../src/display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var PieceContext_1 = __webpack_require__(/*! ./PieceContext */ "../../modules/@creature-chess/ui/piece/PieceContext.ts");
var meta_1 = __webpack_require__(/*! ./meta */ "../../modules/@creature-chess/ui/piece/meta/index.ts");
var useStyles = (0, react_jss_1.createUseStyles)({
    piece: {
        "position": "relative",
        "width": "100%",
        "height": "100%",
        "& > img": {
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "80%"
        }
    },
    metaContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "row",
        width: "20%",
        height: "100%",
        boxSizing: "border-box",
        padding: "2%"
    },
    imageContainer: {
        position: "absolute",
        bottom: "0",
        left: "14%",
        width: "80%",
        height: "80%"
    }
});
var Piece = React.forwardRef(function (props, ref) {
    var classes = useStyles();
    var piece = (0, PieceContext_1.usePiece)().piece;
    var healthbar = props.healthbar, children = props.children, className = props.className, onClick = props.onClick;
    return (React.createElement("div", { className: (0, classnames_1["default"])(classes.piece, className), ref: ref /* todo what to do here? */, onClick: onClick },
        React.createElement("div", { className: classes.metaContainer },
            React.createElement(meta_1.PieceMeta, { piece: piece, healthbarColor: healthbar })),
        React.createElement("div", { className: classes.imageContainer },
            React.createElement(display_1.CreatureImage, { definitionId: piece.definitionId, facing: piece.facingAway ? "back" : "front" })),
        children));
});
exports.Piece = Piece;


/***/ }),

/***/ "../../modules/@creature-chess/ui/piece/PieceContext.ts":
/*!**************************************************************!*\
  !*** ../../modules/@creature-chess/ui/piece/PieceContext.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.usePiece = exports.PieceContextProvider = void 0;
var react_1 = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var PieceContext = (0, react_1.createContext)(null);
PieceContext.displayName = "PieceContext";
exports.PieceContextProvider = PieceContext.Provider;
var usePiece = function () {
    var piece = (0, react_1.useContext)(PieceContext);
    if (!piece) {
        throw new Error("No valid PieceContext found for usePiece");
    }
    return piece;
};
exports.usePiece = usePiece;


/***/ }),

/***/ "../../modules/@creature-chess/ui/piece/Projectile.tsx":
/*!*************************************************************!*\
  !*** ../../modules/@creature-chess/ui/piece/Projectile.tsx ***!
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
exports.Projectile = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var Projectile = function (_a) {
    var className = _a.className;
    return (React.createElement("svg", { className: className, height: "12", width: "12" },
        React.createElement("circle", { cx: "6", cy: "6", r: "4", stroke: "#FAD17D", strokeWidth: "2", fill: "#F5E687" })));
};
exports.Projectile = Projectile;


/***/ }),

/***/ "../../modules/@creature-chess/ui/piece/index.ts":
/*!*******************************************************!*\
  !*** ../../modules/@creature-chess/ui/piece/index.ts ***!
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
exports.Projectile = exports.usePiece = exports.PieceContextProvider = exports.Piece = void 0;
var Piece_1 = __webpack_require__(/*! ./Piece */ "../../modules/@creature-chess/ui/piece/Piece.tsx");
__createBinding(exports, Piece_1, "Piece");
var PieceContext_1 = __webpack_require__(/*! ./PieceContext */ "../../modules/@creature-chess/ui/piece/PieceContext.ts");
__createBinding(exports, PieceContext_1, "PieceContextProvider");
__createBinding(exports, PieceContext_1, "usePiece");
__exportStar(__webpack_require__(/*! ./match */ "../../modules/@creature-chess/ui/piece/match/index.ts"), exports);
var Projectile_1 = __webpack_require__(/*! ./Projectile */ "../../modules/@creature-chess/ui/piece/Projectile.tsx");
__createBinding(exports, Projectile_1, "Projectile");


/***/ }),

/***/ "../../modules/@creature-chess/ui/piece/match/MatchPiece.styles.tsx":
/*!**************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/piece/match/MatchPiece.styles.tsx ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.usePieceStyles = exports.useAnimationStyles = void 0;
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var ATTACK_DURATION_MS = 200;
var ATTACK_MOVEMENT_MULTIPLIER_PX = 3;
var HIT_ROTATION_MULTIPLIER_DEG = 1;
var projectileSize = "10px";
exports.useAnimationStyles = (0, react_jss_1.createUseStyles)({
    "@keyframes piece-dying-anim": {
        "100%": {
            transform: "scale(0)"
        }
    },
    "dying": {
        animationName: "$piece-dying-anim",
        animationDuration: "1000ms",
        animationFillMode: "forwards",
        animationIterationCount: "1"
    },
    "@keyframes piece-attack-basic-anim": {
        "0%": {
            top: "0",
            left: "0"
        },
        "50%": {
            top: "calc(calc(".concat(ATTACK_MOVEMENT_MULTIPLIER_PX, "px * var(--attackPower)) * var(--attackYDirection))"),
            left: "calc(calc(".concat(ATTACK_MOVEMENT_MULTIPLIER_PX, "px * var(--attackPower)) * var(--attackXDirection))")
        },
        "100%": {
            top: "0",
            left: "0"
        }
    },
    "attackBasic": {
        animationName: "$piece-attack-basic-anim",
        animationDuration: "".concat(ATTACK_DURATION_MS, "ms")
    },
    "@keyframes piece-attack-shoot-anim": {
        "0%": {
            top: "calc(50% - (".concat(projectileSize, " / 2))"),
            left: "calc(50% - (".concat(projectileSize, " / 2))")
        },
        "100%": {
            top: "calc(\n\t\t\t\t((100% * var(--attackDistance) * var(--attackYDirection)) + 50%) -\n\t\t\t\t  (".concat(projectileSize, " / 2)\n\t\t\t  )"),
            left: "calc(\n\t\t\t\t((100% * var(--attackDistance) * var(--attackXDirection)) + 50%) -\n\t\t\t\t  (".concat(projectileSize, " / 2)\n\t\t\t  )")
        }
    },
    "projectile": {
        display: "none",
        position: "absolute",
        top: "calc(50% - (".concat(projectileSize, " / 2))"),
        left: "calc(50% - (".concat(projectileSize, " / 2))")
    },
    "attackShoot": {
        "& $projectile": {
            display: "block",
            animationName: "$piece-attack-shoot-anim",
            animationDuration: "".concat(ATTACK_DURATION_MS, "ms")
        }
    },
    "@keyframes piece-receive-hit-anim": {
        "0%": {
            transform: "rotate(0deg)"
        },
        "25%": {
            transform: "rotate(calc(".concat(HIT_ROTATION_MULTIPLIER_DEG, "deg * var(--hitPower) * -1))")
        },
        "75%": {
            transform: "rotate(calc(".concat(HIT_ROTATION_MULTIPLIER_DEG, "deg * var(--hitPower)))")
        },
        "100%": {
            transform: "rotate(0deg)"
        }
    },
    "receiveHit": {
        animationName: "$piece-receive-hit-anim",
        animationDuration: "".concat(ATTACK_DURATION_MS, "ms")
    }
});
exports.usePieceStyles = (0, react_jss_1.createUseStyles)({
    piece: {
        position: "relative",
        zIndex: 50,
        width: "100%",
        height: "100%"
    }
});


/***/ }),

/***/ "../../modules/@creature-chess/ui/piece/match/MatchPiece.tsx":
/*!*******************************************************************!*\
  !*** ../../modules/@creature-chess/ui/piece/match/MatchPiece.tsx ***!
  \*******************************************************************/
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.MatchPiece = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var Piece_1 = __webpack_require__(/*! ../Piece */ "../../modules/@creature-chess/ui/piece/Piece.tsx");
var PieceContext_1 = __webpack_require__(/*! ../PieceContext */ "../../modules/@creature-chess/ui/piece/PieceContext.ts");
var Projectile_1 = __webpack_require__(/*! ../Projectile */ "../../modules/@creature-chess/ui/piece/Projectile.tsx");
var MatchPiece_styles_1 = __webpack_require__(/*! ./MatchPiece.styles */ "../../modules/@creature-chess/ui/piece/match/MatchPiece.styles.tsx");
var animation_1 = __webpack_require__(/*! ./animation */ "../../modules/@creature-chess/ui/piece/match/animation.ts");
var getHealthbar = function (ownerId, viewingPlayerId) {
    return ownerId === viewingPlayerId ? "friendly" : "enemy";
};
var animationEventMatchesAnimation = function (event, animation) {
    return event.animationName.includes("piece-".concat(animation.keyframesName, "-anim"));
};
var MatchPiece = function () {
    var _a = (0, PieceContext_1.usePiece)(), piece = _a.piece, viewingPlayerId = _a.viewingPlayerId;
    var animationStyles = (0, MatchPiece_styles_1.useAnimationStyles)();
    var styles = (0, MatchPiece_styles_1.usePieceStyles)();
    var _b = __read(React.useState([]), 2), currentAnimations = _b[0], setCurrentAnimations = _b[1];
    var _c = __read(React.useState(null), 2), lastRenderedPiece = _c[0], setLastRenderedPiece = _c[1];
    var runAnimation = function (name, keyframesName, variables) {
        return setCurrentAnimations(function (oldAnimations) {
            var newAnimation = { name: name, keyframesName: keyframesName, variables: variables };
            return __spreadArray(__spreadArray([], __read(oldAnimations.filter(function (a) { return a.name !== name; })), false), [
                newAnimation,
            ], false);
        });
    };
    var removeAnimation = function (name) {
        return setCurrentAnimations(function (oldAnimations) {
            return oldAnimations.filter(function (animation) { return animation.name !== name; });
        });
    };
    var onAnimationEnd = function (event) {
        // don't remove dying animation
        if (event.animationName.includes("piece-dying-anim")) {
            return;
        }
        setCurrentAnimations(function (oldAnimations) {
            return oldAnimations.filter(function (a) { return !animationEventMatchesAnimation(event, a); });
        });
    };
    var runAnimations = function (newPiece) {
        var attacking = newPiece.attacking, hit = newPiece.hit, currentHealth = newPiece.currentHealth;
        if (!lastRenderedPiece) {
            setLastRenderedPiece(newPiece);
            return;
        }
        if (attacking && !lastRenderedPiece.attacking) {
            if (attacking.attackType.name === models_1.attackTypes.basic.name) {
                runAnimation(animationStyles.attackBasic, "attack-basic", {
                    attackPower: attacking.damage,
                    attackXDirection: attacking.direction.x,
                    attackYDirection: attacking.direction.y
                });
            }
            else if (attacking.attackType.name === models_1.attackTypes.shoot.name) {
                runAnimation(animationStyles.attackShoot, "attack-shoot", {
                    attackPower: attacking.damage,
                    attackXDirection: attacking.direction.x,
                    attackYDirection: attacking.direction.y,
                    attackDistance: attacking.distance
                });
            }
        }
        if (hit && !lastRenderedPiece.hit) {
            runAnimation(animationStyles.receiveHit, "receive-hit", {
                hitPower: hit.damage
            });
        }
        if (currentHealth === 0) {
            if (lastRenderedPiece.currentHealth !== 0) {
                runAnimation(animationStyles.dying, "dying");
            }
        }
        else {
            if (lastRenderedPiece.currentHealth === 0) {
                removeAnimation(animationStyles.dying);
            }
        }
        setLastRenderedPiece(newPiece);
    };
    React.useEffect(function () {
        if (piece) {
            runAnimations(piece);
        }
        else {
            setLastRenderedPiece(null);
        }
    }, [piece]);
    if (!piece) {
        return null;
    }
    var animationClasses = currentAnimations.map(function (a) { return a.name; });
    var className = classnames_1["default"].apply(void 0, __spreadArray([styles.piece], __read(animationClasses), false));
    return (React.createElement("div", { className: className, style: (0, animation_1.getAnimationCssVariables)(currentAnimations), 
        // eslint-disable-next-line react/jsx-no-bind
        onAnimationEnd: onAnimationEnd },
        React.createElement(Piece_1.Piece, { healthbar: getHealthbar(piece.ownerId, viewingPlayerId) },
            React.createElement(Projectile_1.Projectile, { className: animationStyles.projectile }))));
};
exports.MatchPiece = MatchPiece;


/***/ }),

/***/ "../../modules/@creature-chess/ui/piece/match/animation.ts":
/*!*****************************************************************!*\
  !*** ../../modules/@creature-chess/ui/piece/match/animation.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports) {


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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.getAnimationCssVariables = void 0;
var getAnimationCssVariables = function (animations) {
    var variables = Object.assign.apply(Object, __spreadArray([{}], __read(animations.filter(function (a) { return a.variables; }).map(function (a) { return a.variables; })), false));
    return Object.assign.apply(Object, __spreadArray([{}], __read(Object.keys(variables).map(function (key) {
        var _a;
        return (_a = {}, _a["--".concat(key)] = variables[key], _a);
    })), false));
};
exports.getAnimationCssVariables = getAnimationCssVariables;


/***/ }),

/***/ "../../modules/@creature-chess/ui/piece/match/index.ts":
/*!*************************************************************!*\
  !*** ../../modules/@creature-chess/ui/piece/match/index.ts ***!
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
exports.MatchPiece = void 0;
var MatchPiece_1 = __webpack_require__(/*! ./MatchPiece */ "../../modules/@creature-chess/ui/piece/match/MatchPiece.tsx");
__createBinding(exports, MatchPiece_1, "MatchPiece");


/***/ }),

/***/ "../../modules/@creature-chess/ui/piece/meta/PieceHealthbar.tsx":
/*!**********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/piece/meta/PieceHealthbar.tsx ***!
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
exports.PieceHealthbar = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var display_1 = __webpack_require__(/*! ../../src/display */ "../../modules/@creature-chess/ui/src/display/index.ts");
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
var PieceHealthbar = function (props) {
    var classes = useStyles(props);
    return (React.createElement(display_1.ProgressBar, { fillClassName: classes.fill, current: props.current, max: props.max, vertical: true }, props.children));
};
exports.PieceHealthbar = PieceHealthbar;


/***/ }),

/***/ "../../modules/@creature-chess/ui/piece/meta/PieceMeta.tsx":
/*!*****************************************************************!*\
  !*** ../../modules/@creature-chess/ui/piece/meta/PieceMeta.tsx ***!
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
exports.PieceMeta = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var layout_1 = __webpack_require__(/*! ../../layout */ "../../modules/@creature-chess/ui/layout/index.ts");
var display_1 = __webpack_require__(/*! ../../src/display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var PieceHealthbar_1 = __webpack_require__(/*! ./PieceHealthbar */ "../../modules/@creature-chess/ui/piece/meta/PieceHealthbar.tsx");
var PieceStageIndicator_1 = __webpack_require__(/*! ./PieceStageIndicator */ "../../modules/@creature-chess/ui/piece/meta/PieceStageIndicator.tsx");
var useStyles = (0, react_jss_1.createUseStyles)({
    typeIndicatorContainer: {
        marginBottom: "0.25em",
        width: "100%"
    },
    healthbarContainer: {
        flex: 1,
        position: "relative"
    },
    stage: {
        "position": "absolute",
        "top": "10%",
        "left": "7%",
        "width": "86%",
        "height": "80%",
        "& > img": {
            width: "100%"
        }
    }
});
var PieceMeta = function (_a) {
    var piece = _a.piece, _b = _a.healthbarColor, healthbarColor = _b === void 0 ? "none" : _b;
    var classes = useStyles();
    var stageIndicator = (React.createElement("div", { className: classes.stage },
        React.createElement(PieceStageIndicator_1.PieceStageIndicator, { stage: piece.stage })));
    return (React.createElement(layout_1.Layout, { grow: true, direction: "column", noSpacer: true },
        React.createElement("div", { className: classes.typeIndicatorContainer },
            React.createElement(display_1.TypeIndicator, { type: piece.definition.type })),
        React.createElement("div", { className: classes.healthbarContainer },
            healthbarColor !== "none" && (React.createElement(PieceHealthbar_1.PieceHealthbar, { color: healthbarColor, current: piece.currentHealth, max: piece.maxHealth }, stageIndicator)),
            healthbarColor === "none" && stageIndicator)));
};
exports.PieceMeta = PieceMeta;


/***/ }),

/***/ "../../modules/@creature-chess/ui/piece/meta/PieceStageIndicator.tsx":
/*!***************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/piece/meta/PieceStageIndicator.tsx ***!
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
exports.PieceStageIndicator = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var layout_1 = __webpack_require__(/*! ../../layout */ "../../modules/@creature-chess/ui/layout/index.ts");
var PieceStageIndicator = function (_a) {
    var stage = _a.stage;
    var stars = [];
    if (stage === 0) {
        return null;
    }
    for (var i = 0; i <= stage; i++) {
        stars.push(React.createElement("img", { key: i, src: "images/ui/star.svg" }));
    }
    return (React.createElement(layout_1.Layout, { grow: true, direction: "column", justifyContent: "center", noSpacer: true }, stars));
};
exports.PieceStageIndicator = PieceStageIndicator;


/***/ }),

/***/ "../../modules/@creature-chess/ui/piece/meta/index.ts":
/*!************************************************************!*\
  !*** ../../modules/@creature-chess/ui/piece/meta/index.ts ***!
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
exports.PieceMeta = void 0;
var PieceMeta_1 = __webpack_require__(/*! ./PieceMeta */ "../../modules/@creature-chess/ui/piece/meta/PieceMeta.tsx");
__createBinding(exports, PieceMeta_1, "PieceMeta");


/***/ }),

/***/ "../../modules/@creature-chess/ui/player/PlayerGameProfile.styles.ts":
/*!***************************************************************************!*\
  !*** ../../modules/@creature-chess/ui/player/PlayerGameProfile.styles.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.useStyles = void 0;
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
exports.useStyles = (0, react_jss_1.createUseStyles)({
    profile: {
        padding: "0.25rem",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
        background: "#566c86"
    },
    row: {
        "display": "flex",
        "flexDirection": "row",
        "alignItems": "center",
        "&:not(:last-child)": {
            marginBottom: "0.4em"
        }
    },
    item: {
        flex: "1"
    },
    buyXpButton: {
        width: "50%",
        height: "2em",
        boxSizing: "border-box",
        padding: "0.5em 1em",
        marginLeft: "0.5em",
        fontSize: "1em",
        lineHeight: "1em",
        color: "#fff",
        cursor: "pointer",
        background: "#1a1c2c",
        border: "none"
    },
    level: {
        "display": "flex",
        "justifyContent": "space-evenly",
        "alignItems": "center",
        "flexDirection": "row",
        "fontWeight": "700",
        "& > span": {
            color: "#ffcd75"
        }
    },
    xpProgress: {
        width: "50%",
        height: "1.75em",
        background: "#636363"
    },
    xpProgressFill: {
        paddingLeft: "1em",
        background: "#ffcd75"
    },
    xpProgressContent: {
        color: "#1a1c2c"
    },
    pieceCount: {
        fontSize: "0.85em",
        fontStyle: "italic",
        textAlign: "center"
    },
    pieceCountWarning: {
        width: "fit-content",
        padding: "0.2em 0.4em",
        fontWeight: "700",
        color: "#ff6464",
        background: "#ffd2d2",
        border: "2px solid #ff6464"
    }
});


/***/ }),

/***/ "../../modules/@creature-chess/ui/player/PlayerGameProfile.tsx":
/*!*********************************************************************!*\
  !*** ../../modules/@creature-chess/ui/player/PlayerGameProfile.tsx ***!
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.PlayerGameProfile = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var progressBar_1 = __webpack_require__(/*! ../src/display/progressBar */ "../../modules/@creature-chess/ui/src/display/progressBar.tsx");
var healthbar_1 = __webpack_require__(/*! ../src/player/healthbar */ "../../modules/@creature-chess/ui/src/player/healthbar.tsx");
var PlayerGameProfile_styles_1 = __webpack_require__(/*! ./PlayerGameProfile.styles */ "../../modules/@creature-chess/ui/player/PlayerGameProfile.styles.ts");
var renderProgressBar = function (current, max) {
    return "".concat(current, " / ").concat(max, " xp");
};
var PieceCount = function (_a) {
    var level = _a.level, pieceCount = _a.pieceCount;
    var styles = (0, PlayerGameProfile_styles_1.useStyles)();
    if (pieceCount < level) {
        return (React.createElement("p", { className: (0, classnames_1["default"])(styles.item, styles.pieceCount, styles.pieceCountWarning) },
            pieceCount,
            " / ",
            level,
            " pieces (board not full!)"));
    }
    return (React.createElement("p", { className: (0, classnames_1["default"])(styles.item, styles.pieceCount) },
        pieceCount,
        " / ",
        level,
        " pieces"));
};
var PlayerGameProfile = function (_a) {
    var health = _a.health, level = _a.level, xp = _a.xp, money = _a.money, pieceCount = _a.pieceCount, onBuyXpClick = _a.onBuyXpClick;
    var styles = (0, PlayerGameProfile_styles_1.useStyles)();
    if (health === null) {
        return null;
    }
    return (React.createElement("div", { className: styles.profile },
        React.createElement("div", { className: styles.row },
            React.createElement("p", { className: (0, classnames_1["default"])(styles.item, styles.level) },
                "Level ",
                level,
                " ",
                React.createElement("span", null,
                    "$",
                    money)),
            level !== models_1.MAX_PLAYER_LEVEL && (React.createElement(progressBar_1.ProgressBar, { className: styles.xpProgress, fillClassName: styles.xpProgressFill, contentClassName: styles.xpProgressContent, current: xp, max: (0, models_1.getXpToNextLevel)(level), renderContents: renderProgressBar }))),
        React.createElement("div", { className: styles.row },
            React.createElement(PieceCount, { level: level, pieceCount: pieceCount }),
            level !== models_1.MAX_PLAYER_LEVEL && (React.createElement("button", { className: styles.buyXpButton, onClick: onBuyXpClick },
                "Buy ",
                models_1.Constants.BUY_XP_AMOUNT,
                " xp ($",
                models_1.Constants.BUY_XP_COST,
                ")"))),
        React.createElement(healthbar_1.PlayerHealthbar, { health: health })));
};
exports.PlayerGameProfile = PlayerGameProfile;


/***/ }),

/***/ "../../modules/@creature-chess/ui/player/index.ts":
/*!********************************************************!*\
  !*** ../../modules/@creature-chess/ui/player/index.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.PlayerGameProfile = void 0;
var PlayerGameProfile_1 = __webpack_require__(/*! ./PlayerGameProfile */ "../../modules/@creature-chess/ui/player/PlayerGameProfile.tsx");
__createBinding(exports, PlayerGameProfile_1, "PlayerGameProfile");


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
var getColor = function (style) {
    return style === "primary" ? "#fff" : "#fff";
};
var getBackground = function (style) {
    return style === "primary" ? "#1a1c2c" : "#1a1c2c";
};
var useStyles = (0, react_jss_1.createUseStyles)({
    button: function (props) { return ({
        "padding": "0.25em 1em",
        "fontSize": "1em",
        "color": getColor(props.type),
        "background": getBackground(props.type),
        "border": "none",
        "cursor": "pointer",
        "&:disabled": {
            background: "#575758",
            cursor: "not-allowed"
        }
    }); }
});
var Button = function (props) {
    var classes = useStyles(props);
    var onClick = props.onClick, _a = props.disabled, disabled = _a === void 0 ? false : _a, children = props.children;
    return (React.createElement("button", { className: classes.button, onClick: !disabled ? onClick : undefined, disabled: disabled }, children));
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
var layout_1 = __webpack_require__(/*! ../../layout */ "../../modules/@creature-chess/ui/layout/index.ts");
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
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
            React.createElement(display_1.CreatureImage, { definitionId: definitionId }),
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
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var layout_1 = __webpack_require__(/*! ../../layout */ "../../modules/@creature-chess/ui/layout/index.ts");
var card_1 = __webpack_require__(/*! ./card */ "../../modules/@creature-chess/ui/src/cardShop/card.tsx");
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
        return (React.createElement("div", { className: (0, classnames_1["default"])(classes.cardContainer, (_a = {},
                _a[classes.selected] = isSelected,
                _a)) },
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
var layout_1 = __webpack_require__(/*! ../../layout */ "../../modules/@creature-chess/ui/layout/index.ts");
var button_1 = __webpack_require__(/*! ../button */ "../../modules/@creature-chess/ui/src/button.tsx");
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var cardSelector_1 = __webpack_require__(/*! ./cardSelector */ "../../modules/@creature-chess/ui/src/cardShop/cardSelector.tsx");
var currentCard_1 = __webpack_require__(/*! ./currentCard */ "../../modules/@creature-chess/ui/src/cardShop/currentCard.tsx");
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
    var onBuyCurrentCard = function () {
        return onBuy && selectedIndex !== null && onBuy(selectedIndex);
    };
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
        React.createElement(layout_1.Layout, { direction: "column", justifyContent: "center", className: classes.grow }, selectedCard && showSelectedCard && (React.createElement(currentCard_1.CurrentCard, { card: selectedCard, onBuy: onBuyCurrentCard }))),
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
var layout_1 = __webpack_require__(/*! ../../layout */ "../../modules/@creature-chess/ui/layout/index.ts");
var button_1 = __webpack_require__(/*! ../button */ "../../modules/@creature-chess/ui/src/button.tsx");
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
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
                React.createElement(display_1.CreatureImage, { definitionId: card.definitionId })),
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
    _a[models_1.CreatureType.Fire] = "images/ui/type-fire.svg",
    _a[models_1.CreatureType.Earth] = "images/ui/type-earth.svg",
    _a[models_1.CreatureType.Metal] = "images/ui/type-metal.svg",
    _a[models_1.CreatureType.Water] = "images/ui/type-water.svg",
    _a[models_1.CreatureType.Wood] = "images/ui/type-wood.svg",
    _a);
var TypeIndicator = function (_a) {
    var type = _a.type;
    return React.createElement("img", { src: "https://creaturechess.com/game/" + ICON_FOR_TYPE[type] });
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
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var useStyles = (0, react_jss_1.createUseStyles)({
    image: {
        width: "100%",
        height: "100%",
        imageRendering: "pixelated",
        fallbacks: [
            {
                imageRendering: "optimize-contrast"
            },
            {
                imageRendering: "-webkit-optimize-contrast"
            },
            {
                imageRendering: "-o-crisp-edges"
            },
            {
                imageRendering: "-moz-crisp-edges"
            },
            {
                imageRendering: "optimizeSpeed"
            },
        ],
        msInterpolationMode: "nearest-neighbor"
    }
});
function CreatureImage(_a) {
    var facing = _a.facing, definitionId = _a.definitionId;
    return (React.createElement("img", { className: useStyles().image, src: "https://creaturechess.com/game/images/".concat(facing || "front", "/").concat(definitionId, ".png") }));
}
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
        color: function (props) { return (props.type === "highlight" ? "#ffcd75" : "#fff"); }
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
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var getPercentage = function (current, max) {
    return Math.floor((current / max) * 100) + "%";
};
var getFillStyle = function (_a) {
    var _b = _a.vertical, vertical = _b === void 0 ? false : _b, current = _a.current, max = _a.max;
    return vertical
        ? { height: getPercentage(current, max) }
        : { width: getPercentage(current, max) };
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
        renderContents && (React.createElement("span", { className: (0, classnames_1["default"])(classes.contents, contentClassName) }, renderContents(current, max))),
        children));
};
exports.ProgressBar = ProgressBar;


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
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var useStyles = (0, react_jss_1.createUseStyles)({
    image: {
        height: "64px"
    }
});
function PlayerAvatar(_a) {
    var _b;
    var player = _a.player;
    var classes = useStyles();
    if (!player || !((_b = player.profile) === null || _b === void 0 ? void 0 : _b.picture)) {
        return null;
    }
    return (React.createElement("img", { className: (0, classnames_1["default"])(classes.image, "avatar"), src: "https://creaturechess.com/game/images/front/".concat(player.profile.picture, ".png") }));
}
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
    return (React.createElement("span", { className: classes.name },
        props.position,
        ".\u00A0",
        props.name));
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
var name_1 = __webpack_require__(/*! ./name */ "../../modules/@creature-chess/ui/src/player/name.tsx");
var title_1 = __webpack_require__(/*! ./title */ "../../modules/@creature-chess/ui/src/player/title.tsx");
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
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
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
    if (!props ||
        !props.battle ||
        props.battle.status !== models_1.PlayerBattleStatus.FINISHED) {
        return "#ffcd74";
    }
    var _a = props.battle, isHomePlayer = _a.isHomePlayer, homeScore = _a.homeScore, awayScore = _a.awayScore;
    var win = isHomePlayer ? homeScore > awayScore : awayScore > homeScore;
    return win ? "#38b764" : "#b13e53";
};
var useStyles = (0, react_jss_1.createUseStyles)({
    battleInfo: {
        padding: "0.25em 0.5em",
        fontFamily: "Arial, sans-serif",
        fontSize: "0.625em",
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
        React.createElement("span", null, "\u00A0vs\u00A0"),
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
exports.StreakIndicator = exports.StatusPlayerListItem = exports.PlayerListItem = void 0;
var playerListItem_1 = __webpack_require__(/*! ./playerListItem */ "../../modules/@creature-chess/ui/src/playerList/playerListItem.tsx");
__createBinding(exports, playerListItem_1, "PlayerListItem");
var statusPlayerListItem_1 = __webpack_require__(/*! ./statusPlayerListItem */ "../../modules/@creature-chess/ui/src/playerList/statusPlayerListItem.tsx");
__createBinding(exports, statusPlayerListItem_1, "StatusPlayerListItem");
var streakIndicator_1 = __webpack_require__(/*! ./streakIndicator */ "../../modules/@creature-chess/ui/src/playerList/streakIndicator.tsx");
__createBinding(exports, streakIndicator_1, "StreakIndicator");


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
var hooks_1 = __webpack_require__(/*! ../../hooks */ "../../modules/@creature-chess/ui/hooks/index.ts");
var layout_1 = __webpack_require__(/*! ../../layout */ "../../modules/@creature-chess/ui/layout/index.ts");
var button_1 = __webpack_require__(/*! ../button */ "../../modules/@creature-chess/ui/src/button.tsx");
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var player_1 = __webpack_require__(/*! ../player */ "../../modules/@creature-chess/ui/src/player/index.ts");
var battleInfo_1 = __webpack_require__(/*! ./battleInfo */ "../../modules/@creature-chess/ui/src/playerList/battleInfo.tsx");
var streakIndicator_1 = __webpack_require__(/*! ./streakIndicator */ "../../modules/@creature-chess/ui/src/playerList/streakIndicator.tsx");
var getDetailReadyColor = function (_a) {
    var ready = _a.player.ready, _b = _a.showReadyIndicator, showReadyIndicator = _b === void 0 ? false : _b;
    return (ready && showReadyIndicator ? "#20b720" : "#ccc");
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
        borderLeft: "5px solid ".concat(getDetailReadyColor(props)),
        display: "flex",
        flexDirection: "column"
    }); },
    grow: {
        flex: 1
    },
    battleContainer: {
        width: "100%"
    },
    badges: {
        "&>:not(:last-child)": {
            marginRight: "0.25em"
        },
        "display": "flex",
        "flexDirection": "row",
        "justifyContent": "space-between",
        "padding": "0 1em",
        "boxSizing": "border-box",
        "alignItems": "center"
    }
});
var PlayerListItem = function (props) {
    var styles = useStyles(props);
    var index = props.index, player = props.player, opponentName = props.opponentName, isLocal = props.isLocal, onSpectateClick = props.onSpectateClick, _a = props.currentlySpectating, currentlySpectating = _a === void 0 ? false : _a;
    var ref = (0, react_1.useRef)();
    var _b = __read((0, react_1.useState)(false), 2), isExpanded = _b[0], setIsExpanded = _b[1];
    (0, hooks_1.useOnClickOutside)(ref, function () { return setIsExpanded(false); });
    var toggleExpanded = function () {
        // don't open for local player
        if (isLocal) {
            return;
        }
        setIsExpanded(!isExpanded);
    };
    return (React.createElement("div", { className: styles.container, onClick: toggleExpanded, ref: ref },
        React.createElement(layout_1.Layout, { direction: "row", noSpacer: true },
            React.createElement(player_1.PlayerAvatar, { player: player }),
            React.createElement("div", { className: styles.details },
                React.createElement(layout_1.Layout, { direction: "row", noSpacer: true },
                    React.createElement(layout_1.Half, null,
                        React.createElement(player_1.PlayerProfile, { position: index + 1, player: player, isLocal: isLocal })),
                    React.createElement(layout_1.Half, null,
                        React.createElement(player_1.PlayerHealthbar, { health: player.health }))),
                React.createElement(layout_1.Layout, { direction: "row", className: styles.grow },
                    React.createElement(layout_1.Half, { className: styles.badges },
                        React.createElement(streakIndicator_1.StreakIndicator, { type: player.streakType, amount: player.streakAmount }),
                        React.createElement(display_1.Label, { type: "highlight" },
                            "$",
                            player.money),
                        React.createElement(display_1.Label, null,
                            "Lv ",
                            player.level)),
                    React.createElement(layout_1.Half, null, currentlySpectating || isExpanded ? (React.createElement(button_1.Button, { onClick: onSpectateClick }, currentlySpectating ? "Stop spectating" : "Spectate")) : (React.createElement(layout_1.Layout, { direction: "row", noSpacer: true, justifyContent: "center", className: styles.battleContainer },
                        React.createElement(battleInfo_1.BattleInfo, { battle: player.battle, opponentName: opponentName })))))))));
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
var display_1 = __webpack_require__(/*! ../display */ "../../modules/@creature-chess/ui/src/display/index.ts");
var battleInfo_1 = __webpack_require__(/*! ./battleInfo */ "../../modules/@creature-chess/ui/src/playerList/battleInfo.tsx");
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
var getBackground = function (type) {
    return type === models_1.StreakType.WIN ? "#38b764" : "#b13e53";
};
var useStyles = (0, react_jss_1.createUseStyles)({
    indicator: function (props) { return ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: "0.4em",
        fontFamily: "Arial, sans-serif",
        fontSize: "0.9em",
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
        _a["html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p," +
            "blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em," +
            "img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i," +
            "center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption," +
            "tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure," +
            "figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary," +
            "time, mark, audio, video"] = {
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
            position: "fixed",
            width: "100vw",
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

/***/ "../../modules/@shoki/board-react/index.ts":
/*!*************************************************!*\
  !*** ../../modules/@shoki/board-react/index.ts ***!
  \*************************************************/
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
exports.DndProvider = exports.BoardGrid = exports.useBelowPieceLimit = exports.usePiecePositions = exports.usePieces = exports.useBoardState = void 0;
var context_1 = __webpack_require__(/*! ./src/context */ "../../modules/@shoki/board-react/src/context.ts");
__createBinding(exports, context_1, "useBoardState");
__createBinding(exports, context_1, "usePieces");
__createBinding(exports, context_1, "usePiecePositions");
__createBinding(exports, context_1, "useBelowPieceLimit");
var components_1 = __webpack_require__(/*! ./src/components */ "../../modules/@shoki/board-react/src/components/index.ts");
__createBinding(exports, components_1, "BoardGrid");
__exportStar(__webpack_require__(/*! ./src/events */ "../../modules/@shoki/board-react/src/events.ts"), exports);
var DndProvider_1 = __webpack_require__(/*! ./src/DndProvider */ "../../modules/@shoki/board-react/src/DndProvider.tsx");
__createBinding(exports, DndProvider_1, "DndProvider");


/***/ }),

/***/ "../../modules/@shoki/board-react/src/DndProvider.tsx":
/*!************************************************************!*\
  !*** ../../modules/@shoki/board-react/src/DndProvider.tsx ***!
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
exports.DndProvider = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_dnd_multi_backend_1 = __webpack_require__(/*! react-dnd-multi-backend */ "../../node_modules/react-dnd-multi-backend/dist/esm/index.js");
var HTML5toTouch_1 = __importDefault(__webpack_require__(/*! react-dnd-multi-backend/dist/cjs/HTML5toTouch */ "../../node_modules/react-dnd-multi-backend/dist/cjs/HTML5toTouch.js"));
var DndProvider = function (_a) {
    var children = _a.children;
    return (React.createElement(react_dnd_multi_backend_1.DndProvider, { options: HTML5toTouch_1["default"] }, children));
};
exports.DndProvider = DndProvider;


/***/ }),

/***/ "../../modules/@shoki/board-react/src/components/BoardGrid.tsx":
/*!*********************************************************************!*\
  !*** ../../modules/@shoki/board-react/src/components/BoardGrid.tsx ***!
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
exports.BoardGrid = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var context_1 = __webpack_require__(/*! ../context */ "../../modules/@shoki/board-react/src/context.ts");
var useElementSize_1 = __webpack_require__(/*! ../useElementSize */ "../../modules/@shoki/board-react/src/useElementSize.tsx");
var BoardGridRows_1 = __webpack_require__(/*! ./BoardGridRows */ "../../modules/@shoki/board-react/src/components/BoardGridRows.tsx");
var BoardItems_1 = __webpack_require__(/*! ./items/BoardItems */ "../../modules/@shoki/board-react/src/components/items/BoardItems.tsx");
var useStyles = (0, react_jss_1.createUseStyles)({
    boardGrid: function (_a) {
        var scaleMode = _a.scaleMode, width = _a.width;
        return ({
            position: "relative",
            width: width,
            height: (scaleMode || "height") === "height" ? "100%" : "inherit"
        });
    },
    boardGridInner: {
        width: "100%",
        height: "100%"
    }
});
function useResponsiveStyles(context) {
    var _a = context.state.size, width = _a.width, height = _a.height, scaleMode = context.ui.scaleMode;
    var _b = (0, useElementSize_1.useElementSize)(), ref = _b.ref, size = _b.size;
    var styleWidth = (scaleMode || "width") === "width"
        ? "100%"
        : "".concat((size.height / height) * width, "px");
    var styles = useStyles({ scaleMode: scaleMode, width: styleWidth });
    return {
        styles: styles,
        ref: ref
    };
}
exports.BoardGrid = React.forwardRef(function (props, forwardRef) {
    var state = props.state, _a = props.scaleMode, scaleMode = _a === void 0 ? "width" : _a, renderItem = props.renderItem, onDropItem = props.onDropItem, onClickTile = props.onClickTile;
    var boardContext = {
        state: state,
        ui: {
            scaleMode: scaleMode
        }
    };
    var _b = useResponsiveStyles(boardContext), styles = _b.styles, ref = _b.ref;
    return (React.createElement("div", { className: styles.boardGrid, ref: forwardRef },
        React.createElement("div", { className: styles.boardGridInner, ref: ref },
            React.createElement(context_1.BoardContextProvider, { value: boardContext },
                React.createElement(BoardGridRows_1.BoardGridRows, { onDropItem: onDropItem, onClickTile: onClickTile }),
                React.createElement(BoardItems_1.BoardItems, { render: renderItem })))));
});


/***/ }),

/***/ "../../modules/@shoki/board-react/src/components/BoardGridRows.tsx":
/*!*************************************************************************!*\
  !*** ../../modules/@shoki/board-react/src/components/BoardGridRows.tsx ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.BoardGridRows = void 0;
var react_1 = __importDefault(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var context_1 = __webpack_require__(/*! ../context */ "../../modules/@shoki/board-react/src/context.ts");
var TileRow_1 = __webpack_require__(/*! ./TileRow */ "../../modules/@shoki/board-react/src/components/TileRow.tsx");
var BoardGridRows = function (_a) {
    var onDropItem = _a.onDropItem, onClickTile = _a.onClickTile;
    var height = (0, context_1.useBoardState)().size.height;
    var rows = [];
    for (var y = 0; y < height; y++) {
        rows.push(react_1["default"].createElement(TileRow_1.TileRow, { y: y, onDropItem: onDropItem, onClickTile: onClickTile }));
    }
    return react_1["default"].createElement(react_1["default"].Fragment, null, rows);
};
exports.BoardGridRows = BoardGridRows;


/***/ }),

/***/ "../../modules/@shoki/board-react/src/components/TileRow.tsx":
/*!*******************************************************************!*\
  !*** ../../modules/@shoki/board-react/src/components/TileRow.tsx ***!
  \*******************************************************************/
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
exports.TileRow = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var context_1 = __webpack_require__(/*! ../context */ "../../modules/@shoki/board-react/src/context.ts");
var useElementSize_1 = __webpack_require__(/*! ../useElementSize */ "../../modules/@shoki/board-react/src/useElementSize.tsx");
var DroppableTile_1 = __webpack_require__(/*! ./tile/DroppableTile */ "../../modules/@shoki/board-react/src/components/tile/DroppableTile.tsx");
var UndroppableTile_1 = __webpack_require__(/*! ./tile/UndroppableTile */ "../../modules/@shoki/board-react/src/components/tile/UndroppableTile.tsx");
var useStyles = (0, react_jss_1.createUseStyles)({
    tileRow: function (_a) {
        var height = _a.height, width = _a.width;
        return ({
            width: width,
            height: height,
            boxSizing: "border-box",
            lineHeight: "0",
            whiteSpace: "nowrap"
        });
    }
});
function useResponsiveStyles() {
    var _a = (0, context_1.useBoardState)().size, width = _a.width, height = _a.height;
    var scaleMode = (0, context_1.useScaleMode)();
    var _b = (0, useElementSize_1.useElementSize)(), ref = _b.ref, size = _b.size;
    var styleHeight = scaleMode === "width"
        ? "".concat(size.width / width, "px")
        : "".concat((100 / height).toFixed(2), "%");
    var styleWidth = scaleMode === "width" ? "100%" : "".concat(size.height * width, "px");
    var styles = useStyles({ height: styleHeight, width: styleWidth });
    return {
        styles: styles,
        ref: ref
    };
}
function TileRow(_a) {
    var y = _a.y, onDropItem = _a.onDropItem, onClickTile = _a.onClickTile;
    var _b = (0, context_1.useBoardState)(), locked = _b.locked, piecePositions = _b.piecePositions, width = _b.size.width;
    var _c = useResponsiveStyles(), styles = _c.styles, ref = _c.ref;
    var tiles = [];
    for (var x = 0; x < width; x++) {
        var piecePositionKey = "".concat(x, ",").concat(y);
        var tileContainsPiece = Boolean(piecePositions[piecePositionKey]);
        var canDropPiece = !tileContainsPiece && !locked;
        tiles.push(canDropPiece ? (React.createElement(DroppableTile_1.DroppableTile, { key: "tile-".concat(x), x: x, y: y, onDrop: onDropItem, onClick: onClickTile })) : (React.createElement(UndroppableTile_1.UndroppableTile, { key: "tile-".concat(x), x: x, y: y })));
    }
    return (React.createElement("div", { className: styles.tileRow, ref: ref }, tiles));
}
exports.TileRow = TileRow;


/***/ }),

/***/ "../../modules/@shoki/board-react/src/components/index.ts":
/*!****************************************************************!*\
  !*** ../../modules/@shoki/board-react/src/components/index.ts ***!
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
exports.BoardGrid = void 0;
var BoardGrid_1 = __webpack_require__(/*! ./BoardGrid */ "../../modules/@shoki/board-react/src/components/BoardGrid.tsx");
__createBinding(exports, BoardGrid_1, "BoardGrid");


/***/ }),

/***/ "../../modules/@shoki/board-react/src/components/items/BoardItem.tsx":
/*!***************************************************************************!*\
  !*** ../../modules/@shoki/board-react/src/components/items/BoardItem.tsx ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.BoardItem = void 0;
var react_1 = __importDefault(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var context_1 = __webpack_require__(/*! ../../context */ "../../modules/@shoki/board-react/src/context.ts");
var TILE_BASE_Z_INDEX = 50;
var useStyles = (0, react_jss_1.createUseStyles)({
    boardItem: function (props) { return ({
        position: "absolute",
        transition: "all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1) 0s",
        width: "".concat((100 / props.boardWidth).toFixed(2), "%"),
        height: "".concat((100 / props.boardHeight).toFixed(2), "%"),
        left: "".concat(((props.x / props.boardWidth) * 100).toFixed(2), "%"),
        top: "".concat(((props.y / props.boardHeight) * 100).toFixed(2), "%"),
        zIndex: TILE_BASE_Z_INDEX + props.y + 1
    }); }
});
exports.BoardItem = react_1["default"].forwardRef(function (_a, ref) {
    var x = _a.x, y = _a.y, children = _a.children;
    var _b = (0, context_1.useBoardState)().size, boardWidth = _b.width, boardHeight = _b.height;
    var styles = useStyles({ boardWidth: boardWidth, boardHeight: boardHeight, x: x, y: y });
    return (react_1["default"].createElement("div", { ref: ref, className: styles.boardItem }, children));
});


/***/ }),

/***/ "../../modules/@shoki/board-react/src/components/items/BoardItems.tsx":
/*!****************************************************************************!*\
  !*** ../../modules/@shoki/board-react/src/components/items/BoardItems.tsx ***!
  \****************************************************************************/
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
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var context_1 = __webpack_require__(/*! ../../context */ "../../modules/@shoki/board-react/src/context.ts");
var BoardItem_1 = __webpack_require__(/*! ./BoardItem */ "../../modules/@shoki/board-react/src/components/items/BoardItem.tsx");
var DraggableBoardItem_1 = __webpack_require__(/*! ./DraggableBoardItem */ "../../modules/@shoki/board-react/src/components/items/DraggableBoardItem.tsx");
var BoardItems = function (_a) {
    var e_1, _b;
    var render = _a.render;
    var _c = (0, context_1.useBoardState)(), pieces = _c.pieces, piecePositions = _c.piecePositions;
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
            var _d = __read(entries_1_1.value, 2), position = _d[0], id = _d[1];
            if (!id) {
                continue;
            }
            var _e = __read(position.split(",").map(function (i) { return parseInt(i, 10); }), 2), x = _e[0], y = _e[1];
            var _f = render(pieces[id], x, y), item = _f.item, _g = _f.draggable, draggable = _g === void 0 ? false : _g;
            if (draggable) {
                pieceElements.push(React.createElement(DraggableBoardItem_1.DraggableBoardItem, { key: id, id: id, x: x, y: y }, item));
            }
            else {
                pieceElements.push(React.createElement(BoardItem_1.BoardItem, { key: id, x: x, y: y }, item));
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (entries_1_1 && !entries_1_1.done && (_b = entries_1["return"])) _b.call(entries_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return React.createElement(React.Fragment, null, pieceElements);
};
exports.BoardItems = BoardItems;


/***/ }),

/***/ "../../modules/@shoki/board-react/src/components/items/DraggableBoardItem.tsx":
/*!************************************************************************************!*\
  !*** ../../modules/@shoki/board-react/src/components/items/DraggableBoardItem.tsx ***!
  \************************************************************************************/
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
exports.DraggableBoardItem = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "../../node_modules/react-dnd/dist/esm/index.js");
var BoardItem_1 = __webpack_require__(/*! ./BoardItem */ "../../modules/@shoki/board-react/src/components/items/BoardItem.tsx");
var DraggableBoardItem = function (_a) {
    var children = _a.children, id = _a.id, x = _a.x, y = _a.y;
    var _b = __read((0, react_dnd_1.useDrag)({
        type: "BoardItem",
        item: { id: id }
    }), 2), _c = _b[0], drag = _b[1];
    return (React.createElement(BoardItem_1.BoardItem, { ref: drag, x: x, y: y }, children));
};
exports.DraggableBoardItem = DraggableBoardItem;


/***/ }),

/***/ "../../modules/@shoki/board-react/src/components/tile/DroppableTile.tsx":
/*!******************************************************************************!*\
  !*** ../../modules/@shoki/board-react/src/components/tile/DroppableTile.tsx ***!
  \******************************************************************************/
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
exports.DroppableTile = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "../../node_modules/react-dnd/dist/esm/index.js");
var context_1 = __webpack_require__(/*! ../../context */ "../../modules/@shoki/board-react/src/context.ts");
var Tile_1 = __webpack_require__(/*! ./Tile */ "../../modules/@shoki/board-react/src/components/tile/Tile.tsx");
var DroppableTile = function (_a) {
    var x = _a.x, y = _a.y, onDrop = _a.onDrop, onClick = _a.onClick;
    var belowPieceLimit = (0, context_1.useBelowPieceLimit)();
    var pieces = (0, context_1.usePieces)();
    var _b = __read((0, react_dnd_1.useDrop)({
        accept: "BoardItem",
        drop: function (_a) {
            var id = _a.id;
            if (!onDrop) {
                return;
            }
            onDrop({ id: id, x: x, y: y });
        },
        canDrop: function (_a) {
            var id = _a.id;
            var pieceIsFromSameBoard = Boolean(pieces[id]);
            return belowPieceLimit || pieceIsFromSameBoard;
        },
        collect: function (monitor) { return ({
            canDrop: !!monitor.canDrop(),
            isDragging: !!monitor.getItem()
        }); }
    }), 2), _c = _b[0], drop = _b[1];
    return React.createElement(Tile_1.Tile, { ref: drop, x: x, y: y, onClick: onClick });
};
exports.DroppableTile = DroppableTile;


/***/ }),

/***/ "../../modules/@shoki/board-react/src/components/tile/Tile.tsx":
/*!*********************************************************************!*\
  !*** ../../modules/@shoki/board-react/src/components/tile/Tile.tsx ***!
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Tile = void 0;
var react_1 = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js"));
var react_jss_1 = __webpack_require__(/*! react-jss */ "../../node_modules/react-jss/dist/react-jss.esm.js");
var context_1 = __webpack_require__(/*! ../../context */ "../../modules/@shoki/board-react/src/context.ts");
// eslint-disable-next-line no-bitwise
var isBoardTileDark = function (x, y) { return ((y ^ x) & 1) !== 0; };
var useStyles = (0, react_jss_1.createUseStyles)({
    tile: function (props) { return ({
        width: "".concat((100 / props.boardWidth).toFixed(2), "%"),
        height: "100%",
        position: "relative",
        display: "inline-block",
        boxSizing: "border-box",
        userSelect: "none"
    }); },
    tileInner: {
        width: "100%",
        height: "100%"
    }
});
exports.Tile = react_1["default"].forwardRef(function (_a, ref) {
    var x = _a.x, y = _a.y, onClick = _a.onClick;
    var boardWidth = (0, context_1.useBoardState)().size.width;
    var tileInnerRef = (0, react_1.useRef)(null);
    var styles = useStyles({ boardWidth: boardWidth });
    var isDark = isBoardTileDark(x, y);
    var handleClick = onClick ? function () { return onClick({ x: x, y: y }); } : undefined;
    var className = (0, classnames_1["default"])(styles.tile, "tile", {
        dark: isDark,
        light: !isDark
    });
    return (react_1["default"].createElement("div", { ref: ref, className: className, "touch-action": "none", onPointerUp: handleClick },
        react_1["default"].createElement("div", { ref: tileInnerRef, className: styles.tileInner })));
});


/***/ }),

/***/ "../../modules/@shoki/board-react/src/components/tile/UndroppableTile.tsx":
/*!********************************************************************************!*\
  !*** ../../modules/@shoki/board-react/src/components/tile/UndroppableTile.tsx ***!
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
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_dnd_1 = __webpack_require__(/*! react-dnd */ "../../node_modules/react-dnd/dist/esm/index.js");
var Tile_1 = __webpack_require__(/*! ./Tile */ "../../modules/@shoki/board-react/src/components/tile/Tile.tsx");
var UndroppableTile = function (_a) {
    var x = _a.x, y = _a.y;
    var _b = __read((0, react_dnd_1.useDrop)({
        accept: "Piece",
        collect: function (monitor) { return ({
            isDragging: !!monitor.getItem()
        }); }
    }), 2), _c = _b[0], drop = _b[1];
    return React.createElement(Tile_1.Tile, { ref: drop, x: x, y: y });
};
exports.UndroppableTile = UndroppableTile;


/***/ }),

/***/ "../../modules/@shoki/board-react/src/context.ts":
/*!*******************************************************!*\
  !*** ../../modules/@shoki/board-react/src/context.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.usePiecePositions = exports.usePieces = exports.useBelowPieceLimit = exports.useScaleMode = exports.useBoardState = exports.BoardContextProvider = void 0;
var react_1 = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
var board_1 = __webpack_require__(/*! @shoki/board */ "../../modules/@shoki/board/index.ts");
var BoardContext = (0, react_1.createContext)(null);
BoardContext.displayName = "BoardContext";
exports.BoardContextProvider = BoardContext.Provider;
var useBoard = function () { return (0, react_1.useContext)(BoardContext); };
var useBoardState = function () { return useBoard().state; };
exports.useBoardState = useBoardState;
var useScaleMode = function () { return useBoard().ui.scaleMode; };
exports.useScaleMode = useScaleMode;
var useBelowPieceLimit = function () {
    var boardState = (0, exports.useBoardState)();
    if (!boardState) {
        return false;
    }
    return (boardState.pieceLimit === null ||
        board_1.BoardSelectors.isBelowPieceLimit(boardState));
};
exports.useBelowPieceLimit = useBelowPieceLimit;
var usePieces = function () {
    var boardState = (0, exports.useBoardState)();
    if (!boardState) {
        return {};
    }
    return boardState.pieces;
};
exports.usePieces = usePieces;
var usePiecePositions = function () {
    var boardState = (0, exports.useBoardState)();
    if (!boardState) {
        return {};
    }
    return boardState.piecePositions;
};
exports.usePiecePositions = usePiecePositions;


/***/ }),

/***/ "../../modules/@shoki/board-react/src/events.ts":
/*!******************************************************!*\
  !*** ../../modules/@shoki/board-react/src/events.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;


/***/ }),

/***/ "../../modules/@shoki/board-react/src/useElementSize.tsx":
/*!***************************************************************!*\
  !*** ../../modules/@shoki/board-react/src/useElementSize.tsx ***!
  \***************************************************************/
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
exports.useElementSize = void 0;
var react_1 = __importDefault(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
function useElementSize() {
    var _a = __read(react_1["default"].useState([0, 0]), 2), size = _a[0], setSize = _a[1];
    var ref = react_1["default"].useRef(null);
    react_1["default"].useEffect(function () {
        if (ref.current) {
            setSize([ref.current.clientWidth, ref.current.clientHeight]);
        }
    }, [ref]);
    var storeSize = react_1["default"].useCallback(function () {
        if (ref.current) {
            setSize([ref.current.clientWidth, ref.current.clientHeight]);
        }
    }, [ref]);
    react_1["default"].useEffect(function () {
        if (!ref.current) {
            return;
        }
        // wait 10ms to let everything render
        setTimeout(storeSize, 10);
        if (typeof ResizeObserver === "function") {
            var resizeObserver_1 = new ResizeObserver(storeSize);
            resizeObserver_1.observe(ref.current);
            return function () {
                resizeObserver_1.disconnect();
            };
        }
        window.addEventListener("resize", storeSize);
        return function () {
            window.removeEventListener("resize", storeSize);
        };
    }, [ref]);
    var isPortrait = react_1["default"].useMemo(function () { return size[1] > size[0]; }, [ref, size]);
    return {
        isPortrait: isPortrait,
        size: { width: size[0], height: size[1] },
        ref: ref
    };
}
exports.useElementSize = useElementSize;


/***/ }),

/***/ "../../modules/@shoki/board/index.ts":
/*!*******************************************!*\
  !*** ../../modules/@shoki/board/index.ts ***!
  \*******************************************/
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
exports.topLeftToBottomRightSortPositions = exports.topToBottomMiddleSortPositions = exports.rotatePiecesAboutCenter = exports.mergeBoards = exports.BoardSelectors = exports.createBoardSlice = exports.createInitialBoardState = void 0;
var state_1 = __webpack_require__(/*! ./src/state */ "../../modules/@shoki/board/src/state.ts");
__createBinding(exports, state_1, "createInitialBoardState");
__createBinding(exports, state_1, "createBoardSlice");
exports.BoardSelectors = __importStar(__webpack_require__(/*! ./src/selectors */ "../../modules/@shoki/board/src/selectors.ts"));
var mergeBoards_1 = __webpack_require__(/*! ./src/utils/mergeBoards */ "../../modules/@shoki/board/src/utils/mergeBoards.ts");
__createBinding(exports, mergeBoards_1, "mergeBoards");
var rotateGridPosition_1 = __webpack_require__(/*! ./src/utils/rotateGridPosition */ "../../modules/@shoki/board/src/utils/rotateGridPosition.ts");
__createBinding(exports, rotateGridPosition_1, "rotatePiecesAboutCenter");
var positionSort_1 = __webpack_require__(/*! ./src/positionSort */ "../../modules/@shoki/board/src/positionSort.ts");
__createBinding(exports, positionSort_1, "topToBottomMiddleSortPositions");
__createBinding(exports, positionSort_1, "topLeftToBottomRightSortPositions");


/***/ }),

/***/ "../../modules/@shoki/board/src/positionSort.ts":
/*!******************************************************!*\
  !*** ../../modules/@shoki/board/src/positionSort.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.topLeftToBottomRightSortPositions = exports.topToBottomMiddleSortPositions = void 0;
var SORT_A_FIRST = -1;
var SORT_A_SECOND = 1;
var topToBottomMiddleSortPositions = function (a, b) {
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
exports.topToBottomMiddleSortPositions = topToBottomMiddleSortPositions;
var topLeftToBottomRightSortPositions = function (a, b) {
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
exports.topLeftToBottomRightSortPositions = topLeftToBottomRightSortPositions;


/***/ }),

/***/ "../../modules/@shoki/board/src/selectors.ts":
/*!***************************************************!*\
  !*** ../../modules/@shoki/board/src/selectors.ts ***!
  \***************************************************/
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
exports.__esModule = true;
exports.getFirstEmptySlot = exports.getPieceForPosition = exports.isBelowPieceLimit = exports.getPiece = exports.getAllPieces = exports.getPiecePosition = void 0;
var positionSort_1 = __webpack_require__(/*! ./positionSort */ "../../modules/@shoki/board/src/positionSort.ts");
// todo add a position-for-id lookup to the board state to improve this
var getPiecePosition = function (state, pieceId) {
    var entry = Object.entries(state.piecePositions).find(function (_a) {
        var _b = __read(_a, 2), _ = _b[0], id = _b[1];
        return id === pieceId;
    });
    if (!entry) {
        return null;
    }
    var _a = __read(entry[0].split(",").map(function (val) { return parseInt(val, 10); }), 2), x = _a[0], y = _a[1];
    return { x: x, y: y };
};
exports.getPiecePosition = getPiecePosition;
var getAllPieces = function (state) {
    return Object.values(state.pieces).filter(function (p) { return p !== null; });
};
exports.getAllPieces = getAllPieces;
var getPiece = function (state, pieceId) { return state.pieces[pieceId] || null; };
exports.getPiece = getPiece;
var isBelowPieceLimit = function (state) {
    return state.pieceLimit === null || (0, exports.getAllPieces)(state).length < state.pieceLimit;
};
exports.isBelowPieceLimit = isBelowPieceLimit;
var getPieceForPosition = function (state, x, y) { return state.pieces[state.piecePositions["".concat(x, ",").concat(y)]] || null; };
exports.getPieceForPosition = getPieceForPosition;
var getFirstEmptySlot = function (state, sortPositions) {
    if (sortPositions === void 0) { sortPositions = positionSort_1.topToBottomMiddleSortPositions; }
    var emptyPositions = [];
    for (var y = 0; y < state.size.height; y++) {
        for (var x = 0; x < state.size.width; x++) {
            var boardPiece = (0, exports.getPieceForPosition)(state, x, y);
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
exports.getFirstEmptySlot = getFirstEmptySlot;


/***/ }),

/***/ "../../modules/@shoki/board/src/state.ts":
/*!***********************************************!*\
  !*** ../../modules/@shoki/board/src/state.ts ***!
  \***********************************************/
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
exports.createBoardSlice = exports.createInitialBoardState = void 0;
var toolkit_1 = __webpack_require__(/*! @reduxjs/toolkit */ "../../node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
var filter_1 = __webpack_require__(/*! ./utils/filter */ "../../modules/@shoki/board/src/utils/filter.ts");
var createInitialBoardState = function (id, size) {
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
exports.createInitialBoardState = createInitialBoardState;
var createBoardSlice = function (id, size) {
    var _a = (0, toolkit_1.createSlice)({
        name: "board-".concat(id),
        initialState: (0, exports.createInitialBoardState)(id, size),
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
                        return __assign(__assign({}, newPiecePositions), (_b = {}, _b["".concat(newX, ",").concat(newY)] = pieceId, _b));
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
                return (__assign(__assign(__assign({}, state), { pieces: __assign({}, pieces), piecePositions: __assign({}, piecePositions) }), (newSize
                    ? { size: { width: newSize.width, height: newSize.height } }
                    : {})));
            },
            addBoardPieceCommand: function (state, _a) {
                var _b, _c;
                var _d = _a.payload, x = _d.x, y = _d.y, piece = _d.piece;
                return (__assign(__assign({}, state), { pieces: __assign(__assign({}, state.pieces), (_b = {}, _b[piece.id] = piece, _b)), piecePositions: __assign(__assign({}, state.piecePositions), (_c = {}, _c["".concat(x, ",").concat(y)] = piece.id, _c)) }));
            },
            moveBoardPieceCommand: function (state, _a) {
                var _b;
                var _c = _a.payload, pieceId = _c.pieceId, from = _c.from, to = _c.to;
                var piece = state.pieces[pieceId];
                var fromString = "".concat(from.x, ",").concat(from.y);
                var pieceAtFrom = state.piecePositions[fromString];
                // safety catch
                if (!piece || piece.id !== pieceId || piece.id !== pieceAtFrom) {
                    return state;
                }
                var toString = "".concat(to.x, ",").concat(to.y);
                var newState = __assign(__assign({}, state), { piecePositions: __assign(__assign({}, state.piecePositions), (_b = {}, _b[toString] = pieceId, _b)) });
                delete newState.piecePositions[fromString];
                return newState;
            },
            removeBoardPiecesCommand: function (state, _a) {
                var pieceIds = _a.payload;
                return (__assign(__assign({}, state), { pieces: (0, filter_1.getPiecesWithoutIds)(state.pieces, pieceIds), piecePositions: (0, filter_1.getPiecePositionsWithoutIds)(state.piecePositions, pieceIds) }));
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
            },
            swapPiecesCommand: function (state, _a) {
                var _b;
                var _c = _a.payload, aId = _c.aId, bId = _c.bId;
                if (!aId || !bId) {
                    return state;
                }
                var a = state.pieces[aId];
                var b = state.pieces[bId];
                if (!a || !b) {
                    return state;
                }
                var positions = Object.entries(state.piecePositions);
                var aPositionEntry = positions.find(function (_a) {
                    var _b = __read(_a, 2), pieceId = _b[1];
                    return pieceId === aId;
                });
                var bPositionEntry = positions.find(function (_a) {
                    var _b = __read(_a, 2), pieceId = _b[1];
                    return pieceId === bId;
                });
                if (!aPositionEntry || !bPositionEntry) {
                    return state;
                }
                var _d = __read(aPositionEntry, 1), aPosition = _d[0];
                var _e = __read(bPositionEntry, 1), bPosition = _e[0];
                return __assign(__assign({}, state), { piecePositions: __assign(__assign({}, state.piecePositions), (_b = {}, _b[aPosition] = b.id, _b[bPosition] = a.id, _b)) });
            }
        }
    }), reducer = _a.reducer, _b = _a.actions, setBoardSizeCommand = _b.setBoardSizeCommand, lockBoardCommand = _b.lockBoardCommand, unlockBoardCommand = _b.unlockBoardCommand, setPieceLimitCommand = _b.setPieceLimitCommand, setBoardPiecesCommand = _b.setBoardPiecesCommand, addBoardPieceCommand = _b.addBoardPieceCommand, moveBoardPieceCommand = _b.moveBoardPieceCommand, removeBoardPiecesCommand = _b.removeBoardPiecesCommand, updateBoardPiecesCommand = _b.updateBoardPiecesCommand, swapPiecesCommand = _b.swapPiecesCommand;
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
            updateBoardPiecesCommand: updateBoardPiecesCommand,
            swapPiecesCommand: swapPiecesCommand
        }
    };
};
exports.createBoardSlice = createBoardSlice;


/***/ }),

/***/ "../../modules/@shoki/board/src/utils/filter.ts":
/*!******************************************************!*\
  !*** ../../modules/@shoki/board/src/utils/filter.ts ***!
  \******************************************************/
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
var getPiecesWithoutIds = function (pieces, ids) {
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
exports.getPiecesWithoutIds = getPiecesWithoutIds;
var getPiecePositionsWithoutIds = function (piecePositions, ids) {
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
exports.getPiecePositionsWithoutIds = getPiecePositionsWithoutIds;


/***/ }),

/***/ "../../modules/@shoki/board/src/utils/mergeBoards.ts":
/*!***********************************************************!*\
  !*** ../../modules/@shoki/board/src/utils/mergeBoards.ts ***!
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
var rotateGridPosition_1 = __webpack_require__(/*! ./rotateGridPosition */ "../../modules/@shoki/board/src/utils/rotateGridPosition.ts");
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
            return __assign(__assign({}, newPiecePositions), (_b = {}, _b["".concat(newX, ",").concat(newY)] = pieceId, _b));
        }, {}) });
};
var mergeBoards = function (id, home, away) {
    if (home.size.width !== away.size.width ||
        home.size.height !== away.size.height) {
        throw Error("Trying to merge odd-sized boards");
    }
    var newSize = {
        width: home.size.width,
        height: home.size.height * 2
    };
    var expandedHome = expandBoard(home, newSize);
    var expandedAway = expandBoard(away, newSize);
    var rotatedAway = (0, rotateGridPosition_1.rotatePiecesAboutCenter)(expandedAway);
    return {
        id: id,
        pieces: __assign(__assign({}, expandedHome.pieces), rotatedAway.pieces),
        piecePositions: __assign(__assign({}, expandedHome.piecePositions), rotatedAway.piecePositions),
        locked: true,
        pieceLimit: null,
        size: newSize
    };
};
exports.mergeBoards = mergeBoards;


/***/ }),

/***/ "../../modules/@shoki/board/src/utils/rotateGridPosition.ts":
/*!******************************************************************!*\
  !*** ../../modules/@shoki/board/src/utils/rotateGridPosition.ts ***!
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
var selectors_1 = __webpack_require__(/*! ../selectors */ "../../modules/@shoki/board/src/selectors.ts");
var rotateGridPosition = function (gridSize, position) { return ({
    x: gridSize.width - 1 - position.x,
    y: gridSize.height - 1 - position.y
}); };
exports.rotateGridPosition = rotateGridPosition;
var rotatePiecesAboutCenter = function (state) {
    var e_1, _a;
    var newPositions = [];
    try {
        for (var _b = __values(Object.entries(state.pieces)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 1), pieceId = _d[0];
            var position = (0, selectors_1.getPiecePosition)(state, pieceId);
            if (!position) {
                continue;
            }
            var newPosition = (0, exports.rotateGridPosition)(state.size, position);
            var newPositionKey = "".concat(newPosition.x, ",").concat(newPosition.y);
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
exports.rotatePiecesAboutCenter = rotatePiecesAboutCenter;


/***/ }),

/***/ "../../package.json":
/*!**************************!*\
  !*** ../../package.json ***!
  \**************************/
/***/ ((module) => {

module.exports = JSON.parse('{"private":true,"name":"creature-chess","version":"0.5.14","description":"Creature Chess","scripts":{"build-web-game":"yarn workspace @creature-chess/web-game build","build-server-game":"yarn build-web-game && cp -r apps/web-game/public apps/server-game","build-web-menu":"","dev-web-game":"yarn workspace @creature-chess/web-game dev","dev-web-menu":"yarn workspace @creature-chess/web-menu dev","dev:user":"yarn workspace @cc-lambda/user dev","start-server-game":"ts-node-dev apps/server-game/index.ts","start-web-menu":"yarn workspace @creature-chess/web-menu dev","test":"yarn workspaces foreach run test","dockerup":"docker-compose --env-file ./.env.dev build && docker-compose --env-file ./.env.dev up","storybook":"yarn workspace @creature-chess/ui storybook","lint":"eslint \\"apps/**/*.ts\\" \\"modules/**/*.ts\\" \\"apps/**/*.tsx\\" \\"modules/**/*.tsx\\"","ecr-push":"sh ./scripts/ecr-push.sh","prettier":"prettier -w ./","prettier-check":"prettier -c ./"},"workspaces":["modules/@creature-chess/*","modules/@shoki/*","modules/@tools/*","apps/*","lambda/*"],"author":"","license":"ISC","devDependencies":{"@babel/core":"^7.16.5","@trivago/prettier-plugin-sort-imports":"^3.2.0","@types/jest":"^27.0.3","@types/node":"^16.11.17","@types/react-modal":"^3.13.1","@types/ws":"^7.4.7","@typescript-eslint/eslint-plugin":"^4.33.0","@typescript-eslint/parser":"^4.33.0","eslint":"^7.32.0","eslint-plugin-import":"^2.25.3","eslint-plugin-jsdoc":"^36.1.1","eslint-plugin-prefer-arrow":"^1.2.3","eslint-plugin-react":"^7.28.0","eslint-plugin-react-hooks":"^4.6.0","jest":"^27.4.5","jest-standard-reporter":"^2.0.0","node-sass":"^7.0.0","prettier":"^2.7.1","process":"^0.11.10","ts-jest":"^27.1.2","typescript":"^4.5.4","unimported":"^1.19.1"},"dependencies":{"@types/react":"^17.0.38","@types/react-dom":"^17.0.11","classnames":"^2.3.1","react":"^17.0.2","react-dom":"^17.0.2","react-jss":"^10.9.0","redux":"^4.1.2","redux-saga":"^1.1.3","ts-node-dev":"^1.1.8"},"packageManager":"yarn@3.1.1"}');

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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_auth0_auth0-react_dist_auth0-react_esm_js-node_modules_reduxjs_toolkit_d-055c0c"], () => (__webpack_require__("./src/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle-ad247148ed1ca1999f34.js.map