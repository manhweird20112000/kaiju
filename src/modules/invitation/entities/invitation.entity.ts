import { TypeRequest } from 'src/constants';
import { User } from 'src/modules/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('invitation')
export class Invitation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ comment: 'user được gửi lời mời', nullable: false })
  userIdRequest: number;

  @Column({ type: 'enum', enum: TypeRequest, default: TypeRequest.request })
  status: TypeRequest;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
