import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Home } from './home.entity';

@Entity()
export class Desc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Home, (home) => home.descs)
  homes: Home[];
}
