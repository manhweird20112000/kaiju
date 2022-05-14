import { Status } from 'src/constants';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentId: number;

  @Column({ length: 150 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  avatar: number;

  @Column({ type: 'enum', enum: Status, default: Status.active })
  status: Status;

  @OneToMany(() => Product, (product) => product.id)
  product: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
