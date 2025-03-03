import express, {Request, Response} from 'express';
import * as feedbackService from './feedback-posts.service';
import { Category } from './enums/category.enum';
import { Status } from './enums/status.enum';
import { authenticateToken } from '../shared/middlewares/auth.middleware';

const router = express.Router();

router.post("/", authenticateToken, async (req: Request & {user?: any}, res: Response) => {
    const {title, description, status, category, board_id} = req.body;
    const author_id = req.user.id;

    if(!title || !description || !status || !category || !author_id || !board_id) {
        res.status(422).send({error: 'Provide the right data model!'});
        return;
    }

    try {
        const feedback = await feedbackService.createFeedbackPost({title, description, status, category, author_id, board_id, updated_at: new Date()});
        res.status(200).send(feedback);
    } catch(e: any) {
        console.log(e.message);
        res.status(500).send("Error trying to create a feedback post");
    } 
}); 

router.get("/boards/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const boardId = parseInt(id, 10);

    const status = req.query.status as string | undefined;
    const category = req.query.category as string | undefined;
    const sort = req.query.sort as 'asc' | 'desc' | undefined;
    const sortByUpvotes = req.query.sortByUpvotes as 'asc' | 'desc' | undefined;
    const take = Number(req.query.take) || 10;
    const skip = Number(req.query.skip) || 0;

    if (status && !Object.values(Status).includes(status as Status)) {
        res.status(400).send(`Invalid status. Allowed values: ${Object.values(Status).join(', ')}`);
        return;
    }

    if (category && !Object.values(Category).includes(category as Category)) {
        res.status(400).send(`Invalid category. Allowed values: ${Object.values(Category).join(', ')}`);
        return;
    }

    try {
        const feedbacks = await feedbackService.getFeedbackPostByBoardId(boardId, take, skip, (status as Status), (category as Category), sort, sortByUpvotes);
        res.status(200).send(feedbacks);
    } catch(e: any) {
        console.log(e.message);
        res.status(500).send(`Error trying to get a feedback posts by board id: ${boardId}`);
    } 
});

router.get("/category", async (req: Request, res: Response) => {
    res.status(200).send(Object.keys(Category));
});

router.get("/status", async (req: Request, res: Response) => {
    res.status(200).send(Object.keys(Status));
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const feedbackId = parseInt(id, 10);

    try {
        const feedback = await feedbackService.getFeedbackPostById(feedbackId);
        res.status(200).send(feedback);
    } catch(e: any) {
        console.log(e.message);
        res.status(500).send(`Error trying to get a feedback post by id: ${feedbackId}`);
    } 

});

router.delete("/:id", authenticateToken, async (req: Request & {user?: any}, res: Response) => {
    const id = req.params.id;
    const user_id = req.user.id;
    const feedbackId = parseInt(id, 10);

    try {
        const deletedFeedback = await feedbackService.deleteFeedbackPost(feedbackId, user_id);
        res.status(200).send(deletedFeedback);
    } catch(e: any) {
        console.log(e.message);
        res.status(500).send("Error trying to delete a feedback post");
    } 
});

router.put("/:id", authenticateToken, async (req: Request & {user?: any}, res: Response) => {
    const {title, description, status, category} = req.body;
    const id = req.params.id;
    const userId = req.user.id;

    const feedbackId = parseInt(id, 10);

    try {
        const updatedFeedback = await feedbackService.updateFeedbackPost(feedbackId, {title, description, status, category, updated_at: new Date()}, userId);
        res.status(200).send(updatedFeedback);
    } catch(e: any) {
        console.log(e.message);
        res.status(500).send("Error trying to update a feedback post");
    } 
});

export default router;