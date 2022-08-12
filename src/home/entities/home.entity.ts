import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
// import { JoinTable } from 'typeorm/browser';
import { Desc } from './desc.entity';

@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createTime: string;

  //@Column('json', { nullable: true }) // 为json数组。可选为空
  @JoinTable()
  @ManyToMany((type) => Desc, (desc) => desc.homes, {
    cascade: true, // 关联数据表
  })
  descs: Desc[];
}
