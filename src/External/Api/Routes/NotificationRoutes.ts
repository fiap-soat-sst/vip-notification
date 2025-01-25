import { SendEmailNotificationUseCase } from './../../../UseCases/Notification/SendEmailNotificationUseCase';
import { Router } from 'express'
import { IVideoRepository } from '../../Database/Repositories/Contracts/IVideoRepository'
import NotificationController from '../../../Controllers/NotificationController'
import VideoGateway from '../../../Gateways/Order/VideoGateway'
import { ISendEmailNotificationUseCase } from '../../../UseCases/Notification/ISendEmailNotificationUseCase';
import { IEmailAdapter } from '../../Email/IEmailAdapter';
import { EmailAdapter } from '../../Email/EmailAdapter';
import DynamoDBVideoRepository from '../../Database/Repositories/DatabaseRepository/DynamoDBVideoRepository';
import { DynamoDBAdapter } from '../../Database/DynamoDbAdapter';

export default class NotificationRoutes {
    private readonly videoRepository: IVideoRepository
    private readonly emailAdapter: IEmailAdapter
    private readonly adapterRepository: DynamoDBAdapter
    private readonly videoGatewayRepository: VideoGateway
    private readonly notificationController: NotificationController
    private sendEmailNotificationUseCase: ISendEmailNotificationUseCase

    constructor() {
        this.emailAdapter = new EmailAdapter()
        this.adapterRepository = new DynamoDBAdapter()
        this.videoRepository = new DynamoDBVideoRepository(this.adapterRepository)
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
        router.post('/create-video', async (req, res) => {
            try {
                const result = await this.videoGatewayRepository.createVideoExample();
                res.json(result);
            } catch (error: any) {
                res.status(500).json({ error: error?.message || 'Internal server error' });
            }
        })
        return router
    }
}
