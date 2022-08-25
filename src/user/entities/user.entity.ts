import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { USE_RROLE, USER_STATUS } from '../constant/user.constant';

@Entity('admin_user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', nullable: false, length: 20 })
  account_name: string;

  @Column({ type: 'varchar', nullable: false, length: 20 })
  real_name: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  passwd: string;

  @Column({ type: 'varchar', nullable: false, length: 10 })
  passwd_salt: string;

  @Column({ type: 'varchar', length: 11 })
  mobile: string;

  @Column({ type: 'int', default: USE_RROLE.EDITOR })
  role: number;

  @Column({ type: 'int', default: USER_STATUS.EFFICIENT })
  user_status: number;

  @Column({ type: 'int' })
  create_by: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
