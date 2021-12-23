/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../modules/@shoki/board-react/style.css":
/*!**************************************************!*\
  !*** ../../modules/@shoki/board-react/style.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/display/style/index.scss":
/*!**************************************!*\
  !*** ./src/display/style/index.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.App = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var react_modal_1 = __importDefault(__webpack_require__(/*! react-modal */ "../../node_modules/react-modal/lib/index.js"));
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "../../node_modules/react-router-dom/index.js");
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "../../node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var menuPage_1 = __webpack_require__(/*! ./menuPage */ "./src/menuPage.tsx");
var auth_web_1 = __webpack_require__(/*! @creature-chess/auth-web */ "../../modules/@creature-chess/auth-web/index.ts");
var auth_1 = __webpack_require__(/*! ./auth */ "./src/auth/index.ts");
var loading_1 = __webpack_require__(/*! ./display/loading */ "./src/display/loading.tsx");
var UnauthenticatedRoutes = function () { return (React.createElement(react_router_dom_1.Routes, null,
    React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(auth_1.LoginPage, null) }))); };
var AuthenticatedRootPage = function () {
    var user = (0, auth0_react_1.useAuth0)().user;
    if (!(0, auth_web_1.isRegistered)(user)) {
        return React.createElement(auth_1.RegistrationPage, null);
    }
    return React.createElement(menuPage_1.MenuPage, null);
};
var AuthenticatedRoutes = function () { return (React.createElement(react_router_dom_1.Routes, null,
    React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(AuthenticatedRootPage, null) }))); };
react_modal_1["default"].setAppElement("#approot");
var App = function () {
    var _a = (0, auth0_react_1.useAuth0)(), isAuthenticated = _a.isAuthenticated, isLoading = _a.isLoading;
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
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "../../node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var display_1 = __webpack_require__(/*! ../display */ "./src/display/index.ts");
var LoginPage = function () {
    var _a = (0, auth0_react_1.useAuth0)(), loginWithRedirect = _a.loginWithRedirect, isLoading = _a.isLoading;
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
                    React.createElement("img", { src: "https://i.imgur.com/OBo2QRd.png", className: "discord-button" }))),
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
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "../../node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var auth_web_1 = __webpack_require__(/*! @creature-chess/auth-web */ "../../modules/@creature-chess/auth-web/index.ts");
var patchUser_1 = __webpack_require__(/*! ./utils/patchUser */ "./src/auth/utils/patchUser.ts");
var NicknameSelection_1 = __webpack_require__(/*! ./registration/NicknameSelection */ "./src/auth/registration/NicknameSelection.tsx");
var PictureSelection_1 = __webpack_require__(/*! ./registration/PictureSelection */ "./src/auth/registration/PictureSelection.tsx");
var RegistrationPage = function () {
    var _a = (0, auth0_react_1.useAuth0)(), getAccessTokenSilently = _a.getAccessTokenSilently, getIdTokenClaims = _a.getIdTokenClaims;
    var _b = __read(React.useState(""), 2), nickname = _b[0], setNickname = _b[1];
    var _c = __read(React.useState(false), 2), loading = _c[0], setLoading = _c[1];
    var _d = __read(React.useState(null), 2), error = _d[0], setError = _d[1];
    var _e = __read(React.useState(1), 2), currentImage = _e[0], setCurrentImage = _e[1];
    var user = (0, auth0_react_1.useAuth0)().user;
    React.useEffect(function () {
        if ((0, auth_web_1.hasNickname)(user)) {
            setNickname(null);
        }
    });
    var onNameChange = function (event) { return setNickname(event.target.value); };
    var onClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var nicknameError, token, response, responseError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(0, auth_web_1.hasNickname)(user)) {
                        nicknameError = (0, models_1.validateNicknameFormat)(nickname);
                        if (nicknameError) {
                            setError(nicknameError);
                            return [2 /*return*/];
                        }
                    }
                    setLoading(true);
                    return [4 /*yield*/, getAccessTokenSilently()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, (0, patchUser_1.patchUser)(token, nickname, currentImage)];
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
    var handleImageChange = function (picture) {
        setCurrentImage(picture);
    };
    return (React.createElement("div", { className: "register" },
        React.createElement("h1", { className: "register-heading" }, "Registration"),
        error && React.createElement("p", { className: "register-error" }, error),
        !(0, auth_web_1.hasNickname)(user) &&
            React.createElement(NicknameSelection_1.NicknameSelection, { nickname: nickname, onChange: onNameChange, loading: loading }),
        React.createElement(PictureSelection_1.PictureSelection, { currentImage: currentImage, onChange: handleImageChange }),
        React.createElement("button", { className: "register-button", onClick: onClick, disabled: loading },
            !loading && "Register",
            loading && "Loading...")));
};
exports.RegistrationPage = RegistrationPage;


