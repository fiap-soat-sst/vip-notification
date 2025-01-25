import { Either } from '../../@Shared/Either'
import Video from '../../Entities/Video'

export interface IVideoGateway {
    createVideoExample(): Promise<Either<Error, string>>
    findVideo(email: string, videoId: string): Promise<Either<Error, Video>>
}
