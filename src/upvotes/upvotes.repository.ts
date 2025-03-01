import { PrismaClient, Upvote } from "@prisma/client";
import UpvoteDto from "./dto/upvotes.dto";

const prisma = new PrismaClient()

export async function upvotePost(upvoteDto: UpvoteDto) {
    const upvote = await prisma.upvote.create({
        data: {
         user_id: upvoteDto.userId,
         feedback_post_id: upvoteDto.feedbackPostId
        }, 
      })
    return upvote;
}