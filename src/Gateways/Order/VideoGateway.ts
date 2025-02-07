import { Either } from '../../@Shared/Either'
import Video from '../../Entities/Video'
import { IVideoRepository } from '../../External/Database/Repositories/Contracts/IVideoRepository'
import { IVideoGateway } from '../contracts/IVideoGateway'

export default class VideoGateway implements IVideoGateway {
    constructor(private readonly gateway: IVideoRepository) {}

    findVideo(email: string, videoId: string): Promise<Either<Error, Video>> {
        return this.gateway.findVideo(email, videoId)
    }

    createVideoExample(): Promise<Either<Error, string>> {
        return this.gateway.createVideoExample()
    }
}
