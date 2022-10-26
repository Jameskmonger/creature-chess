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
exports.CardDeck = void 0;
var lodash_shuffle_1 = __importDefault(require("lodash.shuffle"));
/**
 * A deck of cards
 *
 * @template TCard The type of card
 *
 * @author jameskmonger
 */
var CardDeck = /** @class */ (function () {
    function CardDeck(deck) {
        this.deck = deck || [];
    }
    CardDeck.prototype.take = function (count) {
        if (count === void 0) { count = 1; }
        return this.deck.splice(this.deck.length - count, count);
    };
    /**
     * Add a number of cards to the top of the deck
     *
     * Shuffles the deck after adding by default (see `shouldShuffle` parameter)
     *
     * @param cards The cards to add
     * @param shouldShuffle Whether to shuffle the deck after adding
     */
    CardDeck.prototype.addCards = function (cards, shouldShuffle) {
        var _a;
        if (shouldShuffle === void 0) { shouldShuffle = true; }
        // TODO null check?
        if (Array.isArray(cards)) {
            (_a = this.deck).push.apply(_a, __spreadArray([], __read(cards), false));
        }
        else {
            this.deck.push(cards);
        }
        if (shouldShuffle) {
            this.shuffle();
        }
    };
    /**
     * Shuffle the deck using lodash.shuffle (Fisher-Yates)
     */
    CardDeck.prototype.shuffle = function () {
        this.deck = (0, lodash_shuffle_1["default"])(this.deck);
    };
    return CardDeck;
}());
exports.CardDeck = CardDeck;
