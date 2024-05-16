export interface IVideoRepository {
    getVideoById(id: string): Promise<any>;
}
