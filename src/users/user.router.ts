import express, {Request, Response} from 'express';

import * as userService from './user.service';
import UserWithToken from './dto/user-with-token.dto';
import upload from '../shared/middlewares/upload.middleware';

/**
 * @swagger
 * tags:
 *   - name: Users
 */

const router = express.Router();
/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Login in profile
 *     tags: [Users]
 *     description: Sign in 
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@gmail.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful response        
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/signup', upload.single('avatar'), async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password || !req.file) {
        res.status(422).send({error: 'Provide the right data model'});
        return;
    }
    try {
        const avatarPath = `${req.protocol}://${req.get('host')}/public/uploads/${req.file!.filename}`;
        const userData: UserWithToken = await userService.registerUser({...req.body, avatar: avatarPath});
        res.status(200).send(userData);
    } catch (error: any) {
        res.status(500).send({error: error.message});   
    }
});
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Sign Up user
 *     tags: [Users]
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@gmail.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: Successful response        
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/login', async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password) {
        res.status(422).send({error: 'Provide the right data model'});
        return;
    }
    
    try {
        const userData: UserWithToken = await userService.loginUser(req.body);
        res.status(200).send(userData);
    } catch (error: any) {
        res.status(500).send({error: error.message});   
    }
}); 

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     description: Fetch a user from the database using their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *           example: 123
 *     responses:
 *       200:
 *         description: Successful response, the user was found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: "example@gmail.com"
 *                 avatarUrl:
 *                   type: string
 *                   example: "http://localhost:3000/uploads/avatar.jpg"
 */
router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const user = await userService.getUser(Number(id));
        res.status(200).send(user);
    } catch(e: any) {
        console.log(e.message);
        res.status(500).send({error: "Error trying to get a user by his ID"});
    }

})
export default router;