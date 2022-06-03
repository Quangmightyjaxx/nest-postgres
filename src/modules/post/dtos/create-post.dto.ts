import { IsOptional, IsString, IsUrl } from 'class-validator';
import { IPostModel } from './post.model';

export type ICreatePostDTO = Omit<IPostModel, 'createAt' | 'updateAt'>;

export class CreatePostDTO implements ICreatePostDTO {
    @IsOptional()
    @IsString()
    avatarUrl: string;

    @IsString()
    @IsUrl()
    postContent: string;

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    userId: string;
}
