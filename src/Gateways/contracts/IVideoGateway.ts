import { Either } from '../../@Shared/Either'

export interface IVideoGateway {
    findVideo(email: string, videoId: string): Promise<Either<Error, any>>
}
