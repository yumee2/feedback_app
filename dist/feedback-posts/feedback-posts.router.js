var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import * as feedbackService from './feedback-posts.service';
import { Category } from './enums/category.enum';
import { Status } from './enums/status.enum';
import { authenticateToken } from '../shared/middlewares/auth.middleware';
/**
 * @swagger
 * tags:
 *   - name: Feedback
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     Category:
 *       type: string
 *       enum: [BUG, FUNCTIONALITY, UI, PERFORMANCE]
 *       description: "Categories for feedback posts."
 *     Status:
 *       type: string
 *       enum: [IDEA, PLANNED, IN_PROGRESS, COMPLETED]
 *       description: "Statuses for feedback posts."
 */
const router = express.Router();
/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Create a feedback post
 *     tags: [Feedback]
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
 *                 example: "My Feedback"
 *               description:
 *                 type: string
 *                 example: "Description of the feedback post."
 *               status:
 *                 $ref: '#/components/schemas/Status'
 *               category:
 *                 $ref: '#/components/schemas/Category'
 *               board_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully created feedback post.
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
 *                   example: "My Feedback"
 *                 description:
 *                   type: string
 *                   example: "Description of the feedback post."
 *                 status:
 *                   $ref: '#/components/schemas/Status'
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *                 board_id:
 *                   type: integer
 *                   example: 1
 */
router.post("/", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, category, board_id } = req.body;
    const author_id = req.user.id;
    if (!title || !description || !status || !category || !author_id || !board_id) {
        res.status(422).send({ error: 'Provide the right data model!' });
        return;
    }
    try {
        const feedback = yield feedbackService.createFeedbackPost({ title, description, status, category, author_id, board_id, updated_at: new Date() });
        res.status(200).send(feedback);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Error trying to create a feedback post");
    }
}));
/**
 * @swagger
 * /feedback/boards/{id}:
 *   get:
 *     summary: Get feedback posts by board ID
 *     description: Retrieve feedback posts associated with a specific board.
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The board ID to get feedback posts for.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           $ref: '#/components/schemas/Status'
 *         description: "Filter feedback posts by status."
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           $ref: '#/components/schemas/Category'
 *         description: "Filter feedback posts by category."
 *     responses:
 *       200:
 *         description: Successfully retrieved feedback posts for the board.
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
 *                     example: "Feedback Post Title"
 *                   description:
 *                     type: string
 *                     example: "Description of the feedback post."
 *                   status:
 *                     $ref: '#/components/schemas/Status'
 *                   category:
 *                     $ref: '#/components/schemas/Category'
 *                   board_id:
 *                     type: integer
 *                     example: 1
 */
router.get("/boards/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const boardId = parseInt(id, 10);
    const status = req.query.status;
    const category = req.query.category;
    const sort = req.query.sort;
    const sortByUpvotes = req.query.sortByUpvotes;
    const take = Number(req.query.take) || 10;
    const skip = Number(req.query.skip) || 0;
    if (status && !Object.values(Status).includes(status)) {
        res.status(400).send(`Invalid status. Allowed values: ${Object.values(Status).join(', ')}`);
        return;
    }
    if (category && !Object.values(Category).includes(category)) {
        res.status(400).send(`Invalid category. Allowed values: ${Object.values(Category).join(', ')}`);
        return;
    }
    try {
        const feedbacks = yield feedbackService.getFeedbackPostByBoardId(boardId, take, skip, status, category, sort, sortByUpvotes);
        res.status(200).send(feedbacks);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send(`Error trying to get a feedback posts by board id: ${boardId}`);
    }
}));
/**
 * @swagger
 * /feedback/category:
 *   get:
 *     summary: Get all feedback categories
 *     description: Retrieve all available feedback categories.
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: List of available feedback categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send(Object.keys(Category));
}));
/**
 * @swagger
 * /feedback/status:
 *   get:
 *     summary: Get all feedback statuses
 *     description: Retrieve all available feedback statuses.
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: List of available feedback statuses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Status'
 */
router.get("/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send(Object.keys(Status));
}));
/**
 * @swagger
 * /feedback/{id}:
 *   get:
 *     summary: Get feedback post by ID
 *     description: Retrieve a specific feedback post by its ID.
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the feedback post to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the feedback post.
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
 *                   example: "Feedback Title"
 *                 description:
 *                   type: string
 *                   example: "Description of the feedback."
 *                 status:
 *                   $ref: '#/components/schemas/Status'
 *                 category:
 *                  $ref: '#/components/schemas/Category'
 */
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const feedbackId = parseInt(id, 10);
    try {
        const feedback = yield feedbackService.getFeedbackPostById(feedbackId);
        res.status(200).send(feedback);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send(`Error trying to get a feedback post by id: ${feedbackId}`);
    }
}));
/**
 * @swagger
 * /feedback/{id}:
 *   delete:
 *     summary: Delete feedback post by ID
 *     description: Delete a specific feedback post by its ID.
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the feedback post to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted the feedback post.
 */
router.delete("/:id", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user_id = req.user.id;
    const feedbackId = parseInt(id, 10);
    try {
        const deletedFeedback = yield feedbackService.deleteFeedbackPost(feedbackId, user_id);
        res.status(200).send(deletedFeedback);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Error trying to delete a feedback post");
    }
}));
/**
 *@swagger
* /feedback/{id}:
*   put:
*     summary: Update feedback post by ID
*     description: Update a specific feedback post by its ID.
*     tags: [Feedback]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The ID of the feedback post to update.
*         schema:
*           type: integer
*           example: 1
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*                 example: "Updated Feedback Title"
*               description:
*                 type: string
*                 example: "Updated description of the feedback post."
*               status:
*                 $ref: '#/components/schemas/Status'
*               category:
*                 $ref: '#/components/schemas/Category'
*     responses:
*       200:
*         description: Successfully updated the feedback post.
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
*                   example: "Updated Feedback Title"
*                 description:
*                   type: string
*                   example: "Updated description of the feedback post."
*/
router.put("/:id", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, category } = req.body;
    const id = req.params.id;
    const userId = req.user.id;
    const feedbackId = parseInt(id, 10);
    try {
        const updatedFeedback = yield feedbackService.updateFeedbackPost(feedbackId, { title, description, status, category, updated_at: new Date() }, userId);
        res.status(200).send(updatedFeedback);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Error trying to update a feedback post");
    }
}));
export default router;
