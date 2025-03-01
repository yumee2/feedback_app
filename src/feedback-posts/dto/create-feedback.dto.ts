import { Category } from "../enums/category.enum";
import { Status } from "../enums/status.enum";

export default interface CreateFeedbackPostDto {
    title: string;
    description: string;
    status: Status;
    category: Category;
    author_id: number;
    board_id: number;
    updated_at: Date;
}
