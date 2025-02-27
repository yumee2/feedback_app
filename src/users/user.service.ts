import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

import CreateUserDto from "./dto/create-user.dto";
import { createUser, getUserByEmail } from "./user.repository";
import UserWithToken from './dto/user-with-token.dto';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

async function registerUser(createUserData: CreateUserDto): Promise<UserWithToken> {
    const user = await getUserByEmail(createUserData.email);
    if(user) {
        throw new Error('User with provided email already exists');
    }

    const hashPassword = await bcrypt.hash(createUserData.password, 5);
    createUserData.password = hashPassword;

    const newUser = await createUser(createUserData);
    const token = jwt.sign({ id: newUser.id}, JWT_SECRET, { expiresIn: "1m" });
    const returnUser = {
        id: newUser.id,
        email: newUser.email,
        avatar: newUser.avatar,
        boards: newUser.boards,
        feedback_posts: newUser.feedback_posts,
        upvotes: newUser.upvotes,
    };

    return {user: returnUser, token: token, token_type: "bearer"};
}

async function loginUser(loginUserData: CreateUserDto): Promise<UserWithToken> {
    const user = await getUserByEmail(loginUserData.email);
    if(!user) {
        throw new Error('User with provided email not found');
    }

    const isPasswordMatching = await bcrypt.compare(loginUserData.password, user.password);
    if(!isPasswordMatching) {
        throw new Error('Password is not matching');
    }

    const token = jwt.sign({ id: user.id}, JWT_SECRET, { expiresIn: "1m" });
    const returnUser = {
        id: user.id,
        email: user.email,
        avatar: user.avatar,
        boards: user.boards,
        feedback_posts: user.feedback_posts,
        upvotes: user.upvotes,
    };

    return {user: returnUser, token: token, token_type: "bearer"};
}

export {registerUser, loginUser};