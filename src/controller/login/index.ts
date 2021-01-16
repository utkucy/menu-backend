import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../../entity/user";
import { Branch } from "../../entity/branch";
import { Menu } from "../../entity/menu";
import { Category } from "../../entity/category";
import { Product } from "../../entity/product";

import { UserDAO } from '../../dao/user'
import { BranchDAO } from "../../dao/branch";
import { MenuDAO } from "../../dao/menu";
import { CategoryDAO } from "../../dao/category";
import { ProductDAO } from "../../dao/product";

class LoginController {

  async listAll(req: Request, res: Response) {

    try {
      const user: User = await UserDAO.getOneById(req, res)
      const branches: Branch[] = await BranchDAO.findBranches(req, res, user)

      await Promise.all(branches.map(async (branch) => {
        const menu: Menu = await MenuDAO.findMenu(req, res, branch)
        const categories: Category[] = await CategoryDAO.findCategories(req, res, menu)

        await Promise.all(categories.map(async (category) => {
          const products: Product[] = await ProductDAO.findProducts(req, res, category)
          category.products = products
        }))

        menu.categories = categories
        branch.menu = menu
      }))

      user.branches = branches
      res.send(user)
    } catch (error) {
      res.status(404).send("Could not load data")
    }
    
  };

  async login(req: Request, res: Response) {
    try {
      const user: User = await UserDAO.login(req, res)
      const branches: Branch[] = await BranchDAO.findBranches(req, res, user)

      await Promise.all(branches.map(async (branch) => {
        const menu: Menu = await MenuDAO.findMenu(req, res, branch)
        const categories: Category[] = await CategoryDAO.findCategories(req, res, menu)

        await Promise.all(categories.map(async (category) => {
          const products: Product[] = await ProductDAO.findProducts(req, res, category)
          category.products = products
        }))

        menu.categories = categories
        branch.menu = menu
      }))

      user.branches = branches
      res.send(user)
    } catch (error) {
      console.log(error)
      res.status(404).send("Could not load LOGIN data")
    }
  }

 
};

export default LoginController;