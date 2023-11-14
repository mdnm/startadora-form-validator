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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const submissionRepository = __importStar(require("../repositories/submissionRepository"));
const aiService = __importStar(require("../services/aiService"));
const validate = async (req, res) => {
    const { Email, ...questions } = req.body;
    try {
        const submissions = Object.entries(questions).map(([question, answer]) => {
            return { question, answer: answer };
        });
        const validatedAnswers = await aiService.validateAnswers(submissions);
        await submissionRepository.saveSubmission(Email, validatedAnswers);
        res.status(201).json({ message: "Successfully stored submission" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to store submission" });
    }
};
exports.validate = validate;
