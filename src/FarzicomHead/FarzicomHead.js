"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const head_1 = __importDefault(require("next/head"));
const utils_1 = require("../utils");
const getId = (data) => {
    if ((data === null || data === void 0 ? void 0 : data.enable) && (data === null || data === void 0 ? void 0 : data.id)) {
        return data === null || data === void 0 ? void 0 : data.id;
    }
    return null;
};
const FarzicomHead = ({ useFb, useGTM, useFavicon, shopMeta, }) => {
    console.log("FarzicomHead");
    const facebookIdContent = shopMeta &&
        (0, utils_1.getMetadataValue)(shopMeta, "facebookPixel_id") &&
        (0, utils_1.parseJson)((0, utils_1.getMetadataValue)(shopMeta, "facebookPixel_id"));
    const gtmIdContent = shopMeta &&
        (0, utils_1.getMetadataValue)(shopMeta, "GTM_id") &&
        (0, utils_1.parseJson)((0, utils_1.getMetadataValue)(shopMeta, "GTM_id"));
    const FAVICON_IMAGE = shopMeta &&
        (0, utils_1.getMetadataValue)(shopMeta, "favicon_image") &&
        (0, utils_1.parseJson)((0, utils_1.getMetadataValue)(shopMeta, "favicon_image"));
    console.log("FAVICON_IMAGE", FAVICON_IMAGE);
    const gtmScriptContent = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${getId(gtmIdContent)}');
  `;
    const fbScriptContent = `
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
  fbq(
    "init",
    "${getId(facebookIdContent)}"
  );
  fbq("track", "PageView");
`;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        console.log("farzicomHead outside head"),
        react_1.default.createElement(head_1.default, null,
            console.log("farzicomHead inside head"),
            useGTM && getId(gtmIdContent) ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("script", { async: true, defer: true, crossOrigin: "anonymous", "data-from": "FazicomUI-Head", dangerouslySetInnerHTML: {
                        __html: gtmScriptContent,
                    } }))) : (react_1.default.createElement(react_1.default.Fragment, null)),
            useFb && getId(facebookIdContent) ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("script", { async: true, crossOrigin: "anonymous", "data-from": "FazicomUI-Head", dangerouslySetInnerHTML: {
                        __html: fbScriptContent,
                    } }))) : (react_1.default.createElement(react_1.default.Fragment, null)),
            useFavicon ? react_1.default.createElement("link", { rel: "shortcut icon", href: FAVICON_IMAGE }) : react_1.default.createElement(react_1.default.Fragment, null))));
};
FarzicomHead.displayName = "FarzicomHead";
exports.default = FarzicomHead;
