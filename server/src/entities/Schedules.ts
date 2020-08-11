import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Classes from './Classes';

@Entity('classes_schedules')
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
}
