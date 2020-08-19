import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Users from './Users';

@Entity('favorites')
export default class Favorites {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: number;

  @OneToOne(_type => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column()
  favorite_user_id: number;

  @OneToOne(_type => Users, { eager: true })
  @JoinColumn({ name: 'favorite_user_id' })
  favorited: Users;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
