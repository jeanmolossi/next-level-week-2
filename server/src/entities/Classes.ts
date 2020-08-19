import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import Schedules from './Schedules';
import Users from './Users';

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
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'schedules' })
  schedules: Schedules[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
