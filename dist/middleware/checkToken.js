"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkToken(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        return next();
    }
    else {
        return res.status(401).json({ error: "Unauthorized" });
    }
}
exports.default = checkToken;
