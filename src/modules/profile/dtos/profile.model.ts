export interface IProfileModal {
    user_id: string | null;
    avatar: string | null;
    address: string | null;
    gender: boolean;
    birthday: null | string | Date;
    phone: string | null;
    position: boolean | null;
    description: string | null;
}

export class ProfileModal implements IProfileModal {
    user_id: string;
    avatar!: string;
    address!: string;
    gender!: boolean;
    birthday!: null | string | Date;
    phone!: string;
    position!: boolean;
    description!: string;
}
