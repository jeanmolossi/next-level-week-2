import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('classes')
export default class Classes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
  
  @Column()
  lastname: string;
  
  @Column()
  avatar: string;
  
  @Column()
  whatsapp: string;
  
  @Column()
  bio: string;

  user: any;
}