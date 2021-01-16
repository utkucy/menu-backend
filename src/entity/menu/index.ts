import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Category } from "../category";
import { Branch } from "../branch";

@Entity()
export class Menu {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Category, category => category.menu)
    categories: Category[]
    
    @OneToOne(type => Branch, { onDelete: 'CASCADE' })
    @JoinColumn()
    branch: Branch
}