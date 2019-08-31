import { Document } from 'mongoose';

export interface IUserCredential extends Document {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    blog: string,
    createdAt: string
}

export interface IUserRegister {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    blog: string
}

export interface IUserAuthenticate {
    username: string,
    password: string
}