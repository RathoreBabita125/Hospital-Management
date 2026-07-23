/**
 * @module Authentication/middleware.
 * Extracts and verifies the JWT token from cookies
 * and returns the authenticated user's payload.
 */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const AuthMiddleware = (req: any) => {
    const token = req.cookies?.token;
    if (!token) {
        return null;
    }

    // Verify and decode the JWT token
    const user = jwt.verify(token, process.env.SECRET_KEY!) as {
        id: number;
        email: string;
        role: number;
    };
    return user;
};