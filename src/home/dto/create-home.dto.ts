import { IsString } from 'class-validator';
import { Desc } from '../entities/desc.entity';

export class CreateHomeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly createTime: string;

  @IsString({ each: true })
  readonly descs: string[];
}
