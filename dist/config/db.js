"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_promise_1 = __importDefault(require("pg-promise"));
dotenv_1.default.config();
if (!process.env.DB_URL) {
    console.error("Missing database configuration");
    process.exit(1);
}
const pgp = (0, pg_promise_1.default)();
const db = pgp(process.env.DB_URL);
exports.default = db;
