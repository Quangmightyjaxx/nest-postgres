export interface IPostModel {
    avatarUrl?: string;
    postContent: string;
    title: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class PostModel implements IPostModel {
    avatarUrl!: string;
    postContent: string;
    title: string;
    userId: string;
    createdAt!: Date;
    updatedAt!: Date;
}
