import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Product } from "../../entity/product";
import { ProductDAO } from '../../dao/product'
import { Category } from "../../entity/category";
import { CategoryDAO } from "../../dao/category";

class ProductController {

  async listAll(req: Request, res: Response) {
    await ProductDAO.listAll(req, res)
  };

  async findProducts(req: Request, res: Response) {
    const category: Category = await CategoryDAO.getOneById(req, res)
    await ProductDAO.findProducts(req, res, category)
  }

  async addProductToCategory(req: Request, res: Response) {

    try {
      const category: Category = await CategoryDAO.getOneById(req, res)
      const products: Product[] = req.body.products
      try {
        console.log(category, products);
         await Promise.all(products.map( async(product) => {
          product.category = category
          await ProductDAO.addProductToCategory(product, res)
        }))
        res.send(201) 
      } catch (error) {
        res.send(400).send("Product can not be added to category")
      }
    } catch (error) {
      res.send(400).send("Category not found for product")
    }  
  }

  async getOneById(req: Request, res: Response) {
    await ProductDAO.getOneById(req, res)
  };

  async newProduct(req: Request, res: Response) {
    const category: Category = await CategoryDAO.getOneById(req, res)
    await ProductDAO.newProduct(req, res, category)
  };

  async editProduct(req: Request, res: Response) {
    await ProductDAO.editProduct(req, res)
  };

  async deleteProduct(req: Request, res: Response) {
    await ProductDAO.deleteProduct(req, res)
  }
};

export default ProductController;