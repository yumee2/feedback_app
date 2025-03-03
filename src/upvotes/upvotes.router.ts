import express, {Request, Response} from 'express';
import * as upvoteService from './upvotes.service';
import { authenticateToken } from '../shared/middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   - name: Upvotes
 */
const router = express.Router();


/**
 * @swagger
 * /upvote/users/{userId}/feedback/{feedbackId}:
 *   post:
 *     summary: Upvote a feedback post
 *     description: Allows a user to upvote a feedback post by providing user and feedback post IDs.
 *     tags: [Upvotes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user who is upvoting the post.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: feedbackId
 *         required: true
 *         description: The ID of the feedback post being upvoted.
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Successfully upvoted the feedback post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Upvote successful"
 *                 upvoteId:
 *                   type: integer
 *                   example: 2001
 */
router.post('/users/:userId/feedback/:feedbackId', authenticateToken, async (req: Request & {user?: any}, res: Response) => {
    const {feedbackId} = req.params;
    const userId = req.user.id;

    try {
        const upvote = await upvoteService.upvotePost({userId: Number(userId), feedbackPostId: Number(feedbackId)});
        res.status(200).send(upvote);
    } catch(e: any) {
        if (e.code === 'P2002') { // Проверяем сущуествует ли уже такая запись
            res.status(500).send("Upvote already exists");
            return;
        }
        res.status(500).send("Error trying to upvote the post");
    } 
});

export default router;