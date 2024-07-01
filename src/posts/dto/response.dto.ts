import { PostCategory, Prisma } from "@prisma/client";
import PostBaseDto from "./base.dto";
import PostCategoryResponseDto from "./category/response.dto";

export class PostResponseDto extends PostBaseDto implements Prisma.PostGetPayload<{include: typeof PostResponseDto.include}>  {
    _count: { comment: number; like: number; };
  

    postCategory: PostCategoryResponseDto[]
  
    static get include() {
      return Prisma.validator<Prisma.PostInclude>()({
        postCategory: {
            include: PostCategoryResponseDto.include
        },
        _count: {
          select: {
            comment: true,
            like: true
          }
        }
      })
    }
  
  }