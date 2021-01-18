"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
async function bootstrap() {
    // enable cors
    app.use(cors_1.default());
    app.listen(4000, () => {
        console.log("Listening on port 4000");
    });
}
bootstrap();
