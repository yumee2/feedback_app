import CreateFeedbackPostDto from "./dto/create-feedback.dto";
import UpdateFeedbackPostDto from "./dto/update-feedback.dto";
import { Category } from "./enums/category.enum";
import { Status } from "./enums/status.enum";
import * as feedbackRepository from './feedback-posts.repository';

export async function createFeedbackPost(createFeedbackPostDto: CreateFeedbackPostDto) {
    const feedback = await feedbackRepository.createFeedbackPost(createFeedbackPostDto);
    return feedback;
}

export async function updateFeedbackPost(feedbackId: number, updateFeedbackPostDto: UpdateFeedbackPostDto, userId: number) {
    const feedback = await getFeedbackPostById(feedbackId);
    const board = feedback?.board;
    
    if(userId == feedback?.author_id || userId == board?.user_id){
        const updatedFeedback = await feedbackRepository.updateFeedbackPost(feedbackId, updateFeedbackPostDto);
        return updatedFeedback;
    } else {
        throw new Error("You have no right to perform this action");
    }
}

export async function deleteFeedbackPost(feedbackId: number, userId: number) {
    
    const feedback = await getFeedbackPostById(feedbackId);
    const board = feedback?.board;
    console.log(userId, feedback?.author_id, board?.user_id);
    if(userId == feedback?.author_id || userId == board?.user_id){
        const deletedFeedback = await feedbackRepository.deleteFeedbackPost(feedbackId);
        return deletedFeedback;
    } else {
        throw new Error("You have no right to perform this action");
    }
}

export async function getFeedbackPostById(feedbackId: number) {
    const feedback = await feedbackRepository.getFeedbackPostById(feedbackId);
    return feedback;
}

export async function getFeedbackPostByBoardId(boardId: number, take: number, skip: number, status?: Status,  category?: Category, sort?: 'asc' | 'desc', sortByUpvotes?: 'asc' | 'desc') {
    const feedbacks = await feedbackRepository.getFeedbackPostByBoardId(boardId, take, skip, status, category, sort, sortByUpvotes);
    return feedbacks;
}