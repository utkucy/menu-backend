import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Branch } from "../branch";
import { IsEmail } from "class-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({unique : true})
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column()
    restaurant_name: string;

    @Column()
    phone_number: string

    @Column({ nullable: true })
    website: string

    @Column({ type : "boolean" })
    trial: boolean

    @Column({ nullable: true })
    image_url: string

    @OneToMany(type => Branch, branch => branch.user)
    branches: Branch[]

}