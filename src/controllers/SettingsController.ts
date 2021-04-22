import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController {
  async create(req: Request, res: Response) {
    const { chat, username } = req.body;

    const settingsService = new SettingsService();

    try {
      const settings = await settingsService.create({ chat, username });
      return res.json(settings);
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  async findByUsername(request: Request, response: Response) {
    const { username } = request.params;
    const settingsService = new SettingsService();
    const userSettings = await settingsService.findByUsername(username);
    return response.json(userSettings);
  }

  async update(request: Request, response: Response) {
    const { username } = request.params;
    const { chat } = request.body;

    const settingsService = new SettingsService();
    const updateUserSettings = await settingsService.update(username, chat);
    return response.json(updateUserSettings);
  }
}

export { SettingsController };
