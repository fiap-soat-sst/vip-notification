import { EmailTypeEnum } from "../Enums/EmailTypeEnum"

export interface EmailDTO {
    id: string
    sender: string
    receiver: string
    subject: string
    type: keyof typeof EmailTypeEnum
    data: { videoTitle: string, urlVideo?: string, errorMessage?: string }
    body: string
}

export type InputEmailDTO = Omit<EmailDTO, 'id' | 'subject' | 'body'> 