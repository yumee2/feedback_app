import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'


const SECRET_KEY = process.env.JWT_SECRET || '';

export interface CustomRequest extends Request {
    user?: any;
  }

export function authenticateToken(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Auth token is missing" });
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
        res.status(403).json({ message: "Недействительный токен" });
    }

    req.user = user;
    next();
  });
}