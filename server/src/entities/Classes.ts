import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Users from './Users';
import Schedules from './Schedules';

@Entity('classes')
export default class Classes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  subject: string;

  @Column()
  cost: number;

  @Column()
  user_id: number;

  @OneToOne(_type => Users, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(_type => Schedules, classes => classes.classes, {
    cascade: true,
  })
  @JoinColumn({ name: 'schedules' })
  schedules: Schedules[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
