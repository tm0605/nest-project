import { PickType } from "@nestjs/swagger";
import PostBaseDto from "./base.dto";

export default class PostCreateDto extends PickType(PostBaseDto, ['body','title']) {}