import { InputNotificationDTO, NotificationDTO } from './DTOs/Notification.dto'
import { randomUUID } from 'node:crypto'

export class Notification implements NotificationDTO {
    readonly id: NotificationDTO['id']
    readonly videoId: NotificationDTO['videoId']
    readonly email: NotificationDTO['email']
    readonly status: NotificationDTO['status']
    readonly message: NotificationDTO['message']

    constructor(input: NotificationDTO | InputNotificationDTO) {
        this.id = input['id'] || randomUUID()
        this.videoId = input.videoId
        this.email = input.email
        this.status = input.status
        this.message = input.message
    }
}
