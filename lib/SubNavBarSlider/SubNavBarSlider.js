"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubNavBarSlider = void 0;
const react_1 = __importDefault(require("react"));
const SubNavBarSlider = ({ sliderData, sliderClass = "subNavUI", }) => {
    if (Array.isArray(sliderData) && sliderData.length > 0) {
        return (react_1.default.createElement("div", { className: `${sliderClass}__wrapperrrrrr` }, "test"));
    }
    return react_1.default.createElement(react_1.default.Fragment, null);
};
exports.SubNavBarSlider = SubNavBarSlider;
exports.SubNavBarSlider.displayName = "SubNavBarSlider";
exports.default = exports.SubNavBarSlider;
