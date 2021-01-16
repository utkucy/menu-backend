import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Menu } from '../../entity/menu'
import { Branch } from "../../entity/branch";


export class MenuDAO {


  static async listAll(req: Request, res: Response) {
    const menuRepository = getRepository(Menu);
    const menus = await menuRepository.find({
      select: ["id", "name"]
    })

    res.send(menus)
  }

  static async findMenu(req: Request, res: Response, branch: Branch) {
    const menuRepository = getRepository(Menu);
    
    try {
      const menu = await menuRepository.findOneOrFail({
        where: { branch: branch }
      })
      // res.send(menu)
      return menu
    } catch (error) {
      res.status(404).send("Failed when fetching menu of user")
    }

  }

  static async getOneById(req: Request, res: Response) {
    const menuRepository = getRepository(Menu);
    const id: string = req.params.menu_id

    try {
      const menu = await menuRepository.findOneOrFail(id, {
        select: ["id", "name"]
      })
      // res.send(menu)
      return menu
    } catch (error) {
      res.status(404).send("Menu not found")
    }
  }

  static async newMenu (req: Request, res: Response) {
    const { name } = req.body
    const menu = new Menu()
    menu.name = name

    const errors = await validate(menu)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }

    //Hash the password, to securely store on DB
    // menu.hashPassword();

    const menuRepository = getRepository(Menu)
    try {
      await menuRepository.save(menu)
    } catch (error) {
      res.status(409).send("Menu could not be created")
      return
    }

    //If all ok, send 201 response
    res.send(201).send("Menu created")
  }

  static async editMenu(req: Request, res: Response) {
    const id = req.params.menu_id
    const { name } = req.body

    const menuRepository = getRepository(Menu)
    let menu

    try {
      menu = await menuRepository.findOneOrFail(id)
    } catch (error) {
      res.status(404).send("Menu not found")
      return
    }

    //Validate the new values on model
    menu.name = name;

    const errors = await validate(menu);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await menuRepository.save(menu);
    } catch (e) {
      res.status(409).send("menu already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  }

  static async deleteMenu(req: Request, res: Response) {
    //Get the ID from the url
    const id = req.params.menu_id;

    const menuRepository = getRepository(Menu);
    let menu: Menu
    try {
      menu = await menuRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Menu not found");
      return;
    }
    menuRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  }


  static async saveDefaultMenu(branch: Branch) {
    const menueRepository = getRepository(Menu)
    try {
      const menu = new Menu()
      menu.branch = branch
      menu.name = "Menu"
      await menueRepository.save(menu)
    } catch (error) {
      console.log(error);
    }
  }




}