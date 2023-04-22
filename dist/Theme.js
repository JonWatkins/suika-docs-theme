"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = void 0;
const typedoc_1 = require("typedoc");
const ThemeContext_1 = require("./ThemeContext");
class Theme extends typedoc_1.DefaultTheme {
    constructor(renderer) {
        super(renderer);
    }
    getRenderContext(pageEvent) {
        return new ThemeContext_1.ThemeContext(this, pageEvent, this.application.options);
    }
}
exports.Theme = Theme;
