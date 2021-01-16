import { Router } from "express";
import  UserController  from "../controller/user";



  const router = Router();
  const userController = new UserController()

  //Get all users
  router.get("/", userController.listAll);

  // Get one user
  router.get("/:user_id", userController.getOneById);

  router.get("/:email/:password", userController.login)

  //Create a new user
  router.post("/",  userController.newUser);

  //Edit one user
  router.patch("/:user_id", userController.editUser);

  //Delete one user
  router.delete("/:user_id", userController.deleteUser);


export default router