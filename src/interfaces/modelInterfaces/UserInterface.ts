import { Document, ObjectId } from 'mongoose';
export interface UserInterface extends Document {
    _id: ObjectId,
    email: string,
    username: string,
    password: string,
    first_name: string,
    middle_name: string,
    profile_image: string,
    profile_verified: boolean,
    is_profile_completed: boolean,
    last_name: string,
    preferences: [ObjectId],
    last_login: Date,
    phone: number,
    gender: string,
    otp: OtpInterface,
    ethnicity: string,
    date_of_birth: Date,
    is_deleted: boolean,
    is_locked: boolean,
    terms_accepted: boolean,
    created_at: Date,
    updated_at: Date,
}

export interface OtpInterface {
    otp: string,
    is_expired: boolean,
    expiration_time: number,
    is_verified: boolean
}


export interface deleteAccount {
    userId: string | ObjectId,
    username: string,
    password: string

}