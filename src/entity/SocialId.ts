import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
@Index(["socialId", "type", "user"], { unique: true })
export class SocialId {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  @Column()
  public socialId: string;
  @Column({ enum: ["fb"] })
  public type: string;
  @ManyToOne(type => User)
  public user: User;
}
