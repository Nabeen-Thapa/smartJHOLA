import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: { id: string };
}

const fetchUser = (req:Request, res: Response, next: NextFunction) => {
    const token = req.header("jwtToken");

    if (!token || token.split('.').length !== 3) {
        return res.status(400).json({ message: "Token not provided" });
    }

    try {
        const jwt_key = process.env.JWT_KEY || "08fb78aba953ba15c6227a5cc93600e7"; 
        const data = jwt.verify(token, jwt_key) as { user: { id: string } };

        if (!data.user || !data.user.id) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        req.user = { id: data.user.id };
        next();
    } catch (error) {
        console.error("fetchUser error:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

export default fetchUser;
