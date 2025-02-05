import { InputNotificationDTO, NotificationDTO } from './DTOs/Notification.dto'
import { randomUUID } from 'node:crypto'

export class Notification implements NotificationDTO {
    readonly id: NotificationDTO['id']
    readonly videoId: NotificationDTO['videoId']
    readonly email: NotificationDTO['email']
    readonly type: NotificationDTO['type']
    readonly message: NotificationDTO['message']

    constructor(input: NotificationDTO | InputNotificationDTO) {
        this.id = 'id' in input ? input.id : randomUUID()
        this.videoId = input.videoId
        this.email = input.email
        this.type = input.type
        this.message = input.message
    }
}
