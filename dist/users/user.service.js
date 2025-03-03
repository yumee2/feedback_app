var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import * as userRepository from "./user.repository";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || '';
export function registerUser(createUserData) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository.getUserByEmail(createUserData.email);
        if (user) {
            throw new Error('User with provided email already exists');
        }
        const hashPassword = yield bcrypt.hash(createUserData.password, 5);
        createUserData.password = hashPassword;
        const newUser = yield userRepository.createUser(createUserData);
        const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "30d" });
        const returnUser = {
            id: newUser.id,
            email: newUser.email,
            avatar: newUser.avatar,
            boards: newUser.boards,
            feedback_posts: newUser.feedback_posts,
            upvotes: newUser.upvotes,
        };
        return { user: returnUser, token: token, token_type: "bearer" };
    });
}
export function loginUser(loginUserData) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository.getUserByEmail(loginUserData.email);
        if (!user) {
            throw new Error('User with provided email not found');
        }
        const isPasswordMatching = yield bcrypt.compare(loginUserData.password, user.password);
        if (!isPasswordMatching) {
            throw new Error('Password is not matching');
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "30d" });
        const returnUser = {
            id: user.id,
            email: user.email,
            avatar: user.avatar,
            boards: user.boards,
            feedback_posts: user.feedback_posts,
            upvotes: user.upvotes,
        };
        return { user: returnUser, token: token, token_type: "bearer" };
    });
}
export function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository.getUser(userId);
        return user;
    });
}
