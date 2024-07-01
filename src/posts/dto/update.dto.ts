import { PartialType } from "@nestjs/swagger";
import PostCreateDto from "./create.dto";

export default class PostUpdateDto extends PartialType(PostCreateDto) {}