/***/ }),

/***/ "./src/auth/index.ts":
/*!***************************!*\
  !*** ./src/auth/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.RegistrationPage = exports.LoginPage = void 0;
var LoginPage_1 = __webpack_require__(/*! ./LoginPage */ "./src/auth/LoginPage.tsx");
__createBinding(exports, LoginPage_1, "LoginPage");
var RegistrationPage_1 = __webpack_require__(/*! ./RegistrationPage */ "./src/auth/RegistrationPage.tsx");
__createBinding(exports, RegistrationPage_1, "RegistrationPage");


/***/ }),

/***/ "./src/auth/registration/NicknameSelection.tsx":
/*!*****************************************************!*\
  !*** ./src/auth/registration/NicknameSelection.tsx ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.NicknameSelection = void 0;
var react_1 = __importDefault(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var NicknameSelection = function (_a) {
    var nickname = _a.nickname, onChange = _a.onChange, loading = _a.loading;
    return (react_1["default"].createElement("div", { className: "nickname-selection" },
        react_1["default"].createElement("div", { className: "nickname" },
            react_1["default"].createElement("h1", { className: "section-heading" }, "Nickname"),
            react_1["default"].createElement("h2", { className: "nickname-info" }, "Choose a nickname"),
            react_1["default"].createElement("h2", { className: "nickname-warning" }, "This nickname is permanent and cannot be changed"),
            react_1["default"].createElement("input", { value: nickname, onChange: onChange, maxLength: models_1.MAX_NAME_LENGTH, placeholder: "Nickname", className: "name-input", disabled: loading }))));
};
exports.NicknameSelection = NicknameSelection;


/***/ }),

/***/ "./src/auth/registration/PictureSelection.tsx":
/*!****************************************************!*\
  !*** ./src/auth/registration/PictureSelection.tsx ***!
  \****************************************************/
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
var models_1 = __webpack_require__(/*! @creature-chess/models */ "../../modules/@creature-chess/models/index.ts");
var PictureSelection = function (_a) {
    var currentImage = _a.currentImage, onChange = _a.onChange;
    return (react_1["default"].createElement("div", { className: "picture-selection" },
        react_1["default"].createElement("h1", { className: "section-heading" }, "Profile Picture"),
        react_1["default"].createElement("h2", { className: "picture-selection-heading" }, "Choose a profile picture - more can be unlocked!"),
        react_1["default"].createElement("form", null, Object.entries(models_1.AVAILABLE_PROFILE_PICTURES).map(function (_a) {
            var _b = __read(_a, 2), pictureString = _b[0], creatureName = _b[1];
            var picture = parseInt(pictureString, 10);
            var onSelect = function () { return onChange(picture); };
            return (react_1["default"].createElement("div", { className: "available-pictures", key: picture },
                react_1["default"].createElement("img", { className: "picture-selector-element", src: "https://creaturechess.com/images/front/".concat(picture, ".png"), alt: creatureName }),
                react_1["default"].createElement("p", null, creatureName),
                react_1["default"].createElement("input", { className: "picture-selector-element", type: "radio", value: picture, checked: currentImage === picture, onChange: onSelect })));
        }))));
};
exports.PictureSelection = PictureSelection;


/***/ }),

/***/ "./src/auth/utils/patchUser.ts":
/*!*************************************!*\
  !*** ./src/auth/utils/patchUser.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.patchUser = void 0;
var CURRENT_USER_ENDPOINT = "".concat("", "/user/current");
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

/***/ "./src/display/footer.tsx":
/*!********************************!*\
  !*** ./src/display/footer.tsx ***!
  \********************************/
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
var Footer = function () {
    return (React.createElement("div", { className: "footer" },
        React.createElement("span", null,
            "v",
            "0.4.19"),
        " - ",
        React.createElement("a", { href: "https://reddit.com/r/creaturechess/" }, "/r/CreatureChess"),
        " - ",
        React.createElement("a", { href: "https://creaturechess.com/privacy" }, "Privacy Policy"),
        " - ",
        React.createElement("a", { href: "https://github.com/Jameskmonger/creature-chess" }, "Licenses on GitHub")));
};
exports.Footer = Footer;


/***/ }),

/***/ "./src/display/index.ts":
/*!******************************!*\
  !*** ./src/display/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.Segment = exports.Loading = exports.Footer = void 0;
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
exports.Loading = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
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

/***/ "./src/display/segment.tsx":
/*!*********************************!*\
  !*** ./src/display/segment.tsx ***!
  \*********************************/
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
exports.Segment = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
var Segment = function (_a) {
    var open = _a.open, onHeaderClick = _a.onHeaderClick, header = _a.header, children = _a.children;
    return (React.createElement("div", { className: "segment ".concat(open ? "" : "closed") },
        React.createElement("div", { className: "header", onClick: onHeaderClick },
            header,
            " ",
            open ? "-" : "+"),
        React.createElement("div", { className: "content" }, children)));
};
exports.Segment = Segment;


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
__webpack_require__(/*! pepjs */ "../../node_modules/pepjs/dist/pep.js");
__webpack_require__(/*! ./display/style/index.scss */ "./src/display/style/index.scss");
__webpack_require__(/*! @shoki/board-react/style.css */ "../../modules/@shoki/board-react/style.css");
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

