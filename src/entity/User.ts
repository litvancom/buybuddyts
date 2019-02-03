import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./List";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  @Column()
  public userName: string;
  @Column()
  public email: string;
  @Column()
  public emailIsConfirmed: boolean;
  @Column()
  public password: string;
  @OneToMany((type) => List, (list) => list.id)
  public lists: List[];
}
