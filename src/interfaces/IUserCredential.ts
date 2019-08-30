import { Document } from 'mongoose';

export interface IUserCredential extends Document {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    createdAt: string
}