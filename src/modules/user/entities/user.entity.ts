import { Gender, Status, TypeAuth } from 'src/constants';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'Họ và tên', nullable: false })
  fullname: string;

  @Column({ comment: 'Ảnh đại diện', nullable: true })
  avatar: string;

  @Column({ nullable: true, comment: 'Giới tính', type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ comment: 'Ngày sinh', nullable: true })
  birthday: Date;

  @Column({ comment: 'Số điện thoại', nullable: false })
  phone: string;

  @Column({ nullable: true, comment: 'email' })
  email: string;

  @Column({ nullable: true, comment: 'User name' })
  username: string;

  @Column({ nullable: true, type: 'json', comment: 'Địa chỉ' })
  address: string;

  @Column({
    comment: 'Trạng thái',
    type: 'enum',
    enum: Status,
    default: Status.active,
  })
  status: Status;

  @Column({ comment: 'Mật khẩu', nullable: false, type: 'varchar' })
  password: string;

  @Column({
    comment: 'Loại đăng nhập',
    nullable: false,
    type: 'enum',
    enum: TypeAuth,
    default: TypeAuth.normal,
  })
  typeAuth: TypeAuth;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.active,
    comment: 'Trạng thái hoạt động',
  })
  isOnline: Status;

  @Column({ collation: 'Khu vực', nullable: false })
  area: number;

  @Column({ comment: 'Lần đăng nhập gần nhất', nullable: true })
  lastLoginAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
