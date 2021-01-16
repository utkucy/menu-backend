import { Router, Request, Response } from "express";
import  MenuController  from "../controller/menu";



  const router = Router();
  const menuController = new MenuController()

  //Get all menus
  router.get("/", menuController.listAll);

  router.get("/find-menu/:branch_id", menuController.findMenu)

  // Get one menu
  router.get("/:menu_id", menuController.getOneById);

  //Create a new menu
  router.post("/",  menuController.newMenu);

  //Edit one menu
  router.patch("/:menu_id", menuController.editMenu);

  //Delete one menu
  router.delete("/:menu_id", menuController.deleteMenu);


export default router