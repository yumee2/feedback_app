import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || '';
export function authenticateToken(req, res, next) {
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
