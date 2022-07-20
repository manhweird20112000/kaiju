import { TypeConfig } from 'src/constants';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('entity')
export class Config extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'Key để truy cập để lấy data' })
  code: string;

  @Column({ comment: 'Tiêu đề config' })
  title: string;

  @Column({ comment: 'Nội dung' })
  content: string;

  @Column({
    comment: 'Kiểu nội dung',
    enum: TypeConfig,
    default: TypeConfig.template,
  })
  type: TypeConfig;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
