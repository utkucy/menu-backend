import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from '../../entity/user'

import { BranchDAO } from '../branch'



export class UserDAO {

  static async listAll(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["id", "email", "restaurant_name", "phone_number", "website", "image_url"]
    })

    res.send(users)
  }

  static async getOneById(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const id: string = req.params.user_id

    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ["id", "email", "restaurant_name", "phone_number", "website", "image_url"]
      })
      // res.send(user)
      return user
    } catch (error) {
      res.status(404).send("User not found")
    }
  
  }

  static async login(req: Request, res: Response) {
    const userRepository = getRepository(User)
    const p_email: string = req.params.email
    const p_password: string = req.params.password

    try {
      const user = await userRepository.findOneOrFail({
        select: ["id", "email", "restaurant_name", "phone_number", "website", "image_url"],
        where: {
          email: p_email,
          password: p_password
        }
      })
      // res.send(user)
      return user
    }
    catch(error) {
      res.status(404).send("User not found!")
    }
  }

  static async newUser (req: Request, res: Response): Promise<User> {
    const { email, password, restaurant_name, phone_number, website, trial, image_url } = req.body
    const user = new User()
    user.email = email
    user.password = password
    user.restaurant_name = restaurant_name
    user.phone_number = phone_number
    user.website = website
    user.trial = trial
    user.image_url = image_url

    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }
    
    const userRepository = getRepository(User)
    try {
      await userRepository.save(user)
      await BranchDAO.saveDefaultBranch(user)
    } catch (error) {
      res.status(409).send("User could not be created")
      return
    }
    
    //If all ok, send 201 response
    res.send(201).send("User created")
  }
  

  static async editUser(req: Request, res: Response) {
    const id = req.params.user_id
    //password is removed
    const { email, restaurant_name, phone_number, website, image_url } = req.body
    // const email = req.body.email
    // const restaurant_name = req.body.restaurant_name
    // const phone_number = req.body.phone_number
    // const website = req.body.website

    const userRepository = getRepository(User)
    let user

    try {
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      res.status(404).send("User not found")
      return
    }

    //Validate the new values on model
    user.email = email
    user.restaurant_name = restaurant_name
    user.phone_number = phone_number
    user.website = website
    user.image_url = image_url


    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send("asd");
      return;
    }


    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("User already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  }

  static async deleteUser(req: Request, res: Response) {
    //Get the ID from the url
    const id = req.params.user_id;

    const userRepository = getRepository(User);
    let user: User
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  }
  

}