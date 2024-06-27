import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  @ApiProperty({ type: String, description: 'id' })
  id: string;

  @IsString()
  @ApiProperty({ type: String, description: 'post title' })
  title: string;

  @IsString()
  @ApiProperty({ type: String, description: 'post body' })
  body: string;

  @IsDateString()
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  updatedAt: string;

  @ApiProperty()
  @IsString()
  userId: string;
}
// export class CreatePostDto extends OmitType(PostDto, [
//   'id',
//   'createdAt',
//   'updatedAt',
//   'userId',
// ]) {}

export class CreatePostDto {
  @IsString()
  @ApiProperty({ type: String, description: 'post title' })
  title: string;

  @IsString()
  @ApiProperty({ type: String, description: 'post body' })
  body: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
