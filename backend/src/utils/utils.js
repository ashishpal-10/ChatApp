import { truncateSync } from "fs";
import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const isSecure =
        res.req?.secure ||
        res.req?.headers?.["x-forwarded-proto"] === "https" ||
        process.env.NODE_ENV === "production";

    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: isSecure ? "none" : "lax",
        secure: isSecure,
    });

    return token;
};