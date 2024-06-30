import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @ApiProperty({ type: String })
  body: string;
}

export class UpdateCommentDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  body: string;
}
