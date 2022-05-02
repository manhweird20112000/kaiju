import { Gender, Status } from 'src/constants';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'admin' })
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  fullname: string;

  @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Unique(['email'])
  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.male })
  gender: Gender;

  @Column({ type: 'enum', enum: Status, default: Status.inactive })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
