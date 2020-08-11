import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Users from './Users';

@Entity('connections')
export default class Connections {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(_type => Users, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
