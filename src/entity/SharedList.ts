import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./List";
import { User } from "./User";

@Entity()
export class SharedList {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  @Column({ length: 255 })
  public password: string;
  @Column({ enum: ["r", "rw"], length: 5 })
  public chmod: string;
  @ManyToOne(type => List)
  public list: List;
  @ManyToMany(type => User)
  @JoinTable()
  public receivers: User[];
}
