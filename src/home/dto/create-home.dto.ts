import { IsString } from 'class-validator';

export class CreateHomeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly createTime: string;

  @IsString({ each: true })
  readonly desc: string[];
}
