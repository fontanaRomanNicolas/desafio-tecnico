// utils/jwtHelper.js
import jwt from 'jsonwebtoken';

const secretKey = process.env.AUTH_JWT_SECRET

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    console.log(token);

    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token.' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido.' });
    }
};

export const decodeToken = (token) => {
    try {
        const decoded = jwt.decode(token, { complete: true });
        return decoded;
    } catch (error) {
        return null;
    }
};

export const generateJWT = (userId) => {
    const jwtSecret = process.env.AUTH_JWT_SECRET;
    return jwt.sign({ id: userId }, jwtSecret, {
        expiresIn: 21700 // 6 hours
    });
};