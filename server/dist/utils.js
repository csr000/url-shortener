"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writelog = exports.getUrlDoc = exports.urlSchema = void 0;
const model_1 = require("./db/model");
// import * as dotenv from 'dotenv'
// dotenv.config()
function urlSchema(SCHEME, HOST, PORT, URL) {
    return `${SCHEME}://${HOST}:${PORT}/${URL}`;
}
exports.urlSchema = urlSchema;
/**
 * find document with genUrl & return it
 */
function getUrlDoc(pattern) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = model_1.LinkModel.findOne(pattern);
        const doc = yield query.exec();
        return doc;
    });
}
exports.getUrlDoc = getUrlDoc;
function writelog(...log) {
    process.env.NODE_ENV == "prod" ? null : console.log(...log);
}
exports.writelog = writelog;
