"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
if (process.env.MONGODB_URI) {
    mongoose_1.default.connect(process.env.MONGODB_URI);
}
else {
    throw Error("MONGODB_URI not defined in environmental variables.");
}
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://unique-mochi-478698.netlify.app",
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const ChallengeRouter_1 = __importDefault(require("./routers/ChallengeRouter"));
app.use("/challenges", ChallengeRouter_1.default);
const UserRouter_1 = __importDefault(require("./routers/UserRouter"));
app.use("/users", UserRouter_1.default);
app.all("*", (req, res) => {
    return res.json({ message: "Catch-all" });
});
exports.default = app;
