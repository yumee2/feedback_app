import { PrismaClient } from "@prisma/client"
import CreateUserDto from "./dto/create-user.dto";
import UserDto from "./dto/user.dto";


const prisma = new PrismaClient()

export async function getUserByEmail(email: string) { //TODO add return type
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        include: {
            boards: true,
            feedback_posts: true,
            upvotes: true
        }
    });
    return user;
}

export async function createUser(userDto: CreateUserDto): Promise<UserDto> {
    const user = await prisma.user.create({
        data: {
          email: userDto.email,
          password: userDto.password,
          avatar: userDto.avatar
        },
        include: {
            boards: true,
            feedback_posts: true,
            upvotes: true
        }
      })
    return user;
}