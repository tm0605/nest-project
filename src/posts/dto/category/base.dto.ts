import { PostCategory } from "@prisma/client";
import { IsUUID } from "class-validator";

export default class PostCategoryBaseDto implements PostCategory {
    @IsUUID()
    id: string;

    @IsUUID()
    postId: string;

    @IsUUID()
    categoryId: string;
}