"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const typedoc_1 = require("typedoc");
const Theme_1 = require("./Theme");
function load(app) {
    app.listenTo(app.renderer, typedoc_1.RendererEvent.END, () => {
        const from = (0, path_1.resolve)(__dirname, "../assets/style.css");
        const to = (0, path_1.resolve)(app.options.getValue("out"), "assets/suika-theme.css");
        (0, fs_1.cpSync)(from, to);
    });
    app.renderer.defineTheme("suika-theme", Theme_1.Theme);
}
exports.load = load;
