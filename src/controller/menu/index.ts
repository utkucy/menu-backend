import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../../entity/user";
import { MenuDAO } from '../../dao/menu'
import { BranchDAO } from "../../dao/branch";
import { Branch } from "../../entity/branch";

class MenuController {

  async listAll(req: Request, res: Response) {
    await MenuDAO.listAll(req, res)
  };

  async findMenu(req: Request, res: Response) {
    const branch: Branch =  await BranchDAO.getOneById(req, res)
    await MenuDAO.findMenu(req, res, branch)
  }

  async getOneById(req: Request, res: Response) {
    await MenuDAO.getOneById(req, res)
  };

  async newMenu(req: Request, res: Response) {
    await MenuDAO.newMenu(req, res)
  };

  async editMenu(req: Request, res: Response) {
    await MenuDAO.editMenu(req, res)
  };

  async deleteMenu(req: Request, res: Response) {
    await MenuDAO.deleteMenu(req, res)
  }
};

export default MenuController;