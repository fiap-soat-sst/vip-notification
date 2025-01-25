import { Request, Response, Router } from "express";
import { isLeft } from "../@Shared/Either";
import { ISendEmailNotificationUseCase } from "../UseCases/Notification/ISendEmailNotificationUseCase";

export default class NotificationController {
  constructor(
    private sendEmailNotificationUseCase: ISendEmailNotificationUseCase
  ) {}

  async sendEmailNotification(req: Request, res: Response): Promise<void> {
    const { videoId, email, status, message } = req.body;

    if (!videoId || !email || !status || !message) {
      res.status(400).json({
        message: "Missing required fields: " + videoId ? "" : "videoId, " + email ? "" : "email, " + status ? "" : "status, " + message ? "" : "message",
      });
      return;
    }

    const result = await this.sendEmailNotificationUseCase.execute({
      videoId,
      email,
      status,
      message,
    });

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.status(200).json(result.value);
    }
  }
}
