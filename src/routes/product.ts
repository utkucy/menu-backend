import { Router } from "express";
import  ProductController  from "../controller/product";



  const router = Router();
  const productController = new ProductController()

  //Get all products
  router.get("/", productController.listAll);

  router.get("/find-products/:category_id", productController.findProducts);

  router.post("/add-to-category/:category_id", productController.addProductToCategory)

  router.post("/new-product/:category_id", productController.newProduct)

  // Get one product
  router.get("/:product_id", productController.getOneById);

  //Create a new product
  // router.post("/",  productController.newProduct);

  //Edit one product
  router.patch("/:product_id", productController.editProduct);

  //Delete one product
  router.delete("/:product_id", productController.deleteProduct);


export default router