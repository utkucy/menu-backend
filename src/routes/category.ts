import { Router } from "express";
import  CategoryController  from '../controller/category'



  const router = Router();
  const categoryController = new CategoryController()

  //Get all categorys
  router.get("/", categoryController.listAll);

  router.get("/find-categories/:menu_id", categoryController.findCategories);

  // Get one category
  router.get("/:category_id", categoryController.getOneById);

  //Create a new category
  router.post("/:menu_id",  categoryController.newCategory);

  //Edit one category
  router.patch("/:category_id", categoryController.editCategory);

  //Delete one category
  router.delete("/:category_id", categoryController.deleteCategory);


export default router