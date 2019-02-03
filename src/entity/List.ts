import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { ListItem } from "./ListItem";

@Entity()
export class List {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  @Column()
  public title: string;
  @ManyToOne((type) => User, (user) => user.lists)
  public user: User;
  @OneToMany((type) => ListItem, (listItem) => listItem.list)
  public items: ListItem[];
}
