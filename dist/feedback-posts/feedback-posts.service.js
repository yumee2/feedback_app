var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as feedbackRepository from './feedback-posts.repository';
export function createFeedbackPost(createFeedbackPostDto) {
    return __awaiter(this, void 0, void 0, function* () {
        const feedback = yield feedbackRepository.createFeedbackPost(createFeedbackPostDto);
        return feedback;
    });
}
export function updateFeedbackPost(feedbackId, updateFeedbackPostDto, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const feedback = yield getFeedbackPostById(feedbackId);
        const board = feedback === null || feedback === void 0 ? void 0 : feedback.board;
        if (userId == (feedback === null || feedback === void 0 ? void 0 : feedback.author_id) || userId == (board === null || board === void 0 ? void 0 : board.user_id)) {
            const updatedFeedback = yield feedbackRepository.updateFeedbackPost(feedbackId, updateFeedbackPostDto);
            return updatedFeedback;
        }
        else {
            throw new Error("You have no right to perform this action");
        }
    });
}
export function deleteFeedbackPost(feedbackId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const feedback = yield getFeedbackPostById(feedbackId);
        const board = feedback === null || feedback === void 0 ? void 0 : feedback.board;
        console.log(userId, feedback === null || feedback === void 0 ? void 0 : feedback.author_id, board === null || board === void 0 ? void 0 : board.user_id);
        if (userId == (feedback === null || feedback === void 0 ? void 0 : feedback.author_id) || userId == (board === null || board === void 0 ? void 0 : board.user_id)) {
            const deletedFeedback = yield feedbackRepository.deleteFeedbackPost(feedbackId);
            return deletedFeedback;
        }
        else {
            throw new Error("You have no right to perform this action");
        }
    });
}
export function getFeedbackPostById(feedbackId) {
    return __awaiter(this, void 0, void 0, function* () {
        const feedback = yield feedbackRepository.getFeedbackPostById(feedbackId);
        return feedback;
    });
}
export function getFeedbackPostByBoardId(boardId, take, skip, status, category, sort, sortByUpvotes) {
    return __awaiter(this, void 0, void 0, function* () {
        const feedbacks = yield feedbackRepository.getFeedbackPostByBoardId(boardId, take, skip, status, category, sort, sortByUpvotes);
        return feedbacks;
    });
}
