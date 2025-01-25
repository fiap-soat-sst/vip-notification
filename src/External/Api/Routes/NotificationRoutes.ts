import { SendEmailNotificationUseCase } from './../../../UseCases/Notification/SendEmailNotificationUseCase';
import { Router } from 'express'
import { IVideoRepository } from '../../Database/Repositories/Contracts/IVideoRepository'
import NotificationController from '../../../Controllers/NotificationController'
import VideoGateway from '../../../Gateways/Order/VideoGateway'
import { ISendEmailNotificationUseCase } from '../../../UseCases/Notification/ISendEmailNotificationUseCase';
import { IEmailAdapter } from '../../Email/IEmailAdapter';
import { EmailAdapter } from '../../Email/EmailAdapter';

export default class NotificationRoutes {
    private readonly videoRepository: IVideoRepository // Todo: Change to VideoRepository
    private readonly emailAdapter: IEmailAdapter
    private readonly videoGatewayRepository: VideoGateway
    private readonly notificationController: NotificationController
    private sendEmailNotificationUseCase: ISendEmailNotificationUseCase

    constructor() {
        this.emailAdapter = new EmailAdapter()
        // this.videoRepository = new VideoRepository()
        this.videoGatewayRepository = new VideoGateway(
            this.videoRepository
        )
        this.sendEmailNotificationUseCase = new SendEmailNotificationUseCase(
            this.emailAdapter, this.videoGatewayRepository
        )
        this.notificationController = new NotificationController(
            this.sendEmailNotificationUseCase
        )
    }

    buildRouter(): Router {
        const router = Router()

        router.post('/send-email', this.notificationController.sendEmailNotification.bind(this))
        return router
    }
}
