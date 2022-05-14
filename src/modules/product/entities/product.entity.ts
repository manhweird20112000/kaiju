import { Status } from 'src/constants';
import { Category } from 'src/modules/category/entities/category.entity';
import { Media } from 'src/modules/media/entities/media.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  description: string;

  @Column()
  thumbnails: string;

  @Column({ type: 'enum', enum: Status, default: Status.active })
  status: Status;

  @Column()
  sale: number;

  @Column({ type: 'double' })
  price: number;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @ManyToMany((type) => Tag)
  @JoinTable({ name: 'product_tag' })
  tags: Tag[];

  @ManyToMany((type) => Media)
  @JoinTable({ name: 'product_media' })
  media: Media[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
