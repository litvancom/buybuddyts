import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./List";
import bcrypt = require("bcrypt");

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  @Column({ length: 255 })
  public userName: string;
  @Column({ unique: true, length: 255 })
  public email: string;
  @Column({ default: "false" })
  public emailIsConfirmed: boolean;
  @Column({ length: 255, select: false })
  public password: string;
  @OneToMany(type => List, list => list.id)
  public lists: List[];

  @ManyToMany(type => User)
  @JoinTable()
  public friends: User[];

  @BeforeInsert()
  @BeforeUpdate()
  public async managePassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
