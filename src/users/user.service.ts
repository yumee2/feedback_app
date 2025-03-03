import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

import CreateUserDto from "./dto/create-user.dto";
import * as userRepository from "./user.repository";
import UserWithToken from './dto/user-with-token.dto';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function registerUser(createUserData: CreateUserDto): Promise<UserWithToken> {
    const user = await userRepository.getUserByEmail(createUserData.email);
    if(user) {
        throw new Error('User with provided email already exists');
    }

    const hashPassword = await bcrypt.hash(createUserData.password, 5);
    createUserData.password = hashPassword;

    const newUser = await userRepository.createUser(createUserData);
    const token = jwt.sign({ id: newUser.id}, JWT_SECRET, { expiresIn: "30d" });
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

export async function loginUser(loginUserData: CreateUserDto): Promise<UserWithToken> {
    const user = await userRepository.getUserByEmail(loginUserData.email);
    if(!user) {
        throw new Error('User with provided email not found');
    }

    const isPasswordMatching = await bcrypt.compare(loginUserData.password, user.password);
    if(!isPasswordMatching) {
        throw new Error('Password is not matching');
    }

    const token = jwt.sign({ id: user.id}, JWT_SECRET, { expiresIn: "30d" });
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

export async function getUser(userId:number) {
    const user = await userRepository.getUser(userId);
    return user;
}