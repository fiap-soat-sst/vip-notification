import nodemailer from 'nodemailer'
import { EmailDTO } from '../../Entities/DTOs/Email.dto'
import { Either, Left, Right } from '../../@Shared/Either'
import { IEmailAdapter } from './IEmailAdapter'

export class EmailAdapter implements IEmailAdapter {
    private transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    async sendEmail(email: EmailDTO): Promise<Either<Error, string>> {
        try {
            const emailResponse = await this.transporter.sendMail({
                from: email.sender,
                to: email.receiver,
                subject: email.subject,
                text: email.body,
            })
            if (emailResponse.accepted.length) {
                return Right(emailResponse.response)
            }
            return Left(new Error('Error sending email, ' + emailResponse.rejected.join(', ')))
        } catch (error) {
            return Left(new Error('Error sending email, ' + error.message))
        }
    }
}