import { Prisma } from "@prisma/client";
import PostCategoryBaseDto from "./base.dto";

export default class PostCategoryResponseDto extends PostCategoryBaseDto  implements Prisma.PostCategoryGetPayload<{include: typeof PostCategoryResponseDto.include}>{
    category: { id: string; name: string; };

    static get include() {
        return Prisma.validator<Prisma.PostCategoryInclude>()({
            category: true
        })
    }
}