import { PrismaClient } from "@prisma/client";
import CreateBoardDto from "./dto/create-board.dto";

const prisma = new PrismaClient()

export async function createBoard(createBoardDto: CreateBoardDto) {
    const board = await prisma.board.create({
        data: {
         title: createBoardDto.title,
         description: createBoardDto.description,
         user_id: createBoardDto.user_id
        }, 
      })
    return board;
}

export async function getBoardById(boardId: number) {
  const board = await prisma.board.findUnique({
    where: {
      id: boardId
    }
  })
  return board;
}

export async function getBoardsByUserId(userId: number) {
  const board = await prisma.board.findMany({
    where: {
      user_id: userId
    },
  })
  return board;
}

export async function getAllBoards() {
  const board = await prisma.board.findMany();
  return board;
}
