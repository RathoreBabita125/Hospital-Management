import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const AuthMiddleware = (req: any) => {
    const token = req.cookies?.token;

    if (!token) {
        return null;
    }

    const user = jwt.verify(token, process.env.SECRET_KEY!) as {
        id: number;
        email: string;
        role: number;
    };

    return user;
};