import { Category } from "../enums/category.enum";
import { Status } from "../enums/status.enum";

export default interface UpdateFeedbackPostDto {
    title?: string;
    description?: string;
    status?: Status;
    category?: Category;
    updated_at: Date;
}
