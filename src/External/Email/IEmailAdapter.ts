import { Either } from "../../@Shared/Either";
import { EmailDTO } from "../../Entities/DTOs/Email.dto";

export interface IEmailAdapter {
  sendEmail(email: EmailDTO): Promise<Either<Error, string>>
}