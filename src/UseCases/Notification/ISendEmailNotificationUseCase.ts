import { Either } from '../../@Shared/Either';
import { InputNotificationDTO, NotificationDTO } from "../../Entities/DTOs/Notification.dto";


export interface ISendEmailNotificationUseCase {
  execute(input: InputNotificationDTO): Promise<Either<Error, string>>
}