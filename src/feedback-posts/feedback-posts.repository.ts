import { PrismaClient } from "@prisma/client";
import CreateFeedbackPostDto from "./dto/create-feedback.dto";
import UpdateFeedbackPostDto from "./dto/update-feedback.dto";
import { Status } from "./enums/status.enum";
import { Category } from "./enums/category.enum";

const prisma = new PrismaClient()

export async function createFeedbackPost(createFeedbackPost: CreateFeedbackPostDto) {
    const feedback = await prisma.feedbackPost.create({
        data: {
         title: createFeedbackPost.title,
         description: createFeedbackPost.description,
         status: createFeedbackPost.status,
         category: createFeedbackPost.category,
         author_id: createFeedbackPost.author_id,
         board_id: createFeedbackPost.board_id,
         updated_at: createFeedbackPost.updated_at
        }, 
      })
    return feedback;
}

export async function updateFeedbackPost(feedbackId: number,  updateFeedbackPost: UpdateFeedbackPostDto) {
  const feedback = await prisma.feedbackPost.update({
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
    })
  return feedback;
}

export async function getFeedbackPostById(feedbackId: number) {
  const feedback = await prisma.feedbackPost.findUnique({
    where: {
      id: feedbackId
    }
  })
  return feedback;
}

export async function getFeedbackPostByBoardId(boardId: number, status?: Status, category?: Category, sort?: 'asc' | 'desc', sortByUpvotes?: 'asc' | 'desc') {
  const orderBy: any[] = [];
  
  if (sortByUpvotes) {
    orderBy.push({ upvotes: { _count: sortByUpvotes } });
  }
  
  if (sort) {
    orderBy.push({ created_at: sort });
  }
  
  const feedback = await prisma.feedbackPost.findMany({
    where: {
      board_id: boardId,
      status: status,
      category: category
    },
    orderBy,
    include: {
      upvotes: true
    }
  })
  return feedback;
}

export async function deleteFeedbackPost(feedbackId: number) {
  const deletedFeedback = await prisma.feedbackPost.delete({
    where: {
      id: feedbackId
    }});
  return deletedFeedback;
}
