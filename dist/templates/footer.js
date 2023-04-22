"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.footer = void 0;
const typedoc_1 = require("typedoc");
const footer = (context, props) => (typedoc_1.JSX.createElement("footer", { class: "container tsd-generator" },
    typedoc_1.JSX.createElement("p", null,
        "Generated using",
        " ",
        typedoc_1.JSX.createElement("a", { href: "https://typedoc.org/", target: "_blank" }, "TypeDoc"))));
exports.footer = footer;
