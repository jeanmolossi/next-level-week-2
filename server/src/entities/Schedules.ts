import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Classes from './Classes';

@Entity('classes_schedule')
export default class Schedules {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  week_day: number;

  @Column()
  from: number;

  @Column()
  to: number;

  @Column()
  class_id: number;

  @ManyToOne(_type => Classes)
  @JoinColumn({ name: 'class_id' })
  classes: Classes;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
