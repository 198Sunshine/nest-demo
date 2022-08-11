import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createTime: string;

  @Column('json', { nullable:true }) // 为json数组。可选为空
  desc: string[];
}
