import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../../entity/user";
import { UserDAO } from '../../dao/user'
import { BranchDAO } from "../../dao/branch";
import { MenuDAO } from "../../dao/menu";

class UserController {

  async listAll(req: Request, res: Response) {
    await UserDAO.listAll(req, res)
  };

  async getOneById(req: Request, res: Response) {
    await UserDAO.getOneById(req, res)
  };

  async login(req: Request, res: Response) {
    const user = await UserDAO.login(req, res)
  }

  async newUser(req: Request, res: Response) {
    await UserDAO.newUser(req, res)
  };

  async editUser(req: Request, res: Response) {
    await UserDAO.editUser(req, res)
  };

  async deleteUser(req: Request, res: Response) {
    await UserDAO.deleteUser(req, res)
  }
};

export default UserController;