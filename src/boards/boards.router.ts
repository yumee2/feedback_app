import express, { Request, Response } from 'express';
import * as boardService from './boards.service';
import { authenticateToken } from '../shared/middlewares/auth.middleware';
const router = express.Router();

router.post('/', authenticateToken, async (req: Request & {user?: any}, res: Response) => {
    const { title, description } = req.body;
    const user_id = req.user.id;

    if (!title || !description || !user_id) {
        res.status(422).send({error: 'Provide the right data model'});
        return;
    }
    
    try {
        const board = await boardService.createBoard({title: title, description: description, user_id: user_id});
        res.status(200).send(board);
    } catch(error: any) { 
        console.log(error.message)
        res.status(500).send("Error during board creation");   
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const board = await boardService.getAllBoards();
        res.status(200).send(board);
    } catch(error: any) { 
        console.log(error.message)
        res.status(500).send("Error trying to get all boards");   
    }
});

router.get('/users/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id)
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
        res.status(400).json({ error: "ID must be a number" });
        return;
    }

    try {
        const boards = await boardService.getBoardsByUserId(userId);
        res.status(200).send(boards);
    } catch(e: any) {
        res.status(500).send("Error trying to get a boards by user ID");   
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const boardId = parseInt(id, 10);
    if (isNaN(boardId)) {
        res.status(400).json({ error: "ID must be a number" });
        return;
    }

    try {
        const board = await boardService.getBoardById(boardId);
        res.status(200).send(board);
    } catch(e: any) {
        res.status(500).send("Error trying to get a boards by ID");   
    }
});


export default router;