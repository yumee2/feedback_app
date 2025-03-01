import express, {Request, Response} from 'express';
import * as upvoteService from './upvotes.service';


const router = express.Router();

router.post('/users/:userId/feedback/:feedbackId', async (req: Request, res: Response) => {
    const {userId, feedbackId} = req.params;
    
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