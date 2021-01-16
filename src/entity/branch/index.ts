import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne} from "typeorm";
import { Menu } from "../menu";
import { IsEmail } from "class-validator";
import { User } from "../user";

@Entity()
export class Branch {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @Column("text", { nullable: true } )
    address: string;

    @Column({ nullable: true })
    telephone: string;

    @OneToOne(type => Menu, menu => menu.branch)
    menu: Menu

    @ManyToOne(type => User, user => user.branches)
    user: User
}