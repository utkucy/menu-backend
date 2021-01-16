import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Category } from '../../entity/category'
import { Menu } from "../../entity/menu";


export class CategoryDAO {

  static async listAll(req: Request, res: Response) {
    const categoryRepository = getRepository(Category);
    const categoryies = await categoryRepository.find({
      select: ["id", "name", "description"]
    })

    res.send(categoryies)
  }

  static async findCategories(req: Request, res: Response, menu: Menu) {
    const categoryRepository = getRepository(Category);
    try {
      const categories = await categoryRepository.find({
        where: { menu: menu }
      })
      // res.send(categories)
      return categories
    } catch (error) {
      res.status(404).send("Failed while fetching categories for given menu")
    }    
  }

  static async getOneById(req: Request, res: Response) {
    const categoryRepository = getRepository(Category);
    const id: string = req.params.category_id

    try {
      const category = await categoryRepository.findOneOrFail(id, {
        select: ["id", "name", "description"]
      })
      // res.send(category)
      return category
    } catch (error) {
      res.status(404).send("Category not found")
    }
  }

  static async newCategory (req: Request, res: Response, menu: Menu) {
    const { name, description } = req.body
    const category = new Category()
    category.name = name
    category.description = description
    category.menu = menu

    const errors = await validate(category)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }

    //Hash the password, to securely store on DB
    // branch.hashPassword();

    const categoryRepository = getRepository(Category)
    try {
      await categoryRepository.save(category)
      // res.send(201).send(category)
      res.send(category)
    } catch (error) {
      res.status(409).send("Category could not be created")
      return
    }

  }

  static async editCategory(req: Request, res: Response) {
    const id = req.params.category_id
    const { name, description } = req.body

    const categoryRepository = getRepository(Category)
    let category

    try {
      category = await categoryRepository.findOneOrFail(id)
    } catch (error) {
      res.status(404).send("Category not found")
      return
    }

    //Validate the new values on model
    category.name = name
    category.description = description

    const errors = await validate(category);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means categoryname already in use
    try {
      await categoryRepository.save(category);
    } catch (e) {
      res.status(409).send("Category already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  }

  static async deleteCategory(req: Request, res: Response) {
    //Get the ID from the url
    const id = req.params.category_id;

    const categoryRepository = getRepository(Category);
    let category: Category
    try {
      category = await categoryRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Category not found");
      return;
    }
    categoryRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  }
  

}