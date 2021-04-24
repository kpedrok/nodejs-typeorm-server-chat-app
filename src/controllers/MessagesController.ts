import { NextFunction, Request, Response, Router } from "express";
import { MessagesService } from "../services/MessagesService";

class MessagesController {
  async create(request: Request, response: Response) {
    const { admin_id, text, user_id } = request.body;
    const messagesService = new MessagesService();

    try {
      const messages = await messagesService.create({
        admin_id,
        text,
        user_id,
      });
      return response.json(messages);
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }

  async showByUser(id: string) {
    const messagesService = new MessagesService();
    const list = await messagesService.listByUser(id);
    return list;
  }

  static router(): Router {
    const router = Router({
      strict: true,
    });

    const instance = new MessagesController();

    router.post("/", instance.create);

    router.get("/:id", (req: Request, res: Response, next: NextFunction) =>
      instance
        .showByUser(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((next) => {
          return res.status(400).json({
            message: next.message,
          });
        })
    );

    return router;
  }
}

export { MessagesController };
