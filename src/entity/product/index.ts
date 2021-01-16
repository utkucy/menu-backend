import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Category } from "../category";

@Entity()
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: string;

    @Column({ nullable: true })
    imageURL: string;

    @ManyToOne(type => Category, category => category.products)
    category: Category

}