"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubNavBarSlider = void 0;
const react_1 = __importDefault(require("react"));
const image_1 = __importDefault(require("next/image"));
const S = __importStar(require("./style"));
const link_1 = __importDefault(require("next/link"));
const SubNavBarSlider = ({ sliderData, sliderClass = "subNavUI", }) => {
    if (Array.isArray(sliderData) && sliderData.length > 0) {
        return (react_1.default.createElement(S.NavbarContainerWrapper, { className: `${sliderClass}__wrapper` },
            react_1.default.createElement(S.SubNavOrderList, { className: `${sliderClass}__lists`, repeat: sliderData.length }, sliderData === null || sliderData === void 0 ? void 0 : sliderData.map((navItems) => {
                var _a, _b;
                return (react_1.default.createElement(S.SubNavlist, null,
                    react_1.default.createElement(link_1.default, { href: (navItems === null || navItems === void 0 ? void 0 : navItems.navigation) || "/" },
                        react_1.default.createElement(image_1.default, { src: (navItems === null || navItems === void 0 ? void 0 : navItems.image) || "", alt: navItems === null || navItems === void 0 ? void 0 : navItems.alt, height: (_a = navItems === null || navItems === void 0 ? void 0 : navItems.imageDimensions) === null || _a === void 0 ? void 0 : _a.height, width: (_b = navItems === null || navItems === void 0 ? void 0 : navItems.imageDimensions) === null || _b === void 0 ? void 0 : _b.width, className: `${sliderClass}__image` })),
                    react_1.default.createElement("p", { className: `${sliderClass}__title` }, navItems === null || navItems === void 0 ? void 0 : navItems.title)));
            }))));
    }
    return react_1.default.createElement(react_1.default.Fragment, null);
};
exports.SubNavBarSlider = SubNavBarSlider;
exports.SubNavBarSlider.displayName = "SubNavBarSlider";
exports.default = exports.SubNavBarSlider;
