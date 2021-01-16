import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { Branch } from '../../entity/branch'
import { User } from '../../entity/user'
import { MenuDAO } from "../menu";
import { Menu } from "../../entity/menu";


export class BranchDAO {


  static async listAll(req: Request, res: Response) {
    const branchRepository = getRepository(Branch);
    const branches = await branchRepository.find({
      where: { user: req.params.userId }
    })

    res.send(branches)
  }

  static async findBranches(req: Request, res: Response, user: User) {
    const branchRepository = getRepository(Branch);

    try {
      const branches = await branchRepository.find({
        where: { user: user }
      })
      // res.send(branches)
      return branches
    } catch (error) {
      res.status(404).send("Failed when fetching branches of user")
    }
  
  }

  static async getOneById(req: Request, res: Response) {
    const branchRepository = getRepository(Branch);
    const id: string = req.params.branch_id

    try {
      const branch = await branchRepository.findOneOrFail(id, {
        select: ["id", "name", "address", "telephone"]
      })
      // res.send(branch)
      return branch
    } catch (error) {
      res.status(404).send("Branch not found")
    }
  }

  static async newBranch (req: Request, res: Response, user: User) {
    const { name, address, telephone } = req.body.branch
    const branch = new Branch()
    branch.name = name
    branch.address = address
    branch.telephone = telephone
    branch.user = user

    const errors = await validate(branch)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }
    //Hash the password, to securely store on DB
    // branch.hashPassword();

    const branchRepository = getRepository(Branch)
    try {
      await branchRepository.save(branch)
      await MenuDAO.saveDefaultMenu(branch)
    } catch (error) {
      res.status(409).send("Branch could not be created")
      return
    }

    //If all ok, send 201 response
    res.send(201).send("Branch created")
  }

  static async editBranch(req: Request, res: Response) {
    const id = req.params.branch_id
    const { name, address, telephone } = req.body.branch

    const branchRepository = getRepository(Branch)
    let branch

    try {
      branch = await branchRepository.findOneOrFail(id)
    } catch (error) {
      res.status(404).send("Branch not found")
      return
    }

    //Validate the new values on model
    branch.name = name;
    branch.address = address;
    branch.telephone = telephone;

    const errors = await validate(branch);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await branchRepository.save(branch);
    } catch (e) {
      res.status(409).send("branch already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  }

  static async deleteBranch(req: Request, res: Response) {
    //Get the ID from the url
    const id = req.params.branch_id

    const branchRepository = getRepository(Branch);
    let branch: Branch
    try {
      branch = await branchRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Branch not found");
      return;
    }
    branchRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  }



  static async saveDefaultBranch(user: User) {
    const branchRepository = getRepository(Branch)

    try {
      const branch = new Branch()
      branch.user = user
      branch.name = "1. Şube"
      await branchRepository.save(branch)
      await MenuDAO.saveDefaultMenu(branch)
    } catch (error) {
      console.log(error);
    }
  }



}