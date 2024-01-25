import { JWT_SECRET } from "../config";
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized"
        })
    }
}

module.exports = auth;