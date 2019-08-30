import bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { IUserCredential } from '../../interfaces';
import * as types from '../../startup/types';

const saltRounds = 10;

const UserCredential = new mongoose.Schema(
    {
        username: { type: String, trim: true, unique: true, required: true },
        password: { type: String, trim: true, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, trim: true, unique: true, required: true },
        createdAt: String
    }, {
        collection: types.UserCredential,
        timestamps: true
    }
)

UserCredential.pre('save', (next) => {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
})

export default mongoose.model<IUserCredential>(types.UserCredential, UserCredential);