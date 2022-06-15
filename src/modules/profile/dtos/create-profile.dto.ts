import { IsOptional, IsString } from 'class-validator';
import { IProfileModal } from './profile.model';

export type ICreateProfileDTO = Omit<IProfileModal, 'createAt' | 'updateAt'>;

export class CreateProfileDTO implements ICreateProfileDTO {
    @IsOptional()
    @IsString()
    user_id: string;
    @IsOptional()
    @IsString()
    avatar: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    phone: string;
    @IsOptional()
    gender: boolean;

    @IsOptional()
    @IsString()
    description: string;
    @IsOptional()
    @IsString()
    birthday: string | Date;
    @IsOptional()
    @IsString()
    position: boolean;
}
