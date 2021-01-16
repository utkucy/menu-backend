import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { CategoryDAO } from '../../dao/category'
import { Category } from "../../entity/category";
import { Menu } from "../../entity/menu";
import { MenuDAO } from "../../dao/menu";
import { Product } from "../../entity/product";
import { ProductDAO } from "../../dao/product";

class CategoryController {

  async listAll(req: Request, res: Response) {
    await CategoryDAO.listAll(req, res)
  };

  async findCategories(req: Request, res: Response) {
    const menu: Menu = await MenuDAO.getOneById(req, res)
    await CategoryDAO.findCategories(req, res, menu)
  }

  async getOneById(req: Request, res: Response) {
    await CategoryDAO.getOneById(req, res)
  };

  async newCategory(req: Request, res: Response) {
    const menu: Menu = await MenuDAO.getOneById(req, res)
    await CategoryDAO.newCategory(req, res, menu)
  };

  async editCategory(req: Request, res: Response) {
    await CategoryDAO.editCategory(req, res)
  };

  async deleteCategory(req: Request, res: Response) {
    await CategoryDAO.deleteCategory(req, res)
  }
};

export default CategoryController;