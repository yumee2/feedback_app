import CreateFeedbackPostDto from "./dto/create-feedback.dto";
import UpdateFeedbackPostDto from "./dto/update-feedback.dto";
import * as feedbackRepository from './feedback-posts.repository';

export async function createFeedbackPost(createFeedbackPostDto: CreateFeedbackPostDto) {
    const feedback = await feedbackRepository.createFeedbackPost(createFeedbackPostDto);
    return feedback;
}

export async function updateFeedbackPost(feedbackId: number, updateFeedbackPostDto: UpdateFeedbackPostDto) {
    const feedback = await feedbackRepository.updateFeedbackPost(feedbackId, updateFeedbackPostDto);
    return feedback;
}

export async function deleteFeedbackPost(feedbackId: number) {
    const deletedFeedback = await feedbackRepository.deleteFeedbackPost(feedbackId);
    return deletedFeedback;
}

export async function getFeedbackPostById(feedbackId: number) {
    const feedback = await feedbackRepository.getFeedbackPostById(feedbackId);
    return feedback;
}

export async function getFeedbackPostByBoardId(boardId: number) {
    const feedbacks = await feedbackRepository.getFeedbackPostByBoardId(boardId);
    return feedbacks;
}