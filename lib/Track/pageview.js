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
exports.pageViewTrack = void 0;
const fingerprintjs_1 = __importDefault(require("@fingerprintjs/fingerprintjs"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const query_string_1 = __importDefault(require("query-string"));
const utils_1 = require("../utils");
let previousURL = "";
const pageViewTrack = (shopMetaData, routerAsPath) => __awaiter(void 0, void 0, void 0, function* () {
    let visitorId, ip, utm;
    if (js_cookie_1.default.get("fctrack_visitor_id")) {
        visitorId = js_cookie_1.default.get("fctrack_visitor_id");
    }
    else {
        const fp = yield fingerprintjs_1.default.load();
        const visitorProps = yield fp.get();
        visitorId = visitorProps === null || visitorProps === void 0 ? void 0 : visitorProps.visitorId;
        js_cookie_1.default.set("fctrack_visitor_id", visitorId);
    }
    if (sessionStorage.getItem("ip")) {
        ip = sessionStorage.getItem("ip");
    }
    else {
        try {
            const res = yield fetch("https://qc.brimo.in/ip");
            const data = yield res.json();
            ip = data === null || data === void 0 ? void 0 : data.ip;
            sessionStorage.setItem("ip", data === null || data === void 0 ? void 0 : data.ip);
        }
        catch (err) {
            console.log("err", err);
        }
    }
    if (js_cookie_1.default.get("fctrack")) {
        utm = js_cookie_1.default.get("fctrack");
    }
    else {
        const queryValue = query_string_1.default.parse(window.location.search);
        if ((queryValue === null || queryValue === void 0 ? void 0 : queryValue.utm_source) ||
            (queryValue === null || queryValue === void 0 ? void 0 : queryValue.utm_medium) ||
            (queryValue === null || queryValue === void 0 ? void 0 : queryValue.utm_campaign)) {
            utm = `us=${queryValue === null || queryValue === void 0 ? void 0 : queryValue.utm_source}; um=${queryValue === null || queryValue === void 0 ? void 0 : queryValue.utm_medium}; uc=${queryValue === null || queryValue === void 0 ? void 0 : queryValue.utm_campaign}`;
        }
        else {
            utm = "";
        }
    }
    const FC_TRACKING = shopMetaData &&
        (0, utils_1.getMetadataValue)(shopMetaData, "fc_session_tracking") &&
        (0, utils_1.parseJson)((0, utils_1.getMetadataValue)(shopMetaData, "fc_session_tracking"));
    fetch("https://t.farziengineer.co/collect", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pu: previousURL,
            cu: routerAsPath,
            ui: visitorId,
            ci: FC_TRACKING === null || FC_TRACKING === void 0 ? void 0 : FC_TRACKING.client_id,
            ua: window.navigator.userAgent,
            uip: ip,
            utm: utm,
        }),
    }).catch((err) => {
        console.log("t.farziengineer.co/collect error:", err);
    });
    previousURL = routerAsPath;
});
exports.pageViewTrack = pageViewTrack;
