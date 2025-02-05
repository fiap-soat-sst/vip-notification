import { ISendEmailNotificationUseCase } from "./ISendEmailNotificationUseCase";
import { Notification } from "../../Entities/Notification";
import { Email } from "../../Entities/Email";
import { InputNotificationDTO } from "../../Entities/DTOs/Notification.dto";
import { Either, isLeft, Left, Right } from "../../@Shared/Either";
import { IEmailAdapter } from "../../External/Email/IEmailAdapter";
import { IVideoGateway } from "../../Gateways/contracts/IVideoGateway";

export class SendEmailNotificationUseCase implements ISendEmailNotificationUseCase {
  private sender = process.env.EMAIL_USER!;
  constructor(private emailAdapter: IEmailAdapter, private gateway: IVideoGateway) {}

  async execute(input: InputNotificationDTO): Promise<Either<Error, string>> {
    const notification = new Notification(input);
    const video = await this.gateway.findVideo(
      notification.email,
      notification.videoId
    );

    if (isLeft(video)) {
        return Left(new Error('Video not found'));
    }

    const email = new Email({
      sender: this.sender,
      receiver: notification.email,
      type: notification.type,
      data: {
        videoTitle: video.value.name,
        urlVideo: video.value.compressService?.url || video.value.managerService?.url,
        errorMessage: notification.message,
      },
    });

    const emailResponse = await this.emailAdapter.sendEmail(email);
    
    if (isLeft(emailResponse)) {
        return emailResponse;
    }

    return Right('Email sent successfully');
  }
}
