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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Challenge_1 = __importDefault(require("../models/Challenge"));
const ChallengeController = {
    getChallenges: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const challenges = yield Challenge_1.default.find({});
        return res.json({
            challenges,
        });
    }),
    postChallenge: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const challengeData = req.body;
        const requirements = req.body.requirements.split(";");
        const challenge = yield Challenge_1.default.create({
            name: challengeData.name,
            rank: challengeData.rank,
            requirements: requirements,
        });
        return res.json({ challenge });
    }),
    putChallenge: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, data } = req.body;
        data.requirements = data.requirements.split(";");
        const challenge = yield Challenge_1.default.findOneAndUpdate({ _id: _id }, data, {
            new: true,
        });
        return res.json({ challenge });
    }),
    deleteChallenge: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.body;
        const challenge = yield Challenge_1.default.findOneAndDelete({ _id: _id });
        return res.json({ challenge });
    }),
};
exports.default = ChallengeController;
