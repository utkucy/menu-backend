import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Product } from '../../entity/product'
import { Category } from "../../entity/category";


export class ProductDAO {

  static async listAll(req: Request, res: Response) {
    const productRepository = getRepository(Product);
    const products = await productRepository.find({
      select: ["id", "name", "description", "price", "imageURL"]
    })

    res.send(products)
  }

  static async findProducts(req: Request, res: Response, category: Category) {
    const productRepository = getRepository(Product);


    try {
      const products = await productRepository.find({
        where: { category: category }
      })
      // res.send(products)
      return products
    } catch (error) {
      res.status(404).send("Failed while fetching products for given category")
    }    
  }

  static async getOneById(req: Request, res: Response) {
    const productRepository = getRepository(Product);
    const id: string = req.params.product_id

    try {
      const product = await productRepository.findOneOrFail(id, {
        select: ["id", "name", "description", "price", "imageURL"]
      })
      res.send(product)
    } catch (error) {
      res.status(404).send("Product not found")
    }
  }

  static async addProductToCategory (product_: Product, res: Response) {
    // const { name, description, price } = req.body
    const product = new Product()
    product.name = product_.name
    product.description = product_.description
    product.price = product_.price
    product.imageURL = product_.imageURL
    product.category = product_.category

    const errors = await validate(product)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }


    const productRepository = getRepository(Product)
    try {
      await productRepository.save(product)
    } catch (error) {
      res.status(409).send("Product could not be created")
      return
    }
  }

  static async newProduct(req: Request, res: Response, category: Category) {
    const { name, description, price, imageURL } = req.body.product
    const product = new Product()
    product.name = name
    product.description = description
    product.price = price
    product.imageURL = imageURL
    product.category = category

    const errors = await validate(product)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }


    const productRepository = getRepository(Product)
    try {
      await productRepository.save(product)
      res.send(201)
    } catch (error) {
      res.status(409).send("Product could not be created")
      return
    }
  }

  static async editProduct(req: Request, res: Response) {
    const id = req.params.product_id
    const { name, description, price, imageURL } = req.body.product
    console.log(req.body);
    console.log(name, description, price, imageURL);

    const productRepository = getRepository(Product)
    let product

    try {
      product = await productRepository.findOneOrFail(id)
    } catch (error) {
      res.status(404).send("Product not found")
      return
    }

    product.name = name
    product.description = description
    product.price = price
    product.imageURL = imageURL

    const errors = await validate(product);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await productRepository.save(product);
    } catch (e) {
      res.status(409).send("Product can not be updated");
      return;
    }
    res.status(204).send();
  }

  static async deleteProduct(req: Request, res: Response) {
    //Get the ID from the url
    const id = req.params.product_id;

    const productRepository = getRepository(Product);
    let product: Product
    try {
      product = await productRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Product not found");
      return;
    }
    productRepository.delete(id);
    res.status(204).send();
  }
}