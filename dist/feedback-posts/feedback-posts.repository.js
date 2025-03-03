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
export function createFeedbackPost(createFeedbackPost) {
    return __awaiter(this, void 0, void 0, function* () {
        const feedback = yield prisma.feedbackPost.create({
            data: {
                title: createFeedbackPost.title,
                description: createFeedbackPost.description,
                status: createFeedbackPost.status,
                category: createFeedbackPost.category,
                author_id: createFeedbackPost.author_id,
                board_id: createFeedbackPost.board_id,
                updated_at: createFeedbackPost.updated_at
            },
        });
        return feedback;
    });
}
export function updateFeedbackPost(feedbackId, updateFeedbackPost) {
    return __awaiter(this, void 0, void 0, function* () {
        const feedback = yield prisma.feedbackPost.update({
            where: {
                id: feedbackId
            },
            data: {
                title: updateFeedbackPost.title || undefined,
                description: updateFeedbackPost.description || undefined,
                status: updateFeedbackPost.status || undefined,
                category: updateFeedbackPost.category || undefined,
                updated_at: updateFeedbackPost.updated_at
            },
        });
        return feedback;
    });
}
export function getFeedbackPostById(feedbackId) {
    return __awaiter(this, void 0, void 0, function* () {
        const feedback = yield prisma.feedbackPost.findUnique({
            where: {
                id: feedbackId
            },
            include: {
                board: true
            }
        });
        return feedback;
    });
}
export function getFeedbackPostByBoardId(boardId, take, skip, status, category, sort, sortByUpvotes) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderBy = [];
        if (sortByUpvotes) {
            orderBy.push({ upvotes: { _count: sortByUpvotes } });
        }
        if (sort) {
            orderBy.push({ created_at: sort });
        }
        const feedback = yield prisma.feedbackPost.findMany({
            where: {
                board_id: boardId,
                status: status,
                category: category
            },
            orderBy,
            include: {
                upvotes: true
            },
            take: take,
            skip: skip
        });
        return feedback;
    });
}
export function deleteFeedbackPost(feedbackId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedFeedback = yield prisma.feedbackPost.delete({
            where: {
                id: feedbackId
            }
        });
        return deletedFeedback;
    });
}
