import {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
} from '@aws-sdk/lib-dynamodb'
import { Either, isLeft, Left, Right } from '../../../../@Shared/Either'
import User from '../../../../Entities/User'
import { IVideoRepository } from '../Contracts/IVideoRepository'
import { DynamoDBAdapter } from '../../DynamoDbAdapter'
import Video from '../../../../Entities/Video'

export default class DynamoDBVideoRepository implements IVideoRepository {
    private client: DynamoDBDocumentClient

    constructor(adapter: DynamoDBAdapter) {
        this.client = adapter.getClient()
    }
    async findVideo(email: string, videoId: string): Promise<Either<Error, Video>> {
        const params = {
            TableName: process.env.AWS_TABLE_USERS,
            Key: {
                email,
            },
        }

        try {
            const result = await this.client.send(new GetCommand(params))

            if (!result.Item) {
                return Left<Error>(new Error('User not found'))
            }

            const video = result.Item.videos.find((video: any) => video.id === videoId)

            if (!video) {
                return Left<Error>(new Error('Video not found'))
            }

            return Right(video)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async createVideoExample(): Promise<Either<Error, string>> {
        // # data example
        // # {
        // #   email: string,
        // #   password: string,
        // #   videos: [
        // #     {
        // #         id: string,
        // #         name: string
        // #         size: number,
        // #         contentType: string,
        // #         hash: string,
        // #         managerService: {
        // #             url: string,
        // #         },
        // #     }
        // #   ],
        // # }
        const params = {
            TableName: process.env.AWS_TABLE_USERS,
            Item: {
                email: 'teste@gmail.com',
                password: '123456',
                videos: [
                    {
                        id: '1',
                        name: 'video1',
                        size: 123,
                        contentType: 'video/mp4',
                        hash: 'hash',
                        managerService: {
                            url: 'http://manager-service.com',
                        },
                    },
                ],
            },
        }

        try {
            await this.client.send(new PutCommand(params))
            return Right('Video created')
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

}
