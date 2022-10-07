"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkDB = exports.LinkModel = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("./schema");
exports.LinkModel = (0, mongoose_1.model)("Link", schema_1.LinkSchema);
exports.LinkDB = new exports.LinkModel();
