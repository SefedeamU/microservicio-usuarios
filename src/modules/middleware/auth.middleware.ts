import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: CustomRequest, res: Response, next: NextFunction) {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send('Unauthorized');
        }

        try {
            const decoded = jwt.verify(token, 'secretKey');
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).send('Unauthorized');
        }
    }
}