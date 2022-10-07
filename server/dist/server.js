"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv = __importStar(require("dotenv"));
const utils_1 = require("./utils");
const model_1 = require("./db/model");
dotenv.config();
const app = (0, express_1.default)();
const SCHEME = process.env.SCHEME;
const HOST = process.env.HOST;
const PORT = parseInt(process.env.PORT);
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    (0, utils_1.writelog)(req.params);
    if (url) {
        // if link exists already, just send the existing gen link
        const doc = yield (0, utils_1.getUrlDoc)({ url });
        if (doc) {
            res.send((0, utils_1.urlSchema)(SCHEME, HOST, PORT, doc.genUrl));
        }
        else {
            // generate & send short link
            const genUrl = crypto_1.default.randomBytes(2).toString("hex");
            model_1.LinkDB.url = url;
            model_1.LinkDB.genUrl = genUrl;
            model_1.LinkDB.save(() => {
                const newUrl = `${SCHEME}://${HOST}:${PORT}/${genUrl}`;
                res.send(newUrl);
            });
        }
    }
    else {
        res.status(400).send("url was empty.");
    }
}));
app.post("/:genUrl", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genUrl = req.params.genUrl;
    const doc = yield (0, utils_1.getUrlDoc)({ genUrl });
    doc ? res.send(doc.url) : res.status(404).send();
}));
app.listen(PORT, () => (0, utils_1.writelog)(`Server started on port ${PORT}`));
