"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSubmission = void 0;
const db_1 = __importDefault(require("../../config/db"));
const saveSubmission = async (email, answers) => {
    return await db_1.default.tx(async (t) => {
        const id = await t.one("INSERT INTO submissions (email) VALUES ($1) RETURNING id", [email]);
        const values = answers.map((answer) => {
            return t.none("INSERT INTO validated_answers (submission_id, question, answer, validation) VALUES ($1, $2, $3, $4)", [id, answer.question, answer.answer, answer.validation]);
        });
        return await t.batch(values);
    });
};
exports.saveSubmission = saveSubmission;
