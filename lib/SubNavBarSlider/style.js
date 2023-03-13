"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubNavlist = exports.SubNavOrderList = exports.NavbarContainerWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.NavbarContainerWrapper = styled_components_1.default.div `
  width: 100%;
  display: block;
  overflow: auto hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 720px) {
    display: none;
  }
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
`;
exports.SubNavOrderList = styled_components_1.default.ul `
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(${props => (props === null || props === void 0 ? void 0 : props.repeat) || "auto-fill"},25%);
`;
exports.SubNavlist = styled_components_1.default.li `
  display: flex;
  min-width:80px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  & img{
    border-radius:50%;
  }

  & p{
  font-size: 10px;
  font-weight: normal;
  }
`;
