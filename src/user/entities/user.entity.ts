import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserRole, UserStatus } from '../constant/user.constant';

@Entity('admin_user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  account_name: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  real_name: string;

  @Column({
    type: 'char',
    length: 32,
    nullable: false,
  })
  passwd: string;

  @Column({
    type: 'char',
    length: 6,
    nullable: true,
  })
  passwd_salt: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 11,
    default: 0,
  })
  mobile: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: true,
    default: UserRole.EDITOR,
  })
  role: number;

  @Column({
    type: 'enum',
    enum: UserStatus,
    nullable: false,
    default: UserStatus.EFFECTIVE,
  })
  user_status: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  create_by: number;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  update_by: number;

  @CreateDateColumn({ type: 'timestamp', comment: '创建时间', precision: 6 })
  create_time: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '更新时间', precision: 6 })
  update_time: Date;
}
