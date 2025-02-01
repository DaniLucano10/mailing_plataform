import { List } from 'src/lists/entities/list.entity';
import { Subscriber } from 'src/subscribers/entities/subscriber.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => List, (list) => list.user) // Relación de uno a muchos
  @JoinColumn({ name: 'user_id' })
  lists: List[];

  @OneToMany(() => Subscriber, (subscriber) => subscriber.user_id)
  subscribers: Subscriber[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