/***/ "./src/leaderboard.tsx":
/*!*****************************!*\
  !*** ./src/leaderboard.tsx ***!
  \*****************************/
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
exports.Leaderboard = void 0;
var React = __importStar(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));
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
                return (React.createElement("tr", { key: "".concat(index, "-").concat(name) },
                    React.createElement("td", null, name),
                    React.createElement("td", null, wins)));
            }))),
        React.createElement("div", { className: "wipe-warning" },
            React.createElement("p", null, "Thanks so much for playing! I hope you're enjoying the game"),
            React.createElement("p", null, "Please don't get too attached to these scores for now"),
            React.createElement("p", null, "The user accounts will be wiped during development"))));
};
var LEADERBOARD_ENDPOINT = "".concat("", "/leaderboard");
var Leaderboard = function () {
    // const { loading, error, data = [] } = useFetch(LEADERBOARD_ENDPOINT, {}, []);
    return (React.createElement("div", { className: "segment" },
        React.createElement("div", { className: "header" }, "Leaderboard"),
        React.createElement("div", { className: "content" },
            React.createElement("span", null, "Down for maintenance"))));
};
exports.Leaderboard = Leaderboard;


/***/ }),

/***/ "./src/menuPage.tsx":
/*!**************************!*\
  !*** ./src/menuPage.tsx ***!
  \**************************/
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
var auth0_react_1 = __webpack_require__(/*! @auth0/auth0-react */ "../../node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
var leaderboard_1 = __webpack_require__(/*! ./leaderboard */ "./src/leaderboard.tsx");
var display_1 = __webpack_require__(/*! ./display */ "./src/display/index.ts");
var Navbar = function () {
    var logout = (0, auth0_react_1.useAuth0)().logout;
    var onLogoutClick = function () { return logout(); };
    return (React.createElement("nav", { className: "navbar" },
        React.createElement("button", { className: "sign-out", onClick: onLogoutClick }, "Log Out")));
};
var MenuPage = function (_a) {
    var error = _a.error;
    var onFindGameClick = function () {
        window.location.href = "cc-server.jamesmonger.com";
    };
    return (React.createElement("div", { className: "menu" },
        React.createElement(Navbar, null),
        React.createElement("div", { className: "join-game" },
            React.createElement("h2", { className: "title" }, "Creature Chess"),
            React.createElement("div", { className: "blurb" },
                React.createElement("p", null, "More fun with friends! Press \"Find Game\" at the same time to play together"),
                React.createElement("p", null, "Up to 8 players!")),
            React.createElement("button", { onClick: onFindGameClick, className: "find-game" }, "Find Game"),
            React.createElement("div", { className: "blurb" },
                React.createElement("p", null, "Join us on Discord to receive notifications when someone starts a lobby, and more!")),
            React.createElement("a", { href: "https://discord.gg/FhMm6saehb" },
                React.createElement("img", { src: "https://i.imgur.com/OBo2QRd.png", className: "discord-button" })),
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
            error
                && React.createElement("div", { className: "error" },
                    React.createElement("p", null, error))),
        React.createElement(leaderboard_1.Leaderboard, null),
        React.createElement(display_1.Footer, null)));
};
exports.MenuPage = MenuPage;


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
var hasNickname = function (user) { return (user["".concat(namespace, "/playerNickname")] !== null); };
exports.hasNickname = hasNickname;
var isRegistered = function (user) { return (user["".concat(namespace, "/playerNickname")] !== null && user["".concat(namespace, "/playerPicture")] !== null); };
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
    return (react_1["default"].createElement(auth0_react_1.Auth0Provider, { domain: config_1.auth0Config.domain, clientId: config_1.auth0Config.clientID, redirectUri: config_1.auth0Config.redirectUri, audience: config_1.auth0Config.audience, scope: config_1.auth0Config.scope, cacheLocation: "localstorage", onRedirectCallback: onRedirectCallback }, children));
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
exports.LOBBY_WAIT_TIME = 5;
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
        return null;
    }
    var result = XP_TO_NEXT_LEVEL[level - 1];
    if (result === undefined) {
        return null;
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_auth0_auth0-react_dist_auth0-react_esm_js-node_modules_sentry_react_esm_-956e85"], () => (__webpack_require__("./src/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle-594ca148b19f96ed79a3.js.map