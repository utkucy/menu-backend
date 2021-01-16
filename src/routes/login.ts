import { Router } from "express";
import  LoginController  from "../controller/login";



  const router = Router();
  const loginController = new LoginController()

  //fetch data
  router.get("/:user_id", loginController.listAll);

  router.get("/:email/:password", loginController.login)

  


export default router