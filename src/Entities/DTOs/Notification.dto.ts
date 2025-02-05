import { NotificationTypeEnum } from "../Enums/NotificationTypeEnum"

export interface NotificationDTO {
    id: string
    videoId: string
    email: string
    type: keyof typeof NotificationTypeEnum
    message: string
}

export type InputNotificationDTO = Omit<NotificationDTO, 'id'> 