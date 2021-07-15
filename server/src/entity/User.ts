import { IsEmail, isEmail, MaxLength, MinLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Task } from "./Task";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @MinLength(3)
  @Column()
  username: string;

  @Field()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @MinLength(6)
  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
