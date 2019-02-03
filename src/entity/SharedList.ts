import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./List";
import { User } from "./User";

@Entity()
export class SharedList {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  @Column()
  public password: string;
  @Column({ enum: ["r", "rw"] })
  public chmod: string;
  @ManyToOne((type) => List)
  public list: List;
  @ManyToOne((type) => User)
  public receiver: User;
}
