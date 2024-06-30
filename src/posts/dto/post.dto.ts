import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class PostResponseDto {
  @IsString()
  @ApiProperty({ type: String, description: 'id' })
  id: string;

  @IsString()
  @ApiProperty({ type: String })
  title: string;

  @IsString()
  @ApiProperty({ type: String })
  body: string;

  @IsDateString()
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  @IsDateString()
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  comments: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  likes: number;
}
// export class CreatePostDto extends OmitType(PostDto, [
//   'id',
//   'createdAt',
//   'updatedAt',
//   'userId',
// ]) {}

export class CreatePostDto {
  @IsString()
  @ApiProperty({ type: String })
  title: string;

  @IsString()
  @ApiProperty({ type: String })
  body: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
