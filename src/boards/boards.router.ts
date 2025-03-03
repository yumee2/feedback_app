import express, { Request, Response } from 'express';
import * as boardService from './boards.service';
import { authenticateToken } from '../shared/middlewares/auth.middleware';
/**
 * @swagger
 * tags:
 *   - name: Boards
 */
const router = express.Router();
/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 *     description: Create a new board by providing a title, description, and user authentication.
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My New Board"
 *               description:
 *                 type: string
 *                 example: "This is a description of the board."
 *     responses:
 *       200:
 *         description: Successfully created the board.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "My New Board"
 *                 description:
 *                   type: string
 *                   example: "This is a description of the board."
 *                 user_id:
 *                   type: integer
 *                   example: 1
 */
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

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards
 *     description: Retrieve a list of all boards.
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: Successfully retrieved all boards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Board Title"
 *                   description:
 *                     type: string
 *                     example: "Board Description"
 *                   user_id:
 *                     type: integer
 */                     example: 1
 
router.get('/', async (req: Request, res: Response) => {
    try {
        const board = await boardService.getAllBoards();
        res.status(200).send(board);
    } catch(error: any) { 
        console.log(error.message)
        res.status(500).send("Error trying to get all boards");   
    }
});

/**
 * @swagger
 * /boards/users/{id}:
 *   get:
 *     summary: Get boards by user ID
 *     description: Retrieve all boards associated with a specific user by their user ID.
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID to get the boards for.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved boards for the given user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "User's Board"
 *                   description:
 *                     type: string
 */                     example: "Board description"
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

/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Get board by ID
 *     description: Retrieve a specific board by its ID.
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the board to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the board.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Board Title"
 *                 description:
 *                   type: string
 *                   example: "Description of the board."
 *                 user_id:
 *                   type: integer
 */                   example: 1
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