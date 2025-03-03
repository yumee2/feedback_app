var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export function createBoard(createBoardDto) {
    return __awaiter(this, void 0, void 0, function* () {
        const board = yield prisma.board.create({
            data: {
                title: createBoardDto.title,
                description: createBoardDto.description,
                user_id: createBoardDto.user_id
            },
        });
        return board;
    });
}
export function getBoardById(boardId) {
    return __awaiter(this, void 0, void 0, function* () {
        const board = yield prisma.board.findUnique({
            where: {
                id: boardId
            }
        });
        return board;
    });
}
export function getBoardsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const board = yield prisma.board.findMany({
            where: {
                user_id: userId
            },
        });
        return board;
    });
}
export function getAllBoards() {
    return __awaiter(this, void 0, void 0, function* () {
        const board = yield prisma.board.findMany();
        return board;
    });
}
