import * as mongoose from 'mongoose';
import { IUserCredential } from '../../interfaces/User';
import * as types from '../../startup/types';

export const UserCredential = new mongoose.Schema(
    {
        username: { type: String, trim: true, unique: true, required: true },
        password: { type: String, trim: true, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, trim: true, unique: true, required: true },
        blog: { type: String, trim: true, unique: true, required: true },
        createdAt: String
    }, {
        collection: types.UserCredential,
        timestamps: true
    }
)

export const userModel = mongoose.model<IUserCredential>(types.UserCredential, UserCredential);