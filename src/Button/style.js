"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Button = styled_components_1.default.button `
  padding: 20px;
  background: blueviolet;
  color: white;
  border-radius: 4px;
`;
