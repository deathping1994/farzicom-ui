"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJson = exports.getMetadataValue = void 0;
function getMetadataValue(metadata, key, alternateValue) {
    var _a;
    if (metadata) {
        const metaValue = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.filter((meta) => (meta === null || meta === void 0 ? void 0 : meta.key) === key)[0]) === null || _a === void 0 ? void 0 : _a.value;
        if (!metaValue && alternateValue !== undefined && alternateValue !== null)
            return alternateValue.toString();
        return metaValue;
    }
    return null;
}
exports.getMetadataValue = getMetadataValue;
const parseJson = (value) => {
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return value;
    }
};
exports.parseJson = parseJson;
