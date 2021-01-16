import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Branch } from "../../entity/branch";
import { User } from '../../entity/user'

import { BranchDAO } from '../../dao/branch'
import { UserDAO } from "../../dao/user";
import { MenuDAO } from "../../dao/menu";

class BranchController {

  
  async listAll(req: Request, res: Response) {
    await BranchDAO.listAll(req, res)
  };

  async findBranches(req: Request, res: Response) {
    const user: User =  await UserDAO.getOneById(req, res)
    await BranchDAO.findBranches(req, res, user)
  }

  async getOneById(req: Request, res: Response) {
    await BranchDAO.getOneById(req, res)
  };

  async newBranch(req: Request, res: Response) {
    const user: User =  await UserDAO.getOneById(req, res)
    await BranchDAO.newBranch(req, res, user)
  };

  async editBranch(req: Request, res: Response) {
    await BranchDAO.editBranch(req, res)
  };

  async deleteBranch(req: Request, res: Response) {
    await BranchDAO.deleteBranch(req, res)
  }
};

export default BranchController;