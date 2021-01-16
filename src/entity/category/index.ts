import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne} from "typeorm";

import { Product } from '../product'
import { Menu } from '../menu'

@Entity()
export class Category {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @Column("text")
    description: string;

    @OneToMany(type => Product, product => product.category)
    products: Product[]

    @ManyToOne(type => Menu, menu => menu.categories)
    menu: Menu

}