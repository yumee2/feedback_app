import UpvoteDto from "./dto/upvotes.dto";
import * as upvoteRepository from './upvotes.repository';

export async function upvotePost(upvoteDto:UpvoteDto) {
    const upvote = await upvoteRepository.upvotePost(upvoteDto);
    return upvote;
}