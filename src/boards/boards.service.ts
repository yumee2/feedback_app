import * as boardRepository from "./boards.repository";
import CreateBoardDto from "./dto/create-board.dto";

export async function createBoard(createBoardDto: CreateBoardDto) {
    const board = await boardRepository.createBoard(createBoardDto);
    return board;
}

export async function getBoardById(boardId: number) {
    const board = await boardRepository.getBoardById(boardId);
    return board;
}

export async function getBoardsByUserId(userId: number) {
    const board = await boardRepository.getBoardsByUserId(userId);
    return board;
}

export async function getAllBoards() {
    const board = await boardRepository.getAllBoards();
    return board;
}