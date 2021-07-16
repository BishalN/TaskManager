import { Field, ObjectType, Root } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
