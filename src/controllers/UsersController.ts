import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";

class UsersController {
  async create(req: Request, res: Response) {
    const { email } = req.body;

    const usersService = new UsersService();

    try {
      const users = await usersService.create(email);
      return res.json(users);
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}

export { UsersController };
