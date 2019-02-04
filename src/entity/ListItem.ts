import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./List";
import { User } from "./User";

@Entity()
export class ListItem {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  @Column({ length: 255 })
  public name: string;
  @Column({ length: 255 })
  public valueName: string;
  @Column({ type: "double precision" })
  public value: number;
  @Column({ length: 255 })
  public category: string;
  @Column({ default: "false" })
  public checked: boolean;
  @Column({ type: "int" })
  public order: number;
  @ManyToOne((type) => List, (list) => list.items)
  public list: List;
}
