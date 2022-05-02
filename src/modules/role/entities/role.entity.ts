import { Gender, Status } from 'src/constants';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('role')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'enum', enum: Status, default: Status.active })
  status: Gender;

  @ManyToMany((type) => Admin)
  @JoinTable({ name: 'admin_role' })
  admins: Admin[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
