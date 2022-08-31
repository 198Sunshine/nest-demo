import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('commodity')
export class CommodityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  commodity_id: number;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    comment: '商品_名称',
  })
  commodity_name: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '商品_介绍',
  })
  commodity_desc: string;

  @Column({
    type: 'decimal',
    nullable: false,
    comment: '市场价',
    precision: 7,
    scale: 2,
    default: 0.0,
  })
  market_price: number;

  @Column({
    type: 'decimal',
    nullable: false,
    comment: '销售价',
    precision: 7,
    scale: 2,
    default: 0.0,
  })
  sale_money: number;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '创建人',
  })
  c_by: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    comment: '创建人',
    default: () => 'CURRENT_TIMESTAMP',
  })
  c_time: number;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 0,
    comment: '修改人',
  })
  u_by: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    comment: '修改时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  u_time: number;
}
