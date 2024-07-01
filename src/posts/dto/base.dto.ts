import { Post } from "@prisma/client";
import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export default class PostBaseDto  implements Post{
    @IsUUID()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    body: string;

    @IsDate()
    createdAt: Date;

    @IsUUID()
    userId: string;

    @IsDate()
    updatedAt: Date;
}