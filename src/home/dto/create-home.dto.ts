import { IsString } from 'class-validator';

export class CreateHomeDto {
  @IsString()
  readonly name: string;

  @IsString({ each: true })
  readonly desc: string[];

  @IsString()
  readonly createTime: string;
}
