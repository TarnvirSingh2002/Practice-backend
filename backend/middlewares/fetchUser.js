import jwt from 'jsonwebtoken';
import { asyncHandler } from '../errorMiddleware/asyncHandler.js';
import { ApiError } from '../errorMiddleware/ApiError.js';
export const fetchUser = asyncHandler((req, _, next) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        throw new ApiError("Please authenticate using a valid token", 401)
    }
    const data = jwt.verify(token, 'Trahudgeu');
    console.log(data);
    req.user = data.id;
    next();
});