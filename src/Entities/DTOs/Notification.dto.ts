import { NotificationStatusEnum } from "../Enums/NotificationStatusEnum"

export interface NotificationDTO {
    id: string
    videoId: string
    email: string
    status: keyof typeof NotificationStatusEnum
    message: string
}

export type InputNotificationDTO = Omit<NotificationDTO, 'id'> 