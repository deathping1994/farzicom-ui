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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartTrack = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
const utils_1 = require("../utils");
const addToCartTrack = (shopMetaData, { product_name, product_id, quantity, product_price, currency, variant, tags }) => __awaiter(void 0, void 0, void 0, function* () {
    const FC_TRACKING = shopMetaData &&
        (0, utils_1.getMetadataValue)(shopMetaData, "fc_session_tracking") &&
        (0, utils_1.parseJson)((0, utils_1.getMetadataValue)(shopMetaData, "fc_session_tracking"));
    fetch(`${(FC_TRACKING === null || FC_TRACKING === void 0 ? void 0 : FC_TRACKING.api_uri) || "https://tr.farziengineer.co/collect"}/?evt_type=AddToCart`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ui: js_cookie_1.default.get("user_id"),
            ci: FC_TRACKING === null || FC_TRACKING === void 0 ? void 0 : FC_TRACKING.client_id,
            product_name,
            product_id,
            quantity,
            product_price,
            currency,
            variant,
            tags
        }),
    })
        .then((response) => {
        return response.json();
    })
        .then((res) => {
        var _a, _b;
        if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.ui) {
            js_cookie_1.default.set("user_id", (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.ui, {
                expires: 365 * 24 * 60 * 60 * 1000,
            });
        }
    })
        .catch((err) => {
        console.log("tr.farziengineer.co/collect error:", err);
    });
});
exports.addToCartTrack = addToCartTrack;
