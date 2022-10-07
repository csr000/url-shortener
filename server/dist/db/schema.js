"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkSchema = void 0;
const mongoose_1 = require("mongoose");
exports.LinkSchema = new mongoose_1.Schema({
    url: String,
    genUrl: String,
});
